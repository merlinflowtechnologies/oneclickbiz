'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  X, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Eye, 
  Share2, 
  MapPin, 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  Menu, 
  Send,
  Video,
  Award,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  SlidersHorizontal,
  Home,
  Grid,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem } from '@/lib/types';
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

interface FashionProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  badge?: string;
  image: string;
  hoverImage?: string;
  colors: string[];
  sizes: string[];
  description: string;
  fabric: string;
  rating: number;
  reviewsCount: number;
}

interface WatchAndBuyReel {
  id: string;
  title: string;
  modelImage: string;
  videoUrl?: string;
  product: {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    thumbnail: string;
    category: string;
  };
}

export interface FashionInstagramReel {
  id: string;
  title: string;
  views: string;
  likes: string;
  caption: string;
  imageUrl: string;
  tag: string;
  videoUrl?: string;
}

export interface FashionYouTubeVideo {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  quality: string;
  views: string;
  tag: string;
  description: string;
  imageUrl: string;
  embedUrl: string;
}

// Curated Instagram Reels matching Fashion Aesthetic
export const FASHION_INSTAGRAM_REELS: FashionInstagramReel[] = [
  {
    id: 'ig-fash-1',
    title: 'Effortless Linen & Cotton Co-Ord Styling ✨',
    views: '84.6K views',
    likes: '4.8K',
    caption: 'When comfort meets runway elegance. Perfect for Sunday brunch and weekend escapes. Breathable pure cotton with relaxed wide-leg silhouette.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    tag: '#CoOrdSet'
  },
  {
    id: 'ig-fash-2',
    title: 'Tiered Cotton Midi in 3 Fresh Styles 👗',
    views: '122.3K views',
    likes: '9.2K',
    caption: 'Casual sneakers, statement belt, or evening block heels? Hand-blocked florals on airy tiered cotton. Tell us your favorite look below!',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    tag: '#MidiDress'
  },
  {
    id: 'ig-fash-3',
    title: 'Pastel Blooms Festive & Fusion Edit 🌸',
    views: '95.1K views',
    likes: '6.4K',
    caption: 'Delicate hand-embroidered yoke on ultra-soft mulmul cotton. Effortlessly graceful for poojas, festive family dinners, and cocktail parties.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    tag: '#FestiveEdit'
  },
  {
    id: 'ig-fash-4',
    title: 'GRWM: Friday Casual Chic Lookbook 🌿',
    views: '67.8K views',
    likes: '3.9K',
    caption: 'Get ready with our head stylist! Pairing our best-selling button-down tunic with tailored tapered trousers and minimalist gold jewelry.',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    tag: '#GRWM'
  }
];

