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
    desc: 'Complete destination wedding planning, grand stage and mandap designs, fresh flowers, bridal suites, and full event coordination.',
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
    title: 'Private Parties & Celebrations',
    subtitle: 'Intimate Elegance & Exquisite Atmosphere',
    image: '/privateparty.jpg',
    icon: Sparkles,
    desc: 'Charming garden dinners, cocktail parties, birthday celebrations, and VIP events organized with beautiful lights, great music, and delicious dining.',
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
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img 
              src="/venue-lights.jpg" 
              alt="Luxury Services Backdrop" 
              className="w-full h-full object-cover object-[center_35%] md:object-right lg:object-center filter brightness-100 contrast-[1.02]"
            />
            {/* Mobile Gradients: reveals fairy light canopy & banquet setting with crisp legibility */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#070C18]/80 via-[#070C18]/45 to-[#070C18]/95 z-1" />

            {/* Desktop Gradients: completely untouched for desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/60 to-transparent z-1" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 max-w-2xl text-left">
              {/* Gold Tag */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  WHAT WE DO
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="leading-[1.15] mb-4 sm:mb-5 tracking-tight">
                <span className="block font-serif-luxury text-[32px] sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  Extraordinary Services
                </span>
                <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal">
                  Flawlessly Delivered
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#FAF7F2] sm:text-[#E2DACB] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                From architectural stage design and royal dining to seamless logistics and cinematic capture, Eventora crafts every detail of your special occasion to absolute perfection.
              </p>

              {/* Feature Highlights Pills (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex sm:flex-wrap items-center gap-6 pt-1 mb-7 sm:mb-8">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Crown className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">Turnkey Execution</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">Bespoke Scenography</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">Dedicated Concierge</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenConsultation('Services')}
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Calligraphic Accent Box on Desktop */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="text-right p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#DFC07B]/30 shadow-2xl max-w-xs transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block mb-2">
                  MASTER SUITE
                </span>
                <p className="font-serif-luxury text-lg text-[#F5EAD2] leading-snug">
                  "Every detail meticulously orchestrated, from concept to standing ovation."
                </p>
                <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-[#DFC07B]">
                  <Crown className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase font-semibold text-[10px]">The Eventora Standard</span>
                </div>
              </div>
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
                      Signature Experience
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
