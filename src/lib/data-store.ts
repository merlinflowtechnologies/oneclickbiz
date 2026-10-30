import { DigitalProfile, BookingSlot, LeadItem, DynamicQrConfig, NfcCardItem, BlogPostItem, ThemeType } from './types';
import { SAMPLE_BLOG_POSTS } from './blog-data';
import { getTemplateProfile } from '@/data/templatePresets';
import { ALL_VCARD_TEMPLATES } from '@/data/vcardTemplates';

export const INITIAL_BLOGS: BlogPostItem[] = SAMPLE_BLOG_POSTS;

export const INITIAL_PROFILES: DigitalProfile[] = [
  {
    id: 'prof_kishore_1',
    organizationId: 'org_himastech_1',
    slug: 'kishore',
    name: 'Kishore Patel',
    designation: 'Founder & Managing Director',
    company: 'Himastech Digital Reality',
    bio: 'Empowering real estate developers, commercial builders, and modern enterprises with high-ROI digital reality marketing, 3D immersive virtual walkthroughs, and automated buyer lead funnels.',
    email: 'kishore@himastech.com',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    website: 'https://himastech.com',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana, India',
    avatarUrl: '/kishore-profile-v2.png',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    theme: 'modern-indigo',
    isPublished: true,
    sections: [
      { id: 'sec_1', type: 'hero', title: 'Header & Bio', isVisible: true, order: 1 },
      { id: 'sec_2', type: 'socials', title: 'Social Profiles', isVisible: true, order: 2 },
      { id: 'sec_3', type: 'about', title: 'About Me', isVisible: true, order: 3 },
      { id: 'sec_4', type: 'services', title: 'Services Offered', isVisible: true, order: 4 },
      { id: 'sec_videos', type: 'videos', title: 'Featured Videos & Reels', isVisible: true, order: 5 },
      { id: 'sec_blogs', type: 'blogs', title: 'Articles & Insights', isVisible: true, order: 6 },
      { id: 'sec_5', type: 'products', title: 'WhatsApp Store', isVisible: true, order: 7 },
      { id: 'sec_6', type: 'booking', title: 'Book an Appointment', isVisible: true, order: 8 },
      { id: 'sec_7', type: 'gallery', title: 'Portfolio Showcase', isVisible: true, order: 9 },
      { id: 'sec_8', type: 'testimonials', title: 'Client Reviews', isVisible: true, order: 10 },
      { id: 'sec_9', type: 'customLinks', title: 'Quick Links', isVisible: true, order: 11 },
      { id: 'sec_10', type: 'contact', title: 'Contact & Inquiry', isVisible: true, order: 12 },
    ],
    sectionData: {
      about: {
        content: 'With over 12 years of specialized leadership in real estate digital marketing and interactive reality solutions, Himastech Digital Reality partners with leading property developers, architects, and enterprise brands to scale qualified buyer inquiries and build commanding digital authority.'
      },
      socials: {
        items: [
          { id: 'soc_1', platform: 'whatsapp', url: 'https://wa.me/919876543210', label: 'WhatsApp' },
          { id: 'soc_2', platform: 'linkedin', url: 'https://linkedin.com/in/kishorepatel', label: 'LinkedIn' },
          { id: 'soc_3', platform: 'instagram', url: 'https://instagram.com/himastech.reality', label: 'Instagram' },
          { id: 'soc_4', platform: 'twitter', url: 'https://twitter.com/himastech', label: 'X (Twitter)' },
          { id: 'soc_5', platform: 'website', url: 'https://himastech.com', label: 'Website' },
        ]
      },
      services: {
        items: [
          {
            id: 'srv_1',
            title: 'Real Estate Performance Marketing & Buyer Lead Generation',
            description: 'Targeted Google, Meta, and LinkedIn advertising campaigns delivering verified, high-intent property investors and home buyers.',
            durationMinutes: 45,
            price: 49999,
            currency: '₹'
          },
          {
            id: 'srv_2',
            title: 'Immersive 3D Digital Walkthroughs & VR Tours',
            description: 'Photorealistic interactive 3D virtual site tours accessible seamlessly from any smartphone, tablet, or web browser.',
            durationMinutes: 60,
            price: 34999,
            currency: '₹'
          },
          {
            id: 'srv_3',
            title: 'Real Estate Launch Strategy & Growth Consultation',
            description: 'Direct 1-on-1 strategy session to audit project positioning, sales collateral, and digital marketing funnels.',
            durationMinutes: 60,
            price: 4999,
            currency: '₹'
          }
        ]
      },
      products: {
        items: [
          {
            id: 'prod_1',
            name: 'Real Estate High-Conversion Sales Landing Page & CRM Funnel',
            description: 'Complete sales funnel with automated WhatsApp lead alerts, interactive floor plans, and EMI calculator.',
            price: 14999,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'HIMAS-RE-01',
            isAvailable: true
          },
          {
            id: 'prod_2',
            name: 'Smart Business Mini-Website & Dynamic QR Suite for Sales Teams',
            description: 'Luxury commercial mini-website with instant 1-tap contact saving, catalog browsing, and WhatsApp booking.',
            price: 1999,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'VC-HIMAS',
            isAvailable: true
          },
          {
            id: 'prod_3',
            name: 'Virtual Reality Architectural 3D Asset Master Kit',
            description: 'Production-ready 3D architectural models, interior lighting presets, and ultra-high-resolution aerial renders.',
            price: 8999,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
            category: 'Services',
            sku: 'VR-ASSET-01',
            isAvailable: true
          }
        ]
      },
      videos: {
        items: [
          {
            id: 'vid_1',
            title: 'OneClickBiz - Next-Gen Smart Business Card Showcase',
            url: 'https://youtu.be/F1wdT1CA5gA',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/F1wdT1CA5gA',
            caption: 'Watch how OneClickBiz transforms physical networking into dynamic leads, instant WhatsApp sales, and automated appointment bookings.'
          },
          {
            id: 'vid_2',
            title: 'Himastech Digital Reality - Immersive Virtual Walkthrough & Marketing Demo',
            url: 'https://youtu.be/jI_19Wuno9M',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/jI_19Wuno9M',
            caption: 'Explore our high-converting 3D architectural reality marketing walkthroughs and client project case studies.'
          },
          {
            id: 'vid_ig_1',
            title: 'OneClickBiz Commercial Mini-Website in Action',
            url: 'https://www.instagram.com/reel/Dboeh4BTscY/',
            type: 'instagram',
            embedUrl: 'https://www.instagram.com/reel/Dboeh4BTscY/embed',
            caption: 'Watch real-time dynamic digital profile sharing in action.'
          },
          {
            id: 'vid_ig_2',
            title: 'Next-Gen Business Identity & Networking Experience',
            url: 'https://www.instagram.com/reel/DbNGzEmRwlb/',
            type: 'instagram',
            embedUrl: 'https://www.instagram.com/reel/DbNGzEmRwlb/embed',
            caption: 'Empower your business with smart digital visiting cards, WhatsApp catalog, and instant contact saving.'
          }
        ]
      },
      gallery: {
        items: [
          { 
            id: 'gal_1', 
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
            title: 'Luxury High-Rise Residential Tower Launch',
            category: 'Real Estate Marketing',
            description: 'Multi-channel digital marketing campaign resulting in 80% phase-1 inventory bookings.'
          },
          { 
            id: 'gal_2', 
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 
            title: 'Interactive 3D Virtual Villa Walkthrough',
            category: 'VR Reality',
            description: 'Photorealistic real-time 3D walkthrough accessible on mobile & VR headsets.'
          },
          { 
            id: 'gal_3', 
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', 
            title: 'Commercial Tech Park Digital Campaign & Brand Identity',
            category: 'Branding',
            description: 'Comprehensive digital brand identity and dynamic broker sales enablement suite.'
          }
        ]
      },
      testimonials: {
        items: [
          {
            id: 'tst_1',
            clientName: 'Rajesh Varma',
            clientRole: 'Managing Director',
            clientCompany: 'Prestige Urban Spaces',
            clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            content: 'Himastech Digital Reality delivered a 350% surge in verified site-visit bookings for our luxury villa project within the first 30 days. Their 3D walkthroughs are best-in-class!',
            rating: 5
          },
          {
            id: 'tst_2',
            clientName: 'Sneha Kulkarni',
            clientRole: 'Head of Sales',
            clientCompany: 'Skyline Infra Projects',
            clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
            content: 'The smart digital business cards and WhatsApp automation simplified our on-site property sales workflow completely. Every buyer now has our direct contact and brochures saved in one click.',
            rating: 5
          }
        ]
      },
      blogs: {
        items: INITIAL_BLOGS
      },
      customLinks: {
        items: [
          { id: 'cl_1', title: 'Explore Live 3D Real Estate Projects & Showreel', url: 'https://himastech.com', highlight: true },
          { id: 'cl_2', title: 'Download 2026 Himastech Digital Reality Brochure (PDF)', url: '#' },
          { id: 'cl_3', title: 'Book an On-Site VR Walkthrough Demonstration', url: 'https://wa.me/919876543210' }
        ]
      },
      contact: {
        showEmail: true,
        showPhone: true,
        showWhatsapp: true,
        showAddress: true,
        showWebsite: true,
        allowInquiries: true
      }
    },
    qrCodeId: 'qr_kishore_01',
    nfcCardId: 'nfc_kishore_01',
    stats: {
      views: 2420,
      qrScans: 890,
      nfcTaps: 512,
      whatsappClicks: 410,
      callClicks: 195,
      vcfDownloads: 480
    }
  },
  getTemplateProfile('edu-school'),
  getTemplateProfile('re-builders')
];

