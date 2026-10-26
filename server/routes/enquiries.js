import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENQUIRIES_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');

// Resilient file backup helpers
function loadEnquiriesFromFile() {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error loading enquiries from file:', err);
    return [];
  }
}

function saveEnquiryToFile(enquiry) {
  try {
    const list = loadEnquiriesFromFile();
    // Prepend so newest is first
    list.unshift(enquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving enquiry to backup file:', err);
  }
}

function updateEnquiryInFile(id, updates) {
  try {
    const list = loadEnquiriesFromFile();
    const index = list.findIndex(item => item.id === id || item._id === id || item.refCode === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
      return list[index];
    }
    return null;
  } catch (err) {
    console.error('Error updating enquiry in backup file:', err);
    return null;
  }
}

function deleteEnquiryFromFile(id) {
  try {
    const list = loadEnquiriesFromFile();
    const filtered = list.filter(item => item.id !== id && item._id !== id && item.refCode !== id);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return filtered.length < list.length;
  } catch (err) {
    console.error('Error deleting enquiry from backup file:', err);
    return false;
  }
}

// POST /api/enquiries - Submit new celebration enquiry (Saved directly to Admin side, WhatsApp dispatch removed)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, category, eventType, date, eventDate, guests, guestCount, city, notes, message, refCode } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required.'
      });
    }

    const uniqueId = `enq_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const payload = {
      id: uniqueId,
      refCode: refCode || `EVT-${Math.floor(100000 + Math.random() * 900000)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      category: category || eventType || 'General Consultation',
      date: date || eventDate || '',
      guests: guests || guestCount || '',
      city: city ? String(city).trim() : '',
      notes: notes || message || '',
      status: 'new', // Initial status for Admin Dashboard
      createdAt: new Date().toISOString()
    };

    let savedInDB = false;
    let savedDoc = null;

    // 1. Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        savedDoc = await Enquiry.create(payload);
        savedInDB = true;
      } catch (dbErr) {
        console.warn('⚠️ MongoDB save failed, falling back to file:', dbErr.message);
      }
    }

    // 2. Dual persistence: always store in resilient file storage
    saveEnquiryToFile({ ...payload, _id: savedDoc ? savedDoc._id.toString() : uniqueId });

    console.log(`📥 [Admin Side] New enquiry registered: ${payload.refCode} (${payload.name})`);

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully and recorded for administrative review.',
      refCode: payload.refCode,
      data: savedDoc || payload,
      database: savedInDB ? 'MongoDB' : 'FileBackup'
    });
  } catch (err) {
    console.error('Error handling enquiry:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries - Retrieve all enquiries for the Admin portal
router.get('/', async (req, res) => {
  try {
    // If MongoDB is connected, query MongoDB
    if (mongoose.connection.readyState === 1) {
      const dbEnquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return res.json({
        success: true,
        source: 'MongoDB',
        total: dbEnquiries.length,
        data: dbEnquiries
      });
    }

    // Fallback to file storage
    const fileEnquiries = loadEnquiriesFromFile();
    res.json({
      success: true,
      source: 'FileBackup',
      total: fileEnquiries.length,
      data: fileEnquiries
    });
  } catch (err) {
    console.error('Error getting enquiries:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/enquiries/:id - Update enquiry status or notes (Admin side)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, adminNotes } = req.body;

    const updates = {};
    if (status) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    updates.updatedAt = new Date().toISOString();

    let updatedDoc = null;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        updatedDoc = await Enquiry.findByIdAndUpdate(id, { $set: updates }, { new: true });
      } else {
        updatedDoc = await Enquiry.findOneAndUpdate(
          { $or: [{ refCode: id }, { id }] },
          { $set: updates },
          { new: true }
        );
      }
    }

    // Also update file backup
    const fileUpdated = updateEnquiryInFile(id, updates);

    if (!updatedDoc && !fileUpdated) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.json({
      success: true,
      message: 'Enquiry status updated successfully.',
      data: updatedDoc || fileUpdated
    });
  } catch (err) {
    console.error('Error updating enquiry:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/enquiries/:id - Remove an enquiry (Admin side)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let deletedFromDB = false;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Enquiry.findByIdAndDelete(id);
        deletedFromDB = true;
      } else {
        await Enquiry.findOneAndDelete({ $or: [{ refCode: id }, { id }] });
        deletedFromDB = true;
      }
    }

    const deletedFromFile = deleteEnquiryFromFile(id);

    if (!deletedFromDB && !deletedFromFile) {
      return res.status(404).json({ success: false, message: 'Enquiry not found or already deleted.' });
    }

    res.json({
      success: true,
      message: 'Enquiry removed successfully.'
    });
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
