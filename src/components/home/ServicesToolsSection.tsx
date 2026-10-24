'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Gift, Headphones } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
}

const SERVICES_ROWS_1_TO_3: ServiceItem[] = [
  // ROW 1
  {
    id: 'personal-profile',
    title: 'Personal Profile',
    desc: 'Create a professional profile for your business.',
    image: '/services/personal-profile@2x.png',
    link: '#demo',
  },
  {
    id: 'mini-website',
    title: 'Mini Website',
    desc: 'Get a modern business website in minutes.',
    image: '/services/mini-website@2x.png',
    link: '#demo',
  },
  {
    id: 'whatsapp-store',
    title: 'WhatsApp Store',
    desc: 'Sell products directly on WhatsApp.',
    image: '/services/whatsapp-store@2x.png',
    link: '#demo',
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce',
    desc: 'Sell products online with secure payments.',
    image: '/services/e-commerce@2x.png',
    link: '#demo',
  },
  {
    id: 'visiting-cards',
    title: 'Visiting Cards, Flyers, Brochures',
    desc: 'Create and download print ready designs.',
    image: '/services/visiting-cards@2x.png',
    link: '#templates',
  },
  {
    id: 'lead-extractions',
    title: 'Lead Extractions',
    desc: 'Find and grow potential customers.',
    image: '/services/lead-extractions@2x.png',
    link: '#demo',
  },
  // ROW 2
  {
    id: 'custom-domain',
    title: 'Custom Domain & Landing Pages',
    desc: 'Use your own domain with custom pages.',
    image: '/services/custom-domain@2x.png',
    link: '#demo',
  },
  {
    id: 'reviews-ratings',
    title: 'Reviews & Ratings',
    desc: 'Build trust with customer reviews.',
    image: '/services/reviews-ratings@2x.png',
    link: '#demo',
  },
  {
    id: 'gallery-space',
    title: 'Gallery Space',
    desc: 'Showcase photos and videos.',
    image: '/services/gallery-space@2x.png',
    link: '#demo',
  },
  {
    id: 'articles-blogs',
    title: 'Articles & Blogs',
    desc: 'Share updates and news.',
    image: '/services/articles-blogs@2x.png',
    link: '/blog',
  },
  {
    id: 'commercial-usage',
    title: 'Commercial Usage',
    desc: 'Use for business and commercial needs.',
    image: '/services/commercial-usage@2x.png',
    link: '#pricing',
  },
  {
    id: 'scaling-business',
    title: 'Scaling Your Business',
    desc: 'Reach more customers online.',
    image: '/services/scaling-business@2x.png',
    link: '#demo',
  },
  // ROW 3
  {
    id: 'custom-templates',
    title: 'Custom Templates',
    desc: 'Choose from beautiful templates.',
    image: '/services/custom-templates@2x.png',
    link: '#templates',
  },
  {
    id: 'easy-designing',
    title: 'Easy Designing with Multiple Edits',
    desc: 'Customize easily without coding.',
    image: '/services/easy-designing@2x.png',
    link: '#demo',
  },
  {
    id: 'product-space',
    title: 'Product Space',
    desc: 'Display your products beautifully.',
    image: '/services/product-space@2x.png',
    link: '#demo',
  },
  {
    id: 'services',
    title: 'Services',
    desc: 'List and manage your services.',
    image: '/services/services@2x.png',
    link: '#demo',
  },
  {
    id: 'customized-qr',
    title: 'Customzied QR Code',
    desc: 'Create branded QR codes.',
    image: '/services/customized-qr@2x.png',
    link: '#demo',
  },
  {
    id: 'payment-gateways',
    title: 'Payment Gateways',
    desc: 'Razorpay, Cashfree, Stripe and more.',
    image: '/services/payment-gateways@2x.png',
    link: '#pricing',
  },
];

const SERVICES_ROW_4: ServiceItem[] = [
  {
    id: 'integrated-canva',
    title: 'Integrated Canva & Adobe',
    desc: 'Design professional content easily.',
    image: '/services/integrated-canva@2x.png',
    link: '#demo',
  },
  {
    id: 'email-signature',
    title: 'Email Signature Generator',
    desc: 'Create professional email signatures.',
    image: '/services/email-signature@2x.png',
    link: '/dashboard/signature',
  },
  {
    id: 'report-pdf',
    title: 'Report PDF Extract',
    desc: 'Generate and export reports easily.',
    image: '/services/report-pdf@2x.png',
    link: '#demo',
  },
  {
    id: 'live-profile',
    title: 'Live Profile',
    desc: 'Be visible to customers in real-time.',
    image: '/services/live-profile@2x.png',
    link: '/v/kishore',
  },
  {
    id: 'use-as-app',
    title: 'Use as App (Direct Installation)',
    desc: 'Install on mobile directly.',
    image: '/services/use-as-app@2x.png',
    link: '#demo',
  },
];

