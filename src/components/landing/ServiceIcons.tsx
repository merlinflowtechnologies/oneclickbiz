import React from 'react';

/**
 * 24 Bespoke, authentic, multi-tone original SVG icons
 * designed specifically for OneClickBiz's core services.
 */

export interface ServiceIconProps {
  className?: string;
}

const DEFAULT_CLASS = 'w-10 h-10 sm:w-11 sm:h-11';

export function PersonalProfileIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ppGrad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="28" height="26" rx="5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="18" cy="14" r="5" fill="url(#ppGrad)" />
      <path d="M10 27 C10 22 13.5 20.5 18 20.5 C22.5 20.5 26 22 26 27" fill="#1D4ED8" />
      <circle cx="27" cy="8" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M25.5 8 L26.8 9.3 L28.8 6.8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MiniWebsiteIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mwGrad" x1="6" y1="14" x2="30" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect x="3" y="5" width="30" height="26" rx="4" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
      <path d="M3 9 Q3 5 7 5 L29 5 Q33 5 33 9 L33 11 L3 11 Z" fill="#F3E8FF" />
      <circle cx="7" cy="8" r="1.3" fill="#EF4444" />
      <circle cx="11" cy="8" r="1.3" fill="#F59E0B" />
      <circle cx="15" cy="8" r="1.3" fill="#10B981" />
      <rect x="18" y="6.8" width="12" height="2.4" rx="1.2" fill="#E9D5FF" />
      <rect x="6" y="14" width="24" height="7" rx="2" fill="url(#mwGrad)" />
      <rect x="6" y="23" width="11" height="5" rx="1.5" fill="#EDE9FE" />
      <rect x="19" y="23" width="11" height="5" rx="1.5" fill="#DDD6FE" />
    </svg>
  );
}

export function WhatsAppStoreIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waGrad" x1="3" y1="3" x2="33" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25D366" />
          <stop offset="1" stopColor="#128C7E" />
        </linearGradient>
      </defs>
      <path
        d="M18 3 C9.7 3 3 9.7 3 18 C3 20.8 3.8 23.4 5.2 25.6 L3.5 31.5 L9.6 29.9 C11.7 31.2 14.2 32 18 32 C26.3 32 33 25.3 33 17 C33 8.7 26.3 3 18 3 Z"
        fill="url(#waGrad)"
      />
      {/* Official WhatsApp handset shape */}
      <path
        d="M13.2 10.5 C12.8 9.6 12.3 9.5 11.8 9.5 C11.4 9.5 10.9 9.5 10.5 10 C10.1 10.5 8.9 11.6 8.9 13.9 C8.9 16.2 10.6 18.4 10.8 18.7 C11.1 19 14.2 23.9 19 25.9 C22.9 27.5 23.7 27.2 24.5 27.1 C25.3 27 27.1 26 27.5 24.8 C27.9 23.7 27.9 22.7 27.8 22.5 C27.6 22.3 27.2 22.1 26.6 21.8 C26 21.5 23 20 22.5 19.8 C22 19.6 21.6 19.5 21.2 20.1 C20.8 20.7 19.7 22 19.4 22.3 C19.1 22.6 18.8 22.7 18.2 22.4 C17.6 22.1 15.6 21.4 13.3 19.3 C11.5 17.7 10.3 15.6 10 15 C9.7 14.4 9.9 14.1 10.2 13.8 C10.5 13.5 10.9 13 11.2 12.6 C11.5 12.2 11.6 11.9 11.8 11.5 C12 11.1 11.9 10.7 11.7 10.4 C11.5 10.1 10.6 8.2 10.1 7.2"
        fill="#FFFFFF"
      />
      {/* Subtle Mini Cart Accent Badge on Bottom Right */}
      <circle cx="27" cy="27" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M25 25 H29 L28.3 28.5 H25.7 Z" fill="#FFFFFF" />
      <circle cx="26" cy="29.2" r="0.7" fill="#FFFFFF" />
      <circle cx="28" cy="29.2" r="0.7" fill="#FFFFFF" />
    </svg>
  );
}

