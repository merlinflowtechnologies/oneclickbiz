import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    // Fetch all real invoices from DB
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Also fetch all organizations and users to enrich invoice info
    const users = await prisma.user.findMany({
      include: {
        memberships: {
          include: {
            organization: true
          }
        }
      }
    });

    const userMap = new Map<string, { name: string; email: string; businessName: string }>();
    users.forEach(u => {
      userMap.set(u.id, {
        name: u.name,
        email: u.email,
        businessName: u.memberships[0]?.organization?.name || `${u.name}'s Business`
      });
    });

    const formattedInvoices = invoices.map(inv => {
      const userInfo = inv.userId ? userMap.get(inv.userId) : null;
      const isComplimentary = inv.gateway === 'ADMIN_COMPLIMENTARY' || inv.amount === 0;

      return {
        invoiceId: inv.invoiceNumber,
        userName: userInfo?.name || 'Valued Subscriber',
        businessName: userInfo?.businessName || 'OneClickBiz Subscriber',
        email: userInfo?.email || 'customer@oneclickbiz.in',
        planTier: inv.planTier,
        amount: inv.amount,
        date: inv.createdAt.toISOString().split('T')[0],
        status: inv.status,
        gateway: inv.gateway || (isComplimentary ? 'ADMIN_COMPLIMENTARY' : 'Cashfree'),
        orderId: inv.orderId,
        paymentId: inv.paymentId,
        isComplimentary
      };
    });

    // Total actual collected revenue (excluding complimentary promo grants)
    const paidInvoices = invoices.filter(i => i.status === 'PAID' && i.amount > 0 && i.gateway !== 'ADMIN_COMPLIMENTARY');
    const complimentaryInvoices = invoices.filter(i => i.gateway === 'ADMIN_COMPLIMENTARY' || i.amount === 0);

    const totalRevenue = paidInvoices.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    const mrr = Math.round(totalRevenue / 12);
    const partnerShare70 = Number((totalRevenue * 0.70).toFixed(2));
    const merlinflowShare30 = Number((totalRevenue * 0.30).toFixed(2));

    return NextResponse.json({
      success: true,
      invoices: formattedInvoices,
      totalRevenue,
      mrr,
      partnerShare70,
      merlinflowShare30,
      totalPaidSubscribers: paidInvoices.length,
      totalComplimentaryUsers: complimentaryInvoices.length
    });

  } catch (error: any) {
    console.error('Admin revenue API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
