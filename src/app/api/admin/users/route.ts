import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, hashPassword } from '@/lib/auth';

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
      
      // Look up user's active invoice
      const userInvoice = invoices.find(inv => inv.userId === u.id || (org && inv.organizationId === org.id));
      
      // Resolve tier consistently
      const invoiceTier = userInvoice?.planTier?.toUpperCase() || '';
      const orgPlan = (org?.planId || '').toUpperCase();
      const orgStatus = (org?.subscriptionStatus || '').toUpperCase();
      
      let tier: 'Basic' | 'Pro' | 'Advanced' = 'Basic';
      if (invoiceTier.includes('ADVANCED') || orgPlan.includes('ADVANCED') || orgStatus.includes('ADVANCED')) {
        tier = 'Advanced';
      } else if (invoiceTier.includes('PRO') || orgPlan.includes('PRO') || orgStatus.includes('PRO')) {
        tier = 'Pro';
      } else {
        tier = 'Basic';
      }
      
      const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
      const hasPaid = userInvoice?.status === 'PAID';
      const invoicePaidDate = userInvoice ? userInvoice.createdAt.getTime() : 0;
      const isWithinActiveYear = hasPaid && (Date.now() - invoicePaidDate < ONE_YEAR_MS);
      const isCancelled = orgStatus === 'CANCELLED' || orgStatus === 'SUSPENDED';

      const isComplimentary = Boolean(
        userInvoice?.gateway === 'ADMIN_COMPLIMENTARY' ||
        userInvoice?.gateway === 'ADMIN_PROMO' ||
        (hasPaid && userInvoice?.amount === 0) ||
        orgPlan.includes('PROMO') ||
        orgPlan.includes('FREE')
      );
      
      let status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' = 'EXPIRED';
      if (isCancelled) {
        status = 'CANCELLED';
      } else if (isWithinActiveYear) {
        status = 'ACTIVE';
      } else {
        status = 'EXPIRED';
      }

      let paymentType: 'PAID_GATEWAY' | 'ADMIN_COMPLIMENTARY' | 'UNPAID' = 'UNPAID';
      if (status === 'ACTIVE') {
        paymentType = isComplimentary ? 'ADMIN_COMPLIMENTARY' : 'PAID_GATEWAY';
      } else if (hasPaid && isComplimentary) {
        paymentType = 'ADMIN_COMPLIMENTARY';
      } else if (hasPaid) {
        paymentType = 'PAID_GATEWAY';
      }

      const planCost = isComplimentary ? 0 : (hasPaid ? (userInvoice!.amount || defaultTierPrices[tier]) : 0);
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
        paymentType,
        gateway: isComplimentary ? 'ADMIN_COMPLIMENTARY' : (userInvoice?.gateway || 'Cashfree'),
        promoReason: isComplimentary ? (userInvoice?.paymentId?.replace('ADMIN_GRANT: ', '') || 'Admin Complimentary Promo') : undefined,
        invoiceNumber: userInvoice?.invoiceNumber,
        orderId: userInvoice?.orderId,
        paymentId: userInvoice?.paymentId,
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

