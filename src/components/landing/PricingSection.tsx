'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Minus,
  Layers,
  HelpCircle
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  desc: string;
  serviceCount: string;
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

interface ServiceMatrixCategory {
  category: string;
  services: {
    name: string;
    description: string;
    basic: string | boolean;
    pro: string | boolean;
    advance: string | boolean;
  }[];
}

export default function PricingSection() {
  const [showComparison, setShowComparison] = useState(true);
  const [mobileFilter, setMobileFilter] = useState<'all' | 'basic' | 'pro' | 'advance'>('all');

  const [pricingConfig, setPricingConfig] = useState({
    basic: 999,
    pro: 1599,
    advance: 2199
  });

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (data?.config) {
          setPricingConfig({
            basic: Number(data.config.basicPrice) || 999,
            pro: Number(data.config.proPrice) || 1599,
            advance: Number(data.config.advancedPrice) || 2199
          });
        }
      })
      .catch(() => {});
  }, []);

  const formatInr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      badge: 'SOLO PROFESSIONALS & SHOPS',
      price: `${formatInr(pricingConfig.basic)}/-`,
      period: 'Per Year',
      serviceCount: '11 Services Included',
      desc: 'Complete commercial business mini-website with integrated WhatsApp store, catalog, dynamic QR, and 1-tap customer connect.',
      icon: User,
      iconColor: 'text-[#174BFF] bg-blue-50',
      checkColor: 'text-[#174BFF]',
      isPopular: false,
      btnText: `Select Basic Plan (${formatInr(pricingConfig.basic)})`,
      btnStyle: 'bg-white hover:bg-slate-50 text-[#174BFF] border-2 border-blue-200 hover:border-[#174BFF]',
      link: '/signup?plan=basic&intent=pricing',
      mandatoryFeatures: [
        'WhatsApp Store (Digital Catalog & 0% Commission Direct Orders)',
        'Complete Social Profiles Hub (Instagram, FB, LinkedIn, Maps)',
        'Instagram Reels & YouTube Embedded Video Player Space',
      ],
      planFeatures: [
        '1 Verified Commercial Business Mini-Website',
        '15 HD Photos & 1 Direct Local Video Upload',
        'Personal Profile & Business Contact (1-Tap Save to Phone)',
        'Dynamic Cloud QR Code (Editable 24x7 without reprint)',
        'Visiting Cards & Downloadable PDF Flyers',
        'Direct PWA Web App (1-Tap Add to Customer Home Screen)',
        'Product Space (Showcase Products with Pricing & Deals)',
        'Custom Templates & Brand Easy Designing Customizer',
        'High-Speed Live Profile Cloud Hosting (SSL Secured)',
        'Website Inbound Lead Inquiry Form & Scan Traffic Analytics',
      ],
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      badge: 'MULTI-SERVICE & CLINICS',
      price: `${formatInr(pricingConfig.pro)}/-`,
      period: 'Per Year',
      serviceCount: '19 Services Total (11 Basic + 8 Growth)',
      desc: 'High-converting business mini-website with integrated slot bookings, instant UPI payment gateways, custom domain connection, and CRM.',
      icon: Users2,
      iconColor: 'text-white bg-[#174BFF]',
      checkColor: 'text-[#16B981]',
      isPopular: true,
      popularTag: 'MOST POPULAR',
      btnText: `Get Started with Pro (${formatInr(pricingConfig.pro)})`,
      btnStyle: 'bg-[#174BFF] hover:bg-[#133FDF] text-white shadow-md shadow-blue-500/25',
      link: '/signup?plan=pro&intent=pricing',
      mandatoryFeatures: [
        'Advanced WhatsApp Store (Unlimited SKUs, Variants & Cart)',
        'Social Profiles Hub + Clickable HTML Email Signature',
        'Full 4K YouTube Video Hub & Embedded Instagram Feed',
      ],
      planFeatures: [
        'Everything in Basic Plan (All 11 Core Services)',
        '1 Custom Domain Connection (Connect your own domain + Free SSL)',
        '50 HD Photos & 5 Direct Local Video Uploads',
        'Online Slot & Appointment Booking Engine (Doctors, Salons, Studios)',
        'Integrated Payment Gateways & Instant UPI (GPay, PhonePe, Cards)',
        'Google 5-Star Reviews Booster & Feedback Engine',
        'Customer Leads CRM with 1-Click Excel / CSV Export',
        'Canva & Adobe Banner Creative Sync Studio',
        'E-Commerce Shopping Cart & SKU Variants (Sizes/Colors)',
        'Multi-Staff Team Directory & Priority Customer Support',
      ],
    },
    {
      id: 'advance',
      name: 'Advance Plan',
      badge: 'ENTERPRISES & MULTI-BRANCH',
      price: `${formatInr(pricingConfig.advance)}/-`,
      period: 'Per Year',
      serviceCount: 'All 24 Services Included',
      desc: 'Full-scale commercial mini-website with 100% white-label branding, multi-branch scaling, blog studio, GST invoicing, and operations cockpit.',
      icon: Building,
      iconColor: 'text-[#7547F5] bg-purple-50',
      checkColor: 'text-[#7547F5]',
      isPopular: false,
      btnText: `Choose Advance Plan (${formatInr(pricingConfig.advance)})`,
      btnStyle: 'bg-white hover:bg-slate-50 text-[#7547F5] border-2 border-purple-200 hover:border-[#7547F5]',
      link: '/signup?plan=advance&intent=pricing',
      mandatoryFeatures: [
        'Enterprise Multi-Category WhatsApp E-Commerce Store',
        'Omnichannel Social Media Command Hub (All Staff Profiles)',
        'Unlimited High-Bitrate YouTube & Instagram Video Galleries',
      ],
      planFeatures: [
        'Everything in Pro Plan (All 19 Services)',
        '100% White-Label Rights (Zero OneClickBiz Branding on Website)',
        'Unlimited HD Photos & 15 Direct Local 4K Video Uploads',
        'Multi-Branch & Locations Scaling Engine (Multi-City Outlets)',
        'Articles & SEO Blog Studio (Rank #1 on Google Search)',
        'Report PDF Extract & Automated GST Tax Invoicing Suite',
        'All-in-One Operations Cockpit (CRM, WhatsApp, Revenue)',
        'Storefront Smart NFC & Acrylic QR Standee Delivered Free',
        'Up to 5 Custom Domains Management Support',
        'Dedicated VIP Account Manager & 24/7 Phone SLA',
      ],
    },
  ];

  // Compact label mapper for 100% mobile fit on small screens
  const getCompactMatrixLabel = (val: string): string => {
    const map: Record<string, string> = {
      '1 Mini-Website': '1 Site',
      'Essential Themes': 'Essential',
      'All Premium Themes': 'All Premium',
      'All VIP Custom Themes': 'VIP Themes',
      'Standard Cloud CDN': 'Standard',
      'High-Speed Edge CDN': 'High-Speed',
      'Ultra-Fast Global Edge': 'Ultra-Fast',
      'Basic Store Catalog': 'Basic Store',
      'Advanced Cart & Variants': 'Cart & SKUs',
      'Multi-Category Store': 'Multi-Store',
      '15 Products Showcase': '15 Items',
      '50 Products Showcase': '50 Items',
      'Unlimited Products': 'Unlimited',
      '15 HD Photos': '15 Photos',
      '50 HD Photos': '50 Photos',
      'Unlimited HD Photos': 'Unlimited',
      '1 Local Video': '1 Video',
      '5 Local Videos': '5 Videos',
      '15 Local 4K Videos': '15 4K Videos',
      'Inbound Form Only': 'Form Only',
      '1-Click Excel / CSV Export': 'Excel Export',
      'Automated CRM & Analytics': 'Full CRM',
      '1 Custom Domain': '1 Domain',
      'Up to 5 Custom Domains': '5 Domains',
      'Standard Email & Chat': 'Standard',
      'Priority WhatsApp & Email': 'Priority',
      '24/7 Dedicated Phone SLA': '24/7 Phone',
      '✓ 100% Zero Branding': 'White-Label',
      '✓ Multi-City Outlets': 'Multi-Branch',
      '✓ Rank #1 on Google': 'SEO Studio',
      '✓ GST Invoices & Reports': 'GST Reports',
      '✓ Unified Operations Hub': 'Full CRM',
      '✓ Included & Delivered Free': 'Standee Free',
    };
    return map[val] || val;
  };

  // Complete 24 Services Matrix Data divided cleanly across plans
  const serviceMatrixCategories: ServiceMatrixCategory[] = [
    {
      category: '1. Commercial Mini-Website & Core Presence (Included in All Plans)',
      services: [
        {
          name: '1 Commercial Business Mini-Website',
          description: 'Responsive, mobile-first commercial website built for your exact industry niche.',
          basic: '1 Mini-Website',
          pro: '1 Mini-Website',
          advance: '1 Mini-Website',
        },
        {
          name: 'Personal Profile (Business Contact & Social Hub)',
          description: 'Commercial digital presence with 1-tap save to smartphone contacts address book.',
          basic: true,
          pro: true,
          advance: true,
        },
        {
          name: 'Custom Templates & Industry Themes',
          description: 'Professionally crafted industry layouts tailored for doctors, shops, real estate & salons.',
          basic: 'Essential Themes',
          pro: 'All Premium Themes',
          advance: 'All VIP Custom Themes',
        },
        {
          name: 'Easy Designing & Brand Customizer',
          description: 'Live editor for logo, typography, banner graphics, and brand theme colors.',
          basic: true,
          pro: true,
          advance: true,
        },
        {
          name: 'Live Profile High-Speed Cloud Hosting',
          description: 'High-availability cloud edge hosting with 99.9% uptime and automated SSL encryption.',
          basic: 'Standard Cloud CDN',
          pro: 'High-Speed Edge CDN',
          advance: 'Ultra-Fast Global Edge',
        },
      ],
    },
    {
      category: '2. WhatsApp Store & E-Commerce Catalog',
      services: [
        {
          name: 'WhatsApp Store (0% Commission)',
          description: 'Direct WhatsApp checkout sending neat structured orders to your phone inbox.',
          basic: 'Basic Store Catalog',
          pro: 'Advanced Cart & Variants',
          advance: 'Multi-Category Store',
        },
        {
          name: 'Product Space & Catalog Showcase',
          description: 'Display products with high-res photos, MRP, offer prices, and item descriptions.',
          basic: '15 Products Showcase',
          pro: '50 Products Showcase',
          advance: 'Unlimited Products',
        },
        {
          name: 'E-Commerce Cart & SKU Variants',
          description: 'Multi-item shopping cart with sizes, colors, weights, and live stock tracking.',
          basic: false,
          pro: true,
          advance: true,
        },
      ],
    },
    {
      category: '3. Media Gallery & Local Device Upload Quotas',
      services: [
        {
          name: 'Local Device HD Photo Uploads',
          description: 'Upload high-resolution images of your work, portfolio, and clinic/store from your phone or PC.',
          basic: '15 HD Photos',
          pro: '50 HD Photos',
          advance: 'Unlimited HD Photos',
        },
        {
          name: 'Direct Local Video Uploads',
          description: 'Upload video files directly from local storage with smooth native video player.',
          basic: '1 Local Video',
          pro: '5 Local Videos',
          advance: '15 Local 4K Videos',
        },
        {
          name: 'Instagram Reels & YouTube Embedded Hub',
          description: 'Embed unlimited YouTube videos and Instagram reels with seamless in-app playback.',
          basic: 'Unlimited Embeds',
          pro: 'Unlimited Embeds',
          advance: 'Unlimited Embeds',
        },
        {
          name: 'Social Profiles Hub',
          description: 'Consolidated one-tap links to Instagram, Facebook, LinkedIn, Twitter & Google Maps.',
          basic: true,
          pro: true,
          advance: true,
        },
      ],
    },
    {
      category: '4. Contact, Sharing & App Integration',
      services: [
        {
          name: 'Customized Dynamic Cloud QR Code',
          description: 'Cloud QR code that can be updated 24x7 without reprinting paper posters.',
          basic: true,
          pro: true,
          advance: true,
        },
        {
          name: 'Visiting Cards & Downloadable Flyers',
          description: 'Shareable mini-website link + printable PDF visiting card and promotional flyer.',
          basic: true,
          pro: true,
          advance: true,
        },
        {
          name: 'Direct App (PWA - 1-Tap Install)',
          description: 'Allows clients to install your mini-website as an app icon directly on their home screen.',
          basic: true,
          pro: true,
          advance: true,
        },
        {
          name: 'Clickable HTML Email Signature',
          description: 'Branded corporate signature for Gmail, Outlook, and Apple Mail with social icons.',
          basic: false,
          pro: true,
          advance: true,
        },
      ],
    },
    {
      category: '5. Bookings, Payments, Reviews & Lead CRM',
      services: [
        {
          name: 'Slot & Appointment Booking Engine',
          description: 'Calendar scheduling for doctor clinics, salons, fitness studios, and consulting.',
          basic: false,
          pro: true,
          advance: true,
        },
        {
          name: 'Payment Gateways & Instant UPI QR',
          description: 'Collect payments directly via GPay, PhonePe, Paytm, Credit/Debit Cards, and Netbanking.',
          basic: false,
          pro: true,
          advance: true,
        },
        {
          name: 'Google 5-Star Reviews Booster',
          description: 'Interactive feedback collector directing happy customers to post 5-star Google reviews.',
          basic: false,
          pro: true,
          advance: true,
        },
        {
          name: 'Customer Leads CRM & Excel Export',
          description: 'Captures inquiries and allows 1-click download of all customer contacts in Excel/CSV.',
          basic: 'Inbound Form Only',
          pro: '1-Click Excel / CSV Export',
          advance: 'Automated CRM & Analytics',
        },
        {
          name: 'Canva & Adobe Marketing Studio',
          description: 'Sync and display custom designed promotional banners, discount offers & festival graphics.',
          basic: false,
          pro: true,
          advance: true,
        },
      ],
    },
    {
      category: '6. Custom Domain & Enterprise Scaling Suite',
      services: [
        {
          name: 'Custom Domain Connection (BYOD)',
          description: 'Point your own custom domain (e.g., yourname.com) via CNAME with free automated SSL.',
          basic: false,
          pro: '1 Custom Domain',
          advance: 'Up to 5 Custom Domains',
        },
        {
          name: '100% White-Label Rights',
          description: 'Zero OneClickBiz branding on your website — 100% pure private label business website.',
          basic: false,
          pro: false,
          advance: '✓ 100% Zero Branding',
        },
        {
          name: 'Multi-Branch & Locations Scaling',
          description: 'Manage multiple branches, franchise outlets, or clinic locations under one main brand.',
          basic: false,
          pro: false,
          advance: '✓ Multi-City Outlets',
        },
        {
          name: 'Articles & SEO Blog Studio',
          description: 'Publish high-ranking articles, business insights, and news updates to rank on Google.',
          basic: false,
          pro: false,
          advance: '✓ Rank #1 on Google',
        },
        {
          name: 'Report PDF & Automated GST Invoicing',
          description: 'Generate tax-compliant GST invoices, customer order receipts, and financial export reports.',
          basic: false,
          pro: false,
          advance: '✓ GST Invoices & Reports',
        },
        {
          name: 'Operations Cockpit CRM Hub',
          description: 'Unified command center for staff assignments, WhatsApp follow-ups, and sales tracking.',
          basic: false,
          pro: false,
          advance: '✓ Unified Operations Hub',
        },
        {
          name: 'Smart NFC Acrylic Counter Standee',
          description: 'Physical contactless NFC + QR acrylic standee delivered directly to your shop counter.',
          basic: false,
          pro: false,
          advance: '✓ Included & Delivered Free',
        },
        {
          name: 'Dedicated Customer Support SLA',
          description: 'Assistance channel and response turnaround time guarantee.',
          basic: 'Standard Email & Chat',
          pro: 'Priority WhatsApp & Email',
          advance: '24/7 Dedicated Phone SLA',
        },
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
            PRICING PLANS &amp; SERVICE TIERS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
            Transparent Pricing Divided by Growth Tier.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#64718F] font-normal max-w-xl mx-auto">
            Every plan powers <span className="font-bold text-slate-800">1 Verified Commercial Business Mini-Website</span>. Explore the clean service division below: Basic (11 Services), Pro (19 Services), and Advance (All 24 Services).
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

                  {/* Service Count Badge */}
                  <div className="mb-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${
                      plan.id === 'basic'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : plan.id === 'pro'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-purple-50 text-[#7547F5] border border-purple-200'
                    }`}>
                      {plan.serviceCount}
                    </span>
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
                    {plan.id === 'basic' ? 'Basic Website Features (11 Total)' : plan.id === 'pro' ? 'Everything in Basic, Plus (19 Total):' : 'Everything in Pro, Plus (All 24 Total):'}
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

        {/* TOGGLE: FULL 24-SERVICES COMPARISON MATRIX */}
        <div className="mt-10 sm:mt-12 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#C7D7FE] shadow-sm">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#174BFF] flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#10183F]">
                  Complete 24-Service Side-by-Side Breakdown
                </h3>
                <p className="text-xs text-[#64718F]">
                  Inspect exact feature limits, upload quotas, and service capabilities for each plan.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowComparison(!showComparison)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#10183F] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>{showComparison ? 'Collapse Comparison Table' : 'Expand Comparison Table'}</span>
              {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* EXPANDABLE 24-SERVICES COMPARISON TABLE */}
          {showComparison && (
            <div className="mt-4 bg-white rounded-2xl sm:rounded-3xl border border-[#C7D7FE] shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn">
              
              {/* Mobile Plan Tab Filter (visible only on small screens) */}
              <div className="sm:hidden p-1.5 bg-slate-50 border-b border-[#E2E9FA] flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={() => setMobileFilter('all')}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                    mobileFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All 3 Plans
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilter('basic')}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                    mobileFilter === 'basic'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Basic ({formatInr(pricingConfig.basic)})
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilter('pro')}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                    mobileFilter === 'pro'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pro ⭐
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilter('advance')}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all text-center ${
                    mobileFilter === 'advance'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Advance
                </button>
              </div>

              <div className="w-full">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-[#E2E9FA] bg-gradient-to-r from-slate-50 to-blue-50/40">
                      <th className={`py-2 sm:py-3 px-1.5 sm:px-4 text-[9.5px] sm:text-xs font-extrabold text-[#10183F] uppercase tracking-wider ${
                        mobileFilter === 'all' ? 'w-[37%] sm:w-[40%]' : 'w-[60%] sm:w-[40%]'
                      }`}>
                        Services &amp; Capabilities
                      </th>

                      {/* Basic Header */}
                      <th className={`py-2 sm:py-3 px-0.5 sm:px-2 text-center text-[9.5px] sm:text-xs font-extrabold text-[#174BFF] uppercase tracking-wider bg-blue-50/50 ${
                        mobileFilter === 'all'
                          ? 'w-[21%] sm:w-[20%]'
                          : mobileFilter === 'basic'
                          ? 'w-[40%] sm:w-[20%]'
                          : 'hidden sm:table-cell sm:w-[20%]'
                      }`}>
                        <div className="leading-tight">Basic</div>
                        <div className="text-[8px] sm:text-[11px] font-bold text-slate-600 mt-0.5">{formatInr(pricingConfig.basic)}/yr</div>
                      </th>

                      {/* Pro Header */}
                      <th className={`py-2 sm:py-3 px-0.5 sm:px-2 text-center text-[9.5px] sm:text-xs font-extrabold text-emerald-700 uppercase tracking-wider bg-emerald-50/50 ${
                        mobileFilter === 'all'
                          ? 'w-[21%] sm:w-[20%]'
                          : mobileFilter === 'pro'
                          ? 'w-[40%] sm:w-[20%]'
                          : 'hidden sm:table-cell sm:w-[20%]'
                      }`}>
                        <div className="inline-flex items-center justify-center gap-0.5 sm:gap-1 leading-tight">
                          <span>Pro</span>
                          <span className="text-[6.5px] sm:text-[9px] bg-emerald-600 text-white px-0.5 sm:px-1 py-0.2 rounded font-black">TOP</span>
                        </div>
                        <div className="text-[8px] sm:text-[11px] font-bold text-slate-600 mt-0.5">{formatInr(pricingConfig.pro)}/yr</div>
                      </th>

                      {/* Advance Header */}
                      <th className={`py-2 sm:py-3 px-0.5 sm:px-2 text-center text-[9.5px] sm:text-xs font-extrabold text-[#7547F5] uppercase tracking-wider bg-purple-50/50 ${
                        mobileFilter === 'all'
                          ? 'w-[21%] sm:w-[20%]'
                          : mobileFilter === 'advance'
                          ? 'w-[40%] sm:w-[20%]'
                          : 'hidden sm:table-cell sm:w-[20%]'
                      }`}>
                        <div className="leading-tight">Advance</div>
                        <div className="text-[8px] sm:text-[11px] font-bold text-slate-600 mt-0.5">{formatInr(pricingConfig.advance)}/yr</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E2E9FA]/60">
                    {serviceMatrixCategories.map((group, gIdx) => (
                      <React.Fragment key={gIdx}>
                        {/* Category Row Header */}
                        <tr className="bg-slate-100/90 border-t border-b border-[#E2E9FA]">
                          <td colSpan={4} className="py-1.5 px-2 sm:py-2 sm:px-4 text-[9px] sm:text-xs font-extrabold text-[#10183F] uppercase tracking-wider truncate">
                            {group.category}
                          </td>
                        </tr>

                        {/* Service Item Rows */}
                        {group.services.map((srv, sIdx) => (
                          <tr key={sIdx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2 px-1.5 sm:py-2.5 sm:px-4 align-middle overflow-hidden">
                              <div className="text-[10px] sm:text-xs font-bold text-[#10183F] leading-snug break-words">
                                {srv.name}
                              </div>
                              <div className={`text-[8.5px] sm:text-[11px] text-[#64718F] mt-0.5 leading-snug break-words ${
                                mobileFilter === 'all' ? 'hidden sm:block' : 'block'
                              }`}>
                                {srv.description}
                              </div>
                            </td>

                            {/* Basic Column */}
                            <td className={`py-1.5 px-0.5 sm:py-2.5 sm:px-2 text-center text-xs font-medium bg-blue-50/20 align-middle ${
                              mobileFilter === 'all'
                                ? 'table-cell'
                                : mobileFilter === 'basic'
                                ? 'table-cell'
                                : 'hidden sm:table-cell'
                            }`}>
                              {typeof srv.basic === 'boolean' ? (
                                srv.basic ? (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-[#174BFF]">
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 text-slate-400">
                                    <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  </span>
                                )
                              ) : (
                                <span className="inline-block px-1 sm:px-2 py-0.5 rounded bg-blue-50 text-[#174BFF] font-bold text-[7.5px] sm:text-[10px] border border-blue-200/70 leading-tight break-words max-w-full">
                                  <span className="sm:hidden">{mobileFilter === 'all' ? getCompactMatrixLabel(srv.basic) : srv.basic}</span>
                                  <span className="hidden sm:inline">{srv.basic}</span>
                                </span>
                              )}
                            </td>

                            {/* Pro Column */}
                            <td className={`py-1.5 px-0.5 sm:py-2.5 sm:px-2 text-center text-xs font-medium bg-emerald-50/20 align-middle ${
                              mobileFilter === 'all'
                                ? 'table-cell'
                                : mobileFilter === 'pro'
                                ? 'table-cell'
                                : 'hidden sm:table-cell'
                            }`}>
                              {typeof srv.pro === 'boolean' ? (
                                srv.pro ? (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700">
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 text-slate-400">
                                    <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  </span>
                                )
                              ) : (
                                <span className="inline-block px-1 sm:px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[7.5px] sm:text-[10px] border border-emerald-200/70 leading-tight break-words max-w-full">
                                  <span className="sm:hidden">{mobileFilter === 'all' ? getCompactMatrixLabel(srv.pro) : srv.pro}</span>
                                  <span className="hidden sm:inline">{srv.pro}</span>
                                </span>
                              )}
                            </td>

                            {/* Advance Column */}
                            <td className={`py-1.5 px-0.5 sm:py-2.5 sm:px-2 text-center text-xs font-medium bg-purple-50/20 align-middle ${
                              mobileFilter === 'all'
                                ? 'table-cell'
                                : mobileFilter === 'advance'
                                ? 'table-cell'
                                : 'hidden sm:table-cell'
                            }`}>
                              {typeof srv.advance === 'boolean' ? (
                                srv.advance ? (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-100 text-[#7547F5]">
                                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 text-slate-400">
                                    <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                  </span>
                                )
                              ) : (
                                <span className="inline-block px-1 sm:px-2 py-0.5 rounded bg-purple-50 text-[#7547F5] font-bold text-[7.5px] sm:text-[10px] border border-purple-200/70 leading-tight break-words max-w-full">
                                  <span className="sm:hidden">{mobileFilter === 'all' ? getCompactMatrixLabel(srv.advance) : srv.advance}</span>
                                  <span className="hidden sm:inline">{srv.advance}</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}

                    {/* Quick Action Footer Row */}
                    <tr className="bg-slate-50 border-t-2 border-[#C7D7FE]">
                      <td className={`py-2 sm:py-3.5 px-1.5 sm:px-4 text-[9px] sm:text-xs font-extrabold text-[#10183F] uppercase tracking-wider ${
                        mobileFilter === 'all' ? 'w-[37%] sm:w-[40%]' : 'w-[60%] sm:w-[40%]'
                      }`}>
                        Plan Choice
                      </td>

                      {/* Basic CTA */}
                      <td className={`py-2 px-0.5 sm:py-3 sm:px-2 text-center ${
                        mobileFilter === 'all'
                          ? 'table-cell'
                          : mobileFilter === 'basic'
                          ? 'table-cell'
                          : 'hidden sm:table-cell'
                      }`}>
                        <Link
                          href="/signup?plan=basic&intent=matrix"
                          className="inline-flex items-center justify-center px-1 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[8.5px] sm:text-xs font-bold text-[#174BFF] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors w-full"
                        >
                          {mobileFilter === 'basic' ? `Choose Basic (${formatInr(pricingConfig.basic)})` : 'Basic'}
                        </Link>
                      </td>

                      {/* Pro CTA */}
                      <td className={`py-2 px-0.5 sm:py-3 sm:px-2 text-center ${
                        mobileFilter === 'all'
                          ? 'table-cell'
                          : mobileFilter === 'pro'
                          ? 'table-cell'
                          : 'hidden sm:table-cell'
                      }`}>
                        <Link
                          href="/signup?plan=pro&intent=matrix"
                          className="inline-flex items-center justify-center px-1 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[8.5px] sm:text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors w-full"
                        >
                          {mobileFilter === 'pro' ? `Choose Pro (${formatInr(pricingConfig.pro)})` : 'Pro'}
                        </Link>
                      </td>

                      {/* Advance CTA */}
                      <td className={`py-2 px-0.5 sm:py-3 sm:px-2 text-center ${
                        mobileFilter === 'all'
                          ? 'table-cell'
                          : mobileFilter === 'advance'
                          ? 'table-cell'
                          : 'hidden sm:table-cell'
                      }`}>
                        <Link
                          href="/signup?plan=advance&intent=matrix"
                          className="inline-flex items-center justify-center px-1 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[8.5px] sm:text-xs font-bold text-white bg-[#7547F5] hover:bg-[#6032E3] shadow-xs transition-colors w-full"
                        >
                          {mobileFilter === 'advance' ? `Choose Advance (${formatInr(pricingConfig.advance)})` : 'Advance'}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
