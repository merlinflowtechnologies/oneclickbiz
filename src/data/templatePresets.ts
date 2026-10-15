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
  upiId?: string;
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
  're-agents': {
    name: 'Rajesh Varma',
    designation: 'Senior Real Estate Portfolio Advisor',
    company: 'Varma Prime Realty & Property Advisory',
    bio: 'Guiding luxury home buyers, NRI property investors, and corporate clients to find verified high-ROI apartments, gated villas, and commercial real estate across Hyderabad.',
    theme: 'modern-indigo',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    email: 'rajesh@varmarealty.in',
    phone: '+91 98765 10101',
    whatsapp: '919876510101',
    website: 'https://varmarealty.in',
    address: 'Gachibowli Financial District, Hyderabad, India',
    services: [
      { id: 's_rea_1', title: 'Schedule Private Site Visit & Chauffeur Pick-up', description: 'Personalized guided tour of model villas, sample flats, and clubhouse amenities.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_rea_2', title: 'NRI Property Investment Consultation', description: 'High-yield pre-launch opportunities, rental yield analysis, and legal title verification.', durationMinutes: 45, price: 0, currency: '₹' },
      { id: 's_rea_3', title: 'Home Loan & Legal Verification Assistance', description: 'Zero-brokerage bank loan approvals and RERA documentation audit.', durationMinutes: 30, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_rea_1', name: 'The Crown Residences 3 & 4 BHK Sky Villas', description: 'Kokapet lakeview high-rise with 50,000 sq.ft clubhouse, infinity pool and 100% Vastu compliance. TS-RERA Approved.', price: 18500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', category: 'Luxury Apartments', isAvailable: true },
      { id: 'p_rea_2', name: 'Greenwood 4 & 5 BHK Triplex Gated Villas', description: 'Tellapur 28-acre gated community with private plunge pool, solar power, and 24/7 multi-tier security.', price: 26500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80', category: 'Gated Villas', isAvailable: true },
      { id: 'p_rea_3', name: 'Skyline Heights 2 & 3 BHK Gated Towers', description: 'Hitec City core IT hub with high rental demand, modern amenities, and instant metro connectivity.', price: 9500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80', category: 'Apartments', isAvailable: true },
      { id: 'p_rea_4', name: 'Aerovista 150-300 Sq.Yds Premium Open Plots', description: 'HMDA & RERA approved gated layout near Shamshabad Airport & ORR with wide CC roads and clubhouse.', price: 3450000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', category: 'Open Plots', isAvailable: true }
    ],
    gallery: [
      { id: 'g_rea_1', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', title: 'Kokapet Sky Tower View', category: 'Residential' },
      { id: 'g_rea_2', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', title: 'Sample Triplex Villa Elevation', category: 'Villas' },
      { id: 'g_rea_3', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Grand Living Room Interior', category: 'Interiors' },
      { id: 'g_rea_4', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Gated Layout Main Boulevard', category: 'Open Plots' }
    ],
    testimonials: [
      { id: 't_rea_1', clientName: 'Rajiv Menon', clientRole: 'Director of Engineering, Microsoft', content: 'Rajesh guided us through Kokapet high-rise options with unmatched market knowledge. Found our dream home with 100% transparency.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_rea_2', clientName: 'Sneha & Aditya Kapoor', clientRole: 'Founders, FinTech Ventures', content: 'We purchased our Tellapur villa through Varma Prime Realty. The documentation audit and loan assistance were completely smooth.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_rea_3', clientName: 'Vikram Chawla', clientRole: 'NRI Investor (Dubai, UAE)', content: 'As an overseas investor, Rajesh provided video walkthroughs, legal clearance check, and handled spot registration seamlessly.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_rea_wa', platform: 'whatsapp', url: 'https://wa.me/919876510101', label: 'Direct WhatsApp' },
      { id: 'soc_rea_ph', platform: 'phone', url: 'tel:+919876510101', label: 'Call Agent' },
      { id: 'soc_rea_in', platform: 'instagram', url: 'https://instagram.com/varmarealty', label: 'Instagram' },
      { id: 'soc_rea_li', platform: 'linkedin', url: 'https://linkedin.com/in/rajeshvarma', label: 'LinkedIn' }
    ]
  },
  're-plots': {
    name: 'Srikanth Reddy',
    designation: 'Managing Partner',
    company: 'Reddy Lands & County Infrastructure',
    bio: 'Promoting RERA & HMDA approved premium villa open plots, gated layout communities, and high-growth farmland investments near Hyderabad Airport & ORR Growth Corridors.',
    theme: 'emerald-pro',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    email: 'plots@reddylands.in',
    phone: '+91 98765 10103',
    whatsapp: '919876510103',
    website: 'https://reddylands.in',
    address: 'Shamshabad Airport Highway, Hyderabad, India',
    services: [
      { id: 's_plt_1', title: 'Free Weekend Site Visit with Cab Assistance', description: 'Chauffeured site inspection of HMDA gated layouts with layout manager.', durationMinutes: 120, price: 0, currency: '₹' },
      { id: 's_plt_2', title: 'Plot Title & Land Legal Clearance Consultation', description: 'Complete 30-year link document audit and RERA approval review.', durationMinutes: 45, price: 0, currency: '₹' },
      { id: 's_plt_3', title: 'Farmland Agri-Management & Boundary Fencing', description: 'Complete layout demarcation, drip irrigation setup, and fruit tree plantation advisory.', durationMinutes: 30, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_plt_1', name: 'Emerald County 200 - 500 Sq.Yds Villa Plots', description: 'Shamshabad Airport Highway. 100% clear title with 40ft BT roads, underground drainage, and clubhouse. HMDA Approved.', price: 3700000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', category: 'Villa Plots', isAvailable: true },
      { id: 'p_plt_2', name: 'Royal Meadows 1 Acre Gated Farm Lands', description: 'Rich red soil farm plots with drip irrigation, weekend farmhouse setup, security fencing, and organic plantations in Chevella.', price: 6500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', category: 'Farmlands', isAvailable: true },
      { id: 'p_plt_3', name: 'Aero Greenfield 150 - 300 Sq.Yds Gated Township', description: 'Srisailam Highway Growth Zone. TS-RERA & DTCP approved plotted community near RRR Junction with electricity and water lines.', price: 2475000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', category: 'Open Plots', isAvailable: true },
      { id: 'p_plt_4', name: 'Highway County 250 - 600 Sq.Yds Commercial Plots', description: 'Bangalore Highway (NH-44) facing commercial & residential development plots with 60ft arterial roads and high ROI potential.', price: 4850000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', category: 'Commercial Plots', isAvailable: true }
    ],
    gallery: [
      { id: 'g_plt_1', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Gated Layout Entrance Arch', category: 'Layout Views' },
      { id: 'g_plt_2', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'Farmland Landscape & Plantations', category: 'Farmlands' },
      { id: 'g_plt_3', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Clubhouse & Avenue Plantation', category: 'Amenities' }
    ],
    testimonials: [
      { id: 't_plt_1', clientName: 'K. Rameshwar Rao', clientRole: 'Senior Advocate & Land Investor', content: 'Srikanth and Reddy Lands provide 100% crystal clear title documents. I have invested across two layouts and both saw over 70% appreciation.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 't_plt_2', clientName: 'Ananya & Dr. Praveen Kumar', clientRole: 'Consultant, Apollo Hospitals', content: 'Our 1-acre farmland plot in Royal Meadows has become our family weekend sanctuary. The drip irrigation and maintenance are outstanding.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_plt_3', clientName: 'M. Surendra Reddy', clientRole: 'NRI Property Group (Dallas, TX)', content: 'Srikanth coordinated spot registration with absolute transparency. Highly recommended for NRI land buyers.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_plt_wa', platform: 'whatsapp', url: 'https://wa.me/919876510103', label: 'WhatsApp Enquiry' },
      { id: 'soc_plt_ph', platform: 'phone', url: 'tel:+919876510103', label: 'Call Office' }
    ]
  },
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
      { id: 'p_bld_1', name: 'Skyline Imperia 3 & 4 BHK Luxury Residences', description: 'High-rise ultra luxury towers in Kokapet Financial District with 40,000 sq.ft sky-deck clubhouse, infinity pool & 100% Vastu. TS-RERA Approved.', price: 18500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', category: 'Residential Towers', isAvailable: true },
      { id: 'p_bld_2', name: 'Skyline Business Hub Grade-A Commercial Suites', description: 'Grade-A tech park office spaces with 100% power backup, high-speed elevators & instant metro connectivity in Hitec City.', price: 9500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', category: 'Commercial Suites', isAvailable: true },
      { id: 'p_bld_3', name: 'Skyline Grandeur 4 & 5 BHK Triplex Gated Villas', description: '22-acre gated villa community in Mokila with private temperature-controlled plunge pool, solar power & European fittings.', price: 27500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80', category: 'Luxury Villas', isAvailable: true },
      { id: 'p_bld_4', name: 'Skyline Aeropolis 150-350 Sq.Yds Plotted Township', description: 'HMDA & TS-RERA approved gated open plot community near Shamshabad Airport & ORR with 40ft blacktop roads & 24/7 security.', price: 3650000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', category: 'Open Plots', isAvailable: true },
      { id: 'p_bld_5', name: 'Skyline Waterfront 4 BHK Lakeview Residences', description: 'Kokapet Lake promenade ultra-luxury residences with panoramic 270-degree water views, private elevator foyer & sky lounge.', price: 32500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', category: 'Residential Towers', isAvailable: true },
      { id: 'p_bld_6', name: 'Skyline Palm Meadows 1 & 2 Acre Farm Estates', description: 'Managed luxury gated farmland estates in Shankarpally - Chevella green corridor with drip irrigation, clubhouse & fruit orchard.', price: 7500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', category: 'Farmlands', isAvailable: true }
    ],
    gallery: [
      { id: 'g_bld_1', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', title: 'Skyline Imperia High-Rise Elevation', category: 'Residential Towers' },
      { id: 'g_bld_2', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Model Apartment Living & Dining Lounge', category: 'Interiors' },
      { id: 'g_bld_3', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', title: 'Skyline Grandeur Triplex Villa Facade', category: 'Gated Villas' },
      { id: 'g_bld_4', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'On-Site Construction Progress & Quality Inspection', category: 'Construction Progress' },
      { id: 'g_bld_5', imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', title: 'Skyline Sky Deck Infinity Pool & Clubhouse Lounge', category: 'Clubhouse Amenities' },
      { id: 'g_bld_6', imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80', title: 'Double-Height Master Suite with Lakeview Balcony', category: 'Interiors' }
    ],
    testimonials: [
      { id: 't_bld_1', clientName: 'Dr. Srinivas Rao', clientRole: 'Chief Neurosurgeon & Investor', content: 'We booked our 4 BHK residence in Skyline Imperia. The construction quality, floor-to-ceiling glass balconies, and prompt documentation made it completely seamless.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_bld_2', clientName: 'Pooja & Harish Nair', clientRole: 'Tech VP, Google Hyderabad', content: 'Skyline Landmark Developers delivered our home right on time with verified RERA certificates. Their team is exceptionally transparent and professional.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_bld_3', clientName: 'K. Venkat Reddy', clientRole: 'NRI Investor (San Jose, California)', content: 'Being based in the US, I relied on Skyline Developers for our plot investment in Aeropolis. From title search to spot registration, the transparency was 100%.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    videos: [
      {
        id: 'v_bld_1',
        title: 'Skyline Imperia — 4K Aerial Drone Layout Tour & Surroundings',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'youtube',
        caption: '4K aerial drone flight showcasing 100ft arterial roads, upcoming metro line, and clubhouse elevation.'
      },
      {
        id: 'v_bld_2',
        title: 'Model 4 BHK Sky Residence — Complete Architectural Walkthrough',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'youtube',
        caption: 'Walkthrough of master suite, panoramic deck balcony, Italian marble foyer, and smart home automation.'
      },
      {
        id: 'v_bld_3',
        title: 'Skyline Aeropolis — Rapid Site Progression & Blacktop Roads',
        url: 'https://www.instagram.com/reel/C3M8W98oG12/',
        type: 'instagram',
        caption: 'Latest on-site reel: Underground cabling, street illumination, and demarcated boundary stones.'
      },
      {
        id: 'v_bld_4',
        title: 'Skyline Grandeur Triplex Villas — Clubhouse & Pool Reel Tour',
        url: 'https://www.instagram.com/reel/C2X4Z81oH34/',
        type: 'instagram',
        caption: 'Exclusive reel walkthrough of private plunge pool, double-height living room, and landscaped lawns.'
      }
    ],
    socials: [
      { id: 'soc_bld_wa', platform: 'whatsapp', url: 'https://wa.me/919876544001', label: 'Sales WhatsApp' },
      { id: 'soc_bld_ph', platform: 'phone', url: 'tel:+919876544001', label: 'Call Desk' },
      { id: 'soc_bld_in', platform: 'instagram', url: 'https://instagram.com/skylinedevelopers', label: 'Instagram' },
      { id: 'soc_bld_li', platform: 'linkedin', url: 'https://linkedin.com/company/skyline-developers', label: 'LinkedIn' }
    ]
  },
  're-villas': {
    name: 'Sameer Singhania',
    designation: 'Luxury Estates Director',
    company: 'Singhania Villas & Signature Living',
    bio: 'Specializing exclusively in ultra-luxury gated community triplex villas, golf estates, and bespoke hillside mansions with private plunge pools, home automation, and 5-star clubhouses.',
    theme: 'obsidian-gold',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    email: 'sameer@singhaniavillas.com',
    phone: '+91 98765 10104',
    whatsapp: '919876510104',
    website: 'https://singhaniavillas.com',
    address: 'Jubilee Hills Road No. 36, Hyderabad, India',
    services: [
      { id: 's_vil_1', title: 'Private Villa Walkthrough with Chauffeur', description: 'Exclusive inspection of ready-to-move sample villas with interior designers.', durationMinutes: 90, price: 0, currency: '₹' },
      { id: 's_vil_2', title: 'Custom Architecture & Interior Customization', description: 'Personalized private pool, home theater, and imported Italian fittings consultation.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_vil_3', title: 'Clubhouse & Golf Membership Consultation', description: 'Complete handover of 5-star community amenities, fitness center, and concierge pass.', durationMinutes: 30, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_vil_1', name: 'The Sovereign 5 BHK Triplex Golf Villas', description: 'Tellapur premium gated community with private heated pool, double-height living room and solar deck. TS-RERA Approved.', price: 34500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80', category: 'Luxury Villas', isAvailable: true },
      { id: 'p_vil_2', name: 'Hillside Mansions 4 BHK Ultra Gated Residences', description: 'Mokila green corridor with private manicured lawn, rooftop deck lounge, and clubhouse membership.', price: 24500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80', category: 'Luxury Villas', isAvailable: true },
      { id: 'p_vil_3', name: 'The Palm Enclave 4 & 5 BHK Courtyard Villas', description: 'Jubilee Hills adjacent signature gated enclave featuring private elevator, jacuzzi, and Italian marble flooring.', price: 42500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', category: 'Super Luxury Villas', isAvailable: true },
      { id: 'p_vil_4', name: 'Emerald Bay 4 BHK Waterfront Luxury Villas', description: 'Gandipet lakeview gated development with expansive glass facades, infinity plunge pool, and lush gardens.', price: 29500000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', category: 'Waterfront Villas', isAvailable: true }
    ],
    gallery: [
      { id: 'g_vil_1', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Luxury Living Room Elevation', category: 'Villas' },
      { id: 'g_vil_2', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80', title: 'Private Swimming Pool Deck', category: 'Amenities' },
      { id: 'g_vil_3', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Master Suite & Walk-In Wardrobe', category: 'Interiors' },
      { id: 'g_vil_4', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', title: 'Grand Villa Night Lighting & Lawn', category: 'Exteriors' }
    ],
    testimonials: [
      { id: 't_vil_1', clientName: 'Sandeep Agarwal', clientRole: 'Managing Director, Apex Capital', content: 'Sameer helped us acquire a custom triplex villa at The Sovereign. The finish quality, private pool deck, and attention to detail are exceptional.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_vil_2', clientName: 'Ritu & Tarun Singhal', clientRole: 'VP of Technology, AWS', content: 'Living in Mokila Hillside Mansions has transformed our family lifestyle. The 5-star clubhouse and serene green views are unmatched.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { id: 't_vil_3', clientName: 'Harish Varma', clientRole: 'Industrialist & Villa Owner', content: 'Singhania Villas sets the gold standard for bespoke luxury living in Hyderabad. Zero compromises on quality.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_vil_wa', platform: 'whatsapp', url: 'https://wa.me/919876510104', label: 'VIP Concierge WhatsApp' },
      { id: 'soc_vil_ph', platform: 'phone', url: 'tel:+919876510104', label: 'Call Estates Desk' }
    ]
  },
  're-consultants': {
    name: 'Anand K. Rao',
    designation: 'Principal Commercial & Land Acquisition Consultant',
    company: 'Rao Real Estate Advisory & Capital Partners',
    bio: 'Advising corporations, HNIs, and family offices on commercial office spaces, warehouse leasing, pre-leased retail assets with 8%+ yields, and land acquisition across growth corridors.',
    theme: 'royal-navy',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    email: 'anand@raoadvisory.in',
    phone: '+91 98765 10105',
    whatsapp: '919876510105',
    website: 'https://raoadvisory.in',
    address: 'Financial District, Nanakramguda, Hyderabad, India',
    services: [
      { id: 's_con_1', title: 'Pre-Leased Commercial Asset Due Diligence', description: 'ROI yield forecast, tenant covenant audit, and legal clear title review.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_con_2', title: 'Land Parcel Feasibility & Joint Development', description: 'FSI analysis, municipal zoning evaluation, and developer term sheet structuring.', durationMinutes: 90, price: 0, currency: '₹' },
      { id: 's_con_3', title: 'Corporate Office Leasing & Expansion Advisory', description: 'Grade-A tech park leasing negotiation, fit-out cost analysis, and lock-in contracts.', durationMinutes: 45, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_con_1', name: 'Pre-Leased Grade-A IT Park Office Space', description: 'Hitec City IT Corridor. 10,000 sq.ft leased to multinational tech company with 8.4% gross rental yield and 9-year lock-in.', price: 125000000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', category: 'Commercial Real Estate', isAvailable: true },
      { id: 'p_con_2', name: 'Prime Commercial Retail Showroom Space', description: 'Gachibowli Main Road front facing 3,500 sq.ft retail space with high footfall, verified anchor tenant, and high ROI.', price: 48000000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', category: 'Commercial Retail', isAvailable: true },
      { id: 'p_con_3', name: '15-Acre Logistics & Industrial Warehousing Hub', description: 'Near Outer Ring Road (ORR) Cargo Junction. Fully zoned for logistics with multi-modal freight connectivity.', price: 95000000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', category: 'Industrial & Land', isAvailable: true },
      { id: 'p_con_4', name: 'Pre-Leased High Street Bank Branch Block', description: 'Banjara Hills Road No. 12. 4,200 sq.ft ground floor leased to Nationalized Bank on a 15-year lease term.', price: 62000000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80', category: 'Pre-Leased Assets', isAvailable: true }
    ],
    gallery: [
      { id: 'g_con_1', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Grade-A Commercial Tower', category: 'Commercial' },
      { id: 'g_con_2', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80', title: 'Retail Showroom Frontage', category: 'Retail' },
      { id: 'g_con_3', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'Industrial Logistics Park', category: 'Industrial' }
    ],
    testimonials: [
      { id: 't_con_1', clientName: 'Naveen Jain', clientRole: 'CFO, Global Retail Holdings', content: 'Anand Rao structured our 40,000 sq.ft commercial acquisition in Hitec City with high rental yield security and clean title.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_con_2', clientName: 'S. Balakrishna', clientRole: 'Partner, Matrix Private Equity', content: 'Rao Advisory conducted exhaustive tenant due diligence, lease audit, and legal documentation. Outstanding expertise.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { id: 't_con_3', clientName: 'Arvind Saxena', clientRole: 'Family Office Principal', content: 'For pre-leased commercial assets and land aggregation, Anand Rao is our primary advisor in South India.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_con_wa', platform: 'whatsapp', url: 'https://wa.me/919876510105', label: 'Consultant WhatsApp' },
      { id: 'soc_con_ph', platform: 'phone', url: 'tel:+919876510105', label: 'Call Advisory' }
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
  // 🛡️ INSURANCE ADVISOR & FINANCIAL SECURITY ADVISORY
  // ========================================================
  'prof-insurance': {
    name: 'Rajesh Sengupta',
    designation: 'MDRT Life Member | Senior Insurance & Wealth Security Advisor',
    company: 'Suraksha Life & Health Insurance Advisory',
    bio: 'IRDAI Certified Financial Security Strategist & MDRT USA Life Member with 16+ years of dedicated service. Empowering 4,500+ Indian families and NRI professionals with custom Term Life, Comprehensive Mediclaim, Critical Illness, and Guaranteed Retirement Security with 24/7 priority cashless claim settlement.',
    theme: 'dark-onyx',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    email: 'rajesh.sengupta@surakshainsurance.in',
    phone: '+91 98765 24321',
    whatsapp: '919876524321',
    website: 'https://oneclickbiz.in/v/prof-insurance',
    address: 'Level 5, Financial City Centre, BKC, Mumbai & Hitec City, Hyderabad, India',
    services: [
      { id: 's_ins_1', title: '1-on-1 Comprehensive Insurance Portfolio Audit', description: 'Zero-bias forensic review of your existing policies to detect hidden room rent capping, sub-limits, or insufficient life cover.', durationMinutes: 45, price: 0, currency: '₹' },
      { id: 's_ins_2', title: 'Emergency 24x7 Cashless Hospital Claim Assistance', description: 'Dedicated personal claim desk assistance for immediate cashless TPA approval at 14,500+ network hospitals.', durationMinutes: 30, price: 0, currency: '₹' },
      { id: 's_ins_3', title: 'NRI Life & Health Protection Advisory', description: 'Tailored high-cover term life policies (up to ₹10 Cr) with video medical tests and full FEMA compliance for NRIs worldwide.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_ins_4', title: 'Corporate Group Health & Keyman Insurance Planning', description: 'Comprehensive group mediclaim with maternal & OPD perks for corporate employees, founders, and directors.', durationMinutes: 60, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_ins_1', name: 'Comprehensive Family Health Mediclaim (₹1 Crore Cover)', description: 'Zero room-rent capping, unlimited restoration of sum insured, Day-1 OPD coverage, and cashless treatment across 14,500+ hospitals.', price: 12500, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', category: 'Health Insurance', isAvailable: true },
      { id: 'p_ins_2', name: 'Pure Term Life Protection Plan (₹2 Crore Cover)', description: '99.5% claim settlement ratio with critical illness rider, accidental death booster, and 100% tax exemption under Section 80C.', price: 9800, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', category: 'Life Insurance', isAvailable: true },
      { id: 'p_ins_3', name: 'Super Top-Up Health Shield (₹90 Lakhs Cover with ₹10L Deductible)', description: 'Affordable safeguard against catastrophic hospitalization costs at just ~₹12/day. Bridges the gap above your employer base policy.', price: 4200, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', category: 'Health Insurance', isAvailable: true },
      { id: 'p_ins_4', name: 'Guaranteed Lifelong Pension & Annuity Plan', description: 'Lock in guaranteed high annual pension for life backed by Sovereign Gold guarantees, with 100% return of purchase price to nominees.', price: 25000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80', category: 'Retirement', isAvailable: true },
      { id: 'p_ins_5', name: 'Child Higher Education & Ivy League Growth Fund', description: 'Guaranteed capital payout timed with your child’s university graduation and overseas master’s degree admission.', price: 18000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80', category: 'Child Plans', isAvailable: true },
      { id: 'p_ins_6', name: 'Motor & Car Comprehensive Zero-Dep Insurance', description: 'Bumper-to-bumper zero depreciation cover with engine protection, roadside assistance, and instant digital cashless claim survey.', price: 7500, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80', category: 'Motor Insurance', isAvailable: true }
    ],
    gallery: [
      { id: 'g_ins_1', imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', title: 'MDRT Global Financial Security Summit Award', category: 'Accolades' },
      { id: 'g_ins_2', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Advisory Office Headquarters at BKC Mumbai', category: 'Headquarters' },
      { id: 'g_ins_3', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', title: '14,500+ Cashless Hospital Network Collaboration', category: 'Network' },
      { id: 'g_ins_4', imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', title: 'Corporate Financial Wellness & Pension Workshop', category: 'Workshops' }
    ],
    testimonials: [
      { id: 't_ins_1', clientName: 'Amitabh & Priya Saxena', clientRole: 'Vice President, J.P. Morgan, Mumbai', content: 'When my father required an emergency cardiac bypass at Narayana Health, Rajesh stepped in personally. The ₹11.8 Lakhs cashless claim was cleared in under 75 minutes. His guidance is truly priceless.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_ins_2', clientName: 'Dr. Sunita Kulkarni', clientRole: 'Chief Pediatric Surgeon, Hyderabad', content: 'Rajesh audited my old insurance policies and showed me that my previous policy had a 1% room rent capping that would have cost me lakhs! We upgraded to a 1 Cr zero-deductible cover seamlessly.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
      { id: 't_ins_3', clientName: 'Rohan Mehra', clientRole: 'NRI Tech Lead, Silicon Valley, USA', content: 'Securing a ₹5 Crore term life cover while living abroad was completely painless. Rajesh coordinated the entire online video medical tests and documentation within 48 hours.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_ins_wa', platform: 'whatsapp', url: 'https://wa.me/919876524321', label: 'Priority WhatsApp Desk' },
      { id: 'soc_ins_ph', platform: 'phone', url: 'tel:+919876524321', label: '24/7 Claim Hotline' },
      { id: 'soc_ins_em', platform: 'email', url: 'mailto:rajesh.sengupta@surakshainsurance.in', label: 'Official Advisory Email' },
      { id: 'soc_ins_li', platform: 'linkedin', url: 'https://linkedin.com/in/rajesh-sengupta-mdrt', label: 'LinkedIn Profile' },
      { id: 'soc_ins_yt', platform: 'youtube', url: 'https://youtube.com/@surakshainsurance', label: 'Insurance Awareness Channel' },
      { id: 'soc_ins_map', platform: 'maps', url: 'https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai', label: 'Office Directions' }
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
      { id: 'p_pic_6', name: 'Godavari Pure Ghee Sunnundalu (Pack of 12)', description: 'Roasted urad dal flour blended with organic jaggery powder and generous melted desi ghee.', price: 340, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80', category: 'Ghee Sweets', isAvailable: true }
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
  },
  'food-restaurant': {
    name: 'OneClickBiz Food & Fine Dining',
    designation: 'Smart Digital Dining & Instant WhatsApp Ordering',
    company: 'OneClickBiz Kitchen & Dining',
    bio: 'Welcome to OneClickBiz Food & Fine Dining. Experience culinary excellence with farm-fresh ingredients, slow-cooked royal delicacies, and instant WhatsApp ordering for restaurant dining and home delivery. Browse our interactive menu below.',
    theme: 'brahmin-food',
    avatarUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    email: 'dining@oneclickbiz.in',
    phone: '+91 63049 89071',
    whatsapp: '916304989071',
    upiId: '6304989071@okaxis',
    website: 'https://oneclickbiz.in/v/food-restaurant',
    address: 'OneClickBiz Plaza, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038',
    services: [
      { id: 's_res_1', title: 'Table Reservation & Dining Booking', description: 'Reserve a premium dining table with instant WhatsApp confirmation and zero waiting time.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_res_2', title: 'Private Party & Event Catering', description: 'Customized gourmet menu with live tandoor and buffet counters for birthdays & corporate events.', durationMinutes: 180, price: 5000, currency: '₹' },
      { id: 's_res_3', title: 'Express Takeaway & Pickup Packing', description: 'Pre-order your favorite dishes via WhatsApp and have them freshly packed ready for pickup.', durationMinutes: 20, price: 0, currency: '₹' }
    ],
    products: [
      { id: 'p_res_1', name: 'Paneer Tikka Angaara', description: 'Succulent malai cottage cheese cubes marinated in Kashmiri red chili, spiced hung curd, and charcoal-grilled with bell peppers. Served with mint chutney.', price: 280, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_2', name: 'Crispy Lotus Stem Honey Chilli', description: 'Thinly sliced lotus stems wok-tossed with toasted sesame seeds, scallions, garlic, and sweet spicy honey glaze.', price: 260, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_3', name: 'Ghee Roast Mushroom Pepper Fry', description: 'Fresh button mushrooms tossed in slow-roasted Kundapur ghee masala with fresh curry leaves and crushed tellicherry pepper.', price: 270, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_4', name: 'Golden Corn Cheese Croquettes', description: 'Golden breaded croquettes stuffed with sweet American corn, melted mozzarella, and fresh herbs. Served with spicy dip.', price: 240, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_5', name: 'Paneer Butter Masala Royal', description: 'Silky smooth tomato-cashew velvet gravy simmered with fresh cream, kasuri methi, and melt-in-mouth cottage cheese cubes.', price: 320, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_6', name: 'Dal Makhani Overnight Dum', description: 'Whole black lentils slow-cooked for 18 hours on glowing charcoal embers with churned white butter, cream, and rich spices.', price: 290, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_7', name: 'Kadhai Vegetable Peshawari', description: 'Crunchy bell peppers, florets, baby corn, and paneer wok-tossed in freshly crushed coriander and red chili kadhai gravy.', price: 290, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_8', name: 'Dum Aloo Kashmiri Saffron', description: 'Baby potatoes stuffed with minced paneer and dry fruits, gently simmered in a fragrant saffron and fennel seed gravy.', price: 310, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_9', name: 'Hyderabadi Shahi Veg Dum Biryani', description: 'Aged long-grain basmati rice layered with marinated seasonal vegetables, saffron, mint, and fried onions. Served with salan and raita.', price: 340, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', category: 'Biryani & Rice', isAvailable: true },
      { id: 'p_res_10', name: 'Butter Garlic Naan (2 Pcs)', description: 'Classic tandoor-baked leavened flatbread brushed with garlic butter and fresh coriander leaves.', price: 90, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', category: 'Breads', isAvailable: true },
      { id: 'p_res_11', name: 'Warm Gulab Jamun with Rabdi', description: 'Golden fried milk dumplings soaked in fragrant rose-cardamom syrup, served hot with thick chilled lachha rabdi.', price: 160, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', category: 'Desserts & Drinks', isAvailable: true },
      { id: 'p_res_12', name: 'Artisanal Mango Malai Kulfi', description: 'Traditional slow-reduced creamy milk kulfi infused with pure Alphonso mango puree and roasted pistachio silvers.', price: 120, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80', category: 'Desserts & Drinks', isAvailable: true },
      { id: 'p_res_13', name: 'Murgh Tandoori Chicken Tikka', description: 'Boneless tender chicken thighs steeped in spiced hung curd and Kashmiri chili marinade, flame-charred in clay tandoor.', price: 340, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_14', name: 'Andhra Special Chicken 65', description: 'Crispy fried boneless chicken tossed with South Indian aromatic spices, curry leaves, ginger-garlic, and green chilies.', price: 320, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_15', name: 'Hyderabadi Chicken Dum Biryani', description: 'Authentic royal kacchi dum biryani layered with marinated farm chicken, saffron milk, caramelized onions, and aged basmati.', price: 390, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', category: 'Biryani & Rice', isAvailable: true },
      { id: 'p_res_16', name: 'Delhi Butter Chicken (Murgh Makhani)', description: 'Tandoori roasted chicken pieces simmered gently in rich tomato, cashew nut, and white butter satin gravy with kasuri methi.', price: 380, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_17', name: 'Slow-Cooked Mutton Rogan Josh', description: 'Tender baby mutton pieces braised in an authentic Kashmiri aromatic red gravy flavored with ratanjot and dry ginger.', price: 460, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80', category: 'Main Course', isAvailable: true },
      { id: 'p_res_18', name: 'Butter Garlic Pepper Prawns', description: 'Fresh juicy tiger prawns pan-sautéed in melted garlic butter, freshly cracked Tellicherry black pepper, and herbs.', price: 420, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true },
      { id: 'p_res_19', name: 'Mangalorean Tawa Fish Fry', description: 'Fresh surmai fish coated in tangy spicy Byadgi chili paste, shallow-fried crisp on an authentic iron tawa.', price: 380, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', category: 'Starters', isAvailable: true }
    ],
    gallery: [
      { id: 'g_res_1', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', title: 'Royal Ambient Dining Hall', category: 'Ambience' },
      { id: 'g_res_2', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', title: 'Live Tandoor & Kitchen Counter', category: 'Kitchen' },
      { id: 'g_res_3', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', title: 'Shahi Biryani & Gourmet Platters', category: 'Dishes' }
    ],
    testimonials: [
      { id: 't_res_1', clientName: 'Siddharth Sen', clientRole: 'Indiranagar, Bengaluru', content: 'The digital menu experience is brilliant! We placed our order on WhatsApp for Table 4, checked dish ingredients & spice levels, and received piping hot food within 15 minutes!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_res_2', clientName: 'Priya Chandran', clientRole: 'Koramangala, Bengaluru', content: 'Paneer Butter Masala Royal and the Garlic Naans are unbelievable. Having item details and direct WhatsApp ordering makes everything so frictionless.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
      { id: 't_res_3', clientName: 'Rajesh Hegde', clientRole: 'HSR Layout, Bengaluru', content: 'Super fast WhatsApp response from the kitchen staff. Clean interface, transparent prices, instant UPI payment. This is the future of dining!', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_res_wa', platform: 'whatsapp', url: 'https://wa.me/916304989071', label: 'Order on WhatsApp' },
      { id: 'soc_res_ph', platform: 'phone', url: 'tel:+916304989071', label: 'Call Table Desk' },
      { id: 'soc_res_web', platform: 'website', url: 'https://oneclickbiz.in/v/food-restaurant', label: 'Official Website' },
      { id: 'soc_res_in', platform: 'instagram', url: 'https://instagram.com/oneclickbiz', label: 'Instagram @oneclickbiz' },
      { id: 'soc_res_yt', platform: 'youtube', url: 'https://youtube.com/@oneclickbiz', label: 'YouTube Kitchen Stories' }
    ]
  },
  'home-interior': {
    name: 'Ar. Ananya Deshmukh',
    designation: 'Principal Architect & Interior Designer',
    company: 'Studio Luxe Interiors & Architecture',
    bio: 'Crafting bespoke turnkey luxury homes, modular kitchens, and contemporary commercial interiors with German hardware, 3D visualization, and flat 10-year warranty.',
    theme: 'modern-indigo',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    email: 'ananya@studioluxe.in',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    website: 'https://studioluxe.in',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana, India',
    services: [
      { id: 's_int_1', title: 'Free 3D Architectural & Interior Consultation', description: 'Personalized site visit, layout blueprint review, and material finishes selection.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_int_2', title: 'Full Turnkey Residential Interior Execution', description: 'Complete false ceiling, modular woodwork, lighting, civil, and turnkey decor.', durationMinutes: 90, price: 50000, currency: '₹' },
      { id: 's_int_3', title: 'Modular German Kitchen & Wardrobes', description: 'Factory-built marine ply cabinets with Hafele & Blum soft-close fittings.', durationMinutes: 45, price: 25000, currency: '₹' }
    ],
    products: [
      { id: 'p_int_1', name: 'The Sovereign Living & Dining Lounge', description: 'Italian statuario marble flooring, custom fluted acoustic veneer paneling, ambient magnetic track lighting.', price: 1850000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', category: 'Living Room', isAvailable: true },
      { id: 'p_int_2', name: 'Minimalist Matte Charcoal Modular Kitchen', description: 'Century Club Prime BWP plywood, quartz stone countertop, Hafele lift-up fittings, Blum soft-close tandem boxes.', price: 1250000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', category: 'Modular Kitchen', isAvailable: true },
      { id: 'p_int_3', name: 'The Zen Master Suite & Walk-in Wardrobe', description: 'Warm teak fluted headboard, acoustic upholstered panels, tinted bronze glass wardrobes with sensor LED lighting.', price: 1450000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', category: 'Master Suite', isAvailable: true }
    ],
    gallery: [
      { id: 'g_int_1', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', title: 'Jubilee Hills Luxury Residence', category: 'Living' },
      { id: 'g_int_2', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Modular Island Kitchen', category: 'Kitchen' },
      { id: 'g_int_3', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Master Bedroom Suite', category: 'Bedrooms' }
    ],
    testimonials: [
      { id: 't_int_1', clientName: 'Karthik & Pooja Reddy', clientRole: 'Owners, 3BHK Kokapet High-Rise', content: 'The 3D render was 100% matched in reality. Delivered right on day 43 with zero delay and flawless finish.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_int_2', clientName: 'Vikram & Shruti Malhotra', clientRole: 'Owners, 4BHK Gated Villa', content: 'German hardware and factory modular finish are top tier. Transparent BOQ and excellent project management.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_int_wa', platform: 'whatsapp', url: 'https://wa.me/919876543210', label: 'WhatsApp' },
      { id: 'soc_int_ig', platform: 'instagram', url: 'https://instagram.com/studioluxe_interiors', label: 'Instagram' },
      { id: 'soc_int_fb', platform: 'facebook', url: 'https://facebook.com/studioluxeinteriors', label: 'Facebook' },
      { id: 'soc_int_ph', platform: 'phone', url: 'tel:+919876543210', label: 'Call Now' },
      { id: 'soc_int_em', platform: 'email', url: 'mailto:ananya@studioluxe.in', label: 'Email' }
    ]
  },
  'interior': {
    name: 'Ar. Ananya Deshmukh',
    designation: 'Principal Architect & Interior Designer',
    company: 'Studio Luxe Interiors & Architecture',
    bio: 'Crafting bespoke turnkey luxury homes, modular kitchens, and contemporary commercial interiors with German hardware, 3D visualization, and flat 10-year warranty.',
    theme: 'modern-indigo',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    email: 'ananya@studioluxe.in',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    website: 'https://studioluxe.in',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, Telangana, India',
    services: [
      { id: 's_int_1', title: 'Free 3D Architectural & Interior Consultation', description: 'Personalized site visit, layout blueprint review, and material finishes selection.', durationMinutes: 60, price: 0, currency: '₹' },
      { id: 's_int_2', title: 'Full Turnkey Residential Interior Execution', description: 'Complete false ceiling, modular woodwork, lighting, civil, and turnkey decor.', durationMinutes: 90, price: 50000, currency: '₹' },
      { id: 's_int_3', title: 'Modular German Kitchen & Wardrobes', description: 'Factory-built marine ply cabinets with Hafele & Blum soft-close fittings.', durationMinutes: 45, price: 25000, currency: '₹' }
    ],
    products: [
      { id: 'p_int_1', name: 'The Sovereign Living & Dining Lounge', description: 'Italian statuario marble flooring, custom fluted acoustic veneer paneling, ambient magnetic track lighting.', price: 1850000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', category: 'Living Room', isAvailable: true },
      { id: 'p_int_2', name: 'Minimalist Matte Charcoal Modular Kitchen', description: 'Century Club Prime BWP plywood, quartz stone countertop, Hafele lift-up fittings, Blum soft-close tandem boxes.', price: 1250000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', category: 'Modular Kitchen', isAvailable: true },
      { id: 'p_int_3', name: 'The Zen Master Suite & Walk-in Wardrobe', description: 'Warm teak fluted headboard, acoustic upholstered panels, tinted bronze glass wardrobes with sensor LED lighting.', price: 1450000, currency: '₹', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', category: 'Master Suite', isAvailable: true }
    ],
    gallery: [
      { id: 'g_int_1', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', title: 'Jubilee Hills Luxury Residence', category: 'Living' },
      { id: 'g_int_2', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Modular Island Kitchen', category: 'Kitchen' },
      { id: 'g_int_3', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Master Bedroom Suite', category: 'Bedrooms' }
    ],
    testimonials: [
      { id: 't_int_1', clientName: 'Karthik & Pooja Reddy', clientRole: 'Owners, 3BHK Kokapet High-Rise', content: 'The 3D render was 100% matched in reality. Delivered right on day 43 with zero delay and flawless finish.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { id: 't_int_2', clientName: 'Vikram & Shruti Malhotra', clientRole: 'Owners, 4BHK Gated Villa', content: 'German hardware and factory modular finish are top tier. Transparent BOQ and excellent project management.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ],
    socials: [
      { id: 'soc_int_wa', platform: 'whatsapp', url: 'https://wa.me/919876543210', label: 'WhatsApp' },
      { id: 'soc_int_ig', platform: 'instagram', url: 'https://instagram.com/studioluxe_interiors', label: 'Instagram' },
      { id: 'soc_int_fb', platform: 'facebook', url: 'https://facebook.com/studioluxeinteriors', label: 'Facebook' },
      { id: 'soc_int_ph', platform: 'phone', url: 'tel:+919876543210', label: 'Call Now' },
      { id: 'soc_int_em', platform: 'email', url: 'mailto:ananya@studioluxe.in', label: 'Email' }
    ]
  }
};

TEMPLATE_PRESETS_DATA['food-home'] = TEMPLATE_PRESETS_DATA['food-restaurant'];
TEMPLATE_PRESETS_DATA['brahmin-food'] = TEMPLATE_PRESETS_DATA['food-restaurant'];
TEMPLATE_PRESETS_DATA['food-cafe'] = TEMPLATE_PRESETS_DATA['restaurant-menu'];
TEMPLATE_PRESETS_DATA['food-biryani'] = TEMPLATE_PRESETS_DATA['restaurant-menu'];
TEMPLATE_PRESETS_DATA['food-fastfood'] = TEMPLATE_PRESETS_DATA['food-restaurant'];
TEMPLATE_PRESETS_DATA['food-icecream'] = TEMPLATE_PRESETS_DATA['food-restaurant'];
TEMPLATE_PRESETS_DATA['food-pub'] = TEMPLATE_PRESETS_DATA['restaurant-menu'];
TEMPLATE_PRESETS_DATA['food-dhaba'] = TEMPLATE_PRESETS_DATA['restaurant-menu'];
TEMPLATE_PRESETS_DATA['food-southindian'] = TEMPLATE_PRESETS_DATA['restaurant-menu'];

TEMPLATE_PRESETS_DATA['fash-boutique'] = {
  name: 'Grand Fashion & Clothing Mall',
  designation: 'Multi-Floor Fashion Shopping Mall • Men’s, Women’s & Kids’ Collections',
  company: 'Grand Fashion & Clothing Shopping Mall',
  bio: 'Welcome to Grand Fashion & Clothing Shopping Mall. A premier multi-level fashion shopping mall featuring the latest collections in Men’s, Women’s, and Kids’ apparel, bridal silks, festive wear, formal suits, western outfits, and accessories with worldwide doorstep express shipping.',
  theme: 'sunset-gold',
  avatarUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  email: 'mall@oneclickbiz.in',
  phone: '+91 63049 89071',
  whatsapp: '916304989071',
  website: 'https://oneclickbiz.in/v/fash-boutique',
  address: 'OneClickBiz Grand Mall, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
  services: [
    { id: 's_fb_1', title: 'Ground Floor: Women’s Silks, Bridal & Western Studio', description: 'Explore Kanchipuram silks, bridal lehengas, designer anarkalis, festive kurtis, and western fashion.', durationMinutes: 60, price: 0, currency: '₹' },
    { id: 's_fb_2', title: 'First Floor: Men’s Studio, Suits, Sherwanis & Formals', description: 'Bespoke tuxedos, Jodhpuri suits, groom sherwanis, bandhgalas, festive kurtas, and business formals.', durationMinutes: 45, price: 0, currency: '₹' },
    { id: 's_fb_3', title: 'Second Floor: Kids’ Kingdom & Teens Festive Collection', description: 'Pattu pavadas, junior sherwanis, party frocks, dhoti sets, and ethnic wear for boys and girls.', durationMinutes: 45, price: 0, currency: '₹' },
    { id: 's_fb_4', title: 'Mall Services: In-Store Trial Rooms & Custom Tailoring Desk', description: 'Personal stylist consultation, master tailor measurements, alteration lounge, and worldwide DHL courier delivery.', durationMinutes: 30, price: 0, currency: '₹' }
  ],
  products: [
    // ------------------------------------------
    // 1. WOMEN'S COLLECTION (6 Items)
    // ------------------------------------------
    { 
      id: 'prod_fash_w1', 
      name: 'Royal Crimson Zardozi Bridal Lehenga', 
      description: 'Pure raw silk bridal lehenga with hand zari, dabka embroidery and double organza dupattas.', 
      price: 145000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', 
      category: 'Bridal', 
      isAvailable: true,
      gender: 'women' as any
    },
    { 
      id: 'prod_fash_w2', 
      name: 'Kanchipuram Pure Gold Tissue Brocade Saree', 
      description: 'Silk Mark certified 6-ply mulberry silk with authentic pure silver & gold zari brocade.', 
      price: 85000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 
      category: 'Sarees', 
      isAvailable: true,
      gender: 'women' as any
    },
    { 
      id: 'prod_fash_w3', 
      name: 'Emerald Velvet Anarkali & Organza Dupatta', 
      description: 'Micro-velvet floor length Anarkali with Jaipur Gota Patti embroidery and scalloped dupatta.', 
      price: 42000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80', 
      category: 'Indo-Western', 
      isAvailable: true,
      gender: 'women' as any
    },
    { 
      id: 'prod_fash_w4', 
      name: 'Pastel Blush Embroidered Reception Gown', 
      description: 'French illusion tulle with Swarovski crystals, built-in corset boning, and cathedral sweep train.', 
      price: 98000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80', 
      category: 'Couture', 
      isAvailable: true,
      gender: 'women' as any
    },
    { 
      id: 'prod_fash_w5', 
      name: 'Royal Peacock Blue Banarasi Katan Silk Saree', 
      description: 'Handwoven pure Varanasi Katan silk saree with antique gold zari floral motifs and meenakari borders.', 
      price: 62000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80', 
      category: 'Sarees', 
      isAvailable: true,
      gender: 'women' as any
    },
    { 
      id: 'prod_fash_w6', 
      name: 'Floral Organza Silk Saree with Hand-painted Pallu', 
      description: 'Airy pastel lavender organza silk saree hand-painted by master kalamkari artisans with scalloped pearl borders.', 
      price: 29500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80', 
      category: 'Indo-Western', 
      isAvailable: true,
      gender: 'women' as any
    },

    // ------------------------------------------
    // 2. MEN'S COLLECTION (6 Items)
    // ------------------------------------------
    { 
      id: 'prod_fash_m1', 
      name: 'Royal Ivory & Gold Hand-Zardozi Groom Sherwani', 
      description: 'Regal raw silk sherwani intricately hand-embroidered with antique dabka, French sequins, and pearl buttons. Includes stole and churidar.', 
      price: 88000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', 
      category: 'Groom Sherwanis', 
      isAvailable: true,
      gender: 'men' as any
    },
    { 
      id: 'prod_fash_m2', 
      name: 'Jodhpuri Royal Bandhgala Suit in Forest Green', 
      description: 'Structured bespoke Italian wool-silk blend bandhgala jacket with hand-cast engraved gold crest buttons and slim trousers.', 
      price: 45000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80', 
      category: 'Bandhgala & Jodhpuri', 
      isAvailable: true,
      gender: 'men' as any
    },
    { 
      id: 'prod_fash_m3', 
      name: 'Onyx Black Silk Tuxedo & Zari Shawl Lapel', 
      description: 'Precision bespoke single-breasted tuxedo in midnight onyx raw silk featuring an antique gold handwoven Zari shawl lapel and satin-striped trousers.', 
      price: 58000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 
      category: 'Tuxedos & Western', 
      isAvailable: true,
      gender: 'men' as any
    },
    { 
      id: 'prod_fash_m4', 
      name: 'Mustard Festive Silk Kurta & Nehru Jacket', 
      description: 'Luminous mustard yellow Chanderi silk kurta paired with an intricately embroidered Bundi Nehru waistcoat featuring traditional mirror work.', 
      price: 24500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80', 
      category: 'Kurtas & Nehru Jackets', 
      isAvailable: true,
      gender: 'men' as any
    },
    { 
      id: 'prod_fash_m5', 
      name: 'Midnight Blue Asymmetrical Achkan Set', 
      description: 'Contemporary midnight navy Indo-Western Achkan with an architectural crossover front, antique pewter buttons, and silk cowl kurta.', 
      price: 38000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?auto=format&fit=crop&w=800&q=80', 
      category: 'Indo-Western & Fusion', 
      isAvailable: true,
      gender: 'men' as any
    },
    { 
      id: 'prod_fash_m6', 
      name: 'Ruby Maroon Banarasi Brocade Sherwani', 
      description: 'GI-Tagged Varanasi handloom brocade sherwani woven with pure gold zari butis, matching brocade stole, and raw silk churidar.', 
      price: 72000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', 
      category: 'Groom Sherwanis', 
      isAvailable: true,
      gender: 'men' as any
    },

    // ------------------------------------------
    // 3. KIDS' & TEENS' COLLECTION (6 Items)
    // ------------------------------------------
    { 
      id: 'prod_fash_k1', 
      name: 'Little Princess Gold & Magenta Pattu Pavada', 
      description: 'Authentic South Indian traditional lehenga choli set for young girls in pure magenta and gold tissue silk with temple borders and soft cotton lining.', 
      price: 14500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80', 
      category: 'Pattu Pavada & Lehengas', 
      isAvailable: true,
      gender: 'kids' as any
    },
    { 
      id: 'prod_fash_k2', 
      name: 'Junior Prince Ivory & Gold Zari Sherwani', 
      description: 'Miniature royal sherwani for boys in soft raw silk with floral dabka embroidery, matching churidar, and pre-tied miniature safa turban.', 
      price: 16500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', 
      category: 'Junior Sherwanis & Suits', 
      isAvailable: true,
      gender: 'kids' as any
    },
    { 
      id: 'prod_fash_k3', 
      name: 'Floral Ruffled Birthday Fairy Frock in Peach', 
      description: 'Multi-tiered cascading ruffle princess gown for girls with floral pearl embroidery on corset yoke and skin-friendly cotton underskirt.', 
      price: 9500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', 
      category: 'Party Frocks & Gowns', 
      isAvailable: true,
      gender: 'kids' as any
    },
    { 
      id: 'prod_fash_k4', 
      name: 'Boys Mustard Silk Kurta & Brocade Dhoti Set', 
      description: 'Vibrant Haldi festive outfit for boys with slip-on pre-pleated gold brocade dhoti and sunshine yellow silk kurta with gotta borders.', 
      price: 8900, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80', 
      category: 'Kurta Dhoti Sets', 
      isAvailable: true,
      gender: 'kids' as any
    },
    { 
      id: 'prod_fash_k5', 
      name: 'Teens Mint Green Embroidered Anarkali Gown', 
      description: 'Graceful pastel mint green Anarkali gown tailored for teenage girls with floral thread embroidery, scalloped dupatta, and leggings.', 
      price: 18000, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', 
      category: 'Pattu Pavada & Lehengas', 
      isAvailable: true,
      gender: 'kids' as any
    },
    { 
      id: 'prod_fash_k6', 
      name: 'Boys Royal Blue Velvet Waistcoat & Kurta Set', 
      description: 'Smart 3-piece festive set with plush royal blue velvet Nehru jacket with lion crest buttons over a silk kurta and white churidar.', 
      price: 12500, 
      currency: '₹', 
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80', 
      category: 'Junior Sherwanis & Suits', 
      isAvailable: true,
      gender: 'kids' as any
    }
  ],
  gallery: [
    { id: 'gal_fash_1', imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', title: 'Royal Crimson Bridal Lehenga', category: 'Women Floor' },
    { id: 'gal_fash_2', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80', title: 'Royal Ivory Groom Sherwani', category: 'Men Floor' },
    { id: 'gal_fash_3', imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80', title: 'Princess Gold Pattu Pavada', category: 'Kids Floor' },
    { id: 'gal_fash_4', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', title: 'Kanchipuram Pure Brocade Saree', category: 'Women Floor' }
  ],
  testimonials: [
    { id: 't_fash_1', clientName: 'Divya & Rohan Singhania', clientRole: 'Wedding Couple, Bengaluru', content: 'We shopped our entire wedding trousseau at Grand Fashion Mall! My bridal lehenga and Rohan’s sherwani matched exquisitely, and the in-store trial rooms were luxurious.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { id: 't_fash_2', clientName: 'Meera Nambiar & Family', clientRole: 'Family Shoppers, Indiranagar', content: 'Found everything under one roof: pure silk sarees for me, formal suits for my husband, and festive pattu pavadas for our daughters. Top quality and instant alteration service.', rating: 5, clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
  ],
  socials: [
    { id: 'soc_fash_wa', platform: 'whatsapp', url: 'https://wa.me/916304989071', label: 'WhatsApp Chat' },
    { id: 'soc_fash_ph', platform: 'phone', url: 'tel:+916304989071', label: 'Mall Helpdesk' },
    { id: 'soc_fash_in', platform: 'instagram', url: 'https://instagram.com/oneclickbiz', label: 'Instagram' },
    { id: 'soc_fash_yt', platform: 'youtube', url: 'https://youtube.com/@oneclickbiz', label: 'YouTube Channel' },
    { id: 'soc_fash_fb', platform: 'facebook', url: 'https://facebook.com/oneclickbiz', label: 'Facebook Page' },
    { id: 'soc_fash_em', platform: 'email', url: 'mailto:mall@oneclickbiz.in', label: 'Email Desk' },
    { id: 'soc_fash_map', platform: 'maps', url: 'https://maps.google.com/?q=OneClickBiz+Grand+Fashion+Mall+Indiranagar+Bengaluru', label: 'Mall Location' },
    { id: 'soc_fash_web', platform: 'website', url: 'https://oneclickbiz.in/v/fash-boutique', label: 'Official Website' }
  ]
};

TEMPLATE_PRESETS_DATA['fash-ladies'] = TEMPLATE_PRESETS_DATA['fash-boutique'];
TEMPLATE_PRESETS_DATA['fash-mens'] = TEMPLATE_PRESETS_DATA['fash-boutique'];
TEMPLATE_PRESETS_DATA['fash-saree'] = TEMPLATE_PRESETS_DATA['fash-boutique'];
TEMPLATE_PRESETS_DATA['fash-online'] = TEMPLATE_PRESETS_DATA['fash-boutique'];

TEMPLATE_PRESETS_DATA['insurance'] = TEMPLATE_PRESETS_DATA['prof-insurance'];
TEMPLATE_PRESETS_DATA['mediclaim'] = TEMPLATE_PRESETS_DATA['prof-insurance'];
TEMPLATE_PRESETS_DATA['insurance-advisor'] = TEMPLATE_PRESETS_DATA['prof-insurance'];



/**
 * Returns a fully populated, production-ready DigitalProfile for any of the 28 templates.
 */
export function getTemplateProfile(templateId: string): DigitalProfile {
  // Fallback alias for real estate templates
  const effectiveId = (templateId.startsWith('re-') || templateId === 'vcard35') ? 're-builders' : templateId;
  const meta = VCARD_TEMPLATES_CATALOG.find((t) => t.id === templateId) || 
               VCARD_TEMPLATES_CATALOG.find((t) => t.id === effectiveId) || 
               VCARD_TEMPLATES_CATALOG[0];
  const custom = TEMPLATE_PRESETS_DATA[templateId] || TEMPLATE_PRESETS_DATA[effectiveId] || {};

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

  const customPhone = custom.phone || '+91 63049 89071';
  const customWaDigits = (custom.whatsapp || custom.phone || '916304989071').replace(/\D/g, '');
  const cleanWaNumber = customWaDigits.length === 10 ? `91${customWaDigits}` : customWaDigits;

  const socials: SocialLinkItem[] = custom.socials || [
    { id: 's_wa', platform: 'whatsapp', url: `https://wa.me/${cleanWaNumber || '916304989071'}`, label: 'WhatsApp' },
    { id: 's_ph', platform: 'phone', url: `tel:${customPhone.replace(/[^\d+]/g, '')}`, label: 'Call' },
    { id: 's_em', platform: 'email', url: `mailto:${custom.email || 'support@oneclickbiz.in'}`, label: 'Email' },
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
    phone: customPhone,
    whatsapp: cleanWaNumber || '916304989071',
    website: custom.website || `https://oneclickbiz.in/v/${templateId}`,
    address: custom.address || 'OneClickBiz Towers, Indiranagar, Bangalore, India',
    avatarUrl,
    coverUrl,
    theme,
    templateId,
    category: meta.category,
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
      realEstate: meta.category === 'Real Estate' || effectiveId.startsWith('re-') ? {
        reraId: 'TS-RERA/P02400008920',
        trackRecordYears: 18,
        developedAcres: 120,
        deliveredProjects: 14,
        happyFamilies: 3500,
        clearTitleRating: '100% Clear Title Guaranteed',
        primaryCorridor: 'Srisailam Highway / Kadthal Growth Zone',
        city: 'Hyderabad'
      } : undefined,
      interior: ((meta.category as string) === 'Interior Design' || effectiveId.startsWith('interior') || effectiveId.startsWith('home-interior')) ? {
        iiidId: 'IIID/TS/ARCH-2024-884',
        warrantyYears: '10-Year Flat Replacement Warranty',
        turnkeyGuaranteeDays: '45-Day Move-In Guarantee',
        completedHomes: '140+ Luxury Homes',
        sqftTransformed: '4.5 Lakh+ Sq.Ft',
        happyClients: '350+ Happy Homeowners',
        city: 'Hyderabad',
        experienceCenter: 'Road No. 36, Jubilee Hills, Hyderabad'
      } : undefined,
      restaurant: ((meta.category as string) === 'Food Business' || effectiveId.startsWith('food-') || effectiveId.includes('restaurant')) ? {
        fssaiNumber: 'FSSAI Lic. No. 13624014000892',
        cuisineType: 'Hyderabadi Dum Biryani, Tandoor & North Indian Delicacies',
        diningTimings: '11:30 AM – 11:30 PM (All 7 Days)',
        seatingCapacity: '120 Pax (AC Family Hall & Open Rooftop)',
        reservationPolicy: 'Table hold for 15 mins. Prior booking advised on weekends.',
        deliveryRadius: 'Up to 12 km via WhatsApp Direct & Swiggy/Zomato',
        dietaryHighlights: 'Pure Desi Ghee • Halal Certified • Jain Options Available'
      } : undefined,
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
