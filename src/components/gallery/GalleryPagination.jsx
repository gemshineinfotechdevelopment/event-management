import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPagination({ currentPage, totalPages = 5, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav 
      className="flex items-center justify-center gap-2 sm:gap-2.5 my-8 select-none"
      aria-label="Gallery Pagination"
    >
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
          currentPage === 1
            ? 'border-[#E5DAC6] text-[#A09282] opacity-50 cursor-not-allowed bg-transparent'
            : 'border-[#DFC07B]/70 bg-white hover:bg-[#F3ECE0] text-[#1C1610] shadow-xs hover:border-[#8C6B1C]'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Numbered Pages */}
      {pages.map((page) => {
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isActive
                ? 'bg-[#DFC07B] text-[#1C1610] font-bold shadow-md shadow-[#DFC07B]/40 ring-2 ring-[#DFC07B]/30 scale-105'
                : 'bg-white hover:bg-[#FAF6F0] text-[#4A3B2C] border border-[#E5DAC6] hover:border-[#DFC07B]'
            }`}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
          currentPage === totalPages
            ? 'border-[#E5DAC6] text-[#A09282] opacity-50 cursor-not-allowed bg-transparent'
            : 'border-[#DFC07B]/70 bg-white hover:bg-[#F3ECE0] text-[#1C1610] shadow-xs hover:border-[#8C6B1C]'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
