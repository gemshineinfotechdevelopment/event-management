import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { FloralFlourishWatermark } from '../common/GalleryIcons';

export default function HomeFAQ({ onOpenConsultation }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How far in advance should we book Eventora for our wedding or celebration?',
      a: 'For grand weddings, peak season dates (October through February), and destination celebrations, we recommend booking 6 to 9 months in advance to secure premium venues and top-tier artists. For corporate conferences, birthdays, and private parties, 4 to 8 weeks is typically sufficient.'
    },
    {
      q: 'Can Eventora manage destination weddings across India and abroad?',
      a: 'Yes, absolutely. We have curated breathtaking royal weddings in Rajasthan (Udaipur, Jaipur), beachside celebrations in Goa, scenic hill station retreats, and international destination events in Dubai and Southeast Asia. We manage all travel, guest hospitality, local vendor logistics, and permissions.'
    },
    {
      q: 'Do you offer complete end-to-end management or can we choose specific services?',
      a: 'We provide both comprehensive 360° turnkey planning (from concept moodboards, venue selection, and vendor booking to day-of live execution) as well as bespoke standalone services like floral scenography, lighting design, entertainment curation, and on-day event coordination.'
    },
    {
      q: 'How does Eventora ensure flawless coordination and execution?',
      a: 'We believe in 100% operational transparency. Prior to your celebration, we produce detailed 3D design renders, minute-by-minute day-of timelines, and dedicated on-site vendor management so you can celebrate with zero stress.'
    },
    {
      q: 'What is the first step to get started with Eventora?',
      a: 'Simply click "Plan Your Event" or schedule a complimentary 30-minute discovery consultation. We will discuss your vision, preferred aesthetics, guest count, and timeline, then prepare a tailored visual proposal and bespoke concept for your review.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="relative bg-[#FAF8F5] py-18 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-[#EFE5D5]">
      
      {/* Decorative Botanical Flourish on Left Margin */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 pointer-events-none opacity-20">
        <FloralFlourishWatermark className="w-56 h-56 sm:w-72 sm:h-72" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0D1527] tracking-tight leading-tight">
            Planning Made Effortless
          </h2>

          <p className="text-xs sm:text-sm text-[#5C4F41] max-w-md mx-auto mt-2 leading-relaxed">
            Find answers to common questions about our planning process, custom themes, and bespoke services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen 
                    ? 'bg-white border-[#DFC07B] shadow-md' 
                    : 'bg-white/80 border-[#E5DAC6] hover:border-[#DFC07B]/60 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif-luxury text-base sm:text-lg font-bold leading-snug transition-colors ${
                    isOpen ? 'text-[#8C6B1C]' : 'text-[#1C1610]'
                  }`}>
                    {faq.q}
                  </span>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-[#DFC07B] text-[#1C1610] rotate-180' 
                      : 'bg-[#FAF6F0] text-[#8C6B1C] border border-[#E5DAC6]'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C4F41] leading-relaxed border-t border-[#F5EFE6] mt-1 animate-fadeIn">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-[#E5DAC6] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif-luxury text-sm font-bold text-[#1C1610]">
                Have a specific question about your vision?
              </p>
              <p className="text-xs text-[#786C5E]">
                Our lead wedding & event designers are here to guide you.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation('Consultation')}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xs hover:shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <span>Ask Our Planners</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
