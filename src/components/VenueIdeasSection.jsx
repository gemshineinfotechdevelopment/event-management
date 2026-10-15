import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BotanicalCorner } from './common/Icons';

export default function VenueIdeasSection({ onOpenLightbox, onScrollToGallery }) {
  return (
    <section id="venues" className="relative bg-[#FDF8F5] text-[#2C241D] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#F2E5DC] scroll-mt-24">
      
      {/* Decorative Botanical Flourish (Top Right and Bottom Left) */}
      <div className="absolute -top-10 -right-10 pointer-events-none opacity-30">
        <BotanicalCorner className="w-48 h-48 sm:w-64 sm:h-64" flip={true} />
      </div>
      <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-30">
        <BotanicalCorner className="w-48 h-48 sm:w-64 sm:h-64" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Side: Script / Display Heading & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Script Heading with soft blush rose tint */}
            <div className="mb-6">
              <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#A64B56] leading-[1.18] drop-shadow-xs">
                Venue Ideas. <br />
                <span className="text-[#8E3B46]">Beautiful Themes.</span> <br />
                <span className="text-[#6E2B34]">Unforgettable Experiences.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#645547] font-normal max-w-md mb-8 leading-relaxed">
              Explore our curated selection of palace courtyards, luxury ballrooms, open-air lawns, and magical seaside pavilions.
            </p>

            {/* Light Gold/Ivory Pill Button */}
            <button
              onClick={onScrollToGallery}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] group"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

          </div>

          {/* Right Side: 3 Overlapping Collage Images */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-4 items-center">
              
              {/* Image 1: Outdoor floral mandap */}
              <div
                onClick={() => onOpenLightbox({ url: '/venue-mandap.jpg', title: 'Grand Floral Mandap Pavilion' })}
                className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-[#DFC07B]/70 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 sm:translate-y-3 bg-white"
              >
                <img
                  src="/venue-mandap.jpg"
                  alt="Outdoor Mandap Pavilion"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C241D]/60 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-semibold tracking-wide">
                  Outdoor Garden Mandap
                </div>
              </div>

              {/* Image 2: Long fairy light banquet hall */}
              <div
                onClick={() => onOpenLightbox({ url: '/venue-lights.jpg', title: 'Fairy Light Royal Dining Banquet' })}
                className="group relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-2 border-[#DFC07B] cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 z-10 sm:-translate-y-2 bg-white"
              >
                <img
                  src="/venue-lights.jpg"
                  alt="Fairy Light Canopy Banquet"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C241D]/60 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-semibold tracking-wide">
                  Fairy Light Canopy Hall
                </div>
              </div>

              {/* Image 3: Indoor reception stage */}
              <div
                onClick={() => onOpenLightbox({ url: '/venue-stage.jpg', title: 'Grand Ballroom & DJ Reception' })}
                className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-[#DFC07B]/70 cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 sm:translate-y-4 bg-white"
              >
                <img
                  src="/venue-stage.jpg"
                  alt="Ballroom Reception Stage"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C241D]/60 via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-semibold tracking-wide">
                  Illuminated Ballroom
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
