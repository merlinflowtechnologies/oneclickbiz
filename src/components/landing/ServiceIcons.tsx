import React from 'react';

/**
 * 24 High-Fidelity, Realistic 3D-Styled SVG Icons
 * Crafted specifically for OneClickBiz's core services.
 * Features realistic depth, specular highlights, rich multi-stop gradients,
 * tactile material textures, and soft ambient drop shadows.
 */

export interface ServiceIconProps {
  className?: string;
}

const DEFAULT_CLASS = 'w-10 h-10 sm:w-11 sm:h-11';

// 1. PERSONAL PROFILE — 3D Glossy ID Badge Card with Hologram & Portrait
export function PersonalProfileIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pp_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#1E3A8A" floodOpacity="0.18" />
        </filter>
        <linearGradient id="pp_body" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#F0F6FF" />
          <stop offset="1" stopColor="#DCE8FD" />
        </linearGradient>
        <linearGradient id="pp_header" x1="8" y1="6" x2="40" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="pp_holo" x1="10" y1="36" x2="38" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.3" stopColor="#A78BFA" />
          <stop offset="0.7" stopColor="#34D399" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="pp_avatar" x1="16" y1="18" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>

      {/* Lanyard Clip on Top */}
      <rect x="21" y="2" width="6" height="5" rx="1.5" fill="#94A3B8" />
      <rect x="22" y="2.5" width="4" height="1.5" rx="0.7" fill="#F1F5F9" />

      {/* Main Card Body with Realistic Shadow */}
      <g filter="url(#pp_shadow)">
        <rect x="8" y="6" width="32" height="38" rx="5" fill="url(#pp_body)" stroke="#BFDBFE" strokeWidth="1" />
      </g>

      {/* Card Header Strip */}
      <path d="M8 11 C8 8.2 10.2 6 13 6 H35 C37.8 6 40 8.2 40 11 V16 H8 V11 Z" fill="url(#pp_header)" />
      
      {/* Lanyard Hole Slot */}
      <rect x="20" y="8" width="8" height="2.5" rx="1.25" fill="#1E40AF" opacity="0.6" />

      {/* Glossy Photo Badge Frame */}
      <circle cx="24" cy="24" r="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="7" fill="url(#pp_avatar)" />

      {/* Realistic Head & Shoulder Silhouette */}
      <circle cx="24" cy="21.5" r="3" fill="#DBEAFE" />
      <path d="M19 28 C19 25.5 21 24.5 24 24.5 C27 24.5 29 25.5 29 28" fill="#DBEAFE" />

      {/* Holographic Security Foil Strip */}
      <rect x="12" y="34" width="24" height="3" rx="1.5" fill="url(#pp_holo)" opacity="0.85" />
      
      {/* Name Text Lines */}
      <rect x="14" y="39" width="20" height="2" rx="1" fill="#94A3B8" />

      {/* Verified Green Badge on Corner */}
      <circle cx="34" cy="20" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M32.2 20 L33.5 21.3 L35.8 19" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 2. MINI WEBSITE — 3D Glass Browser Viewport with Realistic UI Layout
export function MiniWebsiteIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="mw_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#5B21B6" floodOpacity="0.2" />
        </filter>
        <linearGradient id="mw_body" x1="6" y1="7" x2="42" y2="41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F5F3FF" />
        </linearGradient>
        <linearGradient id="mw_hero" x1="10" y1="19" x2="38" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="mw_btn" x1="28" y1="31" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>

      {/* Browser Window Chassis */}
      <g filter="url(#mw_shadow)">
        <rect x="6" y="7" width="36" height="34" rx="5" fill="url(#mw_body)" stroke="#C4B5FD" strokeWidth="1.2" />
      </g>

      {/* Browser Header Bar */}
      <path d="M6 12 C6 9.2 8.2 7 11 7 H37 C39.8 7 42 9.2 42 12 V15 H6 V12 Z" fill="#EDE9FE" />
      
      {/* Realistic 3-Button Window Controls (Glossy) */}
      <circle cx="11" cy="11" r="1.8" fill="#EF4444" />
      <circle cx="16" cy="11" r="1.8" fill="#F59E0B" />
      <circle cx="21" cy="11" r="1.8" fill="#10B981" />

      {/* Address Bar Pill with SSL Lock */}
      <rect x="25" y="9" width="13" height="4" rx="2" fill="#FFFFFF" stroke="#DDD6FE" strokeWidth="0.8" />
      <circle cx="27.5" cy="11" r="1" fill="#10B981" />

      {/* 3D Hero Banner Block */}
      <rect x="10" y="18" width="28" height="10" rx="3" fill="url(#mw_hero)" />
      {/* Banner Mockup Content */}
      <rect x="13" y="21" width="14" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
      <rect x="13" y="24.5" width="9" height="1.5" rx="0.75" fill="#E9D5FF" />

      {/* Left Column Card */}
      <rect x="10" y="31" width="13" height="7" rx="2" fill="#F3E8FF" stroke="#DDD6FE" strokeWidth="0.8" />
      <rect x="12" y="33" width="9" height="1.5" rx="0.7" fill="#8B5CF6" />
      <rect x="12" y="35.5" width="6" height="1.2" rx="0.6" fill="#C4B5FD" />

      {/* Right Interactive CTA Button with 3D Depth */}
      <rect x="26" y="31" width="12" height="7" rx="2" fill="url(#mw_btn)" />
      <polygon points="31,33 34,34.5 31,36" fill="#FFFFFF" />
    </svg>
  );
}

