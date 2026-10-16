'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft, 
  X, 
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  School,
  FileText,
  Play,
  Globe,
  Smartphone,
  Building2,
  HeartPulse,
  Laptop,
  Music,
  Activity,
  Check,
  ExternalLink,
  HelpCircle,
  Send,
  Info,
  Menu
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

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Geethanjali Digi School',
    subtitle: 'Main Flagship Campus • Narsampet, Warangal',
    tagline: 'Best School in Warangal with Digital Classrooms & IIT-NEET Labs',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0154.jpg',
    campus: 'Narsampet Campus'
  },
  {
    id: 2,
    title: 'Geethanjali Global School',
    subtitle: 'Maheshwaram Campus • Warangal District',
    tagline: 'World-Class Global Curriculum, Modern Sports Arena & Leadership Wings',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0207.jpg',
    campus: 'Maheshwaram Campus'
  },
  {
    id: 3,
    title: 'Geethanjali High School',
    subtitle: 'Mahbubabad Campus • Telangana',
    tagline: 'Premier Boarding & High School with Proven 100% Academic Results',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0241.jpg',
    campus: 'Mahbubabad Campus'
  },
  {
    id: 4,
    title: 'Geethanjali Public School',
    subtitle: 'Old Kothagudem Branch • Opening 10th June 2025',
    tagline: 'Old Arunachaleshwara Campus • Robotics & STEM Innovation Wing',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/06/3X3-LALIPOP-KOTHADUEM_page-0001-900x492.jpg',
    campus: 'Old Kothagudem Branch'
  },
  {
    id: 5,
    title: 'Geethanjali E/M High School',
    subtitle: 'Mallampally Road Campus • Narsampet',
    tagline: 'English Medium Excellence with Science Olympiad & Navodaya Prep',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-03-15-at-10.23.26.jpeg',
    campus: 'Mallampally Rd Campus'
  }
];

const CAMPUSES_DATA = [
  {
    id: 'camp_1',
    name: 'Geethanjali Digi School (Main Campus)',
    badge: 'Flagship Digi Campus',
    address: 'H. No. 19-219, Warangal Rd, opp. Ayyappa Temple, Narsampet, Telangana 506132',
    phone: '+91 7732071452',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0154.jpg',
    features: ['Digital Smart Classrooms', 'IIT & NEET Advanced Labs', 'Audio-Visual Theatre', 'Central Library'],
    mapUrl: 'https://maps.google.com/?q=Geethanjali+Digi+School+Narsampet+Warangal'
  },
  {
    id: 'camp_2',
    name: 'Geethanjali Global School',
    badge: 'Global Curriculum & Sports',
    address: 'Maheshwaram Campus, Warangal District, Telangana',
    phone: '+91 7732071452',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0207.jpg',
    features: ['Spacious Sports Complex', 'PET Athletic Coaching', 'Science Research Labs', 'Yoga & Meditation Wing'],
    mapUrl: 'https://maps.google.com/?q=Geethanjali+Global+School+Maheshwaram+Warangal'
  },
  {
    id: 'camp_3',
    name: 'Geethanjali E/M High School',
    badge: 'English Medium Excellence',
    address: 'Mallampally Road, Narsampet, Warangal, Telangana',
    phone: '+91 7732071452',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-03-15-at-10.23.26.jpeg',
    features: ['English Language Lab', 'Vedic Mathematics Wing', 'Activity-Based Pre-Primary', 'Cultural Hall'],
    mapUrl: 'https://maps.google.com/?q=Geethanjali+EM+High+School+Mallampally+Road+Narsampet'
  },
  {
    id: 'camp_4',
    name: 'Geethanjali High School',
    badge: 'Mahbubabad Landmark',
    address: 'Main Town Campus, Mahbubabad, Telangana',
    phone: '+91 7732071452',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/DSC0241.jpg',
    features: ['Semi-Residential Wings', 'Board Exam Preparation Hub', 'Nutritious Dining Hall', 'Doctor Medical Desk'],
    mapUrl: 'https://maps.google.com/?q=Geethanjali+High+School+Mahbubabad'
  },
  {
    id: 'camp_5',
    name: 'Geethanjali Public School (New Branch)',
    badge: 'Opening 10th June 2025',
    address: 'Old Arunachaleshwara School Campus, Gouthamnagar, Old Kothagudem, Bhadradri Kothagudem Dist.',
    phone: '+91 7732071452',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/06/3X3-LALIPOP-KOTHADUEM_page-0001-900x492.jpg',
    features: ['State-of-the-Art Robotics Lab', 'STEM Science Centers', 'Modern Kindergarten', 'Transport Fleet'],
    mapUrl: 'https://maps.google.com/?q=Old+Arunachaleshwara+School+Campus+Gouthamnagar+Old+Kothagudem'
  }
];

