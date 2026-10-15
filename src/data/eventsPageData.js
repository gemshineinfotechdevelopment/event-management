// Events Page Data matching the exact Eventora reference design
import { 
  WeddingRingsIcon, 
  EngagementRingIcon, 
  BirthdayCakeIcon, 
  CorporateBriefcaseIcon, 
  CollegeCapIcon, 
  BabyShowerIcon, 
  PartyGlassesIcon, 
  AllSparklesIcon 
} from '../components/common/GalleryIcons';

export const EVENT_CATEGORIES = [
  { id: 'all', name: 'All Events', icon: AllSparklesIcon },
  { id: 'weddings', name: 'Weddings', icon: WeddingRingsIcon },
  { id: 'engagements', name: 'Engagements', icon: EngagementRingIcon },
  { id: 'birthdays', name: 'Birthdays', icon: BirthdayCakeIcon },
  { id: 'corporate', name: 'Corporate', icon: CorporateBriefcaseIcon },
  { id: 'babyshowers', name: 'Baby Showers', icon: BabyShowerIcon },
  { id: 'privateparties', name: 'Private Parties', icon: PartyGlassesIcon },
];

export const PRIMARY_EVENTS = [
  {
    id: 'grand-wedding-ceremony',
    title: 'Grand Wedding Ceremony',
    category: 'Weddings',
    categoryId: 'weddings',
    dateBadge: {
      day: '24',
      month: 'Jan',
      year: '2026',
      fullDate: '24 Jan 2026'
    },
    icon: WeddingRingsIcon,
    image: '/gallery-hero.jpg',
    thumbnail: '/gallery-hero.jpg',
    desc: 'A dreamy wedding setup with elegant décor, beautiful lighting and unforgettable moments with loved ones.',
    longDesc: 'From sacred vows under our signature floral mandap pavilion to opulent gala receptions under crystal chandeliers, we craft a regal ambiance tailored to celebrate your eternal union. Complete with customized royal seating, cinematic mood lighting, and bespoke florals.',
    location: 'The Royal Pavilion & Terrace, Chennai',
    timing: '06:00 PM Onwards',
    guestCapacity: '250 - 2,500+ Guests',
    highlights: [
      'Grand Floral Mandap with Hanging Wisteria & Chandeliers',
      'Terrace Sunset Viewing Deck with Ambient String Lights',
      'Gourmet Multi-Cuisine Royal Banquet Catering',
      'Live Shehnai & Classical Symphony Orchestra',
      'Cinematic 4K Live Broadcast & Drone Cinematography',
      'Dedicated Bridal Suite & Personal VIP Concierge'
    ],
    accentTag: 'Signature Grandeur'
  },
  {
    id: 'engagement-celebration',
    title: 'Engagement Celebration',
    category: 'Engagements',
    categoryId: 'engagements',
    dateBadge: {
      day: '15',
      month: 'Feb',
      year: '2026',
      fullDate: '15 Feb 2026'
    },
    icon: EngagementRingIcon,
    image: '/engagement-ring.jpg',
    thumbnail: '/engagement-ring.jpg',
    desc: 'Celebrate the beginning of a new journey with love, joy and cherished memories.',
    longDesc: 'An intimate, romantic evening curated to celebrate your first steps toward forever. Surrounded by candlelit tables, soft acoustic melodies, and delicate rose floral rings that frame this unforgettable milestone.',
    location: 'Heritage Courtyard Terraces, Chennai',
    timing: '07:00 PM - 11:30 PM',
    guestCapacity: '80 - 500+ Guests',
    highlights: [
      'Bespoke Ring Ceremony Stage with Floral Arch',
      'Candlelit Dining with Ambient Fairy Lights',
      'Live Acoustic Guitar & Violin Duet',
      'Artisanal Dessert Bar & Signature Mocktails',
      'Custom Monogram Photo Backdrop',
      'Personalized Guest Keepsake Favors'
    ],
    accentTag: 'Romantic Elegance'
  },
  {
    id: 'birthday-bash',
    title: 'Birthday Bash',
    category: 'Birthdays',
    categoryId: 'birthdays',
    dateBadge: {
      day: '12',
      month: 'Mar',
      year: '2026',
      fullDate: '12 Mar 2026'
    },
    icon: BirthdayCakeIcon,
    image: '/birthday-cake.jpg',
    thumbnail: '/birthday-cake.jpg',
    desc: 'Make birthdays extra special with customized themes and joyful celebrations.',
    longDesc: 'Celebrate your milestone birthdays in spectacular fashion. With showstopping multi-tier signature cakes, ambient fairy light curtains, live DJ entertainment, and custom neon photo zones that make memories pop.',
    location: 'Skyline Grand Ballroom, Chennai',
    timing: '05:30 PM - 10:30 PM',
    guestCapacity: '50 - 400+ Guests',
    highlights: [
      'Showstopper Multi-Tier Custom Designer Cake',
      'Gold Foil & Fairy Light Draped Backdrop',
      'High-Energy DJ & Intelligent Moving-Head Lights',
      'Interactive 360 Video Booth with Instant AirDrop',
      'Gourmet Slider & Grazing Table Station',
      'Themed Party Favors & Welcome Drinks'
    ],
    accentTag: 'Vibrant Celebration'
  },
  {
    id: 'corporate-event',
    title: 'Corporate Event',
    category: 'Corporate',
    categoryId: 'corporate',
    dateBadge: {
      day: '28',
      month: 'Mar',
      year: '2026',
      fullDate: '28 Mar 2026'
    },
    icon: CorporateBriefcaseIcon,
    image: '/corporate.jpg',
    thumbnail: '/corporate.jpg',
    desc: 'Professional events that inspire, connect and create lasting opportunities.',
    longDesc: 'Elevate your enterprise with world-class summits, executive annual galas, product reveals, and prestigious awards ceremonies executed with razor-sharp precision and seamless AV technology.',
    location: 'Convention Center Auditorium, Chennai',
    timing: '09:00 AM - 06:00 PM',
    guestCapacity: '100 - 3,500+ Attendees',
    highlights: [
      'Ultra-Wide 4K Curved LED Wall & Stage AV',
      'Simultaneous Translation & High-Def Live Stream',
      'Executive Networking Lounge & Coffee Bar',
      'VIP Guest Protocol & Security Escorts',
      'Automated QR Badge Scanning & Registration',
      'Plated 3-Course Business Luncheon'
    ],
    accentTag: 'Professional Excellence'
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    category: 'Baby Showers',
    categoryId: 'babyshowers',
    dateBadge: {
      day: '18',
      month: 'Apr',
      year: '2026',
      fullDate: '18 Apr 2026'
    },
    icon: BabyShowerIcon,
    image: '/babyshower-neon.jpg',
    thumbnail: '/babyshower-neon.jpg',
    desc: 'A special celebration for the little one on the way, filled with love and happiness.',
    longDesc: 'Welcome the newest bundle of joy in a wonderland of pastel peach and sky blue balloon clouds, charming plush teddy bears, and whimsical neon signage that warms every heart.',
    location: 'Orchid Garden Glasshouse, Chennai',
    timing: '03:00 PM - 07:30 PM',
    guestCapacity: '40 - 250+ Guests',
    highlights: [
      'Illuminated Neon "Baby Shower" Photo Arch',
      'Organic Pastel Balloon Garlands & Teddy Bears',
      'Delicate Macaron Tower & Cupcake Display',
      'Keepsake Advice Cards & Wishes Box',
      'Interactive Family Trivia & Gentle Games',
      'Chilled Botanical Mocktails & High Tea'
    ],
    accentTag: 'Pure Joy & Tenderness'
  },
  {
    id: 'private-party',
    title: 'Private Party',
    category: 'Private Parties',
    categoryId: 'privateparties',
    dateBadge: {
      day: '05',
      month: 'May',
      year: '2026',
      fullDate: '05 May 2026'
    },
    icon: PartyGlassesIcon,
    image: '/privateparty.jpg',
    thumbnail: '/privateparty.jpg',
    desc: 'Intimate gatherings, grand celebrations and everything in between.',
    longDesc: 'An enchanting al fresco evening under warm vintage Edison bulbs and leafy canopies. Long wooden banquet tables dressed with candlelight, fresh florals, vintage glassware, and curated culinary delights.',
    location: 'The Orchard Estate Manor, Chennai',
    timing: '07:30 PM - 01:00 AM',
    guestCapacity: '30 - 300+ Guests',
    highlights: [
      'Festoon String Light Canopies over Wooden Tables',
      'Candlelit Lantern Centerpieces & Fresh Florals',
      'Curated Wine & Mixology Craft Cocktail Station',
      'Live Jazz / Acoustic Singer Under the Stars',
      'Farm-to-Table Family Style Plated Dinner',
      'Intimate Lounge Seating with Fire Pits'
    ],
    accentTag: 'Bespoke Soirée'
  }
];

