import React, { useEffect } from 'react';
import { X, Sparkles, Volume2, ExternalLink } from 'lucide-react';
import { EventoraLogo } from '../common/Icons';

export default function VideoModal({ 
  isOpen, 
  onClose,
  videoId = 'ZCWBvo0Ybew',
  title = 'Fort Grand, Shamshabad | South Indian Wedding Showcase'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="video-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="video-modal-dialog"
        className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#070C18] border border-[#DFC07B]/40 shadow-[0_0_60px_rgba(223,192,123,0.25)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#090F1C]/90 border-b border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <EventoraLogo className="w-6 h-6 text-[#DFC07B]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#DFC07B] uppercase font-mono">
                  CINEMATIC SHOWREEL
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[250px] sm:max-w-md">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="video-modal-youtube-link"
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-white/10 transition-colors hidden sm:flex items-center justify-center"
              title="Open on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              id="video-modal-close-btn"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#DFC07B] border border-[#DFC07B]/40 transition-colors cursor-pointer"
              aria-label="Close Video Modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Video Player (16:9 Aspect Ratio) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Bar Info */}
        <div className="px-4 sm:px-6 py-3 bg-[#090F1C]/95 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#FAF7F2]/90 gap-3">
          <div className="flex items-center gap-2 text-[#E2DACB]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
            <span className="text-[11px] sm:text-xs">South Indian Wedding • Confetti Square Events & Eventora</span>
          </div>
          <div className="flex items-center gap-4 text-[#DFC07B]">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Cinematic Audio</span>
            </div>
            <span className="text-white/20">•</span>
            <span className="text-[11px] font-mono text-white/80">4K UHD Master</span>
          </div>
        </div>

      </div>
    </div>
  );
}
