'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  DigitalProfile 
} from '@/lib/types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Download, 
  Wrench, 
  ShieldCheck, 
  Award, 
  Star, 
  Clock, 
  X, 
  Zap, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MessageCircle,
  Play,
  Check,
  Search,
  Droplets,
  Paintbrush,
  Bug,
  Wind,
  Package,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  ThumbsUp,
  Eye,
  CheckCircle2,
  Tv
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

// Clean SVG Brand Icons matching the design system
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.64 13.48 14.48 13.44 14.31 13.69C14.15 13.94 13.68 14.49 13.54 14.65C13.4 14.81 13.26 14.83 13.01 14.71C12.76 14.59 11.96 14.33 11.01 13.48C10.27 12.82 9.77 12 9.63 11.75C9.49 11.5 9.35 11.37 9.1 11.25C8.85 11.12 7.73 10.57 7.5 10.45C7.27 10.33 7.11 10.27 6.94 10.52C6.78 10.77 6.31 11.32 6.17 11.48C6.03 11.64 5.89 11.66 5.64 11.54C5.39 11.41 4.59 11.15 3.64 10.3C2.9 9.64 2.4 8.82 2.26 8.57C2.12 8.32 2.24 8.19 2.36 8.06C2.47 7.94 2.61 7.77 2.73 7.63C2.85 7.49 2.9 7.39 2.98 7.22C3.06 7.05 3.02 6.9 2.96 6.77C2.9 6.64 2.44 5.51 2.25 5.05C2.06 4.59 1.88 4.65 1.74 4.64C1.6 4.63 1.44 4.63 1.28 4.63C1.12 4.63 0.86 4.69 0.64 4.93C0.42 5.17 -0.19 5.76 -0.19 6.96C-0.19 8.16 0.69 9.31 0.81 9.47C0.93 9.63 2.53 12.1 4.97 13.16C5.55 13.41 6 13.57 6.35 13.68C6.93 13.86 7.46 13.83 7.88 13.77C8.35 13.7 9.32 13.18 9.52 12.61C9.72 12.04 9.72 11.55 9.66 11.45C9.6 11.35 9.44 11.29 9.19 11.17Z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPREHENSIVE MOCK DATA CATALOG (High Quality Real Human Imagery)
// ─────────────────────────────────────────────────────────────

// Top Hero Banner Slides (Clean Responsive Web Banners)
const HERO_BANNERS = [
  { 
    id: 1, 
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80", 
    title: "Complete Home Deep Cleaning",
    subtitle: "German Equipment • 100% Sanitized • Starts ₹2,499*",
    badge: "HYDERABAD #1 RATED"
  },
  { 
    id: 2, 
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80", 
    title: "Licensed Electricians & Wire Repairs",
    subtitle: "60-Min Doorstep Arrival • Short Circuits & MCB Panels",
    badge: "EMERGENCY 24/7"
  },
  { 
    id: 3, 
    img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=80", 
    title: "Luxury Interior & Rental Painting",
    subtitle: "On-Time Guarantee • Free Colour Consultation • ₹5/sqft",
    badge: "1-YEAR WARRANTY"
  },
  { 
    id: 4, 
    img: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=1400&q=80", 
    title: "Eco-Friendly Odourless Pest Control",
    subtitle: "Cockroach Gel Baiting & Drill-Fill Termite Barrier",
    badge: "GOVT. LICENSED"
  },
  { 
    id: 5, 
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80", 
    title: "Sofa Steam Shampooing & Extraction",
    subtitle: "99.9% Stain & Allergen Removal • Dries in 2 Hours",
    badge: "UP TO 50% OFF"
  }
];

// Thoughtful Curations / Category Cards
const CATEGORY_CARDS = [
  { 
    id: 'cat-1', 
    title: 'Pest Control', 
    badge: 'Govt. Licensed Company',
    desc: 'Protect your family with odorless herbal baiting & drill-fill termite barrier.',
    price: '₹599 Onwards*',
    btnText: 'BOOK NOW',
    img: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80',
    category: 'Pest Control'
  },
  { 
    id: 'cat-2', 
    title: 'Packers & Movers', 
    badge: '1 Lakh+ Safe Deliveries',
    desc: 'Zero-damage transit insurance with multi-layer bubble packing.',
    price: '₹1,999 Onwards*',
    btnText: 'Book Now',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    category: 'Packers & Movers'
  },
  { 
    id: 'cat-3', 
    title: 'Appliance Repair', 
    badge: 'Certified Technicians',
    desc: 'Washing machines, split AC foam wash & refrigerator gas diagnostics.',
    price: '₹199 Onwards*',
    btnText: 'BOOK NOW',
    img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    category: 'Appliance Services'
  },
  { 
    id: 'cat-4', 
    title: 'Express Painting', 
    badge: '100% In-House Staff',
    desc: 'Fresh coat rental painting & premium Asian Paints royal textures.',
    price: '₹5 / sqft*',
    btnText: 'GET QUOTE',
    img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    category: 'Painting Services'
  },
  { 
    id: 'cat-5', 
    title: 'Diamond Floor Polish', 
    badge: 'Mirror Shine Finish',
    desc: 'Italian marble, mosaic & granite restoration with heavy-duty single disc.',
    price: '₹15 / sqft*',
    btnText: 'BOOK NOW',
    img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=600&q=80',
    category: 'Floor Polishing'
  },
  { 
    id: 'cat-6', 
    title: 'Deep Cleaning', 
    badge: 'German Machinery',
    desc: 'Intensive degreasing, bathroom descaling & floor scrubbing.',
    price: '₹2,299 Onwards*',
    btnText: 'BOOK NOW',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    category: 'Cleaning Services'
  }
];

