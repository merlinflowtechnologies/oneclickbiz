'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Lock,
  RefreshCw,
  QrCode,
  Zap,
  Check,
  Tag
} from 'lucide-react';
import { validateAndCalculateCoupon, CouponApplicationResult } from '@/lib/coupons';

interface SubscriptionRenewalWidgetProps {
  currentPlan?: 'Basic' | 'Pro' | 'Advanced' | string;
  renewalDate?: string;
  isExpired?: boolean;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
}

interface RenewalPlan {
  id: string;
  name: string;
  price: number;
  regularPrice: number;
  cards: string;
  period: string;
  recommended?: boolean;
}

const DEFAULT_RENEWAL_PLANS: Record<'Basic' | 'Pro' | 'Advanced', RenewalPlan> = {
  Basic: {
    id: 'BASIC',
    name: 'Basic Plan',
    price: 999,
    regularPrice: 999,
    cards: '1 Digital Smart Card',
    period: '1 Year Renewal'
  },
  Pro: {
    id: 'PRO',
    name: 'Pro Plan',
    price: 1599,
    regularPrice: 1599,
    cards: '3 Digital Smart Cards + WhatsApp Catalog',
    period: '1 Year Renewal',
    recommended: true
  },
  Advanced: {
    id: 'ADVANCED',
    name: 'Advanced Plan',
    price: 2199,
    regularPrice: 2199,
    cards: '5 Smart Cards + Team Portfolios',
    period: '1 Year Renewal'
  }
};

