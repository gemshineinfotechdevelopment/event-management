import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialEvents } from '../data/eventsData.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EVENTS_FILE = path.join(__dirname, '..', 'data', 'events.json');

// Resilient file storage helpers
function loadEventsFromFile() {
  try {
    if (!fs.existsSync(EVENTS_FILE)) {
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(initialEvents, null, 2), 'utf-8');
      return initialEvents;
    }
    const data = fs.readFileSync(EVENTS_FILE, 'utf-8');
    const parsed = JSON.parse(data || '[]');
    return parsed.length > 0 ? parsed : initialEvents;
  } catch (err) {
    console.error('Error loading events from file, using defaults:', err);
    return initialEvents;
  }
}

function saveEventsToFile(eventsList) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(eventsList, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving events to backup file:', err);
  }
}

// In-memory synced list
let events = loadEventsFromFile();

// GET /api/events - Retrieve events with optional filtering & search
router.get('/', (req, res) => {
  try {
    // Refresh from file to ensure sync
    events = loadEventsFromFile();
    const { search, category } = req.query;
    let filtered = [...events];

    if (category && category !== 'All' && category !== 'all') {
      const catLower = category.toLowerCase();
      filtered = filtered.filter(evt => {
        const itemCat = (evt.category || '').toLowerCase();
        const itemCatId = (evt.categoryId || '').toLowerCase();
        return itemCat === catLower || itemCatId === catLower || itemCat.includes(catLower) || catLower.includes(itemCat);
      });
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(evt => 
        (evt.title || '').toLowerCase().includes(q) ||
        (evt.location || '').toLowerCase().includes(q) ||
        (evt.description || evt.desc || '').toLowerCase().includes(q) ||
        (evt.organizer || '').toLowerCase().includes(q)
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
  events = loadEventsFromFile();
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }
  res.json({ success: true, data: event });
});

// POST /api/events - Create a new event (adds to admin side & reflects on user side)
router.post('/', (req, res) => {
  try {
    const { title, category, date, time, location, description, price, capacity, image, organizer } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title and category are required.'
      });
    }

    // Format dateBadge for user-side display
    let day = '01';
    let month = 'Jan';
    let year = '2026';
    if (date) {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
        day = String(d.getDate()).padStart(2, '0');
        month = d.toLocaleString('en-US', { month: 'short' });
        year = String(d.getFullYear());
      }
    }
    const dateBadge = {
      day,
      month,
      year,
      fullDate: `${day} ${month} ${year}`
    };

    // Category identifier for filter tabs
    const catClean = String(category).toLowerCase();
    let categoryId = 'weddings';
    if (catClean.includes('wedding')) categoryId = 'weddings';
    else if (catClean.includes('engage')) categoryId = 'engagements';
    else if (catClean.includes('birth')) categoryId = 'birthdays';
    else if (catClean.includes('corp')) categoryId = 'corporate';
    else if (catClean.includes('baby')) categoryId = 'babyshowers';
    else if (catClean.includes('party') || catClean.includes('private')) categoryId = 'privateparties';

    const newEvent = {
      id: `evt-${Date.now()}`,
      title: String(title).trim(),
      category: String(category).trim(),
      categoryId,
      date: date || '2026-06-01',
      dateBadge,
      time: time || '06:00 PM Onwards',
      location: location ? String(location).trim() : 'Eventora Private Pavilion, Chennai',
      desc: description || 'A signature luxury celebration curated by Eventora master artisans.',
      description: description || 'A signature luxury celebration curated by Eventora master artisans.',
      longDesc: description || 'A signature luxury celebration curated by Eventora master artisans.',
      price: Number(price) || 0,
      capacity: Number(capacity) || 350,
      guestCapacity: capacity ? `${capacity} Guests` : 'Bespoke Capacity',
      registeredCount: 0,
      image: image || '/wedding.jpg',
      thumbnail: image || '/wedding.jpg',
      organizer: organizer || 'Eventora Atelier',
      status: 'Upcoming',
      accentTag: 'New Celebration',
      highlights: [
        'Curated Theme & Bespoke Lighting Ambience',
        'Gourmet Catering & Refreshment Experience',
        'VIP Event Protocol & Concierge Support'
      ]
    };

    events = loadEventsFromFile();
    events.unshift(newEvent);
    saveEventsToFile(events);

    console.log(`🎉 [Admin Events] New event published: "${newEvent.title}" (${newEvent.category})`);

    res.status(201).json({
      success: true,
      message: 'Event created successfully and published to user side.',
      data: newEvent
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/events/:id - Delete an event
router.delete('/:id', (req, res) => {
  events = loadEventsFromFile();
  const initialLength = events.length;
  events = events.filter(e => e.id !== req.params.id);

  if (events.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  saveEventsToFile(events);
  console.log(`🗑️ [Admin Events] Event deleted: ID ${req.params.id}`);

  res.json({ success: true, message: 'Event deleted successfully from user and admin portals.' });
});

export default router;
