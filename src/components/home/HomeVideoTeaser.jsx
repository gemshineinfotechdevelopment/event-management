import React from 'react';
import { Play, Sparkles, Film, Clock } from 'lucide-react';

export default function HomeVideoTeaser({ onOpenVideo }) {
  return (
    <section className="relative bg-[#070C18] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-b border-white/10">
      
      {/* Background Cinematic Atmosphere Image with Heavy Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-stage.jpg"
          alt="Eventora Cinematic Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-40 blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-[#070C18]/80 to-[#070C18]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070C18]/60 to-[#070C18]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Pulsing Play Button */}
        <div className="relative mb-6 group cursor-pointer" onClick={onOpenVideo}>
          {/* Animated Glow Rings */}
          <div className="absolute -inset-4 rounded-full bg-[#DFC07B]/20 animate-ping opacity-60" />
          <div className="absolute -inset-2 rounded-full bg-[#DFC07B]/30 animate-pulse" />
          
          <button
            aria-label="Play Eventora Cinematic Showreel"
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] shadow-[0_0_30px_rgba(223,192,123,0.5)] flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#1C1610] ml-1" />
          </button>
        </div>

        {/* Small Gold Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <Film className="w-3.5 h-3.5 text-[#DFC07B]" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
            CINEMATIC SHOWREEL
          </span>
          <Film className="w-3.5 h-3.5 text-[#DFC07B]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
          Experience The Magic In Motion
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#E2DACB] font-light leading-relaxed max-w-xl mt-3 mb-10">
          Step behind the scenes and witness how hundreds of moving parts, delicate florals, and radiant lighting unite into an unforgettable celebration.
        </p>

        {/* Quick Highlights / Metrics Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3.5 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-[#F5EFEB]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#DFC07B]" />
            <span>4K UHD Experience</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#DFC07B]" />
            <span>2:40 Min Film</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#DFC07B] font-bold">500+</span>
            <span>Real Weddings & Galas</span>
          </div>
        </div>

      </div>
    </section>
  );
}
