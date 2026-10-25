'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <footer className="bg-white border-t border-[#E2E9FA] text-[#64718F] pt-12 sm:pt-16 pb-8 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-[#E2E9FA]/80">
          
          {/* Column 1: Brand & Socials (3 cols on desktop) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 space-y-4">
            <Link href="/" className="inline-block py-1">
              <img 
                src="/logo-brand.png?v=5" 
                alt="OneClickBiz Logo" 
                className="h-8 xs:h-9 w-auto max-w-[170px] object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#64718F] leading-relaxed max-w-xs">
              Start Online, Grow Everywhere. The all-in-one business growth platform for modern entrepreneurs and enterprises.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {['facebook', 'instagram', 'youtube', 'linkedin'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#E2E9FA] bg-[#F8FAFF] hover:bg-[#EDF3FF] hover:border-blue-300 flex items-center justify-center text-[#64718F] hover:text-[#174BFF] transition-all"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform as any} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on desktop) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10183F]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#174BFF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#templates" onClick={(e) => handleAnchorClick(e, 'templates')} className="hover:text-[#174BFF] transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/#pricing" onClick={(e) => handleAnchorClick(e, 'pricing')} className="hover:text-[#174BFF] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#features" onClick={(e) => handleAnchorClick(e, 'features')} className="hover:text-[#174BFF] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#174BFF] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (2 cols on desktop) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10183F]">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  Online Store
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  Booking System
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  Custom Domain
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  WhatsApp Integration
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleAnchorClick(e, 'services')} className="hover:text-[#174BFF] transition-colors">
                  Lead Capture
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support (2 cols on desktop) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10183F]">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-[#174BFF] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/#contact" onClick={(e) => handleAnchorClick(e, 'contact')} className="hover:text-[#174BFF] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#174BFF] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#174BFF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#174BFF] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#174BFF] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Subscribe to Updates (3 cols on desktop) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#10183F]">
              Subscribe to Updates
            </h4>
            <p className="text-xs text-[#64718F] leading-relaxed">
              Get the latest updates, new templates and exclusive features.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-[#F8FAFF] border border-[#E2E9FA] text-xs text-[#10183F] placeholder-[#64718F] focus:outline-none focus:border-[#174BFF] focus:ring-1 focus:ring-[#174BFF] transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 rounded-lg bg-[#174BFF] hover:bg-[#133FDF] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#16B981] font-medium animate-in fade-in">
                Thank you for subscribing!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Row: Copyright + Policy Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64718F]">
          <div>
            © 2026 OneClickBiz. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#174BFF] transition-colors">
              Terms & Conditions
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
