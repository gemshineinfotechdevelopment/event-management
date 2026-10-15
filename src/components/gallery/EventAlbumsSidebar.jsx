import React from 'react';
import { ChevronRight, Camera, ArrowRight } from 'lucide-react';

export default function EventAlbumsSidebar({ albums, activeCategory, onSelectAlbum, onRequestFullGallery }) {
  return (
    <aside className="w-full flex flex-col gap-6" aria-label="Event Albums Sidebar">
      
      {/* Albums Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DAC6] shadow-sm">
        <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C1610] mb-4 pb-2 border-b border-[#E5DAC6]/60">
          Event Albums
        </h3>

        <div className="flex flex-col gap-2.5">
          {albums.map((album) => {
            const isActive = activeCategory.toLowerCase() === album.id.toLowerCase();
            return (
              <button
                key={album.id}
                onClick={() => onSelectAlbum(album.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all duration-200 cursor-pointer text-left group ${
                  isActive
                    ? 'bg-[#0D1527] text-white shadow-md'
                    : 'hover:bg-[#FAF6F0] text-[#2C241D]'
                }`}
                aria-label={`View ${album.name} album`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Thumbnail */}
                  <img
                    src={album.thumbnail}
                    alt={album.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#DFC07B]/40 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="flex flex-col truncate">
                    <span className={`text-xs sm:text-sm font-semibold truncate ${
                      isActive ? 'text-white' : 'text-[#1C1610] group-hover:text-[#8C6B1C]'
                    }`}>
                      {album.name}
                    </span>
                    <span className={`text-[10px] font-medium ${
                      isActive ? 'text-[#DFC07B]' : 'text-[#7A6A58]'
                    }`}>
                      {album.photoCount} Photos
                    </span>
                  </div>
                </div>

                {/* Right Arrow */}
                <div className={`p-1.5 rounded-full transition-all duration-200 shrink-0 ${
                  isActive 
                    ? 'text-[#DFC07B] bg-white/10' 
                    : 'text-[#A09282] group-hover:text-[#8C6B1C] group-hover:translate-x-0.5'
                }`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* "Want to see more?" Promo Card matching reference image */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 border border-[#DFC07B]/60 shadow-xs flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-white border border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] mb-3 shadow-xs">
          <Camera className="w-6 h-6 stroke-[1.8]" />
        </div>

        <h4 className="font-serif-luxury text-lg font-bold text-[#1C1610] mb-1.5">
          Want to see more?
        </h4>

        <p className="text-xs text-[#5C4F41] leading-relaxed mb-4 max-w-[210px]">
          We have many more beautiful moments waiting for you.
        </p>

        <button
          onClick={onRequestFullGallery}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D1527] hover:bg-[#1A253C] text-white hover:text-[#DFC07B] text-[11px] font-semibold tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg active:scale-95"
        >
          <span>Request Full Gallery</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </aside>
  );
}
