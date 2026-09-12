'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, MessageCircle, Mail, MapPin, Phone, ShieldCheck, Heart, ArrowRight, Zap } from 'lucide-react';

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
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Top Banner / Newsletter */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/50 p-6 sm:p-8 rounded-3xl border border-indigo-500/10">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Ready to Upgrade Your Professional Identity?
            </h3>
            <p className="text-slate-300 mt-1 text-xs sm:text-sm">
              Create your dynamic vCard with WhatsApp store & brochure studio in under 2 minutes.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input 
              type="email" 
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your work email" 
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 flex-1"
            />
            <button 
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-xs hover:opacity-90 shadow-lg text-center flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-14">
          
          {/* Brand Column */}
          <div className="space-y-3.5 max-w-sm">
            <Link href="/" className="inline-block group py-1">
              <img 
                src="/logo.png" 
                alt="OneClickBiz - Business Made Simpler" 
                className="h-12 sm:h-14 w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Next-generation digital business identity, interactive mini stores, appointment booking, and dynamic vCard sharing for modern businesses.
            </p>
            <div className="space-y-1.5 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-[11px] font-semibold text-emerald-400">Contact:</span>
                <span className="text-white font-medium">Adduri Sai Kishore</span>
                <span className="font-mono text-slate-400">(+91 63049 89071)</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="text-indigo-400 font-semibold">Email:</span>
                <a href="mailto:support@oneclickbiz.in" className="hover:text-white transition">support@oneclickbiz.in</a>
                <span>•</span>
                <a href="mailto:contact@oneclickbiz.in" className="hover:text-white transition">contact@oneclickbiz.in</a>
              </div>
              <div className="flex items-start gap-1.5 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>Nagole, Hyderabad, Telangana, India</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2.5 text-slate-400">
              <a 
                href="https://wa.me/916304989071?text=Hi%20Adduri%20Sai%20Kishore%2C%20I%20have%20an%20inquiry%20regarding%20OneClickBiz." 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-lg bg-slate-900 hover:text-emerald-400 border border-slate-800 transition"
                title="Chat on WhatsApp (+91 63049 89071)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="mailto:support@oneclickbiz.in" 
                className="p-2 rounded-lg bg-slate-900 hover:text-indigo-400 border border-slate-800 transition"
                title="Email Support Desk (support@oneclickbiz.in)"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@oneclickbiz.in" 
                className="p-2 rounded-lg bg-slate-900 hover:text-indigo-400 border border-slate-800 transition"
                title="Email Contact Desk (contact@oneclickbiz.in)"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
              </a>
            </div>
          </div>

          {/* Grouped Links: Company & Legal */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16 w-full md:w-auto">
            {/* Col 1: Company */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/#demo" onClick={(e) => handleAnchorClick(e, 'demo')} className="hover:text-white transition text-indigo-400">How It Works (Demo)</Link></li>
                <li><Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-white transition">Pricing & Plans</Link></li>
                <li><Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-white transition">Enterprise</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Col 2: Legal */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Legal</span>
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-white transition flex items-center gap-1.5">
                    <span>Privacy Policy</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Zero-Ads</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition flex items-center gap-1.5">
                    <span>Terms & Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition flex items-center gap-1.5">
                    <span>Refund / Cancellation Policy</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 font-medium">Final Sale</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white transition flex items-center gap-1.5">
                    <span>Cookie Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* High-Impact Trust & Security Strip */}
        <div className="mt-10 pt-6 border-t border-slate-900/80 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-200">256-Bit SSL</p>
              <p className="text-[10px] text-slate-500">Bank-grade encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-200">99.9% Uptime</p>
              <p className="text-[10px] text-slate-500">Global edge CDN</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-200">Instant Provisioning</p>
              <p className="text-[10px] text-slate-500">Immediate cloud setup</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-200">Direct Support</p>
              <p className="text-[10px] text-slate-500">WhatsApp & Helpdesk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-500 text-[11px]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} OneClickBiz. All rights reserved. Developed & Maintained by <span className="text-slate-300 font-semibold">Merlinflow Technologies Pvt Ltd</span>.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for modern enterprise growth.
          </p>
        </div>
      </div>

    </footer>
  );
}