const FACILITIES_DATA = [
  {
    title: 'Mathematics Lab',
    desc: 'Hands-on math equipment allows students to interact directly with practical data. Fast calculation techniques and Vedic mathematics formulas are mastered with fun models.',
    icon: Laptop,
    badge: 'Practical Learning'
  },
  {
    title: 'Science Laboratories',
    desc: 'Dedicated modern apparatus for Physics, Chemistry, and Biology to make scientific inquiry exciting and prepare future doctors and researchers.',
    icon: Sparkles,
    badge: 'Physics • Chem • Bio'
  },
  {
    title: 'Computer & Audio-Visual Lab',
    desc: 'Equipped with multimedia projectors, interactive smart software, and modern workstations to accelerate digital literacy and language comprehension.',
    icon: Laptop,
    badge: 'Digital Classrooms'
  },
  {
    title: 'Comprehensive Library',
    desc: 'Vast collection of academic reference volumes, encyclopedias, literature, and digital journals fostering research curiosity and independent reading habits.',
    icon: BookOpen,
    badge: 'Literacy Center'
  },
  {
    title: 'Music & Guitar Classes',
    desc: '"Music gives a soul to the universe and wings to the mind." Regular vocal, instrumental, and guitar sessions to nurture artistic creativity.',
    icon: Music,
    badge: 'Creative Arts'
  },
  {
    title: 'Health & Physical Sports',
    desc: 'Extensive athletics and sports grounds guided by certified PET coaches in football, cricket, volleyball, running track, and physical fitness.',
    icon: Activity,
    badge: 'Athletics & Games'
  },
  {
    title: 'Yoga & Meditation',
    desc: 'Daily mindfulness and yoga postures ensuring physical agility, stress-free concentration, and harmonious growth of body and mind.',
    icon: HeartPulse,
    badge: 'Mind & Body'
  },
  {
    title: 'English Language Lab',
    desc: 'Dedicated communication lab with word games, phonics exercises, debates, and speech quizzes building confident English speakers from early grades.',
    icon: GraduationCap,
    badge: 'Confidence & Fluency'
  }
];

const BOARDING_PILLARS = [
  {
    title: 'Healthy Stay & Happy Ambience',
    desc: 'The hostel environment is designed to promote physical, mental, and emotional well-being in a disciplined yet family-like caring atmosphere.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-01-31-at-12.03.05.jpeg'
  },
  {
    title: 'Sports & Co-Curricular Activities',
    desc: 'Holistic development is our priority. Boarding students enjoy scheduled daily sports, athletic training, and recreation routines.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/104319168_112097977213262_2855911663380873110_n.jpg'
  },
  {
    title: 'Field Trips & Educational Tours',
    desc: 'To enhance practical exposure and social awareness, regular exciting educational tours, science center visits, and nature camps are conducted.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-01-28-at-10.47.54-1.jpeg'
  },
  {
    title: 'N.C.C Training & Leadership',
    desc: 'Comprehensive National Cadet Corps training instilling patriotism, leadership, drill precision, and national civic service.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/P1089642-scaled.jpg'
  },
  {
    title: 'Routine Doctor Health Checkups',
    desc: 'The health and safety of students are paramount. Qualified physicians and dentists conduct routine diagnostic checkups on campus.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/P1089628-scaled.jpg'
  },
  {
    title: 'Hygienic Kitchen & Nutritious Food',
    desc: 'Strict hygiene protocols in our modern kitchen and dining areas serving wholesome, freshly prepared vegetarian meals and milk.',
    image: 'https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/P1090284-scaled.jpg'
  }
];

