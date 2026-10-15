import React from 'react';
import { BotanicalCorner } from './common/Icons';

export default function CurvedTransition() {
  return (
    <div className="relative w-full overflow-hidden leading-none z-20 -mt-1 bg-transparent">
      {/* Curved SVG Wave Transition (Light Ivory / Warm Cream) */}
      <svg 
        className="w-full h-14 sm:h-20 md:h-28 block text-[#FAF8F5]" 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Subtle Champagne-Gold Tracing Line */}
        <path 
          d="M0,70 C320,130 520,15 900,65 C1180,105 1360,35 1440,55" 
          stroke="#C5A059" 
          strokeWidth="1.5" 
          strokeOpacity="0.45"
          fill="none" 
        />
        {/* Fill curve for pristine soft ivory section */}
        <path 
          d="M0,72 C320,132 520,17 900,67 C1180,107 1360,37 1440,57 L1440,120 L0,120 Z" 
          fill="#FAF8F5" 
        />
      </svg>

      {/* Decorative Botanical Leaf on Top Left (Light Olive/Gold Accent) */}
      <div className="absolute left-2 sm:left-6 md:left-12 -top-6 sm:-top-8 md:-top-12 z-30 pointer-events-none opacity-70">
        <BotanicalCorner className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 drop-shadow-xs" />
      </div>
    </div>
  );
}
