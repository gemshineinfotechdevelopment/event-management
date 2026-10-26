import React, { useState, useEffect, useMemo, useCallback } from 'react';
import EventsHero from '../components/events/EventsHero';
import EventCategoryTabs from '../components/events/EventCategoryTabs';
import EventCard from '../components/events/EventCard';
import UpcomingEventsSidebar from '../components/events/UpcomingEventsSidebar';
import EventsCTA from '../components/events/EventsCTA';
import EventDetailsModal from '../components/events/EventDetailsModal';

import { PRIMARY_EVENTS, ADDITIONAL_CATEGORY_EVENTS } from '../data/eventsPageData';
import { api } from '../services/api';

export default function EventsPage({ onOpenConsultation }) {
  // 'all' is the default active category
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Selected event for interactive details modal
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Dynamic events state initialized with the 6 default primary events
  const [eventsList, setEventsList] = useState(PRIMARY_EVENTS);
  const [loading, setLoading] = useState(true);

  // Fetch live events from the backend (reflects newly created admin events)
  const loadLiveEvents = useCallback(async () => {
    try {
      const res = await api.getEvents();
      const data = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(data) && data.length > 0) {
        setEventsList(data);
      }
    } catch (err) {
      console.warn('Backend events offline, using initial defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiveEvents();

    // Listen to real-time additions/edits from admin side
    const handleEventsUpdated = () => {
      loadLiveEvents();
    };

    const handleStorageChange = (e) => {
      if (e.key === 'eventora_events_last_updated') {
        loadLiveEvents();
      }
    };

    window.addEventListener('eventora_events_changed', handleEventsUpdated);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleEventsUpdated);

    return () => {
      window.removeEventListener('eventora_events_changed', handleEventsUpdated);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleEventsUpdated);
    };
  }, [loadLiveEvents]);

  // Get displayed events based on active category
  const displayedEvents = useMemo(() => {
    if (activeCategory === 'all') {
      return eventsList;
    }

    const catLower = activeCategory.toLowerCase();

    // 1. Filter from live events list
    const primaryFiltered = eventsList.filter((evt) => {
      const c = (evt.category || '').toLowerCase();
      const cid = (evt.categoryId || '').toLowerCase();
      return (
        c === catLower ||
        cid === catLower ||
        c.startsWith(catLower.slice(0, 4)) ||
        catLower.startsWith(c.slice(0, 4)) ||
        c.includes(catLower) ||
        catLower.includes(c)
      );
    });

    // 2. Add extra category template showcases if not already in list
    const additionalFiltered = ADDITIONAL_CATEGORY_EVENTS.filter(
      (e) => e.categoryId.toLowerCase() === catLower && !eventsList.some((el) => el.id === e.id)
    );

    return [...primaryFiltered, ...additionalFiltered];
  }, [eventsList, activeCategory]);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full flex flex-col animate-fadeIn">
      
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
                  className="px-6 py-2.5 rounded-full bg-[#0D1527] text-white text-xs font-semibold hover:bg-[#15233D] transition-colors cursor-pointer"
                >
                  View All Events
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Upcoming Events Sidebar (Moves below cards on mobile) */}
          <div className="w-full lg:w-[320px] xl:w-[340px] shrink-0">
            <UpcomingEventsSidebar 
              events={eventsList}
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