// POST Create new user / Grant Free VIP Promotional Account
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { name, email, password, businessName, slug, planTier, promoReason, isFreePromo = true } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser) {
      return NextResponse.json({ error: 'A user with this email address already exists' }, { status: 400 });
    }

    // Sanitize slug
    const cleanSlug = (slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `user-${Date.now().toString().slice(-4)}`;

    const existingSlug = await prisma.profile.findUnique({ where: { slug: cleanSlug } });
    const finalSlug = existingSlug ? `${cleanSlug}-${Math.floor(100 + Math.random() * 900)}` : cleanSlug;

    const hashedPassword = await hashPassword(password);
    const tier = (planTier || 'Pro') as 'Basic' | 'Pro' | 'Advanced';

    // Create User, Org, and Profile in transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email: cleanEmail,
          passwordHash: hashedPassword,
          role: 'USER',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
        }
      });

      const org = await tx.organization.create({
        data: {
          name: businessName || `${name}'s Business`,
          slug: `${finalSlug}-org`,
          planId: isFreePromo ? `${tier}_PROMO` : tier,
          subscriptionStatus: 'ACTIVE',
          members: {
            create: {
              userId: user.id,
              role: 'ORG_ADMIN'
            }
          }
        }
      });

      const profile = await tx.profile.create({
        data: {
          organizationId: org.id,
          slug: finalSlug,
          name,
          designation: 'Business Owner',
          company: businessName || `${name}'s Business`,
          bio: 'Welcome to my digital profile! Connect with me instantly via WhatsApp, call, or email.',
          theme: 'obsidian-gold',
          avatarUrl: user.avatarUrl,
          email: cleanEmail,
          isPublished: true,
          socialLinks: {
            create: [
              { platform: 'whatsapp', url: 'https://wa.me/919876543210' },
              { platform: 'email', url: `mailto:${cleanEmail}` }
            ]
          }
        }
      });

      // If free promo or granted by admin, create complimentary 0-rupee invoice record for audit trail
      if (isFreePromo) {
        await tx.invoice.create({
          data: {
            invoiceNumber: `INV-PROMO-${Date.now().toString().slice(-6)}`,
            organizationId: org.id,
            userId: user.id,
            planTier: `${tier} (Complimentary Promo)`,
            amount: 0,
            currency: 'INR',
            status: 'PAID',
            gateway: 'ADMIN_COMPLIMENTARY',
            paymentId: `ADMIN_GRANT: ${promoReason || 'Promotional Free Access'}`,
            orderId: `FREE-PROMO-${finalSlug.toUpperCase()}`,
            taxAmount: 0,
            paidAt: new Date()
          }
        });
      }

      return { user, org, profile };
    });

    return NextResponse.json({
      success: true,
      message: `Account created successfully! ${isFreePromo ? 'VIP Free Promotional Access granted.' : ''}`,
      user: {
        id: newUser.user.id,
        name: newUser.user.name,
        email: newUser.user.email,
        slug: newUser.profile.slug,
        planTier: tier,
        subscriptionStatus: 'ACTIVE',
        paymentType: isFreePromo ? 'ADMIN_COMPLIMENTARY' : 'UNPAID'
      }
    });

  } catch (error: any) {
    console.error('Admin create user error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// PATCH update user account moderation / Grant Free Promo
export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { userId, planTier, role, status, businessName, grantFreePromo, promoReason } = body;

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

    // If granting Free VIP Promo to an existing user:
    if (grantFreePromo && org) {
      const tier = planTier || 'Pro';
      await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-PROMO-${Date.now().toString().slice(-6)}`,
          organizationId: org.id,
          userId: user.id,
          planTier: `${tier} (Complimentary Promo)`,
          amount: 0,
          currency: 'INR',
          status: 'PAID',
          gateway: 'ADMIN_COMPLIMENTARY',
          paymentId: `ADMIN_GRANT: ${promoReason || 'Promotional Free Access'}`,
          orderId: `FREE-PROMO-${Date.now()}`,
          taxAmount: 0,
          paidAt: new Date()
        }
      });

      await prisma.organization.update({
        where: { id: org.id },
        data: {
          subscriptionStatus: 'ACTIVE',
          planId: `${tier}_PROMO`
        }
      });

      return NextResponse.json({
        success: true,
        message: `Successfully granted Complimentary Free Promo (${tier}) to ${user.name}. (₹0 recorded, 0% revenue share deducted).`
      });
    }

    // Resolve or create user's organization if missing
    let targetOrg = org;
    if (!targetOrg) {
      const userProfile = await prisma.profile.findFirst({
        where: {
          OR: [
            { email: user.email },
            { id: user.id }
          ]
        },
        include: { organization: true }
      });
      if (userProfile?.organization) {
        targetOrg = userProfile.organization;
        await prisma.organizationMember.create({
          data: {
            organizationId: targetOrg.id,
            userId: user.id,
            role: 'ORG_OWNER'
          }
        }).catch(() => {});
      } else {
        const slugBase = (user.name || user.email.split('@')[0]).toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);
        const orgSlug = `${slugBase}-${Date.now().toString().slice(-4)}`;
        targetOrg = await prisma.organization.create({
          data: {
            name: businessName || `${user.name}'s Business`,
            slug: orgSlug,
            planId: 'Pro',
            subscriptionStatus: 'ACTIVE'
          }
        });
        await prisma.organizationMember.create({
          data: {
            organizationId: targetOrg.id,
            userId: user.id,
            role: 'ORG_OWNER'
          }
        }).catch(() => {});
      }
    }

    // Check if user has a verified paid online invoice within 365 days
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    const paidInvoice = await prisma.invoice.findFirst({
      where: {
        OR: [
          { userId: user.id },
          ...(targetOrg ? [{ organizationId: targetOrg.id }] : [])
        ],
        status: 'PAID'
      },
      orderBy: { createdAt: 'desc' }
    });

    const isInvoiceActive = paidInvoice && (Date.now() - paidInvoice.createdAt.getTime() < ONE_YEAR_MS);

    let resolvedStatus: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | undefined = undefined;

    if (status === 'CANCELLED' || status === 'SUSPENDED') {
      resolvedStatus = 'CANCELLED';
    } else if (planTier) {
      // Admin is assigning/updating plan tier: ensure user is ACTIVE unless explicitly cancelled
      resolvedStatus = 'ACTIVE';
    } else if (status === 'UNBLOCK' || status === 'RESTORE') {
      resolvedStatus = isInvoiceActive ? 'ACTIVE' : 'EXPIRED';
    } else if (status === 'ACTIVE') {
      resolvedStatus = 'ACTIVE';
    }

    if (role) {
      await prisma.user.update({
        where: { id: userId },
        data: { role }
      });
    }

    let updatedTier: string | undefined = undefined;

    if (targetOrg?.id) {
      const updateData: any = {};
      if (businessName) updateData.name = businessName;
      if (resolvedStatus) {
        updateData.subscriptionStatus = resolvedStatus;
      }

      if (planTier) {
        const rawUpper = String(planTier).toUpperCase();
        const cleanTier = rawUpper.includes('ADVANCED') ? 'Advanced' : rawUpper.includes('PRO') ? 'Pro' : 'Basic';
        updatedTier = cleanTier;
        updateData.planId = cleanTier;
        updateData.subscriptionStatus = resolvedStatus || 'ACTIVE';

        // Synchronize / create active paid invoice for this updated tier with fresh 1-year validity
        if (paidInvoice) {
          await prisma.invoice.update({
            where: { id: paidInvoice.id },
            data: {
              planTier: `${cleanTier} Plan (Admin Updated)`,
              status: 'PAID',
              createdAt: new Date(),
              paidAt: new Date()
            }
          });
        } else {
          await prisma.invoice.create({
            data: {
              invoiceNumber: `INV-ADMIN-${Date.now().toString().slice(-6)}`,
              organizationId: targetOrg.id,
              userId: user.id,
              planTier: `${cleanTier} Plan (Admin Assigned)`,
              amount: 0,
              currency: 'INR',
              status: 'PAID',
              gateway: 'ADMIN_COMPLIMENTARY',
              paymentId: `ADMIN_PLAN_UPDATE: ${cleanTier}`,
              orderId: `ADMIN-UPDATE-${Date.now()}`,
              taxAmount: 0,
              createdAt: new Date(),
              paidAt: new Date()
            }
          });
        }

        // Ensure all user's profiles are active & published
        await prisma.profile.updateMany({
          where: {
            OR: [
              { organizationId: targetOrg.id },
              { email: user.email }
            ]
          },
          data: { isPublished: true }
        }).catch(() => {});
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.organization.update({
          where: { id: targetOrg.id },
          data: updateData
        });
      }
    }

    let statusMsg = 'User details updated successfully.';
    if (resolvedStatus === 'CANCELLED') {
      statusMsg = 'Account has been suspended/blocked.';
    } else if (status === 'UNBLOCK' || status === 'RESTORE') {
      statusMsg = resolvedStatus === 'ACTIVE'
        ? 'Account unblocked and restored to ACTIVE.'
        : 'Account unblocked. Status remains UNPAID until online payment or promo grant.';
    } else if (updatedTier) {
      statusMsg = `Successfully updated plan to ${updatedTier} for ${user.name}.`;
    }

    return NextResponse.json({ 
      success: true, 
      status: resolvedStatus,
      planTier: updatedTier,
      message: statusMsg
    });
  } catch (error: any) {
    console.error('Admin update user error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
