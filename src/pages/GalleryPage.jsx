import React, { useState, useMemo } from 'react';
import GalleryHero from '../components/gallery/GalleryHero';
import CategoryFilters from '../components/gallery/CategoryFilters';
import MainGalleryGrid from '../components/gallery/MainGalleryGrid';
import EventAlbumsSidebar from '../components/gallery/EventAlbumsSidebar';
import PhotoPreviewLightbox from '../components/gallery/PhotoPreviewLightbox';
import GalleryPagination from '../components/gallery/GalleryPagination';
import GalleryCTA from '../components/gallery/GalleryCTA';

import { 
  CATEGORIES, 
  ALBUMS, 
  INITIAL_GALLERY_CARDS, 
  ADDITIONAL_PAGES_CARDS 
} from '../data/galleryData';

export default function GalleryPage({ onOpenConsultation }) {
  // State for active category: starts at 'wedding' or 'all'
  const [activeCategory, setActiveCategory] = useState('wedding');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Interactive preview panel state
  const [previewOpen, setPreviewOpen] = useState(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState('wedding');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Full-screen modal state if user clicks maximize
  const [fullScreenModalOpen, setFullScreenModalOpen] = useState(false);

  // Find active album details
  const activeAlbum = useMemo(() => {
    return ALBUMS.find(a => a.id.toLowerCase() === selectedAlbumId.toLowerCase()) || ALBUMS[0];
  }, [selectedAlbumId]);

  // Current photo in the active album
  const currentPhoto = useMemo(() => {
    if (!activeAlbum || !activeAlbum.photos || activeAlbum.photos.length === 0) {
      return { url: '/gallery-hero.jpg', title: 'Grand Wedding Ceremony' };
    }
    return activeAlbum.photos[activePhotoIndex] || activeAlbum.photos[0];
  }, [activeAlbum, activePhotoIndex]);

  // Filter gallery cards based on activeCategory
  const displayedCards = useMemo(() => {
    if (activeCategory.toLowerCase() === 'all') {
      return INITIAL_GALLERY_CARDS;
    }

    const currentAlbum = ALBUMS.find(
      a => a.id.toLowerCase() === activeCategory.toLowerCase()
    );

    if (currentAlbum && currentAlbum.photos && currentAlbum.photos.length > 0) {
      return currentAlbum.photos.map((photo, idx) => ({
        id: photo.id,
        category: currentAlbum.category,
        title: photo.title,
        eventTitle: currentAlbum.title,
        photoCount: currentAlbum.photos.length,
        image: photo.url,
        gridClass: idx === 0 ? 'col-span-1 lg:row-span-2 min-h-[360px] lg:min-h-[440px]' : 'col-span-1 min-h-[190px] lg:min-h-[210px]',
        showBadge: true,
        hasActionArrow: true,
        location: currentAlbum.location,
        albumId: currentAlbum.id,
        description: photo.caption
      }));
    }

    return INITIAL_GALLERY_CARDS.filter(card => 
      card.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      card.albumId?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  // Handlers
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);

    if (catId !== 'all') {
      setSelectedAlbumId(catId);
      setActivePhotoIndex(0);
      setPreviewOpen(true);
    }
  };

  const handleSelectAlbum = (albumId) => {
    setActiveCategory(albumId);
    setSelectedAlbumId(albumId);
    setActivePhotoIndex(0);
    setCurrentPage(1);
    setPreviewOpen(true);

    const el = document.getElementById('interactive-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSelectCard = (card) => {
    if (card.albumId) {
      setSelectedAlbumId(card.albumId);
    }
    setPreviewOpen(true);

    const targetAlbum = ALBUMS.find(a => a.id === card.albumId) || activeAlbum;
    const photoIdx = targetAlbum?.photos?.findIndex(p => p.url === card.image);
    setActivePhotoIndex(photoIdx !== -1 ? photoIdx : 0);

    const el = document.getElementById('interactive-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleNextPhoto = () => {
    if (!activeAlbum?.photos?.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % activeAlbum.photos.length);
  };

  const handlePrevPhoto = () => {
    if (!activeAlbum?.photos?.length) return;
    setActivePhotoIndex((prev) => (prev - 1 + activeAlbum.photos.length) % activeAlbum.photos.length);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById('gallery-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Hero Section */}
      <GalleryHero />

      {/* 2. Event Category Filters */}
      <CategoryFilters 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main Gallery Grid & Event Albums Sidebar */}
      <main id="gallery-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full scroll-mt-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left / Main Gallery Grid (col-span-9 on desktop ~75%) */}
          <div className="lg:col-span-9 w-full">
            <MainGalleryGrid 
              cards={displayedCards}
              onSelectCard={handleSelectCard}
              selectedPhotoId={currentPhoto?.url}
            />
          </div>

          {/* Right Sidebar: Event Albums (col-span-3 on desktop ~25%) */}
          <div className="lg:col-span-3 w-full">
            <EventAlbumsSidebar 
              albums={ALBUMS}
              activeCategory={activeCategory}
              onSelectAlbum={handleSelectAlbum}
              onRequestFullGallery={() => onOpenConsultation(activeCategory || 'Wedding')}
            />
          </div>

        </div>

        {/* 4. Interactive Photo Preview / Lightbox Section */}
        {previewOpen && (
          <PhotoPreviewLightbox 
            isOpen={previewOpen}
            onClose={() => setPreviewOpen(false)}
            currentPhoto={currentPhoto}
            album={activeAlbum}
            currentIndex={activePhotoIndex}
            onSelectIndex={(idx) => setActivePhotoIndex(idx)}
            onNext={handleNextPhoto}
            onPrev={handlePrevPhoto}
            onExpandFullScreen={() => setFullScreenModalOpen(true)}
          />
        )}

        {/* 5. Pagination */}
        <GalleryPagination 
          currentPage={currentPage}
          totalPages={1}
          onPageChange={handlePageChange}
        />

      </main>

      {/* 6. Call-to-Action Section */}
      <GalleryCTA 
        onOpenConsultation={() => onOpenConsultation('Custom')}
      />

      {/* Fullscreen Lightbox Modal if user wants maximized view */}
      {fullScreenModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn"
          onClick={() => setFullScreenModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full rounded-3xl bg-[#090F1C] border border-[#DFC07B]/40 shadow-2xl overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFullScreenModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-[#DFC07B] hover:text-white border border-[#DFC07B]/30 cursor-pointer"
            >
              ✕
            </button>
            <div className="max-h-[75vh] flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden mb-4">
              <img 
                src={currentPhoto.url || currentPhoto.image} 
                alt={currentPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#DFC07B] tracking-wider">
                  {activeAlbum.category}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  {activeAlbum.title}
                </h3>
                <p className="text-xs text-[#B4A999] mt-0.5">
                  {activeAlbum.location} • {activeAlbum.photoCount} Photos
                </p>
              </div>
              <button
                onClick={() => {
                  setFullScreenModalOpen(false);
                  onOpenConsultation(activeAlbum.category);
                }}
                className="px-6 py-2.5 rounded-full bg-[#DFC07B] text-[#0A0E17] text-xs font-bold uppercase tracking-wider hover:bg-[#ECCB7F] transition-all cursor-pointer"
              >
                Inquire This Event
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
