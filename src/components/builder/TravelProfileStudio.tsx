'use client';

import React, { useState } from 'react';
import { 
  Plane, 
  Compass, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  ShieldCheck, 
  Phone, 
  Plus, 
  Trash2, 
  Check, 
  Luggage,
  Hotel,
  Palmtree
} from 'lucide-react';
import { DigitalProfile, TravelTrustConfig, ProductItem } from '@/lib/types';

interface TravelProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function TravelProfileStudio({ profile, setProfile }: TravelProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'agency' | 'concierge' | 'itineraries'>('agency');

  const travelConfig: TravelTrustConfig = profile.sectionData?.travel || {};

  const updateTravelConfig = (patch: Partial<TravelTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        travel: {
          ...(prev.sectionData?.travel || {}),
          ...patch
        }
      }
    }));
  };

  // Packages list in profile.sectionData.products.items
  const rawPackages: ProductItem[] = profile.sectionData?.products?.items || [];

  const [newPackage, setNewPackage] = useState({
    name: '',
    category: 'International Luxury',
    duration: '5D/4N',
    price: 35000,
    description: 'Luxury hotel stays, airport transfers, curated sightseeing tours, and daily breakfast.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  });
  const [showAddPackage, setShowAddPackage] = useState(false);

  const handleAddPackage = () => {
    if (!newPackage.name) return;
    const item: ProductItem = {
      id: `trv_${Date.now()}`,
      name: `${newPackage.name} (${newPackage.duration})`,
      description: newPackage.description,
      price: Number(newPackage.price) || 0,
      currency: '₹',
      category: newPackage.category,
      imageUrl: newPackage.imageUrl,
      isAvailable: true
    };

    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        products: {
          items: [...(prev.sectionData?.products?.items || []), item]
        }
      }
    }));

    setNewPackage({
      name: '',
      category: 'International Luxury',
      duration: '5D/4N',
      price: 35000,
      description: 'Luxury hotel stays, airport transfers, curated sightseeing tours, and daily breakfast.',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    });
    setShowAddPackage(false);
  };

  const handleDeletePackage = (id: string) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        products: {
          items: (prev.sectionData?.products?.items || []).filter(p => p.id !== id)
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-teal-800 to-emerald-900 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                  Tours &amp; Travel Studio
                </span>
                <span className="text-xs text-emerald-200">Live Real-Time Sync</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {profile.company || profile.name || 'Travel Agency'} Itineraries &amp; Accreditations
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('agency')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'agency'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          Accreditation &amp; Trust
        </button>

        <button
          onClick={() => setActiveSubTab('concierge')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'concierge'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Concierge &amp; Visa Hotline
        </button>

        <button
          onClick={() => setActiveSubTab('itineraries')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'itineraries'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Luggage className="w-4 h-4" />
          Holiday Itineraries ({rawPackages.length})
        </button>
      </div>

      {/* Tab 1: Accreditation & Trust */}
      {activeSubTab === 'agency' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Agency Registration / Accreditation
              </label>
              <input
                type="text"
                placeholder="e.g. IATA Accredited &amp; Ministry of Tourism Recognized"
                value={travelConfig.agencyRegistration || ''}
                onChange={(e) => updateTravelConfig({ agencyRegistration: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Prominently displayed in trust badges and hero guarantee ribbon.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Destinations Covered
              </label>
              <input
                type="text"
                placeholder="e.g. 75+ Domestic &amp; Global Gateways"
                value={travelConfig.destinationsCovered || ''}
                onChange={(e) => updateTravelConfig({ destinationsCovered: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Happy Travelers Count
              </label>
              <input
                type="text"
                placeholder="e.g. 25,000+ Happy Explorers"
                value={travelConfig.happyTravelers || ''}
                onChange={(e) => updateTravelConfig({ happyTravelers: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Itinerary Customization Policy
              </label>
              <input
                type="text"
                placeholder="e.g. 100% Tailored Private Itineraries"
                value={travelConfig.customizationPolicy || ''}
                onChange={(e) => updateTravelConfig({ customizationPolicy: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Concierge & Visa Hotline */}
      {activeSubTab === 'concierge' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Support &amp; Ground Concierge Hours
              </label>
              <input
                type="text"
                placeholder="e.g. 24/7 Dedicated Ground Concierge"
                value={travelConfig.supportHours || ''}
                onChange={(e) => updateTravelConfig({ supportHours: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Visa &amp; Flight Booking Hotline
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={(travelConfig as any).visaHotline || ''}
                onChange={(e) => updateTravelConfig({ visaHotline: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Head Office / Departure Hub
              </label>
              <input
                type="text"
                placeholder="e.g. Banjara Hills, Hyderabad • Departures from HYD, BLR, BOM, DEL"
                value={(travelConfig as any).departureHubs || ''}
                onChange={(e) => updateTravelConfig({ departureHubs: e.target.value } as any)}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Holiday Itineraries */}
      {activeSubTab === 'itineraries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">
              Active Holiday Packages &amp; Tours
            </h4>
            <button
              onClick={() => setShowAddPackage(!showAddPackage)}
              className="px-3 py-1.5 bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-teal-800 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Package
            </button>
          </div>

          {showAddPackage && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800">Add New Tour Package</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Destination / Package Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Switzerland Scenic Alps Explorer"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 6D/5N"
                    value={newPackage.duration}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Price per person (₹)</label>
                  <input
                    type="number"
                    placeholder="45000"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Theme / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. International Honeymoon"
                    value={newPackage.category}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Short Description &amp; Highlights</label>
                  <input
                    type="text"
                    placeholder="e.g. 4-star hotel stays, Glacier Express train pass, private transfers &amp; daily breakfast"
                    value={newPackage.description}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
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
                  className="px-4 py-1.5 text-xs font-bold bg-teal-700 text-white rounded-lg hover:bg-teal-800"
                >
                  Save Itinerary
                </button>
              </div>
            </div>
          )}

          {rawPackages.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
              Showing default curated itineraries. Click &quot;Add Package&quot; to customize your own tours.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rawPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-teal-50 text-teal-700 px-2 py-0.5 rounded">
                        {pkg.category || 'Tour'}
                      </span>
                      <span className="text-xs font-extrabold text-teal-700">₹{pkg.price?.toLocaleString()}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">{pkg.name}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{pkg.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition ml-2 shrink-0"
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
