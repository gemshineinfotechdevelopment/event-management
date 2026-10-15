import React from 'react';

// Intertwined wedding rings with diamond
export const WeddingRingsIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="13" r="5" />
    <circle cx="15" cy="13" r="5" />
    <path d="M12 4 L13 6 L12 8 L11 6 Z" fill="currentColor" stroke="none" />
    <path d="M12 2 L12 4" />
  </svg>
);

// Engagement ring with sparkling gem
export const EngagementRingIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="14" r="6" />
    <polygon points="12 4 14.5 7.5 9.5 7.5" fill="currentColor" fillOpacity="0.2" />
    <line x1="9.5" y1="7.5" x2="14.5" y2="7.5" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="15" y1="3" x2="14" y2="5" />
    <line x1="9" y1="3" x2="10" y2="5" />
  </svg>
);

// Birthday cake with candles
export const BirthdayCakeIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 21h16" />
    <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
    <line x1="12" y1="5" x2="12" y2="3" />
    <circle cx="12" cy="2" r="0.5" fill="currentColor" />
    <path d="M4 16c2 1 4-1 6 0s4-1 6 0 4-1 4-1" />
  </svg>
);

// Corporate briefcase
export const CorporateBriefcaseIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="11" x2="12" y2="13" />
  </svg>
);

// College graduation mortarboard cap
export const CollegeCapIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// Baby stroller / cradle for baby shower
export const BabyShowerIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12h.01" />
    <path d="M15 12h.01" />
    <path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1" />
    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1-2.3 2.3c-.5 0-.9-.3-1.1-.7l-1-2A4 4 0 0 0 13 8H9a4 4 0 0 0-3.4 1.8l-1 2c-.2.4-.6.7-1.1.7a2 2 0 0 1-2.3-2.3 9 9 0 0 1 1.8-3.9A9 9 0 0 1 12 3a9 9 0 0 1 7 3.3z" />
    <path d="M12 3v2" />
    <circle cx="7" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
    <path d="M9 20h6" />
  </svg>
);

// Private party clinking glasses
export const PartyGlassesIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 22h8" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15v7" />
    <path d="M4 3l4 7c.5.9 1.5 1.5 2.5 1.5h3c1 0 2-.6 2.5-1.5l4-7" />
    <path d="M6 6h12" />
    <path d="M18 2l1 2" />
    <path d="M6 2L5 4" />
  </svg>
);

// All Sparkles Icon
export const AllSparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    <path d="M5 3v4" />
    <path d="M3 5h4" />
  </svg>
);

// Delicate floral leaf watermark decoration seen in margins of reference image
export const FloralFlourishWatermark = ({ className = "w-48 h-48", flipX = false, flipY = false }) => (
  <svg 
    viewBox="0 0 240 240" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} pointer-events-none select-none transition-opacity duration-300 ${flipX ? '-scale-x-100' : ''} ${flipY ? '-scale-y-100' : ''}`}
  >
    <defs>
      <linearGradient id="flourishGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFC07B" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#C5A059" stopOpacity="0.30" />
        <stop offset="100%" stopColor="#AA8222" stopOpacity="0.10" />
      </linearGradient>
    </defs>
    {/* Vine spine */}
    <path d="M10 10 C60 20 120 70 170 140 C195 175 220 220 230 230" stroke="url(#flourishGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M15 15 C80 60 140 130 180 200" stroke="url(#flourishGold)" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
    {/* Delicate leaf pairs */}
    <path d="M40 25 C55 12 75 16 70 30 C55 35 45 30 40 25 Z" fill="url(#flourishGold)" />
    <path d="M65 48 C85 30 105 38 98 56 C80 62 68 55 65 48 Z" fill="url(#flourishGold)" />
    <path d="M95 78 C120 58 142 68 132 88 C110 96 98 88 95 78 Z" fill="url(#flourishGold)" />
    <path d="M130 115 C160 92 185 106 172 128 C148 138 132 128 130 115 Z" fill="url(#flourishGold)" />
    <path d="M165 158 C195 135 218 152 205 174 C182 184 168 172 165 158 Z" fill="url(#flourishGold)" />
    {/* Opposite leaves */}
    <path d="M48 38 C42 55 28 65 24 50 C26 38 38 35 48 38 Z" fill="url(#flourishGold)" />
    <path d="M78 68 C70 90 52 102 48 84 C52 70 68 64 78 68 Z" fill="url(#flourishGold)" />
    <path d="M112 102 C102 128 80 142 75 122 C82 105 100 98 112 102 Z" fill="url(#flourishGold)" />
    <path d="M148 142 C135 170 112 185 106 164 C115 145 135 138 148 142 Z" fill="url(#flourishGold)" />
  </svg>
);
