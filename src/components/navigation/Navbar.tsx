'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X,
  Search,
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

  const handleSearchClick = () => {
    const searchInput = document.getElementById('hero-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const demoEl = document.getElementById('demo');
      if (demoEl) demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          
          {/* Brand Logo - Original */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo-brand.png?v=4" 
              alt="OneClickBiz - Connect | Build | Share" 
              className="h-8 xs:h-9 sm:h-10 w-auto max-w-[150px] xs:max-w-[185px] sm:max-w-[220px] object-contain transition-opacity group-hover:opacity-85 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 sm:gap-2">
            <Link 
              href="/" 
              className="relative px-3.5 py-2 text-sm font-semibold text-[#2563EB] transition-colors"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#2563EB] rounded-full" />
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Templates
            </Link>

            <Link 
              href="/#demo" 
              onClick={(e) => handleAnchorClick(e, 'demo')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Examples
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Features
            </Link>

            <Link 
              href="/blog" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Icon Button */}
            <button
              onClick={handleSearchClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-[#2563EB] transition-all cursor-pointer shadow-xs"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <Link 
              href="/login"
              className="px-3.5 py-1.5 sm:px-4.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#2563EB] hover:bg-slate-50 border border-slate-200 transition-all shadow-xs"
            >
              Login
            </Link>

            {/* Get Started Button */}
            <Link 
              href="/signup?intent=get_started"
              className="hidden sm:inline-flex px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:from-[#1D4ED8] hover:to-[#4338CA] items-center gap-1.5 transition-all shadow-md shadow-blue-500/25 active:scale-95 shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#2563EB]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 sm:px-6 pt-3 pb-6 space-y-1 shadow-xl">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#2563EB] bg-blue-50/60"
          >
            Home
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition"
          >
            Templates
          </Link>
          <Link 
            href="/#demo" 
            onClick={(e) => handleAnchorClick(e, 'demo')}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition"
          >
            Examples
          </Link>
          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition"
          >
            Pricing
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition"
          >
            Features
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 transition"
          >
            Blog
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            <Link 
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-700 transition"
            >
              Login
            </Link>
            <Link 
              href="/signup?intent=get_started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:from-[#1D4ED8] hover:to-[#4338CA] text-sm font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md shadow-blue-500/25"
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
