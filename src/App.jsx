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
import { AdminLayout, AdminLogin } from './admin';
import { useAdminAuth } from './context/AdminAuthContext';


// Parse current route from window.location and clean up any legacy hashtags
function resolveCurrentRoute() {
  if (typeof window === 'undefined') {
    return { view: 'home', adminTab: 'dashboard' };
  }

  let pathname = window.location.pathname.toLowerCase();
  const rawHash = window.location.hash.toLowerCase().replace('#', '').trim();

  // If there is an old hashtag in the URL (e.g. #admin, #admin/settings, #events), convert to clean path
  if (rawHash) {
    let cleanPath = '/';
    let targetTab = 'dashboard';

    if (rawHash.startsWith('admin-dashboard-panel') || rawHash.startsWith('admin')) {
      if (rawHash.includes('enquir')) {
        cleanPath = '/admin-dashboard-panel/enquiries';
        targetTab = 'enquiries';
      } else if (rawHash.includes('event')) {
        cleanPath = '/admin-dashboard-panel/events';
        targetTab = 'events';
      } else if (rawHash.includes('setting')) {
        cleanPath = '/admin-dashboard-panel/settings';
        targetTab = 'settings';
      } else {
        cleanPath = '/admin-dashboard-panel';
        targetTab = 'dashboard';
      }
      window.history.replaceState(null, '', cleanPath);
      return { view: 'admin', adminTab: targetTab };
    } else if (['events', 'gallery', 'services', 'about', 'why-us', 'contact', 'home'].includes(rawHash)) {
      const page = rawHash === 'why-us' ? 'about' : (rawHash === 'home' ? '' : rawHash);
      cleanPath = page ? `/${page}` : '/';
      window.history.replaceState(null, '', cleanPath);
      return { view: page || 'home', adminTab: 'dashboard' };
    }
  }

  // Pure path-based routing (NO HASHTAG)
  if (pathname.startsWith('/admin-dashboard-panel') || pathname.startsWith('/admin')) {
    let adminTab = 'dashboard';
    if (pathname.includes('/enquiries') || pathname.includes('/enquiry')) {
      adminTab = 'enquiries';
    } else if (pathname.includes('/events') || pathname.includes('/event')) {
      adminTab = 'events';
    } else if (pathname.includes('/settings') || pathname.includes('/setting')) {
      adminTab = 'settings';
    }

    // Normalize legacy /admin paths to /admin-dashboard-panel
    if (pathname.startsWith('/admin/')) {
      const sub = pathname.replace('/admin/', '');
      window.history.replaceState(null, '', `/admin-dashboard-panel/${sub}`);
    } else if (pathname === '/admin') {
      window.history.replaceState(null, '', '/admin-dashboard-panel');
    }

    return { view: 'admin', adminTab };
  }

  if (pathname === '/events' || pathname.startsWith('/events/')) return { view: 'events', adminTab: 'dashboard' };
  if (pathname === '/gallery' || pathname.startsWith('/gallery/')) return { view: 'gallery', adminTab: 'dashboard' };
  if (pathname === '/services' || pathname.startsWith('/services/')) return { view: 'services', adminTab: 'dashboard' };
  if (pathname === '/about' || pathname === '/why-us' || pathname.startsWith('/about/')) return { view: 'about', adminTab: 'dashboard' };
  if (pathname === '/contact' || pathname.startsWith('/contact/')) return { view: 'contact', adminTab: 'dashboard' };

  return { view: 'home', adminTab: 'dashboard' };
}

export default function App() {
  const { isAuthenticated, logout } = useAdminAuth();
  const initialRoute = resolveCurrentRoute();
  const [currentView, setCurrentView] = useState(initialRoute.view);
  const [adminTab, setAdminTab] = useState(initialRoute.adminTab);


  const [consultationOpen, setConsultationOpen] = useState(false);
  const [initialCategory, setInitialCategory] = useState('Wedding');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState({
    videoId: 'ukndWsCg0ZY',
    title: 'Traditional South Indian Wedding & Mandap Decor',
    category: 'South Indian Wedding Decoration'
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Open video modal with optional specific video object or ID
  const handleOpenVideo = (videoArg = 'ukndWsCg0ZY') => {
    if (typeof videoArg === 'object' && videoArg !== null) {
      setActiveVideo({
        videoId: videoArg.id || videoArg.videoId || 'ukndWsCg0ZY',
        title: videoArg.title || 'Traditional South Indian Wedding & Mandap Decor',
        category: videoArg.tag || videoArg.category || 'South Indian Wedding Decoration'
      });
    } else {
      setActiveVideo({
        videoId: typeof videoArg === 'string' && videoArg ? videoArg : 'ukndWsCg0ZY',
        title: 'Traditional South Indian Wedding & Mandap Decor',
        category: 'South Indian Wedding Decoration'
      });
    }
    setVideoModalOpen(true);
  };



  // Open consultation modal with specified category
  const handleOpenConsultation = (category = 'Wedding') => {
    setInitialCategory(typeof category === 'string' ? category : 'Wedding');
    setConsultationOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  // General page navigation (using clean path URLs without hashtags)
  const handleNavigatePage = useCallback((pageName) => {
    const validViews = ['home', 'events', 'gallery', 'services', 'about', 'contact', 'admin'];
    const target = pageName === 'why-us' ? 'about' : pageName;
    if (validViews.includes(target)) {
      setCurrentView(target);
      let targetPath = '/';
      if (target === 'admin') {
        targetPath = '/admin-dashboard-panel';
        setAdminTab('dashboard');
      } else if (target !== 'home') {
        targetPath = `/${target}`;
      }
      window.history.pushState(null, '', targetPath);
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
    window.history.pushState(null, '', '/');

    // Scroll to section after state update
    if (sectionId && sectionId !== 'home') {
      setTimeout(() => {
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
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [handleNavigatePage]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = resolveCurrentRoute();
      setCurrentView(route.view);
      setAdminTab(route.adminTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // If viewing admin portal, protect with dummy authentication
  if (currentView === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={() => {
            // State update in context causes automatic transition to AdminLayout
          }}
          onBackToSite={() => handleNavigatePage('home')}
        />
      );
    }

    return (
      <AdminLayout 
        onExitAdmin={() => handleNavigatePage('home')}
        onLogout={() => {
          logout();
        }}
        initialTab={adminTab || 'dashboard'}
      />
    );
  }


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
            onOpenVideo={handleOpenVideo}
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
        videoId={activeVideo.videoId}
        title={activeVideo.title}
        category={activeVideo.category}
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
