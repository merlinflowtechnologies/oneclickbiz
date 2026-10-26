'use client';

import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Sparkles, 
  Tag, 
  Calendar, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Image as ImageIcon,
  Flame,
  Percent,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { DigitalProfile, RestaurantConfig, RestaurantComboDeal, RestaurantPromoCoupon } from '@/lib/types';
import { COMBO_DEALS, PROMO_COUPONS } from '@/components/templates/RestaurantTemplateView';

interface RestaurantProfileStudioProps {
  profile: DigitalProfile;
  setProfile: React.Dispatch<React.SetStateAction<DigitalProfile>>;
}

export default function RestaurantProfileStudio({ profile, setProfile }: RestaurantProfileStudioProps) {
  const [activeSubTab, setActiveSubTab] = useState<'operations' | 'combos' | 'coupons' | 'reservations'>('operations');

  // Existing or default restaurant config
  const restaurantConfig: RestaurantConfig = profile.sectionData?.restaurant || {};

  const activeCombos: RestaurantComboDeal[] = (restaurantConfig.comboDeals && restaurantConfig.comboDeals.length > 0)
    ? restaurantConfig.comboDeals
    : (restaurantConfig.combos && restaurantConfig.combos.length > 0)
    ? restaurantConfig.combos
    : COMBO_DEALS;

  const activeCoupons: RestaurantPromoCoupon[] = (restaurantConfig.coupons && restaurantConfig.coupons.length > 0)
    ? restaurantConfig.coupons
    : PROMO_COUPONS;

  // Helper to update restaurant sectionData
  const updateRestaurantConfig = (patch: Partial<RestaurantConfig>) => {
    setProfile(prev => ({
      ...prev,
      sectionData: {
        ...prev.sectionData,
        restaurant: {
          ...(prev.sectionData?.restaurant || {}),
          ...patch
        }
      }
    }));
  };

  // State for new combo inline creator
  const [newCombo, setNewCombo] = useState<Partial<RestaurantComboDeal>>({
    name: '',
    tag: '🔥 SPECIAL OFFER',
    badgeColor: 'bg-[#C1621F]',
    serves: 'Serves 2–3',
    originalPrice: 850,
    dealPrice: 599,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Chef special gourmet banquet platter.',
    itemsList: ['1x Signature Starter', '1x Royal Main Course', '2x Butter Naans', '1x Dessert'],
    isVeg: false
  });
  const [itemsString, setItemsString] = useState('1x Signature Starter, 1x Royal Main Course, 2x Butter Naans, 1x Dessert');
  const [showAddCombo, setShowAddCombo] = useState(false);

  // State for new coupon inline creator
  const [newCoupon, setNewCoupon] = useState<RestaurantPromoCoupon>({
    code: '',
    discount: 'Flat 15% OFF',
    description: 'Applicable on orders above ₹400',
    minOrder: 400
  });
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Studio Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-slate-900 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                Restaurant &amp; Cafe Dining Studio
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Live Niche Suite
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Customize your kitchen trust badges, banquet combos, promo coupons, table booking desk, and live food menu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-amber-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/30 font-semibold">
            {profile.sectionData?.products?.items?.length || 0} Menu Items • {activeCombos.length} Combos
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
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Operations &amp; FSSAI Trust</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('combos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'combos'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Curated Combo Feasts ({activeCombos.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('coupons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'coupons'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Promo Discount Coupons ({activeCoupons.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('reservations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
            activeSubTab === 'reservations'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Table Reservation Desk</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SUB-TAB 1: OPERATIONS & FSSAI TRUST                           */}
      {/* ============================================================== */}
      {activeSubTab === 'operations' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kitchen Accreditation &amp; Government FSSAI License</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-0.5 rounded-full">
                Active Standards
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  FSSAI License / Registration Number
                </label>
                <input
                  type="text"
                  value={restaurantConfig.fssaiNumber ?? '13624014000892'}
                  placeholder="e.g. 13624014000892"
                  onChange={e => updateRestaurantConfig({ fssaiNumber: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Shown in the website trust badges and digital dining footer.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Landmark &amp; Dining Area
                </label>
                <input
                  type="text"
                  value={restaurantConfig.landmark ?? 'Plot 42, Rooftop Lounge, Gachibowli, Hyderabad'}
                  placeholder="e.g. Opp. City Center Mall, Indiranagar"
                  onChange={e => updateRestaurantConfig({ landmark: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Displayed under hero contact desk and Google Maps link.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Cuisine Style &amp; Speciality
                </label>
                <input
                  type="text"
                  value={restaurantConfig.cuisineType ?? 'Awadhi & Mughlai Dum Biryani'}
                  placeholder="e.g. North Indian, Tandoor & Cafe"
                  onChange={e => updateRestaurantConfig({ cuisineType: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Kitchen &amp; Dining Timings
                </label>
                <input
                  type="text"
                  value={restaurantConfig.operatingHours ?? restaurantConfig.diningTimings ?? '11:30 AM – 11:30 PM (Daily)'}
                  placeholder="e.g. 11:30 AM – 11:30 PM"
                  onChange={e => updateRestaurantConfig({ 
                    operatingHours: e.target.value,
                    diningTimings: e.target.value 
                  })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Average Preparation Time
                </label>
                <input
                  type="text"
                  value={restaurantConfig.avgPrepTime ?? '15–20 Mins'}
                  placeholder="e.g. 15-20 Mins"
                  onChange={e => updateRestaurantConfig({ avgPrepTime: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300">
                  Dine-In Seating Capacity
                </label>
                <input
                  type="text"
                  value={restaurantConfig.seatingCapacity ?? '120 Pax (AC Family Hall & Open Rooftop)'}
                  placeholder="e.g. 120 Pax (AC & Rooftop)"
                  onChange={e => updateRestaurantConfig({ seatingCapacity: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Delivery Radius &amp; Direct Ordering
                </label>
                <input
                  type="text"
                  value={restaurantConfig.deliveryRadius ?? 'Up to 12 km Delivery via WhatsApp'}
                  placeholder="e.g. Up to 10 km Radius"
                  onChange={e => updateRestaurantConfig({ deliveryRadius: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Dietary &amp; Quality Highlights
                </label>
                <input
                  type="text"
                  value={restaurantConfig.dietaryHighlights ?? 'Pure Desi Ghee • 100% Halal • Fresh Ingredients'}
                  placeholder="e.g. Pure Desi Ghee • Halal / Jain"
                  onChange={e => updateRestaurantConfig({ dietaryHighlights: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 2: CURATED COMBO DEALS & BANQUET PACKAGES              */}
      {/* ============================================================== */}
      {activeSubTab === 'combos' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Curated Banquet Combos &amp; Dining Deals</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-course meal platters with custom savings badges. Diners can add these directly to their WhatsApp cart.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  updateRestaurantConfig({ comboDeals: COMBO_DEALS });
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                title="Reset to default handcrafted combos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Presets</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddCombo(!showAddCombo)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Combo</span>
              </button>
            </div>
          </div>

          {/* New Combo Inline Form */}
          {showAddCombo && (
            <div className="p-5 rounded-2xl bg-amber-950/20 border-2 border-amber-500/40 space-y-4 animate-fadeIn shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Create New Banquet Combo Offer
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddCombo(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300">Combo Title</label>
                  <input
                    type="text"
                    value={newCombo.name}
                    placeholder="e.g. 🍗 Weekend Biryani Feast for 2"
                    onChange={e => setNewCombo(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Tagline / Discount Ribbon</label>
                  <input
                    type="text"
                    value={newCombo.tag}
                    placeholder="e.g. 🔥 25% OFF • WEEKEND SPECIAL"
                    onChange={e => setNewCombo(prev => ({ ...prev, tag: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newCombo.originalPrice}
                    onChange={e => setNewCombo(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-amber-400">Offer Deal Price (₹)</label>
                  <input
                    type="number"
                    value={newCombo.dealPrice}
                    onChange={e => setNewCombo(prev => ({ ...prev, dealPrice: Number(e.target.value) }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/50 text-xs font-bold text-amber-300"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400">Portions / Serves</label>
                  <input
                    type="text"
                    value={newCombo.serves}
                    placeholder="e.g. Serves 2–3"
                    onChange={e => setNewCombo(prev => ({ ...prev, serves: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400">Dietary Classification</label>
                  <button
                    type="button"
                    onClick={() => setNewCombo(prev => ({ ...prev, isVeg: !prev.isVeg }))}
                    className={`mt-1 w-full px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      newCombo.isVeg
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/50'
                        : 'bg-rose-950/60 text-rose-400 border-rose-500/50'
                    }`}
                  >
                    {newCombo.isVeg ? '🌱 Pure Veg' : '🍗 Non-Veg'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Image URL</label>
                <input
                  type="text"
                  value={newCombo.imageUrl}
                  placeholder="https://..."
                  onChange={e => setNewCombo(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Included Dishes (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={itemsString}
                  placeholder="e.g. 1x Chicken Dum Biryani, 1x Paneer Tikka, 2x Naans, 2x Cold Drinks"
                  onChange={e => {
                    setItemsString(e.target.value);
                    setNewCombo(prev => ({
                      ...prev,
                      itemsList: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }));
                  }}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Brief Combo Description</label>
                <textarea
                  rows={2}
                  value={newCombo.description}
                  onChange={e => setNewCombo(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCombo(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!newCombo.name?.trim()) return;
                    const comboToAdd: RestaurantComboDeal = {
                      id: `deal_${Date.now()}`,
                      name: newCombo.name.trim(),
                      tag: newCombo.tag || '🔥 SPECIAL OFFER',
                      badgeColor: newCombo.isVeg ? 'bg-[#2E4D2A]' : 'bg-[#C1621F]',
                      serves: newCombo.serves || 'Serves 2',
                      originalPrice: Number(newCombo.originalPrice) || 800,
                      dealPrice: Number(newCombo.dealPrice) || 599,
                      savings: Math.max(0, (Number(newCombo.originalPrice) || 800) - (Number(newCombo.dealPrice) || 599)),
                      imageUrl: newCombo.imageUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                      description: newCombo.description || 'Special dining combo platter.',
                      itemsList: itemsString.split(',').map(s => s.trim()).filter(Boolean),
                      isVeg: Boolean(newCombo.isVeg)
                    };

                    const updatedCombos = [...activeCombos, comboToAdd];
                    updateRestaurantConfig({ comboDeals: updatedCombos });
                    setShowAddCombo(false);
                    setNewCombo({
                      name: '',
                      tag: '🔥 SPECIAL OFFER',
                      badgeColor: 'bg-[#C1621F]',
                      serves: 'Serves 2–3',
                      originalPrice: 850,
                      dealPrice: 599,
                      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                      description: 'Chef special gourmet banquet platter.',
                      itemsList: [],
                      isVeg: false
                    });
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                >
                  Save Combo Deal
                </button>
              </div>
            </div>
          )}

          {/* List of Active Combos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCombos.map((deal, idx) => (
              <div
                key={deal.id || idx}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all space-y-3 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={deal.imageUrl}
                      alt={deal.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-xs border flex items-center justify-center ${
                          deal.isVeg ? 'border-emerald-500' : 'border-rose-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${deal.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {deal.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black text-amber-400">
                          ₹{deal.dealPrice}
                        </span>
                        {deal.originalPrice > deal.dealPrice && (
                          <span className="text-[11px] text-slate-500 line-through">
                            ₹{deal.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/50 px-1.5 py-0.2 rounded">
                          Save ₹{deal.originalPrice - deal.dealPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = activeCombos.filter((_, i) => i !== idx);
                      updateRestaurantConfig({ comboDeals: updated });
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition"
                    title="Delete combo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {deal.description}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>👥 {deal.serves}</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                    {deal.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 3: PROMO COUPONS & DISCOUNT CODES                     */}
      {/* ============================================================== */}
      {activeSubTab === 'coupons' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span>Promo Vouchers &amp; Discount Codes</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Displayed as 1-tap copy pills right under your digital banquet section to increase orders.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  updateRestaurantConfig({ coupons: PROMO_COUPONS });
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                title="Reset to default coupons"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Presets</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddCoupon(!showAddCoupon)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Coupon</span>
              </button>
            </div>
          </div>

          {/* New Coupon Inline Form */}
          {showAddCoupon && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border-2 border-amber-500/40 space-y-4 animate-fadeIn shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-amber-300">Coupon Code</label>
                  <input
                    type="text"
                    value={newCoupon.code}
                    placeholder="e.g. FESTIVE25"
                    onChange={e => setNewCoupon(prev => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s/g, '') }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-black text-amber-300"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300">Discount Label</label>
                  <input
                    type="text"
                    value={newCoupon.discount}
                    placeholder="e.g. Flat 20% OFF"
                    onChange={e => setNewCoupon(prev => ({ ...prev, discount: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300">Minimum Order (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrder}
                    onChange={e => setNewCoupon(prev => ({ ...prev, minOrder: Number(e.target.value) }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (!newCoupon.code.trim()) return;
                      const updated = [...activeCoupons, newCoupon];
                      updateRestaurantConfig({ coupons: updated });
                      setShowAddCoupon(false);
                      setNewCoupon({
                        code: '',
                        discount: 'Flat 15% OFF',
                        description: 'Applicable on orders above ₹400',
                        minOrder: 400
                      });
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition"
                  >
                    Add Coupon
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300">Offer Description / Conditions</label>
                <input
                  type="text"
                  value={newCoupon.description}
                  placeholder="e.g. Valid on dining & takeaway above ₹500"
                  onChange={e => setNewCoupon(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Active Coupons List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activeCoupons.map((coupon, idx) => (
              <div
                key={coupon.code || idx}
                className="p-4 rounded-2xl bg-slate-900/90 border border-[#D8A63D]/30 flex flex-col justify-between space-y-3 hover:border-amber-500 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                      {coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = activeCoupons.filter((_, i) => i !== idx);
                        updateRestaurantConfig({ coupons: updated });
                      }}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2">
                    {coupon.discount}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-medium">
                  Min. Order: ₹{coupon.minOrder}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUB-TAB 4: TABLE RESERVATION DESK                             */}
      {/* ============================================================== */}
      {activeSubTab === 'reservations' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Table Reservation &amp; Party Booking Desk</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2.5 py-0.5 rounded-full">
                WhatsApp Desk Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Dedicated WhatsApp Number for Table Bookings</span>
                </label>
                <input
                  type="text"
                  value={restaurantConfig.reservationWhatsapp ?? profile.whatsapp ?? ''}
                  placeholder="e.g. 919876543210 (with country code)"
                  onChange={e => updateRestaurantConfig({ reservationWhatsapp: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Table reservation requests will be routed to this WhatsApp chat.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">
                  Table Hold / Cancellation Policy
                </label>
                <input
                  type="text"
                  value={restaurantConfig.reservationPolicy ?? 'Table will be held for 15 minutes post booking time.'}
                  placeholder="e.g. Table held for 15 mins"
                  onChange={e => updateRestaurantConfig({ reservationPolicy: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Default Dine-In Time Slots Available for Guests</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                • <strong>Lunch Shifts:</strong> 12:30 PM, 01:15 PM, 02:00 PM, 02:45 PM
                <br />
                • <strong>Dinner Shifts:</strong> 07:30 PM, 08:15 PM, 09:00 PM, 09:45 PM, 10:30 PM
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
