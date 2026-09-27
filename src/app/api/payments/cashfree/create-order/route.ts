import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { validateAndCalculateCoupon, Coupon } from '@/lib/coupons';

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
    const { planId, planName, price, customerName, customerEmail, customerPhone, couponCode } = body;

    if (!planId || !price) {
      return NextResponse.json({ error: 'Missing required plan details' }, { status: 400 });
    }

    // Secure server-side coupon calculation with dynamic admin coupons
    let finalOrderAmount = Number(price);
    let appliedCouponMessage: string | undefined = undefined;

    if (couponCode) {
      let customCoupons: Coupon[] = [];
      try {
        const setting = await prisma.systemSetting.findUnique({
          where: { key: 'platform_custom_coupons' }
        });
        if (setting && Array.isArray(setting.value)) {
          customCoupons = setting.value as unknown as Coupon[];
        }
      } catch (e) {
        console.error('Failed to load custom coupons in order creation:', e);
      }

      const couponResult = validateAndCalculateCoupon(
        couponCode, 
        Number(price), 
        planId, 
        customerEmail || session?.email, 
        customerPhone,
        customCoupons
      );

      if (couponResult.valid) {
        finalOrderAmount = couponResult.finalPrice;
        appliedCouponMessage = `Coupon ${couponResult.coupon?.code} applied (-₹${couponResult.discountAmount})`;
      }
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
      order_amount: finalOrderAmount,
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
      order_note: `OneClickBiz ${planName || planId} Plan Subscription ${appliedCouponMessage ? `(${appliedCouponMessage})` : ''}`
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
