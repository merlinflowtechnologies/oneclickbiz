import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { Coupon, PLATFORM_DEFAULT_COUPONS } from '@/lib/coupons';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SETTING_KEY = 'platform_custom_coupons';

async function getStoredCustomCoupons(): Promise<Coupon[]> {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: SETTING_KEY }
    });
    if (setting && Array.isArray(setting.value)) {
      return setting.value as unknown as Coupon[];
    }
  } catch (err) {
    console.error('Failed to load custom coupons from db:', err);
  }
  return [];
}

async function saveStoredCustomCoupons(coupons: Coupon[]): Promise<void> {
  const uniqueId = `setting_${SETTING_KEY}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  await prisma.systemSetting.upsert({
    where: { key: SETTING_KEY },
    update: { value: coupons as any },
    create: { 
      id: uniqueId,
      key: SETTING_KEY, 
      value: coupons as any 
    }
  });
}

// GET: Return all coupons (defaults + admin generated) and aggregate statistics
export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const customCoupons = await getStoredCustomCoupons();
    const allCoupons = [...customCoupons, ...PLATFORM_DEFAULT_COUPONS];

    const totalCoupons = allCoupons.length;
    const activeCoupons = allCoupons.filter(c => c.isActive).length;
    const totalRedemptions = allCoupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
    const estimatedSavings = allCoupons.reduce((sum, c) => {
      const avgDisc = c.discountType === 'FLAT' ? c.discountValue : 300;
      return sum + ((c.usedCount || 0) * avgDisc);
    }, 0);

    return NextResponse.json({
      success: true,
      coupons: allCoupons,
      metrics: {
        totalCoupons,
        activeCoupons,
        totalRedemptions,
        estimatedSavings
      }
    });
  } catch (err: any) {
    console.error('Fetch coupons error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// POST: Admin creates a new custom coupon
export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { 
      code, 
      discountType, 
      discountValue, 
      description, 
      applicablePlans, 
      assignedName,
      assignedEmail, 
      assignedPhone, 
      maxUsage, 
      expiryDate 
    } = body;

    if (!code || !discountValue) {
      return NextResponse.json({ error: 'Coupon code and discount value are required' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    if (cleanCode.length < 3) {
      return NextResponse.json({ error: 'Coupon code must be at least 3 alphanumeric characters' }, { status: 400 });
    }

    const customCoupons = await getStoredCustomCoupons();
    
    // Check if code already exists in default or custom list
    const existing = [...customCoupons, ...PLATFORM_DEFAULT_COUPONS].find(
      c => c.code.toUpperCase() === cleanCode
    );

    if (existing) {
      return NextResponse.json({ error: `Coupon code "${cleanCode}" already exists` }, { status: 409 });
    }

    const newCoupon: Coupon = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      code: cleanCode,
      discountType: discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'FLAT',
      discountValue: Number(discountValue),
      description: description || `Special ₹${discountValue} promotional discount`,
      applicablePlans: applicablePlans && applicablePlans.length > 0 ? applicablePlans : undefined,
      assignedName: assignedName ? assignedName.trim() : undefined,
      assignedEmail: assignedEmail ? assignedEmail.trim().toLowerCase() : undefined,
      assignedPhone: assignedPhone ? assignedPhone.trim() : undefined,
      maxUsage: maxUsage ? Number(maxUsage) : undefined,
      usedCount: 0,
      expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined,
      createdAt: new Date().toISOString(),
      createdBy: 'Super Admin',
      isActive: true
    };

    customCoupons.unshift(newCoupon);
    await saveStoredCustomCoupons(customCoupons);

    return NextResponse.json({
      success: true,
      message: `Coupon "${newCoupon.code}" created successfully!`,
      coupon: newCoupon
    });
  } catch (err: any) {
    console.error('Create coupon error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// PUT: Toggle status or update coupon details
export async function PUT(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const body = await req.json();
    const { id, code, isActive, maxUsage, expiryDate } = body;

    const customCoupons = await getStoredCustomCoupons();
    const idx = customCoupons.findIndex(c => (id && c.id === id) || (code && c.code === code));

    if (idx === -1) {
      return NextResponse.json({ error: 'Custom coupon not found or is a system default' }, { status: 404 });
    }

    if (isActive !== undefined) customCoupons[idx].isActive = Boolean(isActive);
    if (maxUsage !== undefined) customCoupons[idx].maxUsage = Number(maxUsage);
    if (expiryDate !== undefined) customCoupons[idx].expiryDate = expiryDate;

    await saveStoredCustomCoupons(customCoupons);

    return NextResponse.json({
      success: true,
      message: `Coupon "${customCoupons[idx].code}" updated successfully`,
      coupon: customCoupons[idx]
    });
  } catch (err: any) {
    console.error('Update coupon error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

// DELETE: Delete a custom coupon
export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);
    if (!auth.authorized) return auth.response!;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const code = searchParams.get('code');

    if (!id && !code) {
      return NextResponse.json({ error: 'Coupon id or code required' }, { status: 400 });
    }

    let customCoupons = await getStoredCustomCoupons();
    const initialLen = customCoupons.length;
    customCoupons = customCoupons.filter(c => (id ? c.id !== id : true) && (code ? c.code !== code : true));

    if (customCoupons.length === initialLen) {
      return NextResponse.json({ error: 'Coupon not found or cannot delete system default' }, { status: 404 });
    }

    await saveStoredCustomCoupons(customCoupons);

    return NextResponse.json({
      success: true,
      message: 'Coupon removed successfully'
    });
  } catch (err: any) {
    console.error('Delete coupon error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
