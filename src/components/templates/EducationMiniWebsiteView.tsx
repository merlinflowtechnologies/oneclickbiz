'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Menu,
  ChevronDown
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

// 5 High Resolution Mock Campus Slides
const HERO_SLIDES = [
  {
    id: 1,
    title: 'Apex Digi School',
    subtitle: 'Central Flagship Campus',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80',
    fallback: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 2,
    title: 'Apex Global Academy',
    subtitle: 'West End Campus',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',
    fallback: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 3,
    title: 'Apex Senior Secondary School',
    subtitle: 'North Zone Campus',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
    fallback: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 4,
    title: 'Apex Public School - Heritage Branch',
    subtitle: 'New Branch Opening 10th June 2025',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    fallback: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 5,
    title: 'Apex International High School',
    subtitle: 'East City Campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    fallback: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80'
  }
];

// 6 Boarding Facilities with mock photography & descriptions
const BOARDING_FACILITIES = [
  {
    id: 'bf-1',
    title: 'Healthy Stay & Happy Ambience',
    description: 'The hostel environment is designed to promote physical, mental, and emotional well-being.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-2',
    title: 'Sports & Co-Curricular Activities',
    description: 'At Apex Global Schools, holistic development is a priority. We offer extensive sports facilities.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-3',
    title: 'Field Trips/Educational Tours',
    description: 'To enhance practical learning and exposure, we arrange exciting educational tours and trips.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-4',
    title: 'N.C.C Training',
    description: 'The school offers NCC training for students interested in discipline, leadership, and national service.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-5',
    title: 'Health Checkup',
    description: 'Regular health checkups by qualified doctors as health and safety of students are a top priority.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bf-6',
    title: 'Hygenic Food',
    description: 'The school follows strict hygiene standards in its kitchen and dining areas.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80'
  }
];

// 8 21st-Century Facilities
const FACILITIES = [
  {
    id: 'fac-1',
    icon: Laptop,
    title: 'Mathematics Lab',
    desc: 'Maths lab equipment allows students to interact directly with the data gathered. They get first hand learning experience by performing various techniques to learn fast calculations by their own.'
  },
  {
    id: 'fac-2',
    icon: Music,
    title: 'Music Classes',
    desc: '"Music is like a dream" "Music gives a soul to the Universe, wings to mind, flight to the imagination and life to everything." So Apex Global encourages children to learn music with guitar and instrumental classes.'
  },
  {
    id: 'fac-3',
    icon: Sparkles,
    title: 'Science Lab',
    desc: 'Our science lab supplies good equipment to make science interesting and effective for students and to encourage them to make significant contributions in Physics, Biology, Chemistry.'
  },
  {
    id: 'fac-4',
    icon: BookOpen,
    title: 'Library',
    desc: 'Our school library exists to provide a range of learning opportunities for both large and small groups as well as individuals with a focus on intellectual content, literacy and the learner.'
  },
  {
    id: 'fac-5',
    icon: Laptop,
    title: 'Computer Lab',
    desc: 'Our computer lab arranged with audio-video projectors helps to accelerate the process of learning and language skills. Loaded with latest software for digital exploration.'
  },
  {
    id: 'fac-6',
    icon: HeartPulse,
    title: 'Health & Physical',
    desc: 'Students are encouraged involving in sports and games. A well-trained PET is appointed to look after and guide the students in their respective athletics events.'
  },
  {
    id: 'fac-7',
    icon: Activity,
    title: 'Yoga & Meditation',
    desc: 'Practicing Yoga can improve physical and mental health of an individual and provides peace of mind. Yoga & meditation provide children stress-free harmonious growth.'
  },
  {
    id: 'fac-8',
    icon: GraduationCap,
    title: 'English Classes',
    desc: 'English language lab benefits students lacking confidence in English speaking. Sessions include word games, fun quizzes, extemporary speaking, and debates.'
  }
];

// Authentic Parent Testimonials with diverse mock avatars
const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Mrs. Meena',
    role: 'Parent of Aarav, Class 3',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    text: 'The dedication of the teachers and staff at Apex Global is commendable. My little one enjoys every class, and I have seen tremendous growth in his confidence and communication skills. The school provides the perfect blend of academics, sports, and extracurricular activities.'
  },
  {
    id: 't-2',
    name: 'Mr. Prakash',
    role: 'Parent of Rahul, Apex Alumni, Class 10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'As parents, we wanted a school that not only focuses on academics but also on values and life skills. Apex Global School has exceeded our expectations. Our son, who recently completed his 10th grade, has been nurtured with great discipline, leadership qualities, and strong academic excellence. Thank you for shaping his future.'
  },
  {
    id: 't-3',
    name: 'Mr & Mrs. Kumar',
    role: 'Parents of Sneha, Class 5',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'My daughter loves going to school every day! The innovative teaching methods and well-structured curriculum at Apex Global have helped her develop strong foundational knowledge. The teachers encourage curiosity and creativity, which has made learning enjoyable for her. We are extremely happy with our decision.'
  },
  {
    id: 't-4',
    name: 'Mrs. S.Reddy',
    role: 'Parents of Sneha, Class 5',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    text: 'Apex Global Group of Schools has been a second home for my child. The teachers are highly supportive, and the learning environment is exceptional. My son has not only excelled academically but also gained confidence through extracurricular activities. Truly grateful!'
  }
];

