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
  ExternalLink
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

// Clean inline SVGs for Brand Icons
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.772.84 2.791.84 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm9.969 5.766c0 5.503-4.478 9.98-9.969 9.98-1.748 0-3.37-.45-4.793-1.238l-5.238 1.372 1.396-5.105c-.888-1.488-1.365-3.21-1.365-5.009 0-5.503 4.478-9.98 9.969-9.98 5.491 0 10 4.477 10 9.98zm-5.467 3.513c-.22-.11-1.303-.643-1.505-.716-.202-.074-.35-.11-.498.11-.148.22-.572.716-.701.863-.129.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.093-.655-.584-1.097-1.306-1.226-1.526-.129-.22-.014-.339.096-.448.099-.099.22-.257.33-.385.11-.129.147-.22.22-.367.074-.147.037-.275-.018-.385-.055-.11-.498-1.2-.682-1.643-.179-.432-.361-.373-.498-.38-.129-.007-.276-.008-.423-.008s-.386.055-.588.275c-.202.22-.772.754-.772 1.838s.79 2.132.9 2.279c.11.147 1.554 2.373 3.765 3.327.526.227.936.363 1.256.465.528.168 1.009.144 1.389.088.423-.063 1.303-.533 1.487-1.047.184-.514.184-.954.129-1.047-.055-.092-.202-.147-.422-.257z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

