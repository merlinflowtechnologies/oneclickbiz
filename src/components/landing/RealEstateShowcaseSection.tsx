'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, 
  Home, 
  MapPin, 
  Building, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Sparkles,
  Phone,
  MessageCircle,
  Download,
  Share2,
  Compass,
  Layers,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface RealEstateCardItem {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  categoryColor: string; // Background of the circular category badge
  categoryBgGlow: string;
  bezelBorder: string; // Outer phone bezel color
  bezelShadow: string;
  templateSlug: string;
  title: string;
  brandName: string;
  brandSub: string;
  heroImage: string;
  heroTagline: string;
  reraOrType: string;
  phonePreviewType: 'apartment' | 'villa' | 'plotting' | 'building';
  priceBadge: string;
}

const SHOWCASE_CARDS: RealEstateCardItem[] = [
  {
    id: 'apartment',
    category: 'APARTMENT',
    categoryIcon: Building2,
    categoryColor: 'bg-[#f97316]',
    categoryBgGlow: 'shadow-orange-500/20',
    bezelBorder: 'border-[#c2410c]', // Copper / Terracotta orange
    bezelShadow: 'shadow-[0_20px_50px_rgba(194,65,12,0.25)]',
    templateSlug: 're-builders',
    title: 'High-Rise Sky Condos',
    brandName: 'SKYLINE TOWERS',
    brandSub: 'MILLENNIAL RESIDENCES',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    heroTagline: 'Live The Millennial High Life • 2 & 3 BHK',
    reraOrType: 'TS-RERA/P02400008920',
    phonePreviewType: 'apartment',
    priceBadge: '₹1.25 Cr*'
  },
  {
    id: 'villa',
    category: 'VILLA',
    categoryIcon: Home,
    categoryColor: 'bg-[#16a34a]',
    categoryBgGlow: 'shadow-emerald-500/20',
    bezelBorder: 'border-[#1e3a8a]', // Deep Ocean Blue
    bezelShadow: 'shadow-[0_20px_50px_rgba(30,58,138,0.25)]',
    templateSlug: 're-villas',
    title: 'Gated Triplex Villas',
    brandName: 'GREENVILLE ESTATES',
    brandSub: 'SIGNATURE LIVING',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    heroTagline: 'A Vacation Lifestyle With Greece-Themed Architecture',
    reraOrType: '4 & 5 BHK Triplex Villas',
    phonePreviewType: 'villa',
    priceBadge: '₹2.75 Cr*'
  },
  {
    id: 'plotting',
    category: 'PLOTTING',
    categoryIcon: MapPin,
    categoryColor: 'bg-[#2563eb]',
    categoryBgGlow: 'shadow-blue-500/20',
    bezelBorder: 'border-[#831843]', // Deep Plum / Wine
    bezelShadow: 'shadow-[0_20px_50px_rgba(131,24,67,0.25)]',
    templateSlug: 're-plots',
    title: 'HMDA & DTCP Plots',
    brandName: 'HK NATURE FARMS',
    brandSub: 'OPEN PLOTS & COUNTY',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    heroTagline: 'INVEST TODAY, ENJOY TOMORROW! READY FOR REGISTRATION',
    reraOrType: '100% Vastu Compliant Plots',
    phonePreviewType: 'plotting',
    priceBadge: '₹18,500/Sq.Yd*'
  },
  {
    id: 'building',
    category: 'BUILDING',
    categoryIcon: Building,
    categoryColor: 'bg-[#7c3aed]',
    categoryBgGlow: 'shadow-purple-500/20',
    bezelBorder: 'border-[#1e293b]', // Dark Graphite / Titanium
    bezelShadow: 'shadow-[0_20px_50px_rgba(30,41,59,0.28)]',
    templateSlug: 're-consultants',
    title: 'Commercial Landmark',
    brandName: 'KAUSTUBH TOWERS',
    brandSub: 'COMMERCIAL REALTY',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    heroTagline: 'The New Landmark Residential & Commercial Tower',
    reraOrType: 'Grade-A Commercial Suites',
    phonePreviewType: 'building',
    priceBadge: 'From 2,500 Sq.Ft'
  }
];

