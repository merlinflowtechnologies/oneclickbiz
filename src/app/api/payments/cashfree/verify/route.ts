import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
const CASHFREE_ENV = process.env.CASHFREE_ENVIRONMENT || 'production';

const CASHFREE_API_BASE = CASHFREE_ENV === 'production'
  ? 'https://api.cashfree.com/pg'
  : 'https://sandbox.cashfree.com/pg';

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    const body = await req.json();
    const { orderId, planId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Call Cashfree API to verify the actual payment status
    const res = await fetch(`${CASHFREE_API_BASE}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Failed to verify order with Cashfree' }, { status: res.status });
    }

    const isPaid = data.order_status === 'PAID';

    if (isPaid) {
      const targetPlan = (planId || 'PRO').toUpperCase();
      let userId = session?.userId;
      let orgId = session?.organizationId;

      // If session is missing or organizationId not found, look up user by customer email from Cashfree
      const customerEmail = data.customer_details?.customer_email?.toLowerCase().trim();
      if ((!userId || !orgId) && customerEmail) {
        const foundUser = await prisma.user.findUnique({
          where: { email: customerEmail },
          include: { memberships: true }
        });
        if (foundUser) {
          userId = foundUser.id;
          orgId = foundUser.memberships[0]?.organizationId;
        }
      }

      // Update Organization Plan if organization exists and publish profile
      if (orgId) {
        await prisma.organization.update({
          where: { id: orgId },
          data: {
            planId: targetPlan,
            subscriptionStatus: 'ACTIVE'
          }
        });

        // Publish all profiles in this organization upon verified payment
        await prisma.profile.updateMany({
          where: { organizationId: orgId },
          data: {
            isPublished: true
          }
        });
      }

      // Upsert/Create Invoice Record
      let invoice = await prisma.invoice.findFirst({
        where: { orderId: data.order_id }
      });

      if (!invoice) {
        invoice = await prisma.invoice.create({
          data: {
            invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            organizationId: orgId || 'org_default',
            userId: userId,
            planTier: targetPlan,
            amount: data.order_amount || 0,
            currency: data.order_currency || 'INR',
            status: 'PAID',
            gateway: 'Cashfree',
            paymentId: data.order_id,
            orderId: data.order_id
          }
        });
      }

      return NextResponse.json({
        success: true,
        isPaid: true,
        orderStatus: data.order_status,
        orderAmount: data.order_amount,
        plan: targetPlan,
        invoice
      });
    }

    return NextResponse.json({
      success: isPaid,
      isPaid,
      orderStatus: data.order_status,
      orderAmount: data.order_amount
    });

  } catch (err: any) {
    console.error('Cashfree Verify Exception:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
