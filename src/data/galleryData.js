// Comprehensive data for Eventora Interactive Gallery Page

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: 'Sparkles', count: 96 },
  { id: 'wedding', name: 'Wedding', icon: 'Rings', count: 24 },
  { id: 'engagement', name: 'Engagement', icon: 'Ring', count: 15 },
  { id: 'birthday', name: 'Birthday', icon: 'Cake', count: 16 },
  { id: 'corporate', name: 'Corporate', icon: 'Briefcase', count: 14 },
  { id: 'college', name: 'College', icon: 'GraduationCap', count: 9 },
  { id: 'baby-shower', name: 'Baby Shower', icon: 'Baby', count: 10 },
  { id: 'private-party', name: 'Private Party', icon: 'Party', count: 8 },
];

export const ALBUMS = [
  {
    id: 'wedding',
    name: 'Wedding',
    photoCount: 24,
    thumbnail: '/gallery-hero.jpg',
    category: 'Wedding',
    location: 'Coimbatore, Tamil Nadu',
    title: 'Grand Wedding Ceremony',
    description: 'A dreamy wedding setup with elegant décor, beautiful lighting and unforgettable moments with loved ones.',
    photos: [
      { id: 'w1', url: '/gallery-hero.jpg', title: 'Grand Floral Mandap Pavilion', caption: 'Sunset mountain mandap with crystal chandeliers and ivory sofa' },
      { id: 'w2', url: '/dining-centerpiece.jpg', title: 'Royal Banquet Table Centerpiece', caption: 'Opulent rose and peony floral arrangement with golden candelabras' },
      { id: 'w3', url: '/venue-stage.jpg', title: 'Enchanted Indoor Reception Stage', caption: 'Warm ambient lighting and floral arch backdrop' },
      { id: 'w4', url: '/couple-terrace.jpg', title: 'Couple Golden Hour Sunset Vista', caption: 'Breathtaking terrace view overlooking misty mountains' },
      { id: 'w5', url: '/wedding.jpg', title: 'Candid Ceremony Moments', caption: 'Romantic vows exchanged under a thousand fairy lights' },
      { id: 'w6', url: '/venue-mandap.jpg', title: 'Daylight Royal Garden Mandap', caption: 'Heritage carved pillars with fresh marigold and pastel roses' },
      { id: 'w7', url: '/floral-tunnel.jpg', title: 'Grand Floral Walkway Tunnel', caption: 'Cascading floral ceiling for the royal bridal entry' }
    ]
  },
  {
    id: 'engagement',
    name: 'Engagement',
    photoCount: 15,
    thumbnail: '/engagement.jpg',
    category: 'Engagement',
    location: 'Chennai, Tamil Nadu',
    title: 'Ethereal Ring Ceremony',
    description: 'A romantic floral sanctuary crafted with crystal chandeliers, delicate drapery, and warm candle accents.',
    photos: [
      { id: 'e1', url: '/engagement.jpg', title: 'Ethereal Ring Ceremony Stage', caption: 'Draped floral backdrop with royal chaise lounge' },
      { id: 'e2', url: '/dining-centerpiece.jpg', title: 'Intimate Candlelit Dining', caption: 'Golden candelabras and lush pastel blooms' },
      { id: 'e3', url: '/venue-lights.jpg', title: 'Fairy Light Royal Dining Banquet', caption: 'Overhead fairy light mesh above banquet seating' },
      { id: 'e4', url: '/couple-terrace.jpg', title: 'Romantic Sunset Portraits', caption: 'Cherished memories amidst twilight mountain breezes' },
      { id: 'e5', url: '/floral-tunnel.jpg', title: 'Floral Walkway Entrance', caption: 'Scented jasmine and rose pathway' }
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday',
    photoCount: 16,
    thumbnail: '/birthday-cake.jpg',
    category: 'Birthday',
    location: 'Bangalore, Karnataka',
    title: 'Milestone Celebration & Soirée',
    description: 'Extravagant celebration with custom tiered confectionery, radiant fairy lights, and personalized neon decor.',
    photos: [
      { id: 'b1', url: '/birthday-cake.jpg', title: 'Luxury Gold Drip Milestone Cake', caption: 'Artisanal cake adorned with fresh berries, gold leaf and candles' },
      { id: 'b2', url: '/birthday.jpg', title: 'Rose Gold Balloon Arch & Neon Lounge', caption: 'Custom neon signage with metallic balloon installation' },
      { id: 'b3', url: '/privateparty.jpg', title: 'Open-Air Garden Celebration Lawn', caption: 'Festoon lighting over rustic wooden dining banquets' },
      { id: 'b4', url: '/venue-lights.jpg', title: 'Celebration Feast Table Setting', caption: 'Ambient candlelight with bespoke menu presentation' },
      { id: 'b5', url: '/venue-stage.jpg', title: 'Acoustic Band Performance Stage', caption: 'Live entertainment zone with warm fairy backdrops' }
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate',
    photoCount: 14,
    thumbnail: '/corporate.jpg',
    category: 'Corporate',
    location: 'Hyderabad, Telangana',
    title: 'Annual Leadership Summit & Gala',
    description: 'High-tech audio-visual production, immersive LED displays, and grand amphitheater auditorium staging.',
    photos: [
      { id: 'c1', url: '/corporate.jpg', title: 'Global Leadership Summit Stage', caption: 'State-of-the-art curved LED backdrop and dynamic spotlights' },
      { id: 'c2', url: '/banquet.jpg', title: 'Executive Awards Banquet Hall', caption: 'Formal gala tables with branded gold centerpieces' },
      { id: 'c3', url: '/venue-lights.jpg', title: 'Networking Cocktail Reception', caption: 'Ambient low-light VIP networking lounge' },
      { id: 'c4', url: '/college.jpg', title: 'Keynote Auditorium Presentation', caption: 'Audience engagement during the plenary tech keynote' },
      { id: 'c5', url: '/venue-stage.jpg', title: 'Speaker Pod & Presentation Deck', caption: 'Precision acoustics and illuminated podium' }
    ]
  },
  {
    id: 'college',
    name: 'College',
    photoCount: 9,
    thumbnail: '/college.jpg',
    category: 'College',
    location: 'Coimbatore, Tamil Nadu',
    title: 'Vibrant Campus Youth Cultural Fest',
    description: 'Electric concert atmosphere with moving head beams, concert audio, and thousands of cheering students.',
    photos: [
      { id: 'cl1', url: '/college.jpg', title: 'Vibrant Campus Youth Music Fest', caption: 'Massive concert crowd under purple lasers and stage pyros' },
      { id: 'cl2', url: '/corporate.jpg', title: 'Inter-College Dance Showcase Stage', caption: 'Vibrant colored wash lights and performance floor' },
      { id: 'cl3', url: '/venue-lights.jpg', title: 'Campus Night Bazaar & Food Street', caption: 'Festive canopy lighting and culinary stalls' },
      { id: 'cl4', url: '/privateparty.jpg', title: 'Open Ground DJ Afterparty', caption: 'Pulsating sound system and festoon glow' },
      { id: 'cl5', url: '/gallery-hero.jpg', title: 'Graduation Valedictory Ceremony', caption: 'Prestigious degree conferment stage' }
    ]
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    photoCount: 10,
    thumbnail: '/babyshower.jpg',
    category: 'Baby Shower',
    location: 'Chennai, Tamil Nadu',
    title: 'Pastel Teddy Cloud Baby Shower',
    description: 'Dreamy pastel pink and sky blue cloud installation with plush teddy bears, gold foil accents, and warm glowing neon.',
    photos: [
      { id: 'bs1', url: '/babyshower.jpg', title: 'Whimsical Teddy Cloud Baby Shower', caption: 'Pastel balloon garland with giant teddy bear and neon signage' },
      { id: 'bs2', url: '/birthday.jpg', title: 'Sweet Treats Dessert Bar', caption: 'Macarons, cupcakes and bespoke dessert favors' },
      { id: 'bs3', url: '/dining-centerpiece.jpg', title: 'Floral Pastel Table Settings', caption: 'Delicate hydrangeas and soft blush velvet table runners' },
      { id: 'bs4', url: '/venue-stage.jpg', title: 'Mom-to-Be Blessing Throne', caption: 'Floral swing and cozy velvet lounge seating' },
      { id: 'bs5', url: '/floral-tunnel.jpg', title: 'Enchanted Entry Archway', caption: 'Fresh baby breath and pink rosebud arch' }
    ]
  },
  {
    id: 'private-party',
    name: 'Private Party',
    photoCount: 8,
    thumbnail: '/privateparty.jpg',
    category: 'Private Party',
    location: 'Goa / ECR Chennai',
    title: 'Garden Festoon Dining Soirée',
    description: 'An intimate twilight gathering with bistro bulb canopies, acoustic jazz, and farm-to-table gourmet dining.',
    photos: [
      { id: 'pp1', url: '/privateparty.jpg', title: 'Garden Festoon Dining Soirée', caption: 'Overhead festoon lighting casting a golden glow over lawn tables' },
      { id: 'pp2', url: '/venue-lights.jpg', title: 'Candlelit Vineyard Long Table', caption: 'Rustic wooden tables dressed with fresh greens and crystal' },
      { id: 'pp3', url: '/dining-centerpiece.jpg', title: 'Cocktail & Hors d’Oeuvres Bar', caption: 'Artisanal cocktails served with fresh edible flowers' },
      { id: 'pp4', url: '/couple-terrace.jpg', title: 'Sunset Cocktail Terrace', caption: 'Panoramic coastal breeze and twilight conversations' },
      { id: 'pp5', url: '/venue-stage.jpg', title: 'Acoustic Trio Setup', caption: 'Live musical ambiance under fairy light vines' }
    ]
  }
];

// Main 11 gallery cards matching the exact reference image layout (Page 1):
export const INITIAL_GALLERY_CARDS = [
  // Card 1: Large tall wedding card spanning 2 rows on desktop left
  {
    id: 'card-1',
    category: 'Wedding',
    title: 'Grand Floral Mandap Pavilion',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 24,
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
    photoCount: 24,
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
    photoCount: 24,
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
    photoCount: 24,
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
    photoCount: 16,
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
    photoCount: 14,
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
    photoCount: 9,
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
    photoCount: 10,
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
    photoCount: 8,
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
    photoCount: 15,
    image: '/engagement.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: true,
    hasActionArrow: false,
    location: 'Chennai, Tamil Nadu',
    albumId: 'engagement',
    description: 'A romantic floral sanctuary crafted with crystal chandeliers, delicate drapery, and warm candle accents.'
  },
  // Card 11: Row 4 right - Luxury dining setup
  {
    id: 'card-11',
    category: 'Wedding',
    title: 'Candlelit Royal Dining Banquet',
    eventTitle: 'Grand Wedding Ceremony',
    photoCount: 24,
    image: '/venue-lights.jpg',
    gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
    showBadge: false,
    hasActionArrow: false,
    location: 'Coimbatore, Tamil Nadu',
    albumId: 'wedding',
    description: 'Fairytale dining setting with overhead fairy lights, crystal glassware, and fragrant blooms.'
  }
];

// Additional pages of gallery cards for pagination (Pages 2-5):
export const ADDITIONAL_PAGES_CARDS = {
  2: [
    {
      id: 'p2-1',
      category: 'Wedding',
      title: 'Daylight Royal Garden Mandap',
      eventTitle: 'Royal Garden Wedding',
      photoCount: 28,
      image: '/venue-mandap.jpg',
      gridClass: 'col-span-1 lg:row-span-2 min-h-[380px] lg:min-h-[460px]',
      showBadge: true,
      hasActionArrow: true,
      location: 'Udaipur, Rajasthan',
      albumId: 'wedding',
      description: 'Heritage carved pillars with fresh marigold, pastel roses, and royal red carpet aisle.'
    },
    {
      id: 'p2-2',
      category: 'Engagement',
      title: 'Grand Floral Walkway Tunnel',
      eventTitle: 'Royal Engagement Ceremony',
      photoCount: 15,
      image: '/floral-tunnel.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
      showBadge: false,
      hasActionArrow: false,
      location: 'Chennai, Tamil Nadu',
      albumId: 'engagement',
      description: 'Cascading floral ceiling of fragrant wisteria and white roses for the royal couple entry.'
    },
    {
      id: 'p2-3',
      category: 'Corporate',
      title: 'Executive Awards Banquet Hall',
      eventTitle: 'Global Corporate Summit',
      photoCount: 14,
      image: '/banquet.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
      showBadge: false,
      hasActionArrow: false,
      location: 'Hyderabad, Telangana',
      albumId: 'corporate',
      description: 'Grand ballroom setup for multinational corporation annual felicitation dinner.'
    },
    {
      id: 'p2-4',
      category: 'Wedding',
      title: 'Couple Romantic Moment',
      eventTitle: 'Grand Wedding Ceremony',
      photoCount: 24,
      image: '/wedding.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
      showBadge: false,
      hasActionArrow: false,
      location: 'Coimbatore, Tamil Nadu',
      albumId: 'wedding',
      description: 'Joyous celebration with heartfelt laughter and sparkling champagne.'
    },
    {
      id: 'p2-5',
      category: 'Birthday',
      title: 'Rose Gold Balloon Installation',
      eventTitle: 'Milestone Birthday Soirée',
      photoCount: 16,
      image: '/birthday.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[220px]',
      showBadge: false,
      hasActionArrow: false,
      location: 'Bangalore, Karnataka',
      albumId: 'birthday',
      description: 'Metallic chrome balloons and neon signage creating the perfect selfie backdrop.'
    },
    {
      id: 'p2-6',
      category: 'Private Party',
      title: 'Twilight Garden Lanterns',
      eventTitle: 'Garden Festoon Dining Soirée',
      photoCount: 8,
      image: '/privateparty.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
      showBadge: true,
      hasActionArrow: true,
      location: 'Goa',
      albumId: 'private-party',
      description: 'Enchanting lantern lights reflecting off green lawns and wooden banquets.'
    },
    {
      id: 'p2-7',
      category: 'Corporate',
      title: 'Dynamic Stage Lighting',
      eventTitle: 'Leadership Gala',
      photoCount: 14,
      image: '/corporate.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
      showBadge: true,
      hasActionArrow: true,
      location: 'Bangalore',
      albumId: 'corporate',
      description: 'Concert-grade intelligent beam fixtures elevating executive presentations.'
    },
    {
      id: 'p2-8',
      category: 'Wedding',
      title: 'Grand Mandap Chandelier',
      eventTitle: 'Grand Wedding Ceremony',
      photoCount: 24,
      image: '/gallery-hero.jpg',
      gridClass: 'col-span-1 min-h-[190px] lg:min-h-[210px]',
      showBadge: true,
      hasActionArrow: false,
      location: 'Coimbatore',
      albumId: 'wedding',
      description: 'Crystal chandeliers casting warmth over hand-tied floral garlands.'
    }
  ]
};
