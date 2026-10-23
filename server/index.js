import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import eventsRouter from './routes/events.js';
import enquiriesRouter from './routes/enquiries.js';

// Load environment variables from server/.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middlewares
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: process.env.DB_NAME || 'event_management_db'
  });
});

// API Routes
app.use('/api/events', eventsRouter);
app.use('/api/enquiries', enquiriesRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend Server running on http://localhost:${PORT}`);
  console.log(`🔌 Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Client origin allowed: ${CLIENT_URL}`);
  if (process.env.DB_NAME) {
    console.log(`🗄️ Database: ${process.env.DB_NAME}`);
  }
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
