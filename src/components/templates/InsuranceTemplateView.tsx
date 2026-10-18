'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Download, 
  Check, 
  Clock, 
  MapPin, 
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
  Info, 
  Share2, 
  Navigation,
  QrCode,
  Mail,
  ShieldCheck,
  Shield,
  Award,
  Layers,
  Heart,
  ExternalLink,
  User,
  Users,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Umbrella,
  HeartPulse,
  Car,
  Wallet,
  Percent,
  FileCheck,
  AlertCircle,
  Hospital,
  Building2,
  TrendingUp,
  FileText,
  BadgeCheck,
  Lock,
  FileSpreadsheet,
  RefreshCw,
  PhoneCall,
  Zap,
  Play
} from 'lucide-react';
import QRCode from 'qrcode';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem, GalleryItem, TestimonialItem, SocialLinkItem } from '@/lib/types';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon from '@/components/common/SocialIcon';
import ShareCardModal from '@/components/common/ShareCardModal';

interface InsuranceTemplateViewProps {
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

// Partner Insurers Data
const INSURER_PARTNERS = [
  {
    id: 'hdfc-life',
    name: 'HDFC Life Insurance',
    type: 'Life & Pension',
    csr: '99.50%',
    solvency: '198%',
    networkHospitals: '14,000+',
    tat: '2 Hours Express',
    highlight: 'Lowest claim dispute ratio & 1-day settlement on eligible terms'
  },
  {
    id: 'max-life',
    name: 'Max Life Insurance',
    type: 'Term Life & Savings',
    csr: '99.65%',
    solvency: '192%',
    networkHospitals: '12,500+',
    tat: 'Same Day Settlement',
    highlight: 'Seamless NRI video medicals & high-sum-assured special underwriting'
  },
  {
    id: 'star-health',
    name: 'Star Health & Allied Insurance',
    type: 'Health Specialist',
    csr: '90.2% Cashless',
    solvency: '175%',
    networkHospitals: '14,200+',
    tat: '30-45 Mins Cashless TAT',
    highlight: 'In-house doctor TPA network without 3rd party settlement delays'
  },
  {
    id: 'care-health',
    name: 'Care Health Insurance',
    type: 'Comprehensive Health',
    csr: '95.20%',
    solvency: '182%',
    networkHospitals: '13,500+',
    tat: 'Instant Pre-Auth',
    highlight: 'Unlimited automatic restoration of sum insured & worldwide emergency'
  },
  {
    id: 'tata-aig',
    name: 'Tata AIG General Insurance',
    type: 'Health & Motor',
    csr: '99.10%',
    solvency: '210%',
    networkHospitals: '11,000+',
    tat: 'Digital Surveys',
    highlight: 'Zero depreciation bumper-to-bumper car claims & global cashless'
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General',
    type: 'Health & Auto',
    csr: '99.30%',
    solvency: '255%',
    networkHospitals: '12,000+',
    tat: '9 Mins Digital Live Survey',
    highlight: '10,000+ cashless garages & AI-powered instant health pre-auth'
  }
];

// Curated Verified Insurance Plans (Premier Flagship Solutions)
export interface InsurancePlanItem {
  id: string;
  category: string;
  title: string;
  insurer: string;
  uin: string;
  sumAssured: string;
  startingPremium: number;
  tenure: string;
  tag: string;
  badge: string;
  popular: boolean;
  imageUrl: string;
  features: string[];
  recommendedFor: string;
}

const DEFAULT_INSURANCE_PLANS: InsurancePlanItem[] = [
  {
    id: 'plan-eshield-insta',
    category: 'Term Life Insurance',
    title: 'Term Life Shield Insta',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111N134V02',
    sumAssured: '₹1,00,00,000 - ₹5,00,00,000',
    startingPremium: 680,
    tenure: 'Up to Age 85 / 100',
    tag: 'Highest Settlement (99.4%)',
    badge: 'TERM INSURANCE',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    features: [
      'Pure Protection Term Plan with instantaneous digital underwriting',
      'Accelerated Terminal Illness Benefit up to ₹2 Crore included at no extra cost',
      'Special discounted premium rates for healthy non-smokers and female lives',
      'Accidental Death & Permanent Total Disability rider options',
      '100% Tax deduction on premiums under Section 80C & tax-free maturity under 10(10D)'
    ],
    recommendedFor: 'Salaried professionals, self-employed business founders, and family breadwinners.'
  },
  {
    id: 'plan-platina-plus',
    category: 'Savings & Income Plans',
    title: 'Guaranteed Savings Shield (Smart Platina)',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111N132V03',
    sumAssured: 'Guaranteed Annual Income for 15-30 Years',
    startingPremium: 2500,
    tenure: 'Policy Term: Up to 30 Years',
    tag: 'Guaranteed Regular Income',
    badge: 'SAVINGS & INCOME',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    features: [
      'Guaranteed regular annual income payouts locked for up to 30 years',
      '100% Return of Total Premiums paid returned to your nominee on maturity',
      'Choice between Life Income and Guaranteed Income payout modes',
      'Shielded from volatile market rates and bank FD rate cuts',
      'Triple tax-exempt returns under Section 80C and Section 10(10D)'
    ],
    recommendedFor: 'Individuals seeking fixed, stress-free secondary income and capital safety.'
  },
  {
    id: 'plan-retire-smart',
    category: 'Retirement Plans',
    title: 'Retirement Pension Shield (Retire Smart)',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111L094V02',
    sumAssured: 'Guaranteed Lifelong Pension & Annuity',
    startingPremium: 3000,
    tenure: 'Whole Life Pension Payout',
    tag: 'Lifelong Dignified Income',
    badge: 'RETIREMENT',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80',
    features: [
      'Fixed monthly or annual pension credited directly to your bank account for life',
      '100% Return of Purchase Price handed to your children / nominee on demise',
      'Joint Life Option: Pension continues seamlessly to your spouse for their lifetime',
      'Systematic accumulation with sovereign asset backing & zero stock crash risk',
      'Additional Section 80CCC tax exemptions on retirement contributions'
    ],
    recommendedFor: 'Working professionals aged 35 to 60 securing an independent golden retirement.'
  },
  {
    id: 'plan-scholar-plus',
    category: 'Child Higher Education',
    title: 'Child Education Shield (Smart Scholar)',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111L073V03',
    sumAssured: '₹25,00,00,000 - ₹1,50,00,000',
    startingPremium: 1800,
    tenure: 'Matures at Child Age 18 or 21',
    tag: 'Inbuilt Premium Waiver',
    badge: 'CHILD PLANS',
    popular: false,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    features: [
      'Guaranteed university graduation milestones timed with overseas college admissions',
      'Inbuilt Waiver of Premium: all future premiums paid by insurer if parent passes away',
      'Triple-compounding growth with sovereign bonuses and loyalty additions',
      'Complete capital gains tax exemption under Section 10(10D)',
      'Dedicated fund for medical, engineering, and Ivy League master’s tuition'
    ],
    recommendedFor: 'Parents with young children aged 0 to 12 planning future educational security.'
  },
  {
    id: 'plan-arogya-shield',
    category: 'Health Insurance',
    title: 'Arogya Health Shield & Hospital Cash',
    insurer: 'Top Health & Life Insurance Partners',
    uin: 'UIN: 111N116V02',
    sumAssured: '₹25 Lakhs - ₹1 Crore Cover',
    startingPremium: 1040,
    tenure: 'Lifelong Renewable',
    tag: 'Zero Room Rent Capping',
    badge: 'HEALTH SHIELD',
    popular: true,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    features: [
      'Zero Room-Rent Sub-limit: Single private AC room and ICU suites covered 100%',
      'Unlimited 100% Restoration of Sum Insured for unrelated hospitalizations',
      'Day-1 OPD consultations, diagnostic tests, and expensive consumables covered',
      'Cashless hospital admission at 14,500+ network hospitals with < 45-min pre-auth',
      'Comprehensive Section 80D tax deductions up to ₹75,000 annually'
    ],
    recommendedFor: 'Families with young children, senior parents, and high-deductible upgrades.'
  },
  {
    id: 'plan-saral-jeevan',
    category: 'Term Life Insurance',
    title: 'Standard Term Life (Saral Jeevan Bima)',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111N128V01',
    sumAssured: '₹5,00,00,000 - ₹25,00,000',
    startingPremium: 420,
    tenure: 'Up to Age 70',
    tag: 'Standardized IRDAI Plan',
    badge: 'STANDARD TERM',
    popular: false,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    features: [
      'Standardized term life plan mandated by IRDAI with uniform claim definitions',
      'Hassle-free documentation with simple tele-medical verification',
      'Pure lump-sum financial protection to family nominees on demise',
      'Affordable entry-level rates for first-time insurance buyers',
      'Tax benefits under Section 80C up to ₹1,50,000'
    ],
    recommendedFor: 'First-time insurance buyers, self-employed individuals, and young earners.'
  },
  {
    id: 'plan-wealth-builder',
    category: 'ULIP & Investment',
    title: 'Smart Wealth Builder (Market Linked)',
    insurer: 'Leading Life Insurance Partners',
    uin: 'UIN: 111L095V03',
    sumAssured: '10x Annual Premium + Market Returns',
    startingPremium: 3500,
    tenure: '10 to 30 Years Term',
    tag: 'Market Linked Upside',
    badge: 'WEALTH CREATION',
    popular: false,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    features: [
      'Dual benefit of life protection combined with high-growth equity market funds',
      'Guaranteed Loyalty Additions credited to boost long-term compounding returns',
      'Zero premium allocation charges from 11th year onwards',
      'Unlimited free switches between Equity, Debt, and Balanced funds',
      'Tax-free withdrawals and maturity proceeds under Section 10(10D)'
    ],
    recommendedFor: 'Investors seeking inflation-beating wealth creation with life cover.'
  },
  {
    id: 'plan-topup-shield',
    category: 'Super Top-Up',
    title: 'High-Cover Super Top-Up Health Shield',
    insurer: 'Leading Health Insurance Partners',
    uin: 'UIN: 111N098V01',
    sumAssured: '₹90,00,00,000 (Deductible ₹10L)',
    startingPremium: 350,
    tenure: 'Annual Renewal',
    tag: 'Ultra Low Premium (~₹12/day)',
    badge: 'SUPER TOP-UP',
    popular: false,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    features: [
      'Bridges the gap over corporate employer insurance at just ~₹12/day',
      'Aggregates multiple hospitalizations in a policy year to cross the deductible threshold',
      'Comprehensive coverage for robotic surgeries, chemotherapy & organ donor costs',
      'Zero co-payment across all tiers of network hospitals in India',
      'Section 80D tax deduction up to ₹75,000 for self and senior parents'
    ],
    recommendedFor: 'Corporate employees upgrading base ₹5L/₹10L company mediclaim.'
  }
];

// Real Customer Claim Testimonials
const VERIFIED_CLAIM_STORIES = [
  {
    id: 'claim-1',
    patient: 'Ramesh K. (Father of Amitabh Saxena)',
    hospital: 'Narayana Institute of Cardiac Sciences, Bengaluru',
    condition: 'Emergency Triple Vessel Coronary Bypass Surgery',
    claimedAmount: '₹12,40,000',
    settledAmount: '₹12,40,000 (100% Settled)',
    tat: '65 Minutes Cashless Approval',
    rating: 5,
    story: 'My father suffered an acute chest seizure at 2 AM. Rajesh responded immediately on the emergency hotline, contacted the hospital TPA desk, and coordinated cashless authorization before morning surgery. Zero out-of-pocket payment.',
    author: 'Amitabh Saxena',
    role: 'VP at J.P. Morgan, Mumbai'
  },
  {
    id: 'claim-2',
    patient: 'Sunita & Newborn Twins',
    hospital: 'Apollo Cradle & Children’s Hospital, Hyderabad',
    condition: 'High-Risk Twin Delivery & 12-Day NICU Incubator Care',
    claimedAmount: '₹8,90,000',
    settledAmount: '₹8,90,000 (100% Cashless)',
    tat: '45 Minutes Pre-Authorization',
    rating: 5,
    story: 'Most standard mediclaim policies have strict limits on newborn incubators and day-1 baby care. Because Rajesh guided us into a comprehensive floater with day-1 newborn cover, both babies received world-class NICU care with complete cashless peace of mind.',
    author: 'Kunal Deshmukh',
    role: 'Senior Tech Lead, Microsoft'
  },
  {
    id: 'claim-3',
    patient: 'Late Vikram Singhal Family',
    hospital: 'Term Life Death Benefit Claim',
    condition: 'Tragic Heart Attack (Natural Causes at Age 41)',
    claimedAmount: '₹2,50,00,000',
    settledAmount: '₹2,50,00,000 (Transferred to Nominee Account)',
    tat: '6 Working Days Full Settlement',
    rating: 5,
    story: 'When my husband passed away suddenly, our entire world shattered. Rajesh personally visited our home, prepared every death claim document, submitted the claim with the insurer, and got the full ₹2.5 Crore death benefit credited to my bank account with zero dispute.',
    author: 'Pooja Singhal',
    role: 'Homemaker & Mother, Pune'
  }
];

// Premier Insurance Hero Carousel Slides
export const INSURANCE_HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'WITH YOU. FOR EVERY RESPONSIBILITY. FOR EVERY POSSIBILITY.',
    tagline: 'Family Protection & Financial Security',
    title: 'Secure Your Family’s Tomorrow with Comprehensive Term Life Shield',
    subtitle: 'High sum assured pure term protection up to ₹5 Crore with instant digital underwriting, terminal illness benefit, and 30-min cashless priority desk.',
    bgImage: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=1600&q=80',
    primaryCtaText: 'Calculate Term Premium',
    primaryCtaLink: '#calculator',
    secondaryCtaText: 'Explore Term Plans',
    secondaryCtaLink: '#plans',
    stats: [
      { label: 'Claim Settlement', value: '99.4%' },
      { label: 'Solvency Ratio', value: '2.09 (Strong)' },
      { label: 'Active Lives Insured', value: '4,500+' }
    ]
  },
  {
    id: 'slide-2',
    badge: 'GUARANTEED REGULAR ANNUAL INCOME',
    tagline: 'Savings & Income Plans',
    title: 'Guaranteed Savings Shield: Assured Regular Income for 30 Years',
    subtitle: 'Lock in guaranteed annual income regardless of market volatility. 100% Return of Premium handed to nominee with triple tax exemption.',
    bgImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
    primaryCtaText: 'Get Guaranteed Quote',
    primaryCtaLink: '#calculator',
    secondaryCtaText: 'Explore Savings Plans',
    secondaryCtaLink: '#plans',
    stats: [
      { label: 'Guaranteed Payouts', value: 'Up to 30 Years' },
      { label: 'Section 80C & 10(10D)', value: '100% Tax Free' },
      { label: 'Return of Purchase Price', value: '100% Back' }
    ]
  },
  {
    id: 'slide-3',
    badge: 'RETIREMENT PEACE OF MIND',
    tagline: 'Pension & Sovereign Annuity',
    title: 'Retirement Pension Shield: Independent & Dignified Golden Years',
    subtitle: 'Build a solid retirement corpus with market-linked upside or guaranteed lifelong pension payouts. Enjoy stress-free health & travel freedom.',
    bgImage: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=1600&q=80',
    primaryCtaText: 'Estimate Pension',
    primaryCtaLink: '#calculator',
    secondaryCtaText: 'Explore Pension Plans',
    secondaryCtaLink: '#plans',
    stats: [
      { label: 'Lifelong Pension', value: 'Guaranteed' },
      { label: 'AUM Managed', value: '₹3.5+ Lakh Cr' },
      { label: 'Joint Life Option', value: 'Spouse Protected' }
    ]
  }
];

