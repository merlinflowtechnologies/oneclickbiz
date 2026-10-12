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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Transparent Background matching Light Theme */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo-light.png" 
              alt="OneClickBiz - Connect | Build | Grow" 
              className="h-10 sm:h-12 w-auto max-w-[210px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links - Shown on XL screens (1280px+) where ample horizontal space exists */}
          <div className="hidden xl:flex items-center space-x-1">
            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50/90 border border-indigo-200/60 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>How It Works</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Templates
            </Link>

            <Link 
              href="/#features" 
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Features
            </Link>
            
            <Link 
              href="/#about" 
              onClick={(e) => handleAnchorClick(e, 'about')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              About
            </Link>
            
            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Services
            </Link>

            {/* Direct Products Link */}
            <Link 
              href="/#products" 
              onClick={(e) => handleAnchorClick(e, 'products')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Products
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Pricing
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-all"
            >
              Contact
            </Link>

            {/* Live Demo Glowing Pill */}
            <Link 
              href="/v/kishore" 
              target="_blank"
              className="ml-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center gap-1.5 transition-all shadow-sm group"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </Link>
          </div>

          {/* Right Action CTAs & Tablet/Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Demo Pill for Tablets (md & lg screens) */}
            <Link 
              href="/v/kishore" 
              target="_blank"
              className="hidden md:flex xl:hidden px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 items-center gap-1.5 transition-all shadow-xs group"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden lg:inline">Live Demo</span>
              <span className="lg:hidden">Demo</span>
              <ExternalLink className="w-3 h-3 text-emerald-600" />
            </Link>

            <Link 
              href="/login"
              className="hidden sm:inline-flex px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all"
            >
              Sign In
            </Link>
            
            <Link 
              href="/signup?intent=create_card"
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <span>Create Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile & Tablet Menu Toggle Button (Visible on screens < xl) */}
            <div className="flex xl:hidden items-center pl-0.5 sm:pl-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition cursor-pointer"
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
        <div className="xl:hidden border-b border-slate-200 bg-white/95 backdrop-blur-2xl px-4 sm:px-6 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
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
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Templates Catalog
          </Link>
          <Link 
            href="/#features" 
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Core Features
          </Link>
          <Link 
            href="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            About OneClickBiz
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Services Offered
          </Link>
          <Link 
            href="/#products" 
            onClick={(e) => handleAnchorClick(e, 'products')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Products Ecosystem
          </Link>
          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Pricing
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100"
          >
            Contact
          </Link>
          <Link 
            href="/v/kishore" 
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300"
          >
            ✨ Explore Live Demo Card (/v/kishore)
          </Link>

          <div className="pt-3 flex flex-col sm:flex-row gap-2 border-t border-slate-200">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition"
            >
              <span>Sign In</span>
            </Link>
            <Link 
              href="/signup?intent=create_card"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition active:scale-95"
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
