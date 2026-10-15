import React from 'react';
import { X, Check, Users, Sparkles, ArrowRight } from 'lucide-react';
import { EventoraLogo } from '../common/Icons';

export default function EventDetailsModal({ event, onClose, onBookEvent }) {
  if (!event) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full rounded-3xl bg-white border border-[#DFC07B] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-[#2C241D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#8C6B1C] border border-[#DFC07B] transition-colors cursor-pointer shadow-xs"
          aria-label="Close Event Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1C1610] px-2.5 py-1 rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] shadow-xs">
              {event.category}
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#241C14] mt-2">
              {event.title}
            </h3>
            <p className="font-serif-luxury italic text-sm text-[#8C6B1C]">
              "{event.subtitle}"
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <p className="text-sm text-[#5C4F41] leading-relaxed font-normal">
            {event.desc}
          </p>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-[#6E6052] uppercase tracking-wider font-bold">Typical Capacity</p>
                <p className="font-serif-luxury text-base font-bold text-[#241C14]">{event.guestRange}</p>
              </div>
            </div>

            <span className="text-xs text-[#8C6B1C] bg-white px-3 py-1 rounded-full border border-[#DFC07B] font-medium shadow-xs">
              Customizable
            </span>
          </div>

          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-[#241C14] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6B1C]" />
              <span>Signature Experiences & Inclusions</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {event.highlights?.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-[#46382C]">
                  <div className="w-4 h-4 rounded-full bg-[#F3E8CE] flex items-center justify-center text-[#8C6B1C] shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              onClose();
              onBookEvent(event.category);
            }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-2 cursor-pointer"
          >
            <span>Plan This {event.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
