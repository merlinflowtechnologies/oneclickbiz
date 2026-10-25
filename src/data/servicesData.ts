export interface ServiceDetailItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  iconImage: string;
  bgGrad: string;
  borderColor: string;
  accentColor: string;
  about: {
    overview: string;
    description: string;
    valueProposition: string;
  };
  howToUse: {
    step: number;
    title: string;
    description: string;
  }[];
  keyCapabilities: {
    title: string;
    desc: string;
  }[];
  targetAudience: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  referenceImage: string;
  referenceCaption: string;
  demoUrl: string;
  ctaText: string;
  ctaUrl: string;
}

export const SERVICES_CATALOG_24: Record<string, ServiceDetailItem> = {
  'whatsapp-store': {
    id: 'whatsapp-store',
    name: 'WhatsApp Store',
    tagline: 'Turn 2 Billion WhatsApp Users Into Direct Paying Customers With 0% Commission',
    category: 'E-Commerce & Quick Orders',
    badge: 'Most Popular',
    iconImage: '/services/whatsapp-store.png?v=7',
    bgGrad: 'from-emerald-50 to-green-100/60',
    borderColor: 'border-emerald-200/70',
    accentColor: '#10B981',
    about: {
      overview: 'OneClickBiz WhatsApp Store empowers retail shops, boutiques, bakeries, wholesalers, and home entrepreneurs to sell products directly through WhatsApp chats without paying 15-30% marketplace commissions to Swiggy, Zomato, Amazon, or Flipkart.',
      description: 'Your customers browse a clean digital catalog with high-resolution photos, variants (sizes, colors, weights), and real-time prices. They add items to their smart cart and click "Order via WhatsApp". An organized, pre-formatted order summary with item names, quantities, total bill amount, customer address, and payment method is automatically sent straight to your WhatsApp inbox.',
      valueProposition: 'Zero commission, zero middlemen. You get direct customer relationships, direct bank payments via UPI, and 5x faster repeat orders from happy customers.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Upload Products & Catalog',
        description: 'Add your product photos, descriptions, MRP, discount prices, and inventory stock in your OneClickBiz dashboard.'
      },
      {
        step: 2,
        title: 'Configure Your WhatsApp Business Number',
        description: 'Link your registered WhatsApp or WhatsApp Business mobile number to receive instant incoming order notifications.'
      },
      {
        step: 3,
        title: 'Share Your Store Link & QR Code',
        description: 'Put your store link in your Instagram bio, WhatsApp status, Google Business Profile, and display your printed QR standee at your counter.'
      },
      {
        step: 4,
        title: 'Receive Pre-Formatted Orders & Get Paid',
        description: 'Customers select products and tap "Order on WhatsApp". You receive an instant order summary and collect payments directly via UPI/cash.'
      }
    ],
    keyCapabilities: [
      { title: 'Zero Marketplace Commission', desc: 'Keep 100% of your hard-earned revenue on every order.' },
      { title: 'Multi-Variant Support', desc: 'Offer sizes, colors, flavors, and quantity options effortlessly.' },
      { title: 'Instant UPI QR Checkout', desc: 'Collect instant settlements via GPay, PhonePe, Paytm, or COD.' },
      { title: 'Automated Order Receipts', desc: 'Generate neat WhatsApp bills with customer name & delivery address.' }
    ],
    targetAudience: ['Clothing Boutiques', 'Bakeries & Cafes', 'Jewellery Stores', 'Organic Grocery', 'Home Cheffing', 'Electronics'],
    metrics: [
      { label: 'Platform Commission', value: '0%' },
      { label: 'Repeat Order Rate', value: '3.8x' },
      { label: 'Order Processing Time', value: '< 30s' }
    ],
    referenceImage: '/services/references/whatsapp-store.jpg?v=10',
    referenceCaption: 'Customer browsing mobile catalog, adding items to cart, and placing direct WhatsApp order with automatic item breakdown.',
    demoUrl: '#templates',
    ctaText: 'Launch Your WhatsApp Store Now',
    ctaUrl: '/signup'
  },

  'personal-profile': {
    id: 'personal-profile',
    name: 'Personal Profile',
    tagline: 'Your Modern Digital Identity & Executive vCard with 1-Tap Save to Contacts',
    category: 'Identity & Networking',
    badge: 'Essential',
    iconImage: '/services/personal-profile.png?v=7',
    bgGrad: 'from-blue-50 to-indigo-100/60',
    borderColor: 'border-blue-200/70',
    accentColor: '#174BFF',
    about: {
      overview: 'Replace outdated paper cards with an interactive, verified digital business identity. Personal Profile acts as your living digital persona, consolidating your photo, bio, company role, phone numbers, email, WhatsApp, and social profiles in a sleek, mobile-optimized format.',
      description: 'When you meet clients, investors, or partners, they scan your QR code or tap your NFC card. In one click, your full contact card is saved into their phone address book without typing a single digit. Your profile remains live and editable 24/7.',
      valueProposition: 'Never run out of business cards again. Always leave an unforgettable first impression and guarantee your contact details reach their phone address book.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Build Your Digital Profile',
        description: 'Upload your professional headshot, company logo, designation, and write an engaging elevator bio.'
      },
      {
        step: 2,
        title: 'Add Contact & Social Links',
        description: 'Plug in your phone, WhatsApp, LinkedIn, Instagram, website, and portfolio documents.'
      },
      {
        step: 3,
        title: 'Select a High-Converting Theme',
        description: 'Choose from executive dark, modern glass, or clean corporate design presets.'
      },
      {
        step: 4,
        title: 'Share Digitally or via NFC Card',
        description: 'Share your vanity URL (oneclickbiz.in/v/yourname) or tap your physical NFC card onto any smartphone.'
      }
    ],
    keyCapabilities: [
      { title: '1-Tap "Add to Contacts"', desc: 'Clients download your full vCard directly into iOS & Android contacts.' },
      { title: 'Dynamic Real-Time Edits', desc: 'Changed phone number or job? Update once, everywhere changes instantly.' },
      { title: 'Clickable Action Hub', desc: 'Direct WhatsApp chat, call, email, Google Maps directions, and UPI.' },
      { title: 'Rich Analytics', desc: 'Track how many people viewed your card, tapped your links, and saved contacts.' }
    ],
    targetAudience: ['Founders & CEOs', 'Sales Executives', 'Real Estate Agents', 'Doctors & Lawyers', 'Consultants', 'Freelancers'],
    metrics: [
      { label: 'Save Contact Rate', value: '88%' },
      { label: 'Paper Saved / Year', value: '1,000+' },
      { label: 'Update Latency', value: 'Instant' }
    ],
    referenceImage: '/services/references/personal-profile.jpg?v=10',
    referenceCaption: 'Executive digital business card mockup with 1-tap "Save Contact to Phone", verified credentials, and quick action hub.',
    demoUrl: '/v/kishore',
    ctaText: 'Create Your Personal Profile',
    ctaUrl: '/signup'
  },

  'mini-website': {
    id: 'mini-website',
    name: 'Mini Website',
    tagline: 'High-Converting, Lightning-Fast Mobile Websites Built in Under 5 Minutes',
    category: 'Web & Online Presence',
    badge: 'High Impact',
    iconImage: '/services/mini-website.png?v=7',
    bgGrad: 'from-purple-50 to-violet-100/60',
    borderColor: 'border-purple-200/70',
    accentColor: '#8B5CF6',
    about: {
      overview: 'Traditional websites cost ₹25,000+ to build, take weeks, require expensive developers, and often look slow and cluttered on smartphones. OneClickBiz Mini Websites deliver stunning, mobile-first websites in minutes with zero coding.',
      description: 'Each mini-website is engineered for maximum conversion. It includes a hero showcase, about section, service offerings, photo gallery, client testimonials, opening hours, Google Maps directions, and 1-tap booking or inquiry buttons.',
      valueProposition: 'Get a website that loads in under 1 second, looks gorgeous on mobile, and turns casual visitors into direct customer inquiries and phone calls.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Choose Your Industry Template',
        description: 'Select from 100+ tailored presets for salons, clinics, restaurants, law firms, real estate, gyms, and more.'
      },
      {
        step: 2,
        title: 'Fill Your Business Details',
        description: 'Type your business name, services, pricing, business hours, and upload your branding photos.'
      },
      {
        step: 3,
        title: 'Enable Interactive Modules',
        description: 'Turn on appointment booking, customer feedback reviews, inquiry forms, and WhatsApp buttons.'
      },
      {
        step: 4,
        title: 'Publish & Connect Custom Domain',
        description: 'Go live instantly with your free OneClickBiz link or link your own custom domain (e.g. yourbusiness.com).'
      }
    ],
    keyCapabilities: [
      { title: 'Sub-Second Page Load Speed', desc: 'Blazing fast CDN ensures visitors never bounce due to lag.' },
      { title: 'SEO Optimized Structure', desc: 'Rank higher on Google searches for local business queries.' },
      { title: 'Interactive Inquiry Form', desc: 'Receive instant lead alerts on your dashboard and WhatsApp.' },
      { title: 'Zero Maintenance Cost', desc: 'Includes free SSL security certificate, hosting, and automatic cloud backups.' }
    ],
    targetAudience: ['Salons & Spas', 'Dental & Healthcare Clinics', 'Gyms & Yoga Studios', 'Interior Designers', 'Coaching Institutes'],
    metrics: [
      { label: 'Page Load Speed', value: '0.6s' },
      { label: 'Mobile Conversion', value: '+42%' },
      { label: 'Setup Time', value: '5 Mins' }
    ],
    referenceImage: '/services/references/mini-website.jpg?v=10',
    referenceCaption: 'Responsive mini-website displaying verified reviews, service menu, and 1-tap booking on laptop and mobile.',
    demoUrl: '#templates',
    ctaText: 'Build Your Mini Website',
    ctaUrl: '/signup'
  },

  'e-commerce': {
    id: 'e-commerce',
    name: 'E-commerce',
    tagline: 'Complete Online Storefront with Shopping Cart, Inventory & Digital Payments',
    category: 'E-Commerce & Retail',
    badge: 'High Conversion',
    iconImage: '/services/e-commerce.png?v=7',
    bgGrad: 'from-rose-50 to-pink-100/60',
    borderColor: 'border-rose-200/70',
    accentColor: '#F43F5E',
    about: {
      overview: 'Launch a full-fledged, modern e-commerce online store without the complexity and hefty monthly fees of Shopify or WooCommerce. Everything you need to sell physical goods, digital products, or merchandise online.',
      description: 'Equipped with smart product filters, category navigation, discount promo coupons, stock management, instant online payments (UPI, credit/debit cards, net banking), and automatic PDF order invoices for every purchase.',
      valueProposition: 'A friction-free shopping experience for your buyers and a simple, intuitive backend management system for you to track orders and process shipments.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Set Up Your Store Profile',
        description: 'Set your currency, store policies, delivery zones, shipping charges, and store tax rules.'
      },
      {
        step: 2,
        title: 'List Your Products & Collections',
        description: 'Organize items into collections, upload multi-angle photos, and set promotional discount badges.'
      },
      {
        step: 3,
        title: 'Connect Payment Gateways',
        description: 'Enable instant payment processing with Cashfree, Razorpay, UPI QR, and Cash on Delivery.'
      },
      {
        step: 4,
        title: 'Manage Orders & Fulfillment',
        description: 'Receive real-time order alerts, update shipping status, and send automated tracking updates to buyers.'
      }
    ],
    keyCapabilities: [
      { title: 'Unified Smart Shopping Bag', desc: 'Seamless slide-over cart with real-time tax and discount calculation.' },
      { title: 'Promo Codes & Coupon Engine', desc: 'Create festive discounts, percentage offers, and minimum order vouchers.' },
      { title: 'Automated Invoice Generator', desc: 'Professional GST/tax compliant PDF invoices sent automatically.' },
      { title: 'Stock & Inventory Alerts', desc: 'Automatic out-of-stock badges to prevent accidental over-selling.' }
    ],
    targetAudience: ['Fashion & Apparel', 'Handmade Crafts', 'Jewellery', 'Cosmetics', 'Gourmet Foods', 'Electronics'],
    metrics: [
      { label: 'Cart Abandonment Drop', value: '-35%' },
      { label: 'Payment Success Rate', value: '99.4%' },
      { label: 'Setup Overhead', value: '₹0' }
    ],
    referenceImage: '/services/references/e-commerce.jpg?v=10',
    referenceCaption: 'Modern e-commerce showcase featuring interactive product grid, instant checkout, and verified secure payment badges.',
    demoUrl: '#demo',
    ctaText: 'Start Selling Online Today',
    ctaUrl: '/signup'
  },

  'visiting-cards': {
    id: 'visiting-cards',
    name: 'Visiting Cards, Flyers & Brochures',
    tagline: 'Smart NFC Metal/PVC Business Cards Plus High-Resolution Printable Marketing Collateral',
    category: 'Print & Digital Hybrid',
    badge: 'Bestseller',
    iconImage: '/services/visiting-cards.png?v=7',
    bgGrad: 'from-amber-50 to-orange-100/60',
    borderColor: 'border-amber-200/70',
    accentColor: '#F59E0B',
    about: {
      overview: 'Combine the tactile elegance of physical marketing with the endless power of the digital cloud. OneClickBiz provides both smart NFC business cards (tap to share) and dynamic printable flyers & tri-fold brochures.',
      description: 'Your physical cards and brochures feature dynamic QR codes. When printed flyers or brochures are handed out at trade shows, conferences, or retail stores, scanning them opens your latest updated promotions, videos, and catalog instead of static, outdated paper.',
      valueProposition: 'Bridge physical networking with digital conversion. Print once, update anytime in the cloud without re-printing.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Select Card or Brochure Layout',
        description: 'Pick an executive NFC card finish (Matte PVC, Brushed Metal, or Eco Bamboo) or brochure layout.'
      },
      {
        step: 2,
        title: 'Customize Branding & QR Codes',
        description: 'Add your logo, corporate colors, and generate high-resolution vector QR codes ready for print.'
      },
      {
        step: 3,
        title: 'Order NFC Hardware or Export PDF',
        description: 'Order custom engraved physical NFC cards delivered to your doorstep, or export 300 DPI print-ready PDFs.'
      },
      {
        step: 4,
        title: 'Tap, Scan & Distribute Everywhere',
        description: 'Tap your card against any smartphone or distribute brochures. All scans lead straight to your interactive business portal.'
      }
    ],
    keyCapabilities: [
      { title: 'Contactless NFC Tap', desc: 'Built-in NTAG216 chip compatible with all Apple iPhone & Android phones.' },
      { title: '300 DPI Print-Ready PDFs', desc: 'Vector format ensures razor-sharp printing at any commercial print press.' },
      { title: 'Dynamic QR Redirects', desc: 'Change where your printed card or flyer points without changing the print.' },
      { title: 'Brochure Catalog Showcase', desc: 'Interactive digital flip-book experience for multi-page brochures.' }
    ],
    targetAudience: ['Corporate Sales Teams', 'Real Estate Brokers', 'Exhibition Vendors', 'Medical Representatives', 'Architects'],
    metrics: [
      { label: 'Networking ROI', value: '4.5x' },
      { label: 'Print Waste Reduction', value: '90%' },
      { label: 'NFC Compatibility', value: '100%' }
    ],
    referenceImage: '/services/references/visiting-cards.jpg?v=10',
    referenceCaption: 'Luxury matte black smart card with gold foil logo, NFC tap-to-phone contact transfer, and matching marketing flyers.',
    demoUrl: '#templates',
    ctaText: 'Design Your Smart Cards & Flyers',
    ctaUrl: '/signup'
  },

  'lead-extractions': {
    id: 'lead-extractions',
    name: 'Lead Extractions',
    tagline: 'Capture, Filter & Export High-Value Customer Inquiries in Real-Time',
    category: 'Sales & CRM',
    badge: 'High ROI',
    iconImage: '/services/lead-extractions.png?v=7',
    bgGrad: 'from-indigo-50 to-blue-100/60',
    borderColor: 'border-indigo-200/70',
    accentColor: '#4F46E5',
    about: {
      overview: 'Stop losing prospective customers who visit your profile or website. OneClickBiz Lead Extraction captures inquiries from contact forms, quote requests, appointment bookings, and WhatsApp buttons into a centralized CRM dashboard.',
      description: 'View customer names, verified phone numbers, emails, timestamps, and specific inquiry messages. With a single click, export the entire database into clean Microsoft Excel (.xlsx) or CSV formats ready for your telecalling and WhatsApp marketing campaigns.',
      valueProposition: 'Build your proprietary customer database. Every person who interacts with your digital profile becomes a qualified lead in your hands.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Activate Lead Capture Forms',
        description: 'Enable inquiry forms, quote request buttons, or appointment forms on your profile and website.'
      },
      {
        step: 2,
        title: 'Receive Instant Notifications',
        description: 'Get notified via email and SMS the moment a potential client submits their contact details.'
      },
      {
        step: 3,
        title: 'Qualify & Track Status',
        description: 'Tag leads in your OneClickBiz CRM as "New", "In Progress", "Quoted", or "Converted".'
      },
      {
        step: 4,
        title: '1-Click Export to Excel/CSV',
        description: 'Download full spreadsheets with one tap and import into your WhatsApp broadcast or calling CRM.'
      }
    ],
    keyCapabilities: [
      { title: 'Zero Lead Leakage', desc: 'Capture 100% of prospective buyers before they bounce away.' },
      { title: '1-Click Excel / CSV Export', desc: 'Instant file download formatted for immediate sales team follow-up.' },
      { title: 'Instant WhatsApp / Email Alerts', desc: 'Respond within 60 seconds when purchase intent is highest.' },
      { title: 'Lead Source Attribution', desc: 'Know whether leads came from QR scans, Instagram, or Google Search.' }
    ],
    targetAudience: ['Real Estate Agents', 'Loan & Insurance Agents', 'Event Planners', 'Coaching Classes', 'B2B Suppliers'],
    metrics: [
      { label: 'Lead Capture Rate', value: '+68%' },
      { label: 'Follow-up Speed', value: '3x Faster' },
      { label: 'Export Format', value: 'Excel / CSV' }
    ],
    referenceImage: '/services/references/lead-extractions.jpg?v=10',
    referenceCaption: 'Real-time Lead Extraction CRM dashboard showing incoming inquiries, conversion analytics, and 1-click Excel export.',
    demoUrl: '#demo',
    ctaText: 'Start Capturing Leads Now',
    ctaUrl: '/signup'
  },

  'custom-domain': {
    id: 'custom-domain',
    name: 'Custom Domain & Landing Pages',
    tagline: 'Brand Your Business with Your Own .com or .in Domain and Free Cloudflare SSL',
    category: 'Branding & Infrastructure',
    badge: 'Pro Branding',
    iconImage: '/services/custom-domain.png?v=7',
    bgGrad: 'from-sky-50 to-blue-100/60',
    borderColor: 'border-sky-200/70',
    accentColor: '#0EA5E9',
    about: {
      overview: 'Establish supreme business credibility by connecting your own custom web address (e.g., www.yourbusiness.com or yourbrand.in) to your OneClickBiz mini-website, profile, or online store.',
      description: 'We handle all the complicated technical setup automatically: automatic SSL certificates (padlock icon), lightning-fast CDN edge caching, and DNS verification. Build dedicated campaign landing pages for Google and Meta Ads that convert at 3x higher rates.',
      valueProposition: 'Your own branded web address elevates your business from a local seller to an authoritative, trustworthy brand in your customers minds.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Enter Your Domain Name',
        description: 'Type in any domain you already own from GoDaddy, Namecheap, Hostinger, or Google Domains.'
      },
      {
        step: 2,
        title: 'Add 2 Simple DNS Records',
        description: 'Copy and paste our quick CNAME and A records into your domain registrar dashboard.'
      },
      {
        step: 3,
        title: 'Automatic SSL Activation',
        description: 'Our cloud platform automatically generates and verifies your bank-grade HTTPS SSL certificate.'
      },
      {
        step: 4,
        title: 'Launch Your Branded Address',
        description: 'Your custom domain goes live worldwide in minutes, loading your OneClickBiz store seamlessly.'
      }
    ],
    keyCapabilities: [
      { title: 'Free Enterprise SSL (HTTPS)', desc: 'Bank-level 256-bit encryption with trusted green padlock.' },
      { title: 'Global Edge CDN', desc: 'Served from 250+ cloud edge servers for near-instant page loads.' },
      { title: 'Ad Campaign Ready', desc: 'Compliant with Google Ads, Facebook Ads, and Instagram Ad requirements.' },
      { title: 'No Hosting Fees', desc: 'Never pay ₹5,000/year for web hosting servers again.' }
    ],
    targetAudience: ['Growing Brands', 'D2C Startups', 'Legal & Tax Firms', 'Private Clinics', 'Agencies'],
    metrics: [
      { label: 'Brand Trust Increase', value: '+75%' },
      { label: 'SSL Cost', value: '₹0 (Free)' },
      { label: 'Ad Quality Score', value: '9/10' }
    ],
    referenceImage: '/services/references/custom-domain.jpg?v=10',
    referenceCaption: 'Connected custom domain with green SSL padlock, DNS verification checkmarks, and 0.4s global edge CDN status.',
    demoUrl: '#demo',
    ctaText: 'Connect Your Custom Domain',
    ctaUrl: '/signup'
  },

  'reviews-ratings': {
    id: 'reviews-ratings',
    name: 'Reviews & Ratings',
    tagline: 'Automate 5-Star Google Reviews & Build Irresistible Customer Social Proof',
    category: 'Reputation & Growth',
    badge: 'Growth Booster',
    iconImage: '/services/reviews-ratings.png?v=7',
    bgGrad: 'from-amber-50 to-yellow-100/60',
    borderColor: 'border-amber-200/70',
    accentColor: '#EAB308',
    about: {
      overview: '93% of customers read online reviews before deciding to visit a shop or hire a service. OneClickBiz Reviews & Ratings empowers you to collect genuine 5-star Google, Justdial, and platform reviews on autopilot.',
      description: 'Features a smart review funnel: happy clients (4 or 5 stars) are directed straight to your Google Business Profile to leave a public review, skyrocketing your Google Local Pack ranking. Constructive private feedback is sent directly to your inbox so you can resolve issues privately.',
      valueProposition: 'Rank #1 on Google Maps in your locality and convert hesitant prospects into confident buyers with glowing verified testimonials.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Link Your Google Business Profile',
        description: 'Enter your Google Place ID or review link to automate 1-tap review submissions.'
      },
      {
        step: 2,
        title: 'Showcase Customer Testimonials',
        description: 'Display verified customer photos, star ratings, and quotes right on your profile and website.'
      },
      {
        step: 3,
        title: 'Distribute Review QR Codes',
        description: 'Place a "Tap or Scan to Rate Us" QR standee at your checkout counter or billing desk.'
      },
      {
        step: 4,
        title: 'Watch Your Ratings Skyrocket',
        description: 'Turn everyday customer transactions into an avalanche of glowing 5-star Google reviews.'
      }
    ],
    keyCapabilities: [
      { title: '1-Tap Google Review Redirect', desc: 'Opens the official Google Review box directly with 5 stars pre-selected.' },
      { title: 'Smart Negative Feedback Filter', desc: 'Allows you to intercept complaints privately before they hurt your public score.' },
      { title: 'Rich Schema Rich Snippets', desc: 'Show golden stars directly in Google search result listings.' },
      { title: 'Verified Badge Certification', desc: 'Display authentic verified client reviews that build instant trust.' }
    ],
    targetAudience: ['Restaurants & Cafes', 'Dental & Eye Clinics', 'Salons & Spas', 'Hotels & Resorts', 'Auto Garages'],
    metrics: [
      { label: 'Google Review Boost', value: '4.2x' },
      { label: 'Local Search Inquiries', value: '+54%' },
      { label: 'Star Rating Avg', value: '4.9 ★' }
    ],
    referenceImage: '/services/references/reviews-ratings.jpg?v=10',
    referenceCaption: '5-Star reputation booster smartphone interface showing glowing stars, verified feedback cards, and Google review redirect.',
    demoUrl: '#demo',
    ctaText: 'Boost Your 5-Star Reviews',
    ctaUrl: '/signup'
  },

  'gallery-space': {
    id: 'gallery-space',
    name: 'Gallery Space',
    tagline: 'High-Resolution Visual Portfolio to Flaunt Your Work, Projects & Products',
    category: 'Visual Media & Portfolio',
    badge: 'Visual Showcase',
    iconImage: '/services/gallery-space.png?v=7',
    bgGrad: 'from-teal-50 to-emerald-100/60',
    borderColor: 'border-teal-200/70',
    accentColor: '#14B8A6',
    about: {
      overview: 'Clients want to see your work before hiring you. Gallery Space provides a high-speed, image-optimized media gallery with lightbox zooming, category filtering, and before-and-after sliders.',
      description: 'Upload high-resolution photos of your completed architectural projects, salon transformations, event catering setups, or fashion collections. WebP compression ensures lightning-fast loading without sacrificing visual clarity.',
      valueProposition: 'Showcase your craftsmanship with visual elegance and convince clients of your quality within 5 seconds.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Upload High-Res Media',
        description: 'Drag and drop your project photos, photoshoot galleries, and event pictures.'
      },
      {
        step: 2,
        title: 'Organize by Categories',
        description: 'Tag photos into albums like "Recent Work", "Bridal Makeup", "Completed Villas", or "Before & After".'
      },
      {
        step: 3,
        title: 'Add Captions & Pricing',
        description: 'Write descriptions and price tags so interested clients can inquire directly from a photo.'
      },
      {
        step: 4,
        title: 'Impress Visitors Instantly',
        description: 'Visitors browse your gallery in full-screen HD lightbox with swipe gestures on mobile.'
      }
    ],
    keyCapabilities: [
      { title: 'Full-Screen HD Lightbox', desc: 'Pinch-to-zoom and swipe-through gallery optimized for iOS and Android.' },
      { title: 'Automatic WebP Optimization', desc: 'Reduces image file size by 80% while preserving crystal sharpness.' },
      { title: 'Direct Photo Inquiry', desc: 'Clients can tap "Inquire about this item" on any photo to chat on WhatsApp.' },
      { title: 'Categorized Photo Tabs', desc: 'Organize hundreds of photos cleanly into tabbed collections.' }
    ],
    targetAudience: ['Photographers', 'Interior Designers', 'Makeup Artists', 'Builders & Architects', 'Caterers'],
    metrics: [
      { label: 'Image Compression', value: '80% Smaller' },
      { label: 'Visual Engagement', value: '+65%' },
      { label: 'Storage', value: 'Unlimited' }
    ],
    referenceImage: '/services/references/gallery-space.jpg?v=10',
    referenceCaption: 'Visual portfolio showcase with categorized photo albums, lightbox zoom indicator, and direct WhatsApp project inquiry.',
    demoUrl: '#templates',
    ctaText: 'Create Your Photo Gallery',
    ctaUrl: '/signup'
  },

  'articles-blogs': {
    id: 'articles-blogs',
    name: 'Articles & Blogs',
    tagline: 'Built-in Content Studio to Rank #1 on Google & Share Thought Leadership',
    category: 'SEO & Content Hub',
    badge: 'Organic Traffic',
    iconImage: '/services/articles-blogs.png?v=7',
    bgGrad: 'from-blue-50 to-indigo-100/60',
    borderColor: 'border-blue-200/70',
    accentColor: '#3B82F6',
    about: {
      overview: 'Establish your industry authority and attract free organic customers from Google Search with the integrated OneClickBiz Articles & Blog publishing suite.',
      description: 'Write articles, helpful buying guides, business updates, and industry tips using a clean rich-text editor. Every blog post is automatically tagged with OpenGraph social preview cards and Google SEO schema markup.',
      valueProposition: 'Drive endless free Google search traffic to your profile without spending a single rupee on paid advertisements.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Write or Paste Your Article',
        description: 'Use our intuitive visual editor to write articles, add headings, bullet points, and images.'
      },
      {
        step: 2,
        title: 'Add SEO Keywords & Meta Tags',
        description: 'Fill in your target focus keywords, meta title, and description for Google indexing.'
      },
      {
        step: 3,
        title: 'Publish with 1-Click',
        description: 'Your article goes live instantly with canonical URLs, fast AMP-compatible layout, and reading time.'
      },
      {
        step: 4,
        title: 'Share on Social & WhatsApp',
        description: 'Share rich preview cards with cover image and summary on WhatsApp groups, LinkedIn, and Facebook.'
      }
    ],
    keyCapabilities: [
      { title: 'Automated SEO Schema', desc: 'Pre-configured JSON-LD Article structured data for rich Google snippets.' },
      { title: 'Rich Media Embeds', desc: 'Embed YouTube videos, product links, and inquiry buttons inside articles.' },
      { title: 'Social Share Cards', desc: 'Custom OpenGraph cards for eye-catching WhatsApp & LinkedIn links.' },
      { title: 'Reader Lead Capture', desc: 'Insert lead forms and "Call Expert" banners at the end of each post.' }
    ],
    targetAudience: ['Financial Advisors', 'Doctors & Wellness Coaches', 'Lawyers & CAs', 'Tech Consultants', 'Educators'],
    metrics: [
      { label: 'Organic Search Growth', value: '3.2x' },
      { label: 'Google Index Speed', value: '< 24 Hours' },
      { label: 'Ad Spend Saved', value: '100%' }
    ],
    referenceImage: '/services/references/articles-blogs.jpg?v=10',
    referenceCaption: 'SEO-optimized article reader layout with #1 Google search ranking snippet preview, reading time, and lead capture.',
    demoUrl: '/blog',
    ctaText: 'Start Publishing Blogs',
    ctaUrl: '/signup'
  },

  'commercial-usage': {
    id: 'commercial-usage',
    name: 'Commercial Usage',
    tagline: 'Enterprise-Ready Rights, Multi-Staff Accounts & Commercial Resale Cleared',
    category: 'Enterprise & Compliance',
    badge: '100% Commercial',
    iconImage: '/services/commercial-usage.png?v=7',
    bgGrad: 'from-orange-50 to-amber-100/60',
    borderColor: 'border-orange-200/70',
    accentColor: '#F97316',
    about: {
      overview: 'Full commercial rights and enterprise compliance for businesses, digital agencies, and marketing consultants who manage digital assets, client cards, or generate revenue at scale.',
      description: 'OneClickBiz provides complete commercial clearance: zero watermarks, 100% white-label options, multi-staff permissions, and legal certification to use all generated templates and assets for business monetization.',
      valueProposition: 'Operate with complete legal confidence, remove all platform branding, and scale your commercial operations with no restrictions.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Select Commercial License Plan',
        description: 'Upgrade to our business or agency tier for full commercial rights.'
      },
      {
        step: 2,
        title: 'Remove Platform Watermarks',
        description: 'Toggle off OneClickBiz branding to present an entirely white-labeled experience.'
      },
      {
        step: 3,
        title: 'Add Team & Staff Members',
        description: 'Invite your sales representatives, store managers, and marketing staff with custom roles.'
      },
      {
        step: 4,
        title: 'Deploy for Clients or Multiple Outlets',
        description: 'Generate commercial cards, stores, and landing pages for your branches or agency clients.'
      }
    ],
    keyCapabilities: [
      { title: '100% White-Label Experience', desc: 'No third-party logos or branding on your profiles and stores.' },
      { title: 'Multi-User Team Collaboration', desc: 'Assign granular permissions for managers, sales reps, and editors.' },
      { title: 'Commercial Reseller Ready', desc: 'Agencies can package and sell OneClickBiz solutions to local clients.' },
      { title: '99.9% Uptime Guarantee', desc: 'Backed by dedicated cloud server infrastructure and priority SLA support.' }
    ],
    targetAudience: ['Marketing Agencies', 'Multi-Store Franchises', 'Corporate Enterprises', 'B2B Service Providers'],
    metrics: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Branding Freedom', value: '100%' },
      { label: 'Staff Seats', value: 'Unlimited' }
    ],
    referenceImage: '/services/references/commercial-usage.jpg?v=10',
    referenceCaption: 'Enterprise team management screen with multi-staff roles, granular permissions, and 100% white-label certificate.',
    demoUrl: '#pricing',
    ctaText: 'Unlock Commercial License',
    ctaUrl: '/signup'
  },

  'scaling-business': {
    id: 'scaling-business',
    name: 'Scaling Your Business',
    tagline: 'Multi-Branch Support, Advanced Analytics & Automated Customer Re-engagement',
    category: 'Growth & Automation',
    badge: 'Scale Fast',
    iconImage: '/services/scaling-business.png?v=7',
    bgGrad: 'from-rose-50 to-red-100/60',
    borderColor: 'border-rose-200/70',
    accentColor: '#EF4444',
    about: {
      overview: 'Designed for businesses ready to expand beyond a single location. Manage multiple outlets, regional phone numbers, territory branches, and distinct staff teams under one central management cockpit.',
      description: 'Leverage deep analytics: track which products sell most, peak visitor hours, location of your buyers, and customer retention. Integrate with WhatsApp automation to send re-order reminders, seasonal offers, and loyalty rewards.',
      valueProposition: 'Scale from 1 location to 50 locations seamlessly without multiplying your software costs or operational headaches.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Add Business Locations & Outlets',
        description: 'Set up branch profiles with local phone numbers, addresses, and branch managers.'
      },
      {
        step: 2,
        title: 'Review Centralized Analytics',
        description: 'Analyze store visits, top revenue items, and customer acquisition channels in one view.'
      },
      {
        step: 3,
        title: 'Automate Customer Retention',
        description: 'Trigger automated WhatsApp reminders for customers who haven’t purchased in 30 days.'
      },
      {
        step: 4,
        title: 'Expand Reach & Multiply Revenue',
        description: 'Clone winning store layouts and launch new branch campaigns in under 60 seconds.'
      }
    ],
    keyCapabilities: [
      { title: 'Multi-Location Branch Manager', desc: 'Route incoming inquiries to the nearest outlet based on customer pincode.' },
      { title: 'Real-Time Revenue Analytics', desc: 'Monitor sales volume, daily inquiry numbers, and staff performance.' },
      { title: 'Automated WhatsApp Re-engagement', desc: 'Reactivate past customers with personalized seasonal offers.' },
      { title: 'Centralized Inventory Sync', desc: 'Manage catalog availability across all branches from a single screen.' }
    ],
    targetAudience: ['Retail Chains', 'Restaurant Franchises', 'Clinic Networks', 'Fitness Centers', 'Real Estate Agencies'],
    metrics: [
      { label: 'Revenue Multiplier', value: '2.8x' },
      { label: 'Customer Retention', value: '+48%' },
      { label: 'Outlets Supported', value: '50+' }
    ],
    referenceImage: '/services/references/scaling-business.jpg?v=10',
    referenceCaption: 'Multi-branch performance dashboard with live location metrics across metros, revenue growth charts, and lead routing.',
    demoUrl: '#demo',
    ctaText: 'Scale Your Business Today',
    ctaUrl: '/signup'
  },

  'custom-templates': {
    id: 'custom-templates',
    name: 'Custom Templates',
    tagline: '100+ Designer Templates Handcrafted for 20+ Specific Indian Business Verticals',
    category: 'Design & Templates',
    badge: '100+ Templates',
    iconImage: '/services/custom-templates.png?v=7',
    bgGrad: 'from-purple-50 to-fuchsia-100/60',
    borderColor: 'border-purple-200/70',
    accentColor: '#A855F7',
    about: {
      overview: 'Generic website templates fail because a doctor needs patient booking, a restaurant needs a food menu with veg/non-veg tags, and a jeweller needs gold karat certificates. OneClickBiz templates are custom built for your exact trade.',
      description: 'Explore over 100 industry-specific designs with pre-filled copy, relevant icons, and specialized functional modules ready on day one. Simply swap in your photos and name, and you are live with an elite agency-quality presentation.',
      valueProposition: 'Get a tailored digital presence that speaks your industry language and converts your specific target customer.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Select Your Business Category',
        description: 'Pick your vertical: Healthcare, Salon, Restaurant, Real Estate, Education, Legal, or Retail.'
      },
      {
        step: 2,
        title: 'Preview Live Working Demos',
        description: 'Test interactive live demos on both mobile and desktop views to see the customer experience.'
      },
      {
        step: 3,
        title: 'Apply Template with 1-Click',
        description: 'Import the entire pre-configured structure, color palette, and layout into your account.'
      },
      {
        step: 4,
        title: 'Personalize & Publish',
        description: 'Replace sample text with your own offerings and publish immediately to the world.'
      }
    ],
    keyCapabilities: [
      { title: 'Industry-Specific Feature Modules', desc: 'Veg/non-veg menus for dining, appointment slots for doctors, rate cards for salons.' },
      { title: 'Responsive on All Devices', desc: 'Pixel-perfect rendering on iPhones, Samsung, iPads, and 4K desktop screens.' },
      { title: 'Modern 2026 Aesthetic', desc: 'Glassmorphism, tactile micro-animations, and clean typography.' },
      { title: 'Switch Themes Anytime', desc: 'Change your entire website theme in 1 tap without losing your data.' }
    ],
    targetAudience: ['All Local Businesses', 'Doctors', 'Restaurateurs', 'Salon Stylists', 'Boutique Owners'],
    metrics: [
      { label: 'Template Library', value: '100+' },
      { label: 'Industries Covered', value: '25+' },
      { label: 'Setup Time Saved', value: '95%' }
    ],
    referenceImage: '/services/references/custom-templates.jpg?v=10',
    referenceCaption: 'Vertical-specific template library featuring ready-made themes for clinics, restaurants, salons, and real estate.',
    demoUrl: '#templates',
    ctaText: 'Explore All 100+ Templates',
    ctaUrl: '/vcard-templates'
  },

  'easy-designing': {
    id: 'easy-designing',
    name: 'Easy Designing with Multiple Edits',
    tagline: 'No-Code Visual Editor with Real-Time Previews & Instant Revisions',
    category: 'Editor & Customization',
    badge: 'No Code Needed',
    iconImage: '/services/easy-designing.png?v=7',
    bgGrad: 'from-pink-50 to-rose-100/60',
    borderColor: 'border-pink-200/70',
    accentColor: '#EC4899',
    about: {
      overview: 'You should never have to wait 3 days and pay a web designer ₹2,000 just to change a phone number, update festive pricing, or add a new festival offer. OneClickBiz gives you total creative control.',
      description: 'Our intuitive visual builder lets anyone customize colors, fonts, banner sliders, product order, and text with zero coding or technical expertise. Watch changes update in real-time on a live smartphone preview as you edit.',
      valueProposition: 'Full freedom to edit and update your business profile 24/7/365 without paying developer maintenance fees.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Open Your Visual Builder',
        description: 'Access your profile editor from your phone browser or desktop computer anytime.'
      },
      {
        step: 2,
        title: 'Click Any Element to Edit',
        description: 'Tap text to edit, pick custom brand colors, change font styles, and reorder sections.'
      },
      {
        step: 3,
        title: 'Check Live Side-by-Side Preview',
        description: 'See the exact look on iPhone and desktop simulator before saving.'
      },
      {
        step: 4,
        title: 'Save & Instant Live Sync',
        description: 'Click save: your live website updates globally within 50 milliseconds.'
      }
    ],
    keyCapabilities: [
      { title: 'Live Device Simulator', desc: 'Preview your changes live on iOS, Android, and Desktop simultaneously.' },
      { title: 'Drag & Drop Section Reordering', desc: 'Move your gallery above services or put testimonials at the top easily.' },
      { title: 'Undo / Redo History', desc: 'Experiment freely with complete peace of mind.' },
      { title: 'Mobile-Friendly Dashboard', desc: 'Edit your entire website straight from your smartphone while traveling.' }
    ],
    targetAudience: ['Small Business Owners', 'Solo Entrepreneurs', 'Shopkeepers', 'Marketing Managers', 'Artists'],
    metrics: [
      { label: 'Technical Skill Required', value: 'Zero' },
      { label: 'Live Sync Latency', value: '50ms' },
      { label: 'Designer Fees Saved', value: '₹20,000+' }
    ],
    referenceImage: '/services/references/easy-designing.jpg?v=10',
    referenceCaption: 'No-code visual studio interface with drag-and-drop elements palette, brand color swatches, and live mobile simulator.',
    demoUrl: '#demo',
    ctaText: 'Try The Visual Designer',
    ctaUrl: '/signup'
  },

  'product-space': {
    id: 'product-space',
    name: 'Product Space',
    tagline: 'Unlimited Product Listings with High-Res Photos, SKU Tags & Inventory Controls',
    category: 'Inventory & Catalog',
    badge: 'Unlimited Space',
    iconImage: '/services/product-space.png?v=7',
    bgGrad: 'from-amber-50 to-orange-100/60',
    borderColor: 'border-amber-200/70',
    accentColor: '#D97706',
    about: {
      overview: 'Traditional digital cards restrict you to only 5 or 10 products. OneClickBiz Product Space provides enterprise-grade catalog capacity to showcase your full inventory without arbitrary limits.',
      description: 'Organize thousands of products with custom categories, SKU numbers, original MRP vs selling price, out-of-stock indicators, and product specifications. Buyers can search, filter, and share specific product links directly with their friends on WhatsApp.',
      valueProposition: 'Showcase your complete showroom or inventory collection in your customer’s pocket 24/7.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Create Catalog Collections',
        description: 'Set up product categories like "New Arrivals", "Best Sellers", "Sale Items", or "Festive Collection".'
      },
      {
        step: 2,
        title: 'Bulk Upload or Add Items',
        description: 'Add products with high-definition photos, specifications, dimensions, and MRP pricing.'
      },
      {
        step: 3,
        title: 'Manage Stock Status',
        description: 'Mark items as "In Stock", "Low Stock", or "Pre-Order" to manage customer expectations.'
      },
      {
        step: 4,
        title: 'Share Direct Product Links',
        description: 'Send individual product links on WhatsApp that open straight to the item with 1-tap buy button.'
      }
    ],
    keyCapabilities: [
      { title: 'Zero Catalog Limits', desc: 'List your entire product range without paying extra listing fees.' },
      { title: 'Direct Product Deep-Linking', desc: 'Send customers straight to a specific product from your Instagram posts.' },
      { title: 'Instant Product Search Bar', desc: 'Customers find exact items in milliseconds with intelligent keyword search.' },
      { title: 'Variant Sizing & Colors', desc: 'Support multiple sizes (S, M, L, XL) and colors on a single product card.' }
    ],
    targetAudience: ['Wholesalers & Distributors', 'Fashion Stores', 'Hardware & Electronics', 'Furniture Showrooms'],
    metrics: [
      { label: 'Catalog Capacity', value: 'Unlimited' },
      { label: 'Search Speed', value: '15ms' },
      { label: 'Conversion Lift', value: '+38%' }
    ],
    referenceImage: '/services/references/product-space.jpg?v=10',
    referenceCaption: 'Comprehensive inventory catalog grid with SKU numbers, stock alert badges, instant search bar, and variant pricing.',
    demoUrl: '#demo',
    ctaText: 'Upload Your Products',
    ctaUrl: '/signup'
  },

  'services-management': {
    id: 'services-management',
    name: 'Services Management',
    tagline: 'Appointment Scheduling, Service Rate Cards & Instant Booking Confirmation',
    category: 'Booking & Scheduling',
    badge: 'Smart Booking',
    iconImage: '/services/services-management.png?v=7',
    bgGrad: 'from-blue-50 to-cyan-100/60',
    borderColor: 'border-blue-200/70',
    accentColor: '#0284C7',
    about: {
      overview: 'Service providers lose up to 40% of appointments because of tedious back-and-forth phone calls and scheduling friction. OneClickBiz Services Management automates your booking calendar.',
      description: 'Display transparent service rate cards with durations, service descriptions, and booking time slots. Clients select their preferred date and time, and both you and the client receive immediate confirmation alerts on WhatsApp and calendar.',
      valueProposition: 'Fill your appointment calendar automatically while eliminating missed calls, double-bookings, and scheduling hassles.'
    },
    howToUse: [
      {
        step: 1,
        title: 'List Your Service Menu',
        description: 'Add your services, duration (e.g. 45 mins), pricing, and what is included.'
      },
      {
        step: 2,
        title: 'Set Your Working Hours',
        description: 'Define your weekly working schedule, lunch breaks, and holiday unavailable dates.'
      },
      {
        step: 3,
        title: 'Enable Slot Booking',
        description: 'Clients pick available time slots on your live interactive booking calendar.'
      },
      {
        step: 4,
        title: 'Automated Reminders',
        description: 'Send automated WhatsApp appointment reminders 2 hours before the booking to prevent no-shows.'
      }
    ],
    keyCapabilities: [
      { title: 'Automated Slot Availability', desc: 'Prevents double-booking by locking filled slots instantly.' },
      { title: 'WhatsApp Booking Confirmation', desc: 'Instant booking slip sent to client WhatsApp with Google Maps link.' },
      { title: 'Advance Deposit Collection', desc: 'Optionally collect advance token payments via UPI before confirming slot.' },
      { title: 'Staff Assignment', desc: 'Assign specific staff specialists or doctors to individual bookings.' }
    ],
    targetAudience: ['Doctors & Dentists', 'Hair Salons & Spas', 'Auto Repair Garages', 'Home Cleaning Services', 'Tutors & Coaches'],
    metrics: [
      { label: 'No-Show Reduction', value: '-72%' },
      { label: 'Booking Automation', value: '24/7' },
      { label: 'Client Satisfaction', value: '98%' }
    ],
    referenceImage: '/services/references/services-management.jpg?v=10',
    referenceCaption: 'Interactive appointment booking calendar with date picker, real-time time slots, staff selection, and confirmation slips.',
    demoUrl: '#demo',
    ctaText: 'Automate Your Bookings',
    ctaUrl: '/signup'
  },

  'customized-qr': {
    id: 'customized-qr',
    name: 'Customized QR Code',
    tagline: 'Branded Dynamic QR Codes with Company Logo, Colors & Scan Analytics',
    category: 'QR Technology',
    badge: 'Dynamic QR',
    iconImage: '/services/customized-qr.png?v=7',
    bgGrad: 'from-purple-50 to-indigo-100/60',
    borderColor: 'border-purple-200/70',
    accentColor: '#7C3AED',
    about: {
      overview: 'Boring black-and-white pixel QR codes are forgotten. OneClickBiz generates customized, high-converting QR codes featuring your brand logo in the center, custom brand colors, eye shapes, and inviting call-to-action frames like "Scan to Shop" or "Scan to Connect".',
      description: 'Crucially, these are 100% Dynamic QR codes. That means you can change the destination URL anytime in the future without changing or re-printing the physical QR code on your cards, packaging, or counter standees.',
      valueProposition: 'Increase scan rates by up to 3x with attractive branded codes, and enjoy the freedom of updating the destination link forever.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Choose QR Shape & Frame',
        description: 'Select circular, rounded squircle, or badge frames with "Scan For Menu" or "Scan for Offers".'
      },
      {
        step: 2,
        title: 'Embed Your Company Logo',
        description: 'Upload your brand emblem into the center of the QR code with automatic error-correction.'
      },
      {
        step: 3,
        title: 'Apply Brand Gradient Colors',
        description: 'Match the QR code dots and corner markers to your corporate color palette.'
      },
      {
        step: 4,
        title: 'Export Vector Print File (SVG / PNG)',
        description: 'Download in ultra-high resolution ready for large billboards, packaging boxes, or counter acrylic standees.'
      }
    ],
    keyCapabilities: [
      { title: '100% Dynamic Redirects', desc: 'Update destination links in your dashboard anytime without re-printing.' },
      { title: 'High Error Correction Level (Level H)', desc: 'Scans effortlessly even if 30% of the QR code is smudged or scratched.' },
      { title: 'Real-Time Scan Counter', desc: 'Track daily scans, geographic city locations, and mobile device types.' },
      { title: 'Vector SVG & PNG Export', desc: 'Scales from a tiny visiting card corner to a giant highway billboard without blur.' }
    ],
    targetAudience: ['Restaurants & Bars', 'Retail Outlets', 'FMCG Brands', 'Packaging Manufacturers', 'Event Organizers'],
    metrics: [
      { label: 'Scan Rate Increase', value: '3.1x' },
      { label: 'Error Correction', value: '30% (Level H)' },
      { label: 'Print Resolution', value: 'Vector / 4K' }
    ],
    referenceImage: '/services/references/customized-qr.jpg?v=10',
    referenceCaption: 'Premium acrylic QR standee on boutique counter with customer scanning to open live digital store and contacts.',
    demoUrl: '#demo',
    ctaText: 'Generate Your Custom QR Code',
    ctaUrl: '/signup'
  },

  'payment-gateways': {
    id: 'payment-gateways',
    name: 'Payment Gateways',
    tagline: 'Accept UPI, Cards, NetBanking & Wallets with Instant Direct Bank Settlement',
    category: 'Finance & Payments',
    badge: 'Instant Settlement',
    iconImage: '/services/payment-gateways.png?v=7',
    bgGrad: 'from-sky-50 to-emerald-100/60',
    borderColor: 'border-sky-200/70',
    accentColor: '#059669',
    about: {
      overview: 'Collecting payments should never be a roadblock. OneClickBiz integrates seamlessly with India’s leading payment infrastructure (Cashfree, Razorpay, UPI Auto-QR, and Direct NetBanking) so you can get paid instantly.',
      description: 'Customers pay via their favorite apps: Google Pay, PhonePe, Paytm, CRED, or international credit/debit cards. The funds settle directly into your bank account with complete automated transaction receipts and reconciliation.',
      valueProposition: 'Frictionless 1-tap checkout that boosts completed payments and eliminates manual payment follow-up messages.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Connect Payment Provider',
        description: 'Link your merchant account (Cashfree / Razorpay) or simply paste your business UPI ID.'
      },
      {
        step: 2,
        title: 'Set Payment Triggers',
        description: 'Collect payments for e-commerce orders, booking deposits, consulting fees, or invoice bills.'
      },
      {
        step: 3,
        title: 'Customer Taps & Pays via UPI',
        description: 'Customer chooses Google Pay, PhonePe, or Cards and completes payment securely in seconds.'
      },
      {
        step: 4,
        title: 'Instant Confirmation & Bank Settlement',
        description: 'Both parties receive real-time payment success receipts, and money reaches your bank account.'
      }
    ],
    keyCapabilities: [
      { title: 'All UPI Apps Supported', desc: '100% compatible with Google Pay, PhonePe, Paytm, BHIM, and CRED UPI.' },
      { title: 'PCI-DSS Bank Grade Security', desc: 'End-to-end 256-bit encrypted checkout with zero card storage risk.' },
      { title: 'Automated Payment Receipts', desc: 'Sends instant WhatsApp and email transaction receipts with transaction ID.' },
      { title: 'Zero Setup Charges', desc: 'No expensive POS swipe machine rental or complex hardware needed.' }
    ],
    targetAudience: ['Retail Stores', 'Freelancers & Consultants', 'Tuition Classes', 'Clinics & Salons', 'Online Sellers'],
    metrics: [
      { label: 'Payment Success Rate', value: '99.6%' },
      { label: 'Checkout Time', value: '< 15s' },
      { label: 'UPI Compatibility', value: '100%' }
    ],
    referenceImage: '/services/references/payment-gateways.jpg?v=10',
    referenceCaption: 'Bank-grade payment checkout sheet featuring instant UPI (GPay, PhonePe, Paytm), credit/debit cards, and net banking.',
    demoUrl: '#pricing',
    ctaText: 'Enable Instant Payments',
    ctaUrl: '/signup'
  },

  'canva-adobe': {
    id: 'canva-adobe',
    name: 'Canva & Adobe Integration',
    tagline: 'Seamlessly Import Graphics, Banners & Brand Assets Directly from Creative Suites',
    category: 'Design & Integrations',
    badge: 'Creative Sync',
    iconImage: '/services/canva-adobe.png?v=7',
    bgGrad: 'from-cyan-50 to-rose-100/60',
    borderColor: 'border-cyan-200/70',
    accentColor: '#E11D48',
    about: {
      overview: 'Already designed your marketing banners, product flyers, or business logos in Canva, Adobe Photoshop, or Illustrator? OneClickBiz provides seamless asset integration.',
      description: 'Export or import your designs with native aspect-ratio preservation. Our intelligent image engine automatically crops, compresses, and generates responsive sizes for mobile, tablet, and desktop viewports without distortion.',
      valueProposition: 'Use the creative tools you love and bring your professional branding straight into your live website and digital business card.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Design in Canva or Adobe',
        description: 'Create your promotional posters, logo emblems, or banner graphics in Canva or Adobe suite.'
      },
      {
        step: 2,
        title: 'Import Directly into OneClickBiz',
        description: 'Upload your high-res PNG or JPEG files straight into your OneClickBiz media library.'
      },
      {
        step: 3,
        title: 'Smart Responsive Resizing',
        description: 'Our engine automatically optimizes dimensions for mobile screens and desktop monitors.'
      },
      {
        step: 4,
        title: 'Showcase in Banners & Sliders',
        description: 'Display your creative designs in interactive hero sliders, product banners, and social links.'
      }
    ],
    keyCapabilities: [
      { title: 'Zero Compression Artifacts', desc: 'Retains vibrant colors and typography without muddy pixelation.' },
      { title: 'Banner Slider Support', desc: 'Turn Canva graphics into interactive auto-scrolling hero promotional carousels.' },
      { title: 'Transparent PNG Preservation', desc: 'Keeps clean transparent backgrounds on logos, badges, and stickers.' },
      { title: 'Aspect Ratio Auto-Lock', desc: 'Prevents banners from stretching or squishing on different screen sizes.' }
    ],
    targetAudience: ['Graphic Designers', 'Boutique Brands', 'Digital Marketers', 'Creative Studios', 'E-commerce Sellers'],
    metrics: [
      { label: 'Import Compatibility', value: '100%' },
      { label: 'Visual Quality Retention', value: '99%' },
      { label: 'Format Support', value: 'PNG, JPG, WebP' }
    ],
    referenceImage: '/services/references/canva-adobe.jpg?v=10',
    referenceCaption: 'Creative suite sync workspace showing Canva and Adobe graphic assets imported and auto-resized for mobile and desktop.',
    demoUrl: '#demo',
    ctaText: 'Integrate Your Designs',
    ctaUrl: '/signup'
  },

  'email-signature': {
    id: 'email-signature',
    name: 'Email Signature Generator',
    tagline: 'Interactive, Clickable Email Footers with WhatsApp, vCard & Social Badges',
    category: 'Corporate Utilities',
    badge: 'Pro Email',
    iconImage: '/services/email-signature.png?v=7',
    bgGrad: 'from-cyan-50 to-teal-100/60',
    borderColor: 'border-cyan-200/70',
    accentColor: '#0D9488',
    about: {
      overview: 'Every email you and your team send is an opportunity to win a client. Plain text email signatures look amateur. OneClickBiz generates clickable HTML email signatures with your headshot, title, company branding, and action buttons.',
      description: 'Recipients can click to chat on WhatsApp, book an appointment, view your portfolio, or download your vCard with 1-click directly from Gmail, Outlook, Apple Mail, or Thunderbird.',
      valueProposition: 'Turn every routine business email into a branded marketing asset that generates passive leads and builds executive authority.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Choose Signature Layout',
        description: 'Select an executive corporate, creative minimal, or compact modern layout style.'
      },
      {
        step: 2,
        title: 'Auto-Populate from Profile',
        description: 'OneClickBiz automatically pulls your photo, name, title, website, and social links.'
      },
      {
        step: 3,
        title: '1-Click Copy to Clipboard',
        description: 'Click "Copy Signature" to copy the pre-rendered HTML code into your clipboard.'
      },
      {
        step: 4,
        title: 'Paste into Gmail or Outlook',
        description: 'Paste into your email client settings once. Every outgoing email now features your interactive card.'
      }
    ],
    keyCapabilities: [
      { title: 'Works on All Major Email Clients', desc: '100% compatible with Gmail, Outlook, Apple Mail, Yahoo, and Thunderbird.' },
      { title: 'Clickable WhatsApp & Call Buttons', desc: 'Recipients start WhatsApp conversations with 1 click from their desktop or phone.' },
      { title: 'Dynamic QR Code Embedded', desc: 'Allows recipients viewing on a desktop computer to scan and save your contact to mobile.' },
      { title: 'Team-Wide Standardization', desc: 'Create unified brand signatures for all employees in under 2 minutes.' }
    ],
    targetAudience: ['Corporate Professionals', 'Consultants & Advisors', 'Sales Teams', 'Real Estate Executives', 'Founders'],
    metrics: [
      { label: 'Email CTR Increase', value: '+34%' },
      { label: 'Client Compatibility', value: '100%' },
      { label: 'Setup Time', value: '60 Seconds' }
    ],
    referenceImage: '/services/references/email-signature.jpg?v=10',
    referenceCaption: 'Desktop email compose window featuring professional interactive HTML signature footer with clickable WhatsApp and vCard buttons.',
    demoUrl: '/dashboard/signature',
    ctaText: 'Generate Your Email Signature',
    ctaUrl: '/signup'
  },

  'report-pdf': {
    id: 'report-pdf',
    name: 'Report PDF Extract',
    tagline: 'Download Print-Ready Analytics Summaries, Invoices & Business Fact-Sheets',
    category: 'Reports & Export',
    badge: '1-Click PDF',
    iconImage: '/services/report-pdf.png?v=7',
    bgGrad: 'from-rose-50 to-red-100/60',
    borderColor: 'border-rose-200/70',
    accentColor: '#DC2626',
    about: {
      overview: 'Need to share a clean sales report with your business partner, download customer orders for fulfillment, or print a professional PDF catalog of your store? OneClickBiz Report PDF Extract does it instantly.',
      description: 'Generate beautifully formatted, high-resolution PDF documents with your company logo, timestamp, itemized data tables, and summary charts. Ready for printing, WhatsApp sharing, or archival compliance.',
      valueProposition: 'Eliminate manual bookkeeping and save hours of administrative paperwork with automated, print-perfect PDF documents.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Select Report Type',
        description: 'Choose from Customer Inquiries, Monthly Sales Summary, Product Catalog PDF, or Invoice Slips.'
      },
      {
        step: 2,
        title: 'Apply Date Filters',
        description: 'Filter data for today, this week, custom date ranges, or year-to-date.'
      },
      {
        step: 3,
        title: 'Preview Document Layout',
        description: 'Inspect the generated PDF with company header, logo, and formatted numerical data.'
      },
      {
        step: 4,
        title: 'Download or Share Directly',
        description: 'Download the PDF to your device or forward it directly to clients and accountants via WhatsApp.'
      }
    ],
    keyCapabilities: [
      { title: 'Print-Ready Vector Typography', desc: 'Crystal clear text and charts that print cleanly without fuzzy pixels.' },
      { title: 'Automated Company Header & Logo', desc: 'Includes your registered business details, GSTIN, and contact information.' },
      { title: 'Itemized Order Breakdowns', desc: 'Detailed table formatting with subtotal, tax, and total figures.' },
      { title: 'Instant Mobile Generation', desc: 'Generate and download heavy PDF reports directly on your mobile device in 2 seconds.' }
    ],
    targetAudience: ['Shopkeepers & Wholesalers', 'Accountants & CAs', 'Fleet Managers', 'Contractors', 'Retail Store Managers'],
    metrics: [
      { label: 'PDF Generation Speed', value: '1.2s' },
      { label: 'Paperwork Time Saved', value: '4 hrs/wk' },
      { label: 'Print Resolution', value: '300 DPI' }
    ],
    referenceImage: '/services/references/report-pdf.jpg?v=10',
    referenceCaption: 'Itemized analytics and inquiry report PDF preview with company letterhead, GSTIN, data tables, and print-ready layout.',
    demoUrl: '#demo',
    ctaText: 'Extract Your First Report',
    ctaUrl: '/signup'
  },

  'live-profile': {
    id: 'live-profile',
    name: 'Live Profile',
    tagline: 'Real-Time Dynamic Profile with Instant Cloud Sync & Zero Downtime',
    category: 'Real-Time Sync',
    badge: 'Live Sync',
    iconImage: '/services/live-profile.png?v=7',
    bgGrad: 'from-red-50 to-rose-100/60',
    borderColor: 'border-red-200/70',
    accentColor: '#E11D48',
    about: {
      overview: 'Your business is dynamic — your contact info, festive deals, store timings, and announcements change regularly. A Live Profile ensures your audience always sees your freshest, up-to-the-minute information.',
      description: 'Unlike static PDF brochures or paper business cards that become obsolete the moment they are printed, your OneClickBiz Live Profile syncs in real-time. Update your holiday timings or launch a new flash sale, and existing customers see it the moment they refresh.',
      valueProposition: 'Keep your entire customer base connected to your live business heartbeat without ever reprinting or re-sharing links.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Publish Your Vanity URL',
        description: 'Choose your permanent custom link (e.g. oneclickbiz.in/v/yourname) or connect your custom domain.'
      },
      {
        step: 2,
        title: 'Update Content in Seconds',
        description: 'Post today’s special offer, update open/closed status, or add your latest achievement.'
      },
      {
        step: 3,
        title: 'Live Global Propagation',
        description: 'Cloudflare edge servers sync your updates across 200+ cities in milliseconds.'
      },
      {
        step: 4,
        title: 'Customers Always See Latest Data',
        description: 'Anyone holding your QR code, NFC card, or saved link views the live real-time version.'
      }
    ],
    keyCapabilities: [
      { title: 'Sub-100ms Global Sync', desc: 'Updates propagate worldwide almost instantaneously.' },
      { title: 'Open / Closed Live Status Pill', desc: 'Show customers in real-time whether your store is open right now.' },
      { title: 'Flash Announcement Ticker', desc: 'Display eye-catching banners for festival offers and holiday closures.' },
      { title: 'Permanent Universal Link', desc: 'Your link never expires, even if your phone number or address changes.' }
    ],
    targetAudience: ['Doctors & Specialists', 'Restaurants & Nightlife', 'Event Venues', 'Retail Boutiques', 'Celebrities & Influencers'],
    metrics: [
      { label: 'Sync Latency', value: '< 100ms' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Outdated Info Risk', value: '0%' }
    ],
    referenceImage: '/services/references/live-profile.jpg?v=10',
    referenceCaption: 'Live business profile simulator with green "Open Now" status pill, live visitor counter, and instant global sync indicator.',
    demoUrl: '/v/kishore',
    ctaText: 'Launch Your Live Profile',
    ctaUrl: '/signup'
  },

  'direct-app': {
    id: 'direct-app',
    name: 'Direct App Installation',
    tagline: 'Progressive Web App (PWA) — Install on Customer Phones with 0% Play Store Cut',
    category: 'Mobile App / PWA',
    badge: 'Zero App Store Fee',
    iconImage: '/services/direct-app.png?v=7',
    bgGrad: 'from-emerald-50 to-teal-100/60',
    borderColor: 'border-emerald-200/70',
    accentColor: '#10B981',
    about: {
      overview: 'Building custom native mobile apps costs ₹3,00,000+ plus Google Play and Apple App Store annual developer fees, app review rejections, and a 30% cut on all in-app sales. OneClickBiz solves this with instant Direct App Installation.',
      description: 'Your profile and store are built with cutting-edge Progressive Web App (PWA) technology. When visitors open your link, a prompt asks "Add to Home Screen". With 1 tap, your business app icon installs directly on their phone home screen with zero app store hassle.',
      valueProposition: 'Claim premium real-estate on your customer’s phone home screen. They can launch your store in 1 tap anytime, even offline.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Upload Your App Icon & Splash Screen',
        description: 'Set your branded square icon that will sit proudly on your customer’s phone screen.'
      },
      {
        step: 2,
        title: 'Automatic PWA Manifest Generation',
        description: 'OneClickBiz automatically creates the service workers, offline cache, and mobile manifest.'
      },
      {
        step: 3,
        title: 'Customer Taps "Install App"',
        description: 'Visitors get an automatic banner: "Install [Your Brand] App for Faster Shopping".'
      },
      {
        step: 4,
        title: 'Instant 1-Tap Home Screen Access',
        description: 'Your icon opens full-screen like a native app without any browser URL bar clutter.'
      }
    ],
    keyCapabilities: [
      { title: 'Zero App Store Review Delays', desc: 'Update your app instantly without waiting 7 days for Apple or Google approval.' },
      { title: '1-Tap Frictionless Install', desc: 'No Google account or Apple ID passwords needed for customers to install.' },
      { title: 'Tiny Storage Footprint (< 2MB)', desc: 'Customers never delete your app to save phone memory.' },
      { title: 'Full Screen Native Experience', desc: 'Hides browser address bars for an immersive, distraction-free app experience.' }
    ],
    targetAudience: ['Restaurants & Cloud Kitchens', 'Local Supermarkets', 'Fitness & Yoga Studios', 'Salons', 'Online Brands'],
    metrics: [
      { label: 'Development Cost Saved', value: '₹3,00,000' },
      { label: 'Install Size', value: '< 2 MB' },
      { label: 'App Store Commission', value: '0%' }
    ],
    referenceImage: '/services/references/direct-app.jpg?v=10',
    referenceCaption: 'Progressive Web App installation prompt adding branded business app icon directly onto customer smartphone home screen.',
    demoUrl: '#demo',
    ctaText: 'Get Your Branded Mobile App',
    ctaUrl: '/signup'
  },

  'business-tools': {
    id: 'business-tools',
    name: 'Business Management Tools',
    tagline: 'All-in-One Operations Suite for Customer Contacts, Invoicing & Daily Growth',
    category: 'Operations & Management',
    badge: 'Complete Suite',
    iconImage: '/services/business-tools.png?v=7',
    bgGrad: 'from-indigo-50 to-slate-100/60',
    borderColor: 'border-indigo-200/70',
    accentColor: '#6366F1',
    about: {
      overview: 'Running a modern business requires jugging 10 different apps: one for cards, one for invoices, one for catalogs, and another for customer leads. OneClickBiz unifies everything into one seamless business operating system.',
      description: 'Manage customer contacts, track incoming order status, dispatch invoices, monitor review scores, update online product catalogs, and coordinate staff — all from a single unified, secure dashboard.',
      valueProposition: 'Save 15+ hours every week on operational chaos and run your entire business smoothly from your pocket.'
    },
    howToUse: [
      {
        step: 1,
        title: 'Centralize Your Operations',
        description: 'Log into your OneClickBiz command center from any phone, tablet, or desktop.'
      },
      {
        step: 2,
        title: 'Track Orders & Inquiries',
        description: 'Monitor live order queues, appointment bookings, and lead follow-up reminders in real-time.'
      },
      {
        step: 3,
        title: 'Generate Quick Invoices & Quotes',
        description: 'Create professional GST/non-GST bill estimates and dispatch to clients over WhatsApp.'
      },
      {
        step: 4,
        title: 'Drive Daily Business Growth',
        description: 'Analyze top performing products and customer feedback to continually increase your profit margins.'
      }
    ],
    keyCapabilities: [
      { title: 'Unified Command Dashboard', desc: 'All tools, analytics, contacts, and orders accessible from one login.' },
      { title: 'Customer Contact Book', desc: 'Centralized directory of all past buyers, inquiries, and VIP clients.' },
      { title: 'Automated Daily Backups', desc: 'Your business data is safely encrypted and backed up across multiple cloud zones.' },
      { title: 'Role-Based Team Access', desc: 'Give billing staff access to orders while protecting financial settings.' }
    ],
    targetAudience: ['All Business Owners', 'Traders & Manufacturers', 'Service Agency Founders', 'Retail Store Managers'],
    metrics: [
      { label: 'Time Saved / Week', value: '15+ Hours' },
      { label: 'Apps Replaced', value: '6 Separate Apps' },
      { label: 'Data Security', value: '256-Bit SSL' }
    ],
    referenceImage: '/services/references/business-tools.jpg?v=10',
    referenceCaption: 'Central business operations command cockpit with quick access modules for CRM, WhatsApp orders, billing, and appointments.',
    demoUrl: '#features',
    ctaText: 'Access All Business Tools',
    ctaUrl: '/signup'
  }
};
