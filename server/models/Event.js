import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    attendees: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
