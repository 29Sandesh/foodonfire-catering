import React, { useState, useMemo } from 'react';
import { DISH_CATALOG, CATERING_PACKAGES, MENU_ENHANCEMENT_OPTIONS } from '../data/foodOnFireData';
import { CourseCategory, DietType, Dish, CateringPackage } from '../types';
import { useCart } from '../context/CartContext';
import { Search, Plus, Minus, Sparkles, Check, CheckCircle2, X, ChevronRight, Utensils, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MenuPage: React.FC = () => {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updatePortions, 
    selectedPackage, 
    selectPackage,
    isVegOnly,
    toggleVegOnly
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'v' | 'nv'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailsPackage, setActiveDetailsPackage] = useState<CateringPackage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories: { label: string; value: CourseCategory }[] = [
    { label: isVegOnly ? 'All Vegetarian Dishes' : 'All Dishes', value: 'all' },
    { label: isVegOnly ? 'Veg Starters & Tandoor' : 'Starters & Kebabs', value: 'starters' },
    { label: isVegOnly ? 'Paneer Curries & Dals' : 'Principal Mains & Dals', value: 'mains' },
    { label: isVegOnly ? 'Handi Veg Dum Biryani' : 'Dum Biryanis', value: 'biryanis' },
    { label: 'Live Specialty Counters', value: 'live_counters' },
    { label: 'Soups & Salads', value: 'soups_salads' },
    { label: 'Desserts & Mithai', value: 'desserts' },
    { label: 'Welcome Drinks', value: 'mocktails' },
  ];

  const filteredPackages = useMemo(() => {
    if (isVegOnly) {
      return CATERING_PACKAGES.filter((p) => p.type === 'veg');
    }
    return CATERING_PACKAGES;
  }, [isVegOnly]);

  const filteredDishes = useMemo(() => {
    return DISH_CATALOG.filter((dish) => {
      // In Veg-Only mode, hide all non-veg
      if (isVegOnly && dish.diet === 'nv') {
        return false;
      }
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      if (selectedDiet !== 'all') {
        if (selectedDiet === 'v' && dish.diet === 'nv') return false;
        if (selectedDiet === 'nv' && dish.diet !== 'nv') return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        const matchesProv = dish.provenance.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesProv;
      }
      return true;
    });
  }, [selectedCategory, selectedDiet, searchQuery, isVegOnly]);

  const getItemCount = (dishId: string) => {
    const found = items.find((item) => item.dish.id === dishId);
    return found ? found.portions : 0;
  };

  const handleAddDish = (dish: Dish, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(dish);
    setToastMessage(`Added "${dish.name}" to selection`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSelectPackage = (pkg: CateringPackage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    selectPackage(pkg);
    setToastMessage(`Selected package "${pkg.name}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper for royal modal border styling
  const getPackageTierBorder = (pkg: CateringPackage) => {
    const isGold = pkg.name.toLowerCase().includes('gold');
    const isSilver = pkg.name.toLowerCase().includes('silver');
    const isBronze = pkg.name.toLowerCase().includes('bronze');

    if (isGold) {
      return {
        border: 'border-[#d4af37]',
        glow: 'shadow-[0_0_35px_rgba(212,175,55,0.35)] ring-2 ring-[#e6ca65]/50',
        titleColor: 'text-[#e6ca65]',
        topLine: 'bg-gradient-to-r from-[#d4af37] via-[#f7e7a9] to-[#d4af37]',
        badge: 'bg-[#d4af37]/20 text-[#f7e7a9] border-[#d4af37]/60',
      };
    }
    if (isSilver) {
      return {
        border: 'border-[#cbd5e1]',
        glow: 'shadow-[0_0_35px_rgba(203,213,225,0.3)] ring-2 ring-[#94a3b8]/50',
        titleColor: 'text-[#f1f5f9]',
        topLine: 'bg-gradient-to-r from-[#94a3b8] via-[#f8fafc] to-[#94a3b8]',
        badge: 'bg-slate-800 text-slate-200 border-slate-500',
      };
    }
    // Bronze
    return {
      border: 'border-[#cd7f32]',
      glow: 'shadow-[0_0_35px_rgba(205,127,50,0.35)] ring-2 ring-[#cd7f32]/50',
      titleColor: 'text-[#e89d60]',
      topLine: 'bg-gradient-to-r from-[#a0522d] via-[#e89d60] to-[#cd7f32]',
      badge: 'bg-[#cd7f32]/20 text-[#e89d60] border-[#cd7f32]/60',
    };
  };

  return (
    <div className="bg-[#fef9ef] text-[#1d1c16] font-sans min-h-screen">
      {/* Sleek Minimal Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#12110e] text-[#fef9ef] border border-[#c5a880] px-4 py-2.5 shadow-2xl transition-all duration-300 flex items-center gap-2.5 animate-fade-in text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. SLEEK SIMPLE HEADER: "The Menu"
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#d0c4b9]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1d1c16] tracking-tight">
              The Menu
            </h1>
            <p className="text-xs text-stone-500 mt-1 uppercase tracking-wider">
              {filteredPackages.length} Turnkey Packages • {filteredDishes.length} Authentic Dishes
            </p>
          </div>

          {/* Quick Info & Active Docket Pill */}
          <div className="flex items-center gap-3">
            {selectedPackage && (
              <Link
                to="/my-selection"
                className="px-3.5 py-1.5 bg-[#12110e] text-[#c5a880] text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#6f5b41] hover:text-white transition-colors"
              >
                <span>Active: {selectedPackage.name.split(' ')[0]} {selectedPackage.name.includes('Non-Veg') ? 'NV' : 'Veg'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. THE 6 PACKAGES (SWIGGY DINEOUT STYLE CARDS WITH OUR LUXURY PALETTE)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef] border-b border-[#29251e]">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold block">
                Foundational Catering Architectures
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-white">
                All-Inclusive Banqueting Packages
              </h2>
            </div>
            {isVegOnly && (
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 border border-emerald-600/60">
                Veg Only Active
              </span>
            )}
          </div>

          {/* Swiggy-Style Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              const isVeg = pkg.type === 'veg';
              const tierStyling = getPackageTierBorder(pkg);

              return (
                <div
                  key={pkg.id}
                  className={`relative overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isVeg
                      ? isSelected
                        ? 'bg-[#0a2014] border-emerald-500 ring-2 ring-emerald-500/60 shadow-xl'
                        : 'bg-[#081e11] border-emerald-800/60 hover:border-emerald-500 hover:shadow-lg'
                      : isSelected
                      ? 'bg-[#280c10] border-rose-500 ring-2 ring-rose-500/60 shadow-xl'
                      : 'bg-[#1f0b0e] border-rose-800/60 hover:border-rose-500 hover:shadow-lg'
                  }`}
                >
                  {/* Top Color Accent Line */}
                  <div
                    className={`h-1.5 w-full ${
                      isVeg
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'
                        : 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600'
                    }`}
                  ></div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Dietary & Tier Badges */}
                      <div className="flex items-center justify-between mb-2">
                        {/* Universal Veg / Non-Veg Indicator */}
                        <div className="flex items-center gap-1.5">
                          {isVeg ? (
                            <div className="w-3.5 h-3.5 border border-emerald-400 bg-[#061e12] flex items-center justify-center shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 border border-rose-400 bg-[#26080c] flex items-center justify-center shrink-0">
                              <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-rose-400"></span>
                            </div>
                          )}
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${
                            isVeg ? 'text-emerald-300' : 'text-rose-300'
                          }`}>
                            {isVeg ? 'Pure Veg' : 'Non-Veg'}
                          </span>
                        </div>

                        {/* Metallic Tier Badge */}
                        <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border font-semibold ${tierStyling.badge}`}>
                          {pkg.name.includes('Bronze') ? 'Bronze Tier' : pkg.name.includes('Silver') ? 'Silver Tier' : 'Gold Tier'}
                        </span>
                      </div>

                      {/* Package Title */}
                      <h3 className="font-serif text-lg sm:text-xl text-white font-medium leading-snug">
                        {pkg.name}
                      </h3>

                      {/* Price Tag */}
                      <div className="mt-2.5 flex items-baseline gap-2">
                        <span className={`font-serif text-2xl sm:text-3xl font-medium ${
                          isVeg ? 'text-emerald-300' : 'text-rose-300'
                        }`}>
                          ₹{pkg.pricePerHead.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-stone-400">/ guest</span>
                        <span className="text-[10px] text-stone-500 ml-auto">+18% GST</span>
                      </div>

                      {/* Brief Highlights */}
                      <p className="text-xs text-stone-300 font-light mt-2 line-clamp-2 leading-relaxed">
                        {pkg.description}
                      </p>

                      {/* Inclusions summary count */}
                      <div className="mt-3 text-[11px] text-stone-400 flex items-center gap-1.5">
                        <span className={isVeg ? 'text-emerald-400' : 'text-rose-400'}>✦</span>
                        <span>{pkg.inclusions.length} Complete Course Inclusions</span>
                      </div>
                    </div>

                    {/* ONLY 2 CLEAN BUTTONS: Show Full Details & Add to Cart */}
                    <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setActiveDetailsPackage(pkg)}
                        className="py-2.5 px-2 border border-stone-600 hover:border-white text-stone-300 hover:text-white text-xs uppercase tracking-wider transition-colors text-center"
                      >
                        Show Full Details
                      </button>

                      <button
                        onClick={(e) => handleSelectPackage(pkg, e)}
                        className={`py-2.5 px-2 text-xs uppercase tracking-wider font-bold transition-all text-center ${
                          isSelected
                            ? isVeg
                              ? 'bg-emerald-500 text-stone-950 ring-1 ring-emerald-300'
                              : 'bg-rose-600 text-white ring-1 ring-rose-300'
                            : isVeg
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-semibold'
                            : 'bg-rose-700 hover:bg-rose-600 text-white font-semibold'
                        }`}
                      >
                        {isSelected ? '✓ In Docket' : '+ Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Menu Enhancements Pill Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400 border-t border-stone-800">
            <span className="text-stone-300">
              <strong className="text-[#c5a880]">Prospectus Enhancements:</strong> Extra Veg: +₹100/guest • Extra Non-Veg: +₹150/guest • Live Counter (3 items): +₹200/guest
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider">
              200 ML Water Bottles Included in all Packages
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. DISH CATALOG (CHATCHASKA STORE STYLE - ZERO IMAGES, CLEAN COMPACT TILES)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-12 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Category Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-[#e5e0d8]">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-wider transition-all rounded-sm ${
                    selectedCategory === cat.value
                      ? 'bg-[#12110e] text-[#fef9ef] font-semibold shadow-xs'
                      : 'bg-white border border-[#dcd6cc] text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input & Veg / Non-Veg Quick Pill Filter */}
            <div className="flex items-center gap-2.5">
              {!isVegOnly && (
                <div className="flex items-center border border-[#dcd6cc] bg-white rounded-sm p-0.5">
                  <button
                    onClick={() => setSelectedDiet('all')}
                    className={`px-2 py-1 text-[10px] uppercase tracking-wider ${
                      selectedDiet === 'all' ? 'bg-[#12110e] text-white font-bold' : 'text-stone-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedDiet('v')}
                    className={`px-2 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1 ${
                      selectedDiet === 'v' ? 'bg-emerald-900 text-emerald-100 font-bold' : 'text-stone-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Veg</span>
                  </button>
                  <button
                    onClick={() => setSelectedDiet('nv')}
                    className={`px-2 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1 ${
                      selectedDiet === 'nv' ? 'bg-rose-900 text-rose-100 font-bold' : 'text-stone-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>NV</span>
                  </button>
                </div>
              )}

              <div className="relative flex-1 sm:w-52">
                <input
                  type="text"
                  placeholder="Search dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-white border border-[#dcd6cc] pl-8 pr-3 py-1.5 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#12110e] rounded-sm"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Dishes Count */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Showing <strong className="text-stone-900">{filteredDishes.length}</strong> items</span>
            <span className="italic">*Prices shown are catalog estimates per guest</span>
          </div>

          {/* ChatChaska Store Style Grid of Dish Tiles (ZERO Images, Clean Structure) */}
          {filteredDishes.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#e5e0d8] p-8 space-y-3 rounded-sm">
              <p className="font-serif text-xl text-stone-500">No dishes match your filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDiet('all');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 bg-[#12110e] text-white text-xs uppercase tracking-wider rounded-sm"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {filteredDishes.map((dish) => {
                const count = getItemCount(dish.id);
                const isVeg = dish.diet !== 'nv';

                return (
                  <div
                    key={dish.id}
                    className="bg-white border border-[#e5e0d8] rounded-sm p-4 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all relative group"
                  >
                    <div className="space-y-1.5">
                      {/* Top Row: Universal Veg / Non-Veg Indicator Dot & Course Tag */}
                      <div className="flex items-center justify-between">
                        {/* Universal Symbol: Green Dot in Green Square / Red Triangle in Red Square */}
                        <div className="flex items-center gap-1.5">
                          {isVeg ? (
                            <div className="w-3.5 h-3.5 border border-emerald-600 bg-white flex items-center justify-center shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            </div>
                          ) : (
                            <div className="w-3.5 h-3.5 border border-rose-600 bg-white flex items-center justify-center shrink-0">
                              <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-rose-600"></span>
                            </div>
                          )}
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            isVeg ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </div>

                        <span className="text-[9px] uppercase tracking-wider text-stone-400">
                          {dish.courseTag.split('•')[0].trim()}
                        </span>
                      </div>

                      {/* Dish Name */}
                      <h4 className="font-serif text-base text-[#1d1c16] font-medium leading-snug group-hover:text-[#6f5b41] transition-colors">
                        {dish.name}
                      </h4>

                      {/* Official Parenthetical Description */}
                      {dish.description && (
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed line-clamp-2">
                          {dish.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Row: Price & Add Button */}
                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-stone-900">
                        ₹{dish.pricePerHeadEstimate} <span className="text-[10px] font-sans font-normal text-stone-500">/head</span>
                      </span>

                      {count === 0 ? (
                        <button
                          onClick={(e) => handleAddDish(dish, e)}
                          className="px-3 py-1 bg-white border border-[#12110e] text-[#12110e] hover:bg-[#12110e] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center border border-emerald-600 bg-emerald-50 rounded-sm">
                          <button
                            onClick={() => updatePortions(dish.id, -1)}
                            className="px-2 py-0.5 text-emerald-800 hover:bg-emerald-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-emerald-900">
                            {count}
                          </span>
                          <button
                            onClick={() => updatePortions(dish.id, 1)}
                            className="px-2 py-0.5 text-emerald-800 hover:bg-emerald-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. ROYAL PACKAGE DETAILS MODAL (BLACK CARD WITH ROYAL METALLIC BORDER)
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeDetailsPackage && (() => {
        const pkg = activeDetailsPackage;
        const isVeg = pkg.type === 'veg';
        const isSelected = selectedPackage?.id === pkg.id;
        const styling = getPackageTierBorder(pkg);

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div
              className={`bg-[#12110e] text-[#fef9ef] max-w-2xl w-full border-2 ${styling.border} ${styling.glow} p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-fade-in`}
            >
              {/* Top Metallic Hairline */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${styling.topLine}`}></div>

              {/* Close Button */}
              <button
                onClick={() => setActiveDetailsPackage(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 text-lg"
              >
                ✕
              </button>

              <div className="space-y-5">
                {/* Header Details */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {/* Universal Veg / Non-Veg Indicator */}
                    {isVeg ? (
                      <div className="w-4 h-4 border border-emerald-400 bg-[#061e12] flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 border border-rose-400 bg-[#26080c] flex items-center justify-center shrink-0">
                        <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-rose-400"></span>
                      </div>
                    )}
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${
                      isVeg ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {isVeg ? 'Pure Vegetarian Banquet' : 'Non-Vegetarian Banquet'}
                    </span>
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 border font-semibold ml-auto ${styling.badge}`}>
                      {pkg.tierTag}
                    </span>
                  </div>

                  <h3 className={`font-serif text-2xl sm:text-3xl font-medium ${styling.titleColor}`}>
                    {pkg.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl text-white">
                      ₹{pkg.pricePerHead.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400">/ guest</span>
                    <span className="text-xs text-[#c5a880] ml-2">+ 18% GST • Min {pkg.minGuests} Guests</span>
                  </div>

                  <p className="text-xs text-stone-300 font-light mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Complete Prospectus Inclusions List */}
                <div className="border border-stone-800 bg-[#171612] p-5 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] block font-semibold">
                    Complete Prospectus Inclusions ({pkg.inclusions.length} Elements):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={isVeg ? 'text-emerald-400' : 'text-rose-400'}>✦</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Standards */}
                <div className="text-[11px] text-stone-400 space-y-1 border-t border-stone-800 pt-3">
                  <p>• Uniformed service brigade, fine crockery, and tableside warmers included.</p>
                  <p>• 200 ML sealed water bottles provided for all attendees.</p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveDetailsPackage(null)}
                    className="px-4 py-2.5 border border-stone-700 text-stone-300 text-xs uppercase tracking-wider hover:text-white"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      handleSelectPackage(pkg);
                      setActiveDetailsPackage(null);
                    }}
                    className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all ${
                      isSelected
                        ? 'bg-stone-200 text-stone-900'
                        : isVeg
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-lg'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg'
                    }`}
                  >
                    {isSelected ? '✓ Package Selected' : '+ Add Complete Package To Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