// 3. WHATSAPP STORE — 3D Emerald Bubble with Gloss & Golden Mini-Cart
export function WhatsAppStoreIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="wa_shadow" x="2" y="3" width="44" height="43" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#065F46" floodOpacity="0.25" />
        </filter>
        <radialGradient id="wa_gloss" cx="20" cy="12" r="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="0.6" stopColor="#10B981" />
          <stop offset="1" stopColor="#047857" />
        </radialGradient>
        <linearGradient id="wa_cart_grad" x1="28" y1="26" x2="43" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* 3D WhatsApp Chat Bubble with Drop Shadow */}
      <g filter="url(#wa_shadow)">
        <path
          d="M24 5 C13.5 5 5 13.5 5 24 C5 27.6 6 30.9 7.8 33.7 L5.5 42 L14.2 39.7 C17.1 41.5 20.4 42.5 24 42.5 C34.5 42.5 43 34 43 23.5 C43 13 34.5 5 24 5 Z"
          fill="url(#wa_gloss)"
        />
      </g>

      {/* Specular Highlight Arc */}
      <path
        d="M12 11 C15.5 8 20 6.5 25 6.5 C31 6.5 36.5 9 39.5 13.5"
        stroke="#A7F3D0"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Authentic WhatsApp Handset Silhouette */}
      <path
        d="M17.5 14.5 C16.9 13.2 16.2 13.1 15.5 13.1 C14.9 13.1 14.2 13.1 13.6 13.8 C13 14.5 11.3 16.1 11.3 19.3 C11.3 22.5 13.6 25.6 14 26 C14.4 26.5 18.5 33.1 25 35.8 C30.3 38 31.4 37.6 32.5 37.4 C33.6 37.3 36.1 35.9 36.6 34.2 C37.2 32.6 37.2 31.3 37 31 C36.8 30.7 36.2 30.5 35.4 30.1 C34.5 29.7 30.4 27.7 29.7 27.4 C29 27.1 28.4 27 27.9 27.8 C27.3 28.7 25.8 30.5 25.4 30.9 C25 31.3 24.6 31.5 23.7 31 C22.9 30.6 20.1 29.7 16.8 26.7 C14.2 24.4 12.5 21.5 12 20.7 C11.6 19.9 11.9 19.5 12.4 19 C12.8 18.6 13.3 17.9 13.8 17.3 C14.3 16.7 14.5 16.3 14.8 15.7 C15.1 15.2 15 14.7 14.7 14.2 C14.4 13.7 13.2 10.8 12.7 9.5"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Floating 3D Gold Shopping Cart Badge on Bottom Right */}
      <circle cx="35" cy="35" r="8" fill="url(#wa_cart_grad)" stroke="#FFFFFF" strokeWidth="2" />
      {/* Mini Cart Icon */}
      <path d="M31 31.5 H33 L34.5 36.5 H38.5 L39.8 32.5 H33.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34.8" cy="38" r="0.9" fill="#FFFFFF" />
      <circle cx="38.2" cy="38" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

// 4. E-COMMERCE — 3D Retail Paper Tote Bag with Rope Handles & Golden Tag
export function EcommerceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ec_shadow" x="6" y="8" width="36" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#9F1239" floodOpacity="0.22" />
        </filter>
        <linearGradient id="ec_bag" x1="12" y1="16" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB7185" />
          <stop offset="0.5" stopColor="#E11D48" />
          <stop offset="1" stopColor="#9F1239" />
        </linearGradient>
        <linearGradient id="ec_crease" x1="20" y1="16" x2="28" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BE123C" />
          <stop offset="1" stopColor="#881337" />
        </linearGradient>
      </defs>

      {/* 3D Braided Cord Handles */}
      <path
        d="M17 18 C17 9 20 6 24 6 C28 6 31 9 31 18"
        stroke="#F43F5E"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 18 C17.5 10 20.2 7.5 24 7.5 C27.8 7.5 30.5 10 30.5 18"
        stroke="#FFE4E6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Main Tote Bag Body with Shadow */}
      <g filter="url(#ec_shadow)">
        <polygon points="10,16 38,16 35,43 13,43" fill="url(#ec_bag)" />
      </g>

      {/* Bag Folding Gusset Crease for Realism */}
      <polygon points="21,16 27,16 25.5,43 22.5,43" fill="url(#ec_crease)" opacity="0.4" />
      
      {/* Folded Top Lip */}
      <polygon points="10,16 38,16 37.5,19 10.5,19" fill="#FDA4AF" opacity="0.6" />

      {/* Golden Foil Discount Star Tag with String */}
      <line x1="29" y1="18" x2="31" y2="24" stroke="#FEF08A" strokeWidth="1" />
      <rect x="27" y="24" width="10" height="9" rx="2" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" transform="rotate(-12 27 24)" />
      <text x="31" y="30.5" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle" transform="rotate(-12 27 24)">%</text>
    </svg>
  );
}