// Insurance Stage of Life Cards ("With you. For every responsibility. For every possibility.")
export const INSURANCE_STAGE_CARDS = [
  {
    id: 'term',
    title: 'Term Plans',
    subtitle: 'Family Protection',
    description: 'Ensure your loved ones receive high sum assured protection if life throws an unexpected turn.',
    badge: 'High Cover, Low Cost',
    photo: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Term Life Shield Insta',
    startingPremium: '₹680/mo',
    category: 'Term Life Insurance'
  },
  {
    id: 'savings',
    title: 'Savings Plans',
    subtitle: 'Guaranteed Income',
    description: 'Disciplined savings with guaranteed financial growth for milestones, house purchases, and luxury goals.',
    badge: 'Guaranteed Returns',
    photo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Guaranteed Savings Shield',
    startingPremium: '₹2,500/mo',
    category: 'Savings & Income Plans'
  },
  {
    id: 'retirement',
    title: 'Retirement Plans',
    subtitle: 'Lifelong Pension',
    description: 'Regular monthly pension credited for life, shielding your golden years against inflation.',
    badge: 'Lifelong Annuity',
    photo: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Retirement Pension Shield',
    startingPremium: '₹3,000/mo',
    category: 'Retirement Plans'
  },
  {
    id: 'child',
    title: 'Child Education',
    subtitle: 'Higher Studies Fund',
    description: 'Inbuilt Waiver of Premium guarantees college and overseas master’s funding even in your absence.',
    badge: 'Waiver of Premium',
    photo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Child Education Shield',
    startingPremium: '₹1,800/mo',
    category: 'Child Higher Education'
  },
  {
    id: 'health',
    title: 'Health & Mediclaim',
    subtitle: 'Cashless Hospitalization',
    description: 'Zero room-rent capping, Day-1 OPD covers, and cashless admission across 14,500+ network hospitals.',
    badge: '14,500+ Hospitals',
    photo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Arogya Health Shield',
    startingPremium: '₹1,040/mo',
    category: 'Health Insurance'
  },
  {
    id: 'ulip',
    title: 'ULIP & Wealth',
    subtitle: 'Market Compounding',
    description: 'Dual benefit of life protection combined with equity market growth and zero long-term tax deduction.',
    badge: 'Wealth Maximizer',
    photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    keyProduct: 'Smart Wealth Builder',
    startingPremium: '₹3,500/mo',
    category: 'ULIP & Investment'
  }
];

// Curated Instagram Reels matching Layout (Insurance Financial Protection & Claims)
export const INSURANCE_INSTAGRAM_REELS = [
  {
    id: 'reel-1',
    title: 'How to Avoid 99% Claim Rejection in Health Insurance',
    views: '142.8K views',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    caption: '3 golden documents to carry to hospital admissions to ensure instant cashless authorization without stress or deduction disputes.'
  },
  {
    id: 'reel-2',
    title: 'Term Life Cover: Why 20x Your Annual Salary is Mandatory',
    views: '98.4K views',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    caption: 'Calculate your exact family liability protection cover: home loans, children higher education fund, and inflation-proof income replacement.'
  },
  {
    id: 'reel-3',
    title: 'Hidden Room Rent Sub-Limit Capping Explained',
    views: '76.2K views',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    caption: 'Why picking a deluxe hospital room when your policy has a 1% room rent cap causes proportionate deductions on surgeon, doctor, and ICU bills!'
  },
  {
    id: 'reel-4',
    title: 'Child Higher Education & Inbuilt Waiver of Premium',
    views: '118.5K views',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    caption: 'How Waiver of Premium guarantees your child’s university education milestones remain 100% funded regardless of life uncertainties.'
  }
];

// Curated YouTube Playlist Items matching Layout (Insurance Masterclasses with Working Video Embeds)
export const INSURANCE_YOUTUBE_PLAYLIST_ITEMS = [
  {
    id: 'yt-item-1',
    title: 'Cashless Mediclaim Secrets: Avoiding TPA Deductions',
    subtitle: 'Hospital Claim Guide • 94K views',
    duration: '14:20',
    quality: '4K UHD',
    embedUrl: 'https://www.youtube.com/embed/0HIUhPM-4Sk?autoplay=1&rel=0',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    description: 'Step-by-step blueprint to get zero-out-of-pocket hospital claims settled within 60 minutes across 14,000+ cashless network hospitals.'
  },
  {
    id: 'yt-item-2',
    title: 'The Best Term Insurance Guide: No Mis-selling',
    subtitle: 'Underwriting Masterclass • 82K views',
    duration: '16:10',
    quality: '4K UHD',
    embedUrl: 'https://www.youtube.com/embed/wETGWFYsqMM?autoplay=1&rel=0',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description: 'Understand regular pay vs limited pay, medical disclosure rules, and how Section 45 protects your nominees after 3 years.'
  },
  {
    id: 'yt-item-3',
    title: 'Section 80C, 80D & 10(10D) Tax Optimization Guide',
    subtitle: 'Tax Strategy • 67K views',
    duration: '11:35',
    quality: 'HD 1080p',
    embedUrl: 'https://www.youtube.com/embed/q7iGqIna4Ss?autoplay=1&rel=0',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    description: 'Save up to ₹75,000 on health mediclaim deductions and get 100% tax-free maturity payouts with sovereign compliance.'
  }
];

