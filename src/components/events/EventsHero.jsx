import React from 'react';
import { Calendar, Heart, Star } from 'lucide-react';

export default function EventsHero() {
  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden bg-[#070C18]">
      
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
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:py-32 w-full">
        <div className="max-w-2xl">
          
          {/* Small Gold Tag */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
              OUR EVENTS
            </span>
          </div>

          {/* Main Headline matching reference typography */}
          <h1 className="leading-[1.12] mb-5 tracking-tight">
            <span className="block font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
              Unforgettable Moments
            </span>
            <span className="block font-script text-4xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-sm font-normal">
              Beautifully Planned
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed max-w-xl mb-8 drop-shadow">
            From dreamy weddings to lively celebrations, explore our upcoming and past events. Get inspired and find the perfect event for your special moments.
          </p>

          {/* Three Highlights with Icons matching reference */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            
            {/* 1. Elegant Themes */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5EFEB] font-medium">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/15 border border-[#DFC07B]/40 flex items-center justify-center text-[#DFC07B] shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide">Elegant Themes</span>
            </div>

            {/* 2. Custom Packages */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5EFEB] font-medium">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/15 border border-[#DFC07B]/40 flex items-center justify-center text-[#DFC07B] shrink-0">
                <Heart className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-wide">Custom Packages</span>
            </div>

            {/* 3. Professional Support */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5EFEB] font-medium">
              <div className="w-6 h-6 rounded-md bg-[#DFC07B]/15 border border-[#DFC07B]/40 flex items-center justify-center text-[#DFC07B] shrink-0">
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
