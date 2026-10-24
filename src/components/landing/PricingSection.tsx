'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  RefreshCw,
  User,
  Users2,
  Building
} from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      badge: 'SOLO PROFESSIONALS',
      price: '₹999/-',
      period: 'Per Year',
      desc: 'Essential digital smart card for individual practitioners and consultants.',
      icon: User,
      iconColor: 'text-[#174BFF] bg-blue-50',
      checkColor: 'text-[#174BFF]',
      isPopular: false,
      btnText: 'Select Basic Plan (₹999)',
      btnStyle: 'bg-white hover:bg-slate-50 text-[#174BFF] border-2 border-blue-200 hover:border-[#174BFF]',
      link: '/signup?plan=basic&intent=pricing',
      features: [
        'Unlimited 24x7 Card Edits',
        '1 Digital Card (w/your-name)',
        '1-Click VCF Contact Downloader',
        'Dynamic Cloud QR Code (Editable)',
        'Social Links & Portfolio Showcase',
        'Inbound Lead Inquiry Capture Form',
        'Standard Visitor Analytics',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'MULTI-SERVICE & AGENCIES',
      price: '₹1,599/-',
      period: 'Per Year',
      desc: 'Complete suite for multi-service professionals, agencies, and growing businesses.',
      icon: Users2,
      iconColor: 'text-white bg-[#174BFF]',
      checkColor: 'text-[#16B981]',
      isPopular: true,
      popularTag: 'MOST POPULAR',
      btnText: 'Get Started with Pro (₹1,599)',
      btnStyle: 'bg-[#174BFF] hover:bg-[#133FDF] text-white shadow-md shadow-blue-500/25',
      link: '/signup?plan=pro&intent=pricing',
      features: [
        'Unlimited 24x7 Card Edits',
        'Up to 3 Digital Cards',
        '1 Custom Domain CNAME (White-Label)',
        'Unlimited WhatsApp Store Catalog',
        'Appointment & Slot Booking Engine',
        'PDF Data Reporting & Exporting Suite',
        'Leads CRM Pipeline Inbox with Exports',
        'Priority WhatsApp & Email Support',
      ],
    },
    {
      id: 'advance',
      name: 'Advance',
      badge: 'ENTERPRISES & EXECUTIVES',
      price: '₹2,199/-',
      period: 'Per Year',
      desc: 'For growing businesses and executives with multiple companies or team staff.',
      icon: Building,
      iconColor: 'text-[#7547F5] bg-purple-50',
      checkColor: 'text-[#7547F5]',
      isPopular: false,
      btnText: 'Choose Advance Plan (₹2,199)',
      btnStyle: 'bg-white hover:bg-slate-50 text-[#7547F5] border-2 border-purple-200 hover:border-[#7547F5]',
      link: '/signup?plan=advance&intent=pricing',
      features: [
        'Unlimited 24x7 Card Edits',
        'Up to 5 Digital Cards & Team Profiles',
        '5 White-Label Custom Domains',
        'Unlimited 4K Video Uploads & CDN',
        'Blog Studio & Unlimited Article Publishing',
        '50+ Portfolio Case Studies with Zoom',
        'Dedicated Account Manager & VIP SLA',
      ],
    },
  ];

  const trustBadges = [
    { icon: ShieldCheck, title: 'Risk-Free Guarantee', desc: 'Secure payments & reliable uptime' },
    { icon: Sparkles, title: 'No Hidden Charges', desc: 'Transparent upfront annual billing' },
    { icon: Clock, title: 'Priority Support', desc: 'Fast assistance on WhatsApp & email' },
    { icon: RefreshCw, title: 'Upgrade Anytime', desc: 'Flexible plan changes as you grow' },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#E2E9FA]/60 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            PRICING PLANS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Simple & Transparent Pricing.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
            Choose the plan that fits your business. Upgrade anytime.
          </p>
        </div>

        {/* EXACTLY 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComp = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl flex flex-col justify-between transition-all duration-300 p-6 sm:p-7 ${
                  plan.isPopular
                    ? 'border-2 border-[#174BFF] shadow-xl shadow-blue-500/10 lg:-translate-y-2'
                    : 'border border-[#E2E9FA] shadow-sm hover:border-slate-300'
                }`}
              >
                {/* Most Popular Floating Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#174BFF] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    {plan.popularTag}
                  </div>
                )}

                <div>
                  {/* Card Header: Icon + Audience Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${plan.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64718F]">
                        {plan.badge}
                      </span>
                      <h3 className="text-xl font-extrabold text-[#10183F] leading-tight">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#64718F] leading-relaxed mb-4 min-h-[36px]">
                    {plan.desc}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-1.5 pb-4 mb-4 border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#10183F] tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-semibold text-[#64718F]">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className={`w-4 h-4 ${plan.checkColor} shrink-0 mt-0.5 stroke-[2.5]`} />
                        <span className="font-medium leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan Button */}
                <Link
                  href={plan.link}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer mt-auto ${plan.btnStyle}`}
                >
                  <span>{plan.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* 4 Trust Benefits */}
        <div className="mt-12 sm:mt-14 max-w-5xl mx-auto pt-8 border-t border-[#E2E9FA]/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-[#174BFF] flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#10183F] leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-[#64718F] mt-0.5 leading-tight">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
