import express from 'express';
import { initialEvents } from '../data/eventsData.js';

const router = express.Router();

// In-memory data store
let events = [...initialEvents];

// GET /api/events - Retrieve events with optional filtering & search
router.get('/', (req, res) => {
  try {
    const { search, category } = req.query;
    let filtered = [...events];

    if (category && category !== 'All') {
      filtered = filtered.filter(evt => evt.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(evt => 
        evt.title.toLowerCase().includes(q) ||
        evt.location.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.organizer.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      total: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/events/:id - Get single event details
router.get('/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

// POST /api/events - Create a new event
router.post('/', (req, res) => {
  try {
    const { title, category, date, time, location, description, price, capacity, image, organizer } = req.body;

    if (!title || !category || !date || !location) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, category, date, and location are required.'
      });
    }

    const newEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      date,
      time: time || '10:00 AM - 04:00 PM',
      location,
      description: description || '',
      price: Number(price) || 0,
      capacity: Number(capacity) || 100,
      registeredCount: 0,
      image: image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      organizer: organizer || 'Community Host',
      status: 'Upcoming'
    };

    events.unshift(newEvent);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/events/:id/register - RSVP / Register for an event
router.post('/:id/register', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  if (event.registeredCount >= event.capacity) {
    return res.status(400).json({ success: false, message: 'Event is at full capacity!' });
  }

  event.registeredCount += 1;
  res.json({
    success: true,
    message: 'Registered successfully!',
    data: event
  });
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', (req, res) => {
  const initialLength = events.length;
  events = events.filter(e => e.id !== req.params.id);

  if (events.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.json({ success: true, message: 'Event deleted successfully' });
});

export default router;
