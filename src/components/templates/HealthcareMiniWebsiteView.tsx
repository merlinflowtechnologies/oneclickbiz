'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Building,
  AlertCircle,
  FileText,
  Search,
  Check,
  ArrowRight,
  ExternalLink,
  Flame,
  UserCheck,
  Syringe,
  Cross,
  Microscope,
  Baby,
  Bone,
  Brain,
  Eye,
  Thermometer,
  ShieldAlert,
  Ambulance,
  Heart,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building2,
  Bed,
  Users
} from 'lucide-react';
import { DigitalProfile } from '@/lib/types';
import ShareCardModal from '@/components/common/ShareCardModal';
import { downloadVcfFile } from '@/lib/vcf';

// Clean SVG Brand Icons matching the design system
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.64 13.48 14.48 13.44 14.31 13.69C14.15 13.94 13.68 14.49 13.54 14.65C13.4 14.81 13.26 14.83 13.01 14.71C12.76 14.59 11.96 14.33 11.01 13.48C10.27 12.82 9.77 12 9.63 11.75C9.49 11.5 9.35 11.37 9.1 11.25C8.85 11.12 7.73 10.57 7.5 10.45C7.27 10.33 7.11 10.27 6.94 10.52C6.78 10.77 6.31 11.32 6.17 11.48C6.03 11.64 5.89 11.66 5.64 11.54C5.39 11.41 4.59 11.15 3.64 10.3C2.9 9.64 2.4 8.82 2.26 8.57C2.12 8.32 2.24 8.19 2.36 8.06C2.47 7.94 2.61 7.77 2.73 7.63C2.85 7.49 2.9 7.39 2.98 7.22C3.06 7.05 3.02 6.9 2.96 6.77C2.9 6.64 2.44 5.51 2.25 5.05C2.06 4.59 1.88 4.65 1.74 4.64C1.6 4.63 1.44 4.63 1.28 4.63C1.12 4.63 0.86 4.69 0.64 4.93C0.42 5.17 -0.19 5.76 -0.19 6.96C-0.19 8.16 0.69 9.31 0.81 9.47C0.93 9.63 2.53 12.1 4.97 13.16C5.55 13.41 6 13.57 6.35 13.68C6.93 13.86 7.46 13.83 7.88 13.77C8.35 13.7 9.32 13.18 9.52 12.61C9.72 12.04 9.72 11.55 9.66 11.45C9.6 11.35 9.44 11.29 9.19 11.17Z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HOSPITAL LANDING PAGE CURATED DATA
// ─────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Advanced Multi-Speciality Hospital & 24/7 Trauma Care',
    subtitle: 'NABH Accredited • Over 35,000+ Recovered Patients • Modular Laminar OTs & Level-1 Critical Care',
    badge: 'NABH ACCREDITED • LEVEL-1 EMERGENCY',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
    stat: '35,000+ Patients Healed'
  },
  {
    id: 2,
    title: 'Centre of Excellence in Cardiac Sciences',
    subtitle: '24/7 Emergency Cath Lab • Primary Angioplasty <60 Mins Door-to-Balloon • 99.4% Survival Outcome',
    badge: '24/7 EMERGENCY CATH LAB',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    stat: '99.4% Survival Rate'
  },
  {
    id: 3,
    title: 'Robotic Joint Replacement & Spine Care',
    subtitle: 'Sub-millimeter Precision Knee & Hip Implants • 48-Hour Rapid Mobility Discharge & Dedicated Rehab',
    badge: 'MINIMALLY INVASIVE ORTHO',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
    stat: '48-Hr Discharge Protocol'
  },
  {
    id: 4,
    title: 'Executive Preventive Full-Body Health Packages',
    subtitle: 'Over 80+ Vital Biomarkers, 2D Echo, Ultrasound & Senior Specialist Review starting from ₹999*',
    badge: 'SAME-DAY NABL DIGITAL REPORTS',
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80',
    stat: 'Within 6-Hr Digital Delivery'
  }
];

const SPECIALITIES = [
  {
    id: 'cardiology',
    title: 'Cardiology & Heart Institute',
    icon: HeartPulse,
    category: 'cardiology',
    chiefDoctor: 'Dr. Rajesh V. Sharma, MBBS, MD, DM',
    experience: '22+ Years Exp',
    description: 'Comprehensive non-invasive & interventional heart care with 24/7 primary angioplasty, pacemaker implantation, and cardiac intensive CCU.',
    conditions: ['Chest Pain & Angina', 'Hypertension & Lipid Disorders', 'Heart Failure & Arrhythmia', 'Post-Bypass Recovery'],
    procedures: ['Coronary Angiography', 'Emergency PTCA & Stenting', '2D Echo & Color Doppler', 'TMT & Holter ECG'],
    opdHours: 'Mon - Sat: 10:00 AM - 01:30 PM & 05:00 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'orthopaedics',
    title: 'Orthopaedics & Robotic Joint Replacement',
    icon: Bone,
    category: 'ortho',
    chiefDoctor: 'Dr. Vikramaditya Reddy, MS (Ortho), M.Ch',
    experience: '18+ Years Exp',
    description: 'Minimally invasive computer-assisted knee & hip joint replacement, arthroscopic ligament reconstruction, and 24/7 fracture trauma care.',
    conditions: ['Knee & Hip Osteoarthritis', 'ACL/PCL Ligament Tears', 'Disc Herniation & Sciatica', 'Complex Fractures'],
    procedures: ['Robotic Total Knee Replacement', 'Arthroscopic Shoulder & Knee Repair', 'Micro-Lumbar Spine Surgery', 'Plaster & Trauma Fixation'],
    opdHours: 'Mon - Sat: 10:30 AM - 02:00 PM & 05:30 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'neurology',
    title: 'Neurology & Brain Stroke Center',
    icon: Brain,
    category: 'neuro',
    chiefDoctor: 'Dr. Sunita Deshmukh, MD, DM (Neurology)',
    experience: '16+ Years Exp',
    description: 'Comprehensive diagnosis and treatment for acute stroke thrombolysis, epilepsy syndromes, Parkinson’s tremors, migraine, and neuropathy.',
    conditions: ['Acute Brain Stroke', 'Epilepsy & Seizures', 'Chronic Migraine', 'Parkinson’s Disease & Neuropathy'],
    procedures: ['Stroke Thrombolysis (Golden Hour)', 'Digital Video EEG', 'Electromyography (EMG/NCV)', 'Neuro-Rehab Support'],
    opdHours: 'Mon - Fri: 11:00 AM - 02:00 PM & 06:00 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gastroenterology',
    title: 'Gastroenterology & 4K Laparoscopy',
    icon: Activity,
    category: 'gastro',
    chiefDoctor: 'Dr. Pradeep Nair, MS, DNB (Surgical Gastro)',
    experience: '19+ Years Exp',
    description: 'Advanced painless diagnostic endoscopy, colonoscopy, and single-incision laparoscopic gallbladder, hernia, and appendix surgeries.',
    conditions: ['Gallstones & Biliary Colic', 'GERD & Acidity', 'Fatty Liver & Jaundice', 'Abdominal Hernias'],
    procedures: ['Laparoscopic Cholecystectomy', 'Diagnostic Endoscopy & Colonoscopy', 'Inguinal Hernia Mesh Repair', 'Haemorrhoid Laser Treatment'],
    opdHours: 'Mon - Sat: 10:00 AM - 01:00 PM & 05:00 PM - 07:30 PM',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'obstetrics',
    title: 'Obstetrics, Gynaecology & Maternity',
    icon: Baby,
    category: 'women-child',
    chiefDoctor: 'Dr. Sneha Kulkarni, MS, DNB (OBG)',
    experience: '15+ Years Exp',
    description: 'Holistic maternal care with painless normal delivery suites, high-risk obstetric monitoring, fertility workup, and laparoscopic gynaecological surgery.',
    conditions: ['High-Risk Pregnancy', 'PCOD & Hormonal Imbalance', 'Uterine Fibroids & Cysts', 'Infertility Evaluations'],
    procedures: ['Painless Delivery (Epidural)', 'Emergency & Planned LSCS', 'Laparoscopic Hysterectomy', 'Fetal Anomaly Ultrasound'],
    opdHours: 'Mon - Sat: 09:30 AM - 01:00 PM & 04:30 PM - 07:00 PM',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'paediatrics',
    title: 'Paediatrics & Level-III NICU',
    icon: Stethoscope,
    category: 'women-child',
    chiefDoctor: 'Dr. Arvind Swaminathan, MD (Paediatrics)',
    experience: '14+ Years Exp',
    description: 'Compassionate pediatric healthcare from infant immunization and growth monitoring to round-the-clock neonatal intensive care (NICU).',
    conditions: ['Neonatal Jaundice & Prematurity', 'Childhood Asthma & Allergies', 'Recurrent Viral Fevers', 'Developmental Delays'],
    procedures: ['Level-III Neonatal Intensive Care', 'Complete Immunization Schedule', 'Pediatric Phototherapy', 'Nebulization & Inhalation Bay'],
    opdHours: 'Mon - Sat: 10:00 AM - 02:00 PM & 05:00 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'general-medicine',
    title: 'Internal Medicine & Diabetology',
    icon: Microscope,
    category: 'general',
    chiefDoctor: 'Dr. Ananya Sen, MD (Internal Medicine)',
    experience: '17+ Years Exp',
    description: 'Comprehensive chronic disease management, fever triage, diabetes remission guidance, and personalized adult preventive wellness care.',
    conditions: ['Type 1 & 2 Diabetes Mellitus', 'Typhoid, Dengue & Viral Fevers', 'Thyroid & Endocrine Disorders', 'Geriatric Multisystem Care'],
    procedures: ['Continuous Glucose Monitoring (CGM)', 'Comprehensive Fever Triage Panel', 'Adult Vaccination & Immunization', 'Organ Protection Counseling'],
    opdHours: 'Mon - Sat: 09:00 AM - 01:30 PM & 05:00 PM - 08:30 PM',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  }
];

