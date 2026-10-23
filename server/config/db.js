import mongoose from 'mongoose';

/**
 * Connect to MongoDB instance on VPS / Localhost
 */
export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eventora';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000, // Timeout after 4s if MongoDB isn't running
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Failed (${mongoURI}): ${error.message}`);
    console.warn('ℹ️ Running in resilient fallback mode (Enquiries will still be saved to JSON file backup).');
    return false;
  }
}
