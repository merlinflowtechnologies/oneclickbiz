'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { ServiceDetailItem } from '@/data/servicesData';

interface ServiceDetailSectorProps {
  service: ServiceDetailItem;
  allServiceIds: string[];
  onSelectService: (id: string) => void;
  onClose?: () => void;
}

export default function ServiceDetailSector({
  service,
  allServiceIds,
  onSelectService,
  onClose
}: ServiceDetailSectorProps) {
  const [activeTab, setActiveTab] = useState<'matter' | 'how-to-use'>('matter');
  const [imageLoaded, setImageLoaded] = useState(false);

  // Navigation helpers for Previous / Next service
  const currentIndex = allServiceIds.indexOf(service.id);
  const prevId = currentIndex > 0 ? allServiceIds[currentIndex - 1] : allServiceIds[allServiceIds.length - 1];
  const nextId = currentIndex < allServiceIds.length - 1 ? allServiceIds[currentIndex + 1] : allServiceIds[0];

  return (
    <div 
      id="service-detail-sector"
      className="mt-8 sm:mt-10 rounded-3xl bg-gradient-to-b from-[#F8FAFF] via-white to-[#F0F5FF] border-2 border-[#C7D7FE] shadow-[0_20px_50px_rgba(23,75,255,0.10)] p-5 sm:p-7 lg:p-9 relative overflow-hidden transition-all duration-500 animate-fadeIn"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-purple-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-100/30 to-blue-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* TOP BAR: Category Badge, Switcher & Close */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E2E9FA] relative z-10">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-[#174BFF]/10 text-[#174BFF] text-xs font-bold uppercase tracking-wider border border-[#174BFF]/20 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#174BFF]" />
            {service.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/70">
            {service.badge}
          </span>
          <span className="text-xs text-[#64718F] font-medium hidden sm:inline">
            Tool {currentIndex + 1} of {allServiceIds.length}
          </span>
        </div>

        {/* Quick Service Switchers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onSelectService(prevId)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-[#C7D7FE] hover:border-[#174BFF] text-[#10183F] hover:text-[#174BFF] text-xs font-semibold flex items-center gap-1 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Previous Service"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={() => onSelectService(nextId)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-[#C7D7FE] hover:border-[#174BFF] text-[#10183F] hover:text-[#174BFF] text-xs font-semibold flex items-center gap-1 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            title="Next Service"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64718F] hover:text-[#10183F] transition-all ml-1 cursor-pointer"
              title="Close Deep Dive"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* SERVICE HERO HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 sm:gap-6 pt-6 pb-6 relative z-10">
        {/* 3D Icon Badge */}
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${service.bgGrad} border-2 ${service.borderColor} shadow-[0_12px_28px_rgba(23,75,255,0.14)] flex items-center justify-center shrink-0 p-2`}>
          <img 
            src={service.iconImage} 
            alt={service.name} 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* Title & Tagline */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#10183F] tracking-tight">
              {service.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-100 text-[#174BFF] text-[11px] font-bold">
              LIVE TOOL
            </span>
          </div>
          <p className="mt-1.5 text-sm sm:text-base text-[#174BFF] font-semibold leading-relaxed">
            {service.tagline}
          </p>
        </div>

        {/* Key Stat Badges */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap lg:justify-end">
          {service.metrics.map((metric, idx) => (
            <div 
              key={idx}
              className="bg-white/90 backdrop-blur-sm border border-[#C7D7FE] rounded-2xl px-3.5 py-2 text-center shadow-2xs min-w-[90px]"
            >
              <div className="text-base sm:text-lg font-black text-[#174BFF] tracking-tight">
                {metric.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-medium text-[#64718F] uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO-COLUMN CONTENT GRID: MATTER + USAGE (LEFT) & VISUAL REFERENCE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4 relative z-10">
        
        {/* LEFT COLUMN (7 cols): Matter & How It Can Be Used */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Section Tab Buttons: About Matter vs How To Use */}
          <div className="flex items-center gap-2 p-1 bg-[#E8EEFD] rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('matter')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'matter'
                  ? 'bg-white text-[#174BFF] shadow-xs'
                  : 'text-[#64718F] hover:text-[#10183F]'
              }`}
            >
              About This Service
            </button>
            <button
              onClick={() => setActiveTab('how-to-use')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'how-to-use'
                  ? 'bg-white text-[#174BFF] shadow-xs'
                  : 'text-[#64718F] hover:text-[#10183F]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              How It Can Be Used
            </button>
          </div>

          {/* TAB 1: ABOUT THE SERVICE (MATTER) */}
          {activeTab === 'matter' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E9FA] shadow-xs">
                <h4 className="text-xs font-bold text-[#174BFF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#174BFF]" />
                  What It Does & Why Your Business Needs It
                </h4>
                <p className="text-sm sm:text-base text-[#10183F] font-medium leading-relaxed">
                  {service.about.overview}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[#475467] leading-relaxed">
                  {service.about.description}
                </p>
                <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60">
                  <span className="text-xs font-bold text-[#174BFF]">Core Business Impact: </span>
                  <span className="text-xs text-[#10183F] font-medium">{service.about.valueProposition}</span>
                </div>
              </div>

              {/* Key Capabilities */}
              <div>
                <h5 className="text-xs font-bold text-[#64718F] uppercase tracking-wider mb-2.5">
                  Key Capabilities Included
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.keyCapabilities.map((cap, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-xl p-3 border border-[#E2E9FA] flex items-start gap-2.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#10183F]">{cap.title}</div>
                        <div className="text-[11px] text-[#64718F] mt-0.5 leading-snug">{cap.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Is This For? */}
              <div className="pt-1">
                <h5 className="text-xs font-bold text-[#64718F] uppercase tracking-wider mb-2">
                  Best Suited For
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {service.targetAudience.map((audience, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#C7D7FE] text-[#10183F] text-xs font-medium shadow-2xs"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOW IT CAN BE USED (STEP-BY-STEP WORKFLOW) */}
          {activeTab === 'how-to-use' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div className="text-xs font-bold text-[#174BFF] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                4 Simple Steps To Put This Into Action
              </div>

              <div className="space-y-3">
                {service.howToUse.map((step) => (
                  <div 
                    key={step.step}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E2E9FA] flex items-start gap-3.5 shadow-2xs hover:border-[#174BFF]/50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#174BFF] to-[#3B82F6] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#10183F]">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#475467] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero technical code required — full visual setup completed in under 5 minutes.</span>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS (CTA ROW) */}
          <div className="pt-4 border-t border-[#E2E9FA] flex flex-wrap items-center gap-3">
            <Link
              href={service.ctaUrl}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#174BFF] via-[#2F61FF] to-[#5932EA] hover:opacity-95 shadow-[0_8px_20px_rgba(23,75,255,0.28)] hover:shadow-[0_12px_28px_rgba(23,75,255,0.38)] transition-all cursor-pointer"
            >
              <span>{service.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={service.demoUrl}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#174BFF] bg-white hover:bg-blue-50/80 border border-[#C7D7FE] hover:border-[#174BFF] transition-all cursor-pointer shadow-2xs"
            >
              <span>Explore Live Working Demos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN (5 cols): Visual Reference Mockup Showcase ("Reference Images") */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-3xl border-2 border-[#C7D7FE] p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex flex-col h-full">
            
            {/* Mockup Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E9FA]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#10183F] uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#174BFF]" />
                  Visual Reference Showcase
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#174BFF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Live Preview
              </span>
            </div>

            {/* Reference Image Container with Zoom & Hover Effects */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group flex-1 min-h-[280px] sm:min-h-[340px] flex items-center justify-center">
              <img 
                key={service.referenceImage}
                src={service.referenceImage} 
                alt={`${service.name} reference illustration`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Floating Highlight Tag */}
              <div className="absolute top-3 left-3 bg-[#10183F]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {service.name} in Action
              </div>

              {/* Floating Service 3D Mini Icon Badge */}
              <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 shadow-md flex items-center justify-center p-1">
                <img 
                  src={service.iconImage} 
                  alt="" 
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Bottom Gradient Overlay with Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5 sm:p-4 text-white">
                <p className="text-xs font-medium text-white/95 leading-snug drop-shadow-sm">
                  {service.referenceCaption}
                </p>
              </div>
            </div>

            {/* Interactive Feature Pills Under Reference Image */}
            <div className="mt-3.5 pt-3 border-t border-[#E2E9FA] grid grid-cols-2 gap-2">
              <div className="bg-[#F8FAFF] rounded-xl p-2 text-center border border-[#E2E9FA]">
                <div className="text-[11px] font-bold text-[#10183F]">Mobile & Desktop</div>
                <div className="text-[10px] text-[#64718F]">100% Responsive</div>
              </div>
              <div className="bg-[#F8FAFF] rounded-xl p-2 text-center border border-[#E2E9FA]">
                <div className="text-[11px] font-bold text-[#10183F]">Instant Cloud Sync</div>
                <div className="text-[10px] text-[#64718F]">Zero Maintenance</div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
