'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Download, 
  Check, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Smartphone, 
  Globe, 
  X, 
  Star, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Search, 
  Flame, 
  Info, 
  Scissors, 
  Share2, 
  Navigation,
  Store,
  Tag,
  Copy,
  Play,
  QrCode,
  Mail,
  ShieldCheck,
  Award,
  Layers,
  Heart,
  ExternalLink,
  User,
  Users,
  Camera,
  ThumbsUp,
  CheckCircle2,
  Eye,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import QRCode from 'qrcode';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem } from '@/lib/types';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon from '@/components/common/SocialIcon';

interface FashionTemplateViewProps {
  profile: DigitalProfile;
  cart: { product: ProductItem; quantity: number }[];
  addToCart: (product: ProductItem) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setIsCartOpen: (open: boolean) => void;
  selectedCurrency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
  setSelectedCurrency: (c: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED') => void;
  formatPrice: (inrPrice: number, curr?: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED') => string;
  totalConvertedPrice: string | number;
  setIsUPIModalOpen: (open: boolean) => void;
  setBookingService: (srv: ServiceItem | null) => void;
  setBookingSuccess: (s: boolean) => void;
  quoteServices: ServiceItem[];
  toggleQuoteService: (srv: ServiceItem) => void;
  sendWhatsAppQuotation: () => void;
  leadName: string;
  setLeadName: (v: string) => void;
  leadEmail: string;
  setLeadEmail: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  leadMessage: string;
  setLeadMessage: (v: string) => void;
  handleLeadSubmit: (e: React.FormEvent) => void;
  leadSuccess: boolean;
  trackAction: (action: string) => void;
  getCleanWhatsAppNumber: (p: DigitalProfile) => string;
  getEmbedUrl?: (v: VideoItem) => string;
  viewMode: 'mobile' | 'website';
  setViewMode: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

export type GenderType = 'women' | 'men' | 'kids';

export interface OutfitReviewPhoto {
  url: string;
  caption: string;
  customerTag?: string;
  occasion?: string;
}

export interface OutfitReviewItem {
  id: string;
  customerName: string;
  customerCity: string;
  avatarUrl: string;
  rating: number;
  reviewDate: string;
  occasion: string;
  tailoredFitNote: string;
  trialExperience: string;
  comment: string;
  tailoredPhotos: OutfitReviewPhoto[];
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface OutfitItemData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  gender: GenderType;
  category: string;
  fabric: string;
  isSpecial?: boolean;
  craftsmanshipTag: string;
  deliveryTime: string;
  sizesAvailable: string;
  imageUrl: string;
  description: string;
  features: string[];
  designerNote?: string;
  pairWith?: string;
  careInstructions?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: OutfitReviewItem[];
}

export interface BridalPackageDeal {
  id: string;
  name: string;
  tag: string;
  badgeColor: string;
  genderBadge: string;
  timeline: string;
  originalPrice: number;
  dealPrice: number;
  savings: number;
  imageUrl: string;
  description: string;
  itemsList: string[];
}

// Curated Discount Bridal & Family Ensemble Combos
export const BOUTIQUE_COMBO_DEALS: BridalPackageDeal[] = [
  {
    id: 'fdeal_1',
    name: '👑 Royal Shahi Bridal Trousseau Box',
    tag: '🔥 20% OFF • BRIDAL SIGNATURE',
    badgeColor: 'bg-[#C1621F]',
    genderBadge: '👗 Women',
    timeline: 'Bespoke 30 Days Crafting',
    originalPrice: 195000,
    dealPrice: 156000,
    savings: 39000,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Our flagship bridal couture trousseau package! Includes master artisan hand-zardozi lehenga, muhurtham pure silk saree, custom blouse tailoring, and a complimentary trial session.',
    itemsList: [
      '1x Royal Crimson Zardozi Raw Silk Bridal Lehenga',
      '1x Authentic Kanchipuram Gold Tissue Muhurtham Saree',
      '2x Bespoke Hand-Embroidered Maggam Work Blouses',
      '1x Designer Organza Bridal Veil / Dupatta with Latkans',
      'Complimentary Atelier Master Tailor Fitting Session'
    ]
  },
  {
    id: 'fdeal_2',
    name: '👑 Imperial Royal Groom & Safa Ensemble',
    tag: '⚡ GROOM FAVORITE • SAVE ₹23,000',
    badgeColor: 'bg-[#3B2313]',
    genderBadge: '👔 Men',
    timeline: 'Bespoke 20 Days Crafting',
    originalPrice: 108000,
    dealPrice: 85000,
    savings: 23000,
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    description: 'Regal groom trousseau featuring pure raw silk zardozi sherwani, handloom Tissue safa turban with kalgi, silk churidar, and an antique gold embroidered Doshala stole.',
    itemsList: [
      '1x Royal Ivory & Gold Hand-Zardozi Raw Silk Sherwani',
      '1x Handloom Katan Silk Tissue Safa with Jewelled Kalgi',
      '1x Antique Gold Embroidered Velvet Doshala / Stole',
      '1x Pure Raw Silk Churidar & Matching Embroidered Juttis',
      'Complimentary Custom Master Tailor Fitting Session'
    ]
  },
  {
    id: 'fdeal_3',
    name: '✨ Royal Family Celebration Twin Set',
    tag: '🌟 MOTHER & DAUGHTER / BROTHER SPECIAL',
    badgeColor: 'bg-[#2E4D2A]',
    genderBadge: '🧒 Family & Kids',
    timeline: 'Ready in 12 Days',
    originalPrice: 58000,
    dealPrice: 46000,
    savings: 12000,
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    description: 'Adorable coordinated celebration combo pairing a pure silk Kanchipuram Pattu Pavada for young girls with a festive Kurta Dhoti set for young boys.',
    itemsList: [
      '1x Little Princess Kanchipuram Gold Zari Pattu Pavada',
      '1x Junior Prince Raw Silk Kurta & Zari Dhoti Set',
      '2x Handcrafted Matching Silk Potli Pouches',
      'Soft 100% Breathable Cotton Inner Linings'
    ]
  }
];

// Active Discount Coupons
export const BOUTIQUE_PROMO_COUPONS = [
  { code: 'SILK20', discount: 'Flat 20% OFF', description: 'Applicable on bespoke stitching & custom couture above ₹25,000', minOrder: 25000 },
  { code: 'BRIDAL1000', discount: '₹1,000 Flat OFF', description: 'Instant festival discount on bridal lehengas, sherwanis & silks', minOrder: 15000 },
  { code: 'FREESHIP', discount: 'Free DHL Express', description: 'Free worldwide doorstep air shipping on all orders', minOrder: 10000 }
];

// Instagram Reels Preview Data for Grand Fashion & Clothing Shopping Mall
export const FASHION_INSTAGRAM_REELS = [
  {
    title: 'Bridal Floor Walkthrough & Pure Zardozi Lehengas',
    views: '48.5K Views',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    alt: 'Bridal Floor Lehengas'
  },
  {
    title: 'Men’s Studio: Royal Sherwanis & Jodhpuri Suits',
    views: '32.1K Views',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    alt: 'Men Studio Sherwanis'
  },
  {
    title: 'Kids Kingdom: Princess Pattu Pavadas & Kurta Dhotis',
    views: '29.7K Views',
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
    alt: 'Kids Kingdom Ethnic Wear'
  },
  {
    title: 'New Festive Arrivals: Kanchipuram Gold Tissue Sarees',
    views: '61.4K Views',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    alt: 'Festive Kanchipuram Sarees'
  }
];

// YouTube Documentary & Showcase Episodes for Grand Fashion & Clothing Shopping Mall
export const FASHION_YOUTUBE_EPISODES = [
  {
    title: 'Grand Fashion Mall: Complete 3-Floor Tour (Men, Women, Kids)',
    subtitle: 'Ground to 3rd Floor Apparel Department Showcase',
    duration: '14:20',
    views: '112K views',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
    alt: 'Grand Fashion Mall Tour'
  },
  {
    title: 'How to Choose Your Wedding Trousseau: Master Tailor Advice',
    subtitle: 'Fabric Selection, Silhouette Drapes & Embroidery Guide',
    duration: '09:45',
    views: '45K views',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    alt: 'Wedding Trousseau Guide'
  },
  {
    title: 'Groom Fashion Masterclass: Sherwani vs Bandhgala vs Tuxedo',
    subtitle: 'Perfect Occasion Styling for Receptions & Sangeet',
    duration: '11:15',
    views: '38K views',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    alt: 'Groom Fashion Masterclass'
  }
];

// 26 Comprehensive Outfits (Women, Men & Kids Sections with high quality images)
export const DEFAULT_BOUTIQUE_OUTFITS: OutfitItemData[] = [
  // ==========================================
  // 1. 👗 WOMEN'S COLLECTION (12 Outfits)
  // ==========================================
  {
    id: 'w_outfit_1',
    name: 'Royal Crimson Zardozi Bridal Lehenga',
    price: 145000,
    originalPrice: 175000,
    gender: 'women',
    category: 'Bridal',
    fabric: 'Pure Raw Silk with Hand Zari & Dabka Embroidery',
    isSpecial: true,
    craftsmanshipTag: 'Handcrafted Heritage Zardozi',
    deliveryTime: '25-30 Days',
    sizesAvailable: 'XS, S, M, L, XL, Custom Made-to-Measure',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Regal crimson raw silk bridal lehenga exquisitely hand-embroidered by generational artisans using antique gold zari, French metallic sequins, and semi-precious stones. Paired with a sculpted sweetheart neckline blouse and double organza dupattas.',
    features: ['100% Pure Mulberry Silk Base', 'Traditional Agra Zardozi & Dabka Work', 'Flared 5.5-meter Kalidar Ghera with Double Can-can', 'Dual Dupatta Setup (Velvet + Scalloped Organza)'],
    designerNote: 'Each panel takes over 320 artisan hours of intricate needlework. Structured to give a royal bridal silhouette with effortless weight balance.',
    pairWith: 'Heirloom Kundan Polki Choker & Maang Tikka',
    careInstructions: 'Strictly Professional Dry Clean Only. Store in breathable muslin pouch.'
  },
  {
    id: 'w_outfit_2',
    name: 'Kanchipuram Pure Gold Tissue Brocade Saree',
    price: 85000,
    originalPrice: 98000,
    gender: 'women',
    category: 'Sarees',
    fabric: 'Authentic 6-Ply Mulberry Silk with Pure Silver & Gold Zari',
    isSpecial: true,
    craftsmanshipTag: 'Silk Mark Certified Handloom',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Standard 6.3m (Includes Unstitched Blouse)',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    description: 'Heritage handwoven Kanchipuram masterpiece in luminous metallic gold tissue silk. Features intricate floral jaal weaving across the body with rich Korvai temple borders and an ornate peacock-motif brocade pallu.',
    features: ['Govt. of India Certified Silk Mark Label', 'Tested Pure Silver Electroplated Zari', 'Heavy Korvai Interlocking Weave', 'Includes Matching Tissue Running Blouse Piece'],
    designerNote: 'Hand-loomed in traditional pit looms over 28 continuous days. Drapes with an unmatched regal sheen under wedding illumination.',
    pairWith: 'Antique Temple Jewellery & Fresh Jasmine Gajra',
    careInstructions: 'Dry clean only. Roll in cotton cloth; avoid perfume spray on zari.'
  },
  {
    id: 'w_outfit_3',
    name: 'Emerald Velvet Anarkali & Organza Dupatta',
    price: 42000,
    originalPrice: 49000,
    gender: 'women',
    category: 'Indo-Western',
    fabric: 'Micro Velvet with Hand-cut Gota Patti Accents',
    craftsmanshipTag: 'Royal Rajputana Cut',
    deliveryTime: '12-15 Days',
    sizesAvailable: 'XS to 3XL, Custom Fit Available',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    description: 'Deep jewel-toned emerald green micro-velvet floor-length Anarkali featuring marodi hand-embroidery along the yoke and flared hem. Complemented by a lightweight hand-dyed organza dupatta with scalloped borders.',
    features: ['Rich Micro-Velvet Texture', 'Authentic Jaipur Gota Patti Embroidery', 'Churidar Sleeves with Zardozi Cuffs', 'Includes Matching Raw Silk Cigarette Pants'],
    designerNote: 'The rich jewel tone flatters evening receptions and winter Sangeet celebrations effortlessly.',
    pairWith: 'Emerald Emerald Drop Earrings & Mojaris',
    careInstructions: 'Dry clean only. Steam iron on reverse side.'
  },
  {
    id: 'w_outfit_4',
    name: 'Pastel Blush Embroidered Reception Gown',
    price: 98000,
    originalPrice: 120000,
    gender: 'women',
    category: 'Couture',
    fabric: 'French Tulle with Swarovski Crystal Embellishments',
    isSpecial: true,
    craftsmanshipTag: 'Red Carpet Haute Couture',
    deliveryTime: '20-25 Days',
    sizesAvailable: 'Custom Made-to-Measure',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpted fairy-tale reception ballroom gown in romantic powder blush. Intricately encrusted with genuine crystals, silver bugle beads, and 3D organza botanical florets with an ethereal flowing sweep train.',
    features: ['Built-in Corset Boning for Perfect Fit', 'Imported French Illusion Tulle', 'Hand-sewn Swarovski Crystal Accents', 'Cascading 1.2-meter Cathedral Train'],
    designerNote: 'Engineered with internal corset support so you feel weightless while captivating every guest on the dance floor.',
    pairWith: 'Diamond Solitaire Earrings & Platinum Heels',
    careInstructions: 'Specialist Dry Clean Only in protective bag.'
  },
  {
    id: 'w_outfit_5',
    name: 'Shahi Velvet Plum Bridal Ensemble',
    price: 125000,
    originalPrice: 148000,
    gender: 'women',
    category: 'Bridal',
    fabric: 'Micro Velvet with Heritage Marodi & Mukaish Work',
    craftsmanshipTag: 'Bespoke Nizam Atelier',
    deliveryTime: '25-30 Days',
    sizesAvailable: 'Custom Made-to-Measure',
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Opulent dark plum velvet bridal ensemble adorned with real silver mukaish dots and dense floral Marodi threadwork inspired by royal Deccan architectural monuments.',
    features: ['Premium Plush Velvet Canvas', 'Hand-twisted Metallic Wire Marodi Stitching', 'Double Dupatta Styling included', 'Custom Hand-calligraphed Initials Inside Waistband'],
    designerNote: 'A deep, mysterious hue that breaks away from traditional reds while staying profoundly regal.',
    pairWith: 'Basra Pearl Satlada & Navratan Choker',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_6',
    name: 'Banarasi Jangla Handloom Silk Saree',
    price: 48000,
    originalPrice: 56000,
    gender: 'women',
    category: 'Sarees',
    fabric: 'Pure Katan Silk with Meenakari Floral Jaal',
    craftsmanshipTag: 'GI-Tagged Varanasi Handloom',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Standard 6.3m (Includes Unstitched Blouse)',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description: 'Collector-grade Banarasi Katan silk saree woven in the historic Jangla pattern. Accentuated with subtle Meenakari threadwork highlights in delicate hues of crimson and sage green.',
    features: ['100% Pure Katan Silk Base', 'Intricate All-over Floral Jangla Weave', 'Traditional Kadwa Hand-Weaving Technique', 'Handloom Guild Authenticity Mark'],
    designerNote: 'Woven using the Kadwa technique where each floral motif is individually engraved without loose floats on the reverse.',
    pairWith: 'Polki Jhumkas & Gold Bangles',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_7',
    name: 'Pastel Rose Gold Peeta Work Lehenga',
    price: 95000,
    originalPrice: 115000,
    gender: 'women',
    category: 'Bridal',
    fabric: 'Organza Tissue with Handcrafted Cutwork Borders',
    craftsmanshipTag: 'Contemporary Heirloom',
    deliveryTime: '20-25 Days',
    sizesAvailable: 'XS to 2XL, Custom Fit Available',
    imageUrl: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
    description: 'Dreamy modern bridal lehenga combining pastel blush organza with gleaming metallic rose gold Peeta wirework. Features scalloped hem cutwork and feather-light drape.',
    features: ['Tissue Organza with Soft Silk Lining', 'Hammered Peeta Metallic Embroidery', 'Hand-cut Scalloped Floral Borders', 'Featherweight Comfort for Day Weddings'],
    designerNote: 'Designed specifically for sunlit destination garden weddings where comfort and radiance are paramount.',
    pairWith: 'Rose Gold Choker & Dewy Makeup',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_8',
    name: 'Midnight Navy Cape & Draped Dhoti Set',
    price: 34000,
    originalPrice: 39000,
    gender: 'women',
    category: 'Indo-Western',
    fabric: 'Georgette with Mirror Work & Zardozi Yoke',
    craftsmanshipTag: 'Modern Fusion Couture',
    deliveryTime: '10-14 Days',
    sizesAvailable: 'XS to XXL',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Chic cocktail ensemble pairing a structured floor-length sheer cape over a hand-embroidered bustier and pre-draped satin crepe dhoti trousers.',
    features: ['Real Foil Mirror Work & Cutdana', 'Flowing Georgette Cape with Shoulder Pads', 'Pre-pleated Comfortable Dhoti Pants', 'Padded Bustier with Concealed Side Zipper'],
    designerNote: 'Effortless to wear with zero safety pins needed. A showstopper for Sangeet cocktails.',
    pairWith: 'Statement Silver Cuffs & Metallic Stilettos',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_9',
    name: 'Chanderi Handloom Organza Silk Saree',
    price: 24000,
    originalPrice: 29000,
    gender: 'women',
    category: 'Sarees',
    fabric: 'Extremely Lightweight with Handwoven Zari Pallu',
    craftsmanshipTag: 'Madhya Pradesh Handloom',
    deliveryTime: '3-5 Days Express',
    sizesAvailable: 'Standard 6.3m (Includes Blouse)',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: 'Sheer, gossamer-like Chanderi silk saree in muted ivory and gold. Accented with miniature gold booties and a traditional tissue zari border.',
    features: ['Handcrafted from Natural Degummed Silk', 'Featherlight 380 grams total weight', 'Breathable Summer Festive Wear', 'Includes Handblock Printed Blouse Fabric'],
    designerNote: 'Epitomizes minimalist luxury. Perfect for intimate daytime celebrations and high-tea functions.',
    pairWith: 'Pearl Drop Earrings & Floral Bun',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_10',
    name: 'Gold Sequinned Corset & Fishtail Skirt',
    price: 72000,
    originalPrice: 88000,
    gender: 'women',
    category: 'Couture',
    fabric: 'Metallic Tissue Silk with Hand-draped Tulle',
    craftsmanshipTag: 'Met-Gala Glamour',
    deliveryTime: '18-22 Days',
    sizesAvailable: 'Custom Fit by Master Tailor',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    description: 'High-octane glamour featuring a micro-sequinned boned corset top paired with a sculpted fishtail trumpet skirt that hugs curves and cascades into a puddle train.',
    features: ['High-density Micro-Sequin Sheet Fabric', 'Internal Steel Boning for Hourglass Waist', 'Lined with Pure Mulberry Silk Crepe', 'Concealed Heavy-duty YKK Back Fasteners'],
    designerNote: 'Catches every beam of light on stage. Engineered for the bride who commands center stage.',
    pairWith: 'Gold Chandelier Earrings & Smoky Eyes',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_11',
    name: 'Rani Pink Kanjeevaram Bridal Saree',
    price: 68000,
    originalPrice: 82000,
    gender: 'women',
    category: 'Sarees',
    fabric: '100% Mulberry Silk with Pure Silver & Gold Zari Weave',
    craftsmanshipTag: 'Temple Town Masterpiece',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Standard 6.3m (Includes Unstitched Blouse)',
    imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant auspicious Rani pink Kanjivaram silk saree with traditional rudraksha borders and an opulent gold brocade pallu depicting twin swan (Annapakshi) motifs.',
    features: ['Silk Mark Certified Authentic Handloom', 'Dense Zari Weaving on Traditional Looms', 'Weight: 880 grams of Pure Silk & Zari', 'Custom Maggam Blouse Stitching Available'],
    designerNote: 'The definitive South Indian muhurtham saree that radiates auspiciousness and traditional glory.',
    pairWith: 'Vaddanam (Gold Waistband) & Temple Haar',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'w_outfit_12',
    name: 'Mustard Yellow Haldi Kurta & Gharara',
    price: 19500,
    originalPrice: 24000,
    gender: 'women',
    category: 'Festive Wear',
    fabric: 'Chanderi Silk with Gota Patti Highlights',
    craftsmanshipTag: 'Festive Ready-to-Wear',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'XS to 3XL',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    description: 'Bright sunshine mustard kurta with intricate gotta patti neckline and cuff borders, paired with a flared gathered gharara and crushed silk dupatta.',
    features: ['Breathable Festive Chanderi Silk', 'Lightweight Hand-embroidery', 'Comfort-fit Elasticated Waistband', 'Includes 2.5m Hand-dyed Dupatta'],
    designerNote: 'Designed specifically for messy Haldi rituals while looking photogenic from every angle.',
    pairWith: 'Yellow Floral Bangles & Juttis',
    careInstructions: 'Dry clean only.'
  },

  // ==========================================
  // 2. 👔 MEN'S COLLECTION (8 Outfits)
  // ==========================================
  {
    id: 'm_outfit_1',
    name: 'Royal Ivory Raw Silk Groom Sherwani',
    price: 85000,
    originalPrice: 98000,
    gender: 'men',
    category: 'Groom Sherwanis',
    fabric: 'Pure Raw Silk with Hand Zardozi & Mukaish Highlights',
    isSpecial: true,
    craftsmanshipTag: 'Imperial Groom Haute Couture',
    deliveryTime: '20-25 Days',
    sizesAvailable: '36, 38, 40, 42, 44, 46, Custom Tailored',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    description: 'Regal ivory raw silk sherwani intricately hand-embroidered with antique French metallic gold zari, pearls, and micro-dabka wirework along the mandarin collar, cuffs, and front placket. Accompanied by silk churidar and handloom tissue safa.',
    features: ['100% Pure Raw Silk Canvas', 'Hand-embroidered by Master Artisans in Lucknow', 'Includes Handwoven Tissue Safa (Turban) & Kalgi', 'Custom Silk Churidar & Matching Stole'],
    designerNote: 'Structured with bespoke chest canvas for an authoritative, aristocratic posture on your wedding day.',
    pairWith: 'Basra Pearl 5-String Kantha Mala & Mojaris',
    careInstructions: 'Strictly Specialist Dry Clean Only.'
  },
  {
    id: 'm_outfit_2',
    name: 'Emerald Velvet Royal Bandhgala Suit',
    price: 45000,
    originalPrice: 52000,
    gender: 'men',
    category: 'Bandhgala & Jodhpuri',
    fabric: 'Italian Micro-Velvet with Hand-carved Brass Crest Buttons',
    craftsmanshipTag: 'Jodhpur Royal Tailoring',
    deliveryTime: '14-18 Days',
    sizesAvailable: '36 to 48, Bespoke Master Cut',
    imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    description: 'Aristocratic jewel-toned emerald green velvet Jodhpuri bandhgala coat paired with bespoke tapered ivory trousers. Features hand-carved lion crest buttons and custom monogram silk jacquard lining.',
    features: ['Italian Micro-Velvet Shell', 'Custom Monogrammed Silk Lining', 'Hand-stitched Horn & Brass Crest Buttons', 'Includes Tapered Slim Trousers'],
    designerNote: 'The definitive cocktail dinner and reception silhouette that flatters any build.',
    pairWith: 'Velvet Smoking Slippers & Gold Pocket Watch',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_3',
    name: 'Onyx Black Silk Tuxedo & Zari Shawl Lapel',
    price: 58000,
    originalPrice: 68000,
    gender: 'men',
    category: 'Tuxedos & Western',
    fabric: 'Raw Silk with Hand-woven Gold Zari Shawl Lapel',
    isSpecial: true,
    craftsmanshipTag: 'Black-Tie Red Carpet',
    deliveryTime: '15-20 Days',
    sizesAvailable: '36 to 48 Bespoke Cut',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Precision bespoke single-breasted tuxedo in midnight onyx raw silk featuring an antique gold handwoven Zari shawl lapel, silk satin covered buttons, and satin-striped trousers.',
    features: ['Hand-canvassed Floating Chest Piece', 'Pure Handloom Zari Shawl Collar', 'Satin-striped Side Seam Trousers', 'Includes Formal Bow Tie & Pocket Square'],
    designerNote: 'Marries classic British savile row tailoring with timeless Indian zari artistry.',
    pairWith: 'Patent Leather Oxfords & Gold Cufflinks',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_4',
    name: 'Mustard Festive Silk Kurta & Nehru Jacket',
    price: 24500,
    originalPrice: 29000,
    gender: 'men',
    category: 'Kurtas & Nehru Jackets',
    fabric: 'Chanderi Silk with Foil Mirror-work Bundi Waistcoat',
    craftsmanshipTag: 'Celebration Haldi Ready',
    deliveryTime: '7-10 Days Express',
    sizesAvailable: 'S, M, L, XL, XXL, 3XL',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
    description: 'Luminous mustard yellow Chanderi silk kurta paired with an intricately embroidered Bundi Nehru waistcoat featuring traditional Gujarati mirror work and silk churidar.',
    features: ['Pure Chanderi Silk Breathable Fabric', 'Foil Mirror & Resham Threadwork Jacket', 'Comfortable Elasticated Silk Churidar', 'Pocket Square & Concealed Placket Included'],
    designerNote: 'Vibrant, joyful, and completely lightweight for day Haldi and Mehendi functions.',
    pairWith: 'Handcrafted Tan Leather Juttis',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_5',
    name: 'Midnight Blue Asymmetrical Achkan Set',
    price: 38000,
    originalPrice: 44000,
    gender: 'men',
    category: 'Indo-Western & Fusion',
    fabric: 'Raw Silk with Diagonal Crossover Antique Metal Fasteners',
    craftsmanshipTag: 'Modern Fusion Groom',
    deliveryTime: '12-15 Days',
    sizesAvailable: '36 to 46',
    imageUrl: 'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary midnight navy Indo-Western Achkan with an architectural crossover front, antique pewter buttons, and an inner cowl drape silk kurta.',
    features: ['Modern Asymmetrical Cut', 'Antique Pewter Hardware', 'Includes Cowl Drape Silk Kurta & Pants', 'Hidden Inseam Mobile & Wallet Pockets'],
    designerNote: 'For the contemporary groom who wants a sharp, fashion-forward silhouette for Sangeet.',
    pairWith: 'Navy Suede Mules & Lapel Pin',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_6',
    name: 'Banarasi Brocade Groom Sherwani in Ruby Maroon',
    price: 72000,
    originalPrice: 85000,
    gender: 'men',
    category: 'Groom Sherwanis',
    fabric: 'Varanasi Handloom Silk Brocade with Pure Gold Zari Butas',
    craftsmanshipTag: 'Heritage Varanasi Looms',
    deliveryTime: '20-25 Days',
    sizesAvailable: '36 to 48 Custom Fit',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    description: 'Opulent deep ruby maroon Varanasi brocade sherwani handwoven with tested gold zari floral butis, paired with a matching embroidered stole and raw silk churidar.',
    features: ['GI-Tagged Varanasi Handloom Brocade', 'Embroidered Mandarin Velvet Collar', 'Matching Brocade Stole with Zari Borders', 'Silk Churidar with 2-inch alteration ease'],
    designerNote: 'A deep auspicious bridal tone that harmonizes beautifully with traditional red lehengas.',
    pairWith: 'Kundan Kalgi & Embroidered Juttis',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_7',
    name: 'Powder Blue Hand-Embroidered Kurta Set',
    price: 18500,
    originalPrice: 22000,
    gender: 'men',
    category: 'Kurtas & Nehru Jackets',
    fabric: 'Mulberry Silk with Tonal Resham Work & Aligarhi Pants',
    craftsmanshipTag: 'Awadh Artisanal Series',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'S to 3XL',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    description: 'Subtle and sophisticated powder blue pure silk kurta with delicate tone-on-tone thread embroidery on the collar and cuffs, paired with comfortable Aligarhi straight pants.',
    features: ['Pure Mulberry Silk Canvas', 'Hand-stitched Threadwork Yoke', 'Comfortable Aligarhi Trousers', 'Breathable Summer Wedding Essential'],
    designerNote: 'Understated luxury that radiates effortless grace during day rituals and pujas.',
    pairWith: 'Silver Kada & Brown Kolhapuris',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'm_outfit_8',
    name: 'Burgundy Velvet Jodhpuri Breeches Set',
    price: 49000,
    originalPrice: 58000,
    gender: 'men',
    category: 'Bandhgala & Jodhpuri',
    fabric: 'Plush Velvet Imperial Coat with Flared Jodhpuri Breeches',
    craftsmanshipTag: 'Polo Club Aristocracy',
    deliveryTime: '15-18 Days',
    sizesAvailable: '36 to 46',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    description: 'Striking burgundy velvet structured Jodhpuri coat paired with classic flared riding breeches, accompanied by handcrafted antique gold buttons.',
    features: ['Rich Micro-Velvet Texture', 'Authentic Flared Breeches Cut', 'Hand-cast Gold Crest Buttons', 'Custom Silk Pocket Lining'],
    designerNote: 'Commands attention at royal palace weddings and winter receptions.',
    pairWith: 'Calf-length Riding Boots or Leather Mojaris',
    careInstructions: 'Dry clean only.'
  },

  // ==========================================
  // 3. 🧒 KIDS & TEENS COLLECTION (6 Outfits)
  // ==========================================
  {
    id: 'k_outfit_1',
    name: 'Little Princess Gold & Magenta Pattu Pavada',
    price: 14500,
    originalPrice: 17500,
    gender: 'kids',
    category: 'Pattu Pavada & Lehengas',
    fabric: 'Pure Kanchipuram Silk with Tested Gold Zari Borders',
    isSpecial: true,
    craftsmanshipTag: 'Pure Silk Heritage Kids',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Ages 1 to 14 Years',
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic South Indian traditional Langa Voni (lehenga choli) set for young girls in vibrant magenta and gold tissue silk with pure temple borders and soft cotton lining.',
    features: ['100% Pure Mulberry Silk Mark Base', 'Soft 100% Breathable Cotton Inner Lining', 'Elasticated Comfort Waist with 2-inch Margin', 'Includes Matching Silk Potli Bag'],
    designerNote: 'Designed specifically with child-safe soft cotton inner stitching so young girls stay comfortable all day.',
    pairWith: 'Little Gold Jhumkas & Bangles',
    careInstructions: 'Gentle Dry Clean Only.'
  },
  {
    id: 'k_outfit_2',
    name: 'Junior Prince Ivory & Gold Zari Sherwani',
    price: 16500,
    originalPrice: 19500,
    gender: 'kids',
    category: 'Junior Sherwanis & Suits',
    fabric: 'Soft Raw Silk with Pearl Buttons & Pre-tied Miniature Safa',
    isSpecial: true,
    craftsmanshipTag: 'Mini Royal Wedding Wear',
    deliveryTime: '7-10 Days',
    sizesAvailable: 'Ages 2 to 15 Years',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    description: 'Charming miniature royal sherwani for boys crafted in soft raw silk with delicate floral dabka embroidery, matching churidar, and an easy pre-tied miniature safa turban.',
    features: ['Lightweight Raw Silk Canvas', 'Pre-tied Stretch Safa with Kalgi', 'Soft Cotton Lined Churidar Pants', 'Breakaway Safe Magnetic Button Accents'],
    designerNote: 'Look just like Dad with identical matching father-son wedding styling options available.',
    pairWith: 'Soft-soled Embroidered Juttis',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'k_outfit_3',
    name: 'Pastel Pink Organza Floral Flare Frock',
    price: 11500,
    originalPrice: 14000,
    gender: 'kids',
    category: 'Party Frocks & Gowns',
    fabric: 'Multi-tier Ruffled Organza with Swarovski Crystal Belt',
    craftsmanshipTag: 'Fairy Tale Kids Couture',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Ages 1 to 12 Years',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-tiered dream ballroom dress for young girls with hand-painted watercolor florals, fluttering cap sleeves, and a sparkly crystal sash waistband.',
    features: ['Hypoallergenic Soft Tulle & Organza', 'Multiple Flared Ruffle Tiers', 'Comfortable Cotton-Modal Lining', 'Concealed Soft Back Zipper'],
    designerNote: 'Perfect for flower girls, birthday banquets, and wedding receptions.',
    pairWith: 'Floral Tiara & Pink Ballerina Shoes',
    careInstructions: 'Gentle Hand Wash or Dry Clean.'
  },
  {
    id: 'k_outfit_4',
    name: 'Boys Mustard Silk Kurta & Brocade Dhoti Set',
    price: 8900,
    originalPrice: 11000,
    gender: 'kids',
    category: 'Kurta Dhoti Sets',
    fabric: 'Soft Mulberry Silk Kurta with Readymade Zari Dhoti Pants',
    craftsmanshipTag: 'Festive Ready Instant Wear',
    deliveryTime: '3-5 Days Express',
    sizesAvailable: 'Ages 1 to 14 Years',
    imageUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80',
    description: 'Vibrant Haldi festive outfit for boys featuring an easy slip-on pre-pleated gold brocade dhoti and an auspicious sunshine yellow silk kurta with gotta borders.',
    features: ['Elasticated Pre-stitched Dhoti (No Tieing Needed)', 'Breathable Silk Kurta with Pocket', 'Ultra-soft Non-itchy Seam Finish', 'Easy Machine Washable on Gentle Cycle'],
    designerNote: 'Slip on in 30 seconds with zero wrestling over traditional dhoti folds.',
    pairWith: 'Traditional Mojaris',
    careInstructions: 'Dry clean or gentle hand wash.'
  },
  {
    id: 'k_outfit_5',
    name: 'Teens Mint Green Embroidered Anarkali Gown',
    price: 18000,
    originalPrice: 21500,
    gender: 'kids',
    category: 'Pattu Pavada & Lehengas',
    fabric: 'Pure Georgette & Organza with Floral Resham Embroidery',
    craftsmanshipTag: 'Teenage Debutante Series',
    deliveryTime: '7-10 Days',
    sizesAvailable: 'Ages 10 to 17 Years (Teens S, M, L)',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Graceful pastel mint green Anarkali gown tailored for teenage girls, featuring delicate floral thread embroidery, scalloped dupatta, and comfortable leggings.',
    features: ['Lightweight Flowing Georgette', 'Delicate Resham Needlework', 'Includes Sheer Organza Scalloped Dupatta', 'Adjustable Waist Drawstring Ties'],
    designerNote: 'Strikes the ideal balance between festive grandeur and age-appropriate modesty.',
    pairWith: 'Pastel Jhumkas & Comfortable Flats',
    careInstructions: 'Dry clean only.'
  },
  {
    id: 'k_outfit_6',
    name: 'Boys Royal Blue Velvet Waistcoat & Kurta Set',
    price: 12500,
    originalPrice: 15000,
    gender: 'kids',
    category: 'Junior Sherwanis & Suits',
    fabric: 'Micro-Velvet Embroidered Jacket with Crisp Silk Kurta',
    craftsmanshipTag: 'Royal Junior Festive',
    deliveryTime: '5-7 Days Express',
    sizesAvailable: 'Ages 2 to 14 Years',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    description: 'Smart 3-piece celebratory set with a plush midnight royal blue velvet Nehru jacket with gold lion crest buttons over a silk kurta and white churidar pants.',
    features: ['Removable Embroidered Velvet Waistcoat', 'Breathable Pure Cotton-Silk Kurta', 'Comfort Elasticated Churidar', 'Pocket Square Accent Included'],
    designerNote: 'Can be worn with or without the jacket for maximum versatility during ceremonies.',
    pairWith: 'Classic Black or Tan Juttis',
    careInstructions: 'Dry clean only.'
  }
];

// ==============================================================
// VERIFIED CUSTOMER REVIEWS & TAILORED OUTFIT FITTING SHOWCASE
// ==============================================================
export const OUTFIT_SPECIFIC_REVIEWS: Record<string, OutfitReviewItem[]> = {
  // 1. Royal Crimson Zardozi Bridal Lehenga
  w_outfit_1: [
    {
      id: 'rev_w1_1',
      customerName: 'Pooja & Varun Singhania',
      customerCity: 'Indiranagar, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 3 days ago',
      occasion: '💍 Bridal Pheras & Wedding Day',
      tailoredFitNote: 'Custom sweetheart blouse tailoring with heavy pearl latkans; lehenga length adjusted to perfection with double can-can layers for 3-inch heels.',
      trialExperience: 'Booked the Ground Floor bridal trial suite. Master Tailor Rameshji was exceptionally patient and completed final adjustments in 45 minutes flat!',
      comment: 'I cannot express how stunning this bridal lehenga looked under the mandap lights! The Agra zardozi and antique gold dabka needlework glistened with royal grandeur. Even though it is heavy pure raw silk, the waistband engineering balanced the weight effortlessly. My entire family was awestruck!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
          caption: 'Final wedding day photoshoot at the palace mandap after in-store blouse tailoring.',
          customerTag: 'Pooja Singhania (Bridal Shoot)',
          occasion: 'Wedding Day'
        },
        {
          url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
          caption: 'In-store fitting session in the Ground Floor luxury trial room.',
          customerTag: 'Pooja S. (Trial Suite)',
          occasion: 'Trial Fitting'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 38
    },
    {
      id: 'rev_w1_2',
      customerName: 'Divya Subramaniam',
      customerCity: 'Chennai',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 2 weeks ago',
      occasion: '✨ Wedding Reception',
      tailoredFitNote: 'Ordered online via 4K video consultation; mall master tailor stitched blouse according to my measurements. Delivered in 4 days by express courier with zero alteration needed.',
      trialExperience: 'Virtual video call shopping was super smooth; stylist draped both dupattas on mannequin live on screen.',
      comment: 'The pure raw silk and dual dupattas (scalloped organza + velvet veil) look identical to high-end multi-lakh designer ateliers! The finish of the can-can and interlocking stitching is top-notch. Worth every rupee.',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
          caption: 'Reception ballroom stage look with dual dupatta drape.',
          customerTag: 'Divya S. (Reception Look)',
          occasion: 'Reception'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 24
    }
  ],

  // 2. Kanchipuram Pure Gold Tissue Brocade Saree
  w_outfit_2: [
    {
      id: 'rev_w2_1',
      customerName: 'Ananya & Karthik Iyer',
      customerCity: 'Malleshwaram, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 5 days ago',
      occasion: '🪔 Traditional Muhurtham Ceremony',
      tailoredFitNote: 'Custom Maggam work blouse stitched by on-site mall tailors with antique temple coin tassels and pure gold zari sleeve borders. Saree pre-pleated for quick 5-minute muhurtham draping.',
      trialExperience: 'The in-store saree drape master demonstrated three different South Indian muhurtham drape styles in the Ground Floor trial suite.',
      comment: 'The luminous metallic sheen of this certified pure Silk Mark tissue silk is truly out of this world! It reflects gold warmth without being overly gaudy. The Korvai interlocking temple border is pure generational heritage handloom. Received so many compliments from elderly relatives!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
          caption: 'Temple muhurtham drape with antique temple jewelry & Jasmine gajra.',
          customerTag: 'Ananya Iyer (Muhurtham)',
          occasion: 'Muhurtham'
        },
        {
          url: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=900&q=80',
          caption: 'In-store trial room fitting of custom hand-embroidered blouse.',
          customerTag: 'Ananya I. (Trial Room)',
          occasion: 'Trial Fitting'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 42
    }
  ],

  // 3. Emerald Velvet Anarkali & Organza Dupatta
  w_outfit_3: [
    {
      id: 'rev_w3_1',
      customerName: 'Dr. Sneha Kulkarni',
      customerCity: 'Whitefield, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 1 week ago',
      occasion: '💃 Winter Sangeet & Cocktail',
      tailoredFitNote: 'Churidar sleeves tapered neatly around wrists; floor length hem raised 1.2 inches for comfortable dancing in mojris.',
      trialExperience: 'Ground floor trial room alteration was ready in only 35 minutes while I visited the coffee lounge.',
      comment: 'Deep royal emerald jewel-tone velvet that feels luxurious to touch. The Jaipur Gota Patti threadwork is crisp and light. I danced non-stop for 4 hours and felt totally comfortable. Outstanding fitting!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80',
          caption: 'Sangeet night stage performance look in tailored emerald velvet.',
          customerTag: 'Dr. Sneha K. (Sangeet)',
          occasion: 'Sangeet Night'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 19
    }
  ],

  // 4. Pastel Blush Embroidered Reception Gown
  w_outfit_4: [
    {
      id: 'rev_w4_1',
      customerName: 'Natasha Miranda',
      customerCity: 'Koramangala, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 2 weeks ago',
      occasion: '🥂 Red Carpet Wedding Reception',
      tailoredFitNote: 'Built-in steel corset boning adjusted precisely to 27" waist; 1.2-meter cathedral train bustled with hidden satin buttons.',
      trialExperience: 'Private trial room with 360-degree mirrored pedestals allowed me to inspect the sweeping train from every angle.',
      comment: 'Felt like a modern fairy princess! The Swarovski crystals catch every spotlight without looking overpowering. The internal corset supports you so well that you feel completely weightless on the dance floor.',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
          caption: 'Ballroom grand entrance look with tailored swept train.',
          customerTag: 'Natasha M. (Reception Gown)',
          occasion: 'Reception'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 29
    }
  ],

  // 5. Men's Royal Ivory Raw Silk Groom Sherwani
  m_outfit_1: [
    {
      id: 'rev_m1_1',
      customerName: 'Rohan Deshmukh',
      customerCity: 'Whitefield, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 4 days ago',
      occasion: '👑 Groom Baraat & Wedding Mandap',
      tailoredFitNote: 'Bespoke chest canvas tailored to 40 Regular; matching raw silk churidar and handloom tissue safa tied to precision with jewelled kalgi.',
      trialExperience: 'First Floor Men’s Studio trial was top-class. Senior stylist assisted in matching my safa and Basra pearl kantha mala.',
      comment: 'Felt authoritative and truly royal on my wedding day! The hand zardozi along the mandarin collar and cuffs is master craftsman level. Even during the 3-hour long rituals under heat, the natural raw silk remained cool and breathable. High-five to the mall tailoring master!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
          caption: 'Groom entrance photoshoot with hand-tied safa and antique pearl buttons.',
          customerTag: 'Rohan Deshmukh (Groom Shoot)',
          occasion: 'Wedding Day'
        },
        {
          url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
          caption: 'Close-up of bespoke collar embroidery & matching brocade stole.',
          customerTag: 'Rohan D. (Fitting Room)',
          occasion: 'Trial Fitting'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 45
    },
    {
      id: 'rev_m1_2',
      customerName: 'Siddharth Menon',
      customerCity: 'Mumbai',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 3 weeks ago',
      occasion: '🎩 Wedding Ceremony',
      tailoredFitNote: 'The master tailor embroidered our wedding date initials on the inner silk lining. Shoulder pads customized for upright posture.',
      trialExperience: 'Took 1-on-1 virtual consultation, ordered and received express delivery in Mumbai within 5 days.',
      comment: 'Superlative fabric and finish. Fits like a glove right out of the box with generous alteration margins on the inside seams.',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&w=900&q=80',
          caption: 'Stage ceremony portrait with coordinated silk churidar.',
          customerTag: 'Siddharth M. (Mandap)',
          occasion: 'Mandap'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 22
    }
  ],

  // 6. Emerald Velvet Royal Bandhgala Suit
  m_outfit_2: [
    {
      id: 'rev_m2_1',
      customerName: 'Vikramaditya Rathore',
      customerCity: 'Hyderabad',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 6 days ago',
      occasion: '🍸 Sangeet & Royal Cocktail Dinner',
      tailoredFitNote: 'Structured Italian micro-velvet shell cut to 42 Slim; tapered ivory trousers hemmed to no-break length for velvet loafers.',
      trialExperience: 'First floor alteration master completed waist suppression and cuff alterations in 30 minutes while I waited.',
      comment: 'The emerald jewel-tone velvet has an aristocratic presence that turns heads. The hand-carved lion crest buttons and silk jacquard lining give it genuine bespoke heritage credibility. Everyone thought I got it tailored at a royal Jodhpur atelier!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
          caption: 'Cocktail dinner stage portrait in tailored emerald velvet bandhgala.',
          customerTag: 'Vikramaditya R. (Sangeet)',
          occasion: 'Cocktail Night'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 31
    }
  ],

  // 7. Onyx Black Silk Tuxedo & Zari Shawl Lapel
  m_outfit_3: [
    {
      id: 'rev_m3_1',
      customerName: 'Arjun Kapoor',
      customerCity: 'Koramangala, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 1 week ago',
      occasion: '🎩 Black-Tie Reception',
      tailoredFitNote: 'Satin-striped trousers tapered to 32 waist; raw silk tuxedo jacket tailored with single-button closure and handwoven gold zari lapel.',
      trialExperience: 'First Floor Men’s trial room was clean and well-lit. Master tailor measured chest and sleeve length with laser precision.',
      comment: 'The gold zari shawl lapel against midnight onyx silk is the ultimate Indo-Western statement. It looks modern yet deeply rooted in Indian celebratory culture. Received continuous compliments all evening!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
          caption: 'Black-tie reception party portrait in tailored raw silk tuxedo.',
          customerTag: 'Arjun K. (Reception Look)',
          occasion: 'Reception'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 27
    }
  ],

  // 8. Little Princess Gold & Magenta Pattu Pavada
  k_outfit_1: [
    {
      id: 'rev_k1_1',
      customerName: 'Meera & Nidhi Krishnan',
      customerCity: 'Jayanagar, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 2 days ago',
      occasion: '👧 Daughter’s 5th Birthday & Temple Puja',
      tailoredFitNote: 'Skirt length adjusted by 1.5 inches with adjustable cotton drawstring; blouse sleeves tailored with soft elastic puff cuffs.',
      trialExperience: 'Second Floor Kids’ Kingdom has a fun play corner so my 5-year-old was happily distracted while the tailor took quick measurements!',
      comment: 'Most kids refuse to wear heavy silks because of itchy seams, but this outfit has a 100% breathable pure cotton inner lining! My daughter wore it from morning temple puja till evening cake cutting without complaining once. She looked like a sweet little goddess!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
          caption: 'Temple puja celebration photo in pure magenta & gold tissue pattu pavada.',
          customerTag: 'Nidhi (Age 5, Birthday)',
          occasion: 'Birthday Puja'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 34
    }
  ],

  // 9. Junior Prince Ivory & Gold Zari Sherwani
  k_outfit_2: [
    {
      id: 'rev_k2_1',
      customerName: 'Sangeeta & Ayaan Reddy',
      customerCity: 'HSR Layout, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 4 days ago',
      occasion: '👑 Uncle’s Baraat & Wedding',
      tailoredFitNote: 'Tailored for 6-year-old boy; soft elasticated churidar and comfortable pre-tied miniature safa turban with gold kalgi.',
      trialExperience: 'Second Floor Kids trial room was spotless. Master tailor was so gentle and finished sleeve adjustments in 20 minutes.',
      comment: 'He looked like an adorable mini Maharaja! No rough threads on the inside, soft silk lining, and the miniature safa stayed on his head all evening. Best festive wear we’ve ever bought for our son.',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80',
          caption: 'Wedding celebration snap of 6-year-old in tailored junior sherwani.',
          customerTag: 'Ayaan R. (Age 6, Wedding)',
          occasion: 'Family Wedding'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 26
    }
  ],

  // 10. Floral Ruffled Birthday Fairy Frock in Peach
  k_outfit_3: [
    {
      id: 'rev_k3_1',
      customerName: 'Priya & Aarohi Nair',
      customerCity: 'Indiranagar, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 5 days ago',
      occasion: '🎂 4th Birthday Fairy Tale Party',
      tailoredFitNote: 'Multi-tiered ruffle skirt steamed and fluffed; chest yoke adjusted for snug and comfortable fit.',
      trialExperience: 'Trial was fun and quick on Second Floor Kids section. The mall packaging even came with a matching fairy hairband!',
      comment: 'The cascading ruffles are so fluffy and voluminous! Made of soft skin-friendly tulle that didn’t poke her skin. She spun around like a princess all through her party. Everyone asked where we got it!',
      tailoredPhotos: [
        {
          url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
          caption: 'Birthday cake cutting photoshoot in tailored cascading fairy frock.',
          customerTag: 'Aarohi (Age 4, Birthday)',
          occasion: 'Birthday Party'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 21
    }
  ]
};

// Map preset catalog product IDs to their corresponding outfit review records
OUTFIT_SPECIFIC_REVIEWS['prod_fash_w1'] = OUTFIT_SPECIFIC_REVIEWS['w_outfit_1'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_w2'] = OUTFIT_SPECIFIC_REVIEWS['w_outfit_2'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_w3'] = OUTFIT_SPECIFIC_REVIEWS['w_outfit_3'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_w4'] = OUTFIT_SPECIFIC_REVIEWS['w_outfit_4'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_m1'] = OUTFIT_SPECIFIC_REVIEWS['m_outfit_1'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_m2'] = OUTFIT_SPECIFIC_REVIEWS['m_outfit_2'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_m3'] = OUTFIT_SPECIFIC_REVIEWS['m_outfit_3'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_k1'] = OUTFIT_SPECIFIC_REVIEWS['k_outfit_1'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_k2'] = OUTFIT_SPECIFIC_REVIEWS['k_outfit_2'];
OUTFIT_SPECIFIC_REVIEWS['prod_fash_k3'] = OUTFIT_SPECIFIC_REVIEWS['k_outfit_3'];

/**
 * Returns verified customer reviews with tailored outfit fitting photos for any outfit.
 * If not specifically hardcoded, generates bespoke authentic reviews matched to gender, category & name.
 */
export function getOutfitReviews(outfit: OutfitItemData): OutfitReviewItem[] {
  if (OUTFIT_SPECIFIC_REVIEWS[outfit.id] && OUTFIT_SPECIFIC_REVIEWS[outfit.id].length > 0) {
    return OUTFIT_SPECIFIC_REVIEWS[outfit.id];
  }

  if (outfit.gender === 'men') {
    return [
      {
        id: `gen_rev_${outfit.id}_1`,
        customerName: 'Rajesh & Kavita Singhal',
        customerCity: 'Indiranagar, Bengaluru',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        reviewDate: 'Reviewed 4 days ago',
        occasion: '🎩 Festive Celebration & Family Reception',
        tailoredFitNote: `Custom tailored at First Floor Men’s Studio. Shoulder width and sleeve length altered to precision; trouser waist adjusted for maximum comfort.`,
        trialExperience: 'Trial room session on Floor 1 was seamless. Master tailor took laser-accurate measurements and altered in under 40 minutes.',
        comment: `We purchased the ${outfit.name} for our family event. The craftsmanship and fabric texture (${outfit.fabric}) are outstanding. The fit gave a structured, regal posture and felt remarkably breathable. Outstanding quality!`,
        tailoredPhotos: [
          {
            url: outfit.imageUrl,
            caption: `Tailored outfit presentation for ${outfit.name}`,
            customerTag: 'Rajesh S. (Men’s Studio Fit)',
            occasion: 'Reception'
          },
          {
            url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
            caption: 'Customer fitting trial session in private Men’s fitting room.',
            customerTag: 'In-Store Trial Room Fit',
            occasion: 'Trial Fitting'
          }
        ],
        verifiedBuyer: true,
        helpfulCount: 22
      },
      {
        id: `gen_rev_${outfit.id}_2`,
        customerName: 'Aditya Mathur',
        customerCity: 'Hyderabad',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        reviewDate: 'Reviewed 1 week ago',
        occasion: '✨ Sangeet & Cocktail Night',
        tailoredFitNote: 'Ordered online; mall master tailor stitched it to exact chest size with generous internal alteration margins.',
        trialExperience: 'Virtual consultation was very detailed; team shared high-res fabric close-ups before dispatch.',
        comment: `The finish on this ${outfit.category} piece is equal to top bespoke designer salons. The drape is crisp and doesn’t crease easily. Extremely satisfied!`,
        tailoredPhotos: [
          {
            url: outfit.imageUrl,
            caption: `Tailored look for ${outfit.name} at wedding dinner.`,
            customerTag: 'Aditya M. (Sangeet Night)',
            occasion: 'Sangeet'
          }
        ],
        verifiedBuyer: true,
        helpfulCount: 15
      }
    ];
  }

  if (outfit.gender === 'kids') {
    return [
      {
        id: `gen_rev_${outfit.id}_1`,
        customerName: 'Swathi & Ananya Rao',
        customerCity: 'Koramangala, Bengaluru',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        reviewDate: 'Reviewed 3 days ago',
        occasion: '🎉 Festive Celebration & Birthday Party',
        tailoredFitNote: 'Custom waist and length adjustments completed in 20 minutes at Second Floor Kids Kingdom trial room.',
        trialExperience: 'Very child-friendly trial room with gentle tailors who made the fitting fun and hassle-free.',
        comment: `Got this ${outfit.name} for our little one. The soft cotton inner lining prevents any scratching on sensitive skin. Looks so celebratory and festive in photos!`,
        tailoredPhotos: [
          {
            url: outfit.imageUrl,
            caption: `Birthday celebration photo in tailored ${outfit.name}`,
            customerTag: 'Ananya R. (Family Celebration)',
            occasion: 'Celebration'
          },
          {
            url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80',
            caption: 'Customer fitting trial session on Second Floor Kids Kingdom.',
            customerTag: 'Kids Trial Room Fit',
            occasion: 'Trial Fitting'
          }
        ],
        verifiedBuyer: true,
        helpfulCount: 25
      }
    ];
  }

  // Default: Women's Collection
  return [
    {
      id: `gen_rev_${outfit.id}_1`,
      customerName: 'Radhika & Deepak Sharma',
      customerCity: 'Indiranagar, Bengaluru',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 3 days ago',
      occasion: '💍 Wedding & Grand Reception',
      tailoredFitNote: `Bespoke tailoring done on Ground Floor; custom blouse stitched with matching latkans and neckline fitting. Saree/lehenga fall and pico completed on-site.`,
      trialExperience: 'Private luxury trial room on Ground Floor was spacious. Alteration master Ramesh finished adjustments in 45 minutes flat.',
      comment: `The ${outfit.name} was the star of our event! The pure fabric (${outfit.fabric}) has an ethereal fall and shine. The craftsmanship details are mesmerizing in person. Received endless compliments all evening!`,
      tailoredPhotos: [
        {
          url: outfit.imageUrl,
          caption: `Wedding celebration portrait in tailored ${outfit.name}`,
          customerTag: 'Radhika S. (Grand Reception)',
          occasion: 'Reception'
        },
        {
          url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
          caption: 'In-store fitting and drape trial on Ground Floor.',
          customerTag: 'Ground Floor Trial Room Fit',
          occasion: 'Trial Fitting'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 33
    },
    {
      id: `gen_rev_${outfit.id}_2`,
      customerName: 'Shalini Murthy',
      customerCity: 'Chennai',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      reviewDate: 'Reviewed 1 week ago',
      occasion: '✨ Festive Muhurtham Celebration',
      tailoredFitNote: 'Ordered online via WhatsApp consultation; stitched with extra alteration margins inside.',
      trialExperience: 'Video call consultation was wonderful. Stylist demonstrated drape options live.',
      comment: `Superior quality silk and handwork! The finishing on the seams is completely clean with zero loose threads. Highly recommended.`,
      tailoredPhotos: [
        {
          url: outfit.imageUrl,
          caption: `Celebration photo in tailored ${outfit.name}`,
          customerTag: 'Shalini M. (Muhurtham)',
          occasion: 'Muhurtham'
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 18
    }
  ];
}

export interface MallShopperReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  department: 'Women’s Silks & Bridal' | 'Men’s Suits & Sherwanis' | 'Kids Kingdom' | 'Custom Tailoring';
  outfitPurchased?: string;
  fitFeedback: 'True to Size' | 'Perfect Bespoke Fit' | 'Master Tailor Adjusted';
  date: string;
  verified: boolean;
  likes: number;
}

export interface FashionFaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FASHION_MALL_FAQS: FashionFaqItem[] = [
  {
    id: 'ffaq-1',
    category: 'Trial Rooms & Stylists',
    question: 'Can I visit the mall to try on outfits with personal stylist assistance?',
    answer: 'Yes! We feature spacious, private fitting rooms on each floor. You can reserve a dedicated stylist and fitting slot online via our "Book Trial Room" button. Your chosen outfits, accessories, and shoes will be pre-steamed and kept ready in your private suite.'
  },
  {
    id: 'ffaq-2',
    category: 'Custom Tailoring & Alterations',
    question: 'Do you offer made-to-measure custom bridal tailoring, blouse stitching, and alterations?',
    answer: 'Absolutely. Our master karigars provide precision made-to-measure tailoring, bridal lehenga fitting, bespoke men’s sherwani cuts, and hand embroidery alterations. Standard alterations are completed within 24 to 48 hours.'
  },
  {
    id: 'ffaq-3',
    category: 'Sizes & Family Ensembles',
    question: 'Are matching family outfits available across Men, Women, and Kids collections?',
    answer: 'Yes, we curate synchronized festive & wedding trousseau combos (matching bride lehenga, groom sherwani/kurta, and sibling/kids pattu pavada in matching heritage weaves and Pantone shades). Check our "Curated Family Combos" section above.'
  },
  {
    id: 'ffaq-4',
    category: 'Authenticity & Fabrics',
    question: 'How do you guarantee the purity of Kanchipuram silks and designer fabrics?',
    answer: 'Every pure silk saree comes with an authorized Silk Mark India hologram and certificate. We use authentic pure zari, mulberry silk, breathable handloom linens, and certified pure wool-cashmere blends with zero synthetic adulteration.'
  },
  {
    id: 'ffaq-5',
    category: 'Shipping & Delivery',
    question: 'Do you deliver across India and ship internationally (USA, UK, UAE, Canada)?',
    answer: 'Yes! We provide complimentary express shipping across India via BlueDart/DTDC (2-4 business days). International orders are shipped via DHL Express worldwide (5-7 business days) with end-to-end tracking and secure export packaging.'
  },
  {
    id: 'ffaq-6',
    category: 'Exchanges & Returns',
    question: 'What is your size exchange and return policy for online orders?',
    answer: 'We offer an easy 7-day doorstep size exchange policy on all standard catalog garments. If an outfit requires minor adjustments or a different size, our courier picks it up directly from your doorstep with no hassle.'
  }
];

export const DEFAULT_MALL_REVIEWS: MallShopperReviewItem[] = [
  {
    id: 'mrev-1',
    name: 'Radhika Sharma & Vikram Verma',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    review: 'We booked the bridal suite trial room for our wedding trousseau shopping. The stylists had all 4 lehengas and sherwanis steamed and accessorized. The bespoke master tailor took our exact measurements on the spot!',
    department: 'Women’s Silks & Bridal',
    outfitPurchased: 'Crimson Zardozi Bridal Lehenga & Velvet Sherwani',
    fitFeedback: 'Perfect Bespoke Fit',
    date: '2 days ago',
    verified: true,
    likes: 38
  },
  {
    id: 'mrev-2',
    name: 'Rohan Kapoor',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    review: 'First floor Men’s Studio is phenomenal. Found the perfect Italian Wool Bandhgala and Jodhpuri suit for my reception. Alterations were completed within 24 hours with razor-sharp lapels.',
    department: 'Men’s Suits & Sherwanis',
    outfitPurchased: 'Midnight Blue Hand-Embroidered Bandhgala',
    fitFeedback: 'True to Size',
    date: '5 days ago',
    verified: true,
    likes: 24
  },
  {
    id: 'mrev-3',
    name: 'Sneha & Arun Kulkarni',
    location: 'HSR Layout, Bengaluru',
    rating: 5,
    review: 'Second floor Kids Kingdom was a delight for Diwali shopping. Got matching pattu pavadas for our 5-year-old and junior sherwani for our 8-year-old. The pure cotton linings are so soft and kid-friendly!',
    department: 'Kids Kingdom',
    outfitPurchased: 'Festive Pattu Pavada & Junior Sherwani Set',
    fitFeedback: 'True to Size',
    date: '1 week ago',
    verified: true,
    likes: 19
  },
  {
    id: 'mrev-4',
    name: 'Dr. Meenakshi Sundaram',
    location: 'Jayanagar, Bengaluru',
    rating: 5,
    review: 'The Silk Mark certified Kanchipuram Brocade Saree exceeded all expectations. The pure gold zari gleams under wedding hall lighting. Delivered within 48 hours in luxury hardbound keepsake box.',
    department: 'Women’s Silks & Bridal',
    outfitPurchased: 'Pure Gold Tissue Kanchipuram Brocade Saree',
    fitFeedback: 'True to Size',
    date: '2 weeks ago',
    verified: true,
    likes: 31
  }
];

export default function FashionTemplateView({
  profile,
  cart,
  addToCart,
  updateQuantity,
  setIsCartOpen,
  selectedCurrency,
  setSelectedCurrency,
  formatPrice,
  totalConvertedPrice,
  setIsUPIModalOpen,
  setBookingService,
  setBookingSuccess,
  quoteServices,
  toggleQuoteService,
  sendWhatsAppQuotation,
  leadName,
  setLeadName,
  leadEmail,
  setLeadEmail,
  leadPhone,
  setLeadPhone,
  leadMessage,
  setLeadMessage,
  handleLeadSubmit,
  leadSuccess,
  trackAction,
  getCleanWhatsAppNumber,
  getEmbedUrl,
  viewMode,
  setViewMode,
  showViewToggle = true
}: FashionTemplateViewProps) {
  // GENDER / AUDIENCE SEGMENT FILTER: 'all' | 'women' | 'men' | 'kids'
  const [genderFilter, setGenderFilter] = useState<'all' | GenderType>('all');

  // Fashion Mall Reviews & Testimonials State
  const [mallReviews, setMallReviews] = useState<MallShopperReviewItem[]>(DEFAULT_MALL_REVIEWS);
  const [mallReviewFilter, setMallReviewFilter] = useState<'all' | '5star' | 'bridal' | 'mens' | 'kids'>('all');
  const [isMallReviewModalOpen, setIsMallReviewModalOpen] = useState<boolean>(false);
  const [newMallReviewName, setNewMallReviewName] = useState<string>('');
  const [newMallReviewLocation, setNewMallReviewLocation] = useState<string>('');
  const [newMallReviewRating, setNewMallReviewRating] = useState<number>(5);
  const [newMallReviewDepartment, setNewMallReviewDepartment] = useState<'Women’s Silks & Bridal' | 'Men’s Suits & Sherwanis' | 'Kids Kingdom' | 'Custom Tailoring'>('Women’s Silks & Bridal');
  const [newMallReviewItem, setNewMallReviewItem] = useState<string>('');
  const [newMallReviewText, setNewMallReviewText] = useState<string>('');
  const [newMallReviewFit, setNewMallReviewFit] = useState<'True to Size' | 'Perfect Bespoke Fit' | 'Master Tailor Adjusted'>('True to Size');
  const [mallReviewSuccess, setMallReviewSuccess] = useState<string>('');

  // Frequently Asked Questions Accordion State
  const [openFashionFaqId, setOpenFashionFaqId] = useState<string | null>('ffaq-1');
  
  // Category & Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals State
  const [activeDetailItem, setActiveDetailItem] = useState<OutfitItemData | null>(null);
  const [detailModalTab, setDetailModalTab] = useState<'reviews' | 'specs'>('reviews');
  const [previewReviewPhoto, setPreviewReviewPhoto] = useState<OutfitReviewPhoto | null>(null);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [userVotedHelpful, setUserVotedHelpful] = useState<Record<string, boolean>>({});
  const [userSubmittedReviews, setUserSubmittedReviews] = useState<Record<string, OutfitReviewItem[]>>({});
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewerCity, setNewReviewerCity] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewOccasion, setNewReviewOccasion] = useState('Wedding / Reception');
  const [newReviewFitNote, setNewReviewFitNote] = useState('Custom tailored fit; altered at mall trial room.');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalOutfit, setOrderModalOutfit] = useState<OutfitItemData | null>(null);
  const [orderModalDeal, setOrderModalDeal] = useState<BridalPackageDeal | null>(null);
  const [isCartOrder, setIsCartOrder] = useState(false);
  
  // 2-Option Order Mode: 'atelier' (In-store trial) vs 'delivery' (Courier shipping)
  const [orderMode, setOrderMode] = useState<'atelier' | 'delivery'>('atelier');
  
  // In-store atelier trial fields
  const [trialCustomerName, setTrialCustomerName] = useState('');
  const [trialCustomerPhone, setTrialCustomerPhone] = useState('');
  const [trialDate, setTrialDate] = useState('2026-10-18');
  const [trialTimeSlot, setTrialTimeSlot] = useState('Afternoon (02:00 PM - 05:00 PM)');
  const [trialSpecialNotes, setTrialSpecialNotes] = useState('');
  
  // Doorstep Delivery fields
  const [deliveryCustomerName, setDeliveryCustomerName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryCityPincode, setDeliveryCityPincode] = useState('');
  const [deliveryMeasurementSize, setDeliveryMeasurementSize] = useState('Custom Made-to-Measure');
  const [deliveryPaymentMode, setDeliveryPaymentMode] = useState<'whatsapp_upi' | 'cod'>('whatsapp_upi');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Table / Bridal Fitting Reservation State
  const [isFittingBookingOpen, setIsFittingBookingOpen] = useState(false);
  const [bookGuests, setBookGuests] = useState('1 Bride + 2 Family Members');
  const [bookOccasion, setBookOccasion] = useState('Wedding / Muhurtham');
  const [bookDate, setBookDate] = useState('2026-10-20');
  const [bookTime, setBookTime] = useState('11:00 AM');

  // QR Modal
  const [isWebsiteQrModalOpen, setIsWebsiteQrModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Coupon Copy Feedback
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Local Quantity helper for individual item cards
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => localQuantities[id] || 1;
  const setQty = (id: string, delta: number) => {
    setLocalQuantities(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Profile Credentials & Formatted Info
  const boutiqueName = profile.company || profile.name || 'Grand Fashion & Clothing Shopping Mall';
  const designerTitle = profile.designation || 'Multi-Floor Fashion Shopping Mall • Men’s, Women’s & Kids’ Collections';
  const phoneDisplay = profile.phone || '+91 63049 89071';
  const waNumber = getCleanWhatsAppNumber(profile);
  const cleanPhoneDigits = phoneDisplay.replace(/[^\d+]/g, '');
  const [profileUrl, setProfileUrl] = useState<string>(`https://oneclickbiz.in/v/${profile.slug}`);
  const mallAddress = profile.address || 'OneClickBiz Grand Mall, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038';

  // Social Links
  const instagramUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'instagram')?.url || 'https://instagram.com/oneclickbiz';
  const youtubeUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'youtube')?.url || 'https://youtube.com/@oneclickbiz';
  const facebookUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'facebook')?.url || 'https://facebook.com/oneclickbiz';

  // Sync profileUrl client-side and generate QR code after mount to prevent SSR hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setProfileUrl(currentUrl);
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#241208',
          light: '#FFFFFF'
        }
      })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR code generation error:', err));
    }
  }, [profile.slug]);

  // Combine products dynamically from profile builder or default catalog (Ensuring Men's and Kids' are ALWAYS populated!)
  const allOutfits: OutfitItemData[] = useMemo(() => {
    let customItems: OutfitItemData[] = [];
    if (profile.sectionData?.products?.items && profile.sectionData.products.items.length > 0) {
      customItems = profile.sectionData.products.items.map((p, idx) => {
        const rawGender: GenderType = (p as any).gender || (
          p.name.toLowerCase().includes('men') || p.name.toLowerCase().includes('groom') || p.name.toLowerCase().includes('sherwani') || p.name.toLowerCase().includes('tuxedo') || p.name.toLowerCase().includes('bandhgala') || p.name.toLowerCase().includes('achkan') || p.name.toLowerCase().includes('suit') || p.name.toLowerCase().includes('kurta') ? 'men' :
          p.name.toLowerCase().includes('kid') || p.name.toLowerCase().includes('boy') || p.name.toLowerCase().includes('girl') || p.name.toLowerCase().includes('pattu pavada') || p.name.toLowerCase().includes('frock') || p.name.toLowerCase().includes('junior') || p.name.toLowerCase().includes('teen') ? 'kids' : 'women'
        );

        return {
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: (p as any).originalPrice || Math.round(p.price * 1.2),
          gender: rawGender,
          category: p.category || (rawGender === 'men' ? 'Groom Sherwanis' : rawGender === 'kids' ? 'Pattu Pavada & Lehengas' : 'Bridal'),
          fabric: (p as any).fabric || p.description || 'Pure Silk & Handcrafted Zari',
          isSpecial: idx === 0 || (p as any).isSpecial,
          craftsmanshipTag: (p as any).craftsmanshipTag || 'Mall Exclusive & Handloom Certified',
          deliveryTime: (p as any).deliveryTime || 'In-Stock • 3-5 Days Express',
          sizesAvailable: (p as any).sizesAvailable || 'XS, S, M, L, XL, XXL & Custom Tailoring',
          imageUrl: p.imageUrl || DEFAULT_BOUTIQUE_OUTFITS[idx % DEFAULT_BOUTIQUE_OUTFITS.length].imageUrl,
          description: p.description || 'Premium designer apparel from our Grand Fashion Shopping Mall department collections.',
          features: (p as any).features || [
            '100% Quality & Fabric Certified',
            'In-store trial rooms & alteration master on-site',
            'Custom size tailoring with generous alteration margins',
            'Same-day mall pickup & worldwide express doorstep shipping'
          ],
          designerNote: (p as any).designerNote || 'Available across all floor departments with complete size sets and personal styling assistants.',
          pairWith: (p as any).pairWith || 'Matching accessories, footwear & jewelry available on Floor 2',
          careInstructions: (p as any).careInstructions || 'Dry Clean Only. High-grade breathable garment cover included.'
        };
      });
    }

    if (!customItems.length) {
      return DEFAULT_BOUTIQUE_OUTFITS;
    }

    // Ensure Men's and Kids' sections are NEVER empty by supplementing with default items if missing:
    const hasWomen = customItems.some(o => o.gender === 'women');
    const hasMen = customItems.some(o => o.gender === 'men');
    const hasKids = customItems.some(o => o.gender === 'kids');

    let merged = [...customItems];
    if (!hasWomen) {
      merged = [...merged, ...DEFAULT_BOUTIQUE_OUTFITS.filter(o => o.gender === 'women')];
    }
    if (!hasMen) {
      merged = [...merged, ...DEFAULT_BOUTIQUE_OUTFITS.filter(o => o.gender === 'men')];
    }
    if (!hasKids) {
      merged = [...merged, ...DEFAULT_BOUTIQUE_OUTFITS.filter(o => o.gender === 'kids')];
    }

    return merged;
  }, [profile.sectionData?.products?.items]);

  // Counts for each gender audience segment
  const womenCount = useMemo(() => allOutfits.filter(o => o.gender === 'women').length, [allOutfits]);
  const menCount = useMemo(() => allOutfits.filter(o => o.gender === 'men').length, [allOutfits]);
  const kidsCount = useMemo(() => allOutfits.filter(o => o.gender === 'kids').length, [allOutfits]);

  // Available Categories (Dynamically tailored to the active Gender Filter)
  const categoriesList = useMemo(() => {
    const setCats = new Set<string>();
    setCats.add('All Collections');

    const relevantOutfits = genderFilter === 'all' 
      ? allOutfits 
      : allOutfits.filter(o => o.gender === genderFilter);

    relevantOutfits.forEach(o => {
      if (o.category) setCats.add(o.category);
    });
    return Array.from(setCats);
  }, [allOutfits, genderFilter]);

  // Filtered outfits (supports Gender Filter + Search + Category filter)
  const filteredOutfits = useMemo(() => {
    return allOutfits.filter(outfit => {
      // 1. Gender Filter
      const matchesGender = genderFilter === 'all' || outfit.gender === genderFilter;
      
      // 2. Category Filter
      const matchesCategory = selectedCategory === 'All Collections' || outfit.category === selectedCategory;
      
      // 3. Search Query
      const matchesSearch = searchQuery.trim() === '' || 
        outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outfit.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outfit.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outfit.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesGender && matchesCategory && matchesSearch;
    });
  }, [allOutfits, genderFilter, selectedCategory, searchQuery]);

  // Open the Dress Details & Tailored Reviews Modal
  const handleOpenDetailModal = (outfit: OutfitItemData, initialTab: 'reviews' | 'specs' = 'reviews') => {
    setActiveDetailItem(outfit);
    setDetailModalTab(initialTab);
    setIsWritingReview(false);
    trackAction(`view_dress_details_${outfit.id}`);
  };

  // Toggle "Helpful" vote on a customer review
  const handleToggleHelpful = (reviewId: string, initialCount: number) => {
    if (userVotedHelpful[reviewId]) return;
    setUserVotedHelpful(prev => ({ ...prev, [reviewId]: true }));
    setHelpfulCounts(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? initialCount) + 1
    }));
    trackAction(`helpful_review_${reviewId}`);
  };

  // Submit in-session customer review
  const handleAddCustomerReview = (e: React.FormEvent, outfit: OutfitItemData) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewComment.trim()) return;

    const newRev: OutfitReviewItem = {
      id: `user_rev_${Date.now()}`,
      customerName: newReviewerName.trim(),
      customerCity: newReviewerCity.trim() || 'Bengaluru',
      avatarUrl: outfit.gender === 'women'
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: newReviewRating,
      reviewDate: 'Just now (Verified Shopper)',
      occasion: newReviewOccasion,
      tailoredFitNote: newReviewFitNote.trim() || 'Custom tailored at Grand Fashion Shopping Mall.',
      trialExperience: 'In-store trial room fitting booked with on-site master tailor.',
      comment: newReviewComment.trim(),
      tailoredPhotos: [
        {
          url: outfit.imageUrl,
          caption: `Customer fitting photo for ${outfit.name}`,
          customerTag: `${newReviewerName.trim()} (${newReviewerCity.trim() || 'Bengaluru'})`,
          occasion: newReviewOccasion
        }
      ],
      verifiedBuyer: true,
      helpfulCount: 1
    };

    setUserSubmittedReviews(prev => ({
      ...prev,
      [outfit.id]: [newRev, ...(prev[outfit.id] || [])]
    }));

    setReviewSubmittedSuccess(true);
    setNewReviewComment('');
    setTimeout(() => {
      setReviewSubmittedSuccess(false);
      setIsWritingReview(false);
    }, 2000);
    trackAction(`submit_review_${outfit.id}`);
  };

  // Open the 2-Option WhatsApp Order Modal for a specific outfit
  const handleOpenOrderModal = (outfit: OutfitItemData) => {
    setOrderModalOutfit(outfit);
    setOrderModalDeal(null);
    setIsCartOrder(false);
    setIsOrderModalOpen(true);
  };

  // Open the 2-Option WhatsApp Order Modal for a Combo Deal
  const handleOpenDealOrderModal = (deal: BridalPackageDeal) => {
    trackAction(`deal_order_${deal.id}`);
    setOrderModalDeal(deal);
    setOrderModalOutfit(null);
    setIsCartOrder(false);
    setIsOrderModalOpen(true);
  };

  // Add Combo Deal to Cart
  const handleAddDealToCart = (deal: BridalPackageDeal) => {
    trackAction(`cart_add_deal_${deal.id}`);
    const productItem: ProductItem = {
      id: deal.id,
      name: deal.name,
      description: deal.description,
      price: deal.dealPrice,
      currency: '₹',
      imageUrl: deal.imageUrl,
      category: 'Bridal Packages',
      isAvailable: true
    };
    addToCart(productItem);
  };

  // 1-Click Copy Promo Coupon
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    trackAction(`copy_coupon_${code}`);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  // Open the 2-Option WhatsApp Order Modal for all items in Cart
  const handleOpenCartOrderModal = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setOrderModalOutfit(null);
    setOrderModalDeal(null);
    setIsCartOrder(true);
    setIsOrderModalOpen(true);
  };

  // Handle WhatsApp Order Placement
  const handleConfirmWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderModalOutfit && !orderModalDeal && !isCartOrder) return;
    if (isCartOrder && cart.length === 0) return;

    const isDealOrder = !isCartOrder && !orderModalOutfit && !!orderModalDeal;

    // Calculate total price and build item list
    const billTotal = isCartOrder
      ? cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)
      : isDealOrder
      ? orderModalDeal!.dealPrice
      : (orderModalOutfit ? orderModalOutfit.price * getQty(orderModalOutfit.id) : 0);

    const itemsSummary = isCartOrder
      ? cart.map((ci, idx) => `  ${idx + 1}. *${ci.product.name}* (x${ci.quantity}) - ₹${(ci.product.price * ci.quantity).toLocaleString('en-IN')}`).join('\n')
      : isDealOrder
      ? `• *Special Bridal Package:* ${orderModalDeal!.name}\n• *Includes:* ${orderModalDeal!.itemsList.join(', ')}\n• *Package Price:* ₹${orderModalDeal!.dealPrice.toLocaleString('en-IN')} (Saved ₹${orderModalDeal!.savings.toLocaleString('en-IN')})`
      : `• *Outfit Piece:* ${orderModalOutfit?.name}\n• *Section:* ${orderModalOutfit?.gender.toUpperCase()}\n• *Collection:* ${orderModalOutfit?.category}\n• *Fabric / Detail:* ${orderModalOutfit?.fabric}\n• *Quantity:* ${getQty(orderModalOutfit!.id)}\n• *Price:* ₹${billTotal.toLocaleString('en-IN')}`;

    let message = '';

    if (orderMode === 'atelier') {
      // IN-STORE TRIAL & FITTING ORDER
      message = 
        `🛍️✨ *IN-STORE TRIAL ROOM & MALL VISIT - ${boutiqueName}*\n\n` +
        `• *Preference:* In-Store Trial Room & Mall Fitting\n` +
        `• *Shopper Name:* ${trialCustomerName.trim() || 'Shopper'}\n` +
        `• *Contact Phone:* ${trialCustomerPhone.trim() || 'Not specified'}\n` +
        `• *Preferred Trial Date:* ${trialDate || 'This Weekend'}\n` +
        `• *Preferred Time Slot:* ${trialTimeSlot}\n\n` +
        `📋 *SELECTED SHOPPING PIECES:*\n${itemsSummary}\n\n` +
        `💰 *Estimated Value:* ₹${billTotal.toLocaleString('en-IN')}\n` +
        (trialSpecialNotes.trim() ? `• *Fitting / Alteration Notes:* ${trialSpecialNotes.trim()}\n` : '') +
        `\nPlease check trial room availability and confirm my mall visit slot. Thank you!`;
    } else {
      // DOORSTEP COURIER DELIVERY ORDER
      message = 
        `📦✈️ *EXPRESS DOORSTEP DELIVERY ORDER - ${boutiqueName}*\n\n` +
        `• *Customer Name:* ${deliveryCustomerName.trim() || 'Customer'}\n` +
        `• *Contact Phone:* ${deliveryPhone.trim() || 'Not specified'}\n` +
        `• *Size / Measurements:* ${deliveryMeasurementSize}\n\n` +
        `📋 *SELECTED SHOPPING PIECES:*\n${itemsSummary}\n\n` +
        `💰 *Total Amount:* ₹${billTotal.toLocaleString('en-IN')}\n` +
        `• *Payment Preference:* ${deliveryPaymentMode === 'whatsapp_upi' ? 'Online UPI' : 'Cash on Delivery (COD)'}\n\n` +
        `📍 *SHIPPING ADDRESS:*\n` +
        `• *Delivery Address:* ${deliveryAddress.trim() || 'Not specified'}\n` +
        `• *City & Pincode:* ${deliveryCityPincode.trim() || 'Not specified'}\n` +
        (deliveryNotes.trim() ? `• *Delivery Instructions:* ${deliveryNotes.trim()}\n` : '') +
        `\nPlease confirm size availability, dispatch timeline, and payment instructions. Thank you!`;
    }

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setIsOrderModalOpen(false);
  };

  // Add Outfit to Cart
  const handleAddOutfitToCart = (outfit: OutfitItemData) => {
    const qty = getQty(outfit.id);
    trackAction(`cart_add_${outfit.id}`);
    const productItem: ProductItem = {
      id: outfit.id,
      name: outfit.name,
      description: outfit.description,
      price: outfit.price,
      currency: '₹',
      imageUrl: outfit.imageUrl,
      category: outfit.category,
      isAvailable: true
    };
    for (let i = 0; i < qty; i++) {
      addToCart(productItem);
    }
  };

  // Handle Liking a Mall Review
  const handleLikeMallReview = (revId: string) => {
    setMallReviews(prev =>
      prev.map(r => (r.id === revId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  // Handle Submitting a Mall Review
  const handleAddMallReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMallReviewName.trim() || !newMallReviewText.trim()) return;

    const newRev: MallShopperReviewItem = {
      id: `mrev-user-${Date.now()}`,
      name: newMallReviewName.trim(),
      location: newMallReviewLocation.trim() || 'Verified Shopper',
      rating: newMallReviewRating,
      department: newMallReviewDepartment,
      outfitPurchased: newMallReviewItem.trim() || 'Boutique Apparel',
      fitFeedback: newMallReviewFit,
      review: newMallReviewText.trim(),
      date: 'Just now',
      verified: true,
      likes: 1
    };

    setMallReviews([newRev, ...mallReviews]);
    setMallReviewSuccess(`Thank you ${newMallReviewName}! Your store review has been posted.`);
    trackAction('submit_fashion_mall_review');

    setTimeout(() => {
      setMallReviewSuccess('');
      setIsMallReviewModalOpen(false);
      setNewMallReviewName('');
      setNewMallReviewLocation('');
      setNewMallReviewItem('');
      setNewMallReviewText('');
      setNewMallReviewRating(5);
    }, 2200);
  };

  // Bridal / Family Fitting Reservation Submission via WhatsApp
  const handleBridalFittingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('bridal_fitting_submit');
    const msg = `👑 *IN-STORE TRIAL ROOM & STYLIST APPOINTMENT - ${boutiqueName}*\n\n` +
      `• *Client Name:* ${leadName || 'Shopper'}\n` +
      `• *Contact Phone:* ${leadPhone || 'Not provided'}\n` +
      `• *Shopping Party:* ${bookGuests}\n` +
      `• *Occasion / Department:* ${bookOccasion}\n` +
      `• *Preferred Date:* ${bookDate || 'Upcoming Weekend'}\n` +
      `• *Preferred Time:* ${bookTime}\n` +
      `• *Shopping Needs:* ${leadMessage || 'Family wedding & festive collections (Women, Men, Kids)'}\n\n` +
      `Sent via OneClickBiz Fashion Shopping Mall Portal. Please confirm trial room slot.`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setIsFittingBookingOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FBF2DE] text-[#241208] font-sans relative selection:bg-[#C1621F] selection:text-white pb-20 antialiased overflow-x-hidden">
      
      {/* Dynamic Keyframes & Fonts (Playfair Display + Plus Jakarta Sans) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ocb-font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .ocb-font-sans {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        @keyframes ocbMarqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .ocb-marquee-track {
          display: flex;
          gap: 40px;
          white-space: nowrap;
          animation: ocbMarqueeScroll 30s linear infinite;
          width: max-content;
        }

        .ocb-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes ocbFloatGlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.25; }
          50% { transform: translate(25px, -18px) scale(1.15); opacity: 0.45; }
        }

        .ocb-glow-ambient-1 {
          animation: ocbFloatGlow 14s ease-in-out infinite;
        }
        .ocb-glow-ambient-2 {
          animation: ocbFloatGlow 18s ease-in-out infinite reverse;
        }
      `
        }}
      />

      {/* Decorative Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="ocb-glow-ambient-1 absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#D8A63D]/25 to-[#C1621F]/20 blur-3xl" />
        <div className="ocb-glow-ambient-2 absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-gradient-to-bl from-[#C1621F]/20 to-[#7E1717]/15 blur-3xl" />
        <div className="ocb-glow-ambient-1 absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D8A63D]/20 to-[#2E4D2A]/15 blur-3xl" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP TICKER MARQUEE                                          */}
      {/* ============================================================== */}
      <div className="relative z-40 bg-gradient-to-r from-[#241208] via-[#3B2313] to-[#241208] text-white py-2.5 overflow-hidden border-b border-[#D8A63D]/30 shadow-md">
        <div className="ocb-marquee-track text-xs sm:text-sm font-semibold tracking-wider">
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D8A63D] animate-ping" />
            <span className="text-[#D8A63D] font-bold">ONECLICKBIZ GRAND FASHION & CLOTHING SHOPPING MALL</span>
            <span>•</span>
            <span>👗 WOMEN’S BRIDAL, SILKS & WESTERN STUDIO</span>
            <span>•</span>
            <span>👔 MEN’S SUITS, SHERWANIS & BANDHGALAS</span>
            <span>•</span>
            <span>🧒 KIDS & TEENS ROYAL ETHNIC WEAR</span>
            <span>•</span>
            <span>⚡ 1-CLICK INSTANT WHATSAPP ORDERING</span>
            <span>•</span>
            <span>🛍️ 3-FLOOR MULTI-DEPARTMENT FASHION STORE</span>
            <span>•</span>
            <span>📞 MALL HELPDESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D8A63D] animate-ping" />
            <span className="text-[#D8A63D] font-bold">ONECLICKBIZ GRAND FASHION & CLOTHING SHOPPING MALL</span>
            <span>•</span>
            <span>👗 WOMEN’S BRIDAL, SILKS & WESTERN STUDIO</span>
            <span>•</span>
            <span>👔 MEN’S SUITS, SHERWANIS & BANDHGALAS</span>
            <span>•</span>
            <span>🧒 KIDS & TEENS ROYAL ETHNIC WEAR</span>
            <span>•</span>
            <span>⚡ 1-CLICK INSTANT WHATSAPP ORDERING</span>
            <span>•</span>
            <span>🛍️ 3-FLOOR MULTI-DEPARTMENT FASHION STORE</span>
            <span>•</span>
            <span>📞 MALL HELPDESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. STICKY BRAND HEADER & QUICK ACTIONS                        */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D8A63D]/30 shadow-xs transition-all w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand & Mall Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#D8A63D] bg-[#F5E9CC] shadow-md p-0.5">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80'}
                  alt={boutiqueName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#C1621F] border-2 border-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base sm:text-lg font-black text-[#241208] leading-tight truncate ocb-font-serif">
                  {boutiqueName}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5E9CC] border border-[#D8A63D]/40 text-[#C1621F] text-[10px] font-extrabold uppercase">
                  <ShieldCheck className="w-3 h-3 text-[#C1621F]" /> Verified Fashion Mall
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#5C3A21] font-medium truncate">
                {profile.name} • {designerTitle}
              </p>
            </div>
          </div>

          {/* Action CTAs & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {showViewToggle && setViewMode && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-[#F5E9CC] border border-[#D8A63D]/40 text-xs shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs cursor-pointer ${
                    viewMode === 'website' ? 'bg-[#241208] text-white shadow-xs' : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fashion Mall Website</span>
                  <span className="sm:hidden">Mall Web</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full font-bold transition flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-[#241208] text-white shadow-xs' : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Smart Fashion Card</span>
                  <span className="sm:hidden">Smart Card</span>
                </button>
              </div>
            )}

            {/* Book In-Store Trial Room CTA Button */}
            <button
              onClick={() => setIsFittingBookingOpen(true)}
              className="px-3.5 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-[#C1621F]/20 flex items-center gap-1.5 transition active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Book Trial Room</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. HERO SHOWCASE WITH LUXURY GOLD & BURGUNDY ACCENTS           */}
      {/* ============================================================== */}
      <section className="relative z-10 pt-10 sm:pt-16 pb-12 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black shadow-xs tracking-wider uppercase backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C1621F]" />
            <span>Women’s • Men’s • Kids’ & Teens Multi-Level Fashion Mall</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#241208] ocb-font-serif leading-tight tracking-tight">
            Grand Fashion & Clothing Shopping Mall <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#7E1717] bg-clip-text text-transparent">
              Complete Family Fashion & Designer Wear.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#5C3A21] max-w-2xl mx-auto leading-relaxed font-medium">
            {profile.bio || 'Welcome to Grand Fashion & Clothing Shopping Mall. A premier multi-level fashion shopping mall featuring the latest collections in Men’s, Women’s, and Kids’ apparel, bridal silks, festive wear, formal suits, western outfits, and accessories with worldwide doorstep express shipping.'}
          </p>

          {/* Quick Action Tiles (Call, WhatsApp, Fitting, Map, Save vCard, Share) */}
          <div className="pt-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 w-max sm:w-auto mx-auto px-2">
              
              {/* Call Mall Desk */}
              <a
                href={`tel:${cleanPhoneDigits}`}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#241208] text-white flex items-center justify-center shadow-lg transition group-hover:scale-105 border border-[#D8A63D]/30">
                  <Phone className="w-5 h-5 text-[#D8A63D]" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  Call Mall Desk
                </span>
              </a>

              {/* WhatsApp Chat */}
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${boutiqueName}, I am inquiring from your fashion shopping mall website.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition group-hover:scale-105">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  WhatsApp Chat
                </span>
              </a>

              {/* Book Trial Room */}
              <button
                onClick={() => setIsFittingBookingOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#C1621F] text-white flex items-center justify-center shadow-lg shadow-[#C1621F]/25 transition group-hover:scale-105">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  Trial Room
                </span>
              </button>

              {/* Mall Location Map */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(mallAddress)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#3B2313] text-white flex items-center justify-center shadow-lg transition group-hover:scale-105 border border-[#D8A63D]/20">
                  <MapPin className="w-5 h-5 text-[#D8A63D]" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  Mall Location
                </span>
              </a>

              {/* Mall QR */}
              <button
                onClick={() => setIsWebsiteQrModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#241208] flex items-center justify-center shadow-md border border-[#D8A63D]/40 transition group-hover:scale-105">
                  <QrCode className="w-5 h-5 text-[#C1621F]" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  Mall QR
                </span>
              </button>

              {/* Save Contact */}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#241208] text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Download className="w-5 h-5 text-[#D8A63D]" />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-[#241208] uppercase tracking-wider">
                  Save Contact
                </span>
              </button>

            </div>
          </div>

          {/* Social Media & Contact Platform Desk (With Genuine Brand Icons) */}
          <div className="pt-4 space-y-2.5 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#C1621F] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Social Media & Contact Desk
              </span>
              <span className="text-[11px] font-bold text-[#7A5B43]">Indiranagar, Bengaluru • Worldwide Delivery</span>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
              
              {/* 1. WhatsApp with Original Logo */}
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${boutiqueName}! I want to connect with your fashion shopping desk.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_whatsapp')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Direct WhatsApp Message"
              >
                <SocialIcon platform="whatsapp" size={16} colored={true} />
                <span className="truncate">WhatsApp Chat</span>
              </a>

              {/* 2. Phone Call with Original Logo */}
              <a
                href={`tel:${cleanPhoneDigits}`}
                onClick={() => trackAction('hero_contact_call')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Direct Phone Call"
              >
                <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-2.5 h-2.5 fill-white text-white" />
                </div>
                <span className="truncate">Call <span className="hidden sm:inline">{phoneDisplay}</span></span>
              </a>

              {/* 3. Google Maps Location with Original Pin Logo */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${boutiqueName} ${mallAddress}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_maps')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Open Google Maps Location"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                  <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
                </svg>
                <span className="truncate">Google Maps</span>
              </a>

              {/* 4. Email Desk with Original Mail Logo */}
              <a
                href={`mailto:${profile.email || 'mall@oneclickbiz.in'}`}
                onClick={() => trackAction('hero_contact_email')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-red-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Send Email"
              >
                <SocialIcon platform="mail" size={16} colored={true} />
                <span className="truncate">Email Desk</span>
              </a>

              {/* 5. Official Website with Original Logo */}
              <a
                href={profileUrl}
                suppressHydrationWarning
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_web')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Official Digital Store Website"
              >
                <SocialIcon platform="website" size={16} colored={true} />
                <span className="truncate">Official Web</span>
              </a>

              {/* 6. Instagram with Original Brand Logo */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_instagram')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-pink-50 border border-pink-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Instagram Profile"
              >
                <SocialIcon platform="instagram" size={16} colored={true} />
                <span className="truncate">@oneclickbiz</span>
              </a>

              {/* 7. YouTube with Original Brand Logo */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_youtube')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-500/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="YouTube Channel"
              >
                <SocialIcon platform="youtube" size={16} colored={true} />
                <span className="truncate">YouTube</span>
              </a>

              {/* 8. Facebook with Original Brand Logo */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('hero_contact_facebook')}
                className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 border border-blue-500/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                title="Facebook Page"
              >
                <SocialIcon platform="facebook" size={16} colored={true} />
                <span className="truncate">Facebook</span>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ACTIVE DISCOUNT COUPONS TICKER BAR                          */}
      {/* ============================================================== */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto pb-10">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#D8A63D]/40 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8A63D]/20 pb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#C1621F]" />
              <h3 className="font-extrabold text-base sm:text-lg text-[#241208] ocb-font-serif">
                Exclusive Atelier Discount Vouchers
              </h3>
            </div>
            <span className="text-xs text-[#5C3A21] font-semibold">
              Tap any coupon code to copy & paste in WhatsApp
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BOUTIQUE_PROMO_COUPONS.map((cpn) => {
              const isCopied = copiedCoupon === cpn.code;
              return (
                <div
                  key={cpn.code}
                  onClick={() => handleCopyCoupon(cpn.code)}
                  className={`p-3.5 rounded-2xl border-2 border-dashed transition flex items-center justify-between cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : 'bg-[#FBF2DE]/80 hover:bg-[#F5E9CC] border-[#D8A63D]/70 text-[#241208]'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm tracking-wider uppercase font-mono px-2 py-0.5 rounded-md bg-white border border-[#D8A63D]/40 text-[#C1621F]">
                        {cpn.code}
                      </span>
                      <span className="text-xs font-extrabold text-[#7E1717]">{cpn.discount}</span>
                    </div>
                    <p className="text-[11px] text-[#5C3A21] truncate">{cpn.description}</p>
                  </div>
                  <div className="shrink-0 pl-2">
                    {isCopied ? (
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-white px-2 py-1 rounded-md border border-emerald-300">
                        Copied!
                      </span>
                    ) : (
                      <Copy className="w-4 h-4 text-[#C1621F]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. CURATED BRIDAL, GROOM & FAMILY ENSEMBLE BOX DEALS           */}
      {/* ============================================================== */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto pb-14 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Trousseau Sets</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#241208] ocb-font-serif mt-1">
              Curated Bridal, Groom & Family Ensembles
            </h3>
            <p className="text-xs sm:text-sm text-[#5C3A21]">
              Heirloom collections bundled with matching stoles, safas, potlis, and complimentary master tailoring.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOUTIQUE_COMBO_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-3xl border-2 border-[#D8A63D]/40 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#C1621F] transition duration-300"
            >
              <div>
                {/* Image & Tag */}
                <div className="relative h-56 sm:h-64 w-full bg-[#F5E9CC] overflow-hidden">
                  <img
                    src={deal.imageUrl}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-sm ${deal.badgeColor}`}>
                      {deal.tag}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold">
                      {deal.genderBadge} • {deal.timeline}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <h4 className="font-black text-lg text-[#241208] ocb-font-serif leading-snug">
                    {deal.name}
                  </h4>
                  <p className="text-xs text-[#5C3A21] leading-relaxed line-clamp-2">
                    {deal.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-[#FBF2DE] border border-[#D8A63D]/30 space-y-1.5 text-xs text-[#241208]">
                    <span className="font-extrabold text-[11px] text-[#C1621F] block uppercase tracking-wider">
                      Included Ensemble Pieces:
                    </span>
                    <ul className="space-y-1 text-[11px] text-[#5C3A21]">
                      {deal.itemsList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-[#241208] ocb-font-serif">
                      ₹{deal.dealPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs line-through text-slate-400 font-bold">
                      ₹{deal.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-black text-emerald-600">
                      Save ₹{deal.savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddDealToCart(deal)}
                  className="py-2.5 px-3 rounded-xl bg-[#F5E9CC] hover:bg-[#D8A63D] text-[#241208] font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C1621F]" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => handleOpenDealOrderModal(deal)}
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. HAUTE COUTURE LOOKBOOK & GENDER SEGMENT SELECTOR             */}
      {/* ============================================================== */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto pb-16 space-y-6">
        
        {/* Header, Search & Description */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fashion Mall Department Catalog</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#241208] ocb-font-serif mt-1">
                Multi-Department Fashion Collection
              </h3>
              <p className="text-xs sm:text-sm text-[#5C3A21]">
                Explore Women's bridal & ethnic wear, Men's suits & groom sherwanis, and Kids' festive wear across all shopping mall floors.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#5C3A21] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lehengas, sherwanis, pattu, suits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border-2 border-[#D8A63D]/40 text-xs sm:text-sm text-[#241208] placeholder-[#5C3A21]/60 focus:outline-hidden focus:border-[#C1621F] transition shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ============================================================== */}
          {/* GENDER / DEPARTMENT SEGMENT SWITCHER (WOMEN, MEN & KIDS)       */}
          {/* ============================================================== */}
          <div className="bg-white/95 backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl border-2 border-[#D8A63D]/40 shadow-md max-w-3xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2">
            
            {/* All Floors */}
            <button
              onClick={() => {
                trackAction('filter_gender_all');
                setGenderFilter('all');
                setSelectedCategory('All Collections');
              }}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                genderFilter === 'all'
                  ? 'bg-[#241208] text-white shadow-md'
                  : 'text-[#5C3A21] hover:bg-[#F5E9CC]/60'
              }`}
            >
              <span>👑 <span className="hidden sm:inline">All Floors</span><span className="sm:hidden">All</span></span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {allOutfits.length}
              </span>
            </button>

            {/* Women's Floor */}
            <button
              onClick={() => {
                trackAction('filter_gender_women');
                setGenderFilter('women');
                setSelectedCategory('All Collections');
              }}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                genderFilter === 'women'
                  ? 'bg-[#C1621F] text-white shadow-md'
                  : 'text-[#C1621F] hover:bg-[#F5E9CC]/60'
              }`}
            >
              <span>👗 <span className="hidden sm:inline">Women's Floor</span><span className="sm:hidden">Women</span></span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {womenCount}
              </span>
            </button>

            {/* Men's Floor */}
            <button
              onClick={() => {
                trackAction('filter_gender_men');
                setGenderFilter('men');
                setSelectedCategory('All Collections');
              }}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                genderFilter === 'men'
                  ? 'bg-[#3B2313] text-white shadow-md'
                  : 'text-[#3B2313] hover:bg-[#F5E9CC]/60'
              }`}
            >
              <span>👔 <span className="hidden sm:inline">Men's Floor</span><span className="sm:hidden">Men</span></span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {menCount}
              </span>
            </button>

            {/* Kids & Teens Floor */}
            <button
              onClick={() => {
                trackAction('filter_gender_kids');
                setGenderFilter('kids');
                setSelectedCategory('All Collections');
              }}
              className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                genderFilter === 'kids'
                  ? 'bg-[#2E4D2A] text-white shadow-md'
                  : 'text-[#2E4D2A] hover:bg-emerald-50'
              }`}
            >
              <span>🧒 <span className="hidden sm:inline">Kids & Teens Floor</span><span className="sm:hidden">Kids</span></span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                {kidsCount}
              </span>
            </button>

          </div>

          {/* Category Filter Pills (Dynamically update based on selected Gender) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categoriesList.map((cat) => {
              const count = cat === 'All Collections' 
                ? (genderFilter === 'all' ? allOutfits.length : allOutfits.filter(o => o.gender === genderFilter).length)
                : allOutfits.filter(o => (genderFilter === 'all' || o.gender === genderFilter) && o.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#241208] text-white shadow-md'
                      : 'bg-white hover:bg-[#F5E9CC] text-[#5C3A21] border border-[#D8A63D]/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected ? 'bg-[#D8A63D] text-[#241208]' : 'bg-[#F5E9CC] text-[#5C3A21]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Result Counter */}
          <div className="flex items-center justify-between text-xs text-[#5C3A21] px-1">
            <span>
              Showing <span className="text-[#C1621F] font-black">{filteredOutfits.length}</span> {
                genderFilter === 'all' ? 'total' :
                genderFilter === 'women' ? 'Women’s Couture' :
                genderFilter === 'men' ? 'Men’s & Groom' : 'Kids & Teens'
              } outfits
            </span>
            {(selectedCategory !== 'All Collections' || searchQuery || genderFilter !== 'all') && (
              <button
                onClick={() => {
                  setGenderFilter('all');
                  setSelectedCategory('All Collections');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#C1621F] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Outfit Cards Grid */}
        {filteredOutfits.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border-2 border-[#D8A63D]/40 space-y-3">
            <Scissors className="w-8 h-8 text-[#C1621F] mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-[#241208]">No matching outfits found in this section</h4>
            <p className="text-xs text-[#5C3A21]">Try switching between Women, Men, or Kids sections above.</p>
            <button
              onClick={() => { setGenderFilter('all'); setSelectedCategory('All Collections'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-[#241208] text-white text-xs font-bold"
            >
              View All Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.map((outfit) => {
              const qty = getQty(outfit.id);
              const genderIcon = outfit.gender === 'women' ? '👗' : outfit.gender === 'men' ? '👔' : '🧒';
              const genderLabel = outfit.gender === 'women' ? 'Women' : outfit.gender === 'men' ? 'Men' : 'Kids';
              const outfitReviews = [...(userSubmittedReviews[outfit.id] || []), ...getOutfitReviews(outfit)];

              return (
                <div
                  key={outfit.id}
                  className="bg-white rounded-3xl border-2 border-[#D8A63D]/30 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-[#C1621F] transition duration-300"
                >
                  <div>
                    {/* Image with Tag Badges & Review Snaps Pill */}
                    <div 
                      onClick={() => handleOpenDetailModal(outfit, 'reviews')}
                      className="relative h-64 sm:h-72 w-full bg-[#F5E9CC] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={outfit.imageUrl}
                        alt={outfit.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-black text-[#241208] uppercase flex items-center gap-1 shadow-xs">
                            <span>{genderIcon}</span>
                            <span>{genderLabel}</span>
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#241208]/90 text-white text-[10px] font-bold">
                            {outfit.category}
                          </span>
                        </div>
                        {outfit.isSpecial && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C1621F] text-white text-[9px] font-black uppercase flex items-center gap-1 shadow-sm w-max">
                            <Sparkles className="w-2.5 h-2.5" /> Signature Piece
                          </span>
                        )}
                      </div>

                      {/* Floating Customer Tailored Reviews Badge */}
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black backdrop-blur-md text-[10px] text-white font-extrabold flex items-center gap-1.5 shadow-md transition hover:scale-105">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                        <span className="text-white/40">•</span>
                        <Camera className="w-2.5 h-2.5 text-[#D8A63D]" />
                        <span>{outfitReviews.length} Fit Snaps</span>
                      </div>

                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] text-white font-medium">
                        {outfit.deliveryTime}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2.5">
                      {/* Customer Ratings & Tailored Photos Counter */}
                      <div 
                        onClick={() => handleOpenDetailModal(outfit, 'reviews')}
                        className="flex items-center gap-2 text-xs cursor-pointer group/rev"
                      >
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="font-extrabold text-[#241208]">4.9</span>
                        <span className="text-[#C1621F] font-bold flex items-center gap-1 group-hover/rev:underline">
                          <Camera className="w-3 h-3" />
                          <span>({outfitReviews.length} Tailored Reviews)</span>
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <h4 
                          onClick={() => handleOpenDetailModal(outfit, 'reviews')}
                          className="font-black text-base sm:text-lg text-[#241208] ocb-font-serif leading-snug group-hover:text-[#C1621F] transition cursor-pointer"
                        >
                          {outfit.name}
                        </h4>
                      </div>

                      <p className="text-xs font-semibold text-[#C1621F] flex items-center gap-1">
                        <Scissors className="w-3 h-3 shrink-0" />
                        <span>{outfit.fabric}</span>
                      </p>

                      <p className="text-xs text-[#5C3A21] leading-relaxed line-clamp-2">
                        {outfit.description}
                      </p>

                      {/* Pricing and Stepper */}
                      <div className="pt-2 flex items-center justify-between border-t border-[#D8A63D]/20">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-[#241208] ocb-font-serif">
                            ₹{outfit.price.toLocaleString('en-IN')}
                          </span>
                          {outfit.originalPrice && (
                            <span className="text-xs line-through text-slate-400">
                              ₹{outfit.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FBF2DE] border border-[#D8A63D]/40">
                          <button
                            type="button"
                            onClick={() => setQty(outfit.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-rose-50 text-[#241208] flex items-center justify-center font-bold text-xs transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-[#241208]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(outfit.id, 1)}
                            className="w-6 h-6 rounded-lg bg-white hover:bg-emerald-50 text-[#241208] flex items-center justify-center font-bold text-xs transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenDetailModal(outfit, 'reviews')}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F5E9CC] text-[#241208] border-2 border-[#D8A63D]/50 text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#C1621F]" />
                      <span>Reviews & Fits</span>
                    </button>
                    <button
                      onClick={() => handleOpenOrderModal(outfit)}
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-extrabold flex items-center justify-center gap-1 shadow-md transition cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 7. GRAND FASHION MALL TRUST BADGES                             */}
      {/* ============================================================== */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F5E9CC] flex items-center justify-center text-[#C1621F]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#241208]">100% Quality & Silk Mark</h4>
            <p className="text-xs text-[#5C3A21] leading-relaxed">
              Certified authentic handloom silks, pure mulberry weaves, tested gold zari, and premium mill fabrics.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F5E9CC] flex items-center justify-center text-[#C1621F]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#241208]">3-Floor Department Mall</h4>
            <p className="text-xs text-[#5C3A21] leading-relaxed">
              Comprehensive departments spanning Women's bridal & western, Men's suits & sherwanis, and Kids' wear.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F5E9CC] flex items-center justify-center text-[#C1621F]">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#241208]">Worldwide Express Delivery</h4>
            <p className="text-xs text-[#5C3A21] leading-relaxed">
              Express air doorstep shipping across India and worldwide to USA, UK, UAE, Canada, and Australia.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#F5E9CC] flex items-center justify-center text-[#C1621F]">
              <Scissors className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-sm text-[#241208]">In-Store Trial & Tailoring</h4>
            <p className="text-xs text-[#5C3A21] leading-relaxed">
              Private luxury trial rooms with on-site master tailors for same-day alterations and custom fittings.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. IN-STORE TRIAL ROOM & PERSONAL STYLIST VISIT BANNER         */}
      {/* ============================================================== */}
      <section className="relative z-10 py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D8A63D]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase">
              In-Store Trial Rooms & Styling
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#241208] ocb-font-serif">
              Reserve Your In-Store Trial Room & Personal Stylist Visit
            </h3>
            <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed">
              Book a private trial suite with our senior stylists at our Indiranagar mall, or request a 4K live video call shopping walkthrough from home.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setIsFittingBookingOpen(true)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In-Store Trial</span>
            </button>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${boutiqueName}, I want to schedule a virtual video call shopping consultation.`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Video Call Shopping</span>
            </a>
          </div>
        </div>

        {/* Dynamic Mall Floor Services Configured in Builder Studio */}
        {profile.sectionData?.services?.items && profile.sectionData.services.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.sectionData.services.items.map((srv) => (
              <div 
                key={srv.id}
                className="p-6 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-lg flex flex-col justify-between space-y-4 hover:border-[#C1621F] transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F]">
                      {srv.category || 'Mall Floor Department'}
                    </span>
                    <span className="text-sm font-black text-[#241208]">
                      {srv.price === 0 ? 'Complimentary' : `₹${srv.price.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg text-[#241208]">{srv.title}</h4>
                  <p className="text-xs text-[#5C3A21] leading-relaxed line-clamp-3">{srv.description}</p>
                </div>
                <button
                  onClick={() => {
                    setLeadMessage(`Booking package: ${srv.title} (${srv.price === 0 ? 'Free' : '₹' + srv.price})`);
                    setIsFittingBookingOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[#FBF2DE] hover:bg-[#C1621F] text-[#C1621F] hover:text-white font-extrabold text-xs transition border border-[#D8A63D]/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" /> Book Floor Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 9. REAL SHOPPER DIARIES & CUSTOMER GALLERY                     */}
      {/* ============================================================== */}
      {profile.sectionData?.gallery?.items && profile.sectionData.gallery.items.length > 0 && (
        <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto pb-16 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Shopper Diaries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#241208] ocb-font-serif mt-1">
              Grand Fashion Mall Shopper Diaries & Ensembles
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.sectionData.gallery.items.slice(0, 8).map((gal) => (
              <div
                key={gal.id}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-md border border-[#D8A63D]/30"
              >
                <img
                  src={gal.imageUrl}
                  alt={gal.title || 'Fashion Mall Client'}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end text-white">
                  <span className="text-xs font-bold">{gal.title}</span>
                  {gal.category && <span className="text-[10px] text-amber-300">{gal.category}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 10. DEDICATED SOCIAL MEDIA PLATFORM SHOWCASE                   */}
      {/* ============================================================== */}
      <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Media Hub</span>
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
            Connect With Us On Social Media
          </h2>
          <p className="text-xs sm:text-sm text-[#5C3A21]">
            Watch our new collection walkthroughs, bridal and groom styling reels, and join our vibrant fashion shopping community on Instagram and YouTube.
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          
          {/* 1. Instagram Platform Space (Vertical Card 1) */}
          <div className="bg-gradient-to-br from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 rounded-3xl p-6 sm:p-8 border-2 border-pink-400/30 shadow-xl flex flex-col justify-between space-y-6 group hover:border-pink-500/60 transition-all duration-300">
            <div className="space-y-4">
              
              {/* Instagram Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="instagram" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-[#241208]">@oneclickbiz</h3>
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                    </div>
                    <p className="text-xs text-[#7A5B43] font-semibold">24.5K Fashion Lovers • 480 Styling Reels</p>
                  </div>
                </div>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('instagram_follow_click')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                  <span>Follow on Instagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed">
                Step inside our 3-floor fashion shopping mall in Bengaluru! Explore trending bridal lehengas, bespoke groom sherwanis, and festive kids wear. Tag us in your shopping stories to get featured!
              </p>

              {/* Instagram Reels Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {FASHION_INSTAGRAM_REELS.map((reel, rIdx) => (
                  <a
                    key={rIdx}
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm group/item block bg-slate-900 border border-pink-500/20"
                  >
                    <img
                      src={reel.imageUrl}
                      alt={reel.alt}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-2.5 text-white">
                      <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold w-max flex items-center gap-1 backdrop-blur-xs">
                        <Play className="w-2.5 h-2.5 fill-white" /> Reel
                      </span>
                      <div>
                        <p className="text-[11px] font-bold line-clamp-2 leading-tight">{reel.title}</p>
                        <span className="text-[9px] text-[#D8A63D] font-mono mt-0.5 block">{reel.views}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </div>

            {/* Bottom Tag link */}
            <div className="pt-2 border-t border-pink-400/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A5B43]">
              <span className="font-semibold">Hashtag: #OneClickBizFashion • Tag us to get featured</span>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#C1621F] hover:underline flex items-center gap-1">
                View All Reels on Instagram →
              </a>
            </div>

          </div>

          {/* 2. YouTube Platform Space (Vertical Card 2) */}
          <div className="bg-gradient-to-br from-red-950/15 via-[#3B1515]/20 to-[#241208]/30 rounded-3xl p-6 sm:p-8 border-2 border-red-500/30 shadow-xl flex flex-col justify-between space-y-6 group hover:border-red-500/60 transition-all duration-300">
            <div className="space-y-5">
              
              {/* YouTube Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="youtube" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#241208]">OneClickBiz Fashion Mall TV</h3>
                    <p className="text-xs text-[#7A5B43] font-semibold">32.4K Subscribers • 4K Floor Walkthrough Series</p>
                  </div>
                </div>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('youtube_subscribe_click')}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <SocialIcon platform="youtube" size={14} colored={false} className="text-white" />
                  <span>Subscribe on YouTube</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* YouTube Video Showcase Grid (Main 4K Video + Episode Playlist) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Main 4K Video Player Showcase (Left / 7 cols) */}
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-red-500/20 group/vid flex flex-col justify-end min-h-[260px] sm:min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                    alt="Grand Fashion Mall 3-Floor Tour"
                    className="absolute inset-0 w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover/vid:bg-black/30 transition-colors flex items-center justify-center">
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAction('youtube_play_click')}
                      className="w-16 h-16 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer"
                      title="Play on YouTube"
                    >
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </a>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-1 z-10">
                    <span>14:20</span>
                    <span>•</span>
                    <span className="text-amber-400">4K UHD</span>
                  </div>

                  {/* Video Info Bottom Banner */}
                  <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white">
                    <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider mb-1 inline-block">
                      FEATURED SHOWCASE
                    </span>
                    <p className="text-sm sm:text-base font-extrabold leading-snug">
                      Grand Fashion Shopping Mall: Complete 3-Floor Video Tour
                    </p>
                    <p className="text-[11px] text-white/80 mt-1 line-clamp-2">
                      Take a 4K tour through our Ground Floor bridal sarees, First Floor men’s suits & sherwanis, and Second Floor kids’ festive kingdom.
                    </p>
                  </div>
                </div>

                {/* Playlist Highlights (Right / 5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <p className="text-xs font-black uppercase tracking-wider text-[#C1621F] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Recent Fashion Showcases
                    </p>

                    {FASHION_YOUTUBE_EPISODES.map((item, yIdx) => (
                      <a
                        key={yIdx}
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/70 hover:bg-white border border-[#D8A63D]/30 shadow-xs flex items-center gap-3 group/clip transition cursor-pointer"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                          <img
                            src={item.imageUrl}
                            alt={item.alt}
                            className="w-full h-full object-cover group-hover/clip:scale-105 transition"
                          />
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white font-bold">{item.duration}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#241208] group-hover/clip:text-red-600 transition truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#7A5B43] mt-0.5">{item.subtitle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom YouTube Bar */}
            <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A5B43]">
              <span className="font-semibold">New collections & styling videos released weekly!</span>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-red-600 hover:underline flex items-center gap-1">
                Explore Complete Channel on YouTube →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10.2. MALL SHOPPER REVIEWS & SOCIAL PROOF                      */}
      {/* ============================================================== */}
      <section id="shopper-reviews" className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Header & Write Review Action */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black uppercase tracking-wider shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Real Shopper Experiences • Verified Reviews</span>
            </div>
            <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
              Loved by Over 10,000+ Fashion Shoppers
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed">
              Read authentic feedback from brides, families, and gentlemen across our 3 shopping floors. Tried an outfit in our private suites? Leave your own store review!
            </p>
          </div>

          <button
            onClick={() => setIsMallReviewModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#C1621F]/20 hover:scale-105 active:scale-95 transition cursor-pointer shrink-0"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Leave a Store Review</span>
          </button>
        </div>

        {/* Rating Overview Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-[#D8A63D]/30 shadow-md">
          <div className="space-y-1 text-center sm:text-left border-r border-[#D8A63D]/20 pr-2">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">4.9 / 5.0</p>
            <p className="text-[11px] text-[#7A5B43] font-semibold">10,000+ Happy Patrons</p>
          </div>

          <div className="space-y-1 text-center sm:text-left lg:border-r border-[#D8A63D]/20 pr-2">
            <span className="text-xs font-bold text-[#C1621F] uppercase tracking-wide block">Bespoke Fit</span>
            <p className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">99.4%</p>
            <p className="text-[11px] text-[#7A5B43] font-semibold">Tailoring Satisfaction</p>
          </div>

          <div className="space-y-1 text-center sm:text-left border-r border-[#D8A63D]/20 pr-2">
            <span className="text-xs font-bold text-[#C1621F] uppercase tracking-wide block">Silk Mark India</span>
            <p className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">100% Pure</p>
            <p className="text-[11px] text-[#7A5B43] font-semibold">Certified Handloom Weaves</p>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#C1621F] uppercase tracking-wide block">Courier Dispatch</span>
            <p className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">48 Hours</p>
            <p className="text-[11px] text-[#7A5B43] font-semibold">DHL & BlueDart Express</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setMallReviewFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              mallReviewFilter === 'all'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            All Reviews ({mallReviews.length})
          </button>
          <button
            onClick={() => setMallReviewFilter('5star')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1 ${
              mallReviewFilter === '5star'
                ? 'bg-[#C1621F] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400" /> 5-Star Only
          </button>
          <button
            onClick={() => setMallReviewFilter('bridal')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              mallReviewFilter === 'bridal'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            👗 Women’s Silks & Bridal
          </button>
          <button
            onClick={() => setMallReviewFilter('mens')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              mallReviewFilter === 'mens'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            👔 Men’s Studio
          </button>
          <button
            onClick={() => setMallReviewFilter('kids')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              mallReviewFilter === 'kids'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            🧒 Kids Kingdom
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mallReviews
            .filter((rev) => {
              if (mallReviewFilter === '5star') return rev.rating === 5;
              if (mallReviewFilter === 'bridal') return rev.department.toLowerCase().includes('women') || rev.department.toLowerCase().includes('bridal');
              if (mallReviewFilter === 'mens') return rev.department.toLowerCase().includes('men');
              if (mallReviewFilter === 'kids') return rev.department.toLowerCase().includes('kid');
              return true;
            })
            .map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white border-2 border-[#D8A63D]/30 shadow-md hover:shadow-xl hover:border-[#C1621F] transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top: Star rating and department badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FBF2DE] text-[#C1621F] border border-[#D8A63D]/30">
                      {rev.department}
                    </span>
                  </div>

                  {/* Outfit purchased & fit feedback */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {rev.outfitPurchased && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7E1717] bg-[#FBF2DE]/80 px-2 py-0.5 rounded-md">
                        <ShoppingBag className="w-3 h-3 text-[#C1621F]" />
                        <span>{rev.outfitPurchased}</span>
                      </span>
                    )}
                    {rev.fitFeedback && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        <Scissors className="w-3 h-3 text-emerald-600" />
                        <span>{rev.fitFeedback}</span>
                      </span>
                    )}
                  </div>

                  {/* Review text */}
                  <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                {/* Footer: Reviewer info and like button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#F5E9CC] text-[#C1621F] font-black text-xs flex items-center justify-center shrink-0 border border-[#D8A63D]/50 shadow-xs">
                      {rev.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-black text-[#241208] truncate">{rev.name}</p>
                        {rev.verified && (
                          <span title="Verified Shopper">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7A5B43] truncate">{rev.location} • {rev.date}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLikeMallReview(rev.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#7A5B43] hover:text-[#C1621F] bg-[#FAF5EE] hover:bg-[#F5E9CC] px-2.5 py-1 rounded-full transition cursor-pointer shrink-0"
                    title="Mark helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likes}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>

      </section>

      {/* ============================================================== */}
      {/* 10.5. FREQUENTLY ASKED QUESTIONS (FAQ)                         */}
      {/* ============================================================== */}
      <section id="faq-section" className="relative z-10 py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E9CC] border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C1621F]" /> Fashion Mall & Atelier Help Desk
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C3A21]">
            Everything you need to know about our trial rooms, bespoke master karigar tailoring, Silk Mark certifications, family combos, and express shipping.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FASHION_MALL_FAQS.map((faq) => {
            const isOpen = openFashionFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#D8A63D] shadow-md ring-1 ring-[#D8A63D]/40'
                    : 'bg-white/80 border-[#D8A63D]/30 hover:border-[#D8A63D]/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFashionFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#FBF2DE] text-[#C1621F] font-bold text-xs flex items-center justify-center shrink-0 border border-[#D8A63D]/40">
                      Q
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F] block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#241208]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#241208] text-white rotate-180' : 'bg-[#F5E9CC] text-[#241208]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C3A21] leading-relaxed border-t border-slate-100 pl-14 sm:pl-15 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Stylist Help Desk Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FBF2DE] via-white to-[#FBF2DE] border border-[#D8A63D]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-[#241208]">Have questions regarding custom bridal sizing or live video catalog?</p>
              <p className="text-[11px] text-[#7A5B43]">Chat with our Master Stylist Desk on WhatsApp for immediate guidance.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${boutiqueName}! I have a question regarding fashion collections, custom fitting, and trial room reservations.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-black flex items-center gap-2 shadow-sm transition shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Ask Fashion Stylist</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FOOTER & CONTACT DESK                                      */}
      {/* ============================================================== */}
      <footer className="relative z-10 bg-[#241208] text-white pt-14 pb-12 border-t-2 border-[#D8A63D]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="space-y-3 max-w-md">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black ocb-font-serif text-[#D8A63D]">
                  {boutiqueName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#D8A63D]/20 text-[#D8A63D] text-[10px] font-extrabold uppercase">
                  Multi-Floor Mall
                </span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                {mallAddress}
              </p>
              <p className="text-xs text-[#D8A63D] font-mono">
                Phone: {phoneDisplay} | WhatsApp: +{waNumber}
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-extrabold text-[#D8A63D] uppercase tracking-wider">
                Digital Identity & Sharing
              </h5>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsWebsiteQrModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-[#D8A63D]" />
                  <span>Mall QR</span>
                </button>
                <button
                  onClick={() => downloadVcfFile(profile)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D8A63D]" />
                  <span>Download vCard</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>© {new Date().getFullYear()} {boutiqueName}. Powered by OneClickBiz Smart SaaS.</p>
            <p>100% Quality Certified • Multi-Level Fashion & Clothing Shopping Mall</p>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* MODAL 1: OUTFIT DETAILS & TAILORED CUSTOMER REVIEWS MODAL      */}
      {/* ============================================================== */}
      {activeDetailItem && (() => {
        const outfitReviews = [
          ...(userSubmittedReviews[activeDetailItem.id] || []),
          ...getOutfitReviews(activeDetailItem)
        ];
        const allTailoredPhotos = outfitReviews.flatMap(r => r.tailoredPhotos);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-[#D8A63D]/40 shadow-2xl relative flex flex-col">
              
              {/* Floating Close Button */}
              <button
                onClick={() => setActiveDetailItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Hero Banner */}
              <div className="relative h-64 sm:h-80 w-full bg-[#F5E9CC] overflow-hidden shrink-0">
                <img
                  src={activeDetailItem.imageUrl}
                  alt={activeDetailItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-6 text-white">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-xs font-black text-[#241208] uppercase flex items-center gap-1 shadow-sm">
                      <span>{activeDetailItem.gender === 'women' ? '👗' : activeDetailItem.gender === 'men' ? '👔' : '🧒'}</span>
                      <span>{activeDetailItem.gender.toUpperCase()} FLOOR</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#C1621F] text-white text-xs font-bold shadow-sm">
                      {activeDetailItem.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#241208]/90 text-amber-300 text-xs font-bold border border-amber-400/30">
                      {activeDetailItem.craftsmanshipTag}
                    </span>
                  </div>

                  {/* Title & Floating Rating Banner */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-white text-sm font-black">4.9 / 5.0</span>
                      <span className="text-white/60">•</span>
                      <span className="text-[#D8A63D] text-xs font-bold flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" />
                        <span>{outfitReviews.length} Verified Tailored Reviews</span>
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white ocb-font-serif leading-tight">
                      {activeDetailItem.name}
                    </h3>
                  </div>

                </div>
              </div>

              {/* Price & Specs Header Bar */}
              <div className="p-5 sm:p-6 pb-3 border-b border-[#D8A63D]/25 bg-[#FAF6EE] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#241208] ocb-font-serif">
                      ₹{activeDetailItem.price.toLocaleString('en-IN')}
                    </span>
                    {activeDetailItem.originalPrice && (
                      <span className="text-sm line-through text-slate-400 font-bold">
                        ₹{activeDetailItem.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      In-Stock • On-Site Tailoring
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#C1621F] mt-1 flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5" />
                    <span>Fabric: {activeDetailItem.fabric}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#5C3A21] bg-white px-3 py-1.5 rounded-xl border border-[#D8A63D]/30 shadow-2xs">
                    🚚 {activeDetailItem.deliveryTime}
                  </span>
                  <span className="text-xs font-bold text-[#5C3A21] bg-white px-3 py-1.5 rounded-xl border border-[#D8A63D]/30 shadow-2xs">
                    ✂️ Alteration: 45 Mins
                  </span>
                </div>
              </div>

              {/* Interactive Navigation Tabs inside Modal */}
              <div className="px-5 sm:px-6 pt-3 bg-white border-b border-[#D8A63D]/20 sticky top-0 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDetailModalTab('reviews')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                    detailModalTab === 'reviews'
                      ? 'border-[#C1621F] text-[#C1621F]'
                      : 'border-transparent text-[#7A5B43] hover:text-[#241208]'
                  }`}
                >
                  <Camera className="w-4 h-4 text-[#C1621F]" />
                  <span>Customer Reviews & Tailored Fits</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C1621F]/15 text-[#C1621F] font-mono">
                    {outfitReviews.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDetailModalTab('specs')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-black transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                    detailModalTab === 'specs'
                      ? 'border-[#C1621F] text-[#C1621F]'
                      : 'border-transparent text-[#7A5B43] hover:text-[#241208]'
                  }`}
                >
                  <Info className="w-4 h-4 text-[#C1621F]" />
                  <span>Dress Details & Craftsmanship</span>
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="p-5 sm:p-7 space-y-6 flex-1">
                {detailModalTab === 'reviews' ? (
                  /* ============================================================== */
                  /* TAB 1: CUSTOMER TAILORED REVIEWS & REAL OUTFIT FITTING SNAPS    */
                  /* ============================================================== */
                  <div className="space-y-6">
                    
                    {/* 1. Summary Score Box */}
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FBF2DE] via-white to-[#F5E9CC] border-2 border-[#D8A63D]/40 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl sm:text-4xl font-black text-[#241208] ocb-font-serif">
                              4.9
                            </span>
                            <div>
                              <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[11px] font-bold text-[#7A5B43]">
                                Based on {outfitReviews.length} Verified Customer Reviews
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#5C3A21] font-medium">
                            100% of shoppers recommend Grand Fashion Mall's in-store tailoring & trial rooms for this piece.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsWritingReview(prev => !prev)}
                          className="px-4 py-2.5 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
                        >
                          <Scissors className="w-3.5 h-3.5 text-[#D8A63D]" />
                          <span>{isWritingReview ? 'Cancel Review' : 'Write Fitting Review'}</span>
                        </button>
                      </div>

                      {/* Tailoring & Quality Breakdown Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#D8A63D]/25">
                        <div className="p-2.5 rounded-xl bg-white/80 border border-[#D8A63D]/30 text-center">
                          <span className="text-[10px] uppercase font-bold text-[#7A5B43] block">Tailored Fit Accuracy</span>
                          <span className="text-sm font-black text-[#241208]">99.4% Perfect Fit</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/80 border border-[#D8A63D]/30 text-center">
                          <span className="text-[10px] uppercase font-bold text-[#7A5B43] block">Fabric & Zari Quality</span>
                          <span className="text-sm font-black text-[#C1621F]">100% Certified Silk</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/80 border border-[#D8A63D]/30 text-center">
                          <span className="text-[10px] uppercase font-bold text-[#7A5B43] block">Trial Room Experience</span>
                          <span className="text-sm font-black text-emerald-700">4.9 / 5.0 Rating</span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Interactive "Write a Fitting Review" Form (Toggled) */}
                    {isWritingReview && (
                      <form 
                        onSubmit={(e) => handleAddCustomerReview(e, activeDetailItem)}
                        className="p-5 rounded-2xl bg-white border-2 border-[#C1621F]/40 shadow-md space-y-4 animate-in fade-in duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-black text-sm text-[#241208] flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#C1621F]" /> Share Your Fitting & Tailoring Experience
                          </h4>
                          <span className="text-[10px] text-[#7A5B43]">For {activeDetailItem.name}</span>
                        </div>

                        {reviewSubmittedSuccess ? (
                          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-800 text-xs font-bold text-center">
                            ✓ Thank you! Your tailored outfit review has been verified and posted.
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="space-y-1">
                                <label className="font-bold text-[#241208]">Your Name *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Ananya Sen"
                                  value={newReviewerName}
                                  onChange={(e) => setNewReviewerName(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-[#D8A63D]/50 focus:outline-hidden focus:border-[#C1621F]"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="font-bold text-[#241208]">Your City</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Bengaluru / Hyderabad"
                                  value={newReviewerCity}
                                  onChange={(e) => setNewReviewerCity(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-[#D8A63D]/50 focus:outline-hidden focus:border-[#C1621F]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="space-y-1">
                                <label className="font-bold text-[#241208]">Celebration / Occasion</label>
                                <select
                                  value={newReviewOccasion}
                                  onChange={(e) => setNewReviewOccasion(e.target.value)}
                                  className="w-full px-3 py-2 rounded-xl border border-[#D8A63D]/50 focus:outline-hidden focus:border-[#C1621F] bg-white"
                                >
                                  <option>💍 Wedding Day / Mandap</option>
                                  <option>🥂 Wedding Reception</option>
                                  <option>💃 Sangeet & Cocktail</option>
                                  <option>🪔 Muhurtham Ceremony</option>
                                  <option>🎉 Family Festive Puja</option>
                                  <option>🎂 Birthday Celebration</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="font-bold text-[#241208]">Overall Rating</label>
                                <div className="flex items-center gap-1.5 pt-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      type="button"
                                      key={star}
                                      onClick={() => setNewReviewRating(star)}
                                      className="cursor-pointer"
                                    >
                                      <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                    </button>
                                  ))}
                                  <span className="text-xs font-bold text-[#241208] ml-2">{newReviewRating} Stars</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1 text-xs">
                              <label className="font-bold text-[#241208]">Tailored Measurements & Fitting Notes</label>
                              <input
                                type="text"
                                placeholder="e.g. Custom blouse stitched; waist altered by 1.5 inches at mall trial room."
                                value={newReviewFitNote}
                                onChange={(e) => setNewReviewFitNote(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#D8A63D]/50 focus:outline-hidden focus:border-[#C1621F]"
                              />
                            </div>

                            <div className="space-y-1 text-xs">
                              <label className="font-bold text-[#241208]">Your Review / Feedback *</label>
                              <textarea
                                required
                                rows={3}
                                placeholder="Tell other shoppers how the outfit felt, compliments received, drape, weight, and trial room experience..."
                                value={newReviewComment}
                                onChange={(e) => setNewReviewComment(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-[#D8A63D]/50 focus:outline-hidden focus:border-[#C1621F]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#D8A63D] hover:opacity-95 text-white font-black text-xs shadow-md transition cursor-pointer"
                            >
                              Submit Verified Review & Fitting Feedback
                            </button>
                          </>
                        )}
                      </form>
                    )}

                    {/* 3. Real Shoppers in This Tailored Outfit: PHOTO GALLERY */}
                    {allTailoredPhotos.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-black text-[#241208] uppercase tracking-wider flex items-center gap-1.5">
                              <Camera className="w-4 h-4 text-[#C1621F]" />
                              <span>Real Shoppers in This Tailored Outfit ({allTailoredPhotos.length})</span>
                            </h4>
                            <p className="text-[11px] text-[#7A5B43]">
                              Photos submitted from our Grand Fashion Mall in-store trial rooms and wedding celebrations.
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-[#C1621F] bg-[#F5E9CC] px-2.5 py-1 rounded-full">
                            Click to Zoom
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {allTailoredPhotos.map((photo, pIdx) => (
                            <div
                              key={pIdx}
                              onClick={() => setPreviewReviewPhoto(photo)}
                              className="group/photo relative h-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-[#D8A63D]/40 bg-slate-900 shadow-sm cursor-pointer"
                            >
                              <img
                                src={photo.url}
                                alt={photo.caption}
                                className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300 opacity-95"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-2.5 text-white">
                                <span className="self-end px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold flex items-center gap-1">
                                  <Eye className="w-2.5 h-2.5" /> View Photo
                                </span>
                                <div>
                                  <p className="text-[11px] font-bold leading-tight line-clamp-1">{photo.customerTag || 'Verified Shopper'}</p>
                                  <p className="text-[9px] text-[#D8A63D] mt-0.5 line-clamp-1">{photo.caption}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. Customer Review Testimonial Cards */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-[#241208] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#C1621F]" />
                        <span>Customer Fitting Reviews & Stories</span>
                      </h4>

                      <div className="space-y-4">
                        {outfitReviews.map((rev) => {
                          const currentHelpful = helpfulCounts[rev.id] ?? rev.helpfulCount;
                          const hasVoted = userVotedHelpful[rev.id];

                          return (
                            <div
                              key={rev.id}
                              className="p-5 rounded-2xl bg-white border-2 border-[#D8A63D]/30 shadow-xs space-y-3.5 hover:border-[#C1621F]/60 transition"
                            >
                              {/* Reviewer Header */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={rev.avatarUrl}
                                    alt={rev.customerName}
                                    className="w-10 h-10 rounded-full object-cover border border-[#D8A63D]/40 shrink-0"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-black text-sm text-[#241208]">
                                        {rev.customerName}
                                      </span>
                                      {rev.verifiedBuyer && (
                                        <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-extrabold flex items-center gap-0.5">
                                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Verified Mall Buyer
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-[#7A5B43]">
                                      {rev.customerCity} • <span className="font-medium">{rev.reviewDate}</span>
                                    </p>
                                  </div>
                                </div>

                                {/* Star Rating */}
                                <div className="flex items-center text-amber-500 shrink-0">
                                  {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                              </div>

                              {/* Occasion Pill */}
                              <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#F5E9CC] text-[#C1621F] text-[10px] font-black uppercase tracking-wider">
                                {rev.occasion}
                              </div>

                              {/* TAILORED FITTING & TRIAL ROOM EXPERIENCE BOX */}
                              <div className="p-3.5 rounded-xl bg-[#FBF2DE]/80 border-l-4 border-[#C1621F] text-xs space-y-1.5 text-[#5C3A21]">
                                <div className="flex items-center gap-1.5 font-bold text-[#241208]">
                                  <Scissors className="w-3.5 h-3.5 text-[#C1621F]" />
                                  <span>Tailored Fit & Measurement Details:</span>
                                </div>
                                <p className="leading-relaxed">
                                  <strong>Fit Notes:</strong> {rev.tailoredFitNote}
                                </p>
                                <p className="leading-relaxed text-[11px] text-[#7A5B43]">
                                  <strong>Trial Room Feedback:</strong> {rev.trialExperience}
                                </p>
                              </div>

                              {/* Review Comment */}
                              <p className="text-xs sm:text-sm text-[#241208] leading-relaxed">
                                “{rev.comment}”
                              </p>

                              {/* Attached Tailored Photos Thumbnails */}
                              {rev.tailoredPhotos.length > 0 && (
                                <div className="pt-1">
                                  <span className="text-[10px] font-bold text-[#7A5B43] block mb-1.5 uppercase">
                                    Customer Tailored Photos ({rev.tailoredPhotos.length}):
                                  </span>
                                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                                    {rev.tailoredPhotos.map((photo, i) => (
                                      <div
                                        key={i}
                                        onClick={() => setPreviewReviewPhoto(photo)}
                                        className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#D8A63D]/40 cursor-pointer group/th hover:opacity-90 transition"
                                      >
                                        <img
                                          src={photo.url}
                                          alt={photo.caption}
                                          className="w-full h-full object-cover group-hover/th:scale-105 transition"
                                        />
                                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover/th:opacity-100 transition">
                                          <Eye className="w-4 h-4 text-white" />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Helpful Vote Button */}
                              <div className="pt-2 border-t border-[#D8A63D]/20 flex items-center justify-between text-xs text-[#7A5B43]">
                                <span>Was this tailored review helpful?</span>
                                <button
                                  type="button"
                                  onClick={() => handleToggleHelpful(rev.id, rev.helpfulCount)}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                    hasVoted
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-[#FBF2DE] text-[#241208] hover:bg-[#F5E9CC]'
                                  }`}
                                >
                                  <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'text-emerald-700' : 'text-[#C1621F]'}`} />
                                  <span>{hasVoted ? 'Helpful!' : 'Helpful'} ({currentHelpful})</span>
                                </button>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ) : (
                  /* ============================================================== */
                  /* TAB 2: OUTFIT CRAFTSMANSHIP, ARTISAN SPECS & STYLING ADVICE   */
                  /* ============================================================== */
                  <div className="space-y-5">
                    
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-[#241208] ocb-font-serif">
                        Design & Weaving Heritage
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed">
                        {activeDetailItem.description}
                      </p>
                    </div>

                    {/* Artisan & Features Specs */}
                    <div className="p-4 rounded-2xl bg-[#FBF2DE] border border-[#D8A63D]/30 space-y-2 text-xs">
                      <span className="font-extrabold text-[#C1621F] uppercase tracking-wider text-[11px] block">
                        Artisan Handloom & Craftsmanship Details:
                      </span>
                      <ul className="space-y-1.5 text-[#5C3A21]">
                        {activeDetailItem.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {activeDetailItem.designerNote && (
                      <div className="p-3.5 rounded-xl bg-[#F5E9CC]/60 border-l-4 border-[#C1621F] text-xs text-[#5C3A21] space-y-1">
                        <span className="font-bold text-[#241208] block">Couturier Styling Advice:</span>
                        <p>{activeDetailItem.designerNote}</p>
                      </div>
                    )}

                    {activeDetailItem.careInstructions && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#5C3A21]">
                        <strong>Care Instructions:</strong> {activeDetailItem.careInstructions}
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Bottom Action Footer Bar */}
              <div className="p-4 sm:p-6 border-t-2 border-[#D8A63D]/30 bg-[#FAF6EE] sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddOutfitToCart(activeDetailItem);
                      setActiveDetailItem(null);
                    }}
                    className="py-3 px-4 sm:px-5 rounded-xl bg-white hover:bg-[#F5E9CC] text-[#241208] font-extrabold text-xs sm:text-sm border-2 border-[#D8A63D]/50 flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#C1621F]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDetailItem(null);
                      setIsFittingBookingOpen(true);
                    }}
                    className="py-3 px-4 sm:px-5 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <Scissors className="w-4 h-4 text-[#D8A63D]" />
                    <span>Book Trial Room</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailItem(null);
                    handleOpenOrderModal(activeDetailItem);
                  }}
                  className="py-3 px-5 sm:px-7 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ============================================================== */}
      {/* MODAL 1B: LIGHTBOX ZOOM MODAL FOR TAILORED OUTFIT PHOTOS       */}
      {/* ============================================================== */}
      {previewReviewPhoto && (
        <div 
          onClick={() => setPreviewReviewPhoto(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden border border-amber-500/30 shadow-2xl relative flex flex-col cursor-default"
          >
            <button
              onClick={() => setPreviewReviewPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={previewReviewPhoto.url}
                alt={previewReviewPhoto.caption}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-4 sm:p-5 bg-slate-950 text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-[#C1621F] text-white text-[10px] font-black uppercase">
                  Tailored Outfit Fitting Snap
                </span>
                {previewReviewPhoto.occasion && (
                  <span className="text-xs text-amber-400 font-bold">
                    • {previewReviewPhoto.occasion}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-white">
                {previewReviewPhoto.customerTag || 'Verified Mall Shopper'}
              </p>
              <p className="text-xs text-white/70">
                {previewReviewPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: 2-OPTION WHATSAPP ORDER MODAL (ATELIER VS COURIER)    */}
      {/* ============================================================== */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-[#D8A63D]/40 shadow-2xl p-6 sm:p-8 space-y-5 relative">
            
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F]">
                Instant WhatsApp Checkout
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">
                Select Your Service Preference
              </h3>
            </div>

            {/* Mode Toggle: In-Store Atelier Trial VS Doorstep Courier Delivery */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[#FBF2DE] border border-[#D8A63D]/40 gap-1.5">
              <button
                type="button"
                onClick={() => setOrderMode('atelier')}
                className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  orderMode === 'atelier'
                    ? 'bg-[#241208] text-white shadow-md'
                    : 'text-[#5C3A21] hover:text-[#241208]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>In-Store Trial</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('delivery')}
                className={`py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  orderMode === 'delivery'
                    ? 'bg-[#C1621F] text-white shadow-md'
                    : 'text-[#5C3A21] hover:text-[#241208]'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Doorstep Delivery</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmWhatsAppOrder} className="space-y-4">
              
              {orderMode === 'atelier' ? (
                /* Mode 1: In-Store Atelier Fitting & Trial */
                <div className="space-y-3 p-4 rounded-2xl bg-[#FBF2DE]/60 border border-[#D8A63D]/40 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma / Vikram Verma"
                      value={trialCustomerName}
                      onChange={(e) => setTrialCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">WhatsApp Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={trialCustomerPhone}
                      onChange={(e) => setTrialCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-[#241208]">Preferred Trial Date</label>
                      <input
                        type="date"
                        value={trialDate}
                        onChange={(e) => setTrialDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-[#241208]">Time Slot</label>
                      <select
                        value={trialTimeSlot}
                        onChange={(e) => setTrialTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                      >
                        <option>Morning (11:00 AM - 01:00 PM)</option>
                        <option>Afternoon (02:00 PM - 05:00 PM)</option>
                        <option>Evening (05:00 PM - 08:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Measurement / Custom Request Note</label>
                    <input
                      type="text"
                      placeholder="e.g. Family fitting for Groom Sherwani & Bridal Lehenga"
                      value={trialSpecialNotes}
                      onChange={(e) => setTrialSpecialNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>
                </div>
              ) : (
                /* Mode 2: Doorstep Courier Delivery */
                <div className="space-y-3 p-4 rounded-2xl bg-[#FBF2DE]/60 border border-[#D8A63D]/40 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sen"
                      value={deliveryCustomerName}
                      onChange={(e) => setDeliveryCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-[#241208]">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 12345"
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-[#241208]">Size Option</label>
                      <select
                        value={deliveryMeasurementSize}
                        onChange={(e) => setDeliveryMeasurementSize(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                      >
                        <option>Custom Made-to-Measure</option>
                        <option>Women: Size XS (Bust 32", Waist 26")</option>
                        <option>Women: Size S (Bust 34", Waist 28")</option>
                        <option>Women: Size M (Bust 36", Waist 30")</option>
                        <option>Women: Size L (Bust 38", Waist 32")</option>
                        <option>Women: Size XL (Bust 40", Waist 34")</option>
                        <option>Men: Chest 38" (Slim Fit)</option>
                        <option>Men: Chest 40" (Regular Fit)</option>
                        <option>Men: Chest 42" (Classic Fit)</option>
                        <option>Men: Chest 44" (Comfort Fit)</option>
                        <option>Kids: Age 2-4 Years</option>
                        <option>Kids: Age 5-7 Years</option>
                        <option>Kids: Age 8-10 Years</option>
                        <option>Kids: Age 11-14 Years</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Complete Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Flat, building, street, area..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">City, State & Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad, Telangana - 500081"
                      value={deliveryCityPincode}
                      onChange={(e) => setDeliveryCityPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm & Send to WhatsApp</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: ATELIER FITTING APPOINTMENT RESERVATION MODAL         */}
      {/* ============================================================== */}
      {isFittingBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border-2 border-[#D8A63D]/40 shadow-2xl p-6 sm:p-8 space-y-5 relative">
            
            <button
              onClick={() => setIsFittingBookingOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F]">
                In-Store Trial Room Booking
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#241208] ocb-font-serif">
                Reserve Mall Trial Room & Stylist
              </h3>
            </div>

            <form onSubmit={handleBridalFittingSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#241208]">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma / Rohan Kapoor"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#241208]">WhatsApp Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Occasion</label>
                  <select
                    value={bookOccasion}
                    onChange={(e) => setBookOccasion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                  >
                    <option>Wedding / Muhurtham</option>
                    <option>Groom & Bride Duo</option>
                    <option>Sangeet & Cocktail</option>
                    <option>Reception Evening</option>
                    <option>Family Festive Celebration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Party / Guests</label>
                  <select
                    value={bookGuests}
                    onChange={(e) => setBookGuests(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                  >
                    <option>Bride (Solo Trial)</option>
                    <option>Groom (Solo Trial)</option>
                    <option>Bride & Groom Duo</option>
                    <option>Family (3-5 Members)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Preferred Date</label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Preferred Time</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                  >
                    <option>11:00 AM</option>
                    <option>01:00 PM</option>
                    <option>03:00 PM</option>
                    <option>05:00 PM</option>
                    <option>07:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#241208]">Special Customization Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Interested in bride lehengas, groom sherwanis, or kids pattu pavadas"
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8A63D]/50 text-xs focus:outline-hidden focus:border-[#C1621F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] text-white font-extrabold text-xs shadow-lg transition active:scale-95 cursor-pointer"
              >
                Confirm & Book Trial Room via WhatsApp
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3.5: MALL LEAVE A STORE REVIEW MODAL                      */}
      {/* ============================================================== */}
      {isMallReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border-2 border-[#D8A63D]/50 shadow-2xl p-5 sm:p-7 relative space-y-4 max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsMallReviewModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition cursor-pointer"
              aria-label="Close Review Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider inline-block">
                Share Your Shopping Experience
              </span>
              <h3 className="ocb-font-serif text-2xl font-black text-[#241208]">
                Write a Store Review
              </h3>
              <p className="text-xs text-[#5C3A21]">
                Your review helps other shoppers find their dream bridal ensembles, perfect sherwanis, and kids festive wear.
              </p>
            </div>

            {mallReviewSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-extrabold text-sm text-emerald-900">{mallReviewSuccess}</h4>
                <p className="text-xs text-emerald-700">Your review is now visible on our Real Customer Stories board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddMallReview} className="space-y-3.5 text-xs">
                
                {/* Star Rating Selector */}
                <div className="p-3.5 rounded-2xl bg-[#FBF2DE]/60 border border-[#D8A63D]/30 space-y-1.5 text-center">
                  <label className="font-bold text-[#241208] block text-xs">Rate Your Mall Experience *</label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewMallReviewRating(star)}
                        className="p-1 transition hover:scale-125 cursor-pointer"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newMallReviewRating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#C1621F] block">
                    {newMallReviewRating === 5 ? '⭐⭐⭐⭐⭐ Exceptional / Outstanding Quality!' :
                     newMallReviewRating === 4 ? '⭐⭐⭐⭐ Very Good Fits & Fabric' :
                     newMallReviewRating === 3 ? '⭐⭐⭐ Good Shopping Experience' : 'Fair / Needs Improvement'}
                  </span>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={newMallReviewName}
                      onChange={(e) => setNewMallReviewName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">City / Neighborhood</label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar, BLR"
                      value={newMallReviewLocation}
                      onChange={(e) => setNewMallReviewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                    />
                  </div>
                </div>

                {/* Department & Fit Feedback */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Department Visited</label>
                    <select
                      value={newMallReviewDepartment}
                      onChange={(e) => setNewMallReviewDepartment(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                    >
                      <option value="Women’s Silks & Bridal">Women’s Silks & Bridal</option>
                      <option value="Men’s Suits & Sherwanis">Men’s Suits & Sherwanis</option>
                      <option value="Kids Kingdom">Kids Kingdom</option>
                      <option value="Custom Tailoring">Custom Tailoring Atelier</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Fit Satisfaction</label>
                    <select
                      value={newMallReviewFit}
                      onChange={(e) => setNewMallReviewFit(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                    >
                      <option value="Perfect Bespoke Fit">Perfect Bespoke Fit</option>
                      <option value="True to Size">True to Size</option>
                      <option value="Master Tailor Adjusted">Master Tailor Adjusted</option>
                    </select>
                  </div>
                </div>

                {/* Outfit Purchased */}
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Outfit / Dress Purchased (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Zari Kanchipuram Brocade Saree / Italian Bandhgala"
                    value={newMallReviewItem}
                    onChange={(e) => setNewMallReviewItem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                  />
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Your Review / Fitting Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other shoppers how the outfit felt, compliments received, fabric richness, trial room assistance, and alteration speed..."
                    value={newMallReviewText}
                    onChange={(e) => setNewMallReviewText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden focus:border-[#C1621F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-black text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Submit Verified Shopper Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: INTERACTIVE MALL QR MODAL                             */}
      {/* ============================================================== */}
      {isWebsiteQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D8A63D]/60 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 text-center">
            
            <button
              onClick={() => setIsWebsiteQrModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F]">
                Digital vCard & Catalog
              </span>
              <h3 className="text-xl font-black text-[#241208] ocb-font-serif">
                Scan Fashion Mall QR Code
              </h3>
            </div>

            {qrCodeUrl && (
              <div className="p-4 bg-[#FBF2DE] rounded-3xl border-2 border-[#D8A63D]/40 inline-block shadow-inner mx-auto">
                <img
                  src={qrCodeUrl}
                  alt="Fashion Mall QR"
                  className="w-52 h-52 object-contain rounded-2xl"
                />
              </div>
            )}

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profileUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2500);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#F5E9CC] text-[#241208] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Copy className="w-4 h-4 text-[#C1621F]" />
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={() => downloadVcfFile(profile)}
                className="px-4 py-2.5 rounded-xl bg-[#241208] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D8A63D]" />
                <span>Save Contact</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FLOATING ACTION BOTTOM CART BAR                                */}
      {/* ============================================================== */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:px-6 max-w-xl mx-auto animate-in slide-in-from-bottom duration-300">
          <div className="bg-[#241208] text-white rounded-2xl p-4 shadow-2xl border-2 border-[#D8A63D]/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C1621F] flex items-center justify-center relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D8A63D] text-[#241208] text-[10px] font-black flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/70 block">Boutique Bag Total:</span>
                <span className="text-base font-black text-[#D8A63D] ocb-font-serif">
                  ₹{cart.reduce((s, i) => s + (i.product.price * i.quantity), 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenCartOrderModal}
              className="py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Checkout on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
