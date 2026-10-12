import { DigitalProfile, BookingSlot, LeadItem, StoreOrder, DynamicQrConfig, NfcCardItem, BlogPostItem, ThemeType } from './types';
import { SAMPLE_BLOG_POSTS } from './blog-data';

export const INITIAL_BLOGS: BlogPostItem[] = SAMPLE_BLOG_POSTS;

export const INITIAL_PROFILES: DigitalProfile[] = [
  {
    id: 'prof_kishore_1',
    organizationId: 'org_himastech_1',
    slug: 'kishore',
    name: 'Kishore Patel',
    designation: 'Founder & Managing Director',
    company: 'Himastech Landmark Developers & Builders',
    bio: 'Crafting landmark residential towers, TS-RERA approved gated luxury townships, and next-generation commercial IT business parks. Over 2.5 million sq.ft of on-time delivered excellence across Hyderabad.',
    email: 'projects@himastech.com',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    website: 'https://himastech.com',
    address: 'Road No. 36, Jubilee Hills & Kokapet Financial District, Hyderabad, Telangana',
    avatarUrl: '/kishore-profile-v2.png',
    coverUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
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
        content: 'With over 18 years of benchmark excellence in prime real estate construction and luxury urban developments, Himastech Landmark Developers & Builders delivers iconic high-rise residential towers, gated villa sanctuaries, and Grade-A commercial hubs with 100% clear titles, TS-RERA statutory compliance, and premier architectural aesthetics.'
      },
      socials: {
        items: [
          { id: 'soc_1', platform: 'whatsapp', url: 'https://wa.me/919876543210', label: 'Sales WhatsApp' },
          { id: 'soc_2', platform: 'linkedin', url: 'https://linkedin.com/in/kishorepatel', label: 'LinkedIn' },
          { id: 'soc_3', platform: 'instagram', url: 'https://instagram.com/himastech.reality', label: 'Instagram' },
          { id: 'soc_4', platform: 'phone', url: 'tel:+919876543210', label: 'Call Desk' },
          { id: 'soc_5', platform: 'website', url: 'https://himastech.com', label: 'Official Website' },
        ]
      },
      realEstate: {
        city: 'Hyderabad',
        reraId: 'TS-RERA/P02400008920',
        trackRecordYears: '18+ Years',
        deliveredProjects: '18+',
        developedAcres: '450+',
        happyFamilies: '2,400+',
        clearTitleRating: '100%'
      },
      services: {
        items: [
          {
            id: 'srv_1',
            title: 'Schedule VIP Chauffeured Site Visit & Model Flat Tour',
            description: 'Personalized private chauffeured tour of 3 & 4 BHK model sky apartments, 50,000 sq.ft sky clubhouse, and amenities in Kokapet.',
            durationMinutes: 60,
            price: 0,
            currency: '₹'
          },
          {
            id: 'srv_2',
            title: 'Architectural Blueprint & Floor Plan Consultation',
            description: '1-on-1 consultation for custom interior configurations, vastu compliance audit, and carpet area breakdowns.',
            durationMinutes: 45,
            price: 0,
            currency: '₹'
          },
          {
            id: 'srv_3',
            title: 'Home Loan Pre-Approval & Financial Advisory',
            description: 'Zero-processing fee partner bank tie-ups with SBI, HDFC & ICICI Bank with pre-sanctioned preferential interest rates.',
            durationMinutes: 30,
            price: 0,
            currency: '₹'
          }
        ]
      },
      products: {
        items: [
          {
            id: 'prod_1',
            name: 'Himastech Imperia 3 & 4 BHK Luxury Residences',
            description: 'High-rise ultra luxury residential towers in Kokapet Financial District with 50,000 sq.ft sky clubhouse, infinity pool & 100% Vastu. TS-RERA Approved.',
            price: 18500000,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            category: 'Residential Towers',
            sku: 'HIMAS-IMP-01',
            isAvailable: true
          },
          {
            id: 'prod_2',
            name: 'Himastech Grandeur 4 & 5 BHK Triplex Gated Villas',
            description: '22-acre gated villa community in Mokila with private temperature-controlled plunge pool, solar power & European fittings.',
            price: 27500000,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
            category: 'Luxury Villas',
            sku: 'HIMAS-GRD-02',
            isAvailable: true
          },
          {
            id: 'prod_3',
            name: 'Himastech Aeropolis 150-350 Sq.Yds Plotted Township',
            description: 'HMDA & TS-RERA approved gated open plot community near Shamshabad Airport & ORR with 40ft blacktop roads & 24/7 security.',
            price: 3650000,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
            category: 'Open Plots',
            sku: 'HIMAS-AERO-03',
            isAvailable: true
          },
          {
            id: 'prod_4',
            name: 'Himastech Business Hub Grade-A Commercial IT Suites',
            description: 'Grade-A tech park office spaces with 100% power backup, high-speed elevators & instant metro connectivity in Hitec City.',
            price: 9500000,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            category: 'Commercial Suites',
            sku: 'HIMAS-HUB-04',
            isAvailable: true
          }
        ]
      },
      videos: {
        items: [
          {
            id: 'vid_1',
            title: 'Himastech Imperia — 4K Aerial Drone Layout Tour & Surroundings',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            caption: '4K aerial drone flight showcasing 100ft arterial roads, upcoming metro line, and clubhouse elevation in Kokapet.'
          },
          {
            id: 'vid_2',
            title: 'Model 4 BHK Sky Residence — Complete Architectural Walkthrough',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            caption: 'Walkthrough of master suite, panoramic lake-view deck balcony, Italian marble foyer, and smart home automation.'
          },
          {
            id: 'vid_ig_1',
            title: 'Himastech Grandeur Triplex Villas — Clubhouse & Pool Tour',
            url: 'https://www.instagram.com/reel/C3M8W98oG12/',
            type: 'instagram',
            embedUrl: 'https://www.instagram.com/reel/C3M8W98oG12/embed',
            caption: 'Exclusive reel walkthrough of private plunge pool, double-height living room, and landscaped lawns in Mokila.'
          },
          {
            id: 'vid_ig_2',
            title: 'Himastech Aeropolis — Rapid Site Progression & 40ft Roads',
            url: 'https://www.instagram.com/reel/DbNGzEmRwlb/',
            type: 'instagram',
            embedUrl: 'https://www.instagram.com/reel/DbNGzEmRwlb/embed',
            caption: 'Latest on-site reel: Underground cabling, street illumination, and demarcated boundary stones.'
          }
        ]
      },
      gallery: {
        items: [
          { 
            id: 'gal_1', 
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', 
            title: 'Himastech Imperia High-Rise Elevation',
            category: 'Residential Towers',
            description: 'High-rise luxury sky towers with panoramic city and lake views in Kokapet Financial District.'
          },
          { 
            id: 'gal_2', 
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 
            title: 'Model 4 BHK Sky Suite Living & Dining Lounge',
            category: 'Interiors',
            description: 'Double-height Italian marble living lounge with panoramic lake-view sundeck balconies.'
          },
          { 
            id: 'gal_3', 
            imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', 
            title: 'Himastech Grandeur Triplex Villa Facade',
            category: 'Gated Villas',
            description: 'Triplex luxury villa with private landscaped lawn and rooftop plunge pool in Mokila.'
          },
          { 
            id: 'gal_4', 
            imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', 
            title: 'On-Site Construction Progress & Quality Audit',
            category: 'Construction Progress',
            description: 'Uncompromising engineering standards with MIVAN formwork and forensic structural audits.'
          }
        ]
      },
      testimonials: {
        items: [
          {
            id: 'tst_1',
            clientName: 'Dr. Srinivas Rao',
            clientRole: 'Chief Neurosurgeon & Property Investor',
            clientCompany: 'Continental Hospitals',
            clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            content: 'We booked our 4 BHK residence in Himastech Imperia. The construction quality, floor-to-ceiling glass balconies, and prompt legal documentation made it completely seamless.',
            rating: 5
          },
          {
            id: 'tst_2',
            clientName: 'Pooja & Harish Nair',
            clientRole: 'Tech VP, Google Hyderabad',
            clientCompany: 'Google India',
            clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            content: 'Himastech Landmark Developers delivered our home right on time with verified TS-RERA certificates. Their team is exceptionally transparent and professional.',
            rating: 5
          },
          {
            id: 'tst_3',
            clientName: 'K. Venkat Reddy',
            clientRole: 'NRI Investor (San Jose, California)',
            clientCompany: 'Silicon Valley Tech',
            clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            content: 'Being based in the US, I relied on Himastech Developers for our plot investment in Aeropolis. From title search to spot registration, the transparency was 100%.',
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
  }
];

import { getTemplateProfile } from '@/data/templatePresets';
import { VCARD_TEMPLATES_CATALOG } from '@/data/vcardTemplates';

export function getProfileBySlug(rawSlug: string): DigitalProfile {
  const cleanSlug = (rawSlug || '').toLowerCase().trim();
  
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

  // 4. Check if slug matches any catalog template (by id or normalized name)
  const matchedTemplate = VCARD_TEMPLATES_CATALOG.find(
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
       cleanSlug.startsWith('food-') ? 'food-restaurant' :
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
    bio: `Welcome to ${formattedName}'s official digital card and WhatsApp store. Explore our services, browse products, or book a consultation call directly.`,
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
            description: 'Full profile studio configuration with dynamic QR and vCard management.',
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
            content: 'Outstanding experience and swift communication. The digital card made networking effortless!',
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

export const INITIAL_BOOKINGS: BookingSlot[] = [];

export const INITIAL_LEADS: LeadItem[] = [];

export const INITIAL_NFC_CARDS: NfcCardItem[] = [];

export const INITIAL_QR_CODES: DynamicQrConfig[] = [];

