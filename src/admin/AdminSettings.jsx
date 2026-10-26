import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  ExternalLink, 
  RotateCcw,
  AlertCircle,
  Eye,
  Loader2,
  Pencil,
  X
} from 'lucide-react';

export default function AdminSettings({ settings, onSaveSettings, saving = false }) {
  const [formData, setFormData] = useState({
    phone: '',
    rawPhone: '',
    email: '',
    address: '',
    businessHours: '',
    companyName: '',
    city: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Backup to restore on cancel
  const [backupData, setBackupData] = useState(null);

  // Populate form with current live settings
  useEffect(() => {
    if (settings) {
      const data = {
        phone: settings.phone || '+91 98765 43210',
        rawPhone: settings.rawPhone || '919876543210',
        email: settings.email || 'hello@eventora.com',
        address: settings.address || 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028',
        businessHours: settings.businessHours || 'Mon – Sat: 9:30 AM to 8:00 PM',
        companyName: settings.companyName || 'Eventora - Events & Beyond',
        city: settings.city || 'Chennai'
      };
      setFormData(data);
    }
  }, [settings]);

  // Handle phone change & auto-generate raw phone
  const handlePhoneChange = (val) => {
    const raw = String(val).replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      phone: val,
      rawPhone: raw || prev.rawPhone
    }));
  };

  const handleStartEdit = () => {
    setBackupData({ ...formData });
    setIsEditing(true);
    setErrorMessage('');
    setSavedSuccess(false);
  };

  const handleCancelEdit = () => {
    if (backupData) {
      setFormData(backupData);
    }
    setIsEditing(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSavedSuccess(false);

    // Basic validation
    if (!formData.phone.trim()) {
      setErrorMessage('Phone number cannot be empty.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      await onSaveSettings(formData);
      setSavedSuccess(true);
      setIsEditing(false);
      setBackupData(null);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save settings. Please try again.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset contact details back to default factory settings?')) {
      setFormData({
        phone: '+91 98765 43210',
        rawPhone: '919876543210',
        email: 'hello@eventora.com',
        address: 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028',
        businessHours: 'Mon – Sat: 9:30 AM to 8:00 PM',
        companyName: 'Eventora - Events & Beyond',
        city: 'Chennai'
      });
    }
  };

  // Shared input class
  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] text-xs focus:outline-none focus:border-[#DFC07B] transition-colors";
  const inputWithIconClass = "w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-[#786C5E] text-xs focus:outline-none focus:border-[#DFC07B] transition-colors";
  
  // Read-only display value class
  const displayClass = "w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#EFEAE2] text-xs";
  const displayWithIconClass = "w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#EFEAE2] text-xs";

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-[#0F172A]/90 p-4 sm:p-8 rounded-3xl border border-[#DFC07B]/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#DFC07B]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC07B]/15 border border-[#DFC07B]/30 text-[#ECCB7F] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DFC07B]" />
              <span>Contact & Atelier Configuration</span>
            </div>
            <h1 className="font-serif-luxury text-xl sm:text-3xl font-bold text-white">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#A0988A] mt-1 max-w-2xl leading-relaxed">
              Modifying phone number or email here automatically updates all customer touchpoints across the entire website—including the Header, Footer, and Contact page.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleStartEdit}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#C9BFB5] hover:text-white border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Defaults</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex-1">
            <strong className="text-white block font-semibold">Changes Saved Successfully!</strong>
            <span>Your new phone number and email address are now live and visible to visitors on the website.</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Edit Fields (lg:col-span-7) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#0F172A]/90 p-4 sm:p-8 rounded-3xl border border-[#DFC07B]/20 shadow-xl space-y-6">
          
          {/* Editing mode indicator */}
          {isEditing && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#DFC07B]/10 border border-[#DFC07B]/30 text-[#ECCB7F] text-xs font-medium animate-fadeIn">
              <Pencil className="w-3.5 h-3.5" />
              <span>Editing mode — modify the fields below and click Save.</span>
            </div>
          )}

          {/* Section: Direct Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Phone className="w-4 h-4 text-[#DFC07B]" />
              <h2 className="font-serif-luxury text-base font-bold text-white tracking-wide">
                Direct Contact Channels
              </h2>
            </div>

            <div className="space-y-4">
              
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                  Display Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {isEditing ? (
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={inputWithIconClass}
                    />
                  ) : (
                    <div className={displayWithIconClass}>
                      {formData.phone || '+91 98765 43210'}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#8C7E6C] mt-1">
                  Shown in the website header, footer, and contact atelier sections.
                </p>
              </div>

              {/* Raw Phone / WhatsApp Digits */}
              <div>
                <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                  Dialing / International Digits (Numbers only)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.rawPhone}
                    onChange={(e) => setFormData({ ...formData, rawPhone: e.target.value.replace(/[^0-9]/g, '') })}
                    placeholder="919876543210"
                    className={`${inputClass} font-mono`}
                  />
                ) : (
                  <div className={`${displayClass} font-mono`}>
                    {formData.rawPhone || '919876543210'}
                  </div>
                )}
                <p className="text-[11px] text-[#8C7E6C] mt-1">
                  Used for direct clickable links (<code className="text-[#DFC07B]">tel:</code> and WhatsApp direct chat).
                </p>
              </div>

              {/* Concierge Email */}
              <div>
                <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                  Concierge Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {isEditing ? (
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@eventora.com"
                      className={inputWithIconClass}
                    />
                  ) : (
                    <div className={displayWithIconClass}>
                      {formData.email || 'hello@eventora.com'}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#8C7E6C] mt-1">
                  Email destination shown to clients for inquiries and consultations.
                </p>
              </div>

            </div>
          </div>

          {/* Section: Atelier & Business Details */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
              <Building className="w-4 h-4 text-[#DFC07B]" />
              <h2 className="font-serif-luxury text-base font-bold text-white tracking-wide">
                Atelier Location & Hours
              </h2>
            </div>

            <div className="space-y-4">
              
              {/* Atelier Address */}
              <div>
                <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                  Atelier Address / Physical Studio
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-3" />
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028"
                      className={`${inputWithIconClass} resize-none`}
                    />
                  ) : (
                    <div className={`${displayWithIconClass} whitespace-pre-wrap`}>
                      {formData.address || 'The Royal Pavilion Atelier, Boat Club Road, R.A. Puram, Chennai, Tamil Nadu 600028'}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Operating Hours */}
                <div>
                  <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                    Operating Hours
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C7E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.businessHours}
                        onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                        placeholder="Mon – Sat: 9:30 AM to 8:00 PM"
                        className={inputWithIconClass}
                      />
                    ) : (
                      <div className={displayWithIconClass}>
                        {formData.businessHours || 'Mon – Sat: 9:30 AM to 8:00 PM'}
                      </div>
                    )}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                    Primary City / Region
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Chennai"
                      className={inputClass}
                    />
                  ) : (
                    <div className={displayClass}>
                      {formData.city || 'Chennai'}
                    </div>
                  )}
                </div>
              </div>

              {/* Company / Brand Name */}
              <div>
                <label className="block text-xs font-semibold text-[#EFEAE2] mb-1.5">
                  Brand Name & Tagline
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Eventora - Events & Beyond"
                    className={inputClass}
                  />
                ) : (
                  <div className={displayClass}>
                    {formData.companyName || 'Eventora - Events & Beyond'}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#C9BFB5] hover:text-white border border-white/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#ECCB7F] via-[#DFC07B] to-[#C5A059] text-[#1C1610] text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <span className="text-[11px] text-[#8C7E6C] text-center sm:text-left">
                Click "Edit Details" above to modify contact information.
              </span>
              <button
                type="button"
                onClick={handleStartEdit}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-[#DFC07B]/15 text-[#DFC07B] border border-[#DFC07B]/30 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
            </div>
          )}

        </form>

        {/* Right Column: Live Website Preview (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0F172A]/90 p-4 sm:p-6 rounded-3xl border border-[#DFC07B]/30 shadow-xl space-y-5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#DFC07B]" />
              <h3 className="font-serif-luxury text-base font-bold text-white">
                Live Website Preview
              </h3>
            </div>
            
            <p className="text-xs text-[#A0988A] leading-relaxed">
              Here is how your updated phone number and email will be displayed to clients on the live website:
            </p>

            {/* Preview Card 1: Contact Page Atelier Card */}
            <div className="p-4 rounded-2xl bg-white text-[#2C241D] shadow-md border border-[#E5DAC6] space-y-3">
              <span className="text-[9px] font-bold tracking-wider uppercase text-[#8C6B1C] block">
                PREVIEW: CONTACT ATELIER CARD
              </span>

              <div className="flex items-start gap-3 pt-1">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-xs font-bold text-[#1C1610]">Phone & Direct Inquiries</p>
                  <p className="text-[11px] text-[#786C5E] truncate">{formData.businessHours || 'Mon – Sat: 9:30 AM to 8:00 PM'}</p>
                  <span className="text-xs font-bold text-[#8C6B1C] mt-0.5 block truncate">
                    {formData.phone || '+91 98765 43210'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1 border-t border-[#E5DAC6]/60">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#DFC07B]/40 flex items-center justify-center text-[#8C6B1C] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-xs font-bold text-[#1C1610]">Email Concierge</p>
                  <p className="text-[11px] text-[#786C5E]">Replies within 24 hours</p>
                  <span className="text-xs font-bold text-[#8C6B1C] mt-0.5 block truncate">
                    {formData.email || 'hello@eventora.com'}
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Card 2: Footer Contact Block */}
            <div className="p-4 rounded-2xl bg-[#060A14] text-[#EFEAE2] border border-[#DFC07B]/30 space-y-2.5">
              <span className="text-[9px] font-bold tracking-wider uppercase text-[#DFC07B] block">
                PREVIEW: WEBSITE FOOTER
              </span>

              <div className="flex items-center gap-2.5 text-xs text-[#A0988A]">
                <Phone className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <span className="text-white font-medium truncate">{formData.phone || '+91 98765 43210'}</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#A0988A]">
                <Mail className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <span className="text-white font-medium truncate">{formData.email || 'hello@eventora.com'}</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#A0988A]">
                <MapPin className="w-3.5 h-3.5 text-[#DFC07B] shrink-0" />
                <span className="truncate">{formData.city || 'Chennai, Tamil Nadu'}</span>
              </div>
            </div>

            {/* Test Action Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href={`tel:${formData.phone}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-center border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Test Call Link</span>
              </a>

              <a
                href={`mailto:${formData.email}`}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold text-center border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-[#DFC07B]" />
                <span>Test Email Link</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
