'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Download, 
  MessageCircle, 
  Users, 
  ChevronRight, 
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  School,
  FileText,
  Video,
  Play,
  Monitor,
  Smartphone
} from 'lucide-react';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

interface EducationMiniWebsiteViewProps {
  profile: DigitalProfile;
  trackAction?: (actionName: string) => void;
  getCleanWhatsAppNumber?: (prof: DigitalProfile) => string;
  getEmbedUrl?: (item: any) => string;
  viewMode?: 'website' | 'mobile';
  setViewMode?: (mode: 'website' | 'mobile') => void;
  showViewToggle?: boolean;
}

export default function EducationMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: EducationMiniWebsiteViewProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    studentName: '',
    parentPhone: '',
    targetCourse: '',
    preferredMode: 'Classroom / Campus'
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const eduConfig = profile.sectionData?.education || {};
  const courses = profile.sectionData?.products?.items || [];
  const services = profile.sectionData?.services?.items || [];
  const gallery = profile.sectionData?.gallery?.items || [];
  const videos = profile.sectionData?.videos?.items || [];

  const rawWa = getCleanWhatsAppNumber(profile);
  const cleanWaDigits = (rawWa || '').replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('demo_class_booked');
    setDemoSubmitted(true);

    if (cleanWa) {
      const msg = encodeURIComponent(
        `Hi ${profile.company || profile.name}! I would like to book a Free Demo Class.\n\n` +
        `👤 Student: ${demoForm.studentName}\n` +
        `📞 Phone: ${demoForm.parentPhone}\n` +
        `📚 Target Course: ${demoForm.targetCourse || 'General Curriculum'}\n` +
        `🏫 Mode: ${demoForm.preferredMode}`
      );
      window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank');
    }

    setTimeout(() => {
      setIsDemoModalOpen(false);
      setDemoSubmitted(false);
      setDemoForm({ studentName: '', parentPhone: '', targetCourse: '', preferredMode: 'Classroom / Campus' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-24">
      {/* 1. TOP AFFILIATION & TRUST STRIP */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-b border-blue-500/30 py-2.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {eduConfig.accreditation || 'ISO 9001:2015 & Govt. Recognized'}
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-slate-300 font-medium hidden md:inline">
              Board / Affiliation: <strong className="text-white font-semibold">{eduConfig.boardAffiliation || 'Central Board & State Council Accredited'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
            <span>Rankers Placement: <strong className="text-emerald-400">{eduConfig.placementRate || '96.8% Success Rate'}</strong></span>
            {eduConfig.establishedYear && (
              <span className="hidden sm:inline">Est. {eduConfig.establishedYear}</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-blue-500/40 shrink-0">
                <Image src={profile.avatarUrl} alt={profile.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                <School className="w-5 h-5" />
              </div>
            )}
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">{profile.company || profile.name}</h1>
              <p className="text-[11px] text-blue-400 font-medium">{profile.designation || 'Academic Academy & Institute'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Book Free Demo
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO & ACADEMIC REPUTATION BANNER */}
      <section className="relative overflow-hidden pt-10 pb-16 px-4 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" /> Admissions Open for 2026 - 2027 Academic Year
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Empowering Students with <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">Proven Results &amp; Elite Faculty</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {profile.bio || 'Comprehensive classroom coaching, personalized doubt clearing, hybrid online test series, and mentorship from top educators.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>Reserve Free Demo Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {cleanWa && (
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hello ${profile.name}! I would like course counseling and fee structure details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Admissions
                </a>
              )}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" /> Save Contact
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-lg sm:text-xl font-extrabold text-blue-400">{eduConfig.totalStudentsTrained || '12,500+'}</span>
                <p className="text-[11px] text-slate-400">Students Mentored</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-lg sm:text-xl font-extrabold text-emerald-400">{eduConfig.placementRate || '96.8%'}</span>
                <p className="text-[11px] text-slate-400">Selection / Success</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-lg sm:text-xl font-extrabold text-amber-400">{eduConfig.demoTimings || 'Mon - Sat'}</span>
                <p className="text-[11px] text-slate-400">Batches &amp; Counseling</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-gradient-to-br from-blue-950/40 to-slate-900 p-2">
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden">
                <Image
                  src={profile.coverUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'}
                  alt="Academic Excellence"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">Board Certified Pedagogy</p>
                      <p className="text-[10px] text-slate-400">{eduConfig.boardAffiliation || 'Accredited Curriculum & Doubt Resolution Labs'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COURSES & CERTIFICATION PROGRAMS */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
              <BookOpen className="w-4 h-4" /> Curriculum &amp; Batches
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Featured Courses &amp; Programs</h3>
            <p className="text-xs text-slate-400">Structured modules with comprehensive study material, mock drills, and 1-on-1 mentorship.</p>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Request Course Syllabus</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all p-5 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  {course.imageUrl && (
                    <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3">
                      <Image src={course.imageUrl} alt={course.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-blue-300 border border-blue-500/30">
                        {course.category || 'Academic Program'}
                      </div>
                    </div>
                  )}
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">{course.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{course.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Course Fee</span>
                    <p className="text-base font-extrabold text-white">
                      {course.price ? `${course.currency || '₹'}${course.price.toLocaleString('en-IN')}` : 'Contact for Fee'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setDemoForm(prev => ({ ...prev, targetCourse: course.name }));
                      setIsDemoModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow"
                  >
                    <span>Enroll / Demo</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-300">Custom Programs Available</p>
            <p className="text-xs text-slate-500 mt-1">Contact the academy counselor directly to customize your student curriculum.</p>
          </div>
        )}
      </section>

      {/* 5. ACADEMIC SERVICES & MENTORSHIP PACKAGES */}
      {services.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Mentorship &amp; Counseling Services</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Book personalized career guidance, doubt clarification desk, or scholarship tests.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                  <span className="text-xs font-bold text-emerald-400">
                    {srv.price === 0 ? 'Free' : `₹${srv.price}`}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{srv.description}</p>
                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {srv.durationMinutes || 45} Mins</span>
                  <button
                    onClick={() => {
                      setDemoForm(prev => ({ ...prev, targetCourse: srv.title }));
                      setIsDemoModalOpen(true);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
                  >
                    Book Slot →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. CAMPUS & INFRASTRUCTURE GALLERY */}
      {gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">Campus &amp; Learning Facilities</h3>
            <p className="text-xs text-slate-400">Modern smart classrooms, library, and interactive doubt-clearing labs.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((img) => (
              <div key={img.id} className="relative h-40 sm:h-48 rounded-xl overflow-hidden border border-slate-800 group">
                <Image src={img.imageUrl} alt={img.title || 'Campus'} fill className="object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                  <p className="text-[11px] font-semibold text-white truncate">{img.title || 'Learning Facility'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. CONTACT & LOCATION DESK */}
      <footer className="max-w-6xl mx-auto px-4 pt-12 border-t border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400">
          <div>
            <h4 className="text-sm font-bold text-white mb-2">{profile.company || profile.name}</h4>
            <p className="leading-relaxed">{profile.address || 'Central Academic Campus, Knowledge Corridor'}</p>
            <p className="mt-2 text-slate-500">Board Affiliation: {eduConfig.boardAffiliation || 'Central Council Accredited'}</p>
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-white mb-2">Admissions Desk</h4>
            {profile.phone && <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-400" /> {profile.phone}</p>}
            {profile.email && <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-400" /> {profile.email}</p>}
            {profile.website && <p className="flex items-center gap-1.5"><School className="w-3.5 h-3.5 text-blue-400" /> {profile.website}</p>}
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Free Consultation</h4>
            <p className="text-[11px] text-slate-400">Walk into our campus or reserve a counseling session online.</p>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
            >
              Book Free Demo Class
            </button>
          </div>
        </div>
      </footer>

      {/* 8. DEMO CLASS BOOKING MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Book Free Demo Class</h3>
                <p className="text-xs text-slate-400">1-on-1 counselor guidance &amp; faculty demo</p>
              </div>
            </div>

            {demoSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Demo Slot Requested!</h4>
                <p className="text-xs text-slate-300">Opening WhatsApp admissions desk to confirm your session timing...</p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Student / Parent Name *</label>
                  <input
                    type="text"
                    required
                    value={demoForm.studentName}
                    onChange={e => setDemoForm(prev => ({ ...prev, studentName: e.target.value }))}
                    placeholder="e.g. Aditi Sharma"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Contact Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={demoForm.parentPhone}
                    onChange={e => setDemoForm(prev => ({ ...prev, parentPhone: e.target.value }))}
                    placeholder="e.g. 9876543210"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Target Course / Subject</label>
                  <input
                    type="text"
                    value={demoForm.targetCourse}
                    onChange={e => setDemoForm(prev => ({ ...prev, targetCourse: e.target.value }))}
                    placeholder="e.g. Class 11 JEE Advanced / Data Science"
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Preferred Mode</label>
                  <select
                    value={demoForm.preferredMode}
                    onChange={e => setDemoForm(prev => ({ ...prev, preferredMode: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Classroom / Campus">Classroom / Offline Campus</option>
                    <option value="Live Online Interactive">Live Online Interactive</option>
                    <option value="Hybrid (Classroom + LMS)">Hybrid (Classroom + LMS)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 active:scale-95 cursor-pointer mt-2"
                >
                  Confirm Free Demo Booking →
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
