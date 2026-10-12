'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, BookOpen, ArrowRight } from 'lucide-react';

export default function BlogNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 shadow-sm'
          : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Brand */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <img
              src="/logo-brand.png?v=2"
              alt="OneClickBiz - Connect | Build | Grow"
              className="h-10 w-auto max-w-[200px] object-contain transition-transform group-hover:scale-105 duration-200"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                if (t.nextSibling) return;
                const span = document.createElement('span');
                span.className = 'text-slate-900 font-bold text-lg';
                span.textContent = 'OneClickBiz';
                t.parentNode?.appendChild(span);
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100 transition-all"
            >
              <BookOpen size={14} />
              Blog
            </Link>
            <Link
              href="/#features"
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Pricing
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-1.5 ml-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-200 transition-all hover:scale-105"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="blog-mobile-menu-toggle"
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-1 bg-white">
            <Link
              href="/blog"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen size={14} />
              Blog
            </Link>
            <Link
              href="/#features"
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-2 px-4">
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
