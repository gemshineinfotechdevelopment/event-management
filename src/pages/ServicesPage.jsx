import React from 'react';
import EventsCTA from '../components/events/EventsCTA';
import { 
  Sparkles, 
  Crown, 
  Utensils, 
  Camera, 
  Palette, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const SERVICES = [
  {
    id: 'weddings',
    title: 'Luxury Wedding Planning',
    subtitle: 'From Intimate Vows to Grand Royal Celebrations',
    image: '/wedding.jpg',
    icon: Crown,
    desc: 'Bespoke destination wedding production, opulent mandap artistry, designer florals, custom bridal suites, and complete bridal party choreography.',
    price: 'Custom Curated',
    features: [
      'Comprehensive 360° Wedding Management',
      'Architectural Floral Mandap & Stage Styling',
      'Artisanal Multi-Course Royal Banquet',
      'Cinematic 4K Live Broadcast & Drone Videography',
      'VIP Guest Concierge & Luxury Transportation'
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate Galas & Summits',
    subtitle: 'High-Impact Brand Experiences & Keynotes',
    image: '/corporate.jpg',
    icon: ShieldCheck,
    desc: 'Executive conferences, annual leadership awards, product launches, and gala dinners delivered with razor-sharp timing and world-class AV production.',
    price: 'Tailored Packages',
    features: [
      'Curved Ultra-HD LED Stage Displays & Laser Lighting',
      'Automated QR Check-In & Attendee Badging',
      'Simultaneous Translation & Global Live-Stream',
      'Executive Networking Lounges & Coffee Bars',
      'Dedicated Stage Direction & Crisis Protocol'
    ]
  },
  {
    id: 'private-parties',
    title: 'Private Parties & Soirées',
    subtitle: 'Intimate Elegance & Exquisite Atmosphere',
    image: '/privateparty.jpg',
    icon: Sparkles,
    desc: 'Enchanting garden dinners, cocktail receptions, milestone anniversaries, and VIP celebrations curated with bespoke lighting, acoustics, and dining.',
    price: 'Bespoke Experience',
    features: [
      'Festoon & Edison Bulb Canopies over Banquet Tables',
      'Craft Mixology Bars & Signature Cocktails',
      'Live Acoustic Performers & Acclaimed DJs',
      'Personalized Table Settings & Floral Runners',
      'Keepsake Favors & Custom Monogram Decor'
    ]
  },
  {
    id: 'catering',
    title: 'Royal Banqueting & Gourmet Catering',
    subtitle: 'Epicurean Masterpieces for Discerning Palates',
    image: '/dining-centerpiece.jpg',
    icon: Utensils,
    desc: 'Award-winning culinary teams crafting bespoke menus spanning traditional royal feasts, live gourmet counters, artisanal dessert bars, and sommelier pairings.',
    price: 'Per Plate / Custom',
    features: [
      'Authentic Multi-Cuisine Royal Spread',
      'Interactive Live Cooking Theatres',
      'Artisanal Dessert Towers & Chocolate Fountains',
      'Impeccable White-Glove Service Staff',
      'Dietary & Vegan Customized Offerings'
    ]
  },
  {
    id: 'decor',
    title: 'Scenography & Floral Styling',
    subtitle: 'Transforming Spaces into Living Art',
    image: '/venue-stage.jpg',
    icon: Palette,
    desc: 'Visionary stage architecture, hanging wisteria gardens, crystal chandeliers, illuminated arches, and customized luxury furniture installations.',
    price: 'Concept Driven',
    features: [
      '3D Photorealistic Venue Renders & Floor Plans',
      'Exotic Imported & Seasonal Fresh Florals',
      'Architectural Mood & Intelligent Moving Lights',
      'Velvet & Gilded Seating Arrangements',
      'Bespoke Photo Booths & Entrance Walkways'
    ]
  },
  {
    id: 'photography',
    title: 'Cinematography & Memory Capture',
    subtitle: 'Timeless Stories Captured in 4K Brilliance',
    image: '/couple-terrace.jpg',
    icon: Camera,
    desc: 'Celebrity photographers and cinematic filmmakers preserving every tear, laugh, and glance with editorial elegance and emotional depth.',
    price: 'Complete Coverage',
    features: [
      'Multi-Camera 4K & Drone Aerial Cinematography',
      'Same-Day Teaser Video Edits for Social Media',
      'Handcrafted Italian Leather Heirloom Albums',
      'Pre-Wedding Concept Shoots on Location',
      'Private High-Speed Cloud Gallery Access'
    ]
  }
];

export default function ServicesPage({ onOpenConsultation }) {
  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[460px] flex items-center overflow-hidden bg-[#070C18] pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/venue-lights.jpg" 
            alt="Luxury Services Backdrop" 
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/90 to-[#070C18]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase block mb-3">
              WHAT WE DO
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
              Extraordinary Services, <br />
              <span className="font-script text-[#DFC07B] text-4xl sm:text-5xl lg:text-6xl font-normal">
                Flawlessly Delivered
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed mb-6">
              From architectural stage design and royal dining to seamless logistics and cinematic capture, Eventora crafts every detail of your special occasion to absolute perfection.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenConsultation('Services')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
              >
                Request Custom Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase block mb-2">
            OUR SPECIALIZATIONS
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#0D1527]">
            Comprehensive Event Mastery
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4F41] mt-2">
            Every element is meticulously planned and orchestrated by our dedicated division leads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.id}
                className="group flex flex-col bg-white rounded-2xl border border-[#E5DAC6] hover:border-[#DFC07B] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-[#F3ECE0]">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#070C18]/90 backdrop-blur-md border border-[#DFC07B]/40 flex items-center justify-center text-[#DFC07B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-white text-xs font-semibold drop-shadow-xs">
                      {s.price}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#1C1610] group-hover:text-[#8C6B1C] transition-colors mb-1">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-[#8C6B1C] font-semibold italic mb-3">
                      {s.subtitle}
                    </p>
                    <p className="text-xs text-[#5C4F41] leading-relaxed mb-5">
                      {s.desc}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 border-t border-[#F3ECE0] pt-4 mb-6">
                      {s.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#46382C]">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#F3E8CE] flex items-center justify-center text-[#8C6B1C] shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <span className="leading-tight text-[11.5px]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => onOpenConsultation(s.title)}
                    className="w-full py-2.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Consult on {s.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFC07B] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* 3. Bottom CTA */}
      <EventsCTA onOpenConsultation={() => onOpenConsultation('Services')} />

    </div>
  );
}
