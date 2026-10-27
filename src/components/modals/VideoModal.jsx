import React, { useEffect } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import ControlledVideoPlayer from '../common/ControlledVideoPlayer';

export default function VideoModal({ 
  isOpen, 
  onClose,
  videoId = 'ukndWsCg0ZY'
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
        {/* Video Player (16:9 Aspect Ratio) - Strict 30s Cap & Cropped */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <ControlledVideoPlayer
            videoId={videoId}
            maxDuration={30}
            onClose={onClose}
            showTheaterBtn={false}
            showCloseBtn={true}
          />
        </div>

        {/* Bottom Bar Info - Clean without external title or source */}
        <div className="px-4 sm:px-6 py-3 bg-[#090F1C]/95 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#FAF7F2]/90 gap-3">
          <div className="flex items-center gap-2 text-[#E2DACB]">
            <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
            <span className="text-[11px] sm:text-xs">Eventora Atelier Cinema</span>
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

