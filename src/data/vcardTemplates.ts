export type VCardCategory = 
  | 'Real Estate'
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
  imgUrl: string;
  homeImgUrl?: string;
  badge?: string;
  isRibbon?: boolean;
  tagline: string;
  features: string[];
}

export const VCARD_CATEGORY_LIST: { id: VCardCategory; name: string; icon: string; count?: number }[] = [
  { id: 'Real Estate', name: 'Real Estate', icon: '🏠' },
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
  // ==========================================
  // ⭐ FEATURED CLIENT TEMPLATES
  // ==========================================
  {
    id: 'events-planner',
    templateNumber: 901,
    name: 'Luxury Events & Wedding Planner vCard',
    category: 'Events & Creative',
    subCategory: 'Wedding & Event Planners',
    imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    tagline: 'Destination weddings, floral Mandap decor & corporate summit setups',
    features: ['Event decor package store', 'Book wedding date consultation', '4K video teaser reel', 'WhatsApp quotation desk']
  },
  {
    id: 'tech-portfolio',
    templateNumber: 1001,
    name: 'Full-Stack Software Engineer & Tech Portfolio',
    category: 'Professional Services',
    subCategory: 'Software Developers',
    imgUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
    badge: 'Tech Pro',
    tagline: 'Staff Full-Stack & AI Systems Architect | Next.js, Microservices & LLMs',
    features: ['GitHub 5k+ stars showcase', 'Resume & tech consultation booking', 'Downloadable SaaS boilerplate store', '1-Click vCard save']
  },
  {
    id: 'restaurant-menu',
    templateNumber: 401,
    name: 'Interactive Restaurant & Cafe Digital Dining Menu',
    category: 'Food Business',
    subCategory: 'Restaurants & Lounges',
    imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    tagline: 'Hyderabadi dum biryanis, tandoor starters, rooftop cocktails & dessert menu',
    features: ['Interactive digital food menu with photos', 'Table & candlelight dinner reservation', '1-Click WhatsApp table takeaway order', 'Google review QR scan']
  },
  {
    id: 'pickles-snacks',
    templateNumber: 405,
    name: 'Homemade Pickles, Ghee Sweets & Snacks Store',
    category: 'Food Business',
    subCategory: 'Homemade Pickles & Sweets',
    imgUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    badge: 'Authentic Andhra',
    tagline: 'Avakaya, chicken/mutton non-veg pickles, Pootharekulu & hot savory snacks',
    features: ['Complete pickle weight & jar catalog', 'Direct WhatsApp order with itemized cart', 'NRI worldwide parcel delivery badge', 'Instant UPI payment collection']
  },
  {
    id: 're-builders',
    templateNumber: 101,
    name: 'Real Estate Master vCard',
    category: 'Real Estate',
    subCategory: 'Builders, Plots, Villas & Realtors',
    imgUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    badge: 'Flagship 5-in-1',
    tagline: 'Builders, gated layouts, open plots, luxury villas & property advisors',
    features: [
      'TS-RERA certified builder & 100% clear title credentials',
      'All property types: Open Plots, Villas, Apartments & IT Parks',
      'Doorstep chauffeur site visit & inspection booking',
      'Master layout blueprints & 4K aerial drone walkthroughs',
      'Growth corridor filter & EMI / per-sq-yd calculator',
      'Instant WhatsApp lead router & 1-tap contact save'
    ]
  },

  // ==========================================
  // 2. 👗 FASHION & CLOTHING
  // ==========================================
  {
    id: 'fash-boutique',
    templateNumber: 201,
    name: 'Designer Boutique vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Boutiques',
    imgUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    tagline: 'Custom couture, bespoke tailoring & designer outfits',
    features: ['Lookbook photo slider', 'Custom stitching inquiry', 'WhatsApp store catalog', 'Instagram feed sync']
  },
  {
    id: 'fash-ladies',
    templateNumber: 202,
    name: 'Ladies Wear Studio vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Ladies Wear',
    imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Kurtis, lehengas, western dresses & party wear',
    features: ['Size chart guide', 'New arrivals gallery', 'Direct WhatsApp ordering', 'Special discount coupon']
  },
  {
    id: 'fash-mens',
    templateNumber: 203,
    name: "Men's Wear & Bespoke Suits vCard",
    category: 'Fashion & Clothing',
    subCategory: "Men's Wear",
    imgUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    badge: 'Executive',
    tagline: 'Suits, blazers, ethnic sherwanis & formal apparel',
    features: ['Suit fabric swatch book', 'Master tailor appointment', 'Measurement submission form', 'Store directions']
  },
  {
    id: 'fash-saree',
    templateNumber: 204,
    name: 'Exclusive Saree Shop vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Saree Shops',
    imgUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    badge: 'Heritage',
    tagline: 'Kanchipuram, Banarasi, Handloom & Silk Sarees',
    features: ['High-res silk weave photos', 'Video call shopping link', 'Festive collections catalog', 'Silk mark badge']
  },
  {
    id: 'fash-online',
    templateNumber: 205,
    name: 'Online Clothing Seller vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Online Clothing Sellers',
    imgUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    tagline: 'Instagram fashion brands, D2C apparel & streetwear',
    features: ['Direct Checkout mini-store', 'COD / Online payment link', 'Tracking status chat', 'Customer reviews wall']
  },

  // ==========================================
  // 3. 💄 BEAUTY & PERSONAL CARE
  // ==========================================
  {
    id: 'beauty-salon',
    templateNumber: 301,
    name: 'Luxury Hair & Beauty Salon vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Salons',
    imgUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    tagline: 'Unisex hair styling, keratin, spa & grooming',
    features: ['Service rate menu', 'Online slot booking', 'Stylist portfolio gallery', 'Membership discount card']
  },
  {
    id: 'beauty-parlour',
    templateNumber: 302,
    name: 'Beauty Parlour vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Beauty Parlours',
    imgUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Facials, waxing, manicures, pedicures & skin care',
    features: ['Monthly combo packages', 'Instant WhatsApp booking', 'Cleanliness hygiene badge', 'Location map']
  },
  {
    id: 'beauty-makeup',
    templateNumber: 303,
    name: 'Professional Makeup Artist vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Makeup Artists',
    imgUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    badge: 'Visual Pro',
    tagline: 'Celebrity makeup, fashion shoots, portfolio & party look',
    features: ['High-def lookbook gallery', 'HD/Airbrush service tiers', 'Date availability check', 'Instagram reels feed']
  },
  {
    id: 'beauty-bridal',
    templateNumber: 304,
    name: 'Bridal Makeup Studio vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Bridal Studios',
    imgUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    badge: 'Premium',
    tagline: 'Wedding makeover, pre-bridal packages & saree draping',
    features: ['Bridal before/after photos', 'Trial session scheduler', 'Wedding entourage packages', 'Client testimonials']
  },
  {
    id: 'beauty-clinic',
    templateNumber: 305,
    name: 'Skin & Hair Clinic vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Skin/Hair Clinics',
    imgUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    tagline: 'Dermatologists, laser treatments & hair restoration',
    features: ['Doctor credentials & degrees', 'Treatment explainer videos', 'Confidential consultation form', 'Clinic hours']
  },

  // ==========================================
  // 4. 🍽️ FOOD BUSINESS
  // ==========================================
  {
    id: 'food-restaurant',
    templateNumber: 401,
    name: 'OneClickBiz Smart Restaurant & Digital Dining Menu',
    category: 'Food Business',
    subCategory: 'Smart Dining & Digital Menus',
    imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    badge: 'Smart Dining',
    tagline: 'Interactive Digital Menu, Dish Details & Instant WhatsApp Ordering',
    features: ['Interactive Digital Menu with Photos', 'Dish Details with Ingredients & Dietary Tags', '2-Option WhatsApp Ordering (Table / Delivery)', 'Direct UPI Bill Payment Desk']
  },
  {
    id: 'food-cloud',
    templateNumber: 402,
    name: 'Cloud Kitchen & Delivery vCard',
    category: 'Food Business',
    subCategory: 'Cloud Kitchens',
    imgUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Virtual kitchens, late night delivery & quick bites',
    features: ['Direct WhatsApp food ordering', 'Daily lunch combos', 'Live delivery tracking chat', 'Food safety FSSAI badge']
  },
  {
    id: 'food-baker',
    templateNumber: 403,
    name: 'Artisan Bakery & Custom Cakes vCard',
    category: 'Food Business',
    subCategory: 'Bakers',
    imgUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    badge: 'Sweet',
    tagline: 'Custom birthday cakes, cupcakes, cookies & breads',
    features: ['Theme cake design gallery', 'Flavor & weight pricing menu', 'Advance date booking slot', 'Delivery area radius']
  },
  {
    id: 'food-home',
    templateNumber: 404,
    name: 'Home Food & Tiffin Services vCard',
    category: 'Food Business',
    subCategory: 'Home Food Businesses',
    imgUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Homestyle healthy meals, daily tiffins & lunchboxes',
    features: ['Weekly rotating menu', 'Monthly meal subscription', 'Trial meal order button', 'Dietary preference tags']
  },
  {
    id: 'food-catering',
    templateNumber: 405,
    name: 'Gourmet Catering Services vCard',
    category: 'Food Business',
    subCategory: 'Catering Services',
    imgUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    badge: 'Events',
    tagline: 'Wedding buffets, corporate lunches & private parties',
    features: ['Catering per-plate menus', 'Guest count quote generator', 'Live counter videos', 'Tasting session booking']
  },
  {
    id: 'food-sweets',
    templateNumber: 406,
    name: 'Traditional Sweet & Namkeen Shop vCard',
    category: 'Food Business',
    subCategory: 'Sweet Shops',
    imgUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    tagline: 'Mithai, dry fruits, gift hampers & savory snacks',
    features: ['Festive sweet box catalogs', 'Bulk corporate gifting orders', 'Same day home delivery', 'Pure ghee guarantee']
  },

  // ==========================================
  // 5. 🏥 HEALTHCARE
  // ==========================================
  {
    id: 'health-doctor',
    templateNumber: 501,
    name: 'Doctor & Specialist Clinic vCard',
    category: 'Healthcare',
    subCategory: 'Doctors',
    imgUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    badge: 'Verified',
    tagline: 'Physicians, pediatricians, cardiologists & surgeons',
    features: ['OPD consulting hours', 'Online appointment booking', 'Medical council registration', 'Emergency dialer']
  },
  {
    id: 'health-dental',
    templateNumber: 502,
    name: 'Dental Care & Implant Clinic vCard',
    category: 'Healthcare',
    subCategory: 'Dental Clinics',
    imgUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Root canals, aligners, teeth whitening & smile design',
    features: ['Dental treatment list', 'Before/after smile transformations', 'Direct consultation booking', 'Painless dentistry badge']
  },
  {
    id: 'health-physio',
    templateNumber: 503,
    name: 'Physiotherapy & Rehab vCard',
    category: 'Healthcare',
    subCategory: 'Physiotherapy',
    imgUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Sports rehab, posture correction & pain management',
    features: ['Home visit service booking', 'Exercise video guides', 'Pain assessment form', 'Certified therapists info']
  },
  {
    id: 'health-diagnostic',
    templateNumber: 504,
    name: 'Diagnostic & Pathology Lab vCard',
    category: 'Healthcare',
    subCategory: 'Diagnostic Centres',
    imgUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    tagline: 'Blood tests, health checkups, MRI/CT scans & X-rays',
    features: ['Full body checkup packages', 'Book home blood collection', 'Download test reports link', 'NABL accredited badge']
  },
  {
    id: 'health-pharmacy',
    templateNumber: 505,
    name: 'Pharmacy & Medical Store vCard',
    category: 'Healthcare',
    subCategory: 'Pharmacies',
    imgUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    tagline: '24/7 medicines, surgical supplies & wellness products',
    features: ['Upload prescription on WhatsApp', 'Fast medicine home delivery', 'Refill reminder alerts', 'Store location map']
  },
  {
    id: 'health-diet',
    templateNumber: 506,
    name: 'Nutrition & Diet Consultant vCard',
    category: 'Healthcare',
    subCategory: 'Nutrition/Diet Consultants',
    imgUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    tagline: 'Weight loss, PCOS management, diabetes & sports nutrition',
    features: ['Customized meal plan download', '1-on-1 weekly consultation', 'Client transformation stories', 'BMI calculator']
  },

  // ==========================================
  // 6. 🎓 EDUCATION
  // ==========================================
  {
    id: 'edu-school',
    templateNumber: 601,
    name: 'School & International Academy vCard',
    category: 'Education',
    subCategory: 'Schools',
    imgUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    badge: 'Academy',
    tagline: 'K-12 schools, play schools & international academies',
    features: ['Admissions inquiry form', 'School prospectus PDF', 'Campus virtual tour', 'Academic calendar']
  },
  {
    id: 'edu-tuition',
    templateNumber: 602,
    name: 'Tuition & Learning Centre vCard',
    category: 'Education',
    subCategory: 'Tuition Centres',
    imgUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    tagline: 'Maths, science, board exams & home tutors',
    features: ['Batch timing & fees chart', 'Book free demo class', 'Student test scores', 'WhatsApp parent helpline']
  },
  {
    id: 'edu-coaching',
    templateNumber: 603,
    name: 'Coaching Institute (IIT/NEET/UPSC) vCard',
    category: 'Education',
    subCategory: 'Coaching Institutes',
    imgUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badge: 'Results',
    tagline: 'Competitive exam prep, study materials & mock tests',
    features: ['Rankers hall of fame', 'Scholarship admission test form', 'Free study notes download', 'Faculty profile cards']
  },
  {
    id: 'edu-skills',
    templateNumber: 604,
    name: 'Skill Training & Tech Bootcamp vCard',
    category: 'Education',
    subCategory: 'Skill Training Centres',
    imgUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    tagline: 'Coding, AI, hardware, graphic design & vocational skills',
    features: ['Course curriculum syllabus', '100% placement stats', 'Enroll in next batch form', 'Student project demos']
  },
  {
    id: 'edu-digital',
    templateNumber: 605,
    name: 'Digital Marketing Trainer vCard',
    category: 'Education',
    subCategory: 'Digital Marketing Trainers',
    imgUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tagline: 'SEO, Google Ads, Meta Ads & affiliate marketing coaching',
    features: ['Live agency case studies', 'Certifications guide', 'Book masterclass seat', 'LinkedIn & YouTube channel']
  },
  {
    id: 'edu-english',
    templateNumber: 606,
    name: 'Spoken English & IELTS Institute vCard',
    category: 'Education',
    subCategory: 'Spoken English Institutes',
    imgUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    tagline: 'IELTS, TOEFL, communication skills & public speaking',
    features: ['Band score guarantee chart', 'Free level assessment quiz', 'Study abroad counseling', 'Online & offline batches']
  },

  // ==========================================
  // 7. 🛠️ HOME & PROFESSIONAL SERVICES
  // ==========================================
  {
    id: 'home-interior',
    templateNumber: 701,
    name: 'Interior Designer & Modular Kitchens vCard',
    category: 'Home & Professional Services',
    subCategory: 'Interior Designers',
    imgUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    tagline: 'Turnkey residential interiors, modular homes & offices',
    features: ['3D photo gallery', 'Get free quote estimator', 'Warranty & quality certificate', 'WhatsApp consultation']
  },
  {
    id: 'home-architect',
    templateNumber: 702,
    name: 'Architect & Structural Engineer vCard',
    category: 'Home & Professional Services',
    subCategory: 'Architects',
    imgUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Modern house elevations, blueprints & municipal sanctions',
    features: ['Blueprint portfolio gallery', 'Site inspection booking', 'Sustainable architecture designs', 'Client reviews']
  },
  {
    id: 'home-plumber',
    templateNumber: 703,
    name: 'Plumbing Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'Plumbers',
    imgUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    tagline: 'Emergency pipe leaks, bathroom fittings & motor repair',
    features: ['1-Tap emergency phone dialer', 'Transparent rate card', '30-minute door arrival', 'Service warranty']
  },
  {
    id: 'home-electrician',
    templateNumber: 704,
    name: 'Certified Electrician vCard',
    category: 'Home & Professional Services',
    subCategory: 'Electricians',
    imgUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Home wiring, inverter setups, smart switches & MCB repairs',
    features: ['Instant technician call', 'Electrical safety audit', 'Pricing by job type', 'Google verified badge']
  },
  {
    id: 'home-ac',
    templateNumber: 705,
    name: 'AC Repair & HVAC Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'AC Services',
    imgUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tagline: 'AC installation, gas refilling, jet cleaning & AMC plans',
    features: ['Book AC service slot', 'Annual Maintenance Contract (AMC)', 'Split & window rates', 'Fast response guarantee']
  },
  {
    id: 'home-pest',
    templateNumber: 706,
    name: 'Pest Control Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'Pest Control',
    imgUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
    tagline: 'Termite, cockroach, rodent & bed bug treatment',
    features: ['Odorless herbal treatments', '1-year warranty contract', 'Commercial & home booking', 'Govt approved chemicals']
  },
  {
    id: 'home-cleaning',
    templateNumber: 707,
    name: 'Deep Cleaning & Sanitization vCard',
    category: 'Home & Professional Services',
    subCategory: 'Cleaning Services',
    imgUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    tagline: 'Full house deep cleaning, sofa shampooing & kitchen sanitization',
    features: ['Cleaning checklists', 'Before/after transformation photos', 'Instant WhatsApp booking', 'Trained staff badge']
  },
  {
    id: 'home-packers',
    templateNumber: 708,
    name: 'Packers & Movers vCard',
    category: 'Home & Professional Services',
    subCategory: 'Packers & Movers',
    imgUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    tagline: 'Local house shifting, office relocation & vehicle transport',
    features: ['Free moving quote calculator', 'Transit insurance options', 'All-India transport network', 'Real-time GPS tracking']
  },

  // ==========================================
  // 8. 🚗 AUTOMOBILE
  // ==========================================
  {
    id: 'auto-car-dealer',
    templateNumber: 801,
    name: 'Car Dealer & Showroom vCard',
    category: 'Automobile',
    subCategory: 'Car Dealers',
    imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    badge: 'Showroom',
    tagline: 'New cars, latest models, test drives & finance options',
    features: ['Car model catalogue with specs', 'Book test drive form', 'Loan EMI calculator', 'Exchange bonus deals']
  },
  {
    id: 'auto-used-cars',
    templateNumber: 802,
    name: 'Certified Used Car Dealer vCard',
    category: 'Automobile',
    subCategory: 'Used Car Dealers',
    imgUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    badge: 'Certified',
    tagline: 'Pre-owned cars, 140-point inspected, warranty & RC transfer',
    features: ['Live inventory stock with prices', 'Free valuation of old car', 'Buy/Sell WhatsApp chat', 'RC transfer support']
  },
  {
    id: 'auto-bike-dealer',
    templateNumber: 803,
    name: 'Bike & Superbike Dealer vCard',
    category: 'Automobile',
    subCategory: 'Bike Dealers',
    imgUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    tagline: 'Sports bikes, commuter motorcycles & electric scooters',
    features: ['Bike models & on-road prices', 'Test ride booking', 'Accessories & riding gear catalog', 'Insurance renewals']
  },
  {
    id: 'auto-rentals',
    templateNumber: 804,
    name: 'Self-Drive & Luxury Car Rentals vCard',
    category: 'Automobile',
    subCategory: 'Car Rentals',
    imgUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Daily self-drive cars, wedding luxury fleets & airport cabs',
    features: ['Fleet photos & daily tariffs', 'Instant WhatsApp reservation', 'Unlimited km packages', 'Doorstep delivery']
  },
  {
    id: 'auto-detailing',
    templateNumber: 805,
    name: 'Car Detailing & Ceramic Coating vCard',
    category: 'Automobile',
    subCategory: 'Car Detailing',
    imgUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro Shine',
    tagline: '9H Ceramic coating, PPF wrap, paint correction & foam wash',
    features: ['Gloss reflection before/after', 'Detailing packages & warranty', 'Book service slot', 'Premium studio location']
  },
  {
    id: 'auto-accessories',
    templateNumber: 806,
    name: 'Car Accessories & Audio Studio vCard',
    category: 'Automobile',
    subCategory: 'Car Accessories',
    imgUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Android touch screens, seat covers, dashcams & LED lights',
    features: ['Accessories store catalog', 'Custom modification gallery', 'Price inquiry chat', 'Installation warranty']
  },

  // ==========================================
  // 9. 📸 EVENTS & CREATIVE
  // ==========================================
  {
    id: 'event-photo',
    templateNumber: 901,
    name: 'Wedding & Fashion Photographer vCard',
    category: 'Events & Creative',
    subCategory: 'Photographers',
    imgUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80',
    badge: 'Visual Pro',
    tagline: 'Candid wedding shoots, pre-wedding films & luxury portraits',
    features: ['Full-screen photo album', 'Cinematic trailer video embeds', 'Session pricing guide', 'Direct call & WhatsApp']
  },
  {
    id: 'event-planner',
    templateNumber: 902,
    name: 'Luxury Wedding Planner vCard',
    category: 'Events & Creative',
    subCategory: 'Wedding Planners',
    imgUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    badge: 'Royal',
    tagline: 'Destination weddings, sangeet stages & hospitality management',
    features: ['Theme decor photo galleries', 'Vendor & venue partners', 'Date availability check', 'Budget quote request']
  },
  {
    id: 'event-manager',
    templateNumber: 903,
    name: 'Event Management & Corporate Galas vCard',
    category: 'Events & Creative',
    subCategory: 'Event Managers',
    imgUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    tagline: 'Conferences, product launches, concerts & stage setups',
    features: ['Event portfolio videos', 'Audio-visual AV rental spec', 'Corporate client logos', 'Direct RFP quote form']
  },
  {
    id: 'event-decorator',
    templateNumber: 904,
    name: 'Stage, Floral & Balloon Decorators vCard',
    category: 'Events & Creative',
    subCategory: 'Decorators',
    imgUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Birthday themes, mandap decor, flower backdrops & lighting',
    features: ['Decor themes lookbook', 'Package pricing tiers', 'Check date availability', 'WhatsApp design selection']
  },
  {
    id: 'event-dj',
    templateNumber: 905,
    name: 'DJ, Sound & Light Artist vCard',
    category: 'Events & Creative',
    subCategory: 'DJs',
    imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    tagline: 'Wedding sangeet, club nights, corporate DJ & sound rigs',
    features: ['SoundCloud / Spotify mixes', 'Event gig booking slot', 'Live stage setup photos', 'Instagram video reels']
  },
  {
    id: 'event-mehendi',
    templateNumber: 906,
    name: 'Bridal Mehendi Artist vCard',
    category: 'Events & Creative',
    subCategory: 'Mehendi Artists',
    imgUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    badge: 'Artisan',
    tagline: 'Arabic, Rajasthani, portrait & organic bridal henna',
    features: ['Henna design lookbook', 'Bridal package rates', 'Advance date booking form', '100% organic henna badge']
  },

  // ==========================================
  // 10. 💼 PROFESSIONAL SERVICES
  // ==========================================
  {
    id: 'prof-ca',
    templateNumber: 1001,
    name: 'Chartered Accountant (CA) & Audit Firm vCard',
    category: 'Professional Services',
    subCategory: 'CA',
    imgUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    badge: 'Executive',
    tagline: 'GST returns, income tax filing, statutory audits & ROC',
    features: ['Tax advisory appointment form', 'Compliance due date calendar', 'Service fee packages', 'Client confidentiality badge']
  },
  {
    id: 'prof-advocate',
    templateNumber: 1002,
    name: 'Advocate & Legal Chambers vCard',
    category: 'Professional Services',
    subCategory: 'Advocates',
    imgUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    badge: 'Legal Pro',
    tagline: 'High court advocate, corporate law, property & civil litigation',
    features: ['Practice legal areas overview', 'Confidential case consultation', 'Bar council credentials', 'Chamber directions']
  },
  {
    id: 'prof-insurance',
    templateNumber: 1003,
    name: 'Insurance Advisor & Financial Security vCard',
    category: 'Professional Services',
    subCategory: 'Insurance Agents',
    imgUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Term life insurance, health mediclaim & motor policies',
    features: ['Instant premium quote calculator', 'Claim assistance hotline', 'Policy comparison charts', 'WhatsApp instant consult']
  },
  {
    id: 'prof-financial',
    templateNumber: 1004,
    name: 'Financial & Wealth Consultant vCard',
    category: 'Professional Services',
    subCategory: 'Financial Consultants',
    imgUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    tagline: 'Mutual funds, SIP, retirement planning & wealth management',
    features: ['SIP wealth growth calculator', 'Book portfolio review session', 'SEBI registered advisor info', 'Client testimonials']
  },
  {
    id: 'prof-business',
    templateNumber: 1005,
    name: 'Business & Startup Consultant vCard',
    category: 'Professional Services',
    subCategory: 'Business Consultants',
    imgUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    badge: 'Growth',
    tagline: 'Company incorporation, pitch decks, MSME loans & strategy',
    features: ['Startup launch roadmap', 'Book 1-on-1 strategy call', 'Case study downloads', 'LinkedIn sync']
  },
  {
    id: 'prof-hr',
    templateNumber: 1006,
    name: 'HR & Staffing Solutions vCard',
    category: 'Professional Services',
    subCategory: 'HR Consultants',
    imgUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Executive search, IT staffing, payroll & compliance',
    features: ['Submit job opening form', 'Upload resume portal', 'Staffing service tiers', 'Candidate placement stats']
  },

  // ==========================================
  // 11. 🛍️ RETAIL & LOCAL SHOPS
  // ==========================================
  {
    id: 'retail-mobile',
    templateNumber: 1101,
    name: 'Mobile Phone & Gadget Store vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Mobile Shops',
    imgUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Gadgets',
    tagline: 'Smartphones, iPhones, 0% EMI offers & express repairs',
    features: ['Latest smartphone price list', '0% EMI scheme eligibility', 'Screen repair quote chat', 'Store location map']
  },
  {
    id: 'retail-electronics',
    templateNumber: 1102,
    name: 'Electronics & Home Appliances vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Electronics',
    imgUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    tagline: 'Smart TVs, refrigerators, washing machines & audio',
    features: ['Festive deal catalog', 'Brand warranty info', 'Free home delivery booking', 'Exchange old appliance offer']
  },
  {
    id: 'retail-furniture',
    templateNumber: 1103,
    name: 'Furniture Showroom & Woodwork vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Furniture',
    imgUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    badge: 'Design',
    tagline: 'Recliners, teak wood sofas, king beds & office desks',
    features: ['Furniture collection lookbook', 'Custom dimensions inquiry', 'Showroom video tour', 'Direct WhatsApp ordering']
  },
  {
    id: 'retail-jewellery',
    templateNumber: 1104,
    name: 'Gold & Diamond Jewellery vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Jewellery',
    imgUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury',
    tagline: 'BIS hallmarked 916 gold, diamond necklaces & silver gifts',
    features: ['Bridal jewelry catalog', 'Daily gold rate widget', 'Monthly gold saving scheme', 'Hallmark certified badge']
  },
  {
    id: 'retail-gifts',
    templateNumber: 1105,
    name: 'Personalized Gifts & Toys Shop vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Gift Shops',
    imgUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
    tagline: 'Custom photo frames, mugs, birthday toys & corporate hampers',
    features: ['Customized product ordering', 'Gift hamper catalog', 'Same-day gift delivery', 'WhatsApp order chat']
  },
  {
    id: 'retail-grocery',
    templateNumber: 1106,
    name: 'Supermarket & Organic Grocery vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Grocery Stores',
    imgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Daily essentials, fresh vegetables, organic pulses & dairy',
    features: ['Send grocery list on WhatsApp', 'Free 30-min home delivery', 'Weekly discount deals', 'Loyalty card program']
  },
  {
    id: 'retail-hardware',
    templateNumber: 1107,
    name: 'Hardware, Paints & Sanitary Store vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Hardware Shops',
    imgUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Asian paints, power tools, plumbing fixtures & building materials',
    features: ['Paint color shade card', 'Contractor wholesale pricing', 'WhatsApp order & delivery', 'Authorized dealer badge']
  },

  // ==========================================
  // 12. ✈️ TRAVEL & HOSPITALITY
  // ==========================================
  {
    id: 'travel-agency',
    templateNumber: 1201,
    name: 'International Travel & Visa Agency vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Travel Agencies',
    imgUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    tagline: 'Flight tickets, tourist visas, passport services & travel insurance',
    features: ['Visa document checklist PDF', 'Flight ticket inquiry chat', 'Forex & insurance assistance', 'IATA accredited']
  },
  {
    id: 'travel-tour',
    templateNumber: 1202,
    name: 'Holiday Tour Operator vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Tour Operators',
    imgUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot Deal',
    tagline: 'Dubai, Bali, Europe, Kashmir & Goa holiday packages',
    features: ['Tour itinerary PDF downloads', 'Book holiday package slot', 'Customer travel photos', 'Direct WhatsApp pricing']
  },
  {
    id: 'travel-hotel',
    templateNumber: 1203,
    name: 'Luxury Hotel & Banquet Suites vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Hotels',
    imgUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badge: '5-Star',
    tagline: 'Deluxe rooms, swimming pool, banquet halls & fine dining',
    features: ['Room tariff & booking', 'Banquet hall for weddings', 'Virtual room walkthrough', 'Airport pickup booking']
  },
  {
    id: 'travel-resort',
    templateNumber: 1204,
    name: 'Nature Resort & Weekend Getaway vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Resorts',
    imgUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    badge: 'Weekend Special',
    tagline: 'Private pool villas, adventure games, campfire & buffet',
    features: ['Day outing packages', 'Villa photos & tariffs', 'Advance booking calendar', 'Directions map link']
  },
  {
    id: 'travel-homestay',
    templateNumber: 1205,
    name: 'Heritage Homestay & Plantation Villa vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Homestays',
    imgUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
    tagline: 'Cozy rooms in hills, homemade authentic meals & nature walks',
    features: ['Homestay photo gallery', 'Local activities list', 'Instant host WhatsApp chat', 'Verified guest reviews']
  },
  {
    id: 'travel-taxi',
    templateNumber: 1206,
    name: '24/7 Outstation Taxi & Cab Service vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Cab/Taxi Services',
    imgUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    badge: '24/7 Fast',
    tagline: 'Outstation cabs, airport drop, Innova/Sedan rentals',
    features: ['One-way & roundtrip fare chart', '1-Tap instant cab call', 'Sedan/SUV/Innova fleet', 'Clean sanitised cars']
  }
];
