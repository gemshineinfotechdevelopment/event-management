import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function Hero({ onOpenConsultation, onOpenVideo }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: '/hero-stage.jpg',
      label: 'WE PLAN',
      scriptWord: 'Extraordinary',
      serifWord: 'Celebrations',
      tagline: 'Your moments. Our masterpiece.',
      desc: 'From intimate gatherings to grand celebrations, we design, plan and execute events that stay in your heart forever.'
    },
    {
      image: '/banquet.jpg',
      label: 'WE CRAFT',
      scriptWord: 'Unforgettable',
      serifWord: 'Experiences',
      tagline: 'Where dreams meet flawless reality.',
      desc: 'Every detail meticulously sculpted with architectural elegance, floral artistry, and timeless luxury.'
    },
    {
      image: '/venue-lights.jpg',
      label: 'WE CREATE',
      scriptWord: 'Bespoke',
      serifWord: 'Gatherings',
      tagline: 'Illuminating memories that linger.',
      desc: 'Infusing every dinner, gala, and milestone with ambient enchantment and cinematic wonder.'
    },
    {
      image: '/floral-tunnel.jpg',
      label: 'WE DESIGN',
      scriptWord: 'Enchanting',
      serifWord: 'Moments',
      tagline: 'A grand gateway to forever.',
      desc: 'Transforming opulent spaces into immersive fairy tales tailored uniquely to your story.'
    }
  ];

  const current = slides[activeSlide];

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF8F5]">
      
      {/* Background Hero Images with Light Treatment */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt="Eventora Luxury Celebration"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
          />
        </div>
      ))}

      {/* Ultra-low opacity gradient - Bare minimum needed for text clarity, background stays vividly visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/45 via-[#FAF8F5]/15 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

      {/* Floating Botanical Corner Hint */}
      <div className="absolute top-20 right-10 z-10 pointer-events-none opacity-20">
        <Sparkles className="w-24 h-24 text-[#C5A059]" />
      </div>

      {/* Vertical Decorative Navigation Element (Left side, desktop) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 pointer-events-none">
        <div className="flex flex-col items-center gap-7 text-[10px] font-bold tracking-[0.35em] text-[#8C7A68] uppercase [writing-mode:vertical-rl] rotate-180 select-none">
          <span className="hover:text-[#2C241D] transition-colors">DREAM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="hover:text-[#2C241D] transition-colors">PLAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="hover:text-[#2C241D] transition-colors">DESIGN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="text-[#886518] font-extrabold">CELEBRATE</span>
        </div>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C5A059] to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-24 flex flex-col justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column - Fully Open, No Opaque Box */}
          <div className="lg:col-span-8 flex flex-col items-start text-left max-w-2xl">
            
            {/* Small Gold Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-[#E2D2B3] shadow-sm backdrop-blur-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
                {current.label}
              </span>
            </div>

            {/* Main Script & Serif Heading with high-contrast text glow */}
            <div className="relative mt-1 mb-3">
              <span className="font-script text-5xl sm:text-7xl md:text-8xl text-[#9A731F] block drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] leading-none -mb-3 sm:-mb-5 tracking-wide">
                {current.scriptWord}
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1610] drop-shadow-[0_2px_14px_rgba(255,255,255,0.95)] leading-[1.08]">
                {current.serifWord}
              </h1>
            </div>

            {/* Supporting Tagline */}
            <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#7E5C16] font-semibold tracking-wide mb-3 drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)]">
              {current.tagline}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#2C241D] font-medium leading-relaxed max-w-lg mb-8 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
              {current.desc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={onOpenConsultation}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#C5A059]/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onOpenVideo}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-[#2C241D] text-xs sm:text-sm font-semibold tracking-wide border border-[#DFC07B]/80 hover:border-[#C5A059] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#F3E8CE] flex items-center justify-center text-[#8C6B1C] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

          </div>

          {/* Right Column: Rotating Circular Play Badge (Light Luxury Style) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-center mt-6 lg:mt-0">
            <button
              onClick={onOpenVideo}
              className="group relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
              aria-label="Watch Story Video"
            >
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border border-[#DFC07B]/60 group-hover:border-[#C5A059] shadow-md transition-colors bg-white/40 backdrop-blur-xs" />

              {/* Rotating Circular Text SVG */}
              <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 160 160">
                <defs>
                  <path
                    id="circlePath"
                    d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                  />
                </defs>
                <text className="text-[10px] uppercase font-bold tracking-[0.24em] fill-[#7D5F18]">
                  <textPath href="#circlePath" startOffset="0%">
                    ✦ WATCH STORY • EVENT VIDEO • EVENTORA ✦
                  </textPath>
                </text>
              </svg>

              {/* Center Play Button Disc */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white to-[#F7EFE1] border-2 border-[#C5A059] flex items-center justify-center shadow-lg group-hover:border-[#8C6B1C] transition-all">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-[#8C6B1C] fill-[#8C6B1C] ml-1 transition-transform group-hover:scale-110" />
              </div>
            </button>
          </div>

        </div>

        {/* Center Bottom Slider Pagination Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeSlide
                  ? 'w-8 h-2 bg-gradient-to-r from-[#DFC07B] to-[#C5A059] shadow-xs'
                  : 'w-2 h-2 bg-[#2C241D]/25 hover:bg-[#2C241D]/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
