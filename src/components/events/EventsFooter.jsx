import React from 'react';
import { 
  EventoraLogo, 
  InstagramIcon, 
  FacebookIcon, 
  YoutubeIcon, 
  LinkedinIcon,
  BotanicalCorner 
} from '../common/Icons';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function EventsFooter({ onNavigate, onSelectCategory }) {
  const { settings } = useSettings();
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const ourEvents = [
    { id: 'weddings', label: 'Wedding' },
    { id: 'engagements', label: 'Engagement' },
    { id: 'birthdays', label: 'Birthday' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'college', label: 'College' },
    { id: 'babyshowers', label: 'Baby Shower' },
    { id: 'privateparties', label: 'Private Party' }
  ];

  return (
    <footer className="relative bg-[#060A14] text-[#EFEAE2] pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#DFC07B]/30 select-none">
      
      {/* Decorative Gold Botanical flourishes on bottom corners (matching reference) */}
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-20">
        <BotanicalCorner className="w-52 h-52 sm:w-72 sm:h-72" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
        <BotanicalCorner className="w-52 h-52 sm:w-72 sm:h-72" flip={true} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12">
          
          {/* Column 1: Brand Info & Social Icons (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div 
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group mb-4"
              title="Eventora - Home"
            >
              <div className="p-1 rounded-full bg-white/5 border border-[#DFC07B]/60 shadow-xs group-hover:scale-105 transition-transform">
                <EventoraLogo className="w-9 h-9" />
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

            {/* Social Icons row */}
            <div className="flex items-center gap-2.5 mb-5">
              {[
                { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' },
                { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#DFC07B] text-[#DFC07B] hover:text-[#0A0E17] border border-[#DFC07B]/40 flex items-center justify-center transition-all duration-300 shadow-xs hover:scale-110"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>

            <p className="text-xs text-[#A0988A] leading-relaxed max-w-xs">
              Making your special moments extraordinary.
            </p>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide mb-4 pb-1.5 border-b border-[#DFC07B]/20 inline-block">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate && onNavigate(item.id)}
                    className="text-xs text-[#A0988A] hover:text-[#DFC07B] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Events (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide mb-4 pb-1.5 border-b border-[#DFC07B]/20 inline-block">
              Our Events
            </h4>
            <ul className="flex flex-col gap-2">
              {ourEvents.map((evt) => (
                <li key={evt.id}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(evt.id)}
                    className="text-xs text-[#A0988A] hover:text-[#DFC07B] transition-colors cursor-pointer text-left"
                  >
                    {evt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif-luxury text-base font-bold text-white tracking-wide mb-4 pb-1.5 border-b border-[#DFC07B]/20 inline-block">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-xs text-[#A0988A]">
                <Phone className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#DFC07B] transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#A0988A]">
                <Mail className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#DFC07B] transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-[#A0988A]">
                <MapPin className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <span>{settings.city || 'Chennai, Tamil Nadu'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#70685A]">
          <p>© 2025 Eventora. All rights reserved.</p>
          <p className="text-[11px] text-[#DFC07B]/80 font-medium tracking-wide">
            Dreams &bull; Designs &bull; Celebrations
          </p>
        </div>

      </div>
    </footer>
  );
}
