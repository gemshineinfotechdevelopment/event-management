import React from 'react';
import { Star } from 'lucide-react';
import { FloralFlourishWatermark } from '../common/GalleryIcons';

export default function HomeTestimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "Eventora made our wedding day truly magical. Every detail was perfect!",
      name: "Priya & Arjun",
      role: "Wedding Couple",
      rating: 5,
      avatar: "/avatar-1.jpg"
    },
    {
      id: 2,
      quote: "Professional, creative and easy to work with. Highly recommended for any event!",
      name: "Rahul Menon",
      role: "Corporate Client",
      rating: 5,
      avatar: "/avatar-2.jpg"
    },
    {
      id: 3,
      quote: "Our daughter's birthday was a dream come true. Thank you, Eventora!",
      name: "Sneha Kumar",
      role: "Parent",
      rating: 5,
      avatar: "/avatar-3.jpg"
    }
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
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
            WHAT OUR CLIENTS SAY
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]" />
        </div>

        {/* Section Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1527] tracking-tight mb-2">
          Trusted by Happy Clients
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#5C4F41] max-w-lg mx-auto mb-12">
          Real stories from people who made their special moments with us.
        </p>

        {/* 3 Testimonials Cards in 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 text-left">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E5DAC6] hover:border-[#DFC07B] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Text */}
              <p className="text-xs sm:text-sm text-[#46382C] leading-relaxed italic mb-6">
                "{t.quote}"
              </p>

              {/* Client Info Row */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F5EFE6]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#DFC07B]/80 shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h3 className="font-serif-luxury text-base font-bold text-[#1C1610] leading-tight truncate">
                    {t.name}
                  </h3>
                  <span className="text-[11px] text-[#8C6B1C] font-semibold mt-0.5">
                    {t.role}
                  </span>
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#DFC07B] text-[#DFC07B]" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
