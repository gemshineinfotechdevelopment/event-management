import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      index: true
    },
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
    categoryId: {
      type: String,
      default: 'weddings'
    },
    date: {
      type: String,
      required: true
    },
    dateBadge: {
      day: String,
      month: String,
      year: String,
      fullDate: String
    },
    time: {
      type: String,
      default: '06:00 PM Onwards'
    },
    location: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    longDesc: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    capacity: {
      type: Number,
      default: 350
    },
    guestCapacity: {
      type: String,
      default: 'Bespoke Capacity'
    },
    registeredCount: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: '/wedding.jpg'
    },
    thumbnail: {
      type: String,
      default: '/wedding.jpg'
    },
    organizer: {
      type: String,
      default: 'Eventora Atelier'
    },
    status: {
      type: String,
      default: 'Upcoming'
    },
    accentTag: {
      type: String,
      default: 'Signature Celebration'
    },
    highlights: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