const KEY_PROCEDURES = [
  {
    id: 'p1',
    name: 'Robotic Total Knee Replacement',
    department: 'Orthopaedics',
    recovery: '48-Hour Mobility Discharge',
    tag: 'Minimally Invasive',
    price: '₹1,65,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'Sub-millimeter computer navigation implant positioning with minimal tissue disruption and accelerated same-week walking mobility.'
  },
  {
    id: 'p2',
    name: 'Coronary Angioplasty & Stenting (PTCA)',
    department: 'Cardiology',
    recovery: '24-48 Hours Stay',
    tag: 'Emergency Cath Lab',
    price: '₹1,20,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'Radial artery route primary angioplasty with fourth-generation drug-eluting stents (DES) and intravascular ultrasound (IVUS) precision.'
  },
  {
    id: 'p3',
    name: '4K Laparoscopic Gallbladder Removal',
    department: 'Gastroenterology',
    recovery: 'Day-Care (24 Hours)',
    tag: 'Single Day Admission',
    price: '₹45,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'High-definition 4K optical keyhole removal of gallstones and inflamed gallbladder with minimal scars and zero muscle cutting.'
  },
  {
    id: 'p4',
    name: 'Micro-Lumbar Spine Discectomy',
    department: 'Neuro & Spine',
    recovery: '3-5 Days Recovery',
    tag: 'Micro-Surgical',
    price: '₹95,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'Microscopic decompression of trapped nerve roots for instantaneous relief from severe sciatica, leg numbness, and slipped disc.'
  },
  {
    id: 'p5',
    name: 'Advanced Laser Cataract Surgery (Phaco)',
    department: 'Ophthalmology',
    recovery: 'Same-Day (15 Mins Procedure)',
    tag: 'Day Care',
    price: '₹22,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'Blade-free ultrasound phacoemulsification with foldable hydrophobic intraocular lens (IOL) and same-day crystal clear vision.'
  },
  {
    id: 'p6',
    name: 'Painless Delivery & Maternity Care',
    department: 'Obstetrics',
    recovery: '48-72 Hours Stay',
    tag: 'Mother & Baby Suite',
    price: '₹42,000*',
    insurance: '100% Cashless TPA Approved',
    desc: 'Round-the-clock obstetrician and anesthesiologist support with combined spinal-epidural analgesia in luxury private birthing suites.'
  }
];

const HEALTH_PACKAGES = [
  {
    id: 'pkg1',
    name: 'Basic Well-Being Health Screen',
    testsCount: '38 Vital Tests',
    originalPrice: '₹2,500',
    offerPrice: '₹999',
    discount: '60% OFF',
    time: '4 Hours Report',
    fasting: '10-12 Hours Fasting',
    popular: false,
    color: 'from-teal-600 to-emerald-600',
    highlights: [
      'Complete Blood Count (CBC - 24 Parameters)',
      'Fasting Blood Sugar (Glucose Fasting)',
      'Complete Urine Routine & Microscopy',
      'Lipid Profile (Total Cholesterol, HDL, LDL, Triglycerides)',
      'Serum Creatinine & Kidney Screen',
      'Senior Consultant Physician Review & Diet Advice'
    ]
  },
  {
    id: 'pkg2',
    name: 'Executive Cardiac & Diabetic Shield',
    testsCount: '65 Vital Tests',
    originalPrice: '₹6,000',
    offerPrice: '₹2,499',
    discount: '58% OFF',
    time: '6 Hours Report',
    fasting: '10-12 Hours Fasting',
    popular: true,
    color: 'from-teal-700 to-indigo-800',
    highlights: [
      'Everything in Basic Package Included',
      'HbA1c (3-Month Glycated Hemoglobin Average)',
      'Comprehensive Liver Function Test (LFT - 11 Tests)',
      'Kidney Function Test (KFT - Blood Urea & Creatinine)',
      'Resting 12-Lead Digital ECG',
      '2D Echocardiography or Computerized TMT Stress Test',
      'Chest X-Ray Digital (PA View)',
      'Senior Interventional Cardiologist 1-on-1 Consultation'
    ]
  },
  {
    id: 'pkg3',
    name: 'Master Senior Citizen Longevity Package',
    testsCount: '82 Comprehensive Tests',
    originalPrice: '₹9,500',
    offerPrice: '₹3,999',
    discount: '58% OFF',
    time: 'Same-Day Report',
    fasting: '10-12 Hours Fasting',
    popular: false,
    color: 'from-blue-700 to-slate-900',
    highlights: [
      'Everything in Executive Cardiac Package Included',
      'Ultrasound Whole Abdomen & Pelvis (USG)',
      'Bone Mineral Density (DEXA) Osteoporosis Screen',
      'Vitamin D3 & Vitamin B12 Quantitative Serum Levels',
      'Serum Electrolytes (Sodium, Potassium, Chloride)',
      'Thyroid Profile (Total T3, Total T4, Ultrasensitive TSH)',
      'PSA Prostate Screen (Men) / Pap Smear Screen (Women)',
      'Geriatrician & Clinical Nutritionist Consultation'
    ]
  },
  {
    id: 'pkg4',
    name: 'Well-Woman Comprehensive Preventive Shield',
    testsCount: '52 Dedicated Tests',
    originalPrice: '₹7,200',
    offerPrice: '₹2,999',
    discount: '58% OFF',
    time: '6 Hours Report',
    fasting: '10-12 Hours Fasting',
    popular: false,
    color: 'from-rose-600 to-pink-700',
    highlights: [
      'Complete Hemogram & Anaemia Screen',
      'Thyroid Profile & Reproductive Hormones (LH/FSH/Prolactin)',
      'Digital Mammography or Bilateral Breast Ultrasound',
      'Cervical Cancer Screening (Liquid-Based Pap Smear)',
      'Serum Calcium & Alkaline Phosphatase',
      'Pelvic Ultrasound (PCOD & Uterine Screen)',
      'Senior Lady Gynecologist Detailed Examination'
    ]
  }
];

