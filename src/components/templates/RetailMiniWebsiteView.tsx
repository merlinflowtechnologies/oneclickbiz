'use strict';
'use client';

import React, { useState } from 'react';
import { 
  DigitalProfile, 
  ProductItem, 
  ServiceItem, 
  GalleryItem, 
  TestimonialItem,
  VideoItem 
} from '@/lib/types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Share2, 
  Download, 
  ShoppingBag, 
  Store, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  Star, 
  Clock, 
  X, 
  Send, 
  Tag, 
  Truck, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Receipt,
  RotateCcw,
  Search
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface RetailMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
}

export default function RetailMiniWebsiteView({ profile, getEmbedUrl }: RetailMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'services' | 'trust' | 'reviews'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [orderFormData, setOrderFormData] = useState({
    name: '',
    phone: '',
    deliveryType: 'Same-Day Home Delivery',
    address: '',
    productName: '',
    quantity: '1',
    note: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Trust Config
  const retailTrust = profile.sectionData?.retail || profile.sectionData?.retailTrust || {};
  const storeType = retailTrust.storeType || '100% Genuine Authorized Dealer';
  const returnPolicy = retailTrust.returnExchangePolicy || '7-Day Easy Store Exchange';
  const deliveryRadius = retailTrust.deliveryRadius || 'Same-Day Express Local Delivery';
  const billingGst = retailTrust.billingGst || 'Official GST Invoice & Brand Warranty';
  const loyaltyPerks = retailTrust.loyaltyPerks || 'Instant Member Discounts & Points';

  const displayName = (profile as any).displayName || profile.company || profile.name || 'Retail Store';
  const displayLocation = (profile as any).location || profile.address || '';
  const avatarImage = profile.avatarUrl || (profile as any).logoUrl || '';

  // Products Catalog
  const rawProducts = profile.sectionData?.products?.items || [];
  const displayProducts: ProductItem[] = rawProducts.length > 0 ? rawProducts : [
    {
      id: 'ret-1',
      name: 'Flagship Premium Wireless Audio Headset',
      description: 'Active noise cancellation, 40-hour battery life, lossless spatial audio with official 1-year brand warranty card.',
      price: 4999,
      currency: '₹',
      category: 'Electronics & Audio',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    },
    {
      id: 'ret-2',
      name: 'Artisan Handcrafted Pure Silver Diya & Pooja Set',
      description: '92.5 hallmark certified sterling silver with anti-tarnish protective coating, luxury velvet gift presentation box.',
      price: 6499,
      currency: '₹',
      category: 'Silver & Festive Gifts',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    },
    {
      id: 'ret-3',
      name: 'Smart Hybrid Fitness Tracker & AMOLED Watch',
      description: 'Heart rate monitor, SpO2 sensor, 100+ sports tracking modes, waterproof stainless steel bezel & magnetic charger.',
      price: 2899,
      currency: '₹',
      category: 'Wearables',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    },
    {
      id: 'ret-4',
      name: 'Exclusive Festive Handloom Silk Saree Collection',
      description: 'Authentic zari borders, rich dual-tone weave, Silk Mark authorized certificate, comes with matching blouse piece.',
      price: 8999,
      currency: '₹',
      category: 'Apparel & Silks',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    }
  ];

  // Services Catalog (Store Offerings)
  const rawServices = profile.sectionData?.services?.items || [];
  const displayServices: ServiceItem[] = rawServices.length > 0 ? rawServices : [
    {
      id: 'rsvc-1',
      title: 'Same-Day Doorstep Express Delivery',
      description: 'Free doorstep delivery within city limits on orders above ₹999 with live tracking and doorstep card/UPI swipe option.',
      price: 0,
      currency: '₹',
      durationMinutes: 180,
      isAvailable: true
    },
    {
      id: 'rsvc-2',
      title: 'Live WhatsApp Video Shopping Tour',
      description: 'Browse in-store collections live on WhatsApp video call with a dedicated store executive assisting you in real time.',
      price: 0,
      currency: '₹',
      durationMinutes: 30,
      isAvailable: true
    },
    {
      id: 'rsvc-3',
      title: 'Luxury Gift Packaging & Customized Cards',
      description: 'Artisanal gift wrapping ribbons, seal stamps, and personalized greeting notes for birthdays, anniversaries, and corporate gifting.',
      price: 0,
      currency: '₹',
      durationMinutes: 15,
      isAvailable: true
    },
    {
      id: 'rsvc-4',
      title: 'Product Testing, Setup & Free Installation',
      description: 'Complete unboxing, firmware calibration, watch link adjustment, and device setup assistance by trained staff.',
      price: 0,
      currency: '₹',
      durationMinutes: 20,
      isAvailable: true
    }
  ];

  // Gallery (Storefront & Collections)
  const rawGallery = profile.sectionData?.gallery?.items || [];
  const displayGallery = rawGallery.map((g: any) => ({
    id: g.id,
    url: g.imageUrl || g.url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    caption: g.title || g.caption || 'Storefront & Inventory'
  }));

  // Testimonials
  const rawTestimonials = profile.sectionData?.testimonials?.items || [];
  const displayTestimonials = rawTestimonials.length > 0 ? rawTestimonials.map((t: any) => ({
    id: t.id,
    name: t.clientName || t.name || 'Regular Shopper',
    role: t.clientRole || t.role || 'Verified Customer',
    comment: t.content || t.comment || 'Authentic products with original brand warranty and GST invoice. Delivered to my doorstep within 2 hours!',
    rating: t.rating || 5
  })) : [
    {
      id: 't-1',
      name: 'Sunita Rao',
      role: 'Local Resident',
      comment: 'Did a video shopping call and selected my anniversary gift within 15 minutes. It was beautifully gift-wrapped and delivered right on time.',
      rating: 5
    },
    {
      id: 't-2',
      name: 'Vikramaditya S.',
      role: 'Tech Enthusiast',
      comment: 'The pricing beats major ecommerce portals and you get genuine manufacturer warranty with local peace of mind. Highly recommended store!',
      rating: 5
    }
  ];

  // Direct VCard download
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${displayName}
ORG:${profile.company || 'Retail & Local Storefront'}
TITLE:${profile.designation || 'Store Manager / Proprietor'}
TEL;TYPE=WORK,VOICE:${profile.phone || ''}
TEL;TYPE=CELL,VOICE:${profile.whatsapp || profile.phone || ''}
EMAIL;TYPE=PREF,INTERNET:${profile.email || ''}
URL:${profile.website || ''}
ADR;TYPE=WORK:;;${displayLocation};;;;
NOTE:${profile.bio || 'Authorized Retail Storefront & Genuine Products'}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.company || displayName).replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);

    const message = `🛍️ *NEW PRODUCT INQUIRY / STORE ORDER*
🏬 *Store:* ${profile.company || displayName}
👤 *Customer Name:* ${orderFormData.name}
📱 *Phone:* ${orderFormData.phone}
📦 *Product Name / SKU:* ${orderFormData.productName}
🔢 *Quantity:* ${orderFormData.quantity}
🚚 *Order Mode:* ${orderFormData.deliveryType}
📍 *Delivery Address:* ${orderFormData.address || 'In-Store Pickup'}
📝 *Special Instructions:* ${orderFormData.note || 'None'}

Inquired via OneClickBizz verified storefront portal.`;

    const cleanWa = (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsOrderModalOpen(false);
      setOrderSubmitted(false);
    }, 1200);
  };

  const openOrderModalForProduct = (prod: ProductItem) => {
    setSelectedProduct(prod);
    setOrderFormData(prev => ({
      ...prev,
      productName: prod.name
    }));
    setIsOrderModalOpen(true);
  };

  // Filtered products
  const filteredProducts = displayProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950 pb-28">
      
      {/* 1. TOP TICKER STRIP */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 py-2 text-xs md:text-sm font-semibold tracking-wide shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-bold">GENUINE RETAIL HUB: {storeType}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-xs font-semibold">
            <span>🚚 {deliveryRadius}</span>
            <span>•</span>
            <span>🧾 {billingGst}</span>
            <span>•</span>
            <span>🔄 {returnPolicy}</span>
          </div>
          {(profile.whatsapp || profile.phone) && (
            <a 
              href={`https://wa.me/${(profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I want to check today’s store offers.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 font-black underline hover:text-emerald-100 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ask On WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* 2. HERO / STORE PROFILE HEADER */}
      <div className="relative border-b border-zinc-800/80 bg-gradient-to-b from-[#131418] to-[#09090B] pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Top pill & share row */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Authorized Storefront • Direct Brand Stock</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700/60 transition-all hover:scale-105"
                title="Share Store Card"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadVCard}
                className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700/60 transition-all hover:scale-105"
                title="Save Store Contact"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Store Info Block */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Storefront Logo / Image */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-xl bg-zinc-900 flex items-center justify-center">
                {avatarImage ? (
                  <img 
                    src={avatarImage} 
                    alt={displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-900 to-zinc-900 flex items-center justify-center text-emerald-400">
                    <Store className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-zinc-950 p-1.5 rounded-full shadow-lg border-2 border-[#09090B]" title="Authorized Genuine Store">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            {/* Store Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {displayName}
                </h1>
              </div>

              <p className="text-emerald-400 font-semibold text-sm sm:text-base flex items-center gap-2 mb-2">
                <span>{profile.designation || 'Authorized Brand Showroom & Retail Counter'}</span>
              </p>

              {/* Location & Status Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-4">
                {displayLocation && (
                  <span className="flex items-center gap-1 text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{displayLocation}</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Open Today • 10:00 AM - 9:30 PM</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Star className="w-3.5 h-3.5 fill-emerald-400 shrink-0" />
                  <span>4.9 (420+ In-Store Reviews)</span>
                </span>
              </div>

              {/* Instant CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order / Inquire on WhatsApp</span>
                </button>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-sm rounded-xl border border-zinc-700/80 flex items-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call Store</span>
                  </a>
                )}

                {displayLocation && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(displayName + ' ' + displayLocation)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm rounded-xl border border-zinc-700/70 flex items-center gap-2 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>Get Directions</span>
                  </a>
                )}
              </div>

            </div>

          </div>

          {/* 3. FIVE-POINT RETAIL TRUST STRIP */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Authenticity</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-200">{storeType}</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Local Delivery</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-200">{deliveryRadius}</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Official Invoice</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-200">{billingGst}</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-zinc-400 uppercase font-semibold">Returns &amp; Swap</p>
                <p className="text-xs sm:text-sm font-bold text-zinc-200">{returnPolicy}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. NAVIGATION TABS */}
      <div className="sticky top-0 z-30 bg-[#09090B]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 flex items-center space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'products', label: `Store Products (${displayProducts.length})` },
            { id: 'services', label: `Customer Services (${displayServices.length})` },
            { id: 'trust', label: 'Store Authenticity' },
            { id: 'reviews', label: `Shopper Reviews (${displayTestimonials.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* ABOUT STORE */}
        {(activeTab === 'all' || activeTab === 'trust') && profile.bio && (
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-400" />
              <span>About Our Store &amp; Heritage</span>
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {profile.bio}
            </p>

            <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% Genuine brand sealed boxes with manufacturer warranty seal.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Transparent billing with registered GST tax invoice on every purchase.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{loyaltyPerks}.</span>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS CATALOG */}
        {(activeTab === 'all' || activeTab === 'products') && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Tag className="w-6 h-6 text-emerald-400" />
                  <span>Featured Products &amp; In-Store Stock</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Browse latest arrivals. Reserve online for doorstep delivery or store pickup.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products or category..."
                  className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 transition-all shadow-xl"
                >
                  {prod.imageUrl && (
                    <div className="h-52 w-full relative overflow-hidden bg-zinc-950">
                      <img 
                        src={prod.imageUrl} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prod.category && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-zinc-950/80 backdrop-blur-md rounded-md text-[10px] font-bold text-emerald-400 border border-zinc-700">
                          {prod.category}
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-emerald-950/90 text-emerald-300 text-[10px] font-extrabold rounded border border-emerald-500/40">
                        In Stock
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base mb-2 group-hover:text-emerald-400 transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Store Offer Price</span>
                        <span className="text-lg font-black text-emerald-400">
                          {typeof prod.price === 'number' ? `₹${prod.price.toLocaleString('en-IN')}` : prod.price}
                        </span>
                      </div>

                      <button
                        onClick={() => openOrderModalForProduct(prod)}
                        className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 font-black text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 text-sm">No items found matching "{searchQuery}".</p>
              </div>
            )}
          </div>
        )}

        {/* CUSTOMER SERVICES / AMENITIES */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <span>Complimentary Store Services &amp; Value-Adds</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Enjoy an unmatched retail shopping experience both online and in-store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayServices.map((svc) => (
                <div
                  key={svc.id}
                  className="bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-white text-base">
                        {svc.title}
                      </h3>
                      {svc.price !== undefined && (
                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-extrabold text-xs rounded-lg shrink-0">
                          {typeof svc.price === 'number' ? `₹${svc.price}` : svc.price}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{svc.durationMinutes ? `${svc.durationMinutes} Mins` : 'Available Today'}</span>
                    </span>

                    {(profile.whatsapp || profile.phone) && (
                      <a
                        href={`https://wa.me/${(profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'd like to avail the service: ${svc.title}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        <span>Request Service</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STORE TRUST & GUARANTEE PANEL */}
        {(activeTab === 'all' || activeTab === 'trust') && (
          <div className="bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-[#09090B] border border-emerald-900/40 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full mb-3">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>The Retail Authenticity Promise</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                Shop With 100% Peace of Mind
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                We believe in genuine products, direct manufacturer warranties, and lasting customer relationships. Say goodbye to counterfeit items or unauthorized refurbished goods.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl">
                  <p className="font-bold text-white mb-1">🏷️ Direct Manufacturer Sourcing</p>
                  <p className="text-zinc-400">All inventory arrives directly from authorized brand distributors with genuine barcode traceability.</p>
                </div>
                <div className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl">
                  <p className="font-bold text-white mb-1">💳 No-Cost EMI &amp; Card Offers</p>
                  <p className="text-zinc-400">Instant credit card EMI, debit card EMI, and zero-downpayment options available on qualifying bill values.</p>
                </div>
                <div className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl">
                  <p className="font-bold text-white mb-1">📦 Safe Insured Delivery</p>
                  <p className="text-zinc-400">Every local express dispatch is tamper-sealed and covered against transit damage until handed over.</p>
                </div>
                <div className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-xl">
                  <p className="font-bold text-white mb-1">🔄 {returnPolicy}</p>
                  <p className="text-zinc-400">Easy size swap or product exchange within policy window when accompanied by original receipt.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STOREFRONT & IN-STORE PHOTO GALLERY */}
        {displayGallery.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Store className="w-6 h-6 text-emerald-400" />
                <span>Storefront &amp; Showroom Visuals</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Take a look inside our retail showroom, product displays, and customer lounge.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {displayGallery.map((item: any, idx: number) => (
                <div 
                  key={item.id || idx}
                  className="group relative h-40 sm:h-48 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-md"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption || 'Storefront Image'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <p className="text-[11px] font-semibold text-zinc-200 line-clamp-1">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEWS */}
        {(activeTab === 'all' || activeTab === 'reviews') && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <span>Shopper Reviews &amp; Customer Feedback</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Real customer feedback from our regular neighborhood shoppers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTestimonials.map((t: any) => (
                <div
                  key={t.id}
                  className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-zinc-400 text-[11px]">{t.role}</p>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Shopper</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISIT STORE & LOCATION HUB */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Visit Our Retail Showroom</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                Come experience our products in person. Ample customer parking, trial counters, and experienced store executives ready to guide you.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                {displayLocation && (
                  <div className="flex items-start gap-3 text-zinc-300">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{displayLocation}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                    <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-3 text-zinc-300">
                    <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{profile.website}</a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800/80 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Store className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Looking for a Specific Model?</h4>
              <p className="text-xs text-zinc-400 mb-4 max-w-xs">
                Send us a picture or model number on WhatsApp and we will immediately verify live store stock and best pricing for you.
              </p>
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full max-w-xs py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Inquire Store Inventory
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 6. FIXED MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090B]/95 backdrop-blur-md border-t border-zinc-800 px-4 py-3 flex items-center justify-between sm:hidden shadow-2xl">
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-zinc-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 mr-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order on WhatsApp</span>
        </button>

        {profile.phone && (
          <a
            href={`tel:${profile.phone}`}
            className="p-2.5 bg-zinc-800 text-zinc-100 rounded-xl border border-zinc-700 mr-2 flex items-center justify-center"
            title="Call"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </a>
        )}

        {(profile.whatsapp || profile.phone) && (
          <a
            href={`https://wa.me/${(profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I want to check availability of a product.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-emerald-600/30 text-emerald-400 rounded-xl border border-emerald-500/40 flex items-center justify-center"
            title="WhatsApp"
          >
            <Send className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* 7. MODAL: ORDER / CHECK PRODUCT STOCK */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-zinc-950 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 font-black" />
                <h3 className="font-black text-base sm:text-lg">Order / Inquire Store Inventory</h3>
              </div>
              <button 
                onClick={() => setIsOrderModalOpen(false)}
                className="p-1 text-zinc-950 hover:bg-black/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Order Details Generated!</h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Redirecting to WhatsApp to send product inquiry directly to the store manager...
                </p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={orderFormData.name}
                    onChange={e => setOrderFormData({ ...orderFormData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={orderFormData.phone}
                      onChange={e => setOrderFormData({ ...orderFormData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Fulfillment Mode</label>
                    <select
                      value={orderFormData.deliveryType}
                      onChange={e => setOrderFormData({ ...orderFormData, deliveryType: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>Same-Day Home Delivery</option>
                      <option>Reserve for In-Store Pickup</option>
                      <option>WhatsApp Video Consultation First</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block font-semibold text-zinc-300 mb-1">Product Name / Item *</label>
                    <input
                      type="text"
                      required
                      value={orderFormData.productName}
                      onChange={e => setOrderFormData({ ...orderFormData, productName: e.target.value })}
                      placeholder="e.g. Wireless Headset or Saree"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={orderFormData.quantity}
                      onChange={e => setOrderFormData({ ...orderFormData, quantity: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {orderFormData.deliveryType === 'Same-Day Home Delivery' && (
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Delivery Address &amp; Landmark *</label>
                    <input
                      type="text"
                      required
                      value={orderFormData.address}
                      onChange={e => setOrderFormData({ ...orderFormData, address: e.target.value })}
                      placeholder="Flat, Building, Street, Pincode"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Color / Variant / Notes</label>
                  <textarea
                    rows={2}
                    value={orderFormData.note}
                    onChange={e => setOrderFormData({ ...orderFormData, note: e.target.value })}
                    placeholder="e.g. Midnight Black color preference, gift packing needed."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-zinc-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Order Inquiry on WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-zinc-500 text-center mt-2">
                    🔒 Official GST invoice and brand warranty provided on billing.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 8. SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

    </div>
  );
}
