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
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo.png" 
              alt="OneClickBiz - Business Made Simpler" 
              className="h-12 sm:h-14 w-auto max-w-[210px] sm:max-w-[260px] object-contain transition-transform group-hover:scale-105 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 transition-all flex items-center gap-1"
            >
              <span>How It Works</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Templates
            </Link>

            <Link 
              href="/#features" 
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Features
            </Link>
            
            <Link 
              href="/#about" 
              onClick={(e) => handleAnchorClick(e, 'about')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              About
            </Link>
            
            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Services
            </Link>

            {/* Direct Products Link */}
            <Link
              href="/#products"
              onClick={(e) => handleAnchorClick(e, 'products')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Products
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Pricing
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900/80 transition-all"
            >
              Contact
            </Link>

            {/* Live Demo Glowing Pill */}
            <Link 
              href="/v/alex-rivera" 
              target="_blank"
              className="ml-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5 transition-all shadow-sm group"
              title="Open Live Demo Business Card"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 text-emerald-400/80 group-hover:text-emerald-300 transition-colors" />
            </Link>
          </div>

          {/* Desktop Right Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link 
              href="/login"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800 transition-all"
            >
              Sign In
            </Link>
            
            <Link 
              href="/signup?intent=create_card"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 border border-indigo-400/20"
            >
              <span>Create Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-3">
          <Link 
            href="/#demo" 
            onClick={(e) => handleAnchorClick(e, 'demo')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20"
          >
            🎬 How It Works & Demo Video
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Templates
          </Link>
          <Link 
            href="/#features" 
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Features
          </Link>
          <Link 
            href="/#about" 
            onClick={(e) => handleAnchorClick(e, 'about')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            About
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Services
          </Link>
          <Link 
            href="/#products" 
            onClick={(e) => handleAnchorClick(e, 'products')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Products
          </Link>
          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Pricing
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            Contact
          </Link>
          <Link 
            href="/v/alex-rivera" 
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20"
          >
            ✨ Explore Live Demo Card (/v/alex-rivera)
          </Link>

          <div className="pt-3 flex flex-col sm:flex-row gap-2 border-t dark:border-slate-800/80 border-slate-200/80">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <span>Sign In</span>
            </Link>
            <Link 
              href="/signup?intent=create_card"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1.5 transition active:scale-95"
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
