import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeServices from '../components/home/HomeServices';
import HomeAbout from '../components/home/HomeAbout';
import HomeGallery from '../components/home/HomeGallery';
import HomeTestimonials from '../components/home/HomeTestimonials';
import HomeCTA from '../components/home/HomeCTA';

export default function HomePage({
  onOpenConsultation,
  onNavigateServices,
  onNavigateAbout,
  onNavigateGallery,
  onNavigateEvents
}) {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Banner */}
      <HomeHero onOpenConsultation={() => onOpenConsultation('Wedding')} />

      {/* 2. Services Section ("What We Offer") */}
      <HomeServices onNavigateServices={onNavigateServices} />

      {/* 3. About Eventora Section ("Creating Unforgettable Moments") */}
      <HomeAbout onNavigateAbout={onNavigateAbout} />

      {/* 4. Gallery Preview Section ("Moments That Tell Beautiful Stories") */}
      <HomeGallery onNavigateGallery={onNavigateGallery} />

      {/* 5. Testimonials Section ("Trusted by Happy Clients") */}
      <HomeTestimonials />

      {/* 6. Final Call-to-Action Section ("Your Perfect Event Awaits") */}
      <HomeCTA onOpenConsultation={() => onOpenConsultation('Consultation')} />
    </div>
  );
}