export default function SubscriptionRenewalWidget({
  currentPlan = 'Pro',
  renewalDate = '2027-09-12',
  isExpired = false,
  userEmail = 'client@oneclickbiz.in',
  userName = 'Valued Partner',
  userPhone = '9876543210'
}: SubscriptionRenewalWidgetProps) {
  const [plans, setPlans] = useState<Record<'Basic' | 'Pro' | 'Advanced', RenewalPlan>>(DEFAULT_RENEWAL_PLANS);
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Pro' | 'Advanced'>(
    (currentPlan as any) in DEFAULT_RENEWAL_PLANS ? (currentPlan as any) : 'Pro'
  );
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState('ONECLICK300');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponApplicationResult | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Automatically validate coupon when tier changes if a coupon was active or default
  React.useEffect(() => {
    const targetPlan = plans[selectedTier];
    if (appliedCoupon?.coupon?.code) {
      const revalidated = validateAndCalculateCoupon(appliedCoupon.coupon.code, targetPlan.price, targetPlan.id);
      if (revalidated.valid) {
        setAppliedCoupon(revalidated);
        setCouponError(null);
      } else {
        setAppliedCoupon(null);
        setCouponError(revalidated.error || null);
      }
    } else if (couponInput) {
      const res = validateAndCalculateCoupon(couponInput, targetPlan.price, targetPlan.id);
      if (res.valid) {
        setAppliedCoupon(res);
      }
    }
  }, [selectedTier, plans]);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply !== undefined ? codeToApply : couponInput).trim();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      setAppliedCoupon(null);
      return;
    }
    const targetPlan = plans[selectedTier];
    const res = validateAndCalculateCoupon(code, targetPlan.price, targetPlan.id);
    if (res.valid) {
      setAppliedCoupon(res);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError(res.error || 'Invalid coupon code.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  React.useEffect(() => {
    async function loadDynamicPricing() {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            const bPrice = Number(data.config.basicPrice) || 999;
            const pPrice = Number(data.config.proPrice) || 1599;
            const aPrice = Number(data.config.advancedPrice) || 2199;
            setPlans(prev => ({
              Basic: { ...prev.Basic, price: bPrice, regularPrice: bPrice },
              Pro: { ...prev.Pro, price: pPrice, regularPrice: pPrice },
              Advanced: { ...prev.Advanced, price: aPrice, regularPrice: aPrice }
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load settings pricing in widget:', err);
      }
    }
    loadDynamicPricing();
  }, []);

  const handleOnlineRenewal = async () => {
    setLoading(true);
    setError(null);

    try {
      const targetPlan = plans[selectedTier];
      // 1. Create Cashfree Order
      const res = await fetch('/api/payments/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: targetPlan.id,
          planName: targetPlan.name,
          price: targetPlan.price,
          couponCode: appliedCoupon?.valid ? appliedCoupon.coupon?.code : undefined,
          customerName: userName,
          customerEmail: userEmail,
          customerPhone: userPhone || '9999999999'
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success || !data.paymentSessionId) {
        throw new Error(data.error || 'Failed to initiate secure online renewal session');
      }

      // 2. Load Cashfree Checkout SDK
      const loadCashfreeSdk = (): Promise<any> => {
        return new Promise((resolve, reject) => {
          if ((window as any).Cashfree) {
            resolve((window as any).Cashfree);
            return;
          }
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.onload = () => resolve((window as any).Cashfree);
          script.onerror = () => reject(new Error('Cashfree SDK failed to load'));
          document.body.appendChild(script);
        });
      };

      const CashfreeSdk = await loadCashfreeSdk();
      const cashfree = CashfreeSdk({
        mode: data.environment === 'SANDBOX' ? 'sandbox' : 'production'
      });

      // 3. Mount Direct Cashfree PG Checkout Modal
      cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_modal'
      }).then(async (result: any) => {
        if (result.error) {
          setError(result.error.message || 'Renewal payment cancelled or failed');
          setLoading(false);
          return;
        }

        if (result.paymentDetails) {
          // Verify with Backend
          const verifyRes = await fetch('/api/payments/cashfree/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: data.orderId })
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            setPaymentSuccess(true);
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          } else {
            setError(verifyData.error || 'Payment verification pending. Please refresh in a moment.');
          }
        }
      });

    } catch (err: any) {
      console.error('Online renewal error:', err);
      setError(err.message || 'Could not connect to payment gateway. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 space-y-6 relative overflow-hidden shadow-lg">
      
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-200/20 via-purple-200/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Annual Subscription Lifecycle
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            1-Year Plan Renewal Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Keep your digital business cards, NFC taps, and online WhatsApp store active 24/7.
          </p>
        </div>

        {/* Current Status Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className={`w-2.5 h-2.5 rounded-full ${isExpired ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
          <div className="text-xs font-semibold text-slate-700">
            Status: <span className={isExpired ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
              {isExpired ? 'Expired • Renewal Required' : `Active (Renews: ${renewalDate})`}
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {paymentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-900">Annual Renewal Successful!</p>
            <p className="text-[11px] text-emerald-700">Your profile has been extended for +365 days. Reloading dashboard...</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Plan Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(plans) as Array<keyof typeof plans>).map((tierKey) => {
          const plan = plans[tierKey];
          const isSelected = selectedTier === tierKey;

          return (
            <div
              key={tierKey}
              onClick={() => setSelectedTier(tierKey)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative ${
                isSelected
                  ? 'bg-indigo-50/80 border-2 border-indigo-600 shadow-md scale-[1.02]'
                  : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-xs">
                  Most Popular
                </span>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{plan.name}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-2xl font-black text-slate-900">
                  ₹{plan.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ yr</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  {plan.cards}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                Covers 365 days 24/7 cloud hosting &amp; lead engine
              </div>
            </div>
          );
        })}
      </div>

      {/* Promo & Coupon Discount Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border border-amber-200 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            <span>Have a Promo or Referral Coupon?</span>
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
                Instant ₹{appliedCoupon.discountAmount} discount applied! Net payable: ₹{appliedCoupon.finalPrice.toLocaleString()}
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
                onClick={() => handleApplyCoupon()}
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
                  handleApplyCoupon('ONECLICK300');
                }}
                className="px-2 py-0.5 rounded-lg bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-mono font-bold text-[10px] border border-amber-300 transition"
              >
                🏷️ ONECLICK300 (-₹300)
              </button>
              {selectedTier !== 'Basic' && (
                <button
                  type="button"
                  onClick={() => {
                    setCouponInput('VIP500');
                    handleApplyCoupon('VIP500');
                  }}
                  className="px-2 py-0.5 rounded-lg bg-indigo-100/80 hover:bg-indigo-200 text-indigo-900 font-mono font-bold text-[10px] border border-indigo-300 transition"
                >
                  🏷️ VIP500 (-₹500)
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Area & Strict Policy Notice */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
            <Lock className="w-3.5 h-3.5" />
            <span>Strict Online Payment Policy</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All 1-year annual plan renewals must be processed through this automated online website portal. Direct and offline payments are strictly prohibited to ensure instant automated verification.
          </p>
        </div>

        <button
          onClick={handleOnlineRenewal}
          disabled={loading}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xl shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Connecting Gateway...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>
                {appliedCoupon?.valid ? (
                  <>Renew {plans[selectedTier].name} (₹{appliedCoupon.finalPrice.toLocaleString()} <span className="line-through text-slate-300 text-[10px]">₹{plans[selectedTier].price.toLocaleString()}</span>)</>
                ) : (
                  <>Renew {plans[selectedTier].name} Online (₹{plans[selectedTier].price.toLocaleString()})</>
                )}
              </span>
            </>
          )}
        </button>

      </div>

    </div>
  );
}