// 5. VISITING CARDS, FLYERS & BROCHURES — Stacked Matte Black NFC Cards with Gold Chip
export function VisitingCardIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="vc_shadow" x="2" y="6" width="44" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
        <linearGradient id="vc_back" x1="8" y1="8" x2="40" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="vc_front" x1="6" y1="14" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="0.6" stopColor="#0F172A" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="gold_chip" x1="11" y1="21" x2="19" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.4" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Back Offset Card (Creating Depth) */}
      <rect x="10" y="8" width="32" height="22" rx="4" fill="url(#vc_back)" stroke="#475569" strokeWidth="0.8" opacity="0.6" transform="rotate(-6 26 19)" />

      {/* Front Hero NFC Visiting Card */}
      <g filter="url(#vc_shadow)">
        <rect x="6" y="14" width="36" height="24" rx="4.5" fill="url(#vc_front)" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
      </g>

      {/* Diagonal Sheen Highlight Line */}
      <path d="M12 15 L38 37" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.12" />

      {/* Realistic Gold EMV Smart Chip */}
      <rect x="11" y="21" width="8" height="6.5" rx="1.5" fill="url(#gold_chip)" stroke="#D97706" strokeWidth="0.6" />
      <line x1="11" y1="24.2" x2="19" y2="24.2" stroke="#78350F" strokeWidth="0.5" />
      <line x1="15" y1="21" x2="15" y2="27.5" stroke="#78350F" strokeWidth="0.5" />

      {/* Glowing Contactless NFC Waves */}
      <path d="M29 21 C31 23 31 26 29 28" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33 18.5 C36 22 36 27.5 33 31" stroke="#FBBF24" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M37 16 C41 21 41 29 37 34" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />

      {/* Embossed Cardholder Name Line */}
      <rect x="11" y="31.5" width="14" height="2" rx="1" fill="#94A3B8" />
    </svg>
  );
}

// 6. LEAD EXTRACTIONS — 3D Chrome Horseshoe Magnet Pulling Golden Prospect Nodes
export function LeadExtractionsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="mag_shadow" x="4" y="6" width="40" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#312E81" floodOpacity="0.22" />
        </filter>
        <linearGradient id="mag_red" x1="8" y1="8" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="0.6" stopColor="#DC2626" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="mag_silver" x1="8" y1="8" x2="16" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* 3D Magnet Body with Shadow */}
      <g filter="url(#mag_shadow)">
        <path
          d="M9 8 H16 V22 C16 26.4 19.6 30 24 30 C28.4 30 32 26.4 32 22 V8 H39 V22 C39 30.3 32.3 37 24 37 C15.7 37 9 30.3 9 22 V8 Z"
          fill="url(#mag_red)"
        />
      </g>

      {/* Specular Ridge on Curved Base */}
      <path
        d="M12 22 C12 28.6 17.4 34 24 34 C30.6 34 36 28.6 36 22"
        stroke="#FCA5A5"
        strokeWidth="1.2"
        opacity="0.5"
      />

      {/* Silver Chrome Poles */}
      <rect x="9" y="8" width="7" height="6" fill="url(#mag_silver)" stroke="#CBD5E1" strokeWidth="0.8" />
      <rect x="32" y="8" width="7" height="6" fill="url(#mag_silver)" stroke="#CBD5E1" strokeWidth="0.8" />

      {/* Extracted Golden Lead Nodes Hovering with Radiance */}
      <circle cx="24" cy="18" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="24" cy="16.5" r="1.5" fill="#FFFFFF" />
      <path d="M21 21 C21 19.5 22.5 18.5 24 18.5 C25.5 18.5 27 19.5 27 21" fill="#FFFFFF" />

      {/* Radiating Attraction Sparkles */}
      <circle cx="16" cy="42" r="2.5" fill="#F59E0B" />
      <circle cx="32" cy="42" r="2.5" fill="#F59E0B" />
      <circle cx="24" cy="44" r="2" fill="#FBBF24" />
    </svg>
  );
}

// 7. CUSTOM DOMAIN & LANDING PAGES — Luminous Glass Globe with 3D Brass Padlock
export function CustomDomainIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="dom_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0369A1" floodOpacity="0.25" />
        </filter>
        <radialGradient id="globe_glow" cx="18" cy="16" r="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.6" stopColor="#0284C7" />
          <stop offset="1" stopColor="#075985" />
        </radialGradient>
        <linearGradient id="padlock_brass" x1="26" y1="26" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="0.5" stopColor="#EAB308" />
          <stop offset="1" stopColor="#A16207" />
        </linearGradient>
      </defs>

      {/* Luminous 3D Glass Planet with Shadow */}
      <g filter="url(#dom_shadow)">
        <circle cx="22" cy="22" r="16" fill="url(#globe_glow)" />
      </g>

      {/* Latitude & Longitude Meridian Rings */}
      <ellipse cx="22" cy="22" rx="7.5" ry="16" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.8" />
      <ellipse cx="22" cy="22" rx="14" ry="7" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.8" />
      <line x1="6" y1="22" x2="38" y2="22" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.8" />

      {/* 3D Heavy Brass Security Padlock in Foreground */}
      {/* Metallic Shackle */}
      <path
        d="M30 26 V21 C30 18.2 32.2 16 35 16 C37.8 16 40 18.2 40 21 V26"
        stroke="#94A3B8"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Padlock Body */}
      <rect x="27" y="26" width="16" height="15" rx="3.5" fill="url(#padlock_brass)" stroke="#FEF08A" strokeWidth="1" />
      {/* Keyhole */}
      <circle cx="35" cy="32" r="2" fill="#713F12" />
      <polygon points="34,32 36,32 35.5,37 34.5,37" fill="#713F12" />
    </svg>
  );
}

