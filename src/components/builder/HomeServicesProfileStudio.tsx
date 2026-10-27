'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Trash2, 
  Phone,
  Check, 
  Award,
  Zap,
  Tag,
  CheckCircle2,
  Users
} from 'lucide-react';
import { DigitalProfile, HomeServicesTrustConfig } from '@/lib/types';

interface HomeServicesProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function HomeServicesProfileStudio({ profile, setProfile }: HomeServicesProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'dispatch' | 'ratecard'>('dispatch');

  const homeServicesConfig: HomeServicesTrustConfig = profile.sectionData?.homeServices || {};

  const updateHomeServicesConfig = (patch: Partial<HomeServicesTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        homeServices: {
          ...(prev.sectionData?.homeServices || {}),
          ...patch
        }
      }
    }));
  };

  const customRateCard = (homeServicesConfig as any).rateCard || [];

  const [newRateItem, setNewRateItem] = useState({
    service: '',
    price: '₹299',
    unit: 'Per Point / Repair',
    turnaround: '45 mins'
  });
  const [showAddRate, setShowAddRate] = useState(false);

  const handleAddRate = () => {
    if (!newRateItem.service) return;
    const item = {
      id: `rc_${Date.now()}`,
      ...newRateItem
    };
    updateHomeServicesConfig({
      rateCard: [...customRateCard, item]
    } as any);
    setNewRateItem({
      service: '',
      price: '₹299',
      unit: 'Per Point / Repair',
      turnaround: '45 mins'
    });
    setShowAddRate(false);
  };

  const handleDeleteRate = (id: string) => {
    updateHomeServicesConfig({
      rateCard: customRateCard.filter((r: any) => r.id !== id)
    } as any);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-yellow-950/40 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Wrench className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Electrician &amp; Home Services Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Govt Licensed
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Manage your trade license, emergency 60-min response dispatch, verified technicians, and fixed rate card.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-amber-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/30 font-semibold">
            {customRateCard.length} Fixed Rate Cards
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('dispatch')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'dispatch'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Dispatch, Warranty &amp; License</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('ratecard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'ratecard'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Fixed Rate Card ({customRateCard.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: DISPATCH & WARRANTY                                 */}
      {/* ============================================================== */}
      {activeSubTab === 'dispatch' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Trade License, Warranty &amp; Dispatch Standards</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Govt Trade License / Supervisor Wireman ID
                </label>
                <input
                  type="text"
                  value={(homeServicesConfig as any).licenseNumber ?? 'Govt Lic: ELEC/TEL/2021/4891'}
                  placeholder="e.g. Govt Lic: ELEC/TEL/2021/4891"
                  onChange={e => updateHomeServicesConfig({ licenseNumber: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Service Warranty Guarantee
                </label>
                <input
                  type="text"
                  value={homeServicesConfig.serviceWarrantyDays ?? '90 Days Service Warranty'}
                  placeholder="e.g. 90 Days Service Warranty"
                  onChange={e => updateHomeServicesConfig({ serviceWarrantyDays: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Verified Technicians
                </label>
                <input
                  type="text"
                  value={homeServicesConfig.verifiedTechniciansCount ?? '45+ Background-Checked'}
                  placeholder="e.g. 45+ Verified Techs"
                  onChange={e => updateHomeServicesConfig({ verifiedTechniciansCount: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Doorstep Response Time
                </label>
                <input
                  type="text"
                  value={homeServicesConfig.responseTime ?? '60-Min Doorstep Arrival'}
                  placeholder="e.g. 60-Min Arrival"
                  onChange={e => updateHomeServicesConfig({ responseTime: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  24/7 Emergency Dispatch Hotline
                </label>
                <input
                  type="text"
                  value={(homeServicesConfig as any).emergencyPhone ?? profile.phone ?? '+91 98765 43210'}
                  placeholder="e.g. +91 98765 43210"
                  onChange={e => updateHomeServicesConfig({ emergencyPhone: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: FIXED RATE CARD                                    */}
      {/* ============================================================== */}
      {activeSubTab === 'ratecard' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Transparent Fixed Rate Card</span>
              </h3>
              <p className="text-xs text-slate-400">
                Helps customers book standard electrical and appliance repairs instantly with zero fear of overcharging.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddRate(!showAddRate)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddRate ? 'Cancel' : 'Add Rate Card'}</span>
            </button>
          </div>

          {showAddRate && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">New Fixed Rate Item</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Service Name</label>
                  <input
                    type="text"
                    value={newRateItem.service}
                    onChange={e => setNewRateItem(r => ({ ...r, service: e.target.value }))}
                    placeholder="e.g. Ceiling Fan Installation / Rewiring"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Fixed Price</label>
                  <input
                    type="text"
                    value={newRateItem.price}
                    onChange={e => setNewRateItem(r => ({ ...r, price: e.target.value }))}
                    placeholder="e.g. ₹299"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Unit / Basis</label>
                  <input
                    type="text"
                    value={newRateItem.unit}
                    onChange={e => setNewRateItem(r => ({ ...r, unit: e.target.value }))}
                    placeholder="e.g. Per Appliance / Per Point"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Est. Turnaround</label>
                  <input
                    type="text"
                    value={newRateItem.turnaround}
                    onChange={e => setNewRateItem(r => ({ ...r, turnaround: e.target.value }))}
                    placeholder="e.g. 45 mins"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleAddRate}
                  disabled={!newRateItem.service}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save to Rate Card</span>
                </button>
              </div>
            </div>
          )}

          {/* List of custom rate cards */}
          <div className="space-y-3">
            {customRateCard.map((rc: any) => (
              <div
                key={rc.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-bold text-white text-sm">{rc.service}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                    <span className="text-emerald-400 font-bold">{rc.price}</span>
                    <span className="text-slate-400">• {rc.unit}</span>
                    <span className="text-slate-400">• {rc.turnaround}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteRate(rc.id)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {customRateCard.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800">
                <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  Standard electrical rate card is active. Click &quot;Add Rate Card&quot; to customize your own pricing and repair services.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
