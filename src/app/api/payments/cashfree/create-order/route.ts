import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

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
    const { planId, planName, price, customerName, customerEmail, customerPhone } = body;

    if (!planId || !price) {
      return NextResponse.json({ error: 'Missing required plan details' }, { status: 400 });
    }

    const orderId = `order_${(planId || 'pro').toLowerCase()}_${Date.now()}`;
    const cleanPhone = (customerPhone || '9876543210').replace(/\D/g, '').slice(-10) || '9876543210';
    const cleanEmail = customerEmail || (session?.email) || 'billing@oneclickbiz.in';
    const cleanName = customerName || 'OneClickBiz Customer';
    const cleanCustomerId = session?.userId || `cust_${Date.now()}`;

    // Cashfree Production requires https:// for return_url and notify_url
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'oneclickbiz.in';
    const appUrl = (CASHFREE_ENV === 'production' || !host.includes('localhost'))
      ? `https://${host.replace(/:\d+$/, '')}`
      : `http://${host}`;

    const splitVendorId = process.env.CASHFREE_SPLIT_VENDOR_ID;
    const splitPercentage = Number(process.env.CASHFREE_SPLIT_PERCENTAGE) || 30; // default 30% Merlinflow share

    const orderPayload: Record<string, any> = {
      order_id: orderId,
      order_amount: Number(price),
      order_currency: 'INR',
      customer_details: {
        customer_id: cleanCustomerId,
        customer_name: cleanName,
        customer_email: cleanEmail,
        customer_phone: cleanPhone
      },
      order_meta: {
        return_url: `${appUrl}/dashboard/settings?cashfree_order_id={order_id}&status={order_status}`,
        notify_url: `${appUrl}/api/payments/cashfree/webhook`
      },
      order_note: `OneClickBiz ${planName || planId} Plan Subscription`
    };

    // If Easy Split Vendor is activated in Cashfree, attach automatic split instruction
    if (splitVendorId) {
      orderPayload.order_splits = [
        {
          vendor_id: splitVendorId,
          percentage: splitPercentage
        }
      ];
    }

    const res = await fetch(`${CASHFREE_API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Cashfree Order Creation Error:', data);
      return NextResponse.json({ 
        error: data.message || 'Failed to create Cashfree order',
        details: data 
      }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
      orderStatus: data.order_status,
      environment: CASHFREE_ENV
    });

  } catch (err: any) {
    console.error('Cashfree Create Order Exception:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
