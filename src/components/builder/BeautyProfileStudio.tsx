'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  Crown,
  Scissors,
  Check, 
  Heart,
  Tag,
  Star,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { DigitalProfile, BeautyTrustConfig } from '@/lib/types';

interface BeautyProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function BeautyProfileStudio({ profile, setProfile }: BeautyProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'operations' | 'packages' | 'lookbook' | 'stylists'>('operations');

  const beautyConfig: BeautyTrustConfig = profile.sectionData?.beauty || {};

  const updateBeautyConfig = (patch: Partial<BeautyTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        beauty: {
          ...(prev.sectionData?.beauty || {}),
          ...patch
        }
      }
    }));
  };

  // State for new salon package
  const [newPackage, setNewPackage] = useState({
    title: '',
    category: 'Bridal & Groom',
    price: 3499,
    originalPrice: 4999,
    duration: '90 mins',
    badge: 'BRIDAL SPECIAL',
    subtitle: '7-step facial, skin prep & hair styling'
  });
  const [showAddPackage, setShowAddPackage] = useState(false);

  const customPackages = (beautyConfig as any).packages || [];

  const handleAddPackage = () => {
    if (!newPackage.title) return;
    const pkg = {
      id: `pkg_${Date.now()}`,
      ...newPackage
    };
    updateBeautyConfig({
      packages: [...customPackages, pkg]
    } as any);
    setNewPackage({
      title: '',
      category: 'Bridal & Groom',
      price: 3499,
      originalPrice: 4999,
      duration: '90 mins',
      badge: 'BRIDAL SPECIAL',
      subtitle: '7-step facial, skin prep & hair styling'
    });
    setShowAddPackage(false);
  };

  const handleDeletePackage = (id: string) => {
    updateBeautyConfig({
      packages: customPackages.filter((p: any) => p.id !== id)
    } as any);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-black shadow-lg shadow-rose-500/20 shrink-0">
            <Scissors className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Luxury Beauty &amp; Hair Salon Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Live Studio
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Customize your stylist certifications, hygiene protocols, bridal packages, and makeover lookbook.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-rose-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-rose-500/30 font-semibold">
            {profile.sectionData?.services?.items?.length || 0} Services • {customPackages.length} Custom Packages
          </span>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('operations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'operations'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Operations &amp; Hygiene Standards</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('packages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'packages'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>Bridal &amp; Spa Packages ({customPackages.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: OPERATIONS & HYGIENE STANDARDS                      */}
      {/* ============================================================== */}
      {activeSubTab === 'operations' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                <span>Stylist Accreditations &amp; Salon Certifications</span>
              </h3>
              <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2.5 py-0.5 rounded-full">
                Live Sync
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Stylist Certifications / Academy Affiliation
                </label>
                <input
                  type="text"
                  value={beautyConfig.stylistCertification ?? 'Trained by Toni & Guy, L’Oréal Academy & Vidal Sassoon'}
                  placeholder="e.g. Toni & Guy / L'Oréal Academy Certified"
                  onChange={e => updateBeautyConfig({ stylistCertification: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-rose-300 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Product Brands Used (Top Trust Badge)
                </label>
                <input
                  type="text"
                  value={beautyConfig.productBrandsUsed ?? 'L’Oréal Professionnel, Dyson, Kérastase & O3+'}
                  placeholder="e.g. L’Oréal, Dyson, Kérastase"
                  onChange={e => updateBeautyConfig({ productBrandsUsed: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Salon Operating Hours
                </label>
                <input
                  type="text"
                  value={beautyConfig.operatingHours ?? '9:30 AM – 9:00 PM (All 7 Days)'}
                  placeholder="e.g. 9:30 AM – 9:00 PM (All 7 Days)"
                  onChange={e => updateBeautyConfig({ operatingHours: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Salon Locality / Prime Landmark
                </label>
                <input
                  type="text"
                  value={(beautyConfig as any).locality ?? profile.address ?? 'Road No. 36, Jubilee Hills, Hyderabad'}
                  placeholder="e.g. Road No. 36, Jubilee Hills, Hyderabad"
                  onChange={e => updateBeautyConfig({ locality: e.target.value } as any)}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Hygiene Protocol Notice
                </label>
                <textarea
                  rows={2}
                  value={beautyConfig.hygieneProtocol ?? 'Strict 7-step hygiene protocol: single-use disposable aprons, sanitized scissors, autoclaved nail tools, and sterilized workstations.'}
                  placeholder="Describe your sanitization and single-use tools policy"
                  onChange={e => updateBeautyConfig({ hygieneProtocol: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Bridal &amp; Special Occasion Booking Policy
                </label>
                <textarea
                  rows={2}
                  value={beautyConfig.bridalSlotsNotice ?? 'Prior booking advised for bridal sessions. Complimentary hair trial and foundation shade match included.'}
                  placeholder="e.g. Prior booking advised for bridal sessions..."
                  onChange={e => updateBeautyConfig({ bridalSlotsNotice: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: BRIDAL & SPA PACKAGES                              */}
      {/* ============================================================== */}
      {activeSubTab === 'packages' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Curated Bridal &amp; Festive Packages</span>
              </h3>
              <p className="text-xs text-slate-400">
                Prominently displayed in your salon packages ribbon with 1-click WhatsApp booking.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddPackage(!showAddPackage)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-rose-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddPackage ? 'Cancel' : 'Add Package'}</span>
            </button>
          </div>

          {showAddPackage && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/40 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">New Bridal / Spa Package</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Package Title</label>
                  <input
                    type="text"
                    value={newPackage.title}
                    onChange={e => setNewPackage(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Royal HD Bridal Glow Package"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Category</label>
                  <select
                    value={newPackage.category}
                    onChange={e => setNewPackage(p => ({ ...p, category: e.target.value }))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="Bridal & Groom">Bridal &amp; Groom</option>
                    <option value="Hair Spa & Color">Hair Spa &amp; Color</option>
                    <option value="Skin Glow & Facial">Skin Glow &amp; Facial</option>
                    <option value="Head-to-Toe Combo">Head-to-Toe Combo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Deal Price (₹)</label>
                  <input
                    type="number"
                    value={newPackage.price}
                    onChange={e => setNewPackage(p => ({ ...p, price: Number(e.target.value) }))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newPackage.originalPrice}
                    onChange={e => setNewPackage(p => ({ ...p, originalPrice: Number(e.target.value) }))}
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={newPackage.duration}
                    onChange={e => setNewPackage(p => ({ ...p, duration: e.target.value }))}
                    placeholder="e.g. 90 mins"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Badge Text</label>
                  <input
                    type="text"
                    value={newPackage.badge}
                    onChange={e => setNewPackage(p => ({ ...p, badge: e.target.value }))}
                    placeholder="e.g. BRIDAL SPECIAL"
                    className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Services Included / Subtitle</label>
                <input
                  type="text"
                  value={newPackage.subtitle}
                  onChange={e => setNewPackage(p => ({ ...p, subtitle: e.target.value }))}
                  placeholder="e.g. Pre-bridal cleanup, 7-step facial, body spa & bridal hair styling"
                  className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleAddPackage}
                  disabled={!newPackage.title}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Package to Live Studio</span>
                </button>
              </div>
            </div>
          )}

          {/* List of custom packages */}
          <div className="space-y-3">
            {customPackages.map((pkg: any) => (
              <div
                key={pkg.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{pkg.title}</span>
                    {pkg.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{pkg.subtitle}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                    <span className="font-bold text-emerald-400">₹{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="line-through text-slate-500">₹{pkg.originalPrice}</span>
                    )}
                    <span className="text-slate-400">• {pkg.duration}</span>
                    <span className="text-slate-400">• {pkg.category}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                  title="Delete package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {customPackages.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-800">
                <Crown className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  No custom packages added yet. Click &quot;Add Package&quot; to showcase your signature salon and bridal packages.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
