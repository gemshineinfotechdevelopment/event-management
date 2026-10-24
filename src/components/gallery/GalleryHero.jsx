import React from 'react';
import { Sparkles, Users, Award, Heart } from 'lucide-react';

export default function GalleryHero() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
      {/* Background Image: Grand Sunset Mandap */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img 
            src="/couple-terrace.jpg" 
            alt="Romantic couple on Udaipur heritage palace balcony at golden hour sunset" 
            className="w-full h-full object-cover object-[58%_center] md:object-right lg:object-center filter brightness-100 contrast-[1.02]"
          />
          {/* Mobile Gradients: reveals royal couple & sunset palace with crisp legibility */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#070C18]/80 via-[#070C18]/45 to-[#070C18]/95 z-1" />

          {/* Dark luxury gradients untouched for desktop */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/60 to-transparent z-1" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
          <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-8 max-w-2xl text-left">
            {/* Small Gold Tag */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                OUR GALLERY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="leading-[1.15] mb-4 sm:mb-5 tracking-tight">
              <span className="block font-serif-luxury text-[32px] sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                Moments That
              </span>
              <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal">
                Tell Beautiful Stories
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#FAF7F2] sm:text-[#E2DACB] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-sm">
              Every event has a unique story. Explore our gallery and relive the special moments we've created for our clients.
            </p>

            {/* Badges / Metrics Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1224]/80 sm:bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Real Events</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1224]/80 sm:bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Happy Clients</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1224]/80 sm:bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Unforgettable Moments</span>
              </div>
            </div>
          </div>

          {/* Right Calligraphic Quote overlay */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="text-right p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#DFC07B]/30 shadow-2xl max-w-xs transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block mb-2">
                COLLECTED MEMORIES
              </span>
              <p className="font-script text-2xl text-[#F5EAD2] leading-tight select-none">
                Same People<br />
                Different Stories<br />
                All Beautiful
              </p>
              <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-[#DFC07B]">
                <Heart className="w-3.5 h-3.5 fill-[#DFC07B]/40 stroke-[#DFC07B]" />
                <span className="tracking-wider uppercase font-semibold text-[10px]">The Eventora Gallery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
