'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { 
  Zap, 
  ArrowLeft, 
  CheckCircle2, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Mail, 
  FileText,
  Smartphone,
  QrCode,
  Layers,
  MapPin,
  Ban
} from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#10183F] font-sans flex flex-col selection:bg-[#174BFF] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#174BFF] hover:text-[#174BFF] mb-8 transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-4 mb-10 pb-6 border-b border-[#E2E9FA]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Digital Fulfillment & Delivery Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#10183F] tracking-tight">
            Digital Delivery & Fulfillment Policy
          </h1>
          <p className="text-sm text-[#475569] max-w-3xl leading-relaxed">
            OneClickBiz is a 100% cloud-hosted digital SaaS platform. This policy outlines our automated digital provisioning workflows, instant activation schedules, and electronic dispatch timelines.
          </p>
          <div className="pt-2 text-xs text-[#64718F] font-medium">
            Effective: September 2026 • Compliant with Indian Information Technology Act (2000) & E-Commerce Service Standards
          </div>
        </div>

        {/* Digital Notice Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 mb-10 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-[#0284C7] font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>100% Paperless &amp; Pure Digital SaaS Operation</span>
          </div>
          <p className="text-xs sm:text-sm text-[#10183F] leading-relaxed">
            OneClickBiz does <strong>NOT</strong> ship physical plastic, paper, or metal business cards. All identity cards, dynamic QR codes, portfolio showcases, and WhatsApp mini-stores are provisioned <strong>electronically and delivered instantaneously over the cloud</strong>.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#475569] leading-relaxed">
          
          {/* 1. Instant Digital Delivery */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              1. Automated Cloud Provisioning (0 to 60 Seconds)
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              Upon successful payment authorization via our certified payment gateway (Cashfree/UPI/Debit/Credit Card/NetBanking):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#475569] text-xs">
              <li><strong>Instant Activation:</strong> Your custom vanity handle (e.g. <code className="text-[#174BFF] font-mono">oneclickbiz.in/v/yourname</code>), dynamic QR code generator, and profile studio are unlocked within <strong>0 to 60 seconds</strong>.</li>
              <li><strong>Electronic Invoice & Access:</strong> GST-compliant tax invoices, order receipts, and admin dashboard access credentials are dispatched to your registered email address immediately.</li>
              <li><strong>Cross-Platform Compatibility:</strong> Digital cards are instantly accessible via standard mobile browsers on iOS, Android, and Desktop without requiring third-party app installations.</li>
            </ul>
          </section>

          {/* 2. Custom Domain Provisioning SLA */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              2. White-Label Custom Domain (CNAME) Activation Window
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              For Pro and Advanced plan subscribers connecting their custom domain (e.g. <code className="text-[#174BFF] font-mono">card.yourcompany.com</code>):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E9FA] space-y-1">
                <p className="font-bold text-[#10183F] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> DNS Propagation Window
                </p>
                <p className="text-[#64718F] text-[11px]">
                  Global DNS propagation generally completes within <strong>15 to 60 minutes</strong> after configuring the CNAME record at your domain registrar.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E9FA] space-y-1">
                <p className="font-bold text-[#10183F] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Automated SSL Issuance
                </p>
                <p className="text-[#64718F] text-[11px]">
                  Zero-configuration 256-bit TLS/SSL encryption certificates are automatically generated and renewed at no extra cost.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Delivery Method Comparison */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              3. Digital Delivery Channels & Methods
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#E2E9FA] rounded-2xl overflow-hidden">
                <thead className="bg-[#F8FAFD] text-[#475569] font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-[#E2E9FA]">Feature / Service</th>
                    <th className="p-3 border-b border-[#E2E9FA]">Fulfillment Method</th>
                    <th className="p-3 border-b border-[#E2E9FA]">Delivery Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E9FA] text-[#64718F]">
                  <tr>
                    <td className="p-3 font-bold text-[#10183F]">Smart Identity Card (`/v/username`)</td>
                    <td className="p-3">Global Edge CDN Web URL</td>
                    <td className="p-3 text-[#059669] font-semibold">Instant (0–60 Seconds)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#10183F]">Dynamic SVG / PNG QR Code</td>
                    <td className="p-3">In-Dashboard Vector Engine</td>
                    <td className="p-3 text-[#059669] font-semibold">Instant (Real-time)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#10183F]">1-Click .VCF Contact Download</td>
                    <td className="p-3">Dynamic Mobile File Generator</td>
                    <td className="p-3 text-[#059669] font-semibold">Instant (On-demand)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#10183F]">Custom Domain CNAME SSL</td>
                    <td className="p-3">Cloudflare / Edge DNS Proxy</td>
                    <td className="p-3 text-[#174BFF] font-semibold">15 to 60 Minutes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#10183F]">Brochures &amp; PDF Export Suite</td>
                    <td className="p-3">Browser Client-Side Vector PDF Engine</td>
                    <td className="p-3 text-[#059669] font-semibold">Instant Download</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Service Availability & Non-Physical Statement */}
          <section className="space-y-3 p-6 rounded-3xl bg-white shadow-xs border border-[#E2E9FA]">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Ban className="w-4 h-4 text-amber-400" />
              4. Clarification on Physical Hardware
            </h2>
            <p className="text-[#475569] text-xs leading-relaxed">
              Customers are explicitly advised that OneClickBiz does not dispatch physical couriers, shipping boxes, or hardware. There are zero shipping fees, transit damages, or courier delays involved.
            </p>
            <p className="text-[#64718F] text-xs leading-relaxed">
              Users can write their digital OneClickBiz card link to their own NFC tags or cards using standard third-party mobile apps (like NFC Tools) if they choose to use their own physical tags.
            </p>
          </section>

          {/* 5. Official Fulfillment Contact */}
          <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EDF4FF] via-white to-[#EDF4FF] border border-[#C7D7FE] space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-[#10183F] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#174BFF]" />
              5. Fulfillment &amp; Digital Provisioning Desk
            </h2>
            <p className="text-xs text-[#64718F]">
              For account activation assistance, domain routing support, or electronic invoice requests:
            </p>
            <div className="text-xs text-[#475569] space-y-1.5 pt-1">
              <p><strong className="text-[#10183F]">Primary Support:</strong> Adduri Sai Kishore (<a href="https://wa.me/916304989071" target="_blank" rel="noreferrer" className="text-[#174BFF] hover:underline font-semibold">+91 6304 989 071</a>)</p>
              <p><strong className="text-[#10183F]">Provisioning Email:</strong> <a href="mailto:support@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">support@oneclickbiz.in</a> / <a href="mailto:contact@oneclickbiz.in" className="text-[#174BFF] hover:underline font-semibold">contact@oneclickbiz.in</a></p>
              <p><strong className="text-[#10183F]">Operations Hub:</strong> Nagole, Hyderabad, Telangana, 500068, India</p>
              <p><strong className="text-[#10183F]">Platform Engineering:</strong> Developed &amp; Maintained by Merlinflow Technologies Pvt Ltd</p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

