export interface Coupon {
  id?: string;
  code: string;
  discountType: 'FLAT' | 'PERCENTAGE';
  discountValue: number; // in INR for FLAT, percentage for PERCENTAGE
  description: string;
  minPrice?: number;
  applicablePlans?: string[]; // e.g. ['BASIC', 'PRO', 'ADVANCED']
  assignedEmail?: string; // If set, only this email can redeem
  assignedPhone?: string; // If set, only this phone can redeem
  assignedName?: string; // Name of person this was issued for
  maxUsage?: number; // Maximum times this coupon can be used (e.g. 1 for single-use)
  usedCount: number; // Current redemption count
  expiryDate?: string; // ISO date string
  createdAt?: string;
  createdBy?: string;
  isActive: boolean;
}

export const PLATFORM_DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'c_default_01',
    code: 'ONECLICK300',
    discountType: 'FLAT',
    discountValue: 300,
    description: 'Instant ₹300 Discount on all Annual Subscription Plans',
    usedCount: 14,
    isActive: true,
    createdBy: 'System Default'
  },
  {
    id: 'c_default_02',
    code: 'VIP500',
    discountType: 'FLAT',
    discountValue: 500,
    description: 'Special ₹500 OFF on Pro & Advanced Plans',
    applicablePlans: ['PRO', 'ADVANCED'],
    usedCount: 9,
    isActive: true,
    createdBy: 'System Default'
  },
  {
    id: 'c_default_03',
    code: 'STARTUP20',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    description: '20% Special Discount for Startups & Local SMBs',
    usedCount: 5,
    isActive: true,
    createdBy: 'System Default'
  }
];

export const PLATFORM_COUPONS = PLATFORM_DEFAULT_COUPONS;

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
  planId?: string,
  userEmail?: string,
  userPhone?: string,
  customCouponsList?: Coupon[]
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
  const pool = [...(customCouponsList || []), ...PLATFORM_DEFAULT_COUPONS];
  const coupon = pool.find(c => c.code.toUpperCase() === cleanCode && c.isActive);

  if (!coupon) {
    return {
      valid: false,
      error: `Coupon "${cleanCode}" is invalid or has expired.`,
      discountAmount: 0,
      finalPrice: originalPrice
    };
  }

  // Check Expiry Date
  if (coupon.expiryDate) {
    const exp = new Date(coupon.expiryDate).getTime();
    if (Date.now() > exp) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" expired on ${new Date(coupon.expiryDate).toLocaleDateString()}.`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  // Check Max Usage Limits
  if (coupon.maxUsage && coupon.maxUsage > 0) {
    if (coupon.usedCount >= coupon.maxUsage) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" has reached its maximum usage limit (${coupon.maxUsage} uses).`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  // Check Specific User Email Assignment
  if (coupon.assignedEmail && coupon.assignedEmail.trim()) {
    const targetEmail = coupon.assignedEmail.trim().toLowerCase();
    const providedEmail = (userEmail || '').trim().toLowerCase();
    if (providedEmail && providedEmail !== targetEmail) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" is exclusive to ${coupon.assignedName || coupon.assignedEmail}.`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  // Check Specific User Phone Assignment
  if (coupon.assignedPhone && coupon.assignedPhone.trim()) {
    const cleanAssignedPhone = coupon.assignedPhone.replace(/\D/g, '').slice(-10);
    const cleanProvidedPhone = (userPhone || '').replace(/\D/g, '').slice(-10);
    if (cleanProvidedPhone && cleanAssignedPhone && cleanProvidedPhone !== cleanAssignedPhone) {
      return {
        valid: false,
        error: `Coupon "${cleanCode}" is exclusive to the designated recipient contact.`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  // Check Plan Restrictions
  if (coupon.applicablePlans && coupon.applicablePlans.length > 0 && planId) {
    const cleanPlan = planId.toUpperCase();
    const allowed = coupon.applicablePlans.map(p => p.toUpperCase());
    if (!allowed.includes(cleanPlan)) {
      const planNames = coupon.applicablePlans.map(p => {
        const up = p.toUpperCase();
        if (up === 'BASIC') return 'Basic (₹999)';
        if (up === 'PRO') return 'Pro (₹1,599)';
        if (up === 'ADVANCED') return 'Advanced (₹2,199)';
        return p;
      }).join(' or ');

      return {
        valid: false,
        error: `Coupon "${cleanCode}" is only applicable to ${planNames} subscriptions. Please choose ${planNames} to redeem.`,
        discountAmount: 0,
        finalPrice: originalPrice
      };
    }
  }

  // Calculate Discount
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
