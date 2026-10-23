// Curated data for Eventora Luxury Gallery (Zero Duplicate Images)

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'Sparkles', count: 19 },
  { id: 'wedding', name: 'Wedding', icon: 'Rings', count: 6 },
  { id: 'engagement', name: 'Engagement', icon: 'Ring', count: 3 },
  { id: 'birthday', name: 'Birthday', icon: 'Cake', count: 2 },
  { id: 'corporate', name: 'Corporate', icon: 'Briefcase', count: 2 },
  { id: 'college', name: 'College', icon: 'GraduationCap', count: 2 },
  { id: 'baby-shower', name: 'Baby Shower', icon: 'Baby', count: 2 },
  { id: 'private-party', name: 'Private Party', icon: 'Party', count: 2 },
];

export const ALBUMS = [
  {
    id: 'wedding',
    name: 'Wedding',
    photoCount: 6,
    thumbnail: '/gallery-hero.jpg',
    category: 'Wedding',
    location: 'Coimbatore, Tamil Nadu',
    title: 'Grand Wedding Ceremony',
    description: 'A dreamy wedding setup with elegant décor, beautiful lighting and unforgettable moments with loved ones.',
    photos: [
      { id: 'w1', url: '/gallery-hero.jpg', title: 'Grand Floral Mandap Pavilion', caption: 'Sunset mountain mandap with crystal chandeliers and ivory sofa' },
      { id: 'w2', url: '/dining-centerpiece.jpg', title: 'Royal Banquet Table Centerpiece', caption: 'Opulent rose and peony floral arrangement with golden candelabras' },
      { id: 'w3', url: '/venue-stage.jpg', title: 'Enchanted Indoor Reception Stage', caption: 'Warm ambient lighting and floral arch backdrop' },
      { id: 'w4', url: '/couple-terrace.jpg', title: 'Sunset Terrace Couple Portrait', caption: 'Breathtaking golden hour terrace view overlooking misty mountains' },
      { id: 'w5', url: '/wedding.jpg', title: 'Candid Ceremony Moments', caption: 'Romantic vows exchanged under a thousand fairy lights' },
      { id: 'w6', url: '/venue-mandap.jpg', title: 'Daylight Royal Garden Mandap', caption: 'Heritage carved pillars with fresh marigold and pastel roses' },
    ]
  },
  {
    id: 'engagement',
    name: 'Engagement',
    photoCount: 3,
    thumbnail: '/engagement.jpg',
    category: 'Engagement',
    location: 'Chennai, Tamil Nadu',
    title: 'Ethereal Ring Ceremony',
    description: 'A romantic floral sanctuary crafted with crystal chandeliers, delicate drapery, and warm candle accents.',
    photos: [
      { id: 'e1', url: '/engagement.jpg', title: 'Ethereal Ring Ceremony Gazebo', caption: 'Draped floral backdrop with royal chaise lounge' },
      { id: 'e2', url: '/engagement-ring.jpg', title: 'Diamond Ring & Bridal Jewellery Exchange', caption: 'Intimate celebration of promises and forever vows' },
      { id: 'e3', url: '/floral-tunnel.jpg', title: 'Cascading Jasmine & Rose Entrance Tunnel', caption: 'Scented floral ceiling for the grand bridal entry' },
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday',
    photoCount: 2,
    thumbnail: '/birthday-cake.jpg',
    category: 'Birthday',
    location: 'Bangalore, Karnataka',
    title: 'Milestone Celebration & Soirée',
    description: 'Extravagant celebration with custom tiered confectionery, radiant fairy lights, and personalized neon decor.',
    photos: [
      { id: 'b1', url: '/birthday-cake.jpg', title: 'Luxury Gold Drip Milestone Cake', caption: 'Artisanal cake adorned with fresh berries, gold leaf and candles' },
      { id: 'b2', url: '/birthday.jpg', title: 'Rose Gold Balloon Arch & Neon Lounge', caption: 'Custom neon signage with metallic balloon installation' },
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate',
    photoCount: 2,
    thumbnail: '/corporate.jpg',
    category: 'Corporate',
    location: 'Hyderabad, Telangana',
    title: 'Annual Leadership Summit & Gala',
    description: 'High-tech audio-visual production, immersive LED displays, and grand amphitheater auditorium staging.',
    photos: [
      { id: 'c1', url: '/corporate.jpg', title: 'Global Leadership Summit Stage', caption: 'State-of-the-art curved LED backdrop and dynamic spotlights' },
      { id: 'c2', url: '/banquet.jpg', title: 'Executive Awards Banquet Hall', caption: 'Formal gala tables with branded gold centerpieces' },
    ]
  },
  {
    id: 'college',
    name: 'College',
    photoCount: 2,
    thumbnail: '/college.jpg',
    category: 'College',
    location: 'Coimbatore, Tamil Nadu',
    title: 'Vibrant Campus Youth Cultural Fest',
    description: 'Electric concert atmosphere with moving head beams, concert audio, and thousands of cheering students.',
    photos: [
      { id: 'cl1', url: '/college.jpg', title: 'Vibrant Campus Youth Music Fest', caption: 'Massive concert crowd under purple lasers and stage pyros' },
      { id: 'cl2', url: '/college_new.jpg', title: 'Inter-College Dance Showcase Stage', caption: 'Vibrant colored wash lights and performance floor' },
    ]
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    photoCount: 2,
    thumbnail: '/babyshower.jpg',
    category: 'Baby Shower',
    location: 'Chennai, Tamil Nadu',
    title: 'Pastel Teddy Cloud Baby Shower',
    description: 'Dreamy pastel pink and sky blue cloud installation with plush teddy bears, gold foil accents, and warm glowing neon.',
    photos: [
      { id: 'bs1', url: '/babyshower.jpg', title: 'Whimsical Teddy Cloud Baby Shower', caption: 'Pastel balloon garland with giant teddy bear and neon signage' },
      { id: 'bs2', url: '/babyshower-neon.jpg', title: 'Oh Baby Glowing Neon & Floral Arc', caption: 'Delicate hydrangeas and custom warm neon monogram backdrop' },
    ]
  },
  {
    id: 'private-party',
    name: 'Private Party',
    photoCount: 2,
    thumbnail: '/privateparty.jpg',
    category: 'Private Party',
    location: 'Goa / ECR Chennai',
    title: 'Garden Festoon Dining Soirée',
    description: 'An intimate twilight gathering with bistro bulb canopies, acoustic jazz, and farm-to-table gourmet dining.',
    photos: [
      { id: 'pp1', url: '/privateparty.jpg', title: 'Garden Festoon Dining Soirée', caption: 'Overhead festoon lighting casting a golden glow over lawn tables' },
      { id: 'pp2', url: '/venue-lights.jpg', title: 'Fairy Light Royal Dining Banquet', caption: 'Overhead fairy light mesh above long banquet seating' },
    ]
  }
];

// Curated 10 Showcase Gallery Cards (Each with 100% Unique Image):
export const INITIAL_GALLERY_CARDS = [
  // Card 1: Tall feature wedding card spanning 2 rows on desktop left
  {
    id: 'card-1',
    category: 'Wedding',
    title: 'Grand Floral Mandap Pavilion',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 6,
    image: '/gallery-hero.jpg',
    gridClass: 'col-span-1 sm:col-span-1 lg:col-span-1 lg:row-span-2 min-h-[380px] lg:min-h-[460px]',
    showBadge: true,
    hasActionArrow: true,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'wedding',
    description: 'A dreamy wedding setup with elegant décor, beautiful lighting and unforgettable moments with loved ones.'
  },
  // Card 2: Row 1 center - Dining centerpiece
  {
    id: 'card-2',
    category: 'Wedding',
    title: 'Royal Table Floral Centerpiece',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 6,
    image: '/dining-centerpiece.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
    showBadge: false,
    hasActionArrow: false,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'wedding',
    description: 'Opulent rose and peony floral arrangement with golden candelabras and fine crystal.'
  },
  // Card 3: Row 1 right - Indoor floral stage
  {
    id: 'card-3',
    category: 'Wedding',
    title: 'Enchanted Indoor Floral Stage',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 6,
    image: '/venue-stage.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
    showBadge: false,
    hasActionArrow: false,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'wedding',
    description: 'Warm ambient lighting and floral arch backdrop for memorable family portraits.'
  },
  // Card 4: Row 2 center - Couple on terrace overlooking mountains
  {
    id: 'card-4',
    category: 'Wedding',
    title: 'Sunset Terrace Couple Portrait',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 6,
    image: '/couple-terrace.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
    showBadge: false,
    hasActionArrow: false,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'wedding',
    description: 'Breathtaking golden hour terrace view overlooking misty mountains and valley.'
  },
  // Card 5: Row 2 right - Birthday cake
  {
    id: 'card-5',
    category: 'Birthday',
    title: 'Happy Birthday Confectionery',
    eventTitle: 'Milestone Celebration & Soirée',
    photoCount: 2,
    image: '/birthday-cake.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
    showBadge: false,
    hasActionArrow: false,
    location: 'Bangalore, Karnataka',
    albumId: 'birthday',
    description: 'Multi-tiered artisanal celebration cake adorned with fresh berries, gold leaf, and candles.'
  },
  // Card 6: Row 3 left - Corporate
  {
    id: 'card-6',
    category: 'Corporate',
    title: 'Corporate Leadership Summit',
    eventTitle: 'Annual Leadership Summit & Gala',
    photoCount: 2,
    image: '/corporate.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: true,
    location: 'Hyderabad, Telangana',
    albumId: 'corporate',
    description: 'High-tech audio-visual production, immersive LED displays, and grand amphitheater staging.'
  },
  // Card 7: Row 3 center - College
  {
    id: 'card-7',
    category: 'College',
    title: 'Youth Music Cultural Fest',
    eventTitle: 'Vibrant Campus Youth Cultural Fest',
    photoCount: 2,
    image: '/college.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: true,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'college',
    description: 'Electric concert atmosphere with moving head beams, concert audio, and thousands of cheering students.'
  },
  // Card 8: Row 3 right - Baby Shower
  {
    id: 'card-8',
    category: 'Baby Shower',
    title: 'Whimsical Teddy Cloud Lounge',
    eventTitle: 'Pastel Teddy Cloud Baby Shower',
    photoCount: 2,
    image: '/babyshower.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: false,
    location: 'Chennai, Tamil Nadu',
    albumId: 'baby-shower',
    description: 'Dreamy pastel pink and sky blue cloud installation with plush teddy bears and glowing neon.'
  },
  // Card 9: Row 4 left - Private Party
  {
    id: 'card-9',
    category: 'Private Party',
    title: 'Garden Festoon Dining Soirée',
    eventTitle: 'Garden Festoon Dining Soirée',
    photoCount: 2,
    image: '/privateparty.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: true,
    location: 'Goa / ECR Chennai',
    albumId: 'private-party',
    description: 'An intimate twilight gathering with bistro bulb canopies, acoustic jazz, and farm-to-table dining.'
  },
  // Card 10: Row 4 center - Engagement
  {
    id: 'card-10',
    category: 'Engagement',
    title: 'Ethereal Ring Ceremony Stage',
    eventTitle: 'Ethereal Ring Ceremony',
    photoCount: 3,
    image: '/engagement.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: true,
    location: 'Chennai, Tamil Nadu',
    albumId: 'engagement',
    description: 'A romantic floral sanctuary crafted with crystal chandeliers, delicate drapery, and warm candle accents.'
  }
];

// Curated collection is self-contained without duplicate pagination:
export const ADDITIONAL_PAGES_CARDS = {};
