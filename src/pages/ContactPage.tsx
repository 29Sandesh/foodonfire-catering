import React, { useState } from 'react';
import { BRAND_INFO } from '../data/foodOnFireData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestCount: '150',
    date: '',
    venue: '',
    serviceType: 'Wedding & Reception Dastarkhwan',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*FOODONFIRE • CONCIERGE INQUIRY DOCKET*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*PATRON:* ${formData.name || 'Private Patron'}
*CONTACT:* ${formData.phone}
*EMAIL:* ${formData.email || 'N/A'}
*GUESTS:* ${formData.guestCount} Connoisseurs
*TARGET DATE:* ${formData.date || 'TBD'}
*DESTINATION / VENUE:* ${formData.venue || 'Pan-India / Destination'}
*SERVICE TYPE:* ${formData.serviceType}
*NOTES:* ${formData.notes || 'None'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Requesting private menu consultation and tasting appointment.`;

    return `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#fef9ef] text-[#1d1c16] font-sans min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#6f5b41] font-semibold block">
            Direct Banqueting Directorate
          </span>
          <span className="font-script text-4xl sm:text-5xl text-[#a58d70] block font-normal -mb-2">
            The Private Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1d1c16] tracking-tight">
            Initiate Your Consultation
          </h1>
          <p className="text-stone-600 text-xs sm:text-base font-light leading-relaxed pt-1">
            Every banquet is personally overseen by our culinary directorate. Connect with our concierge to arrange bespoke menu tastings, date holds, and tablescape previews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Address & Directorate Particulars (DEEP OBSIDIAN BLACK) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#12110e] text-[#fef9ef] border border-[#2d2921] p-8 sm:p-9 space-y-6 shadow-2xl relative">
              <span className="font-script text-3xl text-[#c5a880] block -mb-2">
                Atelier Coordinates
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold block">
                Central Hearth & Desk
              </span>

              <div className="space-y-5 text-xs text-stone-300">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fef9ef] block font-serif text-base">Headquarters & Central Hearth:</strong>
                    <span>{BRAND_INFO.headquarters}</span>
                    <span className="block text-stone-400 mt-1">Branch: {BRAND_INFO.branch}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fef9ef] block font-serif text-base">Concierge Line / WhatsApp:</strong>
                    <a
                      href={`tel:${BRAND_INFO.conciergePhone}`}
                      className="text-stone-200 hover:text-[#c5a880] transition-colors font-serif text-lg tracking-wide"
                    >
                      {BRAND_INFO.conciergePhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fef9ef] block font-serif text-base">Electronic Correspondence:</strong>
                    <span className="text-stone-300">{BRAND_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#fef9ef] block font-serif text-base">Consultation Hours:</strong>
                    <span>Monday through Sunday, 10:00 AM – 9:00 PM IST</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800">
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                    'Hello FoodOnFire Concierge, I would like to schedule a private banqueting consultation.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#c5a880] text-[#12110e] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors"
                >
                  <span>Open WhatsApp Direct Chat</span>
                </a>
              </div>
            </div>

            {/* Protocols Notice */}
            <div className="bg-[#fbf6ee] border border-[#d0c4b9] p-6 space-y-2 text-xs text-stone-600 font-light">
              <span className="text-[10px] uppercase tracking-wider text-[#6f5b41] font-semibold block">
                Booking Protocol Reminder
              </span>
              <p>
                To maintain our uncompromising culinary standards, FoodOnFire accepts a strictly limited number of banquets per calendar date. Advance booking of 14 to 30 days is advised for peak wedding dates.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form (WARM IVORY CANVAS) */}
          <div className="lg:col-span-7 bg-white border border-[#d0c4b9] p-8 sm:p-10 shadow-sm">
            <span className="font-script text-3xl sm:text-4xl text-[#6f5b41] block -mb-2">
              Bespoke Banqueting
            </span>
            <h3 className="font-serif text-2xl text-[#1d1c16] mb-2">
              Inquiry Docket
            </h3>
            <p className="text-xs text-stone-500 font-light mb-8">
              Complete the parameters below. You may either submit online or dispatch directly to our concierge via WhatsApp.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-stone-900">Inquiry Docket Received</h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto font-light">
                  Our Executive Concierge will reach out within 4 business hours to discuss your event architecture and coordinate a menu tasting appointment.
                </p>
                <div className="pt-4">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6f5b41] text-white text-xs uppercase tracking-wider hover:bg-[#a58d70] transition-colors"
                  >
                    <span>Instant WhatsApp Follow-up</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                      Patron Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yashwardhan Rathore"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98260 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="5000"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                      Destination City / Venue
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Udaipur / Mumbai / Delhi / Jaipur"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                    Occasion / Service Format
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16] bg-white"
                  >
                    <option value="Wedding & Reception Dastarkhwan">Wedding & Reception Dastarkhwan (350+ Guests)</option>
                    <option value="Intimate Sangeet / Cocktail Soiree">Intimate Sangeet / Cocktail Soiree (100–250 Guests)</option>
                    <option value="Corporate / Royal Gala Banquet">Corporate / Royal Gala Banquet</option>
                    <option value="Private Estate Dining Experience">Private Estate Dining Experience (50–100 Guests)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-600 block mb-1 font-medium">
                    Culinary Vision & Special Dietary Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share any preferred heirloom dishes, themes, live counters, or questions for our Chef..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-[#1d1c16]"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#6f5b41] transition-colors"
                  >
                    Submit Docket Online
                  </button>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#6f5b41] text-[#6f5b41] text-xs uppercase tracking-[0.18em] hover:bg-[#6f5b41] hover:text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
