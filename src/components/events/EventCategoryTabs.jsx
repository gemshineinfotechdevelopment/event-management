import React from 'react';
import { FloralFlourishWatermark } from '../common/GalleryIcons';
import { EVENT_CATEGORIES } from '../../data/eventsPageData';

export default function EventCategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <section className="relative bg-[#FAF8F5] pt-14 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Decorative Botanical Flourishes in Margins (matching reference image) */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-25">
        <FloralFlourishWatermark className="w-44 h-44 sm:w-64 sm:h-64" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none opacity-25">
        <FloralFlourishWatermark className="w-44 h-44 sm:w-64 sm:h-64" flipX={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-3 mb-2">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
            EXPLORE OUR
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Section Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1527] tracking-tight mb-2">
          Upcoming Events
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#5C4F41] max-w-md mx-auto mb-9">
          Discover our latest events and be a part of something special.
        </p>

        {/* Category Tabs Container */}
        <div className="flex items-center justify-start lg:justify-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 no-scrollbar px-2">
          {EVENT_CATEGORIES.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group shrink-0 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer min-w-[96px] sm:min-w-[110px] px-3.5 py-3.5 sm:py-4 ${
                  isActive
                    ? 'bg-[#0D1527] text-white shadow-xl shadow-[#0D1527]/25 ring-2 ring-[#DFC07B]/80 transform -translate-y-0.5'
                    : 'bg-white text-[#2C241D] border border-[#E5DAC6] hover:border-[#DFC07B] shadow-xs hover:shadow-md hover:-translate-y-0.5'
                }`}
                aria-label={`Filter by ${cat.name}`}
                aria-pressed={isActive}
              >
                {/* Icon Container */}
                <div className={`mb-2 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-[#DFC07B]' : 'text-[#4A3B2C] group-hover:text-[#8C6B1C]'
                }`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Category Label */}
                <span className={`text-[11px] sm:text-xs font-semibold tracking-wide whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-[#2C241D] group-hover:text-[#8C6B1C]'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
