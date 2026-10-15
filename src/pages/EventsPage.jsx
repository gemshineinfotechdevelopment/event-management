import React, { useState, useMemo } from 'react';
import EventsHero from '../components/events/EventsHero';
import EventCategoryTabs from '../components/events/EventCategoryTabs';
import EventCard from '../components/events/EventCard';
import UpcomingEventsSidebar from '../components/events/UpcomingEventsSidebar';
import EventsCTA from '../components/events/EventsCTA';
import EventDetailsModal from '../components/events/EventDetailsModal';

import { getEventsByCategory } from '../data/eventsPageData';

export default function EventsPage({ onOpenConsultation }) {
  // 'all' is the default active category as shown in the reference image
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Selected event for interactive details modal
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get displayed events based on active category
  const displayedEvents = useMemo(() => {
    return getEventsByCategory(activeCategory);
  }, [activeCategory]);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. Cinematic Hero Banner */}
      <EventsHero />

      {/* 2. Event Categories Section with 7 Filter Tabs */}
      <EventCategoryTabs 
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main Event Cards Grid + Right Sidebar Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start">
          
          {/* Left Column: 3-Column Event Card Grid (Desktop) */}
          <div className="flex-1 w-full">
            {displayedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-6">
                {displayedEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onSelectEvent={handleSelectEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E5DAC6] p-12 text-center shadow-xs">
                <p className="font-serif-luxury text-xl font-bold text-[#1C1610] mb-2">
                  No events found in this category
                </p>
                <p className="text-xs text-[#5C4F41] mb-6">
                  Check out all our upcoming celebrations or plan your custom event today.
                </p>
                <button
                  onClick={() => setActiveCategory('all')}
                  className="px-6 py-2.5 rounded-full bg-[#0D1527] text-white text-xs font-semibold hover:bg-[#15233D] transition-colors"
                >
                  View All Events
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Upcoming Events Sidebar (Moves below cards on mobile) */}
          <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0">
            <UpcomingEventsSidebar 
              onSelectEvent={handleSelectEvent}
              onOpenConsultation={() => onOpenConsultation(activeCategory !== 'all' ? activeCategory : 'General')}
            />
          </div>

        </div>
      </main>

      {/* 4. Bottom Call-To-Action Banner */}
      <EventsCTA 
        onOpenConsultation={() => onOpenConsultation('Consultation')}
      />

      {/* 5. Dedicated Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onPlanEvent={(category) => {
          setSelectedEvent(null);
          onOpenConsultation(category);
        }}
      />

    </div>
  );
}
