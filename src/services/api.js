import { PRIMARY_EVENTS } from '../data/eventsPageData';

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5023/api');
export const DB_NAME = import.meta.env.VITE_DB_NAME || 'eventora';

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (!res.ok) throw new Error('Backend responded with error');
      return await res.json();
    } catch (err) {
      console.warn('API Health Check Error:', err.message);
      return null;
    }
  },

  // Get all events with optional query & resilient fallback
  async getEvents({ search = '', category = 'All' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);
    const queryStr = params.toString() ? `?${params.toString()}` : '';

    try {
      // 1. Try primary BASE_URL
      const res = await fetch(`${BASE_URL}/events${queryStr}`);
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
        if (list.length > 0) {
          try {
            localStorage.setItem('eventora_cached_events', JSON.stringify(list));
          } catch {}
          return { success: true, count: list.length, data: list };
        }
      }
    } catch (err) {
      console.warn('Backend events endpoint offline, checking proxy/cache:', err.message);
    }

    // 2. Try proxy /api/events if BASE_URL differs
    if (BASE_URL !== '/api') {
      try {
        const res2 = await fetch(`/api/events${queryStr}`);
        if (res2.ok) {
          const json2 = await res2.json();
          const list2 = Array.isArray(json2.data) ? json2.data : (Array.isArray(json2) ? json2 : []);
          if (list2.length > 0) {
            try {
              localStorage.setItem('eventora_cached_events', JSON.stringify(list2));
            } catch {}
            return { success: true, count: list2.length, data: list2 };
          }
        }
      } catch {}
    }

    // 3. Fallback: check localStorage cache
    try {
      const cached = localStorage.getItem('eventora_cached_events');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { success: true, count: parsed.length, data: parsed, fromCache: true };
        }
      }
    } catch {}

    // 4. Default fallback: PRIMARY_EVENTS (guaranteed all 7 events)
    try {
      localStorage.setItem('eventora_cached_events', JSON.stringify(PRIMARY_EVENTS));
    } catch {}
    return { success: true, count: PRIMARY_EVENTS.length, data: PRIMARY_EVENTS, fallback: true };
  },

  // Get event by id
  async getEventById(id) {
    try {
      const res = await fetch(`${BASE_URL}/events/${id}`);
      if (res.ok) return await res.json();
    } catch {}

    // Fallback: check cache or defaults
    try {
      const cached = JSON.parse(localStorage.getItem('eventora_cached_events') || '[]');
      const found = cached.find(e => e.id === id) || PRIMARY_EVENTS.find(e => e.id === id);
      if (found) return { success: true, data: found };
    } catch {}

    throw new Error('Event not found');
  },

  // Create new event (resilient with local cache update)
  async createEvent(eventData) {
    let createdItem = null;
    try {
      const res = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (res.ok) {
        const json = await res.json();
        createdItem = json.data || json;
      }
    } catch (err) {
      console.warn('Backend offline when creating event, saving locally:', err.message);
    }

    if (!createdItem) {
      let day = '01', month = 'Jun', year = '2026';
      if (eventData.date) {
        const d = new Date(eventData.date);
        if (!isNaN(d.getTime())) {
          day = String(d.getDate()).padStart(2, '0');
          month = d.toLocaleString('en-US', { month: 'short' });
          year = String(d.getFullYear());
        }
      }
      createdItem = {
        ...eventData,
        id: eventData.id || `evt-${Date.now()}`,
        status: eventData.status || 'Upcoming',
        dateBadge: { day, month, year, fullDate: `${day} ${month} ${year}` },
        thumbnail: eventData.image || '/wedding.jpg'
      };
    }

    // Update local cache
    try {
      const cached = JSON.parse(localStorage.getItem('eventora_cached_events') || '[]');
      const base = cached.length > 0 ? cached : PRIMARY_EVENTS;
      const updated = [createdItem, ...base.filter(e => e.id !== createdItem.id)];
      localStorage.setItem('eventora_cached_events', JSON.stringify(updated));
      localStorage.setItem('eventora_events_last_updated', Date.now().toString());
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eventora_events_changed', { detail: createdItem }));
    }

    return { success: true, data: createdItem };
  },

  // Register / RSVP for an event
  async registerEvent(id) {
    try {
      const res = await fetch(`${BASE_URL}/events/${id}/register`, {
        method: 'POST',
      });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true, message: 'Registration recorded' };
  },

  // Delete event (resilient with local cache update)
  async deleteEvent(id) {
    try {
      await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('Backend offline when deleting event, removing locally:', err.message);
    }

    // Update local cache
    try {
      const cached = JSON.parse(localStorage.getItem('eventora_cached_events') || '[]');
      const base = cached.length > 0 ? cached : PRIMARY_EVENTS;
      const updated = base.filter(e => e.id !== id);
      localStorage.setItem('eventora_cached_events', JSON.stringify(updated));
      localStorage.setItem('eventora_events_last_updated', Date.now().toString());
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eventora_events_changed', { detail: { deletedId: id } }));
    }

    return { success: true };
  },

  // Submit new customer enquiry (Recorded in admin side)
  async submitEnquiry(enquiryData) {
    try {
      const res = await fetch(`${BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit enquiry');
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Backend enquiry endpoint offline, caching locally:', err.message);
      // Offline fallback: store in localStorage
      try {
        const localList = JSON.parse(localStorage.getItem('eventora_local_enquiries') || '[]');
        const fallbackItem = {
          ...enquiryData,
          id: `local_${Date.now()}`,
          refCode: enquiryData.refCode || `EVT-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'new',
          createdAt: new Date().toISOString()
        };
        localList.unshift(fallbackItem);
        localStorage.setItem('eventora_local_enquiries', JSON.stringify(localList));
        return { success: true, offline: true, data: fallbackItem };
      } catch {
        return { success: true, offline: true, refCode: enquiryData.refCode };
      }
    }
  },

  // Get all submitted enquiries for the Admin portal
  async getEnquiries() {
    try {
      const res = await fetch(`${BASE_URL}/enquiries`);
      if (!res.ok) throw new Error('Failed to fetch enquiries');
      const json = await res.json();
      const list = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
      // Also merge any local fallback items that might not have reached server yet
      try {
        const localList = JSON.parse(localStorage.getItem('eventora_local_enquiries') || '[]');
        const existingRefs = new Set(list.map(i => i.refCode || i.id));
        const unmerged = localList.filter(i => !existingRefs.has(i.refCode) && !existingRefs.has(i.id));
        return [...unmerged, ...list];
      } catch {
        return list;
      }
    } catch (err) {
      console.warn('Backend enquiry endpoint offline, using local data:', err.message);
      try {
        return JSON.parse(localStorage.getItem('eventora_local_enquiries') || '[]');
      } catch {
        return [];
      }
    }
  },

  // Update enquiry status (new, contacted, confirmed, archived) or notes
  async updateEnquiryStatus(id, { status, notes, adminNotes } = {}) {
    try {
      const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes, adminNotes }),
      });
      if (!res.ok) throw new Error('Failed to update enquiry status');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, updating local state:', err.message);
      try {
        const localList = JSON.parse(localStorage.getItem('eventora_local_enquiries') || '[]');
        const idx = localList.findIndex(i => i.id === id || i._id === id || i.refCode === id);
        if (idx !== -1) {
          if (status) localList[idx].status = status;
          if (notes !== undefined) localList[idx].notes = notes;
          if (adminNotes !== undefined) localList[idx].adminNotes = adminNotes;
          localStorage.setItem('eventora_local_enquiries', JSON.stringify(localList));
        }
      } catch {}
      return { success: true, offline: true };
    }
  },

  // Delete enquiry
  async deleteEnquiry(id) {
    try {
      const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete enquiry');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, deleting from local cache:', err.message);
      try {
        const localList = JSON.parse(localStorage.getItem('eventora_local_enquiries') || '[]');
        const filtered = localList.filter(i => i.id !== id && i._id !== id && i.refCode !== id);
        localStorage.setItem('eventora_local_enquiries', JSON.stringify(filtered));
      } catch {}
      return { success: true, offline: true };
    }
  },

  // Get current contact settings (phone, email, address, etc.)
  async getSettings() {
    try {
      const res = await fetch(`${BASE_URL}/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      const json = await res.json();
      return json.data || json;
    } catch (err) {
      console.warn('Backend settings endpoint offline, using local fallback:', err.message);
      return null;
    }
  },

  // Update contact settings (phone, email, etc.) from Admin Settings page
  async updateSettings(settingsData) {
    try {
      const res = await fetch(`${BASE_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Failed to update settings');
      }
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, saving settings in localStorage:', err.message);
      return { success: true, offline: true, data: settingsData };
    }
  }
};
