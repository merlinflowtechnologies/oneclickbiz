export type PlanTierType = 'BASIC' | 'PRO' | 'ADVANCED';

export interface PlanLimits {
  tier: PlanTierType;
  name: string;
  price: number;
  maxCards: number;
  maxCustomDomains: number;
  maxVideos: number;
  maxDirectVideoUploads: number;
  maxPortfolioItems: number;
  canAccessStore: boolean;
  canAccessBookings: boolean;
  canAccessBrochures: boolean;
  canAccessLeadsExport: boolean;
  canAccessCustomDomain: boolean;
  canAccessBlogs: boolean;
  canUpload4KVideo: boolean;
  hasVipSla: boolean;
}

export const PLAN_LIMITS: Record<PlanTierType, PlanLimits> = {
  BASIC: {
    tier: 'BASIC',
    name: 'Basic Plan',
    price: 999,
    maxCards: 1,
    maxCustomDomains: 0,
    maxVideos: 3,
    maxDirectVideoUploads: 0,
    maxPortfolioItems: 5,
    canAccessStore: false,
    canAccessBookings: false,
    canAccessBrochures: false,
    canAccessLeadsExport: false,
    canAccessCustomDomain: false,
    canAccessBlogs: false,
    canUpload4KVideo: false,
    hasVipSla: false
  },
  PRO: {
    tier: 'PRO',
    name: 'Pro Plan',
    price: 1599,
    maxCards: 3,
    maxCustomDomains: 1,
    maxVideos: 10,
    maxDirectVideoUploads: 3,
    maxPortfolioItems: 25,
    canAccessStore: true,
    canAccessBookings: true,
    canAccessBrochures: true,
    canAccessLeadsExport: true,
    canAccessCustomDomain: true,
    canAccessBlogs: false,
    canUpload4KVideo: false,
    hasVipSla: false
  },
  ADVANCED: {
    tier: 'ADVANCED',
    name: 'Advanced Plan',
    price: 2199,
    maxCards: 5,
    maxCustomDomains: 5,
    maxVideos: 999,
    maxDirectVideoUploads: 25,
    maxPortfolioItems: 50,
    canAccessStore: true,
    canAccessBookings: true,
    canAccessBrochures: true,
    canAccessLeadsExport: true,
    canAccessCustomDomain: true,
    canAccessBlogs: true,
    canUpload4KVideo: true,
    hasVipSla: true
  }
};

export function normalizePlanTier(rawPlan?: string | null): PlanTierType {
  if (!rawPlan) return 'PRO';
  const clean = rawPlan.toUpperCase().trim();
  if (clean === 'BASIC' || clean === 'STARTER') return 'BASIC';
  if (clean === 'ADVANCED' || clean === 'ENTERPRISE' || clean === 'ELITE') return 'ADVANCED';
  return 'PRO';
}

export function getCurrentUserPlan(): PlanTierType {
  if (typeof window === 'undefined') return 'PRO';
  try {
    const directPlan = localStorage.getItem('oneclickbiz_user_plan');
    if (directPlan) return normalizePlanTier(directPlan);

    const session = localStorage.getItem('oneclickbiz_user_session');
    if (session) {
      const parsed = JSON.parse(session);
      if (parsed.plan) return normalizePlanTier(parsed.plan);
    }
  } catch (e) {
    console.error('Error reading user plan:', e);
  }
  return 'PRO';
}

export function getUserPlanLimits(rawPlan?: string | null): PlanLimits {
  const tier = rawPlan ? normalizePlanTier(rawPlan) : getCurrentUserPlan();
  return PLAN_LIMITS[tier];
}