// Additional events to enrich single category filters
export const ADDITIONAL_CATEGORY_EVENTS = [
  {
    id: 'royal-mandap-wedding',
    title: 'Royal Mandap Nuptials',
    category: 'Weddings',
    categoryId: 'weddings',
    dateBadge: {
      day: '14',
      month: 'Jun',
      year: '2026',
      fullDate: '14 Jun 2026'
    },
    icon: WeddingRingsIcon,
    image: '/venue-mandap.jpg',
    thumbnail: '/venue-mandap.jpg',
    desc: 'Opulent traditional ceremonies with magnificent temple mandap architecture and floral splendor.',
    longDesc: 'A majestic traditional celebration honoring heritage customs with handcrafted marigold garlands, bronze brass lamps, and serene Vedic hymns.',
    location: 'Grand Heritage Temple Lawns, Chennai',
    timing: '05:00 AM - 12:30 PM',
    guestCapacity: '300 - 1,800+ Guests',
    highlights: [
      'Traditional Hand-Carved Wooden Mandap',
      'Fresh Jasmine & Marigold Floral Cascades',
      'Authentic South Indian Banana Leaf Feast',
      'Nadaswaram & Carnatic Percussion Ensemble'
    ],
    accentTag: 'Traditional Heritage'
  },
  {
    id: 'sunset-ring-ceremony',
    title: 'Sunset Ring Ceremony',
    category: 'Engagements',
    categoryId: 'engagements',
    dateBadge: {
      day: '20',
      month: 'Jul',
      year: '2026',
      fullDate: '20 Jul 2026'
    },
    icon: EngagementRingIcon,
    image: '/engagement.jpg',
    thumbnail: '/engagement.jpg',
    desc: 'Romantic twilight vow exchanges under illuminated circular floral archways.',
    longDesc: 'A picturesque sunset ceremony overlooking panoramic horizons with bespoke floral arches and glowing fairy light canopies.',
    location: 'Coastal Breeze Terraces, Chennai',
    timing: '05:30 PM - 10:00 PM',
    guestCapacity: '100 - 450+ Guests',
    highlights: [
      'Circular Rose & Orchid Floral Arch',
      'Golden Hour Sunset Photography Setup',
      'Champagne & Sparkling Wine Toast Service',
      'Live String Quartet Performance'
    ],
    accentTag: 'Sunset Romance'
  },
  {
    id: 'golden-jubilee-birthday',
    title: 'Golden Jubilee Gala',
    category: 'Birthdays',
    categoryId: 'birthdays',
    dateBadge: {
      day: '08',
      month: 'Aug',
      year: '2026',
      fullDate: '08 Aug 2026'
    },
    icon: BirthdayCakeIcon,
    image: '/birthday.jpg',
    thumbnail: '/birthday.jpg',
    desc: 'An opulent 50th milestone celebration filled with gold accents and live retro melodies.',
    longDesc: 'Honor life achievements with a black-tie gala featuring gold balloon installations, vintage memories gallery, and multi-course dining.',
    location: 'The Emperor Ballroom, Chennai',
    timing: '07:00 PM - 11:30 PM',
    guestCapacity: '75 - 350+ Guests',
    highlights: [
      'Gold Mirror Walkway & Archway',
      'Retrospective Memory Wall & Tribute Video',
      'Retro Big Band Live Music Ensemble',
      'Signature Caviar & Champagne Station'
    ],
    accentTag: 'Milestone Honor'
  },
  {
    id: 'tech-innovators-summit',
    title: 'Tech Innovators Summit',
    category: 'Corporate',
    categoryId: 'corporate',
    dateBadge: {
      day: '19',
      month: 'Sep',
      year: '2026',
      fullDate: '19 Sep 2026'
    },
    icon: CorporateBriefcaseIcon,
    image: '/college.jpg',
    thumbnail: '/college.jpg',
    desc: 'Leading tech conference featuring keynote presentations and interactive exhibits.',
    longDesc: 'Brings together 2,000+ industry pioneers for game-changing keynotes, live stage demonstrations, and high-impact B2B networking.',
    location: 'Tech Hub Expo Arena, Chennai',
    timing: '08:30 AM - 07:00 PM',
    guestCapacity: '500 - 3,000+ Attendees',
    highlights: [
      'Interactive Tech Exhibit Booths',
      'Keynote Presentation Stage with Hologram AV',
      'Dedicated Startup Pitch Arena',
      'VIP Investor Lounge & Lunch'
    ],
    accentTag: 'Global Summit'
  },
  {
    id: 'sweet-welcome-baby-shower',
    title: 'Sweet Welcome Baby Shower',
    category: 'Baby Showers',
    categoryId: 'babyshowers',
    dateBadge: {
      day: '10',
      month: 'Oct',
      year: '2026',
      fullDate: '10 Oct 2026'
    },
    icon: BabyShowerIcon,
    image: '/babyshower.jpg',
    thumbnail: '/babyshower.jpg',
    desc: 'Whimsical garden party with sweet floral arrangements and custom treats.',
    longDesc: 'Warm joy and laughter with charming wooden dessert carts, custom monogram cake toppers, and delicate pastel floral centerpieces.',
    location: 'Blossom Courtyard Conservatory, Chennai',
    timing: '02:30 PM - 06:30 PM',
    guestCapacity: '35 - 200+ Guests',
    highlights: [
      'Organic Floral & Balloon Table Runners',
      'Custom Baby Shower Tier Cake',
      'Personalized Keepsake Favor Bags',
      'Gourmet High Tea & Pastries'
    ],
    accentTag: 'Gentle Whimsy'
  },
  {
    id: 'rooftop-cocktail-soiree',
    title: 'Rooftop Cocktail Soirée',
    category: 'Private Parties',
    categoryId: 'privateparties',
    dateBadge: {
      day: '22',
      month: 'Nov',
      year: '2026',
      fullDate: '22 Nov 2026'
    },
    icon: PartyGlassesIcon,
    image: '/venue-lights.jpg',
    thumbnail: '/venue-lights.jpg',
    desc: 'Exclusive rooftop lounge soirée with skyline vistas and curated cocktails.',
    longDesc: 'An electric evening with panoramic skyline views, mixologist cocktail bar, velvet lounge seating, and deep house music.',
    location: 'The Altitude Penthouse Lounge, Chennai',
    timing: '08:00 PM - 02:00 AM',
    guestCapacity: '40 - 200+ Guests',
    highlights: [
      'Panoramic City Skyline Rooftop Views',
      'Flair Bartender Show & Craft Cocktails',
      'Custom LED Backlit Bar Station',
      'Tapas & Canapés Plated Service'
    ],
    accentTag: 'Skyline Soirée'
  }
];

// Helper function to get events based on active category
export function getEventsByCategory(categoryId = 'all') {
  if (categoryId === 'all') {
    return PRIMARY_EVENTS;
  }
  
  // First get from primary events
  const primaryFiltered = PRIMARY_EVENTS.filter(
    (e) => e.categoryId.toLowerCase() === categoryId.toLowerCase()
  );

  // Then add additional matching category events so category pages are rich
  const additionalFiltered = ADDITIONAL_CATEGORY_EVENTS.filter(
    (e) => e.categoryId.toLowerCase() === categoryId.toLowerCase()
  );

  return [...primaryFiltered, ...additionalFiltered];
}
