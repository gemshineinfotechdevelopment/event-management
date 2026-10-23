import React from 'react';
import { ArrowRight, Camera, Music, Utensils, Building2, Sparkles } from 'lucide-react';
import { WeddingRingsIcon, FloralFlourishWatermark } from '../common/GalleryIcons';

export default function HomeServices({ onNavigateServices }) {
  const services = [
    {
      id: 'wedding-planning',
      title: 'Wedding Planning',
      icon: WeddingRingsIcon,
    },
    {
      id: 'event-decoration',
      title: 'Event Decoration',
      icon: Sparkles,
    },
    {
      id: 'photography',
      title: 'Photography & Videography',
      icon: Camera,
    },
    {
      id: 'entertainment',
      title: 'Entertainment & Artists',
      icon: Music,
    },
    {
      id: 'catering',
      title: 'Catering Services',
      icon: Utensils,
    },
    {
      id: 'venue-management',
      title: 'Venue Management',
      icon: Building2,
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Decorative Botanical Flourishes in Margins */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-20">
        <FloralFlourishWatermark className="w-44 h-44 sm:w-60 sm:h-60" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none opacity-20">
        <FloralFlourishWatermark className="w-44 h-44 sm:w-60 sm:h-60" flipX={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        {/* Section Overline */}
        <div className="inline-flex items-center gap-3 mb-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
            OUR SERVICES
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Section Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1527] tracking-tight mb-2">
          What We Offer
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#5C4F41] max-w-lg mx-auto mb-12">
          Comprehensive event planning services tailored to your needs.
        </p>

        {/* 6 Services Cards Row / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={onNavigateServices}
                className="group flex flex-col items-center justify-between p-4 sm:p-6 lg:p-7 rounded-2xl bg-white border border-[#E5DAC6] hover:border-[#DFC07B] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer text-center min-h-[160px] sm:min-h-[170px]"
                title={`Explore ${s.title}`}
              >
                {/* Centered Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] group-hover:bg-[#FCF9EE] border border-[#E5DAC6] group-hover:border-[#DFC07B] flex items-center justify-center text-[#1C1610] group-hover:text-[#8C6B1C] transition-all duration-300 shadow-2xs group-hover:scale-110 mb-4">
                  <Icon className="w-6 h-6 stroke-[1.7]" />
                </div>

                {/* Title */}
                <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors leading-snug line-clamp-2">
                  {s.title}
                </h3>

                {/* Small Gold Arrow at bottom */}
                <div className="mt-3 text-[#DFC07B] group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
