// WhatsApp Integration Utility for Eventora Enquiries
// Note: Dynamic business phone number is fetched directly from database Settings
export const WHATSAPP_PHONE_NUMBER = '919876543210';
export const DISPLAY_PHONE_NUMBER = '+91 98765 43210';

/**
 * Formats consultation modal form data into a luxury WhatsApp message
 */
export function formatConsultationWhatsAppMessage(data, refCode) {
  const lines = [
    '✨ *NEW CELEBRATION ENQUIRY - EVENTORA* ✨',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 *Full Name:* ${data.name || 'Not provided'}`,
    `📞 *Phone:* ${data.phone || 'Not provided'}`,
    data.email ? `📧 *Email:* ${data.email}` : null,
    `🎉 *Event Category:* ${data.category || 'Celebration'}`,
    data.date ? `📅 *Tentative Date:* ${data.date}` : null,
    data.guests ? `👥 *Guest Count:* ${data.guests}` : null,
    data.city ? `📍 *Preferred City/Venue:* ${data.city}` : null,
    data.notes ? `📝 *Special Requests / Vision:*\n${data.notes}` : null,
    '━━━━━━━━━━━━━━━━━━━━',
    refCode ? `🔖 *Reference Code:* ${refCode}` : null,
    `⏰ *Timestamp:* ${new Date().toLocaleString('en-IN')}`,
    '_Sent via Eventora Web Portal_'
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Formats contact page form data into a WhatsApp message
 */
export function formatContactWhatsAppMessage(data) {
  const lines = [
    '✨ *NEW ATELIER CONTACT ENQUIRY - EVENTORA* ✨',
    '━━━━━━━━━━━━━━━━━━━━',
    `👤 *Full Name:* ${data.name || 'Not provided'}`,
    `📞 *Phone:* ${data.phone || 'Not provided'}`,
    data.email ? `📧 *Email:* ${data.email}` : null,
    data.eventType ? `🎉 *Event Type:* ${data.eventType}` : null,
    data.eventDate ? `📅 *Tentative Date:* ${data.eventDate}` : null,
    data.guestCount ? `👥 *Guest Count:* ${data.guestCount}` : null,
    data.message ? `📝 *Message / Vision:*\n${data.message}` : null,
    '━━━━━━━━━━━━━━━━━━━━',
    `⏰ *Timestamp:* ${new Date().toLocaleString('en-IN')}`,
    '_Sent via Eventora Contact Atelier_'
  ].filter(Boolean);

  return lines.join('\n');
}

/**
 * Generates the wa.me URL
 */
export function getWhatsAppUrl(message, phoneNumber = WHATSAPP_PHONE_NUMBER) {
  const cleanNumber = String(phoneNumber).replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Opens WhatsApp manually only when a user explicitly clicks a chat link
 */
export function openWhatsAppManually(message, phoneNumber = WHATSAPP_PHONE_NUMBER) {
  const url = getWhatsAppUrl(message, phoneNumber);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
}
