export type ThemeType = 
  | 'modern-indigo'
  | 'dark-onyx'
  | 'glassmorphic'
  | 'emerald-pro'
  | 'sunset-gold'
  | 'cyber-neon'
  | 'obsidian-gold'
  | 'royal-navy'
  | 'brahmin-food';

export interface SocialLinkItem {
  id: string;
  platform: 'whatsapp' | 'phone' | 'email' | 'linkedin' | 'instagram' | 'twitter' | 'youtube' | 'github' | 'website' | 'telegram' | 'facebook' | 'discord' | 'tiktok' | 'dribbble' | 'behance' | 'threads' | 'spotify' | 'medium' | (string & {});
  url: string;
  label?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  price: number;
  currency: string;
  category?: string;
  perks?: string[];
  isAvailable?: boolean;
}


export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  sku?: string;
  isAvailable: boolean;
  // Real Estate Extended Properties
  reraId?: string;
  approvalType?: string;
  corridor?: string;
  dimensions?: string;
  status?: string;
  brochureUrl?: string;
  amenities?: string[];
  priceLabel?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title?: string;
  category?: string;
  description?: string;
  linkUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string; // YouTube URL, Instagram reel URL, or direct MP4 video URL
  type: 'youtube' | 'instagram' | 'direct';
  embedUrl?: string;
  caption?: string;
  thumbnailUrl?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  clientAvatar?: string;
  content: string;
  rating: number;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  readTimeMinutes: number;
  publishedAt: string;
  authorName?: string;
  isPublished: boolean;
  tags?: string[];
  viewsCount?: number;
}

export interface CustomLinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  highlight?: boolean;
}

export interface RealEstateTrustConfig {
  reraId?: string;
  trackRecordYears?: string | number;
  developedAcres?: string | number;
  deliveredProjects?: string | number;
  happyFamilies?: string | number;
  clearTitleRating?: string;
  primaryCorridor?: string;
  city?: string;
}

export interface InteriorTrustConfig {
  iiidId?: string;
  warrantyYears?: string;
  turnkeyGuaranteeDays?: string;
  completedHomes?: string;
  sqftTransformed?: string;
  happyClients?: string;
  city?: string;
  experienceCenter?: string;
}

export interface HealthcareTrustConfig {
  regNumber?: string;
  degrees?: string;
  specialization?: string;
  opdTimings?: string;
  consultationFee?: string;
  hospitalAffiliation?: string;
  emergencyPhone?: string;
  [key: string]: any;
}

export interface AutomobileTrustConfig {
  brandAuthorized?: string;
  inspectionCertification?: string;
  testDriveTimings?: string;
  financePartners?: string;
  warrantyCoverage?: string;
  [key: string]: any;
}

export interface FashionTrustConfig {
  certification?: string;
  coutureSpecialization?: string;
  consultationTimings?: string;
  shippingCoverage?: string;
  exchangePolicy?: string;
  [key: string]: any;
}

export interface EducationTrustConfig {
  boardAffiliation?: string;
  accreditation?: string;
  establishedYear?: string;
  totalStudentsTrained?: string;
  placementRate?: string;
  demoTimings?: string;
  [key: string]: any;
}

export interface BeautyTrustConfig {
  stylistCertification?: string;
  hygieneProtocol?: string;
  operatingHours?: string;
  bridalSlotsNotice?: string;
  productBrandsUsed?: string;
  [key: string]: any;
}

export interface EventsTrustConfig {
  eventSpecialization?: string;
  eventsExecuted?: string;
  experienceYears?: string;
  productionCapability?: string;
  serviceLocations?: string;
  [key: string]: any;
}

export interface TravelTrustConfig {
  agencyRegistration?: string;
  destinationsCovered?: string;
  happyTravelers?: string;
  supportHours?: string;
  customizationPolicy?: string;
  [key: string]: any;
}

export interface ProfileSectionConfig {
  about?: { content: string };
  services?: { items: ServiceItem[] };
  socials?: { items: SocialLinkItem[] };
  gallery?: { items: GalleryItem[] };
  videos?: { items: VideoItem[] };
  blogs?: { items: BlogPostItem[] };
  products?: { items: ProductItem[] };
  testimonials?: { items: TestimonialItem[] };
  customLinks?: { items: CustomLinkItem[] };
  realEstate?: RealEstateTrustConfig;
  interior?: InteriorTrustConfig;
  healthcare?: HealthcareTrustConfig;
  automobile?: AutomobileTrustConfig;
  fashion?: FashionTrustConfig;
  education?: EducationTrustConfig;
  beauty?: BeautyTrustConfig;
  events?: EventsTrustConfig;
  travel?: TravelTrustConfig;
  [key: string]: any;
  contact?: {
    showEmail: boolean;
    showPhone: boolean;
    showWhatsapp: boolean;
    showAddress: boolean;
    showWebsite: boolean;
    allowInquiries: boolean;
  };
}

export type SectionType = 
  | 'hero'
  | 'about'
  | 'socials'
  | 'services'
  | 'blogs'
  | 'products'
  | 'gallery'
  | 'videos'
  | 'booking'
  | 'testimonials'
  | 'customLinks'
  | 'contact';

export interface ProfileSection {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  order: number;
}

export interface DigitalProfile {
  id: string;
  organizationId: string;
  slug: string;
  name: string;
  designation: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
  avatarUrl: string;
  coverUrl: string;
  theme: ThemeType;
  templateId?: string;
  category?: string;
  customDomain?: string;
  isPublished: boolean;
  sections: ProfileSection[];
  sectionData: ProfileSectionConfig;
  qrCodeId?: string;
  nfcCardId?: string;
  subscriptionStatus?: 'ACTIVE' | 'EXPIRED' | 'TRIAL' | 'CANCELLED' | 'UNPAID';
  isExpired?: boolean;
  upiId?: string;
  upiQrUrl?: string;
  googleReviewUrl?: string;
  stats: {
    views: number;
    qrScans: number;
    nfcTaps: number;
    whatsappClicks: number;
    callClicks: number;
    vcfDownloads: number;
  };
}

export interface BookingSlot {
  id: string;
  serviceId: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface LeadItem {
  id: string;
  profileId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  notes?: string;
  createdAt: string;
}

export interface OrderCartItem {
  product: ProductItem;
  quantity: number;
}

export interface StoreOrder {
  id: string;
  profileId: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderCartItem[];
  totalAmount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface DynamicQrConfig {
  id: string;
  code: string;
  targetSlug: string;
  foregroundColor: string;
  backgroundColor: string;
  logoUrl?: string;
  scanCount: number;
}

export interface NfcCardItem {
  id: string;
  cardCode: string;
  profileSlug: string;
  serialNumber: string;
  status: 'ACTIVE' | 'INACTIVE' | 'UNASSIGNED';
  tapCount: number;
  fulfillmentStatus: 'ORDERED' | 'PRINTING' | 'SHIPPED' | 'DELIVERED';
  createdAt: string;
}
