import { ServiceItem } from './types';

/**
 * Curated high-resolution images tailored to services across all industries.
 * Matches the visual design of Justdial / Urban Company with contextual photography.
 */
export const SERVICE_IMAGE_PRESETS: Record<string, string> = {
  // Home Services & Repairs
  ac: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  electrician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
  wiring: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
  plumbing: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  leak: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  pest: 'https://images.unsplash.com/photo-1607400201889-565b1dd75f8e?auto=format&fit=crop&w=800&q=80',
  cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  sanitization: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
  carpentry: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=800&q=80',
  painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',

  // Automobile & Dealerships
  car: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  bike: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
  inspection: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  testdrive: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  detailing: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',

  // Travel & Transport (Justdial Travel Bookings)
  flight: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
  bus: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  train: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  resort: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  carrental: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
  visa: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  honeymoon: 'https://images.unsplash.com/photo-1510414842594-a61752d5ab5a?auto=format&fit=crop&w=800&q=80',
  tour: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',

  // Real Estate
  sitevisit: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  walkthrough: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  property: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  villa: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  loan: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',

  // Healthcare & Doctors
  doctor: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
  clinic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  dental: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
  opd: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',

  // Beauty & Salons
  salon: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  haircut: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
  bridal: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  facial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',

  // Interior Design & Architecture
  interior: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  architect: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',

  // Professional Services & CA & Law & Insurance
  insurance: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  audit: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  legal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  tax: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  tech: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',

  // Events & Photography
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  photography: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  event: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',

  // Education & Coaching
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
  coaching: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',

  // Retail & Shopping
  jewellery: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  mobile: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80',
  fashion: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  saree: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',

  // Default fallback
  default: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
};

/**
 * Resolves the most fitting image for a service item, checking existing imageUrl first
 * then intelligently matching by service title, category, or profile category.
 */
