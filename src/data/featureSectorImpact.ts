export interface SectorImpact {
  sectorId: string;
  sectorName: string;
  sectorIcon: string; // Emoji
  painPoint: string;
  howItHelps: string;
  roiBenefit: string;
  realWorldScenario: string;
}

export interface FeatureDetail {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  iconName: string;
  themeColor: string; // e.g. 'indigo', 'emerald', 'amber', etc.
  imageUrl?: string;
  description: string;
  metrics: { value: string; label: string }[];
  keyCapabilities: string[];
  sectorImpacts: SectorImpact[];
}

export const SECTORS = [
  { id: 'all', name: 'All Sectors', icon: '🌐' },
  { id: 'real_estate', name: 'Real Estate & Builders', icon: '🏢' },
  { id: 'healthcare', name: 'Doctors & Clinics', icon: '🏥' },
  { id: 'consulting', name: 'Consultants, Lawyers & CAs', icon: '💼' },
  { id: 'retail', name: 'Retail, Boutiques & D2C', icon: '🛍️' },
  { id: 'agency_tech', name: 'Tech, SaaS & Agencies', icon: '💻' },
  { id: 'coaching', name: 'Coaches & Institutes', icon: '🎓' },
  { id: 'hospitality', name: 'Salons, Dining & Events', icon: '🍽️' },
];

