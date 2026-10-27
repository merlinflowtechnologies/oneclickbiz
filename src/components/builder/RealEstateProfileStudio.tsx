'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Trash2, 
  Award,
  Check, 
  Compass,
  FileText,
  Phone,
  Eye,
  KeyRound
} from 'lucide-react';
import { DigitalProfile, RealEstateTrustConfig } from '@/lib/types';

interface RealEstateProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function RealEstateProfileStudio({ profile, setProfile }: RealEstateProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'rera' | 'trackRecord' | 'projects'>('rera');

  const realEstateConfig: RealEstateTrustConfig = profile.sectionData?.realEstate || {};

  const updateRealEstateConfig = (patch: Partial<RealEstateTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        realEstate: {
          ...(prev.sectionData?.realEstate || {}),
          ...patch
        }
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#0A192F] to-slate-900 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Real Estate Developer &amp; Builders Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                RERA Certified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Configure your RERA sanction ID, land development metrics, site visit advisory desk, and master floorplans.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-amber-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/30 font-semibold">
            {profile.sectionData?.products?.items?.length || 0} Ventures Live
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('rera')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'rera'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>RERA Sanction &amp; Legal Title</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('trackRecord')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'trackRecord'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Track Record &amp; Acreage Metrics</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: RERA SANCTION & LEGAL TITLE                         */}
      {/* ============================================================== */}
      {activeSubTab === 'rera' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>RERA Registration &amp; Prime Development Corridor</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  RERA Sanction / Registration ID
                </label>
                <input
                  type="text"
                  value={realEstateConfig.reraId ?? 'TS-RERA/P02400008921'}
                  placeholder="e.g. TS-RERA/P02400008921"
                  onChange={e => updateRealEstateConfig({ reraId: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Primary Development Corridor &amp; City
                </label>
                <input
                  type="text"
                  value={realEstateConfig.city ?? 'Hyderabad • Future City Corridor'}
                  placeholder="e.g. Hyderabad • Kokapet Financial District"
                  onChange={e => updateRealEstateConfig({ city: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Clear Title Rating / Guarantee
                </label>
                <input
                  type="text"
                  value={realEstateConfig.clearTitleRating ?? '100% Clear Title Guarantee & Spot Registration'}
                  placeholder="e.g. 100% Clear Title Guarantee"
                  onChange={e => updateRealEstateConfig({ clearTitleRating: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  VIP Chauffeur / Site Visit Booking Phone
                </label>
                <input
                  type="text"
                  value={(realEstateConfig as any).siteVisitPhone ?? profile.phone ?? '+91 98765 43210'}
                  placeholder="e.g. +91 98765 43210"
                  onChange={e => updateRealEstateConfig({ siteVisitPhone: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: TRACK RECORD & METRICS                              */}
      {/* ============================================================== */}
      {activeSubTab === 'trackRecord' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Developer Track Record &amp; Delivery Stats</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={String(realEstateConfig.trackRecordYears ?? '18+ Years')}
                  placeholder="e.g. 18+ Years"
                  onChange={e => updateRealEstateConfig({ trackRecordYears: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Developed Acreage
                </label>
                <input
                  type="text"
                  value={String(realEstateConfig.developedAcres ?? '250+ Acres')}
                  placeholder="e.g. 250+ Acres"
                  onChange={e => updateRealEstateConfig({ developedAcres: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Delivered Projects
                </label>
                <input
                  type="text"
                  value={String(realEstateConfig.deliveredProjects ?? '24+ Completed')}
                  placeholder="e.g. 24+ Completed"
                  onChange={e => updateRealEstateConfig({ deliveredProjects: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Happy Families
                </label>
                <input
                  type="text"
                  value={String(realEstateConfig.happyFamilies ?? '12,500+')}
                  placeholder="e.g. 12,500+"
                  onChange={e => updateRealEstateConfig({ happyFamilies: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
