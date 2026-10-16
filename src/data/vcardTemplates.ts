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
  // ==========================================
  // ⭐ FEATURED CLIENT TEMPLATES
  // ==========================================
  {
    id: 'events-planner',
    templateNumber: 901,
    name: 'Luxury Events & Wedding Planner vCard',
    category: 'Events & Creative',
    subCategory: 'Wedding & Event Planners',
    actionSubtitle: 'Destination Weddings',
    imgUrl: 'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Staff Tech Architect',
    imgUrl: 'https://images.unsplash.com/photo-1667655861998-46fe4c29a4cf?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Digital Food Menu',
    imgUrl: 'https://images.unsplash.com/flagged/photo-1561350117-501b4661f8d4?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Andhra Specials',
    imgUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Authentic Andhra',
    tagline: 'Avakaya, chicken/mutton non-veg pickles, Pootharekulu & hot savory snacks',
    features: ['Complete pickle weight & jar catalog', 'Direct WhatsApp order with itemized cart', 'NRI worldwide parcel delivery badge', 'Instant UPI payment collection']
  },
  {
    id: 're-builders',
    templateNumber: 101,
    name: 'Real Estate Master & High-Rise Developers',
    category: 'Real Estate',
    subCategory: 'High-Rise Towers, Gated Communities & Infra',
    actionSubtitle: 'High-Rise Towers',
    imgUrl: 'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '⭐ Flagship Mini-Website',
    tagline: 'Builders, gated layouts, luxury towers & infrastructure',
    features: [
      'TS-RERA certified builder & 100% clear title credentials',
      'All property types: Towers, Gated Villas, Plots & IT Parks',
      'Doorstep chauffeur site visit & model inspection booking',
      'Master layout blueprints & 4K aerial drone walkthroughs',
      'Interactive EMI calculator & per-sq-ft estimator',
      'Instant WhatsApp lead router & 1-tap contact save'
    ]
  },
  {
    id: 're-plots',
    templateNumber: 102,
    name: 'Open Plots & Farmland Ventures',
    category: 'Real Estate',
    subCategory: 'Plotted Layouts, Farmlands & County',
    actionSubtitle: 'HMDA / DTCP Plots',
    imgUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'HMDA & DTCP Approved',
    tagline: 'HMDA / DTCP approved open plots, farmlands & county layouts',
    features: [
      'HMDA, DTCP & TS-RERA approved gated layout communities',
      '100% clear title 30-year link document verification',
      'Organic farmland projects with drip irrigation & fencing',
      'Highway growth corridors (Airport & ORR / RRR junctions)',
      'Free chauffeured weekend site visit booking'
    ]
  },
  {
    id: 're-villas',
    templateNumber: 103,
    name: 'Luxury Gated Villas & Triplex Communities',
    category: 'Real Estate',
    subCategory: 'Triplex Gated Villas & Clubhouse Estates',
    actionSubtitle: 'Gated Triplex Villas',
    imgUrl: 'https://images.unsplash.com/photo-1722421492323-eaf9c401befe?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Ultra Luxury',
    tagline: 'Triplex gated villas, clubhouse amenities & private plunge pools',
    features: [
      '4 & 5 BHK Triplex Villas with private plunge pools',
      'Clubhouse amenities: tennis court, spa & banquet hall',
      '100% Vastu compliant architecture & solar power',
      '3D virtual walkthrough & high-res interior lookbook',
      'VIP model villa appointment booking'
    ]
  },
  {
    id: 're-agents',
    templateNumber: 104,
    name: 'Certified Realtors & Property Advisors',
    category: 'Real Estate',
    subCategory: 'Channel Partners & Property Brokers',
    actionSubtitle: 'Finest Agents',
    imgUrl: 'https://images.unsplash.com/photo-1742981365880-698cfb84492d?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Top Broker',
    tagline: 'Verified luxury apartments, villas & investment advisory',
    features: [
      'Verified luxury apartments, villas & resale inventories',
      'NRI property investment portfolio management',
      'Zero-brokerage bank loan tie-ups (HDFC, SBI, ICICI)',
      'Direct 1-tap WhatsApp consultation & instant contact card',
      'RERA compliant broker credentials'
    ]
  },
  {
    id: 're-consultants',
    templateNumber: 105,
    name: 'Commercial Real Estate & Pre-Leased Assets',
    category: 'Real Estate',
    subCategory: 'Pre-Leased Banks, IT Parks & High Street',
    actionSubtitle: 'Pre-Leased Assets',
    imgUrl: 'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '8%+ Rental Yield',
    tagline: 'Grade-A IT parks, bank branches & high-yield commercial assets',
    features: [
      'Grade-A IT park office spaces & MNC tenant portfolios',
      'Pre-leased bank branches & high street retail with 9-yr lock-in',
      'Comprehensive ROI yield analysis & lease covenant review',
      'Institutional & HNI family office land aggregation',
      'Confidential deal room & NDA consultation'
    ]
  },
  {
    id: 'vcard35',
    templateNumber: 106,
    name: 'Minimalist Real Estate vCard',
    category: 'Real Estate',
    subCategory: 'Executive Property Brokers',
    actionSubtitle: 'Luxury Penthouses',
    imgUrl: 'https://images.unsplash.com/photo-1745429523615-2a82c60bfc02?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Sleek vCard',
    tagline: 'Prime property broker & digital visiting card',
    features: [
      'Clean luxury digital business card & QR code',
      '1-tap contact save (VCF) to phonebook',
      'Featured property listings with instant WhatsApp enquiry',
      'Google Maps office location & social links'
    ]
  },

  // ==========================================
  // 2. 👗 FASHION & CLOTHING
  // ==========================================
  {
    id: 'fash-boutique',
    templateNumber: 201,
    name: 'Grand Fashion & Clothing Mall vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Shopping Malls & Multi-Brand Apparel',
    actionSubtitle: 'Grand Boutique',
    imgUrl: 'https://images.unsplash.com/photo-1654764746225-e63f5e90facd?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Trending',
    tagline: 'Multi-Floor Fashion Mall • Men’s, Women’s & Kids’ Collections',
    features: ['Multi-Level Dept Mall (Men/Women/Kids)', 'In-Store Trial Rooms & Tailoring', 'WhatsApp 1-Click Ordering', 'Express Doorstep Delivery']
  },
  {
    id: 'fash-ladies',
    templateNumber: 202,
    name: 'Ladies Wear Studio vCard',
    category: 'Fashion & Clothing',
    subCategory: 'Ladies Wear',
    actionSubtitle: 'Designer Ethnic',
    imgUrl: 'https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Kurtis, lehengas, western dresses & party wear',
    features: ['Size chart guide', 'New arrivals gallery', 'Direct WhatsApp ordering', 'Special discount coupon']
  },
  {
    id: 'fash-mens',
    templateNumber: 203,
    name: "Men's Wear & Bespoke Suits vCard",
    category: 'Fashion & Clothing',
    subCategory: "Men's Wear",
    actionSubtitle: 'Bespoke Suits',
    imgUrl: 'https://images.unsplash.com/photo-1722952934708-749c22eb2e58?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Pure Silk Sarees',
    imgUrl: 'https://images.unsplash.com/flagged/photo-1551854716-8b811be39e7e?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Explore Lookbook',
    imgUrl: 'https://images.unsplash.com/photo-1668371459824-094a960a227d?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Top Rated Salons',
    imgUrl: 'https://images.unsplash.com/photo-1600685890506-593fdf55949b?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Spa & Glow',
    imgUrl: 'https://images.unsplash.com/photo-1610047614301-13c63f00c032?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Facials, waxing, manicures, pedicures & skin care',
    features: ['Monthly combo packages', 'Instant WhatsApp booking', 'Cleanliness hygiene badge', 'Location map']
  },
  {
    id: 'beauty-makeup',
    templateNumber: 303,
    name: 'Professional Makeup Artist vCard',
    category: 'Beauty & Personal Care',
    subCategory: 'Makeup Artists',
    actionSubtitle: 'Bridal Artistry',
    imgUrl: 'https://images.unsplash.com/photo-1587271315307-eaebc181c749?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Royal Brides',
    imgUrl: 'https://images.unsplash.com/photo-1774814305054-3f411d69211a?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Skin & Hair Clinic',
    imgUrl: 'https://images.unsplash.com/photo-1637589267610-6c66fc2a086b?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Dermatologists, laser treatments & hair restoration',
    features: ['Doctor credentials & degrees', 'Treatment explainer videos', 'Confidential consultation form', 'Clinic hours']
  },
  {
    id: 'vcard12',
    templateNumber: 306,
    name: 'Arjun Rawat - Elite Strength & Performance Coach',
    category: 'Beauty & Personal Care',
    subCategory: 'Fitness, Gym & Wellness',
    actionSubtitle: 'Fitness & Strength',
    imgUrl: 'https://images.unsplash.com/photo-1653666866518-d01fabfa94c2?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Elite Coach',
    tagline: 'Personal training, functional conditioning & athlete nutrition coaching',
    features: ['Transformation programs', 'Book trial workout session', 'Nutrition plan calculator', 'Client transformation reviews']
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
    actionSubtitle: 'Instant Table Book',
    imgUrl: 'https://images.unsplash.com/photo-1728910156510-77488f19b152?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Cloud Kitchen',
    imgUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Virtual kitchens, late night delivery & quick bites',
    features: ['Direct WhatsApp food ordering', 'Daily lunch combos', 'Live delivery tracking chat', 'Food safety FSSAI badge']
  },
  {
    id: 'food-baker',
    templateNumber: 403,
    name: 'Artisan Bakery & Custom Cakes vCard',
    category: 'Food Business',
    subCategory: 'Bakers',
    actionSubtitle: 'Artisan Bakery',
    imgUrl: 'https://images.unsplash.com/photo-1695568180070-8b5acead5cf4?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Home Tiffins',
    imgUrl: 'https://images.unsplash.com/photo-1680993032090-1ef7ea9b51e5?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Homestyle healthy meals, daily tiffins & lunchboxes',
    features: ['Weekly rotating menu', 'Monthly meal subscription', 'Trial meal order button', 'Dietary preference tags']
  },
  {
    id: 'food-catering',
    templateNumber: 405,
    name: 'Gourmet Catering Services vCard',
    category: 'Food Business',
    subCategory: 'Catering Services',
    actionSubtitle: 'Wedding Catering',
    imgUrl: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Pure Ghee Sweets',
    imgUrl: 'https://images.unsplash.com/photo-1758910536889-43ce7b3199fd?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Mithai, dry fruits, gift hampers & savory snacks',
    features: ['Festive sweet box catalogs', 'Bulk corporate gifting orders', 'Same day home delivery', 'Pure ghee guarantee']
  },
  {
    id: 'food-cafe',
    templateNumber: 407,
    name: 'Artisan Cafe, Specialty Coffee Bar & Italian Bistro vCard',
    category: 'Food Business',
    subCategory: 'Cafes & Bistros',
    actionSubtitle: 'Artisan Cafe & Coffee',
    imgUrl: 'https://images.unsplash.com/photo-1588644525273-f37b60d78512?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '☕ Popular Cafe',
    tagline: 'Specialty pour-overs, sourdough wood-fired pizzas, artisanal pasta & all-day European breakfast',
    features: ['Interactive espresso & cafe brunch menu', 'Direct table-side QR digital ordering', 'Advance cafe table & party booking', 'WhatsApp parcel takeaway cart']
  },
  {
    id: 'food-biryani',
    templateNumber: 408,
    name: 'Royal Biryani House, Mughlai Darbar & Kebab Grills vCard',
    category: 'Food Business',
    subCategory: 'Biryani & Mughlai Dining',
    actionSubtitle: 'Royal Dum Biryani',
    imgUrl: 'https://images.unsplash.com/photo-1691171047462-66025ecd5efc?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🔥 Hyderabadi Royal',
    tagline: 'Authentic clay-pot dum biryanis, succulent galouti kebabs, rumali rotis & shahi tukda',
    features: ['Kacchi dum biryani portion guide & photos', 'Bulk party handi pre-order with WhatsApp cart', 'Dine-in family cabin & dastarkhwan reservation', 'FSSAI hygienic kitchen certificate']
  },
  {
    id: 'food-fastfood',
    templateNumber: 409,
    name: 'Gourmet Burger Shack, Loaded Wraps & Crispy Fried Chicken vCard',
    category: 'Food Business',
    subCategory: 'Fast Food & Quick Service',
    actionSubtitle: 'Burgers & Wraps',
    imgUrl: 'https://images.unsplash.com/photo-1732519970445-8f2d6998961f?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🍔 Smashed Burgers',
    tagline: 'Smoked brioche burgers, loaded peri-peri fries, crunchy fried chicken & thick shakes',
    features: ['Combo meals with custom dip selectors', 'Quick drive-thru pickup & takeaway booking', 'Instant WhatsApp order invoice generator', 'Contactless UPI payment desk']
  },
  {
    id: 'food-icecream',
    templateNumber: 410,
    name: 'Artisan Gelato, Ice Cream & Thick Shake Parlour vCard',
    category: 'Food Business',
    subCategory: 'Ice Cream & Desserts',
    actionSubtitle: 'Artisan Gelato',
    imgUrl: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🍨 Natural Gelato',
    tagline: 'Italian handcrafted gelato scoops, bubble waffles, thick milkshakes & sundae towers',
    features: ['Seasonal fresh fruit flavor radar', 'Party tub pre-booking & dry ice delivery pack', 'Sundae builder with custom topping add-ons', 'Live store location & WhatsApp delivery']
  },
  {
    id: 'food-pub',
    templateNumber: 411,
    name: 'Rooftop Craft Brewery, Sunset Lounge & Taproom vCard',
    category: 'Food Business',
    subCategory: 'Breweries & Rooftop Lounges',
    actionSubtitle: 'Rooftop Lounge',
    imgUrl: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🍸 Rooftop Lounge',
    tagline: 'Fresh microbrewery craft beers, woodfire appetizers, sunset cocktails & live DJ gigs',
    features: ['Live tap beers & craft cocktail menu with ABV', 'VIP sunset table & couple candlelight reservation', 'Weekend live band entry pass & guestlist', 'Uber/cab valet pickup assistance']
  },
  {
    id: 'food-dhaba',
    templateNumber: 412,
    name: 'Highway Grand Punjabi Dhaba & Charpai Tandoor Hut vCard',
    category: 'Food Business',
    subCategory: 'Dhaba & North Indian Dining',
    actionSubtitle: 'Highway Dhaba',
    imgUrl: 'https://images.unsplash.com/photo-1756821753226-c0fc88056cf7?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🫓 Desi Makhan Dhaba',
    tagline: 'Amritsari kulchas, sarson ka saag with makki roti, dal makhani in desi ghee & tall lassi patialas',
    features: ['Authentic dhaba tandoor menu & thali combos', 'Highway pitstop family charpai seating booking', 'Highway bus tour & family catering orders', 'Clean highway washrooms & 24/7 dining']
  },
  {
    id: 'food-southindian',
    templateNumber: 413,
    name: 'Authentic South Indian Tiffin Room & Pure Veg Udupi vCard',
    category: 'Food Business',
    subCategory: 'Pure Veg & Tiffin Rooms',
    actionSubtitle: 'Pure Veg Udupi',
    imgUrl: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '🟢 100% Pure Veg',
    tagline: 'Crispy ghee podi dosas, button idlis, filter coffee degree, vada sambar & traditional meals',
    features: ['Morning tiffin & evening snack live menus', 'Filter coffee & podi jar retail counter', 'Quick self-service token & takeaway desk', 'Satvik & pure vegetarian ghee guarantee']
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
    actionSubtitle: 'Book Now',
    imgUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Dental Implants',
    imgUrl: 'https://images.unsplash.com/photo-1681939278218-a755fb2bf2d3?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Root canals, aligners, teeth whitening & smile design',
    features: ['Dental treatment list', 'Before/after smile transformations', 'Direct consultation booking', 'Painless dentistry badge']
  },
  {
    id: 'health-physio',
    templateNumber: 503,
    name: 'Physiotherapy & Rehab vCard',
    category: 'Healthcare',
    subCategory: 'Physiotherapy',
    actionSubtitle: 'Rehab & Mobility',
    imgUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Sports rehab, posture correction & pain management',
    features: ['Home visit service booking', 'Exercise video guides', 'Pain assessment form', 'Certified therapists info']
  },
  {
    id: 'health-diagnostic',
    templateNumber: 504,
    name: 'Diagnostic & Pathology Lab vCard',
    category: 'Healthcare',
    subCategory: 'Diagnostic Centres',
    actionSubtitle: 'Pathology Tests',
    imgUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Blood tests, health checkups, MRI/CT scans & X-rays',
    features: ['Full body checkup packages', 'Book home blood collection', 'Download test reports link', 'NABL accredited badge']
  },
  {
    id: 'health-pharmacy',
    templateNumber: 505,
    name: 'Pharmacy & Medical Store vCard',
    category: 'Healthcare',
    subCategory: 'Pharmacies',
    actionSubtitle: '24/7 Pharmacy',
    imgUrl: 'https://images.unsplash.com/photo-1655913197692-012897652d13?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: '24/7 medicines, surgical supplies & wellness products',
    features: ['Upload prescription on WhatsApp', 'Fast medicine home delivery', 'Refill reminder alerts', 'Store location map']
  },
  {
    id: 'health-diet',
    templateNumber: 506,
    name: 'Nutrition & Diet Consultant vCard',
    category: 'Healthcare',
    subCategory: 'Nutrition/Diet Consultants',
    actionSubtitle: 'Diet & Wellness',
    imgUrl: 'https://images.unsplash.com/photo-1656236607879-cd489955e17b?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Weight loss, PCOS management, diabetes & sports nutrition',
    features: ['Customized meal plan download', '1-on-1 weekly consultation', 'Client transformation stories', 'BMI calculator']
  },
  {
    id: 'vcard36',
    templateNumber: 507,
    name: 'Dr. Arvind Swaminathan - Consultant Orthopedic Surgeon',
    category: 'Healthcare',
    subCategory: 'Doctors & Orthopedic Surgeons',
    actionSubtitle: 'Top Specialists',
    imgUrl: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Chief Consultant',
    tagline: 'Minimally invasive arthroscopic surgeries & regenerative sports medicine',
    features: ['Specialist consultation slots', 'Surgical procedures catalog', 'Hospital affiliations', 'Emergency contact dialer']
  },
  {
    id: 'vcard13',
    templateNumber: 508,
    name: 'Apex Medical Center - Specialist OPD Clinic',
    category: 'Healthcare',
    subCategory: 'Clinics & Multi-Specialty',
    actionSubtitle: 'Super Specialty',
    imgUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'NABH Accredited',
    tagline: 'Multi-specialty outpatient clinics, diagnostic laboratory & pharmacy',
    features: ['Instant doctor consultation booking', 'Comprehensive health checkup packages', 'Digital prescription sync', 'Clinic directions & parking']
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
    actionSubtitle: 'Admissions Open',
    imgUrl: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Personal Tuition',
    imgUrl: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Maths, science, board exams & home tutors',
    features: ['Batch timing & fees chart', 'Book free demo class', 'Student test scores', 'WhatsApp parent helpline']
  },
  {
    id: 'edu-coaching',
    templateNumber: 603,
    name: 'Coaching Institute (IIT/NEET/UPSC) vCard',
    category: 'Education',
    subCategory: 'Coaching Institutes',
    actionSubtitle: 'IIT / NEET Rankers',
    imgUrl: 'https://images.unsplash.com/photo-1709290749293-c6152a187b14?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Tech Bootcamps',
    imgUrl: 'https://images.unsplash.com/photo-1604177091072-b7b677a077f6?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Coding, AI, hardware, graphic design & vocational skills',
    features: ['Course curriculum syllabus', '100% placement stats', 'Enroll in next batch form', 'Student project demos']
  },
  {
    id: 'edu-digital',
    templateNumber: 605,
    name: 'Digital Marketing Trainer vCard',
    category: 'Education',
    subCategory: 'Digital Marketing Trainers',
    actionSubtitle: 'Digital Marketing',
    imgUrl: 'https://images.unsplash.com/photo-1623741860335-2701bd6c991a?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'SEO, Google Ads, Meta Ads & affiliate marketing coaching',
    features: ['Live agency case studies', 'Certifications guide', 'Book masterclass seat', 'LinkedIn & YouTube channel']
  },
  {
    id: 'edu-english',
    templateNumber: 606,
    name: 'Spoken English & IELTS Institute vCard',
    category: 'Education',
    subCategory: 'Spoken English Institutes',
    actionSubtitle: 'IELTS 8+ Band',
    imgUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'IELTS, TOEFL, communication skills & public speaking',
    features: ['Band score guarantee chart', 'Free level assessment quiz', 'Study abroad counseling', 'Online & offline batches']
  },

  // ==========================================
  // 7. 🛠️ HOME & PROFESSIONAL SERVICES
  // ==========================================
  {
    id: 'home-interior',
    templateNumber: 701,
    name: 'Interior Designer & Modular Kitchens Mini-Website',
    category: 'Interior Design',
    subCategory: 'Interior Designers & Architects',
    actionSubtitle: 'Modular Kitchens',
    imgUrl: 'https://images.unsplash.com/photo-1745429523617-0d837856ca35?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '⭐ Flagship 3D Studio',
    tagline: 'Turnkey residential interiors, modular homes & offices with 3D Lookbook',
    features: [
      'Interactive 3D Lookbook and space transformations',
      'Living & dining, modular kitchen, and master suite galleries',
      'Dynamic interior cost estimator & instant BOQ quote',
      'IIID certified designer credentials & 10-year warranty guarantee',
      'Before & After interactive split slider',
      'Doorstep 3D consultation appointment booking'
    ]
  },
  {
    id: 'home-architect',
    templateNumber: 702,
    name: 'Architect & Structural Engineer vCard',
    category: 'Interior Design',
    subCategory: 'Architects & Blueprints',
    actionSubtitle: 'Architecture & 3D',
    imgUrl: 'https://images.unsplash.com/photo-1783456309503-6d0bb120bb9c?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Modern house elevations, blueprints & municipal sanctions',
    features: ['Blueprint portfolio gallery', 'Site inspection booking', 'Sustainable architecture designs', 'Client reviews']
  },
  {
    id: 'vcard38',
    templateNumber: 703,
    name: 'Vistara Architecture & Luxury Design Studio',
    category: 'Interior Design',
    subCategory: 'Interior Architecture & Fitouts',
    actionSubtitle: 'Luxury Interiors',
    imgUrl: 'https://images.unsplash.com/photo-1682662046610-fbdb3db4bd74?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Luxury Studio',
    tagline: 'Architectural space planning, luxury fitouts & 3D renderings',
    features: ['3D architectural elevations', 'Turnkey space planning', 'Material & swatch consultations', 'Client project portfolio']
  },
  {
    id: 'home-plumber',
    templateNumber: 703,
    name: 'Plumbing Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'Plumbers',
    actionSubtitle: '24/7 Plumber',
    imgUrl: 'https://images.unsplash.com/photo-1659353588842-891391e6fcd4?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Emergency pipe leaks, bathroom fittings & motor repair',
    features: ['1-Tap emergency phone dialer', 'Transparent rate card', '30-minute door arrival', 'Service warranty']
  },
  {
    id: 'home-electrician',
    templateNumber: 704,
    name: 'Certified Electrician vCard',
    category: 'Home & Professional Services',
    subCategory: 'Electricians',
    actionSubtitle: 'Get Nearest Vendor',
    imgUrl: 'https://images.unsplash.com/photo-1641194298727-fa6e5401bf1b?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Home wiring, inverter setups, smart switches & MCB repairs',
    features: ['Instant technician call', 'Electrical safety audit', 'Pricing by job type', 'Google verified badge']
  },
  {
    id: 'home-ac',
    templateNumber: 705,
    name: 'AC Repair & HVAC Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'AC Services',
    actionSubtitle: 'AC Repair & Gas',
    imgUrl: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'AC installation, gas refilling, jet cleaning & AMC plans',
    features: ['Book AC service slot', 'Annual Maintenance Contract (AMC)', 'Split & window rates', 'Fast response guarantee']
  },
  {
    id: 'home-pest',
    templateNumber: 706,
    name: 'Pest Control Services vCard',
    category: 'Home & Professional Services',
    subCategory: 'Pest Control',
    actionSubtitle: 'Pest Extermination',
    imgUrl: 'https://images.unsplash.com/photo-1659353587424-f3f893a145d2?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Termite, cockroach, rodent & bed bug treatment',
    features: ['Odorless herbal treatments', '1-year warranty contract', 'Commercial & home booking', 'Govt approved chemicals']
  },
  {
    id: 'home-cleaning',
    templateNumber: 707,
    name: 'Deep Cleaning & Sanitization vCard',
    category: 'Home & Professional Services',
    subCategory: 'Cleaning Services',
    actionSubtitle: 'Deep Sanitization',
    imgUrl: 'https://images.unsplash.com/photo-1745429523637-60f5986cc1db?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Full house deep cleaning, sofa shampooing & kitchen sanitization',
    features: ['Cleaning checklists', 'Before/after transformation photos', 'Instant WhatsApp booking', 'Trained staff badge']
  },
  {
    id: 'home-packers',
    templateNumber: 708,
    name: 'Packers & Movers vCard',
    category: 'Home & Professional Services',
    subCategory: 'Packers & Movers',
    actionSubtitle: 'Packers & Movers',
    imgUrl: 'https://images.unsplash.com/photo-1659353590903-972270737d60?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Best Car Deals',
    imgUrl: 'https://images.unsplash.com/photo-1769961236211-3046cbcc474d?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Certified Used Cars',
    imgUrl: 'https://images.unsplash.com/photo-1677163488586-e70b17e59aab?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Superbikes & Scooters',
    imgUrl: 'https://images.unsplash.com/photo-1530248809527-ee069dc8373a?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Sports bikes, commuter motorcycles & electric scooters',
    features: ['Bike models & on-road prices', 'Test ride booking', 'Accessories & riding gear catalog', 'Insurance renewals']
  },
  {
    id: 'auto-rentals',
    templateNumber: 804,
    name: 'Self-Drive & Luxury Car Rentals vCard',
    category: 'Automobile',
    subCategory: 'Car Rentals',
    actionSubtitle: 'Self-Drive & Luxury',
    imgUrl: 'https://images.unsplash.com/photo-1769961233314-fd5fb4c5b312?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Daily self-drive cars, wedding luxury fleets & airport cabs',
    features: ['Fleet photos & daily tariffs', 'Instant WhatsApp reservation', 'Unlimited km packages', 'Doorstep delivery']
  },
  {
    id: 'auto-detailing',
    templateNumber: 805,
    name: 'Car Detailing & Ceramic Coating vCard',
    category: 'Automobile',
    subCategory: 'Car Detailing',
    actionSubtitle: 'Ceramic Coating',
    imgUrl: 'https://images.unsplash.com/photo-1677163488008-c30a5dc7eeb5?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Audio & Dashcams',
    imgUrl: 'https://images.unsplash.com/photo-1648204894242-ca89818edc26?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Book Photo Shoot',
    imgUrl: 'https://images.unsplash.com/photo-1772127822552-ce9ef537bdcf?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Luxury Weddings',
    imgUrl: 'https://images.unsplash.com/photo-1744804298612-fa9f2ef0e125?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Corporate Galas',
    imgUrl: 'https://images.unsplash.com/photo-1774024050561-4ee0148c8526?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Conferences, product launches, concerts & stage setups',
    features: ['Event portfolio videos', 'Audio-visual AV rental spec', 'Corporate client logos', 'Direct RFP quote form']
  },
  {
    id: 'event-decorator',
    templateNumber: 904,
    name: 'Stage, Floral & Balloon Decorators vCard',
    category: 'Events & Creative',
    subCategory: 'Decorators',
    actionSubtitle: 'Stage & Mandap',
    imgUrl: 'https://images.unsplash.com/photo-1774024051129-90d3fb8e30fe?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Birthday themes, mandap decor, flower backdrops & lighting',
    features: ['Decor themes lookbook', 'Package pricing tiers', 'Check date availability', 'WhatsApp design selection']
  },
  {
    id: 'event-dj',
    templateNumber: 905,
    name: 'DJ, Sound & Light Artist vCard',
    category: 'Events & Creative',
    subCategory: 'DJs',
    actionSubtitle: 'Sound & Lights',
    imgUrl: 'https://images.unsplash.com/photo-1621801306185-8c0ccf9c8eb8?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Wedding sangeet, club nights, corporate DJ & sound rigs',
    features: ['SoundCloud / Spotify mixes', 'Event gig booking slot', 'Live stage setup photos', 'Instagram video reels']
  },
  {
    id: 'event-mehendi',
    templateNumber: 906,
    name: 'Bridal Mehendi Artist vCard',
    category: 'Events & Creative',
    subCategory: 'Mehendi Artists',
    actionSubtitle: 'Bridal Henna',
    imgUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Artisan',
    tagline: 'Arabic, Rajasthani, portrait & organic bridal henna',
    features: ['Henna design lookbook', 'Bridal package rates', 'Advance date booking form', '100% organic henna badge']
  },
  {
    id: 'vcard34',
    templateNumber: 907,
    name: 'Aarav Mehta - Lumière Visual Studio & Cinema',
    category: 'Events & Creative',
    subCategory: 'Photography & Cinematography',
    actionSubtitle: '4K Cinema Studio',
    imgUrl: 'https://images.unsplash.com/photo-1772127822525-7eda37383b9f?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Cinematographer',
    tagline: 'Lead photographer & cinematographer for destination weddings & editorial',
    features: ['Cinematic showreels', 'Editorial portfolio gallery', 'Wedding calendar check', 'Instant consultation chat']
  },
  {
    id: 'vcard37',
    templateNumber: 908,
    name: 'Pushpa Utsav - Luxury Floral & Mandap Decor Studio',
    category: 'Events & Creative',
    subCategory: 'Floral & Botanical Decor',
    actionSubtitle: 'Floral Artistry',
    imgUrl: 'https://images.unsplash.com/photo-1772127822562-a898d9f5733c?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Luxury Florals',
    tagline: 'Botanical installations, bespoke floral arrangements & wedding decor',
    features: ['Floral lookbook & arrangements', 'Event styling packages', 'Direct WhatsApp ordering', 'Care & delivery guides']
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
    actionSubtitle: 'Quick Tax Quotes',
    imgUrl: 'https://images.unsplash.com/photo-1771244688590-1e481dba1b5a?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Legal Chambers',
    imgUrl: 'https://images.unsplash.com/photo-1659355894099-b2c2b2884322?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Financial Shield',
    imgUrl: 'https://images.unsplash.com/photo-1650110002977-3ee8cc5eac91?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Term life insurance, health mediclaim & motor policies',
    features: ['Instant premium quote calculator', 'Claim assistance hotline', 'Policy comparison charts', 'WhatsApp instant consult']
  },
  {
    id: 'prof-financial',
    templateNumber: 1004,
    name: 'Financial & Wealth Consultant vCard',
    category: 'Professional Services',
    subCategory: 'Financial Consultants',
    actionSubtitle: 'Wealth Advisory',
    imgUrl: 'https://images.unsplash.com/flagged/photo-1576485436509-a7d286952b65?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Mutual funds, SIP, retirement planning & wealth management',
    features: ['SIP wealth growth calculator', 'Book portfolio review session', 'SEBI registered advisor info', 'Client testimonials']
  },
  {
    id: 'prof-business',
    templateNumber: 1005,
    name: 'Business & Startup Consultant vCard',
    category: 'Professional Services',
    subCategory: 'Business Consultants',
    actionSubtitle: 'Scale Your Biz',
    imgUrl: 'https://images.unsplash.com/photo-1626063240213-c629ae4ef34c?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Hire Top Talent',
    imgUrl: 'https://images.unsplash.com/photo-1762341116897-921e2a52f7ff?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Executive search, IT staffing, payroll & compliance',
    features: ['Submit job opening form', 'Upload resume portal', 'Staffing service tiers', 'Candidate placement stats']
  },
  {
    id: 'vcard16',
    templateNumber: 1007,
    name: 'Harshvardhan Reddy - Corporate Legal Advocate',
    category: 'Professional Services',
    subCategory: 'Law & Legal Counsel',
    actionSubtitle: 'Corporate Counsel',
    imgUrl: 'https://images.unsplash.com/photo-1659355894117-0ae6f8f28d0b?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Legal Counsel',
    tagline: 'Corporate litigation, intellectual property, contracts & arbitration',
    features: ['Practice areas & retainers', 'Bar council credentials', 'Legal consultation scheduling', 'Confidential brief submission']
  },
  {
    id: 'vcard39',
    templateNumber: 1008,
    name: 'Rohit Madhav - Global Press & Media Bureau',
    category: 'Professional Services',
    subCategory: 'Media & Journalists',
    actionSubtitle: 'Media & Press',
    imgUrl: 'https://images.unsplash.com/photo-1656221009898-694595f2119b?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Senior Correspondent',
    tagline: 'Broadcast media, press releases, interviews & investigative reporting',
    features: ['Press credentials & accreditation', 'Published articles archive', 'Media request booking', 'Digital press pass']
  },
  {
    id: 'vcard43',
    templateNumber: 1009,
    name: 'Executive Managing Director & Boardroom CXO',
    category: 'Professional Services',
    subCategory: 'Executives & Founders',
    actionSubtitle: 'Executive CXO',
    imgUrl: 'https://images.unsplash.com/photo-1656221009909-4f202547cd94?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: 'Executive Suite',
    tagline: 'Managing director credentials, advisory board & keynotes',
    features: ['Executive portfolio & bio', 'Media appearances & awards', 'Boardroom appointment request', 'Direct executive line']
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
    actionSubtitle: 'Mobiles & Gadgets',
    imgUrl: 'https://images.unsplash.com/photo-1780504862873-5f4ff5c322e9?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Smart Home Tech',
    imgUrl: 'https://images.unsplash.com/photo-1561911758-e6495b60d8a5?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Smart TVs, refrigerators, washing machines & audio',
    features: ['Festive deal catalog', 'Brand warranty info', 'Free home delivery booking', 'Exchange old appliance offer']
  },
  {
    id: 'retail-furniture',
    templateNumber: 1103,
    name: 'Furniture Showroom & Woodwork vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Furniture',
    actionSubtitle: 'Luxury Furniture',
    imgUrl: 'https://images.unsplash.com/photo-1745301558339-44eb3217d5da?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Gold & Diamonds',
    imgUrl: 'https://images.unsplash.com/photo-1640183298005-3a4497cc6a37?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Custom Keepsakes',
    imgUrl: 'https://images.unsplash.com/photo-1782033032439-a2c656ca2f59?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Custom photo frames, mugs, birthday toys & corporate hampers',
    features: ['Customized product ordering', 'Gift hamper catalog', 'Same-day gift delivery', 'WhatsApp order chat']
  },
  {
    id: 'retail-grocery',
    templateNumber: 1106,
    name: 'Supermarket & Organic Grocery vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Grocery Stores',
    actionSubtitle: 'Organic Supermarket',
    imgUrl: 'https://images.unsplash.com/photo-1559561724-732dbca7be1e?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Daily essentials, fresh vegetables, organic pulses & dairy',
    features: ['Send grocery list on WhatsApp', 'Free 30-min home delivery', 'Weekly discount deals', 'Loyalty card program']
  },
  {
    id: 'retail-hardware',
    templateNumber: 1107,
    name: 'Hardware, Paints & Sanitary Store vCard',
    category: 'Retail & Local Shops',
    subCategory: 'Hardware Shops',
    actionSubtitle: 'Hardware & Sanitary',
    imgUrl: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Visa & Air Tickets',
    imgUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Holiday Packages',
    imgUrl: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: '5-Star Suites',
    imgUrl: 'https://images.unsplash.com/photo-1661924326425-c14a6426d989?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Nature Getaways',
    imgUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&h=1000&q=85',
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
    actionSubtitle: 'Heritage Homestays',
    imgUrl: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&h=1000&q=85',
    tagline: 'Cozy rooms in hills, homemade authentic meals & nature walks',
    features: ['Homestay photo gallery', 'Local activities list', 'Instant host WhatsApp chat', 'Verified guest reviews']
  },
  {
    id: 'travel-taxi',
    templateNumber: 1206,
    name: '24/7 Outstation Taxi & Cab Service vCard',
    category: 'Travel & Hospitality',
    subCategory: 'Cab/Taxi Services',
    actionSubtitle: '24/7 Outstation Cabs',
    imgUrl: 'https://images.unsplash.com/photo-1656221010175-bcfeadcb6017?auto=format&fit=crop&w=800&h=1000&q=85',
    badge: '24/7 Fast',
    tagline: 'Outstation cabs, airport drop, Innova/Sedan rentals',
    features: ['One-way & roundtrip fare chart', '1-Tap instant cab call', 'Sedan/SUV/Innova fleet', 'Clean sanitised cars']
  }
];

export function normalizeCategory(cat?: string | null, templateId?: string | null): VCardCategory {
  if (!cat && templateId) {
    const found = VCARD_TEMPLATES_CATALOG.find(t => t.id === templateId);
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
  const tpl = VCARD_TEMPLATES_CATALOG.find(t => t.id === templateId);

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
    { id: 'trav-resort', title: 'Luxury Resort & Pool Villas', icon: '🏝️', slug: 'luxury-resort', name: 'Kavita Menon', company: 'Palm Breeze Luxury Resort & Spa', desig: 'General Manager' },
    { id: 'trav-cab', title: '24/7 Airport & Outstation Cabs', icon: '🚕', slug: 'cab-services', name: 'Satish Goud', company: 'CityExpress Airport Cabs & Rentals', desig: 'Fleet Director' },
    { id: 'trav-homestay', title: 'Heritage Plantation Homestay', icon: '🏡', slug: 'homestay', name: 'Bipin Thomas', company: 'Misty Pines Heritage Homestay', desig: 'Host & Property Owner' },
  ]
};
