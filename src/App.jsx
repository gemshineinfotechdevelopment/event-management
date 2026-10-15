import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CurvedTransition from './components/CurvedTransition';
import EventsSection from './components/EventsSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServicesSection from './components/ServicesSection';
import VenueIdeasSection from './components/VenueIdeasSection';
import GallerySection from './components/GallerySection';
import HowItWorks from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

// Dedicated Interactive Gallery Page matching the exact reference image
import GalleryPage from './components/gallery/GalleryPage';

// Modals
import ConsultationModal from './components/modals/ConsultationModal';
import VideoModal from './components/modals/VideoModal';
import ImageLightboxModal from './components/modals/ImageLightboxModal';
import EventDetailsModal from './components/modals/EventDetailsModal';
import SearchModal from './components/modals/SearchModal';

export default function App() {
  // Determine initial view based on URL hash or path
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('home') || hash.includes('events') || hash.includes('services') || hash.includes('why-us') || hash.includes('contact')) {
        return 'home';
      }
    }
    // Default to 'gallery' as requested to showcase the exact reference design
    return 'gallery';
  });

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState('Wedding');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Open consultation with specified category
  const handleOpenConsultation = (category = 'Wedding') => {
    setInitialCategory(typeof category === 'string' ? category : 'Wedding');
    setConsultationOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // Navigate to Gallery view
  const handleNavigateToGallery = useCallback(() => {
    setCurrentView('gallery');
    window.history.pushState(null, '', '#gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navigate to Home view & scroll to specified section
  const handleNavigateToHome = useCallback((sectionId = 'home') => {
    setCurrentView('home');
    const targetHash = sectionId === 'home' ? '#home' : `#${sectionId}`;
    window.history.pushState(null, '', targetHash);

    // Scroll to section after state update
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 84;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 80);
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#gallery') {
        setCurrentView('gallery');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241D] flex flex-col relative overflow-x-hidden selection:bg-[#E2C787] selection:text-[#1C1610]">
      
      {currentView === 'gallery' ? (
        /* Dedicated Eventora Gallery Page matching the reference image */
        <GalleryPage 
          onNavigateHome={handleNavigateToHome}
          onOpenConsultation={handleOpenConsultation}
        />
      ) : (
        /* Full Landing Website */
        <>
          {/* 1. Header & Navigation */}
          <Navbar 
            onOpenConsultation={() => handleOpenConsultation('General')}
            onOpenSearch={() => setSearchModalOpen(true)}
            onNavigateGallery={handleNavigateToGallery}
          />

          {/* 2. Hero Section */}
          <Hero 
            onOpenConsultation={() => handleOpenConsultation('Wedding')}
            onOpenVideo={() => setVideoModalOpen(true)}
          />

          {/* 3. Curved Transition with Botanical Flourish */}
          <CurvedTransition />

          {/* 4. Our Events Section */}
          <EventsSection 
            onSelectEvent={handleSelectEvent}
            onOpenConsultation={() => handleOpenConsultation('Custom')}
          />

          {/* 5. Why Choose Us Section */}
          <WhyChooseUs 
            onOpenConsultation={() => handleOpenConsultation('General')}
          />

          {/* 6. Our Services Section */}
          <ServicesSection 
            onOpenConsultation={() => handleOpenConsultation('Services')}
          />

          {/* 7. Featured / Venue Ideas Section */}
          <VenueIdeasSection 
            onOpenLightbox={setLightboxItem}
            onScrollToGallery={handleNavigateToGallery}
          />

          {/* 8. Featured Gallery Section with shortcut to full interactive gallery */}
          <GallerySection 
            onOpenLightbox={setLightboxItem}
            onOpenConsultation={handleNavigateToGallery}
          />

          {/* 9. How It Works Section */}
          <HowItWorks />

          {/* 10. Testimonials Section */}
          <TestimonialsSection />

          {/* 11. Final CTA Section */}
          <FinalCTA 
            onOpenConsultation={() => handleOpenConsultation('Consultation')}
          />

          {/* 12. Footer Section */}
          <Footer 
            onOpenConsultation={() => handleOpenConsultation('General')}
          />
        </>
      )}

      {/* Interactive Global Modals */}
      <ConsultationModal 
        isOpen={consultationOpen} 
        onClose={() => setConsultationOpen(false)}
        initialCategory={initialCategory}
      />

      <VideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
      />

      <ImageLightboxModal 
        item={lightboxItem} 
        onClose={() => setLightboxItem(null)}
        onOpenConsultation={() => handleOpenConsultation(lightboxItem?.category || 'Wedding')}
      />

      <EventDetailsModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        onBookEvent={(category) => {
          setSelectedEvent(null);
          handleOpenConsultation(category);
        }}
      />

      <SearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />

    </div>
  );
}
