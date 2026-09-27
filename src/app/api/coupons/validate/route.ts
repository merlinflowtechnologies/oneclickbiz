import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAndCalculateCoupon, Coupon } from '@/lib/coupons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, price, planId, email, phone } = body;

    if (!code || !price) {
      return NextResponse.json({ error: 'Code and price are required' }, { status: 400 });
    }

    let customCoupons: Coupon[] = [];
    try {
      const setting = await prisma.systemSetting.findUnique({
        where: { key: 'platform_custom_coupons' }
      });
      if (setting && Array.isArray(setting.value)) {
        customCoupons = setting.value as unknown as Coupon[];
      }
    } catch (e) {
      console.error('Failed to load custom coupons in validation endpoint:', e);
    }

    const result = validateAndCalculateCoupon(
      code,
      Number(price),
      planId,
      email,
      phone,
      customCoupons
    );

    return NextResponse.json({
      success: result.valid,
      result
    });
  } catch (err: any) {
    console.error('Coupon validation exception:', err);
    return NextResponse.json({ error: err.message || 'Validation failed' }, { status: 500 });
  }
}
