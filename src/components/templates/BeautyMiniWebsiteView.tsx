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
  Check
} from 'lucide-react';
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

// Fallback high-res salon products catalog if none are configured in profile
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

// Hot offers curated from Green Trends Kothapet
const GREEN_TRENDS_OFFERS = [
  {
    id: 'off_1',
    category: 'Women',
    title: 'Flat 30% OFF First Visit',
    subtitle: 'Welcome special on Haircut, Color or Facial services',
    badge: 'NEW CLIENTS',
    code: 'WELCOME30',
    terms: 'Valid on services above ₹999 on weekdays',
    discount: 'FLAT 30% OFF',
    tagColor: 'from-[#ab2079] to-pink-600'
  },
  {
    id: 'off_2',
    category: 'Bridal & Groom',
    title: 'Grand Bridal Glow Radiance Package',
    subtitle: 'Pre-bridal cleanup, 7-step facial, body spa, bridal hair styling & saree draping',
    badge: 'BRIDAL SPECIAL',
    price: '₹14,999',
    originalPrice: '₹19,999',
    discount: 'SAVE ₹5,000',
    code: 'BRIDALGLOW',
    terms: 'Includes complimentary pre-wedding skin consultation',
    tagColor: 'from-amber-600 to-yellow-600'
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
    tagColor: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'off_4',
    category: 'Men',
    title: 'Men’s Executive Grooming Package',
    subtitle: 'Precision style haircut, beard sculpting, charcoal detan & invigorating head massage',
    badge: 'MEN’S CHOICE',
    price: '₹799',
    originalPrice: '₹1,200',
    discount: 'SAVE ₹400',
    code: 'GROOM799',
    terms: 'All 7 days. Free hair wash included.',
    tagColor: 'from-emerald-600 to-teal-600'
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
    tagColor: 'from-rose-600 to-pink-600'
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
    tagColor: 'from-cyan-600 to-blue-600'
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
  const [serviceCategory, setServiceCategory] = useState<string>('All');
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
  const profileGallery = profile.sectionData?.gallery?.items || [];
  const profileTestimonials = profile.sectionData?.testimonials?.items || [];

  // Resolved salon products (merging profile configured products + authentic default catalog)
  const allProducts = useMemo(() => {
    if (profileProducts.length > 0) {
      // Map profile products to match e-commerce fields
      return profileProducts.map((p, idx) => ({
        id: p.id || `p_${idx}`,
        name: p.name || (p as any).title,
        brand: (p as any).brand || (p.name.includes('L’Oréal') ? 'L’Oréal' : p.name.includes('Wella') ? 'Wella' : p.name.includes('O3+') ? 'O3+' : p.name.includes('Moroccanoil') ? 'Moroccanoil' : 'Green Trends Pro'),
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

  // Clean WhatsApp phone calculation
  const rawWa = getCleanWhatsAppNumber(profile);
  const cleanWaDigits = (rawWa || '919154910101').replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;
  const salonPhone = profile.phone || '+91 91549 10101';
  const salonAddress = profile.address || 'No. 11-9-11/1/2, 1st Floor, New Nagole Main Rd, beside SBI Bank, Laxmi Nagar Colony, Kothapet, Hyderabad, Telangana 500035';
  const salonCompany = profile.company || 'Green Trends Unisex Hair & Style Salon';

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
      `📍 Branch: Kothapet, Hyderabad\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Customer:* ${customerDetails.name}\n` +
      `📞 *Phone:* ${customerDetails.phone}\n` +
      `🚚 *Delivery Mode:* ${deliveryType === 'pickup' ? 'Store Pickup at Kothapet' : 'Doorstep Courier Delivery'}\n` +
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
      `📍 Branch: Kothapet, Hyderabad\n` +
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
      `📍 Branch: Kothapet, Hyderabad\n` +
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
    if (offerCategory === 'All') return GREEN_TRENDS_OFFERS;
    return GREEN_TRENDS_OFFERS.filter(off => off.category === offerCategory);
  }, [offerCategory]);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 font-sans selection:bg-[#1BD741] selection:text-black pb-28">
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
      <div className="bg-gradient-to-r from-[#ab2079] via-[#85195e] to-[#0A0A0C] border-b border-pink-500/30 py-2 px-3 sm:px-4 text-[11px] sm:text-xs text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 text-pink-200 font-bold text-[10px] uppercase tracking-wider border border-pink-300/30">
              <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
              Now in Kothapet
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
      <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-emerald-500/40 p-1 flex items-center justify-center shadow-lg shadow-emerald-950/40 shrink-0">
                <span className="text-xl sm:text-2xl font-black text-[#1BD741] tracking-tighter">gt</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight leading-tight">
                    {salonCompany}
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="text-[#1BD741] font-bold">Kothapet Branch</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <strong>4.7</strong> (1,240+ reviews)
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
            <a href="#shop" className="hover:text-emerald-400 transition flex items-center gap-1.5 text-white bg-zinc-800/70 px-2.5 py-1 rounded-full border border-zinc-700">
              <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
              <span>Beauty Shop</span>
              <span className="w-2 h-2 rounded-full bg-[#1BD741] animate-ping" />
            </a>
            <a href="#why-us" className="hover:text-[#1BD741] transition">Why Us</a>
            <a href="#lookbook" className="hover:text-[#1BD741] transition">Lookbook</a>
            <a href="#reviews" className="hover:text-[#1BD741] transition">Reviews</a>
            <a href="#location" className="hover:text-[#1BD741] transition">Find Us</a>
          </nav>

          {/* Action Buttons: Cart Drawer Trigger + WhatsApp Booking + Call */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shopping Bag Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-md"
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
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Green Trends Kothapet! I want to inquire about hair/beauty services & appointments.`)}`}
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
              className="lg:hidden p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-3 space-y-2 text-xs font-medium text-zinc-200 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
              <a 
                href="#offers" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-pink-950/40 text-pink-300 border border-pink-800/40 font-bold flex items-center justify-between"
              >
                <span>🔥 Hot Offers</span>
                <span className="text-[10px] bg-pink-500 text-white px-1 rounded font-black">30% OFF</span>
              </a>
              <a 
                href="#shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-bold flex items-center justify-between"
              >
                <span>🛍️ Beauty Shop</span>
                <span className="text-[10px] bg-[#1BD741] text-black px-1 rounded font-black">BUY</span>
              </a>
            </div>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Services &amp; Pricing Menu</a>
            <a href="#why-us" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Why Choose Green Trends</a>
            <a href="#lookbook" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Hair Transformations Lookbook</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-zinc-800/60 hover:text-[#1BD741]">Google Customer Reviews (4.7★)</a>
            <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-[#1BD741]">Directions &amp; Contact Desk</a>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (CLONE OF GREENTRENDS-KOTHAPET HERO) */}
      <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-zinc-800/80">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand, Tagline & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ab2079]/15 border border-[#ab2079]/40 text-pink-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              NOW OPEN IN KOTHAPET, HYDERABAD
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Green Trends <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#1BD741] via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Unisex Hair &amp; Style Salon
                </span>
              </h2>
              <p className="text-lg sm:text-xl font-medium text-amber-200/90 tracking-wide">
                Good Style. Good Mood. Every Day.
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              Experience certified haircutting, advanced balayage &amp; fashion coloring, bridal makeovers, and rejuvenating skin spa therapies. We use 100% authentic international brands: L’Oréal, Wella, O3+, and Schwarzkopf.
            </p>

            {/* Green Trends 3 Pillars & Rating Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-2 max-w-lg">
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-center items-center text-center">
                <Award className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-xs font-bold text-white leading-tight">Certified Stylists</span>
                <span className="text-[10px] text-zinc-400">Green Trends Academy</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-center items-center text-center">
                <ShieldCheck className="w-5 h-5 text-[#1BD741] mb-1" />
                <span className="text-xs font-bold text-white leading-tight">100% Authentic</span>
                <span className="text-[10px] text-zinc-400">L’Oréal &amp; Wella</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-center items-center text-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
                <span className="text-xs font-bold text-white leading-tight">4.7 ★ Rated</span>
                <span className="text-[10px] text-zinc-400">1,240+ Google Reviews</span>
              </div>
            </div>

            {/* Address Snippet */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 max-w-xl">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>Kothapet Branch:</strong> {salonAddress}
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ab2079] via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-sm flex items-center gap-2 transition shadow-xl shadow-pink-900/40 active:scale-95 cursor-pointer"
              >
                <span>Book Appointment &amp; Get 30% OFF</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#shop"
                className="px-5 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 text-[#1BD741] border border-emerald-500/40 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Beauty Products</span>
              </a>

              <button
                onClick={() => downloadVcfFile(profile)}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition"
                title="Share Salon"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: "Let's find what you need" Booking Card (Clone of original) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700/80 p-6 sm:p-7 shadow-2xl shadow-black relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#ab2079]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2 mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-[#1BD741] font-bold text-[11px] border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Instant WhatsApp Confirmation
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Let’s find what you need
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your service, date and slot for priority salon booking.
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Select Service</label>
                  <select
                    value={bookingForm.serviceName}
                    onChange={e => setBookingForm(prev => ({ ...prev, serviceName: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                  >
                    <option value="Haircut & Styling">Haircut &amp; Styling (Women / Men)</option>
                    <option value="Global Hair Color / Highlights">Global Hair Color / Balayage / Highlights</option>
                    <option value="Keratin / Hair Botox / Smoothening">Keratin / Hair Botox / Smoothening</option>
                    <option value="Deep Conditioning Hair Spa">Deep Conditioning Hair Spa (L’Oréal / Wella)</option>
                    <option value="O3+ Radiance D-Tan Facial">O3+ Radiance D-Tan Facial &amp; Cleanup</option>
                    <option value="Grand Bridal Makeover Package">Grand Bridal Makeover Package</option>
                    <option value="Men's Executive Grooming Combo">Men’s Executive Grooming Combo</option>
                    <option value="Deluxe Pedicure & Manicure">Deluxe Pedicure &amp; Manicure</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya / Rahul"
                      value={bookingForm.clientName}
                      onChange={e => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
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
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Time Slot</label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:border-[#1BD741]"
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

                <p className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero advance payment • Walk-ins &amp; reservations welcome</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOT OFFERS / DEALS FOR EVERYONE (GREEN TRENDS SIGNATURE) */}
      <section id="offers" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2">
              <Tag className="w-3.5 h-3.5 text-pink-400" />
              Limited Period Specials
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Deals for Everyone in Kothapet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Save big on premium hair, skin, and grooming rituals. Show coupon at salon or claim on WhatsApp.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-x-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOffers.map(offer => (
            <div 
              key={offer.id} 
              className="rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 hover:border-pink-500/50 transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4 group shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r ${offer.tagColor} shadow-md`}>
                    {offer.badge}
                  </span>
                  <span className="text-xs font-black text-[#1BD741] px-2 py-0.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                    {offer.discount}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-pink-300 transition-colors">
                  {offer.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {offer.subtitle}
                </p>

                {offer.price && (
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-xl sm:text-2xl font-black text-white">{offer.price}</span>
                    {offer.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through">{offer.originalPrice}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Code: <strong className="text-zinc-300 font-mono">{offer.code}</strong></span>
                  <span>{offer.terms}</span>
                </div>

                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Green Trends Kothapet! I want to claim the offer: *${offer.title}* (Code: ${offer.code}). Please book my slot!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-[#1BD741] text-zinc-200 hover:text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Claim on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ⭐ EXCLUSIVE BEAUTY STORE (BUY PRODUCTS FOR CUSTOMERS) */}
      <section id="shop" className="relative bg-gradient-to-b from-zinc-950 via-[#0E0E12] to-zinc-950 border-y border-zinc-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header & Shopping Bag Summary Pill */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#1BD741] text-xs font-bold border border-emerald-500/30 mb-2">
                <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
                Customer Retail Store • Pickup &amp; Doorstep Delivery
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Buy Genuine Salon-Grade Beauty Products
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-xs sm:text-sm text-white focus:outline-none focus:border-[#1BD741]"
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
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
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
                    className="rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 transition-all p-4 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20"
                  >
                    <div>
                      {/* Product Image & Badges */}
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden bg-zinc-950 mb-3.5">
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
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-zinc-700 font-bold text-white">
                            {prod.brand}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-300 font-medium">
                            {prod.volume}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{prod.rating || 4.8}</span>
                          <span className="text-zinc-500 font-normal">({prod.reviewsCount || 120})</span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-[#1BD741] transition-colors line-clamp-2">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-baseline gap-2 pt-3 mt-1">
                        <span className="text-lg font-black text-white">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && (
                          <span className="text-xs text-zinc-500 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-[#1BD741]">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Actions: Add to Bag + 1-Click WhatsApp Buy */}
                    <div className="pt-4 border-t border-zinc-800/80 space-y-2 mt-3">
                      {currentQty > 0 ? (
                        <div className="flex items-center justify-between bg-zinc-950 rounded-xl p-1 border border-zinc-700">
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
                          className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-zinc-700"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#1BD741]" />
                          <span>Add to Shopping Bag</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleInstantBuy(prod)}
                        className="w-full py-2 rounded-xl bg-emerald-950/40 hover:bg-[#1BD741] text-[#1BD741] hover:text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer border border-emerald-500/40"
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
            <div className="py-16 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800 max-w-md mx-auto space-y-3">
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

      {/* 6. WHY CHOOSE GREEN TRENDS (4 BENTO CARDS) */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-[#1BD741] text-xs font-bold border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            The Green Trends Standard
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Why Kothapet Chooses Us
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            India’s favorite unisex salon chain brings international styling standards right to your neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">Certified Stylists</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every stylist undergoes 200+ hours of rigorous certification at the Green Trends Academy in precision haircutting and modern color blending.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#1BD741] border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">100% Genuine Brands</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zero compromises on quality. Only authentic formulas from L’Oréal Professionnel, Wella, O3+, and Schwarzkopf used on your hair and skin.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">Sanitised &amp; Single-Use</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Strict 7-step hygiene protocol: single-use disposable aprons, sanitized scissors, autoclaved nail tools, and sterilized workstations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Tag className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-white">Honest &amp; Transparent</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Complimentary stylist consultation before every service. Transparent pricing with zero hidden charges or surprise upsells.
            </p>
          </div>
        </div>
      </section>

      {/* 7. SERVICES & PRICING MENU */}
      <section id="services" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2">
              <Scissors className="w-3.5 h-3.5 text-pink-400" />
              Transparent Rates
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Signature Services Menu
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Curated haircuts, hair color, keratin therapies, facials and bridal grooming for men and women.
            </p>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white flex items-center gap-2 transition cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1BD741]" />
            <span>Book Consultation Slot</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {profileServices.map(srv => (
            <div 
              key={srv.id} 
              className="rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 transition-all p-5 flex flex-col justify-between group shadow-xl space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-base font-black text-white group-hover:text-[#1BD741] transition-colors">
                    {srv.title}
                  </h4>
                  <span className="text-base font-black text-emerald-400 shrink-0">
                    {srv.price ? `₹${srv.price.toLocaleString('en-IN')}` : 'From ₹350'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  {srv.durationMinutes || 45} mins
                </span>
                <button
                  onClick={() => {
                    setBookingForm(prev => ({ ...prev, serviceName: srv.title }));
                    setIsBookingModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-[#1BD741] text-[#1BD741] hover:text-black font-extrabold text-xs transition cursor-pointer border border-emerald-500/30"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. REAL TRANSFORMATIONS LOOKBOOK */}
      <section id="lookbook" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-bold border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Client Transformations
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            Real Looks. Real Confidence.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Explore hair highlights, balayage, keratin smoothing, and bridal makeovers crafted at our salon.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profileGallery.map((img, idx) => (
            <div 
              key={img.id || idx}
              className="relative h-60 sm:h-72 rounded-3xl overflow-hidden border border-zinc-800 group shadow-lg"
            >
              <Image
                src={img.imageUrl}
                alt={img.title || 'Salon Lookbook'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#1BD741] uppercase tracking-wider">
                  {img.category || 'Transformation'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {img.title || 'Green Trends Styling'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. GOOGLE REVIEWS & TESTIMONIALS (4.7★ 1,240+ REVIEWS) */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 py-16 border-t border-zinc-800/80">
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
              <span className="text-xs font-bold text-white">4.7 / 5.0 Rating</span>
              <span className="text-xs text-zinc-500">• 1,240+ Google Reviews</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Loved by Kothapet &amp; Nagole
            </h3>
          </div>

          <a
            href="https://maps.google.com/?q=Green+Trends+Kothapet+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white border border-zinc-700 flex items-center gap-1.5 transition"
          >
            <span>Read all on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {profileTestimonials.map((t, idx) => (
            <div 
              key={t.id || idx}
              className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  &ldquo;{t.content || (t as any).comment || (t as any).text}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">{t.clientName || (t as any).name}</h5>
                  <p className="text-[10px] text-zinc-500">{t.clientRole || (t as any).role || 'Verified Customer'}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  Google Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. LOCATION, HOURS & 30-SECOND BOOKING DESK */}
      <section id="location" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs font-bold border border-pink-500/30 mb-2">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                Find Us Easily
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Visit Green Trends Kothapet
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Located right on New Nagole Main Road beside State Bank of India, Laxmi Nagar Colony.
              </p>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  Salon Address
                </h4>
                <p className="leading-relaxed text-zinc-400">
                  {salonAddress}
                </p>
                <p className="text-[11px] text-emerald-400 font-medium">
                  Landmark: Beside SBI Bank, 1st Floor
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#1BD741]" />
                    Hours
                  </h4>
                  <p className="text-zinc-400">9:30 AM – 9:00 PM</p>
                  <p className="text-[10px] text-zinc-500">Open all 7 days</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#1BD741]" />
                    Direct Desk
                  </h4>
                  <a href={`tel:${salonPhone.replace(/\s+/g, '')}`} className="text-emerald-400 font-bold block">
                    {salonPhone}
                  </a>
                  <p className="text-[10px] text-zinc-500">Call for appointment</p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Green+Trends+Kothapet+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-zinc-700"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Open in Google Maps / Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 h-80 sm:h-96 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.204554316682!2d78.54471677598835!3d17.373117403759905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98e722512803%3A0xe55673ecde505d92!2sGreen%20Trends%20Unisex%20Hair%20%26%20Style%20Salon!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Green Trends Kothapet Google Map"
              className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-zinc-800/80">
        <div className="text-center mb-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-zinc-400">Everything you need to know before visiting Green Trends Kothapet.</p>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'faq_1',
              q: 'Do I need prior appointment or are walk-ins welcome?',
              a: 'Walk-ins are warmly welcome! However, we strongly recommend reserving your slot online or via WhatsApp to avoid peak-hour waiting time and claim our exclusive 30% first-visit discount.'
            },
            {
              id: 'faq_2',
              q: 'Are all retail beauty products 100% genuine and original?',
              a: 'Yes, 100% guaranteed. All products sold in our store (L’Oréal Professionnel, Wella, O3+, Moroccanoil, Schwarzkopf) are sourced directly from authorized brand distributors. You can pick them up at our Kothapet salon or request doorstep delivery.'
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
                className="rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 text-left font-bold text-sm text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#1BD741] shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 pt-12 pb-6 border-t border-zinc-800/80 text-xs text-zinc-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-emerald-500/40 text-[#1BD741] flex items-center justify-center font-black text-sm">gt</span>
              <span className="text-sm font-extrabold text-white">{salonCompany}</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              India’s premier unisex salon brand delivering trendsetting hair, skin, and bridal styling in Kothapet, Hyderabad.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm">Quick Links</h5>
            <ul className="space-y-1.5 text-zinc-400">
              <li><a href="#offers" className="hover:text-pink-400 transition">30% OFF Offers</a></li>
              <li><a href="#services" className="hover:text-[#1BD741] transition">Salon Services Menu</a></li>
              <li><a href="#shop" className="hover:text-[#1BD741] transition">Buy Salon Products</a></li>
              <li><a href="#lookbook" className="hover:text-[#1BD741] transition">Lookbook Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#1BD741] transition">Client Reviews (4.7★)</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm">Contact Desk</h5>
            <p className="text-zinc-400 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#1BD741]" /> {salonPhone}</p>
            <p className="text-zinc-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#1BD741]" /> 9:30 AM – 9:00 PM (Daily)</p>
            <p className="text-zinc-400 flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" /> Kothapet, Hyderabad, Telangana</p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white text-sm">Instant Booking</h5>
            <p className="text-zinc-400 leading-relaxed">
              Get an instant appointment confirmation with preferred master stylists.
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#ab2079] hover:bg-pink-600 text-white font-bold text-xs transition cursor-pointer"
            >
              Book Salon Appointment Slot
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} Green Trends Unisex Hair &amp; Style Salon — Kothapet. All rights reserved.</p>
          <p className="text-zinc-600">Digital Mini-Website Powered by OneClickBiz</p>
        </div>
      </footer>

      {/* 13. STICKY MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between gap-2 sm:hidden shadow-2xl">
        <a
          href={`tel:${salonPhone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-zinc-800"
        >
          <Phone className="w-3.5 h-3.5 text-[#1BD741]" />
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative py-2.5 px-3 rounded-xl bg-zinc-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-zinc-800 cursor-pointer"
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
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Green Trends Kothapet! I would like to book a salon appointment.`)}`}
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
          <div className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
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
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
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
                        className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex gap-3 items-center justify-between"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-950">
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
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-white px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(product.id, 1)}
                            className="p-1 rounded text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 rounded text-rose-400 hover:text-rose-300 ml-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Mode Toggle */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <label className="text-xs font-bold text-zinc-300 block">Fulfillment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('pickup')}
                        className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                          deliveryType === 'pickup'
                            ? 'bg-[#1BD741] text-black'
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
                            ? 'bg-[#1BD741] text-black'
                            : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Doorstep Courier</span>
                      </button>
                    </div>
                    {deliveryType === 'delivery' && (
                      <p className="text-[10px] text-zinc-400 pt-1">
                        🚚 Delivered in 24-48 hrs across Hyderabad. Free on orders ₹1,500+.
                      </p>
                    )}
                  </div>

                  {/* Customer Information Form */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold text-zinc-300 block">Your Details for WhatsApp Order</label>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={customerDetails.name}
                      onChange={e => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile Number *"
                      required
                      value={customerDetails.phone}
                      onChange={e => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#1BD741]"
                    />
                    {deliveryType === 'delivery' && (
                      <textarea
                        rows={2}
                        placeholder="Complete House / Flat / Street Address in Hyderabad *"
                        value={customerDetails.address}
                        onChange={e => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#1BD741]"
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
              <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-900/90 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Delivery Fee</span>
                      <span className="font-bold text-white">
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
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
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-7 space-y-4 shadow-2xl relative overflow-hidden">
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
                <p className="text-xs text-zinc-400">Green Trends Kothapet • Priority Confirmation</p>
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
