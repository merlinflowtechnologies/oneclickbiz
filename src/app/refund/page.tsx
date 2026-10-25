'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  Ban, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  Package, 
  Zap, 
  HelpCircle, 
  Layers,
  FileText,
  Lock,
  Globe,
  AlertTriangle,
  Scale
} from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#10183F] font-sans flex flex-col selection:bg-[#174BFF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#174BFF] hover:text-[#174BFF] mb-8 transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-[#E2E9FA]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <Ban className="w-3.5 h-3.5" /> Strict Billing & Cancellation Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#10183F] tracking-tight">
            Strict Non-Refundable & Cancellation Policy
          </h1>
          <p className="text-sm text-[#475569] max-w-3xl leading-relaxed">
            Please read this policy carefully before purchasing any subscription, plan upgrade, or custom domain setup from OneClickBiz. By completing a payment, you expressly agree to the binding terms outlined below.
          </p>
          <div className="pt-2 text-xs text-[#64718F] font-medium">
            Effective & Last Updated: September 2026 • Compliant with Indian Consumer Protection (E-Commerce) Rules & RBI Digital Payment Guidelines
          </div>
        </div>

        {/* Key Summary Notice */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-200 mb-12 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Binding Legal Notice on Digital Consumption</span>
          </div>
          <p className="text-xs sm:text-sm text-[#10183F] leading-relaxed font-medium">
            OneClickBiz delivers immediate digital software access, vanity URL provisioning, and dynamic cloud services upon payment. Due to the irrevocable nature of digital provisioning and immediate server allocation, <strong className="text-rose-700">ALL DIGITAL SALES, PLAN SUBSCRIPTIONS, AND ACCOUNT UPGRADES ARE STRICTLY FINAL AND NON-REFUNDABLE</strong>.
          </p>
        </div>

        {/* Detailed Strict Policy Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#475569] leading-relaxed">
          
          {/* 1. Strict Digital Subscription Policy */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Ban className="w-4 h-4 text-rose-400" />
              1. Strict Non-Refundable Digital Services
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              Except where strictly mandated by statutory Indian consumer law, all payments made to OneClickBiz are non-refundable under all circumstances. Once a digital order is completed, server resources, database storage, dynamic QR generation algorithms, and URL vanity handles are instantly allocated.
            </p>
            <p className="text-[#10183F] text-xs font-semibold pt-1">This absolute non-refundable policy applies unconditionally to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li><strong>Basic Plan (₹999/year)</strong>, <strong>Pro Plan (₹1,599/year)</strong>, and <strong>Advanced Plan (₹2,199/year)</strong> subscriptions.</li>
              <li>Mid-term plan upgrades, feature add-ons, or subscription renewals.</li>
              <li>Custom domain CNAME white-labeling and automated SSL certificate issuances.</li>
              <li>WhatsApp Mini-Store catalog activation and Appointment Booking integrations.</li>
              <li>Brochure studio PDF export suites and VIP SLA priority onboarding packages.</li>
            </ul>
          </section>

          {/* 2. Subscription Cancellation & Auto-Renewal */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#174BFF]" />
              2. Subscription Cancellation Rules
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              Subscribers may cancel their recurring subscription at any time via their Dashboard Settings to prevent automatic renewal for subsequent billing cycles.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li><strong>No Pro-Rata Refunds:</strong> Cancellation of an active subscription does not entitle the user to a full, partial, or pro-rata refund for unused days in the current billing cycle.</li>
              <li><strong>Continued Access:</strong> Your digital card and premium features will remain fully active until the exact expiration date of your current paid billing period.</li>
              <li><strong>Post-Expiry Handling:</strong> Upon expiration without renewal, premium features (such as white-label custom domains and extra cards) will pause, but basic contact accessibility may be preserved at our discretion.</li>
            </ul>
          </section>

          {/* 3. Pure Digital Service Delivery & No Physical Goods */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#174BFF]" />
              3. 100% Pure Digital Cloud SaaS Delivery (No Physical Goods)
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              OneClickBiz operates exclusively as a digital Software-as-a-Service (SaaS) platform. We do not manufacture, sell, or ship physical plastic/metal cards or hardware goods.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li><strong>Zero Physical Shipments:</strong> All smart business cards, dynamic QR codes, and mini-store catalogs are cloud-hosted digital web applications rendered dynamically on smartphones, tablets, and desktop browsers.</li>
              <li><strong>Instantaneous Fulfillment:</strong> Because digital services and unique server URL aliases are automatically provisioned within seconds of transaction authorization, orders cannot be cancelled once digital delivery is executed.</li>
              <li><strong>Digital Access Verification:</strong> If you experience technical difficulty accessing your digital dashboard or configured profile link, our support team will resolve access within the SLA timeframe. Software delivery issues do not warrant a monetary refund.</li>
            </ul>
          </section>

          {/* 4. Duplicate Billing & Payment Failures */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#174BFF]" />
              4. Duplicate Charges & Failed Transactions
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              In the rare event that a payment gateway error causes a duplicate deduction for a single transaction:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li><strong>Verified Duplicates:</strong> If our billing team verifies a genuine duplicate charge for the same transaction ID, the excess amount will be refunded directly to the original payment source within <strong>5 to 7 business days</strong>.</li>
              <li><strong>Bank Deductions Without Activation:</strong> If money is deducted from your bank or card but the order failed to complete due to network dropouts, the payment gateway (Cashfree/Bank) will automatically reverse the transaction within standard banking timelines (usually 3–5 business days).</li>
            </ul>
          </section>

          {/* 5. Fraud, Chargebacks & Account Abuse */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-400" />
              5. Fraud, Unauthorized Chargebacks & Blacklisting
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              OneClickBiz enforces zero tolerance for payment fraud and frivolous chargeback disputes.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li>Initiating an unauthorized or fraudulent chargeback through a credit card issuer or bank without first contacting OneClickBiz support constitutes a breach of contract.</li>
              <li>Such accounts will be <strong>immediately and permanently terminated</strong>, with all vanity handles, digital cards, and QR codes permanently revoked.</li>
              <li>We reserve the right to report fraudulent chargebacks and identity theft to appropriate cyber-crime authorities and financial fraud registries.</li>
            </ul>
          </section>

          {/* 6. Jurisdiction & Grievance Contact */}
          <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EDF4FF] via-white to-[#EDF4FF] border border-[#C7D7FE] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#174BFF]" />
                6. Grievance Redressal & Official Billing Contact
              </h2>
              <p className="text-xs text-[#64718F]">
                For verified duplicate billing issues or payment escalation queries, contact our designated Grievance Officer:
              </p>
              <div className="text-xs text-[#475569] space-y-1 pt-1.5">
                <p><strong className="text-[#10183F]">Designated Grievance Officer:</strong> Adduri Sai Kishore</p>
                <p><strong className="text-[#10183F]">Direct Helpline / WhatsApp:</strong> <a href="https://wa.me/916304989071" target="_blank" rel="noreferrer" className="text-[#174BFF] hover:underline font-semibold">+91 6304 989 071</a></p>
                <p><strong className="text-[#10183F]">Official Billing Emails:</strong> <a href="mailto:support@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">support@oneclickbiz.in</a> / <a href="mailto:contact@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">contact@oneclickbiz.in</a></p>
                <p><strong className="text-[#10183F]">Registered Address:</strong> Nagole, Hyderabad, Telangana, 500068, India</p>
                <p><strong className="text-[#10183F]">Platform Engineering:</strong> Developed &amp; Maintained by Merlinflow Technologies Pvt Ltd for OneClickBiz</p>
              </div>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact" 
                className="px-5 py-2.5 rounded-xl bg-[#174BFF] hover:bg-[#103ED8] text-white font-bold text-xs transition shadow-md inline-flex items-center gap-1.5"
              >
                <span>Submit Grievance</span>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

