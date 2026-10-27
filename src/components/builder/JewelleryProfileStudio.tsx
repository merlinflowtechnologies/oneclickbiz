'use client';

import React, { useState } from 'react';
import { 
  Gem, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  Award, 
  Check, 
  Tag,
  Percent,
  Video,
  ArrowRight
} from 'lucide-react';
import { DigitalProfile, JewelleryTrustConfig } from '@/lib/types';

interface JewelleryProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function JewelleryProfileStudio({ profile, setProfile }: JewelleryProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'rates' | 'hallmark'>('rates');

  const jewelleryConfig: JewelleryTrustConfig = profile.sectionData?.jewellery || {};

  const updateJewelleryConfig = (patch: Partial<JewelleryTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        jewellery: {
          ...(prev.sectionData?.jewellery || {}),
          ...patch
        }
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-yellow-950/60 to-slate-900 border border-yellow-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-yellow-500/20 shrink-0">
            <Gem className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Gold &amp; Diamond Jewellery Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                BIS 916 Hallmarked
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Configure your daily live gold/silver ticker, BIS 916 certification, video shopping desk, and lifetime exchange terms.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('rates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'rates'
              ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Daily Live Gold &amp; Silver Rates</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('hallmark')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'hallmark'
              ? 'bg-yellow-500 text-slate-950 shadow-md shadow-yellow-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>BIS Hallmark &amp; Lifetime Exchange</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: LIVE RATES TICKER                                  */}
      {/* ============================================================== */}
      {activeSubTab === 'rates' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-yellow-400" />
                <span>Today&apos;s Live Bullion Rates (Displayed on Top Ribbon)</span>
              </h3>
              <span className="text-[10px] font-bold text-yellow-400 bg-yellow-950/60 border border-yellow-800 px-2.5 py-0.5 rounded-full">
                Live Dynamic
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  22K Standard Gold Rate (Per Gram)
                </label>
                <input
                  type="text"
                  value={String(jewelleryConfig.goldRate22k ?? '₹7,450')}
                  placeholder="e.g. ₹7,450"
                  onChange={e => updateJewelleryConfig({ goldRate22k: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-yellow-300 font-bold focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  24K Pure Gold Rate (Per Gram)
                </label>
                <input
                  type="text"
                  value={String(jewelleryConfig.goldRate24k ?? '₹8,125')}
                  placeholder="e.g. ₹8,125"
                  onChange={e => updateJewelleryConfig({ goldRate24k: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-yellow-300 font-bold focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Silver Rate (Per 10 Grams)
                </label>
                <input
                  type="text"
                  value={String(jewelleryConfig.silverRate10g ?? '₹980')}
                  placeholder="e.g. ₹980"
                  onChange={e => updateJewelleryConfig({ silverRate10g: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 font-bold focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-slate-300">
                Rate Verification Status / Timestamp
              </label>
              <input
                type="text"
                value={jewelleryConfig.rateDate ?? 'Live Market Verified • Updated Today'}
                placeholder="e.g. Live Market Verified • Updated Today"
                onChange={e => updateJewelleryConfig({ rateDate: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: BIS HALLMARK & EXCHANGE                             */}
      {/* ============================================================== */}
      {activeSubTab === 'hallmark' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>BIS 916 Certification &amp; Buyback Commitments</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  BIS Hallmark License / Center Registration No.
                </label>
                <input
                  type="text"
                  value={jewelleryConfig.bisHallmarkId ?? 'BIS Hallmark Lic. No. 916-HM-748921'}
                  placeholder="e.g. BIS Hallmark Lic. No. 916-HM-748921"
                  onChange={e => updateJewelleryConfig({ bisHallmarkId: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-yellow-300 focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Video Call Shopping WhatsApp Hotline
                </label>
                <input
                  type="text"
                  value={jewelleryConfig.videoCallWhatsapp ?? profile.phone ?? '+91 98765 43210'}
                  placeholder="e.g. +91 98765 43210"
                  onChange={e => updateJewelleryConfig({ videoCallWhatsapp: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Making Charges Policy
                </label>
                <input
                  type="text"
                  value={jewelleryConfig.makingChargesPolicy ?? 'Starting from just 6% making charges with zero wastage on select sets'}
                  placeholder="e.g. Starting from 6% making charges"
                  onChange={e => updateJewelleryConfig({ makingChargesPolicy: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Lifetime Exchange &amp; Buyback Guarantee
                </label>
                <input
                  type="text"
                  value={jewelleryConfig.exchangeGuarantee ?? '100% Lifetime Exchange on Gold & 90% Buyback on Natural Diamonds'}
                  placeholder="e.g. 100% Lifetime Gold Exchange"
                  onChange={e => updateJewelleryConfig({ exchangeGuarantee: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
