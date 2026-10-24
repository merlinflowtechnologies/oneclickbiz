'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Monitor, 
  MessageCircle, 
  ShoppingBag, 
  CreditCard, 
  Globe, 
  Star, 
  Image as ImageIcon, 
  FileText, 
  Building2, 
  TrendingUp, 
  Grid, 
  Palette, 
  Package, 
  Wrench, 
  QrCode, 
  Mail, 
  Wifi, 
  Smartphone, 
  Briefcase,
  ArrowRight,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  icon: any;
  color: string;
  bg: string;
  link: string;
}

const ALL_SERVICES_24: ServiceItem[] = [
  { id: 'personal-profile', name: 'Personal Profile', icon: Users, color: 'text-[#174BFF]', bg: 'bg-blue-50', link: '#demo' },
  { id: 'mini-website', name: 'Mini Website', icon: Monitor, color: 'text-[#7547F5]', bg: 'bg-purple-50', link: '#demo' },
  { id: 'whatsapp-store', name: 'WhatsApp Store', icon: MessageCircle, color: 'text-[#16B981]', bg: 'bg-emerald-50', link: '#demo' },
  { id: 'e-commerce', name: 'E-commerce', icon: ShoppingBag, color: 'text-rose-600', bg: 'bg-rose-50', link: '#demo' },
  { id: 'visiting-cards', name: 'Visiting Cards, Flyers & Brochures', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50', link: '#templates' },
  { id: 'lead-extractions', name: 'Lead Extractions', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '#demo' },
  { id: 'custom-domain', name: 'Custom Domain & Landing Pages', icon: Globe, color: 'text-sky-600', bg: 'bg-sky-50', link: '#demo' },
  { id: 'reviews-ratings', name: 'Reviews & Ratings', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', link: '#demo' },

  { id: 'gallery-space', name: 'Gallery Space', icon: ImageIcon, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '#demo' },
  { id: 'articles-blogs', name: 'Articles & Blogs', icon: FileText, color: 'text-[#174BFF]', bg: 'bg-blue-50', link: '/blog' },
  { id: 'commercial-usage', name: 'Commercial Usage', icon: Building2, color: 'text-orange-600', bg: 'bg-orange-50', link: '#pricing' },
  { id: 'scaling-business', name: 'Scaling Your Business', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50', link: '#demo' },
  { id: 'custom-templates', name: 'Custom Templates', icon: Grid, color: 'text-purple-600', bg: 'bg-purple-50', link: '#templates' },
  { id: 'easy-designing', name: 'Easy Designing with Multiple Edits', icon: Palette, color: 'text-pink-600', bg: 'bg-pink-50', link: '#demo' },
  { id: 'product-space', name: 'Product Space', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', link: '#demo' },
  { id: 'services-management', name: 'Services Management', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50', link: '#demo' },

  { id: 'customized-qr', name: 'Customized QR Code', icon: QrCode, color: 'text-purple-600', bg: 'bg-purple-50', link: '#demo' },
  { id: 'payment-gateways', name: 'Payment Gateways', icon: CreditCard, color: 'text-sky-600', bg: 'bg-sky-50', link: '#pricing' },
  { id: 'canva-adobe', name: 'Canva & Adobe Integration', icon: Layers, color: 'text-[#174BFF]', bg: 'bg-blue-50', link: '#demo' },
  { id: 'email-signature', name: 'Email Signature Generator', icon: Mail, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/dashboard/signature' },
  { id: 'report-pdf', name: 'Report PDF Extract', icon: Download, color: 'text-rose-600', bg: 'bg-rose-50', link: '#demo' },
  { id: 'live-profile', name: 'Live Profile', icon: Wifi, color: 'text-red-500', bg: 'bg-red-50', link: '/v/kishore' },
  { id: 'direct-app', name: 'Direct App Installation', icon: Smartphone, color: 'text-emerald-600', bg: 'bg-emerald-50', link: '#demo' },
  { id: 'business-tools', name: 'Business Management Tools', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '#features' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#E2E9FA]/60 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
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
          {ALL_SERVICES_24.map((service) => {
            const IconComp = service.icon;
            return (
              <Link
                key={service.id}
                href={service.link}
                className="group bg-white rounded-2xl border border-[#E2E9FA] hover:border-blue-300 p-3.5 flex flex-col items-center text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(23,75,255,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon Squircle */}
                <div className={`w-12 h-12 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-2xs`}>
                  <IconComp className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Service Name */}
                <h3 className="text-xs font-semibold text-[#10183F] group-hover:text-[#174BFF] transition-colors leading-snug line-clamp-2 min-h-[32px] flex items-center justify-center">
                  {service.name}
                </h3>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