export function EcommerceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ecomGrad" x1="8" y1="11" x2="28" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <path d="M13 12 C13 7 15 5 18 5 C21 5 23 7 23 12" fill="none" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 12 L28 12 L26.2 31.5 C26.1 32.5 25.2 33 24.2 33 L11.8 33 C10.8 33 9.9 32.5 9.8 31.5 Z" fill="url(#ecomGrad)" />
      <path d="M10 12 L13.5 16.5 H22.5 L26 12" fill="none" stroke="#FDA4AF" strokeWidth="1.2" />
      {/* Golden Percent Promo Tag */}
      <rect x="17" y="19" width="9" height="7" rx="1.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" transform="rotate(-10 17 19)" />
      <path d="M18.5 23 L22.5 20 M19 20 H19.1 M22 23 H22.1" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function VisitingCardIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="28" height="20" rx="3.5" fill="#0F172A" stroke="#475569" strokeWidth="1.2" />
      {/* EMV Gold Chip */}
      <rect x="8" y="13" width="6" height="5" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
      <line x1="8" y1="15.5" x2="14" y2="15.5" stroke="#92400E" strokeWidth="0.5" />
      <line x1="11" y1="13" x2="11" y2="18" stroke="#92400E" strokeWidth="0.5" />
      {/* NFC Contactless Tap Waves */}
      <path d="M22 13 C23.5 14.5 23.5 16.5 22 18" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M25 11 C27.5 13.5 27.5 17.5 25 20" fill="none" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M28 9 C31.5 12.5 31.5 18.5 28 22" fill="none" stroke="#FCD34D" strokeWidth="1.4" strokeLinecap="round" />
      {/* Embossed Name & Number Lines */}
      <rect x="8" y="21.5" width="12" height="1.8" rx="0.9" fill="#94A3B8" />
    </svg>
  );
}

export function LeadExtractionsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="magGrad" x1="7" y1="6" x2="29" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Magnet Body */}
      <path d="M7 6 L12 6 L12 16 C12 20.5 15.5 22.5 18 22.5 C20.5 22.5 24 20.5 24 16 L24 6 L29 6 L29 16 C29 24.5 23.5 27.5 18 27.5 C12.5 27.5 7 24.5 7 16 Z" fill="url(#magGrad)" />
      {/* Magnet Poles */}
      <rect x="7" y="6" width="5" height="4" fill="#EF4444" rx="0.5" />
      <rect x="24" y="6" width="5" height="4" fill="#3B82F6" rx="0.5" />
      {/* Extracted Prospect Leads */}
      <circle cx="18" cy="14" r="3" fill="#10B981" />
      <path d="M14.5 19 C14.5 17.5 16 16.5 18 16.5 C20 16.5 21.5 17.5 21.5 19" fill="#059669" />
      <circle cx="13" cy="30" r="2.2" fill="#F59E0B" />
      <circle cx="23" cy="30" r="2.2" fill="#F59E0B" />
    </svg>
  );
}

export function CustomDomainIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="globeGrad" x1="4" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" fill="url(#globeGrad)" />
      <ellipse cx="16" cy="16" rx="6" ry="12" fill="none" stroke="#E0F2FE" strokeWidth="1.2" opacity="0.8" />
      <line x1="4" y1="16" x2="28" y2="16" stroke="#E0F2FE" strokeWidth="1.2" opacity="0.8" />
      <line x1="6" y1="10.5" x2="26" y2="10.5" stroke="#E0F2FE" strokeWidth="1" opacity="0.6" />
      <line x1="6" y1="21.5" x2="26" y2="21.5" stroke="#E0F2FE" strokeWidth="1" opacity="0.6" />
      {/* Verified SSL Padlock Badge */}
      <rect x="20" y="20" width="12" height="11" rx="2.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M23 20 V17.5 C23 15.8 24.3 14.5 26 14.5 C27.7 14.5 29 15.8 29 17.5 V20" fill="none" stroke="#059669" strokeWidth="1.8" />
      <circle cx="26" cy="25" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function ReviewsRatingsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starGold" x1="4" y1="3" x2="32" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Faceted Golden Star */}
      <path
        d="M18 3 L22.2 12.5 L32.5 13.5 L24.8 20.3 L27 30.5 L18 25 L9 30.5 L11.2 20.3 L3.5 13.5 L13.8 12.5 Z"
        fill="url(#starGold)"
      />
      {/* Facet Shading */}
      <path d="M18 3 L18 25 L9 30.5 L11.2 20.3 L3.5 13.5 L13.8 12.5 Z" fill="#B45309" opacity="0.22" />
      {/* Sparkle Gleams */}
      <path d="M28 4 L29 7 L32 8 L29 9 L28 12 L27 9 L24 8 L27 7 Z" fill="#FEF08A" />
      <path d="M6 24 L7 26.5 L9.5 27.5 L7 28.5 L6 31 L5 28.5 L2.5 27.5 L5 26.5 Z" fill="#FEF08A" />
    </svg>
  );
}

