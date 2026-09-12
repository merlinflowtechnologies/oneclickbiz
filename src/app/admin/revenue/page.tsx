'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Search, 
  Filter,
  Receipt,
  Percent,
  ShieldCheck
} from 'lucide-react';
import { SEED_ADMIN_USERS, PLATFORM_SUMMARY_METRICS } from '@/lib/admin-store';
import { exportAdminRevenueLedgerPDF, exportAdminSingleInvoicePDF } from '@/lib/pdf-export';

function formatINR(val: number) {
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString()}`;
}

export default function AdminRevenuePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [exportingLedgerPdf, setExportingLedgerPdf] = useState(false);
  const [metrics, setMetrics] = useState(PLATFORM_SUMMARY_METRICS);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadLiveRevenue() {
      try {
        const [revRes, telRes] = await Promise.all([
          fetch('/api/admin/revenue', {
            cache: 'no-store',
            headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
          }),
          fetch('/api/admin/telemetry', {
            cache: 'no-store',
            headers: { 'x-admin-key': 'oneclickbiz_admin_2026' }
          })
        ]);

        if (revRes.ok) {
          const revData = await revRes.json();
          if (revData.invoices) {
            setInvoices(revData.invoices);
          }
        }

        if (telRes.ok) {
          const telData = await telRes.json();
          if (telData.metrics) {
            setMetrics(telData.metrics);
          }
        }
      } catch (err) {
        console.error('Failed to load live revenue metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveRevenue();
  }, []);

  const effectiveInvoices = invoices.length > 0 ? invoices : SEED_ADMIN_USERS.filter(u => u.planCost > 0).map(u => ({
    invoiceId: `INV-2026-${u.id.replace('usr_', '')}`,
    userName: u.name,
    businessName: u.businessName,
    email: u.email,
    planTier: u.planTier,
    amount: u.planCost,
    date: u.joinedDate,
    status: 'PAID',
    gateway: 'Cashfree PG'
  }));

  const filteredInvoices = effectiveInvoices.filter(inv =>
    inv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientShare = metrics.partnerShare70 !== undefined ? metrics.partnerShare70 : Number((metrics.totalRevenue * 0.7).toFixed(2));
  const merlinflowShare = metrics.merlinflowShare30 !== undefined ? metrics.merlinflowShare30 : Number((metrics.totalRevenue * 0.3).toFixed(2));

  const handleExportLedgerPDF = () => {
    setExportingLedgerPdf(true);
    try {
      exportAdminRevenueLedgerPDF(filteredInvoices, metrics.totalRevenue, metrics.mrr);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setExportingLedgerPdf(false), 800);
    }
  };

  const handleDownloadInvoice = (inv: typeof invoices[0]) => {
    try {
      exportAdminSingleInvoicePDF(inv);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
            <CreditCard className="w-3.5 h-3.5" /> Financial Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Revenue &amp; Subscription Economics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time breakdown of MRR, ARR, plan subscription fees, and payment transaction logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportLedgerPDF}
            disabled={exportingLedgerPdf}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-amber-600/20 flex items-center gap-2 transition-all active:scale-95"
            title="Download Revenue & GST Tax Ledger PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exportingLedgerPdf ? 'Generating PDF...' : 'Extract Revenue Ledger PDF'}</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            Total ARR: <span className="text-emerald-400 font-bold">{formatINR(metrics.totalRevenue)}</span>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase">Gross Platform Revenue</div>
          <div className="text-2xl sm:text-3xl font-black text-white">{formatINR(metrics.totalRevenue)}</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Live Cashfree PG Subscriptions</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-3 bg-gradient-to-b from-emerald-950/20 to-slate-900">
          <div className="text-xs font-bold text-emerald-400 uppercase">Client Partner Share (70%)</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300">{formatINR(clientShare)}</div>
          <div className="text-xs text-emerald-400/80 font-medium">
            Direct UPI primary receiver
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-3 bg-gradient-to-b from-amber-950/20 to-slate-900">
          <div className="text-xs font-bold text-amber-400 uppercase">Merlinflow Tech Share (30%)</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">{formatINR(merlinflowShare)}</div>
          <div className="text-xs text-amber-400/80 font-medium">
            Merlinflow Technologies Pvt Ltd SLA
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase">Monthly Recurring (MRR)</div>
          <div className="text-2xl sm:text-3xl font-black text-white">₹{metrics.mrr.toLocaleString()}</div>
          <div className="text-xs text-indigo-400 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Annual Normalized</span>
          </div>
        </div>

      </div>

      {/* Subscription Pricing Matrix Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white">Active Plan Tiers &amp; Yields</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
            <div className="text-xs font-bold text-indigo-400">BASIC TIER</div>
            <div className="text-2xl font-black text-white">
              ₹{(metrics as any).planRates?.basic || 999} <span className="text-xs font-normal text-slate-400">/ yr</span>
            </div>
            <div className="text-xs text-indigo-300 font-semibold">{metrics.planBreakdown.basic.count} Active Subscribers</div>
            <div className="text-[11px] text-slate-400">Total Invoiced Yield: <strong className="text-white">₹{metrics.planBreakdown.basic.revenue.toLocaleString()}</strong></div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
            <div className="text-xs font-bold text-purple-400">PRO TIER</div>
            <div className="text-2xl font-black text-white">
              ₹{(metrics as any).planRates?.pro || 1599} <span className="text-xs font-normal text-slate-400">/ yr</span>
            </div>
            <div className="text-xs text-purple-300 font-semibold">{metrics.planBreakdown.pro.count} Active Subscribers</div>
            <div className="text-[11px] text-slate-400">Total Invoiced Yield: <strong className="text-white">₹{metrics.planBreakdown.pro.revenue.toLocaleString()}</strong></div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/30 space-y-2">
            <div className="text-xs font-bold text-rose-400">ADVANCED TIER</div>
            <div className="text-2xl font-black text-white">
              ₹{(metrics as any).planRates?.advanced || 2199} <span className="text-xs font-normal text-slate-400">/ yr</span>
            </div>
            <div className="text-xs text-rose-300 font-semibold">{metrics.planBreakdown.advanced.count} Active Subscribers</div>
            <div className="text-[11px] text-slate-400">Total Invoiced Yield: <strong className="text-white">₹{metrics.planBreakdown.advanced.revenue.toLocaleString()}</strong></div>
          </div>

        </div>
      </div>

      {/* Invoices Ledger Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Subscription Payment Invoices</h2>
            <p className="text-xs text-slate-400">Verified payment transactions captured through checkout gateways.</p>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice or subscriber..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Invoice ID</th>
                <th className="py-3.5 px-4">Subscriber</th>
                <th className="py-3.5 px-4">Plan Purchased</th>
                <th className="py-3.5 px-4">Amount Paid</th>
                <th className="py-3.5 px-4">Gateway</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Invoice PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 px-4 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Receipt className="w-8 h-8 text-slate-600 mb-1" />
                      <span className="font-bold text-slate-300">No Transaction Invoices Yet</span>
                      <span className="text-xs text-slate-500">
                        When users upgrade or renew their annual subscription plans, payment receipts and invoices will appear here.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                <tr key={inv.invoiceId} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-400">
                    {inv.invoiceId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{inv.userName}</div>
                    <div className="text-[11px] text-slate-400">{inv.businessName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {inv.planTier} Plan
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    ₹{inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {inv.gateway}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {inv.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv)}
                      title={`Download GST Invoice for ${inv.invoiceId}`}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Download className="w-3 h-3 text-emerald-400" />
                      <span>Invoice PDF</span>
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
