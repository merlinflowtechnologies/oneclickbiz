'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Crown, 
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
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Smile,
  ShoppingBag
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

export default function BeautyMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: BeautyMiniWebsiteViewProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    clientName: '',
    phone: '',
    serviceName: '',
    preferredDate: '',
    preferredTime: '11:00 AM'
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const beautyConfig = profile.sectionData?.beauty || {};
  const services = profile.sectionData?.services?.items || [];
  const products = profile.sectionData?.products?.items || [];
  const gallery = profile.sectionData?.gallery?.items || [];

  const rawWa = getCleanWhatsAppNumber(profile);
  const cleanWaDigits = (rawWa || '').replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('salon_appointment_booked');
    setBookingSubmitted(true);

    if (cleanWa) {
      const msg = encodeURIComponent(
        `Hi ${profile.company || profile.name}! I would like to book a Salon Appointment.\n\n` +
        `👤 Client: ${bookingForm.clientName}\n` +
        `📞 Phone: ${bookingForm.phone}\n` +
        `💅 Service: ${bookingForm.serviceName || 'General Styling Consultation'}\n` +
        `📅 Date: ${bookingForm.preferredDate || 'Earliest Available'}\n` +
        `⏰ Time: ${bookingForm.preferredTime}`
      );
      window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank');
    }

    setTimeout(() => {
      setIsBookingModalOpen(false);
      setBookingSubmitted(false);
      setBookingForm({ clientName: '', phone: '', serviceName: '', preferredDate: '', preferredTime: '11:00 AM' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 font-sans selection:bg-rose-500 selection:text-white pb-24">
      {/* 1. TOP HYGIENE & CERTIFICATION STRIP */}
      <div className="bg-gradient-to-r from-rose-950 via-stone-900 to-amber-950 border-b border-rose-500/30 py-2.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-stone-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              {beautyConfig.stylistCertification || 'CIDESCO & L’Oréal Certified Master Stylists'}
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="text-stone-300 font-medium hidden md:inline">
              Hygiene Standard: <strong className="text-white font-semibold">{beautyConfig.hygieneProtocol || '100% Autoclaved Tools & Single-Use Linens'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-stone-300">
            <span>Operating Hours: <strong className="text-amber-300">{beautyConfig.operatingHours || '10:00 AM - 08:30 PM (Daily)'}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-[#0C0A09]/80 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-rose-500/40 shrink-0">
                <Image src={profile.avatarUrl} alt={profile.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">{profile.company || profile.name}</h1>
              <p className="text-[11px] text-rose-400 font-medium">{profile.designation || 'Luxury Salon & Bridal Studio'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-rose-600/20 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" /> Book Appointment
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO LUXURY SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 border-b border-stone-800/80">
        <div className="absolute inset-0 bg-radial from-rose-950/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Exclusive Bridal &amp; Luxury Aesthetics
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Elevate Your Glow with <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 bg-clip-text text-transparent">Couture Styling &amp; Skin Rituals</span>
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
              {profile.bio || 'From bespoke bridal makeovers to advanced hair botox, hydra-facials, and pampering spa therapies — curated by certified celebrity artists.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <span>Reserve Appointment Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {cleanWa && (
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi ${profile.name}! I would like to inquire about bridal packages and service availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Stylist
                </a>
              )}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Save Contact
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-800/80">
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <span className="text-lg sm:text-xl font-extrabold text-rose-400">100%</span>
                <p className="text-[11px] text-stone-400">Premium Brands Used</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <span className="text-lg sm:text-xl font-extrabold text-amber-400">4.9 ★</span>
                <p className="text-[11px] text-stone-400">Client Rating</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <span className="text-lg sm:text-xl font-extrabold text-pink-400">850+</span>
                <p className="text-[11px] text-stone-400">Bridal Transformations</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-gradient-to-br from-rose-950/40 to-stone-900 p-2">
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden">
                <Image
                  src={profile.coverUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'}
                  alt="Luxury Salon Ambience"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-[#0C0A09]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0C0A09]/80 backdrop-blur-md border border-stone-700">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Luxury Salon Experience</p>
                      <p className="text-[10px] text-stone-400">{beautyConfig.productBrandsUsed || 'Dyson, Kérastase, Olaplex, M.A.C & Charlotte Tilbury'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SALON SERVICES MENU */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
              <Scissors className="w-4 h-4" /> Signature Treatments
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Services &amp; Rituals Menu</h3>
            <p className="text-xs text-stone-400">Hair, skin, nails and bridal makeovers with transparent rates.</p>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Book Consultation Slot</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div 
                key={srv.id}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-rose-500/50 transition-all flex flex-col justify-between group shadow-lg space-y-3"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">{srv.title}</h4>
                    <span className="text-sm font-extrabold text-rose-400 shrink-0">
                      {srv.price ? `₹${srv.price.toLocaleString('en-IN')}` : 'Custom'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{srv.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {srv.durationMinutes || 60} Mins</span>
                  <button
                    onClick={() => {
                      setSelectedService(srv);
                      setBookingForm(prev => ({ ...prev, serviceName: srv.title }));
                      setIsBookingModalOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold transition cursor-pointer"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-stone-900/50 border border-dashed border-stone-800 text-center">
            <Scissors className="w-8 h-8 text-rose-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-stone-300">Custom Beauty Packages</p>
            <p className="text-xs text-stone-500 mt-1">Chat directly on WhatsApp to customize your haircut, color or bridal package.</p>
          </div>
        )}
      </section>

      {/* 5. BRIDAL & SPA PACKAGES (PRODUCTS SECTION) */}
      {products.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Bridal &amp; Luxury Wellness Packages</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">Comprehensive pre-bridal ceremonies, reception glam, and spa retreats.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((pkg) => (
              <div key={pkg.id} className="rounded-2xl bg-stone-900 border border-stone-800 p-5 flex flex-col justify-between space-y-4">
                {pkg.imageUrl && (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden">
                    <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{pkg.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                  <span className="text-base font-bold text-white">
                    {pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : 'Inquire for Price'}
                  </span>
                  <button
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, serviceName: pkg.name }));
                      setIsBookingModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs"
                  >
                    Reserve Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. BEFORE & AFTER LOOKBOOK GALLERY */}
      {gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">Lookbook &amp; Hair Transformations</h3>
            <p className="text-xs text-stone-400">Real client makeovers, hair colors, balayage, and bridal glam.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((img) => (
              <div key={img.id} className="relative h-44 sm:h-52 rounded-xl overflow-hidden border border-stone-800 group">
                <Image src={img.imageUrl} alt={img.title || 'Lookbook'} fill className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                  <p className="text-[11px] font-semibold text-white truncate">{img.title || 'Lookbook Transformation'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. SALON LOCATION & HOURS */}
      <footer className="max-w-6xl mx-auto px-4 pt-12 border-t border-stone-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div>
            <h4 className="text-sm font-bold text-white mb-2">{profile.company || profile.name}</h4>
            <p className="leading-relaxed">{profile.address || 'Luxury Salon & Spa Studio'}</p>
            <p className="mt-2 text-stone-500">Stylist Certification: {beautyConfig.stylistCertification || 'Certified Aesthetician'}</p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white mb-2">Appointments Desk</h4>
            {profile.phone && <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-rose-400" /> {profile.phone}</p>}
            {profile.email && <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-rose-400" /> {profile.email}</p>}
            <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-rose-400" /> {beautyConfig.operatingHours || '10:00 AM - 08:30 PM'}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Book Your Visit</h4>
            <p className="text-[11px] text-stone-400">Walk-ins welcome based on stylist availability. Priority given to scheduled bookings.</p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs transition"
            >
              Book Salon Slot Online
            </button>
          </div>
        </div>
      </footer>

      {/* 8. APPOINTMENT BOOKING MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-stone-900 border border-stone-800 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Book Salon Appointment</h3>
                <p className="text-xs text-stone-400">Choose your preferred service &amp; slot</p>
              </div>
            </div>

            {bookingSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Appointment Requested!</h4>
                <p className="text-xs text-stone-300">Connecting with our receptionist via WhatsApp to confirm...</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-stone-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.clientName}
                    onChange={e => setBookingForm(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="e.g. Priya Reddy"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300">Contact Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={e => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. 9876543210"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300">Selected Service / Treatment</label>
                  <input
                    type="text"
                    value={bookingForm.serviceName}
                    onChange={e => setBookingForm(prev => ({ ...prev, serviceName: e.target.value }))}
                    placeholder="e.g. Hair Botox / HydraFacial / Bridal Makeover"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-stone-300">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.preferredDate}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-300">Preferred Time</label>
                    <select
                      value={bookingForm.preferredTime}
                      onChange={e => setBookingForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs transition shadow-lg shadow-rose-600/30 active:scale-95 cursor-pointer mt-2"
                >
                  Confirm Appointment Booking →
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
