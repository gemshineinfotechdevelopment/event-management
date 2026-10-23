import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENQUIRIES_FILE = path.join(__dirname, '..', 'data', 'enquiries.json');

// Ensure enquiries.json exists
function loadEnquiries() {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error loading enquiries:', err);
    return [];
  }
}

function saveEnquiries(enquiries) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving enquiries:', err);
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
    `⏰ *Time:* ${new Date(enquiry.createdAt).toLocaleString('en-IN')}`
  ].filter(Boolean).join('\n');

  console.log('\n=========================================');
  console.log('📨 NEW ENQUIRY RECEIVED FOR WHATSAPP:');
  console.log(messageText);
  console.log(`📱 Destination Owner Phone: ${ownerNumber}`);
  console.log('=========================================\n');

  // 1. If CallMeBot API is configured (100% Free WhatsApp API for personal notifications)
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

  // Fallback: Logged to server console & database
  return { sent: false, reason: 'No WhatsApp gateway API key configured yet. Enquiry stored in server/data/enquiries.json' };
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

    const newEnquiry = {
      id: `enq_${Date.now()}`,
      refCode: refCode || `EVT-${Math.floor(100000 + Math.random() * 900000)}`,
      name,
      phone,
      email: email || '',
      category: category || eventType || 'General Consultation',
      date: date || eventDate || '',
      guests: guests || guestCount || '',
      city: city || '',
      notes: notes || message || '',
      createdAt: new Date().toISOString()
    };

    // Save to persistent file
    const enquiries = loadEnquiries();
    enquiries.unshift(newEnquiry);
    saveEnquiries(enquiries);

    // Dispatch background WhatsApp notification without opening client's WhatsApp
    const dispatchResult = await dispatchWhatsAppNotification(newEnquiry);

    res.status(201).json({
      success: true,
      message: 'Enquiry received successfully and dispatched to WhatsApp.',
      refCode: newEnquiry.refCode,
      data: newEnquiry,
      dispatch: dispatchResult
    });
  } catch (err) {
    console.error('Error handling enquiry:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enquiries - View all submitted enquiries
router.get('/', (req, res) => {
  try {
    const enquiries = loadEnquiries();
    res.json({
      success: true,
      total: enquiries.length,
      data: enquiries
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