export function GallerySpaceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scenicGrad" x1="12" y1="9" x2="30" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset="0.6" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Back Polaroid Card Tilted */}
      <rect x="4" y="4" width="22" height="24" rx="2.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" transform="rotate(-8 15 16)" />
      {/* Front Polaroid Card */}
      <rect x="10" y="8" width="22" height="25" rx="3" fill="#FFFFFF" stroke="#0D9488" strokeWidth="1.3" />
      <rect x="12" y="10" width="18" height="15" rx="1.5" fill="url(#scenicGrad)" />
      <circle cx="25" cy="14" r="2.5" fill="#FEF08A" />
      {/* Mountain Silhouettes */}
      <path d="M12 25 L18 17 L23 23 L26 19 L30 25 Z" fill="#047857" />
      <path d="M17 25 L21 20 L27 25 Z" fill="#065F46" />
    </svg>
  );
}

export function ArticlesBlogsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="22" height="28" rx="3" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.5" />
      <rect x="9" y="8" width="16" height="4.5" rx="1" fill="#3B82F6" />
      <rect x="9" y="15.5" width="16" height="2" rx="1" fill="#93C5FD" />
      <rect x="9" y="19.5" width="14" height="2" rx="1" fill="#BFDBFE" />
      <rect x="9" y="23.5" width="10" height="2" rx="1" fill="#DBEAFE" />
      {/* Fountain Pen Writing */}
      <path d="M23 23 L31 7 L32.5 8.5 L24.5 24.5 Z" fill="#1D4ED8" />
      <path d="M22 25 L24.5 24.5 L23 23 Z" fill="#F59E0B" />
      <circle cx="22.5" cy="24.5" r="0.6" fill="#1E293B" />
    </svg>
  );
}

export function CommercialUsageIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="corpGrad" x1="18" y1="5" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      {/* Left Tower */}
      <rect x="4" y="12" width="12" height="20" rx="1.5" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.2" />
      <rect x="6.5" y="15" width="2" height="2" fill="#F97316" />
      <rect x="10.5" y="15" width="2" height="2" fill="#F97316" />
      <rect x="6.5" y="19" width="2" height="2" fill="#F97316" />
      <rect x="10.5" y="19" width="2" height="2" fill="#F97316" />
      {/* Right Modern Skyscraper */}
      <rect x="18" y="5" width="14" height="27" rx="2" fill="url(#corpGrad)" stroke="#9A3412" strokeWidth="1.2" />
      <rect x="21" y="8" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      <rect x="26" y="8" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      <rect x="21" y="13" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      <rect x="26" y="13" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      <rect x="21" y="18" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      <rect x="26" y="18" width="2.5" height="2.5" rx="0.5" fill="#FEF08A" />
      {/* Entrance Door */}
      <rect x="23" y="27" width="4" height="5" fill="#7C2D12" />
    </svg>
  );
}

export function ScalingBusinessIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rocketGrad" x1="5" y1="20" x2="31" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      {/* Rising Bar Chart */}
      <rect x="5" y="24" width="5" height="8" rx="1" fill="#FECDD3" />
      <rect x="12" y="18" width="5" height="14" rx="1" fill="#FDA4AF" />
      <rect x="19" y="12" width="5" height="20" rx="1" fill="#FB7185" />
      <rect x="26" y="7" width="5" height="25" rx="1" fill="#E11D48" />
      {/* Upward Rocket / Trajectory Arrow */}
      <path d="M4 22 Q14 17 22 10 L29 4" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="29,2 33,5 29,8" fill="#E11D48" />
      {/* Sparkle Peak */}
      <circle cx="31" cy="5" r="1.5" fill="#FBBF24" />
    </svg>
  );
}

