import React, { useState, useEffect, useCallback } from 'react';
import { EventoraLogo } from './common/Icons';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

const ALIAS_MAP = {
  menu: 'services',
  about: 'why-us',
  'about-us': 'why-us',
  testimonials: 'reviews',
  review: 'reviews',
  orders: 'events',
  order: 'events',
  venues: 'venues',
};

export default function Navbar({ onOpenConsultation, onOpenSearch, onNavigateGallery, onNavigateEvents }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'why-us', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  // Smooth scroll with fixed header offset and history tracking
  const scrollTo = useCallback((rawId, updateHistory = true) => {
    setMobileMenuOpen(false);
    if (rawId === 'events' && onNavigateEvents) {
      onNavigateEvents();
      return;
    }
    if (rawId === 'gallery' && onNavigateGallery) {
      onNavigateGallery();
      return;
    }
    const id = ALIAS_MAP[rawId] || rawId;

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      if (updateHistory) {
        window.history.pushState(null, '', '#home');
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      setActiveSection(id);
      if (updateHistory) {
        window.history.pushState(null, '', `#${rawId}`);
      }
    }
  }, []);

  // Listen to browser Back/Forward navigation & initial URL hash
  useEffect(() => {
    const handleLocationHash = (updateHistory = false) => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        scrollTo(hash, updateHistory);
      }
    };

    // Initial load hash navigation
    const timer = setTimeout(() => {
      handleLocationHash(false);
    }, 150);

    // Browser back/forward navigation
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        scrollTo(hash, false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [scrollTo]);

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Reached near bottom of page -> highlight Contact in footer
      const scrollBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= documentHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Near top of page -> highlight Home
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // Check sections from bottom to top based on trigger offset
      const spyTrigger = window.scrollY + 130;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= spyTrigger) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/98 backdrop-blur-xl border-b border-[#DFC07B]/40 shadow-md shadow-[#2C241D]/6' 
          : 'py-3.5 bg-[#FAF8F5]/96 backdrop-blur-xl border-b border-[#E8DCC4] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer select-none"
            title="Eventora - Home"
          >
            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-[#F3E8CE] to-[#E9D7B1] border border-[#C5A059] group-hover:border-[#8C6514] transition-colors shadow-xs">
              <EventoraLogo className="w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl sm:text-2xl font-bold tracking-wide text-[#1C1610] group-hover:text-[#886518] transition-colors leading-none">
                Eventora
              </span>
              <span className="text-[10px] font-bold tracking-[0.28em] text-[#7E5C16] uppercase mt-1">
                EVENTS & BEYOND
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav 
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#DFD3C3] shadow-sm backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 xl:px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2C241D] text-[#FAF8F5] shadow-xs font-bold scale-[1.02]'
                      : 'text-[#4A3B2C] hover:text-[#1C1610] hover:bg-[#F3ECE0]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 ml-1 text-[#4A3B2C] hover:text-[#1C1610] hover:bg-[#F3ECE0] rounded-full transition-colors cursor-pointer"
              title="Search events or services"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>
          </nav>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#C5A059]/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Actions: Plan Event + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="px-3.5 py-1.5 text-[11px] font-bold tracking-wide rounded-full bg-gradient-to-r from-[#ECCB7F] to-[#DFC07B] text-[#1C1610] cursor-pointer shadow-xs active:scale-95 transition-transform"
            >
              Plan Event
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1610] hover:text-[#7E5C16] hover:bg-[#F3ECE0] rounded-xl border border-[#E8DCC4] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAF8F5]/98 backdrop-blur-2xl border-b border-[#DFC07B]/40 px-6 py-6 shadow-2xl transition-all animate-fadeIn">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#2C241D] text-[#FAF8F5] shadow-xs'
                      : 'text-[#4A3B2C] hover:bg-[#F3ECE0] hover:text-[#1C1610]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#DFC07B]">✦</span>}
                </button>
              );
            })}

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#4A3B2C] hover:bg-[#F3ECE0] hover:text-[#1C1610] transition-colors cursor-pointer flex items-center gap-2.5"
            >
              <Search className="w-4 h-4 text-[#7E5C16]" />
              <span>Search Events & Services</span>
            </button>

            {/* Mobile Plan Event CTA in Drawer */}
            <div className="pt-4 mt-2 border-t border-[#E8DCC4] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-98"
              >
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-[#7E5C16] font-semibold tracking-wider uppercase pt-1">
                ✦ Dreams • Designs • Celebrations ✦
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
