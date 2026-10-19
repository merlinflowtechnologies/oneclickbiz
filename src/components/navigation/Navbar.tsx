'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${targetId}`);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo-brand.png?v=4" 
              alt="OneClickBiz - Connect | Build | Share" 
              className="h-8 xs:h-9 sm:h-10 w-auto max-w-[145px] xs:max-w-[180px] sm:max-w-[220px] object-contain transition-opacity group-hover:opacity-80 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3 py-2 text-sm font-semibold text-[#1B2A4A] hover:text-[#0066FF] transition-colors"
            >
              How It Works
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              Templates
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="/#about" 
              onClick={(e) => handleAnchorClick(e, 'about')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              Why OneClickBiz
            </Link>

            <Link 
              href="/#faq" 
              onClick={(e) => handleAnchorClick(e, 'faq')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              FAQ
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#0066FF] transition-colors"
            >
              Contact
            </Link>

            {/* Live Demo Link */}
            <Link 
              href="/v/kishore" 
              target="_blank"
              className="ml-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-[#00875A] hover:bg-green-50 flex items-center gap-1.5 transition-colors"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00875A]" />
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-[#1B2A4A] hover:text-[#0066FF] hover:bg-slate-50 border border-slate-200 transition-all"
            >
              Sign In
            </Link>

            <Link 
              href="/signup?intent=get_started"
              className="hidden sm:inline-flex px-5 py-2 rounded-lg text-sm font-bold text-white bg-[#0066FF] hover:bg-[#0052CC] items-center gap-1.5 transition-colors active:scale-95 shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#0066FF]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 sm:px-6 pt-3 pb-6 space-y-1 shadow-lg">
          <Link 
            href="/#demo" 
            onClick={(e) => handleAnchorClick(e, 'demo')}
            className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#1B2A4A] hover:bg-slate-50 transition"
          >
            How It Works
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition"
          >
            Templates
          </Link>
          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition"
          >
            Pricing
          </Link>
          <Link 
            href="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition"
          >
            Why OneClickBiz
          </Link>
          <Link 
            href="/#faq" 
            onClick={(e) => handleAnchorClick(e, 'faq')}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition"
          >
            FAQ
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-slate-50 transition"
          >
            Contact
          </Link>
          <Link 
            href="/v/kishore" 
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-sm font-semibold text-[#00875A] hover:bg-green-50 transition"
          >
            ✨ Explore Live Demo Card
          </Link>

          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/signup?intent=get_started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-sm font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
