'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Truck, 
  QrCode, 
  Layers, 
  Smartphone,
  Plus,
  ArrowRight
} from 'lucide-react';
import { INITIAL_NFC_CARDS, INITIAL_PROFILES } from '@/lib/data-store';
import { NfcCardItem } from '@/lib/types';
import WalletPassPreview from '@/components/cards/WalletPassPreview';

export default function NfcHardwarePage() {
  const [cards, setCards] = useState<NfcCardItem[]>(INITIAL_NFC_CARDS);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [engravedName, setEngravedName] = useState('Kishore Patel');
  const [engravedRole, setEngravedRole] = useState('Creative Director');
  const [shippingAddress, setShippingAddress] = useState('Indiranagar 100ft Road, Bangalore - 560038');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: NfcCardItem = {
      id: `nfc_${Date.now()}`,
      cardCode: `NFC-APX-${Math.floor(100 + Math.random() * 900)}`,
      profileSlug: 'alex',
      serialNumber: `SN-2026-NFC-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'ACTIVE',
      tapCount: 0,
      fulfillmentStatus: 'ORDERED',
      createdAt: new Date().toISOString()
    };
    setCards(prev => [newCard, ...prev]);
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setIsOrderModalOpen(false);
    }, 2500);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold mb-1">
            <CreditCard className="w-3 h-3" /> NFC Hardware Hub
          </div>
          <h1 className="text-2xl font-bold text-white">NFC Smart Business Cards</h1>
          <p className="text-xs text-slate-400">Manage physical contactless cards and track real-time tap engagement.</p>
        </div>

        <button 
          onClick={() => setIsOrderModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Order Custom NFC Cards
        </button>
      </div>

      {/* Active NFC Cards List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Your Linked Physical Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(c => (
            <div key={c.id} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
              
              {/* Virtual Card Graphic */}
              <div className="h-44 w-full rounded-2xl bg-gradient-to-tr from-zinc-950 via-zinc-900 to-slate-800 border border-zinc-700 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white tracking-widest uppercase">OneClickBiz SMART</span>
                  </div>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">{engravedName}</h3>
                  <p className="text-[11px] text-amber-400 font-semibold">{engravedRole}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{c.serialNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{c.status}</span>
                </div>
              </div>

              {/* Card Metadata & Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-base font-extrabold text-white">{c.tapCount}</p>
                  <p className="text-[10px] text-slate-400">Total Taps</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-xs font-bold text-indigo-400 font-mono">/nfc/{c.cardCode}</p>
                  <p className="text-[10px] text-slate-400">Target Router</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-xs font-bold text-emerald-400">{c.fulfillmentStatus}</p>
                  <p className="text-[10px] text-slate-400">Shipping Status</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Digital Apple & Google Wallet Pass Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Digital Apple & Google Wallet Passes</span>
            </h2>
            <p className="text-xs text-slate-400">Cardholders can double-click their iPhone or Android lock screen to present their digital pass.</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
          <WalletPassPreview profile={INITIAL_PROFILES[0]} />
        </div>
      </div>

      {/* Order NFC Card Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                Order Custom Laser-Engraved NFC Cards
              </h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {orderPlaced ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-white">NFC Card Order Placed!</h4>
                <p className="text-xs text-slate-400">Your custom card has been added to production queue.</p>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400">Name to Laser-Engrave on Card</label>
                  <input 
                    type="text" 
                    required 
                    value={engravedName} 
                    onChange={e => setEngravedName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400">Job Title / Designation</label>
                  <input 
                    type="text" 
                    required 
                    value={engravedRole} 
                    onChange={e => setEngravedRole(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Quantity</label>
                    <input 
                      type="number" 
                      min="1"
                      max="50"
                      value={orderQuantity} 
                      onChange={e => setOrderQuantity(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Finish Type</label>
                    <select className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white">
                      <option value="matte-black">Matte Black Metallic</option>
                      <option value="frost-white">Frost White Pearl</option>
                      <option value="bamboo-wood">Eco Bamboo Wood</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400">Delivery Address</label>
                  <textarea 
                    rows={2}
                    required 
                    value={shippingAddress} 
                    onChange={e => setShippingAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total (₹1,499 x {orderQuantity}):</span>
                  <span className="font-extrabold text-amber-400 text-sm">₹{1499 * orderQuantity}</span>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  Confirm & Dispatch Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
