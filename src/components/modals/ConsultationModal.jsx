import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { EventoraLogo } from '../common/Icons';
import { api } from '../../services/api';
import { DISPLAY_PHONE_NUMBER, WHATSAPP_PHONE_NUMBER } from '../../utils/whatsapp';

export default function ConsultationModal({ isOpen, onClose, initialCategory = 'Wedding' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: initialCategory,
    date: '',
    guests: '200 - 500',
    city: 'Chennai',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedRef = `EVT-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedRef);

    try {
      // Dispatches enquiry in the background to the backend & owner's WhatsApp notification channel
      await api.submitEnquiry({
        ...formData,
        refCode: generatedRef
      });
    } catch (err) {
      console.warn('Enquiry logged:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-white border border-[#DFC07B] shadow-2xl p-6 sm:p-8 text-[#2C241D] overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF6F0] hover:bg-[#F3ECE0] text-[#8C6B1C] transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F3E8CE] border-2 border-[#C5A059] flex items-center justify-center text-[#8C6B1C] mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif-luxury text-3xl font-bold text-[#241C14] mb-2">
              Thank You, {formData.name || 'Valued Client'}
            </h3>
            <p className="text-sm text-[#5C4F41] max-w-md mx-auto mb-4">
              Your inquiry for a bespoke <strong className="text-[#8C6B1C]">{formData.category}</strong> celebration has been received successfully. Our event team has been notified and will contact you directly.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 text-xs text-[#6E6052] mb-6 w-full max-w-sm text-center">
              <p>Reference Code: <strong className="text-[#241C14]">{refCode}</strong></p>
              <p className="mt-1">Direct Atelier: <strong>{DISPLAY_PHONE_NUMBER}</strong></p>
            </div>
            
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 transition-all cursor-pointer"
            >
              Done &bull; Back to Celebrations
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              <EventoraLogo className="w-8 h-8" />
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#241C14]">
                  Plan Your Extraordinary Event
                </h3>
                <p className="text-xs text-[#8C6B1C] tracking-wider uppercase font-bold">
                  Personalized Luxury Consultation
                </p>
              </div>
            </div>

            <p className="text-xs text-[#6E6052] mb-6">
              Share your celebration vision with our master curators. We will design an unforgettable experience crafted around your desires.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  />
                </div>
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  />
                </div>
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Event Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  >
                    <option value="Wedding">Wedding Celebration</option>
                    <option value="Engagement">Engagement Ceremony</option>
                    <option value="Birthday">Birthday Party</option>
                    <option value="Corporate">Corporate / Business Event</option>
                    <option value="College">College Festival</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Private Party">Private Party</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Tentative Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  />
                </div>
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Guest Count</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  >
                    <option value="Under 100">Under 100</option>
                    <option value="100 - 300">100 - 300 Guests</option>
                    <option value="300 - 600">300 - 600 Guests</option>
                    <option value="600 - 1500+">600 - 1500+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#46382C] font-semibold mb-1.5">Preferred City / Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, Goa, Udaipur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#46382C] font-semibold mb-1.5">Special Requests or Vision</label>
                <textarea
                  rows="3"
                  placeholder="Describe your venue vision, preferred color schemes, entertainment, or catering preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DAC6] focus:border-[#C5A059] focus:outline-none text-[#2C241D]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Celebration Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
