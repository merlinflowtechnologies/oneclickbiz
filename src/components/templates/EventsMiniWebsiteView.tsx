'use client';

import React, { useState, useMemo } from 'react';
import { DigitalProfile } from '@/lib/types';
import { 
  Camera, 
  Video, 
  Clock, 
  MapPin, 
  Calendar, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  Sparkles, 
  Phone, 
  Mail, 
  Share2, 
  Download, 
  X, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  ArrowRight, 
  Heart, 
  MessageCircle, 
  Play, 
  PlayCircle, 
  Eye, 
  Users, 
  Award, 
  HelpCircle, 
  Filter, 
  Tag, 
  BadgePercent, 
  ExternalLink, 
  Layers,
  SlidersHorizontal,
  ThumbsUp,
  Image as ImageIcon,
  CheckCircle,
  Copy,
  Info
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface EventsMiniWebsiteViewProps {
  profile?: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (mode: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

// =========================================================================
// 1. DATA CONSTANTS & ALL DIRECTORIES (SnapVibe Events & Photography (Mock Data))
// =========================================================================

export const CITIES_LIST = [
  'Hyderabad', 'Bangalore', 'Mumbai', 'Delhi', 'Noida', 'Gurugram', 'Ghaziabad', 'Faridabad'
];

export const SERVICE_NAV_CATEGORIES = [
  { id: 'photography', name: 'Photography', icon: '📸', active: true },
  { id: 'decoration', name: 'Decoration', icon: '🎈', active: false },
  { id: 'venues', name: 'Venues', icon: '🏛️', active: false },
  { id: 'chef', name: 'Chef for Party', icon: '👨‍🍳', active: false },
  { id: 'food-delivery', name: 'Food Delivery', icon: '🍱', active: false },
  { id: 'catering', name: 'Live Catering', icon: '🍽️', active: false },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭', active: false }
];

export const PHOTOGRAPHY_OCCASIONS = [
  {
    id: 'birthday',
    title: 'Birthday Photography',
    subtitle: '1st birthday cake smash, kids party & milestone birthdays',
    startingPrice: 3600,
    mrp: 4615,
    tag: 'Popular',
    icon: '🎂',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    description: 'Capture genuine smiles, playful moments, cake-cutting excitement, and warm family portraits.'
  },
  {
    id: 'anniversary',
    title: 'Anniversary Photography',
    subtitle: 'Romantic couple portraits, 25th/50th silver & golden jubilees',
    startingPrice: 3600,
    mrp: 4615,
    tag: 'Trending',
    icon: '💍',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    description: 'Celebrate lasting love with intimate couple portraits and joyous gatherings of close relatives.'
  },
  {
    id: 'house-warming',
    title: 'House Warming Photography',
    subtitle: 'Griha Pravesh rituals, Satyanarayan pooja, home interiors',
    startingPrice: 3600,
    mrp: 4615,
    tag: 'Hyderabad Top',
    icon: '🏠',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    description: 'Auspicious havan rituals, milk boiling ceremony, architectural home corners, and blessings.'
  },
  {
    id: 'naming-ceremony',
    title: 'Naming Ceremony (Barasala)',
    subtitle: 'Cradle ceremony, baby close-ups, traditional blessings',
    startingPrice: 3600,
    mrp: 4615,
    tag: 'Family Favorite',
    icon: '👶',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
    description: 'Gentle, natural lighting photography capturing the baby in the decorated cradle with elders.'
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower (Seemantham)',
    subtitle: 'Traditional rituals, mom-to-be radiance & family candids',
    startingPrice: 3600,
    mrp: 4615,
    tag: 'Top Rated',
    icon: '🍼',
    imageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
    description: 'Bangle ceremony rituals, floral swing photos, expectant parents glow, and candid laughter.'
  },
  {
    id: 'engagement',
    title: 'Engagement Photography',
    subtitle: 'Ring exchange, couple aesthetic portraits & family celebration',
    startingPrice: 4000,
    mrp: 5128,
    tag: 'High Demand',
    icon: '💖',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    description: 'Cinematic ring exchange close-ups, romantic candid glances, and vibrant family celebrations.'
  },
  {
    id: 'wedding',
    title: 'Wedding Photography',
    subtitle: 'Muhurtham rituals, bridal portraits, sangeet & reception',
    startingPrice: 5000,
    mrp: 6410,
    tag: 'Premium',
    icon: '👰',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    description: 'Full ceremony coverage, sacred vows, emotional vidaai, and high-fashion couple portraits.'
  },
  {
    id: 'maternity',
    title: 'Maternity Photoshoot',
    subtitle: 'Outdoor garden glow or home studio session with female pro',
    startingPrice: 4000,
    mrp: 5128,
    tag: 'Specialist',
    icon: '🤰',
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
    description: 'Comfort-first maternity portraits celebrating motherhood. Female photographer on request.'
  },
  {
    id: 'newborn',
    title: 'New Born Baby Photography',
    subtitle: 'Safe, warm, cozy infant poses with gentle props',
    startingPrice: 4500,
    mrp: 5750,
    tag: 'Delicate Care',
    icon: '🧸',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    description: 'Certified infant photographers using sanitized wraps, soft beanbags, and soothing setups.'
  },
  {
    id: 'bachelorette',
    title: 'Bachelorette & Cocktail Party',
    subtitle: 'Fun squad portraits, unposed evening candids & party energy',
    startingPrice: 4000,
    mrp: 5128,
    tag: 'Party Vibes',
    icon: '🥂',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    description: 'Dynamic low-light flash photography capturing high spirits, champagne toasts, and friend candids.'
  },
  {
    id: 'haldi-mehndi',
    title: 'Haldi & Mehndi Photography',
    subtitle: 'Vibrant yellow splashes, intricate henna art & playful dance',
    startingPrice: 3800,
    mrp: 4870,
    tag: 'Colorful',
    icon: '🌿',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    description: 'Bursting colors, water splashes, detailed bridal mehndi close-ups, and spontaneous dance candids.'
  },
  {
    id: 'corporate',
    title: 'Corporate Event Photography',
    subtitle: 'Conferences, leadership summits, team galas & headshots',
    startingPrice: 5000,
    mrp: 6410,
    tag: 'Business',
    icon: '🏢',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    description: 'Executive keynotes, audience networking, award distributions, and corporate group photos.'
  }
];

export const STANDARD_PACKAGES = [
  {
    id: 'pkg-traditional',
    name: 'Traditional Photography',
    badge: 'Most Popular for Home Events',
    price: 3600,
    mrp: 4615,
    discount: '22% OFF',
    duration: '2 Hours Base Coverage',
    camera: 'Full-Frame DSLR / Mirrorless (Sony Alpha / Nikon Z)',
    lighting: 'External TTL Speedlight with Diffuser',
    inclusions: [
      '1 Verified Professional Photographer',
      'All RAW Unedited Photos Delivered (200+ photos)',
      '35-40 Expert Color-Graded & Retouched High-Res Photos',
      'Private Cloud Google Drive Link within 48 Hours',
      'Covers posed family groups, rituals & stage photos',
      'Additional hours at just ₹1,200/hr'
    ],
    idealFor: 'Pooja, Cradle ceremony, 1st Birthday, Griha Pravesh & Anniversaries'
  },
  {
    id: 'pkg-candid',
    name: 'Candid Photography',
    badge: 'Artistic & Unposed',
    price: 4000,
    mrp: 5128,
    discount: '22% OFF',
    duration: '2 Hours Base Coverage',
    camera: 'High-Speed Prime Lenses (35mm / 50mm / 85mm f/1.4)',
    lighting: 'Ambient & Natural Light Specialist',
    inclusions: [
      '1 Specialist Candid Storyteller Photographer',
      'Unposed emotional expressions & candid laughter',
      'All RAW photos + 45 Hand-Crafted Artistically Graded Photos',
      'Creative bokeh depth-of-field portraits',
      'Cloud Gallery link delivered within 48-72 Hours',
      'Additional hours at just ₹1,400/hr'
    ],
    idealFor: 'Kids parties, Baby showers, Engagement, Cocktail & Maternity'
  },
  {
    id: 'pkg-pro',
    name: 'Pro Photography',
    badge: 'Complete Premium Coverage',
    price: 5000,
    mrp: 6410,
    discount: '22% OFF',
    duration: '2 Hours Base Coverage',
    camera: 'Flagship Dual-Card Pro Cameras + Dual Lens Kit',
    lighting: 'Off-Camera Flash & Portable Softbox Setup',
    inclusions: [
      '1 Senior Master Photographer (8+ Years Experience)',
      'Dual-setup lighting for magazine-grade portraits',
      'All RAW photos + 60 Ultra-High Definition Retouched Photos',
      'Skin blemish cleanup & color harmonic grading',
      'Priority 24-48 Hour Express Digital Delivery',
      'Additional hours at just ₹1,600/hr'
    ],
    idealFor: 'Grand Weddings, Receptions, High-Profile Events & Fashion Shoots'
  },
  {
    id: 'pkg-video',
    name: 'Cinematic Videography',
    badge: '4K Motion Teaser',
    price: 7000,
    mrp: 8974,
    discount: '22% OFF',
    duration: '3 Hours Base Coverage',
    camera: '4K Cinema Mirrorless (Sony FX3 / A7S III) + Gimbal',
    lighting: 'Continuous LED Video Light + Wireless Mic Kit',
    inclusions: [
      '1 Dedicated Professional Videographer',
      'Ultra-smooth 3-axis motorized gimbal camera moves',
      'Complete Full HD Edited Event Film (15-30 mins)',
      '1-2 Minute Cinematic Instagram Reel / Teaser with Licensed Music',
      'Crystal-clear wireless lapel audio capture for rituals/speeches',
      'Full 4K Master delivered on Google Drive'
    ],
    idealFor: 'Weddings, Sangeet, Engagement, Grand Birthdays & Corporate'
  },
  {
    id: 'pkg-combo',
    name: 'Grand Photo + Video Combo',
    badge: 'Best Value Bundle',
    price: 10500,
    mrp: 13500,
    discount: 'Special Combo',
    duration: '3 Hours Complete Coverage',
    camera: 'Full Photo & 4K Video Dual Crew Equipment',
    lighting: 'Comprehensive Studio Strobe & Continuous Video Lighting',
    inclusions: [
      '2 Crew Members: 1 Lead Photographer + 1 Dedicated Videographer',
      'Complete seamless coordination without missing any ritual',
      'All RAW photos + 60 edited portraits',
      'Full Event Video Film + 90-sec Cinematic Highlights Reel',
      'Complimentary 10 Drone Aerial Photos (if venue permits)',
      'Full Digital Delivery + WhatsApp Shareable Mini-Album'
    ],
    idealFor: 'Full-Scale Milestone Events, Weddings & Luxury Celebrations'
  }
];

export const HYDERABAD_LOCALITIES = [
  'Gachibowli', 'HITEC City', 'Madhapur', 'Kondapur', 'Jubilee Hills', 'Banjara Hills',
  'Kukatpally', 'Miyapur', 'Secunderabad', 'Begumpet', 'Ameerpet', 'Dilsukhnagar',
  'Financial District', 'Chanda Nagar', 'Manikonda', 'Kothapet', 'Attapur', 'Uppal',
  'LB Nagar', 'Nallagandla', 'Tellapur', 'Kompally', 'Bowenpally', 'Alwal', 'Sainikpuri',
  'Tarnaka', 'Himayatnagar', 'Somajiguda', 'Film Nagar', 'Gandipet', 'Mehdipatnam',
  'Tolichowki', 'Nagole', 'Habsiguda', 'Nizampet', 'Hafeezpet', 'Kokapet', 'Nanakramguda'
];

export const OUTDOOR_SHOOT_SPOTS = [
  {
    name: 'Golconda Fort (Golden Hour)',
    type: 'Heritage & Royal Aesthetic',
    bestTime: '4:30 PM - 6:30 PM',
    desc: 'The signature Hyderabad spot for pre-wedding and couple portraits with dramatic historic arches and sunset horizons.',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Durgam Cheruvu & Cable Bridge',
    type: 'Modern Skyline & Water View',
    bestTime: '6:30 AM or 7:00 PM',
    desc: 'Lush waterfront parks combined with stunning illuminated cable bridge views for modern urban romance photoshoots.',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'KBR National Park (Jubilee Hills)',
    type: 'Lush Greenery & Nature',
    bestTime: '6:30 AM - 8:30 AM',
    desc: 'Towering tropical trees, natural stone pathways, and calm green shade ideal for serene maternity & couple shoots.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Taramati Baradari',
    type: 'Medieval Persian Acoustics & Arches',
    bestTime: '5:00 PM - 7:00 PM',
    desc: 'Symmetrical open-air pavilions with scenic hilltop breezes, warm sandstone masonry, and romantic ethnic vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80'
  }
];

export const VERIFIED_REVIEWS = [
  {
    name: 'Pooja Purohit',
    occasion: 'Maternity Photoshoot • Gachibowli',
    rating: 5,
    text: 'Our maternity shoot was wonderful! The photographer was cooperative, kept us motivated and captured every moment well. We specifically asked for a female photographer and she was so gentle and patient.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Vibpri',
    occasion: '1st Birthday & Cake Smash • Jubilee Hills',
    rating: 5,
    text: 'The shoot turned out amazing! Such an eye for detail, and everything felt effortless. The baby was crying initially but the photographer waited patiently and clicked the sweetest smiles. Can’t wait to work with them again.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Bhanupriya Sharma',
    occasion: 'House Warming Pooja • Kondapur',
    rating: 5,
    text: 'Great experience! The photographer was active throughout, photo quality is very good, and he stayed a few extra minutes without rushing us. Best part was booking just for 2 hours instead of paying full day.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Jyoti Singh',
    occasion: 'Baby Shower (Seemantham) • Banjara Hills',
    rating: 5,
    text: 'We love all our amazing photos! The photographer was very polite, guided all our traditional poses, and gave us the best pictures at a fair price. Got the drive link in under 48 hours.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Chitra Karkera',
    occasion: 'Naming Ceremony • Madhapur',
    rating: 5,
    text: 'The photography is amazing, and the price is very reasonable. A really great experience with our photographer overall. Handled the crowd gracefully and captured crisp candid closeups.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Priya Pakhare',
    occasion: 'Engagement Ceremony • Financial District',
    rating: 5,
    text: 'Absolute perfection! Our engagement party was captured so beautifully. Every shot felt authentic, warm and stunning, so naturally. Highly recommend SnapVibe Photography in Hyderabad!',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80'
  }
];

export const FAQS_LIST = [
  {
    q: 'Can I hire a photographer in Hyderabad for just 2 hours?',
    a: 'Yes, absolutely! It is one of our most popular bookings in Hyderabad. You can book one, two, or three hours, see what is included upfront, and confirm online—often even for same-day slots.'
  },
  {
    q: 'Why should I book by the hour instead of a full day?',
    a: 'Most home events—like a cradle ceremony in the morning, a cake cutting in the evening, or a Satyanarayan pooja—only last 2 to 3 hours. Standard photographers charge full-day fees (₹15,000+). With our hourly booking platform, you only pay for the time your event really takes, starting from just ₹3,600.'
  },
  {
    q: 'Can I request a female photographer in Hyderabad?',
    a: 'Yes! For maternity shoots, newborn sessions, ladies sangeet/mehndi, or any session where you prefer greater privacy and comfort, simply tick "Female Photographer" when booking at zero extra charge.'
  },
  {
    q: 'Which areas of Hyderabad do you cover?',
    a: 'We cover all areas of Hyderabad including HITEC City, Gachibowli, Madhapur, Kondapur, Kukatpally, Banjara Hills, Jubilee Hills, Secunderabad, Begumpet, Dilsukhnagar, Chandanagar, Financial District, and over 40 other localities.'
  },
  {
    q: 'What is included in the photography packages?',
    a: 'Every package includes 1 verified professional photographer, coverage for your selected hours, all unedited RAW photos delivered via private Google Drive link, and expertly color-graded, high-resolution retouched photos.'
  },
  {
    q: 'When and how will I receive my photos?',
    a: 'You will receive your private cloud download link within 48 to 72 hours of the shoot. If you need same-day express previews for Instagram or family groups, simply select the Express Delivery option.'
  },
  {
    q: 'How does payment work?',
    a: 'You only pay a small token advance (₹500 - ₹1,000) online to lock your date and assign your photographer. The balance is paid only after the shoot is successfully completed on the day of the event.'
  },
  {
    q: 'Can I book a cameraman or videographer as well?',
    a: 'Yes! You can book our 4K Cinematic Videography package separately or choose the Grand Photo + Video Combo to have a synchronized two-person team covering both still photos and motion video.'
  },
  {
    q: 'What are the best outdoor shoot spots in Hyderabad?',
    a: 'Golconda Fort (especially at golden hour), Durgam Cheruvu Cable Bridge park, Tank Bund/Hussain Sagar, and KBR Park in Jubilee Hills are prime spots. Your assigned photographer will advise on optimal timings and lighting.'
  },
  {
    q: 'Are your event photographers reliable and verified?',
    a: 'Yes. Over 1,00,000 happy families have booked with us, backed by a 4.9-star Google rating from 2,500+ genuine reviews. Every photographer undergoes strict portfolio review, equipment inspection, and background verification before joining our network.'
  }
];


export interface EventSocialMediaItem {
  id: string;
  title: string;
  category: 'Wedding' | 'Birthday' | 'Maternity' | 'Housewarming' | 'BTS';
  type: 'youtube' | 'instagram';
  embedUrl: string;
  thumbnailUrl: string;
  durationOrReel: string;
  views: string;
  likes: string;
  description: string;
  authorOrChannel: string;
}

export const EVENT_SOCIAL_MEDIA_LIST: EventSocialMediaItem[] = [
  {
    id: 'yt_eve_1',
    title: 'Grand Hyderabad Palace Wedding • 4K Cinematic Highlight Film',
    category: 'Wedding',
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '3:45 Min',
    views: '148K views',
    likes: '9.2K likes',
    description: 'Capturing royal Nizami bridal entry, emotional pheras, and fairy-lit outdoor reception in Jubilee Hills.',
    authorOrChannel: 'SnapVibe Cinema Films'
  },
  {
    id: 'yt_eve_2',
    title: "Baby Aadhya's 1st Birthday & Cake Smash • Pure Joy & Laughter",
    category: 'Birthday',
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '2:18 Min',
    views: '86K views',
    likes: '5.4K likes',
    description: 'Unscripted giggles, playful confetti, and heartwarming milestone moments captured in Gachibowli.',
    authorOrChannel: 'SnapVibe Family Moments'
  },
  {
    id: 'yt_eve_3',
    title: 'Sunset Maternity Portrait Teaser • Golconda Fort & Cable Bridge',
    category: 'Maternity',
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581953153664-5eb3c042845c?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '2:52 Min',
    views: '112K views',
    likes: '7.1K likes',
    description: 'Ethereal golden hour radiance against Deccan stone arches, shot with Sony 85mm G-Master prime lens.',
    authorOrChannel: 'SnapVibe Creative Portfolios'
  },
  {
    id: 'yt_eve_4',
    title: 'Behind The Lens: How Our Dual-Camera Crew Shoots a 2-Hour Event',
    category: 'BTS',
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '4:10 Min',
    views: '65K views',
    likes: '4.8K likes',
    description: 'Walkthrough of our Sony A7IV gimbal rigs, wireless Godox lighting, and candid timing secrets.',
    authorOrChannel: 'SnapVibe Tech & Gear'
  },
  {
    id: 'ig_eve_1',
    title: 'Vibrant Yellow Haldi Shower • 1.2M Viral Bridal Reel',
    category: 'Wedding',
    type: 'instagram',
    embedUrl: 'https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '0:45 Reel',
    views: '1.2M plays',
    likes: '94K likes',
    description: 'That ecstatic moment when friends shower fresh yellow marigolds! Captured at 120fps 4K slow motion.',
    authorOrChannel: '@snapvibestudios'
  },
  {
    id: 'ig_eve_2',
    title: 'Traditional Telugu Barasala (Cradle Ceremony) Sweet Rituals',
    category: 'Housewarming',
    type: 'instagram',
    embedUrl: 'https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '0:52 Reel',
    views: '540K plays',
    likes: '48K likes',
    description: 'Blessings from elders and baby wearing the first gold anklets in a decorated traditional wooden cradle.',
    authorOrChannel: '@snapvibestudios'
  },
  {
    id: 'ig_eve_3',
    title: 'Griha Pravesh Milk Boiling & Auspicious Havan in Kokapet',
    category: 'Housewarming',
    type: 'instagram',
    embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '0:38 Reel',
    views: '380K plays',
    likes: '32K likes',
    description: 'Overflowing milk symbolizing abundance, prosperity, and divine blessings for the new villa owners.',
    authorOrChannel: '@snapvibestudios'
  },
  {
    id: 'ig_eve_4',
    title: 'Couple Dance Under Cold Pyro Sparkler Arch • Reception Magic',
    category: 'Wedding',
    type: 'instagram',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    durationOrReel: '0:42 Reel',
    views: '890K plays',
    likes: '76K likes',
    description: 'Indoor cold sparklers lighting up the first dance as guests cheer on the newlyweds in Madhapur.',
    authorOrChannel: '@snapvibestudios'
  }
];

export default function EventsMiniWebsiteView({
  profile,
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: EventsMiniWebsiteViewProps) {
  // City State
  const [selectedCity, setSelectedCity] = useState('Hyderabad');

  // Booking Calculator State
  const [selectedOccasion, setSelectedOccasion] = useState(PHOTOGRAPHY_OCCASIONS[0].id);
  const [selectedPackageId, setSelectedPackageId] = useState('pkg-traditional');
  const [selectedDurationHours, setSelectedDurationHours] = useState(2);
  const [isFemalePhotographerReq, setIsFemalePhotographerReq] = useState(false);
  const [isDroneAddon, setIsDroneAddon] = useState(false);
  const [isAlbumAddon, setIsAlbumAddon] = useState(false);
  const [localitySearch, setLocalitySearch] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('Gachibowli');
  const [eventDate, setEventDate] = useState('2026-10-25');
  const [eventTimeSlot, setEventTimeSlot] = useState('Morning (10:00 AM - 12:00 PM)');

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('Kishore Reddy');
  const [bookingPhone, setBookingPhone] = useState('+91 98765 43210');
  const [bookingNotes, setBookingNotes] = useState('Home function pooja followed by cake cutting.');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('SNAP150');
  const [couponCopied, setCouponCopied] = useState(false);

  // Gallery Filter State & Lightbox
  const [galleryCategory, setGalleryCategory] = useState<'all' | 'maternity' | 'newborn' | 'wedding' | 'birthday' | 'housewarming'>('all');
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  // FAQs Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Share Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
    // YouTube & Instagram Space State
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'youtube' | 'instagram'>('all');
  const [activeMediaItem, setActiveMediaItem] = useState<EventSocialMediaItem>(EVENT_SOCIAL_MEDIA_LIST[0]);
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [customMediaError, setCustomMediaError] = useState<string | null>(null);

  const handleCustomMediaPlay = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomMediaError(null);
    if (!customMediaUrl.trim()) return;

    // Check YouTube
    const ytMatch = customMediaUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch && ytMatch[1]) {
      setActiveMediaItem({
        id: 'custom_' + Date.now(),
        title: 'Custom YouTube Video (' + ytMatch[1] + ')',
        category: 'BTS',
        type: 'youtube',
        embedUrl: 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        durationOrReel: 'Custom',
        views: 'Live Stream',
        likes: 'Playing Now',
        description: 'Playing custom YouTube video directly inside the page without redirecting.',
        authorOrChannel: 'YouTube Stream'
      });
      setCustomMediaUrl('');
      const el = document.getElementById('media-theater');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Check Instagram Reel
    if (customMediaUrl.includes('instagram.com/reel/') || customMediaUrl.includes('instagram.com/p/')) {
      const cleanReel = customMediaUrl.split('instagram.com/reel/')[1]?.split('/')[0]?.split('?')[0] ||
                        customMediaUrl.split('instagram.com/p/')[1]?.split('/')[0]?.split('?')[0];
      if (cleanReel) {
        setActiveMediaItem({
          id: 'custom_ig_' + Date.now(),
          title: 'Custom Instagram Reel (' + cleanReel + ')',
          category: 'Wedding',
          type: 'instagram',
          embedUrl: 'https://www.instagram.com/reel/' + cleanReel + '/embed',
          thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          durationOrReel: 'Custom Reel',
          views: 'Trending',
          likes: 'Live',
          description: 'Playing custom Instagram reel directly inside the page.',
          authorOrChannel: '@instagram_creator'
        });
        setCustomMediaUrl('');
        const el = document.getElementById('media-theater');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setCustomMediaError('Please enter a valid YouTube link (watch/shorts) or Instagram reel link.');
  };

  const [activeServiceTab, setActiveServiceTab] = useState<'decor' | 'catering' | 'venues' | 'entertainment'>('decor');

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Active package details
  const activePackage = useMemo(() => {
    return STANDARD_PACKAGES.find(p => p.id === selectedPackageId) || STANDARD_PACKAGES[0];
  }, [selectedPackageId]);

  // Active occasion details
  const activeOccasion = useMemo(() => {
    return PHOTOGRAPHY_OCCASIONS.find(o => o.id === selectedOccasion) || PHOTOGRAPHY_OCCASIONS[0];
  }, [selectedOccasion]);

  // Dynamic Price Calculation
  const calculatedPrice = useMemo(() => {
    let base = activePackage.price;
    // Extra hours over 2
    if (selectedDurationHours > 2) {
      const extraHours = selectedDurationHours - 2;
      const ratePerHour = activePackage.id === 'pkg-traditional' ? 1200 : activePackage.id === 'pkg-candid' ? 1400 : 1600;
      base += extraHours * ratePerHour;
    } else if (selectedDurationHours === 1) {
      base = Math.round(base * 0.7); // 1-hour special rate
    }

    if (isDroneAddon) base += 3500;
    if (isAlbumAddon) base += 2500;

    // Apply ₹150 coupon discount
    const discounted = Math.max(0, base - 150);
    return {
      subtotal: base,
      discount: 150,
      total: discounted
    };
  }, [activePackage, selectedDurationHours, isDroneAddon, isAlbumAddon]);

  const handleCopyCoupon = () => {
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 3000);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingSuccess(true);
  };

  // Gallery items
  const GALLERY_SAMPLES = [
    {
      id: 'g1',
      title: 'Maternity Golden Hour Glow',
      category: 'maternity',
      img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      location: 'KBR Park, Jubilee Hills'
    },
    {
      id: 'g2',
      title: 'Newborn Cozy Floral Nest',
      category: 'newborn',
      img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      location: 'Home Studio, Gachibowli'
    },
    {
      id: 'g3',
      title: '1st Birthday Cake Smash Joy',
      category: 'birthday',
      img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      location: 'Society Club House, Kondapur'
    },
    {
      id: 'g4',
      title: 'Traditional Wedding Muhurtham Ritual',
      category: 'wedding',
      img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      location: 'Novotel HICC, HITEC City'
    },
    {
      id: 'g5',
      title: 'Griha Pravesh Sacred Havan Ritual',
      category: 'housewarming',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      location: 'My Home Bhooja, Madhapur'
    },
    {
      id: 'g6',
      title: 'Pre-Wedding Sunset at Golconda',
      category: 'wedding',
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      location: 'Golconda Fort, Hyderabad'
    },
    {
      id: 'g7',
      title: 'Motherhood Serenade',
      category: 'maternity',
      img: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      location: 'Botanical Garden, Kondapur'
    },
    {
      id: 'g8',
      title: 'Baby Cradle Ceremony Barasala',
      category: 'newborn',
      img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      location: 'Banjara Hills, Hyderabad'
    }
  ];

  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'all') return GALLERY_SAMPLES;
    return GALLERY_SAMPLES.filter(g => g.category === galleryCategory);
  }, [galleryCategory]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 font-sans selection:bg-[#E94E77] selection:text-white pb-20">
      
      {/* =========================================================================
          1. TOP UTILITY & COUPON ANNOUNCEMENT STRIP
         ========================================================================= */}
      <div className="bg-[#18181B] text-slate-300 text-[11px] font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Offer: ₹150 OFF Auto-Applied with code: SNAP150</span>
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400">
              🎁 Free Digital Event Invite worth ₹500 included with all bookings!
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20book%20a%20photographer%20in%20Hyderabad%20with%20SNAP150%20discount" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Expert WhatsApp Support</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href="tel:+919876543210" className="hover:text-white flex items-center gap-1 transition">
              <Phone className="w-3 h-3 text-[#E94E77]" />
              <span>+91 98765 43210</span>
            </a>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN STICKY BRAND NAVBAR
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-2.5 cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E94E77] via-[#D81B60] to-[#880E4F] flex items-center justify-center text-white shadow-md shadow-pink-500/20">
                <Camera className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight text-slate-900 flex items-center">
                  SnapVibe<span className="text-[#E94E77]">.</span>
                  <span className="text-xs font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-pink-50 text-[#E94E77] ml-1.5 tracking-wider border border-pink-200">
                    Services
                  </span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 block -mt-1 tracking-wider uppercase">
                  Verified Event Photographers
                </span>
              </div>
            </div>

            {/* City Dropdown Selector */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#E94E77]" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-900 font-extrabold"
              >
                {CITIES_LIST.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Main Navigation Links (All fully working with smooth scroll) */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('occasions-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Occasions
            </button>
            <button
              onClick={() => scrollToSection('packages-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Packages &amp; Rates
            </button>
            <button
              onClick={() => scrollToSection('instant-booking-calculator')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer flex items-center gap-1"
            >
              <span className="text-[#E94E77]">⚡</span>
              <span>Calculator</span>
            </button>
            <button
              onClick={() => scrollToSection('why-hourly-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Why Hourly
            </button>
            <button
              onClick={() => scrollToSection('hyderabad-spots-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Shoot Spots
            </button>
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('media-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer flex items-center gap-1"
            >
              <span>🎬</span>
              <span>Videos &amp; Reels</span>
            </button>
            <button
              onClick={() => scrollToSection('media-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer font-bold text-pink-600"
            >
              <span>🎬</span> Videos &amp; Reels
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#E94E77] hover:bg-pink-50 transition cursor-pointer"
            >
              FAQs
            </button>
            <button
              onClick={() => setIsServicesModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer flex items-center gap-1"
            >
              <span>🎈</span>
              <span>More Services</span>
            </button>
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            {profile && (
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('instant-booking-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-pink-500/25 transition cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book from 2 Hrs</span>
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2B. MOBILE NAVIGATION DRAWER & QUICK JUMP SUBNAV STRIP
         ========================================================================= */}
      {/* Mobile Slide-Down Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xl px-4 py-4 space-y-3 sticky top-16 sm:top-18 z-39 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Navigation Menu</span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-[#E94E77]" />
              <span>City: {selectedCity}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => scrollToSection('occasions-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>🎂</span> Occasions
            </button>
            <button
              onClick={() => scrollToSection('packages-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>🏷️</span> Packages
            </button>
            <button
              onClick={() => scrollToSection('instant-booking-calculator')}
              className="p-2.5 rounded-xl bg-pink-50 text-[#E94E77] text-left font-black flex items-center gap-2 transition cursor-pointer border border-pink-200"
            >
              <span>⚡</span> Live Calculator
            </button>
            <button
              onClick={() => scrollToSection('why-hourly-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>⚖️</span> Why Hourly
            </button>
            <button
              onClick={() => scrollToSection('hyderabad-spots-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>📸</span> Shoot Spots
            </button>
            <button
              onClick={() => scrollToSection('localities-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>📍</span> 50+ Localities
            </button>
            <button
              onClick={() => scrollToSection('portfolio-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>🖼️</span> Portfolio
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>⭐</span> 4.9★ Reviews
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-pink-50 text-left text-slate-800 flex items-center gap-2 transition cursor-pointer"
            >
              <span>❓</span> 15 FAQs
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsServicesModalOpen(true);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-left font-black flex items-center gap-2 transition cursor-pointer border border-emerald-200"
            >
              <span>🎈</span> More Services
            </button>
          </div>
          <div className="pt-2 flex items-center gap-2">
            <a
              href="tel:+919876543210"
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5" /> Call Studio
            </a>
            <a
              href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20hire%20a%20photographer%20in%20Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
            </a>
          </div>
        </div>
      )}

      {/* Quick Jump Sub-Navigation Strip (Visible on all devices for 1-tap jump) */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-2xs sticky top-16 sm:top-18 z-30 py-2.5 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold">
          <span className="text-slate-400 uppercase tracking-wider text-[10px] whitespace-nowrap font-extrabold flex items-center gap-1 pr-1">
            <span>⚡</span> Quick Nav:
          </span>
          <button
            onClick={() => scrollToSection('occasions-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            🎂 12 Occasions
          </button>
          <button
            onClick={() => scrollToSection('packages-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            🏷️ Hourly Packages
          </button>
          <button
            onClick={() => scrollToSection('instant-booking-calculator')}
            className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#E94E77] border border-pink-200 whitespace-nowrap transition cursor-pointer font-extrabold shadow-2xs flex items-center gap-1"
          >
            <span>⚡</span> Price Calculator
          </button>
          <button
            onClick={() => scrollToSection('why-hourly-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            ⚖️ 2-Hr vs Full Day
          </button>
          <button
            onClick={() => scrollToSection('hyderabad-spots-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            📸 Shoot Spots
          </button>
          <button
            onClick={() => scrollToSection('localities-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            📍 50+ Localities
          </button>
          <button
            onClick={() => scrollToSection('portfolio-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            🖼️ Portfolio Gallery
          </button>
          <button
            onClick={() => scrollToSection('media-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs flex items-center gap-1 font-extrabold text-pink-600"
          >
            <span>🎬</span> Video Lounge
          </button>
          <button
            onClick={() => scrollToSection('reviews-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            ⭐ 4.9★ Reviews
          </button>
          <button
            onClick={() => scrollToSection('faqs-section')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-pink-50 hover:text-[#E94E77] text-slate-700 whitespace-nowrap transition cursor-pointer shadow-2xs"
          >
            ❓ 15 FAQs
          </button>
          <button
            onClick={() => setIsServicesModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap transition cursor-pointer font-extrabold shadow-2xs flex items-center gap-1"
          >
            <span>🎈</span> Decor &amp; Catering
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. HERO BANNER SECTION (Headline & Trust Proof)
         ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#FFF0F5] via-[#FFF5F8] to-[#FDFDFD] pt-10 pb-16 px-4 border-b border-pink-100">
        
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-pink-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 text-center relative z-10">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-bold shadow-xs border border-pink-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#E94E77] font-extrabold">{selectedCity} Verified</span>
            <span className="text-slate-300">&bull;</span>
            <span>Available in Gachibowli, HITEC City, Jubilee Hills &amp; 40+ Localities</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Photographers in {selectedCity}, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#E94E77] via-[#D81B60] to-[#880E4F] bg-clip-text text-transparent">
                Book from 2 Hours
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Hire verified photographers in {selectedCity} for two hours or your whole event. Small home poojas, birthdays, weddings, studio shoots &amp; female photographers on request.
            </p>
          </div>

          {/* Search Bar / Occasion Picker */}
          <div className="max-w-xl mx-auto bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl border border-pink-200/80 flex items-center gap-2">
            <div className="flex items-center gap-2 pl-3 text-slate-400">
              <Search className="w-4 h-4 text-[#E94E77]" />
            </div>
            <input
              type="text"
              value={localitySearch}
              onChange={(e) => setLocalitySearch(e.target.value)}
              placeholder="Search your Hyderabad locality e.g. Gachibowli, Kondapur, Banjara Hills..."
              className="flex-1 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none bg-transparent"
            />
            <button
              onClick={() => {
                const el = document.getElementById('instant-booking-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer shrink-0"
            >
              Explore
            </button>
          </div>

          {/* Trust Pillars Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E94E77] flex items-center justify-center shrink-0 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">From 2 Hours</span>
                <span className="text-[10px] text-slate-500 font-medium">No full-day trap</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">1,000+ Verified</span>
                <span className="text-[10px] text-slate-500 font-medium">Reviewed portfolios</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">From ₹3,600/-</span>
                <span className="text-[10px] text-slate-500 font-medium">Fixed transparent price</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-xs flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">
                <Star className="w-5 h-5 fill-purple-600 text-purple-600" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">4.9★ Google</span>
                <span className="text-[10px] text-slate-500 font-medium">2,500+ happy reviews</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. OCCASIONS SHOWCASE CAROUSEL & CARDS (12 Photography Occasions)
         ========================================================================= */}
      <section id="occasions-section" className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E94E77] text-xs font-bold mb-1.5 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Photography for Every Occasion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Select Your Occasion in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Every occasion is uniquely curated with specialist photographers and tailored props.
            </p>
          </div>

          <span className="text-xs font-bold text-[#E94E77] hover:underline cursor-pointer">
            Explore All 12 Occasions ➔
          </span>
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PHOTOGRAPHY_OCCASIONS.map((occ) => {
            const isSelected = selectedOccasion === occ.id;
            return (
              <div
                key={occ.id}
                onClick={() => {
                  setSelectedOccasion(occ.id);
                  const el = document.getElementById('instant-booking-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`rounded-3xl bg-white border transition cursor-pointer overflow-hidden group flex flex-col justify-between shadow-xs hover:shadow-lg ${
                  isSelected ? 'border-[#E94E77] ring-2 ring-pink-500/20' : 'border-slate-200 hover:border-pink-300'
                }`}
              >
                {/* Image & Tag */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={occ.imageUrl}
                    alt={occ.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-slate-900 uppercase tracking-wider">
                        {occ.icon} {occ.tag}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-white drop-shadow-sm">
                        {occ.title}
                      </h3>
                      <span className="text-[11px] text-pink-200 block truncate font-medium">
                        {occ.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details & Price Footer */}
                <div className="p-4 space-y-3">
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {occ.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">Starting from</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-black text-slate-900 font-mono">
                          ₹{occ.startingPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{occ.mrp.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button className="px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-[#E94E77] text-[#E94E77] hover:text-white font-extrabold text-[11px] transition cursor-pointer">
                      View Details ➔
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          5. STANDARD PACKAGES SHOWCASE (Traditional, Candid, Pro, Video, Combo)
         ========================================================================= */}
      <section id="packages-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E94E77] text-xs font-bold border border-pink-200">
            <Tag className="w-3.5 h-3.5" />
            <span>Standard Packages &bull; Transparent Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Pick the Package that Fits Your Occasion
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every package can be customized to your event's exact length and theme. Pay a small advance, balance only after the shoot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {STANDARD_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`rounded-3xl bg-white p-5 border transition cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl relative ${
                  isSelected 
                    ? 'border-[#E94E77] ring-2 ring-pink-500/25 bg-pink-50/10' 
                    : 'border-slate-200 hover:border-pink-300'
                }`}
              >
                {/* Top Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-pink-50 text-[#E94E77] border border-pink-200">
                      {pkg.discount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {pkg.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {pkg.name}
                    </h3>
                    <span className="text-[10px] font-bold text-pink-600 block mt-0.5">
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="py-2 border-y border-slate-100 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{pkg.mrp.toLocaleString()}
                    </span>
                  </div>

                  {/* Camera Gear Specs */}
                  <div className="text-[10px] text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <strong className="text-slate-700">Gear:</strong> {pkg.camera}
                    </div>
                    <div>
                      <strong className="text-slate-700">Lights:</strong> {pkg.lighting}
                    </div>
                  </div>

                  {/* Inclusions Bullet List */}
                  <div className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => {
                      setSelectedPackageId(pkg.id);
                      const el = document.getElementById('instant-booking-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#E94E77] text-white shadow-md shadow-pink-500/25'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isSelected ? 'Selected Package ✓' : 'Select Package'}
                  </button>
                  <span className="text-[10px] text-slate-400 block text-center font-medium">
                    {pkg.idealFor}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE HOURLY COST CALCULATOR & BOOKING WIZARD
         ========================================================================= */}
      <section id="instant-booking-calculator" className="max-w-6xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-white to-pink-50/40 p-6 sm:p-10 border-2 border-pink-200 shadow-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E94E77] text-white text-xs font-bold mb-2 shadow-xs">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Instant Cost Calculator &bull; Book in 3 Steps</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Customize Your Shoot in {selectedCity}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pick your hours, add-ons, and location. See your exact transparent price with ₹150 coupon auto-applied.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-pink-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E94E77] flex items-center justify-center font-black text-sm">
                %
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Auto Coupon Applied</span>
                <span className="text-xs font-black text-slate-900 font-mono">SNAP150 (-₹150 OFF)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Form: Wizard Options */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Occasion */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#E94E77] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Select Occasion</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PHOTOGRAPHY_OCCASIONS.slice(0, 6).map(o => (
                    <button
                      key={o.id}
                      onClick={() => setSelectedOccasion(o.id)}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer text-xs font-bold flex items-center gap-2 ${
                        selectedOccasion === o.id
                          ? 'bg-pink-50 border-[#E94E77] text-[#E94E77] shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-pink-200'
                      }`}
                    >
                      <span>{o.icon}</span>
                      <span className="truncate">{o.title.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Duration in Hours */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#E94E77] text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Select Duration: {selectedDurationHours} Hours</span>
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600">
                    {selectedDurationHours === 2 ? 'Sweet Spot for Home Events' : `${selectedDurationHours} Hours Slot`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 6, 8].map(h => (
                    <button
                      key={h}
                      onClick={() => setSelectedDurationHours(h)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
                        selectedDurationHours === h
                          ? 'bg-[#E94E77] text-white border-[#E94E77] shadow-md shadow-pink-500/20'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-pink-200'
                      }`}
                    >
                      {h} Hr{h > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Package Style */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#E94E77] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Select Package Type</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {STANDARD_PACKAGES.slice(0, 4).map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPackageId(p.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        selectedPackageId === p.id
                          ? 'bg-pink-50 border-[#E94E77] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-pink-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs font-black">
                        <span className={selectedPackageId === p.id ? 'text-[#E94E77]' : 'text-slate-900'}>
                          {p.name.split(' ')[0]}
                        </span>
                        <span className="font-mono text-slate-800">₹{p.price}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{p.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Special Add-ons */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                  Optional Preferences &amp; Add-ons:
                </span>
                
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-pink-200 transition">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isFemalePhotographerReq}
                        onChange={(e) => setIsFemalePhotographerReq(e.target.checked)}
                        className="rounded text-[#E94E77] focus:ring-pink-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Female Photographer on Request</span>
                        <span className="text-[10px] text-slate-500">Recommended for maternity, newborn &amp; ladies functions</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-600 uppercase">FREE</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-pink-200 transition">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isDroneAddon}
                        onChange={(e) => setIsDroneAddon(e.target.checked)}
                        className="rounded text-[#E94E77] focus:ring-pink-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">4K Drone Aerial Coverage</span>
                        <span className="text-[10px] text-slate-500">Cinematic top-down flyover videos &amp; venue aerial shots</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">+₹3,500</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-pink-200 transition">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isAlbumAddon}
                        onChange={(e) => setIsAlbumAddon(e.target.checked)}
                        className="rounded text-[#E94E77] focus:ring-pink-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Hardcover Glossy Photobook Album (30 Pages)</span>
                        <span className="text-[10px] text-slate-500">Premium lay-flat album delivered to your doorstep</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">+₹2,500</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Summary: Live Order Quote */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Booking Summary
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                    Slot Available
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Occasion:</span>
                    <strong className="text-slate-900">{activeOccasion.title}</strong>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Package:</span>
                    <strong className="text-slate-900">{activePackage.name}</strong>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Duration:</span>
                    <strong className="text-slate-900">{selectedDurationHours} Hours Coverage</strong>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>City &amp; Area:</span>
                    <strong className="text-slate-900">{selectedCity} ({selectedLocality})</strong>
                  </div>

                  {isFemalePhotographerReq && (
                    <div className="flex justify-between text-pink-600 font-bold">
                      <span>Female Pro Request:</span>
                      <span>Assigned ✓</span>
                    </div>
                  )}

                  {isDroneAddon && (
                    <div className="flex justify-between text-slate-600">
                      <span>4K Drone Shoot:</span>
                      <span className="font-mono">+₹3,500</span>
                    </div>
                  )}

                  {isAlbumAddon && (
                    <div className="flex justify-between text-slate-600">
                      <span>Hardcover Album:</span>
                      <span className="font-mono">+₹2,500</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-600">
                    <span>Estimated Subtotal:</span>
                    <span className="font-mono font-bold text-slate-800">₹{calculatedPrice.subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Special Coupon (SNAP150):</span>
                    <span className="font-mono">- ₹150</span>
                  </div>

                  <div className="pt-3 border-t-2 border-dashed border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Final Payable Amount</span>
                      <span className="text-2xl font-black text-[#E94E77] font-mono">
                        ₹{calculatedPrice.total.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                      Pay ₹500 advance now
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setIsBookingSuccess(false);
                      setIsBookingModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Proceed to Book Photographer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919876543210?text=Hi,%20I%20want%20to%20book%20a%20photographer%20in%20${selectedCity}%20for%20${encodeURIComponent(activeOccasion.title)}%20(${selectedDurationHours}%20Hours)%20at%20${encodeURIComponent(selectedLocality)}.%20Estimated%20Price:%20₹${calculatedPrice.total}%20with%20SNAP150%20code.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2 border border-emerald-200"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Book on WhatsApp with ₹150 Discount</span>
                  </a>
                </div>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  🔒 100% Secure &bull; Pay balance after the shoot &bull; Free date reschedule
                </p>
              </div>

              {/* Free Invite Worth ₹500 Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white space-y-2 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">Free Digital Invite &bull; ₹500 Value</span>
                  <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-bold">100% Free</span>
                </div>
                <p className="text-[11px] text-amber-100 leading-snug">
                  Get a personalized digital event webpage with RSVP tracking, photo guest notes, and WhatsApp sharing!
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. "WHY A 2-HOUR EVENT SHOULDN'T COST A FULL DAY" (Hourly Value Proposition)
         ========================================================================= */}
      <section id="why-hourly-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-[#18181B] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#E94E77] bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              The On-Demand Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Why a Two-Hour Event Shouldn't Cost You a Full Day
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Think about a first birthday, a naming ceremony, or a newborn session. None of them usually runs past a couple of hours, yet the standard answer from most photographers is a full-day package, so you end up paying for hours nobody uses. Booking by the hour fixes that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            {/* The Old Way */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-rose-400 font-bold text-xs">
                <span>TRADITIONAL FREELANCERS</span>
                <span>❌ Outdated Model</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Forces full-day minimum rates starting at ₹15,000 to ₹25,000.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Takes 3 to 7 days just to send a quote over WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Unverified portfolios—you never know who will turn up on the day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Demands 100% payment before handing over your photo files.</span>
                </li>
              </ul>
            </div>

            {/* The Hourly Way */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-950/40 via-slate-900 to-slate-900 border border-pink-500/40 space-y-4">
              <div className="flex items-center justify-between text-[#E94E77] font-bold text-xs">
                <span>SNAPVIBE HOURLY PHOTOGRAPHY</span>
                <span>✓ Modern &amp; Transparent</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Book from 2 hours starting at ₹3,600. Pay only for the time you need.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant upfront pricing online. Book in under 60 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% verified independent pros with reviewed portfolios and equipment checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pay small advance to confirm; balance only after the shoot is done!</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. OUTDOOR SHOOT SPOTS IN HYDERABAD
         ========================================================================= */}
      <section id="hyderabad-spots-section" className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E94E77] text-xs font-bold mb-1.5 border border-pink-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>Iconic Locations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Top Outdoor Shoot Spots in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              From majestic Golconda Fort at sunset to scenic cable bridge views, our photographers know the best lighting angles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OUTDOOR_SHOOT_SPOTS.map((spot, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white">
                  🕒 {spot.bestTime}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-[#E94E77] block">
                  {spot.type}
                </span>
                <h4 className="text-sm font-black text-slate-900">
                  {spot.name}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                  {spot.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. HYDERABAD LOCALITIES DIRECTORY (50+ Areas Covered)
         ========================================================================= */}
      <section id="localities-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1.5 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Doorstep Service Across Hyderabad</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Hyderabad Localities We Cover
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified photographers available within 30-45 minutes in all major residential &amp; IT colonies.
              </p>
            </div>

            <span className="text-xs font-bold text-slate-400">
              {HYDERABAD_LOCALITIES.length}+ Localities Active Today
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {HYDERABAD_LOCALITIES.map((loc, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedLocality(loc);
                  const el = document.getElementById('instant-booking-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  selectedLocality === loc
                    ? 'bg-[#E94E77] text-white border-[#E94E77] shadow-xs'
                    : 'bg-slate-50 hover:bg-pink-50 text-slate-700 border-slate-200 hover:border-pink-300'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. PORTFOLIO GALLERY LIGHTBOX (High-Res Samples)
         ========================================================================= */}
      <section id="portfolio-section" className="max-w-7xl mx-auto px-4 py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#E94E77] text-xs font-bold mb-1.5 border border-pink-200">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Real Hyderabad Event Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sample Work from Real {selectedCity} Events
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Click any image to view full resolution. We pride ourselves on genuine, un-staged client memories.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'maternity', label: 'Maternity' },
              { id: 'newborn', label: 'Newborn' },
              { id: 'wedding', label: 'Weddings' },
              { id: 'birthday', label: 'Birthdays' },
              { id: 'housewarming', label: 'Housewarming' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setGalleryCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  galleryCategory === cat.id
                    ? 'bg-[#E94E77] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxImg(item.img)}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-black uppercase text-pink-300">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
                <span className="text-[10px] text-slate-300 mt-0.5">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          11. CUSTOMER REVIEWS & GOOGLE RATINGS (4.9★, 2,500+ Verified Client Reviews)
         ========================================================================= */}
      
      {/* =========================================================================
          10.5 YOUTUBE & INSTAGRAM SOCIAL MEDIA WATCH SPACE (Able to play directly on page)
         ========================================================================= */}
      <section id="media-section" className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-50 to-pink-50 text-rose-600 text-xs font-extrabold mb-2 border border-rose-200 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <YouTubeIcon className="w-4 h-4 fill-[#FF0000]" />
              <InstagramIcon className="w-3.5 h-3.5 fill-[#E1306C]" />
              <span>Live Social Media Watch Lounge &bull; Play Right Here</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Watch Our Real Shoots &amp; Viral Reels</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Experience the cinematic magic of our Hyderabad shoots. Stream 4K wedding films, joyful 1st birthday cake smashes, and trending Instagram reels directly on this page without opening any external app.
            </p>
          </div>

          {/* Media Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveMediaFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeMediaFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Media ({EVENT_SOCIAL_MEDIA_LIST.length})
            </button>
            <button
              onClick={() => setActiveMediaFilter('youtube')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeMediaFilter === 'youtube'
                  ? 'bg-red-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <YouTubeIcon className="w-3.5 h-3.5 fill-current" />
              <span>YouTube Films</span>
            </button>
            <button
              onClick={() => setActiveMediaFilter('instagram')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeMediaFilter === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5 fill-current" />
              <span>Instagram Reels</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            FEATURED VIDEO THEATER (Direct In-Page Player)
           ========================================================================= */}
        <div id="media-theater" className="bg-slate-950 rounded-3xl p-4 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono font-bold tracking-wider text-rose-400 uppercase text-[11px]">
                NOW PLAYING IN HD THEATER:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-extrabold text-[10px] uppercase">
                {activeMediaItem.type === 'youtube' ? 'YouTube 4K' : 'Instagram Reel'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>Channel: <strong className="text-white">{activeMediaItem.authorOrChannel}</strong></span>
              <span>&bull;</span>
              <span>{activeMediaItem.views}</span>
              <span>&bull;</span>
              <span className="text-pink-400">{activeMediaItem.likes}</span>
            </div>
          </div>

          {/* Cinema Frame Iframe */}
          <div className="relative aspect-video sm:aspect-[21/9] lg:aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
            {activeMediaItem.type === 'youtube' ? (
              <iframe
                src={activeMediaItem.embedUrl}
                title={activeMediaItem.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <iframe
                src={activeMediaItem.embedUrl}
                title={activeMediaItem.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>

          {/* Under-Player Metadata & Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 font-black text-[11px] uppercase tracking-wider">
                  {activeMediaItem.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">Duration: {activeMediaItem.durationOrReel}</span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                {activeMediaItem.title}
              </h3>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                {activeMediaItem.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('instant-booking-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-2xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book This Style (from ₹3,600)</span>
              </button>
            </div>
          </div>

        </div>

        {/* =========================================================================
            PLAYLIST VIDEO GRID (Click any to play in theater above)
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-[#E94E77]" />
              <span>Select Shoot Film to Play on Screen:</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">
              Click any card to load video in the theater
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EVENT_SOCIAL_MEDIA_LIST
              .filter(item => activeMediaFilter === 'all' || item.type === activeMediaFilter)
              .map(item => {
                const isSelected = activeMediaItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveMediaItem(item);
                      const el = document.getElementById('media-theater');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`group relative rounded-2xl overflow-hidden border p-3 transition cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-pink-50/80 border-[#E94E77] ring-2 ring-[#E94E77]/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-pink-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Thumbnail with overlay icon */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition transform group-hover:scale-110 ${
                          item.type === 'youtube'
                            ? 'bg-red-600 text-white'
                            : 'bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 text-white'
                        }`}>
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Top platform badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white">
                        {item.type === 'youtube' ? (
                          <YouTubeIcon className="w-3 h-3 fill-red-500" />
                        ) : (
                          <InstagramIcon className="w-3 h-3 fill-pink-500" />
                        )}
                        <span>{item.type === 'youtube' ? 'YouTube' : 'Reel'}</span>
                      </div>

                      {/* Duration Pill */}
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[9px] font-bold text-white">
                        {item.durationOrReel}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                        <span>{item.authorOrChannel}</span>
                        <span className="text-[#E94E77] font-bold">{item.views}</span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2 group-hover:text-[#E94E77] transition">
                        {item.title}
                      </h5>
                    </div>

                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">{item.category}</span>
                      <span className={`transition ${isSelected ? 'text-[#E94E77]' : 'text-slate-500 group-hover:text-slate-900'}`}>
                        {isSelected ? '● Playing Now' : 'Click to Play ➔'}
                      </span>
                    </div>

                  </div>
                );
              })}
          </div>
        </div>

        {/* =========================================================================
            CUSTOM LINK EMBEDDER (Let users paste ANY YouTube or Instagram link to play here)
           ========================================================================= */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                📺
              </div>
              <div>
                <h4 className="font-black text-white text-base tracking-tight">
                  Play Any YouTube Video or Instagram Reel Here
                </h4>
                <p className="text-xs text-slate-300">
                  Have a specific reference shoot or reel in mind? Paste the link below to preview it directly in our cinema theater.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold shrink-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition"
              >
                <InstagramIcon className="w-3.5 h-3.5 fill-pink-400" />
                <span>Instagram @snapvibestudios</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition"
              >
                <YouTubeIcon className="w-3.5 h-3.5 fill-red-500" />
                <span>YouTube Channel</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleCustomMediaPlay} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={customMediaUrl}
                onChange={(e) => setCustomMediaUrl(e.target.value)}
                placeholder="Paste YouTube or Instagram link (e.g. https://www.youtube.com/watch?v=XHOmBV4js_E)"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white/15 transition font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E94E77] to-pink-600 hover:from-[#D81B60] hover:to-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Now on Screen</span>
            </button>
          </form>

          {customMediaError && (
            <p className="text-xs text-rose-300 font-bold bg-rose-950/60 p-2.5 rounded-xl border border-rose-800">
              ⚠️ {customMediaError}
            </p>
          )}
        </div>

      </section>

      <section id="reviews-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-br from-white to-pink-50/30 p-8 sm:p-12 border border-pink-200 shadow-sm space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-pink-100">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#E94E77] block mb-1">
                Google Reviews &bull; Verified Experiences
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Loved by Thousands of Happy Families
              </h2>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-pink-200 shadow-xs">
              <div className="text-3xl font-black text-slate-900 font-mono">4.9</div>
              <div>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500 block mt-0.5">
                  Over 2,500+ Google Reviews
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border border-pink-200"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{rev.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {rev.occasion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          12. COMPREHENSIVE HYDERABAD PHOTOGRAPHY FAQS ACCORDION
         ========================================================================= */}
      <section id="faqs-section" className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#E94E77]">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions &bull; {selectedCity}
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about booking by the hour, pricing, and photo delivery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS_LIST.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#E94E77]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          13. LIGHTBOX MODAL
         ========================================================================= */}
      {activeLightboxImg && (
        <div 
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={activeLightboxImg}
              alt="Enlarged photo"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          14. INSTANT BOOKING MODAL (With ₹150 OFF auto coupon)
         ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-5 my-8 border border-slate-200">
            
            <button
              onClick={() => {
                setIsBookingModalOpen(false);
                setIsBookingSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isBookingSuccess ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E94E77] bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                    Booking Request &bull; {selectedCity}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    Book {activeOccasion.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedDurationHours} Hours &bull; {activePackage.name} &bull; {selectedLocality}
                  </p>
                </div>

                {/* Price summary badge */}
                <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900">Total: ₹{calculatedPrice.total.toLocaleString()}</span>
                    <span className="text-emerald-700 block text-[11px] font-bold">Includes ₹150 Discount (SNAP150)</span>
                  </div>
                  <span className="text-[11px] font-black text-[#E94E77] bg-white px-2.5 py-1 rounded-xl shadow-xs">
                    Advance: ₹500
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Kishore Reddy"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Event Date</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Preferred Time Slot</label>
                    <select
                      value={eventTimeSlot}
                      onChange={(e) => setEventTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option>Morning (08:00 AM - 11:00 AM)</option>
                      <option>Mid-Day (11:00 AM - 02:00 PM)</option>
                      <option>Afternoon (02:00 PM - 05:00 PM)</option>
                      <option>Golden Hour Evening (05:00 PM - 08:00 PM)</option>
                      <option>Night Function (07:00 PM - 11:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Event Address / Notes</label>
                    <textarea
                      rows={2}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="e.g. Flat 402, My Home Bhooja, Madhapur..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition cursor-pointer"
                >
                  Confirm Booking with ₹150 OFF
                </button>
              </form>
            ) : (
              <div className="space-y-5 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Booking Confirmed
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    Your Photographer is Reserved!
                  </h3>
                  <p className="text-xs text-slate-500">
                    A WhatsApp confirmation with your assigned photographer's portfolio and contact has been sent to <strong>{bookingPhone}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Occasion:</span>
                    <span>{activeOccasion.title}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Date &amp; Slot:</span>
                    <span>{eventDate} &bull; {eventTimeSlot}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Location:</span>
                    <span>{selectedLocality}, {selectedCity}</span>
                  </div>
                  <div className="flex justify-between font-black text-[#E94E77] pt-2 border-t border-slate-200">
                    <span>Total Amount:</span>
                    <span className="font-mono">₹{calculatedPrice.total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setIsBookingSuccess(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition cursor-pointer"
                >
                  Done &amp; Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          15. SHARE MODAL
         ========================================================================= */}
      {isShareModalOpen && profile && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}

      {/* =========================================================================
          16. BOTTOM STICKY FLOATING ACTION BAR
         ========================================================================= */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 hidden sm:inline">Starting from</span>
            <div className="leading-tight">
              <span className="text-lg sm:text-xl font-black text-[#E94E77] font-mono">
                ₹3,600/-
              </span>
              <span className="text-[10px] text-slate-400 block sm:inline sm:ml-1 font-semibold">
                for 2 Hours
              </span>
            </div>
            <span className="hidden md:inline text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ₹150 OFF applied
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20hire%20a%20photographer%20in%20Hyderabad"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('instant-booking-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-xl bg-[#E94E77] hover:bg-[#D81B60] text-white font-black text-xs uppercase tracking-wider transition shadow-md shadow-pink-500/25 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          17. MEGA FOOTER (All 8 Indian Cities & Event Service Lines)
         ========================================================================= */}
      <footer className="bg-[#18181B] text-slate-400 text-xs pt-16 pb-24 px-4 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
            
            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Our Services</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#occasions-section" className="hover:text-white transition">Photography for Events</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Decorations for Party</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Chef for Party &amp; Occasions</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Food Delivery &amp; Live Catering</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Party Venues Booking</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Top Occasions</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#occasions-section" className="hover:text-white transition">Birthday Photography</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Maternity Photoshoot</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Newborn Baby Shoot</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Housewarming Griha Pravesh</a></li>
                <li><a href="#occasions-section" className="hover:text-white transition">Wedding &amp; Engagement</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Cities We Cover</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><span className="hover:text-white transition cursor-pointer">Photographers in Hyderabad</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Photographers in Bangalore</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Photographers in Mumbai</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Photographers in Delhi NCR</span></li>
                <li><span className="hover:text-white transition cursor-pointer">Photographers in Gurugram</span></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Top Localities</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><span className="hover:text-white transition">Gachibowli Photographers</span></li>
                <li><span className="hover:text-white transition">HITEC City Photoshoots</span></li>
                <li><span className="hover:text-white transition">Jubilee Hills Photographers</span></li>
                <li><span className="hover:text-white transition">Banjara Hills Portrait Studio</span></li>
                <li><span className="hover:text-white transition">Kondapur Event Shoots</span></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Contact &amp; Support</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><span>Phone: +91 98765 43210</span></li>
                <li><span>Email: bookings@oneclickbiz.in</span></li>
                <li><span>Support: 24/7 WhatsApp Chat</span></li>
                <li><span>Free Invite Worth ₹500</span></li>
                <li><span>Verified Background Checked</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>&copy; 2026 SnapVibe Studios &bull; Powered by OneClickBiz. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <span>Privacy Policy</span>
              <span>&bull;</span>
              <span>Terms of Service</span>
              <span>&bull;</span>
              <span>Sitemap</span>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          18. OTHER EVENT SERVICES MODAL (Decoration, Catering, Venues, Entertainment)
         ========================================================================= */}
      {isServicesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                  🎈
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Full Event &amp; Celebration Services</h3>
                  <p className="text-xs text-slate-500 font-medium">Add-on party planning services in Hyderabad</p>
                </div>
              </div>
              <button
                onClick={() => setIsServicesModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'decor', name: 'Decoration', icon: '🎈' },
                { id: 'catering', name: 'Live Catering', icon: '🍽️' },
                { id: 'venues', name: 'Party Venues', icon: '🏛️' },
                { id: 'entertainment', name: 'DJ & Sound', icon: '🎭' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id as any)}
                  className={`p-3 rounded-2xl text-xs font-black flex flex-col items-center gap-1.5 transition cursor-pointer border ${
                    activeServiceTab === tab.id
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeServiceTab === 'decor' && (
              <div className="space-y-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Theme Balloon &amp; Floral Decor</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Birthday rings, cradle florals, LED light arches &amp; welcome boards.</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">From ₹2,499</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100+ Designer organic balloon arch presets</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fresh flower jasmine &amp; marigold traditional backdrops</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Setup completed 2 hours before event start</li>
                </ul>
              </div>
            )}

            {activeServiceTab === 'catering' && (
              <div className="space-y-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Live Food Counters &amp; Catering</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Hyderabadi Dum Biryani, live tandoor, chaat stalls &amp; dessert spreads.</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">From ₹350 / Plate</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live hot Dosa, Chaat &amp; barbecue counters</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Authentic veg &amp; non-veg regional Hyderabadi menu</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Includes uniformed service staff &amp; crockery</li>
                </ul>
              </div>
            )}

            {activeServiceTab === 'venues' && (
              <div className="space-y-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Boutique Banquet Halls &amp; Farmhouses</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Terrace spaces in Jubilee Hills, pool villas in Shamshabad &amp; Moinabad.</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">From ₹15,000</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Capacities from 30 guests to 500 guests</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Full air conditioning, valet parking &amp; power backup</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero venue commission booking guarantee</li>
                </ul>
              </div>
            )}

            {activeServiceTab === 'entertainment' && (
              <div className="space-y-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">DJ Sound, Lighting &amp; Emcee Host</h4>
                    <p className="text-xs text-slate-500 mt-0.5">JBL sound systems, moving head beam lights, karaoke &amp; interactive game host.</p>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">From ₹6,000</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bollywood, Tollywood &amp; Punjabi party music mix</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Professional energetic bilingual anchors (Telugu/Hindi/English)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fog machine, cold pyros &amp; dance floor lighting</li>
                </ul>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent('Hi, I would like to inquire about ' + activeServiceTab + ' service for my event in Hyderabad.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setIsServicesModalOpen(false);
                  setIsBookingModalOpen(true);
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-black text-white font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book With Photography</span>
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}


function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
