'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award, 
  Check, 
  Plus, 
  Trash2,
  Compass,
  Home,
  Layers
} from 'lucide-react';
import { DigitalProfile, InteriorTrustConfig } from '@/lib/types';

interface InteriorProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function InteriorProfileStudio({ profile, setProfile }: InteriorProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'guarantees' | 'metrics'>('guarantees');

  const interiorConfig: InteriorTrustConfig = profile.sectionData?.interior || {};

  const updateInteriorConfig = (patch: Partial<InteriorTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        interior: {
          ...(prev.sectionData?.interior || {}),
          ...patch
        }
      }
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-amber-950/40 to-slate-900 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Compass className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Interior Designer &amp; Modular Kitchens Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                IIID Verified
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Customize your design warranties, turnkey handover days, completed spaces counter, and experience centers.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('guarantees')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'guarantees'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>IIID Accreditation &amp; Turnkey Guarantees</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('metrics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'metrics'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Execution Track Record &amp; Metrics</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: IIID ACCREDITATION & TURNKEY GUARANTEES             */}
      {/* ============================================================== */}
      {activeSubTab === 'guarantees' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>IIID Member ID &amp; Turnkey Execution Promises</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  IIID / Council Registration ID
                </label>
                <input
                  type="text"
                  value={interiorConfig.iiidId ?? 'IIID/HYD/2019/849'}
                  placeholder="e.g. IIID/HYD/2019/849"
                  onChange={e => updateInteriorConfig({ iiidId: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Material &amp; Hardware Flat Warranty
                </label>
                <input
                  type="text"
                  value={interiorConfig.warrantyYears ?? '10-Year Flat Warranty'}
                  placeholder="e.g. 10-Year Flat Warranty"
                  onChange={e => updateInteriorConfig({ warrantyYears: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Turnkey Handover Guarantee
                </label>
                <input
                  type="text"
                  value={interiorConfig.turnkeyGuaranteeDays ?? '45-Day Move-In Guarantee'}
                  placeholder="e.g. 45-Day Move-In Guarantee"
                  onChange={e => updateInteriorConfig({ turnkeyGuaranteeDays: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Experience Center Location
                </label>
                <input
                  type="text"
                  value={interiorConfig.experienceCenter ?? 'Road No. 36, Jubilee Hills, Hyderabad'}
                  placeholder="e.g. Road No. 36, Jubilee Hills, Hyderabad"
                  onChange={e => updateInteriorConfig({ experienceCenter: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: METRICS & TRACK RECORD                              */}
      {/* ============================================================== */}
      {activeSubTab === 'metrics' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Interior Design Execution Stats</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Homes Completed
                </label>
                <input
                  type="text"
                  value={interiorConfig.completedHomes ?? '450+ Luxury Homes'}
                  placeholder="e.g. 450+ Luxury Homes"
                  onChange={e => updateInteriorConfig({ completedHomes: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Sq.Ft. Transformed
                </label>
                <input
                  type="text"
                  value={interiorConfig.sqftTransformed ?? '1.2M+ Sq.Ft.'}
                  placeholder="e.g. 1.2M+ Sq.Ft."
                  onChange={e => updateInteriorConfig({ sqftTransformed: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  On-Time Handover Rate
                </label>
                <input
                  type="text"
                  value={interiorConfig.happyClients ?? '98% On-Time Delivery'}
                  placeholder="e.g. 98% On-Time Delivery"
                  onChange={e => updateInteriorConfig({ happyClients: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
