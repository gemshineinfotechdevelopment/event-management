import React from 'react';
import { ArrowRight, Calendar, Heart, Award } from 'lucide-react';
import { FloralFlourishWatermark } from '../common/GalleryIcons';

export default function HomeAbout({ onNavigateAbout }) {
  const stats = [
    {
      value: '100+',
      label: 'Events Planned',
      icon: Calendar,
    },
    {
      value: '98%',
      label: 'Client Satisfaction',
      icon: Heart,
    },
    {
      value: '5+',
      label: 'Years of Experience',
      icon: Award,
    },
  ];

  return (
    <section className="relative bg-[#FAF8F5] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Decorative Botanical Flourish on Right Margin */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none opacity-20">
        <FloralFlourishWatermark className="w-56 h-56 sm:w-72 sm:h-72" flipX={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3 Event Photographs (1 Large + 2 Smaller Stacked) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4">
            
            {/* 1. Large Main Photograph (Left 7 cols) */}
            <div className="col-span-7 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5DAC6] shadow-md group">
              <img
                src="/banquet.jpg"
                alt="Eventora Luxury Banquet Setting"
                className="w-full h-[320px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Handwritten Script Accent Overlay */}
              <div className="absolute bottom-4 left-4 z-10 select-none">
                <span className="font-script text-2xl sm:text-3xl text-[#F5EAD2] drop-shadow-md block">
                  Magical Moments
                </span>
                <span className="font-script text-xl sm:text-2xl text-[#DFC07B] drop-shadow-md -mt-1 block">
                  Planned
                </span>
              </div>
            </div>

            {/* 2 & 3. Two Supporting Photographs Stacked Vertically (Right 5 cols) */}
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              
              {/* Top Supporting Image: Floral Centerpiece */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5DAC6] shadow-xs group h-[154px] sm:h-[192px]">
                <img
                  src="/dining-centerpiece.jpg"
                  alt="Floral Centerpiece on Table"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Bottom Supporting Image: Outdoor Night Party with Lights */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E5DAC6] shadow-xs group h-[154px] sm:h-[192px]">
                <img
                  src="/privateparty.jpg"
                  alt="Outdoor Dining Under Lights"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

            </div>

          </div>

          {/* Right Column: About Eventora Text & Stats */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            {/* Small Gold Tag */}
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase mb-2">
              ABOUT EVENTORA
            </span>

            {/* Main Heading */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0D1527] tracking-tight leading-tight mb-4">
              Creating Unforgettable Moments
            </h2>

            {/* Description matching reference text */}
            <p className="text-xs sm:text-sm text-[#5C4F41] leading-relaxed max-w-xl mb-8">
              At Eventora, we believe every celebration has a story. Our mission is to bring your vision to life with creativity, attention to detail and a passion for perfection.
            </p>

            {/* Three Statistic Blocks */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md pb-6 border-b border-[#EFE5D5]">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-4 h-4 text-[#8C6B1C] shrink-0" />
                      <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#0D1527] leading-none">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#786C5E] leading-tight font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dark Navy Learn More Button */}
            <button
              onClick={onNavigateAbout}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFC07B] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
