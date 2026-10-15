import React from 'react';

// Elegant Gold Lotus Logo matching Eventora in the reference
export const EventoraLogo = ({ className = "w-9 h-9" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D9" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="85%" stopColor="#AA8222" />
        <stop offset="100%" stopColor="#E5C77A" />
      </linearGradient>
      <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F5E3B3" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Center core */}
    <circle cx="50" cy="50" r="14" fill="url(#goldGrad)" opacity="0.15" />
    <circle cx="50" cy="50" r="5" fill="url(#goldGrad)" />
    {/* Center petal */}
    <path d="M50 14 C46 32 38 42 50 50 C62 42 54 32 50 14 Z" fill="url(#goldGrad)" />
    {/* Left petal 1 */}
    <path d="M50 50 C38 40 22 30 18 42 C14 54 34 54 50 50 Z" fill="url(#goldGrad)" opacity="0.9" />
    {/* Right petal 1 */}
    <path d="M50 50 C62 40 78 30 82 42 C86 54 66 54 50 50 Z" fill="url(#goldGrad)" opacity="0.9" />
    {/* Left lower wing petal */}
    <path d="M50 50 C34 50 16 60 22 72 C28 82 42 66 50 50 Z" fill="url(#goldGrad)" opacity="0.8" />
    {/* Right lower wing petal */}
    <path d="M50 50 C66 50 84 60 78 72 C72 82 58 66 50 50 Z" fill="url(#goldGrad)" opacity="0.8" />
    {/* Bottom stem arc */}
    <path d="M42 78 C50 82 50 82 58 78" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Botanical Palm & Leaf flourish seen in the reference
export const BotanicalCorner = ({ className = "w-40 h-40", flip = false }) => (
  <svg 
    viewBox="0 0 200 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${flip ? '-scale-x-100' : ''}`}
  >
    <defs>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A5943" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#C5A059" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    {/* Palm frond curved spine */}
    <path d="M10 10 Q80 40 180 180" stroke="url(#leafGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    {/* Left leaf blades */}
    <path d="M25 20 Q40 5 60 8 Q45 25 35 27" fill="url(#leafGrad)" opacity="0.6" />
    <path d="M45 35 Q70 12 95 18 Q75 42 55 45" fill="url(#leafGrad)" opacity="0.7" />
    <path d="M68 55 Q100 28 130 38 Q105 68 80 70" fill="url(#leafGrad)" opacity="0.75" />
    <path d="M92 80 Q130 52 165 65 Q135 98 108 98" fill="url(#leafGrad)" opacity="0.8" />
    <path d="M120 112 Q160 88 190 105 Q160 132 135 130" fill="url(#leafGrad)" opacity="0.85" />
    {/* Right leaf blades */}
    <path d="M40 32 Q50 55 52 75 Q35 60 30 40" fill="url(#leafGrad)" opacity="0.5" />
    <path d="M62 52 Q80 82 85 105 Q62 85 55 65" fill="url(#leafGrad)" opacity="0.6" />
    <path d="M90 78 Q115 115 120 140 Q95 115 82 92" fill="url(#leafGrad)" opacity="0.7" />
    <path d="M122 110 Q145 150 152 178 Q125 148 112 125" fill="url(#leafGrad)" opacity="0.75" />
  </svg>
);

// Decorative gold star / diamond divider
export const GoldStarDivider = ({ text = "", className = "" }) => (
  <div className={`inline-flex items-center gap-3.5 tracking-[0.25em] text-xs font-semibold uppercase text-[#C5A059] ${className}`}>
    <span className="w-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-[#D4AF37]" />
    <span className="text-[#D4AF37] text-sm">✦</span>
    <span className="tracking-[0.25em] text-[#C5A059]">{text}</span>
    <span className="text-[#D4AF37] text-sm">✦</span>
    <span className="w-6 h-[1px] bg-gradient-to-l from-transparent via-[#C5A059] to-[#D4AF37]" />
  </div>
);

// Thin ornamental flourish line
export const OrnamentalFlourish = ({ className = "w-32 h-4" }) => (
  <svg viewBox="0 0 140 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 8 H52 M88 8 H140" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
    <circle cx="70" cy="8" r="3" fill="#D4AF37" />
    <circle cx="62" cy="8" r="1.5" fill="#D4AF37" opacity="0.7" />
    <circle cx="78" cy="8" r="1.5" fill="#D4AF37" opacity="0.7" />
  </svg>
);

// Social Media SVGs
export const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

export const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