const TPA_PARTNERS = [
  'Star Health & Allied Insurance',
  'Care Health Insurance (Religare)',
  'HDFC ERGO General Insurance',
  'Niva Bupa Health Insurance',
  'ICICI Lombard Health Care',
  'Bajaj Allianz General Insurance',
  'Tata AIG General Insurance',
  'SBI General Insurance',
  'Medi Assist TPA',
  'Vidal Health TPA',
  'Paramount Health TPA',
  'Family Health Plan (FHPL)',
  'Raksha TPA',
  'Heritage Health TPA',
  'MD India Health Insurance TPA'
];

const INFRASTRUCTURE_GALLERY = [
  {
    id: 1,
    title: 'Class 100 Modular Operation Theatres',
    category: 'Surgical Suites',
    subtitle: 'Equipped with HEPA Laminar air flow, 4K endoscopic towers, and computerized anaesthesia workstations.',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: '24-Bed Multi-Disciplinary ICU & CCU',
    category: 'Critical Care',
    subtitle: 'Round-the-clock intensivists, Hamilton ventilators, central hemodynamic monitors, and dialysis support.',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'NABL Certified Digital Diagnostic Labs',
    category: 'Diagnostics',
    subtitle: 'Automated clinical biochemistry, haematology, microbiology, and low-dose 128-Slice CT scanner.',
    img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    title: 'Deluxe Patient Suite & Attendant Lounge',
    category: 'Inpatient Rooms',
    subtitle: 'Air-conditioned sterile recovery room with electronic motorized bed, sofa-cum-bed, and dietary meal service.',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    title: 'Mobile Cardiac ICU Ambulance Fleet',
    category: 'Emergency Dispatch',
    subtitle: 'Advanced life-support (ALS) vehicles with transport ventilator, defibrillator, and live GPS telemetry.',
    img: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    title: 'Hospital Entrance & Cashless TPA Desk',
    category: 'Hospitality',
    subtitle: 'Dedicated 24/7 patient billing, insurance desk, wheelchair ramps, and comfortable waiting lounge.',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
  }
];

const HEALTH_ARTICLES = [
  {
    id: 1,
    title: 'Chest Pain vs Acidity: 5 Warning Signs You Must Never Ignore',
    category: 'Cardiac Wellness',
    readTime: '3 min read',
    excerpt: 'How to distinguish between harmless gastro-esophageal reflux and early acute myocardial infarction during the golden hour.',
    fullContent: 'Chest pain is the leading symptom of acute cardiac emergencies. If the discomfort radiates to the left shoulder, jaw, or back, is accompanied by cold sweating, unexplained breathlessness, or vomiting, treat it as an emergency and rush to our 24/7 Cath Lab immediately. Never attempt to treat unexplained pressure behind the breastbone with over-the-counter antacids alone.'
  },
  {
    id: 2,
    title: 'Managing HbA1c Under 6.5%: An Endocrinologist’s Blueprint',
    category: 'Diabetes Care',
    readTime: '4 min read',
    excerpt: 'Evidence-based strategies combining low-glycemic nutrition, resistance exercise, and organ-protective therapy for stable blood glucose.',
    fullContent: 'Reaching a healthy HbA1c is not about near-starvation; it is about consistent muscle glucose uptake and minimizing post-meal insulin spikes. Our executive diabetology clinic combines continuous glucose monitoring (CGM) with customized macro planning to preserve beta-cell function and protect your kidneys, retina, and coronary arteries from long-term microvascular damage.'
  },
  {
    id: 3,
    title: 'What to Expect Before and After Robotic Knee Replacement',
    category: 'Orthopaedic Rehab',
    readTime: '4 min read',
    excerpt: 'How sub-millimeter robotic precision eliminates manual alignment errors and gets patients walking without support in 48 hours.',
    fullContent: 'Modern robotic total knee arthroplasty (TKA) maps the unique three-dimensional geometry of your joint using CT data. By planning bone cuts with 0.5mm accuracy, our surgical team protects the surrounding collateral ligaments. As a result, patients experience significantly less post-operative swelling, start bedside walking within 24 hours, and return home in two days.'
  },
  {
    id: 4,
    title: 'Monsoon Viral Fever Alert: Dengue, Typhoid & Red Flag Symptoms',
    category: 'General Medicine',
    readTime: '3 min read',
    excerpt: 'Essential guidelines on platelet count monitoring, fluid hydration, and identifying the exact clinical stage when hospital admission is needed.',
    fullContent: 'During peak seasonal changes, viral fevers, dengue, and water-borne enteric infections surge. Routine paracetamol and high oral hydration with coconut water and ORS are foundational. However, persistent vomiting, severe abdominal pain, sudden drop in urine output, or mucosal bleeding are critical red flags requiring emergency inpatient monitoring and IV fluid resuscitation.'
  }
];

