'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, BookOpen } from 'lucide-react';

export default function BlogFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <img
                src="/logo-brand.png?v=4"
                alt="OneClickBiz - Connect | Build | Share"
                className="h-10 w-auto max-w-[200px] object-contain"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                }}
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              OneClickBiz helps businesses go digital with smart vCards, WhatsApp stores,
              booking systems and now — a blog studio to share your expertise with the world.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* X (Twitter) */}
              <a
                href="https://twitter.com/oneclickbiz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-200"
              >
                <span className="font-bold text-xs leading-none">𝕏</span>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/oneclickbiz.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-pink-600 hover:bg-pink-50 transition-all border border-slate-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/oneclickbiz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Blog Links */}
          <div className="space-y-3">
            <h3 className="text-slate-900 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={14} className="text-indigo-600" />
              Blog
            </h3>
            <ul className="space-y-2">
              {['Business Tips', 'Digital Marketing', 'Technology', 'Success Stories', 'Product Updates'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h3 className="text-slate-900 font-semibold text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Features', href: '/#features' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {year} Merlinflow Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="mailto:hello@oneclickbiz.in" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <Mail size={12} />
              hello@oneclickbiz.in
            </a>
            <a href="tel:+916304989071" className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <Phone size={12} />
              +91 63049 89071
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
