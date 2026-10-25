'use client';

import React, { useState, useMemo } from 'react';
import { 
  DigitalProfile, 
  ServiceItem, 
  ProductItem, 
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
  Wrench, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  Star, 
  Clock, 
  X, 
  Send, 
  Zap, 
  Sparkles,
  ChevronRight,
  ChevronDown,
  Truck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Eye,
  Play,
  ExternalLink,
  Menu,
  Check,
  Search,
  SlidersHorizontal,
  Home as HomeIcon,
  Droplets,
  Paintbrush,
  Bug,
  Wind,
  Package,
  Layers,
  ArrowRight
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

// 10 Core Home Service Verticals (Vijay Home Services Parity)
const HOME_SERVICES_CATALOG = [
  {
    id: 'deep-clean',
    title: 'Full Home Deep Cleaning',
    category: 'Cleaning',
    startingPrice: 2499,
    rating: 4.9,
    reviewsCount: '28,400+ Homes',
    duration: '4 - 6 Hours',
    badge: 'Most Popular',
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Mechanized floor scrubbing, wall dusting, balcony pressure wash, glass polishing, and complete cobweb removal with German single-disc machines.',
    features: ['Single-Disc Machine Floor Scrubbing', 'Kitchen Degreasing & Cabinet Sanitization', 'Balcony & Window Slider Track Vacuuming']
  },
  {
    id: 'sofa-carpet',
    title: 'Sofa & Carpet Steam Shampooing',
    category: 'Upholstery',
    startingPrice: 599,
    rating: 4.8,
    reviewsCount: '19,200+ Cleaned',
    duration: '60 - 90 Mins',
    badge: 'Instant Dry',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Injection-extraction shampoo machine lifts deep food stains, pet hair, dust mites, and sweat odors without fabric fading.',
    features: ['Anti-Bacterial Active Foam Injection', 'High-Power Moisture Extraction', '100% Quick-Dry in 3-4 Hours']
  },
  {
    id: 'kitchen-bath',
    title: 'Kitchen & Bathroom Sanitization',
    category: 'Cleaning',
    startingPrice: 399,
    rating: 4.9,
    reviewsCount: '34,000+ Booked',
    duration: '90 - 120 Mins',
    badge: 'Limescale Free',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    description: 'Removal of stubborn yellow hard-water salt, soap scum, chimney oil, gas stove grease, and exhaust fan grime using Diversey Taski R1 & R2.',
    features: ['Acid-Free Tile & Grout Scrubbing', 'Chrome Tap Mirror Descaling', 'Odor Neutralizing Drain Wash']
  },
  {
    id: 'painting',
    title: 'Home Painting & Waterproofing',
    category: 'Painting',
    startingPrice: 9,
    priceUnit: 'per sq.ft',
    rating: 4.8,
    reviewsCount: '4,800+ Flats',
    duration: '2 - 4 Days',
    badge: '1-Year Warranty',
    icon: Paintbrush,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Laser moisture check, crack filling, Asian Paints Royale luxury emulsion, and zero-mess plastic masking of furniture.',
    features: ['Free Laser Digital Moisture Meter Audit', 'Mechanized Dust-Free Sanding', 'Complete Post-Painting Deep Clean']
  },
  {
    id: 'pest-control',
    title: 'Pest Control & Termite Piping',
    category: 'Pest Control',
    startingPrice: 699,
    rating: 4.9,
    reviewsCount: '22,100+ Homes',
    duration: '45 - 60 Mins',
    badge: '100% Odorless',
    icon: Bug,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    description: 'Herbal odorless gel for cockroaches, drill-fill-seal subterranean termite piping with 1-year guarantee, and bed bug thermal treatments.',
    features: ['Child & Pet Safe Herbal Formulations', 'No Need to Empty Kitchen Utensils', 'Free 2nd Inspection & Rework Cover']
  },
  {
    id: 'electrician',
    title: 'Electrical & Wiring Repairs',
    category: 'Repair',
    startingPrice: 149,
    rating: 4.9,
    reviewsCount: '18,700+ Fixed',
    duration: '30 - 60 Mins',
    badge: '60-Min Arrival',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Certified electricians with digital multimeters for MCB tripping, short circuits, decorative chandeliers, ceiling fans, and inverter setups.',
    features: ['ISO Certified Diagnostic Protocol', 'Standardized Genuine Spare Parts', '30-Day Workmanship Warranty']
  },
  {
    id: 'ac-repair',
    title: 'AC Foam Jet Servicing & Gas Refill',
    category: 'Appliance',
    startingPrice: 499,
    rating: 4.8,
    reviewsCount: '15,600+ ACs',
    duration: '45 Mins',
    badge: 'Cooling Boost',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    description: 'Pressure jet foam wash cleans condenser fins and blower wheels, boosts air throw by 40%, stops water leaks, and tests compressor PSI.',
    features: ['Deep Jet Foam Filter & Coil Wash', 'Gas Pressure Check & Leak Detection', 'Reduces Electricity Bill by up to 25%']
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Water Leak Repair',
    category: 'Repair',
    startingPrice: 199,
    rating: 4.8,
    reviewsCount: '12,900+ Fixed',
    duration: '30 - 60 Mins',
    badge: 'Leak Specialist',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    description: 'Fix dripping faucets, concealed wall pipe seepages, flush tank leakage, pressure pump installation, and drain unclogging.',
    features: ['Non-Invasive Acoustic Leak Detection', 'CPVC/UPVC Pipe Heat-Welding', 'Same-Day Emergency Visit']
  },
  {
    id: 'water-tank',
    title: 'Water Tank Machine Cleaning',
    category: 'Cleaning',
    startingPrice: 899,
    rating: 4.9,
    reviewsCount: '6,400+ Tanks',
    duration: '60 - 90 Mins',
    badge: 'UV Sanitized',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    description: '6-stage mechanized cleaning: sludge dewatering, high-pressure rotary rotary scrubbing, vacuuming, anti-bacterial spray, and UV sterilization.',
    features: ['6-Stage Automated Cleaning Process', '100% Silt & Algae Removal', 'Safe for Drinking Water Overhead Tanks']
  },
  {
    id: 'packers-movers',
    title: 'Packers & Movers Relocation',
    category: 'Shifting',
    startingPrice: 3499,
    rating: 4.8,
    reviewsCount: '3,800+ Moves',
    duration: 'Full Day',
    badge: 'Zero Damage',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-layer bubble wrap packing for TV, glass tables, and crockery. Uniformed movers handle loading, transit, and re-assembly.',
    features: ['Dedicated Closed Container Trucks', 'Furniture Dismantling & Assembly', 'Transit Insurance Coverage Available']
  }
];

// Tiered Home Cleaning Packages
const CLEANING_PACKAGES = [
  {
    id: 'pkg-lite',
    name: 'Essential Express Clean',
    price: 1899,
    originalPrice: 2499,
    discount: '24% OFF',
    idealFor: 'Routine Maintenance / Tenant Move-in',
    duration: '3 - 4 Hours',
    features: [
      'Dry & wet vacuuming of all rooms',
      'Balcony sweeping & mopping',
      'Kitchen slab degreasing & exterior wipe',
      'Bathroom floor scrubbing with Taski R2',
      'Fan & switchboard dry dusting'
    ],
    recommended: false
  },
  {
    id: 'pkg-deep',
    name: 'Signature Deep Clean Pro',
    price: 2999,
    originalPrice: 3999,
    discount: '25% OFF',
    idealFor: 'Full Annual Clean / Festivals / New Flats',
    duration: '5 - 6 Hours',
    features: [
      'Everything in Express Clean',
      'Single-disc mechanized floor buffing',
      'Window glass & mesh slider track cleaning',
      'Kitchen chimney, stove & cabinet interior wash',
      'Bathroom descaling & mirror sparkle polish',
      'Free sofa vacuuming & disinfection spray'
    ],
    recommended: true
  },
  {
    id: 'pkg-ultra',
    name: 'Platinum Sanitization & Pest Shield',
    price: 4499,
    originalPrice: 5999,
    discount: '25% OFF',
    idealFor: 'Luxury Villas / Pre-Occupancy Move-in',
    duration: '6 - 7 Hours',
    features: [
      'Everything in Signature Deep Clean',
      'Full home odorless cockroach herbal gel',
      '3-seater sofa shampoo injection & extraction',
      'AC external jet clean for up to 2 units',
      'Full home UV and steam disinfection',
      'Free 30-day return rework warranty'
    ],
    recommended: false
  }
];

// Before and After Transformations
const TRANSFORMATIONS = [
  {
    id: 'tf-1',
    title: 'Fabric Sofa Foam Shampooing',
    location: 'Jubilee Hills, Hyderabad',
    beforeDesc: 'Coffee stains & dust buildup',
    afterDesc: 'Restored original bright texture',
    beforeImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tf-2',
    title: 'Bathroom Hardwater Descaling',
    location: 'Gachibowli, Hyderabad',
    beforeDesc: 'White salt deposits on glass & taps',
    afterDesc: 'Crystal clear transparent finish',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tf-3',
    title: 'Luxury Emulsion Wall Painting',
    location: 'Madhapur, Hyderabad',
    beforeDesc: 'Scratched & flaking drywall',
    afterDesc: 'Flawless silk sheen finish',
    beforeImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80'
  }
];

// Major Hyderabad Localities Covered
const HYDERABAD_LOCALITIES = [
  'Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Hitec City',
  'Madhapur', 'Kondapur', 'Financial District', 'Tellapur',
  'Manikonda', 'Kokapet', 'Miyapur', 'Kukatpally',
  'Begumpet', 'Secunderabad', 'Ameerpet', 'Dilsukhnagar'
];

// Verified Google Reviews
const VERIFIED_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Srinivas Rao',
    area: 'Gachibowli, Hyderabad',
    service: 'Full 3 BHK Deep Cleaning',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'Booked OneClick for our 3 BHK flat handover. The 4-member crew arrived in uniform right on time with heavy rotary machines and Diversey chemicals. Bathroom tiles look brand new!',
    rating: 5,
    date: '2 days ago'
  },
  {
    id: 'rev-2',
    name: 'Ananya Reddy',
    area: 'Jubilee Hills, Hyderabad',
    service: 'L-Shaped Sofa Steam Shampooing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'Our light beige fabric sofa had stubborn juice and tea spills. The vacuum machine extracted so much hidden dust and the sofa dried completely in 3 hours with zero bad odor. Highly recommended.',
    rating: 5,
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    name: 'Karthik Varma',
    area: 'Madhapur, Hyderabad',
    service: 'AC Jet Cleaning & Electrician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    comment: 'The technician wore shoe covers, masked the bedroom wall with a plastic funnel, and pressure washed the AC blower coil. Cooling improved drastically. Transparent pricing.',
    rating: 5,
    date: '2 weeks ago'
  }
];

