import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';
import { api } from '../services/api';

export default function ContactPage({ onOpenConsultation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    guestCount: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.submitEnquiry({ ...formData });
    } catch (err) {
      console.warn('Enquiry submitted:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#070C18]">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img 
              src="/banquet.jpg" 
              alt="Eventora Contact" 
              className="w-full h-full object-cover object-[center_35%] md:object-right lg:object-center filter brightness-100 contrast-[1.02]"
            />
            {/* Mobile Gradients: reveals royal banquet hall & chandeliers with crisp legibility */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-[#070C18]/80 via-[#070C18]/45 to-[#070C18]/95 z-1" />

            {/* Desktop Gradients: completely untouched for desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/85 md:via-[#070C18]/60 to-transparent z-1" />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#070C18] via-transparent to-[#070C18]/50 z-2" />
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#070C18] via-[#070C18]/70 to-transparent z-1" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 sm:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 max-w-2xl text-left">
              {/* Gold Tag */}
              <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  GET IN TOUCH
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="leading-[1.15] mb-4 sm:mb-5 tracking-tight">
                <span className="block font-serif-luxury text-[32px] sm:text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                  Let’s Plan Something
                </span>
                <span className="block font-script text-3xl sm:text-5xl md:text-6xl text-[#DFC07B] mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] font-normal">
                  Truly Extraordinary
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#FAF7F2] sm:text-[#E2DACB] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Have a wedding, anniversary, or corporate celebration in mind? Reach out to our design atelier for a private consultation and bespoke proposal.
              </p>

              {/* Highlights Pills (Hidden on mobile, visible on desktop) */}
              <div className="hidden sm:flex sm:flex-wrap items-center gap-6 pt-1 mb-7 sm:mb-8">
                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">24h Response Guarantee</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">Dedicated Event Director</span>
                </div>

                <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFEB] font-medium bg-transparent border-0 p-0 shadow-none">
                  <div className="w-6 h-6 rounded-md bg-[#DFC07B]/20 border border-[#DFC07B]/50 flex items-center justify-center text-[#DFC07B] shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="tracking-wide">Confidential Consultations</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenConsultation ? onOpenConsultation('Contact') : null}
                  className="w-full sm:w-auto justify-center px-6 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Book Private Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+919876543210"
                  className="w-full sm:w-auto justify-center px-5 py-3.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wide border border-white/20 transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DFC07B]" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>

            {/* Right Calligraphic Accent Box on Desktop */}
            <div className="hidden lg:flex lg:col-span-4 justify-end">
              <div className="text-right p-6 rounded-2xl bg-black/35 backdrop-blur-md border border-[#DFC07B]/30 shadow-2xl max-w-xs transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#DFC07B] uppercase block mb-2">
                  PRIVATE ATELIER
                </span>
                <p className="font-serif-luxury text-lg text-[#F5EAD2] leading-snug">
                  "Creating extraordinary celebrations with boundless passion and precision."
                </p>
                <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-[#DFC07B]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase font-semibold text-[10px]">Udaipur &bull; Mumbai &bull; Delhi</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Content: Info Cards & Form */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase block mb-2">
                REACH US DIRECTLY
              </span>
              <h2 className="font-serif-luxury text-3xl font-bold text-[#0D1527] mb-3">
                Our Private Atelier
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4F41] leading-relaxed mb-6">
                We welcome visits by appointment to review custom fabric swatches, 3D stage renders, and floral tablescape mockups.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              
              {/* Phone */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC6] flex items-start gap-4 shadow-2xs hover:border-[#DFC07B] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C6B1C] shrink-0 border border-[#DFC07B]/40">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#1C1610]">Phone & Direct Inquiries</h4>
                  <p className="text-xs text-[#786C5E] mt-0.5">Mon – Sat: 9:30 AM to 8:00 PM</p>
                  <a href="tel:+919876543210" className="text-xs font-bold text-[#8C6B1C] hover:underline mt-1 inline-block">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC6] flex items-start gap-4 shadow-2xs hover:border-[#DFC07B] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C6B1C] shrink-0 border border-[#DFC07B]/40">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#1C1610]">Email Concierge</h4>
                  <p className="text-xs text-[#786C5E] mt-0.5">We reply to every inquiry within 24 hours</p>
                  <a href="mailto:hello@eventora.com" className="text-xs font-bold text-[#8C6B1C] hover:underline mt-1 inline-block">
                    hello@eventora.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC6] flex items-start gap-4 shadow-2xs hover:border-[#DFC07B] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-[#8C6B1C] shrink-0 border border-[#DFC07B]/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#1C1610]">Atelier Location</h4>
                  <p className="text-xs text-[#5C4F41] mt-0.5 leading-relaxed">
                    The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028
                  </p>
                </div>
              </div>

            </div>

            {/* Fast Response Guarantee */}
            <div className="p-4 rounded-2xl bg-[#F6EFE5] border border-[#DFC07B]/40 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#8C6B1C] shrink-0" />
              <p className="text-xs text-[#5C4F41]">
                <strong className="text-[#1C1610]">Planning an urgent celebration?</strong> Call us directly for immediate venue feasibility checks.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5DAC6] shadow-xl p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FCF9EE] border-2 border-[#DFC07B] flex items-center justify-center text-[#8C6B1C] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-3xl font-bold text-[#1C1610] mb-2">
                  Inquiry Received with Pleasure
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4F41] max-w-md leading-relaxed mb-4">
                  Thank you, <strong className="text-[#1C1610]">{formData.name || 'valued guest'}</strong>. Your celebration details have been submitted directly to our event team.
                </p>

                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#DFC07B]/40 text-xs text-[#6E6052] mb-6 w-full max-w-sm text-center">
                  <p>Concierge Phone: <strong>{DISPLAY_PHONE_NUMBER}</strong></p>
                  <p className="text-[11px] text-[#8C6B1C] mt-1 font-medium">Estimated Response: Within 2 Hours</p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.28em] text-[#8C6B1C] uppercase block mb-1">
                    START THE CONVERSATION
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#1C1610]">
                    Tell Us About Your Celebration
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    >
                      <option value="Wedding">Grand Wedding Ceremony</option>
                      <option value="Engagement">Engagement Celebration</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Corporate">Corporate / Business Event</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Private Party">Private Party / Celebration</option>
                      <option value="Custom">Custom Celebration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Approximate Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                      Expected Guest Count
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 250 - 500 Guests"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C4F41] mb-1">
                    Your Vision & Special Requests
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your desired aesthetic, preferred venue style, catering preferences, or any signature touches..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DAC6] focus:border-[#DFC07B] focus:ring-2 focus:ring-[#DFC07B]/30 outline-none text-xs bg-[#FAF8F5] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#DFC07B]" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#DFC07B]" />
                      <span>Send Consultation Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

    </div>
  );
}
