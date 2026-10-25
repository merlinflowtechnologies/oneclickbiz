'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
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
      const servicesEl = document.getElementById('services');
      if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#C7D7FE] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          
          {/* OneClickBiz Logo & Wordmark */}
          <Link href="/" className="flex items-center group flex-shrink-0 py-1">
            <img 
              src="/logo-brand.png?v=5" 
              alt="OneClickBiz Logo" 
              className="h-8 xs:h-9 sm:h-10 w-auto max-w-[160px] sm:max-w-[200px] object-contain transition-opacity group-hover:opacity-90 duration-200"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 sm:gap-2">
            <Link 
              href="/" 
              className="px-3 py-2 text-sm font-semibold text-[#174BFF] transition-colors relative"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#174BFF] rounded-full" />
            </Link>

            <Link 
              href="/#services" 
              onClick={(e) => handleAnchorClick(e, 'services')}
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              Services
            </Link>

            <Link 
              href="/#templates" 
              onClick={(e) => handleAnchorClick(e, 'templates')}
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              Templates
            </Link>

            <Link 
              href="/#pricing" 
              onClick={(e) => handleAnchorClick(e, 'pricing')}
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="/#features" 
              onClick={(e) => handleAnchorClick(e, 'features')}
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              Features
            </Link>

            <Link 
              href="/about" 
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              About
            </Link>

            <Link 
              href="/#contact" 
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className="px-3 py-2 text-sm font-medium text-[#64718F] hover:text-[#174BFF] transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={handleSearchClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2E9FA] hover:border-blue-300 hover:bg-[#F8FAFF] flex items-center justify-center text-[#64718F] hover:text-[#174BFF] transition-all cursor-pointer shadow-2xs"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <Link 
              href="/login"
              className="px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#10183F] hover:text-[#174BFF] hover:bg-[#F8FAFF] border border-[#E2E9FA] transition-all shadow-2xs"
            >
              Login
            </Link>

            {/* Get Started Button */}
            <Link 
              href="/signup?intent=get_started"
              className="hidden sm:inline-flex px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#174BFF] hover:bg-[#133FDF] items-center gap-1.5 transition-all shadow-sm shadow-blue-500/25 active:scale-95 shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#F8FAFF] hover:bg-[#EDF3FF] border border-[#E2E9FA] text-[#10183F] transition cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#174BFF]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2E9FA] bg-white px-4 sm:px-6 pt-3 pb-6 space-y-1 shadow-xl">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#174BFF] bg-blue-50/70"
          >
            Home
          </Link>
          <Link 
            href="/#services" 
            onClick={(e) => handleAnchorClick(e, 'services')}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            Services
          </Link>
          <Link 
            href="/#templates" 
            onClick={(e) => handleAnchorClick(e, 'templates')}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            Templates
          </Link>
          <Link 
            href="/#pricing" 
            onClick={(e) => handleAnchorClick(e, 'pricing')}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            Pricing
          </Link>
          <Link 
            href="/#features" 
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            Features
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            About
          </Link>
          <Link 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e, 'contact')}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-[#64718F] hover:text-[#174BFF] hover:bg-slate-50"
          >
            Contact
          </Link>
          <div className="pt-3 flex flex-col gap-2">
            <Link 
              href="/signup?intent=get_started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl text-center text-sm font-bold text-white bg-[#174BFF] shadow-sm flex items-center justify-center gap-1.5"
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
