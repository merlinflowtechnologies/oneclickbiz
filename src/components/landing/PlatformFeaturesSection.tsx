'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe2, 
  ShoppingBag, 
  Palette, 
  TrendingUp, 
  Check, 
  ArrowRight,
  Smartphone,
  CreditCard,
  FileText,
  BarChart3
} from 'lucide-react';

export default function PlatformFeaturesSection() {
  const groups = [
    {
      id: 'presence',
      title: 'Your Online Presence',
      badge: 'Presence',
      theme: 'blue',
      headerBg: 'bg-blue-50 text-[#174BFF] border-blue-200',
      icon: Globe2,
      items: [
        'Personal profiles',
        'Custom domains',
        'Landing pages',
        'Live business profiles',
      ],
      miniVisual: (
        <div className="mt-4 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[#174BFF] shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 truncate">oneclickbiz.in/v/your-brand</span>
        </div>
      )
    },
    {
      id: 'payments',
      title: 'Sell & Accept Payments',
      badge: 'Commerce',
      theme: 'rose',
      headerBg: 'bg-rose-50 text-rose-600 border-rose-200',
      icon: ShoppingBag,
      items: [
        'Online stores',
        'Product management',
        'WhatsApp ordering',
        'Payment gateway integration',
      ],
      miniVisual: (
        <div className="mt-4 p-2.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 truncate">Razorpay, Cashfree & UPI</span>
        </div>
      )
    },
    {
      id: 'customize',
      title: 'Create & Customize',
      badge: 'Design',
      theme: 'purple',
      headerBg: 'bg-purple-50 text-[#7547F5] border-purple-200',
      icon: Palette,
      items: [
        'Templates',
        'Multiple edits',
        'Galleries',
        'Blogs and articles',
        'Visiting cards & brochures',
      ],
      miniVisual: (
        <div className="mt-4 p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#7547F5] shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 truncate">Drag & drop canvas editor</span>
        </div>
      )
    },
    {
      id: 'grow',
      title: 'Manage & Grow',
      badge: 'Analytics',
      theme: 'emerald',
      headerBg: 'bg-emerald-50 text-[#16B981] border-emerald-200',
      icon: TrendingUp,
      items: [
        'Lead capture',
        'Reviews and ratings',
        'Analytics and reports',
        'QR codes',
        'Business management tools',
      ],
      miniVisual: (
        <div className="mt-4 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#16B981] shrink-0" />
          <span className="text-[11px] font-semibold text-slate-700 truncate">Real-time visitor metrics</span>
        </div>
      )
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#C7D7FE] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            KEY FEATURES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            More Than Just a Website.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
            Everything you need to run, manage, and grow your business.
          </p>
        </div>

        {/* 4 Feature Group Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {groups.map((grp) => {
            const IconComp = grp.icon;
            return (
              <div
                key={grp.id}
                className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-4 sm:p-5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(23,75,255,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Card Header with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${grp.headerBg} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#10183F] leading-tight">
                      {grp.title}
                    </h3>
                  </div>

                  {/* Checklist Items */}
                  <ul className="space-y-2 mb-2">
                    {grp.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#64718F]">
                        <Check className="w-4 h-4 text-[#16B981] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini Visual Footer */}
                {grp.miniVisual}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
