'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
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
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Transparent Background matching Light Theme */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo-brand.png?v=4" 
              alt="OneClickBiz - Connect | Build | Share" 
              className="h-8 xs:h-9 sm:h-11 w-auto max-w-[145px] xs:max-w-[180px] sm:max-w-[240px] object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links - Shown on LG screens (1024px+) with refined light styling */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50/90 border border-indigo-200/60 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>How It Works</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Templates
            </Link>

            <Link 
              href="/#features" 
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Features
            </Link>
            
            <Link 
              href="/#about" 
              onClick={(e) => handleAnchorClick(e, 'about')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Why OneClickBiz
            </Link>
            
            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Services
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Pricing
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Contact
            </Link>

            {/* Live Demo Glowing Pill */}
            <Link 
              href="/v/kishore" 
              target="_blank"
              className="ml-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center gap-1.5 transition-all shadow-xs group"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </Link>
          </div>

          {/* Right Action CTAs & Tablet/Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link 
              href="/login"
              className="inline-flex px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-all backdrop-blur-md"
            >
              Sign In
            </Link>

            <Link 
              href="/signup?intent=get_started"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 items-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile & Tablet Menu Toggle Button (Visible on screens < lg) */}
            <div className="flex lg:hidden items-center pl-0.5 sm:pl-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 shadow-xs transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200/80 bg-white/95 backdrop-blur-3xl px-4 sm:px-6 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          <Link 
            href="/#demo" 
            onClick={(e) => handleAnchorClick(e, 'demo')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200"
          >
            How It Works (Interactive Tour)
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Templates Catalog
          </Link>
          <Link 
            href="/#features" 
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Core Features
          </Link>
          <Link 
            href="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Why OneClickBiz
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Services Offered
          </Link>

          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Pricing
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
          >
            Contact
          </Link>
          <Link 
            href="/v/kishore" 
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
          >
            ✨ Explore Live Demo Card (/v/kishore)
          </Link>

          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition"
            >
              <span>Sign In</span>
            </Link>
            <Link 
              href="/signup?intent=get_started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
