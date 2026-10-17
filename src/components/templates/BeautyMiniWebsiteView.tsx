'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Scissors, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Download, 
  MessageCircle, 
  Heart, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  Tag,
  Package,
  Truck,
  Store,
  Menu,
  Check,
  Camera,
  MessageSquare,
  Play
} from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface BeautyMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (actionName: string) => void;
  getCleanWhatsAppNumber?: (prof: DigitalProfile) => string;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'website' | 'mobile';
  setViewMode?: (mode: 'website' | 'mobile') => void;
  showViewToggle?: boolean;
}

// Fallback high-res salon products catalog with authentic salon retail items
const DEFAULT_SALON_PRODUCTS = [
  {
    id: 'prod_bs_1',
    name: 'L’Oréal Professionnel Absolut Repair Molecular Shampoo',
    brand: 'L’Oréal Professionnel',
    volume: '300 ml',
    description: 'Patented peptide bonder formula repairs 2 years of hair damage in 1 use. Rebuilds molecular structure, restores elasticity and strength.',
    price: 1150,
    originalPrice: 1350,
    rating: 4.8,
    reviewsCount: 312,
    badge: 'Best Seller',
    category: 'Shampoos & Conditioners',
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_2',
    name: 'L’Oréal Professionnel Absolut Repair Golden Mask',
    brand: 'L’Oréal Professionnel',
    volume: '250 ml',
    description: 'Gold Quinoa + Protein resurfacing mask instantly restores shine and soft touch with zero greasy residue. Perfect for dry, damaged hair.',
    price: 920,
    originalPrice: 1080,
    rating: 4.9,
    reviewsCount: 245,
    badge: 'Salon Exclusive',
    category: 'Hair Spa & Masks',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_3',
    name: 'Moroccanoil Treatment Original Argan Oil Elixir',
    brand: 'Moroccanoil',
    volume: '100 ml',
    description: 'Iconic antioxidant-rich argan oil and shine-boosting vitamins. Speeds up drying time, detangles, and conditions for high-gloss finish.',
    price: 3650,
    originalPrice: 4100,
    rating: 5.0,
    reviewsCount: 520,
    badge: 'Luxury Pick',
    category: 'Serums & Oils',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_4',
    name: 'Wella Professionals SP LuxeOil Reconstructive Elixir',
    brand: 'Wella Professionals',
    volume: '100 ml',
    description: 'Formulated with Argan, Jojoba and Almond oils to nourish and transform keratin texture without weighing fine hair down.',
    price: 1350,
    originalPrice: 1550,
    rating: 4.8,
    reviewsCount: 198,
    badge: 'Top Rated',
    category: 'Serums & Oils',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-2e09e13a967f?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_5',
    name: 'O3+ Professional Bridal Radiance Facial Kit with Oxygen Therapy',
    brand: 'O3+ Professional',
    volume: '120 g Complete Kit',
    description: 'Dermatologically tested 7-step bridal salon glow kit. Removes deep tanning, brightens skin tone, and locks in youthful porcelain radiance.',
    price: 2450,
    originalPrice: 2950,
    rating: 4.9,
    reviewsCount: 410,
    badge: 'Bridal Must-Have',
    category: 'Skin Care & Facials',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_6',
    name: 'O3+ Professional D-Tan Radiance Cream Pack',
    brand: 'O3+ Professional',
    volume: '100 g',
    description: 'Instant tan removal cream infused with eucalyptus and mint. Purifies pores, fades hyperpigmentation, and calms sun-exposed skin.',
    price: 850,
    originalPrice: 990,
    rating: 4.7,
    reviewsCount: 180,
    badge: 'Fast Acting',
    category: 'Skin Care & Facials',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_7',
    name: 'Schwarzkopf Professional Osis+ Dust It Matte Powder',
    brand: 'Schwarzkopf Professional',
    volume: '10 g',
    description: 'Micro-fine texturizing root powder. Delivers instant gravity-defying volume, strong matte grip, and effortless messy separation.',
    price: 750,
    originalPrice: 890,
    rating: 4.8,
    reviewsCount: 260,
    badge: 'Stylist Choice',
    category: 'Styling & Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_8',
    name: 'Matrix Biolage Smoothproof 6-in-1 Professional Hair Serum',
    brand: 'Matrix',
    volume: '100 ml',
    description: 'Camellia flower infused botanical serum. 72-hour anti-frizz defense against extreme Hyderabad humidity. Keeps hair sleek and manageable.',
    price: 399,
    originalPrice: 475,
    rating: 4.6,
    reviewsCount: 350,
    badge: 'Value Pick',
    category: 'Serums & Oils',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_9',
    name: 'Schwarzkopf BC Bonacure Color Freeze pH 4.5 Shampoo',
    brand: 'Schwarzkopf Professional',
    volume: '250 ml',
    description: 'Sulfate-free gentle micellar cleanser balances hair pH to 4.5, freezing color pigments deep inside for up to 90% color retention.',
    price: 999,
    originalPrice: 1150,
    rating: 4.8,
    reviewsCount: 142,
    badge: 'Color Care',
    category: 'Shampoos & Conditioners',
    imageUrl: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_10',
    name: 'Wella Professionals Invigo Nutri-Enrich Deep Nourishing Mask',
    brand: 'Wella Professionals',
    volume: '150 ml',
    description: 'Enriched with Goji berry, Oleic acid, and Vitamin E. Instantly quenches dry, distressed strands with deep restorative moisture.',
    price: 790,
    originalPrice: 890,
    rating: 4.7,
    reviewsCount: 175,
    badge: 'Deep Hydration',
    category: 'Hair Spa & Masks',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_11',
    name: 'Beardo Godfather Luxury Perfume & Beard Growth Oil Duo',
    brand: 'Beardo Men',
    volume: '50ml + 30ml',
    description: 'Premium men’s grooming kit. Redensyl-fortified beard oil promotes thicker beard growth, paired with long-lasting woody masculine fragrance.',
    price: 999,
    originalPrice: 1400,
    rating: 4.8,
    reviewsCount: 220,
    badge: 'Men Special',
    category: 'Styling & Grooming',
    imageUrl: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: 'prod_bs_12',
    name: 'Kérastase Elixir Ultime L’Original Hair Oil',
    brand: 'Kérastase Paris',
    volume: '100 ml',
    description: 'Celebrity cult-favorite leave-in hair oil with Sacred Marula oil. Provides 96 hours of frizz control and dazzling 24-carat mirror shine.',
    price: 4400,
    originalPrice: 4900,
    rating: 5.0,
    reviewsCount: 480,
    badge: 'Ultra Luxury',
    category: 'Serums & Oils',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    inStock: true
  }
];

// Curated mock deals with coupon codes and photos
const MOCK_SALON_OFFERS = [
  {
    id: 'off_1',
    category: 'Women',
    title: 'Flat 30% OFF First Visit',
    subtitle: 'Welcome special on Haircut, Color or Facial services',
    badge: 'NEW CLIENTS',
    code: 'AURALUXE30',
    terms: 'Valid on services above ₹999 on weekdays',
    discount: 'FLAT 30% OFF',
    tagColor: 'from-[#ab2079] to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'off_2',
    category: 'Bridal & Groom',
    title: 'Royal Bridal Glow Radiance Package',
    subtitle: 'Pre-bridal cleanup, 7-step facial, body spa, bridal hair styling & saree draping',
    badge: 'BRIDAL SPECIAL',
    price: '₹14,999',
    originalPrice: '₹19,999',
    discount: 'SAVE ₹5,000',
    code: 'BRIDALGLOW',
    terms: 'Includes complimentary pre-wedding skin consultation',
    tagColor: 'from-amber-600 to-yellow-600',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'off_3',
    category: 'Combos',
    title: 'Global Hair Color + Steam Spa Combo',
    subtitle: 'L’Oréal Majirel / INOA Ammonia-Free Global Color with deep steam hydration ritual',
    badge: 'POPULAR COMBO',
    price: '₹2,999',
    originalPrice: '₹4,200',
    discount: 'SAVE ₹1,200',
    code: 'COLORSPA',
    terms: 'Valid for all hair lengths up to shoulder',
    tagColor: 'from-purple-600 to-indigo-600',
    imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'off_4',
    category: 'Men',
    title: 'Gentlemen’s Executive Grooming Package',
    subtitle: 'Precision style haircut, beard sculpting, charcoal detan & invigorating head massage',
    badge: 'MEN’S CHOICE',
    price: '₹799',
    originalPrice: '₹1,200',
    discount: 'SAVE ₹400',
    code: 'GROOM799',
    terms: 'All 7 days. Free hair wash included.',
    tagColor: 'from-emerald-600 to-teal-600',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'off_5',
    category: 'Women',
    title: 'Weekday Rejuvenation Ritual (Mon–Thu)',
    subtitle: 'Style haircut, blow-dry, express keratin hair spa and deep conditioning wash',
    badge: 'MON - THU ONLY',
    price: '₹699',
    originalPrice: '₹1,100',
    discount: 'SAVE ₹400',
    code: 'WEEKDAY699',
    terms: 'Prior booking mandatory. 10 AM to 5 PM slots.',
    tagColor: 'from-rose-600 to-pink-600',
    imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'off_6',
    category: 'Combos',
    title: 'O3+ Radiance D-Tan Facial + Pedicure',
    subtitle: 'Award-winning O3+ whitening mask, dead skin exfoliation and luxury foot spa reflexology',
    badge: 'SKIN SPECIAL',
    price: '₹1,499',
    originalPrice: '₹2,200',
    discount: 'SAVE ₹700',
    code: 'O3DTAN',
    terms: 'Instant sun-tan removal & porcelain glass skin glow',
    tagColor: 'from-cyan-600 to-blue-600',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
  }
];

