'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Menu, 
  X,
  ExternalLink
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
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Crisp Frosted Capsule */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <div className="flex items-center px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-sm group-hover:scale-105 group-hover:bg-white transition-all duration-200">
              <img 
                src="/logo-brand.png?v=4" 
                alt="OneClickBiz - Connect | Build | Share" 
                className="h-7 xs:h-8 sm:h-9 w-auto max-w-[130px] xs:max-w-[160px] sm:max-w-[210px] object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links - Shown on LG screens (1024px+) with refined glass styling */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-500/20 border border-indigo-500/30 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span>How It Works</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Templates
            </Link>

            <Link 
              href="/#features" 
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Features
            </Link>
            
            <Link 
              href="/#about" 
              onClick={(e) => handleAnchorClick(e, 'about')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Why OneClickBiz
            </Link>
            
            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Services
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Pricing
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Contact
            </Link>

            {/* Live Demo Glowing Pill */}
            <Link 
              href="/v/kishore" 
              target="_blank"
              className="ml-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 flex items-center gap-1.5 transition-all shadow-xs group"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </Link>
          </div>

          {/* Right Action CTAs & Tablet/Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link 
              href="/login"
              className="hidden sm:inline-flex px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 shadow-sm transition-all backdrop-blur-md"
            >
              Sign In
            </Link>
            
            <Link 
              href="/signup?intent=create_card"
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <span>Create Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile & Tablet Menu Toggle Button (Visible on screens < lg) */}
            <div className="flex lg:hidden items-center pl-0.5 sm:pl-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 shadow-sm transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-indigo-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-3xl px-4 sm:px-6 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[85vh] overflow-y-auto">
          <Link 
            href="/#demo" 
            onClick={(e) => handleAnchorClick(e, 'demo')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-300 bg-indigo-500/20 border border-indigo-400/30"
          >
            How It Works (Interactive Tour)
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Templates Catalog
          </Link>
          <Link 
            href="/#features" 
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Core Features
          </Link>
          <Link 
            href="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Why OneClickBiz
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Services Offered
          </Link>

          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Pricing
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10"
          >
            Contact
          </Link>
          <Link 
            href="/v/kishore" 
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30"
          >
            ✨ Explore Live Demo Card (/v/kishore)
          </Link>

          <div className="pt-3 flex flex-col sm:flex-row gap-2 border-t border-white/10">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              <span>Sign In</span>
            </Link>
            <Link 
              href="/signup?intent=create_card"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>Create Smart Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
