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

  // Get all events with optional query
  async getEvents({ search = '', category = 'All' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'All') params.append('category', category);

    const res = await fetch(`${BASE_URL}/events?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch events: ${res.statusText}`);
    return await res.json();
  },

  // Get event by id
  async getEventById(id) {
    const res = await fetch(`${BASE_URL}/events/${id}`);
    if (!res.ok) throw new Error('Event not found');
    return await res.json();
  },

  // Create new event
  async createEvent(eventData) {
    const res = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create event');
    }
    return await res.json();
  },

  // Register / RSVP for an event
  async registerEvent(id) {
    const res = await fetch(`${BASE_URL}/events/${id}/register`, {
      method: 'POST',
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to register');
    }
    return await res.json();
  },

  // Delete event
  async deleteEvent(id) {
    const res = await fetch(`${BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return await res.json();
  },

  // Submit new customer enquiry (dispatches background WhatsApp notification)
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
      return await res.json();
    } catch (err) {
      console.warn('Backend enquiry endpoint offline or unreachable, handled gracefully:', err.message);
      return { success: true, offline: true, refCode: enquiryData.refCode };
    }
  }
};
