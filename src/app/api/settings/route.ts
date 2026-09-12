import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Public endpoint to read current active subscription pricing
export async function GET(req: NextRequest) {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'platform_pricing_settings' }
    });

    const val = setting?.value as any;

    const config = {
      basicPrice: val?.basicPrice ? Number(val.basicPrice) : 999,
      proPrice: val?.proPrice ? Number(val.proPrice) : 1599,
      advancedPrice: val?.advancedPrice ? Number(val.advancedPrice) : 2199,
      allowPublicSignup: val?.allowPublicSignup !== undefined ? val.allowPublicSignup : true,
      requireEmailVerification: val?.requireEmailVerification !== undefined ? val.requireEmailVerification : false
    };

    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    console.error('Fetch public settings error:', error);
    return NextResponse.json({
      success: true,
      config: {
        basicPrice: 999,
        proPrice: 1599,
        advancedPrice: 2199,
        allowPublicSignup: true,
        requireEmailVerification: false
      }
    });
  }
}