// 8. REVIEWS & RATINGS — 3D Faceted Golden Trophy Star with Sparkles
export function ReviewsRatingsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="star_shadow" x="2" y="2" width="44" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#B45309" floodOpacity="0.25" />
        </filter>
        <linearGradient id="star_gold" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.3" stopColor="#FBBF24" />
          <stop offset="0.7" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* 3D Faceted Star with Deep Glow */}
      <g filter="url(#star_shadow)">
        <path
          d="M24 4 L29.8 16.5 L43.5 17.8 L33.2 26.8 L36.2 40.2 L24 33 L11.8 40.2 L14.8 26.8 L4.5 17.8 L18.2 16.5 Z"
          fill="url(#star_gold)"
        />
      </g>

      {/* Facet Shading for 3D Chiseled Look */}
      <path d="M24 4 L24 33 L11.8 40.2 L14.8 26.8 L4.5 17.8 L18.2 16.5 Z" fill="#92400E" opacity="0.25" />
      <path d="M24 4 L29.8 16.5 L24 20 Z" fill="#FEF9C3" opacity="0.6" />

      {/* Gleaming Star Flare 1 */}
      <path d="M38 6 L39.5 10 L43.5 11.5 L39.5 13 L38 17 L36.5 13 L32.5 11.5 L36.5 10 Z" fill="#FEF08A" />
      {/* Gleaming Star Flare 2 */}
      <path d="M8 32 L9 35 L12 36 L9 37 L8 40 L7 37 L4 36 L7 35 Z" fill="#FEF08A" />
    </svg>
  );
}

// 9. GALLERY SPACE — 3D Layered Polaroid Photos with Alpine Landscape
export function GallerySpaceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="gal_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0F766E" floodOpacity="0.22" />
        </filter>
        <linearGradient id="gal_sky" x1="16" y1="14" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.6" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Back Polaroid Card (Tilted with Shadow) */}
      <rect x="6" y="8" width="28" height="32" rx="3.5" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" transform="rotate(-10 20 24)" />

      {/* Front Polaroid Card with Realistic Depth */}
      <g filter="url(#gal_shadow)">
        <rect x="14" y="10" width="28" height="34" rx="3.5" fill="#FFFFFF" stroke="#CCFBF1" strokeWidth="1.2" />
      </g>

      {/* Glossy Photo Window Inside Front Card */}
      <rect x="17" y="13" width="22" height="21" rx="2" fill="url(#gal_sky)" />

      {/* Golden Sun */}
      <circle cx="32" cy="19" r="3.5" fill="#FEF08A" />

      {/* Layered Mountains */}
      <polygon points="17,34 25,23 32,32 35,27 39,34" fill="#047857" />
      <polygon points="22,34 27,27 35,34" fill="#065F46" />
    </svg>
  );
}

// 10. ARTICLES & BLOGS — Hardbound Journal with Gold 18k Fountain Pen
export function ArticlesBlogsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blog_shadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.2" />
        </filter>
        <linearGradient id="journal_cover" x1="8" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="pen_gold" x1="28" y1="12" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Hardbound Journal with Shadow */}
      <g filter="url(#blog_shadow)">
        <rect x="8" y="6" width="28" height="36" rx="4" fill="url(#journal_cover)" />
      </g>

      {/* Paper Pages Layer */}
      <rect x="11" y="8" width="23" height="32" rx="2" fill="#FFFFFF" />

      {/* Lined Typography Blocks */}
      <rect x="14" y="13" width="17" height="3.5" rx="1" fill="#2563EB" />
      <rect x="14" y="19" width="17" height="1.8" rx="0.9" fill="#93C5FD" />
      <rect x="14" y="23" width="14" height="1.8" rx="0.9" fill="#BFDBFE" />
      <rect x="14" y="27" width="16" height="1.8" rx="0.9" fill="#DBEAFE" />

      {/* 3D Diagonal Fountain Pen with Gold Nib */}
      <path d="M28 32 L40 8 L42 10 L30 34 Z" fill="#0F172A" />
      <polygon points="27,35 30,34 28,32" fill="url(#pen_gold)" />
      <circle cx="28.5" cy="33.5" r="0.8" fill="#1E293B" />
    </svg>
  );
}

