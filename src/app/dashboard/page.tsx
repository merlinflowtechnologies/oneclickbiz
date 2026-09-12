'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Eye, 
  QrCode, 
  CreditCard, 
  MessageCircle, 
  Phone, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Users, 
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  BookOpen
} from 'lucide-react';
import { INITIAL_PROFILES, INITIAL_LEADS, INITIAL_BOOKINGS } from '@/lib/data-store';
import { exportExecutiveSummaryPDF } from '@/lib/pdf-export';
import SubscriptionRenewalWidget from '@/components/dashboard/SubscriptionRenewalWidget';

export default function DashboardOverviewPage() {
  const [profile, setProfile] = React.useState(INITIAL_PROFILES[0]);
  const [copied, setCopied] = React.useState(false);
  const [copiedUrl, setCopiedUrl] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSession = localStorage.getItem('oneclickbiz_user_session');
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed.slug) {
            setProfile(prev => ({
              ...prev,
              name: parsed.fullName || prev.name,
              company: parsed.businessName || prev.company,
              slug: parsed.slug || prev.slug,
            }));
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleCopy = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const fullUrl = `${origin}/v/${profile.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(fullUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setCopiedUrl('');
    }, 3000);
  };

  const statCards = [
    { label: 'Total Profile Views', value: profile.stats.views.toLocaleString(), icon: Eye, change: '+18.4%', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Dynamic QR Scans', value: profile.stats.qrScans.toLocaleString(), icon: QrCode, change: '+24.2%', color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Direct Profile Visits', value: profile.stats.nfcTaps.toLocaleString(), icon: CreditCard, change: '+32.1%', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'WhatsApp Inquiries', value: profile.stats.whatsappClicks.toLocaleString(), icon: MessageCircle, change: '+12.5%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Direct Phone Calls', value: profile.stats.callClicks.toLocaleString(), icon: Phone, change: '+9.8%', color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'VCF Contacts Saved', value: profile.stats.vcfDownloads.toLocaleString(), icon: Download, change: '+27.6%', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto relative">
      
      {/* Copied Toast Banner */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-bold text-white">Public Link Copied!</p>
            <p className="text-[11px] text-emerald-300 font-mono">{copiedUrl}</p>
          </div>
        </div>
      )}

      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" /> Digital Card Active
          </div>
          <h1 className="text-xl font-bold text-white">Welcome back, {profile.name}!</h1>
          <p className="text-xs text-slate-400">Your smart profile and WhatsApp store are live and tracking interactions.</p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button 
            onClick={() => exportExecutiveSummaryPDF({ profile, bookings: INITIAL_BOOKINGS, leads: INITIAL_LEADS })}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            title="Download complete business analytics, bookings & leads PDF report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (PDF)</span>
          </button>
          <button 
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied URL' : 'Copy Public Link'}
          </button>
          <Link 
            href={`/v/${profile.slug}`}
            target="_blank"
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-indigo-300 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <span>Open Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link 
            href="/dashboard/blogs"
            className="px-3.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Blog Studio</span>
          </Link>
          <Link 
            href="/dashboard/visiting-cards"
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Visiting Cards</span>
          </Link>
          <Link 
            href="/dashboard/brochures"
            className="px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 hover:text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Brochure Studio</span>
          </Link>
          <Link 
            href="/dashboard/builder"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md"
          >
            Edit Profile Studio
          </Link>
        </div>
      </div>

      {/* Studios Row: Visiting Card Studio & Brochure Studio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visiting Card Studio Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 flex flex-col justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Smart Visiting Card Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">New</span>
              </div>
              <p className="text-xs text-slate-400">
                Design laser-printed & digital visiting cards with 6 luxury templates, 3D flip preview, dynamic QR & 300 DPI print export.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/visiting-cards"
            className="self-end px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Design Visiting Cards</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brochure & Catalog Studio Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/20 flex flex-col justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Brochure & Catalog Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold uppercase tracking-wider">New</span>
              </div>
              <p className="text-xs text-slate-400">
                Create tri-fold, bi-fold, and promo flyer brochures with high-res 300 DPI print export, custom logos, service pricing & QR codes.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/brochures"
            className="self-end px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Design Brochures</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{stat.value}</h3>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1-Year Subscription Renewal Hub */}
      <SubscriptionRenewalWidget
        currentPlan="Pro"
        renewalDate="2027-09-12"
        isExpired={false}
        userName={profile.name}
        userEmail={profile.email}
        userPhone={profile.phone}
      />

      {/* Main Grid: Recent Leads & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Inquiries & Leads */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white">Recent Leads & Inquiries</h2>
            </div>
            <Link href="/dashboard/leads" className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_LEADS.map(lead => (
              <div key={lead.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{lead.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                    {lead.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{lead.message}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>{lead.email}</span>
                  <span>{lead.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">Upcoming Appointments</h2>
            </div>
            <Link href="/dashboard/bookings" className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium">
              View Calendar <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_BOOKINGS.map(bk => (
              <div key={bk.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{bk.customerName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {bk.date} @ {bk.time}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-300 font-medium">{bk.serviceTitle}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>{bk.customerEmail}</span>
                  <span className="text-emerald-400 font-semibold">{bk.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
