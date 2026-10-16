import React from 'react';
import { MessagesSquare, Compass, Sparkles, PartyPopper, ArrowRight } from 'lucide-react';
import { BotanicalCorner } from './common/Icons';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Consultation',
      desc: 'Tell us your vision, preferences and expectations.',
      icon: MessagesSquare
    },
    {
      step: '02',
      title: 'Planning',
      desc: 'We create a customized plan and theme.',
      icon: Compass
    },
    {
      step: '03',
      title: 'Execution',
      desc: 'Our team handles every detail with precision.',
      icon: Sparkles
    },
    {
      step: '04',
      title: 'Celebrate',
      desc: 'You enjoy the moment, we handle the rest.',
      icon: PartyPopper
    }
  ];

  return (
    <section id="how-it-works" className="relative bg-[#FAF6F0] text-[#2C241D] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#EFE5D5] scroll-mt-24">
      
      {/* Decorative Botanical Branch Accents */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-25">
        <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-25">
        <BotanicalCorner className="w-36 h-36 sm:w-48 sm:h-48" flip={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">HOW IT WORKS</span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight">
            From Idea to Unforgettable Event
          </h2>
        </div>

        {/* 4-Step Process Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative items-start">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="flex flex-col items-center text-center relative group">
                
                {/* Connecting Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 left-[68%] w-[64%] items-center justify-center z-0 pointer-events-none">
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#DFC07B] via-[#DFC07B]/60 to-transparent" />
                    <ArrowRight className="w-4 h-4 text-[#DFC07B] -ml-2" />
                  </div>
                )}

                {/* Circular Gold Icon Container */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-[#DFC07B] group-hover:border-[#C5A059] shadow-md group-hover:shadow-lg flex flex-col items-center justify-center text-[#9A731F] group-hover:scale-108 transition-all duration-300 mb-5">
                  <Icon className="w-7 h-7 stroke-[1.6]" />
                </div>

                {/* Step Number */}
                <span className="text-xs font-bold tracking-[0.25em] text-[#8C6B1C] uppercase mb-1">
                  {item.step}
                </span>

                {/* Title */}
                <h3 className="font-serif-luxury text-xl font-bold text-[#241C14] mb-2 group-hover:text-[#8C6B1C] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#645547] font-normal max-w-[220px] leading-relaxed">
                  {item.desc}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
