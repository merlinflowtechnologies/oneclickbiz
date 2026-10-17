'use strict';
'use client';

import React, { useState } from 'react';
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
  Truck,
  CheckCircle2
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';
import { getServiceImageUrl } from '@/lib/service-image';

interface HomeServicesMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
}

export default function HomeServicesMiniWebsiteView({ profile, getEmbedUrl }: HomeServicesMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'packages' | 'guarantee' | 'reviews'>('all');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    address: '',
    serviceRequired: 'Plumbing & Water Leak Repair',
    urgency: 'Emergency (Arrive within 60 mins)',
    preferredDate: '',
    notes: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Trust Config
  const homeTrust = profile.sectionData?.homeServices || {};
  const warrantyDays = homeTrust.serviceWarrantyDays || '30-Day Workmanship Warranty';
  const verifiedTechs = homeTrust.verifiedTechniciansCount || '100% Police & Background Verified';
  const responseTime = homeTrust.responseTime || 'Within 45-60 Mins On-Site';
  const pricingStandard = homeTrust.pricingStandard || 'Standard Rate Card • No Hidden Charges';
  const emergencyAvailability = homeTrust.emergencyAvailability || '24/7 Rapid Emergency Dispatch';

  const displayName = (profile as any).displayName || profile.company || profile.name || 'Quick Home Services';
  const displayLocation = (profile as any).location || profile.address || '';
  const avatarImage = profile.avatarUrl || (profile as any).logoUrl || '';

  // Services Catalog
  const rawServices = profile.sectionData?.services?.items || [];
  const displayServices: ServiceItem[] = rawServices.length > 0 ? rawServices : [
    {
      id: 'hs-1',
      title: 'Emergency Plumbing & Pipe Repairs',
      description: 'Rapid fixing of burst pipes, severe blockages, tap replacements, and complete drainage unclogging with motorized augers.',
      price: 299,
      currency: '₹',
      durationMinutes: 45,
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hs-2',
      title: 'AC Deep Power Jet Service & Gas Charging',
      description: 'Complete high-pressure power jet foaming cleaning, refrigerant leak test, compressor amperage check & cooling restoration.',
      price: 599,
      currency: '₹',
      durationMinutes: 90,
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hs-3',
      title: 'Electrical Diagnostics & Rewiring',
      description: 'Short circuit troubleshooting, MCB breaker replacement, heavy appliance switchboard installations, and inverter setups.',
      price: 249,
      currency: '₹',
      durationMinutes: 60,
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hs-4',
      title: 'Odorless Herbal Pest Control & Termite Shield',
      description: 'Hospital-grade, child & pet-safe anti-cockroach gel treatment and long-lasting chemical barrier drill treatment for termites.',
      price: 899,
      currency: '₹',
      durationMinutes: 120,
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'hs-5',
      title: 'Full Home Deep Sanitization & Cleaning',
      description: 'Single-disc floor scrubbing, bathroom descaling, kitchen degreasing, and UV sanitization for entire 2BHK/3BHK residences.',
      price: 2499,
      currency: '₹',
      durationMinutes: 240,
      isAvailable: true,
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Products / Packages
  const rawProducts = profile.sectionData?.products?.items || [];
  const displayPackages: ProductItem[] = rawProducts.length > 0 ? rawProducts : [
    {
      id: 'hp-1',
      name: 'Complete 3BHK Deep Cleaning Package',
      description: 'Exhaustive machine scrubbing of tiles, grout steam disinfection, chimney degreasing, sofa shampooing & window pane polishing.',
      price: 3499,
      currency: '₹',
      category: 'Cleaning Packages',
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    },
    {
      id: 'hp-2',
      name: 'Annual Home Care AMC (Plumbing + Electrical + AC)',
      description: 'Unlimited on-demand breakdown visits for 12 months with 4 scheduled AC master maintenance visits & zero service visit fee.',
      price: 5999,
      currency: '₹',
      category: 'Annual Maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    },
    {
      id: 'hp-3',
      name: 'Anti-Termite 5-Year Structural Warranty Treatment',
      description: 'Drill-fill-seal perimeter sub-slab piping barrier with government certified Bayer chemicals and 5 years written warranty card.',
      price: 4999,
      currency: '₹',
      category: 'Pest Elimination',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      isAvailable: true
    }
  ];

  // Gallery
  const rawGallery = profile.sectionData?.gallery?.items || [];
  const displayGallery = rawGallery.map((g: any) => ({
    id: g.id,
    url: g.imageUrl || g.url || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    caption: g.title || g.caption || 'Verified Service Job'
  }));

  // Testimonials
  const rawTestimonials = profile.sectionData?.testimonials?.items || [];
  const displayTestimonials = rawTestimonials.length > 0 ? rawTestimonials.map((t: any) => ({
    id: t.id,
    name: t.clientName || t.name || 'Verified Resident',
    role: t.clientRole || t.role || 'Homeowner',
    comment: t.content || t.comment || 'Arrived in exactly 35 minutes on a Sunday evening. Fixed the pipeline burst cleanly without any mess.',
    rating: t.rating || 5
  })) : [
    {
      id: 't-1',
      name: 'Dr. Anand Kulkarni',
      role: 'Apartment Owner, Green Meadows',
      comment: 'Their technicians arrived wearing clean uniforms, shoe covers, and ID cards. AC cooling was restored within an hour. Extremely professional and courteous!',
      rating: 5
    },
    {
      id: 't-2',
      name: 'Meenakshi Sundaram',
      role: 'Independent Villa Owner',
      comment: 'Booked the termite drill treatment and deep cleaning before Diwali. Outstanding finish! The upfront pricing matched the exact bill—no surprise fees.',
      rating: 5
    }
  ];

  // Direct VCard download
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${displayName}
ORG:${profile.company || 'Quick Home Services'}
TITLE:${profile.designation || 'Master Service Partner'}
TEL;TYPE=WORK,VOICE:${profile.phone || ''}
TEL;TYPE=CELL,VOICE:${profile.whatsapp || profile.phone || ''}
EMAIL;TYPE=PREF,INTERNET:${profile.email || ''}
URL:${profile.website || ''}
ADR;TYPE=WORK:;;${displayLocation};;;;
NOTE:${profile.bio || 'Verified On-Demand Home & Facility Services'}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${displayName.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);

    const message = `🛠️ *NEW INSTANT HOME SERVICE REQUEST*
👤 *Customer Name:* ${bookingFormData.name}
📱 *Phone:* ${bookingFormData.phone}
📍 *Service Address:* ${bookingFormData.address}
🔧 *Service Required:* ${bookingFormData.serviceRequired}
🚨 *Urgency / Response:* ${bookingFormData.urgency}
📅 *Preferred Slot:* ${bookingFormData.preferredDate || 'Earliest Available'}
📝 *Issue Details:* ${bookingFormData.notes || 'Standard booking'}

Requested via OneClickBizz verified service portal.`;

    const cleanWa = (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsBookingModalOpen(false);
      setBookingSubmitted(false);
    }, 1200);
  };

  const triggerDirectServiceBooking = (serviceTitle: string) => {
    setBookingFormData(prev => ({
      ...prev,
      serviceRequired: serviceTitle
    }));
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070E17] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-28">
      
      {/* 1. TOP RAPID RESPONSE DISPATCH BAR */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
            </span>
            <span>RAPID DISPATCH ACTIVE: {responseTime}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-xs font-bold uppercase tracking-wider">
            <span>🛡️ {warrantyDays}</span>
            <span>•</span>
            <span>⚡ {verifiedTechs}</span>
          </div>
          {profile.phone && (
            <a 
              href={`tel:${profile.phone}`} 
              className="flex items-center space-x-1 font-black underline hover:text-black transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hotline</span>
            </a>
          )}
        </div>
      </div>

      {/* 2. HERO / COMPANY PROFILE HEADER */}
      <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-[#0B1524] to-[#070E17] pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Top action pill row */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center space-x-2 bg-blue-950/70 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verified Home &amp; Facility Specialist</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700/60 transition-all hover:scale-105"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDownloadVCard}
                className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700/60 transition-all hover:scale-105"
                title="Save Contact to Phone"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Business Hero Content */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            
            {/* Logo / Avatar with safety badge */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl bg-slate-900 flex items-center justify-center">
                {avatarImage ? (
                  <img 
                    src={avatarImage} 
                    alt={displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center text-amber-400">
                    <Wrench className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-lg border-2 border-[#070E17]" title="Verified Technician">
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            {/* Title & Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {displayName}
                </h1>
              </div>

              <p className="text-amber-400 font-semibold text-sm sm:text-base flex items-center gap-2 mb-2">
                <span>{profile.designation || 'Certified Master Technician & Service Operations'}</span>
              </p>

              {/* Location & Response Badge */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
                {displayLocation && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{displayLocation}</span>
                  </span>
                )}
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{emergencyAvailability}</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Star className="w-3.5 h-3.5 fill-emerald-400 shrink-0" />
                  <span>4.9 / 5 (380+ Verified Jobs)</span>
                </span>
              </div>

              {/* Instant CTA buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Instant Service</span>
                </button>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm rounded-xl border border-slate-700/80 flex items-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call Hotline</span>
                  </a>
                )}

                {(profile.whatsapp || profile.phone) && (
                  <a
                    href={`https://wa.me/${(profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello, I need urgent assistance with a home service inquiry.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-sm rounded-xl border border-emerald-500/40 flex items-center gap-2 transition-all"
                  >
                    <span>💬 WhatsApp Support</span>
                  </a>
                )}
              </div>

            </div>

          </div>

          {/* 3. FIVE-POINT SERVICE TRUST GUARANTEE STRIP */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Service Guarantee</p>
                <p className="text-xs sm:text-sm font-bold text-slate-200">{warrantyDays}</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Arrival Window</p>
                <p className="text-xs sm:text-sm font-bold text-slate-200">{responseTime}</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Safety &amp; Crew</p>
                <p className="text-xs sm:text-sm font-bold text-slate-200">{verifiedTechs}</p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Pricing Standard</p>
                <p className="text-xs sm:text-sm font-bold text-slate-200">{pricingStandard}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. NAVIGATION TABS */}
      <div className="sticky top-0 z-30 bg-[#070E17]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 flex items-center space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {[
            { id: 'all', label: 'Overview' },
            { id: 'services', label: `Services (${displayServices.length})` },
            { id: 'packages', label: `Annual & Deep Packages (${displayPackages.length})` },
            { id: 'guarantee', label: 'Safety & Warranty' },
            { id: 'reviews', label: `Customer Reviews (${displayTestimonials.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* ABOUT / PROFILE INTRO */}
        {(activeTab === 'all' || activeTab === 'guarantee') && profile.bio && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              <span>About Our Service Guarantee</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {profile.bio}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Uniformed personnel with digital identity checks &amp; PPE safety equipment.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Post-service clean up guaranteed—zero debris or residual mess left behind.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Written digital service receipt with {warrantyDays} warranty coverage.</span>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES CATALOG */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <span>On-Demand Services &amp; Rate Card</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Upfront fixed inspection charges. Transparent spare parts rates per brand standards.
                </p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>Request Custom Quote</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayServices.map((svc) => {
                const srvImage = getServiceImageUrl(svc, 'Home Services');
                return (
                  <div
                    key={svc.id}
                    className="bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Service Image Banner */}
                      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-950">
                        <img
                          src={srvImage}
                          alt={svc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        {svc.durationMinutes && (
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-200 text-[11px] font-medium flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{svc.durationMinutes} Mins</span>
                          </div>
                        )}

                        {svc.price !== undefined && (
                          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md">
                            {typeof svc.price === 'number' ? `₹${svc.price.toLocaleString('en-IN')}` : svc.price}
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-5">
                        <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors line-clamp-2">
                          {svc.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                          {svc.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Pros</span>
                        </span>

                        <button
                          onClick={() => triggerDirectServiceBooking(svc.title)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Book Service</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PACKAGES & AMC ANNUAL PASSES */}
        {(activeTab === 'all' || activeTab === 'packages') && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <span>Specialized Maintenance Packages &amp; AMCs</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Save up to 40% with multi-room deep treatments and annual facility service contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all shadow-lg"
                >
                  {pkg.imageUrl && (
                    <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                      <img 
                        src={pkg.imageUrl} 
                        alt={pkg.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {pkg.category && (
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-md text-[10px] font-bold text-amber-400 border border-slate-700">
                          {pkg.category}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-base mb-2 group-hover:text-amber-400 transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-semibold">Special Package Rate</span>
                        <span className="text-base font-black text-amber-400">
                          {typeof pkg.price === 'number' ? `₹${pkg.price.toLocaleString('en-IN')}` : pkg.price}
                        </span>
                      </div>

                      <button
                        onClick={() => triggerDirectServiceBooking(pkg.name)}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-lg transition-all shadow-md shadow-amber-500/20"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKMANSHIP / SAFETY PROTOCOLS */}
        {(activeTab === 'all' || activeTab === 'guarantee') && (
          <div className="bg-gradient-to-br from-blue-950/30 via-slate-900 to-[#070E17] border border-blue-900/40 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full mb-3">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Customer Protection &amp; Safety Standard</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                Why Thousands Of Families Trust Our Service Fleet
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Unlike unverified freelance workers, every technician deployed by {displayName} undergoes rigorous police background verification, technical competency certifications, and continuous quality audits.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <p className="font-bold text-white mb-1">🛡️ Up to ₹10,000 Damage Cover</p>
                  <p className="text-slate-400">Full accidental damage coverage protection while repairs are being conducted on your premises.</p>
                </div>
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <p className="font-bold text-white mb-1">🔧 100% Genuine Certified Spares</p>
                  <p className="text-slate-400">Direct OEM spare parts with official warranty stickers and manufacturer barcode traceability.</p>
                </div>
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <p className="font-bold text-white mb-1">💳 No Cash Advance Requirement</p>
                  <p className="text-slate-400">Pay only upon complete inspection and 100% satisfaction via UPI, card, or cash invoice.</p>
                </div>
                <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <p className="font-bold text-white mb-1">📞 Dedicated Escalation Manager</p>
                  <p className="text-slate-400">Direct hotline to service supervisor for any rescheduling or technical clarifications.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WORK GALLERY / COMPLETED JOBS */}
        {displayGallery.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                <span>On-Site Work &amp; Equipment Gallery</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real photos of completed assignments, precision diagnostic gear, and sanitized workspaces.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {displayGallery.map((item: any, idx: number) => (
                <div 
                  key={item.id || idx}
                  className="group relative h-40 sm:h-48 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption || 'Service Work'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <p className="text-[11px] font-semibold text-slate-200 line-clamp-1">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOMER REVIEWS */}
        {(activeTab === 'all' || activeTab === 'reviews') && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <span>Verified Customer Testimonials</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Read real experiences from local homeowners and property managers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTestimonials.map((t: any) => (
                <div
                  key={t.id}
                  className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-slate-400 text-[11px]">{t.role}</p>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Booking</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT & SERVICE COVERAGE AREA */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Service Hub &amp; Rapid Response Center</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Our technicians are stationed across tactical city zones to guarantee on-time arrival within {responseTime}. Contact our dispatch center directly for urgent service or commercial quotes.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                {displayLocation && (
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{displayLocation}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
                  </div>
                )}
                {profile.email && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Globe className="w-4 h-4 text-purple-400 shrink-0" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{profile.website}</a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Need a Tech Right Now?</h4>
              <p className="text-xs text-slate-400 mb-4 max-w-xs">
                Emergency slots dispatched immediately. Technician reaches with complete tools &amp; safety gear.
              </p>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full max-w-xs py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Book Instant Home Service
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 6. FIXED MOBILE QUICK ACTION BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#070E17]/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 flex items-center justify-between sm:hidden shadow-2xl">
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 mr-2"
        >
          <Wrench className="w-4 h-4" />
          <span>Book Service</span>
        </button>

        {profile.phone && (
          <a
            href={`tel:${profile.phone}`}
            className="p-2.5 bg-slate-800 text-slate-100 rounded-xl border border-slate-700 mr-2 flex items-center justify-center"
            title="Call"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </a>
        )}

        {(profile.whatsapp || profile.phone) && (
          <a
            href={`https://wa.me/${(profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi, I need an immediate home service visit.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-emerald-600/30 text-emerald-400 rounded-xl border border-emerald-500/40 flex items-center justify-center"
            title="WhatsApp"
          >
            <Send className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* 7. MODAL: BOOK INSTANT HOME SERVICE */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 font-black" />
                <h3 className="font-black text-base sm:text-lg">Book Instant Home Service</h3>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1 text-slate-950 hover:bg-black/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Booking Dispatched!</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Redirecting to WhatsApp to send technician assignment details directly to dispatch supervisor...
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.name}
                    onChange={e => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={bookingFormData.phone}
                      onChange={e => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Response Urgency</label>
                    <select
                      value={bookingFormData.urgency}
                      onChange={e => setBookingFormData({ ...bookingFormData, urgency: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Emergency (Arrive within 60 mins)</option>
                      <option>Today Evening Slot</option>
                      <option>Tomorrow Morning Slot</option>
                      <option>Scheduled Later Date</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Service Required *</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.serviceRequired}
                    onChange={e => setBookingFormData({ ...bookingFormData, serviceRequired: e.target.value })}
                    placeholder="e.g. AC Gas Refill, Bathroom Leakage"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Address / Society Landmark *</label>
                  <input
                    type="text"
                    required
                    value={bookingFormData.address}
                    onChange={e => setBookingFormData({ ...bookingFormData, address: e.target.value })}
                    placeholder="Flat No, Building, Landmark, Area"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Brief Description of the Issue</label>
                  <textarea
                    rows={2}
                    value={bookingFormData.notes}
                    onChange={e => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                    placeholder="e.g. Water dripping from indoor unit AC, need quick fix."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Booking &amp; Dispatch on WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    🔒 No advance payment needed. Pay only after service satisfaction.
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 8. SHARE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          profile={profile}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

    </div>
  );
}
