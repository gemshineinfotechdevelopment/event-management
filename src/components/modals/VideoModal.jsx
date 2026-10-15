import React from 'react';
import { X, Play, Volume2, Sparkles } from 'lucide-react';
import { EventoraLogo } from '../common/Icons';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-[#090F1C] border border-[#D4AF37]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-[#ECCB7F] border border-[#D4AF37]/40 transition-colors"
          aria-label="Close Video Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Simulation / Reel Presentation */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src="/hero-stage.jpg"
            alt="Eventora Cinematic Reel"
            className="w-full h-full object-cover filter brightness-75 scale-105 animate-pulse-subtle"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

          {/* Central Cinematic Graphic */}
          <div className="absolute z-10 flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-[#ECCB7F] shadow-2xl mb-4">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <span className="font-script text-3xl sm:text-5xl text-[#ECCB7F]">
              Crafting Memories Since 2017
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
              Eventora: Behind the Magic
            </h3>
            <p className="text-xs text-[#D8CEBF] max-w-md mt-2">
              From the initial pencil sketch to thousand-candlelight reveals — experience the devotion behind every celebration.
            </p>
          </div>

          {/* Bottom Bar Info */}
          <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between text-xs text-[#FAF7F2]/90 border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[11px] tracking-wider">EVENTORA SHOWREEL 4K UHD</span>
            </div>
            <div className="flex items-center gap-3 text-[#ECCB7F]">
              <Volume2 className="w-4 h-4" />
              <span className="text-[11px]">Cinematic Orchestral Audio</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