export function CustomTemplatesIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 4 Multi-Color Template Wireframes */}
      <rect x="4" y="5" width="12.5" height="11.5" rx="2.5" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.2" />
      <rect x="6" y="7" width="8.5" height="3" rx="1" fill="#8B5CF6" />
      <rect x="6" y="12" width="8.5" height="2" rx="0.5" fill="#C4B5FD" />

      <rect x="19.5" y="5" width="12.5" height="11.5" rx="2.5" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2" />
      <rect x="21.5" y="7" width="8.5" height="3" rx="1" fill="#3B82F6" />
      <rect x="21.5" y="12" width="8.5" height="2" rx="0.5" fill="#93C5FD" />

      <rect x="4" y="19.5" width="12.5" height="11.5" rx="2.5" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.2" />
      <rect x="6" y="21.5" width="8.5" height="3" rx="1" fill="#10B981" />
      <rect x="6" y="26.5" width="8.5" height="2" rx="0.5" fill="#6EE7B7" />

      <rect x="19.5" y="19.5" width="12.5" height="11.5" rx="2.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.2" />
      <rect x="21.5" y="21.5" width="8.5" height="3" rx="1" fill="#EF4444" />
      <rect x="21.5" y="26.5" width="8.5" height="2" rx="0.5" fill="#FCA5A5" />
    </svg>
  );
}

export function EasyDesigningIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Artist Palette */}
      <path
        d="M18 4 C10 4 4 10 4 18 C4 23 7 27 12 29 C14 29.8 15.5 28.5 15.5 27 C15.5 25.5 16.5 24.5 18 24.5 C20 24.5 22 25.5 22 27 C22 29 24 31 27 31 C30 31 33 27 33 21 C33 11 26 4 18 4 Z"
        fill="#FFF1F2"
        stroke="#E11D48"
        strokeWidth="1.4"
      />
      {/* Paint Color Blobs */}
      <circle cx="10" cy="14" r="2.2" fill="#3B82F6" />
      <circle cx="16" cy="9.5" r="2.2" fill="#E11D48" />
      <circle cx="23" cy="10.5" r="2.2" fill="#F59E0B" />
      <circle cx="27" cy="16.5" r="2.2" fill="#10B981" />
      <circle cx="25" cy="24" r="2.2" fill="#8B5CF6" />
      <circle cx="12" cy="22" r="2.5" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="1" />
      {/* Paintbrush */}
      <line x1="29" y1="3" x2="19" y2="18" stroke="#78350F" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19 18 L17.5 20.5 L20 20 Z" fill="#E11D48" />
    </svg>
  );
}

export function ProductSpaceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 3D Isometric Product Box */}
      <polygon points="18,5 29,11 18,17 7,11" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
      <polygon points="7,11 18,17 18,31 7,24" fill="#D97706" stroke="#B45309" strokeWidth="1.2" />
      <polygon points="18,17 29,11 29,24 18,31" fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
      {/* Packaging Sealing Tape */}
      <polygon points="16,4 20,6 20,18 16,16" fill="#FCD34D" opacity="0.8" />
      {/* Shipping Barcode Label */}
      <polygon points="21,18 27,15 27,21 21,24" fill="#FFFFFF" />
      <line x1="22.5" y1="18" x2="22.5" y2="21" stroke="#000" strokeWidth="0.8" />
      <line x1="24" y1="17.2" x2="24" y2="20.2" stroke="#000" strokeWidth="0.8" />
      <line x1="25.5" y1="16.4" x2="25.5" y2="19.4" stroke="#000" strokeWidth="0.8" />
    </svg>
  );
}

