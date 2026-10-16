'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
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
  Lock,
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
    <footer className="bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 text-slate-300 text-xs relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[150px] pointer-events-none -z-10" />

      {/* Top Banner / Newsletter CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-indigo-950/70 via-purple-950/60 to-slate-900/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Smart Business Identity</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Professional Identity?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Built for Indian retailers, doctors, builders, and service professionals for 1-click .VCF contact saving, instant WhatsApp stores, and 0% fee direct UPI payments.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input 
                type="email" 
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your work email" 
                className="px-4 py-3 rounded-xl bg-slate-900/80 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 flex-1 shadow-inner backdrop-blur-md"
              />
              <button 
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-95 shadow-lg shadow-indigo-500/25 text-center flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95"
              >
                <span>Create Free Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free Starter Tier
              </span>
              <span>•</span>
              <span>No credit card needed</span>
              <span>•</span>
              <span>Takes 2 minutes</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand & Verified Contact Card Column (5 Cols on LG) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Logo with clean frosted capsule */}
            <Link href="/" className="inline-block group py-0.5">
              <div className="inline-flex items-center px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-sm group-hover:scale-105 transition-all duration-200">
                <img 
                  src="/logo-brand.png?v=4" 
                  alt="OneClickBiz - Connect | Build | Share" 
                  className="h-8 sm:h-9 w-auto max-w-[160px] sm:max-w-[190px] object-contain"
                />
              </div>
            </Link>

            <p className="text-slate-300 leading-relaxed text-xs max-w-md">
              Next-generation digital business identity platform. Empowering entrepreneurs, sales teams, and modern professionals with smart digital business profiles, dynamic QR codes, and WhatsApp mini-stores.
            </p>

            {/* Verified Support & Contact Card */}
            <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 space-y-2.5 text-xs shadow-md">
              
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-white font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Adduri Sai Kishore</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30">
                  Verified Desk
                </span>
              </div>

              {/* Contact Rows */}
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <a 
                  href="https://wa.me/916304989071?text=Hi%20OneClickBiz%20Support%2C%20I%20have%20an%20inquiry." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 hover:text-emerald-400 transition group font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono font-semibold text-white">+91 63049 89071</span>
                  <span className="text-[9px] text-emerald-400 font-semibold">(WhatsApp &amp; Call)</span>
                </a>

                <a 
                  href="mailto:support@oneclickbiz.in" 
                  className="flex flex-wrap items-center gap-1.5 hover:text-indigo-300 transition group break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="font-mono text-slate-200 group-hover:text-indigo-300">support@oneclickbiz.in</span>
                  <span className="text-[9px] text-slate-500">•</span>
                  <span className="font-mono text-slate-400 group-hover:text-indigo-300">contact@oneclickbiz.in</span>
                </a>

                <div className="flex items-start gap-2 text-slate-300 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>Nagole, Hyderabad, Telangana 500068, India</span>
                </div>
              </div>

            </div>

            {/* Social Channels Row */}
            <div className="flex items-center gap-2 pt-1 text-slate-400">
              <a 
                href="https://wa.me/916304989071?text=Hi%20OneClickBiz%2C%20I%20have%20an%20inquiry." 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-emerald-400 border border-white/10 shadow-sm transition-all hover:scale-105"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <SocialIcon platform="whatsapp" size={16} />
              </a>

              <a 
                href="https://instagram.com/oneclickbiz.in" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-pink-400 border border-white/10 shadow-sm transition-all hover:scale-105"
                title="Follow on Instagram"
                aria-label="Follow on Instagram"
              >
                <SocialIcon platform="instagram" size={16} />
              </a>

              <a 
                href="https://linkedin.com/company/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-blue-400 border border-white/10 shadow-sm transition-all hover:scale-105"
                title="Connect on LinkedIn"
                aria-label="Connect on LinkedIn"
              >
                <SocialIcon platform="linkedin" size={16} />
              </a>

              <a 
                href="https://twitter.com/oneclickbiz" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-cyan-400 border border-white/10 shadow-sm transition-all hover:scale-105"
                title="Follow on Twitter / X"
                aria-label="Follow on Twitter / X"
              >
                <SocialIcon platform="twitter" size={16} />
              </a>

              <a 
                href="mailto:support@oneclickbiz.in" 
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-indigo-400 border border-white/10 shadow-sm transition-all hover:scale-105"
                title="Email Support Desk"
                aria-label="Email Support Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Navigation Columns (7 Cols on LG: 4 Balanced Sub-columns) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            
            {/* Col 1: Products */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Products</span>
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-white transition">Mini Websites &amp; Profiles</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">Dynamic vCards</Link></li>
                <li><Link href="/#whatsapp-store" onClick={(e) => handleAnchorClick(e, 'whatsapp-store')} className="hover:text-white transition">WhatsApp Store</Link></li>
                <li><Link href="/scan" className="hover:text-white transition">Dynamic QR Studio</Link></li>
                <li><Link href="/#blogs" onClick={(e) => handleAnchorClick(e, 'blogs')} className="hover:text-white transition">Brochure &amp; Blog Studio</Link></li>
                <li><Link href="/vcard-templates" className="hover:text-indigo-300 transition text-indigo-400 font-semibold flex items-center gap-1">Templates Gallery</Link></li>
              </ul>
            </div>

            {/* Col 2: Solutions */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Solutions</span>
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="hover:text-white transition">For Executives</Link></li>
                <li><Link href="/#templates" onClick={(e) => handleAnchorClick(e, 'templates')} className="hover:text-white transition">For Real Estate</Link></li>
                <li><Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-white transition">For Retail &amp; Dining</Link></li>
                <li><Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-white transition">Corporate Teams</Link></li>
                <li><Link href="/#demo" onClick={(e) => handleAnchorClick(e, 'demo')} className="hover:text-white transition">1-Click .VCF Save</Link></li>
                <li><Link href="/#booking" onClick={(e) => handleAnchorClick(e, 'booking')} className="hover:text-white transition">Booking Engine</Link></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-pink-400" />
                <span>Company</span>
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><Link href="/#demo" onClick={(e) => handleAnchorClick(e, 'demo')} className="hover:text-white transition text-indigo-400 font-semibold">How It Works</Link></li>
                <li><Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-white transition">Pricing Plans</Link></li>
                <li><Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-white transition">Enterprise</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition flex items-center gap-1.5"><span>Careers</span><span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30">Hiring</span></Link></li>
              </ul>
            </div>

            {/* Col 4: Legal & Policies */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Legal</span>
              </h4>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li>
                  <Link href="/privacy" className="hover:text-white transition flex items-center gap-1.5">
                    <span>Privacy Policy</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-400/30">Zero-Ads</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    <span>Terms &amp; Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition">
                    <span>Refund Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-indigo-600 transition">
                    <span>Shipping Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-indigo-600 transition">
                    <span>Cookie Policy</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* High-Impact Trust & Security Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">256-Bit SSL</p>
              <p className="text-[10px] text-slate-500">Secure &amp; encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Cloud Hosted</p>
              <p className="text-[10px] text-slate-500">Fast &amp; always online</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">0% Fees</p>
              <p className="text-[10px] text-slate-500">Direct client orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Direct Support</p>
              <p className="text-[10px] text-slate-500">WhatsApp &amp; Helpdesk</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-200 py-6 pb-8 sm:pb-6 text-center text-slate-500 text-[11px] bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} OneClickBiz. All rights reserved. Developed &amp; Maintained by{' '}
            <span className="text-slate-800 font-semibold">Merlinflow Technologies Pvt Ltd</span>.
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for modern business growth.</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
