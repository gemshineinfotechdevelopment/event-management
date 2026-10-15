import React from 'react';
import { Camera, ChevronRight, Eye } from 'lucide-react';

export default function MainGalleryGrid({ cards, onSelectCard, selectedPhotoId }) {
  if (!cards || cards.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DAC6]">
        <Camera className="w-10 h-10 text-[#C5A059] mx-auto mb-3 opacity-60" />
        <p className="font-serif-luxury text-xl font-bold text-[#1C1610]">No photos found in this category</p>
        <p className="text-xs text-[#7A6A58] mt-1">Please select another event category to view more moments.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 3-column layout matching the reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
        {cards.map((card, idx) => {
          const isSelected = selectedPhotoId === card.id || selectedPhotoId === card.image;
          
          return (
            <div
              key={card.id || idx}
              onClick={() => onSelectCard(card)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border ${
                isSelected 
                  ? 'border-[#DFC07B] ring-2 ring-[#DFC07B]/80 shadow-lg' 
                  : 'border-[#E5DAC6]/70 hover:border-[#DFC07B]'
              } ${card.gridClass || 'min-h-[200px] lg:min-h-[220px]'}`}
            >
              {/* Background Photo */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Center Hover Camera / Eye Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#DFC07B] flex items-center justify-center text-[#DFC07B] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Camera className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Card Information (matching reference) */}
              {card.showBadge ? (
                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex items-end justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-[#DFC07B]/60 flex items-center justify-center text-[#DFC07B] shrink-0">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wide leading-none group-hover:text-[#DFC07B] transition-colors">
                        {card.category}
                      </h4>
                      <p className="text-[10px] text-[#D0C7B8] font-medium mt-0.5">
                        {card.photoCount} Photos
                      </p>
                    </div>
                  </div>

                  {card.hasActionArrow && (
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-md border border-[#DFC07B]/40 group-hover:bg-[#DFC07B] group-hover:text-[#0A0E17] text-white flex items-center justify-center transition-all duration-300 shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ) : (
                /* Subtle caption for cards without badge in reference */
                <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-medium text-white/90 truncate max-w-[85%] drop-shadow">
                    {card.title}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-black/50 text-[#DFC07B] flex items-center justify-center shrink-0">
                    <Eye className="w-3 h-3" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
