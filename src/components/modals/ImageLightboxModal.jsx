import React from 'react';
import { X, Sparkles } from 'lucide-react';

export default function ImageLightboxModal({ item, onClose, onOpenConsultation }) {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full rounded-2xl bg-[#090F1C] border border-[#D4AF37]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-[#ECCB7F] border border-[#D4AF37]/40 transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full Image */}
        <div className="relative max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
        </div>

        {/* Bottom Details Bar */}
        <div className="p-5 bg-[#090F1C] border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            {item.category && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/15">
                {item.category}
              </span>
            )}
            <h3 className="font-serif-luxury text-xl font-semibold text-[#FAF7F2] mt-1">
              {item.title}
            </h3>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#D4AF37] text-[#0A0E17] text-xs font-bold tracking-wider uppercase"
          >
            Inquire This Setup
          </button>
        </div>
      </div>
    </div>
  );
}
