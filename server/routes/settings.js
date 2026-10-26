import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Setting from '../models/Setting.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SETTINGS_FILE = path.join(__dirname, '..', 'data', 'settings.json');

const DEFAULT_SETTINGS = {
  phone: '+91 98765 43210',
  rawPhone: '919876543210',
  email: 'hello@eventora.com',
  address: 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028',
  businessHours: 'Mon – Sat: 9:30 AM to 8:00 PM',
  companyName: 'Eventora - Events & Beyond',
  city: 'Chennai',
  updatedAt: new Date().toISOString()
};

function loadSettingsFromFile() {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
      return DEFAULT_SETTINGS;
    }
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data || '{}') };
  } catch (err) {
    console.error('Error loading settings from file:', err);
    return DEFAULT_SETTINGS;
  }
}

function saveSettingsToFile(settings) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving settings to file:', err);
  }
}

// GET /api/settings - Fetch current contact and company settings
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let dbSettings = await Setting.findOne({ key: 'general_settings' }).lean();
      if (!dbSettings) {
        const fileData = loadSettingsFromFile();
        dbSettings = await Setting.create({ key: 'general_settings', ...fileData });
      }
      return res.json({
        success: true,
        source: 'MongoDB',
        data: dbSettings
      });
    }

    const fileSettings = loadSettingsFromFile();
    res.json({
      success: true,
      source: 'FileStorage',
      data: fileSettings
    });
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/settings - Update contact details (phone, email, etc.) from Admin portal
router.put('/', async (req, res) => {
  try {
    const { phone, email, address, businessHours, companyName, city } = req.body;

    const current = loadSettingsFromFile();

    const cleanRawPhone = phone ? String(phone).replace(/[^0-9]/g, '') : current.rawPhone;

    const updatedData = {
      ...current,
      phone: phone !== undefined ? String(phone).trim() : current.phone,
      rawPhone: cleanRawPhone,
      email: email !== undefined ? String(email).trim() : current.email,
      address: address !== undefined ? String(address).trim() : current.address,
      businessHours: businessHours !== undefined ? String(businessHours).trim() : current.businessHours,
      companyName: companyName !== undefined ? String(companyName).trim() : current.companyName,
      city: city !== undefined ? String(city).trim() : current.city,
      updatedAt: new Date().toISOString()
    };

    // Save to File
    saveSettingsToFile(updatedData);

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      await Setting.findOneAndUpdate(
        { key: 'general_settings' },
        { $set: updatedData },
        { upsert: true, new: true }
      );
    }

    console.log(`⚙️ [Admin Side] Contact settings updated: Phone: ${updatedData.phone}, Email: ${updatedData.email}`);

    res.json({
      success: true,
      message: 'Contact settings updated successfully.',
      data: updatedData
    });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
