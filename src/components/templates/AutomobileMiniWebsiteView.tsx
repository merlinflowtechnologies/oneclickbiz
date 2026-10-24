'use client';

import React, { useState } from 'react';
import {
  Car,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  QrCode,
  Download,
  Fuel,
  Gauge,
  Sliders,
  DollarSign,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  Wrench
} from 'lucide-react';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface AutomobileMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (actionName: string) => void;
  getCleanWhatsAppNumber?: (prof: DigitalProfile) => string;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'website' | 'mobile';
  setViewMode?: (mode: 'website' | 'mobile') => void;
  showViewToggle?: boolean;
}

export default function AutomobileMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: AutomobileMiniWebsiteViewProps) {
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<string>('all');
  const [selectedCarForDrive, setSelectedCarForDrive] = useState<string>('');
  
  // EMI Calculator State
  const [carPrice, setCarPrice] = useState<number>(1200000);
  const [downPayment, setDownPayment] = useState<number>(250000);
  const [loanTenure, setLoanTenure] = useState<number>(5); // years

  const [testDriveForm, setTestDriveForm] = useState({
    name: '',
    phone: '',
    carModel: '',
    date: new Date().toISOString().split('T')[0],
    preferredTime: 'Morning (10:00 AM - 01:00 PM)',
    driveLocation: 'Showroom Visit'
  });

  const autoData = (profile.sectionData as any)?.automobile || {};
  const authorizedBrands = autoData.brands || 'Certified Multi-Brand & EV Showroom';
  const dealershipCertification = autoData.certification || '150-Point Quality Checked & Clean Title Guarantee';
  const experienceYears = autoData.experienceYears || '14+ Years in Auto Retailing';

  const cleanPhone = (profile.phone || '').replace(/\D/g, '');
  const cleanWa = (getCleanWhatsAppNumber(profile) || cleanPhone).replace(/\D/g, '');

  const defaultVehicles = [
    {
      id: 'v1',
      name: 'Hyundai Creta SX (O) Turbo',
      bodyType: 'SUV',
      price: '₹ 18.25 Lakhs',
      fuel: 'Petrol',
      transmission: '7-Speed DCT',
      mileage: '18.4 kmpl',
      year: '2024 Model',
      imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'v2',
      name: 'Tata Nexon EV Empowered Plus',
      bodyType: 'EV',
      price: '₹ 19.49 Lakhs',
      fuel: '100% Electric',
      transmission: 'Automatic',
      mileage: '465 km Range',
      year: 'Brand New',
      imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'v3',
      name: 'Skoda Slavia 1.5 TSI Style',
      bodyType: 'Sedan',
      price: '₹ 16.80 Lakhs',
      fuel: 'Turbo Petrol',
      transmission: 'DSG Automatic',
      mileage: '19.2 kmpl',
      year: '2024 Model',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'v4',
      name: 'Mahindra Scorpio-N Z8L 4x4',
      bodyType: 'SUV',
      price: '₹ 24.50 Lakhs',
      fuel: 'Diesel mHawk',
      transmission: 'Automatic 4WD',
      mileage: '15.6 kmpl',
      year: '2024 Ready Delivery',
      imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const vehicles = profile.sectionData?.products?.items?.length
    ? profile.sectionData.products.items.map(item => ({
        id: item.id,
        name: item.name,
        bodyType: item.category || 'Vehicle',
        price: `₹ ${item.price?.toLocaleString('en-IN') || 'Best Offer'}`,
        fuel: 'Petrol / Hybrid',
        transmission: 'Automatic / Manual',
        mileage: 'Verified Mileage',
        year: 'Ready Stock',
        imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
      }))
    : defaultVehicles;

  const filteredVehicles = selectedBodyType === 'all'
    ? vehicles
    : vehicles.filter(v => v.bodyType.toLowerCase() === selectedBodyType.toLowerCase());

  // EMI Calculation: Loan = carPrice - downPayment, rate = 9.5% p.a.
  const loanAmount = Math.max(0, carPrice - downPayment);
  const monthlyInterestRate = 9.5 / 12 / 100;
  const numberOfMonths = loanTenure * 12;
  const calculatedEmi = Math.round(
    (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1)
  );

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('test_drive_submit');

    const msg = `*TEST DRIVE & QUOTATION INQUIRY* 🚗\n\n` +
      `*Dealership:* ${profile.company || profile.name}\n` +
      `*Customer Name:* ${testDriveForm.name}\n` +
      `*Phone Number:* ${testDriveForm.phone}\n` +
      `*Vehicle Selected:* ${testDriveForm.carModel || selectedCarForDrive || 'Featured Vehicle'}\n` +
      `*Date:* ${testDriveForm.date}\n` +
      `*Preferred Slot:* ${testDriveForm.preferredTime}\n` +
      `*Location Preference:* ${testDriveForm.driveLocation}\n\n` +
      `Please confirm test drive slot and share on-road pricing sheet.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsTestDriveModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      
      {/* 1. TOP DEALER ACCREDITATION STRIP */}
      <div className="bg-slate-950 text-slate-300 px-4 sm:px-8 py-2 text-xs border-b border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-wider text-rose-400 text-[11px] sm:text-xs">
              {dealershipCertification}
            </span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              &bull; Spot RTO Transfer &bull; 100% Non-Accidental Certified
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-bold hidden sm:inline">{authorizedBrands}</span>
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Showroom QR</span>
            </button>
            <button
              onClick={() => downloadVcfFile(profile)}
              className="text-slate-300 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY AUTOMOTIVE HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-rose-600 bg-slate-800 shadow-sm">
                <img
                  src={profile.avatarUrl || '/placeholder-car-dealer.jpg'}
                  alt={profile.company || profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-slate-900 flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-lg font-black text-white leading-tight">
                  {profile.company || profile.name}
                </h1>
                <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-semibold truncate max-w-[200px] sm:max-w-md">
                {profile.name} &bull; {profile.designation || 'Automotive Consultant'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showViewToggle && setViewMode && (
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'website' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💻 Showroom Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'mobile' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📱 Auto Card
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedCarForDrive(vehicles[0]?.name || 'Featured Car');
                setIsTestDriveModalOpen(true);
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-600/30 transition active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Car className="w-4 h-4" />
              <span>Book Test Drive</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SHOWROOM BANNER */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 border-b border-slate-800 overflow-hidden">
        {/* Ambient Backlight */}
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black shadow-xs">
            <Car className="w-4 h-4 text-rose-500" />
            <span>{authorizedBrands}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Find Your Dream Drive with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Certified Assurance &amp; Instant Delivery.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {profile.bio || `Explore the finest inventory of certified new and pre-owned cars, luxury SUVs, and commercial vehicles with lowest interest financing, warranty coverage, and hassle-free doorstep test drives.`}
          </p>

          {/* SQUIRCLE ROW */}
          <div className="pt-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 w-max sm:w-auto mx-auto px-2">
              
              {/* Call */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition group-hover:scale-105">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">Call Sales</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.company || profile.name}, I am inquiring from your digital automotive showroom.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#25D366] hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition group-hover:scale-105">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">WhatsApp</span>
              </a>

              {/* Test Drive */}
              <button
                onClick={() => setIsTestDriveModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition group-hover:scale-105">
                  <Car className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">Test Drive</span>
              </button>

              {/* Directions */}
              {profile.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition group-hover:scale-105">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">Showroom</span>
                </a>
              )}

              {/* Save Contact */}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105 border border-slate-700">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">Save Contact</span>
              </button>

              {/* Share */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition group-hover:scale-105">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase">Share</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 4. INVENTORY SHOWCASE GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-wider">
              Ready Stock Inventory
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Featured Cars &amp; Ready Deliveries
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              All vehicles pass 150-point technical certification with verified odometer history.
            </p>
          </div>

          {/* Body Type Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['all', 'SUV', 'Sedan', 'EV'].map((bt) => (
              <button
                key={bt}
                onClick={() => setSelectedBodyType(bt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize cursor-pointer ${
                  selectedBodyType === bt
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {bt === 'all' ? 'All Vehicles' : bt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="bg-slate-800/80 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl hover:border-rose-500/50 hover:shadow-2xl transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] font-black text-amber-400 uppercase">
                    {car.year}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-rose-600 text-[10px] font-black text-white uppercase">
                    {car.bodyType}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-rose-400 transition">
                      {car.name}
                    </h4>
                    <p className="text-xl font-extrabold text-amber-400 mt-0.5 font-mono">
                      {car.price}
                    </p>
                  </div>

                  {/* Vehicle Spec Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-slate-700/60">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-rose-400" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" />
                      <span>{car.mileage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 text-slate-400">
                      <Sliders className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => {
                    setSelectedCarForDrive(car.name);
                    setIsTestDriveModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Book Test Drive</span>
                </button>

                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.company || profile.name}, I want to check on-road price and delivery timeline for "${car.name}".`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Get On-Road Price</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE AUTO LOAN & EMI CALCULATOR */}
      <section className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
              Auto Finance Desk
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Instant Auto Loan EMI Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Check monthly installments with our tie-up partner banks (HDFC, ICICI, SBI) at prime interest rates.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Sliders */}
            <div className="md:col-span-7 space-y-6">
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Car On-Road Price:</span>
                  <span className="text-rose-400 font-mono text-sm">₹ {(carPrice / 100000).toFixed(2)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={400000}
                  max={5000000}
                  step={50000}
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Down Payment:</span>
                  <span className="text-amber-400 font-mono text-sm">₹ {(downPayment / 100000).toFixed(2)} Lakhs</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={carPrice * 0.7}
                  step={25000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-300">Loan Tenure:</span>
                  <span className="text-emerald-400 font-mono text-sm">{loanTenure} Years ({loanTenure * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

            </div>

            {/* Right Output Box */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-rose-950/60 to-slate-900 border border-rose-500/40 text-center space-y-4 shadow-inner">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Estimated Monthly EMI
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                ₹ {calculatedEmi.toLocaleString('en-IN')}<span className="text-sm text-slate-300">/mo</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 border-y border-slate-700/80 py-3">
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-bold text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-bold text-emerald-400">9.5% p.a.</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.company || profile.name}, I checked EMI on your showroom website.\nCar Price: ₹${(carPrice / 100000).toFixed(2)} Lakhs\nDown Payment: ₹${(downPayment / 100000).toFixed(2)} Lakhs\nTenure: ${loanTenure} Years\nCalculated EMI: ₹${calculatedEmi.toLocaleString('en-IN')}/mo.\nPlease check my auto loan pre-approval.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Apply for Loan on WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BOOK TEST DRIVE MODAL */}
      {isTestDriveModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsTestDriveModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-white relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black">Schedule VIP Test Drive</h4>
                  <p className="text-xs text-slate-400">Showroom visit or doorstep vehicle trial</p>
                </div>
              </div>
              <button
                onClick={() => setIsTestDriveModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTestDriveSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={testDriveForm.name}
                  onChange={(e) => setTestDriveForm({ ...testDriveForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={testDriveForm.phone}
                  onChange={(e) => setTestDriveForm({ ...testDriveForm, phone: e.target.value })}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Select Car Model</label>
                  <select
                    value={testDriveForm.carModel || selectedCarForDrive}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, carModel: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Trial Location</label>
                  <select
                    value={testDriveForm.driveLocation}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, driveLocation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white"
                  >
                    <option value="Showroom Visit">Showroom Visit</option>
                    <option value="Doorstep Home Trial">Doorstep Home Trial</option>
                    <option value="Office Trial">Office Trial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={testDriveForm.date}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Preferred Time</label>
                  <select
                    value={testDriveForm.preferredTime}
                    onChange={(e) => setTestDriveForm({ ...testDriveForm, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white"
                  >
                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (2 PM - 5 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition cursor-pointer"
              >
                <Car className="w-4 h-4" />
                <span>Confirm VIP Test Drive on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. SHOWROOM QR MODAL */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 text-center space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-white">Showroom QR Code</h4>
            <div className="w-52 h-52 mx-auto rounded-2xl bg-white p-3 border-2 border-slate-700 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : `https://oneclickbiz.in/v/${profile.slug}`)}`}
                alt="Showroom QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-slate-400">
              Scan with any smartphone camera to browse vehicle inventory and schedule test drives.
            </p>
          </div>
        </div>
      )}

      {/* 8. SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal profile={profile} onClose={() => setIsShareModalOpen(false)} />
      )}

    </div>
  );
}