// Rich Mock Data: Academic Wings & Fee Structure with Unsplash Mock Photos
const ACADEMIC_WINGS = [
  {
    id: 'wing-1',
    title: 'Pre-Primary Wing (Nursery, LKG, UKG)',
    badge: 'Foundation Years',
    ageGroup: 'Ages 3 - 5 Years',
    fee: '₹28,000 / Term',
    desc: 'Activity-based child-centric pedagogy, phonetics, sensory play, basic numeracy, and English language communication in a caring environment.',
    features: ['Montessori & Activity Play', 'Digital Smart Rhymes & Phonics', 'CCTV Secured Care Classrooms'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Nursery / LKG / UKG'
  },
  {
    id: 'wing-2',
    title: 'Primary Wing (Classes 1 to 5)',
    badge: 'Core Academic Growth',
    ageGroup: 'Classes 1 to 5',
    fee: '₹36,000 / Term',
    desc: 'Strong foundation in Mathematics, General Science, Languages, Environmental Studies, and mental arithmetic with interactive digital boards.',
    features: ['Math Lab Speed Calculation', 'Spoken English & Word Drills', 'Science Curiosity Kits'],
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Class 3'
  },
  {
    id: 'wing-3',
    title: 'Middle School (Classes 6 to 8)',
    badge: 'Integrated CBSE & ICSE',
    ageGroup: 'Classes 6 to 8',
    fee: '₹45,000 / Term',
    desc: 'Integrated ICSE, CBSE & State syllabus with early preparation for National Science Olympiads and English speech debates.',
    features: ['Early Olympiad Foundation', 'Physics & Chemistry Labs', 'Computer Coding & Hardware'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Class 6 (IIT-NEET Foundation)'
  },
  {
    id: 'wing-4',
    title: 'High School & Board Prep (Classes 9 & 10)',
    badge: '100% GPA SSC & Board Target',
    ageGroup: 'Classes 9 & 10',
    fee: '₹55,000 / Term',
    desc: 'Rigorous academic drills, past-paper analysis, regular revision tests, and personalized mentor attention targeting 100% GPA in SSC & Board exams.',
    features: ['Dedicated Mentor Batches', 'Bi-Weekly Board Mock Tests', 'Special Evening Study Hours'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Class 10 (Board Exam Batch)'
  },
  {
    id: 'wing-5',
    title: 'IIT & NEET Advanced Integrated Foundation',
    badge: 'Premier Competitive Wing',
    ageGroup: 'Classes 6 to 10',
    fee: '₹65,000 / Term',
    desc: 'Comprehensive weekend national-level exams, advanced physics-chemistry-math concepts, shortcut techniques, and doubt resolution labs.',
    features: ['National Rank Target Drills', 'Formula Master Workshops', 'Kota & Hyderabad Expert Faculty'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Class 8 (IIT-NEET Advanced)'
  },
  {
    id: 'wing-6',
    title: 'Robotics, AI & 21st-Century STEM Lab',
    badge: 'Futuristic Skills Wing',
    ageGroup: 'All Senior Classes',
    fee: '₹48,000 / Term',
    desc: 'Practical coding, hardware sensor circuits, LEGO mechanics, and science project modeling for futuristic skill development.',
    features: ['Arduino & Microcontroller Kits', 'AI & Logic Programming', 'Annual STEM Expo Competitions'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    gradeParam: 'Class 7 (IIT-NEET Foundation)'
  }
];

// Rich Mock Data: Admissions Counseling & Guidance Packages
const COUNSELING_SERVICES = [
  {
    id: 'srv-1',
    title: 'Admissions Counseling & Campus Tour',
    duration: '45 Mins',
    fee: 'Free of Cost',
    badge: '1-on-1 Guidance',
    desc: 'One-on-one session with senior academic counselors and an interactive guided tour of our digital classrooms and laboratories.',
    icon: Users
  },
  {
    id: 'srv-2',
    title: 'IIT & NEET Foundation Diagnostic Test',
    duration: '60 Mins',
    fee: 'Free Assessment',
    badge: 'Aptitude Test',
    desc: 'Comprehensive evaluation of mathematical aptitude, analytical reasoning, and scientific problem-solving skills.',
    icon: Award
  },
  {
    id: 'srv-3',
    title: 'Hostel & Semi-Residential Counseling',
    duration: '30 Mins',
    fee: 'Parent Orientation',
    badge: 'Boarding Wing',
    desc: 'Orientation for outstation parents regarding safe boarding wings, nutritious dining schedule, and evening study supervision.',
    icon: Building2
  },
  {
    id: 'srv-4',
    title: 'Navodaya & Sainik School Entrance Guidance',
    duration: '45 Mins',
    fee: 'Exam Strategy',
    badge: 'National Exams',
    desc: 'Specialized strategy consultation and mock reasoning tests for admission into premier government national schools.',
    icon: BookOpen
  }
];

// Rich Mock Data: 12 Categorized Campus Life Photos (High-Res Unsplash Mock Images)
const CAMPUS_GALLERY = [
  {
    id: 'gal-1',
    title: 'Apex Digi School (Main Flagship Campus)',
    category: 'Campuses',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-2',
    title: 'Apex Global Academy (West End Campus)',
    category: 'Campuses',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-3',
    title: 'Apex Senior Secondary School (North Campus)',
    category: 'Campuses',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-4',
    title: 'Apex Public School - Heritage Branch Opening June 2025',
    category: 'Campuses',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-5',
    title: 'Interactive Smart Panels & Digi Classrooms',
    category: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-6',
    title: 'Spacious Athletics & Multi-Sport Grounds',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-7',
    title: 'Secure Residential Hostels & Evening Study',
    category: 'Hostels',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-8',
    title: 'N.C.C Cadet Drills & Leadership Parade',
    category: 'Activities',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-9',
    title: 'Routine Doctor Healthcare Evaluations',
    category: 'Activities',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-10',
    title: 'Clean Dining Hall & Fresh Nutritious Meals',
    category: 'Hostels',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-11',
    title: 'Faculty Pedagogical Training (FDP Sessions)',
    category: 'Activities',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-12',
    title: 'Hands-on Robotics & AI STEM Programming Lab',
    category: 'Classrooms',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80'
  }
];

// Default Mock Data for Admission Application
const DEFAULT_MOCK_ADMISSION = {
  studentName: 'Master Aryan Reddy',
  parentName: 'Srinivas Reddy',
  phone: '+91 98765 43210',
  email: 'srinivas.reddy@gmail.com',
  classGrade: 'Class 6 (IIT-NEET Foundation)',
  preferredCampus: 'Apex Digi School (Main Campus)',
  accommodationType: 'Day Scholar',
  city: 'Warangal',
  message: 'Seeking 2025-26 academic year admission with IIT-NEET foundation coaching.'
};

export default function EducationMiniWebsiteView({
  profile,
  trackAction,
  getCleanWhatsAppNumber,
  getEmbedUrl,
  viewMode = 'website',
  setViewMode,
  showViewToggle = false
}: EducationMiniWebsiteViewProps) {

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [kothagudemSlide, setKothagudemSlide] = useState(0);

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Campuses' | 'Classrooms' | 'Sports' | 'Hostels' | 'Activities'>('All');

  // Active Interactive Modals
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [rulesActiveTab, setRulesActiveTab] = useState<'students' | 'parents' | 'teachers'>('students');
  const [isHostelScheduleModalOpen, setIsHostelScheduleModalOpen] = useState(false);
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Mobile menu dropdowns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);

  // In-window inline video playing state
  const [inlineVideoPlaying, setInlineVideoPlaying] = useState(false);

  // Admission Form State - Initialized with realistic mock data
  const [admissionForm, setAdmissionForm] = useState(DEFAULT_MOCK_ADMISSION);
  const [admissionSuccess, setAdmissionSuccess] = useState(false);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // School official phone & clean whatsapp
  const schoolPhone = profile.phone || '+91 98765 43210';
  const schoolEmail = profile.email || 'admissions@apexschools.edu.in';
  const cleanWa = getCleanWhatsAppNumber ? getCleanWhatsAppNumber(profile) : '919876543210';

  // Auto-rotate Hero MetaSlider every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admissionForm.studentName || !admissionForm.phone) {
      alert('Please fill in student name and contact phone number.');
      return;
    }

    try {
      if (trackAction) trackAction('admission_lead_submit');
      const existing = JSON.parse(localStorage.getItem('oneclickbiz_user_leads') || '[]');
      localStorage.setItem('oneclickbiz_user_leads', JSON.stringify([{
        id: `lead_${Date.now()}`,
        ...admissionForm,
        date: new Date().toISOString()
      }, ...existing]));
    } catch { }

    setAdmissionSuccess(true);

    const schoolGroupName = profile.name || profile.company || 'Apex Global Group of Schools';
    const message = encodeURIComponent(
      `*🎓 New Admission Application - ${schoolGroupName}*\n\n` +
      `👤 *Student Name:* ${admissionForm.studentName}\n` +
      `👨‍👩‍👧 *Parent Name:* ${admissionForm.parentName}\n` +
      `📞 *Phone:* ${admissionForm.phone}\n` +
      `📧 *Email:* ${admissionForm.email || 'N/A'}\n` +
      `📚 *Class Applying For:* ${admissionForm.classGrade}\n` +
      `🏫 *Preferred Campus:* ${admissionForm.preferredCampus}\n` +
      `🏠 *Boarding / Day Scholar:* ${admissionForm.accommodationType}\n` +
      `📍 *City:* ${admissionForm.city}\n\n` +
      `Please provide entrance exam schedule, syllabus, and fee details. Thank you!`
    );

    window.open(`https://wa.me/${cleanWa}?text=${message}`, '_blank');

    setTimeout(() => {
      setAdmissionSuccess(false);
      setIsAdmissionModalOpen(false);
    }, 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 3000);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setBranchesDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#333333] font-sans selection:bg-[#a90707] selection:text-white">

      {/* ============================================================== */}
      {/* 1. TOP MAROON CONTACT STRIP                                    */}
      {/* ============================================================== */}
      <div className="w-full bg-[#a90707] text-white text-[13px] py-2 px-4 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">

          {/* Social links (Left on desktop) */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 font-medium hidden sm:inline">Follow us:</span>
            <div className="flex items-center gap-2 text-white/90">
              <a href="https://www.facebook.com/apexschools" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition" title="Facebook">
                <span className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold">f</span>
              </a>
              <a href="https://www.instagram.com/apex_global_schools/" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition" title="Instagram">
                <span className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold">ig</span>
              </a>
              <a href="https://www.youtube.com/@apex_global_schools" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition" title="YouTube">
                <span className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold">yt</span>
              </a>
            </div>
            <span className="text-white/40 hidden md:inline">|</span>
            <span className="text-amber-200 font-semibold text-xs hidden lg:inline">
              SSC, CBSE &amp; ICSE Integrated Syllabus • IIT &amp; NEET Foundation
            </span>
          </div>

          {/* Email & Phone Contact (Right) */}
          <div className="flex items-center gap-4 text-xs font-semibold ml-auto sm:ml-0">
            <a href={`mailto:${schoolEmail}`} className="flex items-center gap-1.5 hover:text-amber-300 transition">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">{schoolEmail}</span>
            </a>
            <span className="text-white/40">|</span>
            <a href={`tel:${schoolPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-1.5 hover:text-amber-300 transition font-bold">
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{schoolPhone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MAIN HEADER & NAVBAR                                        */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Logo & School Name */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f2b5c] to-[#a90707] flex items-center justify-center text-white shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-extrabold text-[#0f2b5c] tracking-tight leading-tight group-hover:text-[#a90707] transition-colors">
                {profile.name || profile.company || 'Apex Global Group of Schools'}
              </span>
              <span className="block text-[11px] text-slate-500 font-semibold tracking-wide">
                Best Integrated Schools • SSC CBSE &amp; ICSE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden xl:flex items-center gap-6 text-[14px] font-semibold text-[#1d2a44]">
            <button onClick={() => scrollTo('hero')} className="hover:text-[#a90707] transition cursor-pointer text-[#a90707] font-bold">
              Home
            </button>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-[#a90707] transition cursor-pointer py-2"
                onClick={() => scrollTo('about')}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#a90707] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-52 bg-white rounded-lg shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button onClick={() => scrollTo('about')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">About School</button>
                <button onClick={() => scrollTo('academics')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Academics</button>
                <button onClick={() => scrollTo('curriculum')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Cirriculum</button>
                <button onClick={() => scrollTo('fdp')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Staff &amp; Faculty (FDP)</button>
                <button onClick={() => { setIsRulesModalOpen(true); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Rules and Regulations</button>
                <button onClick={() => { setIsHostelScheduleModalOpen(true); }} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Hostel Schedule</button>
              </div>
            </div>

            {/* Branches Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-[#a90707] transition cursor-pointer py-2"
                onClick={() => scrollTo('campuses')}
              >
                <span>Branches</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#a90707] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button onClick={() => scrollTo('campuses')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Apex Digi School (Narsampet Campus)</button>
                <button onClick={() => scrollTo('campuses')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Apex Global Academy (Maheshwaram Campus)</button>
                <button onClick={() => scrollTo('campuses')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Apex International High School (Mallampally Campus)</button>
                <button onClick={() => scrollTo('campuses')} className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#a90707]">Apex Senior Secondary School (Mahbubabad Campus)</button>
                <button onClick={() => scrollTo('kothagudem')} className="w-full text-left px-4 py-2 text-xs font-semibold text-[#a90707] hover:bg-red-50">Apex Public School (Heritage Branch)</button>
              </div>
            </div>

            <button onClick={() => scrollTo('facilities')} className="hover:text-[#a90707] transition cursor-pointer">Facilities</button>
            <button onClick={() => scrollTo('boarding')} className="hover:text-[#a90707] transition cursor-pointer">Boarding</button>
            <button onClick={() => scrollTo('testimonials')} className="hover:text-[#a90707] transition cursor-pointer">Testimonials</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#a90707] transition cursor-pointer">Contact</button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">

            {/* View Mode Toggle: Smart Card ↔ Website */}
            {showViewToggle && setViewMode && (
              <div className="hidden sm:flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setViewMode('website')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${viewMode === 'website' ? 'bg-[#0f2b5c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  title="Full School Website View"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${viewMode === 'mobile' ? 'bg-[#0f2b5c] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  title="Smart School Card View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>School Card</span>
                </button>
              </div>
            )}

            {/* Red Admissions CTA Button (Matching original Elementor button) */}
            <button
              onClick={() => setIsAdmissionModalOpen(true)}
              className="px-5 py-2.5 rounded-md bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
            >
              Admissions
            </button>

            {/* Contact / VCF Download */}
            <button
              onClick={() => downloadVcfFile(profile)}
              className="hidden lg:flex p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Save School Contact (.VCF)"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Share School Website"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            <button onClick={() => scrollTo('hero')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-bold text-slate-800">🏠 Home</button>
            <button onClick={() => scrollTo('about')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">📖 About Apex Global Group</button>
            <button onClick={() => scrollTo('kothagudem')} className="w-full text-left p-2.5 rounded-md hover:bg-red-50 font-bold text-[#a90707]">🌟 Heritage Branch Campus</button>
            <button onClick={() => scrollTo('campuses')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">🏫 5 School Campuses</button>
            <button onClick={() => scrollTo('curriculum')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">🎯 IIT-NEET &amp; STEM Curriculum</button>
            <button onClick={() => scrollTo('boarding')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">🛌 Boarding Facilities</button>
            <button onClick={() => scrollTo('facilities')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">🔬 21st Century Facilities</button>
            <button onClick={() => { setIsRulesModalOpen(true); setMobileMenuOpen(false); }} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">📋 Rules and Regulations</button>
            <button onClick={() => { setIsHostelScheduleModalOpen(true); setMobileMenuOpen(false); }} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">⏰ Hostel Schedule</button>
            <button onClick={() => scrollTo('testimonials')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">💬 Parent Testimonials</button>
            <button onClick={() => scrollTo('contact')} className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 font-semibold text-slate-700">📞 Contact &amp; Location</button>

            {showViewToggle && setViewMode && (
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Toggle View:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setViewMode('website'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded text-xs font-bold ${viewMode === 'website' ? 'bg-[#0f2b5c] text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Website
                  </button>
                  <button
                    onClick={() => { setViewMode('mobile'); setMobileMenuOpen(false); }}
                    className={`px-3 py-1 rounded text-xs font-bold ${viewMode === 'mobile' ? 'bg-[#0f2b5c] text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    Card
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 3. METASLIDER HERO SECTION (Pixel-Perfect Clone)              */}
      {/* ============================================================== */}
      <section id="hero" className="relative w-full bg-slate-900 overflow-hidden">
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[640px]">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.src = slide.fallback;
                }}
              />
              {/* Authentic MetaSlider Caption Wrap Bar at bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white py-3 sm:py-4 px-6 sm:px-10 flex items-center justify-between z-20">
                <div>
                  <h2 className="text-sm sm:text-lg md:text-xl font-bold tracking-wide">
                    {slide.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-amber-300 font-medium">
                    {slide.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsAdmissionModalOpen(true)}
                  className="hidden sm:inline-flex px-4 py-1.5 rounded bg-[#a90707] hover:bg-red-700 text-white text-xs font-bold uppercase transition"
                >
                  Admissions Open
                </button>
              </div>
            </div>
          ))}

          {/* Left Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all ${idx === currentSlide
                  ? 'w-6 h-2 bg-amber-400 rounded-full'
                  : 'w-2 h-2 bg-white/60 hover:bg-white rounded-full'
                  }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ABOUT APEX GLOBAL GROUP & CAMPUS VIDEO SECTION              */}
      {/* ============================================================== */}
      <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Heading, About text, and Rules List */}
          <div className="lg:col-span-6 space-y-4">
            <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
              About Apex Global Group of Schools
            </h6>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c] leading-tight">
              Excellence in Education: Apex Global Group of Schools
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Apex Global Group of Schools is renowned for delivering an exceptional educational experience, thus earning its repute as a premier group of benchmark institutions. It’s an institution where tradition meets innovation, providing a robust platform for student achievement. The school distinguishes itself with a curriculum that is as rigorous as it is relevant, offering a balance of strong academic subjects, creative arts, and sports. This blend ensures that every student receives an education tailored to their strengths, nurtures their curiosity, and prepares them for not only academic success but also for their roles as active, informed, and compassionate members of society.
            </p>

            {/* Rules and Regulations for Students Sub-Heading */}
            <div className="pt-2">
              <h5 className="text-sm font-bold text-[#0f2b5c] uppercase tracking-wide mb-3">
                RULES AND REGULATIONS FOR STUDENTS:
              </h5>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>No student under any circumstances shall be called out of the class room when the class is in progress for communicating messages or for meeting any visitor.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>Student should wear only decent and dignified dress and they should keep themselves and premises neat and tidy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>All the student in the campus should speak only in English.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>Semi Residential students should be punctual to the school. If they are late. They will not be allowed to the classes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>Irregularity in attending classes will not be tolerated minimum attendance of 90% is essential.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                  <span>Any Form of INDISCIPLINE OR MISS BEHAVIOR other Students are Staff will not be Tolerated</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Video Box with Play Button Overlay and 3 Overlapping Images */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 aspect-video group">
              {inlineVideoPlaying ? (
                <iframe
                  src="https://www.youtube.com/embed/XHOmBV4js_E?autoplay=1"
                  title="Apex Global Campus Tour"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => setInlineVideoPlaying(true)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                    alt="Apex Global Video Preview"
                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#a90707] hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 fill-white translate-x-0.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3 Overlapping School Life Photos */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80"
                  alt="School premises environment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80"
                  alt="Digital classrooms"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=400&q=80"
                  alt="Playground and athletic grounds"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. APEX PUBLIC SCHOOL : HERITAGE BRANCH CAMPUS           */}
      {/* ============================================================== */}
      <section id="kothagudem" className="py-14 px-4 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Schoolgirl Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                  alt="Premier school student in uniform"
                  className="w-full h-auto object-cover"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            </div>

            {/* Right: Announcement & Admissions */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c]">
                Apex Public School : Heritage Branch Campus
              </h2>

              <div className="space-y-1.5 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <p className="font-extrabold text-[#a90707] text-sm">
                  Opening on: 10th June 2025
                </p>
                <p className="flex items-start gap-1 font-medium text-slate-700">
                  <span>📍</span>
                  <span><strong>Address:</strong> Apex Heritage Campus, Central Knowledge Enclave, Education Hub, Telangana 506001</span>
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Apex Public School, a flagship campus of the esteemed <strong>Apex Global Group of Schools</strong>, provides students with state-of-the-art facilities at the premier <strong>Heritage Branch Campus</strong>. Located at the landmark <strong>Central Knowledge Enclave</strong>, this campus is designed to deliver <strong>world-class education</strong> blended with values, innovation, and academic distinction.
              </p>

              <div>
                <button
                  onClick={() => {
                    setAdmissionForm(prev => ({ ...prev, preferredCampus: 'Apex Public School (Heritage Branch)' }));
                    setIsAdmissionModalOpen(true);
                  }}
                  className="px-6 py-3 rounded-md bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wide shadow transition cursor-pointer"
                >
                  Admissions Open for 2025-26
                </button>
              </div>
            </div>
          </div>

          {/* Sub-Row: Video + 3 Image Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">

            {/* Left: Video */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-black aspect-video flex items-center justify-center">
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                controls
                preload="metadata"
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Right: 3-Image Carousel */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white aspect-video relative group">
                <img
                  src={[
                    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
                  ][kothagudemSlide]}
                  alt="Kothagudem Campus Feature"
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Carousel Controls */}
                <button
                  onClick={() => setKothagudemSlide((prev) => (prev - 1 + 3) % 3)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setKothagudemSlide((prev) => (prev + 1) % 3)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <button
                      key={i}
                      onClick={() => setKothagudemSlide(i)}
                      className={`w-2 h-2 rounded-full transition ${kothagudemSlide === i ? 'bg-[#a90707] w-5' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-2 text-center text-xs font-semibold text-slate-500">
                Robotics &amp; AI Innovation Lab • Modern Classrooms • Old Kothagudem
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. OUR ADMISSIONS & CAMPUS HIGHLIGHTS                          */}
      {/* ============================================================== */}
      <section id="admissions" className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Admissions Process & Rules */}
          <div className="lg:col-span-6 space-y-4">
            <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
              Our Admissions
            </h6>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] leading-tight">
              Admissions for Group of Schools are Open.
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              The admission procedure for every academic year commences in the final week of March. Admissions of classes Nursery to X will be granted on the basics of Performance in the Entrance Exam.
            </p>

            <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc">
              <li>The main purpose of conducting entrance exam is to judge the Students Ability, Skills, Knowledge Etc.</li>
              <li>Student is Tested in the Entrance Exam.</li>
              <li>50% of the School Fee Must be paid at the Time of Admission And The Total School Fee The Month Of January Before Sankranthi Holidays.</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setIsAdmissionModalOpen(true)}
                className="px-6 py-3 rounded-md bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wide shadow transition cursor-pointer"
              >
                School Admissions
              </button>
            </div>
          </div>

          {/* Right Column: Featured Campus Card & 3 Sub-Branches */}
          <div className="lg:col-span-6 space-y-4">

            {/* Big Featured: Global Digi School Narsampet */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
              <div className="h-56 sm:h-64 w-full">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                  alt="Global Digi School Narsampet"
                  className="w-full h-full object-cover"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="p-4 bg-white text-center">
                <h3 className="text-lg font-bold text-[#0f2b5c]">
                  Global Digi School - Narsampet
                </h3>
              </div>
            </div>

            {/* 3 Sub-Campus Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white text-center p-2 space-y-1">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=300&q=80"
                  alt="Mahbubabad"
                  className="w-full h-20 object-cover rounded"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <p className="text-xs font-bold text-[#0f2b5c]">Mahububabad</p>
                <p className="text-[10px] text-slate-500 font-medium">Apex Senior Secondary School</p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white text-center p-2 space-y-1">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80"
                  alt="Maheshwaram"
                  className="w-full h-20 object-cover rounded"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <p className="text-xs font-bold text-[#0f2b5c]">Maheshwaram</p>
                <p className="text-[10px] text-slate-500 font-medium">Apex Global Academy</p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-white text-center p-2 space-y-1">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80"
                  alt="Mallampally Rd"
                  className="w-full h-20 object-cover rounded"
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                <p className="text-xs font-bold text-[#0f2b5c]">Mallampally Rd</p>
                <p className="text-[10px] text-slate-500 font-medium">Apex International High School</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6B. ACADEMIC WINGS, CURRICULUM & FEE STRUCTURE (MOCK DATA)    */}
      {/* ============================================================== */}
      <section id="academics" className="py-16 px-4 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
              Academic Programs &amp; Fee Structure
            </h6>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c]">
              Comprehensive Wings from Nursery to Class 10
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Integrated SSC, CBSE &amp; ICSE curriculum blended with specialized IIT-JEE &amp; NEET Foundation coaching, digital smartboards, and robotics laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_WINGS.map((wing) => (
              <div
                key={wing.id}
                className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Wing Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={wing.image}
                    alt={wing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = wing.fallback;
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0f2b5c]/90 backdrop-blur-xs text-white text-[11px] font-bold">
                    {wing.badge}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#a90707] text-white text-[11px] font-bold shadow-xs">
                    {wing.fee}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                      {wing.ageGroup}
                    </span>
                    <h3 className="text-base font-bold text-[#0f2b5c] group-hover:text-[#a90707] transition-colors leading-snug">
                      {wing.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {wing.desc}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-slate-100">
                      {wing.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setAdmissionForm(prev => ({
                          ...prev,
                          classGrade: wing.gradeParam
                        }));
                        setIsAdmissionModalOpen(true);
                      }}
                      className="w-full py-2.5 rounded-lg bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wider transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply for Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6C. ADMISSIONS COUNSELING & DIAGNOSTIC SERVICES (MOCK DATA)   */}
      {/* ============================================================== */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
            Parent Guidance Desk
          </h6>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c]">
            Book a Free Academic Counseling Session
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Speak directly with our academic coordinators to understand curriculum pathways, entrance assessments, and campus hostel accommodations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COUNSELING_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#a90707] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0f2b5c] leading-snug group-hover:text-[#a90707] transition-colors">
                    {srv.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{srv.duration}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{srv.fee}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hello ${profile.name || profile.company || 'Apex Global Group of Schools'}! I would like to book a *${srv.title}* (${srv.duration}). Please share available slots.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-[#0f2b5c] hover:bg-[#1a365d] text-white font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. JOIN US FULL-WIDTH CALLOUT BANNER                           */}
      {/* ============================================================== */}
      <section className="relative py-20 px-4 bg-[#0f2b5c] text-white text-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h6 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Join us
          </h6>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Creating 21st Century Professionals with 21st Century Skills.
          </h2>
          <div className="pt-2">
            <button
              onClick={() => setIsAdmissionModalOpen(true)}
              className="px-8 py-3.5 rounded-md bg-[#a90707] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. RULES AND REGULATIONS 3 INTERACTIVE CARDS                   */}
      {/* ============================================================== */}
      <section id="rules" className="py-16 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* For Students */}
            <div
              onClick={() => { setRulesActiveTab('students'); setIsRulesModalOpen(true); }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition text-center space-y-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#a90707] flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition-transform">
                🎓
              </div>
              <h3 className="text-lg font-bold text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                For Students
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rules and Regulations for Students at our Group of Schools. Click to view full student guidelines.
              </p>
              <span className="text-[11px] font-bold text-[#a90707] inline-flex items-center gap-1">
                View Student Code <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* For Parents */}
            <div
              onClick={() => { setRulesActiveTab('parents'); setIsRulesModalOpen(true); }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition text-center space-y-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0f2b5c] flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition-transform">
                👨‍👩‍👧
              </div>
              <h3 className="text-lg font-bold text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                For Parents
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rules and Regulations for Parents at our Group of Schools. Active involvement protocols and campus visits.
              </p>
              <span className="text-[11px] font-bold text-[#0f2b5c] inline-flex items-center gap-1">
                View Parent Guidelines <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* For Teachers */}
            <div
              onClick={() => { setRulesActiveTab('teachers'); setIsRulesModalOpen(true); }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition text-center space-y-3 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-lg font-bold text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                For Teachers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rules and Regulations for Teachers at our Group of Schools. Professional excellence and pedagogical ethics.
              </p>
              <span className="text-[11px] font-bold text-amber-700 inline-flex items-center gap-1">
                View Teacher Standards <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. BOARDING FACILITIES SECTION                                 */}
      {/* ============================================================== */}
      <section id="boarding" className="py-16 px-4 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c] uppercase tracking-wide">
            BOARDING FACILITIES
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            At <strong>{profile.name || profile.company || 'Apex Global Group of Schools'}</strong>, the boarding facilities are designed to provide students with a <strong>safe, comfortable, and nurturing environment</strong> where they can focus on academics, personal growth, and overall well-being. The school ensures that students experience a <strong>home away from home</strong> with modern amenities, structured routines.
          </p>
          <div>
            <button
              onClick={() => setIsHostelScheduleModalOpen(true)}
              className="px-5 py-2 rounded-md bg-[#0f2b5c] hover:bg-[#1a365d] text-white font-bold text-xs uppercase tracking-wide transition"
            >
              View Daily Hostel Schedule
            </button>
          </div>
        </div>

        {/* 6 Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOARDING_FACILITIES.map((facility) => (
            <div key={facility.id} className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition bg-white group flex flex-col">
              <div className="h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = facility.fallback;
                  }}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2 text-center">
                <h3 className="text-base font-bold text-[#0f2b5c]">
                  {facility.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. WHY CHOOSE APEX GLOBAL SCHOOLS: A SAGA OF SUCCESS          */}
      {/* ============================================================== */}
      <section id="curriculum" className="py-16 px-4 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
                Why Choose Apex Global Schools
              </h6>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c] leading-tight mt-1">
                &ldquo;A SAGA of SUCCESS Right from the year of Inception.&rdquo;
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                <strong>{profile.name || profile.company || 'Apex Global Group of Schools'}</strong>, is committed to <strong>academic excellence, character building, and holistic development.</strong>
              </p>
            </div>

            <div className="space-y-4">

              {/* Core Vision & Mission */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-[#a90707] flex items-center justify-center font-bold text-lg shrink-0">
                    🎯
                  </div>
                  <h3 className="text-sm font-bold text-[#0f2b5c]">
                    Our Core Vision and Mission
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-13">
                  To inspire, educate and enlighten every individual in a challenging environment of IIT &amp; NEET Advanced curriculum that shall be the Foundation to a future of opportunities and the stepping stone for success. Our Mission is to work tirelessly towards Nurturing and developing 21st century professionals, Athletes, Dynamic Leaders and Responsible Citizens.
                </p>
              </div>

              {/* Curriculum */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0f2b5c] flex items-center justify-center font-bold text-lg shrink-0">
                    🛡️
                  </div>
                  <h3 className="text-sm font-bold text-[#0f2b5c]">
                    Our Cirriculum (SSC &amp; ICSE Integrated - IIT &amp; NEET Foundation)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-13">
                  At APEX GLOBAL GROUP OF SCHOOLS, the curriculum is tailored with a Multi-Dimensional Child Centric Approach, which is both interactive and Pragmatic. Comprising a dynamic &amp; colorful potpourri of academics, Sports, performing arts, fine arts, our curriculum prepares kids for globalized challenges.
                </p>
              </div>

              {/* Time is the Best Gift */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shrink-0">
                    ⏱️
                  </div>
                  <h3 className="text-sm font-bold text-[#0f2b5c]">
                    TIME is the Best Gift a Child can get from His/Her Parent.
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-13">
                  When exam results seem to be the only insights into academic performance, APEX GLOBAL has introduced this innovative Holiday Homework concept to help parents understand progress and support their child. Behind every progressing child is an actively involved parent.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Why School Visuals */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80"
                alt="Why choose Apex Global Group of Schools"
                className="w-full h-auto object-cover"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                alt="Apex Global students"
                className="w-full h-auto object-cover"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. OUR 8 FACILITIES SECTION                                   */}
      {/* ============================================================== */}
      <section id="facilities" className="py-16 px-4 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
            Our Creative Activities to develop 21 Century skills
          </h6>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c]">
            Our Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Co-curricular activities enhance the learning experience of students and help them identify and develop their hidden talents. These bring personality development, intellectual and communication skills, and holistic growth.
          </p>
        </div>

        {/* 8 Facility Cards (4 per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITIES.map((facility) => {
            const IconComponent = facility.icon;
            return (
              <div
                key={facility.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#a90707] flex items-center justify-center group-hover:bg-[#a90707] group-hover:text-white transition-colors shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#0f2b5c] group-hover:text-[#a90707] transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setIsAdmissionModalOpen(true)}
                    className="text-xs font-bold text-[#a90707] hover:text-[#8b0000] inline-flex items-center gap-1 transition"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. FACULTY DEVELOPMENT PROGRAM (FDP) & STUDENT AIMS           */}
      {/* ============================================================== */}
      <section id="fdp" className="py-16 px-4 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: FDP Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="Faculty Development Program at Apex Global Schools"
                className="w-full h-auto object-cover"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>

          {/* Right: Description & 6 Student Aims */}
          <div className="lg:col-span-7 space-y-4">
            <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
              Specialized Programs
            </h6>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c]">
              Faculty Development Program (FDP)
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Empowering teachers is the key to enhance education. It is one of our greatest assets; teachers play an enormous role in the life of students. They have the ability to inspire, empower and foster an environment of self-confidence, passion, and nurturance.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-[#0f2b5c] uppercase tracking-wider mb-2.5">
                Our Aims for students:
              </h5>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Acquire literacy, numeracy, Creativity and communication skills.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Enjoy learning and develop desire to continue learning.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Develop ability for critical thinking &amp; logical judgment.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Appreciate and respect the dignity of work.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Be well mannered, respecting themselves, others &amp; the Environment.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">✓</span>
                  <span>Develop Individual talents.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 13. AUTHENTIC PARENT TESTIMONIALS                              */}
      {/* ============================================================== */}
      <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
            Testimonials
          </h6>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c]">
            What others say about &ldquo;Apex Global Schools&rdquo;
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80';
                    }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#0f2b5c]">{testimonial.name}</h3>
                    <p className="text-[11px] text-slate-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>Verified Parent</span>
                <span className="text-[#a90707]">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 14. VIDEO BANNER: LEARNING, FRIENDSHIP AND FUN                 */}
      {/* ============================================================== */}
      <section className="relative py-20 px-4 bg-slate-900 text-white text-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80')` }}
        />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Learning, friendship and fun for everyone.
          </h2>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setVideoModalUrl('https://www.youtube.com/embed/1MTkZPys7mU?autoplay=1')}
              className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#a90707] hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
              title="Play Video"
            >
              <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-30" />
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 14B. CAMPUS LIFE PHOTO GALLERY (12 CATEGORIZED PHOTOS)        */}
      {/* ============================================================== */}
      <section id="gallery" className="py-16 px-4 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h6 className="text-xs font-bold uppercase tracking-wider text-[#a90707]">
            Campus Life Showcase
          </h6>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f2b5c]">
            Interactive Campus Photo Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Take a visual tour across our vibrant classrooms, modern science laboratories, sports fields, residential wings, and student activities.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {(['All', 'Campuses', 'Classrooms', 'Sports', 'Hostels', 'Activities'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${galleryFilter === cat
                  ? 'bg-[#a90707] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CAMPUS_GALLERY.filter(item => galleryFilter === 'All' || item.category === galleryFilter).map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-lg transition group flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = item.fallback;
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0f2b5c]/85 text-white backdrop-blur-xs">
                  {item.category}
                </div>
              </div>
              <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                <p className="text-xs font-bold text-[#0f2b5c] leading-snug group-hover:text-[#a90707] transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 15. HAVE ANY QUESTIONS? ACTION DESK                            */}
      {/* ============================================================== */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b5c]">
              Have any questions?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Have any questions about Admission Process, Branches or Facilities?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Parent Support */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0f2b5c] flex items-center justify-center mx-auto text-xl font-bold">
                🎧
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0f2b5c]">Parent Support</h3>
                <p className="text-xs text-slate-500 mt-1">Chat directly with school admission counselors on WhatsApp</p>
              </div>
              <div>
                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hello ${profile.name || profile.company || 'Apex Global Group of Schools'}! I have a few questions regarding admissions and curriculum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 rounded-md bg-[#0f2b5c] hover:bg-[#1a365d] text-white font-bold text-xs uppercase tracking-wide transition shadow"
                >
                  Ask Questions
                </a>
              </div>
            </div>

            {/* Call Center */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-50 text-[#a90707] flex items-center justify-center mx-auto text-xl font-bold">
                📞
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0f2b5c]">Call Center</h3>
                <p className="text-xs text-slate-500 mt-1">Speak directly with our centralized school admission office</p>
              </div>
              <div>
                <a
                  href={`tel:${schoolPhone.replace(/[^\d+]/g, '')}`}
                  className="inline-block px-6 py-2.5 rounded-md bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wide transition shadow"
                >
                  Call Us: {schoolPhone}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 16. NEWSLETTER SUBSCRIPTION STRIP                              */}
      {/* ============================================================== */}
      <section className="py-12 px-4 bg-[#0f2b5c] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          <div className="lg:col-span-6 space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              Signup our newsletter to get update info, news and school activities
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-md bg-white text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-slate-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-[#a90707] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shrink-0 cursor-pointer"
              >
                {newsletterSuccess ? 'Subscribed!' : 'Sign Up'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 17. OFFICIAL 4-COLUMN FOOTER                                   */}
      {/* ============================================================== */}
      <footer id="contact" className="bg-[#0b1b3d] text-slate-300 text-xs pt-16 pb-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Col 1: Logo & About School */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f2b5c] to-[#a90707] flex items-center justify-center text-white shadow-md border-2 border-amber-400 flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{profile.name || profile.company || 'Apex Global Schools'}</h4>
                  <p className="text-[11px] text-slate-400">Excellence in Education</p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Apex Global Group of Schools delivers premier SSC, CBSE and ICSE integrated syllabus with top national ranks and holistic student development.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#a90707] text-white flex items-center justify-center transition font-bold">f</a>
                <a href="https://www.instagram.com/apex_global_schools/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#a90707] text-white flex items-center justify-center transition font-bold">ig</a>
                <a href="https://www.youtube.com/@apex_global_schools" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-[#a90707] text-white flex items-center justify-center transition font-bold">yt</a>
              </div>
            </div>

            {/* Col 2: About School */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                About School
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo('about')} className="hover:text-amber-400 transition cursor-pointer">About Us</button></li>
                <li><button onClick={() => scrollTo('fdp')} className="hover:text-amber-400 transition cursor-pointer">Staff &amp; Faculty</button></li>
                <li><button onClick={() => scrollTo('campuses')} className="hover:text-amber-400 transition cursor-pointer">Branches</button></li>
                <li><button onClick={() => scrollTo('curriculum')} className="hover:text-amber-400 transition cursor-pointer">Cirriculum</button></li>
                <li><button onClick={() => scrollTo('facilities')} className="hover:text-amber-400 transition cursor-pointer">News &amp; Article</button></li>
              </ul>
            </div>

            {/* Col 3: Important Links */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                Important Links
              </h5>
              <ul className="space-y-2">
                <li><button onClick={() => setIsAdmissionModalOpen(true)} className="hover:text-amber-400 transition cursor-pointer">Admissions 2026-27</button></li>
                <li><button onClick={() => scrollTo('hero')} className="hover:text-amber-400 transition cursor-pointer">Achievements</button></li>
                <li><button onClick={() => setIsHostelScheduleModalOpen(true)} className="hover:text-amber-400 transition cursor-pointer">Hostel Schedule</button></li>
                <li><button onClick={() => setIsRulesModalOpen(true)} className="hover:text-amber-400 transition cursor-pointer">Rules and Regulations</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-amber-400 transition cursor-pointer">Contact Us</button></li>
              </ul>
            </div>

            {/* Col 4: Get in touch */}
            <div className="space-y-3">
              <h5 className="text-sm font-bold text-white uppercase tracking-wider">
                Get in touch
              </h5>
              <p className="text-slate-400">
                Looking for premier schooling for your child?
              </p>

              <div className="space-y-2 pt-1 text-slate-300">
                <p>
                  <span className="block text-slate-400 text-[11px] font-semibold">Email Us:</span>
                  <a href={`mailto:${schoolEmail}`} className="hover:text-amber-400 transition">{schoolEmail}</a>
                </p>
                <p>
                  <span className="block text-slate-400 text-[11px] font-semibold">Call Us:</span>
                  <a href={`tel:${schoolPhone.replace(/[^\d+]/g, '')}`} className="hover:text-amber-400 transition font-bold text-white">{schoolPhone}</a>
                </p>
                <p>
                  <span className="block text-slate-400 text-[11px] font-semibold">Main Campus Address:</span>
                  <span>Apex Knowledge Park, Education Corridor, Telangana 506001</span>
                </p>
              </div>
            </div>

          </div>

          {/* Sub-Footer Copyright Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <a href="#rules" onClick={(e) => { e.preventDefault(); setIsRulesModalOpen(true); }} className="hover:text-white transition">Terms of Service</a>
              <span>•</span>
              <a href="#rules" onClick={(e) => { e.preventDefault(); setIsRulesModalOpen(true); }} className="hover:text-white transition">Privacy Policy</a>
              <span>•</span>
              <a href="#rules" onClick={(e) => { e.preventDefault(); setIsRulesModalOpen(true); }} className="hover:text-white transition">Cookie Policy</a>
            </div>

            <p className="text-center sm:text-right">
              Copyright &copy; 2026 {profile.name || profile.company || 'Apex Global Group of Schools'}. All rights reserved. Powered by OneClickBiz.
            </p>
          </div>

        </div>
      </footer>

      {/* ============================================================== */}
      {/* MODAL 1: INTERACTIVE ADMISSIONS APPLICATION MODAL             */}
      {/* ============================================================== */}
      {isAdmissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative border border-slate-200">

            <button
              onClick={() => setIsAdmissionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#a90707] font-bold text-xs uppercase tracking-wide">
                <GraduationCap className="w-4 h-4" /> Academic Year 2026-27
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f2b5c]">
                Apply for School Admission
              </h3>
              <p className="text-xs text-slate-500">
                Submit this quick application to receive the entrance exam schedule and syllabus via WhatsApp.
              </p>
            </div>

            {admissionSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Redirecting to the Apex Global Admission Desk on WhatsApp with your pre-filled inquiry...
                </p>
              </div>
            ) : (
              <form onSubmit={handleAdmissionSubmit} className="space-y-3.5 text-xs">

                {/* Mock Data Quick Controls */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mock Data Controls:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdmissionForm(DEFAULT_MOCK_ADMISSION)}
                      className="px-2.5 py-1 rounded bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-[11px] shadow-xs transition cursor-pointer"
                    >
                      Fill Mock Data
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdmissionForm({
                        studentName: '',
                        parentName: '',
                        phone: '',
                        email: '',
                        classGrade: 'Class 1',
                        preferredCampus: 'Apex Digi School (Narsampet Campus)',
                        accommodationType: 'Day Scholar',
                        city: '',
                        message: ''
                      })}
                      className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-[11px] transition cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={admissionForm.studentName}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
                      placeholder="e.g. Master Aryan Reddy"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={admissionForm.parentName}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                      placeholder="e.g. Srinivas Reddy"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={admissionForm.phone}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={admissionForm.email}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                      placeholder="parent@email.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Grade / Class Applying For</label>
                    <select
                      value={admissionForm.classGrade}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, classGrade: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707] bg-white"
                    >
                      <option>Nursery / LKG / UKG</option>
                      <option>Class 1</option>
                      <option>Class 2</option>
                      <option>Class 3</option>
                      <option>Class 4</option>
                      <option>Class 5</option>
                      <option>Class 6 (IIT-NEET Foundation)</option>
                      <option>Class 7 (IIT-NEET Foundation)</option>
                      <option>Class 8 (IIT-NEET Advanced)</option>
                      <option>Class 9 (IIT-NEET Olympiad)</option>
                      <option>Class 10 (Board Exam Batch)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preferred Campus</label>
                    <select
                      value={admissionForm.preferredCampus}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, preferredCampus: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707] bg-white"
                    >
                      <option>Apex Digi School (Narsampet Campus)</option>
                      <option>Apex Global Academy (Maheshwaram Campus)</option>
                      <option>Apex International High School (Mallampally Campus)</option>
                      <option>Apex Senior Secondary School (Mahbubabad Campus)</option>
                      <option>Apex Public School (Heritage Branch)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Accommodation Type</label>
                    <select
                      value={admissionForm.accommodationType}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, accommodationType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707] bg-white"
                    >
                      <option>Day Scholar</option>
                      <option>Semi-Residential</option>
                      <option>Full Boarding / Hostel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City / Town</label>
                    <input
                      type="text"
                      value={admissionForm.city}
                      onChange={(e) => setAdmissionForm({ ...admissionForm, city: e.target.value })}
                      placeholder="e.g. Warangal / Kothagudem"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#a90707]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#a90707] hover:bg-[#8b0000] text-white font-bold text-xs uppercase tracking-wider shadow transition cursor-pointer"
                >
                  Submit &amp; Chat on WhatsApp
                </button>
              </form>
            )}

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
              📞 Or directly call the admission hotline: <a href={`tel:${schoolPhone.replace(/[^\d+]/g, '')}`} className="font-bold text-[#0f2b5c]">{schoolPhone}</a>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: OFFICIAL RULES & REGULATIONS POSTER & TABS           */}
      {/* ============================================================== */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">

            <button
              onClick={() => setIsRulesModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              aria-label="Close Rules Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-[#0f2b5c]">
                Rules and Regulations
              </h3>
              <p className="text-xs text-slate-500">
                Official Apex Global Group of Schools Discipline &amp; Conduct Code
              </p>
            </div>

            {/* Tab Switcher: Students / Parents / Teachers */}
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setRulesActiveTab('students')}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${rulesActiveTab === 'students' ? 'border-[#a90707] text-[#a90707]' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                For Students
              </button>
              <button
                onClick={() => setRulesActiveTab('parents')}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${rulesActiveTab === 'parents' ? 'border-[#a90707] text-[#a90707]' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                For Parents
              </button>
              <button
                onClick={() => setRulesActiveTab('teachers')}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${rulesActiveTab === 'teachers' ? 'border-[#a90707] text-[#a90707]' : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
              >
                For Teachers
              </button>
            </div>

            {/* Tab Contents */}
            {rulesActiveTab === 'students' && (
              <div className="space-y-3 text-xs text-slate-700 p-2">
                <div className="rounded-xl overflow-hidden border border-slate-200 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                    alt="Campus Rules and Guidelines"
                    className="w-full h-auto object-cover max-h-56"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <ul className="space-y-2 list-disc pl-4 leading-relaxed">
                  <li>No student under any circumstances shall be called out of the class room when the class is in progress for communicating messages or for meeting any visitor.</li>
                  <li>Student should wear only decent and dignified dress and they should keep themselves and premises neat and tidy.</li>
                  <li>All the student in the campus should speak only in English.</li>
                  <li>Semi Residential students should be punctual to the school. If they are late, they will not be allowed to the classes.</li>
                  <li>Irregularity in attending classes will not be tolerated; minimum attendance of 90% is essential.</li>
                  <li>Any form of indiscipline or misbehavior towards other students or staff will not be tolerated.</li>
                </ul>
              </div>
            )}

            {rulesActiveTab === 'parents' && (
              <div className="space-y-3 text-xs text-slate-700 p-2">
                <ul className="space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Parents are requested to monitor their child&apos;s daily diary and ensure regular completion of holiday homework.</li>
                  <li>Visiting hours to meet teachers and campus coordinators are on Saturdays between 2:00 PM – 4:30 PM.</li>
                  <li>No parent is permitted to enter classrooms directly while instructional sessions are active.</li>
                  <li>Fee installments must be cleared on schedule before Sankranthi holidays as specified during admission.</li>
                  <li>Immediate intimation must be provided to the hostel rector in case of medical leaves or planned absences.</li>
                </ul>
              </div>
            )}

            {rulesActiveTab === 'teachers' && (
              <div className="space-y-3 text-xs text-slate-700 p-2">
                <ul className="space-y-2.5 list-disc pl-4 leading-relaxed">
                  <li>Teachers must adhere to the standardized lesson plans approved under the Faculty Development Program (FDP).</li>
                  <li>Punctuality in classroom commencement and attendance logging is strictly mandatory.</li>
                  <li>Empowering students through encouragement and positive reinforcement is our core guiding principle.</li>
                  <li>Continuous student performance reports must be maintained and shared with parents regularly.</li>
                </ul>
              </div>
            )}

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="px-6 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
              >
                Close Guidelines
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: HOSTEL SCHEDULE POSTER & ROUTINE                     */}
      {/* ============================================================== */}
      {isHostelScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative text-center">

            <button
              onClick={() => setIsHostelScheduleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              aria-label="Close Hostel Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-extrabold text-[#0f2b5c]">
                Our Hostel Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Daily Routine &amp; Study Schedule for Residential Students
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm mx-auto">
              <img
                src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
                alt="Hostel Routine & Daily Schedule"
                className="w-full h-auto object-cover max-h-56"
                onError={(e: any) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 text-left space-y-1">
              <p>⏰ <strong>Morning:</strong> 5:30 AM Wake-up, Physical exercise / Yoga &amp; Breakfast</p>
              <p>📚 <strong>Day:</strong> 8:30 AM – 4:00 PM Core Academic &amp; Lab Sessions</p>
              <p>🏏 <strong>Evening:</strong> 4:30 PM – 5:30 PM Sports, Snacks &amp; Recreation</p>
              <p>📖 <strong>Night:</strong> 6:00 PM – 9:00 PM Supervised IIT-NEET Study Hours &amp; Dinner</p>
            </div>

            <button
              onClick={() => setIsHostelScheduleModalOpen(false)}
              className="px-6 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
            >
              Close Schedule
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: FULL-SCREEN POPUP VIDEO PLAYER                       */}
      {/* ============================================================== */}
      {videoModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white/20 hover:bg-white text-slate-900 transition"
              aria-label="Close Video"
            >
              <X className="w-5 h-5 text-white hover:text-black" />
            </button>
            <iframe
              src={videoModalUrl}
              title="Video Player"
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: SHARE MODAL                                          */}
      {/* ============================================================== */}
      {isShareModalOpen && (
        <ShareCardModal
          onClose={() => setIsShareModalOpen(false)}
          profile={profile}
        />
      )}

    </div>
  );
}
