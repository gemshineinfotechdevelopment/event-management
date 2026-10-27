import React, { useState } from 'react';
import { Play, Maximize2 } from 'lucide-react';
import ControlledVideoPlayer from '../common/ControlledVideoPlayer';

export default function HomeVideoTeaser({ onOpenVideo }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  // 30-second South Indian wedding decoration showcase
  const videoId = 'ukndWsCg0ZY';

  const handleTriggerTheater = () => {
    if (onOpenVideo) {
      onOpenVideo(videoId);
    }
  };

  return (
    <section className="relative bg-[#070C18] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-b border-white/10">
      
      {/* Background Atmosphere Image with Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hero-stage.jpg"
          alt="Wedding Decoration Atmosphere"
          className="w-full h-full object-cover object-center filter brightness-[0.22] blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070C18] via-[#070C18]/85 to-[#070C18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070C18]/70 to-[#070C18]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Video Card - Clean and Framed without Top Headings */}
        <div 
          id="home-video-card"
          className="relative w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DFC07B]/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(223,192,123,0.18)] bg-[#090F1C] group transition-all duration-300"
        >
          
          {isPlayingInline ? (
            /* Inline Video Player - Strictly 30 Seconds, Custom Gold Controls, No YouTube 0:39 */
            <ControlledVideoPlayer
              videoId={videoId}
              maxDuration={30}
              onClose={() => setIsPlayingInline(false)}
              onTriggerTheater={handleTriggerTheater}
              showTheaterBtn={true}
              showCloseBtn={true}
            />
          ) : (
            /* Video Preview Thumbnail with Pulsing Play Trigger (No Top Heading or External Source) */
            <div 
              id="home-video-preview"
              className="relative w-full h-full cursor-pointer overflow-hidden"
              onClick={() => setIsPlayingInline(true)}
            >
              {/* Clean South Indian Mandapam Image (No watermarks or sources) */}
              <img
                src="/venue-mandap.jpg"
                alt="South Indian Wedding Mandapam Decoration"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070C18]/85 via-black/20 to-[#070C18]/30 group-hover:via-black/10 transition-all duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(7,12,24,0.6)_100%)]" />

              {/* Top Right Theater View Button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  id="home-video-theater-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerTheater();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-[#DFC07B] border border-[#DFC07B]/40 backdrop-blur-md text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-lg"
                  title="Watch in Theater Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Theater View</span>
                </button>
              </div>

              {/* Central Glowing Pulsing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative group/play">
                  <div className="absolute -inset-4 rounded-full bg-[#DFC07B]/25 animate-ping opacity-60" />
                  <div className="absolute -inset-2 rounded-full bg-[#DFC07B]/35 animate-pulse" />
                  
                  <button
                    id="home-video-play-btn"
                    aria-label="Play Wedding Decoration Video"
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] shadow-[0_0_35px_rgba(223,192,123,0.6)] flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-[#1C1610] ml-1" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