const FAQS = [
  {
    q: 'How do I book an OPD consultation or second opinion with a specialist doctor?',
    a: 'You can book directly by tapping "Book Appointment" or sending an instant request via our WhatsApp consultation desk. Our clinic coordinator will allocate your token number with an estimated arrival time slot, minimizing waiting room delays.'
  },
  {
    q: 'How does Cashless Mediclaim hospitalization work at Apex Hospital?',
    a: 'We are empanelled with over 45+ TPAs and health insurance providers, including Star Health, Care, HDFC ERGO, Niva Bupa, and ICICI Lombard. Simply carry your Insurance E-Card and Government photo ID (Aadhaar/PAN). Our dedicated 24/7 Cashless TPA Desk completes pre-authorization within 45-60 minutes, ensuring zero out-of-pocket hassle.'
  },
  {
    q: 'Are diagnostic laboratory and imaging test reports delivered online?',
    a: 'Yes. All routine blood investigations, biochemistry panels, ECG, and ultrasound reports are processed in our NABL-certified laboratory and delivered digitally directly to your WhatsApp and email within 4 to 6 hours of sample collection.'
  },
  {
    q: 'What are the visiting hours for inpatient wards and Intensive Care Units (ICU)?',
    a: 'General & Private Ward visiting hours are 11:00 AM to 01:00 PM and 05:00 PM to 07:30 PM daily. For the Intensive Care Unit (ICU/CCU), one designated family attendant may visit from 12:00 PM to 01:00 PM and 06:00 PM to 07:00 PM to maintain strict sterile infection-control standards.'
  },
  {
    q: 'Is emergency mobile ambulance pickup available across the city 24/7?',
    a: 'Yes. Our dedicated fleet of Advanced Life Support (ALS) mobile cardiac ambulances is equipped with transport ventilators, multipara monitors, oxygen cylinders, and emergency defibrillators. Call our 24/7 Emergency Hotline immediately for GPS-tracked dispatch.'
  },
  {
    q: 'What payment modes and medical treatment EMI financing options are accepted?',
    a: 'We accept all major Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and offer 0% interest medical loan EMI facilities through partner healthcare fintech providers for planned surgical procedures.'
  }
];

