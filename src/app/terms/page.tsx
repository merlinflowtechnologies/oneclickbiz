'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  Check, 
  AlertTriangle, 
  Clock, 
  CreditCard, 
  Cpu, 
  Activity,
  Layers,
  HelpCircle,
  Lock,
  Ban,
  Gavel
} from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" /> Legally Binding Master Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            These Terms & Conditions constitute a legally binding agreement between you (“User”, “Subscriber”, or “Customer”) and OneClickBiz. By registering, purchasing a subscription, creating a digital identity profile, or accessing any service, you agree to comply with all terms herein.
          </p>
          <div className="pt-2 text-xs text-slate-500 font-medium">
            Effective: September 2026 • Governed under the Laws of India & Information Technology Act, 2000
          </div>
        </div>

        {/* SLA Callout Banner */}
        <div id="sla" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border border-indigo-500/20 mb-12 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Service Level Agreement (SLA)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                99.9% Target Platform Availability
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold self-start sm:self-center">
              Target Monthly Uptime: 99.9%
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This Service Level Agreement describes our core platform availability and support commitments. Uptime refers to the availability of the core OneClickBiz routing cluster and profile delivery servers.
          </p>

          {/* Support Priority Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Support Priority & Target Response Times</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-950 text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-800">Priority</th>
                    <th className="p-3 border-b border-slate-800">Description</th>
                    <th className="p-3 border-b border-slate-800">Target Response</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-400">
                  <tr>
                    <td className="p-3 font-bold text-rose-400">Critical</td>
                    <td className="p-3">Platform routing down or major production outage</td>
                    <td className="p-3 text-white font-medium">Within 4 hours</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">High</td>
                    <td className="p-3">Custom domain SSL or WhatsApp catalog failure</td>
                    <td className="p-3 text-white font-medium">Within 8 business hours</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-400">Medium</td>
                    <td className="p-3">Profile studio or booking calendar sync issue</td>
                    <td className="p-3 text-white font-medium">Within 1 business day</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-400">Low</td>
                    <td className="p-3">General inquiries, template requests, or invoice copy</td>
                    <td className="p-3 text-white font-medium">Within 2 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Response time means the time to acknowledge and begin addressing an issue, not necessarily the time required to resolve it.
            </p>
          </div>
        </div>

        {/* Detailed Strict Terms Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* 1. Account Integrity & Impersonation Ban */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              1. Account Integrity & Absolute Ban on Impersonation
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Users must provide strictly accurate, truthful, and verifiable personal or business credentials. 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs">
              <li><strong>Zero Tolerance for Phishing / Impersonation:</strong> Creating digital cards pretending to represent government entities, banking institutions, law enforcement, or third-party corporate entities without explicit authorization is strictly prohibited under the Information Technology Act, 2000.</li>
              <li><strong>Immediate Revocation:</strong> Any account found attempting identity theft, financial fraud, unauthorized credential harvesting, or trademark squatting will be <strong>permanently banned without refund</strong>, and incident logs will be handed to cyber-crime authorities.</li>
              <li><strong>Credential Security:</strong> You are solely responsible for maintaining strong credentials and all actions taken under your account.</li>
            </ul>
          </section>

          {/* 2. Plan Entitlements & Strict Resource Boundaries */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              2. Subscription Plans & Feature Boundaries
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Access to features is strictly bound to your active paid subscription tier:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <p className="font-bold text-white">Basic Plan (₹999/yr)</p>
                <p className="text-slate-400 text-[11px]">Strictly 1 Digital Card (`/v/username`), standard QR code, analytics, and contact saving.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-1">
                <p className="font-bold text-indigo-300">Pro Plan (₹1,599/yr)</p>
                <p className="text-slate-400 text-[11px]">Up to 3 Digital Cards, 1 White-Label CNAME Custom Domain, WhatsApp Store, and Appointment Engine.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-1">
                <p className="font-bold text-purple-300">Advanced Plan (₹2,199/yr)</p>
                <p className="text-slate-400 text-[11px]">Up to 5 Digital Cards, 5 Custom Domains, 4K Video uploads, Blog Studio, and VIP SLA Support.</p>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] pt-1">
              Attempting to bypass plan limits or manipulate API calls to create unauthorized cards will result in automated account locking.
            </p>
          </section>

          {/* 3. Acceptable Use & Prohibited Content */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              3. Strictly Prohibited Content & Use Cases
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              You agree never to upload, publish, or link through OneClickBiz any materials containing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs">
              <li>Pornography, sexually explicit content, or escort services.</li>
              <li>Illegal gambling, betting apps, unlicensed financial pyramid/MLM schemes, or cryptocurrency scams.</li>
              <li>Hate speech, harassment, defamation, or content violating religious or communal harmony.</li>
              <li>Malicious software, spyware, keyloggers, or unauthorized redirect links.</li>
              <li>Counterfeit goods, narcotics, or weapons sales.</li>
            </ul>
          </section>

          {/* 4. Intellectual Property Rights */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              4. Proprietary Rights & Development Ownership
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              The OneClickBiz software platform, backend architecture, dynamic NFC resonance engine, and digital template designs are proprietary assets engineered and maintained by <strong>Merlinflow Technologies Pvt Ltd</strong>.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              You are granted a revocable, non-exclusive, non-transferable license to use the service for the duration of your paid subscription. You may not reverse-engineer, decompile, scrape, or resell the underlying platform technology.
            </p>
          </section>

          {/* 5. Limitation of Liability & Warranty Disclaimer */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              5. Limitation of Liability & Indemnity
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              To the maximum extent permitted by applicable Indian law, OneClickBiz, its founders, and Merlinflow Technologies Pvt Ltd shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from lost profits, network outages, third-party carrier delays, or transactions between users and their end customers.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our total aggregate liability for any dispute shall strictly not exceed the total subscription fee paid by you to OneClickBiz during the preceding twelve (12) months.
            </p>
          </section>

          {/* 6. Jurisdiction & Legal Disputes */}
          <section className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Gavel className="w-4 h-4 text-indigo-400" />
              6. Governing Law & Exclusive Jurisdiction
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              These Terms shall be governed by, interpreted, and enforced in accordance with the substantive laws of the Republic of India. Any legal dispute, arbitration, or proceeding arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Hyderabad, Telangana, India</strong>.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-0.5">
              <p><strong>Primary Support & Legal Contact:</strong> Adduri Sai Kishore (+91 63049 89071)</p>
              <p><strong>Official Inquiries:</strong> <a href="mailto:support@oneclickbiz.in" className="text-indigo-400 hover:underline">support@oneclickbiz.in</a> / <a href="mailto:contact@oneclickbiz.in" className="text-indigo-400 hover:underline">contact@oneclickbiz.in</a></p>
              <p><strong>Registered Address:</strong> Nagole, Hyderabad, Telangana, 500068, India</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