export function ServicesManagementIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gearGrad" x1="8" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* Precision Cogwheel */}
      <path
        d="M18 11 C14.1 11 11 14.1 11 18 C11 21.9 14.1 25 18 25 C21.9 25 25 21.9 25 18 C25 14.1 21.9 11 18 11 Z"
        fill="url(#gearGrad)"
      />
      <circle cx="18" cy="18" r="3.5" fill="#FFFFFF" />
      {/* Cogs */}
      <rect x="16.5" y="8" width="3" height="3" rx="0.5" fill="#3B82F6" />
      <rect x="16.5" y="25" width="3" height="3" rx="0.5" fill="#1D4ED8" />
      <rect x="8" y="16.5" width="3" height="3" rx="0.5" fill="#2563EB" />
      <rect x="25" y="16.5" width="3" height="3" rx="0.5" fill="#2563EB" />
      {/* Steel Calibration Wrench */}
      <path d="M29 6 L24 11 L26 13 L31 8 C32 7 32 6 31 5 C30 4 29 5 29 6 Z" fill="#64748B" />
      <line x1="25" y1="12" x2="16" y2="28" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function CustomizedQrIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dynamic QR Container */}
      <rect x="4" y="4" width="28" height="28" rx="4" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1.4" />
      {/* 3 Corner Positioning Eyes */}
      <rect x="7" y="7" width="7" height="7" rx="1.5" fill="#7C3AED" />
      <rect x="8.5" y="8.5" width="4" height="4" rx="0.5" fill="#FFFFFF" />
      <rect x="9.5" y="9.5" width="2" height="2" rx="0.3" fill="#7C3AED" />

      <rect x="22" y="7" width="7" height="7" rx="1.5" fill="#7C3AED" />
      <rect x="23.5" y="8.5" width="4" height="4" rx="0.5" fill="#FFFFFF" />
      <rect x="24.5" y="9.5" width="2" height="2" rx="0.3" fill="#7C3AED" />

      <rect x="7" y="22" width="7" height="7" rx="1.5" fill="#7C3AED" />
      <rect x="8.5" y="23.5" width="4" height="4" rx="0.5" fill="#FFFFFF" />
      <rect x="9.5" y="24.5" width="2" height="2" rx="0.3" fill="#7C3AED" />

      {/* Center OneClickBiz Brand Eye */}
      <circle cx="18" cy="18" r="3.5" fill="#174BFF" />
      <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" />

      {/* QR Data Pattern Dots */}
      <rect x="16" y="8" width="2" height="2" fill="#8B5CF6" />
      <rect x="16" y="26" width="2" height="2" fill="#8B5CF6" />
      <rect x="26" y="16" width="2" height="2" fill="#8B5CF6" />
      <rect x="22" y="22" width="3" height="3" fill="#8B5CF6" />
    </svg>
  );
}

export function PaymentGatewaysIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="4" y1="7" x2="27" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
      </defs>
      {/* Primary Card */}
      <rect x="4" y="7" width="22" height="15" rx="2.5" fill="url(#cardGrad)" stroke="#38BDF8" strokeWidth="1" />
      <rect x="7" y="11" width="4.5" height="3.5" rx="0.8" fill="#FBBF24" />
      {/* Front Accent Card with Rupee / UPI symbol */}
      <rect x="11" y="14" width="21" height="15" rx="2.5" fill="#0F172A" stroke="#10B981" strokeWidth="1.2" />
      {/* Rupee Symbol in Emerald */}
      <path
        d="M18 19 H23 M18 21.5 H22 M18 19 V26 M20 21.5 C22 21.5 22.5 23.5 20.5 25 L23.5 28"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="22" r="2.5" fill="#10B981" />
      <path d="M27 22 L27.8 22.8 L29.2 21.2" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CanvaAdobeIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Official Canva Turquoise-Cyan to Purple Gradient */}
        <linearGradient id="canvaCircleGrad" x1="3" y1="8" x2="21" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
        {/* Official Adobe Vibrant Red Gradient */}
        <linearGradient id="adobeRectGrad" x1="16" y1="10" x2="33" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#CC0000" />
        </linearGradient>
      </defs>

      {/* Official Canva Logo Badge (Left Circle) */}
      <circle cx="12" cy="18" r="9.5" fill="url(#canvaCircleGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
      {/* Canva Authentic C Glyph */}
      <path
        d="M15.5 13.5 C14.2 12.2 12.2 12.2 10.5 13.5 C8.5 15.2 8.5 19.5 11 21.5 C12.8 22.8 15 22.2 16 20.8"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Official Adobe Logo Badge (Right Rounded Square) */}
      <rect x="17" y="10" width="16" height="16" rx="4" fill="url(#adobeRectGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
      {/* Official Adobe Triangular "A" Symbol */}
      <path d="M19.5 23 L22.8 13.5 L24.5 13.5 L27.2 23 Z" fill="#FFFFFF" />
      <polygon points="23.2,16.5 25.8,23 20.8,23" fill="#CC0000" />
    </svg>
  );
}

