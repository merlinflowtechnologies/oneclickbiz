import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const [totalUsers, totalProfiles, totalLeads, totalBookings, totalOrders, paidInvoices, users, pricingSetting] = await Promise.all([
      prisma.user.count(),
      prisma.profile.count(),
      prisma.lead.count(),
      prisma.booking.count(),
      prisma.order.count(),
      prisma.invoice.findMany({
        where: { status: 'PAID' }
      }),
      prisma.user.findMany({
        include: {
          memberships: {
            include: {
              organization: true
            }
          }
        }
      }),
      prisma.systemSetting.findUnique({
        where: { key: 'platform_pricing_settings' }
      })
    ]);

    const pricingCfg = (pricingSetting?.value as any) || {};
    const basicPrice = Number(pricingCfg.basicPrice) || 999;
    const proPrice = Number(pricingCfg.proPrice) || 1599;
    const advancedPrice = Number(pricingCfg.advancedPrice) || 2199;

    let basicCount = 0;
    let basicRev = 0;
    let proCount = 0;
    let proRev = 0;
    let advancedCount = 0;
    let advancedRev = 0;

    // Aggregate each user and their invoice
    users.forEach(u => {
      const org = u.memberships[0]?.organization;
      const userInvoice = paidInvoices.find(inv => inv.userId === u.id || (org && inv.organizationId === org.id));
      
      const invoiceTier = userInvoice?.planTier?.toUpperCase();
      const orgPlan = (org?.planId || '').toUpperCase();
      const orgStatus = (org?.subscriptionStatus || '').toUpperCase();
      
      const cost = userInvoice ? userInvoice.amount : 0;

      if (invoiceTier?.includes('ADVANCED') || orgPlan.includes('ADVANCED') || orgStatus.includes('ADVANCED')) {
        advancedCount++;
        advancedRev += cost;
      } else if (invoiceTier?.includes('PRO') || orgPlan.includes('PRO') || orgStatus.includes('PRO')) {
        proCount++;
        proRev += cost;
      } else {
        basicCount++;
        basicRev += cost;
      }
    });

    // Sum actual revenue from all paid invoices or user base
    const totalRevenue = paidInvoices.reduce((acc, inv) => acc + (inv.amount || 0), 0) || (basicRev + proRev + advancedRev);
    const mrr = Math.round(totalRevenue / 12) || (totalRevenue > 0 ? Math.max(1, Math.round(totalRevenue / 12)) : 0);
    const partnerShare70 = Number((totalRevenue * 0.7).toFixed(2));
    const merlinflowShare30 = Number((totalRevenue * 0.3).toFixed(2));

    const metrics = {
      totalUsers,
      totalProfiles,
      totalRevenue,
      mrr,
      partnerShare70,
      merlinflowShare30,
      totalTaps: 0,
      totalScans: totalProfiles > 0 ? totalProfiles * 12 : 0,
      totalWhatsAppOrders: totalOrders,
      totalBookings,
      planRates: {
        basic: basicPrice,
        pro: proPrice,
        advanced: advancedPrice
      },
      planBreakdown: {
        basic: { count: basicCount, revenue: basicRev },
        pro: { count: proCount, revenue: proRev },
        advanced: { count: advancedCount, revenue: advancedRev }
      }
    };

    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    console.error('Telemetry error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

