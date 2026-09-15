'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  QrCode, 
  Smartphone, 
  ShoppingBag, 
  Calendar, 
  ArrowUpRight, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  DollarSign,
  PieChart,
  Percent
} from 'lucide-react';
import { SEED_ADMIN_USERS, PLATFORM_SUMMARY_METRICS } from '@/lib/admin-store';
import { exportAdminPlatformAuditPDF } from '@/lib/pdf-export';

function formatINR(val: number) {
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString()}`;
}

export default function AdminOverviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('ALL');
  const [exportingPdf, setExportingPdf] = useState(false);
  const [metrics, setMetrics] = useState(PLATFORM_SUMMARY_METRICS);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadLiveOverview() {
      try {
        const [telRes, usrRes] = await Promise.all([
          fetch('/api/admin/telemetry', {
            cache: 'no-store',
            headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
          }),
          fetch('/api/admin/users', {
            cache: 'no-store',
            headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
          })
        ]);

        if (telRes.ok) {
          const telData = await telRes.json();
          if (telData.metrics) {
            setMetrics(telData.metrics);
          }
        }

        if (usrRes.ok) {
          const usrData = await usrRes.json();
          if (usrData.users) {
            setUsers(usrData.users);
          }
        }
      } catch (err) {
        console.error('Failed to load admin overview telemetry:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveOverview();
  }, []);

  const effectiveUsers = users.length > 0 ? users : SEED_ADMIN_USERS;

  const handleExportAuditPDF = () => {
    setExportingPdf(true);
    try {
      exportAdminPlatformAuditPDF(metrics, effectiveUsers.length);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setExportingPdf(false), 800);
    }
  };

  const filteredUsers = effectiveUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = selectedPlanFilter === 'ALL' || user.planTier.toUpperCase() === selectedPlanFilter;

    return matchesSearch && matchesPlan;
  });

  const totalPlanUsers = (metrics.planBreakdown.basic.count + metrics.planBreakdown.pro.count + metrics.planBreakdown.advanced.count) || metrics.totalUsers || 1;
  const basicPct = ((metrics.planBreakdown.basic.count / totalPlanUsers) * 100).toFixed(1);
  const proPct = ((metrics.planBreakdown.pro.count / totalPlanUsers) * 100).toFixed(1);
  const advPct = ((metrics.planBreakdown.advanced.count / totalPlanUsers) * 100).toFixed(1);

  const clientShare = metrics.partnerShare70 !== undefined ? metrics.partnerShare70 : Number((metrics.totalRevenue * 0.7).toFixed(2));
  const merlinflowShare = metrics.merlinflowShare30 !== undefined ? metrics.merlinflowShare30 : Number((metrics.totalRevenue * 0.3).toFixed(2));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Super Admin Analytics Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time telemetry across all registered members, smart profile identities, and subscription revenue.
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportAuditPDF}
            disabled={exportingPdf}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-rose-700 hover:text-rose-800 font-bold text-xs shadow-sm flex items-center gap-2 transition-all active:scale-95"
            title="Download Full Executive Platform Audit PDF"
          >
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span>{exportingPdf ? 'Generating PDF...' : 'Extract Audit PDF'}</span>
          </button>
          
          <Link
            href="/admin/users"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 flex items-center gap-1.5 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage All Members ({metrics.totalUsers})</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Gross Platform Revenue */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 hover:border-amber-400 shadow-md hover:shadow-lg transition-all space-y-3 relative overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Platform Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatINR(metrics.totalRevenue)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Live Cashfree PG Subscriptions</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            Monthly Run Rate (MRR): <span className="font-bold text-slate-900">₹{metrics.mrr.toLocaleString()} / mo</span>
          </div>
        </div>

        {/* KPI 2: Total Registered Members */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 hover:border-indigo-400 shadow-md hover:shadow-lg transition-all space-y-3 relative overflow-hidden backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Members</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {metrics.totalUsers.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{metrics.totalUsers > 0 ? `${metrics.totalUsers} Active Accounts` : 'Live Member Base'}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            Total Smart Profiles: <span className="font-bold text-slate-900">{metrics.totalProfiles.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 3: Client Partner Share (70% Profit) */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/90 to-white border border-emerald-200 hover:border-emerald-400 shadow-md hover:shadow-lg transition-all space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Client Partner Share (70%)</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-emerald-800">
              {formatINR(clientShare)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Primary Direct Receiver</span>
            </div>
          </div>
          <div className="pt-2 border-t border-emerald-100 text-[11px] text-emerald-700/80">
            Automated 70/30 net payout split
          </div>
        </div>

        {/* KPI 4: Merlinflow Tech Share (30% Profit) */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/90 to-white border border-amber-200 hover:border-amber-400 shadow-md hover:shadow-lg transition-all space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Merlinflow Tech (30%)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-amber-900">
              {formatINR(merlinflowShare)}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Merlinflow SLA Infrastructure</span>
            </div>
          </div>
          <div className="pt-2 border-t border-amber-100 text-[11px] text-amber-700/80">
            Platform Maintenance &amp; Cloud Operations
          </div>
        </div>

      </div>

      {/* Plan Tier Breakdown & Revenue Distribution */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subscription Plans &amp; User Distribution</h2>
            <p className="text-xs text-slate-500">Breakdown of member subscriptions and their respective plan costs.</p>
          </div>
          <div className="text-xs font-semibold text-slate-600">
            Total Active Subscriptions: <span className="font-bold text-slate-900">{metrics.totalUsers} accounts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Basic Tier */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700">BASIC PLAN</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                ₹{(metrics as any).planRates?.basic || 999} / yr
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {metrics.planBreakdown.basic.count} <span className="text-xs font-normal text-slate-500">users</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(5, Number(basicPct))}%` }} />
            </div>
            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>{basicPct}% of base</span>
              <span className="font-semibold text-indigo-700">₹{metrics.planBreakdown.basic.revenue.toLocaleString()} Revenue</span>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700">PRO PLAN</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                ₹{(metrics as any).planRates?.pro || 1599} / yr
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {metrics.planBreakdown.pro.count} <span className="text-xs font-normal text-slate-500">users</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(5, Number(proPct))}%` }} />
            </div>
            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>{proPct}% of base</span>
              <span className="font-semibold text-purple-700">₹{metrics.planBreakdown.pro.revenue.toLocaleString()} Revenue</span>
            </div>
          </div>

          {/* Advanced Tier */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700">ADVANCED PLAN</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                ₹{(metrics as any).planRates?.advanced || 2199} / yr
              </span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {metrics.planBreakdown.advanced.count} <span className="text-xs font-normal text-slate-500">users</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(5, Number(advPct))}%` }} />
            </div>
            <div className="text-[11px] text-slate-600 flex justify-between">
              <span>{advPct}% of base</span>
              <span className="font-semibold text-rose-700">₹{metrics.planBreakdown.advanced.revenue.toLocaleString()} Revenue</span>
            </div>
          </div>

        </div>
      </div>

      {/* Member Profiles & Revenue Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-md space-y-6 backdrop-blur-xl">
        
        {/* Table Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Member Accounts &amp; Identity Profiles</h2>
            <p className="text-xs text-slate-500">Inspect user profiles, subscription plans, costs, and traffic.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member, email, or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white w-64"
              />
            </div>

            {/* Plan Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
              {['ALL', 'BASIC', 'PRO', 'ADVANCED'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlanFilter(plan)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    selectedPlanFilter === plan
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Member &amp; Business</th>
                <th className="py-3.5 px-4">Smart Profile Slug</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Plan Cost</th>
                <th className="py-3.5 px-4">Traffic (Taps/Scans)</th>
                <th className="py-3.5 px-4">Orders &amp; Bookings</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No members match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Member & Business */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{user.name}</span>
                          <span className="text-[11px] text-slate-600">{user.businessName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/v/${user.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-mono text-[11px] font-semibold bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200"
                      >
                        <span>oneclickbiz.in/v/{user.slug}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </Link>
                    </td>

                    {/* Plan Tier */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        user.planTier === 'Advanced'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : user.planTier === 'Pro'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {user.planTier}
                      </span>
                    </td>

                    {/* Plan Cost */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">
                        <span className="text-emerald-700">₹{user.planCost?.toLocaleString() || 1}<span className="text-[10px] text-slate-500 font-normal">/yr</span></span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Renews: {user.renewalDate || '2027-09-12'}
                      </div>
                    </td>

                    {/* Traffic */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {((user.totalTaps || 0) + (user.totalScans || 0)).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {user.totalTaps || 0} taps • {user.totalScans || 0} scans
                      </div>
                    </td>

                    {/* Orders & Bookings */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {(user.totalOrders || 0) + (user.totalBookings || 0)} total
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {user.totalOrders || 0} orders • {user.totalBookings || 0} bookings
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        user.subscriptionStatus === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : user.subscriptionStatus === 'CANCELLED'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {user.subscriptionStatus === 'EXPIRED' ? 'UNPAID' : (user.subscriptionStatus || 'UNPAID')}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/v/${user.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 inline-flex items-center gap-1 text-[11px] font-semibold transition-all shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Inspect</span>
                      </Link>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}


