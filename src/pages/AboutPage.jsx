import React from 'react';
import EventsNavbar from '../components/events/EventsNavbar';
import EventsFooter from '../components/events/EventsFooter';
import EventsCTA from '../components/events/EventsCTA';
import { EventoraLogo, BotanicalCorner } from '../components/common/Icons';
import { Award, Users, Heart, Star, Sparkles, CheckCircle2 } from 'lucide-react';

const STATS = [
  { value: '1,200+', label: 'Events Executed', desc: 'Across India & destination locales' },
  { value: '99.8%', label: 'Client Delight', desc: 'Unwavering trust from families' },
  { value: '14+', label: 'Years of Mastery', desc: 'Pioneering luxury celebration design' },
  { value: '25+', label: 'Industry Awards', desc: 'Recognized for wedding scenography' },
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

export default function AboutPage({ onNavigateHome, onOpenConsultation, onNavigateGallery, onNavigateEvents, onNavigatePage }) {
  const handleNavigate = (route) => {
    if (route === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'events') {
      if (onNavigateEvents) onNavigateEvents();
      else onNavigateHome('events');
    } else if (route === 'gallery') {
      if (onNavigateGallery) onNavigateGallery();
      else onNavigateHome('gallery');
    } else if (route === 'services' || route === 'contact') {
      if (onNavigatePage) onNavigatePage(route);
      else onNavigateHome(route);
    } else {
      onNavigateHome(route);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241D] flex flex-col relative overflow-x-hidden selection:bg-[#DFC07B] selection:text-[#0A0E17]">
      
      {/* 1. Navbar */}
      <EventsNavbar 
        onNavigate={handleNavigate}
        onOpenConsultation={() => onOpenConsultation('About')}
        activePage="about"
      />

      {/* 2. Hero Section */}
      <section className="relative w-full min-h-[480px] flex items-center overflow-hidden bg-[#070C18] pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-stage.jpg" 
            alt="Eventora Team & Vision" 
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/90 to-[#070C18]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase block mb-3">
              ABOUT EVENTORA
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
              Crafting Milestones, <br />
              <span className="font-script text-[#DFC07B] text-4xl sm:text-5xl lg:text-6xl font-normal">
                Cherishing Memories
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed mb-6">
              Founded on the belief that life’s most profound moments deserve regal grandeur and soulful warmth, Eventora has grown into a premier luxury celebration architectural studio.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
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

      {/* 4. Story & Heritage */}
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

      {/* 5. Bottom CTA */}
      <EventsCTA onOpenConsultation={() => onOpenConsultation('General')} />

      {/* 6. Footer */}
      <EventsFooter onNavigate={handleNavigate} />

    </div>
  );
}
