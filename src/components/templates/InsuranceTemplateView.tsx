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
  PhoneCall
} from 'lucide-react';
import QRCode from 'qrcode';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem, GalleryItem, TestimonialItem } from '@/lib/types';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon from '@/components/common/SocialIcon';

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

// Curated Verified Insurance Plans
const DEFAULT_INSURANCE_PLANS = [
  {
    id: 'plan-term-1',
    category: 'Term Life Insurance',
    title: 'Suraksha Pure Term Life Shield (₹1 to ₹5 Crore)',
    insurer: 'HDFC Life / Max Life Partnered',
    sumAssured: '₹1,00,00,000 - ₹5,00,00,000',
    startingPremium: 680,
    tenure: 'Up to Age 85',
    tag: 'Highest Claim Ratio',
    popular: true,
    features: [
      '99.5% Claim Settlement Ratio (IRDAI certified)',
      '100% Tax Exemption on payouts under Section 10(10D)',
      'Optional 64 Critical Illness lump-sum rider payout',
      'Accidental Death Benefit booster up to ₹1 Crore',
      'Special 30% discounted rates for non-smokers'
    ],
    brochureUrl: '#',
    recommendedFor: 'Salaried professionals, business owners, and family breadwinners.'
  },
  {
    id: 'plan-health-1',
    category: 'Health & Mediclaim',
    title: 'Family Comprehensive Mediclaim (₹1 Crore Zero-Deductible)',
    insurer: 'Care Health / Star Health Partnered',
    sumAssured: '₹25 Lakhs - ₹1 Crore',
    startingPremium: 1040,
    tenure: 'Lifelong Renewable',
    tag: 'Zero Room Rent Capping',
    popular: true,
    features: [
      'No Room Rent Sub-limit (Single AC private room & suite covered)',
      'Unlimited 100% Restoration of Sum Insured for unrelated illnesses',
      'Day 1 OPD consultations, diagnostics & consumables covered',
      '14,500+ Network Hospitals with 45-minute cashless pre-authorization',
      'Annual Free Full Body Health Checkup for all covered members'
    ],
    brochureUrl: '#',
    recommendedFor: 'Couples, young families with children, and parents.'
  },
  {
    id: 'plan-topup-1',
    category: 'Super Top-Up',
    title: 'High-Cover Super Top-Up Shield (₹90 Lakhs Cover)',
    insurer: 'Care Supreme / HDFC Ergo Partnered',
    sumAssured: '₹90,00,000 (Deductible ₹10L)',
    startingPremium: 350,
    tenure: 'Annual Renewal',
    tag: 'Ultra Low Premium (~₹12/day)',
    popular: false,
    features: [
      'Bridges the gap over corporate health insurance or personal base cover',
      'Aggregates all hospitalizations in a policy year to cross deductible',
      'Full coverage for cancer therapies, robotic surgeries & organ donor expenses',
      'Zero co-payment across all tiers of network hospitals',
      'Section 80D tax deductions up to ₹75,000'
    ],
    brochureUrl: '#',
    recommendedFor: 'Corporate employees wanting to upgrade base ₹5L/₹10L company insurance.'
  },
  {
    id: 'plan-retire-1',
    category: 'Retirement & Annuity',
    title: 'Guaranteed Lifelong Pension & Sovereign Annuity',
    insurer: 'Tata AIA / ICICI Prudential Partnered',
    sumAssured: 'Guaranteed Monthly Income for Life',
    startingPremium: 2500,
    tenure: 'Lifelong Guaranteed',
    tag: 'Guaranteed Return of Premium',
    popular: false,
    features: [
      'Fixed guaranteed monthly pension payout locked for life regardless of interest rates',
      '100% Return of Purchase Price directly handed to nominee on demise',
      'Joint life option continues 100% pension to spouse after primary holder',
      'Tax-efficient annuity growth with systematic drawdown',
      'No stock market risk; sovereign-grade balance sheet backing'
    ],
    brochureUrl: '#',
    recommendedFor: 'Individuals aged 35 to 60 planning guaranteed stress-free retirement.'
  },
  {
    id: 'plan-child-1',
    category: 'Child Higher Education',
    title: 'Ivy League & Medical College Guaranteed Education Fund',
    insurer: 'Max Life / HDFC Life Partnered',
    sumAssured: '₹25,00,000 - ₹1,50,00,000',
    startingPremium: 1800,
    tenure: 'Matures at Child Age 18 or 21',
    tag: 'Waiver of Premium Shield',
    popular: false,
    features: [
      'Guaranteed milestone payouts timed with Grade 12 graduation & overseas master’s',
      'Built-in Waiver of Premium: all future premiums paid by insurer if parent passes away',
      'Triple-point compounding with sovereign bonus additions',
      'Completely exempt from capital gains tax under Sec 10(10D)',
      'Inflation-hedged corpus designed specifically for overseas tuition fees'
    ],
    brochureUrl: '#',
    recommendedFor: 'Parents with children aged 0 to 12 years securing overseas education.'
  },
  {
    id: 'plan-motor-1',
    category: 'Motor & Vehicle',
    title: 'Comprehensive Zero-Depreciation Car & SUV Insurance',
    insurer: 'Tata AIG / ICICI Lombard Partnered',
    sumAssured: '100% Insured Declared Value (IDV)',
    startingPremium: 650,
    tenure: '1 Year / 3 Years OD',
    tag: 'Instant Cashless Garage TAT',
    popular: false,
    features: [
      'Bumper-to-Bumper zero depreciation on plastic, metal & fibre parts',
      'Engine Protector & Hydrostatic Lock cover for water-logged roads',
      '24x7 Roadside Assistance, towing & flat tyre emergency dispatch',
      'Return to Invoice (RTI) rider: 100% on-road price reimbursed on total loss/theft',
      '10,000+ Cashless Network workshops across India'
    ],
    brochureUrl: '#',
    recommendedFor: 'Personal car owners, luxury vehicle drivers, and commercial fleet owners.'
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

  // Emergency Claim Hotline State
  const [emergencyPatientName, setEmergencyPatientName] = useState('');
  const [emergencyHospitalName, setEmergencyHospitalName] = useState('');
  const [emergencyCity, setEmergencyCity] = useState('');
  const [emergencyPolicyNo, setEmergencyPolicyNo] = useState('');
  const [emergencyType, setEmergencyType] = useState<'emergency' | 'planned'>('emergency');

  // Term Calculator State
  const [termAge, setTermAge] = useState<number>(30);
  const [termCoverCrores, setTermCoverCrores] = useState<number>(1.5); // In Crores
  const [termCoverAge, setTermCoverAge] = useState<number>(75);
  const [termIsSmoker, setTermIsSmoker] = useState<boolean>(false);
  const [termIncludeCriticalIllness, setTermIncludeCriticalIllness] = useState<boolean>(true);
  const [termIncludeAccidental, setTermIncludeAccidental] = useState<boolean>(true);

  // Health Calculator State
  const [healthEldestAge, setHealthEldestAge] = useState<number>(34);
  const [healthSumInsuredLakhs, setHealthSumInsuredLakhs] = useState<number>(25); // In Lakhs
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

  // Clean WhatsApp Number
  const whatsappNumber = useMemo(() => {
    return getCleanWhatsAppNumber(profile);
  }, [profile, getCleanWhatsAppNumber]);

  // Advisor Credentials
  const advisorName = profile.name || 'Rajesh Sengupta';
  const advisorCompany = profile.company || 'Suraksha Life & Health Insurance Advisory';
  const advisorDesignation = profile.designation || 'MDRT Life Member | Senior Financial Security Advisor';
  const irdaNumber = 'IRDAI/AGN/2012/849102';
  const mdrtYear = 'MDRT USA 2026 (Court of the Table)';

  // Setup current URL and QR
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      setCurrentUrl(url);
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
        .then(data => setWebsiteQrUrl(data))
        .catch(() => {});
    }
  }, []);

  // Term Premium Calculations
  const calculatedTermPremium = useMemo(() => {
    // Base rate for 1 Cr at age 30: approx ₹800/month
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
    if (termIsSmoker) baseRate *= 1.48; // Smokers pay ~48% more
    if (termIncludeCriticalIllness) baseRate += 220 * termCoverCrores;
    if (termIncludeAccidental) baseRate += 110 * termCoverCrores;

    const monthly = Math.round(baseRate);
    const annual = Math.round(monthly * 11.2); // ~7% discount for annual lump-sum
    const taxSaving80C = Math.min(annual * 0.312, 46800); // 30% tax slab + cess

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
    // Compounded at conservative 9.5% p.a.
    const r = 0.095 / 12;
    const n = yearsToInvest * 12;
    const corpus = Math.round(retireMonthlySavings * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    // Guaranteed annuity payout at ~7.2% p.a.
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
    // At expected 11% CAGR for child education hybrid funds
    const r = 0.11 / 12;
    const n = yearsRemaining * 12;
    const monthlyNeeded = Math.round((targetCorpus * r) / ((Math.pow(1 + r, n) - 1) * (1 + r)));

    return {
      yearsRemaining,
      monthlyNeeded,
      targetCorpus
    };
  }, [childCurrentAge, childCollegeAge, childTargetCorpusLakhs]);

  // Handle WhatsApp Calculator Quote
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

  // Plan WhatsApp Inquiry
  const handlePlanWhatsAppInquiry = (plan: typeof DEFAULT_INSURANCE_PLANS[0]) => {
    trackAction(`plan_inquiry_${plan.id}`);
    const msg = `Hello ${advisorName}! 👋\n\nI am interested in your *${plan.title}*:\n\n• *Insurer Partner:* ${plan.insurer}\n• *Sum Assured:* ${plan.sumAssured}\n• *Starting Premium:* ~₹${plan.startingPremium.toLocaleString()}/month\n• *Key Feature:* ${plan.features[0]}\n\nPlease share the official policy brochure (PDF), network hospital list, and custom quote for my family. Thank you!`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered Plans
  const filteredPlans = useMemo(() => {
    if (selectedPlanCategory === 'All') return DEFAULT_INSURANCE_PLANS;
    return DEFAULT_INSURANCE_PLANS.filter(p => p.category.toLowerCase().includes(selectedPlanCategory.toLowerCase()));
  }, [selectedPlanCategory]);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Top Device View Switcher (Matches Fashion & Restaurant Template Switcher) */}
      {showViewToggle && (
        <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
              Official Insurance Advisory Website
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-0.5 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
              <button
                onClick={() => setViewMode('website')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all bg-blue-600 text-white shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop Website</span>
                <span className="sm:hidden">Web</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all text-slate-400 hover:text-white cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Smart Card</span>
                <span className="sm:hidden">Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Sticky Header & Brand Nav */}
      <header className="sticky top-10 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 p-0.5 shadow-lg shadow-blue-900/40 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                  {advisorName}
                  <BadgeCheck className="w-4 h-4 text-emerald-400 inline shrink-0" />
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded-full">
                  <Award className="w-3 h-3 text-amber-400" />
                  MDRT 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                IRDAI Reg: <span className="text-slate-300 font-mono font-medium">{irdaNumber}</span> • {advisorCompany}
              </p>
            </div>
          </div>

          {/* Quick Nav Anchors (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#calculator" className="hover:text-blue-400 transition-colors">Premium Calculator</a>
            <a href="#plans" className="hover:text-blue-400 transition-colors">Policy Plans</a>
            <a href="#emergency" className="hover:text-red-400 transition-colors text-rose-300 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              24/7 Claim Desk
            </a>
            <a href="#partners" className="hover:text-blue-400 transition-colors">Top Insurers</a>
            <a href="#tax" className="hover:text-blue-400 transition-colors">Tax Benefits</a>
            <a href="#claims" className="hover:text-blue-400 transition-colors">Claim Stories</a>
            <a href="#faqs" className="hover:text-blue-400 transition-colors">FAQs</a>
          </nav>

          {/* Actions: Direct WhatsApp & Call */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-rose-900/30 transition-all cursor-pointer active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Emergency Claim</span>
              <span className="sm:hidden">Claim</span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${advisorName}! 👋 I am visiting your official OneClickBiz insurance website and would like to speak with you regarding policy planning.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAction('header_whatsapp')}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Advisor</span>
              <span className="sm:hidden">Chat</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-slate-800/60 bg-radial-[at_top_center] from-blue-950/40 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badges Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 backdrop-blur-md">
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  IRDAI Certified Partner
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  MDRT USA Life Member
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  99.4% Claim Settlement Ratio
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Protect What Matters Most with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Zero-Bias Financial Security</span> & 24/7 Cashless Claims
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Guiding 4,500+ Indian families and global NRI professionals to navigate Term Life, Comprehensive Mediclaim, Critical Illness, and Guaranteed Retirement Planning. Independent advisory partnering with India’s highest-rated insurers with dedicated cashless hospital desk support.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#calculator"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate Instant Premium
                </a>

                <button
                  onClick={() => setIsAuditModalOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  Free 360° Policy Audit
                </button>

                <button
                  onClick={() => downloadVcfFile(profile)}
                  className="px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Save Advisor Contact directly to smartphone address book"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Save VCF</span>
                </button>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
                  title="Scan QR Code"
                >
                  <QrCode className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all cursor-pointer"
                  title="Share Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Contact & Office Details */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Direct: <a href={`tel:${profile.phone || '+919876524321'}`} className="text-slate-200 hover:underline font-mono">{profile.phone || '+91 98765 24321'}</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-200 font-mono">{profile.email || 'rajesh.sengupta@surakshainsurance.in'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300">{profile.address || 'BKC Mumbai & Hitec City, Hyderabad, India'}</span>
                </div>
              </div>
            </div>

            {/* Right Advisor Card & Proof Metric Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl p-1 bg-gradient-to-b from-blue-500/40 via-indigo-500/20 to-slate-800/40 shadow-2xl">
                <div className="rounded-[22px] bg-slate-900/95 backdrop-blur-xl p-6 space-y-6">
                  {/* Advisor Photo & Badge */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={profile.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                        alt={advisorName}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/40 shadow-md"
                      />
                      <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-slate-950 p-1 rounded-full border-2 border-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-white">{advisorName}</h2>
                      </div>
                      <p className="text-xs text-blue-400 font-semibold">{advisorDesignation}</p>
                      <p className="text-[11px] text-slate-400">{advisorCompany}</p>
                    </div>
                  </div>

                  {/* 4 Hard Trust Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 font-medium">Life Cover Managed</p>
                      <p className="text-lg font-bold text-white tracking-tight mt-0.5">₹480+ Cr</p>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                        <TrendingUp className="w-3 h-3" /> Active Portfolios
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 font-medium">Claim Ratio</p>
                      <p className="text-lg font-bold text-emerald-400 tracking-tight mt-0.5">99.4%</p>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">FY 2025-26</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 font-medium">Cashless Network</p>
                      <p className="text-lg font-bold text-sky-400 tracking-tight mt-0.5">14,500+</p>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">Pan-India Hospitals</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <p className="text-[11px] text-slate-400 font-medium">Claim TAT</p>
                      <p className="text-lg font-bold text-amber-400 tracking-tight mt-0.5">&lt; 60 Mins</p>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">Cashless Pre-Auth</span>
                    </div>
                  </div>

                  {/* Emergency 24/7 Strip */}
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-rose-200">24x7 Emergency Claim Desk</p>
                        <p className="text-[11px] text-rose-300/80">Hospitalization admission alert</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEmergencyModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                    >
                      Alert Desk
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE PREMIUM CALCULATOR */}
      <section id="calculator" className="py-16 sm:py-20 bg-slate-900/60 border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30">
              <Calculator className="w-3.5 h-3.5" />
              Live Interactive Premium Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Instant Quote Calculator with 0% Commission Bias
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Compare estimated premiums, tax exemptions, and customized coverage options in real time.
            </p>
          </div>

          {/* Calculator Container */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-900/90 border-b border-slate-800 p-1.5 gap-1">
              <button
                onClick={() => setActiveTab('term')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'term'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Umbrella className="w-4 h-4" />
                <span>Term Life</span>
              </button>

              <button
                onClick={() => setActiveTab('health')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'health'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <HeartPulse className="w-4 h-4" />
                <span>Health Mediclaim</span>
              </button>

              <button
                onClick={() => setActiveTab('retire')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'retire'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Pension & Annuity</span>
              </button>

              <button
                onClick={() => setActiveTab('child')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'child'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Child Education</span>
              </button>
            </div>

            {/* TAB CONTENT: 1. TERM LIFE INSURANCE */}
            {activeTab === 'term' && (
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Sliders & Controls */}
                  <div className="space-y-6">
                    {/* Age Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Your Current Age</label>
                        <span className="text-sm font-bold text-blue-400 font-mono bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>18 Yrs</span>
                        <span>35 Yrs</span>
                        <span>60 Yrs</span>
                      </div>
                    </div>

                    {/* Sum Assured Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Life Protection Cover (Sum Assured)</label>
                        <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>₹50 Lakhs</span>
                        <span>₹2.5 Crores</span>
                        <span>₹5 Crores</span>
                      </div>
                    </div>

                    {/* Tobacco & Smoker Habit Toggle */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">Tobacco or Smoking Habit</p>
                          <p className="text-[11px] text-slate-400">Non-smokers receive up to 30% discount on premiums</p>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                          <button
                            type="button"
                            onClick={() => setTermIsSmoker(false)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                              !termIsSmoker ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            No
                          </button>
                          <button
                            type="button"
                            onClick={() => setTermIsSmoker(true)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                              termIsSmoker ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Yes
                          </button>
                        </div>
                      </div>

                      {/* Riders Selection */}
                      <div className="pt-2 border-t border-slate-800/80 space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={termIncludeCriticalIllness}
                            onChange={(e) => setTermIncludeCriticalIllness(e.target.checked)}
                            className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                          />
                          <span>Add 64 Critical Illness Living Benefit Rider (+₹220/mo)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={termIncludeAccidental}
                            onChange={(e) => setTermIncludeAccidental(e.target.checked)}
                            className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                          />
                          <span>Add Accidental Death & Disability Cover (+₹110/mo)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Calculation Card */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Estimated Term Plan Premium</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedTermPremium.monthly.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">/ month (incl. 18% GST)</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Or ~<span className="text-slate-200 font-bold font-mono">₹{calculatedTermPremium.annual.toLocaleString()}</span> / year on annual payment mode.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Sum Assured Cover:</span>
                        <span className="font-bold text-white font-mono">₹{termCoverCrores} Crore</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Coverage Tenure:</span>
                        <span className="font-bold text-white">Up to Age {termCoverAge} Years</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Sec 80C Tax Deduction:</span>
                        <span className="font-bold text-emerald-400 font-mono">Save up to ₹{calculatedTermPremium.taxSaving.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Claim Settlement Ratio:</span>
                        <span className="font-bold text-emerald-400">99.5% (IRDAI Audited)</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendTermWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Get Official Quote on WhatsApp</span>
                    </button>
                    <p className="text-[10px] text-center text-slate-500">
                      *Zero spam policy. Proposal quotes sent directly by IRDAI licensed advisor.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. HEALTH & MEDICLAIM */}
            {activeTab === 'health' && (
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Controls */}
                  <div className="space-y-6">
                    {/* Family Type Grid */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-2">Who would you like to cover?</label>
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
                                ? 'bg-blue-900/60 border-blue-500 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eldest Member Age */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Age of Eldest Insured Member</label>
                        <span className="text-sm font-bold text-blue-400 font-mono bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>18 Yrs</span>
                        <span>45 Yrs</span>
                        <span>75 Yrs</span>
                      </div>
                    </div>

                    {/* Sum Insured Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Desired Sum Insured</label>
                        <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>₹10 Lakhs</span>
                        <span>₹50 Lakhs</span>
                        <span>₹1 Crore</span>
                      </div>
                    </div>

                    {/* Pre-existing & Room Rent Toggles */}
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={healthZeroRoomRent}
                          onChange={(e) => setHealthZeroRoomRent(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                        <span>Zero Room Rent Capping (No proportionate deductions)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                        <input
                          type="checkbox"
                          checked={healthHasDiabetes}
                          onChange={(e) => setHealthHasDiabetes(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                        <span>Any member has Diabetes, BP or Thyroid</span>
                      </label>
                    </div>
                  </div>

                  {/* Right Calculation Box */}
                  <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Estimated Mediclaim Premium</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedHealthPremium.monthly.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">/ month (EMI option)</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Or ~<span className="text-slate-200 font-bold font-mono">₹{calculatedHealthPremium.annual.toLocaleString()}</span> / year upfront.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Cashless Network:</span>
                        <span className="font-bold text-white">14,500+ Hospitals Pan-India</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Restoration Benefit:</span>
                        <span className="font-bold text-emerald-400">Unlimited 100% Reload</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Sec 80D Tax Deduction:</span>
                        <span className="font-bold text-emerald-400 font-mono">Save up to ₹{calculatedHealthPremium.taxSaving.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Room Rent Limit:</span>
                        <span className="font-bold text-white">{healthZeroRoomRent ? 'Single AC / No Limit' : 'Standard'}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendHealthWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Your Current Age</label>
                        <span className="text-sm font-bold text-blue-400 font-mono bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Desired Retirement Age</label>
                        <span className="text-sm font-bold text-amber-400 font-mono bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Monthly Investment Amount</label>
                        <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Guaranteed Monthly Pension for Life</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedRetirePension.monthlyPension.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">/ month for life</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Accumulated Corpus:</span>
                        <span className="font-bold text-white font-mono">₹{(calculatedRetirePension.corpus / 10000000).toFixed(2)} Crores</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Investment Horizon:</span>
                        <span className="font-bold text-white">{calculatedRetirePension.yearsToInvest} Years</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Nominee Return Guarantee:</span>
                        <span className="font-bold text-emerald-400">100% Purchase Price Back</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendRetireWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
              <div className="p-6 sm:p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Child's Current Age</label>
                        <span className="text-sm font-bold text-blue-400 font-mono bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">Target Higher Education Corpus</label>
                        <span className="text-sm font-bold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
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
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/50 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Recommended Monthly Savings</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-4xl font-extrabold text-white font-mono">
                          ₹{calculatedChildFund.monthlyNeeded.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">/ month</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Target College Corpus:</span>
                        <span className="font-bold text-white font-mono">₹{childTargetCorpusLakhs} Lakhs</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Time Horizon:</span>
                        <span className="font-bold text-white">{calculatedChildFund.yearsRemaining} Years (Matures at Age 18)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Waiver of Premium:</span>
                        <span className="font-bold text-emerald-400">Included Automatically</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendChildWhatsAppQuote}
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
      </section>

      {/* SECTION: CURATED PLANS & PRODUCTS PORTFOLIO */}
      <section id="plans" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full inline-block mb-2">
              Curated Policy Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Comprehensive Protection Plans
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Carefully vetted for high claim-settlement ratios, zero-capping terms, and rapid cashless approvals.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {['All', 'Term Life', 'Health', 'Super Top-Up', 'Retirement', 'Child', 'Motor'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedPlanCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedPlanCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 bg-slate-900/90 border transition-all duration-300 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/40 relative ${
                plan.popular ? 'border-blue-500/40 ring-1 ring-blue-500/30' : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
                  Top Recommended
                </span>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    {plan.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    {plan.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">{plan.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {plan.insurer}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Cover Amount</span>
                    <p className="text-sm font-bold text-white font-mono">{plan.sumAssured}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-medium">Starting At</span>
                    <p className="text-sm font-bold text-emerald-400 font-mono">₹{plan.startingPremium.toLocaleString()}/mo</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-1">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => handlePlanWhatsAppInquiry(plan)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-900/30"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Get Custom Quote</span>
                </button>

                <button
                  onClick={() => {
                    trackAction(`plan_brochure_${plan.id}`);
                    const msg = `Hello ${advisorName}! 👋 Please send me the official policy brochure (PDF) for *${plan.title}*. Thank you!`;
                    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
                  title="Request PDF Brochure via WhatsApp"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: 24/7 EMERGENCY CASHLESS CLAIM HOTLINE & WIZARD */}
      <section id="emergency" className="py-16 sm:py-20 bg-gradient-to-b from-rose-950/20 via-slate-950 to-slate-950 border-y border-rose-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-10 bg-slate-900/90 border border-rose-500/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  24x7 Priority Hospital Claim Desk
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Hospitalization Emergency? We Stand By You in the TPA Ward.
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  During medical crises, your only priority should be patient recovery. Our personal advisory desk coordinates directly with hospital TPAs, verifies coverage, eliminates room rent disputes, and fast-tracks pre-authorization.
                </p>

                {/* 4-Step Cashless Hospital Journey */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-rose-400">Step 1: Immediate Alert</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Call or WhatsApp our 24/7 desk within 24 hours of hospital admission.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-blue-400">Step 2: TPA Desk Check-in</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Show your digital Health e-Card and patient Aadhaar at the hospital insurance desk.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-amber-400">Step 3: Fast Pre-Auth</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Our desk tracks initial cashless sanction within 45-60 minutes.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400">Step 4: Final Discharge</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Final bill settled directly by insurer with zero non-medical deductions.</p>
                  </div>
                </div>
              </div>

              {/* Right Emergency Call to Action */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center">
                  <PhoneCall className="w-8 h-8 text-rose-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Emergency Assistance Hotline</p>
                  <p className="text-2xl font-extrabold text-rose-400 font-mono mt-1">
                    {profile.phone || '+91 98765 24321'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Direct Advisor Line • Monitored 24 Hours</p>
                </div>

                <div className="w-full space-y-2">
                  <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Submit Emergency Claim Alert</span>
                  </button>

                  <a
                    href={`tel:${profile.phone || '+919876524321'}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dial Hotline Directly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TOP INSURER PARTNERS & COMPARISON MATRIX */}
      <section id="partners" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
            Institutional Alliances
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            India's Leading Insurance Institutions
          </h2>
          <p className="text-sm text-slate-400">
            We operate independently with zero company quotas to bring you verified, unbiased underwriting metrics.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Insurer Partner</th>
                <th className="py-4 px-6">Domain</th>
                <th className="py-4 px-6">Claim Settlement Ratio</th>
                <th className="py-4 px-6">Solvency Ratio</th>
                <th className="py-4 px-6">Cashless Hospitals</th>
                <th className="py-4 px-6">Average TAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
              {INSURER_PARTNERS.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    {item.name}
                  </td>
                  <td className="py-4 px-6 text-slate-300 font-medium">{item.type}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold font-mono">{item.csr}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono">{item.solvency}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono">{item.networkHospitals}</td>
                  <td className="py-4 px-6 text-amber-300 font-medium">{item.tat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: TAX SAVINGS MAXIMIZER (SEC 80C & 80D) */}
      <section id="tax" className="py-16 sm:py-20 bg-slate-900/50 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
                Tax Optimization Strategy
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Save Up To ₹70,200 in Income Tax Every Single Year
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Smart insurance planning not only safeguards your family against life’s uncertainties but also serves as your most efficient tax shelter under the Income Tax Act of India.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0 mt-0.5">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Section 80C (Term Life & Annuity Plans)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Deduct up to <span className="text-slate-200 font-bold font-mono">₹1,50,000</span> from your taxable income. Saves up to ₹46,800/yr in the 30% tax slab.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 shrink-0 mt-0.5">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Section 80D (Health Mediclaim & Parents)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Deduct up to <span className="text-slate-200 font-bold font-mono">₹25,000</span> for self/family + <span className="text-slate-200 font-bold font-mono">₹50,000</span> for senior citizen parents. Total ₹75,000 deductions!
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Section 10(10D) (100% Tax-Free Payouts)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      All life insurance death benefits, terminal illness payouts, and qualifying maturity returns are 100% exempt from income tax.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Tax Calculation Infographic */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-emerald-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-400">Tax Relief Illustration (30% Slab)</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                  Maximum Legal Savings
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Sec 80C Deduction (Term Life)</span>
                    <span className="text-white font-bold font-mono">₹1,50,000</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <span className="text-[10px] text-blue-400 font-semibold">Saves ₹46,800 Tax</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Sec 80D (Self & Family Mediclaim)</span>
                    <span className="text-white font-bold font-mono">₹25,000</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '33%' }} />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Saves ₹7,800 Tax</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Sec 80D (Senior Parents Mediclaim)</span>
                    <span className="text-white font-bold font-mono">₹50,000</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '66%' }} />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Saves ₹15,600 Tax</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 font-medium">Total Annual Tax Saved:</span>
                  <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-0.5">₹70,200 / Year</p>
                </div>
                <button
                  onClick={() => {
                    trackAction('tax_planning_whatsapp');
                    const msg = `Hello ${advisorName}! 👋 I would like to structure my Term Life and Health Insurance to maximize Section 80C and 80D tax savings before this financial year ends. Please assist me. Thank you!`;
                    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Plan Tax Savings
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VERIFIED CLIENT CLAIM SETTLEMENT STORIES */}
      <section id="claims" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
            Real Moments of Truth
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Claim Settlement Experiences
          </h2>
          <p className="text-sm text-slate-400">
            A policy is only as valuable as the advisor who stands by your family when a claim arises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_CLAIM_STORIES.map(story => (
            <div
              key={story.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                    {story.tat}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium">Claim Settled:</p>
                  <p className="text-base font-bold text-white font-mono">{story.settledAmount}</p>
                  <p className="text-[10px] text-slate-400 truncate">{story.hospital}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <p className="text-xs font-bold text-white">{story.author}</p>
                <p className="text-[11px] text-slate-400">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: FREE 360° POLICY AUDIT BANNER & FORM */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-600/40 px-3.5 py-1 rounded-full inline-block">
            Zero-Obligation Forensic Audit
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Are Your Existing Insurance Policies Actually Protecting You?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Over 65% of existing policies contain hidden room rent caps, disease sub-limits, or surrender penalties that cause shocking out-of-pocket hospital bills. Book a free 30-minute forensic audit today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Book Free 360° Policy Audit</span>
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello ${advisorName}! 👋 I have an existing health/life insurance policy and would like to get a free policy audit to check for hidden sub-limits. When can we connect?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Existing Policy PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section id="faqs" className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full inline-block">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Real questions Indian policyholders ask when selecting life, health, and retirement coverage.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: CONTACT & FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span>{advisorCompany}</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                Led by {advisorName}, MDRT USA Life Member. Providing fiduciary insurance advisory, high-sum-assured term life structuring, comprehensive mediclaim portfolio audits, and 24x7 cashless hospital claim advocacy.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <p>IRDAI License Registration: <span className="font-mono text-slate-400">{irdaNumber}</span></p>
                <p>Agency Code: <span className="font-mono text-slate-400">AGN-SUR-984102</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-bold text-sm">Direct Contacts</p>
              <p><a href={`tel:${profile.phone || '+919876524321'}`} className="hover:text-blue-400 transition-colors font-mono">{profile.phone || '+91 98765 24321'}</a></p>
              <p><a href={`mailto:${profile.email || 'rajesh.sengupta@surakshainsurance.in'}`} className="hover:text-blue-400 transition-colors font-mono">{profile.email || 'rajesh.sengupta@surakshainsurance.in'}</a></p>
              <p className="text-slate-400">{profile.address || 'BKC, Mumbai & Hitec City, Hyderabad, India'}</p>
            </div>

            <div className="space-y-3">
              <p className="text-white font-bold text-sm">Advisor vCard</p>
              <button
                onClick={() => downloadVcfFile(profile)}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact (.VCF)</span>
              </button>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>View Scan QR Code</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Emergency Cashless Hospital Alert</h3>
                <p className="text-xs text-rose-300">Direct alert to advisor's personal emergency desk</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={emergencyPatientName}
                  onChange={(e) => setEmergencyPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apollo Jubilee Hills"
                    value={emergencyHospitalName}
                    onChange={(e) => setEmergencyHospitalName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad"
                    value={emergencyCity}
                    onChange={(e) => setEmergencyCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Policy Number / Insurer (if known)</label>
                <input
                  type="text"
                  placeholder="e.g. Care Supreme #482910 or 'Need Lookup'"
                  value={emergencyPolicyNo}
                  onChange={(e) => setEmergencyPolicyNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Admission Nature</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEmergencyType('emergency')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      emergencyType === 'emergency'
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Sudden Emergency (24h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmergencyType('planned')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      emergencyType === 'planned'
                        ? 'bg-blue-950/80 border-blue-500 text-blue-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
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
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsAuditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Free 360° Policy Audit</h3>
                <p className="text-xs text-amber-300">Uncover hidden sub-limits & room rent traps</p>
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
                <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Existing Insurer or Policy Type</label>
                <textarea
                  rows={2}
                  placeholder="e.g. I have a 5L Star Health policy and a LIC endowment plan. Want to check if adequate."
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 text-center shadow-2xl relative">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Scan Smart Digital vCard</h3>
              <p className="text-xs text-slate-400 mt-1">Point smartphone camera to instantly save contacts & quotes</p>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner">
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
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
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
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedLink ? '✓ Link Copied to Clipboard!' : 'Copy Website URL'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: SHARE MODAL                                    */}
      {/* ======================================================== */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl relative text-center">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Share Advisor Website</h3>
              <p className="text-xs text-slate-400 mt-1">Recommend {advisorName} to friends and family</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${advisorName}'s verified insurance advisory website for Term Life, Health Mediclaim, and 24/7 cashless claim assistance: ${currentUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500 flex flex-col items-center gap-2 text-xs text-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500 flex flex-col items-center gap-2 text-xs text-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <span>LinkedIn</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 flex flex-col items-center gap-2 text-xs text-slate-300 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <CopyIcon className="w-5 h-5" />
                </div>
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
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