// 11. COMMERCIAL USAGE — 3D Modern Glass Skyscraper Complex
export function CommercialUsageIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="comm_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#C2410C" floodOpacity="0.22" />
        </filter>
        <linearGradient id="tower_glass" x1="22" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB923C" />
          <stop offset="0.5" stopColor="#EA580C" />
          <stop offset="1" stopColor="#9A3412" />
        </linearGradient>
      </defs>

      {/* Left Tower */}
      <rect x="6" y="16" width="14" height="26" rx="2" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.2" />
      <rect x="9" y="20" width="3" height="3" rx="0.5" fill="#FB923C" />
      <rect x="14" y="20" width="3" height="3" rx="0.5" fill="#FB923C" />
      <rect x="9" y="26" width="3" height="3" rx="0.5" fill="#FB923C" />
      <rect x="14" y="26" width="3" height="3" rx="0.5" fill="#FB923C" />

      {/* Right Hero Skyscraper with Depth */}
      <g filter="url(#comm_shadow)">
        <rect x="22" y="6" width="20" height="36" rx="3" fill="url(#tower_glass)" stroke="#7C2D12" strokeWidth="1" />
      </g>

      {/* Illuminated Windows */}
      <rect x="26" y="11" width="4" height="3.5" rx="0.8" fill="#FEF08A" />
      <rect x="34" y="11" width="4" height="3.5" rx="0.8" fill="#FEF08A" />
      <rect x="26" y="18" width="4" height="3.5" rx="0.8" fill="#FEF08A" />
      <rect x="34" y="18" width="4" height="3.5" rx="0.8" fill="#FEF08A" />
      <rect x="26" y="25" width="4" height="3.5" rx="0.8" fill="#FEF08A" />
      <rect x="34" y="25" width="4" height="3.5" rx="0.8" fill="#FEF08A" />

      {/* Modern Grand Entrance Door */}
      <rect x="29" y="36" width="6" height="6" rx="1" fill="#431407" />
    </svg>
  );
}

// 12. SCALING BUSINESS — 3D Stepped Bar Chart with Blasting Rocket
export function ScalingBusinessIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="scale_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#BE123C" floodOpacity="0.25" />
        </filter>
        <linearGradient id="bar_grad" x1="8" y1="38" x2="36" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDA4AF" />
          <stop offset="0.5" stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>

      {/* 4 Stepped 3D Glass Bar Columns */}
      <rect x="6" y="32" width="6" height="10" rx="1.5" fill="#FECDD3" />
      <rect x="15" y="24" width="6" height="18" rx="1.5" fill="#FDA4AF" />
      <rect x="24" y="16" width="6" height="26" rx="1.5" fill="#FB7185" />
      <rect x="33" y="8" width="6" height="34" rx="1.5" fill="#E11D48" />

      {/* Blasting Rocket Over Chart */}
      <g filter="url(#scale_shadow)">
        {/* Rocket Body */}
        <polygon points="34,6 42,9 39,17 31,14" fill="#FFFFFF" stroke="#BE123C" strokeWidth="1" />
        <polygon points="34,6 42,9 38,10" fill="#E11D48" />
        {/* Thrust Flame */}
        <polygon points="31,14 26,17 29,19" fill="#F59E0B" />
        <circle cx="27" cy="18" r="1.5" fill="#EF4444" />
      </g>
    </svg>
  );
}

// 13. CUSTOM TEMPLATES — 3D Cascading Responsive Wireframe Deck
export function CustomTemplatesIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="tpl_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#6D28D9" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* 4 Color Palette Modules */}
      <g filter="url(#tpl_shadow)">
        <rect x="6" y="6" width="16" height="16" rx="3.5" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.2" />
        <rect x="9" y="9" width="10" height="3.5" rx="1" fill="#8B5CF6" />
        <rect x="9" y="15" width="10" height="2.5" rx="0.8" fill="#C4B5FD" />

        <rect x="26" y="6" width="16" height="16" rx="3.5" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.2" />
        <rect x="29" y="9" width="10" height="3.5" rx="1" fill="#3B82F6" />
        <rect x="29" y="15" width="10" height="2.5" rx="0.8" fill="#93C5FD" />

        <rect x="6" y="26" width="16" height="16" rx="3.5" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.2" />
        <rect x="9" y="29" width="10" height="3.5" rx="1" fill="#10B981" />
        <rect x="9" y="35" width="10" height="2.5" rx="0.8" fill="#6EE7B7" />

        <rect x="26" y="26" width="16" height="16" rx="3.5" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.2" />
        <rect x="29" y="29" width="10" height="3.5" rx="1" fill="#EF4444" />
        <rect x="29" y="35" width="10" height="2.5" rx="0.8" fill="#FCA5A5" />
      </g>
    </svg>
  );
}

