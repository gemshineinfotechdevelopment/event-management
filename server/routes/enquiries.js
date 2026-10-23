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

// Ensure enquiries.json exists as a resilient file backup
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
    list.unshift(enquiry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving enquiry to backup file:', err);
  }
}

/**
 * Dispatch background WhatsApp notification to the owner
 */
async function dispatchWhatsAppNotification(enquiry) {
  const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER || process.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;

  const messageText = [
    '✨ *NEW ENQUIRY RECEIVED - EVENTORA* ✨',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 *Name:* ${enquiry.name || 'Not specified'}`,
    `📞 *Phone:* ${enquiry.phone || 'Not specified'}`,
    enquiry.email ? `📧 *Email:* ${enquiry.email}` : null,
    enquiry.category || enquiry.eventType ? `🎉 *Event:* ${enquiry.category || enquiry.eventType}` : null,
    enquiry.date || enquiry.eventDate ? `📅 *Date:* ${enquiry.date || enquiry.eventDate}` : null,
    enquiry.guests || enquiry.guestCount ? `👥 *Guests:* ${enquiry.guests || enquiry.guestCount}` : null,
    enquiry.city ? `📍 *City:* ${enquiry.city}` : null,
    enquiry.notes || enquiry.message ? `📝 *Message:* ${enquiry.notes || enquiry.message}` : null,
    '━━━━━━━━━━━━━━━━━━━━',
    enquiry.refCode ? `🔖 *Ref:* ${enquiry.refCode}` : null,
    `⏰ *Time:* ${new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN')}`
  ].filter(Boolean).join('\n');

  console.log('\n=========================================');
  console.log('📨 NEW ENQUIRY RECEIVED FOR WHATSAPP:');
  console.log(messageText);
  console.log(`📱 Destination Owner Phone: ${ownerNumber}`);
  console.log('=========================================\n');

  // 1. If CallMeBot API is configured (Free WhatsApp API for personal notifications)
  if (callMeBotKey) {
    try {
      const cleanPhone = ownerNumber.startsWith('+') ? ownerNumber : `+${ownerNumber}`;
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(cleanPhone)}&text=${encodeURIComponent(messageText)}&apikey=${encodeURIComponent(callMeBotKey)}`;
      const res = await fetch(url);
      const text = await res.text();
      console.log('✅ CallMeBot WhatsApp Notification Status:', text);
      return { sent: true, provider: 'callmebot', status: text };
    } catch (err) {
      console.error('❌ CallMeBot delivery error:', err.message);
    }
  }

  // 2. If a custom Webhook URL is configured
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: ownerNumber,
          message: messageText,
          enquiry
        })
      });
      console.log('✅ Webhook WhatsApp Notification Sent:', res.status);
      return { sent: true, provider: 'webhook' };
    } catch (err) {
      console.error('❌ Webhook delivery error:', err.message);
    }
  }

  return { sent: false, reason: 'No WhatsApp gateway API key configured. Enquiry saved in MongoDB and backup file.' };
}

// POST /api/enquiries - Submit new celebration enquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, category, eventType, date, eventDate, guests, guestCount, city, notes, message, refCode } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required.'
      });
    }

    const payload = {
      refCode: refCode || `EVT-${Math.floor(100000 + Math.random() * 900000)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      category: category || eventType || 'General Consultation',
      date: date || eventDate || '',
      guests: guests || guestCount || '',
      city: city ? String(city).trim() : '',
      notes: notes || message || '',
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

    // 2. Dual persistence: always write to file backup as well
    saveEnquiryToFile(payload);

    // 3. Dispatch background WhatsApp notification
    const dispatchResult = await dispatchWhatsAppNotification(payload);

    // If saved to MongoDB and dispatch succeeded, record it
    if (savedDoc && dispatchResult?.sent) {
      savedDoc.whatsappDispatched = true;
      await savedDoc.save().catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry received successfully and stored.',
      refCode: payload.refCode,
      data: savedDoc || payload,
      database: savedInDB ? 'MongoDB' : 'FileBackup',
      dispatch: dispatchResult
    });
  } catch (err) {
    console.error('Error handling enquiry:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries - View all submitted enquiries
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
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
