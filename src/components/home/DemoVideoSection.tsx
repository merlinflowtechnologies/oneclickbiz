'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Calendar,
  QrCode,
  Tv,
  Check,
  ChevronRight,
  Eye,
  Sliders,
  Send,
  Zap,
  Clock,
  Wifi,
  Battery,
  Smartphone,
  MousePointer,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Layers,
  PhoneCall,
  UserCheck,
  Star,
  MapPin,
  Mail,
  Phone,
  Globe,
  Plus,
  ShoppingCart
} from 'lucide-react';

interface Chapter {
  time: string;
  seconds: number;
  title: string;
  action: string;
  narration: string;
  dynamicIslandText: string;
  mockupType: 'account' | 'profile' | 'theme-store' | 'publish-qr' | 'share-nfc';
}

interface TutorialMode {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  totalSeconds: number;
  badge: string;
  description: string;
  keyHighlights: string[];
  chapters: Chapter[];
}

const TUTORIAL_MODES: TutorialMode[] = [
  {
    id: 'full-tour',
    title: 'Complete Journey: Account Creation to Sharing (2 Min)',
    shortTitle: 'Full Journey (2 Min)',
    icon: Tv,
    duration: '02:00',
    totalSeconds: 120,
    badge: '★ Recommended End-to-End Walkthrough',
    description: 'Watch the complete workflow: Creating a free account, building your smart digital profile, adding your WhatsApp store catalog, publishing your dynamic QR, and sharing across users via NFC and 1-click .VCF.',
    keyHighlights: [
      'Instant 30-second account sign-up with unique URL claim',
      'Drag-and-drop profile builder with avatar, bio & verified socials',
      'Luxury designer theme picker & 0% commission WhatsApp store',
      'Dynamic high-res QR code with centered logo branding',
      'Seamless NFC card tap & 1-tap .VCF phone address book save'
    ],
    chapters: [
      {
        time: '00:00',
        seconds: 0,
        title: '1. Create Account & Claim Link',
        action: 'Signing up & reserving "oneclickbiz.in/v/kishore"',
        narration: 'Sign up in seconds with your name & email, then lock in your custom branded link.',
        dynamicIslandText: '⚡ Account: Kishore Patel',
        mockupType: 'account'
      },
      {
        time: '00:25',
        seconds: 25,
        title: '2. Build Smart Profile & Bio',
        action: 'Uploading avatar photo, title & connecting social icons',
        narration: 'Upload your photo, set your executive title & bio, and connect verified WhatsApp & LinkedIn buttons.',
        dynamicIslandText: '👤 Profile Saved: Kishore Patel',
        mockupType: 'profile'
      },
      {
        time: '00:50',
        seconds: 50,
        title: '3. Pick Luxury Theme & Store',
        action: 'Selecting "Obsidian Cyberpunk" & adding WhatsApp products',
        narration: 'Pick from 28+ luxury themes and activate your zero-commission WhatsApp store catalog.',
        dynamicIslandText: '🛍️ WhatsApp Store: 0% Fees',
        mockupType: 'theme-store'
      },
      {
        time: '01:15',
        seconds: 75,
        title: '4. Publish Live & Dynamic QR',
        action: 'Pushing card live globally & generating branded QR code',
        narration: 'Hit publish to go live globally. Your dynamic QR code updates automatically whenever you edit.',
        dynamicIslandText: '🚀 Published: /v/kishore',
        mockupType: 'publish-qr'
      },
      {
        time: '01:40',
        seconds: 100,
        title: '5. Share Across Users (NFC & .VCF)',
        action: 'Contactless NFC tap & 1-tap address book download',
        narration: 'Tap your NFC card or share QR. Clients view your profile with zero apps and save your .VCF contact in 1 tap.',
        dynamicIslandText: '📲 Saved to iPhone Contacts',
        mockupType: 'share-nfc'
      }
    ]
  },
  {
    id: 'account-creation',
    title: 'Step 1: Sign Up & Claim Branded Link',
    shortTitle: '1. Sign Up & Link',
    icon: UserCheck,
    duration: '01:00',
    totalSeconds: 60,
    badge: 'Onboarding & Handle',
    description: 'Create your account in under 30 seconds, select your personal URL handle, and get instant access to the dashboard.',
    keyHighlights: [
      'Quick email & password or Google 1-tap sign up',
      'Personal handle reservation (oneclickbiz.in/v/your-name)',
      'Instant dashboard access with 100% free starter tier',
      'Zero technical skills required'
    ],
    chapters: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Enter Name & Email',
        action: 'Filling in registration details',
        narration: 'Enter your basic details to create your secure OneClickBiz account.',
        dynamicIslandText: '✍️ Creating Account...',
        mockupType: 'account'
      },
      {
        time: '00:30',
        seconds: 30,
        title: 'Reserve Custom Handle',
        action: 'Checking availability for /v/kishore',
        narration: 'Choose your unique vanity link that will stay with you forever.',
        dynamicIslandText: '✅ Handle Verified',
        mockupType: 'account'
      }
    ]
  },
  {
    id: 'profile-builder',
    title: 'Step 2: Profile Builder & Themes',
    shortTitle: '2. Profile Studio',
    icon: Sliders,
    duration: '01:15',
    totalSeconds: 75,
    badge: 'Design & Branding',
    description: 'Customize your avatar photo, executive title, company, bio, color schemes, and connect social media buttons with real-time phone preview.',
    keyHighlights: [
      'Real-time live mobile preview updates instantly as you type',
      '28+ designer themes (Obsidian, Emerald, Royal Gold, Cyberpunk)',
      '13 drag-and-drop customizable content sections',
      'Instant cloud autosave to server database'
    ],
    chapters: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Upload Avatar & Bio',
        action: 'Setting high-res headshot, title, and bio',
        narration: 'Upload your photo, write an impactful bio, and customize your headline.',
        dynamicIslandText: '🎨 Profile Customizer',
        mockupType: 'profile'
      },
      {
        time: '00:38',
        seconds: 38,
        title: 'Select Designer Theme',
        action: 'Switching between 28+ luxury themes',
        narration: 'Choose a style that matches your personal or corporate brand aesthetic.',
        dynamicIslandText: '✨ Theme Applied',
        mockupType: 'theme-store'
      }
    ]
  },
  {
    id: 'store-booking',
    title: 'Step 3: WhatsApp Catalog & Booking Setup',
    shortTitle: '3. Store & Booking',
    icon: ShoppingBag,
    duration: '01:15',
    totalSeconds: 75,
    badge: 'Commerce & Scheduling',
    description: 'Add products and services with INR prices for 1-tap WhatsApp checkout and enable consultation appointment booking slots.',
    keyHighlights: [
      'Zero commission fees on your store sales',
      'Pre-formatted WhatsApp cart messages sent to your phone',
      'Integrated consultation appointment calendar',
      'Instant email & dashboard inquiry notifications'
    ],
    chapters: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Add Catalog Products',
        action: 'Adding NFC cards & consulting services',
        narration: 'Showcase your items with multi-currency pricing and rich descriptions.',
        dynamicIslandText: '🛍️ Store Catalog Active',
        mockupType: 'theme-store'
      },
      {
        time: '00:38',
        seconds: 38,
        title: 'Enable Strategy Booking',
        action: 'Configuring 30-min strategy slots',
        narration: 'Allow clients to book appointment slots directly without third-party fees.',
        dynamicIslandText: '📅 Booking Configured',
        mockupType: 'theme-store'
      }
    ]
  },
  {
    id: 'share-nfc',
    title: 'Step 4: Sharing Across Users via NFC & QR',
    shortTitle: '4. Sharing & NFC',
    icon: QrCode,
    duration: '01:00',
    totalSeconds: 60,
    badge: 'Hardware & Contactless',
    description: 'Share your card across users using contactless NFC hardware taps, dynamic high-res QR codes, and 1-click .VCF address book downloads.',
    keyHighlights: [
      'Universal compatibility with all iPhone & Android smartphones',
      'Dynamic QR codes that update automatically when you edit your card',
      '1-Click .VCF contact card download directly into smartphone contacts',
      'No companion mobile app required for receiver'
    ],
    chapters: [
      {
        time: '00:00',
        seconds: 0,
        title: 'Publish Live & Get QR',
        action: 'Generating live link & dynamic QR code',
        narration: 'Hit Publish to generate your permanent link and printable QR graphic.',
        dynamicIslandText: '🚀 Published Live',
        mockupType: 'publish-qr'
      },
      {
        time: '00:30',
        seconds: 30,
        title: 'Contactless NFC Tap & .VCF',
        action: 'Receiver tapping NFC & saving to address book',
        narration: 'The receiver taps your NFC card or scans QR and saves your contact in 1 tap.',
        dynamicIslandText: '👤 Contact Saved to Phone',
        mockupType: 'share-nfc'
      }
    ]
  }
];

