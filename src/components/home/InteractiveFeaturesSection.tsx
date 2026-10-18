'use client';

import React, { useState } from 'react';
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
  Zap,
  CheckCircle2
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
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hoverBorder: 'hover:border-amber-400', glow: 'group-hover:text-amber-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', hoverBorder: 'hover:border-indigo-400', glow: 'group-hover:text-indigo-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hoverBorder: 'hover:border-emerald-400', glow: 'group-hover:text-emerald-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hoverBorder: 'hover:border-purple-400', glow: 'group-hover:text-purple-600' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', hoverBorder: 'hover:border-sky-400', glow: 'group-hover:text-sky-600' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', hoverBorder: 'hover:border-pink-400', glow: 'group-hover:text-pink-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', hoverBorder: 'hover:border-teal-400', glow: 'group-hover:text-teal-600' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', hoverBorder: 'hover:border-cyan-400', glow: 'group-hover:text-cyan-600' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', hoverBorder: 'hover:border-violet-400', glow: 'group-hover:text-violet-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', hoverBorder: 'hover:border-rose-400', glow: 'group-hover:text-rose-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', hoverBorder: 'hover:border-orange-400', glow: 'group-hover:text-orange-600' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hoverBorder: 'hover:border-blue-400', glow: 'group-hover:text-blue-600' },
};

export default function InteractiveFeaturesSection() {
  const [activeSector, setActiveSector] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  const handleOpenFeature = (feat: FeatureDetail) => {
    setSelectedFeature(feat);
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/60 to-blue-50/70 backdrop-blur-xl border-y border-slate-200/80 relative scroll-mt-20 overflow-hidden">
      {/* Subtle Professional Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

      {/* Soft Ambient Floating Blurs */}
      <div className="absolute top-10 left-10 w-[700px] h-[450px] bg-gradient-to-r from-blue-400/20 via-sky-300/20 to-indigo-300/20 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[700px] h-[450px] bg-gradient-to-l from-sky-400/20 via-blue-300/20 to-cyan-200/20 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles size={13} className="text-blue-600" />
            Interactive Feature Matrix &amp; Sector Impact
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything Your Brand Needs to Network &amp; Close Deals
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Click any feature below to see how it specifically solves pain points and accelerates revenue for your industry sector.
          </p>
        </div>

        {/* Sector Filter Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 px-2 mr-1">
              <Filter size={13} className="text-blue-600" />
              <span>Filter by Industry:</span>
            </div>
            {SECTORS.map((sec) => {
              const isActive = activeSector === sec.id;
              return (
                <button
                  key={sec.id}
                  id={`sector-filter-${sec.id}`}
                  onClick={() => setActiveSector(sec.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-sm ${
                    isActive
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent shadow-blue-300/50 scale-105'
                      : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_DATA.map((feat) => {
            const IconComponent = ICON_MAP[feat.iconName] || CreditCard;
            const theme = THEME_STYLES[feat.themeColor] || THEME_STYLES.indigo;
            
            // Check if there is specific sector insight for active sector
            const sectorInsight = activeSector !== 'all' 
              ? feat.sectorImpacts.find(s => s.sectorId === activeSector)
              : null;

            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                onClick={() => handleOpenFeature(feat)}
                className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 hover:border-blue-400/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all cursor-pointer overflow-hidden group hover:-translate-y-1.5 duration-300 flex flex-col justify-between"
              >
                {/* Feature Image Header (Matching ProfessionalMiniWebsiteView pattern) */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={feat.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                    alt={feat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
                  
                  {/* Floating Icon Box on Image */}
                  <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center border ${theme.border} shadow-md backdrop-blur-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Feature Badge */}
                  <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.bg} ${theme.text} border ${theme.border} backdrop-blur-md shadow-xs`}>
                    {feat.badge}
                  </span>

                  {/* Quick Tagline Pill on bottom of Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium drop-shadow-sm">
                    <span className="truncate max-w-[80%] font-semibold tracking-wide text-white/95">{feat.tagline}</span>
                    <span className="text-[10px] text-amber-300 font-bold shrink-0">Explore →</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Title & Description */}
                    <h4 className={`text-base sm:text-lg font-bold text-slate-900 ${theme.glow} transition-colors leading-snug`}>
                      {feat.name}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {feat.description}
                    </p>

                    {/* Dynamic Sector Pill if an industry is selected */}
                    {sectorInsight && (
                      <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 space-y-1 animate-in fade-in duration-200">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900">
                          <span>{sectorInsight.sectorIcon}</span>
                          <span>For {sectorInsight.sectorName}:</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-tight">
                          {sectorInsight.roiBenefit}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span className="flex items-center gap-1">
                      <span>How this helps your sector</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal group-hover:text-slate-600">
                      Click to explore →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-600 font-medium">
            💡 <strong>Pro-Tip:</strong> Click on any feature above to view interactive case studies, pain point solutions, and expected ROI for your specific business domain.
          </p>
        </div>
      </div>

      {/* Interactive Sector Impact Deep-Dive Modal */}
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