// 14. EASY DESIGNING — Artist Wooden Palette with 3D Wet Paint Dollops
export function EasyDesigningIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="art_shadow" x="2" y="2" width="44" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#881337" floodOpacity="0.2" />
        </filter>
        <radialGradient id="palette_wood" cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1F2" />
          <stop offset="0.7" stopColor="#FFE4E6" />
          <stop offset="1" stopColor="#FECDD3" />
        </radialGradient>
      </defs>

      {/* Palette Body with Shadow */}
      <g filter="url(#art_shadow)">
        <path
          d="M24 6 C13 6 5 14 5 24 C5 31 9 36 16 39 C18.5 40 20.5 38 20.5 36 C20.5 34 22 32.5 24 32.5 C26.5 32.5 29 34 29 36 C29 39 32 41 36 41 C40 41 44 36 44 28 C44 14 35 6 24 6 Z"
          fill="url(#palette_wood)"
          stroke="#FB7185"
          strokeWidth="1.5"
        />
      </g>

      {/* Thumbhole */}
      <circle cx="16" cy="30" r="3.5" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="1.2" />

      {/* Glossy Paint Dollops */}
      <circle cx="13" cy="18" r="3" fill="#3B82F6" stroke="#93C5FD" strokeWidth="0.8" />
      <circle cx="21" cy="12" r="3" fill="#EF4444" stroke="#FCA5A5" strokeWidth="0.8" />
      <circle cx="30" cy="13" r="3" fill="#F59E0B" stroke="#FDE68A" strokeWidth="0.8" />
      <circle cx="36" cy="21" r="3" fill="#10B981" stroke="#A7F3D0" strokeWidth="0.8" />
      <circle cx="33" cy="30" r="3" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="0.8" />

      {/* Artist Brush Across Palette */}
      <line x1="39" y1="5" x2="25" y2="25" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <rect x="23" y="23" width="5" height="4" rx="1" fill="#E11D48" transform="rotate(45 23 23)" />
    </svg>
  );
}

// 15. PRODUCT SPACE — 3D Kraft Cardboard Parcel Box with Tape & Barcode
export function ProductSpaceIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="box_shadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#78350F" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#box_shadow)">
        {/* Top Face */}
        <polygon points="24,6 39,15 24,24 9,15" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
        {/* Left Shadow Face */}
        <polygon points="9,15 24,24 24,42 9,33" fill="#B45309" stroke="#92400E" strokeWidth="1" />
        {/* Right Lit Face */}
        <polygon points="24,24 39,15 39,33 24,42" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      </g>

      {/* Packing Sealing Tape */}
      <polygon points="21.5,4.5 26.5,7.5 26.5,25.5 21.5,22.5" fill="#FCD34D" opacity="0.85" />
      
      {/* Shipping Barcode Label */}
      <polygon points="28,26 36,21 36,29 28,34" fill="#FFFFFF" />
      <line x1="30" y1="26" x2="30" y2="30" stroke="#000000" strokeWidth="1" />
      <line x1="32" y1="25" x2="32" y2="29" stroke="#000000" strokeWidth="1" />
      <line x1="34" y1="24" x2="34" y2="28" stroke="#000000" strokeWidth="1" />
    </svg>
  );
}

// 16. SERVICES MANAGEMENT — 3D Interlocking Precision Cogs & Calibration Wrench
export function ServicesManagementIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="gear_shadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#1E3A8A" floodOpacity="0.22" />
        </filter>
        <radialGradient id="gear_body" cx="24" cy="24" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.6" stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E40AF" />
        </radialGradient>
      </defs>

      <g filter="url(#gear_shadow)">
        {/* Cog Core */}
        <circle cx="24" cy="24" r="14" fill="url(#gear_body)" stroke="#93C5FD" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="5" fill="#FFFFFF" />
        {/* Cog Teeth */}
        <rect x="22" y="7" width="4" height="4" rx="1" fill="#2563EB" />
        <rect x="22" y="37" width="4" height="4" rx="1" fill="#1E40AF" />
        <rect x="7" y="22" width="4" height="4" rx="1" fill="#3B82F6" />
        <rect x="37" y="22" width="4" height="4" rx="1" fill="#1D4ED8" />
        <rect x="12" y="12" width="4" height="4" rx="1" fill="#3B82F6" transform="rotate(45 14 14)" />
        <rect x="32" y="12" width="4" height="4" rx="1" fill="#2563EB" transform="rotate(45 34 14)" />
        <rect x="12" y="32" width="4" height="4" rx="1" fill="#1E40AF" transform="rotate(45 14 34)" />
        <rect x="32" y="32" width="4" height="4" rx="1" fill="#1E40AF" transform="rotate(45 34 34)" />
      </g>

      {/* Chrome Wrench */}
      <path d="M39 7 L32 14 L35 17 L42 10 C43 9 43 8 42 7 Z" fill="#94A3B8" />
      <line x1="33" y1="15" x2="22" y2="36" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// 17. CUSTOMIZED QR CODE — 3D Holographic Dynamic QR Code Matrix
