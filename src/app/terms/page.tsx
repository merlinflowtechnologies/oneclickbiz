'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  Scale, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  Layers, 
  Lock, 
  Ban, 
  Globe2, 
  Clock, 
  HelpCircle,
  FileText,
  Mail,
  Building2,
  Calendar,
  Check
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
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            These Terms &amp; Conditions (“Terms”) govern your access to and use of OneClickBiz, available at https://www.oneclickbiz.in, including its website, digital business cards, smart profiles, QR codes, NFC products, subscription plans, business tools and related services (“Services”).
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <strong>Effective Date:</strong> October 10, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <strong>Last Updated:</strong> October 10, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              Operated by Merlinflow Technologies Private Limited
            </span>
          </div>
        </div>

        {/* Quick Table of Contents Card */}
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 mb-12 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Key Sections Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-400">
            <a href="#sec-1" className="hover:text-indigo-300 transition">1. Introduction & Acceptance</a>
            <a href="#sec-2" className="hover:text-indigo-300 transition">2. Eligibility & Account</a>
            <a href="#sec-3" className="hover:text-indigo-300 transition">3. Description of Services</a>
            <a href="#sec-4" className="hover:text-indigo-300 transition">4. Plans & Pricing</a>
            <a href="#sec-5" className="hover:text-indigo-300 transition">5. Activation & Delivery</a>
            <a href="#sec-6" className="hover:text-indigo-300 transition">6. Duration & Renewal</a>
            <a href="#sec-7" className="hover:text-indigo-300 transition">7. Cancellation of Recurring</a>
            <a href="#sec-8" className="hover:text-indigo-300 transition">8. Payments & Billing</a>
            <a href="#sec-9" className="hover:text-indigo-300 transition">9. Refund & Cancellation</a>
            <a href="#sec-10" className="hover:text-indigo-300 transition">10. Expiry & Downgrades</a>
            <a href="#sec-11" className="hover:text-indigo-300 transition">11. Custom Domains</a>
            <a href="#sec-12" className="hover:text-indigo-300 transition">12. WhatsApp Store & Orders</a>
            <a href="#sec-13" className="hover:text-indigo-300 transition">13. User Content & Data</a>
            <a href="#sec-14" className="hover:text-indigo-300 transition">14. Customer Leads</a>
            <a href="#sec-15" className="hover:text-indigo-300 transition">15. Acceptable Use</a>
            <a href="#sec-16" className="hover:text-indigo-300 transition">16. Intellectual Property</a>
            <a href="#sec-17" className="hover:text-indigo-300 transition">17. Availability & Support</a>
            <a href="#sec-18" className="hover:text-indigo-300 transition">18. Suspension & Termination</a>
            <a href="#sec-19" className="hover:text-indigo-300 transition">19. Privacy & Cookies</a>
            <a href="#sec-20" className="hover:text-indigo-300 transition">20. Disclaimers</a>
            <a href="#sec-21" className="hover:text-indigo-300 transition">21. Limitation of Liability</a>
            <a href="#sec-22" className="hover:text-indigo-300 transition">22. Indemnity</a>
            <a href="#sec-23" className="hover:text-indigo-300 transition">23. Changes to Terms</a>
            <a href="#sec-24" className="hover:text-indigo-300 transition">24. Governing Law & Disputes</a>
            <a href="#sec-25" className="hover:text-indigo-300 transition">25. General Provisions</a>
            <a href="#sec-26" className="hover:text-indigo-300 transition">26. Contact & Grievance</a>
          </div>
        </div>

        {/* Detailed Strict Terms Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* 1. Introduction and Acceptance */}
          <section id="sec-1" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              1. Introduction and Acceptance
            </h2>
            <p>
              These Terms &amp; Conditions (“Terms”) govern your access to and use of OneClickBiz, available at <a href="https://www.oneclickbiz.in" className="text-indigo-400 hover:underline">https://www.oneclickbiz.in</a>, including its website, digital business cards, smart profiles, QR codes, NFC products, subscription plans, business tools and related services (“Services”).
            </p>
            <p>
              OneClickBiz is operated by <strong>Merlinflow Technologies Private Limited</strong> (“OneClickBiz”, “Company”, “we”, “us” or “our”).
            </p>
            <p>
              By accessing the website, creating an account, purchasing a subscription or using the Services, you (“User”, “Customer” or “Subscriber”) agree to these Terms and the applicable Privacy Policy, Refund &amp; Cancellation Policy, Shipping Policy and Cookie Policy.
            </p>
            <p>
              If you purchase or use the Services on behalf of an organisation, you confirm that you have authority to accept these Terms on its behalf.
            </p>
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              If you do not agree to these Terms, do not purchase or use the Services.
            </div>
          </section>

          {/* 2. Eligibility and Account Registration */}
          <section id="sec-2" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              2. Eligibility and Account Registration
            </h2>
            <p>
              You must have the legal capacity required under applicable law to enter into a binding agreement and use the Services.
            </p>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Provide accurate, complete and current registration information.</li>
              <li>Keep your account information updated.</li>
              <li>Maintain the confidentiality of your login credentials.</li>
              <li>Notify us promptly of suspected unauthorised account access.</li>
              <li>Ensure that people using your account are authorised to do so.</li>
            </ul>
            <p>
              You are responsible for activity carried out through your account, subject to applicable law and any unauthorised access that is not attributable to your actions or omissions.
            </p>
            <p>
              We may request reasonable verification information where necessary to protect accounts, investigate suspicious transactions or comply with legal obligations.
            </p>
          </section>

          {/* 3. Description of Services */}
          <section id="sec-3" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              3. Description of Services
            </h2>
            <p>
              OneClickBiz provides digital business identity, networking and business-management features, which may include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Digital business cards and downloadable contacts (.VCF).</li>
              <li>Public profiles, profile links and customisable layouts.</li>
              <li>QR codes and NFC-enabled physical products.</li>
              <li>WhatsApp Store, product catalogues and order-message generation.</li>
              <li>Appointment booking and inquiry forms.</li>
              <li>Lead management and customer interaction tools.</li>
              <li>QR scans, profile views, link clicks and engagement analytics.</li>
              <li>Blogs, portfolios, brochures, document uploads and related publishing tools.</li>
              <li>Custom-domain integration and SSL-related configuration.</li>
              <li>Team accounts, administration tools and eligible white-label features.</li>
              <li>Subscription management, support and other business services.</li>
            </ul>
            <p>
              The availability of a feature depends on the selected plan, technical compatibility, regional availability and any applicable usage limits.
            </p>
            <p>
              We may introduce, modify or discontinue features for legitimate business, technical, security or legal reasons. Where a change materially affects a paid subscription, we will provide notice or an appropriate remedy where required by applicable law or a separate contractual commitment.
            </p>
          </section>

          {/* 4. Subscription Plans and Pricing */}
          <section id="sec-4" className="scroll-mt-24 space-y-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              4. Subscription Plans and Pricing
            </h2>
            <p>
              OneClickBiz may offer free and paid subscription plans. The currently published annual plans include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starter Tier</span>
                <p className="font-bold text-white text-sm">Basic Plan</p>
                <p className="text-emerald-400 font-extrabold text-base">₹999 / year</p>
                <p className="text-slate-400 text-[11px]">1 Smart Digital Card (`/v/username`), contact downloading (.VCF), cloud QR code, and standard analytics.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Most Popular</span>
                <p className="font-bold text-indigo-200 text-sm">Pro Plan</p>
                <p className="text-emerald-400 font-extrabold text-base">₹1,599 / year</p>
                <p className="text-slate-400 text-[11px]">Up to 3 Smart Cards, 1 White-Label Custom Domain, WhatsApp Store, and Appointment Booking Engine.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Enterprise & Corporate</span>
                <p className="font-bold text-purple-200 text-sm">Advanced Plan</p>
                <p className="text-emerald-400 font-extrabold text-base">₹2,199 / year</p>
                <p className="text-slate-400 text-[11px]">Up to 5 Smart Cards, 5 Custom Domains, 4K Video uploads, Blog Studio, and VIP SLA Support.</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              These prices are indicative of the published plans and may change. The price, duration, feature entitlements, usage limits and taxes displayed at checkout at the time of purchase govern your transaction.
            </p>
            <p className="text-xs text-slate-400">
              Unless expressly included, a subscription does not cover physical NFC cards, custom printing, shipping, domain registration, third-party charges or separately purchased professional services.
            </p>
            <p className="text-xs text-slate-400">
              We may change prices for future purchases and renewals, subject to applicable law, valid renewal authorisation and any required advance notice. A price change will not retroactively alter a completed purchase unless legally permitted or expressly agreed.
            </p>
          </section>

          {/* 5. Subscription Activation and Digital Delivery */}
          <section id="sec-5" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              5. Subscription Activation and Digital Delivery
            </h2>
            <p>
              OneClickBiz is a cloud-based service. Paid subscription features are delivered electronically and ordinarily do not require physical shipment.
            </p>
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs">
              <strong>Instant Digital Provisioning:</strong> Following successful payment confirmation, subscription provisioning is generally expected within approximately <strong>0–60 seconds</strong>. Custom-domain setup, DNS propagation, SSL configuration and third-party integrations may take longer.
            </div>
            <p>
              Activation may depend on successful payment verification and completion of any required account setup. If payment is confirmed but your subscription is not activated, contact support with your transaction reference. We will investigate and take reasonable corrective action.
            </p>
            <p>
              Physical products purchased separately are governed by the applicable Shipping Policy and product-order terms.
            </p>
          </section>

          {/* 6. Subscription Duration and Renewal */}
          <section id="sec-6" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              6. Subscription Duration and Renewal
            </h2>
            <p>
              The subscription period begins on the activation date or other start date displayed in your order confirmation. An annual subscription ordinarily provides twelve (12) months of access, unless the checkout specifies otherwise.
            </p>
            <p>A subscription will renew automatically only if:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Automatic renewal is offered for the selected plan.</li>
              <li>The renewal amount, frequency and applicable conditions are disclosed before authorisation.</li>
              <li>You provide the required separate, explicit authorisation through the checkout or payment-provider process.</li>
              <li>The renewal arrangement complies with applicable law and payment-system requirements.</li>
            </ul>
            <p>
              If automatic renewal is not offered or authorised, your subscription will expire at the end of the purchased period unless you manually renew it.
            </p>

            <div className="pt-2 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">6.1 Renewal Disclosures</h3>
              <p className="text-xs text-slate-400">
                Before recurring payment authorisation, we will display or make available: the selected plan, renewal amount and applicable taxes, renewal frequency, first renewal date or trigger, instructions for cancelling future renewal, and applicable payment-provider mandate conditions.
              </p>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider">6.2 Separate Recurring-Payment Authorisation</h3>
              <p className="text-xs text-slate-400">
                Acceptance of these Terms, the Privacy Policy or other website policies does not, by itself, authorise automatic renewal or recurring deductions. Where recurring payments are offered, you must separately authorise them through a clearly identified, unticked consent control or valid payment mandate.
              </p>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider">6.3 Renewal Charges and Changes</h3>
              <p className="text-xs text-slate-400">
                Once you have validly authorised automatic renewal, the relevant payment provider may initiate charges according to the disclosed schedule. Any material change to renewal amount or frequency will be disclosed in advance.
              </p>
            </div>
          </section>

          {/* 7. Cancellation and Revocation of Recurring Payments */}
          <section id="sec-7" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              7. Cancellation and Revocation of Recurring Payments
            </h2>
            <p>
              You may cancel future subscription renewal through account settings where available or by contacting the official OneClickBiz support team. Where applicable, you may also revoke a recurring payment mandate through your bank or payment provider.
            </p>
            <p>
              Cancellation prevents future renewal charges once it becomes effective. It does not automatically refund fees already charged or immediately terminate an already-paid subscription period, except where required by law or the applicable Refund &amp; Cancellation Policy.
            </p>
            <p>
              Unless otherwise stated in your order or required by law, paid features remain available until the end of the current paid term.
            </p>
          </section>

          {/* 8. Payments, Taxes and Billing */}
          <section id="sec-8" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              8. Payments, Taxes and Billing
            </h2>
            <p>
              Prices and applicable taxes will be displayed before payment. Available payment methods may include UPI, debit cards, credit cards, net banking and supported payment gateways (Cashfree PG).
            </p>
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Pay the charges applicable to your selected plan.</li>
              <li>Provide accurate billing information.</li>
              <li>Review the checkout amount before confirming payment.</li>
              <li>Pay applicable taxes and separately disclosed charges.</li>
            </ul>
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              <strong>Security Reminder:</strong> Never share your password, OTP, UPI PIN, card PIN or banking password with support personnel. OneClickBiz personnel will never ask for your confidential banking credentials.
            </div>
          </section>

          {/* 9. Refund and Cancellation Policy */}
          <section id="sec-9" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              9. Refund and Cancellation Policy
            </h2>
            <p>
              The Refund &amp; Cancellation Policy published at <a href="/refund" className="text-indigo-400 hover:underline">https://www.oneclickbiz.in/refund</a> forms part of these Terms.
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <p><strong>Digital Subscriptions:</strong> Digital subscriptions, renewals, plan upgrades and add-ons are generally <strong>non-refundable once the digital service has been provisioned</strong>, except where a refund or other remedy is required by applicable law or expressly agreed in writing.</p>
              <p><strong>Duplicate Charges:</strong> A verified duplicate payment will be handled under the published Refund Policy. The stated processing estimate is 5–7 business days, subject to payment-provider processing.</p>
              <p><strong>Physical Products:</strong> Physical NFC cards and customised products are subject to the applicable product, return and refund conditions.</p>
            </div>
          </section>

          {/* 10. Expiry, Downgrades and Premium Access */}
          <section id="sec-10" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              10. Expiry, Downgrades and Premium Access
            </h2>
            <p>When a paid subscription expires without renewal:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Premium features may become unavailable.</li>
              <li>Usage limits may revert to the applicable free plan.</li>
              <li>Additional cards, custom-domain functionality, enhanced analytics and other premium features may be restricted.</li>
              <li>Team or white-label functionality may be disabled where not included in the remaining plan.</li>
              <li>Existing public profile and QR-code availability may be affected according to the applicable plan rules.</li>
            </ul>
            <p>
              You should export available business data before subscription expiry or account closure.
            </p>
          </section>

          {/* 11. Custom Domains and Third-Party Integrations */}
          <section id="sec-11" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-indigo-400" />
              11. Custom Domains and Third-Party Integrations
            </h2>
            <p>
              Where your subscription includes custom-domain functionality, you must own or have authority to use the relevant domain and make the required DNS changes.
            </p>
            <p>
              A domain registered and owned by you remains your property. Your subscription does not transfer domain ownership to OneClickBiz. You are responsible for any registrar-side renewal fees.
            </p>
          </section>

          {/* 12. WhatsApp Store, Orders and Bookings */}
          <section id="sec-12" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              12. WhatsApp Store, Orders and Bookings
            </h2>
            <p>
              OneClickBiz enables users to publish products and services, display prices, collect inquiries, prepare shopping carts, generate WhatsApp order messages and accept appointment requests.
            </p>
            <p>
              <strong>Intermediary Status:</strong> OneClickBiz is a technology provider and does not act as the seller, manufacturer, merchant of record, delivery provider or guarantor of transactions conducted between users and independent businesses. The relevant business is solely responsible for product descriptions, pricing, licensing, taxes, order acceptance, fulfilment, invoices, warranties, and compliance.
            </p>
          </section>

          {/* 13. User Content and Customer Data */}
          <section id="sec-13" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              13. User Content and Customer Data
            </h2>
            <p>
              “User Content” includes profile details, photographs, videos, logos, documents, brochures, blogs, product listings, business information and other material submitted by you. You retain ownership of User Content to the extent you own it.
            </p>
            <p>
              You grant OneClickBiz a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, display, transmit, format and process User Content solely as reasonably necessary to provide, secure, maintain and improve the Services.
            </p>
          </section>

          {/* 14. Customer Leads and Privacy */}
          <section id="sec-14" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              14. Customer Leads and Privacy
            </h2>
            <p>
              OneClickBiz provides tools that may allow businesses to collect inquiries, booking requests, lead details and other customer information.
            </p>
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              🔒 No Data Selling Guarantee: We do not sell customer lead lists or personal contact details to advertising brokers or data brokers as a business model.
            </div>
          </section>

          {/* 15. Acceptable Use */}
          <section id="sec-15" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              15. Acceptable Use
            </h2>
            <p>You must not use OneClickBiz to:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Conduct fraud, impersonation, phishing or identity theft.</li>
              <li>Publish unlawful, infringing, misleading or defamatory content.</li>
              <li>Distribute malware, spyware or malicious redirects.</li>
              <li>Send unlawful spam or harass other individuals.</li>
              <li>Collect personal data unlawfully.</li>
              <li>Promote prohibited or illegal products or services.</li>
              <li>Circumvent subscription limits or access controls.</li>
              <li>Reverse-engineer, scrape, copy or resell platform functionality without authorisation.</li>
              <li>Interfere with platform security, availability or integrity.</li>
              <li>Violate applicable privacy, intellectual property or consumer protection laws.</li>
            </ul>
          </section>

          {/* 16. Intellectual Property */}
          <section id="sec-16" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              16. Intellectual Property
            </h2>
            <p>
              OneClickBiz and its licensors retain all rights in the platform software, code, interface, templates, branding, proprietary systems and documentation, excluding User Content and third-party materials.
            </p>
            <p>
              You receive a limited, non-exclusive, non-transferable right to use the Services during your paid subscription. You may not copy, sublicense, resell, or commercially exploit proprietary platform components without written authorisation.
            </p>
          </section>

          {/* 17. Service Availability and Support */}
          <section id="sec-17" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              17. Service Availability and Support
            </h2>
            <p>
              We use reasonable efforts to maintain the availability, integrity and security of OneClickBiz. The platform advertises a target monthly availability of 99.9% for core routing and profile delivery services.
            </p>
            <p>
              Maintenance, technical failures, security incidents, network problems and third-party outages may affect availability. Published support response times refer to acknowledgement or commencement of investigation, not necessarily complete resolution.
            </p>
          </section>

          {/* 18. Suspension and Termination */}
          <section id="sec-18" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              18. Suspension and Termination
            </h2>
            <p>
              You may stop using the Services and request account closure through account controls or official support. We may suspend or terminate access due to material breach, fraud, unlawful activity, unpaid fees, or regulatory requirements.
            </p>
          </section>

          {/* 19. Privacy and Cookies */}
          <section id="sec-19" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              19. Privacy and Cookies
            </h2>
            <p>
              Personal data is processed as described in the Privacy Policy at <a href="/privacy" className="text-indigo-400 hover:underline">https://www.oneclickbiz.in/privacy</a>.
            </p>
            <p>
              Cookies and similar technologies are described in the Cookie Policy at <a href="/cookies" className="text-indigo-400 hover:underline">https://www.oneclickbiz.in/cookies</a>.
            </p>
          </section>

          {/* 20. Disclaimers */}
          <section id="sec-20" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              20. Disclaimers
            </h2>
            <p>
              To the extent permitted by law, the Services are provided on an “as available” basis. We do not guarantee uninterrupted operation, error-free performance, particular lead-generation results, increased revenue, or improved search rankings.
            </p>
          </section>

          {/* 21. Limitation of Liability */}
          <section id="sec-21" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              21. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, OneClickBiz will not be liable for indirect or consequential losses, loss of anticipated profits, loss of business opportunities or disputes arising from independent transactions between users and third-party businesses.
            </p>
            <p>
              Our aggregate liability arising from the relevant Services will not exceed the total fees paid by you for those Services during the twelve (12) months preceding the event giving rise to the claim.
            </p>
          </section>

          {/* 22. Indemnity */}
          <section id="sec-22" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              22. Indemnity
            </h2>
            <p>
              To the extent permitted by law, you are responsible for claims and losses arising from your unlawful content, infringement of third-party rights, misuse of the Services or material breach of these Terms.
            </p>
          </section>

          {/* 23. Changes to These Terms */}
          <section id="sec-23" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              23. Changes to These Terms
            </h2>
            <p>
              We may update these Terms to reflect changes in the Services, business operations or applicable law. The revised Terms will be published with an updated effective date.
            </p>
          </section>

          {/* 24. Governing Law and Disputes */}
          <section id="sec-24" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              24. Governing Law and Disputes
            </h2>
            <p>
              These Terms are governed by the laws of India. Disputes will be handled by competent courts or forums having jurisdiction under applicable law. Subject to mandatory consumer rights, the competent courts in <strong>Hyderabad, Telangana, India</strong>, shall have jurisdiction.
            </p>
          </section>

          {/* 25. General Provisions */}
          <section id="sec-25" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              25. General Provisions
            </h2>
            <p>
              If a provision is held unenforceable, the remaining provisions continue to apply. These Terms, together with the Privacy Policy, Refund &amp; Cancellation Policy, Shipping Policy and Cookie Policy, govern your use of the Services.
            </p>
          </section>

          {/* 26. Contact and Grievance Redressal */}
          <section id="sec-26" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              26. Contact and Grievance Redressal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p><strong className="text-slate-400">Platform:</strong> <span className="text-white">OneClickBiz</span></p>
                <p><strong className="text-slate-400">Website:</strong> <a href="https://www.oneclickbiz.in" className="text-indigo-400 hover:underline">https://www.oneclickbiz.in</a></p>
                <p><strong className="text-slate-400">Operator:</strong> <span className="text-white font-semibold">Merlinflow Technologies Private Limited</span></p>
                <p><strong className="text-slate-400">Office Location:</strong> <span className="text-slate-300">Nagole, Hyderabad, Telangana 500068, India</span></p>
                <p><strong className="text-slate-400">Phone / WhatsApp:</strong> <a href="tel:+916304989071" className="text-indigo-300">+91 63049 89071</a></p>
              </div>
              <div className="space-y-1">
                <p><strong className="text-slate-400">Official Support Email:</strong> <a href="mailto:support@oneclickbiz.in" className="text-indigo-400 hover:underline">support@oneclickbiz.in</a></p>
                <p><strong className="text-slate-400">Privacy &amp; Grievance Email:</strong> <a href="mailto:grievance@oneclickbiz.in" className="text-indigo-400 hover:underline">grievance@oneclickbiz.in</a></p>
                <p><strong className="text-slate-400">Grievance Officer:</strong> <span className="text-white font-semibold">Adduri Sai Kishore</span></p>
                <p><strong className="text-slate-400">Registered Office:</strong> <span className="text-slate-300">Nagole, Hyderabad, Telangana 500068, India</span></p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              For subscription activation, payments, renewal, cancellation, refunds, account access or legal complaints, contact the official support or grievance channel.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
