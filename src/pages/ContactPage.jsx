import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[440px] flex items-center overflow-hidden bg-[#070C18] pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/banquet.jpg" 
            alt="Eventora Contact" 
            className="w-full h-full object-cover object-center filter brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070C18] via-[#070C18]/90 to-[#070C18]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center sm:text-left">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.28em] text-[#DFC07B] uppercase block mb-3">
              GET IN TOUCH
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
              Let’s Plan Something <br />
              <span className="font-script text-[#DFC07B] text-4xl sm:text-5xl lg:text-6xl font-normal">
                Truly Extraordinary
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#E2DACB] font-light leading-relaxed mb-6">
              Have a wedding, anniversary, or corporate celebration in mind? Reach out to our design atelier for a private consultation and bespoke proposal.
            </p>
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
                <p className="text-xs sm:text-sm text-[#5C4F41] max-w-md leading-relaxed mb-6">
                  Thank you, <strong className="text-[#1C1610]">{formData.name || 'valued guest'}</strong>. Our Senior Event Director will review your requirements and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0D1527] text-white text-xs font-semibold hover:bg-[#15233D] transition-colors"
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
                      <option value="Birthday">Birthday Gala</option>
                      <option value="Corporate">Corporate Summit / Awards</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Private Party">Private Party / Soirée</option>
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
                  className="w-full py-3.5 rounded-full bg-[#0D1527] hover:bg-[#15233D] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#DFC07B]" />
                  <span>Send Consultation Request</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

    </div>
  );
}
