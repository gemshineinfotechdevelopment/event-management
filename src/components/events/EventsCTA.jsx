import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BotanicalCorner } from '../common/Icons';

export default function EventsCTA({ onOpenConsultation }) {
  return (
    <section className="relative bg-[#FAF8F5] py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#070C18] border border-[#DFC07B]/40 shadow-2xl p-6 sm:p-12 lg:p-14">
          
          {/* Subtle Blurred Floral Background Image */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img
              src="/wedding.jpg"
              alt="Floral background"
              className="w-full h-full object-cover filter blur-xs"
            />
            <div className="absolute inset-0 bg-[#070C18]/90" />
          </div>

          {/* Decorative Gold Botanical Leaf Flourishes in Corners */}
          <div className="absolute bottom-0 left-0 pointer-events-none opacity-25">
            <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" />
          </div>
          <div className="absolute top-0 right-0 pointer-events-none opacity-25">
            <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" flip={true} />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
            
            {/* Left Texts */}
            <div className="flex flex-col max-w-xl">
              <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase mb-2">
                MAKE YOUR EVENT SPECIAL
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                Dream It &middot; Plan It &middot; Celebrate It
              </h2>
              <p className="text-xs sm:text-sm text-[#E2DACB] font-light mt-2 leading-relaxed">
                We create beautiful moments that last a lifetime.
              </p>
            </div>

            {/* Right Gold Button */}
            <div className="w-full sm:w-auto shrink-0">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
