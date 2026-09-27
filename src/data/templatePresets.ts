import { DigitalProfile, ThemeType, ServiceItem, ProductItem, GalleryItem, VideoItem, TestimonialItem, SocialLinkItem } from '@/lib/types';
import { VCARD_TEMPLATES_CATALOG } from './vcardTemplates';

export interface TemplatePresetConfig {
  id: string;
  name: string;
  designation: string;
  company: string;
  bio: string;
  theme: ThemeType;
  avatarUrl: string;
  coverUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
  services: ServiceItem[];
  products: ProductItem[];
  gallery: GalleryItem[];
  videos: VideoItem[];
  testimonials: TestimonialItem[];
  socials: SocialLinkItem[];
}

export const TEMPLATE_PRESETS_DATA: Record<string, Partial<TemplatePresetConfig>> = {
  're-builders': {
    name: 'Vikramaditya Roy',
    designation: 'Managing Director & Chief Infrastructure Officer',
    company: 'Skyline Landmark Developers & Builders',
    bio: 'Crafting landmark residential towers, RERA-approved gated luxury townships, and next-generation commercial IT business parks. Over 2.5 million sq.ft of on-time delivered excellence.',
    theme: 'modern-indigo',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    email: 'projects@skylinedevelopers.com',
    phone: '+91 98765 44001',
    whatsapp: '919876544001',
    website: 'https://skylinedevelopers.com',
    address: 'Skyline Tower One, Financial District, Hyderabad, India',
    services: [
      { id: 's_bld_1', title: 'Schedule VIP Site Visit & Sample Flat Tour', description: 'Personalized private chauffeured tour of model apartments and clubhouse amenities.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_bld_2', title: 'Architectural Blueprint & Floor Plan Consultation', description: 'Customization options, vastu compliance review, and carpet area breakdown.', durationMinutes: 45, price: 0, currency: '₹' },
      { id: 's_bld_3', title: 'Home Loan Pre-Approval & Financial Advisory', description: 'Zero-processing fee partner bank tie-ups with SBI, HDFC & ICICI.', durationMinutes: 30, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_bld_1', name: 'Skyline Imperia 3 & 4 BHK Luxury Residences', description: 'High-rise ultra luxury towers with 40,000 sq.ft sky-deck clubhouse. RERA Approved.', price: 18500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', category: 'Residential Towers', isAvailable: true },
      { id: 'p_bld_2', name: 'Skyline Business Hub Commercial Office Suites', description: 'Grade-A tech park office spaces with 100% power backup and metro connectivity.', price: 9500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', category: 'Commercial Suites', isAvailable: true }
    ],
    gallery: [
      { id: 'g_bld_1', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', title: 'Skyline Imperia Exterior View', category: 'Completed Projects' },
      { id: 'g_bld_2', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Sample Luxury Living Room', category: 'Interiors' },
      { id: 'g_bld_3', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'On-Site Construction Progress', category: 'Ongoing Projects' }
    ],
    socials: [
      { id: 'soc_bld_wa', platform: 'whatsapp', url: 'https://wa.me/919876544001', label: 'Sales WhatsApp' },
      { id: 'soc_bld_ph', platform: 'phone', url: 'tel:+919876544001', label: 'Call Desk' },
      { id: 'soc_bld_in', platform: 'instagram', url: 'https://instagram.com/skylinedevelopers', label: 'Instagram' },
      { id: 'soc_bld_li', platform: 'linkedin', url: 'https://linkedin.com/company/skyline-developers', label: 'LinkedIn' }
    ]
  },
  vcard39: {
    name: 'Richard Madden',
    designation: 'Senior Investigative Reporter & Media Correspondent',
    company: 'Metro Global Press Bureau',
    bio: 'Award-winning journalist covering breaking technology news, investigative scoops, and global geopolitics. Delivering truthful, fact-checked reporting.',
    theme: 'dark-onyx',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    email: 'richard.madden@globalpress.org',
    phone: '+91 98765 11039',
    whatsapp: '919876511039',
    website: 'https://globalpress.org/richard-madden',
    address: 'Press Enclave, Fleet Avenue, New Delhi, India',
    services: [
      { id: 's_rep_1', title: 'Press Briefing & Conference Coverage', description: 'On-ground live reporting and real-time coverage for major announcements.', durationMinutes: 120, price: 15000, currency: '₹' },
      { id: 's_rep_2', title: 'Editorial Consulting & Op-Ed Writing', description: 'High-impact thought leadership articles and investigative features.', durationMinutes: 60, price: 8500, currency: '₹' },
      { id: 's_rep_3', title: 'Exclusive 1-on-1 Executive Interview', description: 'In-depth video or audio podcast interview with industry CEOs & leaders.', durationMinutes: 45, price: 12000, currency: '₹' }
    ],
    products: [
      { id: 'p_rep_1', name: 'Annual Media Digest 2026', description: 'Comprehensive investigative reports and journalism archives.', price: 999, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80', category: 'Publications', isAvailable: true }
    ],
    socials: [
      { id: 'soc_tw', platform: 'twitter', url: 'https://twitter.com/richardmadden_press', label: 'X (Twitter)' },
      { id: 'soc_yt', platform: 'youtube', url: 'https://youtube.com/@globalpress', label: 'YouTube' },
      { id: 'soc_li', platform: 'linkedin', url: 'https://linkedin.com/in/richard-madden-press', label: 'LinkedIn' },
      { id: 'soc_wa', platform: 'whatsapp', url: 'https://wa.me/919876511039', label: 'WhatsApp' }
    ]
  },
  vcard38: {
    name: 'Marcus Vance',
    designation: 'Principal Architect & Urban Designer',
    company: 'Vance Architecture Studio',
    bio: 'Designing sustainable luxury residences, commercial high-rises, and eco-friendly urban masterplans. Crafting architectural spaces that inspire human living.',
    theme: 'glassmorphic',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    email: 'marcus@vance-architects.com',
    phone: '+91 98765 22038',
    whatsapp: '919876522038',
    website: 'https://vance-architects.com',
    address: 'Design District, Bandra West, Mumbai, India',
    services: [
      { id: 's_arc_1', title: 'Luxury Villa Architectural Blueprint', description: 'End-to-end structural plans, elevations, and permit-ready blueprints.', durationMinutes: 90, price: 45000, currency: '₹' },
      { id: 's_arc_2', title: '3D Photorealistic Exterior Rendering', description: 'Ultra HD 4K architectural visual walkthroughs and lighting simulations.', durationMinutes: 60, price: 20000, currency: '₹' },
      { id: 's_arc_3', title: 'Site Inspection & Feasibility Audit', description: 'On-site structural evaluation and land topography analysis.', durationMinutes: 120, price: 15000, currency: '₹' }
    ],
    gallery: [
      { id: 'g_arc_1', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'The Obsidian Villa', category: 'Residential' },
      { id: 'g_arc_2', imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', title: 'Glass Horizon Tower', category: 'Commercial' },
      { id: 'g_arc_3', imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', title: 'Courtyard Minimalist Residence', category: 'Urban Design' }
    ]
  },
  vcard37: {
    name: 'Bella Fiore',
    designation: 'Master Botanical Florist & Garden Curator',
    company: 'Bella Flora Luxury Studio',
    bio: 'Fresh imported Dutch tulips, bespoke bridal bouquets, and luxury floral staging for grand weddings and private celebrity events.',
    theme: 'emerald-pro',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=80',
    email: 'hello@bellaflora.store',
    phone: '+91 98765 33037',
    whatsapp: '919876533037',
    website: 'https://bellaflora.store',
    address: 'Koregaon Park, Pune, Maharashtra, India',
    products: [
      { id: 'p_flo_1', name: 'Luxe Crimson Rose Velvet Box', description: '50 handpicked Ecuadorian long-stem red roses in luxury suede box.', price: 3499, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80', category: 'Luxury Bouquets', isAvailable: true },
      { id: 'p_flo_2', name: 'Pastel Orchid & Hydrangea Arrangement', description: 'Delicate purple orchids paired with fresh morning hydrangeas.', price: 2799, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80', category: 'Exotics', isAvailable: true },
      { id: 'p_flo_3', name: 'Japanese Bonsai Ceramic Pot', description: '10-year cultivated Ficus Bonsai in glazed minimalist ceramic bowl.', price: 1899, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80', category: 'Plants', isAvailable: true }
    ],
    services: [
      { id: 's_flo_1', title: 'Wedding Stage Floral Staging', description: 'Full venue transformation with fragrant seasonal blooms.', durationMinutes: 180, price: 75000, currency: '₹' },
      { id: 's_flo_2', title: 'Corporate Floral Subscription (Monthly)', description: 'Weekly fresh desk and reception floral vase rotations.', durationMinutes: 30, price: 12000, currency: '₹' }
    ]
  },
  vcard36: {
    name: 'Elena Rostova',
    designation: 'Luxury Travel Curator & Tour Operator',
    company: 'Wanderlust Horizon Expeditions',
    bio: 'Curating bespoke international travel itineraries, private chartered flights, luxury safari retreats, and 5-star honeymoon holidays worldwide.',
    theme: 'sunset-gold',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    email: 'concierge@wanderlust-horizon.com',
    phone: '+91 98765 44036',
    whatsapp: '919876544036',
    website: 'https://wanderlust-horizon.com',
    address: 'Aerocity Worldmark 2, New Delhi, India',
    services: [
      { id: 's_trv_1', title: 'Bespoke Europe Vacation Curation', description: '7-14 day private itinerary with 5-star villas, VIP train passes, and guides.', durationMinutes: 60, price: 25000, currency: '₹' },
      { id: 's_trv_2', title: 'Fast-Track Global Visa Concierge', description: 'Complete documentation and interview preparation for US, UK & Schengen visas.', durationMinutes: 45, price: 6500, currency: '₹' },
      { id: 's_trv_3', title: 'Private Island & Yacht Charter', description: 'Exclusive charter booking in Maldives, Dubai, and the Greek Isles.', durationMinutes: 60, price: 50000, currency: '₹' }
    ]
  },
  vcard35: {
    name: 'David Sterling',
    designation: 'Prime Property Broker & Real Estate Consultant',
    company: 'Sterling Global Estates',
    bio: 'Specializing in ultra-luxury penthouses, gated golf villas, and high-yield commercial commercial REIT investments across top metro cities.',
    theme: 'modern-indigo',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    email: 'david@sterling-estates.com',
    phone: '+91 98765 55035',
    whatsapp: '919876555035',
    website: 'https://sterling-estates.com',
    address: 'One Horizon Center, Golf Course Road, Gurgaon, India',
    services: [
      { id: 's_re_1', title: 'VIP Luxury Penthouse Private Tour', description: 'Personal chauffeur-driven viewing of premium gated residential properties.', durationMinutes: 90, price: 0, currency: '₹' },
      { id: 's_re_2', title: 'Property Valuation & Title Verification', description: 'Complete legal title search, circle rate analysis, and fair market appraisal.', durationMinutes: 60, price: 12500, currency: '₹' },
      { id: 's_re_3', title: 'Commercial Office Space Advisory', description: 'Assisting corporate tenants with floorplate leasing and tenant agreements.', durationMinutes: 60, price: 20000, currency: '₹' }
    ]
  },
  vcard34: {
    name: 'Aarav Mehta',
    designation: 'Celebrity & Destination Wedding Photographer',
    company: 'Lumière Visual Studio',
    bio: 'Capturing unforgettable destination weddings, high-fashion editorials, and cinematic 4K brand films with natural lighting and timeless artistic elegance.',
    theme: 'dark-onyx',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
    email: 'aarav@lumiere-studio.com',
    phone: '+91 98765 99034',
    whatsapp: '919876599034',
    website: 'https://lumiere-studio.com',
    address: 'Studio Lumière, Fort Art District, Mumbai, India',
    services: [
      { id: 's_pho_1', title: 'Destination Wedding 3-Day Photography', description: 'Complete traditional & candid coverage with 3 senior photographers + drone crew.', durationMinutes: 180, price: 125000, currency: '₹' },
      { id: 's_pho_2', title: 'Cinematic Pre-Wedding Shoot & Story Film', description: 'Scenic outdoor location shoot, 3 outfit changes, 4K teaser, and 50 retouched photos.', durationMinutes: 120, price: 45000, currency: '₹' },
      { id: 's_pho_3', title: 'High-Fashion & Studio Portrait Session', description: 'Creative lighting, artistic direction, hair & makeup assistance, 15 retouched masters.', durationMinutes: 90, price: 25000, currency: '₹' },
      { id: 's_pho_4', title: '4K Commercial Brand & Product Shoot', description: 'E-commerce styling, flat-lays, model lookbook, and high-res print master files.', durationMinutes: 120, price: 35000, currency: '₹' }
    ],
    products: [
      { id: 'p_pho_1', name: 'Luxury Italian Leather Wedding Album', description: 'Handcrafted flush-mount album with metallic archival photo paper (40 pages).', price: 18500, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', category: 'Albums', isAvailable: true },
      { id: 'p_pho_2', name: 'Raw + Graded 4K Master Video USB Box', description: 'Engraved wooden keepsake box with 128GB high-speed master footage drive.', price: 6500, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', category: 'Keepsakes', isAvailable: true }
    ],
    gallery: [
      { id: 'g_pho_1', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Royal Udaipur Palace Wedding', category: 'Weddings', description: 'Grand heritage celebration capturing the royal varmala ritual under palace fireworks.' },
      { id: 'g_pho_2', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', title: 'Sunset Bridal Golden Glow', category: 'Weddings', description: 'Candid golden-hour portrait showcasing intricate royal bridal lehenga details.' },
      { id: 'g_pho_3', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', title: 'Monochrome High-Fashion Editorial', category: 'Portraits', description: 'Studio chiaroscuro lighting capturing raw emotion and timeless fashion styling.' },
      { id: 'g_pho_4', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80', title: 'Himachal Misty Mountain Pre-Wedding', category: 'Pre-Wedding', description: 'Dramatic scenic landscape shoot amidst cedar forests and snow-capped peaks.' },
      { id: 'g_pho_5', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'Floral Mandap Sacred Vows', category: 'Weddings', description: 'Emotional tears of joy during the traditional saptapadi vows.' },
      { id: 'g_pho_6', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', title: 'Luxury Audio Brand Commercial', category: 'Commercial', description: 'Crisp editorial product shoot for flagship premium headphones launch.' }
    ],
    videos: [
      { id: 'v_pho_1', title: 'Cinematic Royal Wedding Film (4K)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'youtube', caption: 'Watch our 4K cinematic wedding story film.' },
      { id: 'v_pho_2', title: 'Destination Pre-Wedding Love Story', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'youtube', caption: 'Romantic teaser shot on RED Digital Cinema.' }
    ],
    testimonials: [
      { id: 't_pho_1', clientName: 'Rohan & Ananya Kapoor', clientRole: 'Udaipur Destination Wedding', content: 'Aarav and his crew were invisible yet captured the most soul-stirring moments. The photos feel like a Vogue magazine feature!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_pho_2', clientName: 'Natasha Verma', clientRole: 'Creative Director, Vibe Fashion', content: 'Consistently exceptional lighting and framing. Aarav delivered our campaign lookbook 3 days ahead of schedule!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  vcard13: {
    name: 'Dr. Alistair Chen, MD',
    designation: 'Senior Consultant Cardiologist & Specialist',
    company: 'Apex Heart & Vascular Hospital',
    bio: 'Gold medalist cardiologist with 18+ years of clinical excellence in non-invasive cardiology, preventive lipid management, and hypertension treatments.',
    theme: 'emerald-pro',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    email: 'dr.chen@apexheart.health',
    phone: '+91 98765 66013',
    whatsapp: '919876566013',
    website: 'https://apexheart.health/dr-chen',
    address: 'Apollo Medical Enclave, Jubilee Hills, Hyderabad, India',
    services: [
      { id: 's_doc_1', title: 'Clinical Cardiology Consultation', description: 'Comprehensive cardiovascular assessment, history review, and ECG analysis.', durationMinutes: 30, price: 1500, currency: '₹' },
      { id: 's_doc_2', title: 'Comprehensive 2D Echocardiography', description: 'Ultrasound Doppler heart structure and blood flow diagnostic imaging.', durationMinutes: 45, price: 3500, currency: '₹' },
      { id: 's_doc_3', title: 'Holter 24-Hour Heart Rhythm Monitoring', description: 'Continuous ECG recording to diagnose arrhythmia and palpitations.', durationMinutes: 30, price: 4200, currency: '₹' }
    ]
  },
  vcard16: {
    name: 'Adv. Harrison Reed',
    designation: 'Managing Partner & Corporate Legal Counsel',
    company: 'Reed & Chambers Legal Advocates',
    bio: 'Trusted legal advisor to high-growth startups, corporate boards, and founders. Specialized in M&A deals, intellectual property litigation, and dispute resolution.',
    theme: 'dark-onyx',
    avatarUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    email: 'harrison.reed@reedlaw.in',
    phone: '+91 98765 77016',
    whatsapp: '919876577016',
    website: 'https://reedlaw.in',
    address: 'High Court Chambers, Barakhamba Road, New Delhi, India',
    services: [
      { id: 's_law_1', title: 'Startup Founders Agreement & Equity Structuring', description: 'Review of cap tables, vesting schedules, and shareholder agreements.', durationMinutes: 60, price: 15000, currency: '₹' },
      { id: 's_law_2', title: 'Commercial Contract Drafting & Review', description: 'Vendor contracts, MSAs, NDAs, and licensing legal documentation.', durationMinutes: 60, price: 9500, currency: '₹' },
      { id: 's_law_3', title: 'Trademark & Patent Filing Strategy', description: 'Complete brand protection, IP classification, and filing before registrar.', durationMinutes: 45, price: 12000, currency: '₹' }
    ]
  },
  vcard12: {
    name: 'Alex Thorne',
    designation: 'Elite Strength Coach & Sports Nutritionist',
    company: 'IronPeak Performance Lab',
    bio: 'Transforming bodies and mindsets with scientific hypertrophy programs, fat-loss protocols, and personalized nutrition guidance for high-performing professionals.',
    theme: 'sunset-gold',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    email: 'alex@ironpeak.fit',
    phone: '+91 98765 88012',
    whatsapp: '919876588012',
    website: 'https://ironpeak.fit',
    address: 'IronPeak Gym, HSR Layout Sector 2, Bangalore, India',
    services: [
      { id: 's_gym_1', title: '1-on-1 Personal Training Session', description: 'High-intensity tailored resistance training and posture coaching.', durationMinutes: 60, price: 2000, currency: '₹' },
      { id: 's_gym_2', title: '12-Week Body Recomposition Blueprint', description: 'Custom macro meal plans, workout schedule, and weekly check-in calls.', durationMinutes: 45, price: 18000, currency: '₹' },
      { id: 's_gym_3', title: 'InBody Composition & Metabolic Rate Test', description: 'Detailed scan of body fat percentage, skeletal muscle mass, and BMR.', durationMinutes: 30, price: 1500, currency: '₹' }
    ],
    products: [
      { id: 'p_gym_1', name: 'IronPeak Hydro Whey Protein (2kg)', description: 'Ultra-pure grass-fed whey isolate with 27g protein per scoop.', price: 4499, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80', category: 'Supplements', isAvailable: true }
    ]
  },

  // ========================================================
  // 1. 🎪 EVENTS & WEDDING PLANNER
  // ========================================================
  'events-planner': {
    name: 'Shreya Reddy & Srikanth Varma',
    designation: 'Founder & Principal Wedding Architect',
    company: 'Grandeur Luxury Events & Destination Weddings',
    bio: 'Curating royal destination weddings, experiential Sangeet stages, celebrity corporate galas, and thematic birthday celebrations across Hyderabad, Udaipur, Goa & Dubai.',
    theme: 'glassmorphic',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    email: 'events@grandeurexperiences.com',
    phone: '+91 98765 77088',
    whatsapp: '919876577088',
    website: 'https://grandeurevents.in',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, India',
    services: [
      { id: 's_eve_1', title: '3-Day Destination Wedding Design & Coordination', description: 'End-to-end decor, bridal entry FX, hospitality, artist lineup, and guest logistics.', durationMinutes: 120, price: 150000, currency: '₹' },
      { id: 's_eve_2', title: 'Grand Floral Mandap & Reception Stage Setup', description: 'Custom thematic structure with imported Dutch florals, fairy lighting & LED walls.', durationMinutes: 90, price: 85000, currency: '₹' },
      { id: 's_eve_3', title: 'Sangeet & Haldi Carnival Concept Designing', description: 'Vibrant neon DJ consoles, photo-booths, interactive folk artists, and sound engineering.', durationMinutes: 60, price: 65000, currency: '₹' },
      { id: 's_eve_4', title: 'Corporate Annual Gala & Tech Summit Production', description: 'Keynote staging, AV projection mapping, award trophies & executive catering.', durationMinutes: 90, price: 95000, currency: '₹' }
    ],
    products: [
      { id: 'p_eve_1', name: 'Royal Palace Mandap Decor Package', description: 'Handcrafted crystal chandeliers, royal floral dome, and traditional brass brassieres.', price: 125000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', category: 'Wedding Packages', isAvailable: true },
      { id: 'p_eve_2', name: 'Haldi & Mehendi Yellow Floral Decor Kit', description: 'Marigold cascades, brass urlis, photobooth auto-rickshaw, and customized seating.', price: 45000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80', category: 'Pre-Wedding', isAvailable: true },
      { id: 'p_eve_3', name: 'Celebrity DJ & Intelligent Lighting Rig', description: 'Line array sound system with cold pyros, smoke jets, and intelligent moving beams.', price: 55000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', category: 'Entertainment', isAvailable: true }
    ],
    gallery: [
      { id: 'g_eve_1', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'Udaipur Lake Palace Destination Wedding', category: 'Weddings' },
      { id: 'g_eve_2', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', title: 'Grand Floral Mandap with Water Body', category: 'Mandap' },
      { id: 'g_eve_3', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', title: 'High-Energy Neon Sangeet Night', category: 'Sangeet' }
    ],
    testimonials: [
      { id: 't_eve_1', clientName: 'Dr. Akhil & Sneha Rao', clientRole: 'Goa Destination Wedding', content: 'Shreya and her team made our wedding dreamlike. The Mandap design at sunset took everyone’s breath away!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_eve_2', clientName: 'Kishore Narang', clientRole: 'VP Operations, FinTech India', content: 'Flawless execution for our 1200-employee annual tech awards. The AV setup and lighting were world-class.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_eve_wa', platform: 'whatsapp', url: 'https://wa.me/919876577088', label: 'Book on WhatsApp' },
      { id: 'soc_eve_in', platform: 'instagram', url: 'https://instagram.com/grandeur_weddings', label: 'Wedding Reels' },
      { id: 'soc_eve_yt', platform: 'youtube', url: 'https://youtube.com/@grandeur_events', label: '4K Films' },
      { id: 'soc_eve_ph', platform: 'phone', url: 'tel:+919876577088', label: 'Call Desk' }
    ]
  },

  // ========================================================
  // 2. 💻 SOFTWARE ENGINEER & TECH PORTFOLIO
  // ========================================================
  'tech-portfolio': {
    name: 'Sai Charan Teja',
    designation: 'Staff Full-Stack & AI Systems Architect',
    company: 'Ex-Lead TechLabs • Open Source Contributor',
    bio: 'Crafting high-throughput microservices, Next.js 15 enterprise web platforms, and production LLM multi-agent systems. Built systems serving 10M+ MAUs. GitHub 4.8k+ stars.',
    theme: 'cyber-neon',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    email: 'charan.teja@devstack.io',
    phone: '+91 98765 22099',
    whatsapp: '919876522099',
    website: 'https://charan-teja.dev',
    address: 'Hitec City, Cyber Towers, Hyderabad, India',
    services: [
      { id: 's_tech_1', title: '1-on-1 System Architecture & Tech Strategy', description: 'Scalability roadmap, DB sharding, cloud cost reduction & high availability review.', durationMinutes: 60, price: 4999, currency: '₹' },
      { id: 's_tech_2', title: 'Full-Stack MVP Rapid Prototyping (Next.js + AI)', description: 'Turn product specs into a functional production-grade MVP in 2 weeks.', durationMinutes: 90, price: 45000, currency: '₹' },
      { id: 's_tech_3', title: 'Senior Developer Resume & Tech Interview Prep', description: 'Mock system design interview, resume overhaul & salary negotiation strategy.', durationMinutes: 45, price: 2999, currency: '₹' },
      { id: 's_tech_4', title: 'Codebase Security, Performance & INP Audit', description: 'Comprehensive audit for Next.js, React, Node.js, and PostgreSQL query optimizations.', durationMinutes: 60, price: 12500, currency: '₹' }
    ],
    products: [
      { id: 'p_tech_1', name: 'Next.js 15 SaaS Turbo Production Starter', description: 'Includes Auth, Prisma, Stripe/Cashfree, AI LLM routes, and Tailwind v4 UI.', price: 3499, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', category: 'Boilerplates', isAvailable: true },
      { id: 'p_tech_2', name: 'System Design Interview Playbook (PDF + Videos)', description: '50+ real-world tech architectures explained with diagrams and microservice patterns.', price: 1499, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', category: 'E-Books', isAvailable: true },
      { id: 'p_tech_3', name: 'Multi-Agent AI Automation Workflows Kit', description: 'LangChain & AutoGen templates for autonomous web scraping, CRM data enrichment, and email automation.', price: 2499, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', category: 'AI Scripts', isAvailable: true }
    ],
    gallery: [
      { id: 'g_tech_1', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', title: 'Real-Time Analytics Microservices Dashboard', category: 'Web Apps' },
      { id: 'g_tech_2', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', title: 'High-Concurrency Distributed Cloud Architecture', category: 'Cloud' },
      { id: 'g_tech_3', imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80', title: 'Open-Source DevTools UI Kit (5k+ Stars)', category: 'Open Source' }
    ],
    socials: [
      { id: 'soc_gh', platform: 'github', url: 'https://github.com/charan-teja', label: 'GitHub (5k+ Stars)' },
      { id: 'soc_li_dev', platform: 'linkedin', url: 'https://linkedin.com/in/charan-teja-dev', label: 'LinkedIn' },
      { id: 'soc_tw_dev', platform: 'twitter', url: 'https://x.com/charanteja_tech', label: 'X (Tech Threads)' },
      { id: 'soc_wa_dev', platform: 'whatsapp', url: 'https://wa.me/919876522099', label: 'WhatsApp Chat' }
    ]
  },

  // ========================================================
  // 3. 🍽️ RESTAURANT DIGITAL DINING MENU
  // ========================================================
  'restaurant-menu': {
    name: 'The Spice Route Kitchen & Rooftop Bar',
    designation: 'Executive Chef Vikram Simha',
    company: 'The Spice Route Kitchen & Lounge',
    bio: 'Authentic Hyderabadi Dum Biryanis, Slow-Cooked Tandoor Platters, Chettinad Curries, and Artisan Craft Mocktails. Order for dine-in table ordering, takeaway, or book your weekend table.',
    theme: 'sunset-gold',
    avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    email: 'dine@spiceroutekitchen.in',
    phone: '+91 98765 88044',
    whatsapp: '919876588044',
    website: 'https://spiceroutekitchen.in',
    address: 'Plot 42, Rooftop Lounge, Gachibowli, Hyderabad, India',
    services: [
      { id: 's_res_1', title: 'Reserve VIP Table / Candlelight Dinner', description: 'Reserved premium terrace table with complimentary chef welcome dessert.', durationMinutes: 90, price: 500, currency: '₹' },
      { id: 's_res_2', title: 'Private Party Banquet Booking (30-150 Guests)', description: 'Dedicated air-conditioned hall with customized buffet menu & sound system.', durationMinutes: 180, price: 25000, currency: '₹' },
      { id: 's_res_3', title: 'Outdoor Live Catering for Weddings & Events', description: 'Live tandoor, chaat counters, dum biryani handis, and beverage bars.', durationMinutes: 180, price: 45000, currency: '₹' }
    ],
    products: [
      { id: 'p_res_1', name: 'Special Hyderabadi Mutton Dum Biryani (Serves 2)', description: 'Slow-cooked succulent tender goat meat with long-grain basmati, served with Mirchi ka Salan & Raita.', price: 420, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', category: 'Biryanis', isAvailable: true },
      { id: 'p_res_2', name: 'Chicken Ghee Roast & Butter Garlic Naan Combo', description: 'Mangalorean spice infused boneless chicken roasted in pure desi ghee with 2 naans.', price: 340, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', category: 'Starters & Curries', isAvailable: true },
      { id: 'p_res_3', name: 'Paneer Tikka Angara Platter (8 Pcs)', description: 'Clay oven charred cottage cheese cubes marinated in Kashmiri chili and mustard oil.', price: 280, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', category: 'Vegetarian Delights', isAvailable: true },
      { id: 'p_res_4', name: 'Artisan Blue Ocean Mocktail & Virgin Mojito', description: 'Refreshing blend of blue curacao, fresh mint, crushed ice, lime, and sparkling soda.', price: 160, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', category: 'Beverages', isAvailable: true },
      { id: 'p_res_5', name: 'Sizzling Chocolate Brownie with Vanilla Ice Cream', description: 'Gooey dark chocolate walnut brownie on hot sizzler plate with Belgian chocolate drizzle.', price: 190, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', category: 'Desserts', isAvailable: true }
    ],
    gallery: [
      { id: 'g_res_1', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', title: 'Open Rooftop Terrace Seating', category: 'Ambiance' },
      { id: 'g_res_2', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', title: 'Signature Hyderabadi Dum Biryani', category: 'Specialties' },
      { id: 'g_res_3', imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', title: 'Craft Cocktails & Mocktails Bar', category: 'Beverages' }
    ],
    testimonials: [
      { id: 't_res_1', clientName: 'Naveen Kumar', clientRole: 'Food Blogger & Connoisseur', content: 'The Mutton Dum Biryani is 10/10 authentic. Scanning the QR on the table to order on WhatsApp made everything super easy!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_res_wa', platform: 'whatsapp', url: 'https://wa.me/919876588044', label: 'Order on WhatsApp' },
      { id: 'soc_res_in', platform: 'instagram', url: 'https://instagram.com/spiceroute_kitchen', label: 'Instagram Menu' },
      { id: 'soc_res_ph', platform: 'phone', url: 'tel:+919876588044', label: 'Call for Table' }
    ]
  },

  // ========================================================
  // 4. 🌶️ HOMEMADE PICKLES, SWEETS & SNACKS STORE
  // ========================================================
  'pickles-snacks': {
    name: 'Sri Lakshmi Traditional Pickles & Sweets',
    designation: 'Master Pickle Artisan & Proprietor',
    company: 'Sri Lakshmi Authentic Andhra Foods',
    bio: '100% Traditional homemade Godavari & Rayalaseema pickles, pure ghee sweets, and crispy hot savory snacks. Prepared in traditional wood-pressed oils & authentic stone-ground spices. Zero preservatives. Worldwide courier delivery available!',
    theme: 'obsidian-gold',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    email: 'orders@srilakshmipickles.com',
    phone: '+91 98765 33011',
    whatsapp: '919876533011',
    website: 'https://srilakshmipickles.com',
    address: 'Main Bazaar, Godavari Delta Road, Rajahmundry & Hyderabad, India',
    services: [
      { id: 's_pic_1', title: 'Worldwide NRI Parcel Packing & Courier', description: 'Air-tight 3-layer leak-proof vacuum tin packing with international DHL/FedEx delivery.', durationMinutes: 30, price: 0, currency: '₹' },
      { id: 's_pic_2', title: 'Custom Spice Level & Oil Selection Order', description: 'Customize your pickle batch with low salt, olive oil, or extra spicy Guntur chili.', durationMinutes: 30, price: 100, currency: '₹' },
      { id: 's_pic_3', title: 'Wedding & Return Gift Hampers (Bulk)', description: 'Traditional brass containers & gift boxes with assorted sweets & savory snacks.', durationMinutes: 45, price: 5000, currency: '₹' }
    ],
    products: [
      { id: 'p_pic_1', name: 'Authentic Andhra Avakaya Mango Pickle (500g Jar)', description: 'Made with raw Totapuri/Neelam mangoes, ground mustard powder, cold-pressed sesame oil, and Guntur red chili.', price: 320, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', category: 'Veg Pickles', isAvailable: true },
      { id: 'p_pic_2', name: 'Boneless Andhra Chicken Pickle (500g Jar)', description: 'Tender country chicken chunks roasted in aromatic ginger-garlic paste and traditional roasted spices.', price: 480, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', category: 'Non-Veg Pickles', isAvailable: true },
      { id: 'p_pic_3', name: 'Gongura Mutton & Prawns Pickle (500g)', description: 'Fresh Godavari river prawns and mutton tossed in tangy sorrel (Gongura) leaves & spice blend.', price: 650, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', category: 'Non-Veg Pickles', isAvailable: true },
      { id: 'p_pic_4', name: 'Traditional Bellam Pootharekulu (Pack of 10)', description: 'Paper-thin rice starch edible wraps rolled with pure ghee, organic jaggery, and crushed dry fruits.', price: 380, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', category: 'Ghee Sweets', isAvailable: true },
      { id: 'p_pic_5', name: 'Hot Ribbon Murukulu & Kakinada Mixture (500g)', description: 'Crispy crunchy savory snacks fried in pure refined groundnut oil with roasted peanuts & curry leaves.', price: 220, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', category: 'Snacks', isAvailable: true },
      { id: 'p_pic_6', name: 'Godavari Pure Ghee Sunnundalu (Pack of 12)', description: 'Roasted urad dal flour blended with organic jaggery powder and generous melted desi ghee.', price: 340, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80', category: 'Ghee Sweets', isAvailable: true }
    ],
    gallery: [
      { id: 'g_pic_1', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', title: 'Traditional Sun-Dried Clay Pot Pickle Making', category: 'Kitchen Process' },
      { id: 'g_pic_2', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', title: 'Non-Veg Specialty Pickles', category: 'Products' },
      { id: 'g_pic_3', imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', title: 'Hot Fresh Snacks & Sweets Assortment', category: 'Sweets' }
    ],
    testimonials: [
      { id: 't_pic_1', clientName: 'Sujatha V.', clientRole: 'Dallas, Texas (NRI Order)', content: 'The Avakaya and Boneless Chicken pickles arrived in the USA with zero leaks! Tastes exactly like my grandmother’s recipe.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_pic_wa', platform: 'whatsapp', url: 'https://wa.me/919876533011', label: 'Order on WhatsApp' },
      { id: 'soc_pic_ph', platform: 'phone', url: 'tel:+919876533011', label: 'Direct Call' },
      { id: 'soc_pic_in', platform: 'instagram', url: 'https://instagram.com/srilakshmipickles', label: 'Instagram Store' }
    ]
  }
};

/**
 * Returns a fully populated, production-ready DigitalProfile for any of the 28 templates.
 */
export function getTemplateProfile(templateId: string): DigitalProfile {
  const meta = VCARD_TEMPLATES_CATALOG.find((t) => t.id === templateId) || VCARD_TEMPLATES_CATALOG[0];
  const custom = TEMPLATE_PRESETS_DATA[templateId] || {};

  const name = custom.name || meta.name.replace(' vCard', '');
  const designation = custom.designation || meta.tagline;
  const company = custom.company || `${name} ${meta.category} Practice`;
  const bio = custom.bio || `Welcome to ${company}. Providing top-tier ${meta.category.toLowerCase()} solutions, digital contact exchange, and seamless customer service.`;
  const getCategoryTheme = (cat: string): ThemeType => {
    switch (cat) {
      case 'Healthcare': return 'emerald-pro';
      case 'Beauty & Personal Care':
      case 'Fashion & Clothing':
      case 'Events & Creative': return 'glassmorphic';
      case 'Real Estate':
      case 'Professional Services': return 'dark-onyx';
      case 'Food Business': return 'sunset-gold';
      case 'Automobile': return 'cyber-neon';
      case 'Education': return 'modern-indigo';
      case 'Travel & Hospitality': return 'modern-indigo';
      default: return 'modern-indigo';
    }
  };
  const theme = custom.theme || getCategoryTheme(meta.category);
  
  const avatarUrl = custom.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  const coverUrl = custom.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

  const services: ServiceItem[] = custom.services || meta.features.map((feat, idx) => ({
    id: `srv_${templateId}_${idx + 1}`,
    title: feat,
    description: `Professional ${feat.toLowerCase()} tailored to your individual and corporate requirements.`,
    durationMinutes: 45 + idx * 15,
    price: 1500 + idx * 1000,
    currency: '₹'
  }));

  const products: ProductItem[] = custom.products || [
    {
      id: `prod_${templateId}_1`,
      name: `${meta.name.replace(' vCard', '')} Consultation Package`,
      description: `Comprehensive starter service package including full review and roadmap.`,
      price: 2999,
      currency: '₹',
      imageUrl: meta.imgUrl,
      category: meta.category,
      isAvailable: true
    }
  ];

  const gallery: GalleryItem[] = custom.gallery || [
    {
      id: `gal_${templateId}_1`,
      imageUrl: meta.imgUrl,
      title: `${meta.name} Portfolio Showcase`,
      category: meta.category,
      description: `Featured project and client work delivered by ${company}.`
    }
  ];

  const socials: SocialLinkItem[] = custom.socials || [
    { id: 's_wa', platform: 'whatsapp', url: `https://wa.me/916304989071`, label: 'WhatsApp' },
    { id: 's_ph', platform: 'phone', url: 'tel:+916304989071', label: 'Call' },
    { id: 's_em', platform: 'email', url: `mailto:support@oneclickbiz.in`, label: 'Email' },
    { id: 's_li', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { id: 's_in', platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' }
  ];

  return {
    id: `prof_${templateId}`,
    organizationId: `org_${templateId}`,
    slug: templateId,
    name,
    designation,
    company,
    bio,
    email: custom.email || `support@oneclickbiz.in`,
    phone: custom.phone || '+91 63049 89071',
    whatsapp: custom.whatsapp || '916304989071',
    website: custom.website || `https://oneclickbiz.in/v/${templateId}`,
    address: custom.address || 'OneClickBiz Towers, Indiranagar, Bangalore, India',
    avatarUrl,
    coverUrl,
    theme,
    isPublished: true,
    sections: [
      { id: 'sec_hero', type: 'hero', title: 'Profile & Contact', isVisible: true, order: 1 },
      { id: 'sec_about', type: 'about', title: 'About Me', isVisible: true, order: 2 },
      { id: 'sec_socials', type: 'socials', title: 'Connect on Social', isVisible: true, order: 3 },
      { id: 'sec_services', type: 'services', title: 'Services & Packages', isVisible: true, order: 4 },
      { id: 'sec_products', type: 'products', title: 'Store & Products', isVisible: true, order: 5 },
      { id: 'sec_booking', type: 'booking', title: 'Book Appointment', isVisible: true, order: 6 },
      { id: 'sec_gallery', type: 'gallery', title: 'Portfolio & Gallery', isVisible: true, order: 7 },
      { id: 'sec_videos', type: 'videos', title: 'Featured Videos', isVisible: true, order: 8 },
      { id: 'sec_testimonials', type: 'testimonials', title: 'Client Reviews', isVisible: true, order: 9 },
      { id: 'sec_contact', type: 'contact', title: 'Direct Inquiries', isVisible: true, order: 10 }
    ],
    sectionData: {
      about: { content: bio },
      services: { items: services },
      products: { items: products },
      gallery: { items: gallery },
      videos: { items: custom.videos || [] },
      testimonials: { items: custom.testimonials || [] },
      socials: { items: socials },
      contact: {
        showEmail: true,
        showPhone: true,
        showWhatsapp: true,
        showAddress: true,
        showWebsite: true,
        allowInquiries: true
      }
    },
    stats: {
      views: 3420,
      qrScans: 1240,
      nfcTaps: 530,
      whatsappClicks: 890,
      callClicks: 410,
      vcfDownloads: 1120
    }
  };
}
