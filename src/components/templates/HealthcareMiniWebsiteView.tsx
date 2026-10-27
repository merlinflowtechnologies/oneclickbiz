'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
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
  Star,
  Activity,
  HeartPulse,
  Cross,
  UserCheck,
  Sparkles,
  ChevronRight,
  X,
  Send,
  Building,
  AlertCircle,
  FileText
} from 'lucide-react';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface HealthcareMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (actionName: string) => void;
  getCleanWhatsAppNumber?: (prof: DigitalProfile) => string;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'website' | 'mobile';
  setViewMode?: (mode: 'website' | 'mobile') => void;
  showViewToggle?: boolean;
}

export default function HealthcareMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: HealthcareMiniWebsiteViewProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM - 01:00 PM)',
    symptoms: ''
  });

  const healthcareData = (profile.sectionData as any)?.healthcare || {};
  const degrees = healthcareData.degrees || 'MBBS, MD, DNB (Internal Medicine)';
  const registrationNumber = healthcareData.regNumber || 'MCI / NMC Reg: 68492/AP';
  const experienceYears = healthcareData.experienceYears || '16+ Years';
  const hospitalAffiliation = healthcareData.hospitalAffiliation || healthcareData.hospitalName || profile.company || 'Care Clinic & Superspeciality Hospital';
  const consultationFee = healthcareData.consultationFee || healthcareData.fee || '₹600';
  const opdTimings = healthcareData.opdTimings || 'Mon - Sat: 10:00 AM - 01:30 PM & 05:00 PM - 08:30 PM';
  const emergencyPhone = healthcareData.emergencyPhone || profile.phone || '+91 98765 43210';

  const cleanPhone = (profile.phone || '').replace(/\D/g, '');
  const cleanWa = (getCleanWhatsAppNumber(profile) || cleanPhone).replace(/\D/g, '');

  const defaultTreatments = [
    {
      id: 't1',
      title: 'General Health & Routine Checkup',
      category: 'General Medicine',
      desc: 'Comprehensive blood pressure check, diabetes screening, cardiac wellness, and personalized lifestyle counseling.',
      duration: '30 mins',
      recovery: 'Immediate'
    },
    {
      id: 't2',
      title: 'Chronic Illness Management',
      category: 'Speciality Care',
      desc: 'Evidence-based management protocols for hypertension, type-2 diabetes, thyroid disorders, and lipid management.',
      duration: '45 mins',
      recovery: 'Ongoing Protocol'
    },
    {
      id: 't3',
      title: 'Pediatric & Geriatric Wellness',
      category: 'Family Health',
      desc: 'Specialized healthcare for senior citizens and growing children with age-appropriate immunization guidance.',
      duration: '30 mins',
      recovery: 'Regular Follow-up'
    },
    {
      id: 't4',
      title: 'Minor Wound Care & Emergency Dressing',
      category: 'Day Care',
      desc: 'Sterile surgical dressing, minor suturing, nebulization, IV fluid administration, and post-operative monitoring.',
      duration: '20 mins',
      recovery: '3-5 Days'
    }
  ];

  const treatments = healthcareData.treatments?.length
    ? healthcareData.treatments
    : profile.sectionData?.products?.items?.length
    ? profile.sectionData.products.items.map((item: any) => ({
        id: item.id,
        title: item.name,
        category: item.category || 'Specialized Treatment',
        desc: item.description,
        duration: '30 mins',
        recovery: 'Guided Recovery'
      }))
    : defaultTreatments;

  const facilities = [
    { title: 'In-House Pharmacy', desc: '100% genuine pharmaceuticals & emergency injectables available on-spot' },
    { title: 'Diagnostic Lab Sample Collection', desc: 'Partnered with NABL certified pathology for rapid 4-hour reporting' },
    { title: 'ECG & Digital Triage', desc: '12-lead digital ECG and instant vitals monitoring station' },
    { title: 'Clean Day-Care Infusion Bay', desc: 'Air-conditioned sterile recovery recliners for IV fluid therapy' },
    { title: 'Wheelchair & Stretcher Access', desc: 'Ground-floor ramp entrance with dedicated priority senior seating' },
    { title: '24/7 Emergency Ambulance Tie-up', desc: 'Immediate GPS-tracked basic and cardiac ambulance dispatch' }
  ];

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('appointment_submit_healthcare');

    const msg = `*NEW CLINIC APPOINTMENT REQUEST* 🩺\n\n` +
      `*Doctor:* ${profile.name} (${degrees})\n` +
      `*Patient Name:* ${appointmentForm.name}\n` +
      `*Phone Number:* ${appointmentForm.phone}\n` +
      `*Age / Gender:* ${appointmentForm.age} Yrs / ${appointmentForm.gender}\n` +
      `*Preferred Date:* ${appointmentForm.date}\n` +
      `*Time Slot:* ${appointmentForm.timeSlot}\n` +
      `*Chief Complaint / Symptoms:* ${appointmentForm.symptoms || 'General Consultation'}\n\n` +
      `Please confirm my clinic token number.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      
      {/* 1. TOP MEDICAL TRUST & REGISTRATION STRIP */}
      <div className="bg-teal-950 text-white px-3 sm:px-8 py-2 text-xs border-b border-teal-900 shadow-xs overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 min-w-max sm:min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold uppercase tracking-wider text-teal-300 text-[11px] sm:text-xs whitespace-nowrap">
              {registrationNumber}
            </span>
            <span className="hidden md:inline text-teal-100/70 text-[11px]">
              &bull; Verified Medical Practitioner &bull; {experienceYears} Clinical Excellence
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] shrink-0">
            <a 
              href={`tel:${emergencyPhone}`}
              className="inline-flex items-center gap-1.5 text-rose-300 hover:text-white font-bold transition whitespace-nowrap"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Emergency: {emergencyPhone}</span>
            </a>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-teal-200 hover:text-white transition cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Clinic QR</span>
            </button>

            <button
              onClick={() => downloadVcfFile(profile)}
              className="hidden sm:inline-flex items-center gap-1 text-teal-200 hover:text-white transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Doctor Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY DOCTOR & CLINIC HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-teal-600 bg-teal-50 shadow-sm">
                <img
                  src={profile.avatarUrl || '/placeholder-doctor.jpg'}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-lg font-black text-slate-900 leading-tight">
                  {profile.name}
                </h1>
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold truncate max-w-[200px] sm:max-w-md">
                {degrees} &bull; {profile.designation || 'Consultant Physician'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showViewToggle && setViewMode && (
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'website' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  💻 Clinic Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-full font-bold transition ${
                    viewMode === 'mobile' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  📱 Medical Card
                </button>
              </div>
            )}

            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-teal-600/25 transition active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO CLINICAL BANNER */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-teal-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/70 border border-teal-300 text-teal-800 text-xs font-black shadow-xs">
            <Stethoscope className="w-4 h-4 text-teal-700" />
            <span>{hospitalAffiliation}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Compassionate, Evidence-Based <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Healthcare You Can Trust.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {profile.bio || `Dr. ${profile.name} brings ${experienceYears} of clinical mastery in diagnosing and treating complex conditions with personalized patient care, in-house diagnostics, and follow-up support.`}
          </p>

          {/* OPD Timing & Fee Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 text-teal-700">
              <Clock className="w-4 h-4" />
              <span>{opdTimings}</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Award className="w-4 h-4" />
              <span>Consultation: {consultationFee}</span>
            </div>
          </div>

          {/* 9 SQUIRCLE QUICK-ACTION ROW */}
          <div className="pt-4 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none pb-2">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 min-w-max sm:min-w-0 sm:w-auto mx-auto px-2 pr-6 sm:pr-2">
              
              {/* Call */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition group-hover:scale-105">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">Call Clinic</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Dr. ${profile.name}, I am reaching out from your digital clinic profile.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#25D366] hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition group-hover:scale-105">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">WhatsApp</span>
              </a>

              {/* Book Appointment */}
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 transition group-hover:scale-105">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">Book OP</span>
              </button>

              {/* Emergency Hotline */}
              <a
                href={`tel:${emergencyPhone}`}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition group-hover:scale-105">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-rose-700 uppercase">Emergency</span>
              </a>

              {/* Location Directions */}
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
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">Directions</span>
                </a>
              )}

              {/* Save Doctor Contact */}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">Save Contact</span>
              </button>

              {/* Share */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition group-hover:scale-105">
                  <Share2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase">Share Card</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 4. TREATMENTS & SPECIALIZATION PROCEDURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
            Clinical Services
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
            Specialized Treatments &amp; Procedures
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Advanced medical diagnostics, customized patient care plans, and proactive disease prevention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t: any) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition">
                  <Cross className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600">
                  {t.category}
                </span>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition">
                  {t.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{t.duration}</span>
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLINIC INFRASTRUCTURE & FACILITIES */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              Diagnostic &amp; Care
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900">
              Clinic Infrastructure &amp; Amenities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Modern patient care environment designed for hygiene, rapid diagnostics, and maximum comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-md transition space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-sm text-slate-900">{fac.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOK APPOINTMENT MODAL */}
      {isAppointmentModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsAppointmentModalOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black">Book Clinic Appointment</h4>
                  <p className="text-xs text-slate-500">Token confirmation sent directly to WhatsApp</p>
                </div>
              </div>
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={appointmentForm.name}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Age &amp; Gender</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      required
                      placeholder="Age"
                      value={appointmentForm.age}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, age: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                    />
                    <select
                      value={appointmentForm.gender}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, gender: e.target.value })}
                      className="w-full px-2 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">OPD Session</label>
                  <select
                    value={appointmentForm.timeSlot}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, timeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                  >
                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Evening (05:00 PM - 08:30 PM)">Evening (5 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Chief Symptoms / Reason for Visit</label>
                <textarea
                  rows={2}
                  value={appointmentForm.symptoms}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, symptoms: e.target.value })}
                  placeholder="e.g. Fever, persistent cough for 3 days, routine BP checkup..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/30 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Appointment on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. CLINIC QR SCANNER MODAL */}
      {isQrModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-6 text-center space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Clinic OPD QR Code</h4>
            <div className="w-52 h-52 mx-auto rounded-2xl bg-slate-50 p-3 border-2 border-slate-200 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : `https://oneclickbiz.in/v/${profile.slug}`)}`}
                alt="Clinic QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-slate-500">
              Scan with smartphone camera to open clinic profile &amp; appointment booking desk.
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
