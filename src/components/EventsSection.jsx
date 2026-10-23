import React, { useRef } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Gift, 
  Briefcase, 
  GraduationCap, 
  Baby, 
  Wine 
} from 'lucide-react';

export const EVENTS_DATA = [
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'A day of forever',
    image: '/wedding.jpg',
    icon: Heart,
    category: 'Wedding',
    guestRange: '150 - 2,500+ Guests',
    highlights: ['Grand Floral Stage Design', 'Varmala & Mandap Artistry', 'Cinematic 4K Live Broadcast', 'Royal Buffet & Catering'],
    desc: 'From wedding ceremonies to grand receptions, we create magical weddings with beautiful decorations, royal setups, and unforgettable memories.'
  },
  {
    id: 'engagement',
    title: 'Engagement',
    subtitle: 'Begin a new chapter',
    image: '/engagement.jpg',
    icon: Sparkles,
    category: 'Engagement',
    guestRange: '80 - 500+ Guests',
    highlights: ['Bespoke Ring Ceremony Stage', 'Fairy Light Archways', 'Live Acoustic Music Ensemble', 'Artisanal Dessert Bar'],
    desc: 'The beginning of your forever starts with an enchanting evening designed with intimate elegance, candlelit romance, and joyous memories.'
  },
  {
    id: 'birthday',
    title: 'Birthday',
    subtitle: 'More than just a day',
    image: '/birthday.jpg',
    icon: Gift,
    category: 'Birthday',
    guestRange: '50 - 400+ Guests',
    highlights: ['Custom Neon & Balloon Arches', 'Multi-Tier Signature Cakes', 'DJ & Dance Lighting', 'Interactive Photo Booths'],
    desc: 'Celebrate your milestone birthdays with vibrant, personalized themes that captivate guests and make the celebrant feel truly celebrated.'
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Build stronger bonds',
    image: '/corporate.jpg',
    icon: Briefcase,
    category: 'Corporate',
    guestRange: '100 - 5,000+ Guests',
    highlights: ['High-Tech LED Stage & AV', 'Executive Gala Dinners', 'Annual Summits & Awards', 'Seamless VIP Logistics'],
    desc: 'Elevate your brand with world-class corporate gatherings, leadership summits, product launches, and gala award evenings delivered flawlessly.'
  },
  {
    id: 'college',
    title: 'College Events',
    subtitle: 'Celebrate together',
    image: '/college.jpg',
    icon: GraduationCap,
    category: 'College',
    guestRange: '500 - 10,000+ Students',
    highlights: ['Mega Concert Sound & Lasers', 'Celebrity Artist Bookings', 'Inter-College Culturals Fest', 'High-Security Crowd Control'],
    desc: 'Unleash energy and euphoria with heart-pounding music festivals, cultural celebrations, and graduations that ignite campus spirit.'
  },
  {
    id: 'babyshower',
    title: 'Baby Shower',
    subtitle: 'One life, a big joy',
    image: '/babyshower.jpg',
    icon: Baby,
    category: 'Baby Shower',
    guestRange: '40 - 250+ Guests',
    highlights: ['Dreamy Pastel Cloud Decor', 'Teddy & Floral Centerpieces', 'Custom Dessert Table', 'Keepsake Memory Stations'],
    desc: 'Celebrate the parents-to-be with cute pastel balloons, sweet flower decorations, and heartwarming fun.'
  },
  {
    id: 'privateparty',
    title: 'Private Party',
    subtitle: 'Good vibes only',
    image: '/privateparty.jpg',
    icon: Wine,
    category: 'Private Party',
    guestRange: '30 - 300+ Guests',
    highlights: ['Warm String Light Canopies', 'Refreshing Custom Drinks', 'Live Music & DJ', 'Delicious Dinner Menus'],
    desc: 'Private dinners, rooftop parties, anniversary celebrations, and drink lounges designed for a fun and unforgettable experience.'
  }
];

export default function EventsSection({ onSelectEvent, onOpenConsultation }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="relative bg-[#FAF8F5] text-[#2C241D] pt-6 pb-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            {/* Small Gold Tag */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="text-[#C5A059] text-xs">✦</span>
              <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">OUR EVENTS</span>
              <span className="text-[#C5A059] text-xs">✦</span>
            </div>

            {/* Main Title */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight">
              Every Celebration <br className="hidden sm:inline" />
              <span className="inline-flex items-center gap-3">
                <span className="hidden sm:inline-block w-8 h-[1px] bg-[#C5A059]/60" />
                <span>Has a Story</span>
                <span className="hidden sm:inline-block w-8 h-[1px] bg-[#C5A059]/60" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-2.5 text-sm sm:text-base text-[#6E6052] font-normal max-w-xl">
              We create meaningful experiences for all your special occasions.
            </p>
          </div>

          {/* Controls & Explore Link (Right top corner) */}
          <div className="flex items-center justify-center md:justify-end gap-4 self-center md:self-end">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#2C241D] hover:text-[#8C6B1C] transition-colors group uppercase"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-[#DFC07B]/80 bg-[#FAF8F5] flex items-center justify-center text-[#2C241D] hover:bg-[#DFC07B] hover:text-[#1C1610] transition-all shadow-xs"
                aria-label="Previous events"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-[#DFC07B]/80 bg-[#FAF8F5] flex items-center justify-center text-[#2C241D] hover:bg-[#DFC07B] hover:text-[#1C1610] transition-all shadow-xs"
                aria-label="Next events"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Event Cards Grid / Carousel (BRIGHT / LIGHT CARDS) */}
        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {EVENTS_DATA.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="group relative flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] h-[390px] sm:h-[420px] rounded-2xl overflow-hidden cursor-pointer snap-start shadow-md hover:shadow-xl transition-all duration-300 border border-[#E8DCC4] hover:border-[#C5A059] hover:-translate-y-2 bg-[#FAF8F5] flex flex-col justify-end"
              >
                {/* Event Photography (Bright & Rich) */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle soft vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-45 group-hover:opacity-55 transition-opacity duration-300" />
                <div className="absolute inset-0 border border-[#DFC07B]/40 rounded-2xl pointer-events-none group-hover:border-[#C5A059] transition-colors" />

                {/* Frosted Glass Bottom Panel - High legibility, Zero milky fog */}
                <div className="relative m-3 p-4 rounded-xl bg-[#FAF8F5]/92 backdrop-blur-md border border-[#E8DCC4] shadow-sm flex flex-col items-start z-10 transition-all duration-300 group-hover:bg-[#FAF8F5] group-hover:border-[#C5A059]/70">
                  {/* Category Circular Gold Icon */}
                  <div className="w-7 h-7 rounded-full bg-[#FAF4E8] border border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] mb-2 group-hover:bg-[#DFC07B] group-hover:text-[#1C1610] transition-colors shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#241C14] tracking-wide group-hover:text-[#8C6B1C] transition-colors leading-tight">
                    {event.title}
                  </h3>

                  {/* Short Subtitle */}
                  <p className="text-[11px] text-[#5C4F41] font-medium mt-0.5 mb-2.5 italic">
                    "{event.subtitle}"
                  </p>

                  {/* Small Circular Arrow Button at bottom right */}
                  <div className="w-full flex items-center justify-between pt-2 border-t border-[#DFC07B]/30">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-[#8C6B1C]">
                      View Details
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#F3E8CE] border border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] group-hover:bg-[#DFC07B] group-hover:text-[#1C1610] group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
