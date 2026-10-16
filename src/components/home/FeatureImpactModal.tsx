'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  CreditCard, 
  Wifi, 
  ShoppingBag, 
  Calendar, 
  BookOpen, 
  Download, 
  QrCode, 
  Layers, 
  ShieldCheck, 
  Smartphone,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { FeatureDetail, SECTORS, SectorImpact } from '@/data/featureSectorImpact';

interface FeatureImpactModalProps {
  feature: FeatureDetail | null;
  onClose: () => void;
  defaultSectorId?: string;
}

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

export default function FeatureImpactModal({ feature, onClose, defaultSectorId = 'real_estate' }: FeatureImpactModalProps) {
  const initialSector = defaultSectorId && defaultSectorId !== 'all' ? defaultSectorId : 'real_estate';
  const [prevSectorProp, setPrevSectorProp] = useState(defaultSectorId);
  const [selectedSector, setSelectedSector] = useState<string>(initialSector);

  if (defaultSectorId !== prevSectorProp) {
    setPrevSectorProp(defaultSectorId);
    setSelectedSector(defaultSectorId && defaultSectorId !== 'all' ? defaultSectorId : 'real_estate');
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!feature) return null;

  const IconComponent = ICON_MAP[feature.iconName] || Sparkles;
  
  // Find sector impact for currently selected sector or fallback to first
  const activeImpact = feature.sectorImpacts.find(s => s.sectorId === selectedSector) || feature.sectorImpacts[0];

  const filteredSectors = SECTORS.filter(s => s.id !== 'all');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] glass-card border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white animate-in zoom-in-95 duration-200 bg-slate-900/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-950/90 via-indigo-950/90 to-slate-950/90 text-white border-b border-white/10 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-4 sm:gap-5 pr-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-950/50 flex-shrink-0 border border-indigo-400/40">
              <IconComponent className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {feature.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-400" /> Sector Impact Guide
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {feature.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                {feature.tagline}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          {feature.metrics && feature.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
              {feature.metrics.map((m, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <div className="text-base sm:text-lg font-black text-indigo-300">{m.value}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Sector Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Select Your Business Sector:</span>
              </label>
              <span className="text-xs text-indigo-400 font-semibold hidden sm:inline">
                Click any sector to see specific benefits ↓
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredSectors.map((sector) => {
                const isSelected = selectedSector === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span className="text-base flex-shrink-0">{sector.icon}</span>
                    <span className="truncate">{sector.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Sector Impact Card */}
          {activeImpact && (
            <div className="rounded-2xl glass-card border border-white/15 p-5 sm:p-6 space-y-5 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeImpact.sectorIcon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      How it Empowers: {activeImpact.sectorName}
                    </h3>
                    <p className="text-xs text-slate-400">Customized ROI &amp; practical application</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeImpact.roiBenefit}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pain Point */}
                <div className="p-4 rounded-xl bg-white/5 border border-rose-500/30 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                    <AlertCircle size={14} />
                    The Industry Challenge
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {activeImpact.painPoint}
                  </p>
                </div>

                {/* The Solution */}
                <div className="p-4 rounded-xl bg-white/5 border border-indigo-500/30 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    <Zap size={14} />
                    OneClickBiz Advantage
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200 font-medium">
                    {activeImpact.howItHelps}
                  </p>
                </div>
              </div>

              {/* Real World Scenario */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-sm space-y-1.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Real-World Day-to-Day Scenario
                </div>
                <p className="text-xs leading-relaxed text-slate-300 italic">
                  &ldquo;{activeImpact.realWorldScenario}&rdquo;
                </p>
              </div>

              {/* Mobile ROI Badge */}
              <div className="sm:hidden p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center">
                <span className="text-xs font-bold text-emerald-300">
                  🚀 Expected ROI: {activeImpact.roiBenefit}
                </span>
              </div>
            </div>
          )}

          {/* Key Capabilities Checklist */}
          {feature.keyCapabilities && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Capabilities Included:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {feature.keyCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Close Window
          </button>

          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs hover:opacity-95 transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95"
          >
            Get Started with this Feature <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
