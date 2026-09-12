export interface VCardTemplateItem {
  id: string;
  templateNumber: number;
  name: string;
  category: 'Corporate' | 'Creative' | 'Services' | 'Healthcare' | 'Real Estate' | 'Tech';
  imgUrl: string;
  homeImgUrl?: string;
  badge?: string;
  isRibbon?: boolean;
  tagline: string;
  features: string[];
}

export const VCARD_TEMPLATES_CATALOG: VCardTemplateItem[] = [
  {
    id: 'vcard39',
    templateNumber: 39,
    name: 'Reporter vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    tagline: 'Journalists, press officers, media correspondents',
    features: ['Breaking News ticker', 'Press release links', 'Social channel matrix', '1-Click VCF sync']
  },
  {
    id: 'vcard38',
    templateNumber: 38,
    name: 'Architecture vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    tagline: 'Architects, interior designers, urban planners',
    features: ['Blueprint portfolio carousel', 'AutoCAD project showcase', 'Studio location map', 'Inquiry capture']
  },
  {
    id: 'vcard37',
    templateNumber: 37,
    name: 'Flower Garden vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    badge: 'Fresh',
    tagline: 'Florists, landscape artists, botanical nurseries',
    features: ['Bouquet catalog order', 'WhatsApp mini-store', 'Event flower bookings', 'Custom color theme']
  },
  {
    id: 'vcard36',
    templateNumber: 36,
    name: 'Travel Agency vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    tagline: 'Tour operators, travel consultants, holiday curators',
    features: ['Tour package catalogs', 'Direct booking WhatsApp chat', 'Currency & itinerary download', 'Interactive reviews']
  },
  {
    id: 'vcard35',
    templateNumber: 35,
    name: 'Real Estate vCard',
    category: 'Real Estate',
    imgUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Choice',
    tagline: 'Brokers, realtors, developers & property managers',
    features: ['Luxury listing photos', 'Virtual property tour links', 'Schedule open-house viewing', 'NFC tap pairing']
  },
  {
    id: 'vcard34',
    templateNumber: 34,
    name: 'Photographer vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80',
    badge: 'Visual Pro',
    tagline: 'Wedding photographers, studio artists, cinematographers',
    features: ['Full-screen photo album', 'Client proofing links', 'Session pricing guide', 'Direct call & WhatsApp']
  },
  {
    id: 'vcard33',
    templateNumber: 33,
    name: 'Musician vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    badge: 'Audio Ready',
    tagline: 'Artists, DJs, audio producers & music teachers',
    features: ['Spotify / Apple Music embeds', 'Gig booking slot form', 'Merch store links', 'Social fan sync']
  },
  {
    id: 'vcard32',
    templateNumber: 32,
    name: 'Interior Designer vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    tagline: 'Decorators, home staging studios, 3D visualizers',
    features: ['Before/after sliders', 'Moodboard showcase', 'Appointment booking', 'Lead quote request']
  },
  {
    id: 'vcard31',
    templateNumber: 31,
    name: 'Handyman Services vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    tagline: 'Electricians, plumbers, home contractors',
    features: ['Emergency call tap', 'Service pricing tiers', 'Google reviews embed', 'VCF quick save']
  },
  {
    id: 'vcard30',
    templateNumber: 30,
    name: 'Taxi vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Cab services, private chauffeurs, airport transport',
    features: ['Instant cab booking chat', 'Vehicle fleet images', 'Fare chart', 'One-tap phone dialer']
  },
  {
    id: 'vcard29',
    templateNumber: 29,
    name: 'Marriage vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'Special',
    tagline: 'Wedding planners, matrimony services, invitation cards',
    features: ['RSVP form capture', 'Event venue Google Map', 'Ceremony schedule', 'Photo gallery wall']
  },
  {
    id: 'vcard28',
    templateNumber: 28,
    name: 'Pet Clinic vCard',
    category: 'Healthcare',
    imgUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    tagline: 'Veterinarians, pet hospitals, animal surgeons',
    features: ['Emergency clinic hotline', 'Vaccination booking', 'Pet care guides', 'Doctor credentials']
  },
  {
    id: 'vcard27',
    templateNumber: 27,
    name: 'Pet Shop vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Pet supply stores, groomers, puppy training',
    features: ['Pet food mini-catalog', 'Grooming reservation', 'WhatsApp store checkout', 'Loyalty link']
  },
  {
    id: 'vcard26',
    templateNumber: 26,
    name: 'Retailer vCard',
    category: 'Real Estate',
    imgUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    tagline: 'Boutiques, electronics retailers, brand stores',
    features: ['Product inventory catalog', 'Discount coupons & flash deals', 'In-store directions', 'WhatsApp orders']
  },
  {
    id: 'vcard25',
    templateNumber: 25,
    name: 'Social Services / NGO vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Non-profits, charity foundations, volunteer teams',
    features: ['Donation link embed', 'Campaign impact stats', 'Volunteer sign-up form', 'Mission statement']
  },
  {
    id: 'vcard24',
    templateNumber: 24,
    name: 'Teacher vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tagline: 'Tutors, school faculty, online educators',
    features: ['Subject syllabus PDF', 'Book demo class form', 'Zoom/Meet room link', 'Student testimonials']
  },
  {
    id: 'vcard23',
    templateNumber: 23,
    name: 'Consultant vCard',
    category: 'Corporate',
    imgUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    badge: 'Executive',
    tagline: 'Management consultants, financial advisors, CPAs',
    features: ['Consulting package fees', 'Calendly / slot booking', 'Client case studies', 'LinkedIn sync']
  },
  {
    id: 'vcard22',
    templateNumber: 22,
    name: 'Dynamic vCard',
    category: 'Tech',
    imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Dynamic vCard',
    isRibbon: true,
    tagline: 'Tech-forward professionals requiring real-time live content',
    features: ['Live dynamic feeds', 'Multi-link hub', 'NFC tap instant pair', 'Lead CRM auto-sync']
  },
  {
    id: 'vcard21',
    templateNumber: 21,
    name: 'Social Media Influencers vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    badge: 'Viral',
    tagline: 'Content creators, YouTubers, Instagram influencers',
    features: ['Instagram / TikTok feed embed', 'Brand collaboration kit', 'Rate card download', 'Direct DM routing']
  },
  {
    id: 'vcard20',
    templateNumber: 20,
    name: 'Chef & Culinary vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Executive chefs, restaurant owners, catering maestros',
    features: ['Signature dish menu', 'Table reservation booking', 'Catering quote form', 'Instagram food reels']
  },
  {
    id: 'vcard19',
    templateNumber: 19,
    name: 'MakeUp Artist vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    badge: 'Glamour',
    tagline: 'Bridal stylists, beauty salons, makeup professionals',
    features: ['Bridal lookbook gallery', 'Appointment calendar', 'Service price list', 'WhatsApp direct consult']
  },
  {
    id: 'vcard18',
    templateNumber: 18,
    name: 'Corporate CEOs/CXOs vCard',
    category: 'Corporate',
    imgUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise Choice',
    tagline: 'C-Suite leaders, board members, managing directors',
    features: ['Investor relations deck', 'Executive bio & achievements', 'VIP contact passkey', 'Matte NFC card match']
  },
  {
    id: 'vcard17',
    templateNumber: 17,
    name: 'Developer vCard',
    category: 'Tech',
    imgUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Developer',
    tagline: 'Fullstack engineers, DevOps architects, open source devs',
    features: ['GitHub repo showcase', 'StackOverflow & tech stack badges', 'Live project links', 'Resume download']
  },
  {
    id: 'vcard16',
    templateNumber: 16,
    name: 'Lawyer vCard',
    category: 'Corporate',
    imgUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    badge: 'Legal Pro',
    tagline: 'Attorneys, legal consultants, law firms',
    features: ['Practice areas breakdown', 'Confidential consultation form', 'Court bar registration badge', 'Office directions']
  },
  {
    id: 'vcard15',
    templateNumber: 15,
    name: 'Stylish vCard',
    category: 'Creative',
    imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    badge: 'Modern',
    tagline: 'Fashion stylists, models, luxury personal branders',
    features: ['Lookbook magazine layout', 'Brand sponsorship links', 'High-res headshots', 'Smart bio summary']
  },
  {
    id: 'vcard14',
    templateNumber: 14,
    name: 'Event Planner vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    tagline: 'Wedding coordinators, corporate gala organizers',
    features: ['Event portfolio videos', 'Vendor partner list', 'Date availability calendar', 'WhatsApp instant chat']
  },
  {
    id: 'vcard13',
    templateNumber: 13,
    name: 'Doctor vCard',
    category: 'Healthcare',
    imgUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    badge: 'Healthcare',
    tagline: 'Physicians, specialists, surgeons & dental clinics',
    features: ['OPD clinic timing', 'Online appointment booking', 'Medical qualification credentials', 'Emergency call button']
  },
  {
    id: 'vcard12',
    templateNumber: 12,
    name: 'Gym Trainer vCard',
    category: 'Services',
    imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    homeImgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    badge: 'Fitness',
    tagline: 'Fitness coaches, personal trainers, gym owners',
    features: ['Workout transformation photos', 'Diet plan downloads', 'Book training session', 'Direct WhatsApp coaching']
  }
];
