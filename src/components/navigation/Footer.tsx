'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Heart, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  Globe,
  ChevronRight
} from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';

export default function Footer() {
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      router.push(`/signup?email=${encodeURIComponent(newsletterEmail.trim())}&intent=build_card`);
    } else {
      router.push('/signup?intent=build_card');
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#F8FAFD] via-white to-[#F0F5FD] border-t border-[#C7D7FE] text-[#64718F] relative overflow-hidden">
      
      {/* Top CTA Banner */}
      <div className="border-b border-[#E2E9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#174BFF] via-[#103ED8] to-[#174BFF] text-white shadow-xl shadow-blue-500/10 border border-blue-400/30">
            
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Ready to Upgrade Your Professional Identity?
              </h3>
              <p className="text-sm text-blue-100 max-w-xl">
                Built for Indian retailers, doctors, builders, and service professionals — 1-click .VCF contact saving, instant WhatsApp stores, and 0% fee direct UPI payments.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input 
                  type="email" 
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your work email" 
                  className="px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder-blue-200 text-sm focus:outline-none focus:bg-white/20 focus:border-white focus:ring-2 focus:ring-white/40 flex-1 min-w-[240px]"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-[#174BFF] font-bold text-sm text-center flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  <span>Create Free Card</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center gap-3 mt-2.5 text-xs text-blue-100 justify-center lg:justify-start">
                <span className="flex items-center gap-1 font-semibold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Free Starter Tier
                </span>
                <span>•</span>
                <span>No credit card needed</span>
                <span>•</span>
                <span>Takes 2 minutes</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Logo */}
            <Link href="/" className="inline-block group py-0.5">
              <img 
                src="/logo-brand.png?v=5" 
                alt="OneClickBiz Logo" 
                className="h-8 sm:h-9 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-opacity group-hover:opacity-90 duration-200"
              />
            </Link>

            <p className="text-[#64718F] leading-relaxed text-sm max-w-md">
              Next-generation digital business identity platform. Empowering entrepreneurs, sales teams, and modern professionals with smart digital business profiles, dynamic QR codes, and WhatsApp mini-stores.
            </p>

            {/* Verified Contact Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#C7D7FE] shadow-xs space-y-3 text-sm">
              
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E9FA]">
                <div className="flex items-center gap-1.5 text-[#10183F] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#16B981] shrink-0" />
                  <span>Adduri Sai Kishore</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold text-[#059669] bg-[#ECFDF5] border border-[#A7F3D0]">
                  Verified
                </span>
              </div>

              <div className="space-y-2 text-[#64718F] text-sm">
                <a 
                  href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20have%20an%20inquiry." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 hover:text-[#174BFF] transition font-medium"
                >
                  <Phone className="w-4 h-4 text-[#16B981] shrink-0" />
                  <span className="font-mono font-semibold text-[#10183F]">+91 6304 989 071</span>
                  <span className="text-xs text-[#64718F]">(WhatsApp &amp; Call)</span>
                </a>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 text-xs pt-0.5">
                  <a 
                    href="mailto:support@oneclickbiz.in" 
                    className="flex items-center gap-1.5 hover:text-[#174BFF] transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#174BFF] shrink-0" />
                    <span className="font-mono text-[#10183F]">support@oneclickbiz.in</span>
                  </a>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <a 
                    href="mailto:contact@oneclickbiz.in" 
                    className="flex items-center gap-1.5 hover:text-[#174BFF] transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#174BFF] shrink-0" />
                    <span className="font-mono text-[#10183F]">contact@oneclickbiz.in</span>
                  </a>
                </div>

                <div className="flex items-start gap-2 text-[#64718F]">
                  <MapPin className="w-4 h-4 text-[#64718F] shrink-0 mt-0.5" />
                  <span>Nagole, Hyderabad, Telangana 500068, India</span>
                </div>
              </div>

            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%2C%20I%20have%20an%20inquiry." 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#64718F] hover:text-[#16B981] border border-[#E2E9FA] hover:border-emerald-300 flex items-center justify-center transition-all shadow-xs"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <SocialIcon platform="whatsapp" size={16} />
              </a>

              <a 
                href="https://instagram.com/oneclickbiz.in" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#64718F] hover:text-pink-500 border border-[#E2E9FA] hover:border-pink-300 flex items-center justify-center transition-all shadow-xs"
                title="Follow on Instagram"
                aria-label="Follow on Instagram"
              >
                <SocialIcon platform="instagram" size={16} />
              </a>

              <a 
                href="https://linkedin.com/company/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#64718F] hover:text-[#174BFF] border border-[#E2E9FA] hover:border-blue-300 flex items-center justify-center transition-all shadow-xs"
                title="Connect on LinkedIn"
                aria-label="Connect on LinkedIn"
              >
                <SocialIcon platform="linkedin" size={16} />
              </a>

              <a 
                href="https://twitter.com/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#64718F] hover:text-[#10183F] border border-[#E2E9FA] hover:border-slate-400 flex items-center justify-center transition-all shadow-xs"
                title="Follow on Twitter / X"
                aria-label="Follow on Twitter / X"
              >
                <SocialIcon platform="twitter" size={16} />
              </a>

              <a 
                href="mailto:support@oneclickbiz.in" 
                className="w-9 h-9 rounded-xl bg-white hover:bg-[#EEF4FF] text-[#64718F] hover:text-[#174BFF] border border-[#E2E9FA] hover:border-blue-300 flex items-center justify-center transition-all shadow-xs"
                title="Email Support Desk"
                aria-label="Email Support Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Navigation Columns (Quick Links matching website UI) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            
            {/* Products */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#10183F] uppercase text-xs tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174BFF]"></span>
                <span>Products</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Mini Websites</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Dynamic Cards</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>WhatsApp Store</span>
                  </Link>
                </li>
                <li>
                  <Link href="/scan" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Dynamic QR Studio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Brochure Studio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/vcard-templates" className="text-[#174BFF] font-semibold hover:text-[#103ED8] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#174BFF]" />
                    <span>Templates Gallery</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#10183F] uppercase text-xs tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174BFF]"></span>
                <span>Solutions</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>For Executives</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#templates" onClick={(e) => handleAnchorClick(e, 'templates')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>For Real Estate</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Retail &amp; Dining</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Corporate Teams</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>1-Click .VCF Save</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Booking Engine</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#10183F] uppercase text-xs tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174BFF]"></span>
                <span>Company</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="text-[#174BFF] font-semibold hover:text-[#103ED8] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#174BFF]" />
                    <span>How It Works</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>About Us &amp; Founder</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Pricing Plans</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Enterprise</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Careers</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#059669] font-bold border border-emerald-200">Hiring</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#10183F] uppercase text-xs tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#174BFF]"></span>
                <span>Legal</span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/privacy" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Terms &amp; Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Refund Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Shipping Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-[#64718F] hover:text-[#174BFF] transition-all hover:translate-x-1 inline-flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-[#C7D7FE]" />
                    <span>Cookie Policy</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Trust Strip matching website UI */}
        <div className="mt-12 pt-8 border-t border-[#E2E9FA] grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16B981] flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#10183F]">256-Bit SSL</p>
              <p className="text-[11px] text-[#64718F]">Secure &amp; encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#174BFF] flex items-center justify-center shrink-0 border border-blue-100">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#10183F]">Cloud Hosted</p>
              <p className="text-[11px] text-[#64718F]">Fast &amp; always online</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#174BFF] flex items-center justify-center shrink-0 border border-indigo-100">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#10183F]">0% Fees</p>
              <p className="text-[11px] text-[#64718F]">Direct client orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E2E9FA] shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16B981] flex items-center justify-center shrink-0 border border-emerald-100">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#10183F]">Direct Support</p>
              <p className="text-[11px] text-[#64718F]">WhatsApp &amp; Helpdesk</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#E2E9FA] py-6 pb-8 sm:pb-6 bg-[#EEF4FF]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#64718F]">
          <p>
            © {new Date().getFullYear()} OneClickBiz. All rights reserved. Developed &amp; Maintained by{' '}
            <span className="text-[#10183F] font-bold">Merlinflow Technologies Pvt Ltd</span>.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-medium">
            <Link href="/terms" className="hover:text-[#174BFF] transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-[#174BFF] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-[#174BFF] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
