import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Our wedding was beyond perfect. Every detail was beautifully planned and executed.",
      name: "Priya & Karthik",
      role: "Wedding",
      rating: 5,
      avatar: "/avatar-1.jpg"
    },
    {
      id: 2,
      quote: "Professional, creative and hassle-free. Our corporate event was a huge success.",
      name: "Rohit Mehta",
      role: "Corporate Event",
      rating: 5,
      avatar: "/avatar-2.jpg"
    },
    {
      id: 3,
      quote: "They made my daughter's birthday so special. Everything was just magical!",
      name: "Sneha Varun",
      role: "Birthday Party",
      rating: 5,
      avatar: "/avatar-3.jpg"
    }
  ];

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section id="reviews" className="relative bg-[#FDF8F5] text-[#2C241D] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#F2E5DC] scroll-mt-24">
      
      {/* Top Arched Curve Transition */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          className="w-full h-10 sm:h-16 text-[#FAF6F0] fill-current" 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,20 C1080,75 360,75 0,20 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">TESTIMONIALS</span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Cards Grid & Carousel Navigation */}
        <div className="relative">
          
          {/* Circular Navigation Buttons on Desktop Sides */}
          <button
            onClick={prev}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#DFC07B] items-center justify-center text-[#8C6B1C] hover:bg-[#DFC07B] hover:text-[#1C1610] transition-all shadow-md"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#DFC07B] items-center justify-center text-[#8C6B1C] hover:bg-[#DFC07B] hover:text-[#1C1610] transition-all shadow-md"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container (White & Cream with Gold Border & Soft Shadow) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group relative p-7 rounded-2xl bg-white border border-[#DFC07B]/60 hover:border-[#C5A059] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Quote Icon */}
                  <div className="text-[#DFC07B] mb-4 group-hover:text-[#B88E28] transition-colors">
                    <Quote className="w-8 h-8 rotate-180 opacity-60" />
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm text-[#46382C] font-normal leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2E5DC] flex flex-col">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>

                  {/* Client Info with Circular Avatar */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#DFC07B]"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-serif-luxury text-base font-bold text-[#241C14] leading-tight">
                        {t.name}
                      </h4>
                      <p className="text-xs text-[#8C6B1C] font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots below */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 h-1.5 bg-[#C5A059]'
                    : 'w-1.5 h-1.5 bg-[#2C241D]/20 hover:bg-[#2C241D]/40'
                }`}
                aria-label={`Testimonial dot ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