// Curated YouTube Lookbook Videos with Working Embeds
export const FASHION_YOUTUBE_PLAYLIST_ITEMS: FashionYouTubeVideo[] = [
  {
    id: 'yt-fash-1',
    title: 'Spring / Summer 2026 Ready-To-Wear Lookbook & Styling Guide',
    subtitle: 'Signature Breathable Cotton Midis & Contemporary Sets',
    duration: '08:42',
    quality: '4K UHD',
    views: '42.8K views',
    tag: 'NEW RELEASE',
    description: 'Explore our latest breathable handcrafted silhouettes, summer botanical prints, and contemporary day-to-night styling tips with in-house designers.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/gLg07y4Uj5k?autoplay=1&rel=0'
  },
  {
    id: 'yt-fash-2',
    title: '5 Ways to Style Luxury Co-Ord Sets for Brunches & Evenings',
    subtitle: 'Layering, Accessories & Footwear Pairings Guide',
    duration: '06:15',
    quality: '4K UHD',
    views: '28.4K views',
    tag: 'STYLE GUIDE',
    description: 'From casual weekday coffees to chic evening cocktail parties, master versatile transitions with matching two-piece separates.',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1&rel=0'
  },
  {
    id: 'yt-fash-3',
    title: 'Behind The Seams: Handloom Artisans & Pure Cotton Craft',
    subtitle: 'Sustainable Natural Dyes & Block Print Atelier',
    duration: '05:30',
    quality: '1080p HD',
    views: '19.6K views',
    tag: 'ATELIER',
    description: 'Step inside our artisan workshop to witness traditional wooden block carving, organic vegetable dye baths, and precision pattern tailoring.',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&rel=0'
  },
  {
    id: 'yt-fash-4',
    title: 'Everyday Chic: 10 Breathable Cotton Dresses Honest Try-On Haul',
    subtitle: 'Detailed Fit Review, Sizing Guide & Drape Analysis',
    duration: '09:20',
    quality: '4K UHD',
    views: '51.2K views',
    tag: 'TRY-ON HAUL',
    description: 'Our models try on trending tiered midis, empire waist cuts, and button-front floral dresses with detailed size and comfort recommendations.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    embedUrl: 'https://www.youtube.com/embed/4yZgHwJ-a8w?autoplay=1&rel=0'
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
  // Brand name & contacts (profile-driven, no external branding)
  const brandName = profile.company || profile.name || 'Your Fashion Store';
  const cleanPhone = getCleanWhatsAppNumber(profile) || '919876543210';
  const displayPhone = profile.phone || '+91 98765 43210';

  // Derive brand initials from profile name for monogram logo
  const brandInitials = useMemo(() => {
    const words = brandName.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return brandName.slice(0, 2).toUpperCase();
  }, [brandName]);

  // Generic fashion navigation categories
  const NAV_CATEGORIES = [
    'ALL',
    'LONG MIDI DRESS',
    'CO-ORD SET',
    'NEW ARRIVAL',
    'COTTON TWO PIECE PAIR',
    'FORMAL PAIR',
    'JUMPSUIT',
    'SHORT MIDI DRESS',
    'COTTON MIDI DRESS',
    'FANCY TOPS',
    'FANCY TOPS-JEANS COMBO'
  ];

  // Active Category Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0);

  // Watch and Buy Reels Data (generic placeholder images)
  const WATCH_AND_BUY_REELS: WatchAndBuyReel[] = [
    {
      id: 'reel-1',
      title: 'Timeless Cotton Empire Waist Midi Dress',
      modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w1',
        title: 'TIMELESS COTTON EMPIRE WAIST MIDI DRESS',
        price: 699,
        originalPrice: 2999,
        thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=220&q=80',
        category: 'LONG MIDI DRESS'
      }
    },
    {
      id: 'reel-2',
      title: 'Contemporary Cotton Panelled Midi Dress',
      modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w2',
        title: 'CONTEMPORARY COTTON PANELLED MIDI DRESS',
        price: 699,
        originalPrice: 2999,
        thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=220&q=80',
        category: 'COTTON MIDI DRESS'
      }
    },
    {
      id: 'reel-3',
      title: 'Teal Elegance Button-Down Midi Dress',
      modelImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w3',
        title: 'COTTON BUTTON-DOWN MIDI DRESS WITH PUFF SLEEVES',
        price: 799,
        originalPrice: 2499,
        thumbnail: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=220&q=80',
        category: 'SHORT MIDI DRESS'
      }
    },
    {
      id: 'reel-4',
      title: 'Striped Cotton Shirt & Palazzo Set',
      modelImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w4',
        title: 'STRIPED COTTON SHIRT & PALAZZO FULL PAIR',
        price: 999,
        originalPrice: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=220&q=80',
        category: 'COTTON TWO PIECE PAIR'
      }
    },
    {
      id: 'reel-5',
      title: 'Sophisticated Black Denim Long Midi Dress',
      modelImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w5',
        title: 'ELEGANT BLACK DENIM LONG MIDI DRESS FOR WOMEN',
        price: 899,
        originalPrice: 2199,
        thumbnail: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=220&q=80',
        category: 'LONG MIDI DRESS'
      }
    },
    {
      id: 'reel-6',
      title: 'Floral Print Smocked Cotton Tiered Dress',
      modelImage: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=720&q=80',
      product: {
        id: 'prod-w6',
        title: 'FLORAL PRINT SMOCKED COTTON MIDI DRESS WITH TIERED HEM',
        price: 749,
        originalPrice: 2299,
        thumbnail: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=220&q=80',
        category: 'LONG MIDI DRESS'
      }
    }
  ];

  // Generic Designer Boutique Products Catalog (Unsplash placeholder images)
  const DEFAULT_FASHION_PRODUCTS: FashionProduct[] = [
    {
      id: 'fp-1',
      title: 'ELEGANT COTTON SHIRT WITH PALAZZO CO-ORD SET',
      category: 'CO-ORD SET',
      price: 999,
      originalPrice: 1999,
      badge: 'Sale 50%',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80',
      colors: ['#E11D48', '#0F172A', '#0D9488'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Crafted from breathable premium cotton, this elegant matching shirt & palazzo set provides unmatched comfort with effortless chic aesthetics.',
      fabric: '100% Breathable Premium Cotton',
      rating: 5.0,
      reviewsCount: 38
    },
    {
      id: 'fp-2',
      title: 'STRIPED COTTON SHIRT & PALAZZO FULL PAIR',
      category: 'COTTON TWO PIECE PAIR',
      price: 999,
      originalPrice: 1999,
      badge: 'Sale 50%',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=720&q=80',
      colors: ['#0284C7', '#D97706', '#334155'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      description: 'Vertical pin-stripe tailored top paired with relaxed fit wide-leg palazzo pants. Includes functional pockets and mother-of-pearl buttons.',
      fabric: 'Hand-loomed Organic Cotton',
      rating: 4.9,
      reviewsCount: 42
    },
    {
      id: 'fp-3',
      title: 'ELEGANT BLACK DENIM LONG MIDI DRESS FOR WOMEN',
      category: 'LONG MIDI DRESS',
      price: 899,
      originalPrice: 2199,
      badge: 'Sale 59%',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=80',
      colors: ['#09090B', '#1E3A8A'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Structured lightweight black denim midi dress with contrast white topstitching, puff sleeves, and a tailored silhouette that flatters all body types.',
      fabric: 'Lightweight Soft-washed Denim Cotton',
      rating: 5.0,
      reviewsCount: 29
    },
    {
      id: 'fp-4',
      title: 'ELEGANT COLLARED BUTTON-DOWN SHORT MIDI DRESS',
      category: 'SHORT MIDI DRESS',
      price: 699,
      originalPrice: 1399,
      badge: 'Sale 50%',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=720&q=80',
      colors: ['#0D9488', '#BE123C', '#1E293B'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Sophisticated teal dress with classic spread collar, puff sleeves, front button closure, and side seam pockets. Ideal for office & casual outings.',
      fabric: 'Pure Pre-shrunk Cotton Cambric',
      rating: 4.8,
      reviewsCount: 31
    },
    {
      id: 'fp-5',
      title: 'CONTEMPORARY COTTON PANELLED MIDI DRESS WITH PUFF SLEEVES',
      category: 'COTTON MIDI DRESS',
      price: 699,
      originalPrice: 2999,
      badge: 'Sale 76%',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=720&q=80',
      colors: ['#18181B', '#475569'],
      sizes: ['M', 'L', 'XL'],
      description: 'Figure-elongating panelled construction with delicate ruched puff sleeves. Crafted for everyday elegance with a relaxed flowy drape.',
      fabric: 'Premium 100% Breathable Cotton',
      rating: 5.0,
      reviewsCount: 54
    },
    {
      id: 'fp-6',
      title: 'FLORAL PRINT SMOCKED COTTON MIDI DRESS WITH TIERED HEM',
      category: 'LONG MIDI DRESS',
      price: 749,
      originalPrice: 2299,
      badge: 'Sale 67%',
      image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=720&q=80',
      colors: ['#DB2777', '#4F46E5', '#059669'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'Bohemian floral prints meet comfort smocking at the bodice, culminating in an airy tiered frill hem. A vacation and Sunday brunch essential.',
      fabric: 'Artisan Screen-Printed Soft Cotton',
      rating: 4.9,
      reviewsCount: 22
    },
    {
      id: 'fp-7',
      title: 'COTTON STRIPED CAMI JUMPSUIT WITH FLARED LEGS',
      category: 'JUMPSUIT',
      price: 849,
      originalPrice: 1899,
      badge: 'Sale 55%',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=720&q=80',
      colors: ['#2563EB', '#0F172A'],
      sizes: ['S', 'M', 'L'],
      description: 'Wide flare silhouette crafted in classic nautical stripes with adjustable cami straps and detachable fabric tie-belt.',
      fabric: 'Lightweight Slub Cotton',
      rating: 4.7,
      reviewsCount: 19
    },
    {
      id: 'fp-8',
      title: 'CASUAL COTTON OVERSIZED FANCY TOP WITH BUTTON DETAIL',
      category: 'FANCY TOPS',
      price: 549,
      originalPrice: 1199,
      badge: 'Sale 54%',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=720&q=80',
      colors: ['#F59E0B', '#10B981', '#64748B'],
      sizes: ['M', 'L', 'XL', 'XXL'],
      description: 'Relaxed drop-shoulder silhouette with coconut-shell buttons and cuffed sleeves. Looks exceptional paired with jeans or linen palazzos.',
      fabric: 'Soft Washed Slub Cotton',
      rating: 4.8,
      reviewsCount: 27
    }
  ];

  // Merge profile products if available
  const allProducts: FashionProduct[] = useMemo(() => {
    const customItems = profile.sectionData?.products?.items || [];
    if (!customItems || customItems.length === 0) {
      return DEFAULT_FASHION_PRODUCTS;
    }
    const profileMapped: FashionProduct[] = customItems.map((p, idx) => ({
      id: p.id || `profile-p-${idx}`,
      title: p.name || 'Designer Outfit',
      category: p.category ? p.category.toUpperCase() : 'NEW ARRIVAL',
      price: p.price || 999,
      originalPrice: p.originalPrice || Math.round((p.price || 999) * 1.8),
      badge: p.originalPrice && p.price && p.originalPrice > p.price ? `Sale ${Math.round((1 - p.price / p.originalPrice) * 100)}%` : 'New',
      image: p.imageUrl || DEFAULT_FASHION_PRODUCTS[idx % DEFAULT_FASHION_PRODUCTS.length].image,
      hoverImage: DEFAULT_FASHION_PRODUCTS[(idx + 1) % DEFAULT_FASHION_PRODUCTS.length].image,
      colors: ['#E11D48', '#0F172A', '#0D9488'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: p.description || 'Exclusive designer apparel made with hand-picked premium fabrics and artisanal finish.',
      fabric: 'Premium Pure Cotton',
      rating: 4.9,
      reviewsCount: 24 + idx * 3
    }));

    // Combine custom items with defaults for a rich storefront experience
    return [...profileMapped, ...DEFAULT_FASHION_PRODUCTS.slice(profileMapped.length)];
  }, [profile.sectionData?.products?.items]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') return allProducts;
    if (selectedCategory === 'NEW ARRIVAL') return allProducts.slice(0, 6);
    return allProducts.filter(p => 
      p.category.toUpperCase().includes(selectedCategory) ||
      selectedCategory.includes(p.category.toUpperCase())
    );
  }, [allProducts, selectedCategory]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<FashionProduct | null>(null);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>('M');
  const [selectedQuickColor, setSelectedQuickColor] = useState<string>('');
  const [isVideoShoppingOpen, setIsVideoShoppingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeReelModal, setActiveReelModal] = useState<WatchAndBuyReel | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Social links extraction with profile fallbacks
  const socialLinks = useMemo(() => {
    const list: any[] = profile.sectionData?.socials?.items || (profile as any).socials || [];
    const findUrl = (platform: string) => {
      const match = list.find((s: any) => s.platform?.toLowerCase().includes(platform) || (s.url && s.url.toLowerCase().includes(platform)));
      return match?.url;
    };
    const cleanBrandSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return {
      instagram: findUrl('instagram') || `https://instagram.com/${cleanBrandSlug || 'fashion.boutique'}`,
      youtube: findUrl('youtube') || `https://youtube.com/@${cleanBrandSlug || 'fashionboutique'}`,
      whatsapp: findUrl('whatsapp') || `https://wa.me/${cleanPhone}`,
      facebook: findUrl('facebook') || `https://facebook.com/${cleanBrandSlug || 'fashionboutique'}`
    };
  }, [profile, brandName, cleanPhone]);

  // Instagram handle display
  const instagramHandle = useMemo(() => {
    const match = socialLinks.instagram.match(/instagram\.com\/([^/?#]+)/i);
    return match ? `@${match[1]}` : `@${brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'fashionboutique'}`;
  }, [socialLinks.instagram, brandName]);

  // YouTube in-window video player state
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);
  const [activeYouTubeVideo, setActiveYouTubeVideo] = useState<FashionYouTubeVideo>(FASHION_YOUTUBE_PLAYLIST_ITEMS[0]);

  // Instagram Reel in-window viewer state
  const [activeInstagramReel, setActiveInstagramReel] = useState<FashionInstagramReel | null>(null);

  // Merge user uploaded custom videos if available in profile
  const displayYouTubeVideos = useMemo(() => {
    const userVideos = profile.sectionData?.videos?.items || (profile as any).videos || [];
    if (!userVideos || userVideos.length === 0) return FASHION_YOUTUBE_PLAYLIST_ITEMS;
    
    const mappedUserVideos: FashionYouTubeVideo[] = userVideos.map((v: any, idx: number) => {
      const embedSrc = (getEmbedUrl && getEmbedUrl(v)) || v.embedUrl || (v.url ? (v.url.includes('embed') ? v.url : `https://www.youtube.com/embed/${v.url.split('v=')[1]?.split('&')[0] || ''}?autoplay=1&rel=0`) : '');
      return {
        id: v.id || `user-vid-${idx}`,
        title: v.title || `${brandName} Fashion Showcase ${idx + 1}`,
        subtitle: v.caption || 'Official Brand Lookbook Video',
        duration: '05:00',
        quality: '4K UHD',
        views: '15.2K views',
        tag: idx === 0 ? 'FEATURED' : 'LOOKBOOK',
        description: v.caption || `Watch our latest fashion collection and styling presentation from ${brandName}.`,
        imageUrl: v.thumbnailUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        embedUrl: embedSrc || 'https://www.youtube.com/embed/gLg07y4Uj5k?autoplay=1&rel=0'
      };
    });
    return [...mappedUserVideos, ...FASHION_YOUTUBE_PLAYLIST_ITEMS.slice(mappedUserVideos.length)];
  }, [profile.sectionData?.videos?.items, (profile as any).videos, brandName, getEmbedUrl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Autoplay hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // WhatsApp 1-Click Buy Action
  const handleWhatsAppBuy = (product: FashionProduct | WatchAndBuyReel['product'], customSize?: string) => {
    trackAction('buy_click');
    const sizeNote = customSize ? ` | Size: ${customSize}` : '';
    const msg = `Hello ${brandName}, I would like to order this outfit from your website:\n\n` +
      `👗 *${product.title}*\n` +
      `💰 *Price:* ₹${product.price.toLocaleString('en-IN')}${sizeNote}\n` +
      `🔗 *Product Link:* ${window.location.href}\n\n` +
      `Please let me know available colors, delivery time and payment details!`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Video Shopping Appointment Handler
  const handleBookVideoShopping = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    trackAction('video_shopping_click');
    const msg = `Hello ${brandName}, I would like to book a *1-on-1 Video Shopping Call* to see your latest collection live!\n\n` +
      `👤 *Name:* ${leadName || 'Shopper'}\n` +
      `📞 *Phone:* ${leadPhone || 'Available on WhatsApp'}\n` +
      `👗 *Interested Categories:* ${selectedCategory === 'ALL' ? 'Midi Dresses & Co-Ord Sets' : selectedCategory}\n` +
      `📝 *Notes:* ${leadMessage || 'Looking for latest festive and casual cotton outfits'}\n\n` +
      `Please confirm the best time slot for our video call!`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsVideoShoppingOpen(false);
    showToast('Video Shopping request initiated on WhatsApp!');
  };

  // Convert FashionProduct to ProductItem for Cart compatibility
  const handleAddToCart = (product: FashionProduct) => {
    const productItem: ProductItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      currency: 'INR',
      imageUrl: product.image,
      description: product.description,
      category: product.category,
      isAvailable: true
    };
    addToCart(productItem);
    showToast(`Added "${product.title.slice(0, 24)}..." to your bag!`);
  };

  // Total cart items count
  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Real-time search matches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allProducts.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [allProducts, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white text-[#191919] font-sans relative antialiased selection:bg-[#1f3d2b] selection:text-white pb-16 md:pb-0 overflow-x-hidden">
      
      {/* Fashion Template Fonts (Cinzel + Jost) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

            .hk-font-serif {
              font-family: 'Cinzel', Georgia, serif;
            }
            .hk-font-sans {
              font-family: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            /* Custom smooth scrollbar for Watch & Buy horizontal reel */
            .hk-hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hk-hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            @keyframes hkPulseGreen {
              0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
              50% { transform: scale(1.05); box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
            }
            .hk-wa-pulse {
              animation: hkPulseGreen 2.4s infinite ease-in-out;
            }
          `
        }}
      />

      {/* View Switcher Bar (Mobile Card / Mini-Website) */}
      {showViewToggle && (
        <div className="w-full bg-[#0a0a0a] text-xs text-slate-300 py-1.5 px-4 flex items-center justify-between border-b border-white/10 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium tracking-wide">Fashion E-Store & Lookbook View</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                viewMode === 'mobile' 
                  ? 'bg-white text-black font-semibold' 
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Mobile Card
            </button>
            <button
              onClick={() => setViewMode('website')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                viewMode === 'website' 
                  ? 'bg-white text-black font-semibold' 
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              Full Website
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. TOP ANNOUNCEMENT BAR (HK Forest Green)                     */}
      {/* ============================================================== */}
      <div className="w-full bg-[#1e3828] text-white py-2.5 px-4 text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-3 relative z-40 shadow-sm">
        <span className="hk-font-sans font-medium text-white/95">
          Ready for video shopping
        </span>
        <button
          onClick={() => setIsVideoShoppingOpen(true)}
          className="bg-white text-[#191919] hover:bg-[#f0f0f0] transition px-3.5 py-1 rounded-full text-xs font-semibold shadow tracking-normal hover:scale-105 active:scale-95"
        >
          Book your Video Call
        </button>
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN HEADER (Pitch Black)                                   */}
      {/* ============================================================== */}
      <header className="w-full bg-[#000000] text-white sticky top-0 z-40 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Mobile Left: Hamburger & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-white hover:text-emerald-400 transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-white hover:text-emerald-400 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Center Brand Monogram Logo */}
          <div className="flex items-center">
            <a 
              href="#home"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group"
            >
              {profile.avatarUrl ? (
                <div className="relative">
                  <img
                    src={profile.avatarUrl}
                    alt={brandName}
                    className="h-10 sm:h-12 w-auto object-contain rounded-sm"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="border border-white/80 p-1 px-2 text-center group-hover:border-emerald-400 transition">
                    <span className="hk-font-serif text-lg sm:text-xl font-bold tracking-widest text-white">
                      {brandInitials}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="hk-font-serif text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase">
                      {brandName.length > 20 ? brandName.slice(0, 20) : brandName}
                    </span>
                    <span className="hk-font-sans text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                      DESIGNER BOUTIQUE
                    </span>
                  </div>
                </div>
              )}
            </a>
          </div>

          {/* Desktop Right Action Icons */}
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Desktop Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-neutral-300 hover:text-white transition group"
              title="Search Collections"
            >
              <Search className="w-5 h-5 text-white group-hover:scale-110 transition" />
            </button>

            {/* Account Icon */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="text-neutral-300 hover:text-white transition p-1"
              title="Customer Account & Orders"
            >
              <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white hover:scale-110 transition" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hidden sm:flex relative text-neutral-300 hover:text-white transition p-1"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white hover:scale-110 transition" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#cc4058] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-neutral-300 hover:text-white transition p-1"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:scale-110 transition" />
              <span className="absolute -top-1.5 -right-2 min-w-4.5 h-4.5 px-1 bg-[#cc4058] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CATEGORY NAVIGATION BAR (White Bar with Jost Font)          */}
        {/* ============================================================== */}
        <nav className="w-full bg-white text-[#232323] border-t border-b border-[#e6e6e6] hidden lg:block overflow-x-auto hk-hide-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex items-center justify-center gap-7 py-3 text-[13px] font-medium tracking-wide hk-font-sans uppercase whitespace-nowrap">
              {NAV_CATEGORIES.map(category => {
                const isActive = selectedCategory === category;
                return (
                  <li key={category}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        const section = document.getElementById('products-section');
                        if (section) section.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`relative py-1 transition hover:text-[#8b714a] ${
                        isActive 
                          ? 'text-[#191919] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#191919]' 
                          : 'text-[#3c3c3c]'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => {
                    const section = document.getElementById('socials');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-1 px-3 rounded-full bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-neutral-900 font-bold text-xs flex items-center gap-1.5 transition border border-red-200/60 shadow-2xs"
                  title="Watch Instagram Reels & YouTube Lookbooks"
                >
                  <Play className="w-3 h-3 fill-red-600 text-red-600" />
                  <span>VIDEOS & REELS</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ============================================================== */}
      {/* 4. HERO BANNER (Iconic HK Emerald & Gold Aesthetic)            */}
      {/* ============================================================== */}
      <section id="home" className="relative w-full bg-[#0a1e13] text-white overflow-hidden">
        {activeSlide === 0 ? (
          /* Slide 1: STYLE THAT INSPIRES */
          <div className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
            
            {/* Background Image / Model Collage */}
            <div className="absolute inset-0 z-0">
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=750&q=80" 
                />
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1880&q=80"
                  alt={`Style That Inspires - ${brandName}`}
                  className="w-full h-full object-cover object-center lg:object-right filter brightness-95"
                />
              </picture>
              {/* Subtle dark gradient overlay on left for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#091a11]/95 via-[#091a11]/70 to-transparent lg:w-3/5" />
            </div>

            {/* Overlaid Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-12 lg:py-20 flex flex-col justify-center">
              <div className="max-w-xl text-left space-y-4 sm:space-y-6">
                
                {/* Brand Monogram & Crest */}
                <div className="flex items-center gap-3">
                  <div className="border border-[#c5a880] p-1.5 px-2.5 rounded-sm bg-black/40 backdrop-blur-sm">
                    <span className="hk-font-serif text-lg font-bold text-[#e6ca9f] tracking-widest">
                      {brandInitials}
                    </span>
                  </div>
                  <div>
                    <h2 className="hk-font-serif text-sm tracking-[0.25em] text-[#e6ca9f] uppercase font-semibold">
                      {brandName}
                    </h2>
                    <p className="text-[10px] text-emerald-200 tracking-[0.2em] uppercase font-sans">
                      DESIGNER BOUTIQUE
                    </p>
                  </div>
                </div>

                {/* Main Headline */}
                <div className="space-y-1">
                  <h1 className="hk-font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15]">
                    STYLE THAT <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5dfb8] via-[#e6ca9f] to-[#c5a880]">
                      INSPIRES
                    </span>
                  </h1>
                  
                  {/* Decorative Golden Flourish Divider */}
                  <div className="flex items-center gap-3 pt-1 text-[#c5a880]/70">
                    <span className="h-px w-10 bg-[#c5a880]/50" />
                    <span className="text-xs">❦</span>
                    <span className="h-px w-10 bg-[#c5a880]/50" />
                  </div>

                  <p className="hk-font-serif text-base sm:text-xl text-[#f3eedd] font-normal tracking-wide italic pt-1">
                    Elegant Outfits. Effortless You.
                  </p>
                </div>

                {/* 4 Feature Badges (Trending Collections, Premium Fabrics, Timeless Designs, Perfect For You) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3 pb-2 text-left">
                  <div className="flex flex-col items-start gap-1">
                    <div className="w-8 h-8 rounded border border-[#c5a880]/60 flex items-center justify-center text-[#e6ca9f] bg-black/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="hk-font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase leading-tight">
                      TRENDING<br />COLLECTIONS
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="w-8 h-8 rounded border border-[#c5a880]/60 flex items-center justify-center text-[#e6ca9f] bg-black/30">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="hk-font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase leading-tight">
                      PREMIUM<br />FABRICS
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="w-8 h-8 rounded border border-[#c5a880]/60 flex items-center justify-center text-[#e6ca9f] bg-black/30">
                      <Star className="w-4 h-4" />
                    </div>
                    <span className="hk-font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase leading-tight">
                      TIMELESS<br />DESIGNS
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <div className="w-8 h-8 rounded border border-[#c5a880]/60 flex items-center justify-center text-[#e6ca9f] bg-black/30">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="hk-font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/90 uppercase leading-tight">
                      PERFECT<br />FOR EVERY YOU
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => {
                      const section = document.getElementById('products-section');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-white text-black hover:bg-[#f0f0f0] transition text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95"
                  >
                    EXPLORE COLLECTION
                  </button>

                  <button
                    onClick={() => setIsVideoShoppingOpen(true)}
                    className="px-5 py-3 border border-white/70 hover:border-white text-white bg-black/40 backdrop-blur-sm hover:bg-black/60 transition text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>BOOK VIDEO CALL</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Slide 2: FESTIVE & SUMMER REEL SLIDER */
          <div className="relative min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <picture>
                <source 
                  media="(max-width: 768px)" 
                  srcSet="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=750&q=80" 
                />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1880&q=80"
                  alt={`Summer & Festive Outfits - ${brandName}`}
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:w-3/5" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-12 lg:py-20 flex flex-col justify-center">
              <div className="max-w-xl text-left space-y-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-emerald-300 rounded">
                  NEW SEASON EDIT 2026
                </span>
                <h2 className="hk-font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                  PURE COTTON <br />
                  <span className="text-amber-200">CO-ORD MAGIC</span>
                </h2>
                <p className="text-neutral-200 text-sm sm:text-base max-w-md hk-font-sans">
                  Lightweight, breathable artisanal handloom fabrics designed for high temperatures and effortless silhouettes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('CO-ORD SET');
                      const section = document.getElementById('products-section');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-[#c5a880] text-black hover:bg-[#d8be98] transition text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg"
                  >
                    SHOP CO-ORD SETS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slider Controls (Left / Right Arrows & Dots) */}
        <button
          onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition border border-white/20 z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setActiveSlide(prev => (prev === 0 ? 1 : 0))}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition border border-white/20 z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeSlide === 0 ? 'bg-white w-6' : 'bg-white/40'
            }`}
            aria-label="Slide 1"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              activeSlide === 1 ? 'bg-white w-6' : 'bg-white/40'
            }`}
            aria-label="Slide 2"
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. WATCH AND BUY (Vertical Reels Carousel)                     */}
      {/* ============================================================== */}
      <section className="w-full py-12 sm:py-16 bg-[#ffffff] border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="hk-font-serif text-2.5xl sm:text-4xl text-[#191919] font-normal tracking-wide">
              Watch and Buy
            </h2>
            <p className="hk-font-sans text-xs sm:text-sm text-neutral-500 mt-1 uppercase tracking-widest">
              Tap any look to preview in motion & order directly on WhatsApp
            </p>
          </div>

          {/* Reels Horizontal Scroll Container */}
          <div className="relative group">
            <div className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 px-1 hk-hide-scrollbar snap-x snap-mandatory">
              {WATCH_AND_BUY_REELS.map(reel => (
                <div
                  key={reel.id}
                  className="relative flex-none w-[220px] sm:w-[260px] h-[360px] sm:h-[420px] rounded-lg overflow-hidden shadow-md group/card cursor-pointer snap-start transition hover:shadow-xl hover:-translate-y-1"
                  onClick={() => setActiveReelModal(reel)}
                >
                  {/* Model Reel Photo / Video Poster */}
                  <img
                    src={reel.modelImage}
                    alt={reel.title}
                    className="w-full h-full object-cover object-top transition duration-500 group-hover/card:scale-105"
                  />

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play Reel Indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center border border-white/20">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>

                  {/* Bottom Product Overlay Card */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded shadow-lg border border-white/40 flex items-center gap-2.5">
                    <img
                      src={reel.product.thumbnail}
                      alt={reel.product.title}
                      className="w-12 h-14 object-cover rounded bg-neutral-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-[11px] font-medium text-[#191919] leading-tight line-clamp-1 hk-font-sans uppercase">
                        {reel.product.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-[#191919]">
                          ₹{reel.product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{reel.product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. NEW ARRIVALS (Product Grid 4-col desktop, 2-col mobile)      */}
      {/* ============================================================== */}
      <section id="products-section" className="w-full py-12 sm:py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="hk-font-serif text-2.5xl sm:text-4xl text-[#191919] font-normal tracking-wide uppercase">
              NEW ARRIVALS
            </h2>
            <div className="w-12 h-0.5 bg-[#191919] mx-auto mt-2" />
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 text-xs uppercase font-medium">
            {['ALL', 'CO-ORD SET', 'LONG MIDI DRESS', 'COTTON TWO PIECE PAIR', 'SHORT MIDI DRESS'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-3.5 py-1.5 rounded-full border transition ${
                  selectedCategory === tab
                    ? 'bg-[#191919] text-white border-[#191919]'
                    : 'bg-white text-neutral-600 border-neutral-300 hover:border-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Products Grid: 4 columns on Desktop, 2 columns on Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  className="group flex flex-col bg-white rounded-none border border-transparent hover:border-neutral-200 p-1 sm:p-2 transition duration-300"
                >
                  {/* Product Card Media Box */}
                  <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer">
                    
                    {/* Main Image & Hover Secondary View */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge on Top Right: Sale 50% */}
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-[#cc4058] text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-none shadow">
                        {product.badge}
                      </div>
                    )}

                    {/* Floating Action Buttons on Top Left (Wishlist & Quick View) */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-2 z-10">
                      {/* Wishlist Heart */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                          showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                        }}
                        className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white shadow flex items-center justify-center transition hover:scale-110 active:scale-95 ${
                          isWishlisted ? 'text-[#cc4058]' : 'text-neutral-700 hover:text-black'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#cc4058]' : ''}`} />
                      </button>

                      {/* Quick View Eye */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(product);
                          setSelectedQuickSize(product.sizes[0] || 'M');
                          setSelectedQuickColor(product.colors[0] || '');
                        }}
                        className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-white shadow flex items-center justify-center text-neutral-700 hover:text-black transition hover:scale-110 active:scale-95"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick WhatsApp Order Hover Button on Desktop */}
                    <div className="absolute bottom-2 left-2 right-2 hidden lg:flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleWhatsAppBuy(product)}
                        className="flex-1 bg-[#1e3828] hover:bg-[#284c36] text-white py-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Order</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-9 bg-black hover:bg-neutral-800 text-white flex items-center justify-center shadow"
                        title="Add to Shopping Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Product Card Details */}
                  <div className="pt-3 pb-1 text-left flex flex-col flex-1">
                    
                    {/* Category Label */}
                    <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase hk-font-sans">
                      {product.category}
                    </span>

                    {/* Product Title */}
                    <h3 
                      onClick={() => setQuickViewProduct(product)}
                      className="hk-font-sans text-xs sm:text-[13px] font-normal text-[#232323] leading-snug line-clamp-2 mt-1 hover:text-[#8b714a] cursor-pointer transition uppercase"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    {/* Color Swatch Dots */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1.5 my-2">
                        {product.colors.map((hex, idx) => (
                          <span
                            key={idx}
                            style={{ backgroundColor: hex }}
                            className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                          />
                        ))}
                      </div>
                    )}

                    {/* Price Block */}
                    <div className="flex items-center gap-2 mt-auto pt-1">
                      <span className="hk-font-sans text-sm sm:text-base font-semibold text-[#232323]">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="hk-font-sans text-xs text-neutral-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Mobile Quick Action Buttons */}
                    <div className="flex items-center gap-1.5 mt-2.5 lg:hidden">
                      <button
                        onClick={() => handleWhatsAppBuy(product)}
                        className="flex-1 bg-[#1e3828] active:bg-[#284c36] text-white py-1.5 rounded text-[11px] font-medium flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Order</span>
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-1.5 bg-neutral-900 active:bg-neutral-800 text-white rounded"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. PROMOTIONAL CURATED BANNERS (Split Lookbook)                */}
      {/* ============================================================== */}
      <section className="w-full py-6 sm:py-10 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Banner 1: Signature Co-Ords Collection */}
            <div className="relative rounded overflow-hidden group h-[260px] sm:h-[320px] shadow">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=940&q=80"
                alt="Exclusive Co-Ord Sets"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-[#e6ca9f] font-semibold">
                  SIGNATURE COLLECTION
                </span>
                <h3 className="hk-font-serif text-2xl sm:text-3xl font-medium mt-1">
                  Handcrafted Co-Ord Sets
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mt-1">
                  Pure breathable cotton with custom tailoring and effortless comfort.
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setSelectedCategory('CO-ORD SET');
                      const s = document.getElementById('products-section');
                      if (s) s.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block text-xs font-semibold uppercase tracking-wider underline underline-offset-4 hover:text-[#e6ca9f] transition"
                  >
                    EXPLORE CO-ORDS &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Banner 2: New Season Cotton Midi Dresses */}
            <div className="relative rounded overflow-hidden group h-[260px] sm:h-[320px] shadow">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=940&q=80"
                alt="New Cotton Midi Dresses"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
                  NEW ARRIVALS 2026
                </span>
                <h3 className="hk-font-serif text-2xl sm:text-3xl font-medium mt-1">
                  Flattering Cotton Midi Dresses
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mt-1">
                  From everyday errands to formal evenings, find your favorite silhouette.
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setSelectedCategory('LONG MIDI DRESS');
                      const s = document.getElementById('products-section');
                      if (s) s.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block text-xs font-semibold uppercase tracking-wider underline underline-offset-4 hover:text-emerald-300 transition"
                  >
                    SHOP MIDI DRESSES &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. WHAT OUR CUSTOMERS SAYS (Authentic Testimonials)            */}
      {/* ============================================================== */}
      <section className="w-full py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="hk-font-serif text-2.5xl sm:text-4xl text-[#191919] font-normal tracking-wide uppercase">
            WHAT OUR CUSTOMERS SAYS
          </h2>
          <div className="w-12 h-0.5 bg-[#191919] mx-auto mt-2 mb-10 sm:mb-14" />

          {/* 3-Column Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Review 1 */}
            <div className="p-6 sm:p-8 bg-neutral-50 rounded text-center flex flex-col items-center justify-between shadow-sm border border-neutral-100">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="hk-font-sans text-neutral-700 text-sm sm:text-[15px] leading-relaxed italic">
                &ldquo;Absolutely in love with my co-ord set! The fit is perfect and the fabric feels premium. Got so many compliments at my family brunch!&rdquo;
              </p>
              <div className="mt-5 pt-3 border-t border-neutral-200 w-full">
                <p className="hk-font-serif font-semibold text-sm text-[#191919]">
                  Priya M.
                </p>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  Mumbai, India • Verified Buyer
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 sm:p-8 bg-neutral-50 rounded text-center flex flex-col items-center justify-between shadow-sm border border-neutral-100">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="hk-font-sans text-neutral-700 text-sm sm:text-[15px] leading-relaxed italic">
                &ldquo;The cotton midi dress exceeded all expectations! The stitching is so neat and the fabric is breathable for hot weather. Ordering another color immediately!&rdquo;
              </p>
              <div className="mt-5 pt-3 border-t border-neutral-200 w-full">
                <p className="hk-font-serif font-semibold text-sm text-[#191919]">
                  Ananya S.
                </p>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  Bengaluru, India • Verified Buyer
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 sm:p-8 bg-neutral-50 rounded text-center flex flex-col items-center justify-between shadow-sm border border-neutral-100">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="hk-font-sans text-neutral-700 text-sm sm:text-[15px] leading-relaxed italic">
                &ldquo;Booked a video shopping call and the staff patiently showed me 10 different dresses. Delivered within 3 days in Delhi. 10/10 shopping experience!&rdquo;
              </p>
              <div className="mt-5 pt-3 border-t border-neutral-200 w-full">
                <p className="hk-font-serif font-semibold text-sm text-[#191919]">
                  Shreya K.
                </p>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                  New Delhi, India • Verified Buyer
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. RECENT POSTS / FASHION JOURNAL                             */}
      {/* ============================================================== */}
      <section className="w-full py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="hk-font-serif text-2.5xl sm:text-4xl text-[#191919] font-normal tracking-wide uppercase">
              RECENT POSTS
            </h2>
            <div className="w-12 h-0.5 bg-[#191919] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            
            {/* Post 1 */}
            <div className="bg-white rounded overflow-hidden shadow-sm group">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80"
                  alt="Styling Co-Ord Sets"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  JULY 12, 2026 • STYLE GUIDE
                </span>
                <h3 className="hk-font-serif text-base sm:text-lg font-semibold text-[#191919] mt-1.5 leading-snug group-hover:text-[#8b714a] transition">
                  How to Style Co-Ord Sets From Day to Evening Parties
                </h3>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  Transition your matching cotton set effortlessly with minimalist jewelry, statement heels, and tailored accessories.
                </p>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white rounded overflow-hidden shadow-sm group">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=720&q=80"
                  alt="Summer Cotton Outfits"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  JUNE 28, 2026 • TREND REPORT
                </span>
                <h3 className="hk-font-serif text-base sm:text-lg font-semibold text-[#191919] mt-1.5 leading-snug group-hover:text-[#8b714a] transition">
                  Top 5 Breathable Cotton Dresses for the Indian Summer
                </h3>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  Keep cool in humid weather with pre-washed khadi and airy tiered silhouettes designed for everyday elegance.
                </p>
              </div>
            </div>

            {/* Post 3 */}
            <div className="bg-white rounded overflow-hidden shadow-sm group">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=720&q=80"
                  alt="Care for Artisan Handloom"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  JUNE 15, 2026 • FABRIC CARE
                </span>
                <h3 className="hk-font-serif text-base sm:text-lg font-semibold text-[#191919] mt-1.5 leading-snug group-hover:text-[#8b714a] transition">
                  The Complete Fabric & Washing Guide for Cotton Apparel
                </h3>
                <p className="text-xs text-neutral-600 mt-2 line-clamp-2">
                  Expert advice on color preservation, steam ironing, and gentle wash tips to keep your garments looking brand new.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. SOCIAL MEDIA HUB (INSTAGRAM REELS & YOUTUBE VIDEO SPACES)   */}
      {/* ============================================================== */}
      <section id="socials" className="w-full py-14 sm:py-20 bg-[#faf8f5] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d4af37]/50 text-[#8b714a] text-xs font-semibold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8b714a]" /> Official Social Media Hub
            </div>
            <h2 className="hk-font-serif text-2.5xl sm:text-4xl text-[#191919] font-normal tracking-wide uppercase">
              FOLLOW OUR FASHION JOURNEY
            </h2>
            <div className="w-12 h-0.5 bg-[#191919] mx-auto mt-2 mb-3" />
            <p className="hk-font-sans text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
              Watch our signature 4K runway lookbooks and styling hauls on YouTube, discover daily outfit reels on Instagram, and join over 80,000 fashion lovers across India.
            </p>
          </div>

          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            
            {/* 1. Instagram Platform Space (Card 1) */}
            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-pink-500/30 shadow-lg flex flex-col justify-between space-y-6 group hover:border-pink-500/60 transition-all duration-300">
              <div className="space-y-4">
                
                {/* Instagram Card Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
                      <SocialIcon platform="instagram" size={24} colored={false} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-neutral-900">{instagramHandle}</h3>
                        <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold shadow-2xs">✓</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">52.8K Fashion Enthusiasts • 340+ Outfit Reels</p>
                    </div>
                  </div>

                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAction('instagram_follow_click')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                    <span>Follow on Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Bio snippet */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Daily outfit inspiration, draping tutorials, new collection drops & behind-the-scenes at our atelier. Tag <span className="font-semibold text-neutral-900">{instagramHandle}</span> to get featured on our feed!
                </p>

                {/* Instagram Reels Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                  {FASHION_INSTAGRAM_REELS.map((reel) => (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => setActiveInstagramReel(reel)}
                      className="relative h-48 sm:h-64 rounded-xl overflow-hidden shadow-sm group/item block bg-neutral-900 border border-pink-500/25 text-left cursor-pointer hover:border-pink-500 transition-all hover:scale-[1.02]"
                      title={`Watch Reel: ${reel.title}`}
                    >
                      <img
                        src={reel.imageUrl}
                        alt={reel.title}
                        className="w-full h-full object-cover group-hover/item:scale-108 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-3 text-white">
                        <span className="px-2 py-0.5 rounded-md bg-black/65 text-[10px] font-bold w-max flex items-center gap-1 backdrop-blur-xs text-white">
                          <Play className="w-2.5 h-2.5 fill-white" /> Reel
                        </span>
                        <div>
                          <span className="text-[10px] text-pink-300 font-medium block mb-0.5">{reel.tag}</span>
                          <p className="text-xs font-bold line-clamp-2 leading-tight text-white drop-shadow">
                            {reel.title}
                          </p>
                          <span className="text-[10px] text-[#e6ca9f] font-mono font-semibold mt-1 block">
                            👁️ {reel.views}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

              </div>

              {/* Bottom Tag link */}
              <div className="pt-3 border-t border-pink-400/25 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600">
                <span>Hashtags: #HandcraftedFashion #CottonMidiDresses #CoOrdSets #OOTDIndia</span>
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold text-[#8b714a] hover:underline flex items-center gap-1"
                >
                  View All Reels on Instagram →
                </a>
              </div>

            </div>

            {/* 2. YouTube Platform Space (Card 2) */}
            <div className="bg-gradient-to-br from-neutral-900 via-[#1c1212] to-neutral-950 text-white rounded-2xl p-6 sm:p-8 border border-red-500/30 shadow-2xl flex flex-col justify-between space-y-6 group hover:border-red-500/60 transition-all duration-300">
              <div className="space-y-5">
                
                {/* YouTube Card Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shrink-0">
                      <SocialIcon platform="youtube" size={24} colored={false} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{brandName} Lookbooks & Hauls</h3>
                      <p className="text-xs text-neutral-400">28.5K Subscribers • 4K Collection Videos & Styling Guides</p>
                    </div>
                  </div>

                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAction('youtube_subscribe_click')}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <SocialIcon platform="youtube" size={14} colored={false} className="text-white" />
                    <span>Subscribe on YouTube</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* YouTube Video Showcase Grid (Main 4K Video + Episode Playlist) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Main 4K Video Player Showcase (Left / 7 cols) - PLAYS RIGHT IN THIS WINDOW */}
                  {isPlayingYouTube ? (
                    <div className="lg:col-span-7 relative rounded-xl overflow-hidden shadow-2xl border border-red-500/50 bg-black min-h-[300px] sm:min-h-[360px] flex flex-col">
                      <iframe
                        src={activeYouTubeVideo.embedUrl}
                        title={activeYouTubeVideo.title}
                        className="w-full h-full min-h-[300px] sm:min-h-[360px] rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <button
                          type="button"
                          onClick={() => setIsPlayingYouTube(false)}
                          className="px-2.5 py-1 rounded-lg bg-black/85 hover:bg-black text-white text-xs font-bold flex items-center gap-1 shadow-md border border-white/20 transition cursor-pointer"
                          title="Close Video Preview"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Close Player</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="lg:col-span-7 relative rounded-xl overflow-hidden shadow-lg border border-red-500/30 group/vid flex flex-col justify-end min-h-[300px] sm:min-h-[360px]">
                      <img
                        src={activeYouTubeVideo.imageUrl}
                        alt={activeYouTubeVideo.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Dark Overlay with Pulsing Red Play Button */}
                      <div className="absolute inset-0 bg-black/45 group-hover/vid:bg-black/35 transition-colors flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setIsPlayingYouTube(true)}
                          className="w-16 h-16 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer group-hover/vid:shadow-red-600/50"
                          title="Play in this window"
                        >
                          <Play className="w-7 h-7 fill-white translate-x-0.5" />
                        </button>
                      </div>

                      {/* Duration & Quality Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-1.5 z-10 border border-white/10">
                        <span>{activeYouTubeVideo.duration}</span>
                        <span>•</span>
                        <span className="text-[#e6ca9f]">{activeYouTubeVideo.quality}</span>
                      </div>

                      {/* Video Info Bottom Banner */}
                      <div className="relative z-10 p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent text-white">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 inline-block">
                          {activeYouTubeVideo.tag}
                        </span>
                        <h4 className="hk-font-serif text-base sm:text-lg font-bold leading-snug">
                          {activeYouTubeVideo.title}
                        </h4>
                        <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                          {activeYouTubeVideo.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Playlist Highlights (Right / 5 cols) - CLICKS PLAY DIRECTLY IN WINDOW */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                    <div className="space-y-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#e6ca9f] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#e6ca9f]" /> Featured Collection Hauls & Masterclasses
                      </p>

                      {displayYouTubeVideos.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveYouTubeVideo({
                              ...item,
                              tag: 'NOW PLAYING'
                            });
                            setIsPlayingYouTube(true);
                          }}
                          className={`w-full text-left p-3 rounded-xl border shadow-xs flex items-center gap-3 group/clip transition cursor-pointer ${
                            activeYouTubeVideo.id === item.id && isPlayingYouTube
                              ? 'bg-red-950/60 border-red-500 ring-2 ring-red-500/40 text-white'
                              : 'bg-neutral-800/60 hover:bg-neutral-800 border-neutral-700/60 text-neutral-200'
                          }`}
                          title={`Play: ${item.title}`}
                        >
                          <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/clip:scale-105 transition"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/clip:opacity-100 transition-opacity">
                              <Play className="w-4 h-4 fill-white text-white" />
                            </div>
                            <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white font-bold">
                              {item.duration}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-white group-hover/clip:text-red-400 transition truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{item.subtitle}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Bottom Channel Link */}
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition"
                    >
                      <SocialIcon platform="youtube" size={14} colored={true} />
                      <span>Explore all videos on our YouTube channel</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. OUR STORE / SHOWROOM BANNER                                */}
      {/* ============================================================== */}
      <section className="w-full py-12 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#191919] text-white rounded-lg overflow-hidden flex flex-col lg:flex-row items-center shadow-lg">
            
            {/* Store Photo */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80"
                alt={`${brandName} Boutique Store`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Store Details & Hours */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 text-left space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#e6ca9f] font-semibold">
                VISIT OUR SHOWROOM
              </span>
              <h3 className="hk-font-serif text-2xl sm:text-3xl font-medium">
                Experience Luxury In Person
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Step inside our boutique to try on our exclusive festive & western outfits, consult with our personal stylists, or schedule trial alterations.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-neutral-200 pt-2">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{profile.address || 'Designer Boutique Flagship Store, Fashion Street, India'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Monday - Sunday: 10:00 AM – 9:30 PM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Helpline: {displayPhone}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello, I would like directions and store timings for ${brandName}!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Directions on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. NEWSLETTER SIGN UP                                         */}
      {/* ============================================================== */}
      <section className="w-full py-12 bg-neutral-100 border-t border-neutral-200 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="hk-font-serif text-xl sm:text-2xl text-[#191919] font-medium tracking-wide">
            Newsletter Sign Up
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 mb-5">
            Sign up for exclusive updates, new arrivals & insider only discounts
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Thank you for subscribing to our VIP club!');
            }}
            className="flex items-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 focus:outline-none focus:border-black rounded-none shadow-sm"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. FOOTER (Pitch Black Luxury Minimalist)                     */}
      {/* ============================================================== */}
      <footer className="w-full bg-[#0a0a0a] text-white pt-14 pb-16 lg:pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-left">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="border border-white/80 p-1 px-2">
                  <span className="hk-font-serif text-base font-bold text-white tracking-widest">
                    {brandInitials}
                  </span>
                </div>
                <span className="hk-font-serif text-sm tracking-[0.2em] font-bold uppercase">
                  {brandName}
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Elevating everyday fashion with handcrafted cotton silhouettes, co-ord sets, and timeless ethnic fusion for modern women across India.
              </p>
              <div className="flex items-center gap-3 pt-2 text-neutral-400">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition" title="Follow on Instagram">
                  <SocialIcon platform="instagram" className="w-4 h-4" />
                </a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition" title="Subscribe on YouTube">
                  <SocialIcon platform="youtube" className="w-4 h-4" />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" title="Follow on Facebook">
                  <SocialIcon platform="facebook" className="w-4 h-4" />
                </a>
                <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition" title="Chat on WhatsApp">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-2">
              <h4 className="hk-font-serif text-sm uppercase tracking-wider font-semibold text-white mb-3">
                Quick Links
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li>
                  <button onClick={() => setSelectedCategory('NEW ARRIVAL')} className="hover:text-white transition">
                    New Arrivals
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('CO-ORD SET')} className="hover:text-white transition">
                    Co-Ord Sets
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory('LONG MIDI DRESS')} className="hover:text-white transition">
                    Long Midi Dresses
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const section = document.getElementById('socials');
                      if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="hover:text-[#e6ca9f] transition text-left flex items-center gap-1.5"
                  >
                    <span>Instagram Reels & YouTube Hauls</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsVideoShoppingOpen(true)} className="hover:text-white transition">
                    Book Video Call Shopping
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div className="space-y-2">
              <h4 className="hk-font-serif text-sm uppercase tracking-wider font-semibold text-white mb-3">
                Customer Care
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2">
                <li><span className="hover:text-white cursor-pointer transition">Shipping & Delivery Info</span></li>
                <li><span className="hover:text-white cursor-pointer transition">Returns & Exchanges (7 Days)</span></li>
                <li><span className="hover:text-white cursor-pointer transition">Size Guide & Fit Chart</span></li>
                <li><span className="hover:text-white cursor-pointer transition">Privacy Policy & Terms</span></li>
              </ul>
            </div>

            {/* Column 4: Contact & Helpdesk */}
            <div className="space-y-2 text-xs text-neutral-400">
              <h4 className="hk-font-serif text-sm uppercase tracking-wider font-semibold text-white mb-3">
                Store Helpline
              </h4>
              <p>Customer Support: Mon - Sat (10am - 8pm)</p>
              <p className="text-white font-semibold">{displayPhone}</p>
              <p className="pt-2 text-neutral-400">Email: {profile.email || 'support@yourboutique.com'}</p>
              <p className="text-emerald-400 font-medium">⚡ Instant Support on WhatsApp</p>
            </div>

          </div>

          {/* Copyright & Badges */}
          <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
            <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>100% Genuine Fabrics</span>
              <span>•</span>
              <span>Fast Pan-India Dispatch</span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ============================================================== */}
      {/* 13. STICKY MOBILE BOTTOM NAVIGATION BAR (Exact Match)          */}
      {/* ============================================================== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40 lg:hidden shadow-lg py-1.5 px-3 flex items-center justify-around text-neutral-700">
        <button
          onClick={() => {
            setSelectedCategory('ALL');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium hover:text-black"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium hover:text-black"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        <button
          onClick={() => {
            const section = document.getElementById('products-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium hover:text-black"
        >
          <Grid className="w-5 h-5" />
          <span>Collection</span>
        </button>

        <button
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium hover:text-black"
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-medium hover:text-black relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 bg-[#cc4058] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ============================================================== */}
      {/* 14. FLOATING WHATSAPP CHAT WIDGET (Pulse Animation)            */}
      {/* ============================================================== */}
      <aside aria-label="WhatsApp quick chat" className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40">
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${brandName}, I am browsing your fashion website and need some assistance with sizes and ordering!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hk-wa-pulse hover:scale-110 active:scale-95 transition"
          title="Chat with Stylist on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </aside>

      {/* ============================================================== */}
      {/* MODAL 1: VIDEO SHOPPING BOOKING MODAL                          */}
      {/* ============================================================== */}
      {isVideoShoppingOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#191919] w-full max-w-md rounded-lg shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsVideoShoppingOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="hk-font-serif text-xl sm:text-2xl font-semibold">
                Book a Video Call
              </h3>
              <p className="text-xs text-neutral-600">
                Experience our store live from your home! Our stylists will showcase dresses, fabrics, and custom fits on video call.
              </p>
            </div>

            <form onSubmit={handleBookVideoShopping} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Preferred Date & Time Slot
                </label>
                <input
                  type="text"
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  placeholder="e.g. Tomorrow 4:00 PM - Looking for Co-Ord sets"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1e3828] hover:bg-[#284c36] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded shadow transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: QUICK VIEW PRODUCT MODAL                              */}
      {/* ============================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-[#191919] w-full max-w-2xl rounded shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* Product Media */}
              <div className="aspect-[3/4] bg-neutral-100 rounded overflow-hidden relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover object-top"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-3 left-3 bg-[#cc4058] text-white text-[10px] font-semibold px-2 py-0.5">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="hk-font-serif text-lg sm:text-xl font-medium text-[#191919] mt-1 leading-snug">
                    {quickViewProduct.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500">
                      ({quickViewProduct.reviewsCount} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 my-3">
                    <span className="text-xl font-bold text-[#191919]">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-sm text-neutral-400 line-through">
                        ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed border-t border-b border-neutral-100 py-3">
                    {quickViewProduct.description}
                  </p>

                  {/* Size Selector */}
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1.5 uppercase tracking-wide">
                      Select Size: {selectedQuickSize}
                    </label>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedQuickSize(size)}
                          className={`w-9 h-9 rounded text-xs font-semibold transition border ${
                            selectedQuickSize === size
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      handleWhatsAppBuy(quickViewProduct, selectedQuickSize);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-2.5 bg-[#1e3828] hover:bg-[#284c36] text-white text-xs font-semibold uppercase tracking-wider rounded shadow flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Order</span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded shadow flex items-center justify-center gap-2 transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: WATCH AND BUY REEL PLAYER MODAL                       */}
      {/* ============================================================== */}
      {activeReelModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3">
          <div className="relative w-full max-w-sm bg-neutral-900 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <button
              onClick={() => setActiveReelModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Reel Vertical Image Frame */}
            <div className="relative flex-1 aspect-[9/16] bg-black overflow-hidden">
              <img
                src={activeReelModal.modelImage}
                alt={activeReelModal.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-bold tracking-widest text-white bg-black/40 px-2 py-0.5 rounded uppercase">
                  LIVE MODEL REEL
                </span>
              </div>

              {/* Bottom Product Order Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded shadow-lg text-left">
                <div className="flex items-center gap-3">
                  <img
                    src={activeReelModal.product.thumbnail}
                    alt={activeReelModal.product.title}
                    className="w-12 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#191919] line-clamp-1 uppercase">
                      {activeReelModal.product.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold text-[#191919]">
                        ₹{activeReelModal.product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{activeReelModal.product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleWhatsAppBuy(activeReelModal.product);
                      setActiveReelModal(null);
                    }}
                    className="flex-1 py-2 bg-[#1e3828] hover:bg-[#284c36] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Order Look on WhatsApp</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAWER 1: REAL-TIME SEARCH DRAWER                              */}
      {/* ============================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="hk-font-serif text-lg font-semibold uppercase">
                Search Products
              </h3>
              <button onClick={() => setIsSearchOpen(false)} className="p-1 text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, co-ords, cotton..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-10 text-neutral-400 text-xs">
                  Type any category or dress title to search...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-10 text-neutral-500 text-xs">
                  No matching outfits found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                searchResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setQuickViewProduct(p);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded hover:bg-neutral-50 cursor-pointer transition text-left"
                  >
                    <img src={p.image} alt={p.title} className="w-12 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#191919] line-clamp-1">{p.title}</p>
                      <p className="text-xs font-semibold text-[#191919] mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAWER 2: MOBILE HAMBURGER MENU DRAWER                         */}
      {/* ============================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col animate-in slide-in-from-left duration-200 text-left">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <span className="hk-font-serif text-base font-bold uppercase tracking-wider">
                {brandName}
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-xs uppercase font-medium">
              {NAV_CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsMobileMenuOpen(false);
                    const s = document.getElementById('products-section');
                    if (s) s.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block w-full text-left py-2 px-2 rounded transition ${
                    selectedCategory === category ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const s = document.getElementById('socials');
                  if (s) s.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded text-xs font-semibold uppercase flex items-center justify-center gap-1.5 shadow"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Watch Reels & Lookbooks</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsVideoShoppingOpen(true);
                }}
                className="w-full py-2 bg-[#1e3828] text-white rounded text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Book Video Shopping</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAWER 3: WISHLIST DRAWER                                      */}
      {/* ============================================================== */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#cc4058] fill-[#cc4058]" />
                <h3 className="hk-font-serif text-lg font-semibold uppercase">
                  My Wishlist ({wishlist.length})
                </h3>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-1 text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {wishlist.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  Your wishlist is empty. Tap the heart icon on any dress to save your favorites!
                </div>
              ) : (
                allProducts
                  .filter(p => wishlist.includes(p.id))
                  .map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-2 border rounded text-left">
                      <img src={p.image} alt={p.title} className="w-14 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-1">{p.title}</p>
                        <p className="text-xs font-bold mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleWhatsAppBuy(p)}
                            className="px-2 py-1 bg-[#1e3828] text-white text-[10px] font-semibold rounded uppercase"
                          >
                            Order
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="text-[10px] text-red-500 underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: ACCOUNT / VIP MODAL                                   */}
      {/* ============================================================== */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#191919] w-full max-w-sm rounded-lg p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setIsAccountOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-neutral-700" />
            </div>
            <h3 className="hk-font-serif text-lg font-semibold uppercase">
              Customer Account
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-5">
              Access your order history, delivery tracking, and VIP member discounts.
            </p>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${brandName}, I would like to track my order status / access customer support.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-black text-white hover:bg-neutral-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track Order on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setIsAccountOpen(false);
                  setIsVideoShoppingOpen(true);
                }}
                className="w-full py-2.5 border border-neutral-300 hover:border-black rounded text-xs font-semibold uppercase tracking-wider transition"
              >
                Book Personal Styling
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: INSTAGRAM REEL IN-WINDOW VIEWER MODAL                 */}
      {/* ============================================================== */}
      {activeInstagramReel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setActiveInstagramReel(null)} 
          />
          <div className="relative bg-neutral-900 border border-neutral-700 text-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-3.5 px-4 bg-black/80 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0">
                  <SocialIcon platform="instagram" size={18} colored={false} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">{instagramHandle}</p>
                  <span className="text-[10px] text-pink-400 font-mono font-semibold">{activeInstagramReel.views}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveInstagramReel(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                title="Close Reel Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reel Media / Image Preview */}
            <div className="relative aspect-[4/5] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeInstagramReel.imageUrl}
                alt={activeInstagramReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-4">
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-1.5 shadow">
                  {activeInstagramReel.tag}
                </span>
                <h4 className="hk-font-serif text-base sm:text-lg font-bold text-white drop-shadow">
                  {activeInstagramReel.title}
                </h4>
                <p className="text-xs text-neutral-200 mt-1 line-clamp-3 leading-relaxed">
                  {activeInstagramReel.caption}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-pink-300 font-medium">
                  <span>❤️ {activeInstagramReel.likes} likes</span>
                  <span>•</span>
                  <span>👁️ {activeInstagramReel.views}</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  trackAction('reel_whatsapp_order');
                  const msg = `Hello ${brandName}, I loved this outfit featured in your Instagram Reel:\n\n` +
                    `✨ *${activeInstagramReel.title}*\n` +
                    `📝 *Caption:* ${activeInstagramReel.caption}\n\n` +
                    `Could you please share available sizes, fabric details, pricing and delivery time?`;
                  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Shop Look on WhatsApp</span>
              </button>

              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('instagram_reel_open')}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow cursor-pointer active:scale-95"
              >
                <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                <span>Open in App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOAST NOTIFICATION POPUP                                       */}
      {/* ============================================================== */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#191919] text-white text-xs font-medium px-4 py-2.5 rounded shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
