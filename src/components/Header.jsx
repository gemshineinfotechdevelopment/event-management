import React, { useState, useEffect } from 'react';
import { EventoraLogo } from './common/Icons';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ activePage = 'home', onNavigate, onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Initial check in case user loaded or reloaded down the page
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key or window resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
        scrolled ? 'pt-2 sm:pt-3' : 'pt-3 sm:pt-4 lg:pt-5'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Full Floating Glassmorphic Header Container */}
        <div 
          className={`w-full rounded-2xl sm:rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between ${
            scrolled ? 'eventora-glass-header-scrolled' : 'eventora-glass-header'
          }`}
        >
          {/* 1. Brand Logo & Name (Unchanged) */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            title="Eventora - Events & Beyond"
          >
            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-[#2A2318]/90 to-[#14120F]/90 border border-[#DFC07B]/80 group-hover:border-[#ECCB7F] transition-all shadow-md group-hover:scale-105 duration-300">
              <EventoraLogo className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-wide text-white group-hover:text-[#DFC07B] transition-colors leading-none drop-shadow-sm">
                Eventora
              </span>
              <span className="text-[9.5px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase mt-1 drop-shadow-xs">
                EVENTS & BEYOND
              </span>
            </div>
          </div>

          {/* 2. Center Navigation Links (Desktop horizontal row) */}
          <nav 
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.id || (link.id === 'about' && activePage === 'why-us');
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-[13px] font-medium tracking-wide transition-all duration-200 cursor-pointer group flex items-center justify-center ${
                    isActive 
                      ? 'text-white font-semibold bg-white/[0.10] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]' 
                      : 'text-[#F3ECE0]/90 hover:text-white hover:bg-white/[0.07]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-[#DFC07B]">
                    {link.label}
                  </span>
                  
                  {/* Active Champagne-Gold Glow Underline */}
                  {isActive && (
                    <span 
                      className="absolute -bottom-1 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-[#DFC07B] to-transparent rounded-full shadow-[0_0_8px_#DFC07B]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Right CTA Button ("Plan Your Event" with translucent glass surface and gold border) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenConsultation}
              className="relative group overflow-hidden inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#DFC07B]/75 hover:border-[#ECCB7F] bg-gradient-to-r from-[#DFC07B]/15 via-[#ECCB7F]/25 to-[#DFC07B]/15 hover:bg-[#DFC07B] text-[#F7F1D6] hover:text-[#060A14] text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(223,192,123,0.45)] cursor-pointer active:scale-95"
            >
              {/* Glass reflection shimmer on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              
              <span className="relative z-10 transition-colors">Plan Your Event</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 text-[#DFC07B] group-hover:text-[#060A14] transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* 4. Mobile Actions (Glass buttons) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-3 py-1.5 text-[11px] font-bold rounded-full border border-[#DFC07B]/80 bg-[#DFC07B]/15 text-[#DFC07B] hover:bg-[#DFC07B] hover:text-[#060A14] backdrop-blur-md transition-all shadow-xs active:scale-95"
            >
              Plan Event
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#DFC07B] rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#DFC07B]/60 backdrop-blur-md transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#DFC07B]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* 5. Mobile Translucent Glass Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden eventora-glass-dropdown mt-2 rounded-2xl p-4 sm:p-5 shadow-2xl animate-fadeIn">
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = activePage === link.id || (link.id === 'about' && activePage === 'why-us');
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-[#DFC07B]/20 to-[#DFC07B]/5 text-[#DFC07B] border border-[#DFC07B]/40 shadow-sm font-semibold'
                        : 'text-[#F3ECE0]/90 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-xs text-[#DFC07B] font-serif-luxury tracking-wider">✦ Active</span>}
                  </button>
                );
              })}

              <div className="pt-3 mt-1.5 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] hover:from-[#DFC07B] hover:to-[#B89045] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-black/30 transition-all active:scale-[0.98]"
                >
                  <span>Plan Your Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleLinkClick('admin')}
                  className="w-full py-1 text-center text-[11px] text-[#DFC07B]/60 hover:text-[#DFC07B] transition-colors cursor-pointer"
                >
                  Admin Portal &rarr;
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