export function CustomizedQrIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="qr_shadow" x="3" y="3" width="42" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#5B21B6" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#qr_shadow)">
        <rect x="6" y="6" width="36" height="36" rx="6" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1.5" />
      </g>

      {/* 3 Corner Positioning Targets */}
      <rect x="10" y="10" width="10" height="10" rx="2.5" fill="#7C3AED" />
      <rect x="12" y="12" width="6" height="6" rx="1" fill="#FFFFFF" />
      <rect x="13.5" y="13.5" width="3" height="3" rx="0.5" fill="#7C3AED" />

      <rect x="28" y="10" width="10" height="10" rx="2.5" fill="#7C3AED" />
      <rect x="30" y="12" width="6" height="6" rx="1" fill="#FFFFFF" />
      <rect x="31.5" y="13.5" width="3" height="3" rx="0.5" fill="#7C3AED" />

      <rect x="10" y="28" width="10" height="10" rx="2.5" fill="#7C3AED" />
      <rect x="12" y="30" width="6" height="6" rx="1" fill="#FFFFFF" />
      <rect x="13.5" y="31.5" width="3" height="3" rx="0.5" fill="#7C3AED" />

      {/* Center Dynamic Brand Eye with Laser Sheen */}
      <circle cx="24" cy="24" r="5" fill="#174BFF" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#FFFFFF" />

      {/* Data Pattern Modules */}
      <rect x="22" y="11" width="3" height="3" rx="0.6" fill="#A78BFA" />
      <rect x="22" y="34" width="3" height="3" rx="0.6" fill="#A78BFA" />
      <rect x="34" y="22" width="3" height="3" rx="0.6" fill="#A78BFA" />
      <rect x="28" y="28" width="4" height="4" rx="0.8" fill="#7C3AED" />
    </svg>
  );
}

// 18. PAYMENT GATEWAYS — 3D EMV Credit Card & Glowing Indian UPI RuPay Badge
export function PaymentGatewaysIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pay_shadow" x="2" y="6" width="44" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.22" />
        </filter>
        <linearGradient id="pay_back" x1="6" y1="8" x2="36" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="pay_front" x1="12" y1="18" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Back Visa/Mastercard */}
      <rect x="6" y="8" width="30" height="20" rx="3.5" fill="url(#pay_back)" stroke="#38BDF8" strokeWidth="1" />
      <rect x="10" y="13" width="6" height="4.5" rx="1" fill="#FBBF24" />

      {/* Front Card with Real Drop Shadow */}
      <g filter="url(#pay_shadow)">
        <rect x="12" y="18" width="30" height="20" rx="3.5" fill="url(#pay_front)" stroke="#10B981" strokeWidth="1.2" />
      </g>

      {/* Indian UPI / RuPay Currency Symbol in Vibrant Emerald */}
      <path
        d="M20 24 H27 M20 27 H25.5 M20 24 V32 M23 27 C25.5 27 26 29.5 23.5 31.5 L27 35"
        stroke="#10B981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Verified Green Shield Tick */}
      <circle cx="36" cy="28" r="3.5" fill="#10B981" />
      <path d="M34.5 28 L35.5 29 L37.5 27" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 19. CANVA & ADOBE INTEGRATION — 3D Dimensional Brand Badges
export function CanvaAdobeIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ca_shadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#7D2AE8" floodOpacity="0.22" />
        </filter>
        <linearGradient id="canva_sphere" x1="4" y1="10" x2="28" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
        <linearGradient id="adobe_tile" x1="22" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      <g filter="url(#ca_shadow)">
        {/* Canva 3D Sphere Badge */}
        <circle cx="16" cy="24" r="12" fill="url(#canva_sphere)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Canva Script C */}
        <path
          d="M20 18 C18 16.5 15.5 16.5 13.5 18 C11 20 11 25.5 14 28 C16.5 29.5 19.5 28.5 20.8 26.8"
          stroke="#FFFFFF"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Adobe 3D Beveled Tile */}
        <rect x="22" y="14" width="20" height="20" rx="5" fill="url(#adobe_tile)" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Adobe Triangle A */}
        <polygon points="25.5,30 29.5,18 32,18 35.5,30" fill="#FFFFFF" />
        <polygon points="30,22 33.5,30 27,30" fill="#B91C1C" />
      </g>
    </svg>
  );
}

// 20. EMAIL SIGNATURE GENERATOR — Business Envelope with Wax Seal & Calligraphic Signature
export function EmailSignatureIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sig_shadow" x="2" y="6" width="44" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#0891B2" floodOpacity="0.22" />
        </filter>
        <linearGradient id="wax_seal" x1="30" y1="26" x2="38" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Signature Card Slipping Out */}
      <rect x="10" y="6" width="28" height="18" rx="3" fill="#FFFFFF" stroke="#67E8F9" strokeWidth="1" />
      {/* Cursive Signature Curve */}
      <path
        d="M14 16 C16 13 17.5 19 19.5 15.5 C21.5 12 23.5 17.5 26 15.5 C28.5 13.5 31 16 33 15"
        stroke="#0891B2"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Crisp Business Envelope */}
      <g filter="url(#sig_shadow)">
        <rect x="6" y="14" width="36" height="26" rx="4" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1.4" />
        <path d="M6 15 L24 28 L42 15" stroke="#0891B2" strokeWidth="1.5" />
      </g>

      {/* Gold Wax Seal Badge */}
      <circle cx="33" cy="29" r="4.5" fill="url(#wax_seal)" stroke="#FEF08A" strokeWidth="1.2" />
      <path d="M31.5 29 L32.5 30 L34.5 28" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 21. REPORT PDF EXTRACT — 3D Scarlet Document with Acrobat Tab & Download Badge
