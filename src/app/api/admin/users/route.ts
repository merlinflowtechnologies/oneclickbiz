import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET all registered platform users with organization and profiles
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const [users, invoices, pricingSetting] = await Promise.all([
      prisma.user.findMany({
        include: {
          memberships: {
            include: {
              organization: {
                include: {
                  profiles: true,
                  leads: true,
                  bookings: true,
                  orders: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.invoice.findMany({
        where: { status: 'PAID' },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.systemSetting.findUnique({
        where: { key: 'platform_pricing_settings' }
      })
    ]);

    const pricingCfg = (pricingSetting?.value as any) || {};
    const defaultTierPrices: Record<string, number> = {
      Basic: Number(pricingCfg.basicPrice) || 999,
      Pro: Number(pricingCfg.proPrice) || 1599,
      Advanced: Number(pricingCfg.advancedPrice) || 2199
    };

    const formatted = users.map(u => {
      const org = u.memberships[0]?.organization;
      const profile = org?.profiles[0];
      
      // Look up user's actual invoice amount paid
      const userInvoice = invoices.find(inv => inv.userId === u.id || (org && inv.organizationId === org.id));
      
      // Resolve tier consistently: Invoice planTier -> org.planId -> org.subscriptionStatus -> Basic
      const invoiceTier = userInvoice?.planTier?.toUpperCase();
      const orgPlan = (org?.planId || '').toUpperCase();
      const orgStatus = (org?.subscriptionStatus || '').toUpperCase();
      
      let tier: 'Basic' | 'Pro' | 'Advanced' = 'Basic';
      if (invoiceTier?.includes('ADVANCED') || orgPlan.includes('ADVANCED') || orgStatus.includes('ADVANCED')) {
        tier = 'Advanced';
      } else if (invoiceTier?.includes('PRO') || orgPlan.includes('PRO') || orgStatus.includes('PRO')) {
        tier = 'Pro';
      } else {
        tier = 'Basic';
      }
      
      const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
      const hasPaid = userInvoice?.status === 'PAID';
      const invoicePaidDate = userInvoice ? userInvoice.createdAt.getTime() : 0;
      const isWithinActiveYear = hasPaid && (Date.now() - invoicePaidDate < ONE_YEAR_MS);
      const isCancelled = orgStatus === 'CANCELLED' || orgStatus === 'SUSPENDED';
      
      let status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' = 'EXPIRED';
      if (isCancelled) {
        status = 'CANCELLED';
      } else if (isWithinActiveYear) {
        status = 'ACTIVE';
      } else {
        status = 'EXPIRED'; // STRICT: Unpaid OR Expired after 365 days, strictly EXPIRED/UNPAID
      }

      const planCost = hasPaid ? (userInvoice!.amount || defaultTierPrices[tier]) : defaultTierPrices[tier];
      const baseTime = userInvoice ? userInvoice.createdAt.getTime() : u.createdAt.getTime();
      const renewalDate = new Date(baseTime + ONE_YEAR_MS).toISOString().split('T')[0];

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        businessName: org?.name || `${u.name}'s Business`,
        slug: profile?.slug || 'profile',
        avatarUrl: u.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        role: u.role,
        planTier: tier,
        planCost,
        billingCycle: 'Annual',
        subscriptionStatus: status,
        hasPaidInvoice: isWithinActiveYear,
        joinedDate: u.createdAt.toISOString().split('T')[0],
        renewalDate,
        totalProfiles: org?.profiles.length || 0,
        totalTaps: 0,
        totalScans: profile?.viewCount || 0,
        totalOrders: org?.orders.length || 0,
        totalBookings: org?.bookings.length || 0,
      };
    });

    return NextResponse.json({ success: true, users: formatted });
  } catch (error: any) {
    console.error('Admin users API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH update user account moderation (Suspend / Block)
export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { userId, planTier, role, status, businessName } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        memberships: {
          include: {
            organization: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const org = user.memberships[0]?.organization;

    // Check if user has a verified paid online invoice within 365 days
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { userId: user.id },
          ...(org ? [{ organizationId: org.id }] : [])
        ],
        status: 'PAID'
      },
      orderBy: { createdAt: 'desc' }
    });

    const isInvoiceActive = paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS);

    let resolvedStatus: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | undefined = undefined;

    // STRICT NO-BYPASS: Check requested status
    if (status === 'ACTIVE' && !isInvoiceActive) {
      return NextResponse.json({ 
        error: 'Strict Policy Violation: Cannot activate account manually. The subscription is either unpaid or has expired. The member must renew their plan online via Cashfree.' 
      }, { status: 400 });
    }

    if (status === 'CANCELLED' || status === 'SUSPENDED') {
      resolvedStatus = 'CANCELLED';
    } else if (status === 'UNBLOCK' || status === 'RESTORE') {
      // Unblocking restores to ACTIVE only if within active paid year, otherwise remains EXPIRED/UNPAID
      resolvedStatus = isInvoiceActive ? 'ACTIVE' : 'EXPIRED';
    } else if (status === 'ACTIVE' && isInvoiceActive) {
      resolvedStatus = 'ACTIVE';
    }

    if (planTier && paidInvoice && !paidInvoice.planTier.toLowerCase().includes(planTier.toLowerCase())) {
      return NextResponse.json({
        error: 'Strict Policy Violation: Plan tiers are strictly locked to verified Cashfree gateway transactions.'
      }, { status: 400 });
    }

    if (role) {
      await prisma.user.update({
        where: { id: userId },
        data: { role }
      });
    }

    if (org?.id) {
      const updateData: any = {};
      if (businessName) updateData.name = businessName;
      if (resolvedStatus) {
        updateData.subscriptionStatus = resolvedStatus;
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.organization.update({
          where: { id: org.id },
          data: updateData
        });
      }
    }

    let statusMsg = 'User details updated successfully.';
    if (resolvedStatus === 'CANCELLED') {
      statusMsg = 'Account has been suspended/blocked.';
    } else if (status === 'UNBLOCK' || status === 'RESTORE') {
      statusMsg = resolvedStatus === 'ACTIVE'
        ? 'Account unblocked and restored to ACTIVE (Payment verified).'
        : 'Account unblocked. Status remains UNPAID until online payment is completed.';
    }

    return NextResponse.json({ 
      success: true, 
      status: resolvedStatus,
      message: statusMsg
    });
  } catch (error: any) {
    console.error('Admin update user error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
