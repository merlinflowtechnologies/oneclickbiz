'use client';

import React, { useState, useMemo } from 'react';
import { DigitalProfile } from '@/lib/types';
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Star, 
  Wifi, 
  Zap, 
  ArrowRightLeft, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  QrCode, 
  Download, 
  Share2, 
  Phone, 
  Mail, 
  Tag, 
  Sparkles, 
  X, 
  Search, 
  Filter, 
  ArrowRight, 
  Navigation,
  Check,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Flame,
  Award,
  AlertCircle,
  HelpCircle,
  Smartphone,
  Compass,
  Radio,
  FileText,
  CreditCard,
  Luggage,
  ThumbsUp,
  RefreshCw,
  Copy,
  ChevronLeft,
  Percent,
  CheckCircle,
  Shield,
  Layers,
  Heart,
  ExternalLink,
  Play,
  PlayCircle,
  Film,
  Tv,
  Eye,
  MessageCircle
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface BusBookingTemplateViewProps {
  profile?: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'mobile' | 'website';
  setViewMode?: (mode: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

// =========================================================================
// 1. DATA CONSTANTS & ALL DIRECTORIES (100% Mock / Zero RedBus or AbhiBus IP)
// =========================================================================

export const POPULAR_CITIES = [
  'Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Pune', 'Delhi', 'Jaipur',
  'Chandigarh', 'Dehradun', 'Manali', 'Goa', 'Vijayawada', 'Tirupati',
  'Kolkata', 'Ahmedabad', 'Coimbatore', 'Lucknow', 'Bhopal', 'Indore',
  'Surat', 'Rajkot', 'Udaipur', 'Jodhpur', 'Gorakhpur', 'Shimla', 'Madurai'
];

export const CALENDAR_DAYS = [
  { day: 'Today', date: '17 Sat', fullDate: '17 Oct 2026', fare: '₹599' },
  { day: 'Tomorrow', date: '18 Sun', fullDate: '18 Oct 2026', fare: '₹649' },
  { day: 'Mon', date: '19 Mon', fullDate: '19 Oct 2026', fare: '₹549' },
  { day: 'Tue', date: '20 Tue', fullDate: '20 Oct 2026', fare: '₹549' },
  { day: 'Wed', date: '21 Wed', fullDate: '21 Oct 2026', fare: '₹549' },
  { day: 'Thu', date: '22 Thu', fullDate: '22 Oct 2026', fare: '₹599' },
  { day: 'Fri', date: '23 Fri', fullDate: '23 Oct 2026', fare: '₹799' },
  { day: 'Sat', date: '24 Sat', fullDate: '24 Oct 2026', fare: '₹849' },
  { day: 'Sun', date: '25 Sun', fullDate: '25 Oct 2026', fare: '₹799' },
  { day: 'Mon', date: '26 Mon', fullDate: '26 Oct 2026', fare: '₹549' },
  { day: 'Tue', date: '27 Tue', fullDate: '27 Oct 2026', fare: '₹549' },
  { day: 'Wed', date: '28 Wed', fullDate: '28 Oct 2026', fare: '₹549' },
  { day: 'Thu', date: '29 Thu', fullDate: '29 Oct 2026', fare: '₹599' },
  { day: 'Fri', date: '30 Fri', fullDate: '30 Oct 2026', fare: '₹799' }
];

export const ASSURED_PILLARS = [
  {
    title: 'Bus cancelled?',
    badge: '150% Refund',
    desc: 'Instant 150% cash refund credited to source account if the operator cancels trip without prior intimation.',
    icon: 'RefreshCw',
    color: 'from-amber-500 to-orange-600'
  },
  {
    title: 'Bad service quality?',
    badge: 'Up to 100% Refund',
    desc: 'Get up to 100% compensation if AC failure, unscheduled breakdown, or dirty sleeper berths are verified.',
    icon: 'ThumbsUp',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Bus delayed?',
    badge: 'Up to 100% Refund',
    desc: 'Hassle-free delay compensation if the bus departs or arrives over 45 minutes behind scheduled highway ETA.',
    icon: 'Clock',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    title: 'Changed your plans?',
    badge: '100% Refund',
    desc: 'Cancel up to 2 hours before scheduled boarding time and enjoy zero cancellation fee guarantee.',
    icon: 'ShieldCheck',
    color: 'from-rose-500 to-red-600'
  }
];

export const DISCOUNT_OFFERS = [
  {
    code: 'SWIFTFIRST',
    discount: '₹500 OFF',
    desc: 'Get flat ₹500 cashback on your maiden intercity bus booking.',
    minBooking: 'Min booking ₹999',
    tag: 'NEW USERS'
  },
  {
    code: 'RTCDEAL',
    discount: '15% OFF',
    desc: 'Special concession on all State Road Transport Corporation coaches.',
    minBooking: 'No min value',
    tag: 'GOVT RTCs'
  },
  {
    code: 'SLEEPER250',
    discount: '₹250 CASHBACK',
    desc: 'Instant cashback on premium Multi-Axle Volvo & Scania AC Sleepers.',
    minBooking: 'Min booking ₹1,200',
    tag: 'LUXURY BUS'
  },
  {
    code: 'EVCLEAN',
    discount: '20% OFF',
    desc: 'Eco-friendly green travel discount on zero-emission electric buses.',
    minBooking: 'Electric coaches',
    tag: 'ECO FRIENDLY'
  },
  {
    code: 'WEEKEND10',
    discount: '10% OFF',
    desc: 'Special weekend gateway discount for Saturday & Sunday travel.',
    minBooking: 'Weekend departures',
    tag: 'WEEKEND'
  }
];

export const SRTC_DIRECTORY = [
  { code: 'APSRTC', name: 'Andhra Pradesh State Road Transport Corporation', routes: '4,850+ Routes', fleet: '11,400 Buses', state: 'Andhra Pradesh' },
  { code: 'TGSRTC', name: 'Telangana State Road Transport Corporation', routes: '3,920+ Routes', fleet: '9,600 Buses', state: 'Telangana' },
  { code: 'KSRTC', name: 'Karnataka State Road Transport Corporation', routes: '4,100+ Routes', fleet: '8,400 Buses', state: 'Karnataka' },
  { code: 'Kerala RTC', name: 'Kerala Road Transport Corporation', routes: '2,650+ Routes', fleet: '5,500 Buses', state: 'Kerala' },
  { code: 'GSRTC', name: 'Gujarat State Road Transport Corporation', routes: '3,800+ Routes', fleet: '7,900 Buses', state: 'Gujarat' },
  { code: 'RSRTC', name: 'Rajasthan State Road Transport Corporation', routes: '2,400+ Routes', fleet: '4,800 Buses', state: 'Rajasthan' },
  { code: 'UPSRTC', name: 'Uttar Pradesh State Road Transport Corporation', routes: '5,200+ Routes', fleet: '12,500 Buses', state: 'Uttar Pradesh' },
  { code: 'HRTC', name: 'Himachal Pradesh State Road Transport Corporation', routes: '1,950+ Routes', fleet: '3,200 Buses', state: 'Himachal Pradesh' },
  { code: 'OSRTC', name: 'Odisha State Road Transport Corporation', routes: '1,450+ Routes', fleet: '2,100 Buses', state: 'Odisha' },
  { code: 'BSRTC', name: 'Bihar State Road Transport Corporation', routes: '1,200+ Routes', fleet: '1,800 Buses', state: 'Bihar' },
  { code: 'PRTC', name: 'PEPSU Road Transport Corporation', routes: '980+ Routes', fleet: '1,400 Buses', state: 'Punjab' },
  { code: 'JKSRTC', name: 'Jammu & Kashmir Road Transport Corporation', routes: '850+ Routes', fleet: '1,100 Buses', state: 'Jammu & Kashmir' },
  { code: 'WBTC', name: 'West Bengal Transport Corporation', routes: '1,350+ Routes', fleet: '2,300 Buses', state: 'West Bengal' },
  { code: 'KTCL', name: 'Kadamba Transport Corporation Limited', routes: '620+ Routes', fleet: '950 Buses', state: 'Goa' },
  { code: 'UTC', name: 'Uttarakhand Transport Corporation', routes: '1,100+ Routes', fleet: '1,650 Buses', state: 'Uttarakhand' },
  { code: 'MTC', name: 'Meghalaya Transport Corporation', routes: '340+ Routes', fleet: '480 Buses', state: 'Meghalaya' },
  { code: 'SBSTC', name: 'South Bengal State Transport Corporation', routes: '780+ Routes', fleet: '1,200 Buses', state: 'West Bengal' },
  { code: 'SNT', name: 'Sikkim Nationalised Transport', routes: '290+ Routes', fleet: '380 Buses', state: 'Sikkim' }
];

export const PRIVATE_OPERATORS = [
  { name: 'Garuda Royal Luxury Lines', type: 'Volvo Multi-Axle', rating: 4.9, reviews: '38k+', badge: 'Premium Partner' },
  { name: 'Apex Intercity SmartCoach', type: 'Scania Comfort Sleeper', rating: 4.8, reviews: '24k+', badge: 'Top Rated' },
  { name: 'Greenline EV Express', type: 'Electric Zero-Emission', rating: 4.9, reviews: '16k+', badge: 'Eco Friendly' },
  { name: 'Deccan Voyager Coaches', type: 'BharatBenz AC Sleeper', rating: 4.7, reviews: '19k+', badge: 'Punctual' },
  { name: 'Skyline Diamond Sleeper', type: 'Volvo 9600 Luxury', rating: 4.8, reviews: '14k+', badge: 'Spacious Berths' },
  { name: 'National Expressway Lines', type: 'Multi-Axle Superfast', rating: 4.6, reviews: '29k+', badge: 'Highway Super' },
  { name: 'Kaveri Grand Tourist', type: 'AC Seater & Sleeper', rating: 4.7, reviews: '22k+', badge: 'Family Favorite' },
  { name: 'Orange Star Travelers', type: 'Mercedes Luxury Coach', rating: 4.8, reviews: '31k+', badge: 'Certified Safe' },
  { name: 'Royal Rajputana Coaches', type: 'Volvo Semi-Sleeper', rating: 4.6, reviews: '11k+', badge: 'Desert Express' },
  { name: 'Shyamoli Paribahan', type: 'Scania Premium AC', rating: 4.7, reviews: '27k+', badge: 'Eastern Express' },
  { name: 'Dolphin Highway Cruiser', type: 'Multi-Axle Sleeper', rating: 4.7, reviews: '18k+', badge: 'Live Tracking' },
  { name: 'FreshBus Electric Intercity', type: 'Pure Electric EV', rating: 4.9, reviews: '12k+', badge: 'Zero Emission' }
];


// =========================================================================
// YOUTUBE & INSTAGRAM MEDIA SHOWCASE DATA (Playable right here on the page)
// =========================================================================

export const YOUTUBE_TRAVEL_VLOGS = [
  {
    id: 'yt1',
    title: 'Garuda Royal Luxury Lines: Volvo B11R 9600 Multi-Axle Sleeper Cabin Tour',
    embedUrl: 'https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&rel=0',
    duration: '12:40',
    views: '184K views',
    channel: 'Highway Journeys India',
    busModel: 'Volvo B11R 9600',
    tag: 'Fleet Walkthrough',
    desc: 'Experience an exclusive 360-degree cabin walkthrough of the all-new Volvo 9600 luxury multi-axle sleeper coach. Features wide panoramic single window berths, ambient blue reading lights, personal AC blowers, and deep-cushioned comfort.',
    thumb: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yt2',
    title: 'Apex Intercity SmartCoach: Overnight Journey Review & Highway Food Plaza Stop',
    embedUrl: 'https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1&rel=0',
    duration: '09:15',
    views: '126K views',
    channel: 'Apex SmartTravel',
    busModel: 'Scania Metrolink HD',
    tag: 'Passenger Review',
    desc: 'Real passenger experience on the 550km expressway route. Reviewing sleeper comfort, electronically controlled air suspension, punctuality, and complimentary snack hampers.',
    thumb: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yt3',
    title: 'Greenline EV: The Electric Intercity Bus Revolution in India (Zero Engine Noise)',
    embedUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0',
    duration: '14:20',
    views: '95K views',
    channel: 'EV India Tech',
    busModel: 'Pure Electric EV',
    tag: 'Eco Highway',
    desc: 'Discover how zero-emission electric buses operate on 400km+ intercity highway corridors with 240kW DC fast charging stops, regenerative braking, and ultra-silent cabin comfort.',
    thumb: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'yt4',
    title: 'State RTC Airavat Club Class: Royal Highway Travel at Budget Fares',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&rel=0',
    duration: '11:05',
    views: '240K views',
    channel: 'Desi Roadways',
    busModel: 'KSRTC Airavat',
    tag: 'Govt RTC',
    desc: 'Experience the trusted government Airavat Club Class bus. Reviewing punctuality, safety certifications, professional drivers, and government rest houses.',
    thumb: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=600&auto=format&fit=crop&q=80'
  }
];

export const INSTAGRAM_REELS_GALLERY = [
  {
    id: 'ig1',
    title: 'POV: Waking up to highway sunrise in Upper Window Berth 🌅',
    reelUrl: 'https://www.instagram.com/reel/C3_mock1/embed',
    likes: '48.2K',
    comments: '1,420',
    author: '@travelwithswift',
    audio: 'Morning Highway Vibes &bull; Trending',
    tag: 'Reel',
    desc: 'Nothing beats golden hour from your private sleeper berth on the expressway with cool AC air!',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ig2',
    title: '30-second tour of the Ladies Only Pink Sleeper Berth 🌸',
    reelUrl: 'https://www.instagram.com/reel/C3_mock2/embed',
    likes: '62.4K',
    comments: '980',
    author: '@solo_woman_india',
    audio: 'Safe & Secure Travel &bull; Original',
    tag: 'Women Zone',
    desc: 'Safe, private, and sanitized ladies-only window berths with emergency SOS and CCTV corridors.',
    thumb: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ig3',
    title: 'Charging your phone at 65W fast charger inside bus berth ⚡',
    reelUrl: 'https://www.instagram.com/reel/C3_mock3/embed',
    likes: '34.8K',
    comments: '512',
    author: '@highwayhacks',
    audio: 'Travel Tech Essentials',
    tag: 'Amenities',
    desc: 'No dead battery anxiety on long 12-hour overnight road trips with individual Type-C outlets.',
    thumb: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ig4',
    title: 'Highway Food Plaza stop: Midnight Chai & Hot Samosas ☕',
    reelUrl: 'https://www.instagram.com/reel/C3_mock4/embed',
    likes: '91.3K',
    comments: '3,120',
    author: '@foodie_on_wheels',
    audio: 'Midnight Dhaba Beats',
    tag: 'Rest Stop',
    desc: '20-minute refreshment stop at clean highway plazas with sanitized washrooms and hot food.',
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80'
  }
];

export const ALL_50_POPULAR_ROUTES = [
  { from: 'Hyderabad', to: 'Bangalore', buses: '312 Buses', fare: '₹750', time: '8h 30m' },
  { from: 'Bangalore', to: 'Chennai', buses: '238 Buses', fare: '₹550', time: '6h 15m' },
  { from: 'Hyderabad', to: 'Vijayawada', buses: '451 Buses', fare: '₹480', time: '5h 00m' },
  { from: 'Mumbai', to: 'Pune', buses: '602 Buses', fare: '₹350', time: '3h 30m' },
  { from: 'Delhi', to: 'Chandigarh', buses: '475 Buses', fare: '₹420', time: '4h 45m' },
  { from: 'Delhi', to: 'Dehradun', buses: '346 Buses', fare: '₹510', time: '5h 30m' },
  { from: 'Delhi', to: 'Manali', buses: '179 Buses', fare: '₹899', time: '12h 00m' },
  { from: 'Delhi', to: 'Jaipur', buses: '256 Buses', fare: '₹380', time: '5h 15m' },
  { from: 'Bangalore', to: 'Goa', buses: '102 Buses', fare: '₹950', time: '11h 30m' },
  { from: 'Chennai', to: 'Madurai', buses: '410 Buses', fare: '₹520', time: '7h 45m' },
  { from: 'Delhi', to: 'Lucknow', buses: '690 Buses', fare: '₹650', time: '8h 00m' },
  { from: 'Bangalore', to: 'Hyderabad', buses: '304 Buses', fare: '₹750', time: '8h 30m' },
  { from: 'Pune', to: 'Bangalore', buses: '86 Buses', fare: '₹1,150', time: '13h 00m' },
  { from: 'Pune', to: 'Goa', buses: '93 Buses', fare: '₹850', time: '9h 30m' },
  { from: 'Mumbai', to: 'Goa', buses: '87 Buses', fare: '₹900', time: '11h 00m' },
  { from: 'Delhi', to: 'Haridwar', buses: '321 Buses', fare: '₹440', time: '5h 00m' },
  { from: 'Delhi', to: 'Rishikesh', buses: '339 Buses', fare: '₹480', time: '5h 45m' },
  { from: 'Delhi', to: 'Shimla', buses: '63 Buses', fare: '₹620', time: '8h 00m' },
  { from: 'Kolkata', to: 'Siliguri', buses: '98 Buses', fare: '₹780', time: '12h 30m' },
  { from: 'Kolkata', to: 'Digha', buses: '213 Buses', fare: '₹220', time: '4h 15m' },
  { from: 'Indore', to: 'Bhopal', buses: '239 Buses', fare: '₹280', time: '3h 30m' },
  { from: 'Bhopal', to: 'Indore', buses: '219 Buses', fare: '₹280', time: '3h 30m' },
  { from: 'Bangalore', to: 'Tirupati', buses: '389 Buses', fare: '₹390', time: '5h 00m' },
  { from: 'Hyderabad', to: 'Tirupati', buses: '116 Buses', fare: '₹820', time: '10h 30m' },
  { from: 'Bangalore', to: 'Ooty', buses: '26 Buses', fare: '₹720', time: '7h 30m' },
  { from: 'Chennai', to: 'Coimbatore', buses: '262 Buses', fare: '₹610', time: '8h 00m' },
  { from: 'Coimbatore', to: 'Chennai', buses: '220 Buses', fare: '₹610', time: '8h 00m' },
  { from: 'Pune', to: 'Nagpur', buses: '99 Buses', fare: '₹1,050', time: '12h 15m' },
  { from: 'Nagpur', to: 'Pune', buses: '99 Buses', fare: '₹1,050', time: '12h 15m' },
  { from: 'Hyderabad', to: 'Goa', buses: '39 Buses', fare: '₹1,250', time: '14h 00m' },
  { from: 'Bangalore', to: 'Pondicherry', buses: '79 Buses', fare: '₹550', time: '6h 45m' },
  { from: 'Chennai', to: 'Pondicherry', buses: '186 Buses', fare: '₹260', time: '3h 30m' },
  { from: 'Delhi', to: 'Nainital', buses: '105 Buses', fare: '₹580', time: '7h 00m' },
  { from: 'Delhi', to: 'Varanasi', buses: '92 Buses', fare: '₹950', time: '13h 00m' },
  { from: 'Delhi', to: 'Ujjain', buses: '72 Buses', fare: '₹880', time: '14h 30m' },
  { from: 'Hyderabad', to: 'Srisailam', buses: '45 Buses', fare: '₹340', time: '5h 30m' },
  { from: 'Delhi', to: 'Dharamshala', buses: '55 Buses', fare: '₹920', time: '11h 30m' },
  { from: 'Delhi', to: 'Khatushyamji', buses: '68 Buses', fare: '₹460', time: '6h 00m' },
  { from: 'Chandigarh', to: 'Manali', buses: '140 Buses', fare: '₹750', time: '8h 30m' },
  { from: 'Hyderabad', to: 'Mumbai', buses: '74 Buses', fare: '₹1,100', time: '13h 30m' }
];

export const BUS_TYPES_CATALOG = [
  { name: 'Volvo AC Multi-Axle', desc: 'Ultra-luxurious ride with electronically controlled air suspension and panoramic views.' },
  { name: 'AC Sleeper (2+1)', desc: 'Spacious individual single window berths and wide double berths with plush blankets.' },
  { name: 'Electric Zero-Emission EV', desc: 'Whisper-quiet eco travel with fast highway wireless charging and climate control.' },
  { name: 'Scania Metrolink HD', desc: 'High-deck European styling with personal entertainment screens and ergonomic recline.' },
  { name: 'State RTC Rajahamsa / Airavat', desc: 'Government verified safety with punctual departures and authorized rest stops.' },
  { name: 'Super Luxury Seater', desc: 'Pushback reclining calf-support seats with ample legroom for comfortable day commutes.' },
  { name: 'Mercedes Benz Sleeper', desc: 'Unmatched chassis smoothness with German engineering and individual reading lamps.' },
  { name: 'Ordinary & Express Non-AC', desc: 'Extremely pocket-friendly mass regional transit with widest connectivity into rural taluks.' }
];

export const HOW_TO_BOOK_STEPS = [
  { step: '01', title: 'Enter Origin & Destination', desc: 'Type leaving from and going to cities in the search bar above.' },
  { step: '02', title: 'Select Date of Journey', desc: 'Pick your departure date from the 14-day horizontal fare scroller.' },
  { step: '03', title: 'Compare & Select Bus', desc: 'Filter by AC, Sleeper, RTC or Private operator based on price & rating.' },
  { step: '04', title: 'Pick Seats & Boarding Point', desc: 'Choose your desired Lower/Upper berth and select nearest pick-up spot.' },
  { step: '05', title: 'Fill Passenger & Apply Coupon', desc: 'Enter passenger details and apply promo code for instant cash discount.' },
  { step: '06', title: 'Instant Paperless M-Ticket', desc: 'Pay securely via UPI or Card and receive WhatsApp SMS ticket with GPS link.' }
];

export const COMPREHENSIVE_FAQS = {
  general: [
    { q: 'What is SwiftBus Direct and how does it compare to online bus booking portals?', a: 'SwiftBus Direct is a dedicated state-of-the-art bus ticket reservation platform offering inventory across 18 State Road Transport Corporations (SRTCs) and over 6,200 private fleet partners across 9,50,000+ national routes at lowest guaranteed fares with zero convenience fee surprises.' },
    { q: 'Is it mandatory to print a paper copy of the bus ticket?', a: 'No. All bus conductors and boarding bay executives accept digital M-Tickets. You can simply display the WhatsApp boarding message, SMS confirmation, or email PDF on your mobile phone along with a valid government photo ID.' },
    { q: 'Can I book bus tickets for return journeys in advance?', a: 'Yes. You can select your return date while searching or use the 14-day calendar scroller to book round-trip tickets with special return discount coupons.' },
    { q: 'How many days in advance can I book bus tickets?', a: 'You can book private luxury bus tickets up to 60 to 90 days in advance, and State RTC tickets up to 30 days prior to departure, securing early-bird window seats.' }
  ],
  ticket: [
    { q: 'How do I download or print my confirmed bus ticket?', a: 'Once payment completes, your digital M-Ticket generates instantly on screen with a download PDF button. It is also dispatched simultaneously to your WhatsApp number and email address.' },
    { q: 'Can I change my boarding point after booking?', a: 'Yes. For most operators, you can change your boarding point online through the "Manage Booking" section up to 4 hours before the bus departs from the starting terminal.' },
    { q: 'What should I do if I did not receive my M-Ticket SMS or WhatsApp message?', a: 'Simply enter your mobile number or PNR into the "Track Ticket" widget on this portal, or click "Resend M-Ticket" to receive an immediate duplicate SMS and WhatsApp notification.' },
    { q: 'Can someone else travel on my bus ticket if I am unable to travel?', a: 'Tickets are non-transferable. However, if needed, you can cancel your ticket under the 100% Free Cancellation policy and book a fresh ticket with the new passenger name.' }
  ],
  payment: [
    { q: 'What payment modes are accepted on this platform?', a: 'We support all major payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit Cards, Debit Cards, NetBanking across 50+ banks, and digital wallets.' },
    { q: 'Is my online card transaction safe and encrypted?', a: 'Yes. All payments are processed through 256-bit bank-grade SSL encrypted payment gateways complying with PCI-DSS Level 1 security standards.' },
    { q: 'What happens if money was debited from my bank but the ticket was not confirmed?', a: 'In rare cases of bank network timeouts, debited amounts are automatically reconciled within 15 minutes. If ticket generation fails, a 100% full refund is credited back to your bank account within 2 hours.' }
  ],
  cancellation: [
    { q: 'What is the SwiftBus Assured Free Cancellation Policy?', a: 'If you opt for Free Cancellation during booking or cancel at least 2 hours before the scheduled departure time, you receive a 100% full refund with zero penalty deductions.' },
    { q: 'How much refund do I get if the bus operator cancels the trip?', a: 'Under the 150% Refund Guarantee, if a private operator or RTC cancels the scheduled service without providing an alternative, you receive an immediate 150% cash refund.' },
    { q: 'How long does it take for cancellation refunds to reach my bank account?', a: 'UPI and wallet refunds are processed instantly within 60 seconds. Credit/Debit card refunds typically reflect within 2 to 4 business banking days.' }
  ],
  insurance: [
    { q: 'What benefits are covered under the ₹15 Travel Insurance policy?', a: 'The optional travel insurance covers accidental medical expenses up to ₹5,00,000, emergency hospital hospitalization, loss of checked-in baggage up to ₹10,000, and trip delay compensation.' },
    { q: 'How do I file a claim for luggage loss or medical emergencies?', a: 'Your confirmed M-Ticket contains your 10-digit insurance policy certificate number and a 24x7 toll-free claims hotline with cashless hospital network support.' }
  ]
};

// Mock Schedules
const BUS_SCHEDULES = [
  {
    id: 'B01',
    operator: 'Garuda Royal Luxury Lines',
    busType: 'Volvo B11R 9600 Multi-Axle AC Sleeper (2+1)',
    categoryType: 'sleeper',
    departureTime: '21:30',
    departureLocation: 'Gachibowli ORR Junction',
    departureTimeSlot: 'night',
    arrivalTime: '06:15',
    arrivalLocation: 'Anand Rao Circle, Majestic',
    duration: '8h 45m',
    rating: 4.9,
    totalRatings: 1840,
    originalPrice: 1450,
    offerPrice: 1180,
    seatsLeft: 12,
    windowSeats: 4,
    badge: 'Garuda Assured',
    isElectric: false,
    amenities: ['Live GPS Tracking', 'Type-C Fast Charger', 'Fresh Blanket & Pillow', 'Reading Light', 'Complimentary Water', 'Emergency Exit']
  },
  {
    id: 'B02',
    operator: 'KSRTC Airavat Club Class',
    busType: 'Volvo Multi-Axle Semi-Sleeper AC (2+2)',
    categoryType: 'seater',
    departureTime: '22:15',
    departureLocation: 'MGBS Central Bus Station',
    departureTimeSlot: 'night',
    arrivalTime: '07:00',
    arrivalLocation: 'Shantinagar TTMC Bangalore',
    duration: '8h 45m',
    rating: 4.8,
    totalRatings: 3410,
    originalPrice: 1100,
    offerPrice: 920,
    seatsLeft: 18,
    windowSeats: 6,
    badge: 'Govt Corporation',
    isElectric: false,
    amenities: ['Govt Certified Driver', 'Air Suspension', 'Punctual Departure', 'Spacious Legroom', 'Water Bottle']
  },
  {
    id: 'B03',
    operator: 'Apex Intercity SmartCoach',
    busType: 'Scania Metrolink HD AC Sleeper (2+1)',
    categoryType: 'sleeper',
    departureTime: '20:45',
    departureLocation: 'Ameerpet Metro Station',
    departureTimeSlot: 'night',
    arrivalTime: '05:30',
    arrivalLocation: 'Hebbal Flyover Junction',
    duration: '8h 45m',
    rating: 4.8,
    totalRatings: 960,
    originalPrice: 1350,
    offerPrice: 1099,
    seatsLeft: 8,
    windowSeats: 2,
    badge: 'Top Rated',
    isElectric: false,
    amenities: ['Individual 10-inch TV', 'Snack Box', 'Deep Sanitized', 'High Speed WiFi', 'Charging USB']
  },
  {
    id: 'B04',
    operator: 'Greenline EV Intercity Express',
    busType: 'Electric Ultra-Silent Zero-Emission AC Sleeper',
    categoryType: 'sleeper',
    departureTime: '22:45',
    departureLocation: 'Miyapur Cross Roads',
    departureTimeSlot: 'night',
    arrivalTime: '07:15',
    arrivalLocation: 'Electronic City Toll Plaza',
    duration: '8h 30m',
    rating: 4.9,
    totalRatings: 730,
    originalPrice: 1550,
    offerPrice: 1250,
    seatsLeft: 6,
    windowSeats: 1,
    badge: '100% Eco Friendly',
    isElectric: true,
    amenities: ['Zero Engine Noise', 'Ultra Soft Berths', 'Real-Time Telemetry', 'CCTV Security', 'Reading Spotlights']
  },
  {
    id: 'B05',
    operator: 'APSRTC Amaravathi',
    busType: 'Scania Multi-Axle AC Semi-Sleeper (2+2)',
    categoryType: 'seater',
    departureTime: '18:30',
    departureLocation: 'JBS Jubilee Bus Station',
    departureTimeSlot: 'evening',
    arrivalTime: '03:15',
    arrivalLocation: 'Kempegowda Bus Station Majestic',
    duration: '8h 45m',
    rating: 4.7,
    totalRatings: 2890,
    originalPrice: 990,
    offerPrice: 840,
    seatsLeft: 14,
    windowSeats: 5,
    badge: 'Govt Corporation',
    isElectric: false,
    amenities: ['Punctual Service', 'Govt Rest Stop', 'Digital Ticket', 'Luggage Compartment']
  },
  {
    id: 'B06',
    operator: 'Deccan Voyager Coaches',
    busType: 'BharatBenz Premium AC Sleeper (2+1)',
    categoryType: 'sleeper',
    departureTime: '23:30',
    departureLocation: 'Lakdikapul Pillar No. 12',
    departureTimeSlot: 'night',
    arrivalTime: '08:00',
    arrivalLocation: 'Silk Board Junction',
    duration: '8h 30m',
    rating: 4.7,
    totalRatings: 840,
    originalPrice: 1250,
    offerPrice: 999,
    seatsLeft: 9,
    windowSeats: 3,
    badge: 'Best Value',
    isElectric: false,
    amenities: ['Blanket & Bedroll', 'Charging Port', 'Emergency SOS Button', 'Reading Light']
  }
];

export default function BusBookingTemplateView({
  profile,
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: BusBookingTemplateViewProps) {
  // Search State
  const [sourceCity, setSourceCity] = useState('Hyderabad');
  const [destCity, setDestCity] = useState('Bangalore');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('17 Oct 2026');
  const [journeyType, setJourneyType] = useState<'one-way' | 'round-trip'>('one-way');
  const [returnDate, setReturnDate] = useState('');

  // Filter States
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sleeper' | 'seater' | 'electric'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'evening' | 'night'>('all');
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'rating' | 'departure'>('cheapest');

  // Interactive Seat Drawer
  const [expandedBusId, setExpandedBusId] = useState<string | null>('B01');
  const [activeDeck, setActiveDeck] = useState<'lower' | 'upper'>('lower');
  const [selectedSeats, setSelectedSeats] = useState<{ id: string; name: string; price: number; deck: string }[]>([
    { id: 'L1', name: 'L1 (Single Window)', price: 1180, deck: 'lower' }
  ]);
  const [boardingPoint, setBoardingPoint] = useState('Gachibowli ORR Junction - 21:30');
  const [droppingPoint, setDroppingPoint] = useState('Anand Rao Circle, Majestic - 06:15');

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [passengerName, setPassengerName] = useState('Nayan Kumar');
  const [passengerAge, setPassengerAge] = useState('28');
  const [passengerGender, setPassengerGender] = useState('Male');
  const [passengerPhone, setPassengerPhone] = useState('+91 98765 43210');
  const [passengerEmail, setPassengerEmail] = useState('nayan@example.com');
  const [optInsurance, setOptInsurance] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState('SWIFTFIRST');
  const [isTicketConfirmed, setIsTicketConfirmed] = useState(false);
  const [generatedPnr, setGeneratedPnr] = useState('SV-8924017');

  // Live GPS Tracking Simulator State
  const [trackPnr, setTrackPnr] = useState('SV-8924017');
  const [trackingActive, setTrackingActive] = useState(false);

  // YouTube & Instagram Space State (Able to play right here on the page)
  const [mediaTab, setMediaTab] = useState<'all' | 'youtube' | 'instagram'>('all');
  const [activeMediaItem, setActiveMediaItem] = useState<{
    id: string;
    type: 'youtube' | 'instagram';
    title: string;
    embedUrl: string;
    desc: string;
    authorOrChannel: string;
    viewsOrLikes: string;
  }>({
    id: 'yt1',
    type: 'youtube',
    title: 'Garuda Royal Luxury Lines: Volvo B11R 9600 Multi-Axle Sleeper Cabin Tour',
    embedUrl: 'https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1&rel=0',
    desc: 'Experience an exclusive 360-degree cabin walkthrough of the all-new Volvo 9600 luxury multi-axle sleeper coach. Features wide panoramic single window berths, ambient blue reading lights, personal AC blowers, and deep-cushioned comfort.',
    authorOrChannel: 'Highway Journeys India',
    viewsOrLikes: '184K views'
  });
  const [customMediaInput, setCustomMediaInput] = useState('');
  const [customMediaError, setCustomMediaError] = useState('');

  const handlePlayCustomMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMediaInput.trim()) return;
    setCustomMediaError('');

    // Check YouTube
    const ytMatch = customMediaInput.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch) {
      setActiveMediaItem({
        id: 'custom-yt',
        type: 'youtube',
        title: 'Custom YouTube Video (' + ytMatch[1] + ')',
        embedUrl: 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0',
        desc: 'Playing custom YouTube video directly inside the page without redirecting.',
        authorOrChannel: 'YouTube Stream',
        viewsOrLikes: 'HD Quality'
      });
      const el = document.getElementById('media-theater-player');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Check Instagram Reel
    if (customMediaInput.includes('instagram.com/reel/') || customMediaInput.includes('instagram.com/p/')) {
      const cleanReel = customMediaInput.split('instagram.com/reel/')[1]?.split('/')[0]?.split('?')[0] ||
                        customMediaInput.split('instagram.com/p/')[1]?.split('/')[0]?.split('?')[0];
      if (cleanReel) {
        setActiveMediaItem({
          id: 'custom-ig',
          type: 'instagram',
          title: 'Custom Instagram Reel (' + cleanReel + ')',
          embedUrl: 'https://www.instagram.com/reel/' + cleanReel + '/embed',
          desc: 'Playing custom Instagram reel directly inside the page.',
          authorOrChannel: '@instagram_creator',
          viewsOrLikes: 'Trending Reel'
        });
        const el = document.getElementById('media-theater-player');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setCustomMediaError('Please enter a valid YouTube video/shorts URL or Instagram reel URL.');
  };

  // FAQ Accordion State
  const [faqTab, setFaqTab] = useState<'general' | 'ticket' | 'payment' | 'cancellation' | 'insurance'>('general');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Copied Promo Code State
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Share Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // City Swap Handler
  const handleSwapCities = () => {
    const temp = sourceCity;
    setSourceCity(destCity);
    setDestCity(temp);
  };

  // Filter & Sort Logic
  const filteredBuses = useMemo(() => {
    return BUS_SCHEDULES.filter(b => {
      if (categoryFilter === 'sleeper' && b.categoryType !== 'sleeper') return false;
      if (categoryFilter === 'seater' && b.categoryType !== 'seater') return false;
      if (categoryFilter === 'electric' && !b.isElectric) return false;
      if (timeFilter !== 'all' && b.departureTimeSlot !== timeFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.offerPrice - b.offerPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [categoryFilter, timeFilter, sortBy]);

  // Seat toggle handler
  const handleToggleSeat = (seat: { id: string; name: string; price: number; deck: string }) => {
    const exists = selectedSeats.some(s => s.id === seat.id);
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert('You can select a maximum of 6 seats per transaction.');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Price Calculation
  const activeBus = useMemo(() => {
    return BUS_SCHEDULES.find(b => b.id === expandedBusId) || BUS_SCHEDULES[0];
  }, [expandedBusId]);

  const baseFareTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const gstAmount = Math.round(baseFareTotal * 0.05);
  const insuranceAmount = optInsurance ? selectedSeats.length * 15 : 0;
  const couponDiscount = appliedCoupon === 'SWIFTFIRST' ? Math.min(250, Math.round(baseFareTotal * 0.15)) : 0;
  const finalPayable = Math.max(0, baseFareTotal + gstAmount + insuranceAmount - couponDiscount);

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    setAppliedCoupon(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !passengerPhone) {
      alert('Please fill passenger name and mobile number.');
      return;
    }
    const randomPnr = 'SV-' + Math.floor(1000000 + Math.random() * 9000000);
    setGeneratedPnr(randomPnr);
    setIsTicketConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-[#E23744] selection:text-white pb-16">
      
      {/* =========================================================================
          1. TOP GLOBAL UTILITY STRIP (AbhiBus exact layout)
         ========================================================================= */}
      <div className="bg-[#1C2430] text-slate-300 text-[11px] font-medium border-b border-slate-700/60 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flat ₹500 Cashback with code SWIFTFIRST</span>
            </span>
            <span className="text-slate-500">|</span>
            <a href="#offers-section" className="hover:text-white transition flex items-center gap-1">
              <Tag className="w-3 h-3 text-red-400" />
              <span>Bus Booking Discount Offers</span>
            </a>
            <span className="text-slate-500">|</span>
            <a href="#srtc-directory" className="hover:text-white transition">
              State Road Transport Corporations (18 SRTCs)
            </a>
            <span className="text-slate-500">|</span>
            <a href="#travel-media-space" className="hover:text-white transition flex items-center gap-1.5 text-rose-400 font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>YouTube &amp; Instagram Watch Space</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a href="#tracking-section" className="hover:text-white flex items-center gap-1.5 text-emerald-400 font-semibold transition">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>Live Bus Tracking</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href="#faqs-section" className="hover:text-white flex items-center gap-1 transition">
              <HelpCircle className="w-3 h-3" />
              <span>Need Help? 24x7</span>
            </a>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 cursor-pointer">
              Login / SignUp
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN RED & WHITE BRAND NAVBAR
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* Logo & Category Tabs */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E23744] to-[#C2185B] flex items-center justify-center text-white shadow-md shadow-red-500/20">
                <Bus className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="leading-tight">
                <div className="text-2xl font-black tracking-tighter text-[#E23744] flex items-center">
                  swift<span className="text-slate-900">bus</span>
                  <span className="ml-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-red-100 text-[#E23744] tracking-normal">Direct</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 block -mt-1 tracking-wider uppercase">India's Trusted Bus Booking</span>
              </div>
            </div>

            {/* Travel Category Tabs */}
            <nav className="hidden lg:flex items-center gap-1 border-l border-slate-200 pl-6">
              <div className="px-4 py-2 rounded-xl bg-red-50 text-[#E23744] font-black text-xs flex items-center gap-2 border border-red-200 cursor-pointer shadow-xs">
                <Bus className="w-4 h-4" />
                <span>Buses</span>
                <span className="w-2 h-2 rounded-full bg-[#E23744] animate-ping" />
              </div>
              <div className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-900 font-semibold text-xs flex items-center gap-1.5 cursor-pointer opacity-50 hover:opacity-100 transition">
                <span>Trains</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-900 font-semibold text-xs flex items-center gap-1.5 cursor-pointer opacity-50 hover:opacity-100 transition">
                <span>Flights</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-900 font-semibold text-xs flex items-center gap-1.5 cursor-pointer opacity-50 hover:opacity-100 transition">
                <span>Hotels</span>
              </div>
            </nav>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const el = document.getElementById('tracking-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-white transition cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Track Bus</span>
            </button>

            <button 
              onClick={() => {
                const el = document.getElementById('travel-media-space');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-xs font-bold text-[#E23744] bg-red-50 hover:bg-red-100 transition cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Watch Vlogs &amp; Reels</span>
            </button>

            {profile && (
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('bus-results-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-[#E23744] hover:bg-[#C2185B] text-white font-bold text-xs shadow-md shadow-red-500/20 transition cursor-pointer"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. HERO BUS SEARCH ENGINE SECTION (AbhiBus exact layout + 14-day scroller)
         ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#E23744] via-[#D32F2F] to-[#B71C1C] text-white pt-8 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          
          {/* Hero Banner Headings */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>India's 4.8★ Rated Online Bus Booking Platform &bull; 9,50,000+ Routes</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              Book Bus Tickets Online at Lowest Fare
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-2xl mx-auto font-medium">
              Over 6,200 bus partners including 18 State Transport Corporations (APSRTC, TGSRTC, KSRTC, GSRTC, UPSRTC) & luxury private Volvo AC Sleepers.
            </p>
          </div>

          {/* AbhiBus Main Search Box */}
          <div id="bus-search-bar" className="bg-white rounded-3xl p-4 sm:p-6 text-slate-800 shadow-2xl border border-white/40">
            
            {/* Search inputs row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* FROM CITY */}
              <div className="md:col-span-4 relative group">
                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Bus className="w-3.5 h-3.5 text-[#E23744]" />
                    <span>Leaving From</span>
                  </div>
                  <input
                    type="text"
                    value={sourceCity}
                    onChange={(e) => setSourceCity(e.target.value)}
                    placeholder="Enter departure city"
                    className="w-full bg-transparent text-base sm:text-lg font-black text-slate-900 focus:outline-none mt-1"
                  />
                  <span className="text-[10px] text-slate-500 block truncate font-medium">
                    Telangana / Hyderabad Central
                  </span>
                </div>
              </div>

              {/* SWAP BUTTON */}
              <div className="md:col-span-1 flex justify-center -my-2 md:my-0 z-10">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  title="Swap Origin and Destination"
                  className="w-10 h-10 rounded-full bg-white hover:bg-red-50 text-[#E23744] border-2 border-slate-200 hover:border-[#E23744] shadow-md flex items-center justify-center transition active:scale-95 cursor-pointer"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* TO CITY */}
              <div className="md:col-span-4 relative group">
                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Going To</span>
                  </div>
                  <input
                    type="text"
                    value={destCity}
                    onChange={(e) => setDestCity(e.target.value)}
                    placeholder="Enter destination city"
                    className="w-full bg-transparent text-base sm:text-lg font-black text-slate-900 focus:outline-none mt-1"
                  />
                  <span className="text-[10px] text-slate-500 block truncate font-medium">
                    Karnataka / Bangalore Majestic / Electronic City
                  </span>
                </div>
              </div>

              {/* DATE PICKER & SEARCH BUTTON */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Date of Journey</span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                      {selectedCalendarDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedCalendarDate('17 Oct 2026')}
                      className={`text-[10px] px-2 py-1 rounded font-bold transition ${
                        selectedCalendarDate.includes('17') ? 'bg-[#E23744] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setSelectedCalendarDate('18 Oct 2026')}
                      className={`text-[10px] px-2 py-1 rounded font-bold transition ${
                        selectedCalendarDate.includes('18') ? 'bg-[#E23744] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById('bus-results-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#E23744] hover:bg-[#C2185B] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-500/30 transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Buses</span>
                </button>
              </div>

            </div>

            {/* 14-DAY HORIZONTAL CALENDAR SCROLLER (AbhiBus exact landmark feature) */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>14-Day Lowest Fare Calendar &bull; Select Journey Date:</span>
                </span>
                <span className="text-[10px] text-[#E23744] font-bold hidden sm:inline">
                  Free Cancellation Guarantee Available on All Dates
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CALENDAR_DAYS.map((cal, i) => {
                  const isSelected = selectedCalendarDate === cal.fullDate;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedCalendarDate(cal.fullDate);
                        const el = document.getElementById('bus-results-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-center transition cursor-pointer border ${
                        isSelected 
                          ? 'bg-[#E23744] text-white border-[#E23744] shadow-md shadow-red-500/20'
                          : 'bg-slate-50 hover:bg-red-50 text-slate-700 border-slate-200 hover:border-red-300'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-bold block ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                        {cal.day}
                      </span>
                      <span className="text-xs font-black block mt-0.5">
                        {cal.date}
                      </span>
                      <span className={`text-[9px] font-bold block mt-0.5 ${isSelected ? 'text-amber-200' : 'text-emerald-600'}`}>
                        {cal.fare}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. ABHIBUS ASSURED REFUND GUARANTEES (The 4 Key Pillars)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ASSURED_PILLARS.map((pillar, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-900/5 border border-slate-200/80 hover:border-red-300 transition group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{pillar.title}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 text-[#E23744] border border-red-200">
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-[#E23744]">
                <span>SwiftBus Assured Guarantee</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. DISCOUNT OFFERS & PROMO CAROUSEL (AbhiBus Offers Section)
         ========================================================================= */}
      <section id="offers-section" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E23744] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                Exclusive Deals
              </span>
              <span className="text-xs text-slate-400 font-bold">&bull; Verified Today</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Bus Booking Discount Offers & Promo Coupons
            </h2>
          </div>
          <span className="text-xs font-bold text-[#E23744] hover:underline cursor-pointer">
            View All Offers ({DISCOUNT_OFFERS.length})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {DISCOUNT_OFFERS.map((offer, i) => (
            <div 
              key={i} 
              className="rounded-2xl bg-white p-4.5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  {offer.tag}
                </span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {offer.discount}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {offer.desc}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">{offer.minBooking}</span>
                  <span className="text-xs font-black text-[#E23744] tracking-wider font-mono">{offer.code}</span>
                </div>

                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-[#E23744] text-[10px] font-bold border border-red-200 transition cursor-pointer flex items-center gap-1"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. STATE ROAD TRANSPORT CORPORATIONS (18 SRTC DIRECTORY - Complete)
         ========================================================================= */}
      <section id="srtc-directory" className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Government Authorized RTC Partners</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                From SRTC (State Road Transport Corporation)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Official online booking partner for 18 State RTCs across India. Safe, punctual, and government-regulated fares.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                18 States Connected
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-red-50 text-[#E23744] text-xs font-bold">
                70,000+ Daily Buses
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SRTC_DIRECTORY.map((srtc, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setSourceCity(srtc.state);
                  const el = document.getElementById('bus-results-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-300 transition cursor-pointer text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center font-black text-[#E23744] text-xs shadow-xs group-hover:scale-105 transition">
                    {srtc.code.slice(0, 3)}
                  </div>
                  <h4 className="text-xs font-black text-slate-900 mt-2 group-hover:text-[#E23744] transition">
                    {srtc.code}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium line-clamp-2 mt-0.5">
                    {srtc.name}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 block">{srtc.routes}</span>
                  <span className="text-[10px] font-extrabold text-[#E23744] mt-1 inline-flex items-center gap-1 group-hover:underline">
                    Book Now ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. LIVE BUS RESULTS & INTERACTIVE SEAT BOOKING SECTION
         ========================================================================= */}
      <section id="bus-results-section" className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        
        {/* Results Header Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-xl font-black text-slate-900">
                {sourceCity} ➔ {destCity}
              </span>
              <span className="text-xs font-bold text-slate-400">({selectedCalendarDate})</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredBuses.length} Available Buses</strong> with Real-Time Seat Availability
            </span>
          </div>

          {/* Quick Filter Buttons & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Category Chips */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Buses' },
                { id: 'sleeper', label: 'AC Sleeper' },
                { id: 'seater', label: 'Seater' },
                { id: 'electric', label: '⚡ Electric EV' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    categoryFilter === cat.id 
                      ? 'bg-[#E23744] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="cheapest">Cheapest Price First</option>
              <option value="fastest">Fastest Duration</option>
              <option value="rating">Highest Passenger Rating</option>
              <option value="departure">Departure Time (Early to Late)</option>
            </select>
          </div>
        </div>

        {/* Bus List Cards */}
        <div className="space-y-4">
          {filteredBuses.map((bus) => {
            const isExpanded = expandedBusId === bus.id;

            return (
              <div 
                key={bus.id} 
                className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Main Card Summary */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Operator & Bus Specs */}
                  <div className="md:col-span-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {bus.operator}
                      </h3>
                      {bus.badge && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-red-50 text-[#E23744] border border-red-200">
                          {bus.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      {bus.busType}
                    </p>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-black text-[11px] flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-white" />
                        <span>{bus.rating}</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {bus.totalRatings.toLocaleString()} ratings
                      </span>
                      {bus.isElectric && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> Zero Emission
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Schedule Timings */}
                  <div className="md:col-span-5 flex items-center justify-between sm:justify-start sm:gap-6">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                        {bus.departureTime}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold block truncate max-w-[130px]">
                        {bus.departureLocation}
                      </span>
                    </div>

                    <div className="text-center px-2">
                      <span className="text-[10px] font-bold text-slate-400 block font-mono">
                        {bus.duration}
                      </span>
                      <div className="w-20 sm:w-24 h-0.5 bg-slate-300 relative my-1.5 mx-auto">
                        <div className="w-2 h-2 rounded-full bg-[#E23744] absolute -top-[3px] left-1/2 -translate-x-1/2" />
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold block">
                        On-Time Guarantee
                      </span>
                    </div>

                    <div>
                      <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                        {bus.arrivalTime}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold block truncate max-w-[130px]">
                        {bus.arrivalLocation}
                      </span>
                    </div>
                  </div>

                  {/* Price & Select Seats CTA */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="flex items-center md:justify-end gap-2">
                        <span className="text-xs text-slate-400 line-through">₹{bus.originalPrice}</span>
                        <span className="text-xl sm:text-2xl font-black text-[#E23744] font-mono">
                          ₹{bus.offerPrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 block">
                        {bus.seatsLeft} Seats Left ({bus.windowSeats} Single Window)
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedBusId(isExpanded ? null : bus.id)}
                      className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-sm ${
                        isExpanded
                          ? 'bg-slate-900 text-white'
                          : 'bg-[#E23744] hover:bg-[#C2185B] text-white shadow-red-500/20'
                      }`}
                    >
                      <span>{isExpanded ? 'Hide Layout' : 'Select Seat'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>

                {/* Amenities Strip */}
                <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                  <div className="flex flex-wrap items-center gap-4">
                    {bus.amenities.map((am, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{am}</span>
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-[#E23744]">
                    Free Cancellation up to 2 hrs before departure
                  </span>
                </div>

                {/* EXPANDABLE INTERACTIVE SEAT LAYOUT DRAWER */}
                {isExpanded && (
                  <div className="p-5 sm:p-8 bg-slate-100/70 border-t border-slate-200 space-y-6 animate-in slide-in-from-top-2">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Left: Bus Floorplan Layout */}
                      <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
                        
                        {/* Deck Switcher & Legend */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-100">
                          
                          {/* Deck Tabs */}
                          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                            <button
                              onClick={() => setActiveDeck('lower')}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                activeDeck === 'lower' ? 'bg-[#E23744] text-white shadow-xs' : 'text-slate-600'
                              }`}
                            >
                              Lower Deck ({bus.categoryType === 'sleeper' ? 'Berths' : 'Seats'})
                            </button>
                            <button
                              onClick={() => setActiveDeck('upper')}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                activeDeck === 'upper' ? 'bg-[#E23744] text-white shadow-xs' : 'text-slate-600'
                              }`}
                            >
                              Upper Deck (Berths)
                            </button>
                          </div>

                          {/* Legend */}
                          <div className="flex items-center gap-3 text-[10px] font-bold">
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-white border border-slate-300" />
                              <span>Available</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-emerald-600 text-white" />
                              <span>Selected</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-pink-100 border border-pink-300" />
                              <span>Ladies</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded bg-slate-300" />
                              <span>Booked</span>
                            </span>
                          </div>
                        </div>

                        {/* Bus Cabin Graphic */}
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 sm:p-6 bg-slate-50/50">
                          
                          {/* Front of bus indicator with steering */}
                          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 text-slate-400">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                              <SteeringWheelIcon className="w-5 h-5 text-slate-500" />
                              <span>Driver Cabin &bull; Front of Bus</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                              Entry Door
                            </span>
                          </div>

                          {/* 2+1 Sleeper Berths Grid */}
                          <div className="space-y-3">
                            {[1, 2, 3, 4, 5, 6].map((row) => {
                              const prefix = activeDeck === 'lower' ? 'L' : 'U';
                              const singleSeatId = `${prefix}${row}`;
                              const doubleSeatId1 = `${prefix}${row}A`;
                              const doubleSeatId2 = `${prefix}${row}B`;

                              const isBookedSingle = row === 3 || row === 5;
                              const isLadiesDouble = row === 2;
                              const isBookedDouble = row === 4;

                              const isSelectedSingle = selectedSeats.some(s => s.id === singleSeatId);
                              const isSelectedD1 = selectedSeats.some(s => s.id === doubleSeatId1);
                              const isSelectedD2 = selectedSeats.some(s => s.id === doubleSeatId2);

                              return (
                                <div key={row} className="flex items-center justify-between gap-4">
                                  
                                  {/* Single Window Berth */}
                                  <button
                                    disabled={isBookedSingle}
                                    onClick={() => handleToggleSeat({
                                      id: singleSeatId,
                                      name: `${singleSeatId} (Single Window)`,
                                      price: bus.offerPrice,
                                      deck: activeDeck
                                    })}
                                    className={`w-28 sm:w-32 h-11 rounded-xl text-xs font-black transition cursor-pointer border flex items-center justify-between px-3 ${
                                      isSelectedSingle
                                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102'
                                        : isBookedSingle
                                          ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                                          : 'bg-white hover:bg-red-50 text-slate-800 border-slate-300 hover:border-red-400'
                                    }`}
                                  >
                                    <span>{singleSeatId}</span>
                                    <span className="text-[9px] font-mono opacity-80">₹{bus.offerPrice}</span>
                                  </button>

                                  {/* Center Gangway / Aisle */}
                                  <div className="flex-1 text-center">
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                                      Aisle
                                    </span>
                                  </div>

                                  {/* Double Berth (Right Side) */}
                                  <div className="flex items-center gap-2">
                                    <button
                                      disabled={isBookedDouble}
                                      onClick={() => handleToggleSeat({
                                        id: doubleSeatId1,
                                        name: `${doubleSeatId1} (Aisle Berth)`,
                                        price: bus.offerPrice - 50,
                                        deck: activeDeck
                                      })}
                                      className={`w-24 sm:w-28 h-11 rounded-xl text-xs font-black transition cursor-pointer border flex items-center justify-between px-2.5 ${
                                        isSelectedD1
                                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                                          : isBookedDouble
                                            ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                                            : isLadiesDouble
                                              ? 'bg-pink-50 text-pink-700 border-pink-300'
                                              : 'bg-white hover:bg-red-50 text-slate-800 border-slate-300 hover:border-red-400'
                                      }`}
                                    >
                                      <span>{doubleSeatId1}</span>
                                      <span className="text-[9px] font-mono opacity-80">₹{bus.offerPrice - 50}</span>
                                    </button>

                                    <button
                                      disabled={isBookedDouble}
                                      onClick={() => handleToggleSeat({
                                        id: doubleSeatId2,
                                        name: `${doubleSeatId2} (Window Berth)`,
                                        price: bus.offerPrice,
                                        deck: activeDeck
                                      })}
                                      className={`w-24 sm:w-28 h-11 rounded-xl text-xs font-black transition cursor-pointer border flex items-center justify-between px-2.5 ${
                                        isSelectedD2
                                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                                          : isBookedDouble
                                            ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                                            : 'bg-white hover:bg-red-50 text-slate-800 border-slate-300 hover:border-red-400'
                                      }`}
                                    >
                                      <span>{doubleSeatId2}</span>
                                      <span className="text-[9px] font-mono opacity-80">₹{bus.offerPrice}</span>
                                    </button>
                                  </div>

                                </div>
                              );
                            })}
                          </div>

                        </div>

                      </div>

                      {/* Right: Boarding / Dropping & Live Fare Calculation */}
                      <div className="lg:col-span-5 space-y-4">
                        
                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#E23744]" />
                            <span>Select Boarding & Dropping Point</span>
                          </h4>

                          {/* Boarding Point */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Boarding Location (Pick-up)</label>
                            <select
                              value={boardingPoint}
                              onChange={(e) => setBoardingPoint(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option>Gachibowli ORR Junction - 21:30</option>
                              <option>Ameerpet Metro Pillar 1042 - 20:45</option>
                              <option>Lakdikapul Bus Bay - 21:00</option>
                              <option>MGBS Central Terminal Bay 14 - 21:45</option>
                              <option>Miyapur Allwyn Cross Roads - 20:15</option>
                            </select>
                          </div>

                          {/* Dropping Point */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Dropping Location (Drop-off)</label>
                            <select
                              value={droppingPoint}
                              onChange={(e) => setDroppingPoint(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option>Anand Rao Circle, Majestic - 06:15</option>
                              <option>Hebbal Outer Ring Road - 05:30</option>
                              <option>Silk Board Junction - 06:45</option>
                              <option>Electronic City Toll Plaza - 07:15</option>
                              <option>Shantinagar TTMC Bus Station - 06:30</option>
                            </select>
                          </div>
                        </div>

                        {/* Price Breakdown Card */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-xs font-black text-slate-900">Fare Summary</span>
                            <span className="text-xs font-bold text-[#E23744]">
                              {selectedSeats.length} Seat(s) Selected
                            </span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between text-slate-600">
                              <span>Selected Seats:</span>
                              <span className="font-bold text-slate-900">
                                {selectedSeats.length > 0 ? selectedSeats.map(s => s.name).join(', ') : 'None'}
                              </span>
                            </div>

                            <div className="flex justify-between text-slate-600">
                              <span>Base Ticket Fare:</span>
                              <span className="font-mono font-bold text-slate-900">₹{baseFareTotal.toLocaleString('en-IN')}</span>
                            </div>

                            <div className="flex justify-between text-slate-600">
                              <span>GST & Toll Cess (5%):</span>
                              <span className="font-mono text-slate-700">₹{gstAmount}</span>
                            </div>

                            {optInsurance && (
                              <div className="flex justify-between text-slate-600">
                                <span>Travel Insurance (₹15/pax):</span>
                                <span className="font-mono text-slate-700">₹{insuranceAmount}</span>
                              </div>
                            )}

                            {couponDiscount > 0 && (
                              <div className="flex justify-between text-emerald-600 font-bold">
                                <span>Promo ({appliedCoupon}):</span>
                                <span className="font-mono">- ₹{couponDiscount}</span>
                              </div>
                            )}

                            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm font-black text-slate-900">
                              <span>Total Amount:</span>
                              <span className="text-xl font-mono text-[#E23744]">
                                ₹{finalPayable.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          {/* Insurance Checkbox */}
                          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-[11px] text-blue-900 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={optInsurance}
                              onChange={(e) => setOptInsurance(e.target.checked)}
                              className="rounded text-[#E23744] focus:ring-red-500"
                            />
                            <span>Add Travel Insurance cover of ₹5,00,000 for ₹15</span>
                          </label>

                          <button
                            disabled={selectedSeats.length === 0}
                            onClick={() => {
                              setIsTicketConfirmed(false);
                              setIsBookingModalOpen(true);
                            }}
                            className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition cursor-pointer flex items-center justify-center gap-2 ${
                              selectedSeats.length > 0
                                ? 'bg-[#E23744] hover:bg-[#C2185B] text-white shadow-red-500/25 active:scale-98'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <span>Proceed to Passenger Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          8. LIVE BUS LOCATION TRACKING SIMULATOR (AbhiBus exact feature)
         ========================================================================= */}
      <section id="tracking-section" className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
              <span>Real-Time GPS Satellite Tracking</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Track Your Bus Live Location
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your booking PNR number or registered phone number to view live bus speedometer and GPS location on the highway.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl">
            <input 
              type="text"
              value={trackPnr}
              onChange={(e) => setTrackPnr(e.target.value)}
              placeholder="Enter PNR e.g. SV-8924017"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={() => setTrackingActive(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#E23744] hover:bg-[#C2185B] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition shadow cursor-pointer"
            >
              Track Location
            </button>
          </div>

          {trackingActive && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Live GPS Telemetry</span>
                  <span className="text-base font-black text-white">Garuda Royal Luxury Lines (Volvo B11R)</span>
                  <span className="text-xs text-slate-400 block mt-0.5">PNR: {trackPnr} &bull; Driver: S. Ramesh (+91 94401 22910)</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-400 font-mono">78 km/h</span>
                  <span className="text-[10px] text-slate-400 block">Cruising Speed</span>
                </div>
              </div>

              {/* Progress Line */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>{sourceCity} (Departed 21:15)</span>
                  <span className="text-emerald-400 font-mono">Current: Kurnool NH-44 Toll Plaza</span>
                  <span>{destCity} (ETA 05:45)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 relative overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-[#E23744] w-2/3 rounded-full animate-pulse" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Next Rest Stop: <strong>Kurnool Highway Food Plaza</strong> in 14 minutes. Bus is running on-time.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          8.5 YOUTUBE & INSTAGRAM WATCH SPACE (Able to play directly on page)
         ========================================================================= */}
      <section id="travel-media-space" className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E23744] text-xs font-bold mb-2 border border-red-200">
                <Film className="w-3.5 h-3.5" />
                <span>Travel Studio &bull; Play Inline (No Redirection)</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>YouTube Cabin Tours &amp; Instagram Reels</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Watch full HD 360° Volvo 9600 sleeper cabin walkthroughs, highway travel vlogs, and trending passenger reels <strong>playable right here on this page</strong> before you book your seat.
              </p>
            </div>

            {/* Filter Tabs & Social Channel Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setMediaTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    mediaTab === 'all'
                      ? 'bg-[#E23744] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Videos
                </button>
                <button
                  onClick={() => setMediaTab('youtube')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    mediaTab === 'youtube'
                      ? 'bg-[#FF0000] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <YouTubeIcon className="w-3.5 h-3.5 fill-current" />
                  <span>YouTube Vlogs</span>
                </button>
                <button
                  onClick={() => setMediaTab('instagram')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    mediaTab === 'instagram'
                      ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <InstagramIcon className="w-3.5 h-3.5 fill-current" />
                  <span>Instagram Reels</span>
                </button>
              </div>

              {/* Verified Follower Chips */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-red-50 text-[#FF0000] text-[11px] font-bold border border-red-200 flex items-center gap-1.5">
                  <YouTubeIcon className="w-3 h-3 fill-[#FF0000]" />
                  <span>140K Subs</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-pink-50 text-[#E1306C] text-[11px] font-bold border border-pink-200 flex items-center gap-1.5">
                  <InstagramIcon className="w-3 h-3 fill-[#E1306C]" />
                  <span>95K Followers</span>
                </span>
              </div>
            </div>
          </div>

          {/* MAIN INLINE THEATER PLAYER (Plays directly inside this box!) */}
          <div id="media-theater-player" className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl border border-slate-800">
            
            {/* Left: The Active Video Player Screen */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                {activeMediaItem.type === 'youtube' ? (
                  <iframe
                    key={activeMediaItem.embedUrl}
                    src={activeMediaItem.embedUrl}
                    title={activeMediaItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-black p-2">
                    <iframe
                      key={activeMediaItem.embedUrl}
                      src={activeMediaItem.embedUrl}
                      title={activeMediaItem.title}
                      className="w-full max-w-sm h-full rounded-xl border-0"
                      allow="encrypted-media"
                    />
                  </div>
                )}
              </div>

              {/* Video Title & Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      activeMediaItem.type === 'youtube'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                    }`}>
                      {activeMediaItem.type === 'youtube' ? 'YouTube HD' : 'Instagram Reel'}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{activeMediaItem.authorOrChannel}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-xs text-emerald-400 font-bold">{activeMediaItem.viewsOrLikes}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {activeMediaItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {activeMediaItem.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Now Playing Inline</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Playlist & Selector Sidebar */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold">
                  <span className="text-white flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-[#E23744]" />
                    <span>Up Next &bull; Click to Play</span>
                  </span>
                  <span className="text-slate-400">8 Videos Available</span>
                </div>

                <div className="space-y-2 mt-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                  {/* YouTube items */}
                  {YOUTUBE_TRAVEL_VLOGS.map(v => {
                    const isPlaying = activeMediaItem.id === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => {
                          setActiveMediaItem({
                            id: v.id,
                            type: 'youtube',
                            title: v.title,
                            embedUrl: v.embedUrl,
                            desc: v.desc,
                            authorOrChannel: v.channel,
                            viewsOrLikes: v.views
                          });
                        }}
                        className={`p-2.5 rounded-2xl border transition cursor-pointer flex gap-3 items-center ${
                          isPlaying 
                            ? 'bg-red-950/40 border-red-500 shadow-md' 
                            : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                        }`}
                      >
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                          <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white fill-white" />
                          </div>
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white">
                            {v.duration}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold text-red-400 uppercase block">{v.busModel}</span>
                          <h4 className="text-xs font-bold text-white truncate">{v.title}</h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{v.views}</span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Instagram items */}
                  {INSTAGRAM_REELS_GALLERY.map(r => {
                    const isPlaying = activeMediaItem.id === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => {
                          setActiveMediaItem({
                            id: r.id,
                            type: 'instagram',
                            title: r.title,
                            embedUrl: r.reelUrl,
                            desc: r.desc,
                            authorOrChannel: r.author,
                            viewsOrLikes: r.likes + ' Likes'
                          });
                        }}
                        className={`p-2.5 rounded-2xl border transition cursor-pointer flex gap-3 items-center ${
                          isPlaying 
                            ? 'bg-pink-950/40 border-pink-500 shadow-md' 
                            : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60'
                        }`}
                      >
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                          <img src={r.thumb} alt={r.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                            <span className="text-[8px] font-bold text-pink-300">Reel</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold text-pink-400 uppercase block">{r.tag}</span>
                          <h4 className="text-xs font-bold text-white truncate">{r.title}</h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{r.likes} likes &bull; {r.author}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions Pill */}
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All videos stream directly in this theater with zero external redirects.</span>
              </div>
            </div>

          </div>

          {/* DYNAMIC CUSTOM LINK EMBEDDER (Let users paste ANY YouTube or Instagram link to play here!) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-[#E23744]" />
                  <span>Play Any Custom YouTube Video or Instagram Reel Here</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Paste any YouTube URL (watch, youtu.be, shorts) or Instagram Reel link below to play it right here on the portal.
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Supported: YouTube &bull; Instagram Reels</span>
            </div>

            <form onSubmit={handlePlayCustomMedia} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={customMediaInput}
                onChange={(e) => setCustomMediaInput(e.target.value)}
                placeholder="Paste YouTube or Instagram link e.g. https://www.youtube.com/watch?v=XHOmBV4js_E"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500 shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E23744] hover:bg-[#C2185B] text-white text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Right Here</span>
              </button>
            </form>

            {customMediaError && (
              <p className="text-xs font-bold text-red-600 animate-in fade-in">
                {customMediaError}
              </p>
            )}
          </div>

          {/* DUAL SHOWCASE CAROUSEL: YOUTUBE VLOGS & INSTAGRAM REELS GRIDS */}
          <div className="space-y-6 pt-4">
            
            {/* 1. YOUTUBE FLEET VLOGS GRID */}
            {(mediaTab === 'all' || mediaTab === 'youtube') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <YouTubeIcon className="w-4 h-4 fill-[#FF0000]" />
                    <span>Featured YouTube Fleet Walkthroughs &amp; Bus Reviews</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">{YOUTUBE_TRAVEL_VLOGS.length} Videos</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {YOUTUBE_TRAVEL_VLOGS.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => {
                        setActiveMediaItem({
                          id: video.id,
                          type: 'youtube',
                          title: video.title,
                          embedUrl: video.embedUrl,
                          desc: video.desc,
                          authorOrChannel: video.channel,
                          viewsOrLikes: video.views
                        });
                        const el = document.getElementById('media-theater-player');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="rounded-2xl bg-white border border-slate-200 hover:border-red-400 shadow-xs hover:shadow-md transition cursor-pointer overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                        <img 
                          src={video.thumb} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-bold">
                          {video.duration}
                        </span>
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white uppercase tracking-wider">
                          {video.busModel}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase text-[#E23744] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                          {video.tag}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 group-hover:text-[#E23744] transition line-clamp-2 leading-snug">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>{video.channel}</span>
                          <span className="font-bold text-slate-700">{video.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. INSTAGRAM REELS SHOWCASE */}
            {(mediaTab === 'all' || mediaTab === 'instagram') && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 fill-[#E1306C]" />
                    <span>Trending Instagram Passenger Stories &amp; Berth Reels</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">{INSTAGRAM_REELS_GALLERY.length} Reels</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {INSTAGRAM_REELS_GALLERY.map((reel) => (
                    <div
                      key={reel.id}
                      onClick={() => {
                        setActiveMediaItem({
                          id: reel.id,
                          type: 'instagram',
                          title: reel.title,
                          embedUrl: reel.reelUrl,
                          desc: reel.desc,
                          authorOrChannel: reel.author,
                          viewsOrLikes: reel.likes + ' Likes'
                        });
                        const el = document.getElementById('media-theater-player');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="rounded-2xl bg-white border border-slate-200 hover:border-pink-400 shadow-xs hover:shadow-md transition cursor-pointer overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/5] w-full bg-slate-900 overflow-hidden">
                        <img 
                          src={reel.thumb} 
                          alt={reel.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20 flex flex-col justify-between p-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-pink-600/80 backdrop-blur-xs text-[9px] font-black text-white uppercase tracking-wider">
                              {reel.tag}
                            </span>
                            <InstagramIcon className="w-4 h-4 fill-white" />
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-pink-300 font-bold block">{reel.author}</span>
                            <h4 className="text-xs font-black text-white line-clamp-2 leading-snug">
                              {reel.title}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                              <span className="flex items-center gap-1 font-bold">
                                <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                                <span>{reel.likes}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{reel.comments}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-pink-600 group-hover:text-pink-700">
                        <span>Watch Reel Inline</span>
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      
{/* =========================================================================
          9. POPULAR INTERCITY BUS ROUTES IN INDIA (Complete 40+ Routes Directory)
         ========================================================================= */}
      <section id="popular-routes-section" className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E23744]">Nationwide Corridors</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Popular Bus Routes Across India</h2>
          <p className="text-xs text-slate-500">Instant seat reservation across the busiest intercity highways with top operators.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_50_POPULAR_ROUTES.map((route, i) => (
            <div 
              key={i}
              onClick={() => {
                setSourceCity(route.from);
                setDestCity(route.to);
                const el = document.getElementById('bus-search-bar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white hover:bg-red-50/50 border border-slate-200 hover:border-red-400 transition cursor-pointer flex items-center justify-between gap-3 shadow-xs group"
            >
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#E23744] transition">
                  {route.from} ➔ {route.to}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                  <span>{route.buses}</span>
                  <span>&bull;</span>
                  <span>{route.time}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 block font-bold">Fares from</span>
                <span className="text-sm font-black text-[#E23744] font-mono">{route.fare}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          10. PRIVATE BUS OPERATORS DIRECTORY (AbhiBus Top Partners Showcase)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#E23744] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>6,200+ Bus Partners Across India</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Top Private Luxury Bus Operators
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified high-deck Volvo, Scania, and Electric coaches with certified safety and GPS telematics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRIVATE_OPERATORS.map((op, i) => (
              <div 
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#E23744] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {op.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      {op.rating}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 mt-2">
                    {op.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                    {op.type}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-semibold">{op.reviews} happy travelers</span>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('bus-results-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-bold text-[#E23744] hover:underline cursor-pointer"
                  >
                    View Fleet ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. WHY CHOOSE US / STATS COUNTER SECTION (AbhiBus Numbers)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-slate-900 via-[#1C2430] to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Why Choose SwiftBus for Online Bus Ticket Booking?
            </h2>
            <p className="text-xs text-slate-400">
              Experience the next generation of travel with India's 4.8-star rated online bus ticket booking platform. Trusted by millions across 9,50,000+ routes with instant free refunds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-[#E23744] font-mono block">9,50,000+</span>
              <span className="text-xs font-bold text-white block">Bus Routes</span>
              <span className="text-[10px] text-slate-400 block">Unparalleled intercity choices</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">6,200+</span>
              <span className="text-xs font-bold text-white block">Bus Partners</span>
              <span className="text-[10px] text-slate-400 block">State RTCs & private fleets</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">60 Seconds</span>
              <span className="text-xs font-bold text-white block">Fastest Booking</span>
              <span className="text-[10px] text-slate-400 block">Paperless WhatsApp M-Tickets</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-blue-400 font-mono block">24/7 Support</span>
              <span className="text-xs font-bold text-white block">Customer Care</span>
              <span className="text-[10px] text-slate-400 block">Always available assistance</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono block">100% Free</span>
              <span className="text-xs font-bold text-white block">Instant Refunds</span>
              <span className="text-[10px] text-slate-400 block">Zero fee cancellation</span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono block">100k+</span>
              <span className="text-xs font-bold text-white block">Discounted Buses</span>
              <span className="text-[10px] text-slate-400 block">Up to ₹500 off coupons</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. COMPREHENSIVE SEO CONTENT & KNOWLEDGE GUIDE (Exact from content.md)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10 text-slate-700">
          
          {/* Section 1: Online Bus Booking Services */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Online Bus Booking Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SwiftBus Direct is India's leading online bus ticket booking service provider. Check out budget friendly offers and save big with discount coupons to book bus tickets at the lowest price with us. You can check the bus schedules, compare prices, and find all the information you need to plan an ideal and comfortable journey. In case you need to cancel the ticket or change the dates, you can save both time and money by choosing instant refund options. Browse through all your bus route options, and use our advanced smart filters to ensure a reliable and comfortable journey.
            </p>
          </div>

          {/* Section 2: Online Bus Ticket Booking at Lowest Price & Types */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Online Bus Ticket Booking at Lowest Price
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With our portal, travellers can book bus tickets online at the lowest ticket fares. Travellers can choose their favourite coach for online bus booking. Our platform is the right place for reserving bus tickets as you will find a wide range of Private buses and SRTC (State Road Transport Corporation) buses available online.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
              {BUS_TYPES_CATALOG.map((bt, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#E23744]" />
                    <span>{bt.name}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {bt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Benefits of Booking Bus Tickets Online */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Benefits of Booking Bus Tickets Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In this day and age of technology, offline modes of bus ticket booking are no longer preferred. Online ticket booking is easy, fast, and hassle-free. Here is a list of all the benefits of booking bus tickets online:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Avoid standing in long queues at offline counter booking bays.',
                'No more hassle of approaching commission-charging travel agents.',
                'Choose from over 6,200 private operators and 18 State RTC services.',
                'Check real-time seat availability and exact live floorplans.',
                'Get transparent bus departure timings, boarding & dropping point maps.',
                'Access to exclusive payment partner discounts, UPI cashbacks, and promo codes.',
                'Free Cancellation: Get 100% refund if your plans change.',
                '24/7 round-the-clock priority customer support.',
                'Real-time GPS bus tracking telemetry on Google Maps.',
                '100% paperless M-Ticket delivered instantly to WhatsApp and SMS.'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-[#E23744] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: How to Book Bus Tickets Online */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              How to Book Bus Tickets Online in 6 Simple Steps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOW_TO_BOOK_STEPS.map((st, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xl font-black text-[#E23744] font-mono block">
                    {st.step}
                  </span>
                  <h4 className="text-xs font-black text-slate-900">{st.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Last Hour Ticket Booking */}
          <div className="space-y-3 pt-6 border-t border-slate-100 bg-red-50/50 p-6 rounded-2xl border border-red-100">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E23744]" />
              <span>Last Hour Ticket Booking & Unplanned Travel Deals</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most online bus bookings in India are unplanned, with 32% of passengers reserving tickets on the day of travel and 24% one day before the journey. Keeping this in mind, our system ensures buses are available round the clock 24/7 by listing all scheduled fleets. Many of our bus partners provide last-minute deals offering up to 25% discount on the bus ticket fare. You can experience ultimate flexibility in both bus timings and price choices.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================================================
          13. DOWNLOAD APP BANNER (AbhiBus App Promo)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-600 to-[#C2185B] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-white/20 text-white tracking-wider border border-white/30">
              Use code: SWIFTFIRST
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Download the App &amp; Start Booking
            </h2>
            <p className="text-xs sm:text-sm text-red-100">
              Get exclusive mobile-only fares, live GPS tracking directly on your lock screen, and priority customer care. Rated 4.8★ by over 2.5 million travellers.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/20 text-left">
                <span className="text-[9px] uppercase font-bold text-slate-300 block">Get it on</span>
                <span className="text-xs font-black text-white">Google Play Store</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/20 text-left">
                <span className="text-[9px] uppercase font-bold text-slate-300 block">Download on</span>
                <span className="text-xs font-black text-white">Apple App Store</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl text-slate-900 text-center shadow-2xl shrink-0">
            <div className="w-32 h-32 mx-auto bg-slate-900 rounded-xl p-2 flex items-center justify-center">
              <QrCode className="w-24 h-24 text-white" />
            </div>
            <span className="text-[11px] font-black text-slate-900 block mt-2">Scan to Download</span>
            <span className="text-[9px] font-bold text-[#E23744]">4.8★ (2.5M+ Reviews)</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. ONLINE BUS BOOKING FAQS (Categorized Tabs & Accordions)
         ========================================================================= */}
      <section id="faqs-section" className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions on Bus Ticket Booking
          </h2>
          <p className="text-xs text-slate-500">Everything you need to know about booking, cancellation, and boarding passes.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'general', label: 'General' },
            { id: 'ticket', label: 'Ticket-Related' },
            { id: 'payment', label: 'Payments' },
            { id: 'cancellation', label: 'Cancellation & Refund' },
            { id: 'insurance', label: 'Travel Insurance' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setFaqTab(cat.id as any);
                setOpenFaqIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                faqTab === cat.id
                  ? 'bg-[#E23744] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-3">
          {COMPREHENSIVE_FAQS[faqTab].map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#E23744]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          15. PASSENGER CHECKOUT & DIGITAL M-TICKET MODAL
         ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5 my-8 border border-slate-200">
            
            <button
              onClick={() => {
                setIsBookingModalOpen(false);
                setIsTicketConfirmed(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isTicketConfirmed ? (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E23744]">
                    Checkout &bull; Instant Confirmation
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Lead Passenger Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your digital M-Ticket and boarding pass will be delivered via WhatsApp and SMS.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-slate-900">{sourceCity} ➔ {destCity}</span>
                    <span className="text-slate-600 block text-[11px]">{activeBus.operator} &bull; Seat(s): {selectedSeats.map(s => s.name).join(', ')}</span>
                  </div>
                  <span className="text-base font-black text-[#E23744] font-mono">
                    ₹{finalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Full Name (as per Govt ID)</label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Age</label>
                      <input
                        type="number"
                        required
                        value={passengerAge}
                        onChange={(e) => setPassengerAge(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Gender</label>
                      <select
                        value={passengerGender}
                        onChange={(e) => setPassengerGender(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Mobile (WhatsApp M-Ticket)</label>
                      <input
                        type="tel"
                        required
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Email ID</label>
                      <input
                        type="email"
                        required
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free Cancellation guaranteed up to 2 hours before bus departure.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#E23744] hover:bg-[#C2185B] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 transition cursor-pointer"
                >
                  Pay ₹{finalPayable.toLocaleString('en-IN')} &amp; Generate M-Ticket
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
                    Your M-Ticket is Ready!
                  </h3>
                  <p className="text-xs text-slate-500">
                    A copy of this digital boarding pass has been sent to <strong>{passengerPhone}</strong> via WhatsApp.
                  </p>
                </div>

                {/* Digital Ticket Card */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-[#E23744] font-black">SWIFTBUS DIRECT</span>
                    <span className="text-emerald-400 font-bold">PNR: {generatedPnr}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[9px]">ROUTE</span>
                      <span className="text-white font-bold">{sourceCity} ➔ {destCity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">DATE &amp; TIME</span>
                      <span className="text-white font-bold">{selectedCalendarDate} &bull; {activeBus.departureTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">PASSENGER</span>
                      <span className="text-white font-bold">{passengerName} ({passengerAge} {passengerGender})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">SEAT NUMBER(S)</span>
                      <span className="text-emerald-400 font-bold">{selectedSeats.map(s => s.name).join(', ')}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
                    <span>Pickup: {boardingPoint.split(' - ')[0]}</span>
                    <QrCode className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`M-Ticket ${generatedPnr} downloaded as PDF!`)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setIsTicketConfirmed(false);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#E23744] hover:bg-[#C2185B] text-white text-xs font-bold transition cursor-pointer"
                  >
                    Done &amp; Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          16. SHARE MODAL
         ========================================================================= */}
      {isShareModalOpen && profile && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}

      {/* =========================================================================
          17. MEGA FOOTER (AbhiBus exact comprehensive directory footer)
         ========================================================================= */}
      <footer className="bg-[#1C2430] text-slate-400 text-xs pt-12 pb-8 px-4 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Top Bus Routes</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#bus-search-bar" className="hover:text-white transition">Hyderabad to Bangalore Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Bangalore to Chennai Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Pune to Mumbai Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Delhi to Jaipur Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Mumbai to Goa Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Delhi to Manali Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Bangalore to Hyderabad Bus</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Delhi to Dehradun Bus</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Top Cities</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#bus-search-bar" className="hover:text-white transition">Hyderabad Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Bangalore Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Chennai Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Vijayawada Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Tirupati Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Mumbai Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Pune Bus Tickets</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">Kolkata Bus Tickets</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Top SRTC Buses</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#srtc-directory" className="hover:text-white transition">APSRTC Online Booking</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">TGSRTC Bus Booking</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">KSRTC Airavat Sleeper</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">GSRTC Gurjarnagri</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">UPSRTC Janrath AC</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">RSRTC Rajasthan Express</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">Kerala RTC Swift Deluxe</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">HRTC Himgaurav Volvo</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Bus Operators</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#bus-results-section" className="hover:text-white transition">Garuda Royal Lines</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Apex SmartCoach</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Greenline EV Intercity</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Deccan Voyager</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Skyline Diamond Sleeper</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Shyamoli Paribahan</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">Kaveri Grand Tourist</a></li>
                <li><a href="#bus-results-section" className="hover:text-white transition">FreshBus Electric</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Quick Links</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><a href="#offers-section" className="hover:text-white transition">Bus Booking Offers</a></li>
                <li><a href="#tracking-section" className="hover:text-white transition">Live Bus Tracking</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">Zero Cancellation Policy</a></li>
                <li><a href="#why-choose-us" className="hover:text-white transition">Roadside Assistance</a></li>
                <li><a href="#why-choose-us" className="hover:text-white transition">Women Safety Zone</a></li>
                <li><a href="#faqs-section" className="hover:text-white transition">FAQ &amp; Help Center</a></li>
                <li><a href="#srtc-directory" className="hover:text-white transition">SRTC Directory</a></li>
                <li><a href="#bus-search-bar" className="hover:text-white transition">M-Ticket Status</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>&copy; 2026 SwiftBus Direct (Travel Ticketing Prototype). All rights reserved. Zero RedBus/AbhiBus Copyrighted IP.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>&bull;</span>
              <span>Terms of Use</span>
              <span>&bull;</span>
              <span>Security Audited</span>
            </div>
          </div>
        </div>
      </footer>
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


function SteeringWheelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v8" />
      <path d="m4.93 16.07 6.14-3.07" />
      <path d="m19.07 16.07-6.14-3.07" />
    </svg>
  );
}