export function ReportPdfIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pdf_shadow" x="6" y="2" width="36" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#991B1B" floodOpacity="0.22" />
        </filter>
        <linearGradient id="pdf_tag" x1="6" y1="16" x2="42" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
      </defs>

      <g filter="url(#pdf_shadow)">
        {/* Document Body with Folded Dog-Ear */}
        <path d="M10 5 H30 L40 15 V41 H10 Z" fill="#FEF2F2" stroke="#F87171" strokeWidth="1.4" />
        <polygon points="30,5 40,15 30,15" fill="#FCA5A5" stroke="#F87171" strokeWidth="1" />
      </g>

      {/* 3D Bold PDF Ribbon */}
      <rect x="7" y="17" width="34" height="11" rx="2.5" fill="url(#pdf_tag)" />
      <text x="24" y="25.5" fill="#FFFFFF" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="1">
        PDF
      </text>

      {/* Download Export Arrow */}
      <path d="M24 32 V38 M20 35 L24 39 L28 35" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 22. LIVE PROFILE — 3D Broadcast Antenna Mast with Glowing Green LIVE Beacon
export function LiveProfileIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="live_shadow" x="2" y="2" width="44" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#DC2626" floodOpacity="0.22" />
        </filter>
      </defs>

      <g filter="url(#live_shadow)">
        {/* Transmission Lattice Mast */}
        <polygon points="24,14 19,41 29,41" fill="#EF4444" opacity="0.85" />
        <line x1="21.5" y1="26" x2="26.5" y2="26" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="20" y1="34" x2="28" y2="34" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="24" cy="13" r="4.5" fill="#DC2626" stroke="#FEF2F2" strokeWidth="1.2" />
      </g>

      {/* Pulsing Emerald Active Beacon Dot */}
      <circle cx="24" cy="13" r="2.2" fill="#22C55E" />

      {/* Concentric Broadcast Waves */}
      <path d="M16 8 C11.5 12.5 11.5 19.5 16 24" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 8 C36.5 12.5 36.5 19.5 32 24" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M11 4 C5 11 5 25 11 31" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <path d="M37 4 C43 11 43 25 37 31" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// 23. DIRECT APP INSTALLATION — 3D Edge-to-Edge Glass Smartphone with Pop-Out Badge
export function DirectAppIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="app_shadow" x="6" y="2" width="36" height="44" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#065F46" floodOpacity="0.22" />
        </filter>
        <linearGradient id="phone_body" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Modern Bezel-less Smartphone Chassis */}
      <g filter="url(#app_shadow)">
        <rect x="10" y="4" width="28" height="40" rx="6" fill="url(#phone_body)" stroke="#475569" strokeWidth="1.2" />
      </g>

      {/* Glass Screen Display */}
      <rect x="12" y="7" width="24" height="34" rx="3.5" fill="#F0FDF4" />

      {/* Dynamic Island Speaker Notch */}
      <rect x="20" y="8.5" width="8" height="2" rx="1" fill="#020617" />

      {/* App Icons Grid */}
      <rect x="15" y="14" width="4.5" height="4.5" rx="1.2" fill="#10B981" />
      <rect x="22" y="14" width="4.5" height="4.5" rx="1.2" fill="#3B82F6" />
      <rect x="29" y="14" width="4.5" height="4.5" rx="1.2" fill="#F59E0B" />
      <rect x="15" y="21" width="4.5" height="4.5" rx="1.2" fill="#8B5CF6" />

      {/* 3D Pop-Out Installation Badge */}
      <circle cx="28" cy="28" r="7.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M28 24.5 V30.5 M25 28 L28 31 L31 28" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 24. BUSINESS MANAGEMENT TOOLS — Executive Leather Briefcase with Brass Latches
export function BusinessToolsIcon({ className = DEFAULT_CLASS }: ServiceIconProps = {}) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="case_shadow" x="2" y="6" width="44" height="38" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="3" floodColor="#312E81" floodOpacity="0.22" />
        </filter>
        <linearGradient id="leather_body" x1="6" y1="14" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5" />
          <stop offset="0.6" stopColor="#4338CA" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <linearGradient id="brass_latch" x1="22" y1="21" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Heavy Curved Handle */}
      <path
        d="M17 14 V9 C17 7 19 5.5 21 5.5 H27 C29 5.5 31 7 31 9 V14"
        stroke="#F59E0B"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Briefcase Chassis with Shadow */}
      <g filter="url(#case_shadow)">
        <rect x="6" y="14" width="36" height="26" rx="4.5" fill="url(#leather_body)" stroke="#3730A3" strokeWidth="1.2" />
      </g>

      {/* Leather Flap Seam Line */}
      <path d="M6 23 C14 26 34 26 42 23" stroke="#6366F1" strokeWidth="1.4" opacity="0.7" />

      {/* 3D Brass Center Clasp */}
      <rect x="22" y="21" width="4" height="6" rx="1" fill="url(#brass_latch)" stroke="#D97706" strokeWidth="0.8" />

      {/* Stitched Edge Reinforcements */}
      <line x1="13" y1="14" x2="13" y2="40" stroke="#818CF8" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
      <line x1="35" y1="14" x2="35" y2="40" stroke="#818CF8" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}
