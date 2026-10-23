import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HomeGallery({ onNavigateGallery }) {
  const galleryItems = [
    {
      id: 1,
      title: 'Grand Wedding Mandap',
      image: '/gallery-hero.jpg',
      category: 'Weddings',
    },
    {
      id: 2,
      title: 'Luxury Candlelit Banquet',
      image: '/banquet.jpg',
      category: 'Dining',
    },
    {
      
      id: 3,
      title: 'Corporate Leadership Summit',
      image: '/corporate.jpg',
      category: 'Corporate',
    },
    {
      id: 4,
      title: 'Milestone Birthday Celebration',
      image: '/birthday-cake.jpg',
      category: 'Birthdays',
    },
    {
      id: 5,
      title: 'Outdoor Garden Party',
      image: '/venue-lights.jpg',
      category: 'Private Parties',
    },
  ];

  return (
    <section className="relative bg-[#070C18] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Row: Left Texts + Right View Gallery Button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase block mb-2">
              OUR GALLERY
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-[40px] font-bold text-white tracking-tight leading-tight">
              Moments That Tell Beautiful Stories
            </h2>
            <p className="text-xs sm:text-sm text-[#E2DACB] font-light leading-relaxed mt-2 max-w-xl">
              Explore our stunning collection of events and get inspired for your own special day.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onNavigateGallery}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#DFC07B] bg-transparent hover:bg-[#DFC07B] text-[#DFC07B] hover:text-[#060A14] text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(223,192,123,0.35)] cursor-pointer"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 5 Event Image Cards in Horizontal Row (Desktop) / Grid (Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={onNavigateGallery}
              className="group relative h-48 sm:h-56 lg:h-60 rounded-2xl overflow-hidden border border-white/10 hover:border-[#DFC07B]/80 shadow-md transition-all duration-300 cursor-pointer"
              title={`View ${item.title} in Gallery`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              {/* Subtle hover title badge */}
              <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] text-[#DFC07B] uppercase font-bold tracking-wider block">
                  {item.category}
                </span>
                <p className="text-xs text-white font-semibold truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
