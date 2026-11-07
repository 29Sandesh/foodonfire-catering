import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/foodOnFireData';
import { Flame, ShieldCheck, HeartHandshake, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* ─────────────────────────────────────────────────────────────────────────────
          1. EDITORIAL HEADER (SKIN / WARM IVORY)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#fef9ef] text-[#1d1c16] border-b border-[#d0c4b9]/60">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#a58d70]/40 text-[#6f5b41]">
            <Flame className="w-4 h-4 text-[#6f5b41]" />
            <div className="flex flex-col items-start text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#6f5b41] leading-none">ABOUT FOF</span>
              <span className="font-script text-xs text-[#a58d70] leading-none mt-0.5">FoodOnFire</span>
            </div>
          </div>

          <span className="font-script text-4xl sm:text-5xl text-[#a58d70] block font-normal -mb-2">
            Our Heritage & Passion
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1d1c16] tracking-tight leading-[1.08]">
            Cooking authentic food with real passion, clay pots, and <span className="italic text-[#6f5b41]">live charcoal.</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl mx-auto pt-2">
            FoodOnFire was founded with one clear mission: to bring authentic royal flavors, live charcoal cooking, and warm Indian hospitality to every wedding and celebration across India.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. OUR STORY & ROOTS (DEEP OBSIDIAN BLACK)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef] border-b border-[#29251e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Spread */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative border border-[#2d2921] p-3 bg-[#181713] shadow-2xl group">
              <div className="aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
                  alt="Slow Charred Sigdi Kebabs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="pt-3 flex justify-between text-[10px] uppercase tracking-wider text-stone-400">
                <span>Live Sigdi Grills • Charcoal Cooking</span>
                <span className="text-[#c5a880]">Catering Across India</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#2d2921] p-5 bg-[#181713]">
                <span className="font-serif text-3xl text-[#c5a880]">1999</span>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">Foundation Year</p>
                <p className="text-xs text-stone-300 mt-2 font-light">Rooted in authentic royal recipes with traditional clay tandoors.</p>
              </div>
              <div className="border border-[#2d2921] p-5 bg-[#181713]">
                <span className="font-serif text-3xl text-[#c5a880]">500+</span>
                <p className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">Events Catered</p>
                <p className="text-xs text-stone-300 mt-2 font-light">From palace weddings to private estate dinners across India.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6 text-stone-300 leading-relaxed font-light text-sm sm:text-base">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium block">
              Our Cooking Style
            </span>
            <span className="font-script text-3xl sm:text-4xl text-[#c5a880] block font-normal -mb-2">
              The Secret of Slow Cooking
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#fef9ef] font-normal leading-tight">
              Why Food On Fire Is Different
            </h2>
            <p>
              Many caterers rely on ready-made gravies, artificial colors, and reheated frozen food. At FoodOnFire, we cook fresh from scratch. Our marinades use real Kashmiri saffron, green cardamom, and pure spices, slow-cooked over hardwood coals.
            </p>
            <p>
              Our trained chefs and serving staff take care of everything on your special day. From live barbecue counters to hot bread straight out of the tandoor, your guests enjoy fresh, hot food with royal courtesy.
            </p>
            
            <div className="p-5 bg-[#181713] border-l-2 border-[#c5a880] space-y-2">
              <span className="font-script text-2xl text-[#c5a880] block">
                Our Promise to You
              </span>
              <p className="font-serif italic text-stone-200 text-sm">
                "Good food brings people together. When your guests sit down to eat, we make sure they taste authentic royal food made with complete love and care."
              </p>
            </div>

            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="text-xs sm:text-sm text-stone-200">100% Earthen Clay Dum Handis opened fresh at the buffet</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="text-xs sm:text-sm text-stone-200">Real Kashmiri saffron, fresh spices, and cold-pressed pure oils</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                <span className="text-xs sm:text-sm text-stone-200">Full setup support for weddings and events anywhere in India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. FOUR RIGID CULINARY PRINCIPLES (SKIN / WARM CANVAS)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#fbf6ee] text-[#1d1c16] border-b border-[#d0c4b9]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6f5b41] font-semibold block">
              The Four Non-Negotiables
            </span>
            <span className="font-script text-4xl sm:text-5xl text-[#a58d70] block font-normal -mb-2">
              Purity in Every Grain
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1d1c16]">
              Our Guiding Tenets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-[#d0c4b9] space-y-3 hover:border-[#1d1c16] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <Clock className="w-6 h-6 text-[#a58d70]" />
              <h3 className="font-serif text-xl text-[#1d1c16]">Time As An Ingredient</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                We never rush a simmer. Our Dal Bukhara simmers for 24 hours continuously over smoldering sal wood; our Nihari braises overnight.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#d0c4b9] space-y-3 hover:border-[#1d1c16] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <ShieldCheck className="w-6 h-6 text-[#a58d70]" />
              <h3 className="font-serif text-xl text-[#1d1c16]">Hospital-Grade Hygiene</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Strict HACCP protocols, certified water purifiers for all kitchen production, and continuous temperature control on meat cuts.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#d0c4b9] space-y-3 hover:border-[#1d1c16] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <Award className="w-6 h-6 text-[#a58d70]" />
              <h3 className="font-serif text-xl text-[#1d1c16]">Artisanal Table Styling</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Hammered brass chafers, matte stoneware, floral garnishes, and hand-embroidered napkins elevate the visual poetry of the feast.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#d0c4b9] space-y-3 hover:border-[#1d1c16] transition-all duration-300 hover:-translate-y-1 shadow-sm">
              <HeartHandshake className="w-6 h-6 text-[#a58d70]" />
              <h3 className="font-serif text-xl text-[#1d1c16]">Private Patron Discretion</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Trusted by high-profile families and corporate leaders. Our staff operates with complete confidentiality and understated grace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. BANQUETING TERMS & TRANSPARENCY (DEEP OBSIDIAN BLACK)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef] border-b border-[#29251e]">
        <div className="max-w-4xl mx-auto bg-[#181713] border border-[#2d2921] p-8 sm:p-14 space-y-6 shadow-2xl">
          <span className="font-script text-3xl sm:text-4xl text-[#c5a880] block -mb-2">
            Financial Integrity
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block">
            Transparency & Protocols
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#fef9ef]">
            The FoodOnFire Booking Charter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-800">
            <div className="p-4 bg-[#12110e] border border-stone-800">
              <span className="font-serif text-3xl text-[#c5a880]">50%</span>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-200 mt-1">Booking Confirmation</p>
              <p className="text-xs text-stone-400 mt-1 font-light">Locks calendar dates and kitchen brigade.</p>
            </div>
            <div className="p-4 bg-[#12110e] border border-stone-800">
              <span className="font-serif text-3xl text-[#c5a880]">40%</span>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-200 mt-1">Pre-Event Allotment</p>
              <p className="text-xs text-stone-400 mt-1 font-light">Disbursed 7 days prior for farm procurement.</p>
            </div>
            <div className="p-4 bg-[#12110e] border border-stone-800">
              <span className="font-serif text-3xl text-[#c5a880]">10%</span>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-200 mt-1">Final Settlement</p>
              <p className="text-xs text-stone-400 mt-1 font-light">Settled upon impeccable banquet handover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          5. DIRECT CALL TO ACTION (SKIN / WARM IVORY)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#fef9ef] text-[#1d1c16] text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="font-script text-4xl sm:text-5xl text-[#6f5b41] block -mb-2">
            Begin the Journey
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#1d1c16]">
            Ready to compose your event menu?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-light">
            Review our 60+ dishes, filter by dietary requirements, or select from our signature packages.
          </p>
          <div className="pt-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-[0.2em] hover:bg-[#6f5b41] transition-colors shadow-lg"
            >
              <span>Explore Digital Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
