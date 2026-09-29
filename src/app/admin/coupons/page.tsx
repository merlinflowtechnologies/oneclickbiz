'use client';

import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  Percent, 
  CreditCard, 
  Users, 
  Calendar, 
  Lock, 
  Sparkles, 
  MessageSquare, 
  AlertCircle,
  X,
  Share2,
  CheckCircle2,
  TrendingUp,
  Clock,
  Crown,
  Zap,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Coupon } from '@/lib/coupons';

type PlanTargetType = 'ALL' | 'BASIC' | 'PRO' | 'ADVANCED' | 'PRO_AND_ADVANCED';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<'ALL' | 'BASIC' | 'PRO' | 'ADVANCED'>('ALL');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    totalCoupons: 0,
    activeCoupons: 0,
    totalRedemptions: 0,
    estimatedSavings: 0
  });

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'FLAT' | 'PERCENTAGE'>('FLAT');
  const [discountValue, setDiscountValue] = useState('300');
  const [description, setDescription] = useState('Exclusive ₹300 Instant Discount');
  const [applicablePlan, setApplicablePlan] = useState<PlanTargetType>('PRO');
  const [assignedName, setAssignedName] = useState('');
  const [assignedEmail, setAssignedEmail] = useState('');
  const [assignedPhone, setAssignedPhone] = useState('');
  const [maxUsage, setMaxUsage] = useState('1'); // 1 = single use
  const [expiryDays, setExpiryDays] = useState('30');

  // Share Modal State
  const [shareCoupon, setShareCoupon] = useState<Coupon | null>(null);
  const [currentTime] = useState(() => Date.now());

  async function loadCoupons() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons', {
        cache: 'no-store',
        headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.coupons) {
          setCoupons(data.coupons);
          if (data.metrics) setMetrics(data.metrics);
        }
      }
    } catch (err) {
      console.error('Failed to load admin coupons:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSelectPlanType = (type: PlanTargetType) => {
    setApplicablePlan(type);
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();

    if (type === 'PRO') {
      setCode(`PRO300-${rand}`);
      setDiscountType('FLAT');
      setDiscountValue('300');
      setDescription('Special ₹300 OFF on Pro Plan Subscription (₹1,599 → ₹1,299)');
    } else if (type === 'ADVANCED') {
      setCode(`VIP500-${rand}`);
      setDiscountType('FLAT');
      setDiscountValue('500');
      setDescription('Elite ₹500 OFF on Advanced Plan (₹2,199 → ₹1,699)');
    } else if (type === 'BASIC') {
      setCode(`BASIC200-${rand}`);
      setDiscountType('FLAT');
      setDiscountValue('200');
      setDescription('₹200 Discount on Basic Starter Plan (₹999 → ₹799)');
    } else if (type === 'PRO_AND_ADVANCED') {
      setCode(`GROWTH350-${rand}`);
      setDiscountType('FLAT');
      setDiscountValue('350');
      setDescription('₹350 OFF on Pro & Advanced Commercial Plans');
    } else {
      setCode(`ONECLICK300-${rand}`);
      setDiscountType('FLAT');
      setDiscountValue('300');
      setDescription('Universal ₹300 Discount on Any Annual Plan');
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    if (!code.trim()) {
      setFormError('Coupon code is required');
      setIsSubmitting(false);
      return;
    }

    if (!discountValue || Number(discountValue) <= 0) {
      setFormError('Please provide a valid discount value');
      setIsSubmitting(false);
      return;
    }

    let expiryDate: string | undefined = undefined;
    if (expiryDays !== 'NEVER') {
      const days = Number(expiryDays) || 30;
      const d = new Date();
      d.setDate(d.getDate() + days);
      expiryDate = d.toISOString();
    }

    let plansArray: string[] | undefined = undefined;
    if (applicablePlan === 'BASIC') plansArray = ['BASIC'];
    else if (applicablePlan === 'PRO') plansArray = ['PRO'];
    else if (applicablePlan === 'ADVANCED') plansArray = ['ADVANCED'];
    else if (applicablePlan === 'PRO_AND_ADVANCED') plansArray = ['PRO', 'ADVANCED'];

    const payload = {
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      description: description.trim() || `Special promotional discount`,
      applicablePlans: plansArray,
      assignedName: assignedName.trim() || undefined,
      assignedEmail: assignedEmail.trim() || undefined,
      assignedPhone: assignedPhone.trim() || undefined,
      maxUsage: maxUsage ? Number(maxUsage) : undefined,
      expiryDate
    };

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create coupon');
      }

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setShowCreateModal(false);
      setSuccessToast(`Coupon "${payload.code}" created and ready to share!`);
      setTimeout(() => setSuccessToast(null), 4000);
      
      // Reset form
      setCode('');
      setAssignedName('');
      setAssignedEmail('');
      setAssignedPhone('');
      loadCoupons();

      // Open share modal right away for the new coupon
      if (data.coupon) {
        setShareCoupon(data.coupon);
      }
    } catch (err: any) {
      setFormError(err.message || 'Error creating coupon');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (targetCoupon: Coupon) => {
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'oneclickbiz_admin_2026'
        },
        body: JSON.stringify({
          id: targetCoupon.id,
          code: targetCoupon.code,
          isActive: !targetCoupon.isActive
        })
      });

      if (res.ok) {
        setCoupons(prev => prev.map(c => 
          c.code === targetCoupon.code ? { ...c, isActive: !c.isActive } : c
        ));
      }
    } catch (err) {
      console.error('Failed to toggle coupon status:', err);
    }
  };

  const handleDeleteCoupon = async (targetCoupon: Coupon) => {
    if (!confirm(`Are you sure you want to delete coupon "${targetCoupon.code}"?`)) return;

    try {
      const res = await fetch(`/api/admin/coupons?code=${encodeURIComponent(targetCoupon.code)}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
      });

      if (res.ok) {
        setCoupons(prev => prev.filter(c => c.code !== targetCoupon.code));
        setSuccessToast(`Coupon "${targetCoupon.code}" deleted.`);
        setTimeout(() => setSuccessToast(null), 3000);
      } else {
        const data = await res.json();
        alert(data.error || 'Cannot delete coupon');
      }
    } catch (err) {
      console.error('Delete coupon error:', err);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedCode(label);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const filteredCoupons = coupons.filter(c => {
    const matchSearch = 
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.assignedName && c.assignedName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.assignedEmail && c.assignedEmail.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;

    if (planFilter === 'PRO') {
      return c.applicablePlans && c.applicablePlans.includes('PRO');
    }
    if (planFilter === 'ADVANCED') {
      return c.applicablePlans && c.applicablePlans.includes('ADVANCED');
    }
    if (planFilter === 'BASIC') {
      return c.applicablePlans && c.applicablePlans.includes('BASIC');
    }

    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold uppercase tracking-wider border border-rose-500/30">
            <Tag className="w-3.5 h-3.5 text-rose-400" /> Super Admin Coupon Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Plan-Wise Promotional Coupons &amp; Discount Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Generate custom coupons tailored to specific subscription plans (Basic, Pro, Advanced) or universal codes. Share directly with specific clients via WhatsApp with 1-click pre-applied checkout links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              handleSelectPlanType('PRO');
              setShowCreateModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Plan Coupon</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Coupons</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.activeCoupons} <span className="text-xs text-slate-400 font-normal">/ {metrics.totalCoupons} total</span></div>
          <p className="text-[11px] text-emerald-600 font-semibold">Ready to share &amp; redeem</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Redemptions</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalRedemptions}</div>
          <p className="text-[11px] text-slate-500">Successful checkouts</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Discount Granted</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{metrics.estimatedSavings.toLocaleString()}</div>
          <p className="text-[11px] text-amber-700 font-semibold">Total partner discount given</p>
        </div>

        <div className="p-5 rounded-3xl bg-white/90 border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Supported Plans</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Crown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-slate-900">Basic • Pro • Advanced</div>
          <p className="text-[11px] text-indigo-600 font-semibold">Plan-Specific Rules Active</p>
        </div>

      </div>

      {/* Main Table Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6">
        
        {/* Table Controls & Plan Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Plan Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start">
            <button
              onClick={() => setPlanFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                planFilter === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Plans ({coupons.length})
            </button>
            <button
              onClick={() => setPlanFilter('PRO')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                planFilter === 'PRO' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              <Zap className="w-3 h-3" /> Pro Plan (₹1,599)
            </button>
            <button
              onClick={() => setPlanFilter('ADVANCED')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                planFilter === 'ADVANCED' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <Crown className="w-3 h-3 text-amber-300" /> Advanced (₹2,199)
            </button>
            <button
              onClick={() => setPlanFilter('BASIC')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                planFilter === 'BASIC' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Basic (₹999)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search code, client name, email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={loadCoupons}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition"
              title="Refresh Coupons"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Coupons List Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Applicable Plan Target</th>
                <th className="py-3 px-4">Assigned Recipient</th>
                <th className="py-3 px-4">Usage &amp; Quota</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions &amp; Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
                    Loading coupons...
                  </td>
                </tr>
              )}

              {!loading && filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No matching coupons found. Click &quot;Generate Plan Coupon&quot; to create one!
                  </td>
                </tr>
              )}

              {!loading && filteredCoupons.map((c) => {
                const isExpired = c.expiryDate && new Date(c.expiryDate).getTime() < currentTime;
                const isExhausted = c.maxUsage && c.usedCount >= c.maxUsage;

                return (
                  <tr key={c.id || c.code} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Code */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-indigo-700 text-xs">
                          {c.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(c.code, `code_${c.code}`)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700"
                          title="Copy Code"
                        >
                          {copiedCode === `code_${c.code}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans font-normal mt-0.5">{c.description}</div>
                    </td>

                    {/* Discount */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {c.discountType === 'FLAT' ? `₹${c.discountValue} FLAT OFF` : `${c.discountValue}% OFF`}
                      </span>
                    </td>

                    {/* Applicable Plan Target */}
                    <td className="py-3.5 px-4">
                      {c.applicablePlans && c.applicablePlans.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {c.applicablePlans.map(p => {
                            const up = p.toUpperCase();
                            const isPro = up === 'PRO';
                            const isAdv = up === 'ADVANCED';
                            const isBasic = up === 'BASIC';

                            return (
                              <span 
                                key={p} 
                                className={`px-2 py-0.5 rounded-lg font-bold text-[10px] border flex items-center gap-1 ${
                                  isPro ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                  isAdv ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                  'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                {isPro && <Zap className="w-3 h-3 text-indigo-600" />}
                                {isAdv && <Crown className="w-3 h-3 text-amber-500" />}
                                <span>{isPro ? 'Pro (₹1,599)' : isAdv ? 'Advanced (₹2,199)' : isBasic ? 'Basic (₹999)' : p}</span>
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          🌐 All Annual Plans
                        </span>
                      )}
                    </td>

                    {/* Target Recipient */}
                    <td className="py-3.5 px-4 text-[11px]">
                      {c.assignedName || c.assignedEmail || c.assignedPhone ? (
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-900 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" />
                            {c.assignedName || 'Specific Client'}
                          </span>
                          {c.assignedEmail && <div className="text-slate-500">{c.assignedEmail}</div>}
                          {c.assignedPhone && <div className="text-slate-500 font-mono">{c.assignedPhone}</div>}
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Open to Anyone</span>
                      )}
                    </td>

                    {/* Usage */}
                    <td className="py-3.5 px-4 text-[11px]">
                      <div className="font-bold text-slate-900">
                        {c.usedCount} {c.maxUsage ? `/ ${c.maxUsage}` : 'used'}
                      </div>
                      {c.maxUsage === 1 && (
                        <span className="text-[9px] text-amber-700 font-semibold bg-amber-50 px-1 rounded">Single-Use</span>
                      )}
                      {c.expiryDate && (
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Expires: {new Date(c.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {isExpired ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Expired
                        </span>
                      ) : isExhausted ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Exhausted
                        </span>
                      ) : c.isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions & WhatsApp Sharing */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Share Button */}
                        <button
                          onClick={() => setShareCoupon(c)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] flex items-center gap-1 border border-emerald-200 transition cursor-pointer"
                          title="Share on WhatsApp or Copy Link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </button>

                        {/* Toggle Active Button */}
                        <button
                          onClick={() => handleToggleActive(c)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            c.isActive 
                              ? 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                          title={c.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        {c.createdBy !== 'System Default' && (
                          <button
                            onClick={() => handleDeleteCoupon(c)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL 1: GENERATE PLAN-SPECIFIC PROMO COUPON                   */}
      {/* ============================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Generate Plan-Specific Promo Coupon</h3>
                  <p className="text-[11px] text-slate-500">Target a specific plan (Basic, Pro, Advanced) and set rules</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              
              {/* PLAN SELECTION CARDS */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Step 1: Choose Target Plan Rule
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  
                  {/* Pro Plan Card */}
                  <div
                    onClick={() => handleSelectPlanType('PRO')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      applicablePlan === 'PRO'
                        ? 'bg-indigo-50 border-indigo-600 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Pro Plan
                      </span>
                      {applicablePlan === 'PRO' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-black text-slate-900">₹1,599<span className="text-[9px] font-normal text-slate-500">/yr</span></span>
                      <p className="text-[9px] text-slate-500">Most Popular Suite</p>
                    </div>
                  </div>

                  {/* Advanced Plan Card */}
                  <div
                    onClick={() => handleSelectPlanType('ADVANCED')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      applicablePlan === 'ADVANCED'
                        ? 'bg-purple-50 border-purple-600 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-500" /> Advanced
                      </span>
                      {applicablePlan === 'ADVANCED' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-black text-slate-900">₹2,199<span className="text-[9px] font-normal text-slate-500">/yr</span></span>
                      <p className="text-[9px] text-slate-500">Corporate &amp; Team</p>
                    </div>
                  </div>

                  {/* Basic Plan Card */}
                  <div
                    onClick={() => handleSelectPlanType('BASIC')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      applicablePlan === 'BASIC'
                        ? 'bg-slate-100 border-slate-900 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Basic Plan</span>
                      {applicablePlan === 'BASIC' && <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />}
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-black text-slate-900">₹999<span className="text-[9px] font-normal text-slate-500">/yr</span></span>
                      <p className="text-[9px] text-slate-500">1 Smart Digital Card</p>
                    </div>
                  </div>

                  {/* Pro & Advanced Combo */}
                  <div
                    onClick={() => handleSelectPlanType('PRO_AND_ADVANCED')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between sm:col-span-1 ${
                      applicablePlan === 'PRO_AND_ADVANCED'
                        ? 'bg-pink-50 border-pink-600 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-pink-700">Pro + Advanced</span>
                      {applicablePlan === 'PRO_AND_ADVANCED' && <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />}
                    </div>
                    <div className="mt-1">
                      <span className="text-xs font-bold text-slate-900">Commercial Tiers</span>
                    </div>
                  </div>

                  {/* All Plans (Universal) */}
                  <div
                    onClick={() => handleSelectPlanType('ALL')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between sm:col-span-2 ${
                      applicablePlan === 'ALL'
                        ? 'bg-emerald-50 border-emerald-600 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800">🌐 All Plans (Universal)</span>
                      {applicablePlan === 'ALL' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className="mt-1">
                      <p className="text-[10px] text-slate-600">Redeemable across Basic, Pro, or Advanced</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* CODE & DISCOUNT AMOUNT */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PRO300, ADV500, VIPARAVIND"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500 uppercase"
                />
              </div>

              {/* Discount Type & Amount */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={e => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="FLAT">Flat Rupee Amount (₹ OFF)</option>
                    <option value="PERCENTAGE">Percentage (% OFF)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    {discountType === 'FLAT' ? 'Discount in INR (₹)' : 'Discount in %'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={e => setDiscountValue(e.target.value)}
                    placeholder={discountType === 'FLAT' ? '300' : '20'}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Specific Recipient Assignment (Optional) */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Assign Specifically to One Person (Optional)</span>
                </div>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  If filled, only this individual or contact can redeem this coupon. Leave blank to let anyone use it.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Recipient Name (e.g. Kishore)"
                    value={assignedName}
                    onChange={e => setAssignedName(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-slate-900 focus:outline-none placeholder-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp Phone or Email"
                    value={assignedPhone}
                    onChange={e => setAssignedPhone(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-xs text-slate-900 focus:outline-none placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Usage & Expiry Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Usage Limit</label>
                  <select
                    value={maxUsage}
                    onChange={e => setMaxUsage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="1">1 Time (Single Use Only)</option>
                    <option value="5">5 Times</option>
                    <option value="10">10 Times</option>
                    <option value="100">100 Times</option>
                    <option value="">Unlimited Uses</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Valid For</label>
                  <select
                    value={expiryDays}
                    onChange={e => setExpiryDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="7">7 Days</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days (1 Month)</option>
                    <option value="90">90 Days (3 Months)</option>
                    <option value="365">1 Year</option>
                    <option value="NEVER">No Expiration</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Campaign Notes</label>
                <input
                  type="text"
                  placeholder="e.g. VIP discount for client acquisition"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-rose-600/20 flex items-center gap-2 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating Coupon...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Plan Coupon &amp; Share</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: 1-CLICK SHARE VIA WHATSAPP & COPY DIRECT LINKS        */}
      {/* ============================================================== */}
      {shareCoupon && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Share Plan Coupon &amp; Discount Link</h3>
                  <p className="text-[11px] text-slate-500">Send directly to client via WhatsApp or copy pre-applied URL</p>
                </div>
              </div>
              <button
                onClick={() => setShareCoupon(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Coupon Highlight Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                  {shareCoupon.applicablePlans && shareCoupon.applicablePlans.length === 1 
                    ? `${shareCoupon.applicablePlans[0]} Plan Coupon` 
                    : 'Promo Coupon'}
                </span>
                <div className="text-xl font-mono font-black text-slate-900">{shareCoupon.code}</div>
                <div className="text-xs text-emerald-700 font-bold mt-0.5">
                  {shareCoupon.discountType === 'FLAT' ? `Instant ₹${shareCoupon.discountValue} FLAT OFF` : `${shareCoupon.discountValue}% Special Discount`}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(shareCoupon.code, 'share_modal_code')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                {copiedCode === 'share_modal_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* 1-Click WhatsApp Share Button */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-Click Direct WhatsApp Share Pitch</span>
              </label>

              {(() => {
                const discountText = shareCoupon.discountType === 'FLAT' 
                  ? `₹${shareCoupon.discountValue} OFF` 
                  : `${shareCoupon.discountValue}% OFF`;

                const planQuery = shareCoupon.applicablePlans && shareCoupon.applicablePlans.length === 1
                  ? `&plan=${shareCoupon.applicablePlans[0].toLowerCase()}`
                  : '';

                const planMention = shareCoupon.applicablePlans && shareCoupon.applicablePlans.length === 1
                  ? `${shareCoupon.applicablePlans[0]} Plan`
                  : 'Annual Subscription Plan';

                const directSignupUrl = `https://oneclickbiz.in/signup?coupon=${encodeURIComponent(shareCoupon.code)}${planQuery}`;
                const greeting = shareCoupon.assignedName ? `Hi ${shareCoupon.assignedName}!` : `Hi!`;

                const waMessage = `${greeting} Here is an exclusive special invitation from OneClickBiz 🚀\n\nUse promo coupon code *${shareCoupon.code}* to get an instant *${discountText}* on your ${planMention} (Digital Smart Card, WhatsApp Store & Lead Engine).\n\n👉 Click here to activate with discount pre-applied: ${directSignupUrl}\n\nLet me know if you need any assistance getting started!`;

                const waShareUrl = `https://wa.me/${shareCoupon.assignedPhone ? shareCoupon.assignedPhone.replace(/\D/g, '') : ''}?text=${encodeURIComponent(waMessage)}`;

                return (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 whitespace-pre-line leading-relaxed font-mono">
                      {waMessage}
                    </div>

                    <a
                      href={waShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition active:scale-95 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send to {shareCoupon.assignedName || 'Client'} via WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* Direct Copy Links */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-700">Pre-Applied Direct URLs</label>
              
              {/* Signup Link */}
              {(() => {
                const planQuery = shareCoupon.applicablePlans && shareCoupon.applicablePlans.length === 1
                  ? `&plan=${shareCoupon.applicablePlans[0].toLowerCase()}`
                  : '';
                const signupUrl = `https://oneclickbiz.in/signup?coupon=${shareCoupon.code}${planQuery}`;
                const upgradeUrl = `https://oneclickbiz.in/dashboard/settings?checkout=true&coupon=${shareCoupon.code}${planQuery}`;

                return (
                  <>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={signupUrl}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono select-all"
                      />
                      <button
                        onClick={() => copyToClipboard(signupUrl, 'link_signup')}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer"
                      >
                        {copiedCode === 'link_signup' ? 'Copied!' : 'Copy Signup Link'}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={upgradeUrl}
                        className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-mono select-all"
                      />
                      <button
                        onClick={() => copyToClipboard(upgradeUrl, 'link_upgrade')}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer"
                      >
                        {copiedCode === 'link_upgrade' ? 'Copied!' : 'Copy Upgrade Link'}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShareCoupon(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
