import React from 'react';
import EventsCTA from '../components/events/EventsCTA';
import { EventoraLogo } from '../components/common/Icons';
import { Award, Heart, Star, Sparkles, ArrowRight } from 'lucide-react';

const STATS = [
  { value: '1,000+', label: 'Events Executed', desc: 'Across India & destination locales' },
  { value: '99.8%', label: 'Client Delight', desc: 'Unwavering trust from families' },
  { value: '14+', label: 'Years of Mastery', desc: 'Pioneering luxury celebration design' },
  { value: '5+', label: 'Industry Awards', desc: 'Recognized for wedding scenography' },
];

const VALUES = [
  {
    title: 'Uncompromising Elegance',
    desc: 'We never settle for ordinary. Every floral stem, luminary arc, and fabric drape is curated with museum-grade precision.',
    icon: Sparkles
  },
  {
    title: 'Deep Empathy & Trust',
    desc: 'Behind every celebration is a cherished dream. We listen intently, anticipate every unspoken need, and honor your traditions.',
    icon: Heart
  },
  {
    title: 'Flawless Synchronization',
    desc: 'Logistics, AV, culinary timing, and security flow like a live symphony without a single guest noticing the meticulous gears behind.',
    icon: Award
  },
  {
    title: 'Creative Audacity',
    desc: 'We invent unique visual signatures for each client, ensuring your wedding or gala is unlike anything your guests have ever witnessed.',
    icon: Star
  }
];

export default function AboutPage({ onOpenConsultation }) {
  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img 
              src="/about-hero.jpg" 
              alt="Eventora Royal Ballroom & Floral Arch" 
              className="w-full h-full object-cover object-[center_35%] md:object-right lg:object-center filter brightness-100 contrast-[1.02]"
            />
            {/* Mobile Gradients: reveals royal ballroom & chandeliers with crisp legibility */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#070C18]/80 via-[#070C18]/45 to-[#070C18]/95 z-1" />

            {/* Desktop Gradients: completely untouched for desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/60 to-transparent z-1" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 max-w-2xl text-left">
              {/* Gold Tag */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  ABOUT EVENTORA
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="leading-[1.15] mb-4 sm:mb-5 tracking-tight">
                <span className="block font-serif-luxury text-[32px] sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  Crafting Milestones
                </span>
                <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal">
                  Cherishing Memories
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#FAF7F2] sm:text-[#E2DACB] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Founded on the belief that life’s most profound moments deserve regal grandeur and soulful warmth, Eventora has grown into a premier luxury celebration architectural studio.
              </p>

              {/* Highlights Pills (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex sm:flex-wrap items-center gap-6 pt-1 mb-7 sm:mb-8">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">14+ Years of Mastery</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">1,200+ Celebrations</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Star className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">25+ Design Awards</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenConsultation('About')}
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Book Private Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Calligraphic Accent Box on Desktop */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="text-right p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#DFC07B]/30 shadow-2xl max-w-xs transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block mb-2">
                  OUR PHILOSOPHY
                </span>
                <p className="font-script text-2xl text-[#F5EAD2] leading-tight select-none">
                  Life is a Celebration.<br />
                  Make every chapter<br />
                  Unforgettable.
                </p>
                <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-[#DFC07B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase font-semibold text-[10px]">The Eventora Legacy</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-white border-b border-[#E5DAC6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl">
                <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#8C6B1C] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1610] mb-0.5">
                  {stat.label}
                </p>
                <p className="text-[11px] text-[#786C5E]">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Story & Heritage */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#DFC07B]/40 shadow-2xl">
              <img 
                src="/floral-tunnel.jpg" 
                alt="Eventora Floral Artistry" 
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col items-center bg-[#070C18] text-white p-6 rounded-2xl border border-[#DFC07B]/60 shadow-xl max-w-xs text-center">
              <EventoraLogo className="w-10 h-10 mb-2" />
              <span className="font-serif-luxury text-lg font-bold text-white">Eventora Atelier</span>
              <span className="text-[10px] text-[#DFC07B] uppercase tracking-widest mt-0.5">Chennai • Bangalore • Kochi</span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
              OUR JOURNEY & PHILOSOPHY
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0D1527] leading-tight">
              Where Royal Tradition Meets Contemporary Grandeur
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4F41] leading-relaxed">
              At Eventora, we consider event planning an art form of deep human connection. From the initial whispered ideas during your first private consultation to the moment the fireworks illuminate the night sky, our artisans and event directors work tirelessly behind the curtain.
            </p>
            <p className="text-xs sm:text-sm text-[#5C4F41] leading-relaxed">
              We specialize in large-scale royal weddings, milestone jubilee bashes, corporate summits, and intimate luxury dinners. With our own production workshops, floral cold-chains, and gourmet test kitchens, we maintain complete control over quality and timelines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {VALUES.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#E5DAC6] shadow-2xs">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#8C6B1C] mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif-luxury text-base font-bold text-[#1C1610] mb-1">
                      {val.title}
                    </h4>
                    <p className="text-[11px] text-[#5C4F41] leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Bottom CTA */}
      <EventsCTA onOpenConsultation={() => onOpenConsultation('General')} />

    </div>
  );
}
