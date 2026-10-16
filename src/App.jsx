import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { 
  HomePage, 
  EventsPage, 
  GalleryPage, 
  ServicesPage, 
  AboutPage, 
  ContactPage 
} from './pages';

// Interactive Global Modals
import ConsultationModal from './components/modals/ConsultationModal';
import VideoModal from './components/modals/VideoModal';
import ImageLightboxModal from './components/modals/ImageLightboxModal';
import EventDetailsModal from './components/modals/EventDetailsModal';
import SearchModal from './components/modals/SearchModal';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';

export default function App() {
  // Determine initial view based on URL hash or path
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'events') return 'events';
      if (hash === 'gallery') return 'gallery';
      if (hash === 'services') return 'services';
      if (hash === 'about' || hash === 'why-us') return 'about';
      if (hash === 'contact') return 'contact';
      if (hash === 'home') return 'home';
    }
    // Default to 'home'
    return 'home';
  });

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState('Wedding');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Open consultation modal with specified category
  const handleOpenConsultation = (category = 'Wedding') => {
    setInitialCategory(typeof category === 'string' ? category : 'Wedding');
    setConsultationOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // General page navigation
  const handleNavigatePage = useCallback((pageName) => {
    const validViews = ['home', 'events', 'gallery', 'services', 'about', 'contact'];
    const target = pageName === 'why-us' ? 'about' : pageName;
    if (validViews.includes(target)) {
      setCurrentView(target);
      window.history.pushState(null, '', `#${target}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Navigate to Events view
  const handleNavigateToEvents = useCallback(() => {
    handleNavigatePage('events');
  }, [handleNavigatePage]);

  // Navigate to Gallery view
  const handleNavigateToGallery = useCallback(() => {
    handleNavigatePage('gallery');
  }, [handleNavigatePage]);

  // Navigate to Home view & scroll to specified section
  const handleNavigateToHome = useCallback((sectionId = 'home') => {
    if (sectionId === 'events') {
      handleNavigatePage('events');
      return;
    }
    if (sectionId === 'gallery') {
      handleNavigatePage('gallery');
      return;
    }
    if (sectionId === 'services') {
      handleNavigatePage('services');
      return;
    }
    if (sectionId === 'about' || sectionId === 'why-us') {
      handleNavigatePage('about');
      return;
    }
    if (sectionId === 'contact') {
      handleNavigatePage('contact');
      return;
    }

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
  }, [handleNavigatePage]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (['events', 'gallery', 'services', 'about', 'contact'].includes(hash)) {
        setCurrentView(hash === 'why-us' ? 'about' : hash);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C241D] flex flex-col relative overflow-x-hidden selection:bg-[#E2C787] selection:text-[#1C1610]">
      
      {/* 1. Global Consistent Glassmorphism Header */}
      <Header 
        activePage={currentView}
        onNavigate={handleNavigatePage}
        onOpenConsultation={() => handleOpenConsultation('Wedding')}
      />

      {/* 2. Main Page Content - flex-1 pushes Footer to bottom naturally without absolute/fixed positioning */}
      <main className="flex-1 w-full flex flex-col">
        {currentView === 'events' ? (
          <EventsPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={handleNavigateToHome}
            onNavigateGallery={handleNavigateToGallery}
            onNavigatePage={handleNavigatePage}
          />
        ) : currentView === 'gallery' ? (
          <GalleryPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={handleNavigateToHome}
            onNavigateEvents={handleNavigateToEvents}
            onNavigatePage={handleNavigatePage}
          />
        ) : currentView === 'services' ? (
          <ServicesPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={handleNavigateToHome}
            onNavigatePage={handleNavigatePage}
          />
        ) : currentView === 'about' ? (
          <AboutPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={handleNavigateToHome}
            onNavigatePage={handleNavigatePage}
          />
        ) : currentView === 'contact' ? (
          <ContactPage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateHome={handleNavigateToHome}
            onNavigatePage={handleNavigatePage}
          />
        ) : (
          <HomePage 
            onOpenConsultation={handleOpenConsultation}
            onNavigateServices={() => handleNavigatePage('services')}
            onNavigateAbout={() => handleNavigatePage('about')}
            onNavigateGallery={handleNavigateToGallery}
            onNavigateEvents={handleNavigateToEvents}
            onOpenVideo={() => setVideoModalOpen(true)}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}
      </main>

      {/* 3. Global Luxury Navy Footer - Exactly once per page */}
      <Footer 
        onNavigate={handleNavigatePage}
        onOpenConsultation={() => handleOpenConsultation('Wedding')}
      />

      {/* Global Modals accessible across all pages */}
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

      {/* Floating WhatsApp Action Button (Icon Only, Persistent on Scroll) */}
      <FloatingWhatsApp />

    </div>
  );
}
