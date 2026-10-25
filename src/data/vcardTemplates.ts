export type VCardCategory = 
  | 'Real Estate'
  | 'Interior Design'
  | 'Fashion & Clothing'
  | 'Beauty & Personal Care'
  | 'Food Business'
  | 'Healthcare'
  | 'Education'
  | 'Home & Professional Services'
  | 'Automobile'
  | 'Events & Creative'
  | 'Professional Services'
  | 'Retail & Local Shops'
  | 'Travel & Hospitality';

export interface VCardTemplateItem {
  id: string;
  templateNumber: number;
  name: string;
  category: VCardCategory;
  subCategory?: string;
  actionSubtitle?: string;
  imgUrl: string;
  homeImgUrl?: string;
  badge?: string;
  isRibbon?: boolean;
  tagline: string;
  features: string[];
}

export const VCARD_CATEGORY_LIST: { id: VCardCategory; name: string; icon: string; count?: number }[] = [
  { id: 'Real Estate', name: 'Real Estate', icon: '🏠' },
  { id: 'Interior Design', name: 'Interior Design', icon: '🛋️' },
  { id: 'Fashion & Clothing', name: 'Fashion & Clothing', icon: '👗' },
  { id: 'Beauty & Personal Care', name: 'Beauty & Personal Care', icon: '💄' },
  { id: 'Food Business', name: 'Food Business', icon: '🍽️' },
  { id: 'Healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'Education', name: 'Education', icon: '🎓' },
  { id: 'Home & Professional Services', name: 'Home & Professional Services', icon: '🛠️' },
  { id: 'Automobile', name: 'Automobile', icon: '🚗' },
  { id: 'Events & Creative', name: 'Events & Creative', icon: '📸' },
  { id: 'Professional Services', name: 'Professional Services', icon: '💼' },
  { id: 'Retail & Local Shops', name: 'Retail & Local Shops', icon: '🛍️' },
  { id: 'Travel & Hospitality', name: 'Travel & Hospitality', icon: '✈️' },
];

export const VCARD_TEMPLATES_CATALOG: VCardTemplateItem[] = [
  {
    "id": "restaurant-menu",
    "templateNumber": 902,
    "name": "Interactive Restaurant & Cafe Digital Dining",
    "category": "Food Business",
    "subCategory": "Fine Dining & Cafes",
    "actionSubtitle": "Table Booking & Menu",
    "imgUrl": "/landing/template_restaurant.png",
    "badge": "Popular",
    "tagline": "Visual photo food menu, 1-tap table reservations & chef specials",
    "features": [
      "Filterable food menu by veg/non-veg",
      "Direct table reservation form",
      "Google Maps dining directions",
      "Chef recommendations showcase"
    ]
  },
  {
    "id": "beauty-salon",
    "templateNumber": 905,
    "name": "Luxury Hair & Beauty Salon",
    "category": "Beauty & Personal Care",
    "subCategory": "Hair & Beauty Salons",
    "actionSubtitle": "Salon Services & Spa",
    "imgUrl": "/landing/template_salon.png",
    "badge": "Luxury Salon",
    "tagline": "Bridal styling, hair care, spa treatments & instant stylist bookings",
    "features": [
      "Salon service menu with pricing",
      "Stylist appointment booking",
      "Before & after transformation gallery",
      "1-Click WhatsApp appointment"
    ]
  },
  {
    "id": "fash-boutique",
    "templateNumber": 904,
    "name": "Grand Fashion & Clothing Mall",
    "category": "Fashion & Clothing",
    "subCategory": "Fashion & Clothing Malls",
    "actionSubtitle": "Designer Collections",
    "imgUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Trending",
    "tagline": "Designer wear, festive collections, WhatsApp catalog & video lookbooks",
    "features": [
      "Seasonal lookbook video reels",
      "WhatsApp product order desk",
      "Customer VIP club discounts",
      "Google review collection prompt"
    ]
  },
  {
    "id": "re-builders",
    "templateNumber": 903,
    "name": "Real Estate Master & High-Rise Developers",
    "category": "Real Estate",
    "subCategory": "Real Estate Developers",
    "actionSubtitle": "High-Rise Sky Villas",
    "imgUrl": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Top Seller",
    "tagline": "Sky-villas, gated communities, RERA verified projects & instant site visit booking",
    "features": [
      "Dynamic project floor plans & pricing",
      "Integrated 3D virtual walkthroughs",
      "1-Click WhatsApp site visit request",
      "Lead generation callback modal"
    ]
  },
  {
    "id": "events-planner",
    "templateNumber": 901,
    "name": "Luxury Events & Wedding Planner",
    "category": "Events & Creative",
    "subCategory": "Wedding & Event Planners",
    "actionSubtitle": "Destination Weddings",
    "imgUrl": "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Featured",
    "tagline": "Destination weddings, floral Mandap decor & corporate summit setups",
    "features": [
      "Event decor package store",
      "Book wedding date consultation",
      "4K video teaser reel",
      "WhatsApp quotation desk"
    ]
  },
  {
    "id": "prof-insurance",
    "templateNumber": 910,
    "name": "Insurance Agents & Policy Advisors",
    "category": "Professional Services",
    "subCategory": "Insurance Agents",
    "actionSubtitle": "Policy & Claims Desk",
    "imgUrl": "/landing/template_insurance.png",
    "badge": "IRDAI Certified",
    "tagline": "Life, health & motor insurance policies, claim settlement assistance & instant premium quotes",
    "features": [
      "Instant Health & Term Insurance Quotes",
      "Direct 1-Click WhatsApp Claim Desk",
      "Policy Comparison & Premium Calculator",
      "Tax Saving (80C / 80D) Advisory"
    ]
  },
  {
    "id": "travel-tour",
    "templateNumber": 912,
    "name": "Tours & Travel Agency",
    "category": "Travel & Hospitality",
    "subCategory": "Travel Agents",
    "actionSubtitle": "Holiday Packages",
    "imgUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Holiday Planner",
    "tagline": "Domestic & international holiday packages, flight bookings & visa assistance",
    "features": [
      "Custom Holiday Package Planner",
      "Direct 1-Click WhatsApp Travel Desk",
      "Visa Guidance & Flight Bookings",
      "Customer Travel Review Highlights"
    ]
  },
  {
    "id": "health-doctor",
    "templateNumber": 906,
    "name": "Doctor & Specialist Clinic",
    "category": "Healthcare",
    "subCategory": "Doctors & Clinics",
    "actionSubtitle": "Consultation Desk",
    "imgUrl": "/landing/template_hospital.png",
    "badge": "Verified Doctor",
    "tagline": "OPD timings, clinic address navigation, credentials & instant booking",
    "features": [
      "1-Tap appointment booking",
      "Google Maps clinic directions",
      "Doctor qualifications & hospital affiliations",
      "Emergency WhatsApp hotline"
    ]
  },
  {
    "id": "home-interior",
    "templateNumber": 907,
    "name": "Interior Designer & Modular Kitchens Mini-Website",
    "category": "Interior Design",
    "subCategory": "Interior Designers",
    "actionSubtitle": "Interior & Kitchens",
    "imgUrl": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Design Studio",
    "tagline": "Turnkey luxury interiors, modular kitchens & 3D space visualizer",
    "features": [
      "Room-by-room portfolio gallery",
      "Instant design consultation form",
      "Direct WhatsApp designer chat",
      "Client testimonial slider"
    ]
  },
  {
    "id": "edu-coaching",
    "templateNumber": 908,
    "name": "Coaching Institute (IIT/NEET/UPSC)",
    "category": "Education",
    "subCategory": "Coaching & Test Prep",
    "actionSubtitle": "IIT / NEET Batches",
    "imgUrl": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Top Faculty",
    "tagline": "Batch schedules, ranker hall of fame, fee charts & demo registrations",
    "features": [
      "Online demo class booking",
      "Course syllabus & fee downloads",
      "Toppers testimonial carousel",
      "Counseling hotline WhatsApp button"
    ]
  },
  {
    "id": "retail-jewellery",
    "templateNumber": 911,
    "name": "Gold & Diamond Jewellery",
    "category": "Retail & Local Shops",
    "subCategory": "Jewellery Stores",
    "actionSubtitle": "Gold & Diamonds",
    "imgUrl": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "916 Hallmarked",
    "tagline": "Gold bridal sets, diamond rings, daily gold rate alerts & video shopping",
    "features": [
      "Daily live gold/silver rate widget",
      "Video call shopping appointment",
      "Hallmark certification trust badge",
      "Custom design inquiry on WhatsApp"
    ]
  },
  {
    "id": "home-electrician",
    "templateNumber": 909,
    "name": "Certified Electrician & Home Services",
    "category": "Home & Professional Services",
    "subCategory": "Electricians",
    "actionSubtitle": "24/7 Electrical Care",
    "imgUrl": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Govt Licensed",
    "tagline": "Emergency wiring, short-circuit repair, MCB install & appliance wiring",
    "features": [
      "24/7 emergency dispatch call button",
      "Fixed rate card for common repairs",
      "WhatsApp photo quotation request",
      "Customer safety & license guarantee"
    ]
  }
];

export const EXTENDED_VCARD_TEMPLATES: VCardTemplateItem[] = [
  {
    "id": "event-photo",
    "templateNumber": 901,
    "name": "Wedding & Fashion Photographer",
    "category": "Events & Creative",
    "subCategory": "Photographers",
    "actionSubtitle": "Book Photo Shoot",
    "imgUrl": "https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Visual Pro",
    "tagline": "Candid wedding shoots, pre-wedding films & luxury portraits",
    "features": [
      "Full-screen photo album",
      "Cinematic trailer video embeds",
      "Session pricing guide",
      "Direct call & WhatsApp"
    ]
  },
  {
    "id": "tech-portfolio",
    "templateNumber": 1001,
    "name": "Full-Stack Software Engineer & Tech Portfolio",
    "category": "Professional Services",
    "subCategory": "Software Developers",
    "actionSubtitle": "Staff Tech Architect",
    "imgUrl": "https://images.unsplash.com/photo-1667655861998-46fe4c29a4cf?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Tech Pro",
    "tagline": "Staff Full-Stack & AI Systems Architect | Next.js, Microservices & LLMs",
    "features": [
      "GitHub 5k+ stars showcase",
      "Resume & tech consultation booking",
      "Downloadable SaaS boilerplate store",
      "1-Click Contact Save"
    ]
  },
  {
    "id": "prof-insurance",
    "templateNumber": 1003,
    "name": "Insurance Advisor & Financial Security",
    "category": "Professional Services",
    "subCategory": "Insurance Agents",
    "actionSubtitle": "Financial Shield",
    "imgUrl": "https://images.unsplash.com/photo-1650110002977-3ee8cc5eac91?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Licensed",
    "tagline": "Term life insurance, health mediclaim & motor policies",
    "features": [
      "Instant premium quote calculator",
      "Claim assistance hotline",
      "Policy comparison charts",
      "WhatsApp instant consult"
    ]
  },
  {
    "id": "restaurant-menu",
    "templateNumber": 401,
    "name": "Interactive Restaurant & Cafe Digital Dining Menu",
    "category": "Food Business",
    "subCategory": "Restaurants & Lounges",
    "actionSubtitle": "Digital Food Menu",
    "imgUrl": "/landing/template_restaurant.png",
    "badge": "Best Seller",
    "tagline": "Hyderabadi dum biryanis, tandoor starters, rooftop cocktails & dessert menu",
    "features": [
      "Interactive digital food menu with photos",
      "Table & candlelight dinner reservation",
      "1-Click WhatsApp table takeaway order",
      "Google review QR scan"
    ]
  },
  {
    "id": "pickles-snacks",
    "templateNumber": 405,
    "name": "Homemade Pickles, Ghee Sweets & Snacks Store",
    "category": "Food Business",
    "subCategory": "Homemade Pickles & Sweets",
    "actionSubtitle": "Andhra Specials",
    "imgUrl": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Authentic Andhra",
    "tagline": "Avakaya, chicken/mutton non-veg pickles, Pootharekulu & hot savory snacks",
    "features": [
      "Complete pickle weight & jar catalog",
      "Direct WhatsApp order with itemized cart",
      "NRI worldwide parcel delivery badge",
      "Instant UPI payment collection"
    ]
  },
  {
    "id": "re-builders",
    "templateNumber": 101,
    "name": "Real Estate Master & High-Rise Developers",
    "category": "Real Estate",
    "subCategory": "High-Rise Towers, Gated Communities & Infra",
    "actionSubtitle": "High-Rise Towers",
    "imgUrl": "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "⭐ Flagship Mini-Website",
    "tagline": "Builders, gated layouts, luxury towers & infrastructure",
    "features": [
      "TS-RERA certified builder & 100% clear title credentials",
      "All property types: Towers, Gated Villas, Plots & IT Parks",
      "Doorstep chauffeur site visit & model inspection booking",
      "Master layout blueprints & 4K aerial drone walkthroughs",
      "Interactive EMI calculator & per-sq-ft estimator",
      "Instant WhatsApp lead router & 1-tap contact save"
    ]
  },
  {
    "id": "re-villas",
    "templateNumber": 103,
    "name": "Luxury Gated Villas & Triplex Communities",
    "category": "Real Estate",
    "subCategory": "Triplex Gated Villas & Clubhouse Estates",
    "actionSubtitle": "Gated Triplex Villas",
    "imgUrl": "https://images.unsplash.com/photo-1722421492323-eaf9c401befe?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Ultra Luxury",
    "tagline": "Triplex gated villas, clubhouse amenities & private plunge pools",
    "features": [
      "4 & 5 BHK Triplex Villas with private plunge pools",
      "Clubhouse amenities: tennis court, spa & banquet hall",
      "100% Vastu compliant architecture & solar power",
      "3D virtual walkthrough & high-res interior lookbook",
      "VIP model villa appointment booking"
    ]
  },
  {
    "id": "re-plots",
    "templateNumber": 102,
    "name": "Open Plots & Farmland Ventures",
    "category": "Real Estate",
    "subCategory": "Plotted Layouts, Farmlands & County",
    "actionSubtitle": "HMDA / DTCP Plots",
    "imgUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "HMDA & DTCP Approved",
    "tagline": "HMDA / DTCP approved open plots, farmlands & county layouts",
    "features": [
      "HMDA, DTCP & TS-RERA approved gated layout communities",
      "100% clear title 30-year link document verification",
      "Organic farmland projects with drip irrigation & fencing",
      "Highway growth corridors (Airport & ORR / RRR junctions)",
      "Free chauffeured weekend site visit booking"
    ]
  },
  {
    "id": "fash-boutique",
    "templateNumber": 201,
    "name": "Grand Fashion & Clothing Mall",
    "category": "Fashion & Clothing",
    "subCategory": "Shopping Malls & Multi-Brand Apparel",
    "actionSubtitle": "Grand Boutique",
    "imgUrl": "https://images.unsplash.com/photo-1654764746225-e63f5e90facd?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Trending",
    "tagline": "Multi-Floor Fashion Mall • Men’s, Women’s & Kids’ Collections",
    "features": [
      "Multi-Level Dept Mall (Men/Women/Kids)",
      "In-Store Trial Rooms & Tailoring",
      "WhatsApp 1-Click Ordering",
      "Express Doorstep Delivery"
    ]
  },
  {
    "id": "fash-saree",
    "templateNumber": 204,
    "name": "Exclusive Saree Shop",
    "category": "Fashion & Clothing",
    "subCategory": "Saree Shops",
    "actionSubtitle": "Pure Silk Sarees",
    "imgUrl": "https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Heritage",
    "tagline": "Kanchipuram, Banarasi, Handloom & Silk Sarees",
    "features": [
      "High-res silk weave photos",
      "Video call shopping link",
      "Festive collections catalog",
      "Silk mark badge"
    ]
  },
  {
    "id": "beauty-salon",
    "templateNumber": 301,
    "name": "Luxury Hair & Beauty Salon",
    "category": "Beauty & Personal Care",
    "subCategory": "Salons",
    "actionSubtitle": "Top Rated Salons",
    "imgUrl": "/landing/template_salon.png",
    "badge": "Hot",
    "tagline": "Unisex hair styling, keratin, spa & grooming",
    "features": [
      "Service rate menu",
      "Online slot booking",
      "Stylist portfolio gallery",
      "Membership discount card"
    ]
  },
  {
    "id": "beauty-bridal",
    "templateNumber": 304,
    "name": "Bridal Makeup Studio",
    "category": "Beauty & Personal Care",
    "subCategory": "Bridal Studios",
    "actionSubtitle": "Royal Brides",
    "imgUrl": "https://images.unsplash.com/photo-1774814305054-3f411d69211a?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Premium",
    "tagline": "Wedding makeover, pre-bridal packages & saree draping",
    "features": [
      "Bridal before/after photos",
      "Trial session scheduler",
      "Wedding entourage packages",
      "Client testimonials"
    ]
  },
  {
    "id": "health-doctor",
    "templateNumber": 501,
    "name": "Doctor & Specialist Clinic",
    "category": "Healthcare",
    "subCategory": "Doctors",
    "actionSubtitle": "Book Now",
    "imgUrl": "/landing/template_hospital.png",
    "badge": "Verified",
    "tagline": "Physicians, pediatricians, cardiologists & surgeons",
    "features": [
      "OPD consulting hours",
      "Online appointment booking",
      "Medical council registration",
      "Emergency dialer"
    ]
  },
  {
    "id": "health-dental",
    "templateNumber": 502,
    "name": "Dental Care & Implant Clinic",
    "category": "Healthcare",
    "subCategory": "Dental Clinics",
    "actionSubtitle": "Dental Implants",
    "imgUrl": "https://images.unsplash.com/photo-1681939278218-a755fb2bf2d3?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Root canals, aligners, teeth whitening & smile design",
    "features": [
      "Dental treatment list",
      "Before/after smile transformations",
      "Direct consultation booking",
      "Painless dentistry badge"
    ]
  },
  {
    "id": "edu-school",
    "templateNumber": 601,
    "name": "School & International Academy",
    "category": "Education",
    "subCategory": "Schools",
    "actionSubtitle": "Admissions Open",
    "imgUrl": "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Academy",
    "tagline": "K-12 schools, play schools & international academies",
    "features": [
      "Admissions inquiry form",
      "School prospectus PDF",
      "Campus virtual tour",
      "Academic calendar"
    ]
  },
  {
    "id": "edu-coaching",
    "templateNumber": 603,
    "name": "Coaching Institute (IIT/NEET/UPSC)",
    "category": "Education",
    "subCategory": "Coaching Institutes",
    "actionSubtitle": "IIT / NEET Rankers",
    "imgUrl": "https://images.unsplash.com/photo-1709290749293-c6152a187b14?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Results",
    "tagline": "Competitive exam prep, study materials & mock tests",
    "features": [
      "Rankers hall of fame",
      "Scholarship admission test form",
      "Free study notes download",
      "Faculty profile cards"
    ]
  },
  {
    "id": "home-interior",
    "templateNumber": 701,
    "name": "Interior Designer & Modular Kitchens Mini-Website",
    "category": "Interior Design",
    "subCategory": "Interior Designers & Architects",
    "actionSubtitle": "Modular Kitchens",
    "imgUrl": "https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "⭐ Flagship 3D Studio",
    "tagline": "Turnkey residential interiors, modular homes & offices with 3D Lookbook",
    "features": [
      "Interactive 3D Lookbook and space transformations",
      "Living & dining, modular kitchen, and master suite galleries",
      "Dynamic interior cost estimator & instant BOQ quote",
      "IIID certified designer credentials & 10-year warranty guarantee",
      "Before & After interactive split slider",
      "Doorstep 3D consultation appointment booking"
    ]
  },
  {
    "id": "home-architect",
    "templateNumber": 702,
    "name": "Architect & Structural Engineer",
    "category": "Interior Design",
    "subCategory": "Architects & Blueprints",
    "actionSubtitle": "Architecture & 3D",
    "imgUrl": "https://images.unsplash.com/photo-1783456309503-6d0bb120bb9c?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Modern house elevations, blueprints & municipal sanctions",
    "features": [
      "Blueprint portfolio gallery",
      "Site inspection booking",
      "Sustainable architecture designs",
      "Client reviews"
    ]
  },
  {
    "id": "home-services",
    "templateNumber": 700,
    "name": "OneClick Home Services (Hyderabad)",
    "category": "Home & Professional Services",
    "subCategory": "Home Cleaning & Repairs",
    "actionSubtitle": "Book Rapid Service",
    "imgUrl": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Full home deep cleaning, sofa shampooing, painting, pest & electrician",
    "features": [
      "60-minute doorstep arrival",
      "German single-disc scrubbers",
      "Transparent upfront pricing",
      "30-day rework guarantee"
    ]
  },
  {
    "id": "home-electrician",
    "templateNumber": 704,
    "name": "Certified Electrician",
    "category": "Home & Professional Services",
    "subCategory": "Electricians",
    "actionSubtitle": "Get Nearest Vendor",
    "imgUrl": "https://images.unsplash.com/photo-1641194298727-fa6e5401bf1b?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Home wiring, inverter setups, smart switches & MCB repairs",
    "features": [
      "Instant technician call",
      "Electrical safety audit",
      "Pricing by job type",
      "Google verified badge"
    ]
  },
  {
    "id": "home-plumber",
    "templateNumber": 703,
    "name": "Plumbing Services",
    "category": "Home & Professional Services",
    "subCategory": "Plumbers",
    "actionSubtitle": "24/7 Plumber",
    "imgUrl": "https://images.unsplash.com/photo-1659353588842-891391e6fcd4?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Emergency pipe leaks, bathroom fittings & motor repair",
    "features": [
      "1-Tap emergency phone dialer",
      "Transparent rate card",
      "30-minute door arrival",
      "Service warranty"
    ]
  },
  {
    "id": "auto-car-dealer",
    "templateNumber": 801,
    "name": "Car Dealer & Showroom",
    "category": "Automobile",
    "subCategory": "Car Dealers",
    "actionSubtitle": "Best Car Deals",
    "imgUrl": "https://images.unsplash.com/photo-1769961236211-3046cbcc474d?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Showroom",
    "tagline": "New cars, latest models, test drives & finance options",
    "features": [
      "Car model catalogue with specs",
      "Book test drive form",
      "Loan EMI calculator",
      "Exchange bonus deals"
    ]
  },
  {
    "id": "auto-bike-dealer",
    "templateNumber": 803,
    "name": "Bike & Superbike Dealer",
    "category": "Automobile",
    "subCategory": "Bike Dealers",
    "actionSubtitle": "Superbikes & Scooters",
    "imgUrl": "https://images.unsplash.com/photo-1530248809527-ee069dc8373a?auto=format&fit=crop&w=800&h=1000&q=85",
    "tagline": "Sports bikes, commuter motorcycles & electric scooters",
    "features": [
      "Bike models & on-road prices",
      "Test ride booking",
      "Accessories & riding gear catalog",
      "Insurance renewals"
    ]
  },
  {
    "id": "retail-jewellery",
    "templateNumber": 1104,
    "name": "Gold & Diamond Jewellery",
    "category": "Retail & Local Shops",
    "subCategory": "Jewellery",
    "actionSubtitle": "Gold & Diamonds",
    "imgUrl": "https://images.unsplash.com/photo-1640183298005-3a4497cc6a37?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Luxury",
    "tagline": "BIS hallmarked 916 gold, diamond necklaces & silver gifts",
    "features": [
      "Bridal jewelry catalog",
      "Daily gold rate widget",
      "Monthly gold saving scheme",
      "Hallmark certified badge"
    ]
  },
  {
    "id": "retail-mobile",
    "templateNumber": 1101,
    "name": "Mobile Phone & Gadget Store",
    "category": "Retail & Local Shops",
    "subCategory": "Mobile Shops",
    "actionSubtitle": "Mobiles & Gadgets",
    "imgUrl": "https://images.unsplash.com/photo-1780504862873-5f4ff5c322e9?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Gadgets",
    "tagline": "Smartphones, iPhones, 0% EMI offers & express repairs",
    "features": [
      "Latest smartphone price list",
      "0% EMI scheme eligibility",
      "Screen repair quote chat",
      "Store location map"
    ]
  },
  {
    "id": "travel-tour",
    "templateNumber": 1202,
    "name": "SwiftVoyage Bus Booking & Luxury AC Sleepers",
    "category": "Travel & Hospitality",
    "subCategory": "Tour Operators",
    "actionSubtitle": "Bus Tickets & Luxury AC Sleepers",
    "imgUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Hot Deal",
    "tagline": "Intercity bus tickets, Volvo Multi-Axle sleeper seats & live GPS tracking",
    "features": [
      "Tour itinerary PDF downloads",
      "Book holiday package slot",
      "Customer travel photos",
      "Direct WhatsApp pricing"
    ]
  },
  {
    "id": "travel-hotel",
    "templateNumber": 1203,
    "name": "Luxury Hotel & Banquet Suites",
    "category": "Travel & Hospitality",
    "subCategory": "Hotels",
    "actionSubtitle": "5-Star Suites",
    "imgUrl": "https://images.unsplash.com/photo-1661924326425-c14a6426d989?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "5-Star",
    "tagline": "Deluxe rooms, swimming pool, banquet halls & fine dining",
    "features": [
      "Room tariff & booking",
      "Banquet hall for weddings",
      "Virtual room walkthrough",
      "Airport pickup booking"
    ]
  },
  {
    "id": "bus-booking",
    "templateNumber": 1204,
    "name": "SwiftVoyage Bus Booking & Luxury AC Sleepers",
    "category": "Travel & Hospitality",
    "subCategory": "Bus Booking & Transport",
    "actionSubtitle": "Bus Tickets & Sleepers",
    "imgUrl": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&h=1000&q=85",
    "badge": "Lowest Fare",
    "tagline": "Intercity bus tickets, Volvo Multi-Axle sleeper seats & GPS tracking",
    "features": [
      "Live seat selection layout",
      "Instant paperless WhatsApp M-Ticket",
      "YouTube cabin tours & Instagram reels",
      "Live bus GPS tracking & zero cancellation"
    ]
  }
];

export const ALL_VCARD_TEMPLATES: VCardTemplateItem[] = [
  ...VCARD_TEMPLATES_CATALOG,
  ...EXTENDED_VCARD_TEMPLATES
];

export function normalizeCategory(cat?: string | null, templateId?: string | null): VCardCategory {
  if (!cat && templateId) {
    const found = ALL_VCARD_TEMPLATES.find(t => t.id === templateId);
    if (found) return found.category;
    if (templateId.startsWith('re-') || templateId === 'vcard35') return 'Real Estate';
    if (templateId.startsWith('home-interior') || templateId.startsWith('interior') || templateId === 'vcard38') return 'Interior Design';
  }
  const c = (cat || '').toLowerCase().trim();
  if (c.includes('real estate') || c.includes('builder') || c.includes('realty') || c.includes('developer') || c.includes('plots') || c.includes('villas')) {
    return 'Real Estate';
  }
  if (c.includes('interior') || c.includes('architect') || c.includes('decor')) {
    return 'Interior Design';
  }
  if (c.includes('health') || c.includes('doctor') || c.includes('clinic') || c.includes('hospital') || c.includes('dental') || c.includes('opd') || c.includes('physio')) {
    return 'Healthcare';
  }
  if (c.includes('food') || c.includes('restaurant') || c.includes('cafe') || c.includes('bakery') || c.includes('dining') || c.includes('pickle')) {
    return 'Food Business';
  }
  if (c.includes('fashion') || c.includes('clothing') || c.includes('boutique') || c.includes('saree') || c.includes('apparel')) {
    return 'Fashion & Clothing';
  }
  if (c.includes('beauty') || c.includes('salon') || c.includes('spa') || c.includes('parlour') || c.includes('makeup') || c.includes('fitness') || c.includes('gym')) {
    return 'Beauty & Personal Care';
  }
  if (c.includes('auto') || c.includes('car') || c.includes('garage') || c.includes('bike') || c.includes('vehicle')) {
    return 'Automobile';
  }
  if (c.includes('educat') || c.includes('coaching') || c.includes('academy') || c.includes('school') || c.includes('tutor')) {
    return 'Education';
  }
  if (c.includes('event') || c.includes('wedding') || c.includes('photo') || c.includes('dj') || c.includes('creative') || c.includes('floral')) {
    return 'Events & Creative';
  }
  if (c.includes('retail') || c.includes('shop') || c.includes('store') || c.includes('grocery') || c.includes('jewelry') || c.includes('mobile')) {
    return 'Retail & Local Shops';
  }
  if (c.includes('travel') || c.includes('tour') || c.includes('hotel') || c.includes('resort') || c.includes('hospitality') || c.includes('cab')) {
    return 'Travel & Hospitality';
  }
  if (c.includes('home') || c.includes('plumb') || c.includes('electric') || c.includes('repair') || c.includes('ac ') || c.includes('pest')) {
    return 'Home & Professional Services';
  }
  if (c.includes('prof') || c.includes('legal') || c.includes('law') || c.includes('ca') || c.includes('tax') || c.includes('tech') || c.includes('consult') || c.includes('executive')) {
    return 'Professional Services';
  }

  // Exact match with VCardCategory
  const exact = VCARD_CATEGORY_LIST.find(k => k.id.toLowerCase() === c || k.name.toLowerCase() === c);
  if (exact) return exact.id;

  return 'Professional Services';
}

export function isTemplateAllowedForCategory(templateId: string, category: string): boolean {
  const normCat = normalizeCategory(category, templateId);
  const tpl = ALL_VCARD_TEMPLATES.find(t => t.id === templateId);

  if (tpl) {
    if (normCat === 'Real Estate') {
      return tpl.category === 'Real Estate' || tpl.id.startsWith('re-') || tpl.id === 'vcard35';
    }
    if (normCat === 'Interior Design') {
      return tpl.category === 'Interior Design' || tpl.id === 'home-interior' || tpl.id === 'home-architect' || tpl.id === 'vcard38';
    }
    return tpl.category === normCat;
  }

  // Fallbacks for IDs that may not be in catalog
  if (normCat === 'Real Estate') return templateId.startsWith('re-') || templateId === 'vcard35';
  if (normCat === 'Interior Design') return templateId.startsWith('interior') || templateId.startsWith('home-interior') || templateId === 'vcard38';
  if (normCat === 'Healthcare') return templateId.startsWith('health-') || templateId === 'vcard36' || templateId === 'vcard13';
  if (normCat === 'Food Business') return templateId.startsWith('food-') || templateId.includes('restaurant') || templateId.includes('pickle');
  if (normCat === 'Fashion & Clothing') return templateId.startsWith('fash-');
  if (normCat === 'Beauty & Personal Care') return templateId.startsWith('beauty-') || templateId === 'vcard12';
  if (normCat === 'Automobile') return templateId.startsWith('auto-');
  if (normCat === 'Education') return templateId.startsWith('edu-') || templateId === 'vcard44';
  if (normCat === 'Events & Creative') return templateId.startsWith('event-') || templateId.startsWith('events-') || templateId === 'vcard34' || templateId === 'vcard37';
  if (normCat === 'Professional Services') return templateId.startsWith('prof-') || templateId.startsWith('tech-') || templateId === 'vcard16' || templateId === 'vcard39' || templateId === 'vcard40' || templateId === 'vcard43';
  if (normCat === 'Retail & Local Shops') return templateId.startsWith('ret-') || templateId.startsWith('retail-') || templateId === 'vcard41';
  if (normCat === 'Home & Professional Services') return templateId.startsWith('home-') || templateId === 'vcard42';
  if (normCat === 'Travel & Hospitality') return templateId.startsWith('trav-') || templateId.startsWith('travel-');

  return false;
}

export interface CategoryLockInfo {
  label: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  bannerGradient: string;
  description: string;
}

export const CATEGORY_LOCK_CONFIG: Record<VCardCategory, CategoryLockInfo> = {
  'Real Estate': {
    label: 'Real Estate & Infrastructure Suite',
    icon: '🏰',
    badgeBg: 'bg-amber-500/20',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-300',
    bannerGradient: 'from-amber-500/10 via-amber-600/10 to-orange-500/10',
    description: 'Your business entity is registered under Real Estate & Builders. The template library is curated exclusively to verified Real Estate templates (Builders, Gated Plots, Triplex Villas, Realtors, and Commercial Assets) to safeguard your TS-RERA credentials, floor plans, and layout integrity.'
  },
  'Interior Design': {
    label: 'Interior Design & 3D Architecture Suite',
    icon: '🛋️',
    badgeBg: 'bg-amber-500/20',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-300',
    bannerGradient: 'from-amber-600/10 via-yellow-600/10 to-amber-600/5',
    description: 'Your business entity is registered under Interior Design & Architecture. The template library is curated exclusively to verified Interior Design & 3D Architecture studios (3D Lookbooks, Modular Kitchens, Turnkey Fitouts, and Blueprints) to maintain your IIID credentials and project lookbooks.'
  },
  'Healthcare': {
    label: 'Healthcare & Clinical Practice Suite',
    icon: '🏥',
    badgeBg: 'bg-emerald-500/20',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-300',
    bannerGradient: 'from-emerald-500/10 via-teal-500/10 to-emerald-500/5',
    description: 'Your business entity is registered under Healthcare & Doctors. The template library is curated exclusively to verified Healthcare suites (Physicians, OPD Clinics, Dentists, Diagnostics & Hospitals) to preserve your consultation timings and medical credentials.'
  },
  'Food Business': {
    label: 'Food Business, Dining & Restaurant Suite',
    icon: '🍽️',
    badgeBg: 'bg-rose-500/20',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-300',
    bannerGradient: 'from-rose-500/10 via-pink-500/10 to-rose-500/5',
    description: 'Your business entity is registered under Food Business & Dining. The template library is curated exclusively to Food & Restaurant suites (Digital Menus, Cloud Kitchens, Bakeries, Pickles & Takeaway) to preserve your dining menu items and WhatsApp ordering cart.'
  },
  'Fashion & Clothing': {
    label: 'Fashion, Boutiques & Apparel Suite',
    icon: '👗',
    badgeBg: 'bg-pink-500/20',
    badgeBorder: 'border-pink-500/30',
    badgeText: 'text-pink-300',
    bannerGradient: 'from-pink-500/10 via-purple-500/10 to-pink-500/5',
    description: 'Your business entity is registered under Fashion & Clothing. The template library is curated exclusively to Fashion suites (Designer Boutiques, Ladies Wear, Men\'s Bespoke Suits, Saree Shops, and D2C Apparel) to preserve your apparel catalog and lookbook.'
  },
  'Beauty & Personal Care': {
    label: 'Beauty, Salons & Wellness Suite',
    icon: '💄',
    badgeBg: 'bg-purple-500/20',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-300',
    bannerGradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/5',
    description: 'Your business entity is registered under Beauty & Personal Care. The template library is curated exclusively to Beauty & Salon suites (Luxury Salons, Spas, Bridal Studios, and Skin Clinics) to safeguard your appointment menu and makeover galleries.'
  },
  'Education': {
    label: 'Education, Academies & Coaching Suite',
    icon: '🎓',
    badgeBg: 'bg-violet-500/20',
    badgeBorder: 'border-violet-500/30',
    badgeText: 'text-violet-300',
    bannerGradient: 'from-violet-500/10 via-purple-500/10 to-violet-500/5',
    description: 'Your business entity is registered under Education. The template library is curated exclusively to Education suites (Coaching Institutes, Tutors, Academies, and Music Schools) to protect your course curriculum and demo admission desk.'
  },
  'Automobile': {
    label: 'Automobile, Dealerships & Garages Suite',
    icon: '🚗',
    badgeBg: 'bg-sky-500/20',
    badgeBorder: 'border-sky-500/30',
    badgeText: 'text-sky-300',
    bannerGradient: 'from-sky-500/10 via-blue-500/10 to-sky-500/5',
    description: 'Your business entity is registered under Automobile. The template library is curated exclusively to Automobile suites (Car Dealerships, Bike Showrooms, Garages, Detailing Studios & EV Outlets) to preserve your vehicle inventory and booking forms.'
  },
  'Events & Creative': {
    label: 'Events, Photography & Studios Suite',
    icon: '📸',
    badgeBg: 'bg-indigo-500/20',
    badgeBorder: 'border-indigo-500/30',
    badgeText: 'text-indigo-300',
    bannerGradient: 'from-indigo-500/10 via-purple-500/10 to-indigo-500/5',
    description: 'Your business entity is registered under Events & Creative. The template library is curated exclusively to Events suites (Wedding Planners, Photographers, Cinematographers, and Decorators) to protect your photo reels and date booking calendar.'
  },
  'Professional Services': {
    label: 'Professional Services, Legal & Finance Suite',
    icon: '💼',
    badgeBg: 'bg-blue-500/20',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-300',
    bannerGradient: 'from-blue-500/10 via-indigo-500/10 to-blue-500/5',
    description: 'Your business entity is registered under Professional Services. The template library is curated exclusively to Professional suites (Legal Advocates, Chartered Accountants, IT/SaaS Labs, and Corporate Executives) to protect your practice areas and retainers.'
  },
  'Retail & Local Shops': {
    label: 'Retail, Local Shops & Stores Suite',
    icon: '🛍️',
    badgeBg: 'bg-emerald-500/20',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-300',
    bannerGradient: 'from-emerald-500/10 via-teal-500/10 to-emerald-500/5',
    description: 'Your business entity is registered under Retail & Local Shops. The template library is curated exclusively to Retail suites (Electronics, Jewelry, Supermarkets, and Local Stores) to safeguard your product pricing and WhatsApp store cart.'
  },
  'Home & Professional Services': {
    label: 'Home & Technical Services Suite',
    icon: '🛠️',
    badgeBg: 'bg-cyan-500/20',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-300',
    bannerGradient: 'from-cyan-500/10 via-sky-500/10 to-cyan-500/5',
    description: 'Your business entity is registered under Home & Technical Services. The template library is curated exclusively to Home Service suites (Plumbing, Electrical, AC Maintenance & Pest Control) to preserve your emergency rate cards and response guarantees.'
  },
  'Travel & Hospitality': {
    label: 'Travel, Hospitality & Tourism Suite',
    icon: '✈️',
    badgeBg: 'bg-teal-500/20',
    badgeBorder: 'border-teal-500/30',
    badgeText: 'text-teal-300',
    bannerGradient: 'from-teal-500/10 via-emerald-500/10 to-teal-500/5',
    description: 'Your business entity is registered under Travel & Hospitality. The template library is curated exclusively to Travel suites (Tour Operators, Hotels, Resorts, Homestays & Cab Services) to safeguard your holiday itinerary and travel bookings.'
  }
};

export interface QuickPresetItem {
  id: string;
  title: string;
  icon: string;
  slug: string;
  name: string;
  company: string;
  desig: string;
}

export const CATEGORY_QUICK_PRESETS: Record<VCardCategory, QuickPresetItem[]> = {
  'Real Estate': [
    { id: 're-builders', title: 'High-Rise & Gated Towers', icon: '🏢', slug: 'builders', name: 'Vikramaditya Roy', company: 'Skyline Landmark Developers', desig: 'Managing Director & Builder' },
    { id: 're-plots', title: 'Open Plots & Farmlands', icon: '🏞️', slug: 'plots', name: 'Srikanth Reddy', company: 'Reddy Lands & County Infrastructure', desig: 'Managing Partner' },
    { id: 're-villas', title: 'Luxury Gated Villas', icon: '🏡', slug: 'villas', name: 'Kishore Varma', company: 'Grandeur Villa Communities', desig: 'Founding Partner' },
    { id: 're-agents', title: 'Realtor & Property Advisor', icon: '🤝', slug: 'realtor', name: 'Rajesh Varma', company: 'Varma Prime Realty Advisory', desig: 'Senior Real Estate Consultant' },
    { id: 're-consultants', title: 'Commercial & Pre-Leased', icon: '🏦', slug: 'commercial', name: 'Anand Rao', company: 'Commercial Realty Capital', desig: 'Commercial Asset Director' },
    { id: 'vcard35', title: 'Prime Property Broker', icon: '🏷️', slug: 'broker', name: 'David Sterling', company: 'Sterling Global Estates', desig: 'Principal Property Broker' },
  ],
  'Interior Design': [
    { id: 'home-interior', title: 'Interior Design & 3D Studio', icon: '🛋️', slug: 'interior-studio', name: 'Ar. Ananya Sen', company: 'Luxe Living Interiors & Architecture', desig: 'Principal Architect & Founder' },
    { id: 'home-architect', title: 'Architect & Blueprints', icon: '📐', slug: 'architect', name: 'Ar. Rajesh Nambiar', company: 'Nambiar & Associates Architects', desig: 'Chief Structural Architect' },
    { id: 'vcard38', title: 'Luxury Fitouts & 3D Renderings', icon: '🏛️', slug: 'vance-design', name: 'Marcus Vance', company: 'Vance Architecture & Interiors', desig: 'Principal Interior Architect' },
  ],
  'Healthcare': [
    { id: 'vcard36', title: 'Doctor & Orthopedic Surgeon', icon: '🩺', slug: 'dr-specialist', name: 'Dr. Alistair Chen', company: 'Apex Orthopedic & Joint Center', desig: 'Chief Consultant Orthopedic Surgeon' },
    { id: 'vcard13', title: 'Multi-Specialty OPD Clinic', icon: '🏥', slug: 'clinic-opd', name: 'Dr. Priya Sharma', company: 'Apex Medical Center', desig: 'Medical Director & Physician' },
    { id: 'health-dental', title: 'Dental Care & Implants', icon: '🦷', slug: 'dental-care', name: 'Dr. Rohan Mehra', company: 'SmileCraft Dental Studio', desig: 'Chief Implantologist & Cosmetic Dentist' },
    { id: 'health-physio', title: 'Physiotherapy & Rehab', icon: '🏃', slug: 'physio-rehab', name: 'Dr. Kavita Nair', company: 'Optima Health Physiotherapy', desig: 'Senior Sports Rehab Specialist' },
  ],
  'Food Business': [
    { id: 'restaurant-menu', title: 'Dining Restaurant & Bar', icon: '🍽️', slug: 'dining-menu', name: 'Chef Sanjeev Roy', company: 'Saffron Courtyard Restaurant', desig: 'Executive Chef & Partner' },
    { id: 'food-biryani', title: 'Royal Biryani & Mughlai', icon: '🔥', slug: 'royal-biryani', name: 'Nawabzada Imran', company: 'Dastarkhwan Biryani Darbar', desig: 'Head Khansama & Master Chef' },
    { id: 'food-cafe', title: 'Artisan Cafe & Bakery', icon: '☕', slug: 'artisan-cafe', name: 'Rohan Deshmukh', company: 'The Roasted Bean Cafe', desig: 'Head Roaster & Co-Founder' },
    { id: 'food-pub', title: 'Rooftop Brewery & Lounge', icon: '🍸', slug: 'rooftop-lounge', name: 'Varun Singhal', company: 'Skyline Craft Brewery & Lounge', desig: 'Managing Director & Mixologist' },
    { id: 'food-dhaba', title: 'Highway Punjabi Dhaba', icon: '🫓', slug: 'highway-dhaba', name: 'Sardar Manjit Singh', company: 'Sher-e-Punjab Highway Dhaba', desig: 'Proprietor & Master Cook' },
    { id: 'food-southindian', title: 'Pure Veg Tiffin Room', icon: '🟢', slug: 'pure-veg-tiffin', name: 'K. S. Ramanathan', company: 'Sri Krishna Vilas Tiffin Room', desig: 'Managing Partner' },
    { id: 'pickles-snacks', title: 'Homemade Sweets & Pickles', icon: '🍯', slug: 'traditional-foods', name: 'Lakshmi Devi', company: 'Amma Gari Sweets & Pickles', desig: 'Founder & Master Cook' },
    { id: 'food-cloud', title: 'Cloud Kitchen & Delivery', icon: '🥡', slug: 'cloud-kitchen', name: 'Aditya Kapoor', company: 'Biryani Central Cloud Kitchens', desig: 'Operations Director' },
  ],
  'Fashion & Clothing': [
    { id: 'fash-boutique', title: 'Designer Boutique', icon: '👗', slug: 'designer-boutique', name: 'Ritu Varma', company: 'Ritu Varma Couture Studio', desig: 'Fashion Designer & Creative Director' },
    { id: 'fash-mens', title: "Men's Bespoke Suits", icon: '👔', slug: 'bespoke-suits', name: 'Farhan Merchant', company: 'The Master Tailor & Sartorial', desig: 'Master Tailor & Stylist' },
    { id: 'fash-saree', title: 'Heritage Silk & Sarees', icon: '🥻', slug: 'silk-sarees', name: 'Sujatha Reddy', company: 'Kanchi Heritage Silks', desig: 'Managing Partner' },
    { id: 'fash-online', title: 'D2C Apparel & Streetwear', icon: '🛍️', slug: 'apparel-store', name: 'Karan Singhania', company: 'Urban Threadz Apparel', desig: 'Brand Director' },
  ],
  'Beauty & Personal Care': [
    { id: 'beauty-salon', title: 'Luxury Hair & Beauty Salon', icon: '💇', slug: 'luxury-salon', name: 'Zara Khan', company: 'Glamour Lounge Luxury Salon', desig: 'Creative Hair Director' },
    { id: 'beauty-makeup', title: 'Bridal Makeover Studio', icon: '💄', slug: 'bridal-makeover', name: 'Simran Chadha', company: 'Simran Makeovers Studio', desig: 'Celebrity Bridal Artist' },
    { id: 'beauty-spa', title: 'Wellness Spa & Aromatherapy', icon: '🧖', slug: 'wellness-spa', name: 'Maya Pillai', company: 'Serenity Ayurvedic Spa', desig: 'Spa Director' },
    { id: 'vcard12', title: 'Fitness Coach & Gym', icon: '🏋️', slug: 'fitness-coach', name: 'Alex Thorne', company: 'IronPeak Performance', desig: 'Elite Strength & Conditioning Coach' },
  ],
  'Education': [
    { id: 'edu-coaching', title: 'IIT-JEE & NEET Coaching', icon: '📚', slug: 'iit-coaching', name: 'Prof. S. K. Gupta', company: 'Gupta Career Academies', desig: 'Academic Director' },
    { id: 'edu-tutor', title: 'Private Home & Online Tutor', icon: '👨‍🏫', slug: 'private-tutor', name: 'Pooja Iyer', company: 'Excel Home Tutoring', desig: 'Senior Educator & Mentor' },
    { id: 'edu-music', title: 'Music & Fine Arts Academy', icon: '🎵', slug: 'music-academy', name: 'Maestro Arvind Das', company: 'Saptak Academy of Performing Arts', desig: 'Founder & Principal' },
    { id: 'edu-school', title: 'Preparatory School & Daycare', icon: '🎓', slug: 'prep-school', name: 'Meera Chawla', company: 'Little Wonders International School', desig: 'Headmistress' },
  ],
  'Automobile': [
    { id: 'auto-cardeal', title: 'Certified Pre-Owned Cars', icon: '🚗', slug: 'car-dealership', name: 'Naveen Choudhary', company: 'Prime Auto Wheels Dealership', desig: 'Managing Director' },
    { id: 'auto-bikedeal', title: 'Two-Wheeler Showroom', icon: '🏍️', slug: 'bike-showroom', name: 'Sunil Rao', company: 'Speedway Motors & Superbikes', desig: 'Sales Head' },
    { id: 'auto-garage', title: 'Multi-Brand Auto Garage', icon: '🔧', slug: 'car-service', name: 'Gopal Singh', company: 'Apex Car Care & German Auto Clinic', desig: 'Master Automobile Engineer' },
    { id: 'auto-detailing', title: 'Ceramic Detailing Studio', icon: '✨', slug: 'car-detailing', name: 'Rahul Bajaj', company: 'Obsidian Car Detailing Studio', desig: 'Certified Detailer' },
  ],
  'Events & Creative': [
    { id: 'events-planner', title: 'Luxury Wedding Planner', icon: '💍', slug: 'wedding-planner', name: 'Megha Goel', company: 'The Royal Knot Wedding Planners', desig: 'Founder & Creative Lead' },
    { id: 'vcard34', title: 'Visual Studio & Cinema', icon: '📸', slug: 'photography-studio', name: 'Aarav Mehta', company: 'Lumière Visual Studio', desig: 'Lead Photographer & Cinematographer' },
    { id: 'vcard37', title: 'Luxury Floral & Decor Studio', icon: '🌸', slug: 'floral-decor', name: 'Bella Fiore', company: 'Bella Flora Luxury Studio', desig: 'Botanical Designer' },
    { id: 'events-dj', title: 'DJ & Sound Production', icon: '🎧', slug: 'dj-music', name: 'DJ Dev', company: 'SonicVibe Sound & Light Shows', desig: 'Music Producer & Club DJ' },
  ],
  'Professional Services': [
    { id: 'vcard16', title: 'High Court Legal Advocate', icon: '⚖️', slug: 'legal-counsel', name: 'Harrison Reed', company: 'Reed & Chambers Law Firm', desig: 'Corporate Legal Advocate' },
    { id: 'prof-ca', title: 'Chartered Accountant & Tax', icon: '📊', slug: 'ca-audit', name: 'CA Vivek Agrawal', company: 'Agrawal & Associates Chartered Accountants', desig: 'Senior Partner' },
    { id: 'tech-portfolio', title: 'Tech Studio & Full-Stack Lab', icon: '💻', slug: 'tech-portfolio', name: 'Vikram Joshi', company: 'Novacore Systems & Cloud Labs', desig: 'Staff Systems Architect' },
    { id: 'vcard43', title: 'Corporate CXO & Executive', icon: '👑', slug: 'executive-desk', name: 'Richard Sterling', company: 'Sterling Global Ventures', desig: 'Managing Director & Board Member' },
  ],
  'Retail & Local Shops': [
    { id: 'ret-electronics', title: 'Electronics & Mobiles Store', icon: '📱', slug: 'electronics-store', name: 'Mahesh Jain', company: 'Jain Digital World & Electronics', desig: 'Proprietor' },
    { id: 'ret-jewelry', title: 'Designer Gold & Diamond Jewelry', icon: '💎', slug: 'jewelry-store', name: 'Suresh Verma', company: 'Navratan Jewelers & Gems', desig: 'Managing Director' },
    { id: 'ret-supermarket', title: 'Supermarket & Groceries', icon: '🛒', slug: 'supermarket', name: 'Dinesh Patel', company: 'FreshMart Supermarkets', desig: 'Store Operations Manager' },
    { id: 'ret-opticals', title: 'Eyewear & Optical Studio', icon: '👓', slug: 'optical-store', name: 'Dr. Anil Saxena', company: 'VisionPlus Opticals & Eye Care', desig: 'Optometrist & Founder' },
  ],
  'Home & Professional Services': [
    { id: 'home-plumber', title: '24/7 Emergency Plumbing', icon: '🚰', slug: 'plumbing-services', name: 'Ramesh Yadav', company: 'QuickFix Emergency Plumbing', desig: 'Master Plumber' },
    { id: 'home-electrician', title: 'Certified Electrical Services', icon: '⚡', slug: 'electrician', name: 'Santosh Kumar', company: 'PowerSafe Electrical Works', desig: 'Licensed Electrical Contractor' },
    { id: 'home-ac', title: 'AC Repair & HVAC Services', icon: '❄️', slug: 'ac-repair', name: 'Imran Khan', company: 'CoolBreeze AC & Refrigeration', desig: 'HVAC Specialist' },
    { id: 'home-pest', title: 'Pest & Termite Control', icon: '🐜', slug: 'pest-control', name: 'Sunil Verma', company: 'BugFree Termite & Pest Control', desig: 'Senior Pest Controller' },
  ],
  'Travel & Hospitality': [
    { id: 'trav-agency', title: 'Tours & Holiday Travel Agency', icon: '✈️', slug: 'tours-travels', name: 'Pankaj Malhotra', company: 'Wanderlust International Travels', desig: 'Managing Partner' },
    { id: 'bus-booking', title: 'SwiftVoyage Intercity Bus Booking', icon: '🚌', slug: 'bus-booking', name: 'SwiftVoyage Express', company: 'SwiftVoyage Express Transport Pvt Ltd', desig: 'Operations Lead' },
    { id: 'trav-resort', title: 'Luxury Resort & Pool Villas', icon: '🏝️', slug: 'luxury-resort', name: 'Kavita Menon', company: 'Palm Breeze Luxury Resort & Spa', desig: 'General Manager' },
    { id: 'trav-cab', title: '24/7 Airport & Outstation Cabs', icon: '🚕', slug: 'cab-services', name: 'Satish Goud', company: 'CityExpress Airport Cabs & Rentals', desig: 'Fleet Director' },
    { id: 'trav-homestay', title: 'Heritage Plantation Homestay', icon: '🏡', slug: 'homestay', name: 'Bipin Thomas', company: 'Misty Pines Heritage Homestay', desig: 'Host & Property Owner' },
  ]
};
