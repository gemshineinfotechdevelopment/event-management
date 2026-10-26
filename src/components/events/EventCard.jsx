import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EventCard({ event, onSelectEvent }) {
  const Icon = event.icon || Sparkles;

  // Safe Date Badge extraction with fallback
  let day = event.dateBadge?.day;
  let month = event.dateBadge?.month;
  let year = event.dateBadge?.year;

  if (!day || !month || !year) {
    if (event.date) {
      const d = new Date(event.date);
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
    <article 
      onClick={() => onSelectEvent(event)}
      className="group flex flex-col bg-white rounded-2xl border border-[#E5DAC6] hover:border-[#DFC07B] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Card Image Container with Date Badge */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F3ECE0]">
        <img
          src={event.image || '/wedding.jpg'}
          alt={event.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay at the Top for Badge Contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Date Badge in Top-Left Corner */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-center justify-center bg-[#070C18]/92 backdrop-blur-md border border-white/10 rounded-xl px-2.5 py-1.5 shadow-lg min-w-[46px] text-center select-none">
          <span className="text-white text-base sm:text-lg font-bold leading-none font-sans">
            {day}
          </span>
          <span className="text-[#DFC07B] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-none mt-1">
            {month}
          </span>
          <span className="text-gray-300 text-[9px] font-light leading-none mt-0.5">
            {year}
          </span>
        </div>

        {/* Subtle Category Pill on Hover */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#1C1610] shadow-sm">
            {event.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-5.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Icon + Title */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors leading-snug line-clamp-2">
              {event.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-[#5C4F41] leading-relaxed line-clamp-3 mb-5">
            {event.desc || event.description || 'Exclusive luxury celebration curated by Eventora master artisans.'}
          </p>
        </div>

        {/* View Details Button (Dark Navy with Gold Arrow) */}
        <div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectEvent(event);
            }}
            className="w-full py-2.5 px-4 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 group-hover:shadow-md cursor-pointer select-none"
            aria-label={`View details for ${event.title}`}
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFC07B] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
