import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchable = [
    { title: 'Wedding Celebrations', type: 'Event Category', id: 'events' },
    { title: 'Engagement Ring Ceremonies', type: 'Event Category', id: 'events' },
    { title: 'Milestone Birthdays', type: 'Event Category', id: 'events' },
    { title: 'Corporate Leadership Summits', type: 'Event Category', id: 'events' },
    { title: 'College Music Festivals', type: 'Event Category', id: 'events' },
    { title: 'Baby Shower Celebrations', type: 'Event Category', id: 'events' },
    { title: 'Private Garden Soirées', type: 'Event Category', id: 'events' },
    { title: 'Venue Decoration & Florals', type: 'Service', id: 'services' },
    { title: 'Stage Design & Scenography', type: 'Service', id: 'services' },
    { title: 'Royal Banquet Catering', type: 'Service', id: 'services' },
    { title: 'Cinematic 4K Photography & Videography', type: 'Service', id: 'services' },
    { title: 'Celebrity DJs & Live Music', type: 'Service', id: 'services' },
    { title: 'Guest Concierge & VIP Logistics', type: 'Service', id: 'services' },
    { title: 'Grand Floral Mandap Pavilion', type: 'Gallery', id: 'gallery' },
    { title: 'Fairy Light Canopy Hall', type: 'Gallery', id: 'gallery' }
  ];

  const results = query.trim() === '' 
    ? searchable.slice(0, 6)
    : searchable.filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.type.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item) => {
    onClose();
    const el = document.getElementById(item.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full rounded-2xl bg-white border border-[#DFC07B] shadow-2xl p-5 text-[#2C241D]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center mb-4">
          <Search className="absolute left-4 w-5 h-5 text-[#8C6B1C]" />
          <input
            type="text"
            autoFocus
            placeholder="Search events, luxury services, themes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-sm text-[#2C241D] placeholder-[#8A7866]"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-[#8A7866] hover:text-[#2C241D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto">
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#8C6B1C] px-2 py-1">
            {query.trim() === '' ? 'Popular Inquiries' : `Matching Results (${results.length})`}
          </p>

          {results.length === 0 ? (
            <p className="text-xs text-[#8A7866] py-4 text-center">
              No matching celebration found. Feel free to request a custom consultation.
            </p>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(item)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF6F0] border border-transparent hover:border-[#DFC07B]/40 transition-all text-left group cursor-pointer"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#2C241D] group-hover:text-[#8C6B1C]">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#6E6052]">
                    {item.type}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6B1C] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
