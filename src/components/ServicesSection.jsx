import React from 'react';
import { 
  Sparkles, 
  Theater, 
  UtensilsCrossed, 
  Camera, 
  Music4, 
  Mail, 
  Users2, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function ServicesSection({ onOpenConsultation }) {
  const services = [
    {
      id: 'venue-decor',
      title: 'Venue Decoration',
      icon: Sparkles,
      desc: 'Grand florals, architectural draping, crystal chandeliers and bespoke entranceways.'
    },
    {
      id: 'stage-design',
      title: 'Stage Design',
      icon: Theater,
      desc: 'Customized thematic backdrops, 3D scenography, and ambient stage lighting.'
    },
    {
      id: 'catering',
      title: 'Catering',
      icon: UtensilsCrossed,
      desc: 'Multi-cuisine royal banquets, live culinary stations, and artisanal desserts.'
    },
    {
      id: 'photo-video',
      title: 'Photography & Videography',
      icon: Camera,
      desc: 'Cinematic 4K films, candid moments, drone coverage, and instant photo printing.'
    },
    {
      id: 'entertainment',
      title: 'Entertainment (DJ, Live Music)',
      icon: Music4,
      desc: 'Celebrity DJs, live symphony orchestras, fusion bands, and cultural troupes.'
    },
    {
      id: 'invitations',
      title: 'Invitation Design',
      icon: Mail,
      desc: 'Luxury foil-pressed box invites, digital animated invites, and wax seal calligraphy.'
    },
    {
      id: 'guest-management',
      title: 'Guest Management',
      icon: Users2,
      desc: 'VIP hospitality, automated RSVP concierge, hotel bookings, and luxury fleet logistics.'
    },
    {
      id: 'event-coord',
      title: 'Event Coordination',
      icon: CheckCircle2,
      desc: 'On-ground master directors managing timelines, vendors, and contingency plans.'
    }
  ];

  return (
    <section id="services" className="relative bg-[#F5EFE6] text-[#2C241D] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[#EAE0D0] scroll-mt-24">
      
      {/* Subtle Botanical / Light Flourish Ambient Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(#DFC07B_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="text-xs font-bold tracking-[0.28em] text-[#8C6B1C] uppercase">OUR SERVICES</span>
            <span className="text-[#C5A059] text-xs">✦</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold text-[#241C14] tracking-tight leading-tight mb-3.5">
            Everything You Need, <br className="hidden sm:inline" />
            Under One Roof
          </h2>

          <p className="text-sm sm:text-base text-[#645547] font-normal max-w-2xl mx-auto leading-relaxed">
            From grand venues to stunning décor, delicious food to entertainment, we take care of every detail.
          </p>
        </div>

        {/* 8 Elegant White / Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5 sm:gap-4">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={onOpenConsultation}
                className="group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DAC6] hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-2 shadow-xs hover:shadow-md hover:shadow-[#C5A059]/15 cursor-pointer min-h-[185px] justify-between overflow-hidden"
              >
                {/* Gold Line Icon in Center */}
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/60 group-hover:border-[#C5A059] group-hover:bg-[#F3E8CE] flex items-center justify-center text-[#9A731F] group-hover:text-[#6E5011] group-hover:scale-110 transition-all duration-300 my-auto shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.6]" />
                </div>

                {/* Service Title */}
                <h3 className="font-sans text-xs font-bold text-[#2C241D] group-hover:text-[#8C6B1C] transition-colors leading-tight mb-2">
                  {svc.title}
                </h3>

                {/* Small Gold Accent Line at Bottom */}
                <div className="w-8 h-[2px] bg-[#DFC07B]/40 group-hover:bg-[#C5A059] group-hover:w-12 transition-all duration-300 rounded-full" />

                {/* Subtle Hover Indicator */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
