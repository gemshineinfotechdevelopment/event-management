import React from 'react';
import { Calendar, Heart, Star } from 'lucide-react';

export default function EventsHero() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
      
      {/* Background Pavilion Image on the Right with Smooth Cinematic Gradient Fade */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img 
            src="/gallery-hero.jpg" 
            alt="Luxury wedding venue pavilion under evening twilight" 
            className="w-full h-full object-cover object-right lg:object-center filter brightness-90 contrast-[1.05]"
          />
          {/* Gradients to seamlessly blend image into dark navy on the left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/60 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
          {/* Mobile-only rich dark overlay for crystal-clear readability without changing desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070C18]/92 via-[#070C18]/85 to-[#070C18]/95 md:hidden z-3 pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:py-32 w-full">
        <div className="max-w-2xl">
          
          {/* Small Gold Tag */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
              OUR EVENTS
            </span>
          </div>

          {/* Main Headline matching reference typography */}
          <h1 className="leading-[1.15] mb-4 sm:mb-5 tracking-tight">
            <span className="block font-serif-luxury text-[32px] sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
              Unforgettable Moments
            </span>
            <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-sm font-normal">
              Beautifully Planned
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#FAF7F2] sm:text-[#E2DACB] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-sm">
            From dreamy weddings to lively celebrations, explore our upcoming and past events. Get inspired and find the perfect event for your special moments.
          </p>

          {/* Three Highlights with Icons matching reference */}
          <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-6 pt-1">
            
            {/* 1. Elegant Themes */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-[#0A1224]/70 sm:bg-transparent border border-[#DFC07B]/35 sm:border-0 rounded-lg sm:rounded-none px-3 py-2 sm:p-0 backdrop-blur-xs sm:backdrop-blur-none shadow-xs sm:shadow-none">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide">Elegant Themes</span>
            </div>

            {/* 2. Custom Packages */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-[#0A1224]/70 sm:bg-transparent border border-[#DFC07B]/35 sm:border-0 rounded-lg sm:rounded-none px-3 py-2 sm:p-0 backdrop-blur-xs sm:backdrop-blur-none shadow-xs sm:shadow-none">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                <Heart className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide">Custom Packages</span>
            </div>

            {/* 3. Professional Support */}
            <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-[#0A1224]/70 sm:bg-transparent border border-[#DFC07B]/35 sm:border-0 rounded-lg sm:rounded-none px-3 py-2 sm:p-0 backdrop-blur-xs sm:backdrop-blur-none shadow-xs sm:shadow-none">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                <Star className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide">Professional Support</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
