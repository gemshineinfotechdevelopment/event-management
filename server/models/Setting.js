import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'general_settings'
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    rawPhone: {
      type: String,
      default: '919876543210'
    },
    email: {
      type: String,
      default: 'hello@eventora.com'
    },
    address: {
      type: String,
      default: 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028'
    },
    businessHours: {
      type: String,
      default: 'Mon – Sat: 9:30 AM to 8:00 PM'
    },
    companyName: {
      type: String,
      default: 'Eventora - Events & Beyond'
    },
    city: {
      type: String,
      default: 'Chennai'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Setting || mongoose.model('Setting', settingSchema);
