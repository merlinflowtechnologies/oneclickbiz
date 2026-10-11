'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  QrCode,
  Download,
  ShoppingBag,
  Scissors,
  Layers,
  Heart,
  Plus,
  Minus,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface FashionMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (actionName: string) => void;
  getCleanWhatsAppNumber?: (prof: DigitalProfile) => string;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'website' | 'mobile';
  setViewMode?: (mode: 'website' | 'mobile') => void;
  showViewToggle?: boolean;
}

export default function FashionMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: FashionMiniWebsiteViewProps) {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number; imageUrl: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    occasion: 'Bridal Wedding',
    date: new Date().toISOString().split('T')[0],
    preferredTime: 'Afternoon (02:00 PM - 05:00 PM)',
    consultType: 'In-Store Atelier Visit'
  });

  const fashionData = (profile.sectionData as any)?.fashion || {};
  const designerTitle = fashionData.title || profile.designation || 'Master Couturier & Creative Director';
  const atelierLocation = fashionData.location || profile.address || 'Flagship Designer Studio, Jubilee Hills';
  const certification = fashionData.certification || '100% Pure Silk Mark & Authentic Handloom Certified';
  const shippingInfo = fashionData.shipping || 'Worldwide Express Doorstep Shipping via DHL';

  const cleanPhone = (profile.phone || '').replace(/\D/g, '');
  const cleanWa = (getCleanWhatsAppNumber(profile) || cleanPhone).replace(/\D/g, '');

  const defaultOutfits = [
    {
      id: 'f1',
      name: 'Royal Crimson Zardozi Bridal Lehenga',
      category: 'Bridal',
      fabric: 'Pure Raw Silk with Hand Zari & Dabka Embroidery',
      price: 145000,
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'f2',
      name: 'Kanchipuram Pure Gold Tissue Saree',
      category: 'Sarees',
      fabric: 'Authentic 6-Ply Mulberry Silk with Pure Silver Zari',
      price: 85000,
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'f3',
      name: 'Emerald Velvet Anarkali & Organza Dupatta',
      category: 'Indo-Western',
      fabric: 'Micro Velvet with Hand-cut Gota Patti Accents',
      price: 42000,
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'f4',
      name: 'Pastel Blush Embroidered Reception Gown',
      category: 'Couture',
      fabric: 'French Tulle with Swarovski Crystal Embellishments',
      price: 98000,
      imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const outfits = profile.sectionData?.products?.items?.length
    ? profile.sectionData.products.items.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category || 'Collection',
        fabric: item.description || 'Premium Fabric & Custom Tailoring',
        price: item.price || 15000,
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
      }))
    : defaultOutfits;

  const filteredOutfits = selectedCategory === 'all'
    ? outfits
    : outfits.filter(o => o.category.toLowerCase() === selectedCategory.toLowerCase());

  const addToCart = (outfit: typeof defaultOutfits[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === outfit.id);
      if (existing) {
        return prev.map(i => i.id === outfit.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: outfit.id, name: outfit.name, price: outfit.price, quantity: 1, imageUrl: outfit.imageUrl }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as any);
  };

  const totalCartValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    trackAction('checkout_whatsapp_fashion');
    const orderLines = cart.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${(i.price * i.quantity).toLocaleString('en-IN')}`).join('\n');
    const msg = `*NEW BOUTIQUE OUTFIT INQUIRY* 👗✨\n\n` +
      `*Boutique:* ${profile.company || profile.name}\n` +
      `*Selected Pieces:*\n${orderLines}\n\n` +
      `*Total Estimated Value:* ₹${totalCartValue.toLocaleString('en-IN')}\n\n` +
      `Please check custom size availability, delivery timeline, and share payment details.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsCartOpen(false);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('bridal_consultation_submit');

    const msg = `*BRIDAL & BESPOKE TAILORING APPOINTMENT* 🪡\n\n` +
      `*Client Name:* ${consultForm.name}\n` +
      `*Phone Number:* ${consultForm.phone}\n` +
      `*Occasion / Event:* ${consultForm.occasion}\n` +
      `*Date:* ${consultForm.date}\n` +
      `*Preferred Slot:* ${consultForm.preferredTime}\n` +
      `*Consultation Type:* ${consultForm.consultType}\n\n` +
      `Please confirm designer appointment slot.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsConsultModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF9F6] text-slate-800 font-sans selection:bg-[#B76E79] selection:text-white">
      
      {/* 1. TOP COUTURE TRUST STRIP */}
      <div className="bg-[#2D1B22] text-[#F3E5E8] px-4 sm:px-8 py-2 text-xs border-b border-[#3D2630] shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E0A899] animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-widest text-[#E0A899] text-[11px] sm:text-xs">
              {certification}
            </span>
            <span className="hidden md:inline text-white/60 text-[11px]">
              &bull; {shippingInfo}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="text-[#F3E5E8] hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Atelier QR</span>
            </button>
            <button
              onClick={() => downloadVcfFile(profile)}
              className="text-[#F3E5E8] hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY ATELIER HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8D7D9] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#B76E79] bg-[#FFF0F2] shadow-sm">
                <img
                  src={profile.avatarUrl || '/placeholder-fashion.jpg'}
                  alt={profile.company || profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#B76E79] border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-lg font-black text-[#2D1B22] leading-tight font-serif">
                  {profile.company || profile.name}
                </h1>
                <ShieldCheck className="w-4 h-4 text-[#B76E79] shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-[#7A5B64] font-medium truncate max-w-[200px] sm:max-w-md">
                {profile.name} &bull; {designerTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showViewToggle && setViewMode && (
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#FBF0F2] border border-[#E8D7D9] text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'website' ? 'bg-[#2D1B22] text-white shadow-xs' : 'text-[#7A5B64]'
                  }`}
                >
                  💻 Boutique Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'mobile' ? 'bg-[#2D1B22] text-white shadow-xs' : 'text-[#7A5B64]'
                  }`}
                >
                  📱 Fashion Card
                </button>
              </div>
            )}

            {cart.length > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#FFF0F2] hover:bg-[#FFE3E7] border border-[#E8D7D9] text-[#B76E79] font-bold text-xs flex items-center gap-1.5 transition cursor-pointer relative"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="w-5 h-5 rounded-full bg-[#B76E79] text-white text-[10px] flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#8E4B55] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#B76E79]/30 transition active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Scissors className="w-4 h-4" />
              <span>Book Bridal Fitting</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO COUTURE BANNER */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-[#FFF2F4] via-[#FFF9F6] to-[#FFF9F6] border-b border-[#E8D7D9] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F2] border border-[#E8D7D9] text-[#B76E79] text-xs font-black shadow-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Haute Couture &amp; Handloom Atelier</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2D1B22] font-serif tracking-tight leading-tight">
            Handcrafted Heirloom Silks &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#B76E79] via-[#C97A86] to-[#8E4B55] bg-clip-text text-transparent">
              Bespoke Bridal Elegance.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#684E55] max-w-2xl mx-auto leading-relaxed">
            {profile.bio || `Each creation is a tribute to India's timeless weaving legacy — masterfully designed by ${profile.name} with pure Zari, bespoke silhouettes, and intricate hand embroidery for your most unforgettable milestones.`}
          </p>

          {/* SQUIRCLE ROW */}
          <div className="pt-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 w-max sm:w-auto mx-auto px-2">
              
              {/* Call Atelier */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#2D1B22] text-[#F3E5E8] flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">Call Atelier</span>
              </a>

              {/* WhatsApp Shopping Desk */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.company || profile.name}, I am inquiring from your boutique website.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition group-hover:scale-105">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">WhatsApp</span>
              </a>

              {/* Book Fitting */}
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#B76E79] text-white flex items-center justify-center shadow-lg shadow-[#B76E79]/30 transition group-hover:scale-105">
                  <Scissors className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">Book Fitting</span>
              </button>

              {/* Studio Map */}
              {profile.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#4A353C] text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">Studio Map</span>
                </a>
              )}

              {/* Save Designer vCard */}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">Save vCard</span>
              </button>

              {/* Share */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-purple-700 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#2D1B22] uppercase tracking-wider">Share</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 4. SEASONAL LOOKBOOK & OUTFITS GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#FFF0F2] text-[#B76E79] text-xs font-black uppercase tracking-wider">
              Signature Collection
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#2D1B22] font-serif mt-2">
              Haute Couture Lookbook
            </h3>
            <p className="text-xs sm:text-sm text-[#7A5B64] mt-1">
              Select any piece to order via WhatsApp direct or book an atelier trial.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['all', 'Bridal', 'Sarees', 'Indo-Western', 'Couture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2D1B22] text-white shadow-md'
                    : 'bg-white text-[#7A5B64] hover:bg-[#FFF0F2] border border-[#E8D7D9]'
                }`}
              >
                {cat === 'all' ? 'All Collections' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white rounded-3xl border border-[#E8D7D9] overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-72 sm:h-80 w-full bg-[#FFF0F2] overflow-hidden">
                  <img
                    src={outfit.imageUrl}
                    alt={outfit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#2D1B22] uppercase">
                    {outfit.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-base font-black text-[#2D1B22] font-serif group-hover:text-[#B76E79] transition leading-snug">
                    {outfit.name}
                  </h4>
                  <p className="text-xs text-[#7A5B64] leading-relaxed line-clamp-2">
                    {outfit.fabric}
                  </p>
                  <p className="text-lg font-extrabold text-[#B76E79] font-serif pt-1">
                    ₹ {outfit.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => addToCart(outfit)}
                  className="w-full py-2.5 rounded-xl bg-[#2D1B22] hover:bg-[#4A353C] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E0A899]" />
                  <span>Add to WhatsApp Bag</span>
                </button>

                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.company || profile.name}, I want to order the "${outfit.name}" (Price: ₹${outfit.price.toLocaleString('en-IN')}). Please share custom size options and delivery details.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-[#FFF0F2] hover:bg-[#FFE3E7] text-[#B76E79] font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Order Directly</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SLIDE-OUT WHATSAPP SHOPPING CART MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[88vh] flex flex-col border border-[#E8D7D9] text-[#2D1B22]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B76E79]" />
                <h4 className="font-bold text-sm font-serif">Your Boutique Selection</h4>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">Your bag is currently empty.</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F6] border border-[#E8D7D9]">
                    <div className="flex items-center gap-2.5">
                      <img src={item.imageUrl} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />
                      <div>
                        <h5 className="text-xs font-bold text-[#2D1B22] line-clamp-1">{item.name}</h5>
                        <p className="text-[11px] text-[#B76E79] font-bold">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-xs">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-md bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-xs">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Estimated Total:</span>
                  <span className="text-base font-extrabold text-[#B76E79] font-serif">₹ {totalCartValue.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Inquiry via WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. BOOK BRIDAL FITTING MODAL */}
      {isConsultModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsConsultModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-[#2D1B22] relative border border-[#E8D7D9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D7D9]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F2] text-[#B76E79] flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black font-serif">Book Designer Fitting Session</h4>
                  <p className="text-xs text-[#7A5B64]">Bespoke bridal consultation &amp; custom sizing</p>
                </div>
              </div>
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConsultSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#2D1B22] block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  placeholder="e.g. Ananya Sen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22] focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D1B22] block mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22] focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2D1B22] block mb-1">Occasion / Event</label>
                  <select
                    value={consultForm.occasion}
                    onChange={(e) => setConsultForm({ ...consultForm, occasion: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22]"
                  >
                    <option value="Bridal Wedding">Bridal Wedding</option>
                    <option value="Sangeet / Mehendi">Sangeet / Mehendi</option>
                    <option value="Reception Gown">Reception Gown</option>
                    <option value="Festival Silk Saree">Festival Silk Saree</option>
                    <option value="Custom Bespoke Suit">Custom Bespoke Suit</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D1B22] block mb-1">Consultation Type</label>
                  <select
                    value={consultForm.consultType}
                    onChange={(e) => setConsultForm({ ...consultForm, consultType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22]"
                  >
                    <option value="In-Store Atelier Visit">In-Store Atelier Visit</option>
                    <option value="Video Call Consultation">Video Call Consultation</option>
                    <option value="Doorstep Swatch Trial">Doorstep Swatch Trial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#2D1B22] block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={consultForm.date}
                    onChange={(e) => setConsultForm({ ...consultForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#2D1B22] block mb-1">Preferred Slot</label>
                  <select
                    value={consultForm.preferredTime}
                    onChange={(e) => setConsultForm({ ...consultForm, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E8D7D9] bg-[#FFF9F6] text-xs text-[#2D1B22]"
                  >
                    <option value="Morning (11:00 AM - 02:00 PM)">Morning (11 AM - 2 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (2 PM - 5 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B76E79] to-[#8E4B55] hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B76E79]/30 transition cursor-pointer"
              >
                <Scissors className="w-4 h-4" />
                <span>Confirm Fitting Session on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. ATELIER QR MODAL */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-[#E8D7D9]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#B76E79] flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-[#2D1B22] font-serif">Boutique Atelier QR Code</h4>
            <div className="w-52 h-52 mx-auto rounded-2xl bg-[#FFF9F6] p-3 border-2 border-[#E8D7D9] flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : `https://oneclickbiz.in/v/${profile.slug}`)}`}
                alt="Boutique QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-[#7A5B64]">
              Scan with any smartphone camera to open the lookbook &amp; WhatsApp shopping catalog.
            </p>
          </div>
        </div>
      )}

      {/* 8. SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal profile={profile} onClose={() => setIsShareModalOpen(false)} />
      )}

    </div>
  );
}
