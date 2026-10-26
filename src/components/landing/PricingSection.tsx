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
  Building,
  CheckCircle2
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  desc: string;
  icon: React.ElementType;
  iconColor: string;
  checkColor: string;
  isPopular: boolean;
  popularTag?: string;
  btnText: string;
  btnStyle: string;
  link: string;
  mandatoryFeatures: string[];
  planFeatures: string[];
}

export default function PricingSection() {
  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      badge: 'SOLO PROFESSIONALS & SHOPS',
      price: '₹999/-',
      period: 'Per Year',
      desc: 'Complete commercial business mini-website with integrated WhatsApp store, catalog, and 1-tap customer connect.',
      icon: User,
      iconColor: 'text-[#174BFF] bg-blue-50',
      checkColor: 'text-[#174BFF]',
      isPopular: false,
      btnText: 'Select Basic Plan (₹999)',
      btnStyle: 'bg-white hover:bg-slate-50 text-[#174BFF] border-2 border-blue-200 hover:border-[#174BFF]',
      link: '/signup?plan=basic&intent=pricing',
      mandatoryFeatures: [
        'WhatsApp Store (Digital Catalog & 0% Commission Orders)',
        'Complete Social Profiles Hub (Instagram, FB, LinkedIn, Maps)',
        'Instagram Reels & YouTube Video Player Space',
      ],
      planFeatures: [
        '1 Verified Commercial Business Mini-Website',
        'Integrated 1-Tap Save Contacts (.vcf) for Visitors',
        'Dynamic Cloud QR Code (Editable 24x7 without reprint)',
        'High-Resolution Photo Gallery Space (15 Photos)',
        'Direct PWA Web App (1-Tap Add to Customer Home Screen)',
        'Inbound Customer Lead Inquiry Capture Form',
        'Website Visitor Traffic & Real-Time Scan Analytics',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'MULTI-SERVICE & CLINICS',
      price: '₹1,599/-',
      period: 'Per Year',
      desc: 'High-converting business mini-website with integrated slot bookings, instant UPI payment gateways, custom domain, and CRM.',
      icon: Users2,
      iconColor: 'text-white bg-[#174BFF]',
      checkColor: 'text-[#16B981]',
      isPopular: true,
      popularTag: 'MOST POPULAR',
      btnText: 'Get Started with Pro (₹1,599)',
      btnStyle: 'bg-[#174BFF] hover:bg-[#133FDF] text-white shadow-md shadow-blue-500/25',
      link: '/signup?plan=pro&intent=pricing',
      mandatoryFeatures: [
        'Advanced WhatsApp Store (Unlimited SKUs, Variants & Cart)',
        'Social Profiles Hub + Clickable HTML Email Signature',
        'Full 4K YouTube Video Hub & Embedded Instagram Feed',
      ],
      planFeatures: [
        '1 Custom Domain Connection (Connect your own domain + Free SSL)',
        'Online Appointment & Slot Booking Engine (Doctor/Salon/Studio)',
        'Integrated Payment Gateways & Instant UPI (GPay, PhonePe, Cards)',
        'Google 5-Star Reviews Booster & Feedback Engine',
        'Customer Leads CRM with 1-Click Excel / CSV Export',
        'Canva & Adobe Banner Creative Sync Studio',
        'Unlimited 4K Gallery Space with Lightbox Zoom',
        'Multi-Staff Team Directory (Display doctors, stylists, or agents)',
        'Priority WhatsApp & Email Customer Support',
      ],
    },
    {
      id: 'advance',
      name: 'Advance',
      badge: 'ENTERPRISES & MULTI-BRANCH',
      price: '₹2,199/-',
      period: 'Per Year',
      desc: 'Full-scale commercial mini-website with 100% white-label branding, multi-branch scaling, blog studio, and operations cockpit.',
      icon: Building,
      iconColor: 'text-[#7547F5] bg-purple-50',
      checkColor: 'text-[#7547F5]',
      isPopular: false,
      btnText: 'Choose Advance Plan (₹2,199)',
      btnStyle: 'bg-white hover:bg-slate-50 text-[#7547F5] border-2 border-purple-200 hover:border-[#7547F5]',
      link: '/signup?plan=advance&intent=pricing',
      mandatoryFeatures: [
        'Enterprise Multi-Category WhatsApp E-Commerce Store',
        'Omnichannel Social Media Command Hub (All Staff Profiles)',
        'Unlimited High-Bitrate YouTube & Instagram Video Galleries',
      ],
      planFeatures: [
        '100% White-Label Rights (Zero OneClickBiz Branding on Website)',
        'Multi-Branch & Locations Engine (Manage Multi-City Outlets)',
        'Articles & SEO Blog Studio (Rank #1 on Google Search)',
        'Report PDF Extract & GST Tax Invoicing Suite',
        'All-in-One Operations Cockpit (CRM, WhatsApp, Revenue)',
        'Storefront Smart NFC & Acrylic QR Standee Included',
        'Dedicated VIP Account Manager & 24/7 Phone SLA',
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
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#EEF4FF] via-[#F5F8FE] to-[#EEF4FF] border-b border-[#C7D7FE] relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            PRICING PLANS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Simple & Transparent Pricing.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#64718F] font-normal max-w-xl mx-auto">
            Choose the plan that fits your business. Every plan provides a complete commercial mini-website with all essential business services pre-integrated.
          </p>
        </div>

        {/* 3 Distinct Pricing Cards */}
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

                  {/* MANDATORY IN EVERY PLAN BOX */}
                  <div className="mb-4 p-3 rounded-2xl bg-gradient-to-br from-[#F0F5FF] to-[#E8EEFD] border border-[#C7D7FE]">
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#174BFF] mb-2">
                      <Sparkles className="w-3 h-3 text-[#174BFF]" />
                      <span>Integrated in Every Mini-Website</span>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.mandatoryFeatures.map((mFeat, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-[11px] font-semibold text-[#10183F]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{mFeat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TIER-SPECIFIC SERVICES LIST */}
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#64718F] mb-2.5 px-1">
                    {plan.id === 'basic' ? 'Basic Website Features' : plan.id === 'pro' ? 'Everything in Basic, Plus:' : 'Everything in Pro, Plus:'}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.planFeatures.map((feat, idx) => (
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

        {/* Custom Domain Note */}
        <p className="text-center text-[11px] text-[#64718F] mt-6 max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-slate-700">💡 Custom Domain Note:</span> Connect any domain you own (from GoDaddy, Hostinger, Namecheap, etc.) via simple CNAME DNS. OneClickBiz provides free high-speed cloud edge routing and automated 256-bit SSL certificates at zero extra charge.
        </p>

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
