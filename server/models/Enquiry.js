import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    refCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      default: 'General Consultation',
      trim: true
    },
    date: {
      type: String,
      default: '',
      trim: true
    },
    guests: {
      type: String,
      default: '',
      trim: true
    },
    city: {
      type: String,
      default: '',
      trim: true
    },
    notes: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'archived'],
      default: 'new'
    },
    whatsappDispatched: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Prevent mongoose OverwriteModelError in case of hot reloading
export default mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
