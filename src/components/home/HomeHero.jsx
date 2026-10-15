import React from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  WeddingRingsIcon, 
  CorporateBriefcaseIcon, 
  BirthdayCakeIcon, 
  PartyGlassesIcon 
} from '../common/GalleryIcons';

export default function HomeHero({ onOpenConsultation }) {
  const categories = [
    { label: 'Weddings & Receptions', icon: WeddingRingsIcon },
    { label: 'Corporate Events', icon: CorporateBriefcaseIcon },
    { label: 'Birthdays & Celebrations', icon: BirthdayCakeIcon },
    { label: 'Private Parties', icon: PartyGlassesIcon },
  ];

  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
      
      {/* Background Wedding Stage Pavilion Image on the Right with Soft Dark Blend */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img 
            src="/hero-stage.jpg" 
            alt="Eventora luxury wedding stage pavilion with chandeliers" 
            className="w-full h-full object-cover object-right lg:object-center filter brightness-95"
          />
          {/* Gradients to seamlessly blend image into dark navy on the left and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/65 to-transparent z-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:py-32 w-full">
        <div className="max-w-2xl">
          
          {/* Small Gold Tag */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
              WELCOME TO EVENTORA
            </span>
          </div>

          {/* Main Headline matching reference */}
          <h1 className="leading-[1.12] mb-5 tracking-tight">
            <span className="block font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md">
              Your Dream Event
            </span>
            <span className="block font-script text-4xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-sm font-normal">
              Our Passion
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed max-w-xl mb-8 drop-shadow">
            From elegant weddings to grand celebrations, we craft unforgettable moments that reflect your unique story.
          </p>

          {/* Four Categories with Small Gold Icons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F5EFEB] font-medium">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/15 border border-[#DFC07B]/40 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">{cat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Solid Gold Plan Your Event Button */}
          <div>
            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#1C1610]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
