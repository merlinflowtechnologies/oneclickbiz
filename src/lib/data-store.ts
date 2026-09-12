import { DigitalProfile, BookingSlot, LeadItem, StoreOrder, DynamicQrConfig, NfcCardItem, BlogPostItem } from './types';

export const INITIAL_BLOGS: BlogPostItem[] = [];

export const INITIAL_PROFILES: DigitalProfile[] = [
  {
    id: 'prof_alex_1',
    organizationId: 'org_apex_1',
    slug: 'alex',
    name: 'Alex Rivera',
    designation: 'Creative Director & Founder',
    company: 'Apex Digital Studio',
    bio: 'Helping high-growth brands scale with modern UI/UX design, custom web platforms, and automated marketing funnels.',
    email: 'alex@apexstudio.design',
    phone: '+91 63049 89071',
    whatsapp: '916304989071',
    website: 'https://apexstudio.design',
    address: 'Indiranagar, Bangalore, India',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
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
        content: 'With over 9 years of design & engineering leadership, I craft digital experiences that convert. We have partnered with 80+ startups and Fortune 500 brands to build bespoke web applications, mobile apps, and brand identities.'
      },
      socials: {
        items: [
          { id: 'soc_1', platform: 'whatsapp', url: 'https://wa.me/916304989071', label: 'WhatsApp' },
          { id: 'soc_2', platform: 'linkedin', url: 'https://linkedin.com/in/alexrivera', label: 'LinkedIn' },
          { id: 'soc_3', platform: 'instagram', url: 'https://instagram.com/alexrivera.design', label: 'Instagram' },
          { id: 'soc_4', platform: 'twitter', url: 'https://twitter.com/alexrivera', label: 'X (Twitter)' },
          { id: 'soc_5', platform: 'github', url: 'https://github.com/alexrivera', label: 'GitHub' },
        ]
      },
      services: {
        items: [
          {
            id: 'srv_1',
            title: 'Fullstack Web & Mobile App Development',
            description: 'Next.js, React, Node.js, and iOS/Android applications built for production scale.',
            durationMinutes: 45,
            price: 49999,
            currency: '₹'
          },
          {
            id: 'srv_2',
            title: 'Brand Identity & Design System',
            description: 'Complete visual identity, logo system, typography, and responsive component library.',
            durationMinutes: 30,
            price: 24999,
            currency: '₹'
          },
          {
            id: 'srv_3',
            title: '1-on-1 Product & Growth Strategy Call',
            description: 'Direct deep-dive audit of your SaaS architecture, UI/UX, and marketing funnel.',
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
            name: 'Apex UI Kit & Figma Design System Pro',
            description: '500+ prebuilt components, tokens, and 45 responsive page templates.',
            price: 2999,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'AUI-001',
            isAvailable: true
          },
          {
            id: 'prod_2',
            name: 'Custom Smart Digital Business Card Setup',
            description: 'Custom luxury digital visiting card layout with dynamic QR code linking to your profile.',
            price: 1499,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
            category: 'Digital Goods',
            sku: 'VC-PRO',
            isAvailable: true
          },
          {
            id: 'prod_3',
            name: 'Website Performance & SEO Audit Pack',
            description: 'Comprehensive Core Web Vitals, technical SEO, and accessibility report with action plan.',
            price: 7999,
            currency: '₹',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
            category: 'Services',
            sku: 'AUD-SEO',
            isAvailable: true
          }
        ]
      },
      videos: {
        items: [
          {
            id: 'vid_1',
            title: 'Apex Brand Reel & Design System Showcase',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'youtube',
            embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            caption: 'Watch how we designed and engineered high-converting SaaS interfaces for 40+ brands.'
          },
          {
            id: 'vid_2',
            title: 'Behind the Scenes: Digital Business Card Creation Walkthrough',
            url: 'https://www.instagram.com/reel/C8qL_XYZ123/',
            type: 'instagram',
            caption: 'Exclusive studio demonstration of our premium digital cards.'
          },
          {
            id: 'vid_3',
            title: 'Client Case Study: 300% Conversion Uplift',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            type: 'direct',
            caption: 'Deep-dive walkthrough of the architecture overhaul and UI redesign.'
          }
        ]
      },
      gallery: {
        items: [
          { 
            id: 'gal_1', 
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 
            title: 'Fintech Dashboard & Analytics Web App',
            category: 'UI/UX Design',
            description: 'Modern dark-mode analytics platform with live data widgets and responsive charts.'
          },
          { 
            id: 'gal_2', 
            imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80', 
            title: 'Luxury E-commerce Mobile App',
            category: 'Mobile Apps',
            description: 'iOS and Android shopping app with 1-click Apple Pay & instant WhatsApp checkout.'
          },
          { 
            id: 'gal_3', 
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 
            title: 'SaaS Marketing Funnel & Brand Identity',
            category: 'Branding',
            description: 'High-converting landing page with 3D illustration and interactive product demos.'
          }
        ]
      },
      testimonials: {
        items: [
          {
            id: 'tst_1',
            clientName: 'Sarah Jenkins',
            clientRole: 'VP of Marketing',
            clientCompany: 'CloudScale AI',
            clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
            content: 'Alex transformed our brand identity and delivered a stunning high-converting digital presence in record time. Phenomenal work!',
            rating: 5
          },
          {
            id: 'tst_2',
            clientName: 'Rahul Verma',
            clientRole: 'Co-Founder & CEO',
            clientCompany: 'NeoFin Global',
            clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            content: 'The digital business card and WhatsApp store integration brought us 3x more qualified client meetings directly from networking events.',
            rating: 5
          }
        ]
      },
      blogs: {
        items: INITIAL_BLOGS
      },
      customLinks: {
        items: [
          { id: 'cl_1', title: 'View Design Portfolio & Case Studies', url: 'https://behance.net', highlight: true },
          { id: 'cl_2', title: 'Download 2026 Agency Rate Card (PDF)', url: '#' },
          { id: 'cl_3', title: 'Listen to my Podcast on Spotify', url: 'https://spotify.com' }
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
    qrCodeId: 'qr_alex_01',
    nfcCardId: 'nfc_alex_01',
    stats: {
      views: 1842,
      qrScans: 620,
      nfcTaps: 418,
      whatsappClicks: 289,
      callClicks: 147,
      vcfDownloads: 395
    }
  }
];

import { getTemplateProfile } from '@/data/templatePresets';
import { VCARD_TEMPLATES_CATALOG } from '@/data/vcardTemplates';

export function getProfileBySlug(rawSlug: string): DigitalProfile {
  const cleanSlug = (rawSlug || '').toLowerCase().trim();
  
  // 1. Check in initial profiles
  const found = INITIAL_PROFILES.find(p => p.slug.toLowerCase() === cleanSlug);
  if (found) return found;

  // 2. Check if slug matches any of the 28 vCard templates (e.g. vcard39, vcard38, vcard13)
  const matchedTemplate = VCARD_TEMPLATES_CATALOG.find(
    t => t.id.toLowerCase() === cleanSlug || t.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === cleanSlug
  );
  if (matchedTemplate || cleanSlug.startsWith('vcard')) {
    const templateId = matchedTemplate?.id || (cleanSlug.startsWith('vcard') ? cleanSlug : 'vcard39');
    return getTemplateProfile(templateId);
  }

  // 3. Format a friendly name from slug e.g. "rahul-sharma" -> "Rahul Sharma"
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

