'use client';

import React, { useState, useMemo } from 'react';
import { 
  DigitalProfile, 
  ProductItem, 
  ServiceItem, 
  TestimonialItem,
  VideoItem 
} from '@/lib/types';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Gem, 
  CheckCircle2, 
  Heart, 
  ShoppingBag, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Share2, 
  RotateCcw, 
  Truck, 
  Percent, 
  Search, 
  X, 
  SlidersHorizontal, 
  Video, 
  Eye, 
  Check, 
  Menu,
  ExternalLink,
  Play,
  Download,
  Compass,
  Zap,
  MessageCircle
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

// Clean SVG Brand Icons matching the interior design system
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

// 8 Popular Diamond Shapes with descriptions, ratios, and real human wearing imagery
const DIAMOND_SHAPES = [
  {
    id: 'round',
    name: 'Round Brilliant',
    facets: '57 Facets',
    sparkle: 'Maximum Scintillation & Fire',
    ratio: '1.00 : 1.00',
    description: 'The timeless classic engineered with optical symmetry. Reflects 99.8% of incoming light for unmatched sparkle.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M12 2L2 9l3 11h14l3-11L12 2zm0 3.2L18.4 9H5.6L12 5.2zM7.5 10.5h9l-4.5 7.5-4.5-7.5z'
  },
  {
    id: 'oval',
    name: 'Oval Cut',
    facets: '58 Facets',
    sparkle: 'Finger-Elongating Elegance',
    ratio: '1.35 : 1.50',
    description: 'Combines the intense fire of a round cut with a flattering elliptical shape that elongates the hand beautifully.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M12 2C7 2 4 6.5 4 12s3 10 8 10 8-4.5 8-10-3-10-8-10zm0 2.5c3.5 0 5.5 3.5 5.5 7.5s-2 7.5-5.5 7.5S6.5 16 6.5 12 8.5 4.5 12 4.5z'
  },
  {
    id: 'emerald',
    name: 'Emerald Cut',
    facets: '50 Facets',
    sparkle: 'Hall-of-Mirrors Step Cut',
    ratio: '1.40 : 1.55',
    description: 'Art Deco royalty. Rectangular step-cut facets highlight crystalline optical purity and structural sophistication.',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M6 3h12l4 4v10l-4 4H6l-4-4V7l4-4zm1.5 2.5L4.5 8v8l3 2.5h9l3-2.5V8L16.5 5.5h-9z'
  },
  {
    id: 'pear',
    name: 'Pear Cut',
    facets: '58 Facets',
    sparkle: 'Teardrop Silhouette Elegance',
    ratio: '1.50 : 1.70',
    description: 'Poetic teardrop silhouette pairing the brilliant facets of a round cut with a graceful tapered tip.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M12 2s-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13zm0 4.2c2.8 3.5 4.5 7.2 4.5 10.8a4.5 4.5 0 0 1-9 0c0-3.6 1.7-7.3 4.5-10.8z'
  },
  {
    id: 'radiant',
    name: 'Radiant Cut',
    facets: '70 Facets',
    sparkle: 'Fiery Scintillating Modernism',
    ratio: '1.15 : 1.30',
    description: 'A cropped-corner octagonal diamond engineered with 70 brilliant facets for deep, high-voltage dispersion.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M6 2h12l4 4v12l-4 4H6l-4-4V6l4-4zm1.5 2L4 7.5v9L7.5 20h9l3.5-3.5v-9L16.5 4h-9z'
  },
  {
    id: 'princess',
    name: 'Princess Cut',
    facets: '76 Facets',
    sparkle: 'Contemporary Sharp Geometry',
    ratio: '1.00 : 1.05',
    description: 'Iconic square solitaire cut with inverted pyramid facets that shoot blinding light out from every angle.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M3 3h18v18H3V3zm2.5 2.5v13h13v-13h-13zM12 7l4 5-4 5-4-5 4-5z'
  },
  {
    id: 'marquise',
    name: 'Marquise Cut',
    facets: '58 Facets',
    sparkle: 'Regal French Crown Presence',
    ratio: '1.85 : 2.10',
    description: 'Commissioned by King Louis XV of France, this elliptical shape with pointed ends creates an imperial visual presence.',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M12 2C7 7 2 12 2 12s5 5 10 10c5-5 10-10 10-10s-5-5-10-10zm0 3.5c3.5 3.5 6.5 6.5 6.5 6.5S15.5 15.5 12 18.5c-3.5-3-6.5-6.5-6.5-6.5S8.5 8.5 12 5.5z'
  },
  {
    id: 'heart',
    name: 'Heart Cut',
    facets: '59 Facets',
    sparkle: 'The Master Romantic Solitaire',
    ratio: '1.00 : 1.00',
    description: 'Requires master lapidary craftsmanship to balance cleft depth, wing symmetry, and exquisite central fire.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  }
];

// Curated Mock Fine Lab Diamond Products - ALL WITH REAL HUMANS WEARING THE JEWELLERY
const MOCK_JEWELLERY_PRODUCTS = [
  {
    id: 'jb-1',
    name: 'Toi Et Moi Emerald & Pear Solitaire Ring',
    category: 'Solitaire Rings',
    shape: 'emerald',
    carat: '1.45 Ct VVS2-E',
    metal: '18Kt Yellow Gold',
    price: 47067,
    mrp: 56300,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80',
    tag: 'Bestseller',
    description: 'Iconic dual solitaire celebration ring featuring an emerald step-cut paired seamlessly with a sparkling teardrop pear diamond.',
    specs: { cut: 'Ideal', color: 'E', clarity: 'VVS2', certification: 'IGI Certified (Laser Inscribed)' }
  },
  {
    id: 'jb-2',
    name: 'The Sovereign Round Brilliant Solitaire Ring',
    category: 'Solitaire Rings',
    shape: 'round',
    carat: '1.05 Ct VVS1-D',
    metal: '18Kt White Gold',
    price: 38450,
    mrp: 45900,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80',
    tag: 'Classic',
    description: 'Six-prong platinum claw setting embracing an exquisite D-color colorless round brilliant solitaire with micro-pave diamond band.',
    specs: { cut: 'Hearts & Arrows Ideal', color: 'D', clarity: 'VVS1', certification: 'IGI & GIA Certified' }
  },
  {
    id: 'jb-3',
    name: 'Seraphine Double-Row Diamond Tennis Bracelet',
    category: 'Bracelets',
    shape: 'round',
    carat: '3.60 Ct Total Weight',
    metal: '18Kt Rose Gold',
    price: 60518,
    mrp: 69881,
    discountPercent: 13,
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=700&q=80',
    tag: 'Red Carpet',
    description: 'Continuous ribbon of hand-selected lab-grown diamonds set in four-prong flexible articulated links with double safety catch.',
    specs: { cut: 'Excellent', color: 'EF', clarity: 'VVS-VS', certification: 'SGL Certified & Hallmarked' }
  },
  {
    id: 'jb-4',
    name: 'Celestial Oval Solitaire Diamond Pendant',
    category: 'Pendants',
    shape: 'oval',
    carat: '1.20 Ct VVS2-F',
    metal: '18Kt Yellow Gold',
    price: 27408,
    mrp: 32507,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80',
    tag: 'Trending',
    description: 'An elongated oval brilliant diamond suspended from a delicate cable chain in warm 18Kt yellow gold with hidden diamond halo.',
    specs: { cut: 'Ideal', color: 'F', clarity: 'VVS2', certification: 'IGI Certified' }
  },
  {
    id: 'jb-5',
    name: 'OneClick Lotus Bloom Diamond Sui Dhaga Earrings',
    category: 'Earrings',
    shape: 'pear',
    carat: '0.85 Ct Total Weight',
    metal: '14Kt Yellow Gold',
    price: 18533,
    mrp: 21920,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=80',
    tag: 'Daily Luxe',
    description: 'Featherweight threader earrings featuring graduated teardrop diamonds that dance with natural light and movement.',
    specs: { cut: 'Very Good', color: 'G', clarity: 'VS1', certification: 'BIS Hallmarked Gold' }
  },
  {
    id: 'jb-6',
    name: 'Aura Radiant Cut Solitaire Diamond Ring',
    category: 'Solitaire Rings',
    shape: 'radiant',
    carat: '2.00 Ct VVS1-E',
    metal: '18Kt White Gold',
    price: 68900,
    mrp: 82500,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=80',
    tag: 'Grand Solitaire',
    description: 'Spectacular 2-carat radiant solitaire with 70 brilliant facets mounted on a sleek 2mm comfort-fit solid gold shank.',
    specs: { cut: 'Ideal', color: 'E', clarity: 'VVS1', certification: 'IGI Certified' }
  },
  {
    id: 'jb-7',
    name: 'The Royal Crown Vanki Traditional Diamond Ring',
    category: 'Solitaire Rings',
    shape: 'round',
    carat: '0.90 Ct VVS-EF',
    metal: '18Kt Yellow Gold',
    price: 25547,
    mrp: 32416,
    discountPercent: 21,
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80',
    tag: 'Heritage',
    description: 'Contemporary tribute to classic South Indian Vanki chevron silhouette set with precision pavé diamonds.',
    specs: { cut: 'Ideal', color: 'EF', clarity: 'VVS', certification: 'BIS 916 Hallmarked' }
  },
  {
    id: 'jb-8',
    name: 'Titan Bold Solitaire Platinum & Gold Band for Men',
    category: 'Men\'s Collection',
    shape: 'princess',
    carat: '0.50 Ct Princess Cut',
    metal: '18Kt Dual Gold & Platinum',
    price: 40247,
    mrp: 48900,
    discountPercent: 17,
    imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80',
    tag: 'Men\'s Bold',
    description: 'Satin-brushed 6mm architectonic band with flush tension-set princess cut lab diamond. Designed for rugged everyday wear.',
    specs: { cut: 'Princess Ideal', color: 'F', clarity: 'VS1', certification: 'IGI Certified' }
  },
  {
    id: 'jb-9',
    name: 'Duchess Margaret Oval Diamond Studs',
    category: 'Earrings',
    shape: 'oval',
    carat: '1.50 Ct Total Weight',
    metal: '18Kt White Gold',
    price: 21037,
    mrp: 25672,
    discountPercent: 18,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80',
    tag: 'Must Have',
    description: 'The definitive daily luxury stud. Secure screw-back posts with protective 4-claw baskets that sit flush against the earlobe.',
    specs: { cut: 'Excellent', color: 'E', clarity: 'VVS2', certification: 'IGI Certified' }
  },
  {
    id: 'jb-10',
    name: 'Infinite Love Diamond Mangalsutra Bracelet',
    category: 'Bracelets',
    shape: 'round',
    carat: '0.65 Ct VVS-EF',
    metal: '18Kt Yellow Gold',
    price: 27946,
    mrp: 35065,
    discountPercent: 20,
    imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80',
    tag: 'Modern Bride',
    description: 'Auspicious black onyx beads paired with a shimmering infinity diamond cluster in 18Kt gold. Sleek, symbolic, and stackable.',
    specs: { cut: 'Ideal', color: 'EF', clarity: 'VVS', certification: 'BIS Hallmarked Gold' }
  },
  {
    id: 'jb-11',
    name: 'Princess Principessa Diamond Solitaire Studs',
    category: 'Earrings',
    shape: 'princess',
    carat: '1.20 Ct Total Weight',
    metal: '18Kt Rose Gold',
    price: 51416,
    mrp: 61613,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=700&q=80',
    tag: 'Luxury Studs',
    description: 'Square princess cut solitaires nestled in polished warm rose gold four-prong bezels that reflect ambient candle light.',
    specs: { cut: 'Ideal', color: 'D', clarity: 'VVS1', certification: 'IGI Certified' }
  },
  {
    id: 'jb-12',
    name: 'Regal Empress Marquise Diamond Drop Pendant',
    category: 'Pendants',
    shape: 'marquise',
    carat: '1.30 Ct VVS2-D',
    metal: '18Kt White Gold',
    price: 39116,
    mrp: 47829,
    discountPercent: 18,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80',
    tag: 'Statement',
    description: 'An elongated marquise solitaire gracefully suspended from a diamond bail, creating dramatic neckline symmetry.',
    specs: { cut: 'Ideal', color: 'D', clarity: 'VVS2', certification: 'IGI & GIA Certified' }
  }
];

// Occasions data with humans wearing the jewellery
const OCCASIONS_DATA = [
  {
    id: 'workwear',
    title: 'Workwear Chic',
    subtitle: 'Minimal 9-to-5 Brilliance',
    desc: 'Understated solitaires, huggies, and slender tennis bracelets curated for boardrooms and daily desk elegance.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'everyday',
    title: 'Everyday Luxury',
    subtitle: 'Lightweight & Effortless',
    desc: 'Designed for daily showers, workouts, and sleep with comfortable smooth bezels and low-profile settings.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'bridal',
    title: 'Bridal & Proposals',
    subtitle: 'Ethereal Solitaire Sets',
    desc: 'Grand proposal solitaires, eternity wedding bands, and magnificent heirloom diamond chokers for your big day.',
    img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'festive',
    title: 'Festive Celebrations',
    subtitle: 'Traditional Indian Radiance',
    desc: 'Modern interpretations of heritage vanki chevron rings, chandbalis, and layered diamond necklaces.',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gifting',
    title: 'Gifts Under ₹30,000',
    subtitle: 'Tokens of Forever Love',
    desc: 'Thoughtfully priced IGI certified lab diamond jewelry in solid 14Kt gold, delivered in velvet presentation boxes.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'mens',
    title: 'Men\'s Diamond Atelier',
    subtitle: 'Bold, Architectural, Him',
    desc: 'Platinum & dual-tone gold bands, flush solitaire signets, diamond cufflinks, and heavy chain links.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80'
  }
];

// Experience Lounges
const STORE_LOUNGES = [
  {
    city: 'Mumbai',
    area: 'Bandra West (Linking Road)',
    address: 'Plot 14, Opposite National College, Linking Road, Bandra West, Mumbai 400050',
    phone: '+91 98200 45678',
    hours: '11:00 AM – 8:30 PM (All 7 Days)',
    amenities: ['Private Bridal VIP Salon', 'Ultrasonic Diamond Spa', 'Loupe Gem Inspection']
  },
  {
    city: 'Delhi NCR',
    area: 'South Extension Part II',
    address: 'E-18, Main Market, South Extension Part II, New Delhi 110049',
    phone: '+91 98110 78901',
    hours: '11:00 AM – 8:30 PM (Tuesday Closed)',
    amenities: ['Custom 3D CAD Studio', 'Expert Gemologist on Desk', 'Champagne Lounge']
  },
  {
    city: 'Bengaluru',
    area: 'Indiranagar (100 Ft Road)',
    address: '777, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    phone: '+91 98450 12345',
    hours: '10:30 AM – 8:00 PM (All 7 Days)',
    amenities: ['Interactive 4Cs Lab', 'Try-On Mirror Station', 'Complimentary Ring Sizing']
  },
  {
    city: 'Hyderabad',
    area: 'Jubilee Hills (Road No. 36)',
    address: 'Level 2, Signature Towers, Road No. 36, Jubilee Hills, Hyderabad 500033',
    phone: '+91 98765 43210',
    hours: '11:00 AM – 8:30 PM (All 7 Days)',
    amenities: ['Solitaire Vault Access', 'Bespoke Engagement Atelier', 'Valet Parking']
  }
];

// FAQs
const FAQS_LIST = [
  {
    id: 'faq-1',
    q: 'Is a lab-grown diamond a real diamond?',
    a: 'Yes, 100%. Lab-grown diamonds are real diamonds in every sense. They possess identical chemical composition (pure crystallized carbon), optical dispersion (refractive index of 2.42), and physical hardness (10/10 on the Mohs scale) as mined diamonds. The Federal Trade Commission (FTC) officially classifies lab-grown diamonds as genuine diamonds.'
  },
  {
    id: 'faq-2',
    q: 'Will a lab-grown diamond pass a diamond tester?',
    a: 'Absolutely. A thermal and electrical conductivity diamond tester identifies a lab-grown diamond as a 100% genuine diamond because its physical lattice is indistinguishable from earth-mined diamonds.'
  },
  {
    id: 'faq-3',
    q: 'Will it cloud, fade, or lose its sparkle over time?',
    a: 'Never. Diamonds are the hardest substance known to man. A lab-grown diamond will never cloud, scratch, oxidize, or lose its fire. We provide free lifetime ultrasonic cleaning at all our experience lounges.'
  },
  {
    id: 'faq-4',
    q: 'Are your diamonds and gold certified?',
    a: 'Every single solitaire above 0.30 Ct comes with an international grading certificate from IGI (International Gemological Institute) or GIA, with its unique certificate number laser-inscribed on the girdle. All gold settings are 100% BIS Hallmarked with a 6-digit HUID code.'
  },
  {
    id: 'faq-5',
    q: 'What is your lifetime buyback and exchange policy?',
    a: 'We offer an industry-leading 80% Lifetime Buyback and 100% Lifetime Exchange value on all lab-grown diamonds based on prevailing market rates, along with a 15-day no-questions-asked 100% return policy.'
  },
  {
    id: 'faq-6',
    q: 'Can I design a custom piece from a sketch or photo?',
    a: 'Yes! Share your Pinterest reference, sketch, or custom idea with our 3D CAD design atelier. Our master craftsmen create a photorealistic 3D rendering for your approval before casting in solid 14Kt or 18Kt gold in just 14–21 business days.'
  }
];

interface JewelleryMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (mode: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

export default function JewelleryMiniWebsiteView({
  profile,
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = false
}: JewelleryMiniWebsiteViewProps) {
  // Navigation & Filter States
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedShape, setSelectedShape] = useState<string>('round');
  const [activeOccasion, setActiveOccasion] = useState<string>('workwear');
  
  // Custom 3D CAD Studio Wizard State
  const [customStudio, setCustomStudio] = useState({
    type: 'Solitaire Engagement Ring',
    shape: 'Round Brilliant',
    carat: 1.0,
    metal: '18Kt Yellow Gold',
    ringSize: '12 (Indian)',
    notes: ''
  });

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<typeof MOCK_JEWELLERY_PRODUCTS[0] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // E-commerce interactive states
  const [cart, setCart] = useState<Array<{ product: typeof MOCK_JEWELLERY_PRODUCTS[0]; qty: number; metal: string }>>([
    { product: MOCK_JEWELLERY_PRODUCTS[0], qty: 1, metal: '18Kt Yellow Gold' }
  ]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set(['jb-1', 'jb-3']));
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Appointment Form
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    city: 'Mumbai',
    date: '2026-11-05',
    timeSlot: '03:00 PM – 04:30 PM',
    notes: ''
  });
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);

  // Brand Name & details
  const atelierName = 'OneClick Jewellery & Fine Jewels';
  const rawPhone = profile.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const cleanCallNumber = rawPhone.replace(/[^0-9+]/g, '') || '+919876543210';
  const cleanWa = profile.whatsapp?.replace(/\D/g, '') || (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone || '919876543210');
  const userCity = 'Mumbai, Delhi, Bengaluru & Hyderabad';

  const instagramLink = useMemo(() => {
    const raw = (profile as any).socialLinks?.instagram || (profile as any).instagram || 'https://instagram.com';
    if (!raw) return 'https://instagram.com';
    if (raw.startsWith('http')) return raw;
    return `https://instagram.com/${raw.replace('@', '').trim()}`;
  }, [profile]);

  const facebookLink = useMemo(() => {
    const raw = (profile as any).socialLinks?.facebook || (profile as any).facebook || 'https://facebook.com';
    if (!raw) return 'https://facebook.com';
    if (raw.startsWith('http')) return raw;
    return `https://facebook.com/${raw.replace('@', '').trim()}`;
  }, [profile]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('OneClick Jewellery Atelier Linking Road Bandra West Mumbai')}`;
  const emailUrl = `mailto:${profile.email || 'concierge@oneclick.jewellerydiamonds.com'}?subject=${encodeURIComponent('Inquiry from OneClick Jewellery Digital Boutique')}`;

  // Smooth scroll helper ensuring mobile menu closes
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // vCard download helper for SAVE CONTACT squircle
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:OneClick Jewellery & Fine Jewels
ORG:OneClick Jewellery Atelier
TITLE:Conscious Lab-Grown Diamonds & Fine Gold Jewellery
TEL;TYPE=WORK,VOICE:+919876543210
TEL;TYPE=CELL,VOICE:+919876543210
EMAIL:concierge@oneclick.jewellerydiamonds.com
URL:https://oneclickjewellery.com
ADR;TYPE=WORK:;;Bandra West;Mumbai;Maharashtra;400050;India
NOTE:IGI & GIA Certified Lab-Grown Diamonds • BIS Hallmarked 18Kt Gold • 80% Buyback
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OneClick_Jewellery.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return MOCK_JEWELLERY_PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'all' || 
        (activeCategory === 'rings' && p.category.includes('Rings')) ||
        (activeCategory === 'earrings' && p.category === 'Earrings') ||
        (activeCategory === 'pendants' && p.category === 'Pendants') ||
        (activeCategory === 'bracelets' && p.category === 'Bracelets') ||
        (activeCategory === 'mens' && p.category === "Men's Collection");
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shape.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  }, [cart]);
  const cartDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = cartSubtotal - cartDiscount;

  // Custom Studio Estimated Price
  const estimatedCustomPrice = useMemo(() => {
    const baseCaratRate = customStudio.shape === 'Round Brilliant' ? 24000 : 26500;
    const goldRate = customStudio.metal.includes('18Kt') ? 18500 : 14200;
    return Math.round((baseCaratRate * customStudio.carat) + goldRate);
  }, [customStudio]);

  // Wishlist Toggle
  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Add to Cart
  const addToCart = (product: typeof MOCK_JEWELLERY_PRODUCTS[0], metal = '18Kt Gold') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1, metal }];
    });
    setIsCartOpen(true);
  };

  // WhatsApp Order
  const handleWhatsAppCheckout = () => {
    const itemsText = cart.map(i => `• ${i.product.name} (Qty: ${i.qty}, Metal: ${i.metal}) - ₹${(i.product.price * i.qty).toLocaleString('en-IN')}`).join('\n');
    const msg = `✨ *ONECLICK JEWELLERY - ORDER INQUIRY*\n\nHello Concierge, I would like to place an order for:\n\n${itemsText}\n\n*Total Value:* ₹${cartTotal.toLocaleString('en-IN')}\n*Insured Delivery:* Complimentary Express\n\nPlease confirm availability and payment link. Thank you!`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // WhatsApp Custom Design Request
  const handleCustomWhatsAppRequest = () => {
    const msg = `💎 *BESPOKE 3D CAD JEWELLERY REQUEST*\n\n*Type:* ${customStudio.type}\n*Diamond Shape:* ${customStudio.shape}\n*Solitaire Carat:* ${customStudio.carat} Ct\n*Metal Choice:* ${customStudio.metal}\n*Ring Size:* ${customStudio.ringSize}\n*Est. Budget:* ₹${estimatedCustomPrice.toLocaleString('en-IN')}\n\nHello Atelier, please share initial 3D CAD sketches and diamond specifications.`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#FAF8F5] text-[#1A1D20] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-black">
      
      {/* 1. TOP LUXURY ANNOUNCEMENT TICKER */}
      <div className="bg-[#14171A] text-stone-200 text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E6CA65] text-[10px] font-semibold tracking-wider uppercase border border-[#D4AF37]/30">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Conscious Luxury
            </span>
            <span className="text-stone-300 text-[11px] sm:text-xs">
              IGI & GIA Certified Lab-Grown Diamonds • BIS 14K/18K Hallmarked • 80% Lifetime Buyback • 15-Day Free Returns
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Live Gold (18K): <strong className="text-amber-200">₹6,480/g</strong>
            </span>
            <button onClick={() => scrollToSection('stores')} className="hover:text-amber-200 transition-colors cursor-pointer">
              Experience Lounges
            </button>
            <span className="text-stone-700">|</span>
            <a 
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Jewellery Concierge, I would like assistance with jewellery selection.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" /> Concierge
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN LUXURY STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Left: Mobile Menu Trigger & Brand Name */}
            <div className="flex items-center gap-2 sm:gap-6 min-w-0">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/50 cursor-pointer shrink-0"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-800" />}
              </button>

              <button onClick={() => scrollToSection('home')} className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full bg-gradient-to-tr from-[#9B7824] via-[#D4AF37] to-[#F3E8D0] p-[1.5px] shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#14171A] flex items-center justify-center">
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#F3E8D0] tracking-wider">1C</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-sm sm:text-2xl font-bold tracking-[0.08em] sm:tracking-[0.18em] text-[#14171A] uppercase truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
                    ONECLICK JEWELLERY
                  </div>
                  <div className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] text-[#9B7824] uppercase font-medium truncate">
                    Lab Diamonds & Fine Jewels
                  </div>
                </div>
              </button>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[12px] xl:text-[13px] tracking-wider uppercase font-medium text-stone-700">
              <button onClick={() => scrollToSection('bestsellers')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Bestsellers</button>
              <button onClick={() => scrollToSection('shapes')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Shop By Shape</button>
              <button onClick={() => scrollToSection('custom-studio')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Bespoke 3D CAD</button>
              <button onClick={() => scrollToSection('occasions')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Occasions</button>
              <button onClick={() => scrollToSection('social')} className="hover:text-[#9B7824] transition-colors py-1 text-[#C5A059] font-bold cursor-pointer">Lookbook Reels</button>
              <button onClick={() => scrollToSection('why-lab')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Why Lab Diamonds</button>
              <button onClick={() => scrollToSection('stores')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Lounges</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-[#9B7824] transition-colors py-1 cursor-pointer">Reviews</button>
            </nav>

            {/* Right: Quick Action Icons */}
            <div className="flex items-center gap-1 sm:gap-4 shrink-0">
              
              {/* Wishlist */}
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-stone-700" />
                {wishlist.size > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B38728] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.size}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-stone-700" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#14171A] text-amber-200 text-[10px] font-bold flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.qty, 0)}
                  </span>
                )}
              </button>

              {/* Book Appointment CTA */}
              <button 
                onClick={() => setIsAppointmentModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#14171A] hover:bg-[#252a30] text-[#F3E8D0] text-xs font-medium tracking-wider uppercase shadow-md shadow-black/10 hover:shadow-black/20 transition-all border border-[#D4AF37]/40 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Book Lounge Visit</span>
              </button>

              {/* Share */}
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors cursor-pointer"
                title="Share Boutique"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-300 px-4 sm:px-6 py-5 space-y-3 shadow-xl">
            <nav className="flex flex-col space-y-1.5 text-xs sm:text-sm tracking-wider uppercase font-medium text-stone-800">
              <button onClick={() => scrollToSection('bestsellers')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Bestsellers</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('shapes')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Shop By Diamond Shape</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('custom-studio')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Custom 3D CAD Studio</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('occasions')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Shop By Occasion</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('social')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between text-[#9B7824] font-bold">
                <span>Social Lookbook Reels</span>
                <ChevronRight className="w-4 h-4 text-[#9B7824]" />
              </button>
              <button onClick={() => scrollToSection('why-lab')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Why Lab-Grown Diamonds</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('stores')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Experience Lounges</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('reviews')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Customer Reviews</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
              <button onClick={() => scrollToSection('faqs')} className="py-2 px-3 rounded-lg hover:bg-stone-100 text-left cursor-pointer transition-colors flex items-center justify-between">
                <span>Certifications & FAQs</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </nav>
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsAppointmentModalOpen(true); }}
                className="w-full py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase text-center cursor-pointer shadow-sm"
              >
                Book Private Lounge Viewing
              </button>
              <a 
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Jewellery, I would like to consult with a jewellery specialist.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full border border-emerald-600 text-emerald-800 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" /> WhatsApp Stylist Desk
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - WITH EXACT 9 APP-STYLE CONTACT SQUIRCLES */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] pt-6 sm:pt-12 pb-12 sm:pb-20">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-24 right-10 w-[550px] h-[550px] bg-[#C5A880]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-3 sm:space-y-4">
            
            {/* Atelier Avatar / Logo - Wearing Diamond Jewellery */}
            <div className="flex justify-center pt-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center p-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
                  alt="OneClick Jewellery Atelier" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Top Verification Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#C5A880]/40 text-[#8C6D46] text-[11px] sm:text-xs font-bold shadow-xs max-w-[94vw]">
              <Award className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
              <span className="truncate">IGI & GIA Certified Lab Diamonds • BIS 14K & 18K Hallmarked</span>
            </div>

            {/* Main Architectural Headline */}
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-stone-900 tracking-tight leading-[1.18]">
              Where Timeless Brilliance Meets{' '}
              <span className="text-[#8C6D46] block sm:inline font-bold">
                Conscious Luxury.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="font-sans text-xs xs:text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed px-2">
              OneClick Jewellery crafts IGI & GIA certified lab-grown diamond solitaires, bridal jewels, and everyday gold essentials in Mumbai, Delhi, Bengaluru &amp; Hyderabad with 100% optical brilliance, flat 80% lifetime buyback, and zero environmental mining footprint.
            </p>

            {/* Studio Location Strip */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold shadow-xs max-w-[94vw]">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D46] shrink-0" />
                <span className="truncate">Bandra, Mumbai • South Ex, Delhi • Indiranagar, Bengaluru • Jubilee Hills, Hyderabad</span>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                HERO APP-STYLE CONTACT SQUIRCLES (Exact 9 Squircles Like Interior)
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-3 sm:pt-5 pb-3 w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-3 sm:gap-4 w-max lg:w-auto px-4 lg:px-0 lg:mx-auto">
                
                {/* 1. CALL */}
                <a
                  href={`tel:${cleanCallNumber}`}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    CALL
                  </span>
                </a>

                {/* 2. WHATSAPP */}
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Jewellery Atelier, I would like to inquire about IGI certified lab diamond jewellery.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    INSTAGRAM
                  </span>
                </a>

                {/* 4. FACEBOOK */}
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <FacebookIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    FACEBOOK
                  </span>
                </a>

                {/* 5. LOOKBOOK */}
                <a
                  href="#bestsellers"
                  onClick={(e) => { e.preventDefault(); scrollToSection('bestsellers'); }}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#8B5CF6] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    LOOKBOOK
                  </span>
                </a>

                {/* 6. DIRECTIONS */}
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    DIRECTIONS
                  </span>
                </a>

                {/* 7. EMAIL */}
                <a
                  href={emailUrl}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#EF4444] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    EMAIL
                  </span>
                </a>

                {/* 8. SAVE VCARD */}
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Download className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    SAVE VCARD
                  </span>
                </button>

                {/* 9. SHARE */}
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Share2 className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 group-hover:text-[#8C6D46] transition-colors whitespace-nowrap">
                    SHARE
                  </span>
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Trust Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/70 shadow-sm">
            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-amber-50 text-[#9B7824] shrink-0">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">100% Real Lab Diamonds</h4>
                <p className="text-[11px] text-stone-500">Optically, physically &amp; chemically identical</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">IGI &amp; GIA Certified</h4>
                <p className="text-[11px] text-stone-500">Laser inscribed report on diamond girdle</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">80% Buyback &amp; 100% Exchange</h4>
                <p className="text-[11px] text-stone-500">Guaranteed lifetime value protection</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">15-Day Free Returns</h4>
                <p className="text-[11px] text-stone-500">100% insured pan-India doorstep delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY CATEGORY PILLS / ROUNDELS - WITH HUMANS WEARING JEWELLERY */}
      <section className="py-12 bg-white border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Boutique Categories</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-1">Discover Handcrafted Fine Jewellery</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">Curated lab diamond silhouettes styled and worn on hands, wrists, and necklines.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { id: 'rings', name: 'Solitaire Rings', count: '1,420+ Designs', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80' },
              { id: 'earrings', name: 'Diamond Earrings', count: '890+ Designs', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80' },
              { id: 'pendants', name: 'Solitaire Pendants', count: '650+ Designs', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80' },
              { id: 'bracelets', name: 'Tennis Bracelets', count: '320+ Designs', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=500&q=80' },
              { id: 'all', name: 'Modern Mangalsutras', count: '240+ Designs', img: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=500&q=80' },
              { id: 'mens', name: 'Men\'s Diamond Bands', count: '180+ Designs', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=500&q=80' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollToSection('bestsellers');
                }}
                className={`group p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'border-[#9B7824] bg-amber-50/50 shadow-md ring-1 ring-[#D4AF37]/50' 
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-stone-100 mb-2.5">
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="font-serif text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-[#9B7824] transition-colors">{cat.name}</div>
                <div className="text-[10px] text-stone-500">{cat.count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY DIAMOND SHAPE */}
      <section id="shapes" className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Cut &amp; Silhouette</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Shop By Diamond Shape</h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Every diamond shape tells a different love story. Select a cut to inspect its proportions, facet architecture, and optical fire on hands.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Selected Shape:</span>
              <span className="px-3 py-1 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold uppercase tracking-wider">
                {DIAMOND_SHAPES.find(s => s.id === selectedShape)?.name}
              </span>
            </div>
          </div>

          {/* Shape Selector Bar */}
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-10">
            {DIAMOND_SHAPES.map(shape => {
              const isSelected = selectedShape === shape.id;
              return (
                <button
                  key={shape.id}
                  onClick={() => setSelectedShape(shape.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#14171A] text-white border-[#14171A] shadow-lg shadow-black/10 scale-102' 
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:bg-amber-50/30'
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 mb-2 flex items-center justify-center ${isSelected ? 'text-[#D4AF37]' : 'text-stone-700'}`}>
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                      <path d={shape.svgPath} />
                    </svg>
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium tracking-tight leading-tight">{shape.name.split(' ')[0]}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-amber-200/80' : 'text-stone-400'}`}>{shape.facets}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Spotlight of Selected Shape - With Human Wearing Photo */}
          {(() => {
            const current = DIAMOND_SHAPES.find(s => s.id === selectedShape) || DIAMOND_SHAPES[0];
            return (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img 
                      src={current.image} 
                      alt={current.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute top-3 left-3 bg-[#14171A]/85 backdrop-blur-md px-3 py-1 rounded-full text-amber-200 text-xs font-semibold">
                    {current.sparkle}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-[#9B7824] text-xs font-bold border border-amber-200/70">
                    Facet Architecture: {current.facets}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">{current.name} Solitaire</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{current.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Standard Length/Width Ratio</span>
                      <strong className="text-xs sm:text-sm text-stone-800">{current.ratio}</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Available Carat Range</span>
                      <strong className="text-xs sm:text-sm text-stone-800">0.50 Ct to 5.00 Ct</strong>
                    </div>
                    <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/60 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Solitaire Clarity</span>
                      <strong className="text-xs sm:text-sm text-emerald-700">VVS1 – VS2 Eye-Clean</strong>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setCustomStudio(prev => ({ ...prev, shape: current.name }));
                        scrollToSection('custom-studio');
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <span>Customize in {current.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi OneClick Jewellery Concierge, I am looking for a loose lab diamond in ${current.name} shape (1.0 to 2.0 Carat). Could you share certified options?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-800 text-xs font-semibold tracking-wider uppercase hover:bg-stone-50 flex items-center gap-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>Request Loose Solitaires</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* 6. BESTSELLERS SHOWCASE WITH DYNAMIC FILTER TABS */}
      <section id="bestsellers" className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Most Cherished</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Our Bestsellers</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Real jewellery worn by patrons, loved for immaculate cut quality and everyday wearability.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'rings', label: 'Rings' },
                { id: 'earrings', label: 'Earrings' },
                { id: 'pendants', label: 'Pendants' },
                { id: 'bracelets', label: 'Bracelets' },
                { id: 'mens', label: 'Men\'s' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#14171A] text-amber-200 shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.has(product.id);
              return (
                <div 
                  key={product.id}
                  className="group bg-[#FAF8F5] rounded-xl sm:rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-amber-300/80 transition-all duration-300"
                >
                  {/* Top Image Container - Human Wearing */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                    />

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#14171A]/90 text-amber-200 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-red-500 shadow-sm transition-colors cursor-pointer"
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Quick View Button on Desktop Hover */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden md:flex absolute bottom-3 inset-x-3 py-2 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-medium items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Quick View &amp; Specs</span>
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] text-stone-500 uppercase tracking-wider mb-1">
                        <span>{product.metal}</span>
                        <span>•</span>
                        <span className="text-[#9B7824] font-medium">{product.carat}</span>
                      </div>

                      <h3 
                        onClick={() => setQuickViewProduct(product)}
                        className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-2 hover:text-[#9B7824] cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-3 border-t border-stone-200/60 mt-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xs sm:text-base font-bold text-stone-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] sm:text-xs text-stone-400 line-through ml-1.5">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {product.discountPercent}% OFF
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          onClick={() => addToCart(product, product.metal)}
                          className="w-full py-2 rounded-lg bg-[#14171A] text-amber-200 hover:bg-stone-800 text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add</span>
                        </button>

                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi OneClick Jewellery Concierge, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')}). Could you confirm availability and customization options?`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-lg border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Enquire</span>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BESPOKE 3D CAD CUSTOM STUDIO */}
      <section id="custom-studio" className="py-16 sm:py-24 bg-gradient-to-br from-[#14171A] via-[#1E2328] to-[#14171A] text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Custom Studio Wizard */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E6CA65] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>3D CAD Bespoke Atelier</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal leading-tight">
                Share Your Vision. <br className="hidden sm:inline" />
                <span className="italic font-serif text-[#D4AF37]">We Craft Your Forever Heirlooms.</span>
              </h2>

              <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                Have a dream proposal design from Pinterest or an heirloom you wish to reimagine? Customize diamond shape, carat weight, and solid gold karatage for instant estimate and complimentary 3D CAD render.
              </p>

              {/* Wizard Form Controls */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-5">
                
                {/* Step 1: Jewellery Type */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                    1. Select Jewellery Silhouette
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Solitaire Engagement Ring', 'Eternity Wedding Band', 'Solitaire Teardrop Pendant', 'Tennis Bracelet', 'Custom Mangalsutra', 'Men\'s Signet Band'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCustomStudio(prev => ({ ...prev, type }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                          customStudio.type === type 
                            ? 'bg-[#D4AF37] text-stone-900 font-bold shadow-md' 
                            : 'bg-white/10 text-stone-300 hover:bg-white/15'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Solitaire Diamond Shape */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                    2. Diamond Cut &amp; Silhouette
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['Round Brilliant', 'Oval Cut', 'Emerald Cut', 'Pear Cut', 'Radiant Cut', 'Princess Cut'].map(shape => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setCustomStudio(prev => ({ ...prev, shape }))}
                        className={`px-2 py-2 rounded-lg text-[11px] font-medium text-center transition-all cursor-pointer ${
                          customStudio.shape === shape 
                            ? 'bg-[#D4AF37] text-stone-900 font-bold' 
                            : 'bg-white/10 text-stone-300 hover:bg-white/15'
                        }`}
                      >
                        {shape.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Carat Weight Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      3. Solitaire Carat Weight
                    </label>
                    <span className="text-amber-300 font-bold text-sm">{customStudio.carat.toFixed(2)} Carats</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.50" 
                    max="3.00" 
                    step="0.25"
                    value={customStudio.carat}
                    onChange={(e) => setCustomStudio(prev => ({ ...prev, carat: parseFloat(e.target.value) }))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>0.50 Ct</span>
                    <span>1.00 Ct</span>
                    <span>1.50 Ct</span>
                    <span>2.00 Ct</span>
                    <span>3.00 Ct</span>
                  </div>
                </div>

                {/* Step 4: Gold Karat & Tone */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
                    4. Solid Gold Karat &amp; Tone
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['18Kt Yellow Gold', '18Kt Rose Gold', '18Kt White Gold'].map(metal => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setCustomStudio(prev => ({ ...prev, metal }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-center transition-all cursor-pointer ${
                          customStudio.metal === metal 
                            ? 'bg-[#D4AF37] text-stone-900 font-bold' 
                            : 'bg-white/10 text-stone-300 hover:bg-white/15'
                        }`}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Summary Estimation & 1-Click WhatsApp CAD Request */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#22272D] border border-amber-400/30 shadow-2xl relative">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#D4AF37]" />
                </div>

                <div className="text-xs uppercase tracking-widest text-[#E6CA65] font-semibold">Instant Quote Summary</div>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">{customStudio.type}</h3>

                <div className="mt-6 space-y-3 divide-y divide-white/10 text-xs">
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-400">Selected Diamond:</span>
                    <strong className="text-stone-200">{customStudio.carat.toFixed(2)} Ct • {customStudio.shape}</strong>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-400">Metal Specification:</span>
                    <strong className="text-stone-200">{customStudio.metal} (BIS 916 Hallmarked)</strong>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-400">Certification:</span>
                    <strong className="text-emerald-400">IGI Diamond Certificate Included</strong>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-400">Turnaround Time:</span>
                    <strong className="text-stone-200">14–21 Business Days Handcrafted</strong>
                  </div>
                  <div className="flex justify-between items-baseline pt-4">
                    <span className="text-sm font-medium text-stone-300">Estimated Price:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#E6CA65]">
                        ₹{estimatedCustomPrice.toLocaleString('en-IN')}*
                      </div>
                      <div className="text-[10px] text-stone-400">Includes taxes, making &amp; IGI certification</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCustomWhatsAppRequest}
                  className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E8D0] to-[#AA771C] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-stone-950" />
                  <span>Request Free 3D CAD on WhatsApp</span>
                </button>

                <p className="text-[10px] text-stone-400 text-center mt-3">
                  Our master CAD gemologist will share multi-angle 3D renders before casting in gold.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. SHOP BY OCCASION CAROUSEL - WITH HUMANS WEARING */}
      <section id="occasions" className="py-16 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Styled For Your Life</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Shop By Occasion</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">From subtle daily desk staples to show-stopping gala chokers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCCASIONS_DATA.map(occ => (
              <div 
                key={occ.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-md hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img 
                    src={occ.img} 
                    alt={occ.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold">{occ.subtitle}</div>
                  <h3 className="font-serif text-xl font-medium mt-0.5">{occ.title}</h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2 font-light">{occ.desc}</p>
                  
                  <button 
                    onClick={() => scrollToSection('bestsellers')}
                    className="mt-3 flex items-center gap-1.5 text-xs text-amber-200 font-medium group-hover:underline cursor-pointer"
                  >
                    <span>Explore Collection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. SOCIAL MEDIA SHOWCASE - YOUTUBE TOUR & INSTAGRAM REELS (NEW FEATURE) */}
      <section id="social" className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>The Atelier On Social Media</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
                Live Diamond Sparkle &amp; Real Patron Reels
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Experience the optical fire, sunlight scintillation, and wrist stacks in motion. Join 185,000+ conscious diamond lovers across YouTube and Instagram.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow @oneclick.jewellery</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#FF0000] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 flex items-center gap-1.5"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube 4K</span>
              </a>
            </div>
          </div>

          {/* YouTube Video Feature Card */}
          <div className="rounded-3xl overflow-hidden bg-[#14171A] text-white border border-stone-800 shadow-xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              
              <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-2xl group border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85" 
                  alt="4K Diamond Atelier Craftsmanship Film"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </a>
                </div>
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <YoutubeIcon className="w-4 h-4 text-red-500" />
                  <span>4K HDR Atelier Film</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">Behind The Sparkle</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-100 leading-snug">
                  From Plasma Reactor to 2.0 Carat Solitaire Masterpiece
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                  Watch our master lapidary gemologists cut 57 mathematical facets, inspect laser inscriptions under microscope, and hand-set solid 18Kt gold prongs in our state-of-the-art studio.
                </p>

                <div className="pt-2 flex items-center gap-6 text-xs text-stone-300">
                  <div>
                    <strong className="block text-white text-base font-bold">142,500+</strong>
                    <span className="text-stone-500">Video Views</span>
                  </div>
                  <div>
                    <strong className="block text-white text-base font-bold">4.9 / 5.0</strong>
                    <span className="text-stone-500">Patron Rating</span>
                  </div>
                </div>

                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E6CA65] hover:underline pt-2"
                >
                  <span>Watch Full 12-Minute Documentary on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* 4 Vertical Instagram Reels Grid (9:16 Aspect) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 'reel-1',
                title: 'Toi Et Moi Solitaire under Direct Sunlight ☀️',
                views: '124K Views',
                model: 'Aditi on Bandra Beach',
                img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-2',
                title: 'Bridal Diamond Choker & Jhumka Styling ✨',
                views: '280K Views',
                model: 'Rhea S. Wedding Look',
                img: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-3',
                title: 'Triple Tennis Bracelet Stack on Wrist 💎',
                views: '95K Views',
                model: 'Everyday Wrist Stack',
                img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-4',
                title: 'Men’s 6mm Platinum & Solitaire Band Unboxing 🎁',
                views: '62K Views',
                model: 'Titan Collection',
                img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80'
              }
            ].map(reel => (
              <a
                key={reel.id}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-stone-900 border border-stone-200/60 shadow-md hover:shadow-2xl transition-all cursor-pointer"
              >
                <img 
                  src={reel.img} 
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1 font-medium">
                  <InstagramIcon className="w-3 h-3 text-pink-400" />
                  <span>{reel.views}</span>
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <div className="text-[10px] text-[#E6CA65] font-semibold">{reel.model}</div>
                  <h4 className="text-xs font-medium line-clamp-2 mt-0.5 leading-snug">{reel.title}</h4>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 10. WHY LAB-GROWN DIAMONDS? SCIENTIFIC COMPARISON MATRIX */}
      <section id="why-lab" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> The Science of Brilliance
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal">
              Lab-Grown vs Earth-Mined Diamonds
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              Lab diamonds are created by replicating the extreme high heat and pressure conditions of the earth's mantle inside advanced plasma reactors using diamond seeds. They are 100% pure crystallized carbon — not cubic zirconia or moissanite.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-stone-200 shadow-lg bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-[#14171A] text-white">
                    <th className="p-4 sm:p-5 font-medium uppercase tracking-wider text-[11px] text-stone-400">Parameter</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px] text-[#D4AF37] bg-white/5 border-x border-white/10">
                      OneClick Lab-Grown Diamonds
                    </th>
                    <th className="p-4 sm:p-5 font-medium uppercase tracking-wider text-[11px] text-stone-400">
                      Earth-Mined Diamonds
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80">
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Chemical Composition</td>
                    <td className="p-4 font-medium text-stone-800 bg-amber-50/30 border-x border-stone-200/60">
                      100% Carbon Crystal (C)
                    </td>
                    <td className="p-4 text-stone-600">100% Carbon Crystal (C)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Mohs Hardness</td>
                    <td className="p-4 font-medium text-stone-800 bg-amber-50/30 border-x border-stone-200/60">
                      10 / 10 (Highest in Nature)
                    </td>
                    <td className="p-4 text-stone-600">10 / 10 (Highest in Nature)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Refractive Index (Fire)</td>
                    <td className="p-4 font-medium text-stone-800 bg-amber-50/30 border-x border-stone-200/60">
                      2.42 (Identical Sparkle)
                    </td>
                    <td className="p-4 text-stone-600">2.42 (Identical Sparkle)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Diamond Tester Reaction</td>
                    <td className="p-4 font-medium text-emerald-800 bg-amber-50/30 border-x border-stone-200/60">
                      Tests 100% Positive as Diamond
                    </td>
                    <td className="p-4 text-stone-600">Tests 100% Positive as Diamond</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Certification Labs</td>
                    <td className="p-4 font-medium text-stone-800 bg-amber-50/30 border-x border-stone-200/60">
                      IGI, GIA, SGL Laser-Inscribed
                    </td>
                    <td className="p-4 text-stone-600">IGI, GIA, SGL Laser-Inscribed</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-stone-900">Environmental &amp; Mining Impact</td>
                    <td className="p-4 font-medium text-emerald-800 bg-amber-50/30 border-x border-stone-200/60">
                      Zero Earth Excavation • Conflict-Free
                    </td>
                    <td className="p-4 text-stone-600">Massive Earth Displacement &amp; Heavy Mining</td>
                  </tr>
                  <tr className="bg-amber-100/30">
                    <td className="p-4 font-bold text-stone-950">Pricing Advantage</td>
                    <td className="p-4 font-bold text-[#9B7824] bg-amber-100/50 border-x border-amber-300">
                      60% – 80% More Accessible
                    </td>
                    <td className="p-4 text-stone-500 line-through">Expensive Middlemen &amp; Mining Markups</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 11. REAL CUSTOMER STORIES & SPARKLE */}
      <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Verified Testimonials</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Real Stories. Real Sparkle.</h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">From rooftop proposals to 10th anniversary heirlooms, here is what our patrons say.</p>
            </div>
            <div className="flex items-center gap-2 text-stone-900">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <span className="text-sm font-bold">4.9 / 5.0</span>
              <span className="text-xs text-stone-500">(2,840+ Google Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'rev-1',
                name: 'Aditya & Rhea Sen',
                city: 'Bandra, Mumbai',
                item: '1.50 Ct Oval Solitaire Engagement Ring',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                text: 'I compared the diamond under a 20x loupe with my mother\'s mined solitaire. The brilliance, fire, and crisp facets on the OneClick Jewellery ring were even superior! She cried happy tears when I proposed.'
              },
              {
                id: 'rev-2',
                name: 'Dr. Varun Mathur',
                city: 'South Extension, Delhi',
                item: 'Double-Row Diamond Tennis Bracelet in 18K',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                text: 'Visited the South Ex lounge. The team explained the 4Cs with a microscope and verified the IGI laser inscription on the girdle before packing. Transparent BOQ billing with zero hidden charges.'
              },
              {
                id: 'rev-3',
                name: 'Sneha & Rohit Kulkarni',
                city: 'Jubilee Hills, Hyderabad',
                item: 'Toi Et Moi Emerald & Pear Solitaire Ring',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                text: 'Delivered in 48 hours to Hyderabad with tamper-evident insured security. The sparkle under natural sunlight is breathtaking. 100% recommend over mined diamonds!'
              }
            ].map(review => (
              <div key={review.id} className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4">"{review.text}"</p>
                </div>
                <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-amber-200" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{review.name}</h4>
                    <div className="text-[10px] text-stone-500">{review.city} • Verified Buyer</div>
                    <div className="text-[10px] text-[#9B7824] font-medium">{review.item}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. EXPERIENCE LOUNGES & WALK-IN BOOKINGS */}
      <section id="stores" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Touch &amp; Try On</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Visit Our Experience Lounges</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">Experience 6,000+ designs in person with complimentary private gemologist consultations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORE_LOUNGES.map(lounge => (
              <div key={lounge.city} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#9B7824] uppercase tracking-wider">{lounge.city}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Open Today" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{lounge.area}</h3>
                  <p className="text-xs text-stone-600 mb-3">{lounge.address}</p>
                  <div className="text-xs text-stone-500 mb-4 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{lounge.hours}</span>
                  </div>

                  <div className="space-y-1 mb-6">
                    {lounge.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-stone-200/80">
                  <button
                    onClick={() => {
                      setAppointmentForm(prev => ({ ...prev, city: lounge.city }));
                      setIsAppointmentModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    Book VIP Visit
                  </button>

                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi, I would like to visit the ${lounge.city} (${lounge.area}) lounge. Please share Google Maps location.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#9B7824]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. CERTIFICATIONS, BUYBACK & FAQS ACCORDION */}
      <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Knowledge Atelier</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">Everything you need to know about lab-grown diamonds, buyback, and certification.</p>
          </div>

          <div className="space-y-3">
            {FAQS_LIST.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-[#FAF8F5] rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-medium text-stone-900 hover:text-[#9B7824] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-full bg-stone-200/70 text-stone-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 14. LUXURY FOOTER */}
      <footer className="bg-[#14171A] text-stone-300 pt-16 pb-24 sm:pb-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
            
            {/* Brand Intro */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E8D0] p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#14171A] flex items-center justify-center font-serif font-bold text-amber-200">
                    L
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl tracking-widest text-white uppercase font-bold">ONECLICK JEWELLERY</div>
                  <div className="text-[9px] tracking-widest text-[#D4AF37] uppercase">Lab Diamonds &amp; Fine Jewels</div>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed font-light max-w-sm">
                India's premier lab-grown diamond atelier redefining modern heirlooms with 100% conflict-free carbon, BIS 916 hallmarked gold, and master precision craftsmanship.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href={`https://wa.me/${cleanWa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-emerald-950 flex items-center justify-center text-emerald-400 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-pink-950 flex items-center justify-center text-pink-400 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-red-950 flex items-center justify-center text-red-500 transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a 
                  href={`tel:${cleanPhone}`} 
                  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-amber-950 flex items-center justify-center text-amber-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Categories */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-200 mb-4">Fine Categories</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li><button onClick={() => scrollToSection('bestsellers')} className="hover:text-white transition-colors cursor-pointer text-left">Solitaire Engagement Rings</button></li>
                <li><button onClick={() => scrollToSection('bestsellers')} className="hover:text-white transition-colors cursor-pointer text-left">Diamond Tennis Bracelets</button></li>
                <li><button onClick={() => scrollToSection('bestsellers')} className="hover:text-white transition-colors cursor-pointer text-left">Sui Dhaga &amp; Stud Earrings</button></li>
                <li><button onClick={() => scrollToSection('bestsellers')} className="hover:text-white transition-colors cursor-pointer text-left">Teardrop Diamond Pendants</button></li>
                <li><button onClick={() => scrollToSection('bestsellers')} className="hover:text-white transition-colors cursor-pointer text-left">Men's Architectural Bands</button></li>
                <li><button onClick={() => scrollToSection('custom-studio')} className="hover:text-white transition-colors cursor-pointer text-left">Custom 3D CAD Creations</button></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-200 mb-4">Patron Care</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li><button onClick={() => scrollToSection('why-lab')} className="hover:text-white transition-colors cursor-pointer text-left">80% Lifetime Buyback</button></li>
                <li><button onClick={() => scrollToSection('why-lab')} className="hover:text-white transition-colors cursor-pointer text-left">15-Day Free Returns</button></li>
                <li><button onClick={() => scrollToSection('stores')} className="hover:text-white transition-colors cursor-pointer text-left">Book Private Lounge Visit</button></li>
                <li><button onClick={() => scrollToSection('faqs')} className="hover:text-white transition-colors cursor-pointer text-left">IGI Certificate Verification</button></li>
                <li><button onClick={() => scrollToSection('why-lab')} className="hover:text-white transition-colors cursor-pointer text-left">The 4Cs Diamond Guide</button></li>
                <li><button onClick={() => scrollToSection('stores')} className="hover:text-white transition-colors cursor-pointer text-left">Store Experience Locator</button></li>
              </ul>
            </div>

            {/* Col 4: Newsletter & Certification */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-200 mb-4">Private Circle</h4>
              <p className="text-xs text-stone-400 mb-3">Join our private circle for secret solitaire trunk shows and VIP launches.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-stone-800 text-[16px] sm:text-xs px-3 py-2 rounded-lg w-full text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button className="px-3 py-2 rounded-lg bg-[#D4AF37] text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 cursor-pointer">
                  Join
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-800 flex items-center gap-3">
                <div className="px-2 py-1 rounded bg-stone-800 text-[10px] text-stone-300 font-bold">IGI Certified</div>
                <div className="px-2 py-1 rounded bg-stone-800 text-[10px] text-stone-300 font-bold">GIA Graded</div>
                <div className="px-2 py-1 rounded bg-stone-800 text-[10px] text-stone-300 font-bold">BIS 916 HUID</div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <div>
              © 2026 OneClick Jewellery &amp; Fine Jewels Atelier. All rights reserved. Pure mock demonstration.
            </div>
            <div className="flex items-center gap-4">
              <span>Secure 256-Bit SSL Encrypted Checkout</span>
              <span>•</span>
              <span>No-Cost 3-Month EMI Available</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 15. STICKY MOBILE ACTION DOCK */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#14171A]/95 backdrop-blur-md border-t border-stone-800 px-4 py-2.5 flex items-center justify-around text-stone-200">
        
        <a 
          href={`tel:${cleanPhone}`} 
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider hover:text-amber-300"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call Lounge</span>
        </a>

        <a 
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Jewellery, I would like to consult with a jewellery specialist.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button 
          onClick={() => setIsAppointmentModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider hover:text-amber-300 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Book Visit</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider relative hover:text-amber-300 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          {cart.length > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-amber-400 text-stone-950 font-bold text-[9px] flex items-center justify-center">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          )}
          <span>Bag</span>
        </button>

      </div>

      {/* 16. QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-stone-200">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="aspect-square rounded-xl overflow-hidden bg-stone-100">
                <img 
                  src={quickViewProduct.imageUrl} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#9B7824] font-semibold">{quickViewProduct.category}</div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">{quickViewProduct.name}</h3>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{quickViewProduct.description}</p>

                  <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Diamond Carat &amp; Color:</span>
                      <strong className="text-stone-800">{quickViewProduct.carat}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Gold Karatage:</span>
                      <strong className="text-stone-800">{quickViewProduct.metal}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Certification:</span>
                      <strong className="text-emerald-700">{quickViewProduct.specs.certification}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-stone-900">₹{quickViewProduct.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-stone-400 line-through ml-2">₹{quickViewProduct.mrp.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save {quickViewProduct.discountPercent}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, quickViewProduct.metal);
                        setQuickViewProduct(null);
                      }}
                      className="w-full py-3 rounded-full bg-[#14171A] text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi OneClick Jewellery Concierge, I would like to order ${quickViewProduct.name} (₹${quickViewProduct.price.toLocaleString('en-IN')}). Please assist with sizing and delivery.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>Inquire Now</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 17. CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#9B7824]" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">Your Jewellery Bag ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-stone-100 cursor-pointer">
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center text-stone-500">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 mb-3" />
                  <p className="font-serif text-base text-stone-700">Your bag is currently empty.</p>
                  <p className="text-xs text-stone-400 mt-1">Explore our IGI certified solitaires and diamond essentials.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-stone-200/80 my-4 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="pt-4 first:pt-0 flex gap-3.5">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-18 h-18 rounded-lg object-cover bg-stone-100 border border-stone-200" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-xs font-semibold text-stone-900 line-clamp-1">{item.product.name}</h4>
                          <div className="text-[10px] text-stone-500">{item.metal} • {item.product.carat}</div>
                          <div className="text-xs font-bold text-stone-900 mt-1">₹{(item.product.price * item.qty).toLocaleString('en-IN')}</div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-200 rounded-md">
                            <button 
                              onClick={() => {
                                if (item.qty > 1) {
                                  setCart(cart.map(c => c.product.id === item.product.id ? { ...c, qty: c.qty - 1 } : c));
                                } else {
                                  setCart(cart.filter(c => c.product.id !== item.product.id));
                                }
                              }}
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                            >-</button>
                            <span className="px-2 text-xs font-semibold">{item.qty}</span>
                            <button 
                              onClick={() => {
                                setCart(cart.map(c => c.product.id === item.product.id ? { ...c, qty: c.qty + 1 } : c));
                              }}
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100 cursor-pointer"
                            >+</button>
                          </div>

                          <button 
                            onClick={() => setCart(cart.filter(c => c.product.id !== item.product.id))}
                            className="text-[10px] text-red-500 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-3">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. SPARKLE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-[16px] sm:text-xs border border-stone-300 rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button 
                    onClick={() => {
                      if (couponCode === 'SPARKLE10' || couponCode === 'ONECLICK10') {
                        setCouponApplied(true);
                      } else {
                        alert('Please enter valid coupon SPARKLE10 for 10% discount.');
                      }
                    }}
                    className="px-4 py-2 bg-stone-900 text-amber-200 text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponApplied && (
                  <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                    <span>Coupon SPARKLE10 Applied (-10%)</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Doorstep Shipping:</span>
                    <span className="text-emerald-700 font-semibold">FREE (100% Insured)</span>
                  </div>
                  <div className="flex justify-between font-serif text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                    <span>Total Amount:</span>
                    <span className="text-[#9B7824]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E8D0] to-[#AA771C] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-stone-950" />
                  <span>Instant 1-Click WhatsApp Checkout</span>
                </button>

                <p className="text-[10px] text-stone-400 text-center">
                  Includes IGI authenticity cards, tamper-proof packaging, and 15-day return coverage.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 18. WISHLIST MODAL */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h3 className="font-serif text-lg font-bold text-stone-900">Your Saved Favourites ({wishlist.size})</h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1 rounded-full hover:bg-stone-100 cursor-pointer">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {wishlist.size === 0 ? (
              <div className="py-12 text-center text-stone-500">
                <Heart className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                <p className="text-sm">No items in your wishlist yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {MOCK_JEWELLERY_PRODUCTS.filter(p => wishlist.has(p.id)).map(item => (
                  <div key={item.id} className="p-3 rounded-xl border border-stone-200 flex items-center gap-3 justify-between">
                    <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-stone-100" />
                    <div className="flex-1">
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                      <div className="text-[10px] text-stone-500">{item.carat} • {item.metal}</div>
                      <div className="text-xs font-bold text-stone-900">₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          addToCart(item, item.metal);
                          toggleWishlist(item.id);
                        }}
                        className="px-3 py-1 rounded bg-[#14171A] text-amber-200 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Move To Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-[10px] text-red-500 hover:underline text-center cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 19. BOOK APPOINTMENT MODAL */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-stone-200">
            <button 
              onClick={() => setIsAppointmentModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-[#9B7824] flex items-center justify-center mx-auto mb-2 border border-amber-200">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Book Private Diamond Consultation</h3>
              <p className="text-xs text-stone-500 mt-1">Enjoy complimentary Champagne viewing, diamond loupe inspection &amp; personalized sizing.</p>
            </div>

            {appointmentSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Your Appointment is Confirmed!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Our private concierge has reserved your slot for <strong>{appointmentForm.date}</strong> at our <strong>{appointmentForm.city}</strong> lounge.
                </p>
                <button
                  onClick={() => {
                    setIsAppointmentModalOpen(false);
                    setAppointmentSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setAppointmentSubmitted(true);
                }}
                className="space-y-3.5 text-xs"
              >
                <div>
                  <label className="text-stone-700 font-semibold block mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Radhika Verma"
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-[16px] sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-stone-700 font-semibold block mb-1">WhatsApp / Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98765 43210"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-[16px] sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Preferred City Lounge</label>
                    <select 
                      value={appointmentForm.city}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-[16px] sm:text-xs focus:outline-none focus:border-[#D4AF37] bg-white"
                    >
                      <option value="Mumbai">Mumbai (Bandra West)</option>
                      <option value="Delhi NCR">Delhi NCR (South Ex)</option>
                      <option value="Bengaluru">Bengaluru (Indiranagar)</option>
                      <option value="Hyderabad">Hyderabad (Jubilee Hills)</option>
                      <option value="Live Video Consultation">Live 1-on-1 Video Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-[16px] sm:text-xs focus:outline-none focus:border-[#D4AF37] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-700 font-semibold block mb-1">What are you exploring?</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2 Ct Solitaire Engagement Ring, Tennis Bracelet"
                    value={appointmentForm.notes}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-[16px] sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-full bg-[#14171A] text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Confirm Lounge Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 20. SHARE CARD MODAL */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