export function getProfileBySlug(rawSlug: string): DigitalProfile {
  const cleanSlug = (rawSlug || '').toLowerCase().trim();
  
  // 0. Direct match against catalog templates
  const matchedCatalog = ALL_VCARD_TEMPLATES.find(t => t.id.toLowerCase() === cleanSlug);
  if (matchedCatalog) {
    const tProf = getTemplateProfile(matchedCatalog.id);
    return {
      ...tProf,
      slug: cleanSlug,
      templateId: matchedCatalog.id,
      category: matchedCatalog.category,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 1. Check in initial profiles or aliases
  if (['kishore', 'kishore-patel', 'alex', 'demo', 'preview', 'sample'].includes(cleanSlug)) {
    return {
      ...INITIAL_PROFILES[0],
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }
  const found = INITIAL_PROFILES.find(p => p.slug.toLowerCase() === cleanSlug);
  if (found) {
    return {
      ...found,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // Dedicated real estate slugs
  if (['re-builders', 'builders', 'skyline', 'venu'].includes(cleanSlug)) {
    const tProf = getTemplateProfile('re-builders');
    return {
      ...tProf,
      slug: cleanSlug,
      name: cleanSlug === 'venu' ? 'Venu' : tProf.name,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }
  if (['re-villas', 'villas'].includes(cleanSlug)) {
    const tProf = getTemplateProfile('re-villas');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }
  if (['re-plots', 'plots'].includes(cleanSlug)) {
    const tProf = getTemplateProfile('re-plots');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 2. Check if slug matches any theme type directly
  const knownThemes: ThemeType[] = [
    'modern-indigo', 'dark-onyx', 'glassmorphic', 'emerald-pro', 
    'sunset-gold', 'cyber-neon'
  ];
  if (knownThemes.includes(cleanSlug as ThemeType)) {
    const base = getTemplateProfile('re-builders');
    return {
      ...base,
      id: `prof_${cleanSlug}`,
      slug: cleanSlug,
      theme: cleanSlug as ThemeType,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3. Check if slug is restaurant / food / dining related
  const isFoodPattern = 
    cleanSlug === 'restaurant' ||
    cleanSlug === 'restaurant-menu' ||
    cleanSlug === 'food-restaurant' ||
    cleanSlug === 'food-menu' ||
    cleanSlug === 'food-home' ||
    cleanSlug === 'food-cloud' ||
    cleanSlug === 'brahmin-food' ||
    cleanSlug === 'dining' ||
    cleanSlug === 'bistro' ||
    cleanSlug === 'cafe' ||
    cleanSlug.includes('restaurant') ||
    cleanSlug.startsWith('food-') ||
    cleanSlug.includes('dining') ||
    cleanSlug.includes('bistro') ||
    cleanSlug.includes('cafe');

  if (isFoodPattern) {
    const tProf = getTemplateProfile('food-restaurant');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3.5 Check if slug is fashion / boutique related
  const isFashionPattern = 
    cleanSlug === 'fash-boutique' ||
    cleanSlug === 'fash-ladies' ||
    cleanSlug === 'fash-mens' ||
    cleanSlug === 'fash-saree' ||
    cleanSlug === 'fash-online' ||
    cleanSlug.startsWith('fash-') ||
    cleanSlug.startsWith('fashion-') ||
    cleanSlug.includes('boutique') ||
    cleanSlug.includes('couture') ||
    cleanSlug.includes('tailor') ||
    cleanSlug.includes('apparel');

  if (isFashionPattern) {
    const tProf = getTemplateProfile('fash-boutique');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3.6 Check if slug is insurance related
  const isInsurancePattern = 
    cleanSlug === 'prof-insurance' ||
    cleanSlug === 'insurance' ||
    cleanSlug === 'mediclaim' ||
    cleanSlug === 'insurance-advisor' ||
    cleanSlug.startsWith('insurance-') ||
    cleanSlug.includes('insurance');

  // 3.65 Check if slug is healthcare / doctor / hospital related
  const isHealthcarePattern = 
    cleanSlug === 'health-doctor' ||
    cleanSlug === 'hospital' ||
    cleanSlug === 'doctor' ||
    cleanSlug === 'healthcare' ||
    cleanSlug === 'clinic' ||
    cleanSlug.startsWith('health-');

  if (isHealthcarePattern) {
    const tProf = getTemplateProfile('health-doctor');
    return {
      ...tProf,
      slug: cleanSlug,
      templateId: 'health-doctor',
      category: 'Healthcare',
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  if (isInsurancePattern) {
    const tProf = getTemplateProfile('prof-insurance');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3.8 Check if slug is bus booking related (AbhiBus clone / SwiftVoyage)
  const isBusBookingPattern = 
    cleanSlug === 'abhibus' ||
    cleanSlug === 'bus' ||
    cleanSlug === 'buses' ||
    cleanSlug === 'bus-booking' ||
    cleanSlug === 'bus-ticket' ||
    cleanSlug === 'travel-tour' ||
    cleanSlug.startsWith('bus-');

  if (isBusBookingPattern) {
    return {
      id: `prof_${cleanSlug}`,
      organizationId: `org_${cleanSlug}`,
      slug: cleanSlug,
      templateId: 'bus-booking',
      category: 'Bus Booking & Transport',
      name: 'SwiftVoyage Express',
      designation: 'Intercity Bus Tickets & Luxury AC Sleepers',
      company: 'SwiftVoyage Express Transport Pvt Ltd',
      bio: 'Book verified Volvo Multi-Axle, Scania and Electric Intercity bus tickets across India with live GPS tracking and zero cancellation charges.',
      email: 'bookings@swiftvoyage.in',
      phone: '+91 63049 89071',
      whatsapp: '916304989071',
      website: `https://oneclickbiz.in/v/${cleanSlug}`,
      address: 'Central Intercity Terminal, Hyderabad & Bangalore, India',
      avatarUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
      theme: 'emerald-pro',
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE',
      sections: [],
      sectionData: {}
    } as any;
  }

  // 3.7 Check if slug is education / school related (Apex Global Group of Schools)
  const isEducationSchoolPattern = 
    cleanSlug === 'edu-school' ||
    cleanSlug === 'apex' ||
    cleanSlug === 'apex-school' ||
    cleanSlug === 'apex-schools' ||
    cleanSlug === 'global-school' ||
    cleanSlug.includes('school');

  if (isEducationSchoolPattern) {
    const tProf = getTemplateProfile('edu-school');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3.8 Check if slug is beauty salon / Green Trends related
  const isBeautySalonPattern = 
    cleanSlug === 'beauty-salon' ||
    cleanSlug === 'beauty-parlour' ||
    cleanSlug === 'beauty-parlor' ||
    cleanSlug === 'parlour' ||
    cleanSlug === 'parlor' ||
    cleanSlug.includes('parlour') ||
    cleanSlug.includes('parlor') ||
    cleanSlug === 'auraluxe' ||
    cleanSlug.includes('auraluxe') ||
    cleanSlug === 'green-trends' ||
    cleanSlug === 'greentrends' ||
    cleanSlug === 'greentrends-kothapet' ||
    cleanSlug === 'salon' ||
    cleanSlug === 'luxury-salon' ||
    cleanSlug === 'hair-salon' ||
    cleanSlug === 'beauty' ||
    cleanSlug.includes('greentrends');

  if (isBeautySalonPattern) {
    const tProf = getTemplateProfile('beauty-salon');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }


  // 3.9 Check if slug is event planner / photography related (SnapVibe Events)
  const isEventsPattern = 
    cleanSlug === 'events-planner' ||
    cleanSlug === 'event-planner' ||
    cleanSlug === 'event-photography' ||
    cleanSlug === 'photography' ||
    cleanSlug.includes('events-planner') ||
    cleanSlug.includes('event-planner');

  if (isEventsPattern) {
    const tProf = getTemplateProfile('events-planner');
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 3.10 Check if slug is travel / tours / holidays related (Wanderlust International Travels)
  const isTravelPattern = 
    cleanSlug === 'travel' ||
    cleanSlug === 'travels' ||
    cleanSlug === 'tours-travels' ||
    cleanSlug === 'trav-agency' ||
    cleanSlug === 'tour' ||
    cleanSlug === 'tours' ||
    cleanSlug === 'holiday' ||
    cleanSlug === 'holidays' ||
    cleanSlug === 'luxury-resort' ||
    cleanSlug === 'cab-services' ||
    cleanSlug === 'homestay' ||
    cleanSlug.startsWith('travel-') ||
    cleanSlug.startsWith('trav-') ||
    cleanSlug.startsWith('tour-');

  if (isTravelPattern) {
    const tProf = getTemplateProfile('travel-tour-packages');
    return {
      ...tProf,
      slug: cleanSlug,
      category: 'Travel & Hospitality',
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 4. Check if slug matches any catalog template (by id or normalized name)
  const matchedTemplate = ALL_VCARD_TEMPLATES.find(
    t => t.id.toLowerCase() === cleanSlug || 
         t.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === cleanSlug ||
         t.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanSlug.replace(/[^a-z0-9]/g, '')
  );

  const isTemplatePattern = matchedTemplate || 
    cleanSlug === 'interior' ||
    cleanSlug.startsWith('home-') ||
    cleanSlug.startsWith('interior-') ||
    cleanSlug.startsWith('vcard') || 
    cleanSlug.startsWith('re-') || 
    cleanSlug.startsWith('fashion-') || 
    cleanSlug.startsWith('food-') || 
    cleanSlug.startsWith('med-') || 
    cleanSlug.startsWith('beauty-') || 
    cleanSlug.startsWith('auto-') || 
    cleanSlug.startsWith('edu-') || 
    cleanSlug.startsWith('prof-') || 
    cleanSlug.startsWith('tech-') || 
    cleanSlug.startsWith('art-') || 
    cleanSlug.startsWith('travel-') || 
    cleanSlug.startsWith('retail-') || 
    cleanSlug.startsWith('salon-');

  if (isTemplatePattern) {
    const templateId = matchedTemplate?.id || 
      (cleanSlug === 'interior' || cleanSlug.startsWith('home-interior') || cleanSlug.startsWith('interior') ? 'home-interior' : 
       cleanSlug === 'home-services' || cleanSlug === 'home-electrician' || cleanSlug.startsWith('home-service') || cleanSlug.startsWith('home-electrician') || cleanSlug.startsWith('home-plumber') || cleanSlug === 'services' ? 'home-services' :
       cleanSlug.startsWith('retail-jewel') || cleanSlug.startsWith('jewel') ? 'retail-jewellery' :
       cleanSlug.startsWith('food-') ? 'food-restaurant' :
       cleanSlug.startsWith('travel-') || cleanSlug.startsWith('trav-') || cleanSlug.startsWith('tour-') ? 'travel-tour' :
       cleanSlug.startsWith('vcard') ? cleanSlug : 're-builders');
    const tProf = getTemplateProfile(templateId);
    return {
      ...tProf,
      slug: cleanSlug,
      isPublished: true,
      isExpired: false,
      subscriptionStatus: 'ACTIVE'
    };
  }

  // 4. Format a friendly name from slug e.g. "rahul-sharma" -> "Rahul Sharma"
  const formattedName = cleanSlug
    ? cleanSlug
        .split(/[-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Professional Business';

  return {
    id: `prof_${cleanSlug || 'default'}`,
    organizationId: `org_${cleanSlug || 'default'}`,
    slug: cleanSlug || 'profile',
    name: formattedName,
    designation: 'Founder & CEO',
    company: `${formattedName} Solutions`,
    bio: `Welcome to ${formattedName}'s official mini-website and WhatsApp store. Explore our services, browse products, or book a consultation call directly.`,
    email: `contact@${cleanSlug || 'business'}.com`,
    phone: '+91 63049 89071',
    whatsapp: '916304989071',
    website: `https://${cleanSlug || 'business'}.com`,
    address: 'Bangalore, India',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    theme: 'modern-indigo',
    isPublished: true,
    sections: [
      { id: 'sec_1', type: 'hero', title: 'Header & Bio', isVisible: true, order: 1 },
      { id: 'sec_2', type: 'socials', title: 'Social Profiles', isVisible: true, order: 2 },
      { id: 'sec_3', type: 'about', title: 'About Us', isVisible: true, order: 3 },
      { id: 'sec_4', type: 'services', title: 'Services Offered', isVisible: true, order: 4 },
      { id: 'sec_videos', type: 'videos', title: 'Featured Videos & Reels', isVisible: true, order: 5 },
      { id: 'sec_blogs', type: 'blogs', title: 'Articles & Insights', isVisible: true, order: 6 },
      { id: 'sec_5', type: 'products', title: 'WhatsApp Store', isVisible: true, order: 7 },
      { id: 'sec_6', type: 'booking', title: 'Book an Appointment', isVisible: true, order: 8 },
      { id: 'sec_7', type: 'gallery', title: 'Portfolio Showcase', isVisible: true, order: 9 },
      { id: 'sec_8', type: 'testimonials', title: 'Client Reviews', isVisible: true, order: 10 },
      { id: 'sec_9', type: 'customLinks', title: 'Quick Links', isVisible: true, order: 11 },
      { id: 'sec_10', type: 'contact', title: 'Contact & Inquiry', isVisible: true, order: 12 },
    ],
    sectionData: {
      blogs: {
        items: INITIAL_BLOGS
      },
      about: {
        content: `We specialize in premium modern services and high-impact digital solutions for ambitious clients and high-growth businesses.`
      },
      socials: {
        items: [
          { id: 'soc_1', platform: 'whatsapp', url: 'https://wa.me/916304989071', label: 'WhatsApp' },
          { id: 'soc_2', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
          { id: 'soc_3', platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
          { id: 'soc_4', platform: 'website', url: `https://${cleanSlug || 'business'}.com`, label: 'Website' },
        ]
      },
      videos: {
        items: [
          {
            id: 'vid_gen_1',
            title: `${formattedName} Official Introduction & Showcase`,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            caption: 'Watch our story, client transformations, and behind-the-scenes workflow.'
          },
          {
            id: 'vid_gen_2',
            title: 'Customer Highlight & Product Unboxing',
            url: 'https://www.instagram.com/reel/C8qL_XYZ123/',
            type: 'instagram',
            caption: 'Quick peek into our signature client deliveries and smart identity features.'
          },
          {
            id: 'vid_gen_3',
            title: 'Project Reel: High Growth Results',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            type: 'direct',
            caption: 'Live demo of high-performance mobile and web platforms.'
          }
        ]
      },
      services: {
        items: [
          {
            id: 'srv_1',
            title: 'Full Business Strategy Consultation',
            description: 'Comprehensive 1-on-1 discovery and implementation roadmap.',
            durationMinutes: 45,
            price: 4999,
            currency: '₹'
          },
          {
            id: 'srv_2',
            title: 'Custom Brand & Digital Presence',
            description: 'Turnkey online identity, digital storefront, and funnel setup.',
            durationMinutes: 60,
            price: 19999,
            currency: '₹'
          }
        ]
      },
      products: {
        items: [
          {
            id: 'prod_1',
            name: 'Smart Digital Profile Starter Pack',
            description: 'Full profile studio configuration with dynamic QR and commercial website management.',
            price: 1499,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'DIGI-01',
            isAvailable: true
          },
          {
            id: 'prod_2',
            name: 'Digital Toolkit Pro',
            description: 'Complete templates, automation workflows, and resources.',
            price: 2499,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'DT-01',
            isAvailable: true
          }
        ]
      },
      gallery: {
        items: [
          { 
            id: 'gal_1', 
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 
            title: 'Modern Digital Ecosystem',
            category: 'UI/UX Design',
            description: 'Full platform UI design with conversion-optimized responsive layouts.'
          },
          { 
            id: 'gal_2', 
            imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80', 
            title: 'Mobile Commerce & Funnel Architecture',
            category: 'Mobile Apps',
            description: 'Custom iOS and Android experiences tailored for rapid checkout.'
          },
          { 
            id: 'gal_3', 
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 
            title: 'Analytics & Client Growth Dashboard',
            category: 'Strategy',
            description: 'Scalable cloud infrastructure and real-time interaction tracking.'
          }
        ]
      },
      testimonials: {
        items: [
          {
            id: 'tst_1',
            clientName: 'Priya Sharma',
            clientRole: 'Managing Director',
            clientCompany: 'Apex Global',
            clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            content: 'Outstanding experience and swift communication. The mini-website made networking effortless!',
            rating: 5
          }
        ]
      },
      customLinks: {
        items: [
          { id: 'cl_1', title: 'Visit Official Website', url: `https://${cleanSlug || 'business'}.com`, highlight: true },
          { id: 'cl_2', title: 'Direct WhatsApp Support', url: 'https://wa.me/916304989071' }
        ]
      },
      contact: {
        showEmail: true,
        showPhone: true,
        showWhatsapp: true,
        showAddress: true,
        showWebsite: true,
        allowInquiries: true
      }
    },
    qrCodeId: `qr_${cleanSlug}`,
    nfcCardId: `nfc_${cleanSlug}`,
    stats: {
      views: 340,
      qrScans: 120,
      nfcTaps: 85,
      whatsappClicks: 42,
      callClicks: 28,
      vcfDownloads: 64
    }
  };
}

export const INITIAL_BOOKINGS: BookingSlot[] = [
  {
    id: 'book_edu_01',
    serviceId: 'srv_edu_1',
    serviceTitle: 'Admissions Counseling & Campus Tour',
    customerName: 'Srinivas Reddy',
    customerEmail: 'srinivas.reddy@gmail.com',
    customerPhone: '+91 98765 43210',
    date: '2026-10-18',
    time: '10:00',
    status: 'CONFIRMED',
    notes: 'Campus tour of Narsampet Digi smart classrooms and robotics innovation lab.',
    createdAt: '2026-10-15T09:35:00.000Z'
  },
  {
    id: 'book_edu_02',
    serviceId: 'srv_edu_2',
    serviceTitle: 'IIT & NEET Foundation Diagnostic Test',
    customerName: 'Master Aryan Reddy',
    customerEmail: 'srinivas.reddy@gmail.com',
    customerPhone: '+91 98765 43210',
    date: '2026-10-19',
    time: '11:30',
    status: 'CONFIRMED',
    notes: 'Mathematics aptitude and analytical reasoning diagnostic test.',
    createdAt: '2026-10-15T10:00:00.000Z'
  },
  {
    id: 'book_edu_03',
    serviceId: 'srv_edu_3',
    serviceTitle: 'Hostel & Semi-Residential Counseling',
    customerName: 'Dr. Ananya Sharma',
    customerEmail: 'ananya.sharma@healthcare.org',
    customerPhone: '+91 94401 23456',
    date: '2026-10-20',
    time: '14:00',
    status: 'PENDING',
    notes: 'Girls hostel wing safety and dietary schedule review.',
    createdAt: '2026-10-14T14:20:00.000Z'
  },
  {
    id: 'book_re_01',
    serviceId: 'srv_1',
    serviceTitle: 'Real Estate Launch Strategy Consultation',
    customerName: 'Vikramaditya Verma',
    customerEmail: 'vikram.verma@investors.in',
    customerPhone: '+91 91234 56789',
    date: '2026-10-17',
    time: '16:00',
    status: 'CONFIRMED',
    notes: 'Virtual walkthrough integration strategy meeting.',
    createdAt: '2026-10-15T18:05:00.000Z'
  }
];

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead_edu_01',
    profileId: 'prof_edu-school',
    name: 'Srinivas Reddy',
    email: 'srinivas.reddy@gmail.com',
    phone: '+91 98765 43210',
    message: 'Seeking Class 6 admission for my son Master Aryan Reddy with IIT-NEET Integrated Foundation at Narsampet Digi campus.',
    status: 'QUALIFIED',
    notes: 'Campus visit and entrance diagnostic test scheduled for Saturday 10:00 AM.',
    createdAt: '2026-10-15T09:30:00.000Z'
  },
  {
    id: 'lead_edu_02',
    profileId: 'prof_edu-school',
    name: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@healthcare.org',
    phone: '+91 94401 23456',
    message: 'Inquiring about girls residential boarding facilities, 24/7 security warden, and evening study schedules for Class 8.',
    status: 'CONTACTED',
    notes: 'Shared Hostel Schedule PDF and dining menu via WhatsApp.',
    createdAt: '2026-10-14T14:15:00.000Z'
  },
  {
    id: 'lead_edu_03',
    profileId: 'prof_edu-school',
    name: 'K. Venkateshwarlu',
    email: 'k.venkat@yahoo.com',
    phone: '+91 99887 76655',
    message: 'Interested in Old Kothagudem new branch opening June 2025. Please share bus routes for Gouthamnagar and fee structure for Class 4.',
    status: 'NEW',
    notes: 'Requires transport route map and admission prospectus.',
    createdAt: '2026-10-16T11:45:00.000Z'
  },
  {
    id: 'lead_edu_04',
    profileId: 'prof_edu-school',
    name: 'Rajesh & Sunitha Kumar',
    email: 'rajesh.kumar@tcs.com',
    phone: '+91 98480 11223',
    message: 'Applying for Nursery and Class 2 admissions for our children at Maheshwaram Global campus.',
    status: 'CONVERTED',
    notes: 'Admission confirmed. Seat reservation deposit received.',
    createdAt: '2026-10-12T16:20:00.000Z'
  },
  {
    id: 'lead_re_01',
    profileId: 'prof_kishore_1',
    name: 'Vikramaditya Verma',
    email: 'vikram.verma@investors.in',
    phone: '+91 91234 56789',
    message: 'Interested in commercial plot advisory and 3D architectural reality marketing for our upcoming 14-acre development.',
    status: 'QUALIFIED',
    notes: 'High-intent investor seeking VR walkthrough suite demonstration.',
    createdAt: '2026-10-15T18:00:00.000Z'
  },
  {
    id: 'lead_re_02',
    profileId: 'prof_kishore_1',
    name: 'Meera Deshmukh',
    email: 'meera.d@techcorp.com',
    phone: '+91 98760 54321',
    message: 'Requesting enterprise proposal for 25 Commercial Mini-Websites & dynamic QR code suites for our sales team.',
    status: 'NEW',
    notes: 'Corporate bulk inquiry sent to business development.',
    createdAt: '2026-10-16T10:10:00.000Z'
  }
];

export const INITIAL_NFC_CARDS: NfcCardItem[] = [
  {
    id: 'nfc_edu_01',
    cardCode: 'NFC-EDU-2026',
    profileSlug: 'edu-school',
    serialNumber: 'SN-EDU-99214',
    status: 'ACTIVE',
    tapCount: 348,
    fulfillmentStatus: 'DELIVERED',
    createdAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 'nfc_kishore_01',
    cardCode: 'NFC-HIMAS-01',
    profileSlug: 'kishore',
    serialNumber: 'SN-HIMAS-0012',
    status: 'ACTIVE',
    tapCount: 512,
    fulfillmentStatus: 'DELIVERED',
    createdAt: '2026-01-15T10:00:00.000Z'
  }
];

export const INITIAL_QR_CODES: DynamicQrConfig[] = [
  {
    id: 'qr_edu_01',
    code: 'QR-EDU-SCHOOL',
    targetSlug: 'edu-school',
    foregroundColor: '#a90707',
    backgroundColor: '#ffffff',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
    scanCount: 890
  },
  {
    id: 'qr_kishore_01',
    code: 'QR-KISHORE-PATEL',
    targetSlug: 'kishore',
    foregroundColor: '#1e1b4b',
    backgroundColor: '#ffffff',
    scanCount: 1420
  }
];

