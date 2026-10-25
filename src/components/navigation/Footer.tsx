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
  ExternalLink,
  CheckCircle2,
  Globe
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
    <footer className="bg-[#1B2A4A] border-t border-[#C7D7FE] text-white relative overflow-hidden">
      
      {/* Top CTA Banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10">
            
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Ready to Upgrade Your Professional Identity?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
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
                  className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] flex-1 min-w-[240px]"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm text-center flex items-center justify-center gap-2 shrink-0 transition-colors active:scale-95 cursor-pointer"
                >
                  <span>Create Free Card</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[#00875A] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Starter Tier
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
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Share" 
                className="h-8 sm:h-9 w-auto max-w-[160px] sm:max-w-[190px] object-contain brightness-0 invert opacity-90 transition-opacity group-hover:opacity-100 duration-200"
              />
            </Link>

            <p className="text-slate-400 leading-relaxed text-sm max-w-md">
              Next-generation digital business identity platform. Empowering entrepreneurs, sales teams, and modern professionals with smart digital business profiles, dynamic QR codes, and WhatsApp mini-stores.
            </p>

            {/* Contact Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 text-sm">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#00875A] shrink-0" />
                  <span>Adduri Sai Kishore</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold text-[#00875A] bg-[#00875A]/10 border border-[#00875A]/20">
                  Verified
                </span>
              </div>

              <div className="space-y-2 text-slate-300 text-sm">
                <a 
                  href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20have%20an%20inquiry." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 hover:text-[#00875A] transition font-medium"
                >
                  <Phone className="w-4 h-4 text-[#00875A] shrink-0" />
                  <span className="font-mono font-semibold">+91 63049 89071</span>
                  <span className="text-xs text-slate-500">(WhatsApp &amp; Call)</span>
                </a>

                <a 
                  href="mailto:support@oneclickbiz.in" 
                  className="flex items-center gap-2 hover:text-[#0066FF] transition"
                >
                  <Mail className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span className="font-mono text-slate-300">support@oneclickbiz.in</span>
                </a>

                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
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
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#00875A] border border-white/10 transition-all"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <SocialIcon platform="whatsapp" size={16} />
              </a>

              <a 
                href="https://instagram.com/oneclickbiz.in" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 border border-white/10 transition-all"
                title="Follow on Instagram"
                aria-label="Follow on Instagram"
              >
                <SocialIcon platform="instagram" size={16} />
              </a>

              <a 
                href="https://linkedin.com/company/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-400 border border-white/10 transition-all"
                title="Connect on LinkedIn"
                aria-label="Connect on LinkedIn"
              >
                <SocialIcon platform="linkedin" size={16} />
              </a>

              <a 
                href="https://twitter.com/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
                title="Follow on Twitter / X"
                aria-label="Follow on Twitter / X"
              >
                <SocialIcon platform="twitter" size={16} />
              </a>

              <a 
                href="mailto:support@oneclickbiz.in" 
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#0066FF] border border-white/10 transition-all"
                title="Email Support Desk"
                aria-label="Email Support Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            
            {/* Products */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Products</h4>
              <ul className="space-y-2.5 text-slate-400 text-sm">
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">Mini Websites</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">Dynamic Digital Cards</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">WhatsApp Store</Link></li>
                <li><Link href="/scan" className="hover:text-white transition">Dynamic QR Studio</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">Brochure &amp; Blog Studio</Link></li>
                <li><Link href="/vcard-templates" className="hover:text-white transition text-[#0066FF] font-semibold">Templates Gallery</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Solutions</h4>
              <ul className="space-y-2.5 text-slate-400 text-sm">
                <li><Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="hover:text-white transition">For Executives</Link></li>
                <li><Link href="/#templates" onClick={(e) => handleAnchorClick(e, 'templates')} className="hover:text-white transition">For Real Estate</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">For Retail &amp; Dining</Link></li>
                <li><Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-white transition">Corporate Teams</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">1-Click .VCF Save</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">Booking Engine</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-slate-400 text-sm">
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition text-[#0066FF] font-semibold">How It Works</Link></li>
                <li><Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-white transition">Pricing Plans</Link></li>
                <li><Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-white transition">Enterprise</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition flex items-center gap-1.5"><span>Careers</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00875A]/20 text-[#00875A] font-semibold">Hiring</span></Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-bold text-white uppercase text-xs tracking-wider">Legal</h4>
              <ul className="space-y-2.5 text-slate-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link></li>
                <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Trust Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">256-Bit SSL</p>
              <p className="text-xs text-slate-500">Secure &amp; encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Cloud Hosted</p>
              <p className="text-xs text-slate-500">Fast &amp; always online</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">0% Fees</p>
              <p className="text-xs text-slate-500">Direct client orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#00875A]/10 text-[#00875A] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Direct Support</p>
              <p className="text-xs text-slate-500">WhatsApp &amp; Helpdesk</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-6 pb-8 sm:pb-6 text-center bg-[#142238]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} OneClickBiz. All rights reserved. Developed &amp; Maintained by{' '}
            <span className="text-slate-300 font-semibold">Merlinflow Technologies Pvt Ltd</span>.
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>for modern business growth.</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
