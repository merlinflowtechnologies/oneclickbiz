'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  CreditCard, 
  Wifi, 
  ShoppingBag, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Download, 
  QrCode, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  Smartphone,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FEATURES_DATA, FeatureDetail, SECTORS } from '@/data/featureSectorImpact';
import FeatureImpactModal from './FeatureImpactModal';

const ICON_MAP: Record<string, any> = {
  CreditCard,
  Wifi,
  ShoppingBag,
  Calendar,
  BookOpen,
  Sparkles,
  Download,
  QrCode,
  TrendingUp,
  Layers,
  ShieldCheck,
  Smartphone
};

const THEME_STYLES: Record<string, { bg: string; text: string; border: string; hoverBorder: string; glow: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hoverBorder: 'hover:border-amber-300', glow: 'group-hover:text-[#0066FF]' },
  indigo: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  emerald: { bg: 'bg-emerald-50', text: 'text-[#00875A]', border: 'border-emerald-200', hoverBorder: 'hover:border-[#00875A]', glow: 'group-hover:text-[#0066FF]' },
  purple: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  sky: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  pink: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  teal: { bg: 'bg-emerald-50', text: 'text-[#00875A]', border: 'border-emerald-200', hoverBorder: 'hover:border-[#00875A]', glow: 'group-hover:text-[#0066FF]' },
  cyan: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  violet: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  rose: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
  orange: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hoverBorder: 'hover:border-amber-300', glow: 'group-hover:text-[#0066FF]' },
  blue: { bg: 'bg-blue-50', text: 'text-[#0066FF]', border: 'border-blue-200', hoverBorder: 'hover:border-[#0066FF]', glow: 'group-hover:text-[#0066FF]' },
};

export default function InteractiveFeaturesSection() {
  const [activeSector, setActiveSector] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect with smooth circular loop & auto-resume
  useEffect(() => {
    if (isPaused || selectedFeature !== null) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        // Loop back smoothly to start if at the end
        if (slider.scrollLeft >= maxScroll - 25) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const firstCard = slider.firstElementChild as HTMLElement;
          const step = firstCard ? firstCard.offsetWidth + 24 : 390;
          slider.scrollBy({ left: step, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, selectedFeature]);

  const scrollSlider = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (sliderRef.current) {
      const firstCard = sliderRef.current.firstElementChild as HTMLElement;
      const step = firstCard ? firstCard.offsetWidth + 24 : 390;
      const scrollAmount = direction === 'left' ? -step : step;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    // Resume auto-scroll after 4s after manual button click
    const timer = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleOpenFeature = (feat: FeatureDetail) => {
    setSelectedFeature(feat);
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#F5F7FA] border-y border-slate-200 relative scroll-mt-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
            Feature Matrix &amp; Sector Impact
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2A4A] tracking-tight">
            Everything Your Brand Needs to Network &amp; Close Deals
          </h3>
          <p className="text-base text-slate-600 leading-relaxed">
            Click any feature below to see how it specifically solves pain points and accelerates revenue for your industry sector.
          </p>
        </div>

        {/* Sector Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600 px-2 mr-1">
              <Filter size={14} className="text-[#0066FF]" />
              <span>Filter by Industry:</span>
            </div>
            {SECTORS.map((sec) => {
              const isActive = activeSector === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`sector-filter-${sec.id}`}
                  onClick={() => setActiveSector(sec.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    isActive
                      ? 'bg-[#0066FF] text-white border-[#0066FF]'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF]'
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#1B2A4A] font-bold">
              8 Core Capabilities
            </span>
            <span className="hidden sm:inline text-slate-400">
              • Swipe or use arrows to navigate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollSlider('left')}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Features Track */}
        <div className="relative">
          {/* Floating Arrows (Desktop) */}
          <button
            onClick={() => scrollSlider('left')}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-md items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollSlider('right')}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-md items-center justify-center hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Track */}
          <div
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex items-stretch gap-5 overflow-x-auto scrollbar-none scroll-smooth py-4 px-1 select-none"
            style={{ scrollSnapType: 'x proximity' }}
          >
            {FEATURES_DATA.map((feat) => {
              const IconComponent = ICON_MAP[feat.iconName] || CreditCard;
              const theme = THEME_STYLES[feat.themeColor] || THEME_STYLES.indigo;
              
              const sectorInsight = activeSector !== 'all' 
                ? feat.sectorImpacts.find(s => s.sectorId === activeSector)
                : null;

              return (
                <div
                  key={feat.id}
                  id={`feature-card-${feat.id}`}
                  onClick={() => handleOpenFeature(feat)}
                  style={{ scrollSnapAlign: 'start' }}
                  className="w-[300px] xs:w-[330px] sm:w-[360px] md:w-[380px] shrink-0 rounded-xl bg-white border border-slate-200 hover:border-[#0066FF] shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group hover:-translate-y-1 duration-200 flex flex-col justify-between"
                >
                  {/* Feature Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={feat.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                      alt={feat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/70 via-[#1B2A4A]/20 to-transparent" />
                    
                    {/* Icon */}
                    <div className={`absolute top-3 left-3 w-10 h-10 rounded-lg ${theme.bg} ${theme.text} flex items-center justify-center border ${theme.border} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Badge */}
                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg ${theme.bg} ${theme.text} border ${theme.border}`}>
                      {feat.badge}
                    </span>

                    {/* Bottom tagline */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-sm font-medium">
                      <span className="truncate max-w-[80%] font-semibold">{feat.tagline}</span>
                      <span className="text-xs text-white/80 font-bold shrink-0">Explore →</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h4 className={`text-lg font-bold text-[#1B2A4A] ${theme.glow} transition-colors leading-snug`}>
                        {feat.name}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {feat.description}
                      </p>

                      {/* Sector insight pill */}
                      {sectorInsight && (
                        <div className="p-3 rounded-lg bg-[#0066FF]/5 border border-[#0066FF]/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B2A4A]">
                            <span>{sectorInsight.sectorIcon}</span>
                            <span>For {sectorInsight.sectorName}:</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-tight">
                            {sectorInsight.roiBenefit}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-[#0066FF]">
                      <span className="flex items-center gap-1">
                        <span>How this helps your sector</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex items-center justify-center gap-1.5 mt-4 sm:hidden text-xs font-semibold text-[#0066FF] bg-[#0066FF]/5 px-3.5 py-2 rounded-lg border border-[#0066FF]/20 w-fit mx-auto">
          <span>👈 Swipe horizontally to view all capabilities 👉</span>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            💡 <strong>Pro-Tip:</strong> Click on any feature above to view interactive case studies, pain point solutions, and expected ROI for your specific business domain.
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedFeature && (
        <FeatureImpactModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
          defaultSectorId={activeSector}
        />
      )}
    </section>
  );
}
