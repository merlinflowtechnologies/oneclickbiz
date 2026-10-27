'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Clock, 
  Building2, 
  Phone, 
  FileCheck, 
  Plus, 
  Trash2, 
  Check, 
  Umbrella, 
  Percent, 
  HeartPulse 
} from 'lucide-react';
import { DigitalProfile, InsuranceTrustConfig, ProductItem } from '@/lib/types';

interface InsuranceProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function InsuranceProfileStudio({ profile, setProfile }: InsuranceProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'license' | 'claims' | 'policies'>('license');

  const insuranceConfig: InsuranceTrustConfig = profile.sectionData?.insurance || {};

  const updateInsuranceConfig = (patch: Partial<InsuranceTrustConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        insurance: {
          ...(prev.sectionData?.insurance || {}),
          ...patch
        }
      }
    }));
  };

  // Insurance products list in profile.sectionData.products.items
  const rawProducts: ProductItem[] = profile.sectionData?.products?.items || [];

  const [newPolicy, setNewPolicy] = useState({
    name: '',
    category: 'Health Insurance',
    sumInsured: '₹1 Crore',
    price: 999,
    description: 'Zero co-pay, 100% cashless hospitalization, restore benefit, pre & post hospital cover.'
  });
  const [showAddPolicy, setShowAddPolicy] = useState(false);

  const handleAddPolicy = () => {
    if (!newPolicy.name) return;
    const item: ProductItem = {
      id: `ins_${Date.now()}`,
      name: `${newPolicy.name} (${newPolicy.sumInsured})`,
      description: newPolicy.description,
      price: Number(newPolicy.price) || 0,
      currency: '₹',
      category: newPolicy.category,
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
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

    setNewPolicy({
      name: '',
      category: 'Health Insurance',
      sumInsured: '₹1 Crore',
      price: 999,
      description: 'Zero co-pay, 100% cashless hospitalization, restore benefit, pre & post hospital cover.'
    });
    setShowAddPolicy(false);
  };

  const handleDeletePolicy = (id: string) => {
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
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Insurance Advisor Studio
                </span>
                <span className="text-xs text-blue-200">Live Real-Time Sync</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {profile.name || 'Insurance Advisor'} Regulatory Credentials
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('license')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'license'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          IRDAI License &amp; CSR %
        </button>

        <button
          onClick={() => setActiveSubTab('claims')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'claims'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Phone className="w-4 h-4" />
          Claim Assistance Desk
        </button>

        <button
          onClick={() => setActiveSubTab('policies')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
            activeSubTab === 'policies'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Umbrella className="w-4 h-4" />
          Insurance Plans ({rawProducts.length})
        </button>
      </div>

      {/* Tab 1: IRDAI License & CSR % */}
      {activeSubTab === 'license' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                IRDAI License / ARN Registration Number
              </label>
              <input
                type="text"
                placeholder="e.g. IRDAI/AGN/2012/849102"
                value={insuranceConfig.irdaiNumber || insuranceConfig.irdaiLicence || ''}
                onChange={(e) => updateInsuranceConfig({ irdaiNumber: e.target.value, irdaiLicence: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Shown in legal compliance badge and header verification card.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Claim Settlement Ratio (CSR %)
              </label>
              <input
                type="text"
                placeholder="e.g. 99.4% Highest Industry Settlement"
                value={insuranceConfig.claimSettlementRatio || ''}
                onChange={(e) => updateInsuranceConfig({ claimSettlementRatio: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cashless Hospitals Network
              </label>
              <input
                type="text"
                placeholder="e.g. 14,500+ Cashless Network Hospitals"
                value={insuranceConfig.cashlessHospitalsCount || insuranceConfig.cashlessHospitals || ''}
                onChange={(e) => updateInsuranceConfig({ cashlessHospitalsCount: e.target.value, cashlessHospitals: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Claims Settled (Value or Count)
              </label>
              <input
                type="text"
                placeholder="e.g. ₹14.8 Cr+ Settled (1,400+ Claims)"
                value={insuranceConfig.totalClaimsSettled || ''}
                onChange={(e) => updateInsuranceConfig({ totalClaimsSettled: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Advisory Experience &amp; Designation
              </label>
              <input
                type="text"
                placeholder="e.g. 12+ Years Experience | MDRT (Million Dollar Round Table) Life Member"
                value={insuranceConfig.experienceYears || ''}
                onChange={(e) => updateInsuranceConfig({ experienceYears: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Claim Assistance Desk */}
      {activeSubTab === 'claims' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                24/7 Emergency Claim Support Phone
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={insuranceConfig.emergencyClaimPhone || ''}
                onChange={(e) => updateInsuranceConfig({ emergencyClaimPhone: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Families Protected Count
              </label>
              <input
                type="text"
                placeholder="e.g. 3,500+ Families Protected"
                value={insuranceConfig.familiesProtected || ''}
                onChange={(e) => updateInsuranceConfig({ familiesProtected: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Operating City / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai &amp; Pan-India Digital Advisory"
                value={insuranceConfig.primaryCity || ''}
                onChange={(e) => updateInsuranceConfig({ primaryCity: e.target.value })}
                className="w-full text-xs px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Insurance Plans */}
      {activeSubTab === 'policies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800">
              Active Insurance Plans &amp; Quotations
            </h4>
            <button
              onClick={() => setShowAddPolicy(!showAddPolicy)}
              className="px-3 py-1.5 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-800 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Plan
            </button>
          </div>

          {showAddPolicy && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-800">Add New Insurance Product</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Plan Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Comprehensive Family Floater Health Cover"
                    value={newPolicy.name}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Sum Insured / Cover</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1 Crore / ₹25 Lakhs"
                    value={newPolicy.sumInsured}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, sumInsured: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimated Monthly Premium (₹)</label>
                  <input
                    type="number"
                    placeholder="999"
                    value={newPolicy.price}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Health Insurance, Term Life, Motor, Child Plan"
                    value={newPolicy.category}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Key Benefits / Highlights</label>
                  <input
                    type="text"
                    placeholder="e.g. Zero co-pay, 100% cashless hospitalization, restore benefit, pre & post hospital cover"
                    value={newPolicy.description}
                    onChange={(e) => setNewPolicy(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full text-xs px-3 py-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddPolicy(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPolicy}
                  className="px-4 py-1.5 text-xs font-bold bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                >
                  Save Plan
                </button>
              </div>
            </div>
          )}

          {rawProducts.length === 0 ? (
            <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-xs">
              Showing default standard insurance tiers. Click &quot;Add Plan&quot; to configure custom plans.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rawProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-start justify-between shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                        {p.category || 'Insurance'}
                      </span>
                      <span className="text-xs font-extrabold text-blue-900">₹{p.price?.toLocaleString()}/mo</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">{p.name}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePolicy(p.id)}
                    className="p-1 text-slate-400 hover:text-red-500 transition ml-2 shrink-0"
                    title="Delete Policy"
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
