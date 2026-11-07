import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO, CATERING_PACKAGES, DISH_CATALOG } from '../data/foodOnFireData';
import { useCart } from '../context/CartContext';
import { Dish } from '../types';
import { ArrowRight, Flame, Sparkles, CheckCircle2, PhoneCall, Eye, X } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { addToCart, selectPackage, selectedPackage, isVegOnly } = useCart();
  const [activeQuickViewDish, setActiveQuickViewDish] = useState<Dish | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-changing high-resolution catering background images for the hero section
  const cateringBackgrounds = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop',
      title: 'Grand Royal Banquet & Reception Tablescape',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2000&auto=format&fit=crop',
      title: 'Artisanal Haute Gastronomie Catering Spread',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop',
      title: 'Sovereign Palace Dining & Gala Tablescape',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop',
      title: 'Live Hearth & Sigdi Charcoal Theatrics',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop',
      title: 'Enchanting Open-Air Destination Banquet',
    },
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto-change hero background image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % cateringBackgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [cateringBackgrounds.length]);

  const signatureDishes = DISH_CATALOG.filter(d => d.isSignature && (!isVegOnly || d.diet !== 'nv')).slice(0, 4);

  const handleAddToCart = (dish: Dish, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(dish);
    setToastMessage(`Added "${dish.name}" to your selection.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="font-sans">
      {/* Sleek Minimal Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#12110e] text-[#fef9ef] border border-[#c5a880] px-5 py-3 shadow-2xl transition-all duration-300 flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#c5a880]" />
          <span className="text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. HERO SECTION (FULL-BLEED CATERING BACKGROUND SLIDESHOW)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#fef9ef] text-[#1d1c16] border-b border-[#d0c4b9]/60 px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        {/* Full-Bleed Auto-Changing Catering Background Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {cateringBackgrounds.map((bg, idx) => (
            <div
              key={bg.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentBgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={bg.url}
                alt={bg.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}

          {/* Editorial Warm Ivory Vignette: Opaque directly behind the left text, rapidly fading to 100% transparent right after the text */}
          <div 
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background: 'linear-gradient(to right, #fef9ef 0%, rgba(254, 249, 239, 0.98) 28%, rgba(254, 249, 239, 0.7) 36%, rgba(254, 249, 239, 0.1) 44%, transparent 50%)'
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background: 'linear-gradient(to right, rgba(254, 249, 239, 0.96) 0%, rgba(254, 249, 239, 0.88) 75%, transparent 100%)'
            }}
          />
        </div>

        {/* Foreground Content Container shifted to extreme left */}
        <div className="relative z-10 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#a58d70]/40 bg-[#fef9ef]/80 backdrop-blur-sm text-[#6f5b41] text-[10px] sm:text-xs uppercase tracking-[0.25em]">
              <Flame className="w-3.5 h-3.5 text-[#6f5b41]" />
              <span>Luxury Catering • All Over India</span>
            </div>

            <div className="space-y-1">
              <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#a58d70] block leading-none">
                The Art of Sacred Embers
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-[#1d1c16] font-normal tracking-tight">
                Luxury catering for <span className="italic font-light text-[#6f5b41]">unforgettable</span> celebrations.
              </h1>
            </div>

            <p className="text-stone-700 text-xs sm:text-sm lg:text-base max-w-xl font-light leading-relaxed">
              Authentic royal Awadhi and Mughlai catering for grand weddings, luxury parties, and celebrations across India. 
              We bring live charcoal sigdi cooking, royal buffet setups, and freshly prepared food to your special day.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#6f5b41] transition-all duration-300 group shadow-md"
              >
                <span>View Menu & Packages</span>
                <ArrowRight className="w-4 h-4 text-[#a58d70] group-hover:translate-x-1.5 transition-transform" />
              </Link>
              
              {/* About FOF button with FoodOnFire script subtitle */}
              <Link
                to="/about-us"
                className="inline-flex flex-col items-center justify-center px-6 py-2.5 border border-[#1d1c16] bg-[#fef9ef]/70 backdrop-blur-sm text-[#1d1c16] hover:bg-[#1d1c16] hover:text-[#fef9ef] transition-colors duration-300 group"
              >
                <span className="text-xs uppercase tracking-[0.2em] font-medium leading-none">
                  About FOF
                </span>
                <span className="font-script text-sm text-[#a58d70] group-hover:text-stone-300 leading-none mt-0.5">
                  FoodOnFire
                </span>
              </Link>
            </div>

            {/* Metrics Bar */}
            <div className="pt-6 border-t border-[#d0c4b9]/60 grid grid-cols-3 gap-4 text-stone-800 max-w-lg">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-normal text-[#1d1c16]">25+</p>
                <p className="text-[10px] uppercase tracking-wider text-stone-600 mt-0.5 font-medium">Years Experience</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-normal text-[#1d1c16]">500+</p>
                <p className="text-[10px] uppercase tracking-wider text-stone-600 mt-0.5 font-medium">Events Catered</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-normal text-[#1d1c16]">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-stone-600 mt-0.5 font-medium">Fresh & Authentic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. THE MASTER DISCIPLINES (DEEP OBSIDIAN BLACK) — Editorial Cinematic Spread
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef] border-b border-[#29251e] relative overflow-hidden">
        {/* Subtle background ambient warmth */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#a58d70]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="font-script text-4xl sm:text-5xl text-[#c5a880] block font-normal -mb-2">
              The Secret Behind Our Food
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium block">
              Our 3 Cooking Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#fef9ef] tracking-tight">
              Authentic Taste & Fresh Cooking
            </h2>
            <div className="w-16 h-[1.5px] bg-[#c5a880]/60 mx-auto mt-3"></div>
            <p className="text-stone-300 text-xs sm:text-sm lg:text-base font-light max-w-2xl mx-auto leading-relaxed pt-2">
              Great catering comes from patience and authentic methods. We don't use ready-made pastes or mass shortcuts. Every dish is cooked fresh with real ingredients.
            </p>
          </div>

          {/* 3 Rich Editorial Photo Spread Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Discipline 1: Dum Pukht */}
            <div className="relative group overflow-hidden border border-[#2d2921] hover:border-[#c5a880] transition-all duration-700 bg-[#181713] flex flex-col justify-between shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
                  alt="Slow Hardwood Embers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181713] via-[#181713]/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="font-script text-3xl text-[#c5a880] block">
                    Principle 01
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] block">
                    Clay Sealed Handis
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    Slow Dum Cooking
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-2 space-y-4">
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Clay pots sealed with dough to lock in real aroma and taste. Meats and gravies cook slowly in their own juices until completely tender.
                </p>
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>Royal Awadhi Dum</span>
                  <span className="text-[#c5a880]">Tableside Handi Opening</span>
                </div>
              </div>
            </div>

            {/* Discipline 2: Botanical Spice Extraction */}
            <div className="relative group overflow-hidden border border-[#2d2921] hover:border-[#c5a880] transition-all duration-700 bg-[#181713] flex flex-col justify-between shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1200&auto=format&fit=crop"
                  alt="Hand-ground heritage spices"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181713] via-[#181713]/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="font-script text-3xl text-[#c5a880] block">
                    Principle 02
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] block">
                    Real Whole Spices
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    100% Pure Spices
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-2 space-y-4">
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Real Kashmiri Mongra saffron, green cardamom, and stone-pressed mustard oil. We never use artificial food colors, MSG, or frozen bases.
                </p>
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>Kashmir & Malwa</span>
                  <span className="text-[#c5a880]">Freshly Ground Masalas</span>
                </div>
              </div>
            </div>

            {/* Discipline 3: Silver-Glove Royal Service */}
            <div className="relative group overflow-hidden border border-[#2d2921] hover:border-[#c5a880] transition-all duration-700 bg-[#181713] flex flex-col justify-between shadow-2xl">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                  alt="Royal Dastarkhwan Tablescape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181713] via-[#181713]/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="font-script text-3xl text-[#c5a880] block">
                    Principle 03
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] block">
                    Royal Hospitality
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    Live Counters & Royal Service
                  </h3>
                </div>
              </div>

              <div className="p-6 pt-2 space-y-4">
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Well-dressed professional catering staff, live charcoal sigdi grills, and hot fresh food served with warmth and royal courtesy to every guest.
                </p>
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-400">
                  <span>Trained Staff</span>
                  <span className="text-[#c5a880]">Live Charcoal Theatrics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2.5. OCCASIONS & CELEBRATIONS: YOU CAN BOOK US FOR (WARM IVORY CANVAS)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#fef9ef] text-[#1d1c16] border-b border-[#d0c4b9]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#6f5b41] font-semibold block">
              Catering For Every Occasion
            </span>
            <span className="font-script text-4xl sm:text-5xl text-[#a58d70] block font-normal -mb-2">
              Celebrations of Every Scale
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1d1c16] tracking-tight">
              You Can Book Us For
            </h2>
            <div className="w-16 h-[1.5px] bg-[#6f5b41]/60 mx-auto mt-3"></div>
            <p className="text-stone-600 text-xs sm:text-sm lg:text-base font-light max-w-2xl mx-auto leading-relaxed pt-2">
              From grand royal destination weddings to private home dinners, FoodOnFire serves hot, freshly prepared royal food for all celebrations.
            </p>
          </div>

          {/* 9 Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'LUXURY WEDDINGS',
                tag: 'Grand Weddings',
                desc: 'Grand multi-day wedding banquets, live food counters for sangeet, and royal feasts managed with perfection anywhere in India.',
              },
              {
                num: '02',
                title: 'ELEGANT SIT-DOWN DINING',
                tag: 'Sit-Down Dinners',
                desc: 'Plated multi-course sit-down dinner with professional table service, custom menu cards, and warm hospitality.',
              },
              {
                num: '03',
                title: 'BESPOKE REQUIREMENTS',
                tag: 'Custom Menus',
                desc: 'Customized menu concepts, special dishes, and recreating your favorite family recipes with our master chefs.',
              },
              {
                num: '04',
                title: 'CORPORATE GATHERINGS',
                tag: 'Corporate Events',
                desc: 'Executive business lunches, annual corporate dinners, and conferences handled with professional punctuality and delicious food.',
              },
              {
                num: '05',
                title: 'POP-UP EVENTS',
                tag: 'Live Food Pop-Ups',
                desc: 'Exciting live-fire food counters, food festival setups, and brand events powered by live charcoal grills and tandoors.',
              },
              {
                num: '06',
                title: 'PRIVATE & SOCIAL SOIRÉES',
                tag: 'Family Celebrations',
                desc: 'Anniversary parties, milestone birthdays, and family get-togethers catered with royal flavors and personalized care.',
              },
              {
                num: '07',
                title: 'COCKTAIL RECEPTIONS',
                tag: 'Cocktail Parties',
                desc: 'Hot pass-around finger snacks, live skewered kebabs, refreshing mocktails, and interactive food counters.',
              },
              {
                num: '08',
                title: 'DIETARY-SPECIFIC & WELLNESS MENUS',
                tag: 'Jain & Special Diets',
                desc: 'Dedicated 100% Pure Jain preparation, satvik food for pooja events, organic ingredients, and custom dietary requests.',
              },
              {
                num: '09',
                title: 'INTIMATE DINNERS',
                tag: 'Home & Villa Dinners',
                desc: 'Private chef and live barbecue setup for 10 to 50 guests at your home, villa, or farmhouse.',
              },
            ].map((event) => (
              <div
                key={event.num}
                className="bg-white border border-[#d0c4b9] p-7 flex flex-col justify-between hover:border-[#1d1c16] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl text-[#a58d70] font-light">
                      {event.num}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#6f5b41] bg-[#f5efe4] px-2.5 py-1 font-semibold">
                      {event.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1d1c16] tracking-tight mb-2 group-hover:text-[#6f5b41] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {event.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <Link
                    to="/contact-us"
                    className="text-[11px] uppercase tracking-[0.18em] text-[#1d1c16] group-hover:text-[#6f5b41] font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>Inquire For This Event</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Direct CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#6f5b41] transition-all shadow-md"
            >
              <span>Book Food On Fire For Your Event</span>
              <ArrowRight className="w-4 h-4 text-[#a58d70]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. SIGNATURE BANQUETING TIERS (SKIN / WARM CANVAS)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#fbf6ee] text-[#1d1c16] border-b border-[#d0c4b9]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#6f5b41] font-semibold block">
                All-Inclusive Packages
              </span>
              <span className="font-script text-3xl sm:text-4xl text-[#a58d70] block font-normal -mb-2">
                Choose the best package for your guests
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1d1c16]">
                Our Catering Packages
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1d1c16] hover:text-[#6f5b41] font-medium border-b border-[#1d1c16] pb-1 transition-colors"
            >
              <span>Explore All Packages & Dishes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CATERING_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`relative p-8 sm:p-9 border transition-all duration-500 flex flex-col justify-between ${
                    pkg.isFeatured
                      ? 'bg-white border-[#6f5b41] shadow-xl ring-1 ring-[#6f5b41] -translate-y-1'
                      : 'bg-white/80 border-[#d0c4b9] hover:border-[#1d1c16] hover:-translate-y-1'
                  }`}
                >
                  {pkg.isFeatured && (
                    <span className="absolute -top-3 right-6 bg-[#6f5b41] text-[#fef9ef] text-[9px] uppercase tracking-[0.25em] px-3 py-1 font-medium shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 block mb-1">
                      {pkg.tierTag}
                    </span>
                    <h3 className="font-serif text-2xl text-[#1d1c16] mb-3">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-stone-200">
                      <span className="font-serif text-3xl font-medium text-[#1d1c16]">
                        ₹{pkg.pricePerHead.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        / Guest
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mb-6 leading-relaxed font-light">
                      {pkg.description}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#a58d70] block font-medium">
                        Standard Inclusions:
                      </span>
                      {pkg.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6f5b41] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-200 space-y-3">
                    <button
                      onClick={() => {
                        selectPackage(pkg);
                        setToastMessage(`Selected "${pkg.name}" tier.`);
                        setTimeout(() => setToastMessage(null), 3000);
                      }}
                      className={`w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#6f5b41] text-white shadow-md'
                          : 'bg-[#1d1c16] text-[#fef9ef] hover:bg-[#6f5b41]'
                      }`}
                    >
                      {isSelected ? '✓ Active in Selection' : 'Select This Tier'}
                    </button>
                    <Link
                      to="/menu"
                      className="block text-center text-[10px] uppercase tracking-[0.18em] text-stone-500 hover:text-[#1d1c16]"
                    >
                      Customize dishes for this package →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. SIGNATURE ARCHIVAL DISHES SHOWCASE (DEEP OBSIDIAN BLACK)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#14130f] text-[#fef9ef] border-b border-[#29251e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] block">
              Chef's Recommendations
            </span>
            <span className="font-script text-4xl sm:text-5xl text-[#c5a880] block font-normal -mb-2">
              Loved by Our Guests
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#fef9ef]">
              Signature Royal Dishes
            </h2>
            <div className="w-16 h-[1.5px] bg-[#c5a880]/60 mx-auto mt-2"></div>
            <p className="text-xs sm:text-sm text-stone-300 font-light pt-2">
              Each dish is freshly prepared for grand celebrations, keeping its rich aroma and taste until the last guest is served.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setActiveQuickViewDish(dish)}
                className="bg-[#1c1b16] border border-[#2d2921] p-5 flex flex-col justify-between hover:border-[#c5a880] transition-all duration-500 hover:-translate-y-1.5 shadow-xl group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden mb-4 bg-stone-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                        dish.diet === 'nv'
                          ? 'bg-rose-950/90 text-rose-100 border border-rose-800/50'
                          : 'bg-emerald-950/90 text-emerald-100 border border-emerald-800/50'
                      }`}>
                        {dish.diet === 'nv' ? 'NV' : 'VEG'}
                      </span>
                      {dish.isSignature && (
                        <span className="bg-[#12110e]/90 text-[#c5a880] border border-[#c5a880]/40 px-2 py-0.5 text-[9px] uppercase tracking-wider">
                          Signature
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#12110e]/90 text-[#c5a880] text-[10px] uppercase tracking-wider border border-[#c5a880]/50 backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Look</span>
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a880] block mb-1">
                    {dish.provenance}
                  </span>
                  <h4 className="font-serif text-lg text-[#fef9ef] group-hover:text-[#c5a880] transition-colors leading-snug mb-2">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-stone-300 font-light line-clamp-3 mb-4">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-serif font-medium text-[#c5a880]">
                    Est. ₹{dish.pricePerHeadEstimate}/head
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(dish, e)}
                    className="text-[10px] uppercase tracking-wider font-medium text-[#fef9ef] hover:text-[#12110e] px-3 py-1.5 border border-[#c5a880] hover:bg-[#c5a880] transition-colors"
                  >
                    + Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#c5a880] text-xs uppercase tracking-[0.2em] text-[#c5a880] hover:bg-[#c5a880] hover:text-[#12110e] transition-all duration-300 font-medium"
            >
              <span>View Complete Menu & All Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          5. PATRON TESTIMONIAL (SKIN / WARM SILK PARCHMENT)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#f5efe4] text-[#1d1c16] border-b border-[#d0c4b9]/60">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-script text-5xl sm:text-6xl text-[#6f5b41] block -mb-4">
            An Unforgettable Evening
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 block">
            What Our Clients Say
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl font-normal leading-relaxed text-[#1d1c16] italic">
            "FoodOnFire turned our destination royal wedding into a magical dining experience. 
            The live sigdi charcoal kebabs and fresh Awadhi dum handis were loved by every single guest."
          </blockquote>
          <div className="w-12 h-[1px] bg-[#6f5b41]/40 mx-auto"></div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6f5b41] font-semibold">
              The Singhania Family Wedding
            </p>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">
              Destination Wedding • 650 Guests
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          6. CONCIERGE CALL TO ACTION (DEEP OBSIDIAN BLACK)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef]">
        <div className="max-w-4xl mx-auto bg-[#181713] border border-[#2d2921] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative">
          <span className="font-script text-3xl sm:text-4xl text-[#c5a880] block -mb-2">
            Plan Your Event
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 block">
            Food On Fire Catering Team
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#fef9ef]">
            Book Your Event Catering With Us
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            We accept a limited number of events to ensure fresh cooking and royal quality. 
            Contact our team to book your dates, arrange menu tastings, and get a customized quote for your celebration.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] text-[#12110e] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#fef9ef] transition-colors shadow-lg"
            >
              Explore Menu Packages
            </Link>
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hello FoodOnFire, I would like to arrange catering for an upcoming celebration.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c5a880] text-[#c5a880] text-xs uppercase tracking-[0.2em] hover:bg-[#c5a880] hover:text-[#12110e] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* QUICK VIEW DISH MODAL (MINIMAL ADDON) */}
      {activeQuickViewDish && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181713] text-[#fef9ef] max-w-xl w-full border border-[#c5a880]/50 p-6 sm:p-8 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setActiveQuickViewDish(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] overflow-hidden mb-5 bg-stone-900 border border-[#2d2921]">
              <img
                src={activeQuickViewDish.image}
                alt={activeQuickViewDish.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#c5a880]">
                <span>{activeQuickViewDish.courseTag}</span>
                <span>{activeQuickViewDish.provenance}</span>
              </div>

              <h3 className="font-serif text-2xl text-[#fef9ef]">
                {activeQuickViewDish.name}
              </h3>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {activeQuickViewDish.description}
              </p>

              <div className="p-3 bg-[#12110e] border border-[#2d2921] text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-medium">
                  Flavor Profile:
                </span>
                <span className="text-stone-300 italic">{activeQuickViewDish.flavorNotes}</span>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-800">
                <div>
                  <span className="text-[10px] uppercase text-stone-400 block">Value Estimate</span>
                  <span className="font-serif text-lg text-[#c5a880]">
                    ₹{activeQuickViewDish.pricePerHeadEstimate} / head
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(activeQuickViewDish);
                    setActiveQuickViewDish(null);
                  }}
                  className="px-6 py-2.5 bg-[#c5a880] text-[#12110e] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors"
                >
                  + Add To Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
