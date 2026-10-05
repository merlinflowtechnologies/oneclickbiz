'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Globe, 
  Cookie, 
  Server, 
  Users, 
  Sparkles,
  Ban
} from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal & Privacy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            OneClickBiz (“OneClickBiz”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide while using our website, applications, digital business card services, networking features, and related services.
          </p>
          <div className="pt-2 text-xs text-slate-500 font-medium">
            Last Updated: September 11, 2026
          </div>
        </div>

        {/* Zero-Ads Feature Highlight Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-slate-900/60 border border-indigo-500/20 mb-12 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Ban className="w-4 h-4 text-emerald-400" />
            <span>Zero-Ads Policy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            A Business Experience Without Distractions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            OneClickBiz is designed to help you present your business professionally. That’s why OneClickBiz profiles are designed to be ad-free. We do not intend to place third-party advertising banners, pop-ups, or unrelated promotional advertisements on your public digital business profile.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your customers should focus on your brand, your services, your products, and your contact options—not advertisements from unrelated businesses.
          </p>
          
          <div className="pt-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">What Zero-Ads Means With OneClickBiz:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No third-party banner advertisements on your profile</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No unrelated pop-up advertisements</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No advertising clutter competing with your brand</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Your profile remains focused on your business identity</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              OneClickBiz may still display its own service-related notices, system messages, upgrade information, or other communications necessary to operate the platform. Your business deserves the spotlight.
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* 1. Information We Collect */}
          <section className="space-y-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              1. Information We Collect
            </h2>
            <p className="text-slate-400">
              Depending on how you use OneClickBiz, we may collect:
            </p>

            <div className="space-y-4 pt-1">
              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-indigo-300">Account Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Password or authentication information</li>
                  <li>Business or organization information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-indigo-300">Digital Profile Information</h3>
                <p className="text-xs text-slate-400 mb-1.5">Information you choose to publish through your OneClickBiz profile, including:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Profile photograph</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Business name</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Designation</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Contact information</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Website & Social links</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Business description</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Services & Products</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Images, videos & docs</div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">• Business address & other info</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-indigo-300">Transaction Information</h3>
                <p className="text-xs text-slate-400">
                  When you purchase a subscription, NFC card, or other service, payment-related information may be processed through our payment service providers. We may receive transaction details such as payment status, transaction reference and subscription information.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-indigo-300">Usage & Analytics Information</h3>
                <p className="text-xs text-slate-400 mb-1.5">We may collect information about how the platform is used, including:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li>Profile views and unique visitor metrics</li>
                  <li>QR code scans and NFC interactions</li>
                  <li>Link clicks and contact download triggers</li>
                  <li>Device and browser information</li>
                  <li>Approximate geographic information</li>
                  <li>Referring sources, date and time of interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-indigo-300">Communications</h3>
                <p className="text-xs text-slate-400">
                  We may collect information you provide when contacting us, submitting inquiries, requesting support, or communicating with us.
                </p>
              </div>
            </div>
          </section>

          {/* 2. How We Use Information */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              2. How We Use Information
            </h2>
            <p className="text-slate-400 text-xs">We may use information to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Create and manage accounts</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Provide digital card & profile services</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Publish user-created profiles</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Process subscriptions and payments</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Process NFC card orders</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Provide analytics and insights</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Facilitate bookings and inquiries</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Facilitate WhatsApp customer interactions</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Provide customer support</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Send service-related notifications</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Improve our products and services</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Detect fraud, abuse and security threats</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Maintain platform security</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 border border-slate-800">• Comply with applicable legal obligations</div>
            </div>
          </section>

          {/* 3. Public Information */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              3. Public Information
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              OneClickBiz allows users to create public digital profiles. Information that a user chooses to publish on a public profile may be accessible to anyone who receives or discovers the profile URL, QR code, NFC card, or other sharing mechanism.
            </p>
            <p className="text-slate-400 text-xs">
              Users are responsible for ensuring that they do not publish information they do not want publicly accessible.
            </p>
          </section>

          {/* 4. Customer Leads & Client Data Sovereignty (Zero Data Broker Selling) */}
          <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/30 shadow-xl">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              4. Customer Leads &amp; Client Data Sovereignty (Zero Data Broker Selling)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              When prospective clients, patients, or buyers interact with your digital profile (submitting inquiry forms, requesting appointments, or placing WhatsApp orders), OneClickBiz acts strictly as your secure technology processor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <h3 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 100% Exclusive Ownership
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  You own 100% of your customer contacts, phone numbers, and lead inquiries. OneClickBiz will never claim ownership over your client relationships or customer lists.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <h3 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <Ban className="w-4 h-4 text-rose-400 shrink-0" /> Zero Data Broker Selling
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  We will NEVER sell, lease, rent, or monetize your leads or customer contact details to third-party ad networks, marketing brokers, or data aggregators.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <h3 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Direct P2P Privacy
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  WhatsApp chats and bank UPI payments route directly peer-to-peer between you and your customers without intermediary escrow or middleman cuts.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <h3 className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 1-Click Export &amp; DPDP Rights
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Export your leads to open CSV/Excel and PDF anytime. Full compliance with India’s DPDP Act 2023 including rights to access, portability, and permanent erasure.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Cookies & Similar Technologies */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-indigo-400" />
              5. Cookies and Similar Technologies
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              We may use cookies and similar technologies for purposes such as authentication, security, preferences, analytics and improving the user experience. Users may be able to control certain cookies through their browser settings.
            </p>
          </section>

          {/* 6. Payment Information */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              6. Payment Information
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Payments may be processed through third-party payment providers. OneClickBiz does not intend to store complete payment card details on its own servers unless specifically stated otherwise. Payment providers may process information according to their own privacy policies and terms.
            </p>
          </section>

          {/* 7. Third-Party Services */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              7. Third-Party Services
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              OneClickBiz may integrate with third-party services such as payment gateways, cloud storage providers, communication providers, analytics services, hosting providers, and other integrations necessary to provide the platform. These providers may process information according to their respective policies.
            </p>
          </section>

          {/* 8. Data Security */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              8. Data Security
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              We use reasonable technical and organizational safeguards designed to protect information from unauthorized access, alteration, disclosure or destruction. However, no internet-based service can guarantee absolute security.
            </p>
          </section>

          {/* 9. Data Retention */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-400" />
              9. Data Retention
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              We retain information for as long as reasonably necessary to provide our services, maintain business and transaction records, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          {/* 10. Your Rights & DPDP Act 2023 Compliance */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              10. Your Rights &amp; India DPDP Act 2023 Compliance
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Under India’s <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and international data protection standards (GDPR), you possess legally enforceable rights over your personal data:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300 pl-2">
              <li><strong>Right to Access &amp; Summary:</strong> Request a complete summary of your personal data processed by OneClickBiz.</li>
              <li><strong>Right to Correction &amp; Updation:</strong> Rectify inaccurate, incomplete, or outdated personal or profile details.</li>
              <li><strong>Right to Data Erasure / Deletion:</strong> Request full permanent deletion of your account and associated lead records.</li>
              <li><strong>Right to Grievance Redressal:</strong> Direct escalation to our designated Grievance Officer in Hyderabad, India.</li>
            </ul>
          </section>

          {/* 10. Children's Privacy */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white">
              10. Children’s Privacy
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              OneClickBiz is not intended for children who are below the minimum age required to legally use the service in their jurisdiction.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section className="space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <h2 className="text-base font-bold text-white">
              11. Changes to This Policy
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be published on this page with an updated effective date.
            </p>
          </section>

          {/* 12. Contact Us */}
          <section className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-white">
                12. Contact Us
              </h2>
              <p className="text-xs text-slate-400">
                For privacy-related questions or requests:
              </p>
              <div className="text-xs text-slate-300 space-y-0.5 pt-1">
                <p><strong>Primary Contact:</strong> Adduri Sai Kishore (+91 63049 89071)</p>
                <p><strong>Email:</strong> <a href="mailto:support@oneclickbiz.in" className="text-indigo-400 hover:underline">support@oneclickbiz.in</a> / <a href="mailto:contact@oneclickbiz.in" className="text-indigo-400 hover:underline">contact@oneclickbiz.in</a></p>
                <p><strong>Office Location:</strong> Nagole, Hyderabad, Telangana, India</p>
                <p><strong>Website:</strong> <a href="https://oneclickbiz.in" className="text-indigo-400 hover:underline">oneclickbiz.in</a></p>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact" 
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg inline-flex items-center gap-1.5"
              >
                <span>Contact Support Desk</span>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
