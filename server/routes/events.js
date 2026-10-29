import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Event from '../models/Event.js';
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

/**
 * Seed initial events in MongoDB if database is empty
 */
export async function seedInitialEvents() {
  try {
    if (mongoose.connection.readyState !== 1) return;
    const count = await Event.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial showcase events into MongoDB...');
      const fileList = loadEventsFromFile();
      const docsToInsert = fileList.map(item => ({
        ...item,
        id: item.id || `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      }));
      await Event.insertMany(docsToInsert);
      console.log(`✅ Successfully seeded ${docsToInsert.length} events into MongoDB.`);
    }
  } catch (err) {
    console.warn('⚠️ Events initial seed notice:', err.message);
  }
}

// In-memory / file cached list
let events = loadEventsFromFile();

/**
 * GET /api/events - Retrieve events with optional filtering & search
 * Primary source: MongoDB; Fallback source: events.json
 */
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;

    // 1. Try querying MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      const query = {};

      if (category && category !== 'All' && category !== 'all') {
        const catRegex = new RegExp(category, 'i');
        query.$or = [{ category: catRegex }, { categoryId: catRegex }];
      }

      if (search) {
        const sRegex = new RegExp(search, 'i');
        const searchConditions = [
          { title: sRegex },
          { location: sRegex },
          { description: sRegex },
          { desc: sRegex },
          { organizer: sRegex }
        ];
        if (query.$or) {
          query.$and = [{ $or: query.$or }, { $or: searchConditions }];
          delete query.$or;
        } else {
          query.$or = searchConditions;
        }
      }

      const dbEvents = await Event.find(query).sort({ createdAt: -1 }).lean();

      if (dbEvents && dbEvents.length > 0) {
        return res.json({
          success: true,
          source: 'MongoDB',
          total: dbEvents.length,
          data: dbEvents
        });
      }

      // If DB is empty, seed it
      const count = await Event.countDocuments();
      if (count === 0) {
        await seedInitialEvents();
        const recheck = await Event.find(query).sort({ createdAt: -1 }).lean();
        if (recheck.length > 0) {
          return res.json({
            success: true,
            source: 'MongoDB',
            total: recheck.length,
            data: recheck
          });
        }
      }
    }

    // 2. Resilient Fallback: Load from events.json
    events = loadEventsFromFile();
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
      source: 'FileStorage',
      total: filtered.length,
      data: filtered
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET /api/events/:id - Get single event details
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      let dbEvent = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        dbEvent = await Event.findById(id).lean();
      }
      if (!dbEvent) {
        dbEvent = await Event.findOne({ id }).lean();
      }
      if (dbEvent) {
        return res.json({ success: true, source: 'MongoDB', data: dbEvent });
      }
    }

    events = loadEventsFromFile();
    const event = events.find(e => e.id === id || String(e._id) === id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, source: 'FileStorage', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * POST /api/events - Create a new event (adds to admin side & reflects on user side)
 * Saves to MongoDB and syncs to events.json
 */
router.post('/', async (req, res) => {
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

    let savedDoc = null;
    let savedInDB = false;

    // 1. Save in MongoDB
    if (mongoose.connection.readyState === 1) {
      try {
        savedDoc = await Event.create(newEvent);
        savedInDB = true;
      } catch (dbErr) {
        console.warn('⚠️ MongoDB event creation notice:', dbErr.message);
      }
    }

    // 2. Dual persistence: Save in file backup
    events = loadEventsFromFile();
    const finalEvent = savedDoc ? savedDoc.toObject() : newEvent;
    events.unshift(finalEvent);
    saveEventsToFile(events);

    console.log(`🎉 [Admin Events] New event saved to ${savedInDB ? 'MongoDB' : 'Backup'}: "${finalEvent.title}"`);

    res.status(201).json({
      success: true,
      message: 'Event created successfully and published.',
      database: savedInDB ? 'MongoDB' : 'FileStorage',
      data: finalEvent
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * DELETE /api/events/:id - Delete an event from MongoDB & File storage
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let deletedFromDB = false;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Event.findByIdAndDelete(id);
        deletedFromDB = true;
      } else {
        await Event.findOneAndDelete({ id });
        deletedFromDB = true;
      }
    }

    events = loadEventsFromFile();
    const initialLength = events.length;
    events = events.filter(e => e.id !== id && String(e._id) !== id);
    saveEventsToFile(events);

    const deletedFromFile = events.length < initialLength;

    if (!deletedFromDB && !deletedFromFile) {
      return res.status(404).json({ success: false, message: 'Event not found or already deleted' });
    }

    console.log(`🗑️ [Admin Events] Event deleted: ID ${id}`);

    res.json({
      success: true,
      message: 'Event deleted successfully from database and showcase.'
    });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
