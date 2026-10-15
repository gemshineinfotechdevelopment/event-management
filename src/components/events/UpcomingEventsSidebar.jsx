import React from 'react';
import { Calendar, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { PRIMARY_EVENTS } from '../../data/eventsPageData';

export default function UpcomingEventsSidebar({ onSelectEvent, onOpenConsultation }) {
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

        {/* 6 Upcoming Events Rows */}
        <div className="flex flex-col divide-y divide-[#F5EFE6]">
          {PRIMARY_EVENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEvent(item)}
              className="group py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FAF7F2] -mx-2 px-2 rounded-xl transition-all duration-200"
              title={`View details for ${item.title}`}
            >
              {/* Thumbnail + Event Info */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover object-center shrink-0 border border-[#E5DAC6] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs font-bold text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#786C5E] mt-0.5">
                    {item.dateBadge.fullDate}
                  </span>
                </div>
              </div>

              {/* Right Chevron Arrow */}
              <ChevronRight className="w-4 h-4 text-[#A89C8C] group-hover:text-[#0D1527] group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>

      </div>

      {/* 2. Planning an Event? Promotional Card matching reference */}
      <div className="bg-[#F6EFE5] rounded-2xl border border-[#DFC07B]/40 p-6 text-center shadow-xs flex flex-col items-center">
        
        {/* Calendar Icon with Gold Accent */}
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#DFC07B] flex items-center justify-center text-[#0D1527] shadow-xs mb-3.5">
          <Calendar className="w-5 h-5 stroke-[2] text-[#8C6B1C]" />
        </div>

        {/* Title */}
        <h4 className="font-serif-luxury text-xl font-bold text-[#0D1527]">
          Planning an Event?
        </h4>

        {/* Subtitle */}
        <p className="text-xs text-[#5C4F41] max-w-[220px] mt-1 leading-relaxed">
          Let’s make your special day truly memorable.
        </p>

        {/* Plan Your Event CTA Button */}
        <button
          onClick={onOpenConsultation}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
        >
          <span>Plan Your Event</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#DFC07B] transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>

    </aside>
  );
}
