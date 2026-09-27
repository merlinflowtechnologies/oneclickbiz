export interface Coupon {
  code: string;
  discountType: 'FLAT' | 'PERCENTAGE';
  discountValue: number; // in INR for FLAT, percentage for PERCENTAGE
  description: string;
  minPrice?: number;
  applicablePlans?: string[];
  isActive: boolean;
}

export const PLATFORM_COUPONS: Coupon[] = [
  {
    code: 'ONECLICK300',
    discountType: 'FLAT',
    discountValue: 300,
    description: 'Instant ₹300 Discount on all Annual Subscription Plans',
    isActive: true
  },
  {
    code: 'VIP500',
    discountType: 'FLAT',
    discountValue: 500,
    description: 'Special ₹500 OFF on Pro & Advanced Plans',
    applicablePlans: ['PRO', 'ADVANCED'],
    isActive: true
  },
  {
    code: 'STARTUP20',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    description: '20% Special Discount for Startups & Local SMBs',
    isActive: true
  }
];

export interface CouponApplicationResult {
  valid: boolean;
  error?: string;
  coupon?: Coupon;
  discountAmount: number;
  finalPrice: number;
  message?: string;
}

export function validateAndCalculateCoupon(
  code: string,
  originalPrice: number,
  planId?: string
): CouponApplicationResult {
  if (!code || !code.trim()) {
    return {
      valid: false,
      error: 'Please enter a coupon code.',
      discountAmount: 0,
      finalPrice: originalPrice
    };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = PLATFORM_COUPONS.find(c => c.code === cleanCode && c.isActive);

  if (!coupon) {
    return {
      valid: false,
      error: `Coupon "${cleanCode}" is invalid or expired.`,
      discountAmount: 0,
      finalPrice: originalPrice
    };
  }

  if (coupon.applicablePlans && planId) {
    const cleanPlan = planId.toUpperCase();
    if (!coupon.applicablePlans.includes(cleanPlan)) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" is only applicable to ${coupon.applicablePlans.join(' & ')} plans.`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  let discountAmount = 0;
  if (coupon.discountType === 'FLAT') {
    discountAmount = coupon.discountValue;
  } else if (coupon.discountType === 'PERCENTAGE') {
    discountAmount = Math.round((originalPrice * coupon.discountValue) / 100);
  }

  // Ensure price cannot drop below ₹1
  const finalPrice = Math.max(1, originalPrice - discountAmount);

  return {
    valid: true,
    coupon,
    discountAmount,
    finalPrice,
    message: `Coupon "${coupon.code}" applied! You saved ₹${discountAmount.toLocaleString()} 🎉`
  };
}
