'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  image: string;
  bgGrad: string;
  borderColor: string;
  link: string;
}

const ALL_SERVICES_24: ServiceItem[] = [
  { id: 'personal-profile', name: 'Personal Profile', image: '/services/personal-profile.png?v=7', bgGrad: 'from-blue-50 to-indigo-100/60', borderColor: 'border-blue-200/70', link: '#demo' },
  { id: 'mini-website', name: 'Mini Website', image: '/services/mini-website.png?v=7', bgGrad: 'from-purple-50 to-violet-100/60', borderColor: 'border-purple-200/70', link: '#demo' },
  { id: 'whatsapp-store', name: 'WhatsApp Store', image: '/services/whatsapp-store.png?v=7', bgGrad: 'from-emerald-50 to-green-100/60', borderColor: 'border-emerald-200/70', link: '#demo' },
  { id: 'e-commerce', name: 'E-commerce', image: '/services/e-commerce.png?v=7', bgGrad: 'from-rose-50 to-pink-100/60', borderColor: 'border-rose-200/70', link: '#demo' },
  { id: 'visiting-cards', name: 'Visiting Cards, Flyers & Brochures', image: '/services/visiting-cards.png?v=7', bgGrad: 'from-amber-50 to-orange-100/60', borderColor: 'border-amber-200/70', link: '#templates' },
  { id: 'lead-extractions', name: 'Lead Extractions', image: '/services/lead-extractions.png?v=7', bgGrad: 'from-indigo-50 to-blue-100/60', borderColor: 'border-indigo-200/70', link: '#demo' },
  { id: 'custom-domain', name: 'Custom Domain & Landing Pages', image: '/services/custom-domain.png?v=7', bgGrad: 'from-sky-50 to-blue-100/60', borderColor: 'border-sky-200/70', link: '#demo' },
  { id: 'reviews-ratings', name: 'Reviews & Ratings', image: '/services/reviews-ratings.png?v=7', bgGrad: 'from-amber-50 to-yellow-100/60', borderColor: 'border-amber-200/70', link: '#demo' },

  { id: 'gallery-space', name: 'Gallery Space', image: '/services/gallery-space.png?v=7', bgGrad: 'from-teal-50 to-emerald-100/60', borderColor: 'border-teal-200/70', link: '#demo' },
  { id: 'articles-blogs', name: 'Articles & Blogs', image: '/services/articles-blogs.png?v=7', bgGrad: 'from-blue-50 to-indigo-100/60', borderColor: 'border-blue-200/70', link: '/blog' },
  { id: 'commercial-usage', name: 'Commercial Usage', image: '/services/commercial-usage.png?v=7', bgGrad: 'from-orange-50 to-amber-100/60', borderColor: 'border-orange-200/70', link: '#pricing' },
  { id: 'scaling-business', name: 'Scaling Your Business', image: '/services/scaling-business.png?v=7', bgGrad: 'from-rose-50 to-red-100/60', borderColor: 'border-rose-200/70', link: '#demo' },
  { id: 'custom-templates', name: 'Custom Templates', image: '/services/custom-templates.png?v=7', bgGrad: 'from-purple-50 to-fuchsia-100/60', borderColor: 'border-purple-200/70', link: '#templates' },
  { id: 'easy-designing', name: 'Easy Designing with Multiple Edits', image: '/services/easy-designing.png?v=7', bgGrad: 'from-pink-50 to-rose-100/60', borderColor: 'border-pink-200/70', link: '#demo' },
  { id: 'product-space', name: 'Product Space', image: '/services/product-space.png?v=7', bgGrad: 'from-amber-50 to-orange-100/60', borderColor: 'border-amber-200/70', link: '#demo' },
  { id: 'services-management', name: 'Services Management', image: '/services/services-management.png?v=7', bgGrad: 'from-blue-50 to-cyan-100/60', borderColor: 'border-blue-200/70', link: '#demo' },

  { id: 'customized-qr', name: 'Customized QR Code', image: '/services/customized-qr.png?v=7', bgGrad: 'from-purple-50 to-indigo-100/60', borderColor: 'border-purple-200/70', link: '#demo' },
  { id: 'payment-gateways', name: 'Payment Gateways', image: '/services/payment-gateways.png?v=7', bgGrad: 'from-sky-50 to-emerald-100/60', borderColor: 'border-sky-200/70', link: '#pricing' },
  { id: 'canva-adobe', name: 'Canva & Adobe Integration', image: '/services/canva-adobe.png?v=7', bgGrad: 'from-cyan-50 to-rose-100/60', borderColor: 'border-cyan-200/70', link: '#demo' },
  { id: 'email-signature', name: 'Email Signature Generator', image: '/services/email-signature.png?v=7', bgGrad: 'from-cyan-50 to-teal-100/60', borderColor: 'border-cyan-200/70', link: '/dashboard/signature' },
  { id: 'report-pdf', name: 'Report PDF Extract', image: '/services/report-pdf.png?v=7', bgGrad: 'from-rose-50 to-red-100/60', borderColor: 'border-rose-200/70', link: '#demo' },
  { id: 'live-profile', name: 'Live Profile', image: '/services/live-profile.png?v=7', bgGrad: 'from-red-50 to-rose-100/60', borderColor: 'border-red-200/70', link: '/v/kishore' },
  { id: 'direct-app', name: 'Direct App Installation', image: '/services/direct-app.png?v=7', bgGrad: 'from-emerald-50 to-teal-100/60', borderColor: 'border-emerald-200/70', link: '#demo' },
  { id: 'business-tools', name: 'Business Management Tools', image: '/services/business-tools.png?v=7', bgGrad: 'from-indigo-50 to-slate-100/60', borderColor: 'border-indigo-200/70', link: '#features' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#C7D7FE] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#EDF3FF] text-[#174BFF] border border-[#C7D7FE] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight leading-tight">
              All the tools you need to grow{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#174BFF] via-[#3568FF] to-[#7547F5]">
                your business.
              </span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64718F] font-normal">
              Create, manage and grow your business online with powerful tools in one place.
            </p>
          </div>

          <Link
            href="#features"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#174BFF] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 24 Services Icon Grid: 8 columns on desktop, 4 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
          {ALL_SERVICES_24.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-3 sm:p-3.5 flex flex-col items-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(23,75,255,0.09)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              {/* 3D Realistic Icon Squircle (Enlarged) */}
              <div
                className={`w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-2xl bg-gradient-to-br ${service.bgGrad} border ${service.borderColor} flex items-center justify-center mb-3 group-hover:scale-108 group-hover:shadow-md transition-all duration-300 shadow-2xs p-1.5`}
              >
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-14 h-14 sm:w-[70px] sm:h-[70px] object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                  loading="lazy"
                />
              </div>

              {/* Service Name */}
              <h3 className="text-xs font-semibold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug line-clamp-2 min-h-[32px] flex items-center justify-center">
                {service.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
