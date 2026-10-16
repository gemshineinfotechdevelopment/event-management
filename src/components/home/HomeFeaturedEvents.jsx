import React from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { PRIMARY_EVENTS } from '../../data/eventsPageData';

export default function HomeFeaturedEvents({ onNavigateEvents, onOpenConsultation }) {
  // Select 3 standout primary events
  const featured = PRIMARY_EVENTS.slice(0, 3);

  return (
    <section className="relative bg-[#FAF6F0] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#EFE5D5] select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#C5A059] text-xs">✦</span>
              <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
                SIGNATURE CELEBRATIONS
              </span>
              <span className="text-[#C5A059] text-xs">✦</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#241C14] tracking-tight leading-tight">
              Featured Upcoming Events
            </h2>
            <p className="text-sm sm:text-base text-[#645547] max-w-xl mt-2 leading-relaxed">
              Explore our most requested celebration formats, bespoke scenography, and royal experiences.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onNavigateEvents}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#DFC07B] hover:bg-[#DFC07B] text-[#8C6B1C] hover:text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3 Featured Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((ev) => {
            const Icon = ev.icon;
            return (
              <div
                key={ev.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E5DAC6] hover:border-[#DFC07B] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Event Image Banner with Date Badge */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Left Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 px-3.5 text-center shadow-md border border-[#DFC07B]/40">
                    <span className="block font-serif-luxury text-xl font-bold text-[#1C1610] leading-none">
                      {ev.dateBadge.day}
                    </span>
                    <span className="block text-[10px] font-bold text-[#8C6B1C] tracking-wider uppercase mt-0.5">
                      {ev.dateBadge.month} {ev.dateBadge.year}
                    </span>
                  </div>

                  {/* Right Floating Accent Tag */}
                  {ev.accentTag && (
                    <div className="absolute top-4 right-4 bg-[#070C18]/80 backdrop-blur-md text-[#DFC07B] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-[#DFC07B]/40">
                      {ev.accentTag}
                    </div>
                  )}

                  {/* Category Pill at bottom left of image */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#DFC07B]/30 flex items-center justify-center text-[#DFC07B]">
                      {Icon && <Icon className="w-3 h-3" />}
                    </div>
                    <span>{ev.category}</span>
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#241C14] group-hover:text-[#8C6B1C] transition-colors mb-2 leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#645547] leading-relaxed line-clamp-2 mb-4">
                      {ev.desc}
                    </p>

                    {/* Metadata Items */}
                    <div className="space-y-2 pt-3 border-t border-[#F5EFE6] text-xs text-[#5C4F41]">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span>Capacity: {ev.guestCapacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span>{ev.timing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#F5EFE6] flex items-center justify-between">
                    <button
                      onClick={() => onOpenConsultation(ev.category)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6B1C] hover:text-[#58410E] transition-colors cursor-pointer"
                    >
                      <span>Inquire For This Theme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-semibold text-[#8C6B1C] bg-[#DFC07B]/15 px-2.5 py-1 rounded-full">
                      Bespoke
                    </span>
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
