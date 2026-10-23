import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BotanicalCorner } from '../common/Icons';

export default function GalleryCTA({ onOpenConsultation }) {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 select-none">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171412] via-[#2A231C] to-[#171412] border border-[#DFC07B]/40 shadow-2xl p-7 sm:p-10 lg:p-12">
        
        {/* Subtle Decorative Floral Line Art in Corners */}
        <div className="absolute -left-6 -top-6 pointer-events-none opacity-20">
          <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" />
        </div>
        <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-20">
          <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" flip={true} />
        </div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#DFC07B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Text */}
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#DFC07B]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase">
                LET'S PLAN YOUR NEXT EVENT
              </span>
              <span className="w-6 h-[1px] bg-[#DFC07B]" />
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
              Turn Your Dream Into Reality
            </h2>

            <p className="text-xs sm:text-sm text-[#D5CAB9] font-light max-w-lg">
              Get in touch with us and let's create something magical together.
            </p>
          </div>

          {/* Right Gold Pill Button */}
          <div className="w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#DFC07B]/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
