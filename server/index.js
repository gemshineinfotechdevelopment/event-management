import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import eventsRouter from './routes/events.js';
import enquiriesRouter from './routes/enquiries.js';
import settingsRouter from './routes/settings.js';

// Load environment variables from server/.env
dotenv.config(); // auto-reload trigger

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5023;
const CLIENT_URL = process.env.CLIENT_URL || 'https://eventora.gemshine.tech';

// Connect to MongoDB
connectDB();

// Allowed Origins for CORS
const allowedOrigins = [
  'https://eventora.gemshine.tech',
  'http://eventora.gemshine.tech',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:5023',
  'http://127.0.0.1:5023',
  CLIENT_URL
].filter(Boolean);

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) || 
      origin.endsWith('.gemshine.tech') || 
      origin.startsWith('http://localhost:') || 
      origin.startsWith('http://127.0.0.1:')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in production behind Nginx reverse proxy
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Eventora API',
    port: PORT,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: mongoose.connection.readyState === 1,
      name: mongoose.connection.name || 'eventora',
      state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
    }
  });
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/settings', settingsRouter);

// Serve Frontend build if dist folder exists (e.g. In VPS single-port mode)
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA Fallback for React Router / client routes
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // 404 for unhandled API endpoints
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

// Start Server on Port 5023
const server = app.listen(PORT, () => {
  console.log(`🚀 Eventora Backend Server running on port ${PORT}`);
  console.log(`🔌 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Domain: https://eventora.gemshine.tech`);
  console.log(`🍃 MongoDB URI: ${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eventora'}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is already in use by another process.`);
    console.error(`👉 Run this in PowerShell to free port ${PORT}:`);
    console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force`);
    process.exit(1);
  } else {
    throw err;
  }
});