export default function RealEstateShowcaseSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden border-b border-slate-100">
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-r from-orange-100/40 via-pink-100/30 to-purple-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#f97316] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
            <span>SPECIALIZED REAL ESTATE ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-[#0B0F19] leading-[1.12]">
            Made for <span className="text-[#f97316]">Every</span>{' '}
            <span className="bg-gradient-to-r from-[#f97316] via-[#ec4899] to-[#db2777] bg-clip-text text-transparent">
              Real Estate
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            From high-rise sky apartments and Greek-style luxury villas to HMDA open plots and landmark commercial towers — provide buyers with an ultra-luxury digital experience that generates verified WhatsApp site visits.
          </p>
        </div>

        {/* 4 Cards Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 items-start">
          {SHOWCASE_CARDS.map((card) => {
            const IconComponent = card.categoryIcon;
            
            return (
              <div key={card.id} className="flex flex-col items-center">
                
                {/* 1. Category Icon Badge & Label */}
                <div className="flex flex-col items-center mb-5 group cursor-default">
                  <div className={`w-14 h-14 rounded-full ${card.categoryColor} text-white flex items-center justify-center shadow-lg ${card.categoryBgGlow} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="mt-3 text-xs sm:text-sm font-extrabold tracking-wider text-slate-800 uppercase">
                    {card.category}
                  </span>
                </div>

                {/* 2. Realistic Smartphone Mockup Bezel */}
                <div className="relative w-full max-w-[280px] sm:max-w-[290px] mx-auto group">
                  
                  {/* Subtle outer phone glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-b from-slate-200 to-slate-400 rounded-[46px] opacity-25 blur-xs group-hover:opacity-40 transition-opacity" />

                  {/* Outer Bezel Border Frame */}
                  <div className={`relative rounded-[42px] border-[9px] ${card.bezelBorder} ${card.bezelShadow} bg-[#0B0F19] p-0.5 transition-transform duration-300 group-hover:-translate-y-1.5`}>
                    
                    {/* Metallic Glossy Ring inside border */}
                    <div className="relative rounded-[32px] overflow-hidden bg-[#0B0F19] text-white flex flex-col h-[520px] shadow-inner select-none">
                      
                      {/* Top Dynamic Island Notch */}
                      <div className="w-full pt-2.5 pb-1.5 px-4 flex items-center justify-between z-30 bg-[#0B0F19]">
                        <span className="text-[10px] font-semibold text-slate-400">9:41</span>
                        {/* Pill Notch */}
                        <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-inner">
                          <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/80" />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span className="text-[9px]">5G</span>
                          <div className="w-3.5 h-2 border border-slate-400 rounded-2xs p-0.5 flex items-center">
                            <div className="w-full h-full bg-slate-300 rounded-3xs" />
                          </div>
                        </div>
                      </div>

                      {/* Phone Screen Scrollable Area */}
                      <div className="relative flex-1 overflow-y-auto overflow-x-hidden scrollbar-none text-left flex flex-col bg-[#0B0F19]">
                        
                        {/* ========================================================= */}
                        {/* CARD 1: APARTMENT PREVIEW                                 */}
                        {/* ========================================================= */}
                        {card.phonePreviewType === 'apartment' && (
                          <div className="flex flex-col text-slate-200">
                            {/* Brand Header */}
                            <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/10 bg-[#111827]">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-[10px] font-black text-black">
                                  SK
                                </div>
                                <span className="text-[11px] font-extrabold tracking-tight text-white">SKYLINE</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">f</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">ig</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">▶</span>
                              </div>
                            </div>

                            {/* Hero Apartment Image Banner */}
                            <div className="relative h-44 w-full overflow-hidden">
                              <img 
                                src={card.heroImage} 
                                alt="Skyline Towers" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/40 to-transparent" />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full bg-orange-600/90 text-white text-[9px] font-bold tracking-wide uppercase">
                                  RERA Approved
                                </span>
                              </div>
                              <div className="absolute bottom-2 left-2.5 right-2.5">
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                                  MILLENNIAL TOWERS
                                </span>
                                <p className="text-xs font-black text-white leading-tight">
                                  Live The Millennial High Life
                                </p>
                              </div>
                            </div>

                            {/* Video Walkthrough Card */}
                            <div className="p-2.5 mx-2.5 my-2 rounded-xl bg-gradient-to-r from-slate-900 to-[#1C2434] border border-amber-500/30 flex items-center gap-2.5">
                              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400">
                                <Play className="w-4 h-4 fill-amber-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-bold text-white truncate">4K Architectural Film</div>
                                <div className="text-[8px] text-slate-400">Official Project Walkthrough</div>
                              </div>
                            </div>

                            {/* Floor Plans Card */}
                            <div className="mx-2.5 p-3 rounded-xl bg-white text-slate-900 shadow-md">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-black text-slate-900">Floor Plans</span>
                                <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                                  2 & 3 BHK
                                </span>
                              </div>
                              <p className="text-[9px] text-slate-600 leading-tight mb-2">
                                Seamless & transparent buying experience backed by high market expertise.
                              </p>
                              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-medium">
                                <div className="p-1.5 rounded bg-slate-100 flex items-center justify-between">
                                  <span>2 BHK Super</span>
                                  <span className="font-bold">1,480 sqft</span>
                                </div>
                                <div className="p-1.5 rounded bg-slate-100 flex items-center justify-between">
                                  <span>3 BHK Luxury</span>
                                  <span className="font-bold">2,150 sqft</span>
                                </div>
                              </div>
                            </div>

                            {/* Floating Contact Stack */}
                            <div className="p-2.5 flex items-center justify-between text-[10px] text-slate-400">
                              <span className="text-[9px] text-amber-400 font-semibold">100% Vastu Compliant</span>
                              <div className="flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                  <Phone className="w-2.5 h-2.5" />
                                </span>
                                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                  <MessageCircle className="w-2.5 h-2.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ========================================================= */}
                        {/* CARD 2: VILLA PREVIEW                                     */}
                        {/* ========================================================= */}
                        {card.phonePreviewType === 'villa' && (
                          <div className="flex flex-col text-slate-200">
                            {/* Brand Header */}
                            <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/10 bg-[#111827]">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white">
                                  GV
                                </div>
                                <span className="text-[11px] font-extrabold tracking-tight text-white">GREENVILLE</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">f</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">ig</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">▶</span>
                              </div>
                            </div>

                            {/* Hero Greek Villa Image */}
                            <div className="relative h-44 w-full overflow-hidden">
                              <img 
                                src={card.heroImage} 
                                alt="Greenville Villas" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/40 to-transparent" />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[9px] font-bold tracking-wide uppercase">
                                  Gated Triplex
                                </span>
                              </div>
                              <div className="absolute bottom-2 left-2.5 right-2.5">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                                  SIGNATURE VILLAS
                                </span>
                                <p className="text-xs font-black text-white leading-tight">
                                  Greece-Themed White & Blue Living
                                </p>
                              </div>
                            </div>

                            {/* Highlights Card with Numbered Badges */}
                            <div className="mx-2.5 my-2 p-3 rounded-xl bg-[#111827] border border-emerald-500/20 text-slate-200">
                              <span className="text-[11px] font-bold text-white block mb-0.5">
                                Luxurious Villa Community
                              </span>
                              <p className="text-[8px] text-slate-400 mb-2 leading-tight">
                                A vacation lifestyle with Greece themed white & blue architecture.
                              </p>

                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    1
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">A Holiday Life Everyday</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    2
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">Private Plunge Pool & Deck</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    3
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">Greece Themed Clubhouse</span>
                                </div>
                              </div>
                            </div>

                            {/* Aerial Villa Preview Thumbnail */}
                            <div className="mx-2.5 p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                              <div className="text-[9px]">
                                <span className="font-bold text-white block">4 & 5 BHK Triplex</span>
                                <span className="text-[8px] text-slate-400">4,200 - 5,800 sq.ft</span>
                              </div>
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                45 Units Only
                              </span>
                            </div>
                          </div>
                        )}

                        {/* ========================================================= */}
                        {/* CARD 3: PLOTTING PREVIEW                                  */}
                        {/* ========================================================= */}
                        {card.phonePreviewType === 'plotting' && (
                          <div className="flex flex-col text-slate-200">
                            {/* Brand Header */}
                            <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/10 bg-[#111827]">
                              <div>
                                <div className="text-[10px] font-extrabold text-white">HK FARMS</div>
                                <div className="text-[7px] text-emerald-400 font-semibold tracking-wider">NATURE • PEACE • INVESTMENT</div>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[8px] font-bold flex items-center gap-1">
                                <MessageCircle className="w-2.5 h-2.5" /> WhatsApp
                              </span>
                            </div>

                            {/* Banner Ribbon */}
                            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 px-2.5 py-1 text-center font-black text-[9px] uppercase tracking-wide">
                              Invest Today, Enjoy Tomorrow!
                            </div>

                            {/* Master Layout Graphic */}
                            <div className="mx-2.5 my-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                              <div className="flex items-center justify-between mb-1.5 text-[8px]">
                                <span className="text-emerald-400 font-bold uppercase tracking-wider">Master Layout Map</span>
                                <span className="bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[7px]">
                                  30 FT & 40 FT ROADS
                                </span>
                              </div>

                              {/* Realistic Plotted Grid Layout */}
                              <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-900/90 rounded-lg border border-emerald-500/20 text-center">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((plotNum) => (
                                  <div 
                                    key={plotNum} 
                                    className={`py-1 rounded text-[8px] font-bold border transition ${
                                      [2, 5, 9].includes(plotNum)
                                        ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                                        : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40'
                                    }`}
                                  >
                                    #{plotNum}
                                    <span className="block text-[6px] font-normal opacity-80">
                                      {[2, 5, 9].includes(plotNum) ? 'BOOKED' : '200 Yd'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-1 text-[7px] text-slate-400 px-1">
                                <span>🟢 Available Plots</span>
                                <span>🔴 Booked</span>
                                <span>🛣️ 40ft Main Road</span>
                              </div>
                            </div>

                            {/* Plot Features List */}
                            <div className="mx-2.5 p-2 rounded-xl bg-[#111827] border border-white/5 space-y-1 text-[8px]">
                              <div className="flex items-center gap-1.5 text-slate-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>100% Vastu Compliant Plots</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>Spot Registration & Clear Title</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span>Grand Entrance Arch & CCTV</span>
                              </div>
                            </div>

                            {/* Action Buttons inside screen */}
                            <div className="mx-2.5 my-1.5 grid grid-cols-2 gap-1.5">
                              <div className="py-1 rounded-md bg-amber-400 text-slate-950 font-black text-[8px] text-center flex items-center justify-center gap-1">
                                <Download className="w-2.5 h-2.5" /> Brochure
                              </div>
                              <div className="py-1 rounded-md bg-blue-600 text-white font-bold text-[8px] text-center flex items-center justify-center gap-1">
                                View Plots
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ========================================================= */}
                        {/* CARD 4: BUILDING PREVIEW                                  */}
                        {/* ========================================================= */}
                        {card.phonePreviewType === 'building' && (
                          <div className="flex flex-col text-slate-200">
                            {/* Brand Header */}
                            <div className="px-3.5 py-2 flex items-center justify-between border-b border-white/10 bg-[#111827]">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-[10px] font-black text-white">
                                  KT
                                </div>
                                <span className="text-[11px] font-extrabold tracking-tight text-white">KAUSTUBH</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">f</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">ig</span>
                                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[8px]">▶</span>
                              </div>
                            </div>

                            {/* Hero Commercial Skyscraper Image */}
                            <div className="relative h-44 w-full overflow-hidden">
                              <img 
                                src={card.heroImage} 
                                alt="Kaustubh Landmark" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/40 to-transparent" />
                              <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[9px] font-bold tracking-wide uppercase">
                                  Grade-A Tower
                                </span>
                              </div>
                              <div className="absolute bottom-2 left-2.5 right-2.5">
                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">
                                  LANDMARK TOWER
                                </span>
                                <p className="text-xs font-black text-white leading-tight">
                                  Commercial & High-End Residences
                                </p>
                              </div>
                            </div>

                            {/* Highlights Card with Numbered Badges */}
                            <div className="mx-2.5 my-2 p-3 rounded-xl bg-[#111827] border border-purple-500/20 text-slate-200">
                              <span className="text-[11px] font-bold text-white block mb-0.5">
                                Floor Plans & Commercial Hub
                              </span>
                              <p className="text-[8px] text-slate-400 mb-2 leading-tight">
                                Seamless and transparent property buying experience backed by years of market expertise.
                              </p>

                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    1
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">Transparent Communication</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    2
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">Market Knowledge & 8%+ Yield</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-bold flex items-center justify-center shrink-0">
                                    3
                                  </div>
                                  <span className="text-[9px] font-semibold text-slate-200">Strong Legal Due Diligence</span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Specs Bar */}
                            <div className="mx-2.5 p-2 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between text-[9px]">
                              <div>
                                <span className="font-bold text-white block">Pre-Leased Offices</span>
                                <span className="text-[8px] text-slate-400">9-Year Corporate Lock-In</span>
                              </div>
                              <span className="text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                                8.4% ROI
                              </span>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Phone Bottom Home Bar Indicator */}
                      <div className="py-2 flex items-center justify-center bg-[#0B0F19] z-20">
                        <div className="w-24 h-1 bg-white/30 rounded-full" />
                      </div>

                    </div>
                  </div>

                </div>

                {/* 3. Dark Pill Button: "VISIT NOW ->" */}
                <Link
                  href={`/v/${card.templateSlug}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-[#0B0F19] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-xl group"
                >
                  <span>VISIT NOW</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B0F19] via-[#111827] to-[#1C2434] text-white border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TS-RERA & HMDA READY TEMPLATES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Are you a Builder, Developer, or Real Estate Consultant?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Launch your project mini-website in less than 5 minutes. Includes 2D/3D floor plan explorer, WhatsApp site-visit booking, EMI calculator, and Google Maps integration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/vcard-templates?category=Real+Estate"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20 text-center"
            >
              Explore All Real Estate Templates
            </Link>
            <Link
              href="/signup?intent=real_estate"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/10 transition-all text-center"
            >
              Get Started Free
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
