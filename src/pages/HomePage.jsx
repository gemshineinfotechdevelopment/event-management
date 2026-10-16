import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeTrustBar from '../components/home/HomeTrustBar';
import HomeServices from '../components/home/HomeServices';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import HomeFeaturedEvents from '../components/home/HomeFeaturedEvents';
import HomeVideoTeaser from '../components/home/HomeVideoTeaser';
import VenueIdeasSection from '../components/VenueIdeasSection';
import HomeAbout from '../components/home/HomeAbout';
import HomeTestimonials from '../components/home/HomeTestimonials';
import HomeFAQ from '../components/home/HomeFAQ';
import HomeCTA from '../components/home/HomeCTA';

export default function HomePage({
  onOpenConsultation,
  onNavigateServices,
  onNavigateAbout,
  onNavigateGallery,
  onNavigateEvents,
  onOpenVideo,
  onOpenLightbox,
}) {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Banner */}
      <HomeHero onOpenConsultation={() => onOpenConsultation('Wedding')} />

      {/* 2. Trust & Hospitality Partner Bar */}
      <HomeTrustBar />

      {/* 3. Services Section ("What We Offer") */}
      <HomeServices onNavigateServices={onNavigateServices} />

      {/* 4. How It Works (4-Step Seamless Journey) */}
      <HowItWorks />

      {/* 5. Why Choose Us (8 Bespoke Elegance Pillars) */}
      <WhyChooseUs onOpenConsultation={() => onOpenConsultation('Consultation')} />

      {/* 6. Featured Signature Events Calendar Highlights */}
      <HomeFeaturedEvents
        onNavigateEvents={onNavigateEvents}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 7. Cinematic Showreel Video Banner */}
      <HomeVideoTeaser onOpenVideo={onOpenVideo} />

      {/* 8. Curated Venue Inspirations & Lightboxes */}
      <VenueIdeasSection
        onOpenLightbox={onOpenLightbox}
        onScrollToGallery={onNavigateGallery}
      />

      {/* 9. About Eventora Section & Milestone Statistics */}
      <HomeAbout onNavigateAbout={onNavigateAbout} />

      {/* 10. Testimonials Section ("Trusted by Happy Clients") */}
      <HomeTestimonials />

      {/* 11. Frequently Asked Questions Accordion */}
      <HomeFAQ onOpenConsultation={onOpenConsultation} />

      {/* 12. Final Call-to-Action Section ("Your Perfect Event Awaits") */}
      <HomeCTA onOpenConsultation={() => onOpenConsultation('Consultation')} />
    </div>
  );
}
