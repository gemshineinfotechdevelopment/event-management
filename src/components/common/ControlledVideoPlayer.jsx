import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, RotateCcw } from 'lucide-react';

export default function ControlledVideoPlayer({
  videoId = 'ukndWsCg0ZY',
  maxDuration = 30,
  onClose,
  onTriggerTheater,
  showTheaterBtn = true,
  showCloseBtn = true
}) {
  const containerId = useRef(`yt-player-${Math.random().toString(36).substring(2, 9)}`);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    const initPlayer = () => {
      if (isCancelled || !window.YT || !window.YT.Player) return;
      
      const targetEl = document.getElementById(containerId.current);
      if (!targetEl) return;

      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (e) {}
      }

      playerRef.current = new window.YT.Player(containerId.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          iv_load_policy: 3,
          start: 0,
          end: maxDuration,
          origin: window.location.origin
        },
        events: {
          onReady: (e) => {
            if (isCancelled) return;
            try {
              e.target.playVideo();
            } catch (err) {}
          },
          onStateChange: (e) => {
            if (isCancelled) return;
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === window.YT.PlayerState.ENDED) {
              try {
                e.target.seekTo(0, true);
                e.target.playVideo();
              } catch (err) {}
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      
      const prevOnReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === 'function') prevOnReady();
        initPlayer();
      };

      const timer = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(timer);
          initPlayer();
        }
      }, 100);

      return () => {
        isCancelled = true;
        clearInterval(timer);
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          try { playerRef.current.destroy(); } catch (e) {}
        }
      };
    }

    return () => {
      isCancelled = true;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try { playerRef.current.destroy(); } catch (e) {}
      }
    };
  }, [videoId, maxDuration]);

  // Strict 30-Second Hard Cutoff Loop Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const time = playerRef.current.getCurrentTime();
          if (time >= maxDuration) {
            // Cut off immediately at 30 seconds and loop to start
            playerRef.current.seekTo(0, true);
            setCurrentTime(0);
          } else {
            setCurrentTime(Math.min(time, maxDuration));
          }
        } catch (e) {}
      }
    }, 100);

    return () => clearInterval(timer);
  }, [maxDuration]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {}
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {}
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !playerRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const target = pct * maxDuration;
    try {
      playerRef.current.seekTo(target, true);
      setCurrentTime(target);
    } catch (err) {}
  };

  const formatSeconds = (sec) => {
    const s = Math.floor(sec || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black select-none group/player">
      
      {/* Scaled YouTube Iframe container (Crops top headers and bottom-right pink watermark completely) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          id={containerId.current}
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'scale(1.55)', transformOrigin: '28% 32%' }}
        />
      </div>

      {/* Protective Bottom-Right Dark Gradient Shield to ensure zero watermark visibility */}
      <div className="absolute bottom-0 right-0 w-64 h-32 bg-gradient-to-tl from-[#090F1C] via-[#090F1C]/75 to-transparent pointer-events-none z-20" />

      {/* Click-to-Play/Pause Overlay */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={togglePlay}
      />

      {/* Top Floating Controls */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        {showTheaterBtn && onTriggerTheater && (
          <button
            id="video-theater-btn"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerTheater();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-black/80 hover:bg-black text-[#DFC07B] border border-[#DFC07B]/50 backdrop-blur-md text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-lg flex items-center gap-1.5"
            title="Expand to Theater View"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theater View</span>
          </button>
        )}
        {showCloseBtn && onClose && (
          <button
            id="video-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full bg-black/80 hover:bg-black text-white hover:text-red-400 border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom Custom Luxury Control Bar - Strictly 0 to 30 Seconds */}
      <div 
        className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-6 pb-3 px-4 sm:px-6 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 30-Second Progress Bar */}
        <div 
          ref={progressBarRef}
          onClick={handleSeek}
          className="relative w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer transition-all mb-3 group/progress overflow-hidden"
          title="Click to seek within 30 seconds"
        >
          <div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(223,192,123,0.8)]"
            style={{ width: `${Math.min(100, (currentTime / maxDuration) * 100)}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-xs text-[#FAF7F2]">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#DFC07B] transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#DFC07B] transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            {/* EXACT TIME DISPLAY: Explicitly shows 0:30 max */}
            <div className="font-mono text-[11px] sm:text-xs text-[#E2DACB] tracking-wider ml-1">
              <span className="text-[#DFC07B] font-semibold">{formatSeconds(currentTime)}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/80">0:{maxDuration < 10 ? '0' : ''}{maxDuration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(0, true);
                  playerRef.current.playVideo();
                }
              }}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-[#DFC07B] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Restart 30s Loop"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
