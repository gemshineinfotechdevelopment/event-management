import React from 'react';
import { ArrowRight, Users, Award, CalendarCheck, Clock } from 'lucide-react';

export default function FinalCTA({ onOpenConsultation }) {
  const stats = [
    {
      value: '1000+',
      label: 'Happy Clients',
      icon: Users
    },
    {
      value: '7',
      label: 'Years of Experience',
      icon: Award
    },
    {
      value: '500+',
      label: 'Events Completed',
      icon: CalendarCheck
    },
    {
      value: '24/7',
      label: 'Support',
      icon: Clock
    }
  ];

  return (
    <section className="relative bg-[#FAF6F0] text-[#2C241D] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#EFE5D5]">
      
      {/* Background Photography with Subtle Warm Transparent Overlay (Bright & Cinematic) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <img
          src="/venue-lights.jpg"
          alt="Warm Lights Bokeh"
          className="w-full h-full object-cover object-center filter blur-[1px]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/88 via-[#FAF6F0]/70 to-[#FAF6F0]/88 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Stats Column (Desktop) */}
          <div className="lg:col-span-3 flex lg:flex-col justify-around gap-6 order-2 lg:order-1 text-center lg:text-right">
            {stats.slice(0, 2).map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center lg:items-end">
                  <div className="w-11 h-11 rounded-full bg-white border border-[#DFC07B] shadow-xs flex items-center justify-center text-[#9A731F] mb-2">
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#241C14]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#6E6052] tracking-wider uppercase font-bold mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Main CTA */}
          <div className="lg:col-span-6 flex flex-col items-center text-center order-1 lg:order-2 py-4">
            <span className="font-serif-luxury text-2xl sm:text-3xl text-[#241C14] font-medium leading-none">
              Let's Create Your
            </span>
            <span className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold text-[#8C6B1C] tracking-tight mt-1 mb-4 leading-tight">
              Perfect Celebration
            </span>
            <p className="text-sm sm:text-base text-[#5C4F41] font-normal max-w-md mb-8 leading-relaxed">
              Tell us about your event and we'll take care of the rest.
            </p>

            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#DFC07B]/35 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
          </div>

          {/* Right Stats Column (Desktop) */}
          <div className="lg:col-span-3 flex lg:flex-col justify-around gap-6 order-3 text-center lg:text-left">
            {stats.slice(2, 4).map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <div className="w-11 h-11 rounded-full bg-white border border-[#DFC07B] shadow-xs flex items-center justify-center text-[#9A731F] mb-2">
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#241C14]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#6E6052] tracking-wider uppercase font-bold mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
