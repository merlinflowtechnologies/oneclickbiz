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
  Ban,
  Calendar,
  Clock,
  Building2,
  AlertTriangle,
  Scale
} from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Legal &amp; Privacy Protection
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#10183F] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#64718F] max-w-3xl leading-relaxed">
            OneClickBiz (“OneClickBiz”, “Company”, “we”, “us” or “our”) is operated by <strong>Merlinflow Technologies Private Limited</strong>. This Privacy Policy explains how we collect, use, store, disclose, retain and protect personal data across our website, subscription plans, digital business cards, smart profiles, QR codes, and business management services.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#64718F] font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#059669]" />
              <strong>Effective Date:</strong> October 10, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#059669]" />
              <strong>Last Updated:</strong> October 10, 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#059669]" />
              DPDP Act, 2023 Compliant
            </span>
          </div>
        </div>

        {/* Highlights Banner: Zero-Ads & No Data Selling */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-blue-50 border border-emerald-200 mb-12 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#059669] font-bold text-xs uppercase tracking-wider">
            <Ban className="w-4 h-4 text-[#059669]" />
            <span>Zero-Ads &amp; No Data Selling Guarantee</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#10183F] tracking-tight">
            Built for Clean, Professional Business Profiles
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            We process personal data in accordance with applicable Indian data protection and information technology laws, including the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#475569] pt-1">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E9FA] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span><strong className="text-[#10183F]">Zero Ads:</strong> No third-party banner ads or popups on your profiles.</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E2E9FA] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span><strong className="text-[#10183F]">No Data Selling:</strong> We never sell customer lead lists to advertising brokers.</span>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA] mb-12 space-y-3">
          <h3 className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#174BFF]" />
            Privacy Policy Sections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-[#64718F]">
            <a href="#p-1" className="hover:text-[#174BFF] transition">1. Introduction</a>
            <a href="#p-2" className="hover:text-[#174BFF] transition">2. Our Role in Data Processing</a>
            <a href="#p-3" className="hover:text-[#174BFF] transition">3. Personal Data We Collect</a>
            <a href="#p-4" className="hover:text-[#174BFF] transition">4. How We Use Data</a>
            <a href="#p-5" className="hover:text-[#174BFF] transition">5. Payments &amp; Billing</a>
            <a href="#p-6" className="hover:text-[#174BFF] transition">6. Automatic Renewal</a>
            <a href="#p-7" className="hover:text-[#174BFF] transition">7. Public Profiles</a>
            <a href="#p-8" className="hover:text-[#174BFF] transition">8. Customer Leads</a>
            <a href="#p-9" className="hover:text-[#174BFF] transition">9. Cookies &amp; Tracking</a>
            <a href="#p-10" className="hover:text-[#174BFF] transition">10. Data Sharing &amp; Disclosure</a>
            <a href="#p-11" className="hover:text-[#174BFF] transition">11. Data Security</a>
            <a href="#p-12" className="hover:text-[#174BFF] transition">12. Retention &amp; Deletion</a>
            <a href="#p-13" className="hover:text-[#174BFF] transition">13. Your Privacy Rights</a>
            <a href="#p-14" className="hover:text-[#174BFF] transition">14. Children&apos;s Privacy</a>
            <a href="#p-15" className="hover:text-[#174BFF] transition">15. International Processing</a>
            <a href="#p-16" className="hover:text-[#174BFF] transition">16. Marketing Communications</a>
            <a href="#p-17" className="hover:text-[#174BFF] transition">17. Changes to Policy</a>
            <a href="#p-18" className="hover:text-[#174BFF] transition">18. Contact &amp; Grievance</a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#475569] leading-relaxed">
          
          {/* 1. Introduction */}
          <section id="p-1" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              1. Introduction
            </h2>
            <p>
              OneClickBiz (“OneClickBiz”, “Company”, “we”, “us” or “our”) is operated by <strong>Merlinflow Technologies Private Limited</strong>.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose, retain and protect personal data when you visit <a href="https://www.oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">https://www.oneclickbiz.in</a>, create an account, purchase or manage a subscription, publish a digital business card, use business tools, purchase physical products or contact support.
            </p>
            <p>
              We aim to process personal data in accordance with applicable Indian data protection and information technology laws, including the <strong>Digital Personal Data Protection Act, 2023</strong>.
            </p>
          </section>

          {/* 2. Our Role in Processing Personal Data */}
          <section id="p-2" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#174BFF]" />
              2. Our Role in Processing Personal Data
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-[#10183F] text-xs mb-1">2.1 Information Collected for Our Own Operations (Data Fiduciary)</h3>
                <p className="text-xs text-[#64718F]">
                  For account registration, subscription administration, billing, security, customer support and our own platform operations, OneClickBiz determines the relevant purposes and means of processing, subject to applicable law.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#10183F] text-xs mb-1">2.2 Information Processed for Business Subscribers (Data Processor)</h3>
                <p className="text-xs text-[#64718F]">
                  When a business uses OneClickBiz to publish profiles, collect leads, receive inquiries, manage appointments or organise customer records, we process personal data on that business's behalf to provide the Services. The business independently determines why and how it collects that information.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Personal Data We Collect */}
          <section id="p-3" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#174BFF]" />
              3. Personal Data We Collect
            </h2>
            <div className="space-y-3 text-xs">
              <p><strong>3.1 Account & Registration:</strong> Name, username, email address, mobile number, business name, designation, organization details, and account settings. We never ask users to disclose passwords, UPI PINs, or OTPs to support personnel.</p>
              <p><strong>3.2 Subscription & Billing:</strong> Selected plan, price, activation/expiry dates, subscription status, invoices, transaction references, and refund status.</p>
              <p><strong>3.3 Recurring Payment & Mandate:</strong> Plan renewal interval, mandate references, renewal schedule, and cancellation status.</p>
              <p><strong>3.4 Payment Information:</strong> Processed through authorized third-party gateways (Cashfree PG). We do not store complete payment-card credentials or CVV on our own servers.</p>
              <p><strong>3.5 Digital Business Profile:</strong> Photos, logos, contact numbers, email, bio, social media links, product catalogs, brochures, videos, QR codes, and custom domain settings.</p>
              <p><strong>3.6 Customer Inquiries, Leads & Appointments:</strong> Inquiry submissions, appointment bookings, lead notes, and order messages generated for WhatsApp.</p>
              <p><strong>3.7 Device, Technical & Usage:</strong> IP address, browser type, device details, access timestamps, QR scans, and link clicks.</p>
              <p><strong>3.8 Support & Communications:</strong> Messages, tickets, and feedback submitted to customer support.</p>
            </div>
          </section>

          {/* 4. How We Use Personal Data */}
          <section id="p-4" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#059669]" />
              4. How We Use Personal Data
            </h2>
            <p>We process personal data for specified lawful purposes:</p>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li><strong>Account management:</strong> To register users, authenticate accounts and maintain settings.</li>
              <li><strong>Subscription delivery:</strong> To activate plans and provide premium features.</li>
              <li><strong>Payment administration:</strong> To verify transactions, maintain billing records and process refunds.</li>
              <li><strong>Recurring payments:</strong> To administer separately authorised renewal arrangements.</li>
              <li><strong>Service delivery:</strong> To host profiles, generate QR codes, provide digital cards and operate tools.</li>
              <li><strong>Lead & booking management:</strong> To route customer inquiries and appointment slots.</li>
              <li><strong>Analytics:</strong> To provide engagement reports and understand platform usage.</li>
              <li><strong>Security:</strong> To detect fraud, prevent abuse and protect infrastructure.</li>
              <li><strong>Customer support:</strong> To resolve technical issues and billing inquiries.</li>
              <li><strong>Service improvement:</strong> To identify defects, improve reliability and develop features.</li>
              <li><strong>Communications:</strong> To send account, billing, security and service notices.</li>
              <li><strong>Legal compliance:</strong> To meet applicable accounting, tax, regulatory and statutory obligations.</li>
            </ol>
          </section>

          {/* 5. Subscription Payments and Billing */}
          <section id="p-5" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#059669]" />
              5. Subscription Payments and Billing
            </h2>
            <p>
              When you purchase a subscription, we use account and transaction information to confirm payment, activate your plan, and maintain tax invoices. Sensitive payment credentials are encrypted and collected directly by authorized payment gateways.
            </p>
          </section>

          {/* 6. Automatic Renewal and Recurring Payment Authorisation */}
          <section id="p-6" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#174BFF]" />
              6. Automatic Renewal and Recurring Payment Authorisation
            </h2>
            <div className="space-y-2 text-xs">
              <p><strong>6.1 Separate Authorisation:</strong> Automatic renewal is separate from acceptance of this Privacy Policy and the Terms &amp; Conditions. Accepting this Privacy Policy does not, by itself, authorise recurring deductions.</p>
              <p><strong>6.2 Information Processed:</strong> Plan details, renewal schedule, and mandate status needed to administer the arrangement.</p>
              <p><strong>6.3 Payment-Provider Sharing:</strong> We share minimum data necessary with banks, card networks, and UPI gateways to manage the mandate.</p>
              <p><strong>6.4 Cancellation & Retention:</strong> You may cancel future renewal anytime without affecting access during your active paid period.</p>
            </div>
          </section>

          {/* 7. Public Profiles and User-Published Content */}
          <section id="p-7" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#059669]" />
              7. Public Profiles and User-Published Content
            </h2>
            <p>
              OneClickBiz allows users to publish public digital business cards. Content you choose to display (phones, emails, catalogs, social links) will be accessible to anyone who visits your profile URL, scans your QR code, or taps your NFC card.
            </p>
          </section>

          {/* 8. Customer Leads and Business Data */}
          <section id="p-8" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#174BFF]" />
              8. Customer Leads and Business Data
            </h2>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              🔒 We do not sell customer lead lists or personal contact details to advertising brokers or data brokers as a business model.
            </div>
            <p>
              Where we process customer inquiries on behalf of a subscriber, we use it solely to deliver the service and maintain security.
            </p>
          </section>

          {/* 9. Cookies and Similar Technologies */}
          <section id="p-9" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-400" />
              9. Cookies and Similar Technologies
            </h2>
            <p>
              OneClickBiz uses essential cookies and local storage for authentication, dashboard session management, and security. Full details are available in our <a href="/cookies" className="text-[#174BFF] hover:underline">Cookie Policy</a>.
            </p>
          </section>

          {/* 10. Sharing and Disclosure of Personal Data */}
          <section id="p-10" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#174BFF]" />
              10. Sharing and Disclosure of Personal Data
            </h2>
            <div className="space-y-1.5 text-xs text-[#475569]">
              <p><strong>10.1 Service Providers:</strong> Cloud hosting, payment gateways, and security providers bound by strict confidentiality.</p>
              <p><strong>10.2 Authorised Users:</strong> Team members assigned by account administrators.</p>
              <p><strong>10.3 Third-Party Integrations:</strong> WhatsApp, social platforms, or DNS systems when initiated by you.</p>
              <p><strong>10.4 Legal & Security:</strong> To comply with lawful government or court orders in India.</p>
              <p><strong>10.5 Business Transfers:</strong> In connection with a merger, reorganization, or sale of assets.</p>
            </div>
          </section>

          {/* 11. Data Security */}
          <section id="p-11" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#059669]" />
              11. Data Security
            </h2>
            <p>
              We use 256-bit SSL encryption, automated database backups, secure authentication cookies, and role-based access controls to safeguard data against unauthorized access, loss, or misuse.
            </p>
          </section>

          {/* 12. Data Retention and Deletion */}
          <section id="p-12" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#64718F]" />
              12. Data Retention and Deletion
            </h2>
            <p>
              We retain personal data only for as long as necessary to provide your active subscription, maintain tax records, prevent fraud, and comply with statutory legal requirements. Users can export their business data anytime before closure.
            </p>
          </section>

          {/* 13. Your Privacy Rights and Choices */}
          <section id="p-13" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              13. Your Privacy Rights and Choices (DPDP Act, 2023)
            </h2>
            <p>
              Subject to applicable law, you have the right to request access, correction of inaccurate data, deletion where applicable, withdrawal of consent, and filing grievances with our Grievance Officer.
            </p>
          </section>

          {/* 14. Children's Privacy */}
          <section id="p-14" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#174BFF]" />
              14. Children's Privacy
            </h2>
            <p>
              OneClickBiz is intended for working professionals and businesses. We do not knowingly collect personal data from minors under applicable legal thresholds without parental or guardian consent.
            </p>
          </section>

          {/* 15. International Processing */}
          <section id="p-15" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#174BFF]" />
              15. International Processing
            </h2>
            <p>
              Data is hosted and managed in compliance with Indian regulations and relevant data protection directives.
            </p>
          </section>

          {/* 16. Marketing and Service Communications */}
          <section id="p-16" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#174BFF]" />
              16. Marketing and Service Communications
            </h2>
            <p>
              We send critical service notices (plan activation, payment invoices, security alerts). You may opt out of promotional emails at any time.
            </p>
          </section>

          {/* 17. Changes to This Privacy Policy */}
          <section id="p-17" className="scroll-mt-24 space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#174BFF]" />
              17. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Policy to reflect operational improvements or statutory revisions. Updated versions will always display the effective date.
            </p>
          </section>

          {/* 18. Privacy Contact and Grievance Redressal */}
          <section id="p-18" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EDF4FF] via-white to-[#EEFDF7] border border-[#C7D7FE] space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#174BFF]" />
              18. Privacy Contact and Grievance Redressal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p><strong className="text-[#64718F]">Platform:</strong> <span className="text-[#10183F]">OneClickBiz</span></p>
                <p><strong className="text-[#64718F]">Website:</strong> <a href="https://www.oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">https://www.oneclickbiz.in</a></p>
                <p><strong className="text-[#64718F]">Operator:</strong> <span className="text-[#10183F] font-semibold">Merlinflow Technologies Private Limited</span></p>
                <p><strong className="text-[#64718F]">Office Location:</strong> <span className="text-[#475569]">Nagole, Hyderabad, Telangana 500068, India</span></p>
                <p><strong className="text-[#64718F]">Phone / WhatsApp:</strong> <a href="tel:+918374372733" className="text-[#174BFF] hover:underline font-semibold">+91 8374372733</a></p>
              </div>
              <div className="space-y-1">
                <p><strong className="text-[#64718F]">Official Privacy Email:</strong> <a href="mailto:privacy@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">privacy@oneclickbiz.in</a></p>
                <p><strong className="text-[#64718F]">Grievance Officer:</strong> <span className="text-[#10183F] font-semibold">Adduri Sai Kishore</span></p>
                <p><strong className="text-[#64718F]">Grievance Email:</strong> <a href="mailto:grievance@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">grievance@oneclickbiz.in</a></p>
                <p><strong className="text-[#64718F]">Registered Office:</strong> <span className="text-[#475569]">Nagole, Hyderabad, Telangana 500068, India</span></p>
              </div>
            </div>
            <p className="text-[11px] text-[#64718F] pt-2 border-t border-[#E2E9FA]">
              For privacy inquiries, DPDP Act data rights, or statutory complaints, contact the Grievance Officer above.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
