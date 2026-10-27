'use client';

import React, { useState } from 'react';
import { 
  PartyPopper, 
  Sparkles, 
  Clock, 
  MapPin, 
  Award, 
  Camera, 
  Video, 
  Plus, 
  Trash2, 
  Check, 
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { DigitalProfile, EventsTrustConfig } from '@/lib/types';

interface EventsProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function EventsProfileStudio({ profile, setProfile }: EventsProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'production' | 'packages'>('profile');

  const eventsConfig: EventsTrustConfig = profile.sectionData?.events || {};

  const updateEventsConfig = (patch: Partial<EventsTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        events: {
          ...(prev.sectionData?.events || {}),
          ...patch
        }
      }
    }));
  };

  const customPackages = (eventsConfig as any).packages || [];

  const [newPackage, setNewPackage] = useState({
    title: '',
    category: 'Wedding & Reception',
    hours: 'Full Day (8 Hrs)',
    startingPrice: '₹45,000',
    features: '2 Candid + 1 Traditional + 4K Drone'
  });
  const [showAddPackage, setShowAddPackage] = useState(false);

  const handleAddPackage = () => {
    if (!newPackage.title) return;
    const item = {
      id: `pkg_${Date.now()}`,
      ...newPackage
    };
    updateEventsConfig({
      packages: [...customPackages, item]
    } as any);
    setNewPackage({
      title: '',
      category: 'Wedding & Reception',
      hours: 'Full Day (8 Hrs)',
      startingPrice: '₹45,000',
      features: '2 Candid + 1 Traditional + 4K Drone'
    });
    setShowAddPackage(false);
  };

  const handleDeletePackage = (id: string) => {
    updateEventsConfig({
      packages: customPackages.filter((p: any) => p.id !== id)
    } as any);
  };

  return (
    <div className="space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-purple-900 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-200 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  Events &amp; Photography Studio
                </span>
                <span className="text-xs text-rose-200">Live Real-Time Sync</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {profile.company || profile.name || 'Event Management'} Showcase
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'profile'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          Specialization &amp; Track Record
        </button>

        <button
          onClick={() => setActiveSubTab('production')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'production'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Video className="w-4 h-4" />
          Production &amp; Locations
        </button>

        <button
          onClick={() => setActiveSubTab('packages')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'packages'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Custom Packages ({customPackages.length})
        </button>
      </div>

      {/* Tab 1: Specialization & Track Record */}
      {activeSubTab === 'profile' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Event Specialization / Style
              </label>
              <input
                type="text"
                placeholder="e.g. Luxury Weddings &amp; Candid Cinema"
                value={eventsConfig.eventSpecialization || ''}
                onChange={(e) => updateEventsConfig({ eventSpecialization: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Displayed beneath your brand name in header and hero badge.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Events Executed
              </label>
              <input
                type="text"
                placeholder="e.g. 1,200+ Events Captured"
                value={eventsConfig.eventsExecuted || ''}
                onChange={(e) => updateEventsConfig({ eventsExecuted: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Years in Industry
              </label>
              <input
                type="text"
                placeholder="e.g. 10+ Years of Visual Storytelling"
                value={eventsConfig.experienceYears || ''}
                onChange={(e) => updateEventsConfig({ experienceYears: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Direct Booking Hotline
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={(eventsConfig as any).bookingHotline || ''}
                onChange={(e) => updateEventsConfig({ bookingHotline: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Production & Locations */}
      {activeSubTab === 'production' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Production Gear &amp; Capability
              </label>
              <input
                type="text"
                placeholder="e.g. Sony FX3 Cinema Cameras, DJI Mavic 3 Cine Drones &amp; Ronin Gimbals"
                value={eventsConfig.productionCapability || ''}
                onChange={(e) => updateEventsConfig({ productionCapability: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Operational Service Cities / Locations
              </label>
              <input
                type="text"
                placeholder="e.g. Hyderabad, Bangalore, Goa, Udaipur, Chennai"
                value={eventsConfig.serviceLocations || ''}
                onChange={(e) => updateEventsConfig({ serviceLocations: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Timeline &amp; Cloud Drive Guarantee
              </label>
              <input
                type="text"
                placeholder="e.g. 48-Hour Highlight Teaser + Full 4K Cloud Drive Access in 7 Days"
                value={(eventsConfig as any).deliveryTimeline || ''}
                onChange={(e) => updateEventsConfig({ deliveryTimeline: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Custom Packages */}
      {activeSubTab === 'packages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">
              Custom Photography &amp; Event Packages
            </h4>
            <button
              onClick={() => setShowAddPackage(!showAddPackage)}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-rose-700 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Package
            </button>
          </div>

          {showAddPackage && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800">Configure Event Package</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Package Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Destination Wedding Cinematic Film"
                    value={newPackage.title}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Occasion / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Wedding, Birthday, Corporate"
                    value={newPackage.category}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Coverage Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Days / Full Day (8-10 Hrs)"
                    value={newPackage.hours}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, hours: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Starting Price</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹65,000"
                    value={newPackage.startingPrice}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, startingPrice: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Included Deliverables</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Candid Cinematographers + Traditional Video + Drone + Premium Album"
                    value={newPackage.features}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, features: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddPackage(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPackage}
                  className="px-4 py-1.5 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  Save Package
                </button>
              </div>
            </div>
          )}

          {customPackages.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
              No custom event packages configured yet. Click &quot;Add Package&quot; to showcase your tiers.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customPackages.map((pkg: any) => (
                <div
                  key={pkg.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-pink-50 text-pink-700 px-2 py-0.5 rounded">
                        {pkg.category}
                      </span>
                      <span className="text-xs font-extrabold text-rose-600">{pkg.startingPrice}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">{pkg.title}</h5>
                    <p className="text-[11px] text-slate-500">⏱️ {pkg.hours}</p>
                    {pkg.features && (
                      <p className="text-[11px] text-emerald-600 font-medium">✨ {pkg.features}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition"
                    title="Delete Package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
