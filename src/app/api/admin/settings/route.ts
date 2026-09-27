import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const setting = await prisma.systemSetting.findUnique({
      where: { key: 'platform_pricing_settings' }
    });

    const config = setting ? setting.value : {
      basicPrice: '999',
      proPrice: '1599',
      advancedPrice: '2199',
      allowPublicSignup: true,
      requireEmailVerification: false
    };

    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    console.error('Fetch settings error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();

    const updated = await prisma.systemSetting.upsert({
      where: { key: 'platform_pricing_settings' },
      update: { value: body },
      create: { 
        id: `setting_pricing_${Date.now()}`,
        key: 'platform_pricing_settings', 
        value: body 
      }
    });

    return NextResponse.json({ success: true, config: updated.value });
  } catch (error: any) {
    console.error('Save settings error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