const BOTTOM_HIGHLIGHTS = [
  {
    icon: Zap,
    iconBg: 'bg-purple-100 text-[#7C3AED]',
    title: 'Everything in One Platform',
    desc: 'All the tools you need for your business growth in one place.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-blue-100 text-[#2563EB]',
    title: 'Easy to Use',
    desc: 'No technical skills required.',
  },
  {
    icon: Gift,
    iconBg: 'bg-purple-100 text-[#7C3AED]',
    title: 'Save Time & Cost',
    desc: 'Professional tools at an affordable price.',
  },
  {
    icon: Headphones,
    iconBg: 'bg-purple-100 text-[#7C3AED]',
    title: 'Dedicated Support',
    desc: 'We are always here to help you.',
  },
];

export default function ServicesToolsSection() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-[#FCFDFF] border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching user mockup */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]/70 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
            OUR SERVICES
          </span>
          
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
            All the tools you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED]">
              grow your business
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm lg:text-[15px] text-slate-500 font-normal">
            Create, manage and scale your business with powerful tools — all in one place.
          </p>
        </div>

        {/* Rows 1-3: 6 Columns on Desktop, 3 on Tablet, 2 on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4">
          {SERVICES_ROWS_1_TO_3.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(79,70,229,0.08)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <div>
                {/* Visual Image Container - exact image from mockup, adjusting responsively */}
                <div className="w-full h-[82px] sm:h-[92px] lg:h-[78px] xl:h-[84px] rounded-xl overflow-hidden bg-slate-50/50 flex items-center justify-center p-1.5 mb-2.5 group-hover:bg-indigo-50/30 transition-colors">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors leading-snug line-clamp-2 min-h-[32px] flex items-center">
                  {service.title}
                </h3>
              </div>

              {/* Description & Action Button Row */}
              <div className="flex items-end justify-between gap-1.5 mt-1 pt-1 border-t border-slate-100/60">
                <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug line-clamp-2 flex-1">
                  {service.desc}
                </p>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-200 bg-slate-50 group-hover:bg-[#EEF2FF] group-hover:border-[#C7D2FE] group-hover:text-[#4F46E5] flex items-center justify-center text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 4: 5 Columns on Desktop, 3 on Tablet, 2 on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4 mt-3 sm:mt-3.5 lg:mt-4">
          {SERVICES_ROW_4.map((service, idx) => (
            <Link
              key={service.id}
              href={service.link}
              className={`group bg-white rounded-2xl border border-slate-200/80 p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(79,70,229,0.08)] hover:border-indigo-300 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                idx === 4 ? 'col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Visual Image Container */}
                <div className="w-full h-[64px] sm:h-[72px] lg:h-[60px] xl:h-[66px] rounded-xl overflow-hidden bg-slate-50/50 flex items-center justify-center p-1 mb-2.5 group-hover:bg-indigo-50/30 transition-colors">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors leading-snug line-clamp-2 min-h-[32px] flex items-center">
                  {service.title}
                </h3>
              </div>

              {/* Description & Action Button Row */}
              <div className="flex items-end justify-between gap-1.5 mt-1 pt-1 border-t border-slate-100/60">
                <p className="text-[10.5px] sm:text-[11px] text-slate-500 leading-snug line-clamp-2 flex-1">
                  {service.desc}
                </p>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-200 bg-slate-50 group-hover:bg-[#EEF2FF] group-hover:border-[#C7D2FE] group-hover:text-[#4F46E5] flex items-center justify-center text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Feature Highlights Bar */}
        <div className="mt-6 sm:mt-8 lg:mt-10 bg-gradient-to-r from-[#F5F3FF] via-[#EEF2FF] to-[#F5F3FF] border border-[#E0E7FF] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {BOTTOM_HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-tight mt-0.5">
                      {item.desc}
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