export const FEATURES_DATA: FeatureDetail[] = [
  {
    id: 'mini-websites',
    name: 'Mini Websites & Business Profiles',
    tagline: 'Turnkey mobile-first business websites with custom domain support',
    badge: '28+ Templates',
    iconName: 'Smartphone',
    themeColor: 'indigo',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    description: 'Launch a complete, interactive mobile mini-website for your business in under 2 minutes. Showcase your story, services, galleries, client reviews, and custom domain — 100% cloud-hosted with zero coding or hardware.',
    metrics: [
      { value: '28+', label: 'Ready Templates' },
      { value: '100%', label: 'Cloud Hosted' },
      { value: '< 2m', label: 'Instant Launch' }
    ],
    keyCapabilities: [
      'Tailored layouts across 13 major industries (Real Estate, Doctors, Dining, Agencies & more)',
      'Custom branded handle (oneclickbiz.in/v/your-brand) or custom white-label domain',
      'Interactive service showcases, photo lookbooks, and embedded Google Maps directions',
      '100% pure software solution — no hardware, no app installation required for visitors'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Brokers fumble with paper flyers while standing inside construction sites or model villas.',
        howItHelps: 'Share your dynamic mini-website via QR or WhatsApp. Buyers immediately explore 3D walkthroughs, floor plans, and pricing in their browser.',
        roiBenefit: 'Instant professional credibility that sets you apart from 99% of competing brokers.',
        realWorldScenario: 'At an open house, an agent shares their mini-website link, letting prospective buyers explore floor plans and virtual walkthroughs.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients and medical conference attendees need fast access to doctor credentials, clinic locations, and appointment booking.',
        howItHelps: 'One single digital profile showcases doctor qualifications, clinic timings, hospital affiliations, and instant booking slots.',
        roiBenefit: 'Eliminates paper brochures while providing a modern 24/7 patient gateway.',
        realWorldScenario: 'A senior specialist shares their digital business profile with conference delegates, showcasing clinic locations and surgical case studies.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Carrying hundreds of paper cards to business luncheons, often running out midway.',
        howItHelps: 'One permanent cloud-hosted digital profile is always ready to share via QR, WhatsApp, or link. Never run out of cards again.',
        roiBenefit: 'Zero recurring printing costs, always up-to-date, and seamless executive presentation.',
        realWorldScenario: 'A corporate advocate shares their branded mini-website link at an industry summit, displaying landmark case summaries and booking slots.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Boutique owners lose out on customer re-orders after shoppers leave the retail store.',
        howItHelps: 'Customers save the store\'s mini-website directly on their phone home screen to browse new collections anytime.',
        roiBenefit: 'Turns one-time walk-in retail shoppers into repeat lifetime customers.',
        realWorldScenario: 'A designer boutique places a stylish QR standee at checkout; shoppers scan to bookmark the digital store lookbook.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Traditional cards cannot convey complex software solutions or agency portfolios.',
        howItHelps: 'Combines case studies, video reels, client reviews, and consultation scheduling into one responsive mobile link.',
        roiBenefit: '+240% increase in scheduled intro calls post-meeting.',
        realWorldScenario: 'An agency founder shares their OneClickBiz profile link in their email signature and LinkedIn bio, driving 40+ client inquiries monthly.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Students and parents ask for course syllabi, fee structures, and demo class bookings across disjointed channels.',
        howItHelps: 'Organizes course catalogs, faculty credentials, student testimonials, and demo registrations on one sleek page.',
        roiBenefit: 'Streamlines student lead capture with zero third-party platform cuts.',
        realWorldScenario: 'A coaching institute displays their profile QR code on campus flyers; students scan to register for upcoming batches.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Restaurants and salons want diners to browse visual photo menus and book tables without downloading apps.',
        howItHelps: 'Guests open a fast-loading digital menu with high-res food photos, chef specials, and 1-tap table booking.',
        roiBenefit: 'Increases direct customer engagement and commission-free reservations.',
        realWorldScenario: 'A restaurant guest scans a table QR code to explore the dessert photo menu and reserve a table for their upcoming anniversary.'
      }
    ]
  },
  {
    id: 'smart-visiting-card',
    name: 'Smart Visiting Card Studio',
    tagline: 'Luxury 300 DPI print-ready cards with 3D interactive flip preview',
    badge: '300 DPI Print & Digital',
    iconName: 'CreditCard',
    themeColor: 'amber',
    imageUrl: 'https://images.unsplash.com/photo-1616628188506-4ad99d65640e?auto=format&fit=crop&w=800&q=80',
    description: 'Design luxury business cards with 6 premium templates, 3D interactive flip preview, custom company logos, and download print-ready 300 DPI front & back PDFs paired with dynamic digital links.',
    metrics: [
      { value: '100%', label: 'Zero Paper Waste' },
      { value: '300 DPI', label: 'Ultra High Print Resolution' },
      { value: '3 Min', label: 'Fast Customization' }
    ],
    keyCapabilities: [
      '6 Designer luxury templates with front & back preview',
      'Instant 300 DPI vector PDF export ready for local offset printers',
      'Embedded dynamic QR code linking directly to your live mobile profile',
      'Custom company branding, gold foil aesthetics, and custom typography'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Agents hand out outdated paper cards where project names and phone numbers frequently change.',
        howItHelps: 'Cards feature a permanent dynamic QR code. Even when your active property inventory updates, the printed card always connects buyers to your live listings.',
        roiBenefit: '+40% repeat site visit inquiries from existing networking cards.',
        realWorldScenario: 'An agent meets a property investor at an expo, hands over a matte metallic OneClickBiz card. The investor scans the QR code 3 weeks later and sees newly launched luxury villas.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients lose paper visiting cards and struggle to find emergency clinic timings or address.',
        howItHelps: 'Front displays doctor credentials and emergency phone number; back QR code opens full Google Maps directions, clinic hours, and 1-tap WhatsApp appointment booking.',
        roiBenefit: 'Eliminates missed patient follow-ups and wrong-address visits.',
        realWorldScenario: 'A patient takes the doctor\'s card from the hospital reception and easily navigates to the clinic via the integrated Google Maps link.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'High-net-worth clients expect sleek, executive-tier corporate branding, not cheap paper.',
        howItHelps: 'Provides executive Dark Onyx & Gold templates that project institutional authority and instantly save partners\' direct line into client contact lists.',
        roiBenefit: 'Elevates perceived brand value, justifying premium retainer pricing.',
        realWorldScenario: 'A senior tax advisor hands a luxury card at a corporate board meeting, prompting the CEO to scan and immediately book a tax audit review.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Walk-in shoppers take a card but rarely remember to visit your store again.',
        howItHelps: 'Every card includes an instant QR link to your WhatsApp product catalog and Instagram page with festive discounts.',
        roiBenefit: '+28% repeat purchases from showroom visitors.',
        realWorldScenario: 'A fashion boutique places smart cards in shopping bags. Shoppers scan the card at home to browse new festive arrivals on WhatsApp.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Tech founders look outdated handing over plain paper cards at venture summits.',
        howItHelps: 'Delivers Modern Indigo cyber-gradient styling linking to interactive pitch decks, client demo reels, and Calendly integration.',
        roiBenefit: '3X higher follow-up conversion from investor conferences.',
        realWorldScenario: 'A startup founder shares their card at Web Summit. Angels scan and immediately view the interactive product demo video.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Prospective students and parents want immediate syllabus details and batch timings.',
        howItHelps: 'Cards link to course outlines, student video testimonials, and direct WhatsApp counseling enrollment chat.',
        roiBenefit: '+35% higher student conversion from education fairs.',
        realWorldScenario: 'An academy director distributes cards at a seminar; parents scan to enroll their children in upcoming weekend batches.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Guests lose menu cards and struggle to find reservation numbers during peak hours.',
        howItHelps: 'Compact table cards allow guests to scan for digital menu specials, Instagram tags, and direct table booking.',
        roiBenefit: 'Drives direct commission-free reservations without third-party app fees.',
        realWorldScenario: 'A restaurant customer scans the card at the table and easily books a table for family dinner next weekend.'
      }
    ]
  },
  {
    id: 'whatsapp-store',
    name: 'WhatsApp Mini Storefront',
    tagline: 'Interactive catalog with instant pre-formatted WhatsApp orders',
    badge: 'Instant Checkout',
    iconName: 'ShoppingBag',
    themeColor: 'emerald',
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    description: 'Transform your digital profile into an interactive mobile storefront. Showcase products with multi-image galleries, prices, discounts, and custom options. Customers build a cart and checkout via pre-formatted WhatsApp orders.',
    metrics: [
      { value: '98%', label: 'WhatsApp Message Open Rate' },
      { value: '3.4X', label: 'Higher Response vs Email' },
      { value: '0%', label: 'Marketplace Commission' }
    ],
    keyCapabilities: [
      'Multi-currency product catalog with variant pricing & discounts',
      '1-Click "Order on WhatsApp" with pre-filled itemized cart summary',
      'Real-time inventory availability toggles and SKU management',
      'Direct payment collection via UPI, GPay, PhonePe, or Cashfree'
    ],
    sectorImpacts: [
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Traditional Shopify/Amazon sites have high cart abandonment and charge 2-15% transaction fees.',
        howItHelps: 'Customers browse on mobile and tap "Buy". You receive the exact items, size, and address in your WhatsApp chat to close the sale immediately.',
        roiBenefit: 'Zero marketplace commissions and 3X higher checkout completion.',
        realWorldScenario: 'A boutique owner posts new saree designs. A customer adds 2 sarees to cart and sends the order on WhatsApp, paying instantly via UPI QR.'
      },
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Buyers want exact floor plan pricing without filling out tedious CRM forms.',
        howItHelps: 'List available apartment configurations (2BHK, 3BHK, Villa). Buyers click "Inquire Unit" to start a WhatsApp chat with unit details already specified.',
        roiBenefit: 'Eliminates unqualified inquiries and accelerates sales cycle.',
        realWorldScenario: 'A buyer clicks "Inquire about 3BHK East-Facing Unit" from the OneClickBiz catalog; the agent responds with customized floor plans in 30 seconds.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients want to buy recommended supplements, health checkup packages, or specialized therapies easily.',
        howItHelps: 'Clinics showcase wellness packages and diagnostic tests. Patients order directly on WhatsApp for home sample pickup.',
        roiBenefit: '+30% increase in clinic supplementary revenue.',
        realWorldScenario: 'A dental clinic lists "Teeth Whitening Package" and "Family Dental Checkup" on their WhatsApp store for instant patient booking.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Clients are confused about service scope and pricing for standard legal/financial filings.',
        howItHelps: 'Package standard services (GST Registration, Private Limited Incorporation, Trademark Filing) with fixed prices for instant purchase.',
        roiBenefit: 'Turns advisory conversations into upfront paid service orders.',
        realWorldScenario: 'A CA lists "Company Incorporation Package" at ₹9,999. A startup founder orders via WhatsApp and uploads documents in chat.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Selling fixed-scope design sprints, audit audits, and SEO packages takes weeks of back-and-forth.',
        howItHelps: 'Productize your agency services into ready-to-buy monthly retainers and audits with instant WhatsApp onboarding.',
        roiBenefit: 'Shortens B2B sales cycle from 3 weeks to 24 hours.',
        realWorldScenario: 'An agency lists "Website UI/UX Audit for ₹15,000". A SaaS founder clicks and buys directly through WhatsApp chat.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Selling study material, recorded video courses, and 1-month coaching cohorts manually is exhausting.',
        howItHelps: 'Students select course batches or digital workbooks and complete registration in WhatsApp within 1 minute.',
        roiBenefit: 'Automates student onboarding and fee collection.',
        realWorldScenario: 'A yoga instructor sells "21-Day Morning Flexibility Cohort" directly through WhatsApp with automated confirmation.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Salons lose product sales on hair serums and skin care because customers don\'t know what\'s available.',
        howItHelps: 'Display salon-exclusive beauty kits and gift vouchers that clients can order for home delivery.',
        roiBenefit: '+22% boost in retail product turnover for salons.',
        realWorldScenario: 'A hair salon client loves a styling cream used during their appointment, scans the card, and orders 2 bottles via WhatsApp.'
      }
    ]
  },
  {
    id: 'appointment-booking',
    name: 'Integrated Appointment Booking',
    tagline: 'Self-serve consultation slots with automated calendar & WhatsApp alerts',
    badge: 'Calendar Sync',
    iconName: 'Calendar',
    themeColor: 'purple',
    imageUrl: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    description: 'Allow clients, patients, and prospects to view your real-time availability, select consultation slots, and book meetings directly from your profile—complete with duration, pricing, and automated reminders.',
    metrics: [
      { value: 'Zero', label: 'Scheduling Back-and-Forth' },
      { value: '24/7', label: 'Automated Booking Window' },
      { value: '-65%', label: 'No-Show Reduction' }
    ],
    keyCapabilities: [
      'Custom slot duration (15m, 30m, 60m) with morning/afternoon schedules',
      'Free or paid consultation booking support with upfront pricing',
      'Direct sync with Google Calendar, Outlook, and Apple iCal',
      'Automated WhatsApp booking confirmation to both host and client'
    ],
    sectorImpacts: [
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Reception phone lines are constantly busy, leading to frustrated patients and missed appointments.',
        howItHelps: 'Patients select available 15-minute consultation slots 24/7, receiving instant WhatsApp confirmation and clinic directions.',
        roiBenefit: 'Reduces reception workload by 60% and eliminates double-booking errors.',
        realWorldScenario: 'A patient books a 10:30 AM dental checkup on Sunday night while the clinic is closed, automatically securing their slot.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Wasting 5-10 emails trying to find a mutually convenient time for a client strategy call.',
        howItHelps: 'Share your OneClickBiz link. Clients choose from your open slots; the booking automatically appears in your calendar.',
        roiBenefit: 'Saves 4+ hours per week in administrative scheduling time.',
        realWorldScenario: 'A corporate lawyer sends their link to an overseas client, who books an advisory session in their respective timezone without confusion.'
      },
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Site visit scheduling is chaotic, leading to missed client meetings at construction sites.',
        howItHelps: 'Buyers book dedicated 45-minute site visit slots. Agents receive client contact info and property interests beforehand.',
        roiBenefit: '+45% increase in verified weekend site visits.',
        realWorldScenario: 'A couple books a Saturday 11:00 AM villa site tour directly from the builder\'s digital card, receiving an automated WhatsApp reminder.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Inbound sales leads go cold when they have to wait 24 hours for a sales rep to email back.',
        howItHelps: 'Embed 30-minute discovery call slots directly on your profile. High-intent leads lock in a demo call immediately.',
        roiBenefit: 'Doubles inbound lead demo conversion rate.',
        realWorldScenario: 'A CTO looking for an agency partner visits your profile and immediately books a Monday discovery call.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Students cancel or forget 1-on-1 counseling and tutoring sessions.',
        howItHelps: 'Students select session times and receive automated calendar invites and WhatsApp reminders 2 hours prior.',
        roiBenefit: 'Cuts student no-show rates by over 65%.',
        realWorldScenario: 'A career coach receives 15 booked mentorship sessions weekly through their OneClickBiz booking calendar.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'High-end jewelry and designer bridal boutiques need dedicated 1-on-1 stylist time for clients.',
        howItHelps: 'VIP bridal styling appointments are booked with exclusive time slots, preventing overcrowding in showrooms.',
        roiBenefit: '+50% higher average order value during private bridal styling appointments.',
        realWorldScenario: 'A bride books an exclusive 2-hour bridal lehenga trial on Friday afternoon at a designer studio.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Salon walk-ins face long wait times on weekends, leading to walk-aways.',
        howItHelps: 'Clients book specific stylists for haircuts, spa, and bridal treatments with estimated service durations.',
        roiBenefit: 'Optimizes chair utilization and increases customer retention.',
        realWorldScenario: 'A customer books a Saturday 4 PM hair styling appointment with their favorite senior stylist in 3 clicks.'
      }
    ]
  },
  {
    id: 'brochure-catalog',
    name: 'Brochure & Catalog Studio',
    tagline: 'Multi-page tri-fold, bi-fold & promo flyers with 300 DPI vector PDF export',
    badge: 'Tri-Fold & Flyers',
    iconName: 'BookOpen',
    themeColor: 'sky',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Design multi-page tri-fold flyers, product lookbooks, and rate cards with rich layouts, pricing tables, QR codes, and export print-ready 300 DPI PDFs for commercial printers.',
    metrics: [
      { value: '300 DPI', label: 'Commercial Print Ready' },
      { value: 'Tri-Fold', label: 'Multi-Format Layouts' },
      { value: '₹0', label: 'No Designer Software Needed' }
    ],
    keyCapabilities: [
      'Tri-Fold, Bi-Fold, and A4 single-sheet promotional flyer layouts',
      'Dynamic QR code integration on print materials linking to digital profiles',
      'High-resolution imagery support with crop, aspect ratio, and typography tools',
      'One-click commercial print PDF download with bleed margins'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Hiring design agencies for every new project brochure costs ₹25,000+ and takes weeks.',
        howItHelps: 'Create professional tri-fold project brochures with floor plans, amenities, and dynamic QR in 10 minutes.',
        roiBenefit: 'Saves ₹1,00,000+ annually in graphic design agency fees.',
        realWorldScenario: 'A builder launches a new residential project and exports 500 copies of print-ready A4 brochures for the launch weekend.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients need take-home health awareness leaflets, service pricing, and doctor profiles.',
        howItHelps: 'Print clean medical brochures explaining treatment packages, insurance panels, and clinic timings.',
        roiBenefit: 'Enhances patient education and trust in specialized procedures.',
        realWorldScenario: 'A dental clinic creates a tri-fold flyer on "Invisible Aligners vs Braces" with QR code linking to video explanations.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Printing seasonal product catalogs becomes obsolete within 30 days when prices or stock change.',
        howItHelps: 'Print flyers with dynamic QR codes. Even after printing, updating prices on OneClickBiz instantly reflects on customer phones.',
        roiBenefit: 'Eliminates wasted print runs due to outdated pricing.',
        realWorldScenario: 'A boutique prints 1,000 festive lookbooks with QR codes that link directly to live WhatsApp inventory.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Clients request formal corporate capability decks and practice area summaries.',
        howItHelps: 'Quickly export clean, executive-formatted firm brochures with partner bios, practice areas, and credentials.',
        roiBenefit: 'Projects institutional authority during enterprise vendor empanelment.',
        realWorldScenario: 'An audit firm submits a sleek capability brochure during a corporate vendor pitch.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Parents want printed fee structures, faculty credentials, and success track records.',
        howItHelps: 'Design attractive multi-page admission brochures with top student ranks and scholarship details.',
        roiBenefit: '+40% faster admission decision turnaround from parents.',
        realWorldScenario: 'A coaching institute prints 2,000 admission brochures for distribution at school gates and education expos.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Restaurants and salons need elegant table menus and service rate cards.',
        howItHelps: 'Generate aesthetic tri-fold rate cards with item descriptions, chef specials, and QR codes.',
        roiBenefit: 'Crisp, professional dining and salon presentation.',
        realWorldScenario: 'A luxury spa designs its full massage and facial menu brochure with QR code for advance booking.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Sales teams attending expos need one-sheet solution overviews for booth visitors.',
        howItHelps: 'Create high-impact A4 solution sheets highlighting features, client logos, and case study metrics.',
        roiBenefit: 'Ensures booth visitors leave with professional collateral in hand.',
        realWorldScenario: 'A SaaS team hands out 300 solution overview flyers at a tech expo, driving 85 website visits.'
      }
    ]
  },
  {
    id: 'blog-articles',
    name: 'SEO Blog & Articles Studio',
    tagline: 'Publish keyword-rich articles to rank #1 on Google and establish authority',
    badge: 'SEO Ranked',
    iconName: 'Sparkles',
    themeColor: 'pink',
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    description: 'Write, publish, and distribute SEO-optimized articles, client success stories, and industry guides under your brand. Features automatic JSON-LD schema, social cards, and lightning-fast Google indexing.',
    metrics: [
      { value: 'Google #1', label: 'Local Search Visibility' },
      { value: '100%', label: 'Automatic Schema Markup' },
      { value: 'Zero', label: 'Coding or Hosting Needed' }
    ],
    keyCapabilities: [
      'Rich formatting with headers, blockquotes, tables, and video embeds',
      'Automatic OpenGraph and Twitter card generation for WhatsApp & LinkedIn sharing',
      'Instant indexing with structured schema for Google Article & LocalBusiness',
      'Built-in social sharing to X, WhatsApp, and 1-click clipboard copy'
    ],
    sectorImpacts: [
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients search Google for symptoms and treatments but land on generic advice websites.',
        howItHelps: 'Doctors publish short health guides (e.g. "5 Signs of Root Canal Need in Hyderabad"). Patients discover the doctor via Google and book appointments.',
        roiBenefit: 'Attracts high-intent local patients organically without spending money on Google Ads.',
        realWorldScenario: 'A dermatologist writes an article on "Acne Scar Treatments"; patients reading the article click "Book Consultation" directly.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Clients only hire consultants they perceive as top industry thought leaders.',
        howItHelps: 'Publish timely analysis on tax law updates, GST amendments, and corporate compliance strategies.',
        roiBenefit: 'Positions your firm as the go-to authority, commanding 2-3X higher advisory rates.',
        realWorldScenario: 'A CA writes a breakdown of the new Union Budget tax rules. The article is shared by 50+ business owners on LinkedIn, bringing 6 corporate clients.'
      },
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Buyers hesitate due to lack of clarity on property appreciation and neighborhood infrastructure.',
        howItHelps: 'Publish detailed location analyses (e.g. "Why Gachibowli Property Prices Will Rise 25% by 2027").',
        roiBenefit: 'Educates hesitant buyers and closes real estate transactions faster.',
        realWorldScenario: 'A broker writes an article comparing villa vs apartment investments in North Bengaluru, generating 12 qualified investor leads.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'B2B buyers research case studies and proof of ROI before agreeing to a sales demo.',
        howItHelps: 'Publish detailed client case studies showing "How We Scaled Client Revenue by 310% in 90 Days".',
        roiBenefit: 'Builds undeniable proof that closes high-ticket agency retainers.',
        realWorldScenario: 'A growth agency publishes a teardown of a successful e-commerce campaign; 3 brand founders reach out for consultations.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Students search online for exam preparation strategies and career guidance tips.',
        howItHelps: 'Publish study roadmaps, exam time-management tips, and motivational student success stories.',
        roiBenefit: 'Drives consistent student inquiries year-round without paid ads.',
        realWorldScenario: 'An IELTS coach publishes "How to Score Band 8 in 30 Days", attracting 40+ student course enrollments monthly.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Shoppers need styling tips, fabric care advice, and seasonal fashion trend previews.',
        howItHelps: 'Write lifestyle and fashion trend guides that link directly to featured store products.',
        roiBenefit: 'Converts casual readers into immediate product buyers.',
        realWorldScenario: 'A sustainable clothing brand writes "Top 7 Organic Cotton Styles for Summer", linking items directly to their WhatsApp store.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Tourists and locals look for "Best places for anniversary dinner" or "Top bridal makeup artist".',
        howItHelps: 'Publish event spotlights, signature recipes, and bridal trend guides to capture local search traffic.',
        roiBenefit: 'Dominates organic local foodie and lifestyle search keywords.',
        realWorldScenario: 'A restaurant writes "Top 5 Secret Cocktails to Try in Jubilee Hills", attracting 20+ weekend table reservations.'
      }
    ]
  },
  {
    id: 'vcf-download',
    name: '1-Click Phonebook VCF Save',
    tagline: 'Save full contact, company, photo & WhatsApp to phone address book',
    badge: 'Universal .VCF',
    iconName: 'Download',
    themeColor: 'teal',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80',
    description: 'Allow clients to download your complete contact card (.vcf) with 1 click. Automatically saves your name, phone number, email, designation, company, website, address, and profile photo straight into Apple Contacts and Google Contacts.',
    metrics: [
      { value: '1 Tap', label: 'Instant Contact Save' },
      { value: '100%', label: 'No Typing Required' },
      { value: '94%', label: 'Save Success Rate' }
    ],
    keyCapabilities: [
      'Standard vCard 3.0 / 4.0 universal format for iOS & Android',
      'Includes profile avatar, designation, company, multiple phone numbers & emails',
      'Embedded direct website, WhatsApp, and Google Maps address links',
      'Zero typing mistakes for prospects saving your number'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Prospective buyers forget the agent\'s name and never save their number from WhatsApp.',
        howItHelps: 'Buyers click "Save Contact" once; your name, photo, and company are permanently saved in their phonebook.',
        roiBenefit: 'Ensures your incoming calls display your full name and photo instead of an unknown number.',
        realWorldScenario: 'When the agent calls back 2 days later, the buyer sees "Kishore Patel - Himastech Realty" on their caller ID.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients struggle to find the clinic\'s emergency contact or WhatsApp number when needed urgently.',
        howItHelps: 'Patients save the doctor\'s complete profile to their phonebook with emergency line and clinic address pre-filled.',
        roiBenefit: 'Provides instant peace of mind for patients and families.',
        realWorldScenario: 'A mother saves her pediatrician\'s contact with one tap and can immediately call in case of an emergency.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Corporate clients lose loose business cards and struggle to find your email when filing deadlines approach.',
        howItHelps: 'Client saves your official email, office direct line, and partner designation directly into Microsoft Outlook / Apple Contacts.',
        roiBenefit: 'Keeps your advisory firm at the top of the client\'s phonebook.',
        realWorldScenario: 'A CFO needing urgent tax advice searches "CA" in their phonebook and immediately finds the partner\'s direct number.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Customers forget which boutique they bought their favorite outfit or jewelry from.',
        howItHelps: 'Customers save the boutique\'s official WhatsApp business contact and store address in 1 click.',
        roiBenefit: '+30% higher customer lifetime repeat ordering.',
        realWorldScenario: 'A customer easily messages the boutique 6 months later to order custom matching jewelry.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Meeting 50+ people at conferences leads to zero follow-ups because contact exchange was messy.',
        howItHelps: 'Prospects save your contact on the spot without typing a single digit.',
        roiBenefit: '5X higher response rate to post-event follow-up emails.',
        realWorldScenario: 'At a tech mixer, an agency founder has 25 prospects save their contact in 20 minutes.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Students misplace the mentor\'s contact info or send messages to the wrong number.',
        howItHelps: 'Saves the verified tutor/mentor contact card with official office hours and doubt-clearing WhatsApp link.',
        roiBenefit: 'Streamlines student communication channels.',
        realWorldScenario: 'New batch students save the institute\'s official helpdesk contact on Day 1 of classes.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Guests want to save the restaurant manager or wedding planner\'s direct VIP line.',
        howItHelps: 'Saves direct contact with photo, venue address, and WhatsApp reservation line.',
        roiBenefit: 'Builds long-term VIP customer relationships.',
        realWorldScenario: 'A corporate event organizer saves the hotel banquet manager\'s direct line for future annual retreats.'
      }
    ]
  },
  {
    id: 'dynamic-qr',
    name: 'Dynamic Branded QR Engine',
    tagline: 'High-res vector QR codes with custom logo and editable destination URL',
    badge: 'Dynamic URL',
    iconName: 'QrCode',
    themeColor: 'cyan',
    imageUrl: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=800&q=80',
    description: 'Generate high-resolution PNG & SVG vector QR codes customized with your brand logo, colors, and frame. The destination URL is dynamic—meaning you can update your digital profile anytime without ever reprinting your materials.',
    metrics: [
      { value: '100%', label: 'Vector Resolution (SVG)' },
      { value: 'Dynamic', label: 'Update Link Anytime' },
      { value: 'Custom', label: 'Branded Logo Center' }
    ],
    keyCapabilities: [
      'High-contrast scan reliability even from distant angles and low light',
      'Editable destination URL (never reprint brochures or standees when updating links)',
      'Custom brand logo, color gradient, and branded scan frame ("Scan to Connect")',
      'Vector SVG and 300 DPI high-res PNG export for large banner printing'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Large billboard and site banner QR codes break when projects evolve or websites change.',
        howItHelps: 'Place dynamic QR codes on construction hoardings, brochures, and standees. Redirect the QR code to new tower launches without taking down the hoardings.',
        roiBenefit: 'Saves lakhs of rupees on hoarding and print redesigns.',
        realWorldScenario: 'A builder puts a huge QR on a highway billboard; when Phase 1 sells out, they redirect the QR to Phase 2 instantly from the dashboard.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Storefronts need foot traffic to scan for offers, WhatsApp club, and Google reviews.',
        howItHelps: 'Place branded QR standees at billing counters and display windows. Rotate weekly promotions without reprinting standees.',
        roiBenefit: '+40% growth in VIP WhatsApp customer loyalty club members.',
        realWorldScenario: 'A store places a branded QR at checkout: "Scan to get 10% off your next visit on WhatsApp". 200 shoppers scan weekly.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Patients in clinic waiting rooms want to view doctor credentials, video guides, and emergency numbers.',
        howItHelps: 'Acrylic QR stands in the waiting lounge allow patients to scan and explore health tips, treatment catalogs, and Google review links.',
        roiBenefit: 'Increases 5-star Google reviews by 400% from happy waiting patients.',
        realWorldScenario: 'A patient waiting for their appointment scans the reception standee and leaves a 5-star review on Google Maps.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Physical dining menus get dirty, tear, and cost a fortune to reprint when chef specials change.',
        howItHelps: 'Durable wooden or acrylic table QR blocks connect diners to your interactive digital menu with photos, allergen info, and reviews.',
        roiBenefit: 'Zero menu reprinting costs and instant price adjustments.',
        realWorldScenario: 'A cafe updates its weekend brunch specials online at 8:00 AM; all table QR codes immediately show the new menu.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Conference presentation slides need an easy way for audience members to connect instantly.',
        howItHelps: 'Put your branded QR code on your final presentation slide. 100+ audience members scan simultaneously from their seats.',
        roiBenefit: 'Captures 50+ warm inbound leads per keynote presentation.',
        realWorldScenario: 'A keynote speaker puts their OneClickBiz QR on the big screen; 80 attendees scan to download the presentation slides and book consultations.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Classroom study material needs supplementary video lecture links.',
        howItHelps: 'Print QR codes in physical textbooks and handouts linking students to interactive video lessons and mock test quizzes.',
        roiBenefit: 'Creates an interactive modern blended-learning experience.',
        realWorldScenario: 'A physics teacher prints QR codes on test papers that link to video step-by-step solution walkthroughs.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Expo booth visitors walk past without stopping to speak with a sales rep.',
        howItHelps: 'Large eye-catching QR codes on booth backdrops let visitors scan from 10 feet away to download whitepapers and demo videos.',
        roiBenefit: 'Captures passive foot traffic at busy exhibitions.',
        realWorldScenario: 'At an AI conference, 140 engineers scan the booth banner QR to test the live sandbox demo.'
      }
    ]
  },
  {
    id: 'analytics-insights',
    name: 'Real-Time Event & Lead Analytics',
    tagline: 'Track QR scans, WhatsApp clicks, and visitor locations in real time',
    badge: 'Live Insights',
    iconName: 'TrendingUp',
    themeColor: 'violet',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Get actionable data on who is viewing your brand. Track QR scans vs. profile visits, unique visitors, geographic city locations, WhatsApp inquiry triggers, phone dials, and contact save conversion rates.',
    metrics: [
      { value: 'Real-time', label: 'Instant Event Logging' },
      { value: 'City-Level', label: 'Geo-Location Analytics' },
      { value: 'Funnel', label: 'Click-to-Lead Tracking' }
    ],
    keyCapabilities: [
      'Visual interactive charts showing daily/weekly traffic growth',
      'Track specific button conversion (WhatsApp clicks, call clicks, vCard downloads)',
      'Device breakdown (iOS vs Android vs Desktop) and visitor city insights',
      'Export lead inquiries and analytics reports for sales team reviews'
    ],
    sectorImpacts: [
      {
        sectorId: 'real_estate',
        sectorName: 'Real Estate & Builders',
        sectorIcon: '🏢',
        painPoint: 'Management has no idea which sales agents or outdoor hoardings are generating real buyer leads.',
        howItHelps: 'Track scan metrics per agent and per hoarding. Measure exact WhatsApp inquiries generated from each campaign.',
        roiBenefit: 'Identifies top-performing sales reps and eliminates non-performing ad spend.',
        realWorldScenario: 'A sales director sees that Agent A\'s digital profile generated 48 WhatsApp leads this month compared to 12 from Agent B.'
      },
      {
        sectorId: 'retail',
        sectorName: 'Retail, Boutiques & D2C',
        sectorIcon: '🛍️',
        painPoint: 'Store owners don\'t know how many in-store shoppers visit their online catalog after leaving.',
        howItHelps: 'See hourly scan traffic and product view heatmaps to identify trending products.',
        roiBenefit: 'Informs inventory purchasing decisions based on actual customer interest.',
        realWorldScenario: 'A fashion store notices a 300% spike in views for their silk jacket collection on Friday evening and restocks immediately.'
      },
      {
        sectorId: 'consulting',
        sectorName: 'Consultants, Lawyers & CAs',
        sectorIcon: '💼',
        painPoint: 'Partners cannot measure the ROI of attending expensive industry sponsorship summits.',
        howItHelps: 'Track how many conference attendees viewed the profile, downloaded the vCard, and scheduled follow-up calls.',
        roiBenefit: 'Clear, quantifiable ROI data for annual marketing budget allocation.',
        realWorldScenario: 'A consulting firm tracks 120 profile views and 14 consultation bookings directly attributable to a single trade summit.'
      },
      {
        sectorId: 'healthcare',
        sectorName: 'Doctors & Clinics',
        sectorIcon: '🏥',
        painPoint: 'Clinics cannot track where new patient inquiries originate (Google, standees, or referrals).',
        howItHelps: 'Track appointment booking clicks vs call clicks to optimize clinic staff phone response schedules.',
        roiBenefit: 'Staffs reception desk during peak patient inquiry hours.',
        realWorldScenario: 'Clinic manager discovers that 70% of appointment inquiries occur between 7 PM and 9 PM and enables automated WhatsApp booking.'
      },
      {
        sectorId: 'agency_tech',
        sectorName: 'Tech, SaaS & Agencies',
        sectorIcon: '💻',
        painPoint: 'Marketing teams struggle to calculate client acquisition cost from offline networking.',
        howItHelps: 'Integrate offline QR scans and digital shares directly into lead funnels with conversion event tracking.',
        roiBenefit: 'Connects offline networking to digital CRM pipeline revenue.',
        realWorldScenario: 'An agency attributes a ₹5,00,000 enterprise contract to a digital card share at a networking breakfast.'
      },
      {
        sectorId: 'coaching',
        sectorName: 'Coaches & Institutes',
        sectorIcon: '🎓',
        painPoint: 'Education centers don\'t know which flyer distributions or school visits produce real admissions.',
        howItHelps: 'Assign unique dynamic QR codes to different flyer zones and compare scan-to-enrollment ratios.',
        roiBenefit: 'Optimizes local marketing budget by focusing on high-converting neighborhoods.',
        realWorldScenario: 'An institute finds that flyers distributed in Zone B converted at 18% versus only 2% in Zone A.'
      },
      {
        sectorId: 'hospitality',
        sectorName: 'Salons, Dining & Events',
        sectorIcon: '🍽️',
        painPoint: 'Restaurants have no data on which menu items guests view most before ordering.',
        howItHelps: 'Track digital menu item clicks and peak dining hours to optimize kitchen prep and staff rosters.',
        roiBenefit: 'Reduces food waste and improves service speed.',
        realWorldScenario: 'A restaurant identifies that their mocktails page receives 4X more views than desserts and introduces a happy hour offer.'
      }
    ]
  }
];
