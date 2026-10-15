import React from 'react';
import { Sparkles, Users, Award, Heart } from 'lucide-react';

export default function GalleryHero() {
  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070B14]">
      {/* Background Image: Grand Sunset Mandap */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/gallery-hero.jpg" 
          alt="Luxury wedding pavilion at sunset" 
          className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle"
        />
        {/* Cinematic dark gradients matching reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060A14]/95 via-[#060A14]/75 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#060A14]/80 z-2" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black/60 via-transparent to-transparent z-1" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-8 max-w-2xl">
            {/* Small Gold Tag */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
                OUR GALLERY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="leading-[1.1] mb-5 tracking-tight">
              <span className="block font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
                Moments That
              </span>
              <span className="block font-script text-4xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-sm font-normal">
                Tell Beautiful Stories
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed max-w-xl mb-8 drop-shadow">
              Every event has a unique story. Explore our gallery and relive the special moments we've created for our clients.
            </p>

            {/* Badges / Metrics Pills */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Real Events</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-sm">
                <Users className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Happy Clients</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#DFC07B]/40 text-[#FAF8F5] text-xs font-medium shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Unforgettable Moments</span>
              </div>
            </div>
          </div>

          {/* Right Calligraphic Quote overlay matching reference */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="text-right p-6 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 shadow-2xl max-w-xs transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <p className="font-script text-2xl text-[#F5EAD2] leading-tight select-none">
                Same People<br />
                Different Stories<br />
                All Beautiful
              </p>
              <div className="flex justify-end mt-2 text-[#DFC07B]">
                <Heart className="w-4 h-4 fill-[#DFC07B]/40 stroke-[#DFC07B]" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
