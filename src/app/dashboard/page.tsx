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

  const [stats, setStats] = React.useState({
    views: 0,
    qrScans: 0,
    nfcTaps: 0,
    whatsappClicks: 0,
    callClicks: 0,
    vcfDownloads: 0
  });
  const [leads, setLeads] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadRealAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            if (data.stats) setStats(data.stats);
            if (Array.isArray(data.leads)) setLeads(data.leads);
            if (Array.isArray(data.bookings)) setBookings(data.bookings);
            setProfile(prev => ({
              ...prev,
              name: data.userName || prev.name,
              company: data.businessName || prev.company,
              slug: data.slug || prev.slug,
              stats: data.stats || prev.stats
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load real analytics:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRealAnalytics();
  }, []);

  const handleCopy = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://oneclickbiz.in';
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
    { label: 'Total Profile Views', value: stats.views.toLocaleString(), icon: Eye, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Dynamic QR Scans', value: stats.qrScans.toLocaleString(), icon: QrCode, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Direct Profile Visits', value: stats.nfcTaps.toLocaleString(), icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'WhatsApp Inquiries', value: stats.whatsappClicks.toLocaleString(), icon: MessageCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Direct Phone Calls', value: stats.callClicks.toLocaleString(), icon: Phone, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'VCF Contacts Saved', value: stats.vcfDownloads.toLocaleString(), icon: Download, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-8 max-w-7xl mx-auto relative">
      
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
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-pink-50/80 border border-indigo-200/80 shadow-lg space-y-4">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-bold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Digital Card Active
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight break-words">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-xs text-slate-600">
              Your smart profile and WhatsApp store are live and tracking interactions in real time.
            </p>
          </div>

          <button 
            onClick={() => exportExecutiveSummaryPDF({ profile, bookings: bookings.length > 0 ? bookings : INITIAL_BOOKINGS, leads: leads.length > 0 ? leads : INITIAL_LEADS })}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
            title="Download complete business analytics, bookings & leads PDF report"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>Export Report (PDF)</span>
          </button>
        </div>

        {/* Live URL & Quick Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-slate-600 font-medium hidden sm:inline">Profile Link:</span>
            <span className="text-xs font-mono text-indigo-700 font-semibold truncate bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              oneclickbiz.in/v/{profile.slug}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
            
            <Link 
              href={`/v/${profile.slug}`}
              target="_blank"
              className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-semibold text-indigo-700 flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Live Profile</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-indigo-600" />
            </Link>
          </div>
        </div>

        {/* Studios Shortcuts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <Link 
            href="/dashboard/visiting-cards"
            className="p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-amber-800 font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Visiting Cards</span>
          </Link>
          
          <Link 
            href="/dashboard/brochures"
            className="p-2.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-sky-800 font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Brochures</span>
          </Link>

          <Link 
            href="/dashboard/blogs"
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-800 font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Blog Studio</span>
          </Link>
          
          <Link 
            href="/dashboard/builder"
            className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Edit Profile</span>
          </Link>
        </div>

      </div>

      {/* Studios Row: Visiting Card Studio & Brochure Studio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visiting Card Studio Card */}
        <div className="p-6 rounded-3xl bg-white/90 border border-amber-200/80 flex flex-col justify-between gap-4 shadow-lg shadow-amber-950/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600 shadow-xs">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Smart Visiting Card Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase tracking-wider">New</span>
              </div>
              <p className="text-xs text-slate-600">
                Design laser-printed & digital visiting cards with luxury templates, 3D flip preview, dynamic QR & 300 DPI print export.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/visiting-cards"
            className="self-end px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Design Visiting Cards</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brochure & Catalog Studio Card */}
        <div className="p-6 rounded-3xl bg-white/90 border border-sky-200/80 flex flex-col justify-between gap-4 shadow-lg shadow-sky-950/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0 text-sky-600 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Brochure & Catalog Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold uppercase tracking-wider">New</span>
              </div>
              <p className="text-xs text-slate-600">
                Create tri-fold, bi-fold, and promo flyer brochures with high-res 300 DPI print export, custom logos, service pricing & QR codes.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/brochures"
            className="self-end px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
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
            <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{stat.value}</h3>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">{stat.label}</p>
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
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent Leads & Inquiries</h2>
            </div>
            <Link href="/dashboard/leads" className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {leads.length > 0 ? (
              leads.map((lead: any) => (
                <div key={lead.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{lead.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                      {lead.status}
                    </span>
                  </div>
                  {lead.message && (
                    <p className="text-[11px] text-slate-600 line-clamp-2">{lead.message}</p>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{lead.email}</span>
                    <span>{lead.phone || 'No phone'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 px-4 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-900">No Inquiries Yet</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  When visitors submit inquiry forms on your digital card, they will appear here in real-time.
                </p>
                <button 
                  onClick={handleCopy} 
                  className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1 pt-1 cursor-pointer"
                >
                  <span>Share Card Link to Capture Leads</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Upcoming Appointments</h2>
            </div>
            <Link href="/dashboard/bookings" className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1 font-semibold">
              View Calendar <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.length > 0 ? (
              bookings.map((bk: any) => (
                <div key={bk.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{bk.customerName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                      {new Date(bk.bookingDate).toLocaleDateString()} @ {bk.startTime || bk.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-700 font-medium">{bk.service?.title || bk.serviceTitle || 'General Consultation'}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{bk.customerEmail}</span>
                    <span className="text-emerald-600 font-semibold">{bk.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 px-4 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-900">No Appointments Scheduled</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Clients can book meetings or consultation calls with you directly from your card&apos;s appointment section.
                </p>
                <Link 
                  href="/dashboard/bookings" 
                  className="text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 pt-1"
                >
                  <span>Set Up Appointment Slots</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