// ─────────────────────────────────────────────────────────────
// PROPS & MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

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
  // Modals & Navigation state
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isTpaModalOpen, setIsTpaModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedArticleModal, setSelectedArticleModal] = useState<typeof HEALTH_ARTICLES[0] | null>(null);
  const [selectedLightboxImg, setSelectedLightboxImg] = useState<typeof INFRASTRUCTURE_GALLERY[0] | null>(null);

  // Tabs & filters
  const [selectedSpecialtyTab, setSelectedSpecialtyTab] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [heroIndex, setHeroIndex] = useState(0);

  // Appointment Form
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    department: 'Cardiology & Heart Care',
    doctor: 'Dr. Rajesh V. Sharma (Chief Cardiologist)',
    consultationType: 'In-Hospital OPD Visit',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (10:00 AM - 01:30 PM)',
    symptoms: ''
  });

  // Emergency Ambulance Form
  const [ambulanceForm, setAmbulanceForm] = useState({
    patientName: '',
    phone: '',
    pickupLocation: '',
    emergencyType: 'Cardiac Emergency / Chest Pain',
    condition: ''
  });

  // Extract healthcare profile configuration
  const healthcareData = (profile.sectionData as any)?.healthcare || {};
  const degrees = healthcareData.degrees || 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA), FSCAI';
  const registrationNumber = healthcareData.regNumber || 'NMC / MCI Reg. No. 48291/TS';
  const experienceYears = healthcareData.experienceYears || '22+ Years Clinical Excellence';
  const hospitalAffiliation = healthcareData.hospitalAffiliation || healthcareData.hospitalName || profile.company || 'Apex Multi-Speciality Hospital & Heart Institute';
  const consultationFee = healthcareData.consultationFee || healthcareData.fee || '₹800';
  const opdTimings = healthcareData.opdTimings || 'Mon - Sat: 09:30 AM - 01:30 PM & 05:00 PM - 08:30 PM';
  const emergencyPhone = healthcareData.emergencyPhone || profile.phone || '+91 98765 43210';
  const ambulancePhone = healthcareData.ambulancePhone || emergencyPhone;

  const cleanPhone = (profile.phone || '9876543210').replace(/\D/g, '');
  const cleanWa = (getCleanWhatsAppNumber(profile) || cleanPhone).replace(/\D/g, '') || '919876543210';

  // Hero auto-slider timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Filter specialities
  const filteredSpecialities = useMemo(() => {
    if (selectedSpecialtyTab === 'all') return SPECIALITIES;
    return SPECIALITIES.filter((s) => s.category === selectedSpecialtyTab);
  }, [selectedSpecialtyTab]);

  // Handle appointment submission
  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('appointment_submit_healthcare');

    const msg =
      `*HOSPITAL OPD APPOINTMENT REQUEST* 🩺\n\n` +
      `*Hospital:* ${hospitalAffiliation}\n` +
      `*Doctor:* ${appointmentForm.doctor}\n` +
      `*Department:* ${appointmentForm.department}\n` +
      `*Consultation Type:* ${appointmentForm.consultationType}\n\n` +
      `*Patient Name:* ${appointmentForm.name}\n` +
      `*Phone Number:* ${appointmentForm.phone}\n` +
      `*Age / Gender:* ${appointmentForm.age} Yrs / ${appointmentForm.gender}\n` +
      `*Preferred Date:* ${appointmentForm.date}\n` +
      `*Time Slot:* ${appointmentForm.timeSlot}\n` +
      `*Chief Complaint / Symptoms:* ${appointmentForm.symptoms || 'Routine Specialist Consultation'}\n\n` +
      `Please confirm my clinic token number & arrival instructions.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsAppointmentModalOpen(false);
  };

  // Handle emergency ambulance request
  const handleAmbulanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('ambulance_request_healthcare');

    const msg =
      `🚨 *URGENT: 24/7 AMBULANCE DISPATCH REQUEST* 🚑\n\n` +
      `*Hospital:* ${hospitalAffiliation}\n` +
      `*Patient Name:* ${ambulanceForm.patientName}\n` +
      `*Contact Phone:* ${ambulanceForm.phone}\n` +
      `*Emergency Category:* ${ambulanceForm.emergencyType}\n` +
      `*Exact Pickup Location / Landmark:* ${ambulanceForm.pickupLocation}\n` +
      `*Current Patient Condition:* ${ambulanceForm.condition || 'Severe emergency requiring immediate ALS vehicle'}\n\n` +
      `Please dispatch the nearest Mobile ICU Cardiac Ambulance immediately.`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsEmergencyModalOpen(false);
  };

  // Quick book appointment with pre-filled department
  const openBookingForSpecialty = (deptName: string, doctorName: string) => {
    setAppointmentForm((prev) => ({
      ...prev,
      department: deptName,
      doctor: doctorName
    }));
    setIsAppointmentModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP EMERGENCY, TRAUMA & ACCREDITATION STRIP
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-teal-950 text-white px-3 sm:px-8 py-2 text-xs border-b border-teal-900/80 shadow-xs relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Accreditation & Medical Registration */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-extrabold uppercase tracking-wider text-teal-300 text-[11px] sm:text-xs">
              {registrationNumber}
            </span>
            <span className="text-teal-400/50 hidden md:inline">&bull;</span>
            <span className="hidden md:inline text-teal-100/80 text-[11px] font-medium">
              NABH &amp; NABL Accredited Center &bull; {experienceYears}
            </span>
          </div>

          {/* Right: Emergency Hotline & Quick Tools */}
          <div className="flex items-center gap-3 sm:gap-5 text-[11px] ml-auto sm:ml-0">
            <a
              href={`tel:${emergencyPhone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 hover:text-white hover:bg-rose-900 transition font-black"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>24/7 Trauma: {emergencyPhone}</span>
            </a>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1 text-teal-200 hover:text-white font-semibold transition cursor-pointer"
            >
              <Ambulance className="w-3.5 h-3.5 text-teal-300" />
              <span>Request Ambulance</span>
            </button>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-teal-200 hover:text-white transition cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>OPD QR</span>
            </button>

            <button
              onClick={() => downloadVcfFile(profile)}
              className="hidden sm:inline-flex items-center gap-1 text-teal-200 hover:text-white transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Contact</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1 text-teal-200 hover:text-white transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STICKY HOSPITAL & DOCTOR HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Hospital Brand & Doctor Credential */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl overflow-hidden border-2 border-teal-600 bg-teal-50 shadow-sm">
                <img
                  src={profile.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 leading-tight truncate">
                  {profile.name}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-extrabold uppercase">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  Verified Specialist
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold truncate max-w-[220px] sm:max-w-md">
                {degrees} &bull; {profile.designation || 'Chief Interventional Cardiologist'}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#specialities" className="hover:text-teal-700 transition">Specialities</a>
            <a href="#procedures" className="hover:text-teal-700 transition">Surgeries</a>
            <a href="#health-packages" className="hover:text-teal-700 transition">Health Packages</a>
            <a href="#cashless-tpa" className="hover:text-teal-700 transition">Cashless Mediclaim</a>
            <a href="#facilities" className="hover:text-teal-700 transition">Facilities</a>
            <a href="#reviews" className="hover:text-teal-700 transition">Reviews</a>
            <a href="#faqs" className="hover:text-teal-700 transition">FAQs</a>
          </nav>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {showViewToggle && setViewMode && (
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                    viewMode === 'website' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  💻 Hospital Website
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-full font-bold transition cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  📱 Medical Card
                </button>
              </div>
            )}

            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-teal-700/25 transition active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book OPD</span>
            </button>
          </div>

        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO HOSPITAL BANNER & CLINICAL BENCHMARKS
      ───────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-teal-950 via-teal-900 to-slate-900 text-white overflow-hidden border-b border-teal-800">
        
        {/* Background Image Carousel with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_SLIDES[heroIndex].img}
            alt={HERO_SLIDES[heroIndex].title}
            className="w-full h-full object-cover object-center opacity-25 filter blur-[0.5px] transition-all duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-950/90 to-teal-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16 space-y-8">
          
          {/* Top Trust Pill & Hospital Name */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-800/80 border border-teal-500/50 text-teal-200 text-xs font-bold shadow-md">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{hospitalAffiliation}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-extrabold">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>4.9 / 5.0 (1,850+ Google Patient Reviews)</span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-block px-3 py-1 rounded-md bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[11px] font-black uppercase tracking-wider">
              {HERO_SLIDES[heroIndex].badge}
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none text-white">
              {HERO_SLIDES[heroIndex].title}
            </h2>

            <p className="text-sm sm:text-base text-teal-100/90 max-w-2xl leading-relaxed">
              {HERO_SLIDES[heroIndex].subtitle}
            </p>

            {/* OPD Hours & Doctor Consultation Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-medium">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>OPD Hours: {opdTimings}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold">
                <Award className="w-4 h-4" />
                <span>Consultation Fee: {consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots & Chevrons */}
          <div className="flex items-center justify-between pt-2 border-t border-teal-800/60">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    heroIndex === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-teal-700 hover:bg-teal-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              HOSPITAL CLINICAL TRUST STATS COUNTER STRIP
          ───────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">35,000+</div>
              <div className="text-xs font-bold text-teal-200 uppercase mt-0.5">Patients Treated</div>
              <div className="text-[11px] text-teal-300/70 mt-0.5">Across All OPDs &amp; Surgeries</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">22+ Years</div>
              <div className="text-xs font-bold text-teal-200 uppercase mt-0.5">Clinical Leadership</div>
              <div className="text-[11px] text-teal-300/70 mt-0.5">Senior Multi-Specialist Team</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">99.4%</div>
              <div className="text-xs font-bold text-teal-200 uppercase mt-0.5">Recovery Success</div>
              <div className="text-[11px] text-teal-300/70 mt-0.5">Zero Surgical Site Infections</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">45+ TPAs</div>
              <div className="text-xs font-bold text-teal-200 uppercase mt-0.5">Cashless Mediclaim</div>
              <div className="text-[11px] text-teal-300/70 mt-0.5">Instant Pre-Auth Clearance</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. 9 SQUIRCLE QUICK ACTION ROW
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-5 w-max sm:w-auto mx-auto px-2">
              
              {/* 1. Call Reception */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/25 transition group-hover:scale-105">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Call Hospital</span>
              </a>

              {/* 2. Priority WhatsApp */}
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hello ${profile.name}, I am reaching out from your hospital digital profile.`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#25D366] hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 transition group-hover:scale-105">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">WhatsApp Desk</span>
              </a>

              {/* 3. Book OPD Appointment */}
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 transition group-hover:scale-105">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-tight">Book OPD</span>
              </button>

              {/* 4. 24/7 Emergency */}
              <a
                href={`tel:${emergencyPhone}`}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/25 transition group-hover:scale-105 animate-pulse">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-tight">24/7 Emergency</span>
              </a>

              {/* 5. Clinical Specialities */}
              <a
                href="#specialities"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 transition group-hover:scale-105">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Specialities</span>
              </a>

              {/* 6. Cashless Mediclaim */}
              <button
                onClick={() => setIsTpaModalOpen(true)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-600/25 transition group-hover:scale-105">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Cashless Desk</span>
              </button>

              {/* 7. Health Packages */}
              <a
                href="#health-packages"
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-600/25 transition group-hover:scale-105">
                  <Microscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Health Packages</span>
              </a>

              {/* 8. Hospital Navigation */}
              {profile.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Directions</span>
                </a>
              )}

              {/* 9. Save Contact (VCF) */}
              <button
                onClick={() => downloadVcfFile(profile)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg transition group-hover:scale-105">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Save VCF</span>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. 24/7 EMERGENCY & CRITICAL CARE ALERT STRIP
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-rose-50 border-y border-rose-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
              <Ambulance className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-rose-950">
                  24/7 Emergency, Golden-Hour Trauma &amp; Cardiac Critical Care
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-extrabold uppercase animate-pulse">
                  Active 24x7
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-800 font-medium">
                ALS Mobile ICU ambulances on standby with transport ventilators, blood bank reserve, and emergency Cath Lab team.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${emergencyPhone}`}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Dial 24/7 Emergency</span>
            </a>

            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-white hover:bg-rose-100 border border-rose-300 text-rose-900 font-extrabold text-xs sm:text-sm shadow-xs transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ambulance className="w-4 h-4 text-rose-600" />
              <span>Request Ambulance</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CENTRES OF CLINICAL EXCELLENCE (SPECIALITIES)
      ───────────────────────────────────────────────────────────── */}
      <section id="specialities" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
            <span>Centres of Clinical Excellence</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Medical Departments &amp; Specialized Care
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Led by senior specialists, gold-medalist consultants, and equipped with the latest diagnostic technology for fast, accurate treatment.
          </p>
        </div>

        {/* Speciality Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {[
            { id: 'all', label: 'All Specialities' },
            { id: 'cardiology', label: 'Cardiology' },
            { id: 'ortho', label: 'Orthopaedics' },
            { id: 'neuro', label: 'Neurology' },
            { id: 'gastro', label: 'Gastroenterology' },
            { id: 'women-child', label: 'Women & Child' },
            { id: 'general', label: 'General Medicine' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSpecialtyTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                selectedSpecialtyTab === tab.id
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Specialities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialities.map((spec) => {
            const IconComponent = spec.icon;
            return (
              <div
                key={spec.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Department Image & Badge */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={spec.image}
                      alt={spec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-teal-800 shadow-sm">
                      <IconComponent className="w-5 h-5 text-teal-700" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-600/90 text-white">
                        {spec.experience}
                      </span>
                      <h4 className="text-base font-black leading-tight mt-1">
                        {spec.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                        Dr
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900">{spec.chiefDoctor}</div>
                        <div className="text-[10px] text-slate-500 font-medium">Department Head &amp; Senior Consultant</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {spec.description}
                    </p>

                    {/* Key Procedures Tags */}
                    <div>
                      <div className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-2">
                        Common Procedures &amp; Diagnostics:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {spec.procedures.map((proc, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200/70 text-teal-800 text-[10px] font-bold"
                          >
                            {proc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* OPD Hours */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{spec.opdHours}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Dr. ${profile.name}, I want to inquire about ${spec.title} treatment and appointments.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 transition cursor-pointer"
                    title="Inquire on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  </a>

                  <button
                    onClick={() => openBookingForSpecialty(spec.title, spec.chiefDoctor)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book OPD Slot</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. KEY SURGERIES & ADVANCED PROCEDURES GRID
      ───────────────────────────────────────────────────────────── */}
      <section id="procedures" className="py-16 bg-white border-y border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              Surgical Excellence
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Advanced Surgeries &amp; Day-Care Procedures
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Zero-infection modular operation theatres, minimal surgical trauma, transparent package pricing, and 100% cashless TPA approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_PROCEDURES.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-emerald-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      {p.tag}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {p.department}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition">
                    {p.name}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Recovery: {p.recovery}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{p.insurance}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Estimated Cost</span>
                    <span className="text-base font-black text-slate-900">{p.price}</span>
                  </div>

                  <button
                    onClick={() => openBookingForSpecialty(p.department, `Surgery: ${p.name}`)}
                    className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs transition active:scale-95 cursor-pointer shadow-xs"
                  >
                    Inquire Surgery
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. PREVENTIVE HEALTH CHECKUP PACKAGES
      ───────────────────────────────────────────────────────────── */}
      <section id="health-packages" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
            Preventive Care
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprehensive Full-Body Health Checkup Packages
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            NABL accredited automated pathology, 2D Echo, Ultrasound, and senior doctor review delivered to your WhatsApp within 6 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl border transition-all flex flex-col justify-between overflow-hidden ${
                pkg.popular
                  ? 'bg-gradient-to-b from-teal-900 to-slate-900 text-white border-teal-500 shadow-xl ring-2 ring-emerald-400'
                  : 'bg-white text-slate-900 border-slate-200 shadow-xs hover:shadow-xl'
              }`}
            >
              <div className="p-6 space-y-4">
                
                {/* Package Header & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    pkg.popular ? 'bg-emerald-400 text-slate-950' : 'bg-teal-100 text-teal-800'
                  }`}>
                    {pkg.testsCount}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    pkg.popular ? 'bg-white/20 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {pkg.discount}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black leading-tight">
                    {pkg.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-black">{pkg.offerPrice}</span>
                    <span className={`text-xs line-through ${pkg.popular ? 'text-teal-200/60' : 'text-slate-400'}`}>
                      {pkg.originalPrice}
                    </span>
                  </div>
                </div>

                <div className={`text-[11px] font-semibold space-y-1 pt-2 border-t ${
                  pkg.popular ? 'border-white/10 text-teal-200' : 'border-slate-100 text-slate-500'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pkg.time} Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{pkg.fasting}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-2 space-y-2">
                  <div className={`text-[11px] font-black uppercase tracking-wider ${
                    pkg.popular ? 'text-teal-300' : 'text-slate-800'
                  }`}>
                    Included Tests:
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          pkg.popular ? 'text-emerald-400' : 'text-emerald-600'
                        }`} />
                        <span className={`leading-snug ${pkg.popular ? 'text-teal-100' : 'text-slate-600'}`}>
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 mt-4">
                <button
                  onClick={() => openBookingForSpecialty('Preventive Health Checkup', pkg.name)}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black'
                      : 'bg-teal-700 hover:bg-teal-600 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Package</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. CASHLESS MEDICLAIM & TPA TIE-UPS DESK
      ───────────────────────────────────────────────────────────── */}
      <section id="cashless-tpa" className="py-16 bg-gradient-to-b from-teal-950 to-slate-900 text-white border-y border-teal-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
              100% Cashless Hospitalization
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Empanelled with 45+ Health Insurance TPAs &amp; Corporate Networks
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/80">
              Zero stress admission. Our in-house TPA Helpdesk handles all paperwork, pre-authorization queries, and cashless settlements.
            </p>
          </div>

          {/* 3-Step Cashless Hospitalization Walkthrough */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg border border-emerald-400/30">
                1
              </div>
              <h4 className="text-base font-black text-white">Pre-Admission Submission</h4>
              <p className="text-xs text-teal-100/70 leading-relaxed">
                Present your Health Insurance E-Card, Doctor consultation note, and Government ID (Aadhaar/PAN) at our 24/7 TPA Desk.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg border border-emerald-400/30">
                2
              </div>
              <h4 className="text-base font-black text-white">Rapid 45-Min Pre-Auth Approval</h4>
              <p className="text-xs text-teal-100/70 leading-relaxed">
                Our insurance executive coordinates directly with your TPA to clear pre-authorization without unnecessary query delays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg border border-emerald-400/30">
                3
              </div>
              <h4 className="text-base font-black text-white">Zero-Hassle Cashless Discharge</h4>
              <p className="text-xs text-teal-100/70 leading-relaxed">
                Once medical treatment is complete, the final hospital bill is settled directly with your insurer. Focus only on healing.
              </p>
            </div>
          </div>

          {/* TPA Provider Badges */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="text-center text-xs font-black uppercase text-teal-300 tracking-wider">
              Empanelled Insurance Providers &amp; Third-Party Administrators (TPAs)
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {TPA_PARTNERS.map((tpa, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-bold hover:bg-white/20 transition cursor-default"
                >
                  {tpa}
                </span>
              ))}
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black">
                + Many More Private &amp; Govt Schemes
              </span>
            </div>

            <div className="pt-4 text-center">
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi TPA Desk, I want to check cashless insurance claim eligibility for my policy at ${hospitalAffiliation}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Check Your Policy Cashless Eligibility on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. HOSPITAL INFRASTRUCTURE & FACILITIES TOUR
      ───────────────────────────────────────────────────────────── */}
      <section id="facilities" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
            Hospital Infrastructure
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            World-Class Diagnostic &amp; Inpatient Facilities
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered for clinical safety, zero hospital-acquired infections, patient privacy, and round-the-clock comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INFRASTRUCTURE_GALLERY.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedLightboxImg(item)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-400 transition-all cursor-pointer group"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase">
                  {item.category}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h4 className="text-base font-black leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.subtitle}
                </p>
                <div className="mt-3 text-xs font-bold text-teal-700 flex items-center gap-1 group-hover:text-teal-800">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. CHIEF MEDICAL DIRECTOR & SENIOR DOCTOR PROFILE
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-teal-50 via-white to-emerald-50 border border-teal-200/80 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Doctor Portrait */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-teal-100">
                    <img
                      src={profile.avatarUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 right-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black shadow-md flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NMC Verified</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-bold text-teal-700 mt-0.5">
                    {degrees}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    {registrationNumber}
                  </p>
                </div>
              </div>

              {/* Doctor Credentials & Philosophy */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase">
                  <Award className="w-3.5 h-3.5" />
                  <span>Clinical Director's Ethical Oath</span>
                </div>

                <h4 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  "Patient-First Medicine: Precise non-invasive diagnostics and ethical care before recommending surgery."
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {profile.bio || `Dr. ${profile.name} brings over ${experienceYears} of clinical mastery in diagnosing and managing complex medical conditions. Having trained and operated at premier institutes in India and abroad, his philosophy centers on transparent clinical recommendations, zero unneeded investigations, and empathetic family counseling.`}
                </p>

                {/* Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs">
                    <div className="text-xs font-black text-slate-900">Gold Medalist</div>
                    <div className="text-[10px] text-slate-500">Cardiology &amp; Medicine</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs">
                    <div className="text-xs font-black text-slate-900">FACC (USA) Fellow</div>
                    <div className="text-[10px] text-slate-500">American College of Cardiology</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-teal-200/80 shadow-xs">
                    <div className="text-xs font-black text-slate-900">12,000+ Angiographies</div>
                    <div className="text-[10px] text-slate-500">99.4% Radial Artery Success</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-teal-700/25 transition active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book 1-on-1 Consultation</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Dr. ${profile.name}, I would like to consult with you.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Doctor's Desk</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. PATIENT RECOVERY STORIES & TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
            <span>Verified Patient Outcomes</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real Stories of Healing &amp; Recovery
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Read what our recovered patients and their families have to say about our compassionate care, rapid emergency revival, and painless procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(profile.sectionData?.testimonials?.items?.length ? profile.sectionData.testimonials.items : [
            {
              id: 't1',
              clientName: 'Suresh Narayana, 56',
              clientRole: 'Emergency Angioplasty Patient, Hyderabad',
              content: 'When I suffered acute chest pain at midnight, Dr. Rajesh Sharma and the Apex Emergency team rushed me directly to the Cath Lab. The angioplasty was completed in 40 minutes flat. His calm reassurance saved my life!',
              rating: 5,
              clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            },
            {
              id: 't2',
              clientName: 'Kavitha R. Reddy, 48',
              clientRole: 'Robotic Knee Replacement, Secunderabad',
              content: 'I had been suffering with crippling osteoarthritis for 6 years. Dr. Vikramaditya Reddy performed bilateral robotic knee replacement at Apex. I was walking without support on day two! The nursing care was world-class.',
              rating: 5,
              clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
            },
            {
              id: 't3',
              clientName: 'Deepak & Sneha Agarwal',
              clientRole: 'High-Risk Twin Delivery Parents',
              content: 'Our twin pregnancy had severe complications. Dr. Sneha Kulkarni monitored us every week and delivered both babies safely. The Level-III NICU care for our newborns gave us complete peace of mind.',
              rating: 5,
              clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            },
            {
              id: 't4',
              clientName: 'Venkat Rao Patrudu, 64',
              clientRole: 'Chronic Diabetes & Kidney Wellness Patient',
              content: 'My diabetes was out of control with rising creatinine. Under Dr. Rajesh Sharma’s holistic protocol and lifestyle guidance, my HbA1c dropped from 9.8% to 6.3% with zero insulin spikes. Highly ethical care.',
              rating: 5,
              clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
            }
          ]).map((t: any) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500 bg-slate-100 shrink-0">
                    <img
                      src={t.clientAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                      alt={t.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{t.clientName}</h4>
                    <p className="text-[11px] text-teal-700 font-bold">{t.clientRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "{t.content}"
              </p>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Patient &bull; Apex Hospital Record</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          13. DOCTOR'S HEALTH LIBRARY & WELLNESS ADVISORY
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider">
              Health Knowledge Hub
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Doctors' Health Guides &amp; Clinical Advisories
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Reliable, evidence-backed health education directly from our specialist medical faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEALTH_ARTICLES.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticleModal(art)}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-teal-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-teal-700 font-bold">
                    <span>{art.category}</span>
                    <span className="text-slate-400">{art.readTime}</span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 group-hover:text-teal-700 transition leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-teal-700 flex items-center gap-1 group-hover:text-teal-800">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          14. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Patient Information</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Hospital &amp; OPD Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to know about OPD token bookings, cashless insurance, visiting hours, and reports.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition"
              >
                <span className="text-sm sm:text-base font-black text-slate-900">
                  {faq.q}
                </span>
                <span className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {activeFaq === idx && (
                <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          15. CAMPUS LOCATION, DIRECTIONS & VISITING GUIDELINES
      ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Hospital Address & Contact Info */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-500/50 text-teal-200 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Hospital Campus Location</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {hospitalAffiliation}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {profile.address || 'Plot 42, Road No. 36, Near Jubilee Hills Checkpost Metro Station, Jubilee Hills, Hyderabad, Telangana 500033'}
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>OPD Reception: {profile.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-bold text-rose-300">24/7 Trauma Emergency: {emergencyPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Visiting Hours: 11 AM - 1 PM &amp; 5 PM - 7:30 PM</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                {profile.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs transition active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Google Map Directions</span>
                  </a>
                )}

                <a
                  href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi, please share hospital location on Google Maps.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-white font-extrabold text-xs transition active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Location via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Inpatient & ICU Visiting Guidelines */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-4">
              <h4 className="text-base sm:text-lg font-black text-white">
                Patient Admission &amp; Visitor Guidelines
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                To guarantee optimal recovery conditions and maintain sterile infection control, please follow our hospital protocols:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>One Attendant Pass</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    One attendant is permitted 24/7 in private and deluxe inpatient suites.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Free Wheelchair Access</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ground floor ramp access and priority wheelchairs at the main porch.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>In-House Pharmacy 24/7</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    100% genuine pharmaceuticals &amp; emergency injectables round-the-clock.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>NABL Diagnostic Lab</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Automated pathology and instant 128-Slice CT imaging reporting.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
            <p>
              &copy; {new Date().getFullYear()} {hospitalAffiliation}. All Rights Reserved. &bull; NMC / MCI Reg. No. {registrationNumber}
            </p>
            <p className="text-[11px] text-slate-600">
              Powered by OneClickBiz Smart Digital Identity Platform &bull; Medical landing page &amp; digital clinical profile
            </p>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          16. STICKY BOTTOM ACTION BAR (MOBILE & DESKTOP DESK)
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 sm:px-6 shadow-2xl flex items-center justify-around sm:justify-center gap-2 sm:gap-6">
        
        {/* Emergency Dial */}
        <a
          href={`tel:${emergencyPhone}`}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25 active:scale-95 transition"
        >
          <HeartPulse className="w-4 h-4 animate-pulse" />
          <span>Emergency Call</span>
        </a>

        {/* Book Appointment */}
        <button
          onClick={() => setIsAppointmentModalOpen(true)}
          className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-700/25 active:scale-95 transition cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Book OPD Token</span>
        </button>

        {/* WhatsApp Desk */}
        <a
          href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi Dr. ${profile.name}, I need assistance with hospital OPD consultation.`)}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Clinic Directions */}
        {profile.address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(profile.address)}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Map Route</span>
          </a>
        )}

      </div>

      {/* ─────────────────────────────────────────────────────────────
          17. INTERACTIVE HOSPITAL OPD APPOINTMENT MODAL
      ───────────────────────────────────────────────────────────── */}
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
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black">Book Hospital OPD Appointment</h4>
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
              
              {/* Department & Doctor Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Clinical Department</label>
                  <select
                    value={appointmentForm.department}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                  >
                    <option value="Cardiology & Heart Care">Cardiology &amp; Heart Care</option>
                    <option value="Orthopaedics & Joint Replacement">Orthopaedics &amp; Joint Replacement</option>
                    <option value="Neurology & Brain Spine">Neurology &amp; Brain Spine</option>
                    <option value="Gastroenterology & Laparoscopy">Gastroenterology &amp; Laparoscopy</option>
                    <option value="Obstetrics & Gynaecology">Obstetrics &amp; Gynaecology</option>
                    <option value="Paediatrics & Neonatal Care">Paediatrics &amp; Neonatal Care</option>
                    <option value="Internal Medicine & Diabetology">Internal Medicine &amp; Diabetology</option>
                    <option value="Preventive Health Checkup">Preventive Health Checkup</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Consultation Mode</label>
                  <select
                    value={appointmentForm.consultationType}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, consultationType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                  >
                    <option value="In-Hospital OPD Visit">In-Hospital OPD Visit</option>
                    <option value="Video Teleconsultation">Video Teleconsultation</option>
                  </select>
                </div>
              </div>

              {/* Patient Full Name */}
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

              {/* Phone, Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">WhatsApp / Phone *</label>
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

              {/* Preferred Date & OPD Slot */}
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
                    <option value="Morning (10:00 AM - 01:30 PM)">Morning (10 AM - 1:30 PM)</option>
                    <option value="Evening (05:00 PM - 08:30 PM)">Evening (5 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Chief Symptoms / Concerns */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Chief Symptoms / Reason for Visit</label>
                <textarea
                  rows={2}
                  value={appointmentForm.symptoms}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, symptoms: e.target.value })}
                  placeholder="e.g. Chest pain, high blood pressure follow-up, second opinion on knee replacement..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-700/25 transition cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Confirm OPD Token on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          18. 24/7 AMBULANCE REQUEST MODAL
      ───────────────────────────────────────────────────────────── */}
      {isEmergencyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsEmergencyModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-rose-300 space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Ambulance className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-rose-950">24/7 ALS Ambulance Dispatch</h4>
                  <p className="text-xs text-rose-700 font-semibold">Immediate GPS-tracked emergency response</p>
                </div>
              </div>
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium flex items-center justify-between gap-3">
              <span>Need immediate verbal help?</span>
              <a
                href={`tel:${emergencyPhone}`}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition"
              >
                Call {emergencyPhone}
              </a>
            </div>

            <form onSubmit={handleAmbulanceSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  value={ambulanceForm.patientName}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, patientName: e.target.value })}
                  placeholder="e.g. Anand Varma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Emergency Contact Number *</label>
                <input
                  type="tel"
                  required
                  value={ambulanceForm.phone}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, phone: e.target.value })}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Emergency Category</label>
                <select
                  value={ambulanceForm.emergencyType}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, emergencyType: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900"
                >
                  <option value="Cardiac Emergency / Chest Pain">Cardiac Emergency / Acute Chest Pain</option>
                  <option value="Brain Stroke / Sudden Weakness / Slurred Speech">Brain Stroke / Sudden Weakness</option>
                  <option value="Severe Trauma / Road Accident / Fracture">Severe Trauma / Accident / Fracture</option>
                  <option value="High-Risk Obstetric / Labor Pain">High-Risk Obstetric / Labor Pain</option>
                  <option value="Respiratory Distress / Severe Breathlessness">Respiratory Distress / Breathlessness</option>
                  <option value="Unconscious / Critical Non-Responsive">Unconscious / Non-Responsive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Pickup Address &amp; Landmark *</label>
                <textarea
                  rows={2}
                  required
                  value={ambulanceForm.pickupLocation}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pickupLocation: e.target.value })}
                  placeholder="House number, apartment name, street, nearby landmark..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:border-rose-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Dispatch Ambulance via WhatsApp Dispatcher</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          19. CASHLESS MEDICLAIM INFO MODAL
      ───────────────────────────────────────────────────────────── */}
      {isTpaModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsTpaModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black">24/7 Cashless Mediclaim Desk</h4>
                  <p className="text-xs text-slate-500">Over 45+ Empanelled Insurance TPAs</p>
                </div>
              </div>
              <button
                onClick={() => setIsTpaModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-900">
                Documents required for instant Cashless Hospitalization:
              </p>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>Active Health Insurance Card / Policy PDF copy</li>
                <li>Patient Government Photo ID (Aadhaar Card, Passport, or Voter ID)</li>
                <li>Primary Policyholder ID Proof (if patient is a dependent)</li>
                <li>Consultation Prescription &amp; preliminary diagnostic reports</li>
              </ul>
              <p>
                Our hospital insurance coordinator will file the pre-authorization form with your TPA and secure cashless approval within 45 to 60 minutes.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(`Hi, I want to confirm if my insurance policy is accepted for cashless treatment at ${hospitalAffiliation}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat with TPA Officer on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          20. CLINIC OPD QR MODAL
      ───────────────────────────────────────────────────────────── */}
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
            <h4 className="text-lg font-black text-slate-900">Hospital &amp; OPD QR Code</h4>
            <div className="w-52 h-52 mx-auto rounded-2xl bg-slate-50 p-3 border-2 border-slate-200 flex items-center justify-center shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : `https://oneclickbiz.in/v/${profile.slug}`)}`}
                alt="Hospital QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-slate-500">
              Scan with any camera phone to open digital hospital profile, view doctors &amp; book OPD slots.
            </p>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          21. HEALTH ARTICLE DETAIL MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedArticleModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedArticleModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticleModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase">
              {selectedArticleModal.category}
            </span>
            <h4 className="text-xl font-black text-slate-900 leading-tight">
              {selectedArticleModal.title}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {selectedArticleModal.fullContent}
            </p>
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedArticleModal(null);
                  setIsAppointmentModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs transition cursor-pointer"
              >
                Consult Doctor on This Topic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          22. LIGHTBOX VIEWER FOR HOSPITAL INFRASTRUCTURE
      ───────────────────────────────────────────────────────────── */}
      {selectedLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedLightboxImg(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-72 sm:h-96 w-full bg-slate-900">
              <img
                src={selectedLightboxImg.img}
                alt={selectedLightboxImg.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {selectedLightboxImg.category}
              </span>
              <h4 className="text-lg font-black text-slate-900">
                {selectedLightboxImg.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedLightboxImg.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          23. SHARE CARD MODAL
      ───────────────────────────────────────────────────────────── */}
      {isShareModalOpen && (
        <ShareCardModal profile={profile} onClose={() => setIsShareModalOpen(false)} />
      )}

    </div>
  );
}
