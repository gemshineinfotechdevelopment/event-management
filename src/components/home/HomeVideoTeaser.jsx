import React, { useState } from 'react';
import { Play, Sparkles, Film, Clock, Maximize2, X } from 'lucide-react';

export default function HomeVideoTeaser({ onOpenVideo }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const videoId = 'ZCWBvo0Ybew';
  const videoTitle = 'Fort Grand, Shamshabad | South Indian Wedding | Wedding Planners Confetti Square Events';

  return (
    <section className="relative bg-[#070C18] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-b border-white/10">
      
      {/* Background Cinematic Atmosphere Image with Heavy Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-stage.jpg"
          alt="Eventora Cinematic Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-[0.25] blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-[#070C18]/85 to-[#070C18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070C18]/70 to-[#070C18]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Small Gold Tag */}
        <div className="inline-flex items-center gap-2 mb-3">
          <Film className="w-3.5 h-3.5 text-[#DFC07B]" />
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase">
            CINEMATIC SHOWREEL
          </span>
          <Film className="w-3.5 h-3.5 text-[#DFC07B]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
          Experience The Magic In Motion
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-[#E2DACB] font-light leading-relaxed max-w-xl mt-3 mb-8">
          Step behind the scenes and witness how hundreds of moving parts, delicate florals, and radiant lighting unite into an unforgettable celebration.
        </p>

        {/* Video Showcase Card */}
        <div 
          id="home-video-card"
          className="relative w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DFC07B]/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(223,192,123,0.18)] bg-[#090F1C] group transition-all duration-300"
        >
          
          {isPlayingInline ? (
            /* Inline YouTube Iframe Player */
            <div className="relative w-full h-full bg-black">
              <iframe
                id="home-video-iframe"
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* Floating Action Controls */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <button
                  id="home-video-inline-theater-btn"
                  onClick={onOpenVideo}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/80 hover:bg-black text-[#DFC07B] border border-[#DFC07B]/50 backdrop-blur-md text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-lg flex items-center gap-1.5"
                  title="Expand to Theater Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Theater View</span>
                </button>
                <button
                  id="home-video-inline-close-btn"
                  onClick={() => setIsPlayingInline(false)}
                  className="p-2 rounded-full bg-black/80 hover:bg-black text-white hover:text-red-400 border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                  title="Close Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Video Preview Thumbnail with Pulsing Play Trigger */
            <div 
              id="home-video-preview"
              className="relative w-full h-full cursor-pointer overflow-hidden"
              onClick={() => setIsPlayingInline(true)}
            >
              {/* YouTube High-Res Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Eventora Luxury Wedding Video Reel"
                className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070C18]/95 via-black/30 to-[#070C18]/50 group-hover:via-black/20 transition-all duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(7,12,24,0.7)_100%)]" />

              {/* Top Bar inside Player */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white/90">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono tracking-wider uppercase font-semibold text-[10px] sm:text-[11px]">
                    4K UHD Wedding Film
                  </span>
                </div>

                <button
                  id="home-video-theater-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenVideo();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-[#DFC07B] border border-[#DFC07B]/40 backdrop-blur-md text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-lg"
                  title="Watch in Theater Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Theater View</span>
                </button>
              </div>

              {/* Central Glowing Pulsing Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="relative mb-3 group/play">
                  {/* Animated Gold Aura Rings */}
                  <div className="absolute -inset-4 rounded-full bg-[#DFC07B]/25 animate-ping opacity-60" />
                  <div className="absolute -inset-2 rounded-full bg-[#DFC07B]/35 animate-pulse" />
                  
                  <button
                    id="home-video-play-btn"
                    aria-label="Play Fort Grand Wedding Showcase"
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] shadow-[0_0_35px_rgba(223,192,123,0.6)] flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#1C1610] ml-1" />
                  </button>
                </div>
                
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase drop-shadow-md">
                  Watch Video Showcase
                </span>
                <span className="text-[11px] text-[#DFC07B]/90 mt-0.5 font-light">
                  Click to play right here or tap Theater View
                </span>
              </div>

              {/* Bottom Video Meta Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-[#FAF7F2]/90 border-t border-white/10 pt-2.5">
                <div className="text-left truncate mr-3">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    Fort Grand, Shamshabad • South Indian Wedding
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#DFC07B]">
                    Confetti Square Events & Eventora
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[#E2DACB] shrink-0 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#DFC07B]" />
                  <span>2:40 Min Film</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Quick Highlights / Metrics Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3.5 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm text-[#F5EFEB] mt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#DFC07B]" />
            <span>4K UHD Experience</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#DFC07B]" />
            <span>2:40 Min Film</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#DFC07B] font-bold">500+</span>
            <span>Real Weddings & Galas</span>
          </div>
        </div>

      </div>
    </section>
  );
}