// FAQs
const SERVICE_FAQS = [
  {
    id: 'faq-1',
    q: 'How quickly can your technicians arrive at my location in Hyderabad?',
    a: 'We operate active micro-hubs across Jubilee Hills, Gachibowli, Madhapur, Kukatpally, and Secunderabad. For emergency repairs (electrical/plumbing) and scheduled cleaning, technicians can arrive at your doorstep in as fast as 60 minutes.'
  },
  {
    id: 'faq-2',
    q: 'Do I need to supply any cleaning equipment or chemicals?',
    a: 'No, not at all! Our professional teams arrive fully equipped with German single-disc rotary scrubbers, industrial wet & dry vacuum machines, microfiber dusters, ladders, and government-approved Diversey / Taski eco-friendly chemicals.'
  },
  {
    id: 'faq-3',
    q: 'Are your pest control and cleaning solutions safe for infants and pets?',
    a: 'Yes, 100%. We strictly use odorless herbal cockroach bait gels and food-grade sanitization chemicals approved by CIB (Central Insecticides Board). You do not need to vacate your home or empty kitchen utensils.'
  },
  {
    id: 'faq-4',
    q: 'What does your 30-Day Service Guarantee cover?',
    a: 'If you notice any missed spot or if a repaired electrical/plumbing issue recurs within 30 days of service, simply report it on WhatsApp or call our helpline. A senior technician will visit and redo the service completely free of charge.'
  },
  {
    id: 'faq-5',
    q: 'How does payment work?',
    a: 'You only pay after the job is completed to your 100% satisfaction. We accept UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards, net banking, or cash directly upon inspection.'
  }
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
  // Navigation & Active Filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<typeof HOME_SERVICES_CATALOG[0] | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Instant Estimator Wizard State
  const [calcService, setCalcService] = useState('Full Home Deep Cleaning');
  const [calcBhk, setCalcBhk] = useState('3 BHK Apartment');
  const [calcUrgency, setCalcUrgency] = useState('Standard (Preferred Slot)');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    locality: 'Gachibowli',
    service: 'Full Home Deep Cleaning',
    homeSize: '3 BHK Apartment',
    date: '2026-10-27',
    timeSlot: '10:00 AM – 12:00 PM',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Phone and Link Cleaners
  const rawPhone = profile.phone || '+91 98765 43210';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const cleanCallNumber = rawPhone.replace(/[^0-9+]/g, '') || '+919876543210';
  const cleanWa = profile.whatsapp?.replace(/\D/g, '') || (cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone || '919876543210');

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

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('OneClick Home Services Jubilee Hills Gachibowli Hyderabad')}`;
  const emailUrl = `mailto:${profile.email || 'concierge@oneclickhomeservices.com'}?subject=${encodeURIComponent('Inquiry for Home Services in Hyderabad')}`;

  // Smooth Scroll Helper
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // vCard download helper for SAVE VCARD
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:OneClick Home Services Hyderabad
ORG:OneClick Facility & Home Care Solutions
TITLE:Deep Cleaning, Pest Control, Painting & Repairs
TEL;TYPE=WORK,VOICE:+919876543210
TEL;TYPE=CELL,VOICE:+919876543210
EMAIL:concierge@oneclickhomeservices.com
URL:https://oneclickhomeservices.com
ADR;TYPE=WORK:;;Road No. 36, Jubilee Hills;Hyderabad;Telangana;500033;India
NOTE:ISO 9001:2015 Certified • 60-Min Arrival • 30-Day Guarantee • 120,000+ Happy Homes
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'OneClick_Home_Services.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Services Catalog
  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return HOME_SERVICES_CATALOG;
    return HOME_SERVICES_CATALOG.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory]);

  // Instant Estimated Price Calculation
  const estimatedPrice = useMemo(() => {
    let base = 2499;
    if (calcService.includes('Sofa')) base = 999;
    else if (calcService.includes('Kitchen')) base = 1299;
    else if (calcService.includes('Pest')) base = 899;
    else if (calcService.includes('Electrician')) base = 349;
    else if (calcService.includes('AC')) base = 699;
    else if (calcService.includes('Painting')) base = 8500;

    let multiplier = 1;
    if (calcBhk.includes('1 BHK')) multiplier = 0.8;
    else if (calcBhk.includes('2 BHK')) multiplier = 1.0;
    else if (calcBhk.includes('3 BHK')) multiplier = 1.35;
    else if (calcBhk.includes('4 BHK') || calcBhk.includes('Villa')) multiplier = 1.9;
    else if (calcBhk.includes('Commercial')) multiplier = 2.4;

    return Math.round(base * multiplier);
  }, [calcService, calcBhk]);

  // Submit Booking via WhatsApp
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `⚡ *ONECLICK HOME SERVICES - BOOKING REQUEST*\n\n*Name:* ${bookingForm.name}\n*Phone:* ${bookingForm.phone}\n*Locality:* ${bookingForm.locality}, Hyderabad\n*Service:* ${bookingForm.service}\n*Size/Property:* ${bookingForm.homeSize}\n*Date:* ${bookingForm.date}\n*Slot:* ${bookingForm.timeSlot}\n*Notes:* ${bookingForm.notes || 'None'}\n\nHello Team, please confirm technician dispatch and send service confirmation.`;
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSuccess(false);
    }, 2500);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">

      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-[#0B1528] text-slate-200 text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider uppercase border border-blue-400/30">
              <Zap className="w-3 h-3 text-blue-400" /> Hyderabad #1
            </span>
            <span className="text-slate-300 text-[11px] sm:text-xs">
              ⚡ 60-Min Doorstep Arrival • 100% Background Verified • 30-Day Free Rework Guarantee • Standardized Rate Card
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              142 Technicians Active across Hyderabad
            </span>
            <button onClick={() => scrollToSection('areas')} className="hover:text-blue-400 transition-colors cursor-pointer">
              View Localities
            </button>
            <span className="text-slate-700">|</span>
            <a 
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services, I need immediate service assistance in Hyderabad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN STICKY NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Left: Mobile Toggle & Brand Logo */}
            <div className="flex items-center gap-2.5 sm:gap-6 min-w-0">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group text-left cursor-pointer min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <div className="w-full h-full rounded-[14px] bg-[#0B1528] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-base sm:text-2xl tracking-tight text-slate-900 uppercase font-sans truncate max-w-[140px] xs:max-w-[210px] sm:max-w-none">
                    ONECLICK <span className="text-blue-600">SERVICES</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] tracking-wider text-slate-500 font-semibold uppercase truncate">
                    Hyderabad Home Care &amp; Repairs
                  </div>
                </div>
              </button>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold uppercase tracking-wider text-slate-700">
              <button onClick={() => scrollToSection('services')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('estimator')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Price Calculator</button>
              <button onClick={() => scrollToSection('packages')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Deep Clean Packages</button>
              <button onClick={() => scrollToSection('transformations')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Before &amp; After</button>
              <button onClick={() => scrollToSection('social')} className="hover:text-blue-600 transition-colors py-1 text-blue-600 font-extrabold cursor-pointer">Reels &amp; Video</button>
              <button onClick={() => scrollToSection('guarantee')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Why Us</button>
              <button onClick={() => scrollToSection('areas')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Localities</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-blue-600 transition-colors py-1 cursor-pointer">Reviews</button>
            </nav>

            {/* Right: Quick Action CTAs */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={`tel:${cleanCallNumber}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Helpline</span>
              </a>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-600/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Book Service
              </button>

              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                title="Share Services"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 sm:px-6 py-4 space-y-2 shadow-xl">
            <nav className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              <button onClick={() => scrollToSection('services')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>All Services</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('estimator')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>Calculator</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('packages')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>Packages</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('transformations')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>Before/After</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('social')} className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-left transition flex items-center justify-between">
                <span>Social Reels</span>
                <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button onClick={() => scrollToSection('guarantee')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>30-Day Cover</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('areas')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>Localities</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button onClick={() => scrollToSection('reviews')} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition flex items-center justify-between">
                <span>Reviews</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow-sm"
              >
                Instant Online Booking
              </button>
              <a 
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services, I would like to book a home service in Hyderabad.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-600 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" /> WhatsApp Rapid Desk
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - WITH EXACT 9 APP-STYLE SQUIRLES & ORIGINAL LOGOS */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-slate-50 pt-8 sm:pt-14 pb-14 sm:pb-20">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-24 right-10 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            
            {/* Locality Verification Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Serving All Hyderabad: Jubilee Hills • Gachibowli • Banjara Hills • Madhapur • Hitec City • Kondapur</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="font-extrabold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
              Expert Home Services in Hyderabad —{' '}
              <span className="text-blue-600 block sm:inline">
                Clean, Pest Free &amp; Repaired.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
              From full house deep cleaning and sofa shampooing to electrical repairs and AC servicing. 100% background-verified professionals at your doorstep within 60 minutes with a 30-day rework warranty.
            </p>

            {/* Trust Highlights Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> 60-Minute Rapid Arrival
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 30-Day Free Rework Cover
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-500" /> 4.8★ Rated by 120,000+ Homes
              </span>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                HERO 9-SQUIRCLE ACTION DOCK (Exact Parity with Interior & Jewellery)
            ───────────────────────────────────────────────────────────── */}
            <div className="pt-4 sm:pt-6 pb-2 w-full max-w-full overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex flex-nowrap items-center justify-start lg:justify-center gap-3 sm:gap-4 w-max lg:w-auto px-4 lg:px-0 lg:mx-auto">
                
                {/* 1. CALL */}
                <a
                  href={`tel:${cleanCallNumber}`}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    CALL
                  </span>
                </a>

                {/* 2. WHATSAPP */}
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services Hyderabad, I would like to book a home service.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
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
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    FACEBOOK
                  </span>
                </a>

                {/* 5. SERVICES / LOOKBOOK */}
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="flex flex-col items-center gap-1.5 shrink-0 group transition-transform active:scale-95 cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#8B5CF6] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#EF4444] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white" />
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Download className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
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
                  <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-[#111111] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                    <Share2 className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    SHARE
                  </span>
                </button>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Bottom Trust Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-start gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">60-Min Arrival</h4>
                <p className="text-[11px] text-slate-500">Live technician dispatch across Hyderabad</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">30-Day Guarantee</h4>
                <p className="text-[11px] text-slate-500">Zero-cost rework warranty on all jobs</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Police Verified</h4>
                <p className="text-[11px] text-slate-500">Trained, insured &amp; certified professionals</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Fixed Rate Card</h4>
                <p className="text-[11px] text-slate-500">Transparent upfront pricing, no hidden costs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES CATALOG (10 Core Verticals with Real Human Matching Photos) */}
      <section id="services" className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> On-Demand Expert Services
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Hyderabad's Complete Home Service Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Mechanized deep cleaning, sofa shampooing, painting, pest treatment, and certified electrical &amp; plumbing repairs.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'cleaning', label: 'Deep Cleaning' },
                { id: 'upholstery', label: 'Sofa & Carpet' },
                { id: 'repair', label: 'Electric & Plumbing' },
                { id: 'pest control', label: 'Pest Control' },
                { id: 'painting', label: 'Painting' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo with Working Human Professional */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/95 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {service.badge}
                    </span>

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{service.rating}</span>
                      <span className="text-slate-400 font-normal">({service.reviewsCount})</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1.5">
                        <IconComponent className="w-4 h-4" />
                        <span>{service.category}</span>
                      </div>

                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="mt-3.5 space-y-1.5">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Book Action */}
                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Starts At</div>
                        <div className="text-base sm:text-lg font-black text-slate-900">
                          ₹{service.startingPrice.toLocaleString('en-IN')}{' '}
                          <span className="text-xs font-normal text-slate-500">{service.priceUnit || ''}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setBookingForm(prev => ({ ...prev, service: service.title }));
                            setIsBookingModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          Book Now
                        </button>
                        
                        <a
                          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi OneClick Home Services, I would like to inquire about ${service.title} (Starting ₹${service.startingPrice}). Please share slot availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="WhatsApp Booking"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
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

      {/* 5. INSTANT COST ESTIMATOR / BOOKING CALCULATOR */}
      <section id="estimator" className="py-16 sm:py-24 bg-gradient-to-br from-[#0B1528] via-[#111F38] to-[#0B1528] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Calculator Wizard */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>Transparent Rate Card Calculator</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Calculate Service Estimate in 10 Seconds
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Zero surprise charges on arrival. Select your requirement and property configuration to generate an upfront transparent estimate with guaranteed inclusions.
              </p>

              {/* Step 1: Select Service */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">1. Select Service Vertical</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Full Home Deep Cleaning',
                    'Sofa & Carpet Shampooing',
                    'Kitchen & Bathroom Scrub',
                    'Pest Control (Odorless)',
                    'AC Jet Service & Gas',
                    'Painting & Waterproofing'
                  ].map(srv => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setCalcService(srv)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                        calcService === srv
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Property Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">2. Home Configuration / Size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    '1 BHK Flat',
                    '2 BHK Apartment',
                    '3 BHK Apartment',
                    '4 BHK / Duplex Villa'
                  ].map(bhk => (
                    <button
                      key={bhk}
                      type="button"
                      onClick={() => setCalcBhk(bhk)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all border cursor-pointer ${
                        calcBhk === bhk
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Priority */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">3. Preferred Dispatch Speed</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '⚡ Emergency Express (Under 60 Mins)',
                    '📅 Scheduled Slot (Tomorrow / Custom)'
                  ].map(urg => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setCalcUrgency(urg)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all border cursor-pointer ${
                        calcUrgency === urg
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400/40'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {urg}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Live Quote Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Quote Summary</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                  Inclusive of Taxes &amp; Machinery
                </span>
              </div>

              <div className="py-6 space-y-3">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Selected Service:</span>
                  <strong className="text-slate-900 text-right">{calcService}</strong>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Property Size:</span>
                  <strong className="text-slate-900">{calcBhk}</strong>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Arrival Guarantee:</span>
                  <strong className="text-blue-600">{calcUrgency.split('(')[0]}</strong>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Chemicals &amp; Equipment:</span>
                  <strong className="text-emerald-700">Diversey / Single-Disc Included</strong>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Estimated Total Price</div>
                      <div className="text-3xl sm:text-4xl font-black text-slate-900">
                        ₹{estimatedPrice.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                      Flat 20% Applied
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    *Pay online or via cash/UPI post completion after thorough inspection.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingForm(prev => ({
                      ...prev,
                      service: calcService,
                      homeSize: calcBhk
                    }));
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer text-center"
                >
                  Confirm &amp; Schedule Service
                </button>

                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi OneClick Home Services, I generated a quote on your website for ${calcService} (${calcBhk}) at ₹${estimatedPrice}. Please share technician availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  <span>Book on WhatsApp Instantly</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. TIERED CLEANING PACKAGES */}
      <section id="packages" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Transparent Packages</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Choose the Perfect Deep Cleaning Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All plans include police-verified crew, industrial wet vacuuming, and 30-day rework warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLEANING_PACKAGES.map(pkg => (
              <div 
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.recommended 
                    ? 'bg-white border-2 border-blue-600 shadow-xl scale-102 ring-4 ring-blue-500/10' 
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    Recommended by Hyderabad Patrons
                  </span>
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{pkg.idealFor}</div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">{pkg.name}</h3>

                  <div className="py-4 border-b border-slate-100 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {pkg.discount}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 py-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Average Service Duration: {pkg.duration}</span>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: pkg.name }));
                      setIsBookingModalOpen(true);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      pkg.recommended
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    Select {pkg.name.split(' ')[0]}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. BEFORE & AFTER TRANSFORMATION SHOWCASE */}
      <section id="transformations" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Real Results</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Before &amp; After Transformations in Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              See the visible difference our industrial single-disc scrubbers and steam extraction machines deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSFORMATIONS.map(item => (
              <div key={item.id} className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span className="text-blue-600 font-bold">{item.title}</span>
                    <span>{item.location}</span>
                  </div>

                  {/* Dual Photos: Before & After */}
                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-200">
                    <div className="relative overflow-hidden group">
                      <img src={item.beforeImage} alt="Before Service" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-bold uppercase">
                        Before
                      </span>
                    </div>

                    <div className="relative overflow-hidden group">
                      <img src={item.afterImage} alt="After Service" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-slate-500">{item.beforeDesc}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <strong className="text-slate-800">{item.afterDesc}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, service: item.title }));
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Book This Transformation
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. DEDICATED SOCIAL MEDIA SPACE (YouTube 4K & Instagram Reels) */}
      <section id="social" className="py-16 sm:py-24 bg-[#0B1528] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Follow On Social Media</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Watch Hyderabad Technicians in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Join 140,000+ followers on Instagram &amp; YouTube for real before-after videos, deep cleaning tips, and live service demos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Follow @oneclick.homeservices</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 flex items-center gap-1.5"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube 4K</span>
              </a>
            </div>
          </div>

          {/* YouTube 4K Feature Card */}
          <div className="rounded-3xl overflow-hidden bg-[#111F38] border border-white/10 shadow-xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              
              <div className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-2xl group border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" 
                  alt="4K Full Villa Deep Cleaning in Gachibowli"
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
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-cyan-300 font-bold flex items-center gap-1.5">
                  <YoutubeIcon className="w-4 h-4 text-red-500" />
                  <span>4K Service Documentary</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Behind The Scenes</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  5-Hour Full Villa Deep Cleaning &amp; Marble Buffing in Gachibowli
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  Watch our 4-person crew transform an 8,500 sq.ft duplex villa using high-pressure jet washers, Kärcher industrial steam cleaners, and odorless Diversey Taski chemicals.
                </p>

                <div className="pt-2 flex items-center gap-6 text-xs text-slate-300">
                  <div>
                    <strong className="block text-white text-base font-bold">96,400+</strong>
                    <span className="text-slate-400">Views</span>
                  </div>
                  <div>
                    <strong className="block text-white text-base font-bold">4.9 / 5.0</strong>
                    <span className="text-slate-400">Rating</span>
                  </div>
                </div>

                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline pt-2"
                >
                  <span>Watch Full Cleaning Video on YouTube</span>
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
                title: 'Satisfying Sofa Foam Shampoo Extraction 🧼',
                views: '112K Views',
                location: 'Jubilee Hills Home',
                img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-2',
                title: 'Bathroom Hardwater Scale Gone in 10 Mins 🚿',
                views: '184K Views',
                location: 'Gachibowli Flat',
                img: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-3',
                title: 'AC Jet Cleaning Black Sludge Washout ❄️',
                views: '98K Views',
                location: 'Madhapur Skyline',
                img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80'
              },
              {
                id: 'reel-4',
                title: 'Electrician MCB Tripping Short Circuit Fix ⚡',
                views: '76K Views',
                location: 'Kondapur Residence',
                img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
              }
            ].map(reel => (
              <a
                key={reel.id}
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 border border-white/10 shadow-md hover:shadow-2xl transition-all cursor-pointer"
              >
                <img 
                  src={reel.img} 
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1 font-medium">
                  <InstagramIcon className="w-3 h-3 text-pink-400" />
                  <span>{reel.views}</span>
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 inset-x-3 text-white">
                  <div className="text-[10px] text-cyan-400 font-semibold">{reel.location}</div>
                  <h4 className="text-xs font-bold line-clamp-2 mt-0.5 leading-snug">{reel.title}</h4>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* 9. WHY HYDERABAD CHOOSES US / 6-PILLAR GUARANTEE */}
      <section id="guarantee" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Our Promise</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              The OneClick 6-Pillar Quality Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              We take the anxiety out of home maintenance with certified processes, transparent pricing, and comprehensive insurance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: '60-Minute Fast Arrival',
                desc: 'Trained local teams dispatched from micro-hubs across Hyderabad reach your home on time, every time.'
              },
              {
                icon: ShieldCheck,
                title: 'Police & Background Verified',
                desc: 'Every service technician undergoes thorough background checks, Aadhaar verification, and 120 hours of training.'
              },
              {
                icon: Award,
                title: '30-Day Free Rework Warranty',
                desc: 'Not 100% happy with any cleaning or repair? We revisit and redo it completely free within 30 days.'
              },
              {
                icon: Droplets,
                title: 'Medical-Grade Safe Chemicals',
                desc: 'Strictly zero toxic fumes. We use pet and kid-friendly Diversey Taski solutions that leave your home smelling fresh.'
              },
              {
                icon: Layers,
                title: 'Standardized Fixed Rate Card',
                desc: 'No arbitrary bargaining or post-job surprises. Every service has pre-fixed pricing displayed upfront.'
              },
              {
                icon: CheckCircle2,
                title: '₹10,000 Damage Insurance Cover',
                desc: 'Your property is protected with comprehensive accident and accidental damage coverage on all visits.'
              }
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. HYDERABAD LOCALITY COVERAGE */}
      <section id="areas" className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Active Coverage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Active Service Hubs Across Hyderabad
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              We have dedicated van units stationed across Western, Central, and Eastern Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {HYDERABAD_LOCALITIES.map((loc, i) => (
              <div 
                key={i} 
                className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-1.5 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 block truncate">{loc}</span>
                <span className="text-[10px] text-slate-400">Available Now</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS */}
      <section id="reviews" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Patron Experiences</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Trusted by 120,000+ Homes in Hyderabad
            </h2>
            <div className="flex items-center justify-center gap-1 text-amber-500 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="text-xs font-extrabold text-slate-800 ml-1.5">4.8 out of 5.0 on Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_REVIEWS.map(rev => (
              <div key={rev.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={rev.avatar} alt={rev.name} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{rev.name}</h4>
                      <div className="text-[11px] text-slate-500">{rev.area}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 mb-2.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-2">
                      {rev.service}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-4 text-[10px] text-slate-400 font-medium">
                  Verified Booking • {rev.date}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Everything you need to know about booking, chemicals, guarantees, and pricing.
            </p>
          </div>

          <div className="space-y-3">
            {SERVICE_FAQS.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[#0B1528] text-slate-300 py-12 sm:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-lg text-white uppercase tracking-tight">
                  ONECLICK <span className="text-blue-400">SERVICES</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Hyderabad's #1 on-demand facility and home care platform. Deep cleaning, sofa shampooing, painting, pest control &amp; quick repairs.
              </p>
              <div className="text-xs text-slate-400">
                <strong>Helpline:</strong> +91 98765 43210 (24x7)
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Popular Services</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">Full Home Deep Cleaning</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">Sofa &amp; Carpet Shampoo</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">Bathroom Acid-Free Scrub</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">Odorless Cockroach Gel</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer">AC Foam Jet Wash</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Major Hyderabad Hubs</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Jubilee Hills &amp; Banjara Hills</li>
                <li>Gachibowli &amp; Financial District</li>
                <li>Madhapur &amp; Hitec City</li>
                <li>Kondapur, Tellapur &amp; Kokapet</li>
                <li>Kukatpally, Miyapur &amp; Secunderabad</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Emergency Booking</h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Need an emergency plumber, electrician, or same-day house cleaning in Hyderabad?
              </p>
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services, I need emergency home service assistance in Hyderabad.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Instant WhatsApp Dispatch</span>
              </a>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © 2026 OneClick Home Services Hyderabad. All rights reserved. Pure mock demonstration.
            </div>
            <div className="flex items-center gap-4">
              <span>ISO 9001:2015 Certified</span>
              <span>•</span>
              <span>Police Verified Staff</span>
              <span>•</span>
              <span>30-Day Guarantee</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 14. STICKY MOBILE ACTION DOCK */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-around shadow-lg">
        
        <a 
          href={`tel:${cleanCallNumber}`} 
          className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-slate-700 hover:text-blue-600"
        >
          <Phone className="w-4 h-4 text-blue-600" />
          <span>Call Desk</span>
        </a>

        <a 
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hi OneClick Home Services, I would like to book a service in Hyderabad.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-600"
        >
          <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        <button 
          onClick={() => scrollToSection('estimator')}
          className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-slate-700 hover:text-blue-600 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-purple-600" />
          <span>Estimate</span>
        </button>

        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-blue-600 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Book Now</span>
        </button>

      </div>

      {/* 15. INSTANT BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                ⚡ 60-Minute Rapid Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Book Professional Home Service
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Zero advance payment. Pay post inspection after full satisfaction.
              </p>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Booking Dispatched to WhatsApp!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Our dispatch coordinator will confirm your technician assignment within 5 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={bookingForm.name}
                      onChange={e => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Hyderabad Locality *
                    </label>
                    <select
                      value={bookingForm.locality}
                      onChange={e => setBookingForm(prev => ({ ...prev, locality: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      {HYDERABAD_LOCALITIES.map((loc, idx) => (
                        <option key={idx} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Service Type *
                    </label>
                    <select
                      value={bookingForm.service}
                      onChange={e => setBookingForm(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      {HOME_SERVICES_CATALOG.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Home Size *
                    </label>
                    <select
                      value={bookingForm.homeSize}
                      onChange={e => setBookingForm(prev => ({ ...prev, homeSize: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="1 BHK Flat">1 BHK Flat</option>
                      <option value="2 BHK Apartment">2 BHK Apartment</option>
                      <option value="3 BHK Apartment">3 BHK Apartment</option>
                      <option value="4 BHK Villa">4 BHK / Villa</option>
                      <option value="Commercial Office">Commercial Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={bookingForm.timeSlot}
                      onChange={e => setBookingForm(prev => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="⚡ Emergency (Arrive within 60 mins)">⚡ Emergency (Under 60 mins)</option>
                      <option value="09:00 AM – 11:00 AM">09:00 AM – 11:00 AM</option>
                      <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM</option>
                      <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                      <option value="04:00 PM – 06:00 PM">04:00 PM – 06:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Specific Instructions / Landmark
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Near D-Mart, flat 402. AC has water leak, please bring pressure jet."
                    value={bookingForm.notes}
                    onChange={e => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-[16px] sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Confirm Booking &amp; Dispatch Technician</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    🔒 Backed by 30-Day Free Rework Warranty &amp; Police-Verified Staff
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* 16. SHARE CARD MODAL */}
      {isShareModalOpen && (
        <ShareCardModal 
          isOpen={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
          profile={profile} 
        />
      )}

    </div>
  );
}
