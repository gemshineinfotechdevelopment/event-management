import React from 'react';
import { X, Calendar, MapPin, Clock, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function EventDetailsModal({ event, onClose, onPlanEvent }) {
  if (!event) return null;

  // Safe Date Badge extraction
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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full rounded-3xl bg-[#FAF8F5] border border-[#DFC07B]/60 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto text-[#1C1610]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-event-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Header Image with Date & Category Badges */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={event.image || event.thumbnail || '/wedding.jpg'}
            alt={event.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/20 to-black/50" />

          {/* Date Badge overlay */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center justify-center bg-[#070C18]/92 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-xl text-center select-none">
            <span className="text-white text-lg font-bold leading-none font-sans">
              {day}
            </span>
            <span className="text-[#DFC07B] text-[11px] font-semibold tracking-wider uppercase leading-none mt-1">
              {month}
            </span>
            <span className="text-gray-300 text-[9.5px] font-light leading-none mt-0.5">
              {year}
            </span>
          </div>

          {/* Bottom Title Header */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#1C1610] px-3 py-0.5 rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] shadow-xs">
                {event.category}
              </span>
              {event.accentTag && (
                <span className="text-[10px] uppercase font-semibold tracking-wider text-white bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/20">
                  {event.accentTag}
                </span>
              )}
            </div>
            <h3 
              id="modal-event-title"
              className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C1610] drop-shadow-xs"
            >
              {event.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          
          {/* Detailed Description */}
          <p className="text-xs sm:text-sm text-[#5C4F41] leading-relaxed">
            {event.longDesc || event.description || event.desc || 'A signature luxury celebration curated by Eventora master artisans.'}
          </p>

          {/* Key Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Timing */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5DAC6] flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#786C5E] uppercase tracking-wider font-bold">Timing</p>
                <p className="text-xs font-semibold text-[#1C1610] truncate">{event.timing || event.time || 'Customizable'}</p>
              </div>
            </div>

            {/* Capacity */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5DAC6] flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#786C5E] uppercase tracking-wider font-bold">Capacity</p>
                <p className="text-xs font-semibold text-[#1C1610] truncate">{event.guestCapacity || (event.capacity ? `${event.capacity} Guests` : 'All Sizes')}</p>
              </div>
            </div>

            {/* Location */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E5DAC6] flex items-center gap-3 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#786C5E] uppercase tracking-wider font-bold">Venue</p>
                <p className="text-xs font-semibold text-[#1C1610] truncate">{event.location || 'Eventora Private Pavilion, Chennai'}</p>
              </div>
            </div>

          </div>

          {/* Signature Inclusions */}
          {event.highlights && event.highlights.length > 0 && (
            <div>
              <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1C1610] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C6B1C]" />
                <span>Signature Experiences & Inclusions</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {event.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#46382C] bg-white/70 p-2.5 rounded-xl border border-[#E5DAC6]">
                    <div className="w-4 h-4 rounded-full bg-[#F3E8CE] flex items-center justify-center text-[#8C6B1C] shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onPlanEvent(event.category || 'Wedding');
              }}
              className="w-full sm:flex-1 py-3.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Enquire & Plan This Event</span>
              <ArrowRight className="w-4 h-4 text-[#DFC07B]" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#DFC07B] text-[#8C6B1C] hover:bg-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
