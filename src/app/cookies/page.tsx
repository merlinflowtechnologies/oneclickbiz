import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { Cookie, ShieldCheck, ArrowLeft, CheckCircle2, Lock, Sparkles, Sliders } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy | OneClickBiz',
  description: 'Learn how OneClickBiz uses cookies and similar technologies to provide, protect, and improve our digital identity services.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-200 flex flex-col selection:bg-[#174BFF]/30 selection:text-[#103ED8]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64718F] hover:text-[#10183F] transition group mb-4"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#C7D7FE] text-[#174BFF] text-xs font-semibold w-fit mb-3">
            <Cookie className="w-3.5 h-3.5" />
            <span>COOKIE & TRACKING POLICY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#10183F] tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-2 text-sm text-[#64718F] leading-relaxed">
            This Cookie Policy explains how OneClickBiz (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar local storage technologies when you visit our website, dashboard, digital business cards, and mini stores.
          </p>
          <div className="mt-3 text-xs text-[#64718F] font-mono">
            Last Updated: September 12, 2026 • Compliant with Global Privacy Guidelines
          </div>
        </div>

        {/* Quick Highlights Summary Box */}
        <div className="p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA] mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Cross-Site Ad Tracking Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            OneClickBiz does <strong>NOT</strong> sell your personal data or utilize intrusive third-party cross-site behavioral tracking cookies. Our cookies are strictly designed to keep you securely signed in, preserve your profile customizer preferences, and ensure high-speed global edge caching.
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-8 text-sm leading-relaxed">
          
          {/* 1. What Are Cookies */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Cookie className="w-4 h-4 text-[#174BFF]" />
              1. What Are Cookies?
            </h2>
            <p className="text-[#64718F] text-xs leading-relaxed">
              Cookies are small text files placed on your device (computer, smartphone, or tablet) by websites that you visit. They are widely used to make websites work efficiently, provide a smoother personalized experience, maintain active sessions, and provide basic operational reporting.
            </p>
          </section>

          {/* 2. Types of Cookies We Use */}
          <section className="space-y-4 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#174BFF]" />
              2. Categories of Cookies We Use
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8FAFD]/60 border border-[#E2E9FA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#174BFF]" />
                    Essential & Authentication
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#059669] border border-emerald-200 font-bold">Required</span>
                </div>
                <p className="text-xs text-[#64718F]">
                  Necessary for the website to function. They authenticate users, secure session tokens, prevent fraudulent account access, and remember active admin logins.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFD]/60 border border-[#E2E9FA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#174BFF]" />
                    Preferences & Studio State
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-[#174BFF] font-bold">Functional</span>
                </div>
                <p className="text-xs text-[#64718F]">
                  Allows our smart card customizer to remember your selected theme (Modern, Dark, Glassmorphic, Sunset), draft card details, and dashboard tab preferences.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFD]/60 border border-[#E2E9FA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#174BFF]" />
                    Security & Rate Limiting
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#059669] border border-emerald-200 font-bold">Protection</span>
                </div>
                <p className="text-xs text-[#64718F]">
                  Protects API endpoints from automated DDoS attacks, brute-force form submissions, and enforces tokenized CSRF security protections.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFD]/60 border border-[#E2E9FA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#174BFF]" />
                    Aggregated Analytics
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-bold">Anonymous</span>
                </div>
                <p className="text-xs text-[#64718F]">
                  Collects de-identified metrics regarding total card views, QR code scans, and peak traffic hours so creators can monitor their digital networking growth.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Managing Cookies in Your Browser */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#174BFF]" />
              3. How to Control and Delete Cookies
            </h2>
            <p className="text-[#64718F] text-xs leading-relaxed">
              Most web browsers automatically accept cookies by default, but you can usually modify your browser settings to decline cookies or alert you when a cookie is placed.
            </p>
            <p className="text-[#64718F] text-xs leading-relaxed">
              Please note that disabling strictly essential cookies may cause specific features of the OneClickBiz dashboard, profile customizer, and account authentication to function improperly.
            </p>
          </section>

          {/* 4. Updates & Inquiries */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              4. Questions About Our Cookie Usage
            </h2>
            <p className="text-[#64718F] text-xs leading-relaxed">
              If you have any questions or require clarification regarding our use of cookies and local storage, please reach out to our privacy compliance team directly:
            </p>
            <div className="pt-2 text-xs text-[#475569] space-y-1">
              <p>Primary Contact: Adduri Sai Kishore (<a href="https://wa.me/918374372733" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">+91 8374372733</a>)</p>
              <p>Email: <a href="mailto:info@oneclickbiz.in" className="text-[#174BFF] hover:underline">info@oneclickbiz.in</a> / <a href="mailto:contact@oneclickbiz.in" className="text-[#174BFF] hover:underline">contact@oneclickbiz.in</a></p>
              <p>Office Location: Nagole, Hyderabad, Telangana, India</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
