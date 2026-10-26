import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { PRIMARY_EVENTS } from '../../data/eventsPageData';
import { api } from '../../services/api';

export default function HomeFeaturedEvents({ onNavigateEvents, onOpenConsultation }) {
  const [eventsList, setEventsList] = useState(PRIMARY_EVENTS);
  const [loading, setLoading] = useState(true);

  // Fetch live events from the backend (reflects newly created admin events)
  const fetchLiveEvents = useCallback(async () => {
    try {
      const res = await api.getEvents();
      const data = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(data) && data.length > 0) {
        setEventsList(data);
      }
    } catch (err) {
      console.warn('Backend events offline, using initial defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveEvents();

    // Listen to real-time events change from admin side
    const handleEventsChange = () => {
      fetchLiveEvents();
    };

    const handleStorageChange = (e) => {
      if (e.key === 'eventora_events_last_updated') {
        fetchLiveEvents();
      }
    };

    window.addEventListener('eventora_events_changed', handleEventsChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleEventsChange);

    return () => {
      window.removeEventListener('eventora_events_changed', handleEventsChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleEventsChange);
    };
  }, [fetchLiveEvents]);

  // Select 3 standout primary/live events
  const featured = (eventsList && eventsList.length > 0 ? eventsList : PRIMARY_EVENTS).slice(0, 3);

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
            const Icon = ev.icon || Sparkles;

            // Safe date badge formatting
            let day = ev.dateBadge?.day;
            let month = ev.dateBadge?.month;
            let year = ev.dateBadge?.year;

            if (!day || !month || !year) {
              if (ev.date) {
                const d = new Date(ev.date);
                if (!isNaN(d.getTime())) {
                  day = String(d.getDate()).padStart(2, '0');
                  month = d.toLocaleString('en-US', { month: 'short' });
                  year = String(d.getFullYear());
                }
              }
            }

            day = day || '01';
            month = month || 'Jan';
            year = year || '2026';

            return (
              <div
                key={ev.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#E5DAC6] hover:border-[#DFC07B] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Event Image Banner with Date Badge */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={ev.image || ev.thumbnail || '/wedding.jpg'}
                    alt={ev.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Left Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 px-3.5 text-center shadow-md border border-[#DFC07B]/40">
                    <span className="block font-serif-luxury text-xl font-bold text-[#1C1610] leading-none">
                      {day}
                    </span>
                    <span className="block text-[10px] font-bold text-[#8C6B1C] tracking-wider uppercase mt-0.5">
                      {month} {year}
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
                      <Icon className="w-3 h-3" />
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
                      {ev.desc || ev.description}
                    </p>

                    {/* Metadata Items */}
                    <div className="space-y-2 pt-3 border-t border-[#F5EFE6] text-xs text-[#5C4F41]">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span>Capacity: {ev.guestCapacity || (ev.capacity ? `${ev.capacity} Guests` : 'Customizable')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#8C6B1C] shrink-0" />
                        <span>{ev.timing || ev.time || '06:00 PM - 11:30 PM'}</span>
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
