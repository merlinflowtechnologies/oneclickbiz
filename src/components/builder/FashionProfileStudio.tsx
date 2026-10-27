'use client';

import React, { useState } from 'react';
import { 
  Shirt, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  Award, 
  Check, 
  Tag,
  Percent,
  Truck,
  Heart
} from 'lucide-react';
import { DigitalProfile, FashionTrustConfig } from '@/lib/types';

interface FashionProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function FashionProfileStudio({ profile, setProfile }: FashionProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'couture' | 'policies'>('couture');

  const fashionConfig: FashionTrustConfig = profile.sectionData?.fashion || {};

  const updateFashionConfig = (patch: Partial<FashionTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        fashion: {
          ...(prev.sectionData?.fashion || {}),
          ...patch
        }
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950 via-purple-950 to-slate-900 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-black shadow-lg shadow-rose-500/20 shrink-0">
            <Shirt className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Fashion Mall &amp; Designer Atelier Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Haute Couture
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Customize your designer credentials, fitting hours, worldwide shipping policies, and seasonal lookbook banners.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('couture')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'couture'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Designer Accreditations &amp; Specialization</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('policies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'policies'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping, Exchange &amp; VIP Perks</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: COUTURE ACCREDITATIONS                              */}
      {/* ============================================================== */}
      {activeSubTab === 'couture' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-rose-400" />
                <span>Designer Atelier Certifications</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Fashion Council / Guild Member
                </label>
                <input
                  type="text"
                  value={fashionConfig.certification ?? 'FDCI Registered Designer Atelier'}
                  placeholder="e.g. FDCI Registered Designer Atelier"
                  onChange={e => updateFashionConfig({ certification: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-rose-300 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Couture Specialization
                </label>
                <input
                  type="text"
                  value={fashionConfig.coutureSpecialization ?? 'Handcrafted Zardozi Lehengas & Sherwanis'}
                  placeholder="e.g. Bespoke Bridal Lehengas & Sherwanis"
                  onChange={e => updateFashionConfig({ coutureSpecialization: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Fitting &amp; Consultation Timings
                </label>
                <input
                  type="text"
                  value={fashionConfig.consultationTimings ?? '11:00 AM – 08:30 PM (Prior Appointment)'}
                  placeholder="e.g. 11:00 AM – 08:30 PM"
                  onChange={e => updateFashionConfig({ consultationTimings: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Seasonal Campaign Headline
                </label>
                <input
                  type="text"
                  value={(fashionConfig as any).seasonalBannerText ?? 'Royal Festive & Bridal Couture 2026 Collection'}
                  placeholder="e.g. Royal Festive Couture 2026"
                  onChange={e => updateFashionConfig({ seasonalBannerText: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: SHIPPING & POLICIES                                 */}
      {/* ============================================================== */}
      {activeSubTab === 'policies' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-400" />
                <span>Customer Shipping &amp; Exchange Commitments</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Shipping Coverage
                </label>
                <input
                  type="text"
                  value={fashionConfig.shippingCoverage ?? 'Worldwide Express (120+ Countries)'}
                  placeholder="e.g. Worldwide Express (120+ Countries)"
                  onChange={e => updateFashionConfig({ shippingCoverage: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Fit &amp; Alteration Guarantee
                </label>
                <input
                  type="text"
                  value={fashionConfig.exchangePolicy ?? 'Free Master Tailor Alteration for Life'}
                  placeholder="e.g. Free Lifetime Alterations"
                  onChange={e => updateFashionConfig({ exchangePolicy: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  VIP Club Member Discount
                </label>
                <input
                  type="text"
                  value={(fashionConfig as any).vipClubDiscount ?? 'Flat 15% OFF for Elite VIPs'}
                  placeholder="e.g. Flat 15% OFF for VIPs"
                  onChange={e => updateFashionConfig({ vipClubDiscount: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