export default function DemoVideoSection() {
  const [activeModeId, setActiveModeId] = useState<string>('full-tour');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Sub-animation states within scenes
  const [cartCount, setCartCount] = useState<number>(1);
  const [selectedThemeName, setSelectedThemeName] = useState<string>('Obsidian Cyberpunk');
  const [nfcTapped, setNfcTapped] = useState<boolean>(false);
  const [typedEmail, setTypedEmail] = useState<string>('kishore@himastech.com');
  const [typedName, setTypedName] = useState<string>('Kishore Patel');
  const [contactSaved, setContactSaved] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeMode = TUTORIAL_MODES.find(m => m.id === activeModeId) || TUTORIAL_MODES[0];

  // Play subtle synth chime on chapter changes / taps
  const playSoundEffect = useCallback((freq = 587.33, duration = 0.08, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context policy fallback
    }
  }, [isMuted]);

  // Auto-progress simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next >= activeMode.totalSeconds) {
            return 0; // loop smoothly
          }
          return next;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, activeMode.totalSeconds]);

  // Update active chapter based on current time
  useEffect(() => {
    const chapters = activeMode.chapters;
    let foundIndex = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].seconds) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex !== activeChapterIndex) {
      setActiveChapterIndex(foundIndex);
      playSoundEffect(659.25, 0.12, 'triangle'); // pleasant chapter switch chime
    }
  }, [currentTime, activeMode, activeChapterIndex, playSoundEffect]);

  // Sub-scene cyclic micro-animations based on chapter progress
  useEffect(() => {
    const chap = activeMode.chapters[activeChapterIndex];
    if (!chap) return;

    const elapsed = currentTime - chap.seconds;

    if (chap.mockupType === 'account') {
      const fullEmail = 'kishore@himastech.com';
      const offset = elapsed % 6;
      if (offset < 3) {
        setTypedEmail(fullEmail.slice(0, Math.min(fullEmail.length, Math.floor((offset / 3) * fullEmail.length) + 5)));
        setTypedName('Kishore Patel');
      } else {
        setTypedEmail(fullEmail);
      }
    } else if (chap.mockupType === 'profile') {
      // simulate saving
    } else if (chap.mockupType === 'theme-store') {
      const themes = ['Obsidian Cyberpunk', 'Emerald Pro', 'Royal Gold', 'Minimal Slate'];
      const themeIdx = Math.floor((elapsed / 5) % themes.length);
      setSelectedThemeName(themes[themeIdx] || themes[0]);
      const isAdded = (elapsed % 6) > 2.5;
      setCartCount(isAdded ? 2 : 1);
    } else if (chap.mockupType === 'publish-qr') {
      // publish pulse
    } else if (chap.mockupType === 'share-nfc') {
      const isTapped = (elapsed % 6) > 1.5;
      setNfcTapped(isTapped);
      setContactSaved((elapsed % 6) > 2.8);
    }
  }, [currentTime, activeChapterIndex, activeMode]);

  const handleModeChange = (modeId: string) => {
    setActiveModeId(modeId);
    setCurrentTime(0);
    setIsPlaying(true);
    playSoundEffect(523.25, 0.1);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
    setIsPlaying(true);
    playSoundEffect(783.99, 0.08);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const currentChapter = activeMode.chapters[activeChapterIndex] || activeMode.chapters[0];
  const progressPercent = Math.min(100, (currentTime / activeMode.totalSeconds) * 100);

  return (
    <section id="demo" className="py-24 bg-slate-50/70 backdrop-blur-md border-y border-slate-200/80 relative overflow-hidden scroll-mt-20 select-none">
      
      {/* Dynamic Ambient Neon Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-gradient-to-r from-indigo-300/25 via-purple-300/25 to-pink-300/20 blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-emerald-300/20 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Complete Lifecycle Walkthrough</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            See How OneClickBiz Works in <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">2 Minutes</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From creating an account and designing your smart profile to generating dynamic QR codes and sharing across users via contactless NFC & 1-click .VCF.
          </p>
        </div>

        {/* Tutorial Mode Selector Pills */}
        <div className="relative mb-8">
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
            {TUTORIAL_MODES.map((mode) => {
              const IconComponent = mode.icon;
              const isActive = activeModeId === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeChange(mode.id)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 border ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-indigo-400/40 shadow-lg shadow-indigo-500/25 scale-[1.02]'
                      : 'bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-950 hover:bg-white border-slate-200/90 shadow-xs'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{mode.shortTitle}</span>
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 font-medium'}`}>
                    {mode.duration}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Right edge fade gradient hint on mobile */}
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none sm:hidden" />
        </div>

        {/* Main Video Cinema Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Video Player (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Player Container */}
            <div className="relative rounded-[28px] bg-slate-900 border border-slate-700/80 shadow-2xl shadow-slate-900/20 overflow-hidden ring-1 ring-slate-900/10 group">
              
              {/* Window Bar / Player Top Header */}
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-300 font-medium ml-2 hidden sm:inline-block">
                    OneClickBiz Studio Live Demo — {activeMode.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    4K UHD • 60 FPS
                  </span>
                </div>
              </div>

              {/* Video Screen / Animated Simulated Phone Studio */}
              <div className="relative min-h-[460px] sm:min-h-0 sm:aspect-[16/10] lg:aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center p-2 sm:p-6 pt-12 sm:pt-6">
                
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-black pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e3810_1px,transparent_1px),linear-gradient(to_bottom,#1e1e3810_1px,transparent_1px)] bg-[size:1.75rem_1.75rem] pointer-events-none" />

                {/* Top Chapter Status Pill */}
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 flex items-center justify-between gap-1.5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-lg max-w-[65%] sm:max-w-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-white truncate">
                      {currentChapter.title}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-indigo-400 font-mono shrink-0">
                      ({currentChapter.time})
                    </span>
                  </div>

                  {/* Equalizer Waveform Bars when Playing */}
                  <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 px-2 py-1 rounded-xl backdrop-blur-md shrink-0">
                    <span className={`w-0.5 bg-indigo-400 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse' : 'h-1.5'}`} />
                    <span className={`w-0.5 bg-pink-400 rounded-full transition-all ${isPlaying ? 'h-4.5 animate-pulse delay-75' : 'h-2'}`} />
                    <span className={`w-0.5 bg-purple-400 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse delay-150' : 'h-1.5'}`} />
                    <span className={`w-0.5 bg-emerald-400 rounded-full transition-all ${isPlaying ? 'h-4 animate-pulse delay-100' : 'h-2'}`} />
                    <span className="text-[9px] text-slate-400 ml-1 font-mono hidden sm:inline-block">{isMuted ? 'Muted' : 'Sound On'}</span>
                  </div>
                </div>

                {/* Simulated iPhone 16 Pro Device Frame Container */}
                <div className="relative w-full max-w-[310px] sm:max-w-[360px] h-[410px] sm:h-[450px] lg:h-[95%] rounded-[28px] sm:rounded-[36px] bg-slate-900 p-2 sm:p-2.5 border-2 border-slate-700/90 shadow-2xl shadow-indigo-950/80 flex flex-col justify-between overflow-hidden ring-1 ring-white/15 transition-all">
                  
                  {/* Dynamic Island Header */}
                  <div className="w-full bg-slate-950 rounded-t-[24px] sm:rounded-t-[28px] pt-2 pb-1.5 px-3 sm:px-4 flex items-center justify-between text-[10px] text-slate-300 font-semibold border-b border-slate-800 shrink-0">
                    <span>9:41</span>
                    <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black border border-slate-800 text-[8px] sm:text-[9px] text-indigo-300 font-bold flex items-center gap-1.5 shadow-inner transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="truncate max-w-[120px] sm:max-w-[140px]">{currentChapter.dynamicIslandText}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>

                  {/* Device Screen Content (Dynamically transitions based on chapter) */}
                  <div className="flex-1 bg-slate-950 overflow-hidden relative p-2 sm:p-3 flex flex-col justify-between text-left">
                    
                    {/* SCENE 1: CREATE ACCOUNT & CLAIM LINK */}
                    {currentChapter.mockupType === 'account' && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 space-y-2 sm:space-y-2.5 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                              <UserCheck className="w-3 h-3" /> Step 1 • Create Account
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[9px] font-bold">100% Free</span>
                          </div>

                          <div className="space-y-1.5 text-[9.5px] sm:text-[10px]">
                            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                              <span className="text-slate-400">Full Name:</span>
                              <span className="font-bold text-white truncate ml-1">{typedName}</span>
                            </div>

                            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-indigo-500/40 flex items-center justify-between">
                              <span className="text-slate-400">Email:</span>
                              <span className="font-mono text-indigo-300 font-bold truncate ml-1 text-[9px] sm:text-[10px]">{typedEmail}<span className="animate-pulse">|</span></span>
                            </div>

                            <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between">
                              <span className="font-mono text-[9px] sm:text-[10px] text-white font-bold truncate mr-1">oneclickbiz.in/v/<span className="text-emerald-400">kishore</span></span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-bold flex items-center gap-1 shrink-0">
                                <Check className="w-2.5 h-2.5 text-emerald-400" /> Available
                              </span>
                            </div>
                          </div>

                          <div className="relative">
                            <button className="w-full py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[11px] sm:text-xs shadow flex items-center justify-center gap-1.5">
                              <span>Sign Up & Claim My Card Free</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            {/* Simulated Tap Ripple */}
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 w-4 h-4 rounded-full bg-white/70 animate-ping pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 2: BUILD PROFILE STUDIO & SOCIALS */}
                    {currentChapter.mockupType === 'profile' && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/95 border border-indigo-500/30 space-y-2 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                              <Sliders className="w-3 h-3" /> Step 2 • Profile Studio
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[8px] sm:text-[9px] font-bold">Live Sync</span>
                          </div>

                          {/* Profile Header Editor */}
                          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                            <div className="relative shrink-0">
                              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow">
                                KP
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[7px] font-black shadow border border-slate-950">
                                ✓
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <p className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-1 truncate">
                                Kishore Patel <ShieldCheck className="w-3 h-3 text-indigo-400 shrink-0" />
                              </p>
                              <p className="text-[8.5px] sm:text-[9px] text-pink-400 font-semibold truncate">Founder & Managing Director</p>
                              <p className="text-[8px] text-slate-400 truncate">Himastech Digital Reality • Hyderabad</p>
                            </div>
                          </div>

                          {/* Connected Quick Action Buttons */}
                          <div className="grid grid-cols-4 gap-1 pt-0.5 text-center text-[7.5px] sm:text-[8px] font-bold">
                            <div className="p-1 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex flex-col items-center gap-0.5">
                              <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
                            </div>
                            <div className="p-1 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300 flex flex-col items-center gap-0.5">
                              <Globe className="w-3 h-3 text-blue-400" /> LinkedIn
                            </div>
                            <div className="p-1 rounded-lg bg-pink-600/30 border border-pink-500/40 text-pink-300 flex flex-col items-center gap-0.5">
                              <Heart className="w-3 h-3 text-pink-400" /> Instagram
                            </div>
                            <div className="p-1 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 flex flex-col items-center gap-0.5">
                              <Phone className="w-3 h-3 text-purple-400" /> Call
                            </div>
                          </div>

                          {/* Bio / Services snippet */}
                          <div className="p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[8px] sm:text-[8.5px] text-slate-300 leading-snug line-clamp-2">
                            &ldquo;NFC smart digital business cards, interactive WhatsApp catalogs & 1-tap contact sharing.&rdquo;
                          </div>

                          <div className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-[8.5px] sm:text-[9px] font-medium flex items-center justify-between">
                            <span>Autosaved to Cloud DB</span>
                            <span className="font-bold text-emerald-400 flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" /> 100% Synced
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 3: THEME PICKER & WHATSAPP MINI-STORE */}
                    {currentChapter.mockupType === 'theme-store' && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-tr from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/40 space-y-2 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" /> Step 3 • Themes & Store
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[9px] font-bold">0% Fees</span>
                          </div>

                          {/* Mini Store Item */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                            <div className="space-y-0.5 min-w-0 flex-1 mr-2">
                              <p className="text-[10px] sm:text-[11px] font-bold text-white truncate">UltraSmart Matte NFC Card</p>
                              <p className="text-[8.5px] sm:text-[9px] text-emerald-400 font-bold">₹999 <span className="line-through text-slate-500 font-normal">₹1,999</span></p>
                            </div>
                            <div className="relative shrink-0">
                              <button className="px-2 sm:px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[8.5px] sm:text-[9px] flex items-center gap-1 shadow">
                                <Plus className="w-2.5 h-2.5" />
                                <span>Add to Cart</span>
                              </button>
                              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/70 animate-ping pointer-events-none" />
                            </div>
                          </div>

                          {/* Instant WhatsApp Order Bar */}
                          <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-900/50 border border-emerald-500/40 flex items-center justify-between text-[9px] sm:text-[10px] text-emerald-200">
                            <span className="flex items-center gap-1 font-semibold truncate">
                              <ShoppingCart className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{cartCount} in Cart (₹{cartCount * 999})</span>
                            </span>
                            <span className="font-bold underline flex items-center gap-1 text-white shrink-0 ml-1">
                              WhatsApp Order <Send className="w-2.5 h-2.5 text-emerald-300" />
                            </span>
                          </div>

                          {/* Theme Chips */}
                          <div className="flex items-center justify-center gap-1 pt-0.5 overflow-x-auto scrollbar-none">
                            {['Obsidian', 'Emerald', 'Gold', 'Minimal'].map((theme, i) => (
                              <span
                                key={i}
                                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[7.5px] sm:text-[8px] font-bold border shrink-0 ${
                                  selectedThemeName.includes(theme)
                                    ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                }`}
                              >
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 4: PUBLISH LIVE & DYNAMIC QR */}
                    {currentChapter.mockupType === 'publish-qr' && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 space-y-2 shadow-xl text-center">
                          <div className="flex items-center justify-between text-left">
                            <span className="text-[9.5px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                              <QrCode className="w-3 h-3" /> Step 4 • Published & Dynamic QR
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[9px] font-bold">Live Online</span>
                          </div>

                          {/* Dynamic QR Display with Centered Avatar Logo */}
                          <div className="p-2 sm:p-2.5 rounded-2xl bg-white mx-auto w-24 h-24 sm:w-28 sm:h-28 flex flex-col items-center justify-center relative shadow-2xl ring-4 ring-indigo-500/30">
                            {/* Realistic QR Pattern Grid Simulation */}
                            <div className="w-full h-full bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:5px_5px] rounded-lg relative flex items-center justify-center">
                              {/* 3 Corner Anchor Boxes */}
                              <div className="absolute top-0.5 left-0.5 w-4 h-4 border-2 border-black p-0.5"><div className="w-full h-full bg-black rounded-xs" /></div>
                              <div className="absolute top-0.5 right-0.5 w-4 h-4 border-2 border-black p-0.5"><div className="w-full h-full bg-black rounded-xs" /></div>
                              <div className="absolute bottom-0.5 left-0.5 w-4 h-4 border-2 border-black p-0.5"><div className="w-full h-full bg-black rounded-xs" /></div>
                              {/* Centered Avatar Logo */}
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 text-white font-black text-[8px] sm:text-[9px] flex items-center justify-center border-2 border-white shadow-md z-10">
                                KP
                              </div>
                            </div>
                          </div>

                          <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[9px] sm:text-[10px] text-white font-mono font-bold flex items-center justify-center gap-1.5">
                            <span>oneclickbiz.in/v/kishore</span>
                            <ExternalLink className="w-3 h-3 text-indigo-400" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SCENE 5: SHARING ACROSS USERS (NFC TAP & 1-CLICK .VCF) */}
                    {currentChapter.mockupType === 'share-nfc' && (
                      <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 space-y-2 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-[9.5px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              <Zap className="w-3 h-3 text-amber-400" /> Step 5 • Contactless Sharing
                            </span>
                            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] sm:text-[9px] font-bold">iOS & Android</span>
                          </div>

                          {/* Contactless Tap Banner */}
                          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 relative overflow-hidden">
                            <div className="w-9 h-7 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-[8px] font-black text-slate-950 shadow shrink-0">
                              NFC
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] sm:text-[11px] font-bold text-white truncate">Contactless NFC Card Tap</p>
                              <p className="text-[8px] sm:text-[9px] text-slate-400 truncate">Zero App Required • Opens in Safari/Chrome</p>
                            </div>
                            {nfcTapped && (
                              <div className="absolute inset-0 bg-amber-500/15 animate-pulse flex items-center justify-center" />
                            )}
                          </div>

                          {/* 1-Click .VCF Download Action */}
                          <div className="space-y-1.5">
                            <button className="w-full py-1.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[9.5px] sm:text-[10px] font-bold text-center shadow-lg flex items-center justify-center gap-1.5 transition">
                              <UserCheck className="w-3 h-3 text-emerald-300" />
                              <span>Save Contact to Phone (.VCF)</span>
                            </button>

                            {contactSaved && (
                              <div className="p-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[8px] sm:text-[9px] font-bold text-center animate-in fade-in flex items-center justify-center gap-1">
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="truncate">Saved Kishore Patel to Address Book!</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Live Voiceover Subtitle Banner */}
                    <div className="shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-900/95 border border-slate-800 text-[9.5px] sm:text-[10px] text-slate-300 flex items-start gap-2 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <p className="leading-tight line-clamp-2">
                        <strong className="text-white font-semibold">{currentChapter.title}:</strong> {currentChapter.narration}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Big Center Play / Pause Click Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/15 hover:bg-black/35 transition-all z-20 group/overlay"
                  aria-label={isPlaying ? 'Pause Demo' : 'Play Demo'}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 border border-white/20 transition-all duration-300 ${
                    isPlaying ? 'opacity-0 sm:group-hover/overlay:opacity-100 scale-90 sm:group-hover/overlay:scale-100 pointer-events-none sm:pointer-events-auto' : 'opacity-100 scale-100 pointer-events-auto'
                  }`}>
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                  </div>
                </button>

              </div>

              {/* Video Scrubber & Playback Controls Bar */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 space-y-2.5 sm:space-y-3">
                
                {/* Progress Bar Track with Clickable Seek */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(1, clickX / rect.width));
                    handleSeek(Math.floor(pct * activeMode.totalSeconds));
                  }}
                  className="relative h-2 w-full bg-slate-800 hover:h-3 rounded-full cursor-pointer transition-all overflow-hidden group/track"
                >
                  {/* Active Gradient Fill */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Chapter Markers */}
                  {activeMode.chapters.map((ch, idx) => {
                    const chPct = (ch.seconds / activeMode.totalSeconds) * 100;
                    return (
                      <div
                        key={idx}
                        style={{ left: `${chPct}%` }}
                        className="absolute top-0 bottom-0 w-1 bg-white/40 group-hover/track:bg-white/80"
                        title={`${ch.time} - ${ch.title}`}
                      />
                    );
                  })}
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  
                  {/* Left Controls: Play/Pause, Restart, Time */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition shadow"
                      title={isPlaying ? 'Pause' : 'Play'}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleSeek(0)}
                      className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                      title="Restart Video"
                      aria-label="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <div className="font-mono text-slate-300 text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5">
                      <span className="text-white font-bold">{formatSeconds(currentTime)}</span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-400">{activeMode.duration}</span>
                    </div>
                  </div>

                  {/* Right Controls: Speed, Volume, Fullscreen */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    
                    {/* Speed Toggle for Mobile (compact 1-button cycle) */}
                    <button
                      onClick={() => {
                        const speeds = [1, 1.25, 1.5, 2];
                        const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                        setPlaybackSpeed(next);
                      }}
                      className="px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-bold text-indigo-300 hover:text-white sm:hidden transition"
                      title="Tap to change speed"
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Playback Speed Pill for Tablets & Desktop */}
                    <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                      {[1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                            playbackSpeed === spd
                              ? 'bg-indigo-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Mute Button */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                      title={isMuted ? 'Unmute' : 'Mute'}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>

                    {/* Fullscreen Trigger */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition hidden sm:flex items-center gap-1"
                      title="Expand Cinema View"
                      aria-label="Expand Cinema View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

            {/* Quick Action Bar Under Player */}
            <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-slate-900/5">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Ready to experience the builder yourself? It takes less than 2 minutes.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/v/kishore"
                  target="_blank"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Test Sample Card</span>
                </Link>

                <Link
                  href="/signup?intent=build_card"
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <span>Build Card Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Video Chapters & Highlights (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Chapters Box */}
            <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 space-y-4 shadow-xl shadow-slate-900/5">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Video Chapters</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">Click to Jump</span>
              </div>

              <div className="space-y-2">
                {activeMode.chapters.map((chap, idx) => {
                  const isCurrent = activeChapterIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSeek(chap.seconds)}
                      className={`w-full p-3 rounded-2xl text-left text-xs transition-all flex items-start gap-3 border ${
                        isCurrent
                          ? 'bg-indigo-50/90 border-indigo-300 text-indigo-950 shadow-xs'
                          : 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 mt-0.5 ${
                        isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {chap.time}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate ${isCurrent ? 'text-indigo-950' : 'text-slate-900'}`}>
                          {chap.title}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">
                          {chap.action}
                        </p>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${
                        isCurrent ? 'text-indigo-600 translate-x-0.5' : 'text-slate-400'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Value Highlights Box */}
            <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 space-y-3.5 shadow-lg shadow-slate-900/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Included in This Workflow
                </h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-600">
                {activeMode.keyHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* 3-Step "How to Get Started" Visual Cards */}
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Simple 3-Step Process
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              From Signup to Live Card in 3 Easy Steps
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-indigo-400/60 transition-all space-y-3 relative group shadow-lg shadow-slate-900/5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-500/20">
                1
              </div>
              <h5 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Claim Handle & Pick Template
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your custom link <code className="text-indigo-700 bg-indigo-50 border border-indigo-100 px-1 py-0.5 rounded">oneclickbiz.in/v/name</code> and select from 28+ designer templates matching your industry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-purple-400/60 transition-all space-y-3 relative group shadow-lg shadow-slate-900/5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-purple-500/20">
                2
              </div>
              <h5 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Add Products, Bio & Services
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your business details, WhatsApp mini-store catalog items, appointment booking slots, and portfolio with drag-and-drop ease.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 hover:border-pink-400/60 transition-all space-y-3 relative group shadow-lg shadow-slate-900/5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-pink-500/20">
                3
              </div>
              <h5 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                Tap, Share & Close Leads
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your dynamic card via QR code, NFC card tap, WhatsApp or email. Clients save your contact with 1-click .VCF and order instantly.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Expanded Cinema Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="w-full max-w-5xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">{activeMode.title}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition"
              >
                Close Cinema View ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="aspect-video w-full bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 text-white flex items-center justify-center shadow-xl">
                  <Tv className="w-8 h-8" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white">{activeMode.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">{activeMode.description}</p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/signup?intent=build_card"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30"
                  >
                    <span>Create Your Smart Card Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/v/kishore"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                  >
                    <span>Inspect Live Demo Card</span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

