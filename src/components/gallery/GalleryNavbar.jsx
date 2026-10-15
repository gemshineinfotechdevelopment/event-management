import React, { useState, useEffect } from 'react';
import { EventoraLogo } from '../common/Icons';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function GalleryNavbar({ onNavigate, onOpenConsultation, activePage = 'gallery' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#060A14]/95 backdrop-blur-xl border-b border-[#DFC07B]/30 shadow-xl shadow-black/40' 
          : 'py-4 bg-[#070C18]/90 backdrop-blur-md border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            title="Eventora - Events & Beyond"
          >
            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-[#2A2318] to-[#14120F] border border-[#DFC07B]/80 group-hover:border-[#ECCB7F] transition-all shadow-md group-hover:scale-105 duration-300">
              <EventoraLogo className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-wide text-white group-hover:text-[#DFC07B] transition-colors leading-none">
                Eventora
              </span>
              <span className="text-[9.5px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase mt-1">
                EVENTS & BEYOND
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav 
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Gallery Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-[#D0C7B8] hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {/* Active Gold Indicator Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DFC07B] to-transparent rounded-full shadow-[0_0_8px_#DFC07B]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#DFC07B] bg-gradient-to-r from-[#DFC07B]/10 via-[#DFC07B]/20 to-transparent hover:bg-[#DFC07B] text-[#DFC07B] hover:text-[#0A0E17] text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(223,192,123,0.4)] cursor-pointer active:scale-95"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={onOpenConsultation}
              className="px-3.5 py-1.5 text-[11px] font-bold rounded-full border border-[#DFC07B] text-[#DFC07B] hover:bg-[#DFC07B] hover:text-[#0A0E17] transition-all"
            >
              Plan Event
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#DFC07B] rounded-lg border border-white/10 hover:border-[#DFC07B]/40 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#070C18]/98 backdrop-blur-2xl border-b border-[#DFC07B]/30 px-6 py-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-[#DFC07B]/20 to-transparent text-[#DFC07B] border-l-2 border-[#DFC07B]'
                      : 'text-[#E0D8CC] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#DFC07B]">✦ Active</span>}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