// Service Rows
const CLEANING_SERVICES = [
  { id: 'clean-1', title: 'Bathroom Cleaning', priceTag: 'Starts ₹399 each*', badgeColor: 'bg-emerald-600', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', tags: 'washroom toilet tiles stains acid scrub' },
  { id: 'clean-2', title: 'Sofa Shampooing', priceTag: 'Starts at ₹599', badgeColor: 'bg-amber-500', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80', tags: 'couch fabric cushion velvet leather stain mites' },
  { id: 'clean-3', title: 'Kitchen Deep Cleaning', priceTag: 'Starts ₹1,499', badgeColor: 'bg-slate-900', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', tags: 'chimney grease stove cabinets tiles degreasing' },
  { id: 'clean-4', title: 'Vacant Home Deep Clean', priceTag: 'Starts ₹2,299', badgeColor: 'bg-blue-600', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', tags: 'empty flat villa housewarming handover movein' },
  { id: 'clean-5', title: 'Occupied Home Deep Clean', priceTag: 'Starts ₹2,499', badgeColor: 'bg-orange-500', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', tags: 'furnished residential festive diwali scrubber' }
];

const PAINTING_SERVICES = [
  { id: 'paint-1', title: 'Rental Express Painting', priceTag: '₹5/sqft', badgeColor: 'bg-blue-700', img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400&q=80', tags: 'tenant whitewash wall roller quick primer' },
  { id: 'paint-2', title: 'Luxury Interior Painting', priceTag: '₹7/sqft', badgeColor: 'bg-red-700', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80', tags: 'living room bedroom royal sheen washable asian' },
  { id: 'paint-3', title: 'Exterior Weatherproof', priceTag: '₹12/sqft', badgeColor: 'bg-slate-800', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', tags: 'apex ultima fungal rainproof facade villa' },
  { id: 'paint-4', title: 'Royal Accent Texture', priceTag: 'Free Consultation', badgeColor: 'bg-emerald-700', img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80', tags: 'designer stencil metallic gold wallpaper alternative' },
  { id: 'paint-5', title: 'Waterproofing & Cracks', priceTag: '1-Year Warranty', badgeColor: 'bg-amber-600', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', tags: 'seepage dampness ceiling leakage injection dr fixit' }
];

const PEST_CONTROL_SERVICES = [
  { id: 'pest-1', title: 'Herbal Cockroach Control', priceTag: '₹599', badgeColor: 'bg-emerald-600', img: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=400&q=80', tags: 'roaches german roach gel baiting kitchen safe' },
  { id: 'pest-2', title: 'Intensive Bedbugs Eradication', priceTag: '₹1,199', badgeColor: 'bg-red-600', img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=400&q=80', tags: 'mattress bed wood steam spray 2 visits' },
  { id: 'pest-3', title: 'Mosquito Thermal Fogging', priceTag: '₹999', badgeColor: 'bg-blue-600', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80', tags: 'dengue malaria outdoor lawn balcony society' },
  { id: 'pest-4', title: 'Drill-Fill Termite Barrier', priceTag: '₹2/sqft', badgeColor: 'bg-amber-600', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80', tags: 'white ants wood floor foundation bayer 2-year warranty' },
  { id: 'pest-5', title: 'Woodborer Powder Shield', priceTag: '₹599', badgeColor: 'bg-purple-600', img: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=400&q=80', tags: 'powder timber cupboards furniture wardrobe' }
];

const FLOOR_POLISHING_SERVICES = [
  { id: 'floor-1', title: 'Mosaic Floor Polishing', priceTag: 'Starts ₹15 / sqft', img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80', tags: 'cement chips scrubbing wax shine restoration' },
  { id: 'floor-2', title: 'Indian Marble Polishing', priceTag: 'Starts ₹18 / sqft', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', tags: 'makrana white marble crystallization silicate buff' },
  { id: 'floor-3', title: 'Italian Marble Mirror Polish', priceTag: 'Starts ₹40 / sqft', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80', tags: 'diamond pads 5-step gloss epoxy fill seamless' },
  { id: 'floor-4', title: 'Granite & Kota Honing', priceTag: 'Starts ₹20 / sqft', img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80', tags: 'black galaxy kitchen platform stain removal' }
];

const APPLIANCE_SERVICES = [
  { id: 'app-1', title: 'Washing Machine Repair', promo: 'UP TO 25% OFF', sub: 'Starts @ ₹199 Onwards*', img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', tags: 'front load top load drum motor drainage error pcb' },
  { id: 'app-2', title: 'Refrigerator Repair', promo: '80+ Daily Booked', sub: 'Starts @ ₹199 Onwards*', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80', tags: 'fridge single double door cooling compressor gas leakage' },
  { id: 'app-3', title: 'Split AC Foam Jet Service', promo: 'UP TO 30% OFF', sub: '3X Power Saver AC • ₹499*', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', tags: 'air conditioner cooling coils pressure wash drain gas' },
  { id: 'app-4', title: 'Window AC Deep Descaling', promo: 'UP TO 25% OFF', sub: '10X Better Airflow • ₹399*', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', tags: 'filter motor blower noise water leaking' },
  { id: 'app-5', title: 'Geyser & Water Heater', promo: 'UP TO 50% OFF', sub: 'Fix it @ ₹249 Onwards*', img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=400&q=80', tags: 'instant storage water heating element thermostat valve' }
];

const HOME_REPAIR_SERVICES = [
  { id: 'rep-1', title: 'Licensed Electrician & Wiring', promo: '60-MIN ARRIVAL', sub: 'Starts @ ₹199*', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', tags: 'electrician short circuit mcb fan light switch inverter chandelier wiring' },
  { id: 'rep-2', title: 'Master Plumbing & Leak Fix', promo: 'CERTIFIED EXPERT', sub: 'Starts @ ₹199*', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', tags: 'plumber tap leak pipe diverter drainage blockage flush tank sink' },
  { id: 'rep-3', title: 'Carpenter Work & Furniture', promo: 'ON-SITE MASTERS', sub: 'Starts @ ₹299*', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', tags: 'carpenter door lock hinges bed assembly wardrobe drawer polish' },
  { id: 'rep-4', title: 'Balcony Bird Netting', promo: '20% OFF FIRST BOOKING', sub: 'Heavy Duty Nylon • ₹15/sqft', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', tags: 'pigeon net stainless steel cable balcony window safety' }
];

// Unified Master Search Catalog (Combines all 30+ services)
const MASTER_SEARCH_CATALOG = [
  ...CLEANING_SERVICES.map(s => ({ ...s, category: 'Cleaning Services', icon: '🧹' })),
  ...PAINTING_SERVICES.map(s => ({ ...s, category: 'Painting Services', icon: '🎨' })),
  ...PEST_CONTROL_SERVICES.map(s => ({ ...s, category: 'Pest Control', icon: '🪳' })),
  ...FLOOR_POLISHING_SERVICES.map(s => ({ ...s, category: 'Floor Polishing', icon: '✨' })),
  ...APPLIANCE_SERVICES.map(s => ({ ...s, category: 'Appliance Services', priceTag: s.sub, icon: '❄️' })),
  ...HOME_REPAIR_SERVICES.map(s => ({ ...s, category: 'Home Repair & Electrical', priceTag: s.sub, icon: '⚡' }))
];

// YouTube Documentary & Video Guides Data
const YOUTUBE_VIDEOS = [
  {
    id: 'yt-1',
    youtubeId: 'gfkTsS1zZ6c',
    title: 'Complete 3BHK Home Deep Cleaning Walkthrough in Gachibowli',
    duration: '10:24',
    views: '142K views',
    category: 'Deep Cleaning',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Watch our 5-specialist crew deep clean a 2,400 sq.ft luxury apartment using German single-disc scrubbers, Kärcher steam guns, and hospital-grade eco disinfectants.'
  },
  {
    id: 'yt-2',
    youtubeId: '5NV6Rdv1a3I',
    title: 'AC Foam Jet Deep Cleaning & Pressure Diagnostics Demo',
    duration: '08:15',
    views: '98K views',
    category: 'AC Service',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'How pressure foam washing doubles cooling efficiency and cuts monthly electricity bills by up to 25%. Step-by-step amperage and coil testing.'
  },
  {
    id: 'yt-3',
    youtubeId: '2v86Fj2_U08',
    title: 'Emergency Short Circuit & MCB Box Repair Live in Banjara Hills',
    duration: '06:40',
    views: '65K views',
    category: 'Electrical Work',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Our licensed master electrician arrives in 35 minutes to diagnose a tripped 63A main breaker, replace burned RCCB wires, and restore safe power.'
  },
  {
    id: 'yt-4',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Safe Packers & Movers: 5-Layer Furniture Bubble Wrapping',
    duration: '12:05',
    views: '84K views',
    category: 'Packers & Movers',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'See how our certified moving team disassembles, wraps, and loads fragile glassware, smart TVs, and solid teakwood dining tables with zero scratches.'
  },
  {
    id: 'yt-5',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Odourless Herbal Pest Control in Modular Kitchens',
    duration: '05:18',
    views: '112K views',
    category: 'Pest Control',
    thumbnail: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    description: 'Safe for children and pets! Watch the precision Bayer gel baiting technique that eliminates German cockroaches from kitchen hinges in 48 hours.'
  },
  {
    id: 'yt-6',
    youtubeId: 'gfkTsS1zZ6c',
    title: 'Italian Marble 5-Step Diamond Pad Mirror Polishing',
    duration: '07:50',
    views: '73K views',
    category: 'Floor Polish',
    thumbnail: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
    description: 'Restoring yellowed, dull marble flooring to a sparkling mirror finish using Italian crystallization liquids and industrial planetary grinders.'
  }
];

const HYDERABAD_LOCALITIES = [
  'Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'Hitec City',
  'Kondapur', 'Kukatpally', 'Miyapur', 'Manikonda', 'Kothaguda',
  'Secunderabad', 'Begumpet', 'Ameerpet', 'Mehdipatnam', 'Nallagandla'
];

interface HomeServicesMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

export default function HomeServicesMiniWebsiteView({ 
  profile, 
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = false
}: HomeServicesMiniWebsiteViewProps) {

  // State
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceItem, setSelectedServiceItem] = useState<string>('Licensed Electrician & Wiring');
  const [activeVideoModal, setActiveVideoModal] = useState<any>(null);
  const [dealCountdown, setDealCountdown] = useState({ hours: 20, minutes: 8, seconds: 5 });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto banner rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex(prev => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setDealCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return MASTER_SEARCH_CATALOG.filter(item => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tags && item.tags.toLowerCase().includes(q)) ||
        (item.priceTag && item.priceTag.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  // Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    locality: 'Gachibowli',
    service: 'Licensed Electrician & Wiring',
    date: '2026-10-27',
    timeSlot: '⚡ Emergency (Arrive within 60 mins)',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact details
  const companyName = (profile as any).businessName || profile.company || profile.name || 'OneClick Home Services';
  const cleanPhone = (profile.phone || '+91 98765 43210').replace(/\s+/g, '');
  const cleanCallNumber = cleanPhone.replace(/[^\d+]/g, '');
  const rawWa = profile.whatsapp || profile.phone || '919876543210';
  const cleanWaDigits = rawWa.replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;
  const instagramLink = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'instagram')?.url || 'https://www.instagram.com/oneclickbiz/';
  const facebookLink = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'facebook')?.url || 'https://www.facebook.com/oneclickbiz';
  const emailUrl = profile.email ? `mailto:${profile.email}` : 'mailto:support@oneclickhomeservices.com';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('OneClick Home Services, Cyber Gateway, HITEC City, Hyderabad, Telangana')}`;

  const handleDownloadVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN:${companyName} (Hyderabad)
ORG:OneClick Home Services India Pvt. Ltd.
TITLE:Certified Doorstep Home Services & Electrician
TEL;TYPE=CELL,VOICE:${cleanCallNumber}
TEL;TYPE=WORK,VOICE:+919876543210
EMAIL;TYPE=PREF,INTERNET:${profile.email || 'support@oneclickhomeservices.com'}
URL:https://www.oneclickbiz.in/v/home-services
ADR;TYPE=WORK:;;Level 4, Cyber Gateway, HITEC City;Hyderabad;Telangana;500081;India
NOTE:Hyderabad's #1 Doorstep Home Services, Cleaning, Electrical, AC & Repairs.
END:VCARD`;

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OneClick_Home_Services_Hyderabad.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openBookFor = (serviceName: string) => {
    setSelectedServiceItem(serviceName);
    setBookingForm(prev => ({ ...prev, service: serviceName }));
    setIsBookingModalOpen(true);
    setIsSearchOpen(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingModalOpen(false);
    }, 2800);
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white pb-20 sm:pb-0">

      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVBAR (Logo + Hyderabad Hub, Login/Signup, Cart)
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-black text-sm sm:text-lg tracking-tight text-slate-900 uppercase flex items-center gap-1.5">
                <span>{companyName}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 normal-case">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Hub
                </span>
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-red-600 tracking-wider uppercase">
                Hyderabad Operations Hub
              </div>
            </div>
          </div>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
            <a href="#cleaning-section" className="hover:text-blue-600 transition">Cleaning</a>
            <a href="#painting-section" className="hover:text-blue-600 transition">Painting</a>
            <a href="#pest-section" className="hover:text-blue-600 transition">Pest Control</a>
            <a href="#movers-section" className="hover:text-blue-600 transition">Packers &amp; Movers</a>
            <a href="#youtube-hub" className="hover:text-red-600 flex items-center gap-1 transition">
              <YoutubeIcon className="w-4 h-4 text-red-600" />
              <span>YouTube</span>
            </a>
            <a href="#instagram-space" className="hover:text-pink-600 flex items-center gap-1 transition">
              <InstagramIcon className="w-4 h-4 text-pink-500" />
              <span>Instagram</span>
            </a>
          </nav>

          {/* Actions: Phone CTA, Login/Signup, Shopping Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href={`tel:${cleanCallNumber}`}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>{cleanPhone}</span>
            </a>

            <button 
              onClick={() => openBookFor('Quick Login / Service Dispatch')}
              className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50/80 rounded-lg transition cursor-pointer"
            >
              Login / Signup
            </button>

            {/* Shopping Cart Icon */}
            <button 
              onClick={() => openBookFor('View Selected Services')}
              className="relative p-2 text-slate-800 hover:text-red-600 transition cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. TOP ROTATING HERO BANNER CAROUSEL
      ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-slate-900 aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/8] max-h-[460px]">
        {HERO_BANNERS.map((banner, idx) => (
          <div 
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
              idx === activeBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            onClick={() => openBookFor(banner.title)}
          >
            <img 
              src={banner.img} 
              alt={banner.title} 
              className="w-full h-full object-cover" 
            />
            {/* Banner Gradient Overlay & Promo Content */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/85 via-slate-900/40 to-transparent flex items-center px-4 sm:px-12 md:px-20">
              <div className="max-w-xl text-white space-y-2 sm:space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                  {banner.badge}
                </span>
                <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                  {banner.title}
                </h1>
                <p className="text-xs sm:text-base font-medium text-slate-200 drop-shadow">
                  {banner.subtitle}
                </p>
                <div className="pt-1">
                  <button className="px-5 py-2 sm:px-7 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition active:scale-95">
                    Book Service Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Buttons */}
        <button 
          onClick={() => setActiveBannerIndex(prev => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button 
          onClick={() => setActiveBannerIndex(prev => (prev + 1) % HERO_BANNERS.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* T&C Indicator */}
        <div className="absolute bottom-2 right-4 z-20 text-[10px] sm:text-[11px] text-white/90 font-medium bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
          T&amp;C Apply*
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SKY BLUE BANNER: "The Award winning company" + LIVE SEARCH BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#70BCE6] py-8 sm:py-10 px-4 text-center relative z-30">
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          The Award winning company
        </h2>

        {/* White Rounded Search Pill */}
        <div 
          ref={searchContainerRef}
          className="max-w-2xl mx-auto relative bg-white rounded-full p-2 sm:p-2.5 shadow-lg flex items-center gap-2 sm:gap-3 border border-blue-200"
        >
          
          {/* Location Selector */}
          <div className="flex items-center gap-1.5 px-3 py-1 border-r border-slate-300 shrink-0">
            <MapPin className="w-4 h-4 text-red-600 fill-red-600 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-transparent text-slate-800 focus:outline-none cursor-pointer pr-1 lowercase"
            >
              <option value="hyderabad">hyderabad</option>
              <option value="gachibowli">gachibowli</option>
              <option value="jubilee hills">jubilee hills</option>
              <option value="banjara hills">banjara hills</option>
              <option value="hitec city">hitec city</option>
              <option value="madhapur">madhapur</option>
              <option value="kondapur">kondapur</option>
              <option value="kukatpally">kukatpally</option>
              <option value="secunderabad">secunderabad</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center min-w-0 pr-1">
            <input 
              type="text"
              placeholder="Search for Services (e.g. Electrician, AC, Pest, Sofa, Clean)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }} 
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button 
            type="button" 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-800 hover:text-blue-600 transition cursor-pointer shrink-0"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* ─────────────────────────────────────────────────────────
              LIVE SEARCH RESULTS DROPDOWN (Fetches all results)
          ───────────────────────────────────────────────────────── */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-left max-h-[440px] flex flex-col">
              
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  {searchQuery ? `Matching Services (${searchResults.length})` : 'Trending Services across Hyderabad'}
                </span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto divide-y divide-slate-100 p-2">
                {(searchQuery ? searchResults : MASTER_SEARCH_CATALOG.slice(0, 8)).map(item => (
                  <div
                    key={item.id}
                    onClick={() => openBookFor(item.title)}
                    className="p-2.5 sm:p-3 hover:bg-blue-50/70 rounded-xl transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200/90">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">{item.icon}</span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 truncate">
                            {item.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {item.category} • <span className="text-emerald-700 font-bold">{item.priceTag}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 shadow-xs transition"
                    >
                      Book Now
                    </button>
                  </div>
                ))}

                {searchQuery && searchResults.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    <p className="font-bold text-sm text-slate-700">No direct service matches for "{searchQuery}"</p>
                    <p className="text-xs mt-1">Try searching for: <span className="font-semibold text-blue-600">Electrician, AC, Painting, Pest, Sofa, Cleaning</span></p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Quick Filter Search Chips */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap max-w-2xl mx-auto">
          {['⚡ Electrician', '🚰 Plumber', '❄️ AC Service', '🧹 Deep Cleaning', '🪳 Pest Control', '🛋️ Sofa Shampoo'].map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                const keyword = pill.split(' ')[1];
                setSearchQuery(keyword);
                setIsSearchOpen(true);
              }}
              className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-slate-800 text-[11px] font-bold shadow-xs transition cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. HERO 9-SQUIRCLE ACTION DOCK (Responsive & Large Touch Targets)
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Scrollable Container on Mobile, Centered on Desktop */}
          <div className="w-full overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-5 min-w-max px-2">
              
              {/* 1. CALL */}
              <a
                href={`tel:${cleanCallNumber}`}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  CALL
                </span>
              </a>

              {/* 2. WHATSAPP */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services Hyderabad, I would like to book a service.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  WHATSAPP
                </span>
              </a>

              {/* 3. INSTAGRAM */}
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  INSTAGRAM
                </span>
              </a>

              {/* 4. YOUTUBE HUB */}
              <a
                href="#youtube-hub"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#FF0000] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <YoutubeIcon className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-red-600 transition-colors whitespace-nowrap">
                  YOUTUBE
                </span>
              </a>

              {/* 5. SERVICES */}
              <a
                href="#cleaning-section"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#8B5CF6] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  SERVICES
                </span>
              </a>

              {/* 6. DIRECTIONS */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  DIRECTIONS
                </span>
              </a>

              {/* 7. EMAIL */}
              <a
                href={emailUrl}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#EF4444] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  EMAIL
                </span>
              </a>

              {/* 8. SAVE VCARD */}
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6 text-white stroke-[2.2]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  SAVE VCARD
                </span>
              </button>

              {/* 9. SHARE */}
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Share2 className="w-6 h-6 text-white stroke-[2.2]" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  SHARE
                </span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. "Thoughtful Curations" & PROMO CATEGORY CARDS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-10 max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Section Heading with Call Button */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
            Thoughtful Curations
          </h2>
          <a
            href={`tel:${cleanCallNumber}`}
            className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition animate-bounce"
            title="Call Expert"
          >
            <Phone className="w-4 h-4 fill-white" />
          </a>
        </div>
        <p className="text-xs sm:text-sm italic text-slate-500 font-serif mt-0.5 mb-5">
          Of our finest doorstep experiences
        </p>

        <div className="text-sm font-bold text-slate-800 mb-4">
          Category Highlights
        </div>

        {/* 6 Category Banners Swiper Row with Mobile Snap Scrolling */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x">
          {CATEGORY_CARDS.map(banner => (
            <div 
              key={banner.id}
              onClick={() => openBookFor(banner.category)}
              className="w-[82vw] sm:w-[380px] md:w-[420px] shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all group snap-start border border-slate-200/90 bg-white flex flex-col justify-between"
            >
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-[65%]">
                  <span className="inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 tracking-wider">
                    {banner.badge}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {banner.desc}
                  </p>
                  <div className="text-base sm:text-lg font-black text-slate-900 pt-1">
                    {banner.price}
                  </div>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-xs border border-slate-200/90">
                  <img src={banner.img} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
              </div>

              <div className="p-4 pt-0">
                <button className="w-full py-2 rounded-xl bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition">
                  {banner.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CLEANING SERVICES ROW (Badge: up to 50% off)
      ───────────────────────────────────────────────────────────── */}
      <section id="cleaning-section" className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Cleaning Services
          </h2>
          <span className="text-[11px] font-bold text-pink-900 bg-[rgb(255,182,193)] px-3 py-1 rounded-full">
            up to 50% off
          </span>
        </div>

        {/* 5 Cards Row (2 col on mobile, 5 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {CLEANING_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                {item.priceTag}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PAINTING SERVICES ROW (Badge: 100 % In House Staff)
      ───────────────────────────────────────────────────────────── */}
      <section id="painting-section" className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Painting Services
          </h2>
          <span className="text-[11px] font-bold text-cyan-900 bg-cyan-100 px-3 py-1 rounded-full">
            100 % In House Staff
          </span>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {PAINTING_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-blue-700 font-bold mt-0.5">
                {item.priceTag}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. PEST CONTROL ROW (Badge: Licensed Company)
      ───────────────────────────────────────────────────────────── */}
      <section id="pest-section" className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
              Pest Control
            </h2>
            <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
              Licensed Company
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>99.9% Eradication Guarantee</span>
          </div>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {PEST_CONTROL_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                Starts at {item.priceTag}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. PACKERS & MOVERS HUGE BANNER ROW
      ───────────────────────────────────────────────────────────── */}
      <section id="movers-section" className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Packers &amp; Movers
          </h2>
          <span className="text-[11px] font-bold text-teal-900 bg-teal-100 px-3 py-1 rounded-full">
            1 Lakh+ Happy Shifting
          </span>
        </div>

        {/* Full Promo Banner (Clean Responsive Layout) */}
        <div 
          onClick={() => openBookFor('Packers & Movers')}
          className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200 shadow-sm relative overflow-hidden cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              SHIFT ANYTHING , ANYWHERE !!
            </h3>
            <p className="text-xs sm:text-base text-slate-600 font-medium">
              Fast &amp; Safe Always • Doorstep Packing, Loading &amp; Full Transit Insurance
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-blue-700">
              Just at ₹1,999 onwards*
            </div>
            <div className="pt-2">
              <button className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition active:scale-95">
                Book Moving Now
              </button>
            </div>
          </div>

          <div className="w-full max-w-md shrink-0 rounded-2xl overflow-hidden shadow-xs border border-blue-100">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Packers & Movers" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. DEAL OF THE WEEK (COUNTDOWN TIMER)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-6 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-base sm:text-lg font-black text-slate-900 font-sans">
            Deal of the week
          </span>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Limited Time Offers
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-14 sm:w-16 py-1.5 rounded-lg bg-[#fdbd10] text-slate-900 font-extrabold text-center shadow-xs">
            <div className="text-base sm:text-lg leading-none">{String(dealCountdown.hours).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase font-bold tracking-wider mt-0.5">Hours</div>
          </div>
          <div className="w-14 sm:w-16 py-1.5 rounded-lg bg-[#fdbd10] text-slate-900 font-extrabold text-center shadow-xs">
            <div className="text-base sm:text-lg leading-none">{String(dealCountdown.minutes).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase font-bold tracking-wider mt-0.5">Minutes</div>
          </div>
          <div className="w-14 sm:w-16 py-1.5 rounded-lg bg-[#fdbd10] text-slate-900 font-extrabold text-center shadow-xs">
            <div className="text-base sm:text-lg leading-none">{String(dealCountdown.seconds).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase font-bold tracking-wider mt-0.5">Seconds</div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. FLOOR POLISHING ROW (Badge: Shine Like New)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Floor Polishing
          </h2>
          <span className="text-[11px] font-bold text-amber-950 bg-amber-300 px-3 py-1 rounded-full">
            Shine Like New
          </span>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6">
          {FLOOR_POLISHING_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-amber-800 font-bold mt-0.5">
                {item.priceTag}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. APPLIANCE SERVICES ROW (Badge: 100+ booking Per Day)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Appliance Services
          </h2>
          <span className="text-[11px] font-bold text-purple-900 bg-purple-200 px-3 py-1 rounded-full">
            100+ booking Per Day
          </span>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {APPLIANCE_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-purple-800 font-bold mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          13. HOME REPAIR & ELECTRICIAN (Badge: Trained Team)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
            Home Repair Services
          </h2>
          <span className="text-[11px] font-bold text-orange-900 bg-orange-200 px-3 py-1 rounded-full">
            Trained Team
          </span>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6">
          {HOME_REPAIR_SERVICES.map(item => (
            <div 
              key={item.id}
              onClick={() => openBookFor(item.title)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 relative group-hover:shadow-md transition-shadow bg-slate-50">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-900 mt-2.5 px-1 leading-snug">
                {item.title}
              </div>
              <div className="text-[11px] text-blue-700 font-bold mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          14. DEDICATED SOCIAL MEDIA PAGE FOR YOUTUBE
      ───────────────────────────────────────────────────────────── */}
      <section id="youtube-hub" className="py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          
          {/* YouTube Brand Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
                <YoutubeIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    OneClick Home Services Official
                  </h2>
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">✓</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  @OneClickHomeServices • 48.5K Subscribers • 120+ Service Demonstrations
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition active:scale-95"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>

          <div className="pt-8">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Featured 4K Service Walkthroughs &amp; Guides
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Watch our verified Hyderabad crew in action before booking your doorstep service.
            </p>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {YOUTUBE_VIDEOS.map(video => (
                <div 
                  key={video.id}
                  onClick={() => setActiveVideoModal(video)}
                  className="rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/80 shadow-md hover:shadow-xl hover:border-red-500/50 transition cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="inline-block text-[10px] font-bold text-red-400 uppercase tracking-wider">
                      {video.category}
                    </span>
                    <h4 className="font-bold text-sm text-white group-hover:text-red-400 line-clamp-2 transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                      <span>{video.views}</span>
                      <span className="text-red-400 font-bold flex items-center gap-1 group-hover:underline">
                        Watch Video <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          14.5. DEDICATED INSTAGRAM SOCIAL SPACE (#instagram-space)
      ───────────────────────────────────────────────────────────── */}
      <section id="instagram-space" className="py-14 bg-gradient-to-b from-[#111111] via-[#16181D] to-[#0D0E12] text-white border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          
          {/* Instagram Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg shadow-pink-600/25 shrink-0">
                <InstagramIcon className="w-8 h-8 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    @OneClickHomeServices
                  </h3>
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">✓</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400">
                  38.4K Followers • 450+ Real Transformation Posts • Hyderabad Doorstep Services
                </p>
              </div>
            </div>

            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition active:scale-95"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  Trending Instagram Reels &amp; Transformations
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Watch 15-second real work before &amp; after stories from homes across Hyderabad.
                </p>
              </div>
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-pink-400 hover:text-pink-300 transition"
              >
                View all reels on Instagram <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 4 Vertical Instagram Reels Grid (9:16 Aspect Ratio) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  id: 'reel-hs-1',
                  title: 'Full 3BHK Living Room & Kitchen Deep Cleaning Reveal ✨',
                  views: '145K Views',
                  locationTag: 'Gachibowli Flat • Hyderabad',
                  img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
                },
                {
                  id: 'reel-hs-2',
                  title: 'AC Jet Foam Coil Wash & Instant Chilling Demo ❄️',
                  views: '88K Views',
                  locationTag: 'Jubilee Hills Villa • Hyderabad',
                  img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
                },
                {
                  id: 'reel-hs-3',
                  title: 'Waterproof Wall Texture & Asian Paints Royal Sheen 🎨',
                  views: '110K Views',
                  locationTag: 'Banjara Hills • Hyderabad',
                  img: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80'
                },
                {
                  id: 'reel-hs-4',
                  title: 'Emergency Short Circuit & MCB Panel Restoration ⚡',
                  views: '75K Views',
                  locationTag: 'HITEC City • Hyderabad',
                  img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                }
              ].map(reel => (
                <a
                  key={reel.id}
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 border border-slate-700/80 shadow-md hover:shadow-2xl transition-all cursor-pointer"
                >
                  <img 
                    src={reel.img} 
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Views Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1 font-medium">
                    <InstagramIcon className="w-3 h-3 text-pink-400" />
                    <span>{reel.views}</span>
                  </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <div className="text-[10px] text-pink-300 font-semibold">{reel.locationTag}</div>
                    <h5 className="text-xs font-bold line-clamp-2 mt-0.5 leading-snug">{reel.title}</h5>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          15. HYDERABAD LOCALITIES SERVED CHIPS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-8 max-w-[1440px] mx-auto px-4 sm:px-8 border-t border-slate-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
          Serving All Key Localities Across Hyderabad:
        </h3>
        <div className="flex flex-wrap gap-2">
          {HYDERABAD_LOCALITIES.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedCity(loc); openBookFor(`Service in ${loc}`); }}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-medium transition cursor-pointer"
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          16. REQUIRED LANDING PAGE FOOTER NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] text-stone-300 py-14 sm:py-16 border-t border-stone-800 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Main Landing Page Header & Navigation */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-stone-800">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-lg text-white tracking-tight uppercase">
                  {companyName}
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Hyderabad's trusted doorstep maintenance platform • Certified electrical, cleaning, painting, AC &amp; emergency repairs.
              </p>
            </div>

            {/* ONLY REQUIRED FOOTER NAVIGATION LINKS */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wider text-stone-300">
              <a href="#cleaning-section" className="hover:text-blue-400 transition">CLEANING</a>
              <a href="#painting-section" className="hover:text-blue-400 transition">PAINTING</a>
              <a href="#pest-section" className="hover:text-blue-400 transition">PEST CONTROL</a>
              <a href="#movers-section" className="hover:text-blue-400 transition">PACKERS &amp; MOVERS</a>
              <a href="#youtube-hub" className="hover:text-red-400 transition">VIDEOS</a>
              <a href="#instagram-space" className="hover:text-pink-400 transition">INSTAGRAM</a>
              <button 
                onClick={() => openBookFor('Quick Booking')} 
                className="hover:text-amber-400 transition cursor-pointer text-left uppercase"
              >
                BOOK NOW
              </button>
              <a href={`tel:${cleanCallNumber}`} className="hover:text-emerald-400 transition">
                CONTACT US
              </a>
            </div>
          </div>

          {/* Bottom Copyright & Direct Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p className="text-center sm:text-left">
              &copy; 2026 • {companyName} • All Rights Reserved
            </p>
            
            {/* Direct Social Channels */}
            <div className="flex items-center gap-5 text-xs font-semibold text-stone-300">
              <a 
                href={`https://wa.me/${cleanWa}`} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-400 flex items-center gap-1 transition"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a 
                href={instagramLink} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-pink-400 flex items-center gap-1 transition"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-red-400 flex items-center gap-1 transition"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-red-400" />
                <span>YouTube</span>
              </a>
              <a 
                href={`tel:${cleanCallNumber}`}
                className="hover:text-white flex items-center gap-1 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cleanPhone}</span>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          17. FIXED BOTTOM MOBILE ACTION BAR (Seamless Thumb Actions)
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:hidden flex items-center justify-around shadow-2xl">
        <a 
          href={`tel:${cleanCallNumber}`}
          className="flex flex-col items-center gap-0.5 text-slate-700 active:text-emerald-600"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Phone className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-[10px] font-bold">Call</span>
        </a>

        <a 
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services, I need to book a service.')}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-0.5 text-slate-700 active:text-emerald-600"
        >
          <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
            <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        <a 
          href="#youtube-hub"
          className="flex flex-col items-center gap-0.5 text-slate-700 active:text-red-600"
        >
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
            <YoutubeIcon className="w-4 h-4 fill-white text-white" />
          </div>
          <span className="text-[10px] font-bold">Videos</span>
        </a>

        <button 
          onClick={() => openBookFor('Emergency Doorstep Service')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Book Now</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          18. INSTANT BOOKING MODAL (Desktop & Mobile Bottom Sheet)
      ───────────────────────────────────────────────────────────── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Book Doorstep Service
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    60-Minute Arrival Guarantee Across Hyderabad
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Booking Confirmed!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Technician assigned for <span className="font-bold text-slate-900">{bookingForm.service}</span> in {bookingForm.locality}. You will receive a WhatsApp confirmation and dispatch tracking link shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Selected Service
                  </label>
                  <input 
                    type="text" 
                    value={bookingForm.service}
                    onChange={e => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sridhar Rao"
                      value={bookingForm.name}
                      onChange={e => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      WhatsApp / Phone
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Hyderabad Locality
                    </label>
                    <select
                      value={bookingForm.locality}
                      onChange={e => setBookingForm({ ...bookingForm, locality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:border-blue-600 transition"
                    >
                      {HYDERABAD_LOCALITIES.map((loc, i) => (
                        <option key={i} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input 
                      type="date"
                      value={bookingForm.date}
                      onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Arrival Priority Slot
                  </label>
                  <select
                    value={bookingForm.timeSlot}
                    onChange={e => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:border-blue-600 transition"
                  >
                    <option value="⚡ Emergency (Arrive within 60 mins)">⚡ Emergency (Arrive within 60 mins)</option>
                    <option value="🌅 Morning Slot (08:00 AM - 12:00 PM)">🌅 Morning Slot (08:00 AM - 12:00 PM)</option>
                    <option value="☀️ Afternoon Slot (12:00 PM - 04:00 PM)">☀️ Afternoon Slot (12:00 PM - 04:00 PM)</option>
                    <option value="🌆 Evening Slot (04:00 PM - 08:00 PM)">🌆 Evening Slot (04:00 PM - 08:00 PM)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/25 transition active:scale-95 cursor-pointer"
                  >
                    Confirm &amp; Dispatch Expert
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    🔒 No advance payment needed • Pay after inspection &amp; satisfaction
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          19. YOUTUBE VIDEO PLAYER LIGHTBOX MODAL
      ───────────────────────────────────────────────────────────── */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-600" />
                <h4 className="text-sm font-bold text-white truncate max-w-md">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button 
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded YouTube Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900">
              <div>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                  {activeVideoModal.description}
                </p>
                <div className="text-[11px] text-slate-500 mt-1">
                  Category: <span className="text-white font-bold">{activeVideoModal.category}</span> • {activeVideoModal.views}
                </div>
              </div>

              <button
                onClick={() => {
                  const srv = activeVideoModal.category;
                  setActiveVideoModal(null);
                  openBookFor(srv);
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shrink-0 transition"
              >
                Book This Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
