import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Sparkles, 
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  DollarSign,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { PRIMARY_EVENTS } from '../data/eventsPageData';

const PRESET_IMAGES = [
  { label: 'Royal Wedding', url: '/wedding.jpg' },
  { label: 'Grand Banquet', url: '/banquet.jpg' },
  { label: 'Evening Soiree', url: '/cocktail.jpg' },
  { label: 'Celebration Dinner', url: '/dinner.jpg' },
  { label: 'Corporate Gala', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { label: 'Music Festival', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' }
];

export default function AdminEvents() {
  // Initialize immediately from localStorage cache or PRIMARY_EVENTS so it NEVER starts with 0 events
  const [events, setEvents] = useState(() => {
    try {
      const cached = localStorage.getItem('eventora_cached_events');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return PRIMARY_EVENTS;
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State for New Event
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    date: '',
    time: '06:00 PM - 11:30 PM',
    location: '',
    description: '',
    price: '',
    capacity: '350',
    image: '/wedding.jpg',
    organizer: 'Eventora Atelier'
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const loadEvents = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);

    try {
      const res = await api.getEvents();
      const list = res.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list) && list.length > 0) {
        setEvents(list);
        try {
          localStorage.setItem('eventora_cached_events', JSON.stringify(list));
        } catch {}
      } else if (events.length === 0) {
        setEvents(PRIMARY_EVENTS);
      }
    } catch (err) {
      console.warn('Failed to load events from backend:', err);
      if (events.length === 0) {
        setEvents(PRIMARY_EVENTS);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEvents();

    const handleSync = () => {
      loadEvents();
    };

    const handleStorageChange = (e) => {
      if (e.key === 'eventora_events_last_updated' || e.key === 'eventora_cached_events') {
        loadEvents();
      }
    };

    window.addEventListener('eventora_events_changed', handleSync);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleSync);

    return () => {
      window.removeEventListener('eventora_events_changed', handleSync);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  // Filtered Events with robust category & search matching
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (categoryFilter !== 'All') {
        const cat = (evt.category || '').toLowerCase();
        const catId = (evt.categoryId || '').toLowerCase();
        const filter = categoryFilter.toLowerCase();
        const matchesCategory = 
          cat === filter ||
          cat.includes(filter) ||
          filter.includes(cat) ||
          catId.includes(filter) ||
          filter.includes(catId);
        if (!matchesCategory) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          (evt.title || '').toLowerCase().includes(q) ||
          (evt.location || '').toLowerCase().includes(q) ||
          (evt.description || evt.desc || '').toLowerCase().includes(q) ||
          (evt.organizer || '').toLowerCase().includes(q) ||
          (evt.category || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, categoryFilter, searchQuery]);

  // Handle Form Submit
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.createEvent(formData);
      const created = res.data || { ...formData, id: `evt-${Date.now()}` };
      setEvents(prev => {
        const updated = [created, ...prev.filter(e => e.id !== created.id)];
        try {
          localStorage.setItem('eventora_cached_events', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      setModalOpen(false);
      setFormData({
        title: '',
        category: 'Wedding',
        date: '',
        time: '06:00 PM - 11:30 PM',
        location: '',
        description: '',
        price: '',
        capacity: '350',
        image: '/wedding.jpg',
        organizer: 'Eventora Atelier'
      });
      showToast('New event created and added to showcase!');
      
      // Dispatch real-time updates for user side (EventsPage, HomeFeaturedEvents, UpcomingEventsSidebar)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eventora_events_changed', { detail: created }));
        localStorage.setItem('eventora_events_last_updated', Date.now().toString());
      }
    } catch (err) {
      alert('Error creating event: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteEvent = async (id) => {
    setDeleting(true);
    try {
      await api.deleteEvent(id);
      setEvents(prev => {
        const updated = prev.filter(e => e.id !== id);
        try {
          localStorage.setItem('eventora_cached_events', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      setDeleteId(null);
      showToast('Event removed successfully.');

      // Dispatch real-time removal update for user side
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('eventora_events_changed', { detail: { deletedId: id } }));
        localStorage.setItem('eventora_events_last_updated', Date.now().toString());
      }
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div className="px-5 py-3 rounded-2xl bg-[#0D1527] border border-[#DFC07B] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#DFC07B]" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 p-4 sm:p-6 rounded-3xl border border-[#DFC07B]/30 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC07B]/15 text-[#DFC07B] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio & Showcase Management</span>
          </div>
          <h1 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white">
            Events & Celebrations Catalog
          </h1>
          <p className="text-xs text-[#A0988A] mt-1 max-w-xl">
            Manage upcoming galas, grand weddings, and signature celebrations featured across the website.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => loadEvents(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC07B] border border-white/10 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            title="Refresh Events"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-102 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className="bg-[#0F172A]/90 p-4 sm:p-5 rounded-3xl border border-white/10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title, venue, location, organizer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] text-xs focus:outline-none focus:border-[#DFC07B]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#DFC07B] shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#DFC07B]"
          >
            <option value="All">All Categories ({events.length})</option>
            <option value="Wedding">Weddings</option>
            <option value="Engagement">Engagements</option>
            <option value="Birthday">Birthdays</option>
            <option value="Corporate">Corporate Galas</option>
            <option value="Baby Shower">Baby Showers</option>
            <option value="Private Party">Private Parties</option>
          </select>
        </div>

      </div>

      {/* 3. Events Grid */}
      {loading ? (
        <div className="py-24 text-center text-[#A0988A] flex flex-col items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-[#DFC07B] mb-3" />
          <p className="text-sm font-medium text-white">Loading Celebrations Portfolio...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="py-20 px-4 text-center text-[#A0988A] bg-[#0F172A]/90 rounded-3xl border border-white/10">
          <Calendar className="w-12 h-12 mx-auto text-white/20 mb-3" />
          <h3 className="font-serif-luxury text-lg text-white font-bold mb-1">
            No events match your criteria
          </h3>
          <p className="text-xs text-[#8C7E6C] max-w-sm mx-auto">
            Try adjusting your search terms or create a new event showcase.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-[#DFC07B] text-[#0A0E1A] text-xs font-semibold cursor-pointer"
          >
            Create First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <div 
              key={evt.id}
              className="bg-[#0F172A]/90 rounded-3xl border border-white/10 hover:border-[#DFC07B]/40 shadow-xl overflow-hidden flex flex-col transition-all group"
            >
              {/* Event Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <img 
                  src={evt.image || evt.thumbnail || '/wedding.jpg'} 
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#DFC07B]/50 text-[#ECCB7F] text-[10px] font-bold uppercase tracking-wider">
                  {evt.category}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteId(evt.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/70 hover:bg-red-500/80 text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Delete Event"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Date badge */}
                <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1.5 drop-shadow-md">
                  <Calendar className="w-3.5 h-3.5 text-[#DFC07B]" />
                  <span>{evt.date || evt.dateBadge?.fullDate || 'Upcoming 2026'}</span>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-base font-bold text-white line-clamp-1 group-hover:text-[#DFC07B] transition-colors">
                    {evt.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#A0988A] mt-1.5 line-clamp-1">
                    <MapPin className="w-3 h-3 text-[#DFC07B] shrink-0" />
                    <span>{evt.location || 'Eventora Atelier, Chennai'}</span>
                  </div>

                  <p className="text-xs text-[#C9BFB5] mt-3 line-clamp-2 leading-relaxed">
                    {evt.description || evt.desc || 'Exclusive luxury celebration curated by Eventora master artisans.'}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8C7E6C]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#DFC07B]" />
                    <span className="text-white font-medium">{evt.capacity ? `${evt.capacity} Guests` : (evt.guestCapacity || '350 Guests')}</span>
                  </div>

                  <span className="text-[#DFC07B] font-semibold text-xs">
                    {evt.price > 0 ? `₹${evt.price}` : 'Bespoke Inquiry'}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* 4. Modal: Add New Event */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl rounded-3xl bg-[#0D1527] border border-[#DFC07B]/40 shadow-2xl p-4 sm:p-8 text-white max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#DFC07B] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5 sm:mb-6 pb-4 border-b border-white/10">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mt-1">
                Add New Event / Celebration
              </h2>
              <p className="text-xs text-[#A0988A] mt-1">
                Publish a new bespoke celebration to showcase in the website's events section.
              </p>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-[#EFEAE2] font-semibold mb-1.5">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Royal Udaipur Palace Wedding"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] focus:outline-none focus:border-[#DFC07B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#EFEAE2] font-semibold mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#DFC07B]"
                  >
                    <option value="Wedding">Grand Wedding Ceremony</option>
                    <option value="Engagement">Royal Engagement</option>
                    <option value="Corporate">Corporate Gala & Awards</option>
                    <option value="Birthday">Bespoke Birthday Party</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Private Party">Private Celebration</option>
                    <option value="Music & Arts">Music & Arts Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#EFEAE2] font-semibold mb-1.5">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#DFC07B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#EFEAE2] font-semibold mb-1.5">Venue & City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Taj Lake Palace, Udaipur"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] focus:outline-none focus:border-[#DFC07B]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFEAE2] font-semibold mb-1.5">Guest Capacity</label>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] focus:outline-none focus:border-[#DFC07B]"
                  />
                </div>
              </div>

              {/* Preset Image Chooser */}
              <div>
                <label className="block text-[#EFEAE2] font-semibold mb-1.5">Showcase Cover Image</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className={`relative rounded-xl overflow-hidden h-14 border-2 transition-all cursor-pointer ${
                        formData.image === img.url ? 'border-[#DFC07B] scale-102 ring-2 ring-[#DFC07B]/40' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute inset-0 bg-black/40 text-[9px] font-bold text-white flex items-end p-1 leading-none">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] focus:outline-none focus:border-[#DFC07B] text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[#EFEAE2] font-semibold mb-1.5">Description & Concept</label>
                <textarea
                  rows={3}
                  placeholder="Describe the celebration theme, decor highlights, and artisan curation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] focus:outline-none focus:border-[#DFC07B] resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] font-bold uppercase tracking-wider shadow-lg hover:scale-102 transition-all cursor-pointer disabled:opacity-60 text-center"
                >
                  {submitting ? 'Creating...' : 'Publish Event'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-[#0D1527] border border-red-500/40 p-5 sm:p-6 text-white text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-serif-luxury text-lg font-bold mb-2">Delete this celebration showcase?</h3>
            <p className="text-xs text-[#8C7E6C] mb-6">
              This event will be permanently removed from the public website portfolio.
            </p>
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={() => handleDeleteEvent(deleteId)}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-md cursor-pointer disabled:opacity-50 text-center"
              >
                {deleting ? 'Deleting...' : 'Delete Event'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
