import React, { useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MapPin, 
  Camera, 
  Maximize2 
} from 'lucide-react';

export default function PhotoPreviewLightbox({
  isOpen,
  onClose,
  currentPhoto,
  album,
  currentIndex,
  onSelectIndex,
  onNext,
  onPrev,
  onExpandFullScreen
}) {
  // Handle keyboard events (Escape to close, Left/Right arrows to navigate)
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    }
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentPhoto || !album) return null;

  const photosList = album.photos && album.photos.length > 0 ? album.photos : [
    { id: '1', url: currentPhoto.image || currentPhoto.url, title: currentPhoto.title, caption: currentPhoto.description }
  ];

  return (
    <div 
      id="interactive-preview"
      className="w-full my-8 bg-[#090F1C] rounded-3xl border border-[#DFC07B]/40 shadow-2xl overflow-hidden text-white transition-all duration-300 animate-fadeIn"
      role="region"
      aria-label="Interactive Photo Preview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-7 items-center relative">
        
        {/* Left Side: Main Large Image with Previous/Next Arrows (cols 7) */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10 group">
            <img
              src={currentPhoto.url || currentPhoto.image}
              alt={currentPhoto.title || album.title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Previous Arrow Overlay */}
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#DFC07B] text-white hover:text-[#0A0E17] border border-[#DFC07B]/40 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Arrow Overlay */}
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#DFC07B] text-white hover:text-[#0A0E17] border border-[#DFC07B]/40 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Fullscreen Expand Button in Corner */}
            {onExpandFullScreen && (
              <button
                onClick={onExpandFullScreen}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#DFC07B] border border-[#DFC07B]/30 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Expand Full Screen"
                aria-label="Expand image to full screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Details & Clickable Thumbnails (cols 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1 lg:pt-0">
          
          {/* Top Row: Category + Close Button */}
          <div className="flex items-start justify-between mb-2">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#DFC07B] uppercase bg-[#DFC07B]/10 px-2.5 py-0.5 rounded-full border border-[#DFC07B]/30">
              {album.category || currentPhoto.category || 'WEDDING'}
            </span>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#A0AEC0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {album.title || currentPhoto.title || 'Grand Wedding Ceremony'}
          </h3>

          {/* Location & Photo Count Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#C5B8A5] mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>{album.location || 'Coimbatore, Tamil Nadu'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>{album.photoCount || photosList.length} Photos</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#B4A999] leading-relaxed mb-6 font-light">
            {album.description || currentPhoto.description || 'A dreamy wedding setup with elegant décor, beautiful lighting and unforgettable moments with loved ones.'}
          </p>

          {/* Clickable Thumbnails Strip (5 items matching reference) */}
          <div className="mt-auto pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {photosList.slice(0, 5).map((photo, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={photo.id || idx}
                    onClick={() => onSelectIndex(idx)}
                    className={`relative w-14 h-12 sm:w-16 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-[#DFC07B] scale-105 shadow-md shadow-[#DFC07B]/30'
                        : 'opacity-65 hover:opacity-100 hover:scale-102 border border-white/20'
                    }`}
                    aria-label={`Select photo ${idx + 1}`}
                  >
                    <img
                      src={photo.url || photo.image}
                      alt={photo.title || `Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#DFC07B]/10 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