export function EmailSignatureIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Business Envelope */}
      <rect x="4" y="10" width="28" height="20" rx="3" fill="#ECFEFF" stroke="#0891B2" strokeWidth="1.3" />
      <path d="M4 11 L18 21 L32 11" fill="none" stroke="#0891B2" strokeWidth="1.3" />
      {/* Signature Card */}
      <rect x="8" y="4" width="20" height="13" rx="2" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="1" />
      {/* Elegant Cursive Signature Line */}
      <path
        d="M11 12 C12.5 10 13.5 14 15 11.5 C16.5 9 18 13 20 11.5 C22 10 24 12 25 11"
        fill="none"
        stroke="#0E7490"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Wax / Signature Seal */}
      <circle cx="25" cy="22" r="3" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M24 22 L24.8 22.8 L26 21.2" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReportPdfIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Adobe Acrobat Style PDF Document */}
      <path d="M8 4 L22 4 L28 10 L28 32 L8 32 Z" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.4" />
      <polygon points="22,4 28,10 22,10" fill="#FCA5A5" />
      {/* Bold Red PDF Banner */}
      <rect x="5" y="13" width="26" height="9" rx="2" fill="#DC2626" />
      <text x="18" y="20" fill="#FFFFFF" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="0.8">
        PDF
      </text>
      {/* Download Export Arrow */}
      <path d="M18 25 L18 29.5 M15 27.5 L18 30.5 L21 27.5" fill="none" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LiveProfileIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Broadcast Transmission Mast */}
      <polygon points="18,12 14.5,30 21.5,30" fill="#EF4444" opacity="0.9" />
      <circle cx="18" cy="11" r="3.5" fill="#DC2626" stroke="#FEF2F2" strokeWidth="1" />
      {/* Pulsing Green LIVE Beacon */}
      <circle cx="18" cy="11" r="1.6" fill="#22C55E" />
      {/* Concentric Broadcast Waves */}
      <path d="M12 7 C8.5 10.5 8.5 15.5 12 19" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 7 C27.5 10.5 27.5 15.5 24 19" fill="none" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.5 4 C4 9.5 4 18.5 8.5 24" fill="none" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M27.5 4 C32 9.5 32 18.5 27.5 24" fill="none" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function DirectAppIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Smartphone Chassis */}
      <rect x="7" y="3" width="22" height="30" rx="4.5" fill="#0F172A" stroke="#334155" strokeWidth="1.3" />
      <rect x="9" y="6" width="18" height="24" rx="2" fill="#F0FDF4" />
      {/* Home Screen App Grid */}
      <rect x="11" y="9" width="3.2" height="3.2" rx="0.8" fill="#10B981" />
      <rect x="16.4" y="9" width="3.2" height="3.2" rx="0.8" fill="#3B82F6" />
      <rect x="21.8" y="9" width="3.2" height="3.2" rx="0.8" fill="#F59E0B" />
      <rect x="11" y="14" width="3.2" height="3.2" rx="0.8" fill="#8B5CF6" />
      {/* 1-Tap Installation Arrow Badge */}
      <circle cx="21" cy="21" r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M21 18.5 L21 23 M19 21.5 L21 23.5 L23 21.5" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BusinessToolsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bcGrad" x1="5" y1="11" x2="31" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4338CA" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
      </defs>
      {/* Briefcase Handle */}
      <path d="M13 11 V7 C13 5.5 14.5 4.5 16 4.5 H20 C21.5 4.5 23 5.5 23 7 V11" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      {/* Briefcase Body */}
      <rect x="5" y="11" width="26" height="19" rx="3" fill="url(#bcGrad)" stroke="#1E1B4B" strokeWidth="1.2" />
      {/* Gold Center Clasp */}
      <rect x="16.5" y="16" width="3" height="4" rx="0.6" fill="#FBBF24" stroke="#B45309" strokeWidth="0.5" />
      <line x1="11" y1="11" x2="11" y2="30" stroke="#6366F1" strokeWidth="0.9" opacity="0.6" />
      <line x1="25" y1="11" x2="25" y2="30" stroke="#6366F1" strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}
