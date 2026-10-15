import React from 'react';
import { 
  EventoraLogo, 
  BotanicalCorner, 
  InstagramIcon, 
  FacebookIcon, 
  YoutubeIcon, 
  LinkedinIcon 
} from './common/Icons';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Heart 
} from 'lucide-react';

export default function Footer({ onOpenConsultation }) {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'About Us', href: '#why-us' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' }
  ];

  const ourEvents = [
    'Wedding',
    'Engagement',
    'Birthday',
    'Corporate',
    'College Events',
    'Baby Shower',
    'Private Party'
  ];

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
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
      window.history.pushState(null, '', href);
    }
  };

  return (
    <footer id="contact" className="relative bg-[#F4EFE6] text-[#2C241D] pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#E5DAC6] scroll-mt-24">
      
      {/* Decorative Gold Botanical Line Art in Corners */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-20">
        <BotanicalCorner className="w-48 h-48 sm:w-60 sm:h-60" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none opacity-20">
        <BotanicalCorner className="w-48 h-48 sm:w-60 sm:h-60" flip={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* Column 1: Brand Info (Left) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 rounded-full bg-white border border-[#DFC07B]/70 shadow-xs">
                <EventoraLogo className="w-9 h-9" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-wide text-[#241C14]">
                  Eventora
                </span>
                <span className="text-[10px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">
                  EVENTS & BEYOND
                </span>
              </div>
            </div>

            <p className="font-serif-luxury italic text-sm text-[#8C6B1C] mb-6">
              Dreams | Designs | Celebrations
            </p>

            <p className="text-xs text-[#645547] leading-relaxed max-w-sm mb-6">
              Premier luxury event orchestrators dedicated to conceptualizing and producing extraordinary celebrations across India and destinations worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
                { icon: FacebookIcon, href: '#', label: 'Facebook' },
                { icon: YoutubeIcon, href: '#', label: 'YouTube' },
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white border border-[#DFC07B]/60 hover:border-[#8C6B1C] hover:bg-[#DFC07B] text-[#8C6B1C] hover:text-[#1C1610] flex items-center justify-center transition-all duration-300 shadow-xs"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif-luxury text-base font-bold text-[#241C14] tracking-wide mb-4 pb-2 border-b border-[#DFC07B]/30 inline-block">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-xs text-[#645547] hover:text-[#8C6B1C] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Events */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-luxury text-base font-bold text-[#241C14] tracking-wide mb-4 pb-2 border-b border-[#DFC07B]/30 inline-block">
              Our Events
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {ourEvents.map((evt, idx) => (
                <div key={idx}>
                  <a
                    href="#events"
                    onClick={(e) => { e.preventDefault(); scrollTo('#events'); }}
                    className="text-xs text-[#645547] hover:text-[#8C6B1C] transition-colors block"
                  >
                    {evt}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-luxury text-base font-bold text-[#241C14] tracking-wide mb-4 pb-2 border-b border-[#DFC07B]/30 inline-block">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3.5 mb-6">
              <li className="flex items-center gap-3 text-xs text-[#46382C]">
                <div className="w-7 h-7 rounded-full bg-white border border-[#DFC07B]/60 shadow-xs flex items-center justify-center text-[#8C6B1C] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#46382C]">
                <div className="w-7 h-7 rounded-full bg-white border border-[#DFC07B]/60 shadow-xs flex items-center justify-center text-[#8C6B1C] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>eventora@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#46382C]">
                <div className="w-7 h-7 rounded-full bg-white border border-[#DFC07B]/60 shadow-xs flex items-center justify-center text-[#8C6B1C] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase hover:shadow-md transition-all shadow-xs"
            >
              Request Callback
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DFC07B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786756]">
          <p>
            © 2026 Eventora Events & Beyond. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[#8C6B1C] font-medium">
            <Heart className="w-3.5 h-3.5 fill-[#8C6B1C]" />
            <span>Creating beautiful moments, always.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