export default function InsuranceTemplateView({
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
  viewMode,
  setViewMode,
  showViewToggle
}: InsuranceTemplateViewProps) {
  // Navigation & Active Tabs
  const [activeTab, setActiveTab] = useState<'term' | 'health' | 'retire' | 'child'>('term');
  const [selectedPlanCategory, setSelectedPlanCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [websiteQrUrl, setWebsiteQrUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  // YouTube in-window video player state
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);
  const [activeYouTubeVideo, setActiveYouTubeVideo] = useState({
    id: 'yt-featured',
    title: 'Term Insurance Masterclass: 2x Sum Assured at 1/3rd Price',
    subtitle: 'Featured Masterclass • 4K UHD',
    duration: '18:45',
    quality: '4K UHD',
    embedUrl: 'https://www.youtube.com/embed/liuKy5IVcHU?autoplay=1&rel=0',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
    description: 'Learn how to calculate optimum family cover, evaluate Claim Settlement Ratios, eliminate unnecessary riders, and secure low fixed premium rates.',
    tag: 'FEATURED MASTERCLASS'
  });

  // Instagram Reel in-window viewer state
  const [activeInstagramReel, setActiveInstagramReel] = useState<{
    id: string;
    title: string;
    views: string;
    imageUrl: string;
    caption: string;
  } | null>(null);

  // Insurance Hero Carousel & Quick Quote State
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [quickQuoteCategory, setQuickQuoteCategory] = useState<'term' | 'savings' | 'retire'>('term');
  const [quickQuoteAge, setQuickQuoteAge] = useState<number>(30);
  const [quickQuoteCover, setQuickQuoteCover] = useState<string>('₹1 Crore');
  const [quickQuoteMobile, setQuickQuoteMobile] = useState<string>('');

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % INSURANCE_HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(slideTimer);
  }, []);



  // Emergency Claim Hotline State
  const [emergencyPatientName, setEmergencyPatientName] = useState('');
  const [emergencyHospitalName, setEmergencyHospitalName] = useState('');
  const [emergencyCity, setEmergencyCity] = useState('');
  const [emergencyPolicyNo, setEmergencyPolicyNo] = useState('');
  const [emergencyType, setEmergencyType] = useState<'emergency' | 'planned'>('emergency');

  // Term Calculator State
  const [termAge, setTermAge] = useState<number>(30);
  const [termCoverCrores, setTermCoverCrores] = useState<number>(1.5);
  const [termCoverAge, setTermCoverAge] = useState<number>(75);
  const [termIsSmoker, setTermIsSmoker] = useState<boolean>(false);
  const [termIncludeCriticalIllness, setTermIncludeCriticalIllness] = useState<boolean>(true);
  const [termIncludeAccidental, setTermIncludeAccidental] = useState<boolean>(true);

  // Health Calculator State
  const [healthEldestAge, setHealthEldestAge] = useState<number>(34);
  const [healthSumInsuredLakhs, setHealthSumInsuredLakhs] = useState<number>(25);
  const [healthFamilyType, setHealthFamilyType] = useState<'self' | 'couple' | 'family2kids' | 'parents'>('family2kids');
  const [healthZeroRoomRent, setHealthZeroRoomRent] = useState<boolean>(true);
  const [healthHasDiabetes, setHealthHasDiabetes] = useState<boolean>(false);

  // Retirement Calculator State
  const [retireCurrentAge, setRetireCurrentAge] = useState<number>(32);
  const [retireTargetAge, setRetireTargetAge] = useState<number>(60);
  const [retireMonthlySavings, setRetireMonthlySavings] = useState<number>(15000);

  // Child Calculator State
  const [childCurrentAge, setChildCurrentAge] = useState<number>(4);
  const [childCollegeAge, setChildCollegeAge] = useState<number>(18);
  const [childTargetCorpusLakhs, setChildTargetCorpusLakhs] = useState<number>(50);

  // Clean WhatsApp Number & Phone
  const whatsappNumber = useMemo(() => {
    return getCleanWhatsAppNumber(profile);
  }, [profile, getCleanWhatsAppNumber]);

  const phoneDisplay = profile.phone || '+91 98765 24321';
  
  // Clean Phone digits for tel: links
  const cleanPhoneDigits = useMemo(() => {
    return (profile.phone || '+91 98765 24321').replace(/[^0-9+]/g, '');
  }, [profile.phone]);

  // Advisor Credentials
  const advisorName = profile.name || 'Rajesh Sengupta';
  const advisorCompany = profile.company || 'Insurance Advisory & Wealth Planning';
  const advisorDesignation = profile.designation || 'MDRT Life Member | Senior Insurance Advisor';
  const insuranceConfig = profile.sectionData?.insurance || {};
  const irdaNumber = insuranceConfig.irdaiNumber || (insuranceConfig as any).irdaiLicence || 'IRDAI/AGN/2012/849102';
  const claimSettlementRatio = insuranceConfig.claimSettlementRatio || '99.4%';
  const cashlessHospitals = insuranceConfig.cashlessHospitalsCount || (insuranceConfig as any).cashlessHospitals || '14,500+';
  const totalClaimsSettled = insuranceConfig.totalClaimsSettled || '₹14.8 Cr+';
  const emergencyPhone = insuranceConfig.emergencyClaimPhone || profile.phone || '+91 98765 43210';
  const experienceYears = insuranceConfig.experienceYears || '12+ Years';

  // Resolved Social and Contact Links with fallbacks
  const socialLinks = useMemo(() => {
    const list: SocialLinkItem[] = profile.sectionData?.socials?.items || (profile as any).socials || [];
    const findUrl = (platform: string) => {
      const match = list.find((s: SocialLinkItem) => s.platform?.toLowerCase().includes(platform) || (s.url && s.url.toLowerCase().includes(platform)));
      return match?.url;
    };

    return {
      whatsapp: findUrl('whatsapp') || `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${advisorName}! I want to consult regarding Insurance coverage.`)}`,
      phone: findUrl('phone') || `tel:${cleanPhoneDigits}`,
      email: findUrl('email') || `mailto:${profile.email || 'rajesh.sengupta@insurance-advisory.in'}`,
      linkedin: findUrl('linkedin') || 'https://linkedin.com/in/rajesh-sengupta-mdrt',
      youtube: findUrl('youtube') || 'https://youtube.com/@insurance_official',
      instagram: findUrl('instagram') || 'https://instagram.com/insuranceadvisory',
      twitter: findUrl('twitter') || 'https://twitter.com/insuranceadv',
      telegram: findUrl('telegram') || 'https://t.me/insuranceadvisory',
      facebook: findUrl('facebook') || 'https://facebook.com/insuranceadvisory',
      maps: findUrl('maps') || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${advisorCompany} ${profile.address || 'BKC Mumbai'}`)}`,
      website: profile.website || currentUrl || 'https://oneclickbiz.in/v/prof-insurance'
    };
  }, [profile, whatsappNumber, cleanPhoneDigits, advisorName, advisorCompany, currentUrl]);

  // Setup current URL, QR and Light Theme
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);


      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF'
        }
      })
        .then(data => setWebsiteQrUrl(data))
        .catch(() => {});
    }
  }, []);

  // Term Premium Calculations
  const calculatedTermPremium = useMemo(() => {
    let ageFactor = 1.0;
    if (termAge <= 25) ageFactor = 0.72;
    else if (termAge <= 30) ageFactor = 1.0;
    else if (termAge <= 35) ageFactor = 1.35;
    else if (termAge <= 40) ageFactor = 1.85;
    else if (termAge <= 45) ageFactor = 2.65;
    else if (termAge <= 50) ageFactor = 3.85;
    else if (termAge <= 55) ageFactor = 5.4;
    else ageFactor = 7.5;

    let baseRate = 800 * termCoverCrores * ageFactor;
    if (termIsSmoker) baseRate *= 1.48;
    if (termIncludeCriticalIllness) baseRate += 220 * termCoverCrores;
    if (termIncludeAccidental) baseRate += 110 * termCoverCrores;

    const monthly = Math.round(baseRate);
    const annual = Math.round(monthly * 11.2);
    const taxSaving80C = Math.min(annual * 0.312, 46800);

    return {
      monthly,
      annual,
      taxSaving: Math.round(taxSaving80C)
    };
  }, [termAge, termCoverCrores, termIsSmoker, termIncludeCriticalIllness, termIncludeAccidental]);

  // Health Premium Calculations
  const calculatedHealthPremium = useMemo(() => {
    let base = 850;
    if (healthEldestAge <= 30) base = 750;
    else if (healthEldestAge <= 40) base = 1050;
    else if (healthEldestAge <= 50) base = 1650;
    else if (healthEldestAge <= 60) base = 2600;
    else base = 4200;

    let familyMultiplier = 1.0;
    if (healthFamilyType === 'couple') familyMultiplier = 1.65;
    else if (healthFamilyType === 'family2kids') familyMultiplier = 2.25;
    else if (healthFamilyType === 'parents') familyMultiplier = 2.8;

    const coverageFactor = Math.sqrt(healthSumInsuredLakhs / 10);
    let totalMonthly = base * familyMultiplier * coverageFactor;
    if (healthHasDiabetes) totalMonthly *= 1.25;
    if (healthZeroRoomRent) totalMonthly *= 1.1;

    const monthly = Math.round(totalMonthly);
    const annual = Math.round(monthly * 11.5);
    const taxSaving80D = Math.min(annual * 0.312, healthFamilyType === 'parents' ? 75000 : 25000);

    return {
      monthly,
      annual,
      taxSaving: Math.round(taxSaving80D)
    };
  }, [healthEldestAge, healthFamilyType, healthSumInsuredLakhs, healthHasDiabetes, healthZeroRoomRent]);

  // Retirement Pension Calculations
  const calculatedRetirePension = useMemo(() => {
    const yearsToInvest = Math.max(1, retireTargetAge - retireCurrentAge);
    const totalPrincipal = retireMonthlySavings * 12 * yearsToInvest;
    const r = 0.095 / 12;
    const n = yearsToInvest * 12;
    const corpus = Math.round(retireMonthlySavings * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const monthlyPension = Math.round((corpus * 0.072) / 12);

    return {
      yearsToInvest,
      totalPrincipal,
      corpus,
      monthlyPension
    };
  }, [retireCurrentAge, retireTargetAge, retireMonthlySavings]);

  // Child Higher Education Calculations
  const calculatedChildFund = useMemo(() => {
    const yearsRemaining = Math.max(1, childCollegeAge - childCurrentAge);
    const targetCorpus = childTargetCorpusLakhs * 100000;
    const r = 0.11 / 12;
    const n = yearsRemaining * 12;
    const monthlyNeeded = Math.round((targetCorpus * r) / ((Math.pow(1 + r, n) - 1) * (1 + r)));

    return {
      yearsRemaining,
      monthlyNeeded,
      targetCorpus
    };
  }, [childCurrentAge, childCollegeAge, childTargetCorpusLakhs]);

  // WhatsApp Quote Handlers
  const handleSendTermWhatsAppQuote = () => {
    trackAction('term_calculator_whatsapp');
    const msg = `Hello ${advisorName}! 👋\n\nI calculated a Term Insurance estimate on your OneClickBiz portal:\n\n• *My Age:* ${termAge} Years\n• *Life Cover Required:* ₹${termCoverCrores} Crore\n• *Cover Up To Age:* ${termCoverAge} Years\n• *Tobacco / Smoking:* ${termIsSmoker ? 'Yes' : 'No (Non-Smoker)'}\n• *Critical Illness Cover:* ${termIncludeCriticalIllness ? 'Yes (64 Illnesses)' : 'No'}\n• *Accidental Death Rider:* ${termIncludeAccidental ? 'Yes' : 'No'}\n\n*Estimated Premium:* ~₹${calculatedTermPremium.monthly.toLocaleString()}/month (or ₹${calculatedTermPremium.annual.toLocaleString()}/year)\n*Tax Savings under Sec 80C:* ~₹${calculatedTermPremium.taxSaving.toLocaleString()}/year\n\nPlease share official policy comparison proposals with zero commission bias. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSendHealthWhatsAppQuote = () => {
    trackAction('health_calculator_whatsapp');
    const familyLabels = {
      self: 'Individual (Self Only)',
      couple: 'Self + Spouse',
      family2kids: 'Family Floater (Self + Spouse + 2 Children)',
      parents: 'Senior Citizen Parents (2 Adults)'
    };
    const msg = `Hello ${advisorName}! 👋\n\nI calculated a Comprehensive Health Mediclaim estimate on your OneClickBiz portal:\n\n• *Family Type:* ${familyLabels[healthFamilyType]}\n• *Eldest Member Age:* ${healthEldestAge} Years\n• *Sum Insured Cover:* ₹${healthSumInsuredLakhs} Lakhs\n• *Zero Room Rent Capping:* ${healthZeroRoomRent ? 'Required (No sub-limits)' : 'Standard'}\n• *Pre-existing Conditions:* ${healthHasDiabetes ? 'Diabetes / Hypertension' : 'None (Healthy)'}\n\n*Estimated Premium:* ~₹${calculatedHealthPremium.monthly.toLocaleString()}/month (or ₹${calculatedHealthPremium.annual.toLocaleString()}/year)\n*Tax Savings under Sec 80D:* ~₹${calculatedHealthPremium.taxSaving.toLocaleString()}/year\n\nPlease check cashless network hospital eligibility in my area and share plan details. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSendRetireWhatsAppQuote = () => {
    trackAction('retire_calculator_whatsapp');
    const msg = `Hello ${advisorName}! 👋\n\nI calculated a Retirement Pension plan on your OneClickBiz portal:\n\n• *Current Age:* ${retireCurrentAge} Years\n• *Planned Retirement Age:* ${retireTargetAge} Years (Investing for ${calculatedRetirePension.yearsToInvest} years)\n• *Monthly Savings:* ₹${retireMonthlySavings.toLocaleString()}/month\n• *Projected Retirement Corpus:* ₹${(calculatedRetirePension.corpus / 10000000).toFixed(2)} Crores\n• *Guaranteed Lifelong Pension:* ~₹${calculatedRetirePension.monthlyPension.toLocaleString()}/month\n\nPlease share guaranteed return pension plans with 100% Return of Purchase Price. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSendChildWhatsAppQuote = () => {
    trackAction('child_calculator_whatsapp');
    const msg = `Hello ${advisorName}! 👋\n\nI calculated a Child Higher Education fund on your OneClickBiz portal:\n\n• *Child Age:* ${childCurrentAge} Years\n• *Target College Age:* ${childCollegeAge} Years (${calculatedChildFund.yearsRemaining} years horizon)\n• *Target Education Corpus:* ₹${childTargetCorpusLakhs} Lakhs\n• *Recommended Monthly Savings:* ~₹${calculatedChildFund.monthlyNeeded.toLocaleString()}/month\n\nPlease share child education plans with Waiver of Premium shield. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Emergency WhatsApp Intimation
  const handleSendEmergencyClaim = () => {
    trackAction('emergency_claim_hotline');
    const msg = `🚨 *EMERGENCY HOSPITAL CLAIM INTIMATION* 🚨\n\nDear ${advisorName},\n\nWe require immediate cashless hospital admission assistance:\n\n• *Patient Name:* ${emergencyPatientName || 'Emergency Admission'}\n• *Hospital Name:* ${emergencyHospitalName || 'Hospital Network Desk'}\n• *City / Location:* ${emergencyCity || 'India'}\n• *Admission Type:* ${emergencyType === 'emergency' ? 'Sudden Emergency (Within 24 Hours)' : 'Planned Admission'}\n• *Policy Number / Insurer:* ${emergencyPolicyNo || 'Need Policy Lookup'}\n\nPlease contact the hospital TPA desk immediately for cashless pre-authorization approval. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsEmergencyModalOpen(false);
  };

  // Dynamically resolve insurance plans: read from profile.sectionData.products.items or fallback to default
  const allInsurancePlans = useMemo(() => {
    const customItems = profile.sectionData?.products?.items;
    if (customItems && customItems.length > 0) {
      return customItems.map((prod, idx): InsurancePlanItem => {
        const p = prod as any;
        const rawFeatures = p.features;
        const featuresList = Array.isArray(rawFeatures)
          ? rawFeatures
          : (typeof rawFeatures === 'string' && rawFeatures.trim())
            ? rawFeatures.split(',').map((s: string) => s.trim()).filter(Boolean)
            : (p.description ? p.description.split('.').map((s: string) => s.trim()).filter(Boolean) : [
                'Pure Protection with instant digital underwriting',
                'Comprehensive Tax deduction under Section 80C & 10(10D)',
                '14,500+ Cashless Hospital Network admission desk'
              ]);

        return {
          id: p.id || `plan_custom_${idx}`,
          category: p.category || 'Term Life Insurance',
          title: p.name,
          insurer: p.insurer || 'Leading Life Insurance Partners',
          uin: p.uin || `UIN: 111N${idx + 1}34V02`,
          sumAssured: p.sumAssured || (p.priceLabel ? p.priceLabel : '₹1,00,00,000 - ₹5,00,00,000'),
          startingPremium: typeof p.price === 'number' ? p.price : 999,
          tenure: p.tenure || 'Up to Age 85 / 100',
          tag: p.tag || 'Highest Settlement (99.4%)',
          badge: p.badge || (p.category ? String(p.category).toUpperCase() : 'TERM INSURANCE'),
          popular: p.popular ?? (idx === 0 || idx === 1),
          imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
          features: featuresList,
          recommendedFor: p.recommendedFor || 'Salaried professionals, self-employed business founders, and family breadwinners.'
        };
      });
    }
    return DEFAULT_INSURANCE_PLANS;
  }, [profile.sectionData?.products?.items]);

  // Plan WhatsApp Inquiry
  const handlePlanWhatsAppInquiry = (plan: InsurancePlanItem) => {
    trackAction(`plan_inquiry_${plan.id}`);
    const msg = `Hello ${advisorName}! 👋\n\nI am interested in your *${plan.title}*:\n\n• *Insurer Partner:* ${plan.insurer}\n• *Sum Assured:* ${plan.sumAssured}\n• *Starting Premium:* ~₹${plan.startingPremium.toLocaleString()}/month\n• *Key Feature:* ${plan.features[0] || 'Comprehensive Coverage'}\n\nPlease share the official policy brochure (PDF), network hospital list, and custom quote for my family. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered Plans
  const filteredPlans = useMemo(() => {
    if (selectedPlanCategory === 'All') return allInsurancePlans;
    return allInsurancePlans.filter(p => p.category.toLowerCase().includes(selectedPlanCategory.toLowerCase()));
  }, [selectedPlanCategory, allInsurancePlans]);

  // Dynamic Verified Claim Stories (from profile testimonials if customized)
  const claimStories = useMemo(() => {
    const customTestimonials = profile.sectionData?.testimonials?.items;
    if (customTestimonials && customTestimonials.length > 0) {
      return customTestimonials.map((item, idx) => {
        const t = item as any;
        const clientName = t.clientName || t.name || 'Verified Client';
        return {
          id: t.id || `claim-custom-${idx}`,
          patient: clientName,
          hospital: t.clientCompany || t.project || 'Trusted Hospital Network',
          condition: 'Health & Life Claim Settlement',
          claimedAmount: '₹5,00,00,00+',
          settledAmount: '100% Cashless Settled',
          tat: 'Rapid 1-Hour Approval',
          rating: t.rating || 5,
          story: t.content || t.review || 'Exceptional claim assistance and end-to-end guidance from our dedicated advisor.',
          author: clientName,
          role: t.clientRole || t.role || 'Policyholder'
        };
      });
    }
    return VERIFIED_CLAIM_STORIES;
  }, [profile.sectionData?.testimonials?.items]);

  // Frequently Asked Questions
  const FAQS = [
    {
      q: 'What is Room Rent Capping and why is a Zero-Room-Rent-Cap policy critical?',
      a: 'Many standard policies cap room rent at 1% of the sum insured (e.g., ₹5,000/day on a ₹5L policy). If you stay in a room costing ₹8,000/day, the insurer imposes proportionate deductions on all doctor visits, surgeon fees, and OT charges—leaving you with 40-50% out-of-pocket bills! All our recommended health plans feature ZERO room rent capping, allowing single private AC rooms or luxury suites without penalties.'
    },
    {
      q: 'How does the Unlimited Automatic Restoration benefit work?',
      a: 'If your entire sum insured is exhausted during a major hospitalization in a policy year, our recommended policies automatically restore 100% of your sum insured an unlimited number of times for subsequent unrelated illnesses or separate family members—at zero extra premium.'
    },
    {
      q: 'Can NRI (Non-Resident Indian) professionals buy term life insurance in India?',
      a: 'Yes! NRIs living in the USA, UK, UAE, Canada, Singapore, and 60+ countries can buy high-cover Indian term policies (up to ₹10-15 Crores). Medical tests are conducted via tele-video checkups or partnered overseas labs. Premiums can be paid seamlessly via NRE/NRO accounts, and claim proceeds are fully repatriable with 100% tax exemption under Section 10(10D).'
    },
    {
      q: 'How fast is Cashless Hospital Pre-Authorization approved in an emergency?',
      a: 'With our in-house priority desk, emergency cashless authorization at top network hospitals (Apollo, Fortis, Max, Narayana, Manipal) is typically processed within 45 to 90 minutes. Simply notify us upon hospital admission and we follow up with the TPA desk directly.'
    },
    {
      q: 'What is the difference between Base Mediclaim and a Super Top-Up policy?',
      a: 'A base policy covers hospital expenses from ₹0 up to your sum insured (e.g. ₹5 Lakhs). A Super Top-up provides massive additional protection (e.g. ₹90 Lakhs) with a deductible (e.g. ₹10 Lakhs). Once your medical bills cross ₹10L in a policy year, the Super Top-up pays the entire rest! It costs only ~₹10 to ₹15/day, making it the most cost-effective way to get a ₹1 Crore safety net.'
    },
    {
      q: 'Are suicide or accidental deaths covered under Indian Term Insurance plans?',
      a: 'Accidental deaths are covered from Day 1 with optional double-payout riders. Suicide is covered after completion of 12 months from policy issuance (as mandated by IRDAI regulations). All legitimate death claims after the 3-year moratorium period cannot be disputed by any Indian insurer under Section 45 of the Insurance Act.'
    },
    {
      q: 'How do Section 80C and Section 80D tax savings work under the Old Tax Regime?',
      a: 'Under Section 80C, life insurance premiums up to ₹1,50,000 are deductible from gross income (saving up to ₹46,800 in the 30% tax bracket). Under Section 80D, health insurance premiums up to ₹25,000 for self/family, plus up to ₹50,000 for senior citizen parents, are deductible—totaling up to ₹75,000 in health deductions (saving up to ₹23,400).'
    },
    {
      q: 'What happens if I miss my renewal premium due date?',
      a: 'Insurers provide a 30-day grace period for annual/quarterly payments (15 days for monthly modes). Your coverage and waiting-period credits remain intact if paid within the grace period. We also send automated WhatsApp reminder alerts 15 days before your policy due date.'
    }
  ];

  return (
    <div className="w-full min-h-screen text-[#0F172A] font-sans relative selection:bg-blue-600 selection:text-white pb-20 antialiased overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. SINGLE UNIFIED BACKGROUND IMAGE: FAMILY HAPPILY LAUGHING    */}
      {/* ============================================================== */}
      <div className="ocb-happy-family-canvas" />

      {/* Dynamic Keyframes & Institutional Typography */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .ocb-font-serif {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .ocb-font-sans {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        /* Unified Fixed Background of Happy Laughing Family with High Contrast Luminous Scrim */
        .ocb-happy-family-canvas {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background-image: 
            linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(248, 250, 252, 0.85) 40%, rgba(241, 245, 249, 0.90) 100%),
            url('/images/happy-family-laughing.jpg');
          background-attachment: fixed;
          background-size: cover;
          background-position: center 25%;
          pointer-events: none;
          z-index: 0;
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

        /* High-Definition Frosted Glassmorphism Surfaces */
        .glass-surface, .ocb-glass-surface {
          position: relative;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 20px 45px -12px rgba(15, 23, 42, 0.12), inset 0 1px 1.5px rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .glass-surface:hover, .ocb-glass-surface:hover {
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 25px 50px -10px rgba(15, 23, 42, 0.18), inset 0 1px 2px rgba(255, 255, 255, 1);
        }

        .ocb-glass-surface-dark {
          position: relative;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.20);
          box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25);
          border-radius: 24px;
          overflow: hidden;
        }

        .glass-layer-effect {
          position: absolute;
          inset: 0;
          pointer-events: none;
          filter: url(#glass-distortion);
          opacity: 0.08;
          z-index: 1;
        }

        .glass-layer-tint {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(240, 244, 255, 0.15) 100%);
          z-index: 2;
        }

        .glass-layer-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 45%;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 100%);
          z-index: 3;
        }

        .glass-inner {
          position: relative;
          z-index: 4;
        }

        .insurance-badge-magenta {
          background: linear-gradient(90deg, #EA89A5 0%, #8C178C 100%);
          color: #FFFFFF;
        }

        .insurance-btn-primary {
          background: linear-gradient(135deg, #2B1F6B 0%, #150E42 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(43, 31, 107, 0.3);
        }

        .insurance-btn-primary:hover {
          background: linear-gradient(135deg, #372888 0%, #201560 100%);
          box-shadow: 0 6px 20px rgba(43, 31, 107, 0.4);
        }
      `
        }}
      />

      {/* SVG Distortion Filter for Authentic Glassmorphism Refraction */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <filter id="glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="16" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="3" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Subtle Ambient Color Lighting for Glass Refraction */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-400/20 via-indigo-300/15 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-blue-400/20 via-cyan-300/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-sky-400/20 via-indigo-300/15 to-transparent blur-3xl" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP TICKER MARQUEE (Frosted Glass Banner)                   */}
      {/* ============================================================== */}
      {/* 1. TOP TICKER MARQUEE (Minimal Frosted Glass Banner)           */}
      {/* ============================================================== */}
      <div className="relative z-40 bg-white/75 backdrop-blur-md text-slate-800 py-1.5 overflow-hidden border-b border-white/60 shadow-xs">
        <div className="ocb-marquee-track text-[11px] font-semibold tracking-wider">
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-blue-700 font-bold">ONECLICKBIZ FINANCIAL SECURITY & INSURANCE ADVISORY</span>
            <span>•</span>
            <span className="text-slate-700">🛡️ IRDAI CERTIFIED (REG: {irdaNumber})</span>
            <span>•</span>
            <span className="text-indigo-700 font-bold">🏆 MDRT USA LIFE MEMBER</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">⚡ 99.4% CLAIM SETTLEMENT RATIO</span>
            <span>•</span>
            <span>🏥 14,500+ CASHLESS NETWORK HOSPITALS</span>
            <span>•</span>
            <span className="text-rose-600 font-bold">📞 24/7 CLAIM DESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-blue-700 font-bold">ONECLICKBIZ FINANCIAL SECURITY & INSURANCE ADVISORY</span>
            <span>•</span>
            <span className="text-slate-700">🛡️ IRDAI CERTIFIED (REG: {irdaNumber})</span>
            <span>•</span>
            <span className="text-indigo-700 font-bold">🏆 MDRT USA LIFE MEMBER</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">⚡ 99.4% CLAIM SETTLEMENT RATIO</span>
            <span>•</span>
            <span>🏥 14,500+ CASHLESS NETWORK HOSPITALS</span>
            <span>•</span>
            <span className="text-rose-600 font-bold">📞 24/7 CLAIM DESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. STICKY BRAND HEADER & MINIMAL CLEAN NAVIGATION BAR          */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-white/80 shadow-xs transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Brand & Advisor Info */}
          <div className="flex items-center gap-2.5 min-w-0 shrink">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-purple-900/30 bg-white shadow-xs p-0.5">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                  alt={advisorName}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-2xs">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap ocb-font-serif">
                  {advisorName}
                </h1>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-purple-100 text-[#2B1F6B] text-[9px] font-black uppercase tracking-wide shrink-0">
                  Insurance
                </span>
                <span className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[9px] font-bold border border-emerald-200 shrink-0">
                  MDRT
                </span>
              </div>
              <p className="text-[10px] text-slate-700 font-bold truncate max-w-[150px] sm:max-w-xs">
                {advisorDesignation} • Reg: {irdaNumber}
              </p>
            </div>
          </div>

          {/* Clean Desktop Navigation Menu - Minimal Spacing */}
          <nav className="hidden lg:flex items-center gap-0.5 text-[11px] font-bold text-slate-700 bg-slate-100/95 backdrop-blur-md px-1.5 py-1 rounded-full border border-slate-200 shadow-2xs">
            <a href="#calculator" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Calculator</a>
            <a href="#plans" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Plans</a>
            <a href="#emergency" className="px-2.5 py-1 rounded-full text-rose-600 hover:bg-rose-50 transition-all font-black flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
              Claim Desk
            </a>
            <a href="#partners" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Top Insurers</a>
            <a href="#tax" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Tax Savings</a>
            <a href="#faqs" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">FAQs</a>
            <a href="#socials" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Social Spaces</a>
            <a href="#contact" className="px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-2xs transition-all">Contact</a>
          </nav>

          {/* Action CTAs & View Switcher - Minimal Sizes */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {showViewToggle && setViewMode && (
              <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-slate-100/90 border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-2 py-0.5 rounded-full font-bold transition flex items-center gap-1 text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'website' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Full Advisory Website"
                >
                  <Globe className="w-3 h-3" />
                  <span className="hidden sm:inline">Website</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-2 py-0.5 rounded-full font-bold transition flex items-center gap-1 text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Switch to Mobile Card View"
                >
                  <Smartphone className="w-3 h-3" />
                  <span className="hidden sm:inline">Card</span>
                </button>
              </div>
            )}

            {/* Share to Anywhere Button */}
            <button
              type="button"
              onClick={() => {
                setIsShareModalOpen(true);
                trackAction('nav_share_click');
              }}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
              title="Share to anywhere (WhatsApp, LinkedIn, X, Telegram, Facebook, QR code, Native share)"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Share</span>
            </button>



            {/* Emergency Hospital Alert CTA */}
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="px-2.5 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-xs flex items-center gap-1 transition active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Emergency Claim</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. HERO SECTION WITH UNIFIED HAPPY FAMILY BG & DUAL GLASS CARDS */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden z-10 transition-colors duration-300 py-4 sm:py-6">
        <div className="relative flex items-center">
          {/* Hero Content Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
              
              {/* Left Column: Slogans, Title, Subtitle, Stats & Slide Controls inside Frosted Glass Card */}
              <div className="lg:col-span-7 relative flex">
                <div className="glass-surface w-full flex flex-col justify-between shadow-xl">
                  {/* Glass Visual Layers */}
                  <div className="glass-layer-effect" />
                  <div className="glass-layer-tint" />
                  <div className="glass-layer-shine" />

                  {/* Glass Inner Content */}
                  <div className="glass-inner p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3.5">
                      {/* Official Slogan & Badge Ribbon */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider insurance-badge-magenta shadow-2xs">
                          {INSURANCE_HERO_SLIDES[heroSlideIndex].badge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900/10 border border-slate-900/10 text-slate-800 text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-xs">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span className="text-amber-900 font-bold">Family Protection & Financial Security</span>
                        </span>
                      </div>

                      {/* Slide Main Heading - Minimal, Balanced & Legible */}
                      <h1 className="text-xl sm:text-2xl lg:text-[28px] font-black text-slate-950 tracking-tight leading-snug ocb-font-serif">
                        {INSURANCE_HERO_SLIDES[heroSlideIndex].title}
                      </h1>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold max-w-xl">
                        {INSURANCE_HERO_SLIDES[heroSlideIndex].subtitle}
                      </p>

                      {/* Hero CTAs */}
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <a
                          href={INSURANCE_HERO_SLIDES[heroSlideIndex].primaryCtaLink}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>{INSURANCE_HERO_SLIDES[heroSlideIndex].primaryCtaText}</span>
                        </a>

                        <a
                          href={INSURANCE_HERO_SLIDES[heroSlideIndex].secondaryCtaLink}
                          className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                        >
                          <span>{INSURANCE_HERO_SLIDES[heroSlideIndex].secondaryCtaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => downloadVcfFile(profile)}
                          className="px-3 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                          title="Save Advisor Contact directly to smartphone"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-500" />
                          <span>Save VCF</span>
                        </button>

                        <button
                          onClick={() => setIsQrModalOpen(true)}
                          className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                          title="Scan QR Code"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Direct Contact Options with Original Logos in Hero Section */}
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/92 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-950 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Direct Advisor Contact & Consultation
                          </span>
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Available 24x7
                          </span>
                        </div>

                        {/* Primary Contact Buttons with Authentic Original Logos */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {/* WhatsApp */}
                          <a
                            href={socialLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackAction('hero_contact_whatsapp')}
                            className="p-2 rounded-xl bg-emerald-50/95 hover:bg-emerald-100 border border-emerald-300 text-slate-900 transition-all hover:scale-102 flex items-center gap-2 shadow-2xs group"
                            title="Chat with Advisor on WhatsApp"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                              <SocialIcon platform="whatsapp" size={16} colored={false} className="text-white fill-white" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-tight">WhatsApp</p>
                              <p className="text-[11px] font-black text-slate-950 truncate">Chat Now</p>
                            </div>
                          </a>

                          {/* Direct Phone Call */}
                          <a
                            href={socialLinks.phone}
                            onClick={() => trackAction('hero_contact_call')}
                            className="p-2 rounded-xl bg-sky-50/95 hover:bg-sky-100 border border-sky-300 text-slate-900 transition-all hover:scale-102 flex items-center gap-2 shadow-2xs group"
                            title={`Call ${phoneDisplay}`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                              <Phone className="w-3.5 h-3.5 fill-white text-white" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[9px] font-bold text-sky-800 uppercase tracking-tight">Direct Call</p>
                              <p className="text-[11px] font-black text-slate-950 truncate">{phoneDisplay}</p>
                            </div>
                          </a>

                          {/* Email Desk */}
                          <a
                            href={socialLinks.email}
                            onClick={() => trackAction('hero_contact_email')}
                            className="p-2 rounded-xl bg-rose-50/95 hover:bg-rose-100 border border-rose-300 text-slate-900 transition-all hover:scale-102 flex items-center gap-2 shadow-2xs group"
                            title="Email Advisor Desk"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#EA4335] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                              <Mail className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[9px] font-bold text-rose-800 uppercase tracking-tight">Email Desk</p>
                              <p className="text-[11px] font-black text-slate-950 truncate">Send Inquiry</p>
                            </div>
                          </a>

                          {/* Office Location */}
                          <a
                            href={socialLinks.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackAction('hero_contact_maps')}
                            className="p-2 rounded-xl bg-amber-50/95 hover:bg-amber-100 border border-amber-300 text-slate-900 transition-all hover:scale-102 flex items-center gap-2 shadow-2xs group"
                            title="View Office on Google Maps"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#FBBC04] text-slate-950 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                              <MapPin className="w-3.5 h-3.5 text-slate-950" />
                            </div>
                            <div className="min-w-0 text-left">
                              <p className="text-[9px] font-bold text-amber-900 uppercase tracking-tight">Office Map</p>
                              <p className="text-[11px] font-black text-slate-950 truncate">BKC Mumbai</p>
                            </div>
                          </a>
                        </div>

                        {/* Social Media Channels Row with Original Logos - Instagram & YouTube */}
                        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[10px] font-black text-slate-900 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            Official Channels:
                          </span>
                          <div className="flex items-center gap-2 flex-wrap">
                            <a
                              href={socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/40 text-slate-950 text-[10px] font-black flex items-center gap-1.5 transition-all hover:scale-105 shadow-2xs"
                              title="Follow on Instagram"
                            >
                              <SocialIcon platform="instagram" size={14} colored={true} />
                              <span>Instagram</span>
                            </a>

                            <a
                              href={socialLinks.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/40 text-slate-950 text-[10px] font-black flex items-center gap-1.5 transition-all hover:scale-105 shadow-2xs"
                              title="Watch on YouTube"
                            >
                              <SocialIcon platform="youtube" size={14} colored={true} />
                              <span>YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* 3 Slide Specific Proof Metrics in Glass Tiles */}
                      <div className="grid grid-cols-3 gap-2 pt-1 max-w-lg">
                        {INSURANCE_HERO_SLIDES[heroSlideIndex].stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 text-left shadow-2xs"
                          >
                            <p className="text-[10px] text-slate-700 font-bold truncate">
                              {stat.label}
                            </p>
                            <p className="text-xs sm:text-sm font-black text-slate-950 mt-0.5 truncate">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Carousel Slider Navigation Controls */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/70">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setHeroSlideIndex((prev) => (prev - 1 + INSURANCE_HERO_SLIDES.length) % INSURANCE_HERO_SLIDES.length)}
                            className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-2xs"
                            title="Previous Slide"
                            aria-label="Previous Slide"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setHeroSlideIndex((prev) => (prev + 1) % INSURANCE_HERO_SLIDES.length)}
                            className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-2xs"
                            title="Next Slide"
                            aria-label="Next Slide"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Indicator Pills */}
                        <div className="flex items-center gap-1">
                          {INSURANCE_HERO_SLIDES.map((slide, idx) => (
                            <button
                              key={slide.id}
                              onClick={() => setHeroSlideIndex(idx)}
                              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === heroSlideIndex
                                  ? 'w-5 bg-blue-600 shadow-xs'
                                  : 'w-2 bg-slate-300 hover:bg-slate-400'
                              }`}
                              title={`Slide ${idx + 1}`}
                              aria-label={`Slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-700 font-mono font-bold">
                        0{heroSlideIndex + 1} / 0{INSURANCE_HERO_SLIDES.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-Layer Glassmorphic Quick Quote & Advisor Card */}
              <div className="lg:col-span-5 relative">
                <div className="glass-surface shadow-xl">
                  {/* Glass Visual Layers */}
                  <div className="glass-layer-effect" />
                  <div className="glass-layer-tint" />
                  <div className="glass-layer-shine" />

                  {/* Glass Inner Content */}
                  <div className="glass-inner p-4 sm:p-5 space-y-3">
                    
                    {/* Header: Advisor Photo & Insurance Certification */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/60">
                      <div className="relative shrink-0">
                        <img
                          src={profile.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                          alt={advisorName}
                          className="w-10 h-10 rounded-xl object-cover border border-[#2B1F6B] shadow-2xs"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-600 text-white p-0.5 rounded-full border border-white">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-xs sm:text-sm font-black text-slate-900 truncate ocb-font-serif">
                            {advisorName}
                          </h2>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black insurance-badge-magenta shrink-0">
                            Insurance
                          </span>
                        </div>
                        <p className="text-[10px] text-[#2B1F6B] font-extrabold truncate">
                          {advisorDesignation}
                        </p>
                        <p className="text-[9px] text-slate-700 font-bold truncate">
                          IRDAI Regn: {irdaNumber}
                        </p>
                      </div>
                    </div>

                    {/* Quick Quote Estimator Title */}
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#2B1F6B] flex items-center gap-1">
                          <Calculator className="w-3 h-3 text-[#00A3E0]" /> Instant Premium Quote
                        </span>
                        <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                          100% Free
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-700 font-medium">
                        Select insurance goal to calculate custom quote:
                      </p>
                    </div>

                    {/* Category Selector Tabs */}
                    <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-slate-100/90 border border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => {
                          setQuickQuoteCategory('term');
                          setQuickQuoteCover('₹1 Crore');
                        }}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                          quickQuoteCategory === 'term'
                            ? 'bg-white text-[#2B1F6B] shadow-2xs border border-slate-200'
                            : 'text-slate-700 hover:text-slate-950 font-bold'
                        }`}
                      >
                        Term Life
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setQuickQuoteCategory('savings');
                          setQuickQuoteCover('₹10,000/mo');
                        }}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                          quickQuoteCategory === 'savings'
                            ? 'bg-white text-[#2B1F6B] shadow-2xs border border-slate-200'
                            : 'text-slate-700 hover:text-slate-950 font-bold'
                        }`}
                      >
                        Savings
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setQuickQuoteCategory('retire');
                          setQuickQuoteCover('₹15,000/mo');
                        }}
                        className={`py-1 px-1.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                          quickQuoteCategory === 'retire'
                            ? 'bg-white text-[#2B1F6B] shadow-2xs border border-slate-200'
                            : 'text-slate-700 hover:text-slate-950 font-bold'
                        }`}
                      >
                        Retirement
                      </button>
                    </div>

                    {/* Form Controls */}
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between items-center text-[10px] sm:text-[11px] mb-0.5">
                          <label className="font-bold text-slate-800">Your Current Age</label>
                          <span className="font-extrabold text-[#2B1F6B] bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200 text-[10px]">
                            {quickQuoteAge} Years
                          </span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="60"
                          value={quickQuoteAge}
                          onChange={(e) => setQuickQuoteAge(Number(e.target.value))}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2B1F6B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-800 mb-0.5">
                          {quickQuoteCategory === 'term' ? 'Target Life Cover' : 'Monthly Investment Budget'}
                        </label>
                        <select
                          value={quickQuoteCover}
                          onChange={(e) => setQuickQuoteCover(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2B1F6B]"
                        >
                          {quickQuoteCategory === 'term' ? (
                            <>
                              <option value="₹50 Lakhs">₹50 Lakhs Life Cover</option>
                              <option value="₹1 Crore">₹1 Crore High Sum Assured (Popular)</option>
                              <option value="₹2 Crores">₹2 Crores Comprehensive Cover</option>
                              <option value="₹5 Crores">₹5 Crores Max Estate Protection</option>
                            </>
                          ) : quickQuoteCategory === 'savings' ? (
                            <>
                              <option value="₹5,000/mo">₹5,000 / month (~₹60,000/yr)</option>
                              <option value="₹10,000/mo">₹10,000 / month (Guaranteed Regular Income)</option>
                              <option value="₹25,000/mo">₹25,000 / month (Wealth Compounder)</option>
                              <option value="₹50,000/mo">₹50,000 / month (High Networth Portfolio)</option>
                            </>
                          ) : (
                            <>
                              <option value="₹10,000/mo">₹10,000 / month (Early Pension)</option>
                              <option value="₹15,000/mo">₹15,000 / month (Comfortable Golden Years)</option>
                              <option value="₹30,000/mo">₹30,000 / month (Luxury Pension Corpus)</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-800 mb-0.5">
                          Your Mobile Number (Optional for Instant WhatsApp Quote)
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 98765 43210"
                          value={quickQuoteMobile}
                          onChange={(e) => setQuickQuoteMobile(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2B1F6B]"
                        />
                      </div>
                    </div>

                    {/* Instant WhatsApp Quote Button */}
                    <button
                      type="button"
                      onClick={() => {
                        trackAction('hero_quick_quote_whatsapp');
                        const catLabel = quickQuoteCategory === 'term' ? 'Term Life Protection (Shield Insta)' : quickQuoteCategory === 'savings' ? 'Guaranteed Savings Shield (Smart Platina)' : 'Retirement Pension Shield (Retire Smart)';
                        const msg = `Hello ${advisorName}! 👋\n\nI want an official Insurance quote from your OneClickBiz portal:\n\n• *Category:* ${catLabel}\n• *My Age:* ${quickQuoteAge} Years\n• *Selected Cover/Budget:* ${quickQuoteCover}\n${quickQuoteMobile ? `• *Contact Mobile:* ${quickQuoteMobile}\n` : ''}\nPlease share the customized quote and official policy brochure. Thank you!`;
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="w-full py-2.5 px-3 rounded-xl insurance-btn-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Get Instant Quote on WhatsApp</span>
                    </button>

                    {/* Direct Contact Desk with Original Brand Logos */}
                    <div className="pt-1.5 space-y-1.5 border-t border-slate-200/60">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-black uppercase tracking-wider text-[#2B1F6B] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#00A3E0]" /> Direct Contact Desk
                        </span>
                        <span className="font-semibold text-slate-500">
                          TAT &lt; 15 mins
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <a
                          href={socialLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAction('hero_contact_whatsapp')}
                          className="px-2 py-1 rounded-md bg-white hover:bg-emerald-50 border border-emerald-400/40 text-[10px] font-bold text-slate-800 flex items-center gap-1 transition shadow-2xs hover:scale-102"
                          title="WhatsApp Advisor"
                        >
                          <SocialIcon platform="whatsapp" size={12} colored={true} />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={socialLinks.phone}
                          onClick={() => trackAction('hero_contact_call')}
                          className="px-2 py-1 rounded-md bg-white hover:bg-sky-50 border border-sky-400/40 text-[10px] font-bold text-slate-800 flex items-center gap-1 transition shadow-2xs hover:scale-102"
                          title={`Call ${phoneDisplay}`}
                        >
                          <div className="w-3 h-3 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                            <Phone className="w-1.5 h-1.5 fill-white text-white" />
                          </div>
                          <span>Call</span>
                        </a>

                        <a
                          href={socialLinks.email}
                          onClick={() => trackAction('hero_contact_email')}
                          className="px-2 py-1 rounded-md bg-white hover:bg-red-50 border border-red-400/40 text-[10px] font-bold text-slate-800 flex items-center gap-1 transition shadow-2xs hover:scale-102"
                          title="Email Desk"
                        >
                          <SocialIcon platform="mail" size={12} colored={true} />
                          <span>Email</span>
                        </a>

                        <a
                          href={socialLinks.maps}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAction('hero_contact_maps')}
                          className="px-2 py-1 rounded-md bg-white hover:bg-amber-50 border border-amber-400/40 text-[10px] font-bold text-slate-800 flex items-center gap-1 transition shadow-2xs hover:scale-102"
                          title="Office Map"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335" />
                            <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
                          </svg>
                          <span>Office Map</span>
                        </a>

                        <a
                          href={socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackAction('hero_contact_web')}
                          className="px-2 py-1 rounded-md bg-white hover:bg-purple-50 border border-purple-400/40 text-[10px] font-bold text-slate-800 flex items-center gap-1 transition shadow-2xs hover:scale-102"
                          title="Portal"
                        >
                          <SocialIcon platform="website" size={12} colored={true} />
                          <span>Portal</span>
                        </a>
                      </div>
                    </div>

                    {/* Social Media Channels Strip with Original Logos - Instagram & YouTube */}
                    <div className="pt-1 flex items-center justify-between border-t border-slate-200/50 text-[9px] text-slate-500">
                      <span className="font-bold text-slate-700">Official Channels:</span>
                      <div className="flex items-center gap-2">
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Follow on Instagram" className="flex items-center gap-1 hover:scale-105 transition font-bold text-slate-800">
                          <SocialIcon platform="instagram" size={13} colored={true} />
                          <span>Instagram</span>
                        </a>
                        <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" title="Watch on YouTube" className="flex items-center gap-1 hover:scale-105 transition font-bold text-slate-800">
                          <SocialIcon platform="youtube" size={13} colored={true} />
                          <span>YouTube</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3.2 INSURANCE STAGE-OF-LIFE CARDS: WITH YOU FOR EVERY POSSIBILITY */}
      {/* ============================================================== */}
      <section id="stages" className="py-16 sm:py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full insurance-badge-magenta text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Family Protection & Financial Security
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight ocb-font-serif">
            With you. For every responsibility. <span className="text-[#2B1F6B]">For every possibility.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-800 font-bold">
            Discover tailored Insurance solutions built to protect family security, guarantee recurring wealth, support Ivy-League education, and safeguard peaceful golden years.
          </p>
        </div>

        {/* 6 Stage of Life Glassmorphic Cards Grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {INSURANCE_STAGE_CARDS.map((card) => (
            <div
              key={card.id}
              className="glass-surface group flex flex-col justify-between"
            >
              {/* Glass Layers */}
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />

              {/* Card Photo Banner */}
              <div className="relative h-48 overflow-hidden z-10">
                <img
                  src={card.photo}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/25 to-transparent" />
                <span className="absolute top-3 right-3 insurance-badge-magenta text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                  {card.badge}
                </span>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">
                    {card.subtitle}
                  </span>
                  <h3 className="text-lg font-black text-white ocb-font-serif leading-tight">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Card Inner Content */}
              <div className="glass-inner p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {card.description}
                  </p>

                  {/* Flagship Recommendation Pill */}
                  <div className="p-3 rounded-xl bg-purple-50/90 border border-purple-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-950 font-bold block">Flagship Plan</span>
                      <span className="text-xs font-black text-[#2B1F6B]">{card.keyProduct}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-purple-950 font-bold block">Starting At</span>
                      <span className="text-xs font-black text-emerald-700">{card.startingPremium}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      trackAction(`stage_quote_${card.id}`);
                      const msg = `Hello ${advisorName}! 👋\n\nI am interested in Insurance *${card.title}* (${card.keyProduct}).\n\nPlease share customized quotes, tax benefits, and policy details for my family. Thank you!`;
                      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl insurance-btn-primary font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Get Quote</span>
                  </button>

                  <a
                    href="#calculator"
                    onClick={() => {
                      if (card.id === 'term') setActiveTab('term');
                      else if (card.id === 'savings' || card.id === 'ulip') setActiveTab('term');
                      else if (card.id === 'retirement') setActiveTab('retire');
                      else if (card.id === 'child') setActiveTab('child');
                      else if (card.id === 'health') setActiveTab('health');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                    title="Calculate in Interactive Tool"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#2B1F6B]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3.5 KEY INSTITUTIONAL PILLARS & TRUST CARDS STRIP              */}
      {/* ============================================================== */}
      <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: 24/7 Priority Emergency Claim Desk */}
          <div className="glass-surface group flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />
            <div className="glass-inner p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-200">
                    24/7 Priority Desk
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                  Cashless Hospital Admission
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  30-minute cashless TPA pre-authorization support across 14,500+ network hospitals. Zero out-of-pocket delays.
                </p>
              </div>
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="mt-3.5 text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
              >
                <span>Intimate Emergency Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Zero-Commission Bias Comparison */}
          <div className="glass-surface group flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />
            <div className="glass-inner p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">
                    100% Fiduciary
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Zero-Bias Insurer Matrix
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Transparent, independent comparison across HDFC Life, Star Health, Max Life, Tata AIA, Care & ICICI Lombard.
                </p>
              </div>
              <a
                href="#partners"
                className="mt-3.5 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer inline-flex"
              >
                <span>Compare Top 6 Insurers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Free 360° Forensic Policy Health Audit */}
          <div className="glass-surface group flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />
            <div className="glass-inner p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                    Complimentary
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Forensic Policy Health Audit
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Uncover 1-2% room rent capping traps, proportionate deduction clauses, and disease waiting periods in old policies.
                </p>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="mt-3.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer"
              >
                <span>Book Free Policy Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Tax Optimization Maximizer & NRI Shield */}
          <div className="glass-surface group flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />
            <div className="glass-inner p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                    <Percent className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                    Save ₹70,200/Yr
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Section 80C & 80D Tax Shield
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Legally maximize tax exemptions with Section 10(10D) tax-free maturity and full FEMA-compliant NRI life coverage.
                </p>
              </div>
              <a
                href="#tax"
                className="mt-3.5 text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group-hover:gap-1.5 transition-all cursor-pointer inline-flex"
              >
                <span>View Tax Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE PREMIUM CALCULATOR                              */}
      {/* ============================================================== */}
      <section id="calculator" className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/90 shadow-2xs">
              <Calculator className="w-3.5 h-3.5" />
              Live Interactive Premium Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
              Instant Quote Calculator with 0% Commission Bias
            </h2>
            <p className="text-sm sm:text-base text-slate-800 font-bold">
              Compare estimated premiums, tax exemptions, and customized coverage options in real time.
            </p>
          </div>

          {/* Calculator Container */}
          <div className="max-w-4xl mx-auto glass-surface shadow-2xl">
            {/* Glass Visual Layers */}
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />

            <div className="glass-inner">
              {/* Tab Navigation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100/70 backdrop-blur-md border-b border-slate-200/80 p-1.5 gap-1">
                <button
                  onClick={() => setActiveTab('term')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'term'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Umbrella className="w-4 h-4" />
                  <span>Term Life</span>
                </button>

                <button
                  onClick={() => setActiveTab('health')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'health'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Health Mediclaim</span>
                </button>

                <button
                  onClick={() => setActiveTab('retire')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'retire'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Pension & Annuity</span>
                </button>

                <button
                  onClick={() => setActiveTab('child')}
                  className={`py-3 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'child'
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Child Education</span>
                </button>
              </div>

              {/* TAB CONTENT: 1. TERM LIFE INSURANCE */}
              {activeTab === 'term' && (
                <div className="p-6 sm:p-8 space-y-8 bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Controls */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Your Current Age</label>
                        <span className="text-sm font-bold text-blue-700 font-mono bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {termAge} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="60"
                        step="1"
                        value={termAge}
                        onChange={(e) => setTermAge(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
                        <span>18 Yrs</span>
                        <span>35 Yrs</span>
                        <span>60 Yrs</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Life Protection Cover (Sum Assured)</label>
                        <span className="text-sm font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          ₹{termCoverCrores} Crore
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="5.0"
                        step="0.25"
                        value={termCoverCrores}
                        onChange={(e) => setTermCoverCrores(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
                        <span>₹50 Lakhs</span>
                        <span>₹2.5 Crores</span>
                        <span>₹5 Crores</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-800">Tobacco or Smoking Habit</p>
                          <p className="text-[11px] text-slate-500">Non-smokers receive up to 30% discount on premiums</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setTermIsSmoker(false)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                              !termIsSmoker ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => setTermIsSmoker(true)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                              termIsSmoker ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600'
                            }`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                          <input
                            type="checkbox"
                            checked={termIncludeCriticalIllness}
                            onChange={(e) => setTermIncludeCriticalIllness(e.target.checked)}
                            className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Add 64 Critical Illness Living Benefit Rider (+₹220/mo)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                          <input
                            type="checkbox"
                            checked={termIncludeAccidental}
                            onChange={(e) => setTermIncludeAccidental(e.target.checked)}
                            className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                          />
                          <span>Add Accidental Death & Disability Cover (+₹110/mo)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Calculation Box */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                        Estimated Term Plan Premium
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedTermPremium.monthly.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300">/ month (incl. 18% GST)</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Or ~<span className="text-white font-bold font-mono">₹{calculatedTermPremium.annual.toLocaleString()}</span> / year on annual payment mode.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Sum Assured Cover:</span>
                        <span className="font-bold text-white font-mono">₹{termCoverCrores} Crore</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Coverage Tenure:</span>
                        <span className="font-bold text-white">Up to Age {termCoverAge} Years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Sec 80C Tax Deduction:</span>
                        <span className="font-bold text-emerald-400 font-mono">Save up to ₹{calculatedTermPremium.taxSaving.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Claim Settlement Ratio:</span>
                        <span className="font-bold text-emerald-400">99.5% (IRDAI Audited)</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendTermWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Get Official Quote on WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-400">
                      *Zero spam policy. Proposal quotes sent directly by IRDAI licensed advisor.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. HEALTH MEDICLAIM */}
            {activeTab === 'health' && (
              <div className="p-6 sm:p-8 space-y-8 bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-2">Who would you like to cover?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'self', label: 'Self Only' },
                          { id: 'couple', label: 'Self + Spouse' },
                          { id: 'family2kids', label: 'Family (2 Adults + Kids)' },
                          { id: 'parents', label: 'Parents (Senior Citizens)' }
                        ].map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setHealthFamilyType(t.id as any)}
                            className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                              healthFamilyType === t.id
                                ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Age of Eldest Insured Member</label>
                        <span className="text-sm font-bold text-blue-700 font-mono bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {healthEldestAge} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="75"
                        step="1"
                        value={healthEldestAge}
                        onChange={(e) => setHealthEldestAge(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Desired Sum Insured</label>
                        <span className="text-sm font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {healthSumInsuredLakhs >= 100 ? '₹1 Crore' : `₹${healthSumInsuredLakhs} Lakhs`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={healthSumInsuredLakhs}
                        onChange={(e) => setHealthSumInsuredLakhs(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                        <input
                          type="checkbox"
                          checked={healthZeroRoomRent}
                          onChange={(e) => setHealthZeroRoomRent(e.target.checked)}
                          className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                        />
                        <span>Zero Room Rent Capping (No proportionate deductions)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                        <input
                          type="checkbox"
                          checked={healthHasDiabetes}
                          onChange={(e) => setHealthHasDiabetes(e.target.checked)}
                          className="rounded bg-white border-slate-300 text-blue-600 focus:ring-blue-600 w-4 h-4 cursor-pointer"
                        />
                        <span>Any member has Diabetes, BP or Thyroid</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                        Estimated Mediclaim Premium
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedHealthPremium.monthly.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300">/ month (EMI option)</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Or ~<span className="text-white font-bold font-mono">₹{calculatedHealthPremium.annual.toLocaleString()}</span> / year upfront.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Cashless Network:</span>
                        <span className="font-bold text-white">14,500+ Hospitals Pan-India</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Restoration Benefit:</span>
                        <span className="font-bold text-emerald-400">Unlimited 100% Reload</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Sec 80D Tax Deduction:</span>
                        <span className="font-bold text-emerald-400 font-mono">Save up to ₹{calculatedHealthPremium.taxSaving.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Room Rent Limit:</span>
                        <span className="font-bold text-white">{healthZeroRoomRent ? 'Single AC / No Limit' : 'Standard'}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendHealthWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Request Cashless Quote on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. RETIREMENT PENSION */}
            {activeTab === 'retire' && (
              <div className="p-6 sm:p-8 space-y-8 bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Your Current Age</label>
                        <span className="text-sm font-bold text-blue-700 font-mono bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {retireCurrentAge} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min="22"
                        max="55"
                        step="1"
                        value={retireCurrentAge}
                        onChange={(e) => setRetireCurrentAge(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Desired Retirement Age</label>
                        <span className="text-sm font-bold text-indigo-700 font-mono bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                          {retireTargetAge} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min={retireCurrentAge + 1}
                        max="65"
                        step="1"
                        value={retireTargetAge}
                        onChange={(e) => setRetireTargetAge(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Monthly Investment Amount</label>
                        <span className="text-sm font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          ₹{retireMonthlySavings.toLocaleString()}/mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="2500"
                        value={retireMonthlySavings}
                        onChange={(e) => setRetireMonthlySavings(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                        Guaranteed Monthly Pension for Life
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedRetirePension.monthlyPension.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300">/ month for life</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Accumulated Corpus:</span>
                        <span className="font-bold text-white font-mono">₹{(calculatedRetirePension.corpus / 10000000).toFixed(2)} Crores</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Investment Horizon:</span>
                        <span className="font-bold text-white">{calculatedRetirePension.yearsToInvest} Years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Nominee Return Guarantee:</span>
                        <span className="font-bold text-emerald-400">100% Purchase Price Back</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendRetireWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Plan My Pension on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. CHILD EDUCATION */}
            {activeTab === 'child' && (
              <div className="p-6 sm:p-8 space-y-8 bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Child's Current Age</label>
                        <span className="text-sm font-bold text-blue-700 font-mono bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {childCurrentAge} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="14"
                        step="1"
                        value={childCurrentAge}
                        onChange={(e) => setChildCurrentAge(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-800">Target Higher Education Corpus</label>
                        <span className="text-sm font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          ₹{childTargetCorpusLakhs} Lakhs
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="200"
                        step="5"
                        value={childTargetCorpusLakhs}
                        onChange={(e) => setChildTargetCorpusLakhs(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                        Recommended Monthly Savings
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedChildFund.monthlyNeeded.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-300">/ month</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Target College Corpus:</span>
                        <span className="font-bold text-white font-mono">₹{childTargetCorpusLakhs} Lakhs</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Time Horizon:</span>
                        <span className="font-bold text-white">{calculatedChildFund.yearsRemaining} Years (Matures at Age 18)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Waiver of Premium:</span>
                        <span className="font-bold text-emerald-400">Included Automatically</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendChildWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Start Child Education Fund</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. INSURANCE FLAGSHIP PLANS & PRODUCTS PORTFOLIO                */}
      {/* ============================================================== */}
      <section id="plans" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-b border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full insurance-badge-magenta text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
              <Shield className="w-3.5 h-3.5" />
              Flagship Insurance Portfolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight ocb-font-serif">
              Our Recommended <span className="text-[#2B1F6B]">Insurance Solutions</span>
            </h2>
            <p className="text-sm text-slate-800 mt-1 font-bold">
              Authentic, IRDAI-approved insurance plans vetted for rapid claim turnaround, guaranteed annual payouts, and maximum tax savings.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs">
            {['All', 'Term Life', 'Savings', 'Retirement', 'Child', 'Health', 'ULIP'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedPlanCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPlanCategory === cat
                    ? 'insurance-btn-primary shadow-xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards Grid with Real Photos & Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className="glass-surface group flex flex-col justify-between"
            >
              {/* Glass Layers */}
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />

              {/* Card Photo Banner */}
              <div className="relative h-44 overflow-hidden z-10">
                <img
                  src={plan.imageUrl || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80'}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
                
                {/* Badges on Banner */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="insurance-badge-magenta text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                    {plan.tag}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-md text-white/90 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-white/20">
                    UIN: {plan.uin}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-[#FFB81C] uppercase tracking-wider block">
                    {plan.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white ocb-font-serif leading-tight truncate">
                    {plan.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="glass-inner p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1 text-[#2B1F6B] font-extrabold">
                      <Building2 className="w-3.5 h-3.5" />
                      {plan.insurer}
                    </span>
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Sec 80C & 10(10D)
                    </span>
                  </div>

                  {/* Cover & Starting Premium Tile */}
                  <div className="p-3.5 rounded-xl bg-purple-50/90 border border-purple-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-950 font-bold block">Sum Assured / Target</span>
                      <p className="text-sm font-black text-slate-900 font-mono">{plan.sumAssured}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-purple-950 font-bold block">Starting Premium</span>
                      <p className="text-sm font-black text-emerald-700 font-mono">₹{plan.startingPremium.toLocaleString()}/mo</p>
                    </div>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-1">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2">
                  <button
                    onClick={() => handlePlanWhatsAppInquiry(plan)}
                    className="flex-1 py-2.5 px-3 rounded-xl insurance-btn-primary font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Get Custom Quote</span>
                  </button>

                  <button
                    onClick={() => {
                      trackAction(`plan_brochure_${plan.id}`);
                      const msg = `Hello ${advisorName}! 👋 Please send me the official policy brochure (PDF) for *${plan.title}* (UIN: ${plan.uin}). Thank you!`;
                      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                    title="Request PDF Brochure via WhatsApp"
                  >
                    <FileText className="w-4 h-4 text-[#2B1F6B]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. 24/7 EMERGENCY CASHLESS CLAIM HOTLINE & WIZARD             */}
      {/* ============================================================== */}
      <section id="emergency" className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-surface p-8 sm:p-10 border-rose-300/80 shadow-2xl relative overflow-hidden">
            {/* Glass Visual Layers */}
            <div className="glass-layer-effect" />
            <div className="glass-layer-tint" />
            <div className="glass-layer-shine" />

            <div className="glass-inner">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/90 border border-rose-300 text-rose-800 text-xs font-bold shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    24x7 Priority Hospital Claim Desk
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight ocb-font-serif">
                    Hospitalization Emergency? We Stand By You in the TPA Ward.
                  </h2>

                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    During medical crises, your only priority should be patient recovery. Our personal advisory desk coordinates directly with hospital TPAs, verifies coverage, eliminates room rent disputes, and fast-tracks pre-authorization.
                  </p>

                  {/* 4-Step Cashless Hospital Journey */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-2xs">
                      <span className="text-xs font-bold text-rose-700">Step 1: Immediate Alert</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">Call or WhatsApp our 24/7 desk within 24 hours of hospital admission.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-2xs">
                      <span className="text-xs font-bold text-blue-700">Step 2: TPA Desk Check-in</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">Show your digital Health e-Card and patient Aadhaar at the hospital insurance desk.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-2xs">
                      <span className="text-xs font-bold text-indigo-700">Step 3: Fast Pre-Auth</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">Our desk tracks initial cashless sanction within 45-60 minutes.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-rose-200/80 shadow-2xs">
                      <span className="text-xs font-bold text-emerald-700">Step 4: Final Discharge</span>
                      <p className="text-[11px] text-slate-600 mt-0.5">Final bill settled directly by insurer with zero non-medical deductions.</p>
                    </div>
                  </div>
                </div>

                {/* Right Emergency Call to Action */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-200/90 shadow-lg text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-xs">
                    <PhoneCall className="w-8 h-8 text-rose-600 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Emergency Assistance Hotline</p>
                    <p className="text-2xl font-extrabold text-rose-600 font-mono mt-1">
                      {phoneDisplay}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Direct Advisor Line • Monitored 24 Hours</p>
                  </div>

                  <div className="w-full space-y-2">
                    <button
                      onClick={() => setIsEmergencyModalOpen(true)}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Submit Emergency Claim Alert</span>
                    </button>

                    <a
                      href={`tel:${phoneDisplay}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-50/90 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dial Hotline Directly</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TOP INSURER PARTNERS & COMPARISON MATRIX                    */}
      {/* ============================================================== */}
      <section id="partners" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/90 px-3.5 py-1 rounded-full inline-block shadow-2xs">
            Institutional Alliances
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
            India's Leading Insurance Institutions
          </h2>
          <p className="text-sm text-slate-800 font-bold">
            We operate independently with zero company quotas to bring you verified, unbiased underwriting metrics.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="glass-surface overflow-x-auto shadow-2xl">
          <div className="glass-layer-effect" />
          <div className="glass-layer-tint" />
          <div className="glass-layer-shine" />
          <div className="glass-inner">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-100/70 backdrop-blur-md text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-4 px-6">Insurer Partner</th>
                  <th className="py-4 px-6">Domain</th>
                  <th className="py-4 px-6">Claim Settlement Ratio</th>
                  <th className="py-4 px-6">Solvency Ratio</th>
                  <th className="py-4 px-6">Cashless Hospitals</th>
                  <th className="py-4 px-6">Average TAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 text-xs sm:text-sm">
                {INSURER_PARTNERS.map(item => (
                  <tr key={item.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">{item.type}</td>
                    <td className="py-4 px-6 text-emerald-700 font-extrabold font-mono">{item.csr}</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold font-mono">{item.solvency}</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold font-mono">{item.networkHospitals}</td>
                    <td className="py-4 px-6 text-indigo-700 font-bold">{item.tat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. TAX SAVINGS MAXIMIZER (SEC 80C & 80D)                       */}
      {/* ============================================================== */}
      <section id="tax" className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50/90 border border-emerald-200/90 px-3.5 py-1 rounded-full inline-block shadow-2xs">
                Tax Optimization Strategy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
                Save Up To ₹70,200 in Income Tax Every Single Year
              </h2>
              <p className="text-sm text-slate-800 leading-relaxed font-bold">
                Smart insurance planning not only safeguards your family against life’s uncertainties but also serves as your most efficient tax shelter under the Income Tax Act of India.
              </p>

              <div className="space-y-3 pt-2">
                <div className="glass-surface p-4.5 border border-white/70 shadow-md flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5 shadow-2xs">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Section 80C (Term Life & Annuity Plans)</h4>
                    <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                      Deduct up to <span className="text-slate-950 font-bold font-mono">₹1,50,000</span> from your taxable income. Saves up to ₹46,800/yr in the 30% tax slab.
                    </p>
                  </div>
                </div>

                <div className="glass-surface p-4.5 border border-white/70 shadow-md flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5 shadow-2xs">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Section 80D (Health Mediclaim & Parents)</h4>
                    <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                      Deduct up to <span className="text-slate-950 font-bold font-mono">₹25,000</span> for self/family + <span className="text-slate-950 font-bold font-mono">₹50,000</span> for senior citizen parents. Total ₹75,000 deductions!
                    </p>
                  </div>
                </div>

                <div className="glass-surface p-4.5 border border-white/70 shadow-md flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0 mt-0.5 shadow-2xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Section 10(10D) (100% Tax-Free Payouts)</h4>
                    <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                      All life insurance death benefits, terminal illness payouts, and qualifying maturity returns are 100% exempt from income tax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Tax Calculation Box */}
            <div className="lg:col-span-6 glass-surface p-6 sm:p-8 shadow-2xl">
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />

              <div className="glass-inner space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <span className="text-xs font-bold text-slate-700">Tax Relief Illustration (30% Slab)</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                    Maximum Legal Savings
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Sec 80C Deduction (Term Life)</span>
                      <span className="text-slate-900 font-bold font-mono">₹1,50,000</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
                    </div>
                    <span className="text-[10px] text-blue-700 font-bold">Saves ₹46,800 Tax</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Sec 80D (Self & Family Mediclaim)</span>
                      <span className="text-slate-900 font-bold font-mono">₹25,000</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '33%' }} />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold">Saves ₹7,800 Tax</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 font-semibold">Sec 80D (Senior Parents Mediclaim)</span>
                      <span className="text-slate-900 font-bold font-mono">₹50,000</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '66%' }} />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold">Saves ₹15,600 Tax</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-emerald-300 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold">Total Annual Tax Saved:</span>
                    <p className="text-2xl font-extrabold text-emerald-600 font-mono mt-0.5">₹70,200 / Year</p>
                  </div>
                  <button
                    onClick={() => {
                      trackAction('tax_planning_whatsapp');
                      const msg = `Hello ${advisorName}! 👋 I would like to structure my Term Life and Health Insurance to maximize Section 80C and 80D tax savings before this financial year ends. Please assist me. Thank you!`;
                      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Plan Tax Savings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. VERIFIED CLIENT CLAIM SETTLEMENT STORIES                   */}
      {/* ============================================================== */}
      <section id="claims" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/90 px-3.5 py-1 rounded-full inline-block shadow-2xs">
            Real Moments of Truth
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
            Verified Claim Settlement Experiences
          </h2>
          <p className="text-sm text-slate-800 font-bold">
            A policy is only as valuable as the advisor who stands by your family when a claim arises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {claimStories.map(story => (
            <div
              key={story.id}
              className="glass-surface flex flex-col justify-between shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />
              <div className="glass-inner p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
                      {story.tat}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 space-y-1 shadow-2xs">
                    <p className="text-[11px] text-slate-700 font-bold">Claim Settled:</p>
                    <p className="text-base font-extrabold text-slate-950 font-mono">{story.settledAmount}</p>
                    <p className="text-[10px] text-slate-700 truncate font-semibold">{story.hospital}</p>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium italic">
                    "{story.story}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70">
                  <p className="text-xs font-black text-slate-950">{story.author}</p>
                  <p className="text-[11px] text-slate-700 font-semibold">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FREE 360° POLICY AUDIT BANNER & FORM                      */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ocb-glass-surface-dark p-8 sm:p-12 text-white shadow-2xl text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 border border-blue-400/30 px-3.5 py-1 rounded-full inline-block shadow-2xs">
              Zero-Obligation Forensic Audit
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto ocb-font-serif">
              Are Your Existing Insurance Policies Actually Protecting You?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              Over 65% of existing policies contain hidden room rent caps, disease sub-limits, or surrender penalties that cause shocking out-of-pocket hospital bills. Book a free 30-minute forensic audit today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Book Free 360° Policy Audit</span>
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${advisorName}! 👋 I have an existing health/life insurance policy and would like to get a free policy audit to check for hidden sub-limits. When can we connect?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Existing Policy PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FREQUENTLY ASKED QUESTIONS (ACCORDION)                    */}
      {/* ============================================================== */}
      <section id="faqs" className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/90 px-3.5 py-1 rounded-full inline-block shadow-2xs">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-800 font-bold">
            Real questions Indian policyholders ask when selecting life, health, and retirement coverage.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-surface border border-white/70 overflow-hidden transition-all duration-200 shadow-md hover:border-blue-500"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11.5 DEDICATED GLASSMORPHIC CONTACT & CONSULTATION SECTION     */}
      {/* ============================================================== */}
      <section id="contact" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50/90 border border-blue-200/90 px-3.5 py-1 rounded-full inline-block shadow-2xs">
            Direct Advisor Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight ocb-font-serif">
            Get in Touch with {advisorName}
          </h2>
          <p className="text-sm text-slate-800 font-bold">
            Schedule a personalized one-on-one consultation, request official policy illustrations, or resolve claim queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contact & Channel Cards */}
          <div className="lg:col-span-5 flex">
            <div className="glass-surface w-full p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />

              <div className="glass-inner space-y-6">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                  <div className="relative shrink-0">
                    <img
                      src={profile.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                      alt={advisorName}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white">
                      <Sparkles className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 ocb-font-serif">{advisorName}</h3>
                    <p className="text-xs text-blue-700 font-bold">{advisorDesignation}</p>
                    <p className="text-[11px] text-slate-700 font-semibold">{advisorCompany} • IRDAI: {irdaNumber}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:${phoneDisplay}`}
                    className="p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-blue-400 flex items-center gap-3 transition-all hover:bg-white shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 fill-sky-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-700 font-bold uppercase">Emergency & Advisory Phone</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">{phoneDisplay}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${advisorName}! 👋 I would like to schedule an insurance consultation with you.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-emerald-400 flex items-center gap-3 transition-all hover:bg-white shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4 fill-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-700 font-bold uppercase">Direct WhatsApp Desk</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-mono">{phoneDisplay}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${profile.email || 'rajesh.sengupta@insurance-advisory.in'}`}
                    className="p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-400 flex items-center gap-3 transition-all hover:bg-white shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-700 font-bold uppercase">Official Advisory Email</p>
                      <p className="text-xs sm:text-sm font-extrabold text-slate-900 truncate font-mono">{profile.email || 'rajesh.sengupta@insurance-advisory.in'}</p>
                    </div>
                  </a>

                  <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 flex items-center gap-3 shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-700 font-bold uppercase">Office Location</p>
                      <p className="text-xs font-semibold text-slate-800 leading-snug">{profile.address || 'BKC, Mumbai & Hitec City, Hyderabad, India'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => downloadVcfFile(profile)}
                    className="flex-1 py-3 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-amber-500" />
                    <span>Save Contact (.VCF)</span>
                  </button>

                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-all cursor-pointer shadow-2xs"
                    title="Scan QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Consultation Booking Form */}
          <div className="lg:col-span-7 flex">
            <div className="glass-surface w-full p-6 sm:p-8 space-y-5 flex flex-col justify-between shadow-2xl">
              <div className="glass-layer-effect" />
              <div className="glass-layer-tint" />
              <div className="glass-layer-shine" />

              <div className="glass-inner space-y-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      Priority Consultation Booking
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Zero Cost
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 ocb-font-serif">
                    Request a Personalized Insurance Review
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill in your details below and {advisorName} will get in touch with you within 15 minutes.
                  </p>
                </div>

                {leadSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-center space-y-2 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-emerald-900">Inquiry Received Successfully!</h4>
                    <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                      Thank you! {advisorName} has received your consultation request and will connect with you on WhatsApp / Phone shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">WhatsApp / Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Email Address (Optional)</label>
                        <input
                          type="email"
                          placeholder="e.g. rahul@example.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">Insurance Goal</label>
                        <select
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                          defaultValue="Term Life (₹1-5 Cr Cover)"
                        >
                          <option value="Term Life (₹1-5 Cr Cover)">Term Life Protection (₹1-5 Cr Cover)</option>
                          <option value="Health Mediclaim & Cashless Top-up">Health Mediclaim & Cashless Top-up</option>
                          <option value="Guaranteed Pension & Annuity">Guaranteed Pension & Annuity</option>
                          <option value="Child Ivy-League Education Fund">Child Ivy-League Education Fund</option>
                          <option value="Free Policy Forensic Audit">Free Policy Forensic Audit</option>
                          <option value="24/7 Emergency Hospital Claim">24/7 Emergency Hospital Claim</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">Your Requirements / Message</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your coverage goals, family members, or existing policies..."
                        value={leadMessage}
                        onChange={(e) => setLeadMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Submit Consultation Request to {advisorName}</span>
                      </button>
                      <p className="text-[10px] text-center text-slate-500 mt-2">
                        🔒 100% Confidential. IRDAI licensed fiduciary protocol. Zero unsolicited spam.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11.8. SOCIAL MEDIA HUB (INSTAGRAM & YOUTUBE SPACES)             */}
      {/* ============================================================== */}
      <section id="socials" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Share2 className="w-3.5 h-3.5 text-[#C1621F]" /> Financial Protection & Advisory Masterclasses
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-slate-950">
            Connect With Us On Social Media
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-bold">
            Watch our fiduciary advisory masterclasses, discover claim settlement tips & tax strategies, and join 28,000+ policyholders on Instagram and YouTube.
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          
          {/* 1. Instagram Platform Space (Card 1) */}
          <div className="bg-gradient-to-br from-[#833ab4]/15 via-[#fd1d1d]/12 to-[#fcb045]/15 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-pink-400/40 shadow-xl flex flex-col justify-between space-y-6 group hover:border-pink-500/70 transition-all duration-300">
            <div className="space-y-4">
              
              {/* Instagram Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="instagram" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-slate-950">@insurance.advisory</h3>
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold shadow-2xs">✓</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold">28.4K Policyholders • 185 Advisory Reels</p>
                  </div>
                </div>

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('instagram_follow_click')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                  <span>Follow on Instagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                Fiduciary term life audits, 100% cashless hospital claims guidance, tax-saving masterclasses, and family financial security tips. Tag us with your policy questions to get featured!
              </p>

              {/* Instagram Reels Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {INSURANCE_INSTAGRAM_REELS.map((reel, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => setActiveInstagramReel(reel)}
                    className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm group/item block bg-slate-900 border border-pink-500/30 text-left cursor-pointer hover:border-pink-500 transition-all hover:scale-102"
                    title={`Watch Reel: ${reel.title}`}
                  >
                    <img
                      src={reel.imageUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover/item:scale-108 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-between p-2.5 text-white">
                      <span className="px-1.5 py-0.5 rounded-md bg-black/65 text-[9px] font-bold w-max flex items-center gap-1 backdrop-blur-xs text-white">
                        <Play className="w-2.5 h-2.5 fill-white" /> Reel
                      </span>
                      <div>
                        <p className="text-[11px] font-bold line-clamp-2 leading-tight text-white drop-shadow-xs">{reel.title}</p>
                        <span className="text-[9px] text-[#D8A63D] font-mono font-bold mt-0.5 block">{reel.views}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

            </div>

            {/* Bottom Tag link */}
            <div className="pt-2 border-t border-pink-400/30 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 font-semibold">
              <span>Hashtags: #InsuranceAdvisory #LifeInsurance #HealthMediclaim • Follow us for daily financial security tips</span>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="font-extrabold text-[#C1621F] hover:underline flex items-center gap-1">
                View All Reels on Instagram →
              </a>
            </div>

          </div>

          {/* 2. YouTube Platform Space (Card 2 - Stacked Directly Below Instagram) */}
          <div className="bg-gradient-to-br from-red-950/20 via-[#3B1515]/25 to-slate-900/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-red-500/40 shadow-xl flex flex-col justify-between space-y-6 group hover:border-red-500/70 transition-all duration-300">
            <div className="space-y-5">
              
              {/* YouTube Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="youtube" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-950">OneClickBiz Insurance & Wealth Masterclasses</h3>
                    <p className="text-xs text-slate-700 font-semibold">48.5K Subscribers • Financial Protection & Claim Guidance Series</p>
                  </div>
                </div>

                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('youtube_subscribe_click')}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
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
                  <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-red-500/50 bg-black min-h-[280px] sm:min-h-[340px] flex flex-col">
                    <iframe
                      src={activeYouTubeVideo.embedUrl}
                      title={activeYouTubeVideo.title}
                      className="w-full h-full min-h-[280px] sm:min-h-[340px] rounded-2xl"
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
                  <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-red-500/30 group/vid flex flex-col justify-end min-h-[280px] sm:min-h-[340px]">
                    <img
                      src={activeYouTubeVideo.imageUrl}
                      alt={activeYouTubeVideo.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Dark Overlay with Big Red Play Button */}
                    <div className="absolute inset-0 bg-black/45 group-hover/vid:bg-black/35 transition-colors flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setIsPlayingYouTube(true)}
                        className="w-16 h-16 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition hover:scale-115 active:scale-95 cursor-pointer group-hover/vid:shadow-red-600/50"
                        title="Play in this window"
                      >
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </button>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-1 z-10 border border-white/10">
                      <span>{activeYouTubeVideo.duration}</span>
                      <span>•</span>
                      <span className="text-amber-400">{activeYouTubeVideo.quality}</span>
                    </div>

                    {/* Video Info Bottom Banner */}
                    <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white">
                      <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider mb-1 inline-block">
                        {activeYouTubeVideo.tag}
                      </span>
                      <p className="text-sm sm:text-base font-extrabold leading-snug">
                        {activeYouTubeVideo.title}
                      </p>
                      <p className="text-[11px] text-white/80 mt-1 line-clamp-2">
                        {activeYouTubeVideo.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Playlist Highlights (Right / 5 cols) - CLICKS PLAY DIRECTLY IN WINDOW */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <p className="text-xs font-black uppercase tracking-wider text-[#C1621F] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Recent Insurance Advisory Masterclasses
                    </p>

                    {INSURANCE_YOUTUBE_PLAYLIST_ITEMS.map((item, yIdx) => (
                      <button
                        key={yIdx}
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
                            ? 'bg-red-50/95 border-red-400 ring-2 ring-red-500/30'
                            : 'bg-white/85 hover:bg-white border-[#D8A63D]/30'
                        }`}
                        title={`Play: ${item.title}`}
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/clip:scale-105 transition"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover/clip:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 fill-white text-white" />
                          </div>
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white font-bold">{item.duration}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#241208] group-hover/clip:text-red-600 transition truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#7A5B43] mt-0.5">{item.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#C1621F] hover:underline flex items-center gap-1"
                    >
                      <span>Explore all videos on YouTube channel</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. CONTACT & LEGAL COMPLIANCE FOOTER                         */}
      {/* ============================================================== */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-200 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-base ocb-font-serif">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>{advisorCompany}</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm font-normal">
                Led by {advisorName}, MDRT USA Life Member. Providing fiduciary insurance advisory, high-sum-assured term life structuring, comprehensive mediclaim portfolio audits, and 24x7 cashless hospital claim advocacy.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <p>IRDAI License Registration: <span className="font-mono text-white font-bold">{irdaNumber}</span></p>
                <p>Agency Code: <span className="font-mono text-white font-bold">INS-AGN-849102</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-bold text-sm">Direct Contacts</p>
              <p><a href={`tel:${phoneDisplay}`} className="hover:text-blue-400 transition-colors font-mono text-slate-200">{phoneDisplay}</a></p>
              <p><a href={`mailto:${profile.email || 'rajesh.sengupta@insurance-advisory.in'}`} className="hover:text-blue-400 transition-colors font-mono text-slate-200">{profile.email || 'rajesh.sengupta@insurance-advisory.in'}</a></p>
              <p className="text-slate-300">{profile.address || 'BKC, Mumbai & Hitec City, Hyderabad, India'}</p>
            </div>

            <div className="space-y-3">
              <p className="text-white font-bold text-sm">Advisor vCard</p>
              <button
                onClick={() => downloadVcfFile(profile)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact (.VCF)</span>
              </button>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>View Scan QR Code</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} {advisorName}. Licensed Financial Security Advisory. Powered by OneClickBiz Smart Templates.</p>
            <div className="flex items-center gap-4">
              <span>IRDAI Compliant</span>
              <span>•</span>
              <span>Privacy Encrypted</span>
              <span>•</span>
              <a href="https://oneclickbiz.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Build Your Own Smart Card on OneClickBiz
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MODAL 1: EMERGENCY CLAIM ALERT MODAL                    */}
      {/* ======================================================== */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-rose-200 p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 ocb-font-serif">Emergency Cashless Hospital Alert</h3>
                <p className="text-xs text-rose-600 font-semibold">Direct alert to advisor's personal emergency desk</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={emergencyPatientName}
                  onChange={(e) => setEmergencyPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Jubilee Hills"
                    value={emergencyHospitalName}
                    onChange={(e) => setEmergencyHospitalName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad"
                    value={emergencyCity}
                    onChange={(e) => setEmergencyCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Policy Number / Insurer (if known)</label>
                <input
                  type="text"
                  placeholder="e.g. Care Supreme #482910 or 'Need Lookup'"
                  value={emergencyPolicyNo}
                  onChange={(e) => setEmergencyPolicyNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Admission Nature</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEmergencyType('emergency')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      emergencyType === 'emergency'
                        ? 'bg-rose-50 border-rose-500 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Sudden Emergency (24h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmergencyType('planned')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      emergencyType === 'planned'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Planned Admission
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSendEmergencyClaim}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Transmit Emergency Alert on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: 360° POLICY AUDIT BOOKING MODAL                */}
      {/* ======================================================== */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 ocb-font-serif">Free 360° Policy Audit</h3>
                <p className="text-xs text-blue-700 font-semibold">Uncover hidden sub-limits & room rent traps</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLeadSubmit(e);
                setIsAuditModalOpen(false);
                const msg = `Hello ${advisorName}! 👋 I have requested a 360° Policy Audit through your website.\n\n• Name: ${leadName}\n• Phone: ${leadPhone}\n• Email: ${leadEmail}\n• Note: ${leadMessage || 'Please review my existing insurance policy'}\n\nPlease let me know when we can review this.`;
                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Existing Insurer or Policy Type</label>
                <textarea
                  rows={2}
                  placeholder="e.g. I have a 5L Star Health policy and a LIC endowment plan. Want to check if adequate."
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Free Audit Schedule</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: QR CODE POPUP MODAL                            */}
      {/* ======================================================== */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 space-y-6 text-center shadow-2xl relative text-slate-900">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-slate-900 ocb-font-serif">Scan Smart Digital vCard</h3>
              <p className="text-xs text-slate-600 mt-1 font-medium">Point smartphone camera to instantly save contacts & quotes</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-200 shadow-inner">
              {websiteQrUrl ? (
                <img src={websiteQrUrl} alt="Website QR Code" className="w-56 h-56 mx-auto" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-slate-400">
                  <QrCode className="w-16 h-16 animate-pulse" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => downloadVcfFile(profile)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download vCard Contact (.VCF)</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
              >
                {copiedLink ? '✓ Link Copied to Clipboard!' : 'Copy Website URL'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: SHARE CARD MODAL (SHARE TO ANYWHERE)            */}
      {/* ======================================================== */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {/* ======================================================== */}
      {/* MODAL 5: INSTAGRAM REEL IN-WINDOW VIEWER MODAL           */}
      {/* ======================================================== */}
      {activeInstagramReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveInstagramReel(null)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl bg-slate-950 border border-pink-500/40 overflow-hidden shadow-2xl relative text-white flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Reel Header */}
            <div className="p-3.5 bg-black/60 backdrop-blur-sm border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black">@insurance.advisory</span>
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  </div>
                  <span className="text-[10px] text-pink-400 font-mono font-bold">{activeInstagramReel.views}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveInstagramReel(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reel Media / In-window Player */}
            <div className="relative aspect-[9/14] bg-black overflow-hidden group">
              <img
                src={activeInstagramReel.imageUrl}
                alt={activeInstagramReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-black uppercase tracking-wider mb-2 w-max flex items-center gap-1 shadow-md">
                  <Play className="w-2.5 h-2.5 fill-white" /> Reel Playing in Window
                </span>
                <h4 className="text-sm font-bold text-white drop-shadow-md leading-snug">
                  {activeInstagramReel.title}
                </h4>
                <p className="text-xs text-slate-200 mt-1 line-clamp-3 leading-relaxed">
                  {activeInstagramReel.caption}
                </p>
              </div>
            </div>

            {/* Reel Footer Controls */}
            <div className="p-3 bg-slate-900 border-t border-white/10 flex items-center gap-2">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction('instagram_reel_external_open')}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                <span>Open in Instagram</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setActiveInstagramReel(null)}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Floating Action Quick Dock (Bottom-Right) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsShareModalOpen(true);
            trackAction('floating_share_click');
          }}
          className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-white/95 hover:bg-white text-slate-900 border border-slate-300/80 shadow-2xl backdrop-blur-md font-bold text-xs flex items-center gap-2 transition active:scale-95 cursor-pointer hover:border-blue-500 group"
          title="Share to anywhere (WhatsApp, LinkedIn, X, Telegram, QR, Native share)"
        >
          <Share2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
