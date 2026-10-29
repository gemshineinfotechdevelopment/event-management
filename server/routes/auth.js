import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ADMIN_BACKUP_FILE = path.join(__dirname, '..', 'data', 'admin_backup.json');

const JWT_SECRET = process.env.JWT_SECRET || '7844808643f96f8757924b5e03fa6ceb7833279f2b4fd4528d1deaf9c39598ee';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Seed initial administrator in MongoDB if collection is empty
 */
export async function seedDefaultAdmin() {
  try {
    if (mongoose.connection.readyState !== 1) return;

    const count = await Admin.countDocuments();
    if (count === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@eventora.com';

      console.log(`🌱 Seeding initial administrator (${defaultUsername})...`);
      const admin = new Admin({
        username: defaultUsername.toLowerCase().trim(),
        email: defaultEmail.toLowerCase().trim(),
        password: defaultPassword,
        name: 'Atelier Director',
        role: 'Super Administrator',
        avatar: 'AD'
      });
      await admin.save();
      console.log(`✅ Default admin successfully created in MongoDB [User: ${defaultUsername}]`);
    }
  } catch (err) {
    console.warn('⚠️ Admin auto-seed notice:', err.message);
  }
}

// Resilient backup helpers
function loadBackupAdmin() {
  try {
    if (fs.existsSync(ADMIN_BACKUP_FILE)) {
      const data = fs.readFileSync(ADMIN_BACKUP_FILE, 'utf-8');
      return JSON.parse(data || '{}');
    }
  } catch (err) {
    console.error('Error loading backup admin:', err);
  }
  return null;
}

function saveBackupAdmin(adminData) {
  try {
    fs.writeFileSync(ADMIN_BACKUP_FILE, JSON.stringify(adminData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving backup admin:', err);
  }
}

/**
 * POST /api/auth/login
 * Authenticate admin against MongoDB & return signed JWT
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username/email and password.'
      });
    }

    const cleanInput = String(username).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    // 1. If MongoDB is connected, authenticate against MongoDB
    if (mongoose.connection.readyState === 1) {
      // Find by username OR email
      let admin = await Admin.findOne({
        $or: [{ username: cleanInput }, { email: cleanInput }]
      });

      // If database is empty, seed now and find again
      if (!admin) {
        const count = await Admin.countDocuments();
        if (count === 0) {
          await seedDefaultAdmin();
          admin = await Admin.findOne({
            $or: [{ username: cleanInput }, { email: cleanInput }]
          });
        }
      }

      if (admin) {
        const isMatch = await admin.matchPassword(cleanPassword);
        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials. Password is incorrect.'
          });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        const token = generateToken({
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          name: admin.name
        });

        // Save backup for resilience
        saveBackupAdmin({
          id: admin._id,
          username: admin.username,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          avatar: admin.avatar
        });

        return res.json({
          success: true,
          message: 'Authentication successful.',
          token,
          user: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            avatar: admin.avatar,
            lastLogin: admin.lastLogin
          }
        });
      }
    }

    // 2. Resilient Fallback: If DB is initializing or offline, check env default credentials
    const fallbackUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const fallbackEmail = (process.env.ADMIN_EMAIL || 'admin@eventora.com').toLowerCase();
    const fallbackPass = process.env.ADMIN_PASSWORD || 'admin123';

    if ((cleanInput === fallbackUser || cleanInput === fallbackEmail) && cleanPassword === fallbackPass) {
      const fallbackPayload = {
        id: 'admin_root',
        username: fallbackUser,
        email: fallbackEmail,
        name: 'Atelier Director',
        role: 'Super Administrator',
        avatar: 'AD'
      };

      const token = generateToken(fallbackPayload);
      return res.json({
        success: true,
        message: 'Authentication successful (Fallback mode).',
        token,
        user: fallbackPayload
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid atelier credentials. Access denied.'
    });
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
      error: err.message
    });
  }
});

/**
 * GET /api/auth/me
 * Validate current JWT token and return authenticated admin user
 */
router.get('/me', protect, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1 && req.user.id !== 'admin_root') {
      const admin = await Admin.findById(req.user.id).select('-password');
      if (admin) {
        return res.json({
          success: true,
          user: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            avatar: admin.avatar,
            lastLogin: admin.lastLogin
          }
        });
      }
    }

    // Fallback or admin_root
    return res.json({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name || 'Atelier Director',
        role: req.user.role || 'Super Administrator',
        avatar: 'AD'
      }
    });
  } catch (err) {
    console.error('Error in /api/auth/me:', err);
    res.status(500).json({ success: false, message: 'Failed to verify session.' });
  }
});

/**
 * POST /api/auth/change-password
 * Change password for authenticated admin
 */
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    if (mongoose.connection.readyState === 1 && req.user.id !== 'admin_root') {
      const admin = await Admin.findById(req.user.id);
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Administrator not found.' });
      }

      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect current password.' });
      }

      admin.password = newPassword;
      await admin.save();

      return res.json({ success: true, message: 'Password updated successfully in database.' });
    }

    return res.json({ success: true, message: 'Password update simulated in fallback mode.' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
});

export default router;
