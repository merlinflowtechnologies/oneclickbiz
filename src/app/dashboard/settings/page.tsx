'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Settings, 
  Globe, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Check, 
  Key, 
  Save,
  Crown,
  Sparkles,
  Zap,
  HardDrive,
  Download,
  Receipt,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  HelpCircle,
  X,
  Lock,
  Loader2,
  QrCode,
  Smartphone,
  Copy,
  Search,
  ChevronDown,
  AlertCircle,
  User,
  Camera,
  Upload,
  Tag,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { exportInvoicePDF } from '@/lib/pdf-export';
import { initiateCashfreePayment } from '@/lib/cashfree-client';
import { validateAndCalculateCoupon, PLATFORM_COUPONS, CouponApplicationResult } from '@/lib/coupons';

interface InvoiceItem {
  id: string;
  date: string;
  amount: string;
  status: string;
  plan: string;
}

interface PlanTier {
  id: 'BASIC' | 'PRO' | 'ADVANCED';
  name: string;
  tagline: string;
  price: number;
  badge: string;
  popular?: boolean;
  features: string[];
}

const DEFAULT_PLAN_TIERS: PlanTier[] = [
  {
    id: 'BASIC',
    name: 'Basic Plan',
    tagline: 'Essential digital identity, dynamic QR code & portfolio.',
    price: 999,
    badge: 'Starter Value',
    features: [
      '1 Digital Business Profile & vCard',
      '3 Video / Reel uploads (Local & YouTube)',
      '5 Portfolio showcase items',
      'Dynamic QR code generation & scan tracking',
      'Direct Contact Download (VCF)',
      'Standard visitor analytics'
    ]
  },
  {
    id: 'PRO',
    name: 'Pro Plan',
    tagline: 'High-conversion toolkit for growing businesses & consultants.',
    price: 1599,
    badge: 'Most Popular',
    popular: true,
    features: [
      '1 Custom Domain CNAME (White-Label)',
      'Unlimited WhatsApp Store Catalog & Ordering',
      '10 High-definition video uploads & streaming',
      '25 Portfolio gallery items with zoom lightbox',
      'Real-time appointment slot booking engine',
      'Inquiries & Captured Leads pipeline CRM',
      'PDF Data Reporting & Exporting Suite',
      'Priority WhatsApp & email support'
    ]
  },
  {
    id: 'ADVANCED',
    name: 'Advanced Plan',
    tagline: 'All-inclusive suite with white-label branding, 4K storage & multi-profile.',
    price: 2199,
    badge: 'All-Inclusive Elite',
    features: [
      '5 White-Label Custom Domains & Full SSL',
      'Unlimited High-Definition 4K Video Streaming',
      '50+ Dynamic Portfolio Showcase with Tags',
      '5 Team / Staff Member Smart Profiles',
      'Custom Blog & Article Publishing Studio',
      'Dedicated Account Manager & 24/7 SLA'
    ]
  }
];

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tiers, setTiers] = useState<PlanTier[]>(DEFAULT_PLAN_TIERS);
  const [orgName, setOrgName] = useState('Himastech Digital Reality');
  const [customDomain, setCustomDomain] = useState('cards.himastech.com');
  const [isSaved, setIsSaved] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'BASIC' | 'PRO' | 'ADVANCED'>('PRO');
  
  // Checkout & Billing Modal State
  const [checkoutPlan, setCheckoutPlan] = useState<{ id: 'BASIC' | 'PRO' | 'ADVANCED'; name: string; price: number } | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billingName, setBillingName] = useState('Kishore Patel');
  const [billingEmail, setBillingEmail] = useState('kishore@himastech.com');
  const [billingPhone, setBillingPhone] = useState('+91 98765 43210');
  const [billingGst, setBillingGst] = useState('29ABCDE1234F1Z5');
  const [accountAvatar, setAccountAvatar] = useState('/kishore-profile-v2.png');
  const [accountDesignation, setAccountDesignation] = useState('Founder & Managing Director');
  const [showAvatarPresets, setShowAvatarPresets] = useState(false);
  const avatarFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'INV-2026-8942',
      date: 'Aug 15, 2026',
      amount: '₹1,599.00',
      status: 'PAID',
      plan: 'Pro Plan (Annual Subscription)'
    },
    {
      id: 'INV-2025-4120',
      date: 'Aug 15, 2025',
      amount: '₹1,599.00',
      status: 'PAID',
      plan: 'Pro Plan (Annual Subscription)'
    }
  ]);

  useEffect(() => {
    async function loadDynamicPricing() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            const bPrice = Number(data.config.basicPrice) || 999;
            const pPrice = Number(data.config.proPrice) || 1599;
            const aPrice = Number(data.config.advancedPrice) || 2199;
            setTiers(prev => prev.map(t => {
              if (t.id === 'BASIC') return { ...t, price: bPrice };
              if (t.id === 'PRO') return { ...t, price: pPrice };
              if (t.id === 'ADVANCED') return { ...t, price: aPrice };
              return t;
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic pricing:', err);
      }
    }
    loadDynamicPricing();

    if (typeof window !== 'undefined') {
      try {
        const savedPlan = localStorage.getItem('oneclickbiz_user_plan');
        if (savedPlan === 'BASIC' || savedPlan === 'PRO' || savedPlan === 'ADVANCED') {
          setCurrentPlan(savedPlan);
        } else if (savedPlan === 'STARTER') {
          setCurrentPlan('BASIC');
        } else if (savedPlan === 'ENTERPRISE') {
          setCurrentPlan('ADVANCED');
        }

        const session = localStorage.getItem('oneclickbiz_user_session');
        if (session) {
          const parsed = JSON.parse(session);
          if (parsed.businessName) setOrgName(parsed.businessName);
          if (parsed.fullName) {
            setBillingName(parsed.fullName);
          }
          if (parsed.email) setBillingEmail(parsed.email);
          if (parsed.phone) setBillingPhone(parsed.phone);
          if (parsed.avatarUrl) setAccountAvatar(parsed.avatarUrl);
          if (parsed.designation) setAccountDesignation(parsed.designation);
        }

        // Auto-open Checkout Modal if navigated from business registration
        const paramCheckout = searchParams.get('checkout');
        const paramPlan = searchParams.get('plan');
        const paramName = searchParams.get('name');
        const paramBiz = searchParams.get('biz');

        if (paramBiz) setOrgName(decodeURIComponent(paramBiz));
        if (paramName) {
          setBillingName(decodeURIComponent(paramName));
        }

        if (paramCheckout === 'true') {
          const rawPlan = (paramPlan || 'PRO').toUpperCase();
          const targetPlan = rawPlan === 'BASIC' ? DEFAULT_PLAN_TIERS[0] : rawPlan === 'ADVANCED' ? DEFAULT_PLAN_TIERS[2] : DEFAULT_PLAN_TIERS[1];
          setCheckoutPlan(targetPlan);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [searchParams]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    if (typeof window !== 'undefined') {
      try {
        const session = localStorage.getItem('oneclickbiz_user_session');
        const parsed = session ? JSON.parse(session) : {};
        parsed.businessName = orgName;
        parsed.fullName = billingName;
        parsed.email = billingEmail;
        parsed.phone = billingPhone;
        parsed.avatarUrl = accountAvatar;
        parsed.designation = accountDesignation;
        localStorage.setItem('oneclickbiz_user_session', JSON.stringify(parsed));

        // Also update primary card avatar in user_cards if exists
        const storedCards = localStorage.getItem('oneclickbiz_user_cards');
        if (storedCards) {
          const cards = JSON.parse(storedCards);
          const updatedCards = cards.map((c: any) => ({ ...c, avatarUrl: accountAvatar, name: billingName }));
          localStorage.setItem('oneclickbiz_user_cards', JSON.stringify(updatedCards));
        }
      } catch (e) {
        console.error(e);
      }
    }
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Coupon State
  const [couponInput, setCouponInput] = useState('ONECLICK300');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponApplicationResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Open Billing Checkout Modal
  const handleInitiateSwitch = (plan: { id: 'BASIC' | 'PRO' | 'ADVANCED'; name: string; price: number }) => {
    setCheckoutPlan(plan);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
    setCouponError(null);
    // Auto apply ONECLICK300 promo on checkout open
    const defaultRes = validateAndCalculateCoupon('ONECLICK300', plan.price, plan.id);
    if (defaultRes.valid) {
      setAppliedCoupon(defaultRes);
    } else {
      setAppliedCoupon(null);
    }
  };

  const handleApplyCustomCoupon = (codeToApply?: string) => {
    const code = (codeToApply !== undefined ? codeToApply : couponInput).trim();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      setAppliedCoupon(null);
      return;
    }
    if (!checkoutPlan) return;
    const res = validateAndCalculateCoupon(code, checkoutPlan.price, checkoutPlan.id);
    if (res.valid) {
      setAppliedCoupon(res);
      setCouponError(null);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      setAppliedCoupon(null);
      setCouponError(res.error || 'Invalid or expired coupon code.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  // Launch Cashfree Automated Checkout Modal
  const handlePayWithCashfree = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!checkoutPlan) return;
    setIsProcessingPayment(true);

    const finalPayablePrice = appliedCoupon?.valid ? appliedCoupon.finalPrice : checkoutPlan.price;

    try {
      const res = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: checkoutPlan.id,
          planName: checkoutPlan.name,
          price: checkoutPlan.price,
          couponCode: appliedCoupon?.valid ? appliedCoupon.coupon?.code : undefined,
          customerName: billingName,
          customerEmail: billingEmail,
          customerPhone: billingPhone
        })
      });

      const data = await res.json();
      if (!res.ok || !data.paymentSessionId) {
        alert(data.error || 'Failed to initialize Cashfree gateway');
        setIsProcessingPayment(false);
        return;
      }

      // Launch Cashfree Modal
      await initiateCashfreePayment({
        paymentSessionId: data.paymentSessionId,
        mode: (process.env.NEXT_PUBLIC_CASHFREE_ENV as any) || 'production',
        onSuccess: async () => {
          // Verify with server
          const verifyRes = await fetch('/api/payments/cashfree/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: data.orderId,
              planId: checkoutPlan.id
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.isPaid) {
            setPaymentSuccess(true);
            setCurrentPlan(checkoutPlan.id);
            if (typeof window !== 'undefined') {
              localStorage.setItem('oneclickbiz_user_plan', checkoutPlan.id);
            }

            // Add new invoice to list
            const newInvoiceId = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const newInv: InvoiceItem = {
              id: newInvoiceId,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              amount: `₹${checkoutPlan.price.toLocaleString()}.00`,
              status: 'PAID',
              plan: `${checkoutPlan.name} (Annual Subscription)`
            };
            setInvoices(prev => [newInv, ...prev]);

            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
        },
        onFailure: (err) => {
          console.error('Cashfree payment failed or closed:', err);
          setIsProcessingPayment(false);
        },
        onClose: () => {
          setIsProcessingPayment(false);
        }
      });
    } catch (err) {
      console.error(err);
      setIsProcessingPayment(false);
    }
  };





  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Plan Management & Settings
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Annual Subscription Plans & Settings
          </h1>
          <p className="text-xs text-slate-400">
            Upgrade your tier, manage white-label custom domains, track storage quotas, and download GST tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Active Plan: {currentPlan === 'BASIC' ? `Basic (₹${tiers.find((p) => p.id === 'BASIC')?.price || 999}/yr)` : currentPlan === 'PRO' ? `Pro (₹${tiers.find((p) => p.id === 'PRO')?.price || 1599}/yr)` : `Advanced (₹${tiers.find((p) => p.id === 'ADVANCED')?.price || 2199}/yr)`}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: UPGRADE & MANAGE PLANS COMPARISON                   */}
      {/* ============================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 space-y-6 shadow-md backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Zap className="w-3 h-3 text-amber-600" /> Annual Membership Tiers
            </div>
            <h2 className="text-lg font-bold text-slate-900">Choose Your Annual Plan</h2>
            <p className="text-xs text-slate-500">All plans are billed annually with zero transaction fees and instant activation.</p>
          </div>

          {/* Annual Billing Guarantee Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start sm:self-auto shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Transparent Annual Pricing</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => {
            const isCurrent = currentPlan === tier.id;

            return (
              <div 
                key={tier.id}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-indigo-50/80 via-white to-white border-2 border-indigo-600 shadow-xl ring-2 ring-indigo-500/20' 
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      {tier.id === 'ADVANCED' && <Crown className="w-4 h-4 text-amber-500" />}
                      {tier.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{tier.tagline}</p>
                  </div>

                  <div className="pt-2 pb-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        ₹{tier.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ year</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Billed annually • Inclusive of all updates</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Features:</p>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-default"
                    >
                      <Check className="w-4 h-4" />
                      Current Active Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleInitiateSwitch({ id: tier.id as any, name: tier.name, price: tier.price })}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md ${
                        tier.popular
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>Switch to {tier.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* SECTION 2: STORAGE & USAGE QUOTAS                              */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Video storage quota */}
        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 space-y-2.5 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Cloud Video Storage</span>
            <span className="text-[10px] font-bold text-indigo-700">
              {currentPlan === 'BASIC' ? '3 / 3 Used' : currentPlan === 'PRO' ? '3 / 10 Used' : '3 / Unlimited (4K)'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div className="bg-indigo-600 h-full rounded-full w-[30%]" />
          </div>
          <p className="text-[10px] text-slate-400">YouTube, Reels &amp; Direct MP4</p>
        </div>

        {/* Portfolio gallery quota */}
        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 space-y-2.5 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Portfolio Showcase</span>
            <span className="text-[10px] font-bold text-pink-700">
              {currentPlan === 'BASIC' ? '4 / 5 Projects' : currentPlan === 'PRO' ? '4 / 25 Projects' : '4 / 50+ Projects'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div className="bg-pink-600 h-full rounded-full w-[16%]" />
          </div>
          <p className="text-[10px] text-slate-400">High-Res Lightbox Galleries</p>
        </div>

        {/* WhatsApp Store items */}
        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 space-y-2.5 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">WhatsApp Catalog</span>
            <span className="text-[10px] font-bold text-emerald-700">
              {currentPlan === 'BASIC' ? 'Standard' : 'Unlimited'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div className="bg-emerald-600 h-full rounded-full w-full" />
          </div>
          <p className="text-[10px] text-slate-400">Direct WhatsApp 1-Click Orders</p>
        </div>

        {/* Custom Domain status */}
        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 space-y-2.5 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">White-Label Domain</span>
            <span className="text-[10px] font-bold text-amber-800">
              {currentPlan === 'BASIC' ? 'Subdomain Only' : currentPlan === 'PRO' ? '1 / 1 Active' : '5 Domains Active'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
            <div className="bg-amber-500 h-full rounded-full w-full" />
          </div>
          <p className="text-[10px] text-slate-400">SSL Provisioned &amp; Active</p>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION 3: PERSONAL IDENTITY, PROFILE PHOTO & DOMAIN CONFIG   */}
      {/* ============================================================== */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Personal Profile & Headshot Photo */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 space-y-5 shadow-md backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Account Profile &amp; Headshot Photo</h2>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Synced Across Dashboard
            </span>
          </div>

          {/* Photo Uploader Row */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => avatarFileInputRef.current?.click()}
                className="relative w-16 h-16 rounded-full ring-4 ring-indigo-500/20 overflow-hidden cursor-pointer group bg-slate-200 shrink-0 shadow-md"
                title="Click to change photo"
              >
                {accountAvatar ? (
                  <img src={accountAvatar} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold">{billingName.charAt(0)}</div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900">Profile Photo</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Used across your vCard, email signature, and dashboard account.</p>
                <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG or WebP up to 10MB</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="file"
                ref={avatarFileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) setAccountAvatar(ev.target.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => avatarFileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition active:scale-95"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarPresets(!showAvatarPresets)}
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Presets</span>
              </button>
            </div>
          </div>

          {/* Avatar Presets Grid */}
          {showAvatarPresets && (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in">
              <span className="text-[11px] font-semibold text-indigo-700">Choose a Professional Avatar Preset:</span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[
                  '/kishore-profile-v2.png',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
                ].map((url, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setAccountAvatar(url);
                      setShowAvatarPresets(false);
                    }}
                    className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                      accountAvatar === url ? 'border-indigo-600 ring-2 ring-indigo-500/40 scale-105' : 'border-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <img src={url} alt="Preset" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">Your Full Name</label>
              <input 
                type="text" 
                value={billingName}
                onChange={e => setBillingName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Designation / Role</label>
              <input 
                type="text" 
                value={accountDesignation}
                onChange={e => setAccountDesignation(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Account Email Address</label>
              <input 
                type="email" 
                value={billingEmail}
                onChange={e => setBillingEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Mobile Contact Number</label>
              <input 
                type="text" 
                value={billingPhone}
                onChange={e => setBillingPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 space-y-4 shadow-md backdrop-blur-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Organization Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700">Company / Organization Name</label>
              <input 
                type="text" 
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Organization Slug</label>
              <input 
                type="text" 
                value="apex-studio"
                disabled
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Custom Domain Configuration */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 space-y-4 shadow-md backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Custom Domain (White-Label CNAME)</h2>
            </div>
            {currentPlan === 'BASIC' ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pro / Advanced Only
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                {currentPlan === 'ADVANCED' ? '5 Domains Allowed' : '1 Domain Allowed'}
              </span>
            )}
          </div>

          {currentPlan === 'BASIC' ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-amber-200 space-y-3">
              <p className="text-xs text-slate-700">
                White-label custom domains (e.g. <code className="text-indigo-600 font-mono">card.yourcompany.com</code>) with automated SSL certificates are available on the <strong>Pro Plan (1 Domain)</strong> and <strong>Advanced Plan (5 Domains)</strong>.
              </p>
              <button
                type="button"
                onClick={() => handleInitiateSwitch({ id: 'PRO', name: 'Pro Plan', price: tiers.find(t => t.id === 'PRO')?.price || 1599 })}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>Upgrade to Pro to Enable Custom Domain</span>
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700">Custom Domain Name (CNAME to oneclickbiz.in)</label>
                <input 
                  type="text" 
                  value={customDomain}
                  onChange={e => setCustomDomain(e.target.value)}
                  placeholder="e.g. cards.yourcompany.com"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-semibold text-slate-700">DNS Configuration Instructions:</p>
                <div className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200 text-indigo-700 shadow-sm">
                  Type: CNAME &nbsp;|&nbsp; Host: cards &nbsp;|&nbsp; Target: cname.oneclickbiz.in
                </div>
                <p className="text-[10px] text-slate-500">SSL certificates are provisioned automatically within 10 minutes of DNS verification.</p>
              </div>
            </>
          )}
        </div>

        {/* ============================================================== */}
        {/* SECTION 4: BILLING INVOICES & TAX RECEIPTS                     */}
        {/* ============================================================== */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 space-y-4 shadow-md backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-pink-600" />
              <h2 className="text-sm font-bold text-slate-900">Billing History &amp; GST Tax Invoices</h2>
            </div>
            <span className="text-[11px] text-slate-500">Download official tax receipts</span>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 font-mono">{inv.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">{inv.plan}</p>
                  <p className="text-[11px] text-slate-500">{inv.date} • {inv.amount}</p>
                </div>

                <button
                  type="button"
                  onClick={() => exportInvoicePDF({
                    invoiceNumber: inv.id,
                    date: inv.date,
                    amount: inv.amount,
                    planName: inv.plan,
                    customerName: billingName,
                    companyName: orgName
                  })}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all self-start sm:self-auto shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Download Invoice (PDF)</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Settings Saved' : 'Save Changes'}
          </button>
        </div>

      </form>

      {/* ============================================================== */}
      {/* BILLING & PAYMENT CHECKOUT MODAL                               */}
      {/* ============================================================== */}
      {checkoutPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Fixed Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">Checkout &amp; Plan Activation</h3>
                  <p className="text-[11px] text-slate-500">Upgrade to {checkoutPlan.name} • 365 Days Access</p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setCheckoutPlan(null)} 
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {paymentSuccess ? (
              /* Success State */
              <div className="p-8 text-center space-y-5 animate-in fade-in my-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-1.5 max-w-md mx-auto">
                  <h4 className="text-xl font-bold text-slate-900">Subscription Activated!</h4>
                  <p className="text-xs text-slate-600">
                    You have successfully upgraded to the <span className="text-emerald-700 font-bold">{checkoutPlan.name} (₹{checkoutPlan.price.toLocaleString()}/year)</span>. All premium storage and White-Label features are now active.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={searchParams.get('template') ? `/dashboard/builder?template=${searchParams.get('template')}` : "/dashboard/builder"}
                    onClick={() => setCheckoutPlan(null)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition active:scale-95"
                  >
                    <span>Open Profile Studio (Builder)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      exportInvoicePDF({
                        invoiceNumber: `INV-${new Date().getFullYear()}-001`,
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        amount: `₹${checkoutPlan.price.toLocaleString()}.00`,
                        planName: `${checkoutPlan.name} (Annual Subscription)`,
                        customerName: billingName,
                        companyName: orgName
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 border border-slate-200 transition shadow-sm"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>Download Tax Invoice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutPlan(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition"
                  >
                    Stay on Settings
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handlePayWithCashfree} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                
                {/* Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5 custom-scrollbar">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* LEFT COLUMN: Plan Summary & Billing Info (5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      
                      {/* Interactive Plan Selector Switcher */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Select Subscription Tier:</label>
                        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
                          {tiers.map((tier) => (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => setCheckoutPlan(tier)}
                              className={`py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center justify-center ${
                                checkoutPlan.id === tier.id
                                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md font-bold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-white text-xs'
                              }`}
                            >
                              <span className="text-[11px] font-bold">{tier.name}</span>
                              <span className="text-[10px] font-mono">₹{tier.price.toLocaleString()}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Plan Summary Box */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200 space-y-2.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                            Annual Plan
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-700">365 Days Access</span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                            {checkoutPlan.id === 'ADVANCED' && <Crown className="w-4 h-4 text-amber-500" />}
                            {checkoutPlan.name}
                          </h4>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className="text-2xl font-black text-slate-900">₹{checkoutPlan.price.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 font-medium">/ year</span>
                          </div>
                          <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Inclusive of 18% GST • No hidden gateway charges</p>
                        </div>

                        {/* Tier Features Preview */}
                        <div className="pt-2 border-t border-slate-200 space-y-1">
                          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Included in this upgrade:</p>
                          <ul className="space-y-1 text-[11px] text-slate-700">
                            {checkoutPlan.id === 'BASIC' && (
                              <>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> 1 Digital Profile &amp; vCard</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> Dynamic QR Code &amp; Tracking</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> Direct VCF Contact Download</li>
                              </>
                            )}
                            {checkoutPlan.id === 'PRO' && (
                              <>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> White-Label Custom Domain CNAME</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> WhatsApp Catalog Store &amp; CRM</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-600 shrink-0" /> PDF Data Reports &amp; Priority Support</li>
                              </>
                            )}
                            {checkoutPlan.id === 'ADVANCED' && (
                              <>
                                <li className="flex items-center gap-1.5"><Check className="w-3 text-amber-500 shrink-0" /> 5 White-Label Custom Domains</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 text-amber-500 shrink-0" /> Unlimited 4K Videos &amp; 50+ Showcase</li>
                                <li className="flex items-center gap-1.5"><Check className="w-3 text-amber-500 shrink-0" /> 5 Staff Profiles &amp; Blog Studio</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Coupon Code Input & Application Box */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border border-amber-200 space-y-2.5 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                            <Tag className="w-3.5 h-3.5 text-amber-600" />
                            <span>Promo &amp; Referral Coupon</span>
                          </div>
                          {appliedCoupon?.valid && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-600" />
                              Saved ₹{appliedCoupon.discountAmount}
                            </span>
                          )}
                        </div>

                        {appliedCoupon?.valid ? (
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-xs text-emerald-900">{appliedCoupon.coupon?.code}</span>
                                <span className="text-[10px] text-emerald-700">({appliedCoupon.coupon?.description})</span>
                              </div>
                              <p className="text-[10px] text-emerald-600 mt-0.5 font-semibold">
                                Discount of ₹{appliedCoupon.discountAmount} applied! Final: ₹{appliedCoupon.finalPrice.toLocaleString()}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveCoupon}
                              className="text-[10px] font-bold text-rose-600 hover:text-rose-800 bg-white px-2 py-1 rounded border border-rose-200"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Enter coupon (e.g. ONECLICK300)"
                                value={couponInput}
                                onChange={e => setCouponInput(e.target.value.toUpperCase())}
                                className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono uppercase placeholder-slate-400 focus:outline-none focus:border-amber-500"
                              />
                              <button
                                type="button"
                                onClick={() => handleApplyCustomCoupon()}
                                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 shadow-sm"
                              >
                                Apply
                              </button>
                            </div>

                            {couponError && (
                              <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>
                            )}

                            {/* Quick Clickable Coupon Suggestions */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              <span className="text-[10px] text-slate-500">Available:</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setCouponInput('ONECLICK300');
                                  handleApplyCustomCoupon('ONECLICK300');
                                }}
                                className="px-2 py-0.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-[10px] font-bold border border-amber-300/80 transition"
                              >
                                🏷️ ONECLICK300 (-₹300)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCouponInput('VIP500');
                                  handleApplyCustomCoupon('VIP500');
                                }}
                                className="px-2 py-0.5 rounded-lg bg-purple-100/80 hover:bg-purple-200 text-purple-900 text-[10px] font-bold border border-purple-300/80 transition"
                              >
                                🏷️ VIP500 (-₹500)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Billing Information Input Group */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-800">Billing Details</p>
                          <span className="text-[10px] text-slate-500">For GST Tax Invoice</span>
                        </div>

                        <div className="space-y-2.5">
                          <div>
                            <label className="text-[10px] text-slate-600 font-semibold">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={billingName}
                              onChange={e => setBillingName(e.target.value)}
                              className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-600 font-semibold">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={billingEmail}
                              onChange={e => setBillingEmail(e.target.value)}
                              className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-600 font-semibold">Phone *</label>
                              <input
                                type="text"
                                required
                                value={billingPhone}
                                onChange={e => setBillingPhone(e.target.value)}
                                className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-600 font-semibold">GSTIN (Optional)</label>
                              <input
                                type="text"
                                value={billingGst}
                                onChange={e => setBillingGst(e.target.value)}
                                placeholder="29ABCDE1234F1Z5"
                                className="w-full mt-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 uppercase font-mono placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Security Trust Mini Badge */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-[11px] text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>256-bit SSL encrypted checkout. GST Tax Invoice issued immediately.</span>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Automated Cashfree Payment Gateway (7 Cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      {/* Cashfree Gateway Hero Card */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-indigo-50 border border-emerald-200 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-xs font-extrabold text-slate-900 tracking-wide block">Automated Payment Gateway</span>
                              <span className="text-[10px] text-slate-500">Powered by Cashfree Payments India</span>
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                            Auto-Verifies in 0.5s
                          </span>
                        </div>

                        {/* Price Summary Breakdown */}
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>Plan Subscription ({checkoutPlan.name})</span>
                            <span className="font-mono font-semibold">₹{checkoutPlan.price.toLocaleString()}</span>
                          </div>
                          {appliedCoupon?.valid && (
                            <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                              <span>Coupon Discount ({appliedCoupon.coupon?.code})</span>
                              <span className="font-mono">-₹{appliedCoupon.discountAmount.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                            <span>Total Payable Amount</span>
                            <span className="text-emerald-700 font-mono text-base font-black">
                              ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : checkoutPlan.price).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          Secure instant checkout with real-time automated verification. All Indian payment modes supported inside the official gateway:
                        </p>

                        {/* Supported Payment Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                              <Smartphone className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Instant UPI &amp; QR</p>
                              <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM &amp; Dynamic QR</p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 shrink-0">
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Cards &amp; EMI</p>
                              <p className="text-[10px] text-slate-500">RuPay, Visa, Mastercard, Maestro &amp; Amex</p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Net Banking</p>
                              <p className="text-[10px] text-slate-500">50+ Banks (HDFC, SBI, ICICI, Axis, Kotak...)</p>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 shadow-xs">
                            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Instant Activation</p>
                              <p className="text-[10px] text-slate-500">Automated webhook unlocks account in 0.5s</p>
                            </div>
                          </div>
                        </div>

                        {/* Direct Pay Button Inside Card */}
                        <button
                          type="button"
                          onClick={handlePayWithCashfree}
                          disabled={isProcessingPayment}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50"
                        >
                          {isProcessingPayment ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>Connecting to Cashfree Gateway...</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5 text-white" />
                              <span>Pay ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : checkoutPlan.price).toLocaleString()} via Cashfree</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Security Trust Features */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>RBI Authorized Payment System</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Lock className="w-3 h-3 text-indigo-600" />
                          <span>256-bit Bank Grade Security</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Fixed Bottom Action Footer */}
                <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Total Payable:</span>
                    {appliedCoupon?.valid && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        ₹{checkoutPlan.price.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xl font-extrabold text-emerald-700 font-mono">
                      ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : checkoutPlan.price).toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      {appliedCoupon?.valid ? `Saved ₹${appliedCoupon.discountAmount} (18% GST Incl)` : 'All-Inclusive (18% GST)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setCheckoutPlan(null)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Pay ₹{(appliedCoupon?.valid ? appliedCoupon.finalPrice : checkoutPlan.price).toLocaleString()} Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}

