import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/foodOnFireData';
import { Phone, Mail, MapPin, ShieldCheck, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171612] text-[#fef9ef] border-t border-[#332f27] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#2d2a23]">
          {/* Column 1: Brand & Atelier */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl text-[#fef9ef] tracking-wide">
                FoodOnFire
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#a58d70] border border-[#a58d70]/40 px-2 py-0.5">
                Pan-India
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-light">
              Crafting transcendent culinary memories through centuries-old Awadhi and Mughlai
              hearth traditions, reimagined with modern editorial gastronomy for high-profile weddings,
              soirees, and corporate banquets across India.
            </p>
            <div className="pt-2 flex items-center gap-6 text-stone-400 text-xs">
              <div>
                <span className="block font-serif text-xl text-[#a58d70]">{BRAND_INFO.heritageYears}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Heritage</span>
              </div>
              <div className="w-[1px] h-8 bg-stone-700"></div>
              <div>
                <span className="block font-serif text-xl text-[#a58d70]">{BRAND_INFO.curatedBanquetsCount}</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Banquets</span>
              </div>
              <div className="w-[1px] h-8 bg-stone-700"></div>
              <div>
                <span className="block font-serif text-xl text-[#a58d70]">{BRAND_INFO.rating} ★</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Connoisseur Index</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#a58d70] font-medium">
              Atelier Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-light tracking-wide">
              <li>
                <Link to="/" className="hover:text-[#a58d70] transition-colors">
                  01. The Atelier Homepage
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#a58d70] transition-colors">
                  02. Culinary Philosophy & Heritage
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#a58d70] transition-colors">
                  03. Digital Menu & Package Atelier
                </Link>
              </li>
              <li>
                <Link to="/my-selection" className="hover:text-[#a58d70] transition-colors">
                  04. My Selection & Order Proposal
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#a58d70] transition-colors">
                  05. Direct Concierge & Consultations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Headquarters & Direct Touch */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#a58d70] font-medium">
              Royal Concierge Desk
            </h4>
            <div className="space-y-3 text-xs text-stone-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a58d70] shrink-0 mt-0.5" />
                <span>
                  <strong>Atelier Headquarters:</strong><br />
                  {BRAND_INFO.headquarters}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#a58d70] shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.conciergePhone}`}
                  className="hover:text-[#a58d70] transition-colors font-serif text-sm tracking-wide"
                >
                  {BRAND_INFO.conciergePhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#a58d70] shrink-0" />
                <span className="text-stone-400">{BRAND_INFO.email}</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello FoodOnFire Concierge, I would like to inquire about event catering dates for an upcoming celebration.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#a58d70]/60 text-[#a58d70] text-[11px] tracking-wider uppercase hover:bg-[#a58d70] hover:text-[#171612] transition-colors"
              >
                <span>WhatsApp Private Line</span>
              </a>
            </div>
          </div>

          {/* Column 4: Standards & Protocols */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#a58d70] font-medium">
              Banqueting Protocols
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-light">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#a58d70] shrink-0 mt-0.5" />
                <span>Minimum lead-time of 7 to 14 days required for bespoke menu tastings.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a58d70] shrink-0 mt-0.5" />
                <span>Zero frozen bases. 100% farm-sourced organics and pure cold-pressed oils.</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-[#a58d70] shrink-0 mt-0.5" />
                <span>Uniformed silver-glove brigade & tableside live flame stations.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 tracking-wider">
          <p>© {new Date().getFullYear()} Food on Fire Caterers. All Rights Reserved. Pan-India & Global Destinations.</p>
          <p className="mt-2 md:mt-0 font-serif italic text-stone-400">
            "Fire is the primal canvas; flavour is our architecture."
          </p>
        </div>
      </div>
    </footer>
  );
};
