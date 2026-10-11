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
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  CheckCircle, 
  Star, 
  Clock, 
  X, 
  Send, 
  FileText, 
  Building2, 
  Lock, 
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-react';
import ShareCardModal from '@/components/common/ShareCardModal';

interface ProfessionalMiniWebsiteViewProps {
  profile: DigitalProfile;
  getEmbedUrl?: (item: any) => string;
}

export default function ProfessionalMiniWebsiteView({ profile, getEmbedUrl }: ProfessionalMiniWebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'practice' | 'retainers' | 'credentials' | 'reviews'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<ProductItem | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [consultFormData, setConsultFormData] = useState({
    name: '',
    phone: '',
    email: '',
    practiceArea: 'Corporate & Contract Advisory',
    consultationMode: 'In-Chamber Advisory Desk',
    preferredDate: '',
    matterSummary: ''
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Trust Config
  const profConfig = profile.sectionData?.professional || {};
  const barCouncilOrIcaId = profConfig.barCouncilOrIcaId || 'Bar Council of India / ICAI Accredited Practice';
  const practiceYears = profConfig.practiceYears || '15+ Years Active Practice';
  const casesOrClientsCount = profConfig.casesOrClientsCount || '1,200+ Corporate & HNIs Advised';
  const consultationMode = profConfig.consultationMode || 'In-Chamber & Virtual Video Consultation';
  const confidentialityPolicy = profConfig.confidentialityPolicy || '100% Attorney-Client Privilege & NDA Protected';

  // Services (Practice Areas)
  const services: ServiceItem[] = profile.sectionData?.services?.items || [
    {
      id: 'prof_1',
      title: 'Corporate Compliance & Governance Advisory',
      category: 'Corporate Advisory',
      description: 'End-to-end statutory compliance, board resolutions, secretarial audits, and MCA/ROC filing management.',
      price: 15000,
      currency: '₹',
      durationMinutes: 60,
      isAvailable: true
    },
    {
      id: 'prof_2',
      title: 'Commercial Contracts & NDA Legal Drafting',
      category: 'Contract Vetting',
      description: 'Comprehensive vetting of vendor agreements, founder shareholding pacts, NDAs, and licensing contracts.',
      price: 12500,
      currency: '₹',
      durationMinutes: 90,
      isAvailable: true
    },
    {
      id: 'prof_3',
      title: 'Tax Planning, GST Audits & Litigation Advisory',
      category: 'Tax & Audit',
      description: 'Direct & indirect tax optimization, GST departmental appeals, transfer pricing audits, and income tax scrutiny assistance.',
      price: 20000,
      currency: '₹',
      durationMinutes: 60,
      isAvailable: true
    },
    {
      id: 'prof_4',
      title: 'Intellectual Property, Trademark & Copyright Desk',
      category: 'IPR & Patents',
      description: 'Trademark search, filing, opposition hearings, copyright registrations, and IP infringement dispute resolution.',
      price: 9500,
      currency: '₹',
      durationMinutes: 45,
      isAvailable: true
    }
  ];

  // Retainers / Legal Packages (Products)
  const packages: ProductItem[] = profile.sectionData?.products?.items || [
    {
      id: 'prof_pkg_1',
      name: 'Startup Legal Launchpad & Founders Kit',
      description: 'Pvt Ltd incorporation, founder agreements, trademark filing, master client service agreement, and ESOP scheme drafting.',
      price: 49999,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      category: 'Startup Kit',
      isAvailable: true
    },
    {
      id: 'prof_pkg_2',
      name: 'Quarterly Corporate Retainer Advisory',
      description: 'Dedicated legal counsel desk up to 15 hours/month, continuous contract vetting, employee NDAs, and regulatory notice replies.',
      price: 85000,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      category: 'Corporate Retainer',
      isAvailable: true
    },
    {
      id: 'prof_pkg_3',
      name: 'Comprehensive Annual Tax Audit & Scrutiny Shield',
      description: 'Complete corporate books audit, GST annual return filing, transfer pricing study report & year-round scrutiny representation.',
      price: 65000,
      currency: '₹',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      category: 'Tax Audit',
      isAvailable: true
    }
  ];

  // Gallery
  const galleryItems = (profile.sectionData?.gallery?.items || []).map(g => ({
    id: g.id,
    url: g.imageUrl || (g as any).url || '',
    caption: g.title || (g as any).caption || ''
  }));
  const displayGallery = galleryItems.length > 0 ? galleryItems : [
    {
      id: 'gal_1',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      caption: 'Executive Chambers & Library'
    },
    {
      id: 'gal_2',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      caption: 'Corporate Boardroom Advisory'
    },
    {
      id: 'gal_3',
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      caption: 'Legal Documents & Seal Verification'
    },
    {
      id: 'gal_4',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      caption: 'Financial Audit & Taxation Desk'
    }
  ];

  // Testimonials
  const testimonialItems = (profile.sectionData?.testimonials?.items || []).map(t => ({
    id: t.id,
    name: t.clientName || (t as any).name || '',
    role: t.clientRole || (t as any).role || '',
    comment: t.content || (t as any).comment || '',
    rating: t.rating || 5
  }));
  const displayTestimonials = testimonialItems.length > 0 ? testimonialItems : [
    {
      id: 't_1',
      name: 'Siddharth Nambiar',
      role: 'Founder & CEO, Apex Cloudworks',
      comment: 'Their corporate retainer support saved us countless hours during our Series-A funding round. Meticulous diligence and swift NDA vetting.',
      rating: 5
    },
    {
      id: 't_2',
      name: 'Meera Krishnan',
      role: 'Director, Zenith Logistics Ltd.',
      comment: 'Exceptional tax planning and GST litigation advisory. Their strategic representation before the appellate authority resolved our assessment seamlessly.',
      rating: 5
    }
  ];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    const whatsappText = encodeURIComponent(
      `⚖️ *Confidential Consultation Request - ${profile.name || 'Advisory Firm'}*\n` +
      `👤 *Client / Representative:* ${consultFormData.name}\n` +
      `📞 *Phone:* ${consultFormData.phone}\n` +
      `📧 *Email:* ${consultFormData.email || 'Not provided'}\n` +
      `📂 *Practice Area:* ${consultFormData.practiceArea}\n` +
      `🏛️ *Consultation Mode:* ${consultFormData.consultationMode}\n` +
      `📅 *Preferred Date:* ${consultFormData.preferredDate || 'Earliest Available'}\n` +
      `📝 *Brief Summary:* ${consultFormData.matterSummary || 'Discuss in private'}`
    );
    const phone = (profile.whatsapp || profile.phone || '').replace(/[^0-9]/g, '');
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${whatsappText}`, '_blank');
    }
    setTimeout(() => {
      setConsultSubmitted(false);
      setIsConsultModalOpen(false);
    }, 2000);
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name || 'Professional Counsel'}
ORG:${profile.company || 'Legal & Professional Advisory'}
TITLE:${profile.designation || 'Managing Partner'}
TEL:${profile.phone || ''}
EMAIL:${profile.email || ''}
URL:${typeof window !== 'undefined' ? window.location.href : ''}
NOTE:${profile.bio || barCouncilOrIcaId}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(profile.name || 'counsel').replace(/\s+/g, '_')}_professional.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 pb-24">
      {/* 1. TOP EXECUTIVE TRUST STRIP */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-600/30 text-xs py-2 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold text-amber-200 tracking-wide">{barCouncilOrIcaId}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              {practiceYears}
            </span>
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              {confidentialityPolicy}
            </span>
          </div>
        </div>
      </div>

      {/* 2. HERO HEADER SECTION */}
      <header className="relative overflow-hidden pt-8 pb-12 px-4 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
            {/* Avatar / Seal */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr from-amber-600 via-slate-700 to-amber-400 shadow-2xl shadow-amber-500/10">
                <img 
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80'} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 border border-amber-500/60 text-[10px] font-bold text-amber-300 shadow-lg flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                Verified
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {practiceYears}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                  🏛️ {consultationMode}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  NDA Protected
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.name || 'Adv. Rajeshwar Rao & Partners'}
              </h1>
              
              <p className="text-sm sm:text-base font-medium text-amber-300">
                {profile.designation || 'Senior Advocate & Corporate Legal Counsel'}
                {profile.company ? ` • ${profile.company}` : ''}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {profile.bio || 'Advising fast-growth enterprises, private limited entities, and high-net-worth individuals on complex corporate governance, commercial contracts, tax scrutiny, and dispute resolution.'}
              </p>

              {/* Quick Action CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-600/20 flex items-center gap-2 transition cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  Schedule Advisory Session
                </button>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    Call Chambers
                  </a>
                )}

                <button
                  onClick={handleDownloadVCard}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  Save vCard
                </button>

                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Share Counsel Profile"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. KEY METRICS STRIP */}
      <section className="border-b border-slate-800/80 bg-slate-950/60 py-6 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-amber-400">1,200+</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Clients Advised</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-white">15+ Yrs</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Bar Track Record</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">100%</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Privilege Protected</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xl sm:text-2xl font-black text-amber-300">Tier-1</span>
            <p className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">Advisory Standards</p>
          </div>
        </div>
      </section>

      {/* 4. NAVIGATION TABS */}
      <nav className="sticky top-0 z-30 bg-[#060A12]/95 backdrop-blur-md border-b border-slate-800/80 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Overview' },
            { id: 'practice', label: 'Practice Areas' },
            { id: 'retainers', label: 'Retainer Plans' },
            { id: 'credentials', label: 'Chambers & Credentials' },
            { id: 'reviews', label: 'Client Testimonials' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        {/* SECTION: PRACTICE AREAS */}
        {(activeTab === 'all' || activeTab === 'practice') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Specialized Counsel</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Core Practice Areas</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Strategic counsel and advisory across statutory compliance, commercial contracts, and tax litigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((svc) => (
                <div 
                  key={svc.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition group space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Scale className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">{svc.title}</h3>
                        <span className="text-[11px] text-amber-400 font-medium">{svc.category}</span>
                      </div>
                    </div>
                    {svc.price !== undefined && (
                      <span className="text-sm font-bold text-amber-400 font-mono">
                        {svc.price === 0 ? 'By Assessment' : `₹${svc.price.toLocaleString('en-IN')}`}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {svc.durationMinutes ? `${svc.durationMinutes} Mins Session` : '60 Mins Advisory'}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsConsultModalOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-semibold text-xs border border-amber-500/30 transition cursor-pointer"
                    >
                      Book Consultation →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: RETAINER PACKAGES */}
        {(activeTab === 'all' || activeTab === 'retainers') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Structured Mandates</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Retainers &amp; Advisory Bundles</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                Transparent flat-fee retainers tailored for startups, expanding enterprises, and family offices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col hover:border-amber-500/50 transition group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={pkg.imageUrl || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'} 
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                      {pkg.category || 'Retainer'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Professional Retainer</span>
                        <span className="text-base font-black text-amber-400 font-mono">
                          ₹{pkg.price?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setIsConsultModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        Inquire Mandate →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: CREDENTIALS & CHAMBERS */}
        {(activeTab === 'all' || activeTab === 'credentials') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Office &amp; Practice</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Chambers &amp; Advisory Facilities</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {displayGallery.map((item, idx) => (
                <div 
                  key={item.id || idx}
                  className="group relative rounded-2xl overflow-hidden aspect-square border border-slate-800 bg-slate-900"
                >
                  <img 
                    src={item.url} 
                    alt={item.caption || 'Chambers highlight'}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex items-end">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {item.caption || 'Advisory Desk'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: REVIEWS */}
        {(activeTab === 'all' || activeTab === 'reviews') && displayTestimonials.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Institutional Trust</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Corporate &amp; Client Testimonials</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayTestimonials.map((test) => (
                <div 
                  key={test.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{test.comment}"
                  </p>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{test.name}</span>
                    <span className="text-slate-400 text-[11px]">{test.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. CONTACT & CHAMBERS DESK */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 border border-amber-600/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Privileged Communication</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Connect with the Managing Partner</h3>
              <p className="text-xs text-slate-400">All queries subject to attorney-client privilege. In-chamber and virtual options available.</p>
            </div>
            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition shrink-0 cursor-pointer"
            >
              Book In-Chamber Consultation →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 transition">
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {profile.address && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{profile.address}</span>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 6. MODAL: SCHEDULE CONSULTATION */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl relative">
            <button 
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedPackage ? `Inquire: ${selectedPackage.name}` : selectedService ? `Book Advisory: ${selectedService.title}` : 'Schedule Confidential Consultation'}
                </h3>
                <p className="text-xs text-slate-400">Strictly confidential under attorney-client privilege.</p>
              </div>
            </div>

            {consultSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Opening WhatsApp Chambers Desk...</h4>
                <p className="text-xs text-slate-400">Your brief has been formatted for prompt review.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Client / Company Name *</label>
                    <input 
                      type="text" 
                      required
                      value={consultFormData.name}
                      onChange={e => setConsultFormData({...consultFormData, name: e.target.value})}
                      placeholder="e.g. Ramesh Varma"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">WhatsApp / Direct Phone *</label>
                    <input 
                      type="tel" 
                      required
                      value={consultFormData.phone}
                      onChange={e => setConsultFormData({...consultFormData, phone: e.target.value})}
                      placeholder="e.g. +91 98765 43210"
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Practice Area</label>
                    <select
                      value={consultFormData.practiceArea}
                      onChange={e => setConsultFormData({...consultFormData, practiceArea: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Corporate Compliance & Governance">Corporate Compliance &amp; Governance</option>
                      <option value="Commercial Contracts & NDAs">Commercial Contracts &amp; NDAs</option>
                      <option value="Tax Audit & GST Litigation">Tax Audit &amp; GST Litigation</option>
                      <option value="Trademark & Intellectual Property">Trademark &amp; Intellectual Property</option>
                      <option value="Startup Incorporation & Retainer">Startup Incorporation &amp; Retainer</option>
                      <option value="Civil & Commercial Dispute">Civil &amp; Commercial Dispute</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300">Consultation Mode</label>
                    <select
                      value={consultFormData.consultationMode}
                      onChange={e => setConsultFormData({...consultFormData, consultationMode: e.target.value})}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="In-Chamber Advisory (Physical)">In-Chamber Advisory (Physical)</option>
                      <option value="Secure Virtual Video Call">Secure Virtual Video Call</option>
                      <option value="Written Legal Opinion / Vetting">Written Legal Opinion / Vetting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300">Brief Overview of the Matter</label>
                  <textarea 
                    rows={2}
                    value={consultFormData.matterSummary}
                    onChange={e => setConsultFormData({...consultFormData, matterSummary: e.target.value})}
                    placeholder="e.g. Need review of vendor contract terms and statutory compliance checklist."
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/20 transition cursor-pointer"
                >
                  Confirm &amp; Message on WhatsApp →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. SHARE CARD MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}
