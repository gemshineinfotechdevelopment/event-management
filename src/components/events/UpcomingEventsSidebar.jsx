import React from 'react';
import { Calendar, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { PRIMARY_EVENTS } from '../../data/eventsPageData';

export default function UpcomingEventsSidebar({ events, onSelectEvent, onOpenConsultation }) {
  const list = events && events.length > 0 ? events.slice(0, 8) : PRIMARY_EVENTS;

  return (
    <aside className="w-full flex flex-col gap-6 select-none" aria-label="Upcoming Events Sidebar">
      
      {/* 1. Upcoming Events List Card */}
      <div className="bg-white rounded-2xl border border-[#E5DAC6] p-5 sm:p-6 shadow-xs">
        
        {/* Section Header */}
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#EFE5D5]">
          <div className="w-7 h-7 rounded-lg bg-[#FAF6F0] border border-[#E5DAC6] flex items-center justify-center text-[#0D1527]">
            <Calendar className="w-4 h-4 stroke-[2]" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#0D1527] tracking-tight">
            Upcoming Events
          </h3>
        </div>

        {/* Upcoming Events Rows */}
        <div className="flex flex-col divide-y divide-[#F5EFE6]">
          {list.map((item) => {
            let dateDisplay = item.dateBadge?.fullDate;
            if (!dateDisplay) {
              if (item.dateBadge?.day && item.dateBadge?.month) {
                dateDisplay = `${item.dateBadge.day} ${item.dateBadge.month} ${item.dateBadge.year || '2026'}`;
              } else if (item.date) {
                const d = new Date(item.date);
                if (!isNaN(d.getTime())) {
                  dateDisplay = `${String(d.getDate()).padStart(2, '0')} ${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`;
                } else {
                  dateDisplay = item.date;
                }
              } else {
                dateDisplay = 'Upcoming 2026';
              }
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectEvent(item)}
                className="group py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF7F2] -mx-2 px-2 rounded-xl transition-all duration-200"
                title={`View details for ${item.title}`}
              >
                {/* Thumbnail + Event Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.thumbnail || item.image || '/wedding.jpg'}
                    alt={item.title}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover object-center shrink-0 border border-[#E5DAC6] group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="flex flex-col min-w-0">
                    <h4 className="text-xs font-bold text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-[#786C5E] mt-0.5">
                      {dateDisplay}
                    </span>
                  </div>
                </div>

                {/* Right Chevron Arrow */}
                <ChevronRight className="w-4 h-4 text-[#A89C8C] group-hover:text-[#0D1527] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            );
          })}
        </div>

      </div>

      {/* 2. Planning an Event? Promotional Card matching reference */}
      <div className="bg-[#F6EFE5] rounded-2xl border border-[#DFC07B]/40 p-6 text-center shadow-xs flex flex-col items-center">
        
        {/* Calendar Icon with Gold Accent */}
        <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border-2 border-[#DFC07B]/60 flex items-center justify-center text-[#8C6B1C] mb-4 shadow-xs">
          <Sparkles className="w-6 h-6 stroke-[1.8]" />
        </div>

        <h4 className="font-serif-luxury text-lg font-bold text-[#1C1610] mb-2 leading-snug">
          Planning a Special Event?
        </h4>

        <p className="text-xs text-[#5C4F41] leading-relaxed mb-6 max-w-xs">
          Let us help you create unforgettable moments tailored to your vision and desires.
        </p>

        <button
          onClick={onOpenConsultation}
          className="w-full py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Get Free Consultation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </aside>
  );
}
