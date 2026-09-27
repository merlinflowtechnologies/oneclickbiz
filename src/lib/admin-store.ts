export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  businessName: string;
  slug: string;
  avatarUrl: string;
  role: 'USER' | 'ORG_ADMIN' | 'SUPER_ADMIN';
  planTier: 'Basic' | 'Pro' | 'Advanced';
  planCost: number; // in INR (0 for complimentary)
  billingCycle: 'Annual' | 'Monthly' | 'Lifetime';
  subscriptionStatus: 'ACTIVE' | 'TRIAL' | 'EXPIRED' | 'CANCELLED';
  joinedDate: string;
  renewalDate: string;
  totalProfiles: number;
  totalTaps: number;
  totalScans: number;
  totalOrders: number;
  totalBookings: number;
  hasPaidInvoice?: boolean;
  paymentType?: 'PAID_GATEWAY' | 'ADMIN_COMPLIMENTARY' | 'UNPAID';
  gateway?: string;
  promoReason?: string;
  orderId?: string;
  paymentId?: string;
  invoiceNumber?: string;
}

export interface PlatformMetrics {
  totalUsers: number;
  totalProfiles: number;
  totalRevenue: number;
  mrr: number;
  partnerShare70?: number;
  merlinflowShare30?: number;
  totalTaps: number;
  totalScans: number;
  totalWhatsAppOrders: number;
  totalBookings: number;
  totalPaidSubscribers?: number;
  totalComplimentaryUsers?: number;
  planRates?: {
    basic: number;
    pro: number;
    advanced: number;
  };
  planBreakdown: {
    basic: { count: number; revenue: number };
    pro: { count: number; revenue: number };
    advanced: { count: number; revenue: number };
  };
}

export const SEED_ADMIN_USERS: AdminUserRecord[] = [];

export const PLATFORM_SUMMARY_METRICS: PlatformMetrics = {
  totalUsers: 0,
  totalProfiles: 0,
  totalRevenue: 0,
  mrr: 0,
  partnerShare70: 0,
  merlinflowShare30: 0,
  totalTaps: 0,
  totalScans: 0,
  totalWhatsAppOrders: 0,
  totalBookings: 0,
  totalPaidSubscribers: 0,
  totalComplimentaryUsers: 0,
  planRates: {
    basic: 999,
    pro: 1599,
    advanced: 2199
  },
  planBreakdown: {
    basic: { count: 0, revenue: 0 },
    pro: { count: 0, revenue: 0 },
    advanced: { count: 0, revenue: 0 }
  }
};
