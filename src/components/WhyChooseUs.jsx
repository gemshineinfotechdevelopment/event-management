import React from 'react';
import { 
  Lightbulb, 
  Layers, 
  Users, 
  Crown, 
  Palette, 
  Clock, 
  Coins, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export default function WhyChooseUs({ onOpenConsultation }) {
  const features = [
    {
      title: 'Creative Concepts',
      icon: Lightbulb,
      desc: 'Unique artistic visions tailored to your individuality.'
    },
    {
      title: 'End-to-End Planning',
      icon: Layers,
      desc: 'Seamless coordination from concept to final farewell.'
    },
    {
      title: 'Experienced Team',
      icon: Users,
      desc: 'Decade of mastery in executing grand celebrations.'
    },
    {
      title: 'Premium Vendors',
      icon: Crown,
      desc: 'Hand-picked elite florists, caterers, and artists.'
    },
    {
      title: 'Personalized Themes',
      icon: Palette,
      desc: 'Custom mood boards and bespoke scenography.'
    },
    {
      title: 'On-Time Execution',
      icon: Clock,
      desc: 'Military-grade punctuality with zero stress.'
    },
    {
      title: 'Bespoke Curation',
      icon: Crown,
      desc: 'Tailored celebrations reflecting your distinct style.'
    },
    {
      title: 'Hassle-Free Experience',
      icon: ShieldCheck,
      desc: 'You cherish the moments, we orchestrate the magic.'
    }
  ];

  return (
    <section id="why-us" className="relative bg-[#FAF6F0] text-[#2C241D] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#EFE5D5] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Large Rounded Organic Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Gold Outer Ring Outline */}
              <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-[#DFC07B]/40 transform -rotate-1 pointer-events-none" />
              
              {/* Main Image Container */}
              <div className="relative rounded-[2.2rem] overflow-hidden shadow-xl shadow-[#46382C]/8 border border-[#DFC07B]/60 h-[420px] sm:h-[500px]">
                <img
                  src="/banquet.jpg"
                  alt="Luxury Event Decor Banquet"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Light Luxury Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FAF8F5]/92 backdrop-blur-md border border-[#DFC07B]/50 text-[#2C241D] shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F3E8CE] to-[#DFC07B] flex items-center justify-center text-[#8C6B1C] font-bold text-sm shadow-xs">
                      ★
                    </div>
                    <div>
                      <p className="font-serif-luxury text-base font-bold text-[#241C14]">100% Bespoke Elegance</p>
                      <p className="text-[11px] text-[#8C6B1C] font-medium">Every celebration tailored to perfection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & 8 Circular Features Grid */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Small Gold Label */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#C5A059] text-xs">✦</span>
              <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">WHY CHOOSE US</span>
            </div>

            {/* Title */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight mb-2">
              Turning Moments <br className="hidden sm:inline" />
              Into Memories
            </h2>

            {/* Gold Flourish Line */}
            <div className="flex items-center gap-2 my-2">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#C5A059] to-transparent" />
              <span className="text-[#C5A059] text-xs">◆</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#645547] font-normal max-w-xl leading-relaxed mb-6">
              We don't just plan events, we craft experiences with creativity, precision and passion.
            </p>

            {/* CTA Button */}
            <div className="mb-10">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#DFC07B]/30 hover:scale-[1.02]"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 8 Circular Icon Features in 4x2 Grid (Circular Ivory Backgrounds) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/80"
                  >
                    {/* Circular Ivory Background with Thin Gold Border & Soft Shadow */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-[#DFC07B]/50 group-hover:border-[#C5A059] shadow-sm group-hover:shadow-md flex items-center justify-center text-[#9A731F] group-hover:text-[#6E5011] group-hover:scale-108 transition-all duration-300 mb-2.5">
                      <Icon className="w-6 h-6 stroke-[1.6]" />
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-bold text-[#2C241D] group-hover:text-[#8C6B1C] transition-colors leading-snug">
                      {feat.title}
                    </h4>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