// Rich mock customer reviews with 5 stars, review text, and client avatars
const MOCK_REVIEWS = [
  {
    id: 'rev_1',
    headline: 'Bespoke Balayage & Hair Botox Transformation!',
    clientName: 'Sravani Reddy',
    clientRole: 'Verified Client • Jubilee Hills',
    service: 'Balayage Color & Hair Botox',
    content: 'Hands down the most luxurious salon experience in Hyderabad! My hair was severely heat-damaged, but the master colorist gave me the most seamless caramel balayage and finished with a botox gloss ritual. The vibrant salon atmosphere with all the bustling stations makes you feel so pampered!',
    rating: 5,
    date: '2 days ago',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev_2',
    headline: 'World-Class Gentlemen Grooming & Fade',
    clientName: 'Rahul Varma',
    clientRole: 'Verified Client • Madhapur',
    service: 'Men’s Executive Grooming',
    content: 'Top-tier grooming! The precision skin fade, hot towel beard sculpting, and charcoal detan facial felt world-class. You can tell they use 100% genuine products like Schwarzkopf and Beardo. Friendly receptionist and zero wait time with WhatsApp booking.',
    rating: 5,
    date: '5 days ago',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev_3',
    headline: 'Flawless 14-Hour HD Bridal Glow & Saree Draping',
    clientName: 'Anjali Sharma',
    clientRole: 'Bride • Banjara Hills',
    service: 'Royal HD Bridal Package',
    content: 'Booked their Royal HD Bridal Package for my wedding reception. The makeup stayed completely fresh and radiant for 14 continuous hours without caking! The traditional jasmine floral hair arrangement and saree draping received endless compliments from all my guests.',
    rating: 5,
    date: '1 week ago',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev_4',
    headline: 'Deep Cellular Hair Spa & Genuine Product Store',
    clientName: 'Pranay Kumar',
    clientRole: 'Verified Client • Gachibowli',
    service: 'L’Oréal Steam Hydration Spa',
    content: 'Incredible experience! The steam hydration hair spa completely eliminated my scalp dryness and frizz. I also purchased the Moroccanoil treatment right from their store counter and it was delivered to my house in express courier. Super convenient and authentic!',
    rating: 5,
    date: '2 weeks ago',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev_5',
    headline: 'Porcelain Radiance O3+ Oxygen Facial',
    clientName: 'Dr. Meghna Rao',
    clientRole: 'Verified Client • Film Nagar',
    service: 'O3+ Bridal Radiance Facial',
    content: 'As a dermatologist, I am very picky about facial ingredients. AuraLuxe uses authentic sealed O3+ professional single-use kits. The extraction was painless and my skin has a porcelain glass glow even after 10 days. Clean, autoclaved instruments throughout.',
    rating: 5,
    date: '3 weeks ago',
    clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev_6',
    headline: 'Superb Keratin Smoothing with Mirror Shine',
    clientName: 'Vikram Malhotra',
    clientRole: 'Verified Client • Hitec City',
    service: 'Keratin Nanoplastia Treatment',
    content: 'Visited on a Sunday when the salon was packed with customers taking services. Despite the bustling crowd, the team treated me with royal hospitality. The formal-free nanoplastia left my unruly wavy hair silky straight and shiny. Highly recommended!',
    rating: 5,
    date: '1 month ago',
    clientAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

// Fallback high-res lookbook items with correct styling tags
const DEFAULT_LOOKBOOK = [
  {
    id: 'gal_1',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    title: 'AuraLuxe Modern Styling Stations & Interior',
    category: 'Ambience'
  },
  {
    id: 'gal_2',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    title: 'Signature Layered Cut & Volume Blowout',
    category: 'Haircut'
  },
  {
    id: 'gal_3',
    imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    title: 'Honey Caramel Balayage & Beach Waves',
    category: 'Color'
  },
  {
    id: 'gal_4',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    title: 'Royal South Indian HD Bridal Makeover',
    category: 'Bridal'
  },
  {
    id: 'gal_5',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    title: 'Precision Mid Fade & Sculpted Beard Contour',
    category: 'Men'
  },
  {
    id: 'gal_6',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    title: 'Keratin Smoothing Mirror Gloss Finish',
    category: 'Keratin'
  },
  {
    id: 'gal_7',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    title: 'O3+ Oxygen Radiance Facial & Pore Cleansing',
    category: 'Skin'
  },
  {
    id: 'gal_8',
    imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Hair Spa Recliner & Steam Hydration Lounge',
    category: 'Ambience'
  }
];

// Curated Instagram Reels showcase for AuraLuxe Salon
const INSTAGRAM_SALON_REELS = [
  {
    title: 'Honey Caramel Balayage & Silk Gloss Finish',
    views: '142K Views',
    duration: '0:45',
    imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80',
    likes: '8.4K',
    tag: 'Balayage'
  },
  {
    title: 'O3+ Porcelain Glass Skin Hydra-Facial Glow',
    views: '98K Views',
    duration: '0:38',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    likes: '6.1K',
    tag: 'Skin Glow'
  },
  {
    title: 'Gentlemen Executive Fade & Hot Towel Beard Sculpt',
    views: '76K Views',
    duration: '0:52',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    likes: '5.2K',
    tag: 'Men Grooming'
  },
  {
    title: 'Royal HD Bridal Makeover & Jasmine Hair Art',
    views: '230K Views',
    duration: '1:10',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    likes: '14.8K',
    tag: 'Bridal Glam'
  }
];

// Curated YouTube Masterclass episodes for AuraLuxe Salon
const YOUTUBE_SALON_MASTERCLASSES = [
  {
    title: 'Keratin Nanoplastia Straightening: Complete Step-by-Step Salon Protocol',
    subtitle: 'Zero formaldehyde mirror gloss straightening guide',
    duration: '11:24',
    views: '48K views',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: '7-Step Bridal Glow Facial with Oxygen Infusion & Pore Extraction',
    subtitle: 'Dermatologically formulated deep bridal skin prep',
    duration: '08:45',
    views: '35K views',
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f0233329978?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Gentlemen Executive Beard Contouring & Razor Sharp Line-Up',
    subtitle: 'Hot towel herbal steam & charcoal detan routine',
    duration: '07:15',
    views: '29K views',
    imageUrl: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&q=80'
  }
];

export default function BeautyMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: BeautyMiniWebsiteViewProps) {
  // --- Modals & UI States ---
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Filtering States ---
  const [offerCategory, setOfferCategory] = useState<string>('All');
  const [productCategory, setProductCategory] = useState<string>('All');
  const [productSearch, setProductSearch] = useState<string>('');
  const [galleryCategory, setGalleryCategory] = useState<string>('All');

  // --- Cart State ---
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>([]);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  // --- Booking Form State ---
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    phone: '',
    serviceName: 'Haircut & Styling',
    preferredDate: '',
    preferredTime: '11:00 AM',
    gender: 'Any Stylist',
    notes: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Profile data & fallbacks
  const beautyConfig = profile.sectionData?.beauty || {};
  const profileServices = profile.sectionData?.services?.items || [];
  const profileProducts = profile.sectionData?.products?.items || [];
  const profileGallery = profile.sectionData?.gallery?.items?.length ? profile.sectionData.gallery.items : DEFAULT_LOOKBOOK;

  // Resolved salon products
  const allProducts = useMemo(() => {
    if (profileProducts.length > 0) {
      return profileProducts.map((p, idx) => ({
        id: p.id || `p_${idx}`,
        name: p.name || (p as any).title,
        brand: (p as any).brand || (p.name.includes('L’Oréal') ? 'L’Oréal' : p.name.includes('Wella') ? 'Wella' : p.name.includes('O3+') ? 'O3+' : p.name.includes('Moroccanoil') ? 'Moroccanoil' : 'AuraLuxe Pro'),
        volume: (p as any).volume || 'Standard Pack',
        description: p.description || 'Authentic salon-grade hair and skin beauty product.',
        price: p.price || 999,
        originalPrice: (p as any).originalPrice || Math.round((p.price || 999) * 1.2),
        rating: (p as any).rating || 4.8,
        reviewsCount: (p as any).reviewsCount || 150,
        badge: (p as any).badge || (idx === 0 ? 'Best Seller' : 'In Stock'),
        category: p.category || 'Shampoos & Conditioners',
        imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
        inStock: p.isAvailable !== false
      }));
    }
    return DEFAULT_SALON_PRODUCTS;
  }, [profileProducts]);

  // Clean WhatsApp phone calculation (using mock numbers)
  const rawWa = getCleanWhatsAppNumber(profile);
  const cleanWaDigits = (rawWa || '919876543210').replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : (cleanWaDigits || '919876543210');
  
  // Clean Mock Brand Details
  const salonCompany = (profile.company && !profile.company.includes('Green Trends')) 
    ? profile.company 
    : 'AuraLuxe Luxury Unisex Salon & Spa';
  const salonLocation = 'Road No. 36, Jubilee Hills, Hyderabad';
  const salonPhone = (profile.phone && !profile.phone.includes('63033') && !profile.phone.includes('91549')) 
    ? profile.phone 
    : '+91 98765 43210';
  const salonAddress = (profile.address && !profile.address.includes('Kothapet') && !profile.address.includes('Nagole'))
    ? profile.address
    : 'Plot No. 482, 2nd Floor, Luxury Square Building, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033';

  // Social Channels & Canonical URL
  const instagramUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'instagram')?.url || 'https://instagram.com/auraluxesalon';
  const youtubeUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'youtube')?.url || 'https://youtube.com/@auraluxesalon';
  const websiteUrl = 'https://www.oneclickbiz.in/v/beauty-salon';

  // --- Cart Helpers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product: any, qty: number = 1) => {
    trackAction('beauty_product_added_to_cart');
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to your bag!`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ product: any; quantity: number }>;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart]);

  const deliveryFee = deliveryType === 'delivery' ? (cartSubtotal >= 1500 ? 0 : 50) : 0;
  const cartGrandTotal = cartSubtotal + deliveryFee;

  // Checkout via WhatsApp with full itemized invoice
  const handleCartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('beauty_products_checkout_whatsapp');

    if (!customerDetails.name || !customerDetails.phone) {
      alert('Please enter your Name and WhatsApp phone number to place the order.');
      return;
    }

    if (cart.length === 0) {
      alert('Your shopping bag is empty.');
      return;
    }

    const itemsSummary = cart.map((item, idx) => (
      `${idx + 1}. *${item.product.name}* (${item.product.volume || '1 unit'})\n` +
      `   Qty: ${item.quantity} x ₹${item.product.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.product.price).toLocaleString('en-IN')}`
    )).join('\n');

    const orderText = 
      `🛍️ *BEAUTY PRODUCTS ORDER — ${salonCompany.toUpperCase()}*\n` +
      `📍 Branch: Jubilee Hills, Hyderabad\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer:* ${customerDetails.name}\n` +
      `📞 *Phone:* ${customerDetails.phone}\n` +
      `🚚 *Delivery Mode:* ${deliveryType === 'pickup' ? 'Salon Pickup at Jubilee Hills' : 'Doorstep Courier Delivery'}\n` +
      (deliveryType === 'delivery' && customerDetails.address ? `🏠 *Address:* ${customerDetails.address}\n` : '') +
      (customerDetails.notes ? `📝 *Notes:* ${customerDetails.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *ORDERED ITEMS:*\n${itemsSummary}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 Subtotal: ₹${cartSubtotal.toLocaleString('en-IN')}\n` +
      (deliveryType === 'delivery' ? `🚚 Delivery Fee: ${deliveryFee === 0 ? 'FREE (Orders > ₹1500)' : `₹${deliveryFee}`}\n` : '') +
      `⭐ *Total Payable:* ₹${cartGrandTotal.toLocaleString('en-IN')}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please confirm stock availability and share UPI QR / payment link. Thank you!`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(orderText)}`, '_blank');
    setIsCartOpen(false);
  };

  // Instant 1-Click Buy for a single product
  const handleInstantBuy = (product: any) => {
    trackAction('instant_product_buy_whatsapp');
    const msg = 
      `Hi *${salonCompany}*! I would like to purchase this salon product:\n\n` +
      `🛍️ *Product:* ${product.name}\n` +
      `🏷️ *Brand:* ${product.brand || 'Salon Exclusive'}\n` +
      `📏 *Size:* ${product.volume || 'Standard'}\n` +
      `💰 *Price:* ₹${product.price.toLocaleString('en-IN')} (MRP: ₹${product.originalPrice || product.price})\n\n` +
      `📍 Branch: Jubilee Hills, Hyderabad\n` +
      `Please confirm product availability and pickup / delivery process. Thank you!`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Submit appointment booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('salon_appointment_booked');
    setBookingSubmitted(true);

    const msg = 
      `✨ *SALON APPOINTMENT REQUEST — ${salonCompany.toUpperCase()}*\n` +
      `📍 Branch: Jubilee Hills, Hyderabad\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Client Name:* ${bookingForm.clientName}\n` +
      `📞 *Contact:* ${bookingForm.phone}\n` +
      `💇 *Service:* ${bookingForm.serviceName}\n` +
      `📅 *Date:* ${bookingForm.preferredDate || 'Earliest Available'}\n` +
      `⏰ *Time Slot:* ${bookingForm.preferredTime}\n` +
      `👥 *Stylist Preference:* ${bookingForm.gender}\n` +
      (bookingForm.notes ? `📝 *Notes:* ${bookingForm.notes}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please confirm my appointment slot and special 30% first visit offer. Thank you!`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSubmitted(false);
      setBookingForm({
        clientName: '',
        phone: '',
        serviceName: 'Haircut & Styling',
        preferredDate: '',
        preferredTime: '11:00 AM',
        gender: 'Any Stylist',
        notes: ''
      });
    }, 2000);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter(prod => {
      const matchCat = productCategory === 'All' || prod.category === productCategory;
      const matchSearch = productSearch.trim() === '' || 
        prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        prod.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
        prod.description.toLowerCase().includes(productSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [allProducts, productCategory, productSearch]);

  // Filtered offers
  const filteredOffers = useMemo(() => {
    if (offerCategory === 'All') return MOCK_SALON_OFFERS;
    return MOCK_SALON_OFFERS.filter(off => off.category === offerCategory);
  }, [offerCategory]);

  // Filtered gallery
  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'All') return profileGallery;
    return profileGallery.filter(item => item.category === galleryCategory);
  }, [profileGallery, galleryCategory]);

  return (
    <div className="min-h-screen text-zinc-100 font-sans selection:bg-[#1BD741] selection:text-black pb-28 relative">
      {/* =========================================================================
          ⭐ CONTINUOUS BACKGROUND: BEAUTY PARLOUR WITH ACTIVE CUSTOMERS
          High Brightness & Vivid Clarity spanning from Hero to Contact/Footer!
         ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/salon-bg-customers.jpg"
          alt="Lively Luxury Beauty Parlour with Customers Arriving and Taking Services"
          fill
          priority
          className="object-cover object-center brightness-125 contrast-105 saturate-110 filter"
        />
        {/* Soft Translucent Sheer Gradient: Background is bright, vibrant, and clearly visible while keeping text 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-emerald-500 text-black font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setIsCartOpen(true)} className="ml-2 underline text-black font-extrabold cursor-pointer">
            View Bag ({cartTotalItems})
          </button>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT & HIGHLIGHT BAR */}
      <div className="bg-gradient-to-r from-[#ab2079]/90 via-[#85195e]/90 to-[#0A0A0C]/90 backdrop-blur-md border-b border-pink-500/30 py-2 px-3 sm:px-4 text-[11px] sm:text-xs text-white relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 text-pink-200 font-bold text-[10px] uppercase tracking-wider border border-pink-300/30">
              <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
              Now in Jubilee Hills
            </span>
            <span className="hidden sm:inline">✦</span>
            <span className="font-semibold text-pink-100">
              Flat 30% OFF on First Visit • 100% Certified Master Stylists
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-zinc-300 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#1BD741]" />
              {beautyConfig.operatingHours || '9:30 AM – 9:00 PM (All 7 Days)'}
            </span>
            <span className="hidden md:inline text-zinc-500">•</span>
            <a 
              href={`tel:${salonPhone.replace(/\s+/g, '')}`} 
              className="hidden md:flex items-center gap-1 text-white hover:text-[#1BD741] font-bold transition"
            >
              <Phone className="w-3 h-3 text-[#1BD741]" />
              {salonPhone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY LUXURY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity (AuraLuxe Mock Monogram) */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#ab2079] via-pink-600 to-amber-500 p-0.5 shadow-lg shadow-pink-950/40 shrink-0">
                <div className="w-full h-full bg-[#0A0A0C] rounded-[14px] flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-pink-400 via-amber-200 to-[#1BD741] bg-clip-text text-transparent">
                    AL
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                    {salonCompany}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="text-[#1BD741] font-bold">Jubilee Hills</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <strong>4.9</strong> (1,580+ reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-zinc-300">
            <a href="#hero" className="hover:text-[#1BD741] transition">Home</a>
            <a href="#offers" className="hover:text-pink-400 transition flex items-center gap-1">
              <span>Hot Offers</span>
              <span className="px-1.5 py-0.2 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">30% OFF</span>
            </a>
            <a href="#services" className="hover:text-[#1BD741] transition">Services Menu</a>
            <a href="#shop" className="hover:text-emerald-400 transition flex items-center gap-1.5 text-white bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10">
              <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
              <span>Beauty Shop</span>
              <span className="w-2 h-2 rounded-full bg-[#1BD741] animate-ping" />
            </a>
            <a href="#why-us" className="hover:text-[#1BD741] transition">Why Us</a>
            <a href="#lookbook" className="hover:text-[#1BD741] transition">Lookbook</a>
            <a href="#social" className="hover:text-pink-400 transition flex items-center gap-1">
              <span className="text-pink-400">✦</span>
              <span>Social Media</span>
            </a>
            <a href="#reviews" className="hover:text-[#1BD741] transition">Reviews (4.9★)</a>
            <a href="#location" className="hover:text-[#1BD741] transition">Find Us</a>
          </nav>

          {/* Action Buttons: Cart Drawer Trigger + WhatsApp Booking + Call */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shopping Bag Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-white/15 flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-md"
              title="Open Beauty Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#1BD741]" />
              <span className="hidden sm:inline text-xs font-bold">Bag</span>
              {cartTotalItems > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#1BD741] text-black font-black text-[10px] leading-none animate-pulse">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ab2079] to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs transition shadow-lg shadow-pink-900/30 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Slot</span>
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${salonCompany}! I want to inquire about hair/beauty services & appointments.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1BD741] hover:bg-[#18c43b] text-black font-extrabold text-xs transition shadow-lg shadow-emerald-950/50 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950/95 border-b border-white/10 px-4 py-3 space-y-2 text-xs font-medium text-zinc-200 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
              <a 
                href="#offers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-pink-950/50 text-pink-300 border border-pink-800/40 font-bold flex items-center justify-between"
              >
                <span>🔥 Hot Offers</span>
                <span className="text-[10px] bg-pink-500 text-white px-1 rounded font-black">30% OFF</span>
              </a>
              <a 
                href="#shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/40 font-bold flex items-center justify-between"
              >
                <span>🛍️ Beauty Shop</span>
                <span className="text-[10px] bg-[#1BD741] text-black px-1 rounded font-black">BUY</span>
              </a>
            </div>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Services &amp; Pricing Menu</a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Why Choose Us</a>
            <a href="#lookbook" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Hair Transformations Lookbook</a>
            <a href="#social" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-pink-400">Instagram &amp; YouTube Stories</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Verified Client Reviews (4.9★)</a>
            <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-[#1BD741]">Directions &amp; Contact Desk</a>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (Immersive Glassmorphic Hero Over Customers Background) */}
      <section id="hero" className="relative pt-10 pb-16 lg:py-24 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand, Tagline & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ab2079]/30 border border-pink-400/40 text-pink-200 text-xs font-bold tracking-wide backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              NOW OPEN IN JUBILEE HILLS, HYDERABAD
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight drop-shadow-lg">
                AuraLuxe <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#1BD741] via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Unisex Salon &amp; Spa Lounge
                </span>
              </h2>
              <p className="text-lg sm:text-xl font-semibold text-amber-200 tracking-wide drop-shadow">
                Couture Styling. Radiant Glow. Effortless Elegance.
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-xl drop-shadow">
              Welcome to Hyderabad’s premier unisex beauty lounge. Experience bespoke balayage coloring, keratin botox therapies, royal bridal makeovers, and rejuvenating skin rituals by certified celebrity artists.
            </p>

            {/* 3 Pillars & Rating Strip (Glassmorphic) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-zinc-950/75 backdrop-blur-md border border-white/15 flex flex-col justify-center items-center text-center shadow-xl hover:border-amber-500/40 transition">
                <Award className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-xs font-bold text-white leading-tight">Master Stylists</span>
                <span className="text-[10px] text-zinc-400">Certified Academy</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950/75 backdrop-blur-md border border-white/15 flex flex-col justify-center items-center text-center shadow-xl hover:border-emerald-500/40 transition">
                <ShieldCheck className="w-5 h-5 text-[#1BD741] mb-1" />
                <span className="text-xs font-bold text-white leading-tight">100% Authentic</span>
                <span className="text-[10px] text-zinc-400">L’Oréal &amp; Wella</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-950/75 backdrop-blur-md border border-white/15 flex flex-col justify-center items-center text-center shadow-xl hover:border-yellow-500/40 transition">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
                <span className="text-xs font-bold text-white leading-tight">4.9 ★ Rated</span>
                <span className="text-[10px] text-zinc-400">1,580+ Client Reviews</span>
              </div>
            </div>

            {/* Address Snippet */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/15 text-xs text-zinc-200 max-w-xl shadow-xl">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Jubilee Hills Lounge:</strong> {salonAddress}
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ab2079] via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-sm flex items-center gap-2 transition shadow-xl shadow-pink-900/40 active:scale-95 cursor-pointer"
              >
                <span>Book Appointment &amp; Get 30% OFF</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#shop"
                className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 text-[#1BD741] border border-emerald-500/50 font-bold text-sm flex items-center gap-2 transition cursor-pointer backdrop-blur-md shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Beauty Products</span>
              </a>

              <button
                onClick={() => downloadVcfFile(profile)}
                className="px-4 py-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 text-xs font-bold flex items-center gap-1.5 transition backdrop-blur-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 transition backdrop-blur-md"
                title="Share Salon"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: "Let's find what you need" Booking Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/20 p-6 sm:p-7 shadow-2xl shadow-black relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#ab2079]/25 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[#1BD741] font-bold text-[11px] border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Instant WhatsApp Confirmation
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Let’s find what you need
                </h3>
                <p className="text-xs text-zinc-300">
                  Select your service, date and slot for priority salon booking.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-zinc-200 block mb-1">Select Service</label>
                  <select
                    value={bookingForm.serviceName}
                    onChange={e => setBookingForm(prev => ({ ...prev, serviceName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                  >
                    <option value="Haircut & Styling">Haircut &amp; Styling (Women / Men)</option>
                    <option value="Global Hair Color / Balayage">Global Hair Color / Balayage / Highlights</option>
                    <option value="Keratin / Hair Botox / Smoothening">Keratin / Hair Botox / Smoothening</option>
                    <option value="Deep Conditioning Hair Spa">Deep Conditioning Hair Spa (L’Oréal / Wella)</option>
                    <option value="O3+ Radiance D-Tan Facial">O3+ Radiance D-Tan Facial &amp; Cleanup</option>
                    <option value="Royal HD Bridal Makeover Package">Royal HD Bridal Makeover Package</option>
                    <option value="Men's Executive Grooming Combo">Men’s Executive Grooming Combo</option>
                    <option value="Deluxe Pedicure & Manicure">Deluxe Pedicure &amp; Manicure</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-200 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya / Rahul"
                      value={bookingForm.clientName}
                      onChange={e => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-200 block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-200 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-200 block mb-1">Time Slot</label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#1BD741] hover:bg-[#18c43b] text-black font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/60 active:scale-95 cursor-pointer mt-1"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Get 30% OFF &amp; Book via WhatsApp</span>
                </button>

                <p className="text-[11px] text-zinc-300 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero advance payment • Walk-ins &amp; reservations welcome</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      

          {/* =========================================================================
              INSTANT SALON CONTACT BAR WITH ORIGINAL BRAND LOGOS (HERO SECTION)
             ========================================================================= */}
          <div className="pt-2 max-w-4xl mx-auto w-full">
            <div className="bg-black/60 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/15 shadow-xl flex flex-wrap items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2 text-white">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-rose-300">
                  Direct Lounge Connect:
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {/* Official WhatsApp Logo */}
                <a
                  href="https://wa.me/919876543210?text=Hi%20AuraLuxe,%20I%20want%20to%20book%20a%20salon%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black flex items-center gap-2 shadow-xs transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <WhatsAppOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Booking</span>
                </a>

                {/* Official Phone Call Logo */}
                <a
                  href="tel:+919876543210"
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black flex items-center gap-2 border border-white/20 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <PhoneCallOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>+91 98765 43210</span>
                </a>

                {/* Official Instagram Gradient Logo */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black flex items-center gap-2 border border-white/20 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <InstagramOriginalLogo className="w-4 h-4 shrink-0 shadow-2xs" />
                  <span>@auraluxesalon</span>
                </a>

                {/* Official YouTube Red Logo */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black flex items-center gap-2 border border-white/20 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <YouTubeOriginalLogo className="w-4 h-4 shrink-0 shadow-2xs" />
                  <span>Masterclasses</span>
                </a>

                {/* Official Google Maps Logo */}
                <a
                  href="https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black flex items-center gap-2 border border-white/20 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <GoogleMapsOriginalLogo className="w-4 h-4 shrink-0" />
                  <span>Jubilee Hills</span>
                </a>
              </div>
            </div>
          </div>

        </section>

      {/* 4. HOT OFFERS / DEALS FOR EVERYONE */}
      <section id="offers" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2 backdrop-blur-md">
                <Tag className="w-3.5 h-3.5 text-pink-400" />
                Limited Period Specials
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Deals for Everyone in Jubilee Hills
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Save big on premium hair, skin, and grooming rituals. Show coupon at salon or claim on WhatsApp.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/15 overflow-x-auto">
              {['All', 'Women', 'Men', 'Bridal & Groom', 'Combos'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setOfferCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    offerCategory === cat
                      ? 'bg-[#ab2079] text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map(offer => (
              <div 
                key={offer.id} 
                className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 hover:border-pink-500/50 transition-all flex flex-col justify-between group shadow-2xl overflow-hidden"
              >
                {/* Offer Visual Header Photo */}
                <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${offer.tagColor} shadow-md`}>
                      {offer.badge}
                    </span>
                    <span className="text-xs font-black text-[#1BD741] px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-emerald-500/40">
                      {offer.discount}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white group-hover:text-pink-300 transition-colors">
                      {offer.title}
                    </h4>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                      {offer.subtitle}
                    </p>

                    {offer.price && (
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-xl sm:text-2xl font-black text-white">{offer.price}</span>
                        {offer.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through">{offer.originalPrice}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Code: <strong className="text-zinc-200 font-mono">{offer.code}</strong></span>
                      <span className="truncate max-w-[150px]">{offer.terms}</span>
                    </div>

                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${salonCompany}! I want to claim the offer: *${offer.title}* (Code: ${offer.code}). Please book my slot!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-[#1BD741] text-zinc-200 hover:text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md border border-white/10"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Claim on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE SERVICES MENU */}
      <section id="services" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2 backdrop-blur-md">
                <Scissors className="w-3.5 h-3.5 text-pink-400" />
                Transparent Rates &amp; High Standards
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                Signature Services Menu
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Curated haircuts, hair color, keratin therapies, facials and bridal grooming for men and women.
              </p>
            </div>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition cursor-pointer shadow-md backdrop-blur-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#1BD741]" />
              <span>Book Consultation Slot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {profileServices.map(srv => {
              const servicePhoto = srv.imageUrl || (
                srv.title.toLowerCase().includes('color') ? 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('spa') ? 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('facial') ? 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('bridal') ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('men') ? 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('keratin') ? 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' :
                srv.title.toLowerCase().includes('pedicure') ? 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80' :
                'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80'
              );

              return (
                <div 
                  key={srv.id} 
                  className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-2xl overflow-hidden"
                >
                  {/* Service Photo with Zoom Effect */}
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={servicePhoto}
                      alt={srv.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    
                    {/* Duration Pill */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-[10px] font-bold text-zinc-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#1BD741]" />
                      <span>{srv.durationMinutes || 45} mins</span>
                    </div>

                    {/* Price Pill Bottom */}
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-emerald-500/40 text-xs font-black text-emerald-400">
                        {srv.price ? `₹${srv.price.toLocaleString('en-IN')}` : 'From ₹299'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#1BD741] transition-colors leading-snug">
                        {srv.title}
                      </h4>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed line-clamp-2">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 font-medium">Certified Stylist</span>
                      <button
                        onClick={() => {
                          setBookingForm(prev => ({ ...prev, serviceName: srv.title }));
                          setIsBookingModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-[#1BD741] text-[#1BD741] hover:text-black font-extrabold text-xs transition cursor-pointer border border-emerald-500/40"
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ⭐ EXCLUSIVE BEAUTY STORE (BUY PRODUCTS FOR CUSTOMERS) */}
      <section id="shop" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header & Shopping Bag Summary Pill */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-[#1BD741] text-xs font-bold border border-emerald-500/30 mb-2 backdrop-blur-md">
                <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
                Customer Retail Store • Pickup &amp; Doorstep Delivery
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                Buy Genuine Salon-Grade Beauty Products
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
                Take the salon glow home! Order verified authentic professional hair care, face masks, serums &amp; styling products used by our stylists.
              </p>
            </div>

            {/* Quick Bag Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#1BD741] to-emerald-500 text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-950/60 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 fill-black" />
                <span>View Shopping Bag</span>
                <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-bold">
                  {cartTotalItems} items
                </span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by name, brand (L'Oréal, Wella, O3+, Moroccanoil)..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1BD741]"
                />
                {productSearch && (
                  <button 
                    onClick={() => setProductSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                'All',
                'Shampoos & Conditioners',
                'Hair Spa & Masks',
                'Serums & Oils',
                'Skin Care & Facials',
                'Styling & Grooming'
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => setProductCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    productCategory === cat
                      ? 'bg-[#1BD741] text-black shadow-lg shadow-emerald-950/40'
                      : 'bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 border border-white/15 backdrop-blur-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map(prod => {
                const savings = prod.originalPrice ? prod.originalPrice - prod.price : 0;
                const cartItem = cart.find(i => i.product.id === prod.id);
                const currentQty = cartItem ? cartItem.quantity : 0;

                return (
                  <div
                    key={prod.id}
                    className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 hover:border-emerald-500/50 transition-all p-4 flex flex-col justify-between group shadow-2xl hover:shadow-emerald-950/30"
                  >
                    <div>
                      {/* Product Image & Badges */}
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-zinc-900 mb-3.5">
                        <Image
                          src={prod.imageUrl}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                          {prod.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-[#ab2079] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                              {prod.badge}
                            </span>
                          )}
                          {savings > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-md">
                              Save ₹{savings}
                            </span>
                          )}
                        </div>

                        {/* Brand Tag Bottom */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-zinc-300">
                          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 font-bold text-white">
                            {prod.brand}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-zinc-300 font-medium">
                            {prod.volume}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{prod.rating || 4.8}</span>
                          <span className="text-zinc-400 font-normal">({prod.reviewsCount || 120})</span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-[#1BD741] transition-colors line-clamp-2">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-2 pt-3 mt-1">
                        <span className="text-lg font-black text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-[#1BD741]">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Actions: Add to Bag + 1-Click WhatsApp Buy */}
                    <div className="pt-4 border-t border-white/10 space-y-2 mt-3">
                      {currentQty > 0 ? (
                        <div className="flex items-center justify-between bg-zinc-900 rounded-xl p-1 border border-zinc-700">
                          <button
                            onClick={() => updateCartQty(prod.id, -1)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-white">
                            {currentQty} in Bag
                          </span>
                          <button
                            onClick={() => updateCartQty(prod.id, 1)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-white/10"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
                          <span>Add to Shopping Bag</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleInstantBuy(prod)}
                        className="w-full py-2 rounded-xl bg-emerald-950/60 hover:bg-[#1BD741] text-[#1BD741] hover:text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-emerald-500/40"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Instant Buy on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/10 max-w-md mx-auto space-y-3">
              <ShoppingBag className="w-10 h-10 text-zinc-500 mx-auto" />
              <h4 className="text-base font-bold text-white">No products match your filter</h4>
              <p className="text-xs text-zinc-400">Try changing your search keyword or selected category tab.</p>
              <button
                onClick={() => { setProductSearch(''); setProductCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 7. WHY CHOOSE AURALUXE (4 BENTO CARDS WITH RICH PHOTOGRAPHIC BACKDROPS) */}
      <section id="why-us" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#1BD741] text-xs font-bold border border-emerald-500/30 backdrop-blur-md">
              <Award className="w-3.5 h-3.5" />
              The AuraLuxe Standard
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
              Why Jubilee Hills Chooses Us
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Hyderabad’s favorite luxury unisex salon lounge bringing international styling standards right to your neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Bento Card 1 */}
            <div className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 overflow-hidden flex flex-col justify-between group shadow-2xl">
              <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
                  alt="Certified Stylists"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-pink-500/30 backdrop-blur-md text-pink-300 border border-pink-500/40 flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-black text-white">Certified Stylists</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Every stylist undergoes 250+ hours of advanced training in precision haircutting and modern color blending.
                </p>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 overflow-hidden flex flex-col justify-between group shadow-2xl">
              <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80"
                  alt="100% Genuine Brands"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-emerald-500/30 backdrop-blur-md text-[#1BD741] border border-emerald-500/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-black text-white">100% Genuine Brands</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Zero compromises on quality. Only authentic formulas from L’Oréal Professionnel, Wella, O3+, and Schwarzkopf used on your hair and skin.
                </p>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 overflow-hidden flex flex-col justify-between group shadow-2xl">
              <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80"
                  alt="Sanitised & Single-Use"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-cyan-500/30 backdrop-blur-md text-cyan-300 border border-cyan-500/40 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-black text-white">Sanitised &amp; Single-Use</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Strict 7-step hygiene protocol: single-use disposable aprons, sanitized scissors, autoclaved nail tools, and sterilized workstations.
                </p>
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className="rounded-3xl bg-zinc-950/80 backdrop-blur-md border border-white/15 overflow-hidden flex flex-col justify-between group shadow-2xl">
              <div className="relative h-40 w-full overflow-hidden bg-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80"
                  alt="Honest & Transparent"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-amber-500/30 backdrop-blur-md text-amber-300 border border-amber-500/40 flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-black text-white">Honest &amp; Transparent</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Complimentary stylist consultation before every service. Transparent pricing with zero hidden charges or surprise upsells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REAL TRANSFORMATIONS LOOKBOOK */}
      <section id="lookbook" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 backdrop-blur-md">
              <Camera className="w-3.5 h-3.5 text-pink-400" />
              Client Transformations &amp; Ambience
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
              Real Looks. Real Confidence.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Explore hair highlights, balayage, keratin smoothing, and bridal makeovers crafted at our salon.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((img, idx) => (
              <div 
                key={img.id || idx}
                className="relative h-60 sm:h-72 rounded-3xl overflow-hidden border border-white/15 group shadow-2xl bg-zinc-900"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title || 'Salon Lookbook'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-[#1BD741] uppercase tracking-wider">
                    {img.category || 'Transformation'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-1">
                    {img.title || 'AuraLuxe Signature Styling'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8.5 ⭐ SOCIAL MEDIA HUB (INSTAGRAM & YOUTUBE SPACES)
         ========================================================================= */}
      <section id="social" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 backdrop-blur-md">
              <Share2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Behind The Scenes &amp; Styling Stories</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
              Connect With Us On Social Media
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Watch our master stylists craft bespoke transformations, explore daily hair &amp; beauty reels, and learn professional salon secrets on Instagram and YouTube.
            </p>
          </div>

          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            
            {/* 1. INSTAGRAM PLATFORM SPACE */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#833ab4]/20 via-[#fd1d1d]/15 to-[#fcb045]/15 border-2 border-pink-500/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6 group hover:border-pink-500/60 transition-all duration-300">
              <div className="space-y-4">
                
                {/* Instagram Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-lg shadow-pink-950/40 shrink-0">
                      <SocialIcon platform="instagram" size={24} colored={false} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-base sm:text-lg text-white">@auraluxesalon</h4>
                        <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold" title="Verified Creator">✓</span>
                      </div>
                      <p className="text-xs text-pink-200/90 font-medium">48.5K Followers • 420 Styling Reels • Jubilee Hills</p>
                    </div>
                  </div>

                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAction('instagram_follow_click')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-black shadow-lg shadow-pink-900/40 transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                    <span>Follow on Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Bio Snippet */}
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-3xl">
                  Bespoke hair coloring, caramel balayage transformations, keratin nanoplastia rituals, and royal bridal makeovers in Jubilee Hills, Hyderabad. Tag <strong className="text-white">#AuraLuxeSalon</strong> to get featured in our daily stories!
                </p>

                {/* Instagram Reels Preview Grid (4 Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  {INSTAGRAM_SALON_REELS.map((reel, rIdx) => (
                    <a
                      key={rIdx}
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl group/item block bg-zinc-950 border border-white/15 hover:border-pink-500/50 transition-all duration-300"
                    >
                      <Image
                        src={reel.imageUrl}
                        alt={reel.title}
                        fill
                        className="object-cover group-hover/item:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-3 text-white">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-extrabold flex items-center gap-1 border border-white/10 text-pink-300">
                            <Play className="w-2.5 h-2.5 fill-pink-400 text-pink-400" />
                            <span>Reel</span>
                          </span>
                          <span className="text-[10px] font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md">
                            ❤️ {reel.likes}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-[#1BD741] uppercase tracking-wider block">
                            {reel.tag}
                          </span>
                          <p className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 text-white">
                            {reel.title}
                          </p>
                          <span className="text-[10px] text-zinc-300 font-mono block">
                            👁️ {reel.views}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

              </div>

              {/* Bottom Instagram Link Bar */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-300">
                <span className="font-semibold text-pink-200">Official Hashtags: #AuraLuxeSalon • #HyderabadHairCare • #JubileeHills</span>
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-extrabold text-pink-400 hover:text-pink-300 hover:underline flex items-center gap-1 transition"
                >
                  <span>Explore All Reels on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. YOUTUBE PLATFORM SPACE */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-red-950/35 via-zinc-950/85 to-[#0A0A0C]/90 border-2 border-red-500/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6 group hover:border-red-500/60 transition-all duration-300">
              <div className="space-y-5">
                
                {/* YouTube Card Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg shadow-red-950/50 shrink-0">
                      <SocialIcon platform="youtube" size={24} colored={false} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-base sm:text-lg text-white">AuraLuxe Salon Masterclasses</h4>
                        <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">▶</span>
                      </div>
                      <p className="text-xs text-red-200/90 font-medium">35.2K Subscribers • 4K Hair Care &amp; Makeover Tutorials</p>
                    </div>
                  </div>

                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAction('youtube_subscribe_click')}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-950/50 transition flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <SocialIcon platform="youtube" size={14} colored={false} className="text-white" />
                    <span>Subscribe on YouTube</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* YouTube Video Showcase Grid (Main 4K Video + Episode Playlist) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Main 4K Video Player Showcase (Left / 7 cols) */}
                  <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border border-red-500/30 group/vid flex flex-col justify-end min-h-[280px] sm:min-h-[340px] bg-zinc-950">
                    <Image
                      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80"
                      alt="Bespoke Balayage Masterclass"
                      fill
                      className="object-cover group-hover/vid:scale-105 transition-transform duration-700 opacity-80"
                    />
                    
                    {/* Dark Overlay & Play Button */}
                    <div className="absolute inset-0 bg-black/45 group-hover/vid:bg-black/30 transition-colors flex items-center justify-center">
                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackAction('youtube_play_click')}
                        className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
                        title="Play on YouTube"
                      >
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </a>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-[11px] font-mono font-bold backdrop-blur-md flex items-center gap-1.5 z-10 border border-white/10">
                      <span>14:20</span>
                      <span>•</span>
                      <span className="text-amber-400">4K UHD</span>
                    </div>

                    {/* Video Info Bottom Banner */}
                    <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/80 to-transparent text-white space-y-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider inline-block">
                        FEATURED MASTERCLASS
                      </span>
                      <h5 className="text-sm sm:text-base font-extrabold leading-snug">
                        Bespoke Balayage Masterclass: Step-by-Step Foil Placement &amp; Ammonia-Free Toning
                      </h5>
                      <p className="text-[11px] text-zinc-300 leading-relaxed line-clamp-2">
                        Watch our senior hair director walk through sectioning, balayage clay formulation, freehand lightener painting, and mirror gloss glossing.
                      </p>
                    </div>
                  </div>

                  {/* Playlist Highlights (Right / 5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-red-400" />
                        <span>Recent Masterclass Tutorials</span>
                      </p>

                      {YOUTUBE_SALON_MASTERCLASSES.map((item, yIdx) => (
                        <a
                          key={yIdx}
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-white/10 hover:border-red-500/40 shadow-lg flex items-center gap-3.5 group/clip transition backdrop-blur-md cursor-pointer"
                        >
                          <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-white/10">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover group-hover/clip:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white font-bold backdrop-blur-xs">
                              {item.duration}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <h6 className="text-xs font-bold text-white group-hover/clip:text-red-400 transition line-clamp-2 leading-tight">
                              {item.title}
                            </h6>
                            <p className="text-[10px] text-zinc-400 truncate">{item.subtitle}</p>
                            <span className="text-[9px] text-amber-300 font-mono block">{item.views}</span>
                          </div>
                        </a>
                      ))}
                    </div>

                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition mt-2 cursor-pointer"
                    >
                      <SocialIcon platform="youtube" size={14} colored={false} className="text-red-500" />
                      <span>View All Tutorials on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>

                </div>

              </div>

              {/* Bottom YouTube Bar */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">New masterclass episode uploaded every Friday!</span>
                <span className="text-red-400 font-bold">100% Free Hair &amp; Skin Education</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. ⭐ DEDICATED REVIEWS & TESTIMONIALS (RICH VERIFIED CUSTOMER REVIEWS) */}
      <section id="reviews" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 text-amber-400 font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
                <span className="text-xs font-bold text-white">4.9 / 5.0 Rating</span>
                <span className="text-xs text-zinc-300">• 1,580+ Verified Client Reviews</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                Loved by Jubilee Hills &amp; Hyderabad
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Real feedback from clients who trust us for haircuts, balayage, keratin, and bridal glam.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 text-xs font-bold text-zinc-200 hover:text-white border border-white/15 flex items-center gap-1.5 transition shadow-md backdrop-blur-md cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1BD741]" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="p-6 rounded-3xl bg-zinc-950/85 backdrop-blur-md border border-white/15 flex flex-col justify-between space-y-4 shadow-2xl hover:border-pink-500/40 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-400">{rev.date}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white leading-snug">
                    {rev.headline}
                  </h4>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-500/40">
                      <Image
                        src={rev.clientAvatar}
                        alt={rev.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{rev.clientName}</h5>
                      <p className="text-[10px] text-zinc-400 truncate">{rev.clientRole}</p>
                    </div>

                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 shrink-0">
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-pink-300 font-semibold bg-pink-950/40 px-2.5 py-1 rounded-lg border border-pink-800/30">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>Service: {rev.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SALON LOCATION & CONTACT DESK */}
      <section id="location" className="relative py-16 border-b border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Location & Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2 backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  Find Us Easily
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  Visit AuraLuxe Jubilee Hills
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Located on Road No. 36 in Luxury Square Building beside Jubilee Hills Check Post Metro.
                </p>
              </div>

              {/* Salon Interior Card Preview */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                  alt="AuraLuxe Salon Lounge"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-[#1BD741] uppercase tracking-wider">
                    Storefront &amp; Styling Floor
                  </span>
                  <p className="text-xs font-extrabold text-white">
                    2nd Floor, Luxury Square, Road No. 36, Jubilee Hills
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-200">
                <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 space-y-1.5 shadow-xl">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    Salon Address
                  </h4>
                  <p className="leading-relaxed text-zinc-300">
                    {salonAddress}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    Landmark: Beside Jubilee Hills Check Post &amp; Metro Station
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 space-y-1 shadow-xl">
                    <h4 className="font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#1BD741]" />
                      Hours
                    </h4>
                    <p className="text-zinc-300">9:30 AM – 9:00 PM</p>
                    <p className="text-[10px] text-zinc-400">Open all 7 days</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 space-y-1 shadow-xl">
                    <h4 className="font-bold text-white flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#1BD741]" />
                      Direct Desk
                    </h4>
                    <a href={`tel:${salonPhone.replace(/\s+/g, '')}`} className="text-emerald-400 font-bold block">
                      {salonPhone}
                    </a>
                    <p className="text-[10px] text-zinc-400">Call for appointment</p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Road+No+36+Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-white/15 shadow-xl backdrop-blur-md"
                >
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Open in Google Maps / Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="lg:col-span-7 h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15226.790137276366!2d78.3989!3d17.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7926b47c0e2!2sRoad%20Number%2036%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AuraLuxe Jubilee Hills Google Map"
                className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-b border-white/10 relative z-10">
        <div className="text-center mb-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-zinc-300">Everything you need to know before visiting AuraLuxe Jubilee Hills.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'faq_1',
              q: 'Do I need a prior appointment or are walk-ins welcome?',
              a: 'Walk-ins are warmly welcome! However, we strongly recommend reserving your slot online or via WhatsApp to avoid peak-hour waiting time and claim our exclusive 30% first-visit discount.'
            },
            {
              id: 'faq_2',
              q: 'Are all retail beauty products 100% genuine and original?',
              a: 'Yes, 100% guaranteed. All products sold in our store (L’Oréal Professionnel, Wella, O3+, Moroccanoil, Schwarzkopf) are sourced directly from authorized brand distributors. You can pick them up at our salon or request doorstep courier delivery.'
            },
            {
              id: 'faq_3',
              q: 'How does doorstep product delivery work?',
              a: 'Add your favorite products to your shopping bag and click "Order via WhatsApp". We will confirm your order, take your delivery address, and ship via local express delivery within 24-48 hours across Hyderabad.'
            },
            {
              id: 'faq_4',
              q: 'Do you offer bridal makeup trials before the wedding date?',
              a: 'Yes! We offer comprehensive bridal hair and makeup consultations and trial sessions so you can experience the exact foundation shade, hairstyle, and saree draping look in advance.'
            },
            {
              id: 'faq_5',
              q: 'What payment modes are accepted at the salon?',
              a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), Visa/Mastercard credit and debit cards, cash, and digital net banking.'
            }
          ].map(faq => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left font-bold text-sm text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#1BD741] shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-zinc-300 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 pt-12 pb-6 text-xs text-zinc-400 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ab2079] to-amber-500 text-white flex items-center justify-center font-black text-xs">AL</span>
              <span className="text-sm font-extrabold text-white">{salonCompany}</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Hyderabad’s premier luxury unisex salon lounge delivering trendsetting hair, skin, and bridal styling in Jubilee Hills.
            </p>
            {/* Social Icons Strip */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-pink-950/60 hover:bg-pink-900 border border-pink-700/40 flex items-center justify-center text-pink-300 transition hover:scale-105"
                title="Follow on Instagram"
              >
                <SocialIcon platform="instagram" size={16} colored={false} className="text-pink-300" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700/40 flex items-center justify-center text-red-300 transition hover:scale-105"
                title="Subscribe on YouTube"
              >
                <SocialIcon platform="youtube" size={16} colored={false} className="text-red-300" />
              </a>
              <a
                href={`https://wa.me/${cleanWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/40 flex items-center justify-center text-emerald-300 transition hover:scale-105"
                title="Chat on WhatsApp"
              >
                <SocialIcon platform="whatsapp" size={16} colored={false} className="text-emerald-300" />
              </a>
            </div>
            <a 
              href="https://www.oneclickbiz.in/v/beauty-salon" 
              className="text-[#1BD741] font-mono text-[11px] block hover:underline pt-1"
            >
              https://www.oneclickbiz.in/v/beauty-salon
            </a>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm">Quick Links</h5>
            <ul className="space-y-1.5 text-zinc-300">
              <li><a href="#offers" className="hover:text-pink-400 transition">30% OFF Offers</a></li>
              <li><a href="#services" className="hover:text-[#1BD741] transition">Salon Services Menu</a></li>
              <li><a href="#shop" className="hover:text-[#1BD741] transition">Buy Salon Products</a></li>
              <li><a href="#lookbook" className="hover:text-[#1BD741] transition">Lookbook Gallery</a></li>
              <li><a href="#social" className="hover:text-pink-400 transition">Instagram &amp; YouTube Stories</a></li>
              <li><a href="#reviews" className="hover:text-[#1BD741] transition">Verified Reviews (4.9★)</a></li>
              <li><a href="#location" className="hover:text-[#1BD741] transition">Find Us</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm">Contact Desk</h5>
            <p className="text-zinc-300 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#1BD741]" /> {salonPhone}</p>
            <p className="text-zinc-300 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#1BD741]" /> 9:30 AM – 9:00 PM (Daily)</p>
            <p className="text-zinc-300 flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" /> Jubilee Hills, Hyderabad, Telangana</p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">Instant Booking</h5>
            <p className="text-zinc-300 leading-relaxed">
              Get an instant appointment confirmation with preferred master stylists.
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#ab2079] hover:bg-pink-600 text-white font-bold text-xs transition cursor-pointer shadow-lg"
            >
              Book Salon Appointment Slot
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} AuraLuxe Luxury Unisex Salon &amp; Spa. All rights reserved.</p>
          <p className="text-zinc-500">
            Digital Mini-Website Powered by <a href="https://www.oneclickbiz.in" className="hover:text-white transition">OneClickBiz</a> • <a href="https://www.oneclickbiz.in/v/beauty-salon" className="text-emerald-400 hover:underline">oneclickbiz.in/v/beauty-salon</a>
          </p>
        </div>
      </footer>

      {/* 13. STICKY MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-white/15 px-4 py-2.5 flex items-center justify-between gap-2 sm:hidden shadow-2xl">
        <a
          href={`tel:${salonPhone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10"
        >
          <Phone className="w-3.5 h-3.5 text-[#1BD741]" />
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative py-2.5 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-[#1BD741]" />
          {cartTotalItems > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-[#1BD741] text-black font-black text-[10px] leading-none">
              {cartTotalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ab2079] to-pink-600 text-white text-xs font-extrabold flex items-center justify-center gap-1 shadow-md cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Slot</span>
        </button>

        <a
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${salonCompany}! I would like to book a salon appointment.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-[#1BD741] text-black text-xs font-black flex items-center justify-center gap-1 shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-black" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* 14. INTERACTIVE SHOPPING BAG DRAWER / MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md h-full bg-zinc-950 border-l border-white/15 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#1BD741] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Your Beauty Bag</h3>
                  <p className="text-xs text-zinc-400">{cartTotalItems} items selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body: Items & Delivery Options */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {cart.length > 0 ? (
                <>
                  {/* Item List */}
                  <div className="space-y-3">
                    {cart.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="p-3 rounded-2xl bg-zinc-900/90 border border-white/10 flex gap-3 items-center justify-between"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-900">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-xs font-bold text-white truncate">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400">{product.brand} • {product.volume}</p>
                          <p className="text-xs font-extrabold text-[#1BD741] mt-0.5">
                            ₹{product.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-zinc-950 rounded-xl p-1 border border-zinc-800 shrink-0">
                          <button
                            onClick={() => updateCartQty(product.id, -1)}
                            className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-white px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(product.id, 1)}
                            className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 rounded text-rose-400 hover:text-rose-300 ml-1 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Mode Toggle */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-zinc-200 block">Fulfillment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('pickup')}
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          deliveryType === 'pickup'
                            ? 'bg-[#1BD741] text-black font-extrabold'
                            : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Salon Pickup (FREE)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          deliveryType === 'delivery'
                            ? 'bg-[#1BD741] text-black font-extrabold'
                            : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Doorstep Courier</span>
                      </button>
                    </div>
                    {deliveryType === 'delivery' && (
                      <p className="text-[10px] text-zinc-300 pt-1">
                        🚚 Delivered in 24-48 hrs across Hyderabad. Free on orders ₹1,500+.
                      </p>
                    )}
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-zinc-200 block">Your Details for WhatsApp Order</label>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={customerDetails.name}
                      onChange={e => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile Number *"
                      required
                      value={customerDetails.phone}
                      onChange={e => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                    {deliveryType === 'delivery' && (
                      <textarea
                        rows={2}
                        placeholder="Complete House / Flat / Street Address in Hyderabad *"
                        value={customerDetails.address}
                        onChange={e => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="py-20 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                  <h4 className="text-base font-bold text-white">Your beauty bag is empty</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Explore our salon-exclusive shampoos, hair masks, argan oils, and facial kits.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#1BD741] text-black font-bold text-xs cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer: Total & WhatsApp Dispatch */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-900/95 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-zinc-300">
                      <span>Delivery Fee</span>
                      <span className="font-bold text-white">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-[#1BD741]">₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCartCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#1BD741] hover:bg-[#18c43b] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-emerald-950/60 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Order via WhatsApp (Instant Confirmation)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 15. APPOINTMENT BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-7 space-y-4 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ab2079] to-pink-600 text-white flex items-center justify-center shadow-lg shadow-pink-950/50">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Book Salon Appointment</h3>
                <p className="text-xs text-zinc-400">{salonCompany} • Priority Confirmation</p>
              </div>
            </div>

            {bookingSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-[#1BD741] mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-white">Appointment Requested!</h4>
                <p className="text-xs text-zinc-300">
                  Redirecting to WhatsApp to finalize your booking with our salon desk...
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Service Required *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.serviceName}
                    onChange={e => setBookingForm(prev => ({ ...prev, serviceName: e.target.value }))}
                    placeholder="e.g. Haircut, Color, Keratin, Facial, Bridal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.clientName}
                      onChange={e => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="e.g. Priya Reddy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Preferred Slot</label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Stylist Preference</label>
                  <select
                    value={bookingForm.gender}
                    onChange={e => setBookingForm(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                  >
                    <option value="Any Available Master Stylist">Any Available Master Stylist</option>
                    <option value="Female Stylist">Female Stylist</option>
                    <option value="Male Stylist">Male Stylist</option>
                    <option value="Senior Creative Director">Senior Creative Director</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ab2079] via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-pink-950/50 active:scale-95 cursor-pointer mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm Booking via WhatsApp →</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}


// ==========================================
// AUTHENTIC ORIGINAL BRAND SVG LOGOS
// ==========================================
function WhatsAppOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        d="M17.5 14.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3 0-.1 0-.2 0-.3s-.5-1.2-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.9 3.4.5.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1z"
        fill="white"
      />
    </svg>
  );
}

function InstagramOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <radialGradient id="ig-grad-hero-original" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#ig-grad-hero-original)" />
      <path
        d="M12 6.5A5.5 5.5 0 1 0 12 17.5 5.5 5.5 0 0 0 12 6.5zm0 9A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7zm5.2-9.2a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z"
        fill="white"
      />
    </svg>
  );
}

function YouTubeOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8l6 4-6 4V8z" fill="white" />
    </svg>
  );
}

function GoogleMapsOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
      <circle cx="12" cy="9" r="3.2" fill="#FFFFFF" />
      <circle cx="12" cy="9" r="1.8" fill="#4285F4" />
    </svg>
  );
}

function PhoneCallOriginalLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="12" fill="#0F172A" />
      <path
        d="M7.5 9.5c.9 1.8 2.2 3.1 4 4l1.3-1.3c.2-.2.5-.2.7-.1.8.3 1.6.4 2.5.4.4 0 .7.3.7.7v2.3c0 .4-.3.7-.7.7C10.5 20.2 3.8 13.5 3.8 5.2c0-.4.3-.7.7-.7H6.8c.4 0 .7.3.7.7 0 .9.1 1.7.4 2.5.1.2.1.5-.1.7L7.5 9.5z"
        fill="#10B981"
      />
    </svg>
  );
}