export default function EducationMiniWebsiteView({
  profile,
  trackAction = () => {},
  getCleanWhatsAppNumber = (prof) => prof.whatsapp || prof.phone || '',
  viewMode = 'website',
  setViewMode,
  showViewToggle = true
}: EducationMiniWebsiteViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<string>('Geethanjali Digi School (Narsampet)');
  const [selectedGrade, setSelectedGrade] = useState<string>('Class 1 to 5 (Primary)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRulesTab, setActiveRulesTab] = useState<'students' | 'parents' | 'teachers'>('students');
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

  // Admission Form State
  const [admissionForm, setAdmissionForm] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    classGrade: 'Class 6 (IIT-NEET Foundation)',
    preferredCampus: 'Geethanjali Digi School (Narsampet)',
    accommodationType: 'Day Scholar',
    city: 'Warangal',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const rawWa = getCleanWhatsAppNumber(profile);
  const cleanWaDigits = (rawWa || '917732071452').replace(/\D/g, '');
  const cleanWa = cleanWaDigits.length === 10 ? `91${cleanWaDigits}` : cleanWaDigits;
  const schoolPhone = profile.phone || '+91 7732071452';
  const schoolEmail = profile.email || 'info@geethanjaligroupofschools-wgl.com';

  // Autoplay hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('school_admission_form_submitted');

    // Save lead to local storage for dashboard leads sync
    try {
      const stored = localStorage.getItem('oneclickbiz_user_leads');
      const existing = stored ? JSON.parse(stored) : [];
      const newLead = {
        id: `lead_${Date.now()}`,
        name: admissionForm.studentName,
        parentName: admissionForm.parentName,
        phone: admissionForm.phone,
        email: admissionForm.email,
        classGrade: admissionForm.classGrade,
        campus: admissionForm.preferredCampus,
        accommodation: admissionForm.accommodationType,
        city: admissionForm.city,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('oneclickbiz_user_leads', JSON.stringify([newLead, ...existing]));
    } catch {}

    setFormSubmitted(true);

    // Direct WhatsApp message formatting
    const msg = encodeURIComponent(
      `*🎓 New Admission Application - Geethanjali Group of Schools*\n\n` +
      `👤 *Student Name:* ${admissionForm.studentName}\n` +
      `👨‍👩‍👧 *Parent/Guardian:* ${admissionForm.parentName}\n` +
      `📞 *Contact Number:* ${admissionForm.phone}\n` +
      `📧 *Email:* ${admissionForm.email || 'N/A'}\n` +
      `📚 *Class Applying For:* ${admissionForm.classGrade}\n` +
      `🏫 *Preferred Campus:* ${admissionForm.preferredCampus}\n` +
      `🏠 *Accommodation:* ${admissionForm.accommodationType}\n` +
      `📍 *City / Town:* ${admissionForm.city}\n\n` +
      `Please provide entrance exam dates, fee prospectus, and next steps for enrollment. Thank you!`
    );

    window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank');

    setTimeout(() => {
      setFormSubmitted(false);
      setIsAdmissionModalOpen(false);
    }, 2800);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#a90707] selection:text-white">
      
      {/* 1. TOP NOTICE & CONTACT STRIP */}
      <header className="bg-gradient-to-r from-[#0f2b5c] via-[#8b0000] to-[#a90707] text-white text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3 h-3 text-slate-950" /> Admissions Open 2026-27
            </span>
            <span className="hidden sm:inline text-white/80 font-medium">
              SSC, CBSE &amp; ICSE Integrated Syllabus • IIT &amp; NEET Foundation
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <a 
              href={`tel:${schoolPhone.replace(/[^\d+]/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>{schoolPhone}</span>
            </a>
            <span className="hidden md:inline text-white/40">|</span>
            <a 
              href={`mailto:${schoolEmail}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>{schoolEmail}</span>
            </a>
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/20">
              <a 
                href="https://www.instagram.com/geethanjaligroupofschools_wgl/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-amber-300 transition" 
                title="Instagram"
              >
                IG
              </a>
              <span>•</span>
              <a 
                href="https://www.facebook.com/profile" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-amber-300 transition" 
                title="Facebook"
              >
                FB
              </a>
              <span>•</span>
              <a 
                href="https://www.youtube.com/@geethanjaligroupofschools" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-amber-300 transition" 
                title="YouTube"
              >
                YT
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 overflow-hidden shrink-0 shadow-xs">
              <img 
                src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/Geethanjali_School_Logo-removebg-preview.png"
                alt="Geethanjali Group of Schools Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#0f2b5c] tracking-tight leading-tight">
                  Geethanjali Group of Schools
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-[#a90707] border border-rose-200">
                  Warangal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold truncate max-w-xs sm:max-w-md">
                Best Schools in Warangal • Narsampet • Mahbubabad • Kothagudem
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-700">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#a90707] transition cursor-pointer">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#a90707] transition cursor-pointer">About Us</button>
            <button onClick={() => scrollToSection('campuses')} className="hover:text-[#a90707] transition cursor-pointer">Branches</button>
            <button onClick={() => scrollToSection('academics')} className="hover:text-[#a90707] transition cursor-pointer">Academics</button>
            <button onClick={() => scrollToSection('boarding')} className="hover:text-[#a90707] transition cursor-pointer">Boarding</button>
            <button onClick={() => scrollToSection('facilities')} className="hover:text-[#a90707] transition cursor-pointer">Facilities</button>
            <button onClick={() => scrollToSection('rules')} className="hover:text-[#a90707] transition cursor-pointer">Rules</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#a90707] transition cursor-pointer">Contact</button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* View Mode Toggle (Card ↔ Website) */}
            {showViewToggle && setViewMode && (
              <div className="hidden sm:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
                <button
                  onClick={() => setViewMode('website')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition ${
                    viewMode === 'website' ? 'bg-[#0f2b5c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Full School Website View"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Website</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold transition ${
                    viewMode === 'mobile' ? 'bg-[#0f2b5c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Smart Digital Card View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Card</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsAdmissionModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#a90707] to-[#b91c1c] hover:from-[#8b0000] hover:to-[#a90707] text-white font-extrabold text-xs shadow-md shadow-red-900/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Admissions</span>
            </button>

            <button
              onClick={() => downloadVcfFile(profile)}
              className="hidden md:flex p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Save Contact (.VCF)"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <button onClick={() => scrollToSection('hero')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">🏠 Home</button>
              <button onClick={() => scrollToSection('about')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">📖 About Us</button>
              <button onClick={() => scrollToSection('campuses')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">🏫 5 Branches</button>
              <button onClick={() => scrollToSection('academics')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">🎯 IIT-NEET Wing</button>
              <button onClick={() => scrollToSection('boarding')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">🛌 Boarding Facilities</button>
              <button onClick={() => scrollToSection('facilities')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">🔬 Labs &amp; Sports</button>
              <button onClick={() => scrollToSection('rules')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">📋 Rules &amp; Codes</button>
              <button onClick={() => scrollToSection('contact')} className="p-2 rounded-lg bg-slate-50 text-left hover:bg-slate-100">📞 Contact Desk</button>
            </div>

            {showViewToggle && setViewMode && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Switch View Mode:</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => { setViewMode('website'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${viewMode === 'website' ? 'bg-[#0f2b5c] text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Website
                  </button>
                  <button 
                    onClick={() => { setViewMode('mobile'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${viewMode === 'mobile' ? 'bg-[#0f2b5c] text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Card
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* 3. HERO SLIDER & ACADEMIC REPUTATION BANNER */}
      <section id="hero" className="relative bg-slate-950 text-white overflow-hidden">
        <div className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-65 scale-105 transition-transform duration-7000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />
            </div>
          ))}

          {/* Slider Content Overlay */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl space-y-4 sm:space-y-5 animate-in fade-in duration-700">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20">
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>{HERO_SLIDES[currentSlide].campus}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                  {HERO_SLIDES[currentSlide].title}
                </h1>

                <p className="text-base sm:text-xl font-bold text-amber-300 drop-shadow">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl drop-shadow-sm">
                  {HERO_SLIDES[currentSlide].tagline}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setIsAdmissionModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#a90707] via-rose-600 to-[#a90707] hover:from-[#8b0000] hover:to-[#a90707] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-red-900/40 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Apply for Admission 2026-27</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hello Geethanjali Group of Schools! I would like admission details, fee structure, and campus counseling.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Desk</span>
                  </a>

                  <button
                    onClick={() => setVideoModalUrl('https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1')}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
                  >
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Virtual Tour</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controls (Prev / Next & Dots) */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-sm transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-sm transition"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all ${
                  idx === currentSlide
                    ? 'w-8 h-2.5 bg-amber-400 rounded-full'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="bg-[#0f2b5c] border-t border-blue-900/40 py-4 px-4 text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2 border-r border-blue-800/40 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-amber-300">10,000+</p>
              <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">Students Mentored</p>
            </div>
            <div className="p-2 border-r border-blue-800/40 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-amber-300">5 Campuses</p>
              <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">Across Telangana</p>
            </div>
            <div className="p-2 border-r border-blue-800/40 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-amber-300">100% Pass</p>
              <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">SSC &amp; Board Results</p>
            </div>
            <div className="p-2 last:border-none">
              <p className="text-xl sm:text-2xl font-black text-amber-300">IIT &amp; NEET</p>
              <p className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">Advanced Foundation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT GEETHANJALI GROUP & CAMPUS VIDEO SECTION */}
      <section id="about" className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" /> About Geethanjali Group
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c] leading-tight">
              Best Schools in Warangal: <span className="text-[#a90707]">Geethanjali Group</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Geethanjali Group of Schools is renowned for delivering an exceptional educational experience, earning its repute as one of the best schools in Warangal, Narsampet, Mahbubabad, and Kothagudem. It is an institution where <strong>tradition meets innovation</strong>, providing a robust platform for student achievement.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              The school distinguishes itself with a curriculum that is as rigorous as it is relevant, offering a balanced blend of strong academic subjects, creative arts, and sports. This ensures every child receives an education tailored to their strengths, nurturing curiosity and preparing them for dynamic 21st-century leadership.
            </p>

            {/* Core Rules for Students */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <h3 className="text-xs font-black text-[#0f2b5c] uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#a90707]" />
                <span>Core Standards &amp; Discipline</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Uninterrupted teaching sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>English-only speaking campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Punctuality &amp; 90% attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Decent &amp; dignified dress code</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAdmissionModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#0f2b5c] hover:bg-[#1a365d] text-white font-bold text-xs flex items-center gap-2 shadow transition cursor-pointer"
              >
                <span>Apply for 2026-27</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSection('campuses')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
              >
                View 5 Campuses
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-01-28-at-10.47.58.jpeg"
                  alt="Geethanjali Campus Environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => setVideoModalUrl('https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1')}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#a90707] hover:bg-red-700 text-white flex items-center justify-center shadow-2xl shadow-red-900/60 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                  title="Play Campus Video"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-[#0f2b5c]">Campus Tour &amp; Activities</p>
                    <p className="text-[11px] text-slate-600 font-medium">Click to watch our student environment in action</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 text-[10px] font-bold">
                    Watch Video
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW BRANCH SPOTLIGHT: OLD KOTHAGUDEM */}
      <section className="py-12 px-4 bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-blue-500/10 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto rounded-3xl bg-white border border-amber-300 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs uppercase tracking-wide border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" /> New Branch Announcement
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f2b5c]">
                Geethanjali Public School : Old Kothagudem Branch
              </h2>

              <div className="space-y-1.5 text-xs text-slate-700 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <p className="font-extrabold text-[#a90707]">
                  📅 Grand Opening on: 10th June 2025
                </p>
                <p className="flex items-start gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> Old Arunachaleshwara School Campus, Gouthamnagar, Old Kothagudem, Bhadradri Kothagudem District.</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Geethanjali Public School, a proud branch of the esteemed <strong>Geethanjali Group of Schools – Warangal</strong>, is set to open its doors in Old Kothagudem. Featuring high-tech Robotics Labs, digital smart classrooms, IIT-NEET foundation, and experienced educators to shape world-class talent in Bhadradri Kothagudem.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setAdmissionForm(prev => ({ ...prev, preferredCampus: 'Geethanjali Public School (Old Kothagudem)' }));
                    setIsAdmissionModalOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#a90707] hover:from-amber-500 hover:to-red-700 text-white font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Apply for Kothagudem Admissions
                </button>
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hello! I would like details about the new Geethanjali Public School campus opening in Old Kothagudem on 10th June 2025.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Kothagudem Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/06/3X3-2-PAGE-ROBOTICS-LAB-LALIPOP-KOTHADUEM_page-0001.jpg"
                  alt="Kothagudem Robotics Lab"
                  className="w-full h-44 object-cover"
                />
                <div className="p-2 bg-slate-50 text-[10px] font-bold text-center text-slate-700">
                  Robotics &amp; AI Lab
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/freepicdownloader.com-happy-indian-schoolgirl-uniform-with-books-bag-medium.jpg"
                  alt="Schoolgirl uniform"
                  className="w-full h-44 object-cover"
                />
                <div className="p-2 bg-slate-50 text-[10px] font-bold text-center text-slate-700">
                  Nursery to Class X
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR 5 CAMPUSES / BRANCHES SHOWCASE */}
      <section id="campuses" className="py-16 px-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0f2b5c] font-black text-xs uppercase tracking-wider">
              Our Educational Network
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              5 Campuses Across Telangana
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Conveniently located branches equipped with modern infrastructure, safe transport fleets, and experienced faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPUSES_DATA.map((campus) => (
              <div
                key={campus.id}
                className="rounded-3xl bg-white border border-slate-200 hover:border-[#a90707] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={campus.image}
                      alt={campus.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0f2b5c]/90 backdrop-blur-md text-white text-[10px] font-black">
                      {campus.badge}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-[#0f2b5c] group-hover:text-[#a90707] transition-colors leading-snug">
                      {campus.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-[#a90707] shrink-0 mt-0.5" />
                      <span>{campus.address}</span>
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Campus Highlights</p>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700 font-medium">
                        {campus.features.map((feat, fidx) => (
                          <span key={fidx} className="flex items-center gap-1 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a90707]" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setAdmissionForm(prev => ({ ...prev, preferredCampus: campus.name }));
                      setIsAdmissionModalOpen(true);
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#1a365d] text-white font-bold text-xs text-center transition cursor-pointer"
                  >
                    Enroll at Campus
                  </button>

                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hello! I would like to inquire about admissions and fee structure for ${campus.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                    title="WhatsApp Campus Inquiries"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </a>

                  <a
                    href={campus.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="View on Google Maps"
                  >
                    <MapPin className="w-4 h-4 text-[#a90707]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE GEETHANJALI ("A SAGA OF SUCCESS") */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
                Why Choose Geethanjali Schools
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c] mt-2 leading-tight">
                "A SAGA of SUCCESS Right from the year of Inception."
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                With an unwavering commitment to <strong>academic excellence, character building, and holistic child development</strong>, Geethanjali has nurtured thousands of successful leaders, engineers, and doctors.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-[#a90707] transition">
                <h3 className="text-sm font-black text-[#0f2b5c] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#a90707]" />
                  <span>Our Core Vision and Mission</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To inspire, educate, and enlighten every student in a challenging environment of IIT &amp; NEET Advanced curriculum. Nurturing 21st-century dynamic leaders, athletes, and responsible citizens with moral integrity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 hover:border-[#a90707] transition">
                <h3 className="text-sm font-black text-[#0f2b5c] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0f2b5c]" />
                  <span>Integrated Syllabus (SSC, CBSE &amp; ICSE + IIT-NEET)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our curriculum is tailored with a multi-dimensional, child-centric approach that is both interactive and pragmatic. We blend academic rigor with sports, creative arts, and hands-on laboratory experiments.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5">
                <h3 className="text-sm font-black text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>TIME is the Best Gift a Child Can Get from Parents</span>
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed">
                  We believe that behind every child who makes great progress is an actively involved parent. Our unique Holiday Homework and parent-teacher collaboration foster continuous home learning support.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/why-school.png"
                alt="Why choose Geethanjali School"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/WhatsApp-Image-2024-01-25-at-13.59.18.jpeg"
                alt="School achievements and awards"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACADEMIC CURRICULUM & GRADE PROGRAMS */}
      <section id="academics" className="py-16 px-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0f2b5c] font-black text-xs uppercase tracking-wider">
                Academic Curriculum
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c] mt-2">
                Nursery through Class X Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Structured stages designed for conceptual clarity, analytical reasoning, and competitive success.
              </p>
            </div>
            <button
              onClick={() => setIsAdmissionModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#a90707] hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow self-start cursor-pointer"
            >
              <span>Download Full Prospectus</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(profile.sectionData?.products?.items || []).map((prog) => (
              <div
                key={prog.id}
                className="rounded-3xl bg-white border border-slate-200 hover:border-[#a90707] shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {prog.imageUrl && (
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3 bg-slate-900">
                      <img
                        src={prog.imageUrl}
                        alt={prog.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300">
                        {prog.category || 'Academic Program'}
                      </div>
                    </div>
                  )}

                  <h3 className="text-base font-black text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                    {prog.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fee Structure</span>
                    <p className="text-sm font-black text-[#0f2b5c]">
                      {prog.price ? `₹${prog.price.toLocaleString('en-IN')} / yr` : 'Contact Admissions'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setAdmissionForm(prev => ({ ...prev, classGrade: prog.name }));
                      setIsAdmissionModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0f2b5c] hover:bg-[#a90707] text-white font-bold text-xs transition cursor-pointer"
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOARDING FACILITIES ("HOME AWAY FROM HOME") */}
      <section id="boarding" className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
              Hostel &amp; Residential Wings
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              BOARDING FACILITIES
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Safe, comfortable, and nurturing environment where students focus on academics, character, and healthy well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOARDING_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#a90707] overflow-hidden shadow-sm hover:shadow-md transition group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-black text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0f2b5c] to-[#8b0000] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-black text-white">Looking for Hostel Accommodation for your child?</h3>
              <p className="text-xs text-blue-100">Clean dorms, personal study desks, doctor checkups, and monitored evening study hours.</p>
            </div>
            <button
              onClick={() => {
                setAdmissionForm(prev => ({ ...prev, accommodationType: 'Full Boarding / Hostel' }));
                setIsAdmissionModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition whitespace-nowrap cursor-pointer"
            >
              Inquire Hostel Seats
            </button>
          </div>
        </div>
      </section>

      {/* 10. CREATIVE ACTIVITIES & 21ST CENTURY FACILITIES */}
      <section id="facilities" className="py-16 px-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0f2b5c] font-black text-xs uppercase tracking-wider">
              21st Century Skills
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              World-Class Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Co-curricular infrastructure enhancing intellect, personality development, communication skills, and creative inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACILITIES_DATA.map((fac, idx) => {
              const IconComp = fac.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-[#a90707] p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#a90707] group-hover:bg-[#a90707] group-hover:text-white transition-colors flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-black text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                        {fac.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400">
                        {fac.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => setIsAdmissionModalOpen(true)}
                      className="text-xs font-bold text-[#a90707] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Facility</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. SPECIALIZED PROGRAMS: FACULTY DEVELOPMENT & STUDENT AIMS */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/P1089745-scaled.jpg"
                alt="Faculty Development Program at Geethanjali"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Certified Master Educators undergoing weekly pedagogy refreshers to keep learning relevant and joyful.</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
              Specialized Pedagogy
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c] leading-tight">
              Faculty Development Program (FDP) &amp; Student Aims
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Empowering teachers is the key to elevating child education. Our teachers play an enormous role in nurturing passion, self-confidence, and character in every classroom.
            </p>

            <div className="space-y-2.5">
              <p className="text-xs font-black text-[#0f2b5c] uppercase tracking-wide">Our Lifelong Aims for Every Student:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Master numeracy &amp; communication</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cultivate lifelong love for learning</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Critical thinking &amp; logical reasoning</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Respect for dignity of all work</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Well-mannered &amp; environmentally conscious</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nurture unique individual talents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. RULES & REGULATIONS TABBED ACCORDION */}
      <section id="rules" className="py-16 px-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
              Discipline &amp; Values
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              Rules and Regulations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear institutional guidelines fostering respect, punctuality, and mutual trust.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-bold">
              <button
                onClick={() => setActiveRulesTab('students')}
                className={`px-5 py-2 rounded-xl transition ${
                  activeRulesTab === 'students' ? 'bg-[#a90707] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Students
              </button>
              <button
                onClick={() => setActiveRulesTab('parents')}
                className={`px-5 py-2 rounded-xl transition ${
                  activeRulesTab === 'parents' ? 'bg-[#a90707] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Parents
              </button>
              <button
                onClick={() => setActiveRulesTab('teachers')}
                className={`px-5 py-2 rounded-xl transition ${
                  activeRulesTab === 'teachers' ? 'bg-[#a90707] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Teachers
              </button>
            </div>
          </div>

          {/* Rules Tab Content */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
            {activeRulesTab === 'students' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#0f2b5c]">Rules &amp; Regulations for Students:</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Classroom Focus:</strong> No student under any circumstances shall be called out of the classroom when a lecture or activity is in progress for communicating messages or visitors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Uniform &amp; Neatness:</strong> Students must wear neat, ironed school uniform with shoes polished, and keep their desk and school premises tidy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>English Communication:</strong> All students within the school campus must converse strictly in English to build spontaneous vocabulary and fluency.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Punctuality:</strong> Semi-residential and day scholars must report strictly on time. Late arrivals will not be permitted into ongoing morning classes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Attendance:</strong> Minimum 90% attendance is essential for term progression and eligibility for board examinations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero Tolerance:</strong> Any form of indiscipline, bullying, or disrespectful behavior towards fellow students or staff will invite strict disciplinary action.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeRulesTab === 'parents' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#0f2b5c]">Guidelines &amp; Collaboration for Parents:</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Holiday Homework Support:</strong> Parents are requested to spend quality time reviewing school diaries and guiding children through designated creative projects.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Parent-Teacher Meetings:</strong> Active attendance at periodic PTMs ensures aligned growth and timely redressal of learning challenges.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Fee Policy:</strong> 50% of the school fee must be remitted at the time of admission, and full remaining dues before the Sankranthi holidays in January.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Visiting Hours:</strong> Prior appointment is advised for meeting the Principal or subject coordinators during office hours (8:00 AM – 5:00 PM).</span>
                  </li>
                </ul>
              </div>
            )}

            {activeRulesTab === 'teachers' && (
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#0f2b5c]">Educator Principles &amp; Pedagogy Standards:</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#a90707] shrink-0 mt-0.5" />
                    <span><strong>Child-Centric Mentorship:</strong> Treat every child with warmth, empathy, and positive reinforcement to build innate confidence.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#a90707] shrink-0 mt-0.5" />
                    <span><strong>Continuous Development:</strong> Active participation in FDP workshops to integrate digital boards, STEM experiments, and diagnostic remedial sessions.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#a90707] shrink-0 mt-0.5" />
                    <span><strong>Zero Corporal Punishment:</strong> Total adherence to modern pedagogical guidelines upholding dignity and constructive correction.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. CAMPUS LIFE VIDEOS & VIRTUAL TOUR */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0f2b5c] font-black text-xs uppercase tracking-wider">
              Campus Life Videos
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              Learning, Friendship and Fun
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Watch real student experiences, science experiments, sports drills, and cultural showcases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/1MTkZPys7mU"
                  title="Geethanjali Schools - Learning, Friendship and Fun"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-sm font-bold text-[#0f2b5c]">Learning, Friendship and Fun for Everyone</h3>
                <p className="text-xs text-slate-500 mt-1">Inspiring campus culture and dynamic extracurricular programs.</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/XHOmBV4js_E"
                  title="Geethanjali Group of Schools Campus Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-sm font-bold text-[#0f2b5c]">Comprehensive Campus Tour &amp; Environment</h3>
                <p className="text-xs text-slate-500 mt-1">Science laboratories, computer halls, sports grounds, and dining rooms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. VERIFIED PARENT TESTIMONIALS */}
      <section className="py-16 px-4 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-[#a90707] font-black text-xs uppercase tracking-wider">
              Parents Voice
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2b5c]">
              What Parents Say About "Geethanjali Schools"
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Real testimonials from parents who have witnessed their children blossom into disciplined achievers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(profile.sectionData?.testimonials?.items || []).map((tst) => (
              <div
                key={tst.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(tst.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{tst.content}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-50 text-[#a90707] font-bold flex items-center justify-center text-sm border border-rose-200 shrink-0">
                    {tst.clientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0f2b5c]">{tst.clientName}</h3>
                    <p className="text-[10px] text-slate-500">{tst.clientRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. ADMISSIONS PROCESS & CTA HERO */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0f2b5c] via-[#1a365d] to-[#8b0000] text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shadow-md">
            Academic Year 2026 - 2027
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Admissions for Geethanjali Group of Schools Are Open
          </h2>

          <p className="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            The admission procedure commences in the final week of March. Admissions for classes Nursery to X are granted based on performance in our diagnostic entrance examination evaluating students' skills, ability, and knowledge.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pt-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-amber-400 font-extrabold text-xs">Step 1</span>
              <h3 className="text-sm font-bold text-white mt-1">Online Application</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Submit the candidate details and campus preference form.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-amber-400 font-extrabold text-xs">Step 2</span>
              <h3 className="text-sm font-bold text-white mt-1">Diagnostic Assessment</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Friendly ability and skills evaluation test for the grade.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-amber-400 font-extrabold text-xs">Step 3</span>
              <h3 className="text-sm font-bold text-white mt-1">Seat Confirmation</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Complete registration and receive student orientation kit.</p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsAdmissionModalOpen(true)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition cursor-pointer"
            >
              Start Online Admission Application Now →
            </button>
            <a
              href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hello Geethanjali Group of Schools! I would like to schedule an entrance test and campus counseling for my child.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Admissions</span>
            </a>
          </div>
        </div>
      </section>

      {/* 16. CONTACT & LOCATION DESK WITH GOOGLE MAP */}
      <footer id="contact" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* School Profile Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl bg-white p-1 overflow-hidden shrink-0">
                  <img 
                    src="https://geethanjaligroupofschools-wgl.com/wp-content/uploads/2025/03/Geethanjali_School_Logo-removebg-preview.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Geethanjali Group of Schools</h3>
                  <p className="text-[11px] text-amber-400 font-bold">Best Schools in Warangal</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Nurturing 21st-century dynamic professionals, dynamic leaders, and responsible citizens with an integrated ICSE, CBSE &amp; SSC curriculum and specialized IIT/NEET advanced foundation.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Head Office:</strong> H. No. 19-219, Warangal Rd, opp. Ayyappa Temple, Narsampet, Telangana 506132</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span><strong>Admissions Helpline:</strong> +91 7732071452</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Email:</strong> info@geethanjaligroupofschools-wgl.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Office Timings:</strong> Mon - Sat (8:00 AM – 5:00 PM)</span>
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a 
                  href="https://www.instagram.com/geethanjaligroupofschools_wgl/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Instagram
                </a>
                <a 
                  href="https://www.facebook.com/profile" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  Facebook
                </a>
                <a 
                  href="https://www.youtube.com/@geethanjaligroupofschools" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  YouTube
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h3>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition">Home Page</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">About Geethanjali</button></li>
                <li><button onClick={() => scrollToSection('campuses')} className="hover:text-white transition">5 Campuses &amp; Branches</button></li>
                <li><button onClick={() => scrollToSection('academics')} className="hover:text-white transition">Academics &amp; Curriculum</button></li>
                <li><button onClick={() => scrollToSection('boarding')} className="hover:text-white transition">Hostel &amp; Boarding Wings</button></li>
                <li><button onClick={() => scrollToSection('facilities')} className="hover:text-white transition">Laboratories &amp; Sports</button></li>
                <li><button onClick={() => scrollToSection('rules')} className="hover:text-white transition">Rules and Regulations</button></li>
                <li>
                  <button onClick={() => setIsAdmissionModalOpen(true)} className="text-amber-400 font-bold hover:underline">
                    Admissions Form 2026-27 →
                  </button>
                </li>
              </ul>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Campus Location Map</h3>
                <span className="text-[11px] text-amber-400 font-semibold">Narsampet Main Campus</span>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe
                  title="Geethanjali School Narsampet Google Map"
                  src="https://maps.google.com/maps?q=Geethanjali+Digi+School+Narsampet+Telangana+506132&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Geethanjali Group of Schools, Warangal. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span>Powered by <strong className="text-slate-400">OneClickBiz</strong></span>
              <span>•</span>
              <button onClick={() => downloadVcfFile(profile)} className="hover:text-slate-300 font-semibold flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Save VCF
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 17. INTERACTIVE ADMISSION APPLICATION MODAL */}
      {isAdmissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsAdmissionModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#a90707] border border-rose-200 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0f2b5c]">Student Admission Application</h3>
                <p className="text-xs text-slate-500">Academic Year 2026 - 2027 • Geethanjali Schools</p>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-black text-slate-800">Application Submitted!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Opening WhatsApp admissions desk with pre-filled details to confirm your diagnostic entrance test date...
                </p>
              </div>
            ) : (
              <form onSubmit={handleAdmissionSubmit} className="space-y-3.5 pt-2">
                
                <div>
                  <label className="text-xs font-bold text-slate-700">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={admissionForm.studentName}
                    onChange={(e) => setAdmissionForm(prev => ({ ...prev, studentName: e.target.value }))}
                    placeholder="e.g. Aarav Sharma"
                    className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={admissionForm.parentName}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, parentName: e.target.value }))}
                      placeholder="e.g. Rajesh Sharma"
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">WhatsApp Contact Number *</label>
                    <input
                      type="tel"
                      required
                      value={admissionForm.phone}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. 9876543210"
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Class Grade Applying For *</label>
                    <select
                      value={admissionForm.classGrade}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, classGrade: e.target.value }))}
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    >
                      <option value="Pre-Primary (Nursery, LKG, UKG)">Pre-Primary (Nursery, LKG, UKG)</option>
                      <option value="Class 1 to 5 (Primary Wing)">Class 1 to 5 (Primary Wing)</option>
                      <option value="Class 6 to 8 (Middle School)">Class 6 to 8 (Middle School)</option>
                      <option value="Class 9 & 10 (Board Exam Prep)">Class 9 &amp; 10 (Board Exam Prep)</option>
                      <option value="IIT & NEET Foundation (Classes 6 to 10)">IIT &amp; NEET Foundation (Classes 6 to 10)</option>
                      <option value="Navodaya & Sainik School Coaching">Navodaya &amp; Sainik School Coaching</option>
                      <option value="Robotics & STEM Innovation Wing">Robotics &amp; STEM Innovation Wing</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Preferred Campus *</label>
                    <select
                      value={admissionForm.preferredCampus}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, preferredCampus: e.target.value }))}
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    >
                      <option value="Geethanjali Digi School (Narsampet Main)">Geethanjali Digi School (Narsampet Main)</option>
                      <option value="Geethanjali Global School (Maheshwaram)">Geethanjali Global School (Maheshwaram)</option>
                      <option value="Geethanjali E/M High School (Mallampally Rd)">Geethanjali E/M High School (Mallampally Rd)</option>
                      <option value="Geethanjali High School (Mahbubabad)">Geethanjali High School (Mahbubabad)</option>
                      <option value="Geethanjali Public School (Old Kothagudem)">Geethanjali Public School (Old Kothagudem)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Accommodation Type</label>
                    <select
                      value={admissionForm.accommodationType}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, accommodationType: e.target.value }))}
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    >
                      <option value="Day Scholar (Own Transport)">Day Scholar (Own Transport)</option>
                      <option value="Day Scholar (School Bus)">Day Scholar (School Bus)</option>
                      <option value="Semi-Residential (Extended Study & Meals)">Semi-Residential (Extended Study &amp; Meals)</option>
                      <option value="Full Boarding / Hostel">Full Boarding / Hostel</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700">Current Town / City *</label>
                    <input
                      type="text"
                      required
                      value={admissionForm.city}
                      onChange={(e) => setAdmissionForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g. Warangal / Narsampet"
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#a90707] focus:bg-white"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  By clicking submit, our admission counselor will contact you via WhatsApp with the diagnostic test syllabus and campus reporting schedule.
                </p>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#a90707] to-red-700 hover:from-red-800 hover:to-[#a90707] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-900/30 active:scale-95 transition-all cursor-pointer mt-2"
                >
                  Confirm &amp; Transmit Admission Request →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 18. VIDEO MODAL PLAYER */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white transition"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={videoModalUrl}
                title="Geethanjali Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* 19. SHARE PROFILE MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}
    </div>
  );
}
