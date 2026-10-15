import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CurvedTransition from '../components/CurvedTransition';
import EventsSection from '../components/EventsSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ServicesSection from '../components/ServicesSection';
import VenueIdeasSection from '../components/VenueIdeasSection';
import GallerySection from '../components/GallerySection';
import HowItWorks from '../components/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function HomePage({
  onOpenConsultation,
  onOpenSearch,
  onOpenVideo,
  onSelectEvent,
  onOpenLightbox,
  onNavigateGallery,
  onNavigateEvents,
  onNavigatePage
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241D] flex flex-col relative overflow-x-hidden selection:bg-[#E2C787] selection:text-[#1C1610]">
      {/* 1. Header & Navigation */}
      <Navbar 
        onOpenConsultation={() => onOpenConsultation('General')}
        onOpenSearch={onOpenSearch}
        onNavigateGallery={onNavigateGallery}
        onNavigateEvents={onNavigateEvents}
        onNavigatePage={onNavigatePage}
      />

      {/* 2. Hero Section */}
      <Hero 
        onOpenConsultation={() => onOpenConsultation('Wedding')}
        onOpenVideo={onOpenVideo}
      />

      {/* 3. Curved Transition with Botanical Flourish */}
      <CurvedTransition />

      {/* 4. Our Events Section */}
      <EventsSection 
        onSelectEvent={onSelectEvent}
        onOpenConsultation={() => onOpenConsultation('Custom')}
      />

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs 
        onOpenConsultation={() => onOpenConsultation('General')}
      />

      {/* 6. Our Services Section */}
      <ServicesSection 
        onOpenConsultation={() => onOpenConsultation('Services')}
      />

      {/* 7. Featured / Venue Ideas Section */}
      <VenueIdeasSection 
        onOpenLightbox={onOpenLightbox}
        onScrollToGallery={onNavigateGallery}
      />

      {/* 8. Featured Gallery Section with shortcut to full interactive gallery */}
      <GallerySection 
        onOpenLightbox={onOpenLightbox}
        onOpenConsultation={onNavigateGallery}
      />

      {/* 9. How It Works Section */}
      <HowItWorks />

      {/* 10. Testimonials Section */}
      <TestimonialsSection />

      {/* 11. Final CTA Section */}
      <FinalCTA 
        onOpenConsultation={() => onOpenConsultation('Consultation')}
      />

      {/* 12. Footer Section */}
      <Footer 
        onOpenConsultation={() => onOpenConsultation('General')}
      />
    </div>
  );
}
