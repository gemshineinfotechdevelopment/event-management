import React from 'react';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomeTrustBar() {
  const partners = [
    { name: 'ITC Grand Chola', location: 'Chennai · Luxury Palace' },
    { name: 'The Leela Palace', location: 'Bengaluru · Royal Venue' },
    { name: 'Taj Falaknuma Palace', location: 'Hyderabad · Heritage Palace' },
    { name: 'Kumarakom Lake Resort', location: 'Kerala · Destination Partner' },
    { name: 'Taj West End', location: 'Bengaluru · Heritage Gardens' },
    { name: 'Taj Coromandel', location: 'Chennai · Iconic Hospitality' },
  ];

  return (
    <section className="relative bg-[#090F1C] border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Trust Statement */}
        <div className="flex items-center gap-3 shrink-0 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-[#DFC07B]/10 border border-[#DFC07B]/30 flex items-center justify-center text-[#DFC07B] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-1.5">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#DFC07B] uppercase">
                TRUSTED EXCELLENCE
              </span>
              <span className="text-[#DFC07B]/60 text-xs">✦</span>
            </div>
            <p className="text-xs text-[#E2DACB] font-light mt-0.5">
              Partnered with South India’s finest luxury palaces & heritage venues
            </p>
          </div>
        </div>

        {/* Right Partner List */}
        <div className="w-full md:w-auto flex-1 flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3">
          {partners.map((partner, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center md:items-start transition-opacity duration-300 opacity-75 hover:opacity-100"
            >
              <span className="font-serif-luxury text-sm font-semibold tracking-wide text-[#F5EFEB] group-hover:text-[#DFC07B] transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] tracking-wider text-[#A3998E] uppercase font-mono">
                {partner.location}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
