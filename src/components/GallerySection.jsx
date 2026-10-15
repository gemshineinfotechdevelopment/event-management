import React, { useState } from 'react';
import { Camera, Eye, ArrowRight } from 'lucide-react';

export default function GallerySection({ onOpenLightbox, onOpenConsultation }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    'All',
    'Wedding',
    'Engagement',
    'Birthday',
    'Corporate',
    'College',
    'Baby Shower',
    'Private Party'
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Grand Floral Mandap Pavilion',
      category: 'Wedding',
      image: '/venue-mandap.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 2,
      title: 'Fairy Light Royal Dining Banquet',
      category: 'Engagement',
      image: '/venue-lights.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 3,
      title: 'Rose Gold Milestone Birthday',
      category: 'Birthday',
      image: '/birthday.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 4,
      title: 'Global Leadership Summit Stage',
      category: 'Corporate',
      image: '/corporate.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 5,
      title: 'Garden Festoon Dining Soirée',
      category: 'Private Party',
      image: '/privateparty.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 6,
      title: 'Enchanting Floral Tunnel Walkway',
      category: 'Wedding',
      image: '/floral-tunnel.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 7,
      title: 'Vibrant Campus Youth Music Fest',
      category: 'College',
      image: '/college.jpg',
      aspect: 'col-span-1'
    },
    {
      id: 8,
      title: 'Whimsical Teddy Cloud Baby Shower',
      category: 'Baby Shower',
      image: '/babyshower.jpg',
      aspect: 'col-span-1',
      isMoreTile: false
    }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="gallery" className="relative bg-[#FAF8F5] text-[#2C241D] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#EFE5D5] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">FEATURED GALLERY</span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight">
            A Glimpse Of Our Celebrations
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] text-[#1C1610] shadow-xs'
                    : 'bg-[#FAF6F0] hover:bg-[#F3E8CE] text-[#5C4F41] border border-[#E5DAC6] hover:border-[#C5A059]'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid (4 columns on lg, 2 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item, index) => {
            // Check if this is the 8th tile when viewing all
            if (index === 7 && activeFilter === 'All') {
              return (
                <div
                  key="more-tile"
                  onClick={onOpenConsultation}
                  className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md bg-gradient-to-br from-[#FAF6F0] to-[#F3ECE0] border border-[#DFC07B] flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] group-hover:scale-110 group-hover:bg-[#DFC07B] group-hover:text-[#1C1610] transition-all mb-4 shadow-xs">
                    <Camera className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#241C14] group-hover:text-[#8C6B1C] transition-colors">
                    View More Moments
                  </h4>
                  <p className="text-xs text-[#6E6052] mt-1 mb-3">
                    Explore 500+ archives
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6B1C] group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                    <span>Inquire Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox({ url: item.image, title: item.title, category: item.category })}
                className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-[#E8DCC4] hover:border-[#C5A059] transition-all duration-300 transform hover:-translate-y-1 bg-[#FAF6F0]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark vignette at bottom for photography clarity & crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between z-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC07B] px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-sm border border-[#DFC07B]/40 shadow-xs">
                      {item.category}
                    </span>
                    <h4 className="font-serif-luxury text-base font-bold text-white mt-1.5 leading-snug drop-shadow-sm group-hover:text-[#F3E1B5] transition-colors">
                      {item.title}
                    </h4>
                  </div>

                  {/* Gold View Icon */}
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-[#DFC07B] flex items-center justify-center text-[#DFC07B] group-hover:bg-[#DFC07B] group-hover:text-[#1C1610] transition-all shadow-xs">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