export function getServiceImageUrl(srv?: Partial<ServiceItem> | null, profileCategory?: string): string {
  if (srv?.imageUrl && srv.imageUrl.trim().length > 0) {
    return srv.imageUrl;
  }

  const textToScan = `${srv?.title || ''} ${srv?.category || ''} ${srv?.description || ''} ${profileCategory || ''}`.toLowerCase();

  // 1. Home Services Specific
  if (textToScan.includes('ac ') || textToScan.includes('air condition') || textToScan.includes('cooling') || textToScan.includes('power jet')) {
    return SERVICE_IMAGE_PRESETS.ac;
  }
  if (textToScan.includes('electr') || textToScan.includes('wiring') || textToScan.includes('mcb') || textToScan.includes('circuit')) {
    return SERVICE_IMAGE_PRESETS.electrician;
  }
  if (textToScan.includes('plumb') || textToScan.includes('pipe') || textToScan.includes('drain') || textToScan.includes('leak') || textToScan.includes('faucet')) {
    return SERVICE_IMAGE_PRESETS.plumbing;
  }
  if (textToScan.includes('pest') || textToScan.includes('termite') || textToScan.includes('cockroach') || textToScan.includes('bedbug')) {
    return SERVICE_IMAGE_PRESETS.pest;
  }
  if (textToScan.includes('clean') || textToScan.includes('scrub') || textToScan.includes('wash') || textToScan.includes('sanitize') || textToScan.includes('housekeep')) {
    return SERVICE_IMAGE_PRESETS.cleaning;
  }

  // 2. Automobile & Bikes
  if (textToScan.includes('bike') || textToScan.includes('motorcycle') || textToScan.includes('scooter') || textToScan.includes('two wheeler')) {
    return SERVICE_IMAGE_PRESETS.bike;
  }
  if (textToScan.includes('car ') || textToScan.includes('auto') || textToScan.includes('vehicle') || textToScan.includes('motor') || textToScan.includes('garage') || textToScan.includes('dealership')) {
    return SERVICE_IMAGE_PRESETS.car;
  }

  // 3. Travel Bookings
  if (textToScan.includes('flight') || textToScan.includes('air ticket') || textToScan.includes('airline')) {
    return SERVICE_IMAGE_PRESETS.flight;
  }
  if (textToScan.includes('bus') || textToScan.includes('coach') || textToScan.includes('abhibus')) {
    return SERVICE_IMAGE_PRESETS.bus;
  }
  if (textToScan.includes('train') || textToScan.includes('rail') || textToScan.includes('irctc')) {
    return SERVICE_IMAGE_PRESETS.train;
  }
  if (textToScan.includes('hotel') || textToScan.includes('room') || textToScan.includes('banquet') || textToScan.includes('stay')) {
    return SERVICE_IMAGE_PRESETS.hotel;
  }
  if (textToScan.includes('rental') || textToScan.includes('chauffeur') || textToScan.includes('cab ') || textToScan.includes('taxi')) {
    return SERVICE_IMAGE_PRESETS.carrental;
  }
  if (textToScan.includes('visa') || textToScan.includes('passport') || textToScan.includes('embassy')) {
    return SERVICE_IMAGE_PRESETS.visa;
  }
  if (textToScan.includes('honeymoon') || textToScan.includes('vacation') || textToScan.includes('holiday') || textToScan.includes('tour') || textToScan.includes('trip') || textToScan.includes('travel')) {
    return SERVICE_IMAGE_PRESETS.tour;
  }

  // 4. Healthcare
  if (textToScan.includes('dental') || textToScan.includes('tooth') || textToScan.includes('teeth') || textToScan.includes('smile') || textToScan.includes('implant')) {
    return SERVICE_IMAGE_PRESETS.dental;
  }
  if (textToScan.includes('doctor') || textToScan.includes('clinic') || textToScan.includes('opd') || textToScan.includes('health') || textToScan.includes('physician') || textToScan.includes('surgeon')) {
    return SERVICE_IMAGE_PRESETS.doctor;
  }

  // 5. Beauty & Salon
  if (textToScan.includes('bridal') || textToScan.includes('makeup') || textToScan.includes('makeover')) {
    return SERVICE_IMAGE_PRESETS.bridal;
  }
  if (textToScan.includes('spa') || textToScan.includes('massage') || textToScan.includes('facial') || textToScan.includes('therapy')) {
    return SERVICE_IMAGE_PRESETS.spa;
  }
  if (textToScan.includes('salon') || textToScan.includes('hair') || textToScan.includes('stylist') || textToScan.includes('beauty')) {
    return SERVICE_IMAGE_PRESETS.salon;
  }

  // 6. Real Estate
  if (textToScan.includes('walkthrough') || textToScan.includes('3d') || textToScan.includes('virtual tour')) {
    return SERVICE_IMAGE_PRESETS.walkthrough;
  }
  if (textToScan.includes('site visit') || textToScan.includes('plot') || textToScan.includes('villa') || textToScan.includes('apartment') || textToScan.includes('property') || textToScan.includes('real estate') || textToScan.includes('builder')) {
    return SERVICE_IMAGE_PRESETS.sitevisit;
  }

  // 7. Interior & Architecture
  if (textToScan.includes('kitchen') || textToScan.includes('modular')) {
    return SERVICE_IMAGE_PRESETS.kitchen;
  }
  if (textToScan.includes('interior') || textToScan.includes('decor') || textToScan.includes('fitout')) {
    return SERVICE_IMAGE_PRESETS.interior;
  }
  if (textToScan.includes('architect') || textToScan.includes('blueprint') || textToScan.includes('elevation')) {
    return SERVICE_IMAGE_PRESETS.architect;
  }

  // 8. Insurance & CA & Professional
  if (textToScan.includes('insurance') || textToScan.includes('mediclaim') || textToScan.includes('policy') || textToScan.includes('claim')) {
    return SERVICE_IMAGE_PRESETS.insurance;
  }
  if (textToScan.includes('audit') || textToScan.includes('tax') || textToScan.includes('gst') || textToScan.includes('accounting') || textToScan.includes('ca ')) {
    return SERVICE_IMAGE_PRESETS.audit;
  }
  if (textToScan.includes('legal') || textToScan.includes('advocate') || textToScan.includes('lawyer') || textToScan.includes('court')) {
    return SERVICE_IMAGE_PRESETS.legal;
  }
  if (textToScan.includes('software') || textToScan.includes('tech') || textToScan.includes('developer') || textToScan.includes('code') || textToScan.includes('web')) {
    return SERVICE_IMAGE_PRESETS.tech;
  }

  // 9. Events & Photography
  if (textToScan.includes('wedding') || textToScan.includes('mandap') || textToScan.includes('reception') || textToScan.includes('planner')) {
    return SERVICE_IMAGE_PRESETS.wedding;
  }
  if (textToScan.includes('photo') || textToScan.includes('shoot') || textToScan.includes('video') || textToScan.includes('cinema') || textToScan.includes('camera')) {
    return SERVICE_IMAGE_PRESETS.photography;
  }

  // 10. Education
  if (textToScan.includes('school') || textToScan.includes('admission') || textToScan.includes('cbse') || textToScan.includes('icse') || textToScan.includes('campus')) {
    return SERVICE_IMAGE_PRESETS.school;
  }
  if (textToScan.includes('coaching') || textToScan.includes('neet') || textToScan.includes('iit') || textToScan.includes('upsc') || textToScan.includes('tutor') || textToScan.includes('class')) {
    return SERVICE_IMAGE_PRESETS.coaching;
  }

  // 11. Retail & Fashion
  if (textToScan.includes('saree') || textToScan.includes('silk') || textToScan.includes('lehenga') || textToScan.includes('boutique') || textToScan.includes('apparel')) {
    return SERVICE_IMAGE_PRESETS.saree;
  }
  if (textToScan.includes('jewel') || textToScan.includes('gold') || textToScan.includes('diamond')) {
    return SERVICE_IMAGE_PRESETS.jewellery;
  }
  if (textToScan.includes('phone') || textToScan.includes('mobile') || textToScan.includes('gadget')) {
    return SERVICE_IMAGE_PRESETS.mobile;
  }

  // Category fallback
  if (profileCategory) {
    const cat = profileCategory.toLowerCase();
    if (cat.includes('home')) return SERVICE_IMAGE_PRESETS.electrician;
    if (cat.includes('auto')) return SERVICE_IMAGE_PRESETS.car;
    if (cat.includes('travel')) return SERVICE_IMAGE_PRESETS.tour;
    if (cat.includes('real')) return SERVICE_IMAGE_PRESETS.sitevisit;
    if (cat.includes('health')) return SERVICE_IMAGE_PRESETS.doctor;
    if (cat.includes('beauty')) return SERVICE_IMAGE_PRESETS.salon;
    if (cat.includes('interior')) return SERVICE_IMAGE_PRESETS.interior;
    if (cat.includes('event')) return SERVICE_IMAGE_PRESETS.wedding;
    if (cat.includes('edu')) return SERVICE_IMAGE_PRESETS.school;
    if (cat.includes('prof')) return SERVICE_IMAGE_PRESETS.audit;
  }

  return SERVICE_IMAGE_PRESETS.default;
}