// 8 Popular Diamond Shapes with descriptions and mock SVG silhouettes
const DIAMOND_SHAPES = [
  {
    id: 'round',
    name: 'Round Brilliant',
    facets: '57 Facets',
    sparkle: 'Maximum Scintillation & Fire',
    ratio: '1.00 : 1.00',
    description: 'The quintessential diamond cut engineered with mathematical precision for unbeatable brilliance.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M12 2L2 9l3 11h14l3-11L12 2zm0 3.2L18.4 9H5.6L12 5.2zM7.5 10.5h9l-4.5 7.5-4.5-7.5z'
  },
  {
    id: 'oval',
    name: 'Oval Cut',
    facets: '58 Facets',
    sparkle: 'Elongating Finger Profile',
    ratio: '1.35 : 1.50',
    description: 'Combines the classic sparkle of a round cut with an elegant contour that creates an illusion of larger size.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M12 2C7 2 4 6.5 4 12s3 10 8 10 8-4.5 8-10-3-10-8-10zm0 2.5c3.5 0 5.5 3.5 5.5 7.5s-2 7.5-5.5 7.5S6.5 16 6.5 12 8.5 4.5 12 4.5z'
  },
  {
    id: 'emerald',
    name: 'Emerald Cut',
    facets: '50 Facets',
    sparkle: 'Hall-of-Mirrors Step Cut',
    ratio: '1.40 : 1.55',
    description: 'Vintage Art Deco glam with rectangular stepped facets that highlight diamond clarity and pure crystalline depth.',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M6 3h12l4 4v10l-4 4H6l-4-4V7l4-4zm1.5 2.5L4.5 8v8l3 2.5h9l3-2.5V8L16.5 5.5h-9z'
  },
  {
    id: 'pear',
    name: 'Pear Cut',
    facets: '58 Facets',
    sparkle: 'Teardrop Silhouette Elegance',
    ratio: '1.50 : 1.70',
    description: 'A striking hybrid of the round and marquise cuts creating a poetic teardrop shape of extraordinary elegance.',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M12 2s-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13zm0 4.2c2.8 3.5 4.5 7.2 4.5 10.8a4.5 4.5 0 0 1-9 0c0-3.6 1.7-7.3 4.5-10.8z'
  },
  {
    id: 'radiant',
    name: 'Radiant Cut',
    facets: '70 Facets',
    sparkle: 'Electric Fiery Brilliance',
    ratio: '1.15 : 1.30',
    description: 'Combines the bold emerald shape silhouette with the dazzling facet brilliance of a round cut.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M6 2h12l4 4v12l-4 4H6l-4-4V6l4-4zm1.5 2L4 7.5v9L7.5 20h9l3.5-3.5v-9L16.5 4h-9z'
  },
  {
    id: 'princess',
    name: 'Princess Cut',
    facets: '76 Facets',
    sparkle: 'Sharp Geometric Sparkle',
    ratio: '1.00 : 1.05',
    description: 'Contemporary square silhouette with inverted pyramid facets that radiate intense sparkle from every corner.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M3 3h18v18H3V3zm2.5 2.5v13h13v-13h-13zM12 7l4 5-4 5-4-5 4-5z'
  },
  {
    id: 'marquise',
    name: 'Marquise Cut',
    facets: '58 Facets',
    sparkle: 'Dramatic Regal Proportions',
    ratio: '1.85 : 2.10',
    description: 'Commissioned by King Louis XV of France, this elliptical shape with pointed ends creates an imperial visual presence.',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M12 2C7 7 2 12 2 12s5 5 10 10c5-5 10-10 10-10s-5-5-10-10zm0 3.5c3.5 3.5 6.5 6.5 6.5 6.5S15.5 15.5 12 18.5c-3.5-3-6.5-6.5-6.5-6.5S8.5 8.5 12 5.5z'
  },
  {
    id: 'heart',
    name: 'Heart Cut',
    facets: '59 Facets',
    sparkle: 'The Ultimate Romance Solitaire',
    ratio: '1.00 : 1.00',
    description: 'Requiring master-level precision lapidary skill to balance symmetry, cleft depth, and exceptional radiance.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  }
];

// Curated Mock Fine Lab Diamond Products
const MOCK_JEWELLERY_PRODUCTS = [
  {
    id: 'jb-1',
    name: 'Toi Et Moi Emerald & Pear Diamond Solitaire Ring',
    category: 'Solitaire Rings',
    shape: 'emerald',
    carat: '1.45 Ct VVS2-E',
    metal: '18Kt Yellow Gold',
    price: 47067,
    mrp: 56300,
    discountPercent: 16,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    tag: 'Trending',
    description: 'An elongated oval brilliant diamond suspended from a delicate cable chain in warm 18Kt yellow gold with hidden diamond halo.',
    specs: { cut: 'Ideal', color: 'F', clarity: 'VVS2', certification: 'IGI Certified' }
  },
  {
    id: 'jb-5',
    name: 'Lumière Lotus Bloom Diamond Sui Dhaga Earrings',
    category: 'Earrings',
    shape: 'pear',
    carat: '0.85 Ct Total Weight',
    metal: '14Kt Yellow Gold',
    price: 18533,
    mrp: 21920,
    discountPercent: 15,
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    tag: 'Statement',
    description: 'An elongated marquise solitaire gracefully suspended from a diamond bail, creating dramatic neckline symmetry.',
    specs: { cut: 'Ideal', color: 'D', clarity: 'VVS2', certification: 'IGI & GIA Certified' }
  }
];

// Occasions data
const OCCASIONS_DATA = [
  {
    id: 'workwear',
    title: 'Workwear Chic',
    subtitle: 'Minimal 9-to-5 Brilliance',
    desc: 'Understated solitaires, huggies, and slender tennis bracelets curated for boardrooms and daily desk elegance.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'everyday',
    title: 'Everyday Luxury',
    subtitle: 'Lightweight & Effortless',
    desc: 'Designed for daily showers, workouts, and sleep with comfortable smooth bezels and low-profile settings.',
    img: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bridal',
    title: 'Bridal & Proposals',
    subtitle: 'Ethereal Solitaire Sets',
    desc: 'Grand proposal solitaires, eternity wedding bands, and magnificent heirloom diamond chokers for your big day.',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'festive',
    title: 'Festive Celebrations',
    subtitle: 'Traditional Indian Radiance',
    desc: 'Modern interpretations of heritage vanki chevron rings, chandbalis, and layered diamond necklaces.',
    img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gifting',
    title: 'Gifts Under ₹30,000',
    subtitle: 'Tokens of Forever Love',
    desc: 'Thoughtfully priced IGI certified lab diamond jewelry in solid 14Kt gold, delivered in velvet presentation boxes.',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mens',
    title: 'Men\'s Diamond Atelier',
    subtitle: 'Bold, Architectural, Him',
    desc: 'Platinum & dual-tone gold bands, flush solitaire signets, diamond cufflinks, and heavy chain links.',
    img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80'
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
  const [appointmentType, setAppointmentType] = useState<'store' | 'video'>('store');
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
  const atelierName = 'Lumière Diamonds & Fine Jewels';
  const rawPhone = profile.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const cleanWa = profile.whatsapp?.replace(/\D/g, '') || (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone || '919876543210');

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
    const msg = `✨ *LUMIÈRE FINE JEWELS - ORDER INQUIRY*\n\nHello Concierge, I would like to place an order for:\n\n${itemsText}\n\n*Total Value:* ₹${cartTotal.toLocaleString('en-IN')}\n*Insured Delivery:* Complimentary Express\n\nPlease confirm availability and payment link. Thank you!`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // WhatsApp Custom Design Request
  const handleCustomWhatsAppRequest = () => {
    const msg = `💎 *BESPOKE 3D CAD JEWELLERY REQUEST*\n\n*Type:* ${customStudio.type}\n*Diamond Shape:* ${customStudio.shape}\n*Solitaire Carat:* ${customStudio.carat} Ct\n*Metal Choice:* ${customStudio.metal}\n*Ring Size:* ${customStudio.ringSize}\n*Est. Budget:* ₹${estimatedCustomPrice.toLocaleString('en-IN')}\n\nHello Atelier, please share initial 3D CAD sketches and diamond specifications.`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1D20] font-sans antialiased selection:bg-[#D4AF37]/30 selection:text-black">
      
      {/* 1. TOP LUXURY ANNOUNCEMENT TICKER */}
      <div className="bg-[#14171A] text-stone-200 text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E6CA65] text-[10px] font-semibold tracking-wider uppercase border border-[#D4AF37]/30">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Conscious Luxury
            </span>
            <span className="text-stone-300">
              IGI & GIA Certified Lab-Grown Diamonds • BIS 14K/18K Hallmarked • 80% Lifetime Buyback • 15-Day Free Returns
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Live Gold (18K): <strong className="text-amber-200">₹6,480/g</strong>
            </span>
            <a href="#stores" className="hover:text-amber-200 transition-colors">Experience Lounges</a>
            <span className="text-stone-700">|</span>
            <a 
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi Lumiere Concierge, I would like assistance with jewellery selection.')}`}
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
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Left: Mobile Menu Trigger & Brand Name */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/50"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <a href="#" className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#9B7824] via-[#D4AF37] to-[#F3E8D0] p-[1.5px] shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#14171A] flex items-center justify-center">
                    <span className="font-serif text-lg font-bold text-[#F3E8D0] tracking-widest">L</span>
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#14171A] uppercase">
                    LUMIÈRE
                  </div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#9B7824] uppercase font-medium">
                    Lab Diamonds & Fine Jewels
                  </div>
                </div>
              </a>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wider uppercase font-medium text-stone-700">
              <a href="#bestsellers" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Bestsellers</a>
              <a href="#shapes" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Shop By Shape</a>
              <a href="#custom-studio" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Bespoke 3D CAD</a>
              <a href="#occasions" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Occasions</a>
              <a href="#why-lab" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Why Lab Diamonds</a>
              <a href="#stores" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Lounges</a>
              <a href="#reviews" className="hover:text-[#9B7824] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all">Reviews</a>
            </nav>

            {/* Right: Quick Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Wishlist */}
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors"
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
                className="relative p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors"
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
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#14171A] hover:bg-[#252a30] text-[#F3E8D0] text-xs font-medium tracking-wider uppercase shadow-md shadow-black/10 hover:shadow-black/20 transition-all border border-[#D4AF37]/40"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Book Lounge Visit</span>
              </button>

              {/* Share */}
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 rounded-full hover:bg-stone-200/50 text-stone-700 transition-colors"
                title="Share Boutique"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-300 px-6 py-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-3 text-sm tracking-wider uppercase font-medium text-stone-800">
              <a href="#bestsellers" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Bestsellers</a>
              <a href="#shapes" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Shop By Diamond Shape</a>
              <a href="#custom-studio" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Custom 3D CAD Studio</a>
              <a href="#occasions" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Shop By Occasion</a>
              <a href="#why-lab" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Why Lab-Grown Diamonds</a>
              <a href="#stores" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Experience Lounges</a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Customer Reviews</a>
              <a href="#faqs" onClick={() => setIsMobileMenuOpen(false)} className="py-1">Certifications & FAQs</a>
            </nav>
            <div className="pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsAppointmentModalOpen(true); }}
                className="w-full py-3 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase text-center"
              >
                Book Private Lounge Viewing
              </button>
              <a 
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi Lumière, I would like to consult with a jewellery specialist.')}`}
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

      {/* 3. HERO SECTION - CINEMATIC LUXURY SOLITAIRE BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-200 text-xs font-medium tracking-widest uppercase shadow-sm">
                <Gem className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>India's Conscious Solitaire Atelier</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#14171A] font-normal tracking-tight leading-[1.12]">
                Where Timeless Brilliance Meets <span className="italic font-serif text-[#9B7824]">Conscious Luxury.</span>
              </h1>

              <p className="text-stone-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover 100% genuine lab-grown diamonds crafted in solid 14Kt and 18Kt BIS Hallmarked gold. Certified by 
                <strong className="text-stone-900 font-medium"> IGI & GIA</strong> with identical physical, optical, and chemical brilliance — at up to <strong className="text-[#9B7824] font-medium">70% lower price</strong> than earth-mined diamonds.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <a 
                  href="#bestsellers" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#14171A] hover:bg-[#252a30] text-[#F3E8D0] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg shadow-black/15 transition-all text-center flex items-center justify-center gap-2 group border border-[#D4AF37]/40"
                >
                  <span>Explore Bestsellers</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="#custom-studio" 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-semibold tracking-wider uppercase border border-stone-300 shadow-sm transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#9B7824]" />
                  <span>Custom 3D CAD Quote</span>
                </a>
              </div>

              {/* Micro-metrics Row */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#14171A]">6,000+</div>
                  <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">Certified Designs</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#14171A]">100%</div>
                  <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">Conflict-Free Carbon</div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#9B7824]">80%</div>
                  <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">Lifetime Buyback</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Solitaire Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 via-[#F3E8D0]/40 to-transparent rounded-3xl blur-2xl -z-10" />

                {/* Main Visual Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/60 bg-white group">
                  <div className="aspect-[4/5] sm:aspect-[4/4.5] overflow-hidden bg-stone-100">
                    <img 
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85" 
                      alt="Solitaire Diamond Ring"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Floating Certificate Trust Pill */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200/80 shadow-md flex items-center gap-2 text-xs font-medium text-stone-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>IGI Certified • Laser Inscribed</span>
                  </div>

                  {/* Floating Product Highlight Banner */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-[#E6CA65] font-semibold">Featured Masterpiece</div>
                        <h4 className="font-serif text-sm sm:text-base font-medium text-stone-100">Toi Et Moi Emerald & Pear Diamond Solitaire</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-stone-400 line-through">₹56,300</div>
                        <div className="text-sm sm:text-base font-bold text-amber-300">₹47,067</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Floating Floating Accent Card */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-stone-200/80 items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#9B7824]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">BIS 916 Hallmark</div>
                    <div className="text-[10px] text-stone-500">Government HUID Stamped</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Trust Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/70 shadow-sm">
            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-amber-50 text-[#9B7824] shrink-0">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">100% Real Lab Diamonds</h4>
                <p className="text-[11px] text-stone-500">Optically, physically & chemically identical</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">IGI & GIA Certified</h4>
                <p className="text-[11px] text-stone-500">Laser inscribed report on diamond girdle</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900">80% Buyback & 100% Exchange</h4>
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

      {/* 4. SHOP BY CATEGORY PILLS / ROUNDELS */}
      <section className="py-12 bg-white border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Boutique Categories</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-1">Discover Handcrafted Fine Jewellery</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">Curated lab diamond silhouettes designed for daily wear and milestone proposals.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { id: 'rings', name: 'Solitaire Rings', count: '1,420+ Designs', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
              { id: 'earrings', name: 'Diamond Earrings', count: '890+ Designs', img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80' },
              { id: 'pendants', name: 'Solitaire Pendants', count: '650+ Designs', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80' },
              { id: 'bracelets', name: 'Tennis Bracelets', count: '320+ Designs', img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80' },
              { id: 'all', name: 'Modern Mangalsutras', count: '240+ Designs', img: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80' },
              { id: 'mens', name: 'Men\'s Diamond Bands', count: '180+ Designs', img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=80' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const el = document.getElementById('bestsellers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group p-3 rounded-xl border text-left transition-all ${
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

      {/* 5. SHOP BY DIAMOND SHAPE (SIGNATURE JEWELBOX FEATURE) */}
      <section id="shapes" className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Cut & Silhouette</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Shop By Diamond Shape</h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Every diamond shape tells a different love story. Select a cut to inspect its proportions, facet architecture, and optical fire.
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
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
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

          {/* Detailed Spotlight of Selected Shape */}
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
                        const el = document.getElementById('custom-studio');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-stone-800 transition-colors"
                    >
                      <span>Customize in {current.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Lumière Concierge, I am looking for a loose lab diamond in ${current.name} shape (1.0 to 2.0 Carat). Could you share certified options?`)}`}
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
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Hand-selected lab diamond creations loved for immaculate cut quality and everyday wearability.</p>
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
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all whitespace-nowrap ${
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
                  {/* Top Image Container */}
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
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-red-500 shadow-sm transition-colors"
                      aria-label="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Quick View Button on Desktop Hover */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden md:flex absolute bottom-3 inset-x-3 py-2 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-medium items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Quick View & Specs</span>
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
                          className="w-full py-2 rounded-lg bg-[#14171A] text-amber-200 hover:bg-stone-800 text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add</span>
                        </button>

                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Lumière Concierge, I am interested in ${product.name} (₹${product.price.toLocaleString('en-IN')}). Could you confirm availability and customization options?`)}`}
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

      {/* 7. BESPOKE 3D CAD CUSTOM STUDIO ("SHARE YOUR DESIGN & GET A QUOTE") */}
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
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
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
                    2. Diamond Cut & Silhouette
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['Round Brilliant', 'Oval Cut', 'Emerald Cut', 'Pear Cut', 'Radiant Cut', 'Princess Cut'].map(shape => (
                      <button
                        key={shape}
                        type="button"
                        onClick={() => setCustomStudio(prev => ({ ...prev, shape }))}
                        className={`px-2 py-2 rounded-lg text-[11px] font-medium text-center transition-all ${
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
                    4. Solid Gold Karat & Tone
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['18Kt Yellow Gold', '18Kt Rose Gold', '18Kt White Gold'].map(metal => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setCustomStudio(prev => ({ ...prev, metal }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-center transition-all ${
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
                      <div className="text-[10px] text-stone-400">Includes taxes, making & IGI certification</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCustomWhatsAppRequest}
                  className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E8D0] to-[#AA771C] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
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

      {/* 8. SHOP BY OCCASION CAROUSEL */}
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
                  
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-200 font-medium group-hover:underline">
                    <span>Explore Collection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. WHY LAB-GROWN DIAMONDS? SCIENTIFIC COMPARISON MATRIX */}
      <section id="why-lab" className="py-16 sm:py-24 bg-white border-y border-stone-200">
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
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-stone-200 shadow-lg bg-[#FAF8F5]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#14171A] text-white">
                  <th className="p-4 sm:p-5 font-medium uppercase tracking-wider text-[11px] text-stone-400">Parameter</th>
                  <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px] text-[#D4AF37] bg-white/5 border-x border-white/10">
                    Lumière Lab-Grown Diamonds
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
                  <td className="p-4 font-semibold text-stone-900">Environmental & Mining Impact</td>
                  <td className="p-4 font-medium text-emerald-800 bg-amber-50/30 border-x border-stone-200/60">
                    Zero Earth Excavation • Conflict-Free
                  </td>
                  <td className="p-4 text-stone-600">Massive Earth Displacement & Heavy Mining</td>
                </tr>
                <tr className="bg-amber-100/30">
                  <td className="p-4 font-bold text-stone-950">Pricing Advantage</td>
                  <td className="p-4 font-bold text-[#9B7824] bg-amber-100/50 border-x border-amber-300">
                    60% – 80% More Accessible
                  </td>
                  <td className="p-4 text-stone-500 line-through">Expensive Middlemen & Mining Markups</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 10. REAL CUSTOMER STORIES & SPARKLE (REVIEWS SLIDER) */}
      <section id="reviews" className="py-16 sm:py-24 bg-[#FAF8F5]">
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
                date: 'October 2026',
                text: 'I compared the diamond under a 20x loupe with my mother\'s mined solitaire. The brilliance, fire, and crisp facets on the Lumière ring were even superior! She cried happy tears when I proposed.'
              },
              {
                id: 'rev-2',
                name: 'Dr. Varun Mathur',
                city: 'South Extension, Delhi',
                item: 'Double-Row Diamond Tennis Bracelet in 18K',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                date: 'September 2026',
                text: 'Visited the South Ex lounge. The team explained the 4Cs with a microscope and verified the IGI laser inscription on the girdle before packing. Transparent BOQ billing with zero hidden charges.'
              },
              {
                id: 'rev-3',
                name: 'Sneha & Rohit Kulkarni',
                city: 'Jubilee Hills, Hyderabad',
                item: 'Toi Et Moi Emerald & Pear Solitaire Ring',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
                date: 'August 2026',
                text: 'Delivered in 48 hours to Hyderabad with tamper-evident insured security. The sparkle under natural sunlight is breathtaking. 100% recommend over mined diamonds!'
              }
            ].map(review => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-4">"{review.text}"</p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
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

      {/* 11. EXPERIENCE LOUNGES & WALK-IN BOOKINGS */}
      <section id="stores" className="py-16 sm:py-24 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-[#9B7824]">Touch & Try On</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mt-1">Visit Our Experience Lounges</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">Experience 6,000+ designs in person with complimentary private gemologist consultations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORE_LOUNGES.map(lounge => (
              <div key={lounge.city} className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
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
                    className="w-full py-2.5 rounded-lg bg-[#14171A] text-amber-200 text-xs font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors"
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

      {/* 12. CERTIFICATIONS, BUYBACK & FAQS ACCORDION */}
      <section id="faqs" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-stone-200">
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
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-medium text-stone-900 hover:text-[#9B7824] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-full bg-stone-100 text-stone-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. LUXURY FOOTER */}
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
                  <div className="font-serif text-xl tracking-widest text-white uppercase font-bold">LUMIÈRE</div>
                  <div className="text-[9px] tracking-widest text-[#D4AF37] uppercase">Lab Diamonds & Fine Jewels</div>
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
                <li><a href="#bestsellers" className="hover:text-white transition-colors">Solitaire Engagement Rings</a></li>
                <li><a href="#bestsellers" className="hover:text-white transition-colors">Diamond Tennis Bracelets</a></li>
                <li><a href="#bestsellers" className="hover:text-white transition-colors">Sui Dhaga & Stud Earrings</a></li>
                <li><a href="#bestsellers" className="hover:text-white transition-colors">Teardrop Diamond Pendants</a></li>
                <li><a href="#bestsellers" className="hover:text-white transition-colors">Men's Architectural Bands</a></li>
                <li><a href="#custom-studio" className="hover:text-white transition-colors">Custom 3D CAD Creations</a></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-amber-200 mb-4">Patron Care</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li><a href="#why-lab" className="hover:text-white transition-colors">80% Lifetime Buyback</a></li>
                <li><a href="#why-lab" className="hover:text-white transition-colors">15-Day Free Returns</a></li>
                <li><a href="#stores" className="hover:text-white transition-colors">Book Private Lounge Visit</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">IGI Certificate Verification</a></li>
                <li><a href="#why-lab" className="hover:text-white transition-colors">The 4Cs Diamond Guide</a></li>
                <li><a href="#stores" className="hover:text-white transition-colors">Store Experience Locator</a></li>
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
                  className="bg-stone-800 text-xs px-3 py-2 rounded-lg w-full text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button className="px-3 py-2 rounded-lg bg-[#D4AF37] text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300">
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
              © 2026 Lumière Diamonds & Fine Jewels Atelier. All rights reserved. Pure mock demonstration.
            </div>
            <div className="flex items-center gap-4">
              <span>Secure 256-Bit SSL Encrypted Checkout</span>
              <span>•</span>
              <span>No-Cost 3-Month EMI Available</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 14. STICKY MOBILE ACTION DOCK */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#14171A]/95 backdrop-blur-md border-t border-stone-800 px-4 py-2.5 flex items-center justify-around text-stone-200">
        
        <a 
          href={`tel:${cleanPhone}`} 
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider hover:text-amber-300"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call Lounge</span>
        </a>

        <a 
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi Lumière, I would like to consult with a jewellery specialist.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button 
          onClick={() => setIsAppointmentModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider hover:text-amber-300"
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Book Visit</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wider relative hover:text-amber-300"
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

      {/* 15. QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-stone-200">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
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
                      <span className="text-stone-500">Diamond Carat & Color:</span>
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
                      className="w-full py-3 rounded-full bg-[#14171A] text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </button>

                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Lumière Concierge, I would like to order ${quickViewProduct.name} (₹${quickViewProduct.price.toLocaleString('en-IN')}). Please assist with sizing and delivery.`)}`}
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

      {/* 16. CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#9B7824]" />
                  <h3 className="font-serif text-lg font-bold text-stone-900">Your Jewellery Bag ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-stone-100">
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
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs uppercase tracking-wider font-semibold"
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
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                            >-</button>
                            <span className="px-2 text-xs font-semibold">{item.qty}</span>
                            <button 
                              onClick={() => {
                                setCart(cart.map(c => c.product.id === item.product.id ? { ...c, qty: c.qty + 1 } : c));
                              }}
                              className="px-2 py-0.5 text-xs text-stone-600 hover:bg-stone-100"
                            >+</button>
                          </div>

                          <button 
                            onClick={() => setCart(cart.filter(c => c.product.id !== item.product.id))}
                            className="text-[10px] text-red-500 hover:underline"
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
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button 
                    onClick={() => {
                      if (couponCode === 'SPARKLE10' || couponCode === 'LUMIERE10') {
                        setCouponApplied(true);
                      } else {
                        alert('Please enter valid coupon SPARKLE10 for 10% discount.');
                      }
                    }}
                    className="px-4 py-2 bg-stone-900 text-amber-200 text-xs font-semibold uppercase tracking-wider rounded-lg"
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
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E8D0] to-[#AA771C] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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

      {/* 17. WISHLIST MODAL */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h3 className="font-serif text-lg font-bold text-stone-900">Your Saved Favourites ({wishlist.size})</h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1 rounded-full hover:bg-stone-100">
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
                        className="px-3 py-1 rounded bg-[#14171A] text-amber-200 text-[10px] font-bold uppercase tracking-wider"
                      >
                        Move To Bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="text-[10px] text-red-500 hover:underline text-center"
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

      {/* 18. BOOK APPOINTMENT MODAL */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-stone-200">
            <button 
              onClick={() => setIsAppointmentModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-[#9B7824] flex items-center justify-center mx-auto mb-2 border border-amber-200">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Book Private Diamond Consultation</h3>
              <p className="text-xs text-stone-500 mt-1">Enjoy complimentary Champagne viewing, diamond loupe inspection & personalized sizing.</p>
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
                  className="px-6 py-2.5 rounded-full bg-[#14171A] text-amber-200 text-xs font-semibold uppercase tracking-wider"
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
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
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
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-700 font-semibold block mb-1">Preferred City Lounge</label>
                    <select 
                      value={appointmentForm.city}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] bg-white"
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
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37] bg-white"
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
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-full bg-[#14171A] text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Confirm Lounge Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 19. SHARE CARD MODAL */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

    </div>
  );
}
