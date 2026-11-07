import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO, CATERING_PACKAGES, MENU_ENHANCEMENT_OPTIONS } from '../data/foodOnFireData';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Printer, 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  FileText,
  X,
  CheckCircle2,
  Utensils,
  Wine,
  Flame
} from 'lucide-react';

export const SelectionPage: React.FC = () => {
  const {
    items,
    selectedPackage,
    eventParams,
    enhancements,
    removeFromCart,
    updatePortions,
    clearCart,
    selectPackage,
    updateEventParams,
    updateEnhancements,
    totalDishItemsCount,
    financials,
    generateWhatsAppUrl,
  } = useCart();

  const [showPrintModal, setShowPrintModal] = useState(false);

  // Group items by category
  const groupedCourses = {
    starters: items.filter(i => i.dish.category === 'starters'),
    mains: items.filter(i => i.dish.category === 'mains'),
    biryanis: items.filter(i => i.dish.category === 'biryanis'),
    live_counters: items.filter(i => i.dish.category === 'live_counters'),
    soups_salads: items.filter(i => i.dish.category === 'soups_salads'),
    desserts: items.filter(i => i.dish.category === 'desserts'),
    mocktails: items.filter(i => i.dish.category === 'mocktails'),
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#fef9ef] text-[#1d1c16] font-sans min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Breadcrumb & Header */}
        <div className="mb-10 pb-6 border-b border-[#d0c4b9]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6f5b41] hover:text-[#1d1c16] mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Digital Menu</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1d1c16]">
              My Selection & Order Planner
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
              Finalize your bespoke banquet composition and dispatch directly to our Royal Concierge.
            </p>
          </div>

          {(items.length > 0 || selectedPackage) && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPrintModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-400 text-xs uppercase tracking-wider text-stone-700 hover:border-black hover:text-black transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#6f5b41]" />
                <span>Print Dossier</span>
              </button>

              <button
                onClick={() => {
                  clearCart();
                  selectPackage(null);
                }}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-500 hover:text-rose-700 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {items.length === 0 && !selectedPackage ? (
          <div className="text-center py-24 bg-white border border-[#d0c4b9] p-8 space-y-6 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#f5efe4] text-[#6f5b41] mx-auto flex items-center justify-center font-serif text-2xl">
              <Flame className="w-7 h-7 text-[#6f5b41]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1d1c16]">
              Your Selection Docket is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Begin by selecting one of our 6 all-inclusive banquet packages (Bronze, Silver, Gold for Non-Veg or Veg) 
              or shortlist bespoke dishes from our 130+ authentic prospectus recipes.
            </p>
            <Link
              to="/menu"
              className="inline-block px-8 py-3.5 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-[0.2em] hover:bg-[#6f5b41] transition-colors"
            >
              Browse Digital Menu & Packages
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 Columns: Items, Package & Course Composition */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Selected Package Banner with Full Inclusions */}
              {selectedPackage ? (
                <div className={`relative overflow-hidden p-6 shadow-xl border-2 transition-all ${
                  selectedPackage.type === 'veg'
                    ? 'bg-gradient-to-r from-[#0a2014] via-[#0d1c15] to-[#12110e] border-emerald-500 text-[#fef9ef]'
                    : 'bg-gradient-to-r from-[#2c0e13] via-[#1e1012] to-[#12110e] border-rose-500 text-[#fef9ef]'
                }`}>
                  {/* Top Color Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                    selectedPackage.type === 'veg'
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'
                      : 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600'
                  }`}></div>

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold shadow-sm ${
                        selectedPackage.type === 'veg'
                          ? 'bg-[#061e12] text-emerald-300 border border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : 'bg-[#26080c] text-rose-300 border border-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      }`}
                    >
                      {selectedPackage.type === 'veg' ? (
                        <span className="w-3 h-3 border border-emerald-400 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        </span>
                      ) : (
                        <span className="w-3 h-3 border border-rose-400 flex items-center justify-center shrink-0">
                          <span className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[6px] border-b-rose-400"></span>
                        </span>
                      )}
                      <span>{selectedPackage.type === 'veg' ? 'Pure Veg Banquet Architecture' : 'Non-Veg Banquet Architecture'}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
                      Turnkey Package Active
                    </span>
                  </div>

                  <div className={`flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b pb-3 ${
                    selectedPackage.type === 'veg' ? 'border-emerald-900/60' : 'border-rose-900/60'
                  }`}>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white">
                        {selectedPackage.name}
                      </h3>
                      <p className="text-xs text-stone-300 mt-0.5">
                        Tier: {selectedPackage.tierTag} • Min {selectedPackage.minGuests} Connoisseurs
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-serif text-2xl sm:text-3xl ${
                        selectedPackage.type === 'veg' ? 'text-emerald-300' : 'text-rose-300'
                      }`}>
                        ₹{selectedPackage.pricePerHead.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-300"> / guest (+18% GST)</span>
                    </div>
                  </div>

                  {/* Complete Inclusions Checklist */}
                  <div className="mt-4 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-stone-300 block mb-2 font-medium">
                      All-Inclusive Package Composition ({selectedPackage.inclusions.length} Inclusions):
                    </span>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-4 border ${
                      selectedPackage.type === 'veg'
                        ? 'bg-[#06180f]/90 border-emerald-900/60 text-emerald-100'
                        : 'bg-[#1a0609]/90 border-rose-900/60 text-rose-100'
                    }`}>
                      {selectedPackage.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            selectedPackage.type === 'veg' ? 'text-emerald-400' : 'text-rose-400'
                          }`} />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                    selectedPackage.type === 'veg' ? 'border-emerald-900/60' : 'border-rose-900/60'
                  }`}>
                    <Link
                      to="/menu"
                      className={`text-xs uppercase tracking-wider hover:underline font-medium ${
                        selectedPackage.type === 'veg' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      Switch To A Different Tier →
                    </Link>
                    <button
                      onClick={() => selectPackage(null)}
                      className="text-xs text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Package</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#f5efe4] border border-[#d0c4b9] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif text-lg text-[#1d1c16]">No Foundational Package Selected</h4>
                    <p className="text-xs text-stone-600 font-light mt-0.5">
                      You are currently building a bespoke a la carte selection. Add an all-inclusive Bronze, Silver, or Gold tier to streamline your order.
                    </p>
                  </div>
                  <Link
                    to="/menu"
                    className="px-4 py-2 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-wider hover:bg-[#6f5b41] transition-colors shrink-0 text-center"
                  >
                    Select A Package
                  </Link>
                </div>
              )}

              {/* 2. Prospectus Menu Enhancements Controls */}
              <div className="bg-white border border-[#d0c4b9] p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#6f5b41] font-semibold block">
                      Prospectus Add-Ons
                    </span>
                    <h3 className="font-serif text-xl text-[#1d1c16]">
                      Menu Enhancements & Stations
                    </h3>
                  </div>
                  <span className="text-xs text-stone-500">
                    Official Prospectus Rates
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {/* Extra Veg Item */}
                  <div className="border border-[#e8dfcf] p-4 bg-[#fcf9f4] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#1d1c16] block">Extra Veg Delicacy</span>
                      <span className="text-xs text-[#6f5b41] font-serif block">+₹100/guest (+taxes)</span>
                      <p className="text-[10px] text-stone-500 mt-1">Additional seasonal or paneer preparation.</p>
                    </div>
                    <div className="flex items-center justify-between border border-[#d0c4b9] bg-white mt-3 p-1">
                      <button
                        onClick={() => updateEnhancements({ extraVegCount: Math.max(0, enhancements.extraVegCount - 1) })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-stone-900">{enhancements.extraVegCount}</span>
                      <button
                        onClick={() => updateEnhancements({ extraVegCount: enhancements.extraVegCount + 1 })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Extra Non-Veg Item */}
                  <div className="border border-[#e8dfcf] p-4 bg-[#fcf9f4] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#1d1c16] block">Extra Non-Veg Item</span>
                      <span className="text-xs text-[#6f5b41] font-serif block">+₹150/guest (+taxes)</span>
                      <p className="text-[10px] text-stone-500 mt-1">Additional royal kebab, mutton, or chicken curry.</p>
                    </div>
                    <div className="flex items-center justify-between border border-[#d0c4b9] bg-white mt-3 p-1">
                      <button
                        onClick={() => updateEnhancements({ extraNonVegCount: Math.max(0, enhancements.extraNonVegCount - 1) })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-stone-900">{enhancements.extraNonVegCount}</span>
                      <button
                        onClick={() => updateEnhancements({ extraNonVegCount: enhancements.extraNonVegCount + 1 })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Extra Live Counter (3 items) */}
                  <div className="border border-[#e8dfcf] p-4 bg-[#fcf9f4] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#1d1c16] block">Specialty Live Counter</span>
                      <span className="text-xs text-[#6f5b41] font-serif block">+₹200/guest (3 Items)</span>
                      <p className="text-[10px] text-stone-500 mt-1">Interactive live wok, chaat, pasta, or Mexican station.</p>
                    </div>
                    <div className="flex items-center justify-between border border-[#d0c4b9] bg-white mt-3 p-1">
                      <button
                        onClick={() => updateEnhancements({ extraLiveCounterCount: Math.max(0, enhancements.extraLiveCounterCount - 1) })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-stone-900">{enhancements.extraLiveCounterCount}</span>
                      <button
                        onClick={() => updateEnhancements({ extraLiveCounterCount: enhancements.extraLiveCounterCount + 1 })}
                        className="px-2 py-0.5 text-stone-600 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bar Counter Toggle */}
                <label className="flex items-start gap-3 p-3 bg-[#f5efe4] border border-[#d0c4b9] cursor-pointer hover:border-[#1d1c16] transition-colors">
                  <input
                    type="checkbox"
                    checked={enhancements.includeBarCounter}
                    onChange={(e) => updateEnhancements({ includeBarCounter: e.target.checked })}
                    className="mt-1 accent-[#6f5b41] w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1d1c16] block">
                      Include Bar Counter Setup (Included with standard service)
                    </span>
                    <span className="text-[11px] text-stone-600 block mt-0.5">
                      Soda, soft drinks, ice cubes, peanut (masala/fry), wafers, finger cut green salad.
                    </span>
                  </div>
                </label>
              </div>

              {/* 3. Curated Dishes Shortlist */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1d1c16]">
                    Curated Dishes Shortlist ({items.length})
                  </h3>
                  <Link
                    to="/menu"
                    className="text-xs uppercase tracking-wider text-[#6f5b41] hover:underline"
                  >
                    + Add More Dishes
                  </Link>
                </div>

                {items.length === 0 ? (
                  <div className="p-6 bg-white border border-dashed border-[#d0c4b9] text-center text-xs text-stone-500">
                    No individual dishes custom shortlisted yet. Your event will be prepared strictly based on your selected package buffet specifications.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.dish.id}
                        className="bg-white border border-[#d0c4b9] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1d1c16] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-16 h-16 object-cover bg-stone-100 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-1.5 py-0.2 text-[8px] uppercase tracking-wider font-bold ${
                                  item.dish.diet === 'nv'
                                    ? 'bg-rose-950 text-rose-100'
                                    : 'bg-emerald-950 text-emerald-100'
                                }`}
                              >
                                {item.dish.diet === 'nv' ? 'NV' : 'VEG'}
                              </span>
                              <span className="text-[10px] uppercase tracking-wider text-stone-500">
                                {item.dish.courseTag}
                              </span>
                            </div>
                            <h4 className="font-serif text-base text-[#1d1c16] leading-snug">
                              {item.dish.name}
                            </h4>
                            <p className="text-xs text-stone-500 font-light line-clamp-1">
                              {item.dish.description}
                            </p>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                          <div className="flex items-center border border-[#d0c4b9] bg-[#fef9ef]">
                            <button
                              onClick={() => updatePortions(item.dish.id, -1)}
                              className="p-1.5 text-stone-600 hover:text-black transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-stone-900">
                              {item.portions}x
                            </span>
                            <button
                              onClick={() => updatePortions(item.dish.id, 1)}
                              className="p-1.5 text-stone-600 hover:text-black transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.dish.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove Dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Course Distribution Audit */}
              <div className="bg-[#fbf6ee] border border-[#d0c4b9] p-6 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6f5b41] font-semibold block">
                  Shortlist Balance Overview
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-700">
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Starters:</span>
                    <strong className="text-stone-900">{groupedCourses.starters.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Mains & Dals:</span>
                    <strong className="text-stone-900">{groupedCourses.mains.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Biryanis:</span>
                    <strong className="text-stone-900">{groupedCourses.biryanis.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Live Counters:</span>
                    <strong className="text-stone-900">{groupedCourses.live_counters.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Soups / Salads:</span>
                    <strong className="text-stone-900">{groupedCourses.soups_salads.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Mithai & Desserts:</span>
                    <strong className="text-stone-900">{groupedCourses.desserts.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Mocktails:</span>
                    <strong className="text-stone-900">{groupedCourses.mocktails.length} Items</strong>
                  </div>
                  <div className="border border-stone-200 bg-white p-2 text-center">
                    <span className="text-stone-500 block text-[9px] uppercase">Total Shortlist:</span>
                    <strong className="text-[#6f5b41]">{items.length} Dishes</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Event Parameters, Financial Ledger & Dispatch */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Event Logistics Parameters */}
              <div className="bg-white border border-[#d0c4b9] p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-lg text-[#1d1c16]">
                    Event Logistics Parameters
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#a58d70]">
                    Logistics Setup
                  </span>
                </div>

                {/* Guest Count Slider & Field */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-600 block mb-2 font-medium">
                    Guest Count: <strong className="text-[#1d1c16] text-sm">{eventParams.guestCount} Connoisseurs</strong>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="25"
                      value={eventParams.guestCount}
                      onChange={(e) => updateEventParams({ guestCount: Number(e.target.value) })}
                      className="w-full accent-[#6f5b41]"
                    />
                    <input
                      type="number"
                      min="50"
                      max="5000"
                      value={eventParams.guestCount}
                      onChange={(e) => updateEventParams({ guestCount: Number(e.target.value) })}
                      className="w-20 border border-stone-300 px-2 py-1 text-xs text-center font-bold"
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    *Minimum 50 guests per official prospectus.
                  </span>
                </div>

                {/* Service Style */}
                <div>
                  <label className="text-xs uppercase tracking-wider text-stone-600 block mb-2 font-medium">
                    Service Architecture:
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'buffet', label: 'Artisanal Buffet' },
                      { id: 'plated', label: 'Silver Plated' },
                      { id: 'live_hearth', label: 'Live Hearth' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => updateEventParams({ serviceStyle: st.id as any })}
                        className={`py-2 px-2 border text-center text-[10px] uppercase tracking-wider transition-all ${
                          eventParams.serviceStyle === st.id
                            ? 'bg-[#1d1c16] text-[#fef9ef] border-[#1d1c16] font-medium'
                            : 'border-stone-300 text-stone-600 hover:border-stone-500'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={eventParams.targetDate}
                      onChange={(e) => updateEventParams({ targetDate: e.target.value })}
                      className="w-full border border-stone-300 px-2.5 py-1.5 text-xs text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                      Venue Destination (Pan-India)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Palace, Resort, Private Estate"
                      value={eventParams.venueDestination}
                      onChange={(e) => updateEventParams({ venueDestination: e.target.value })}
                      className="w-full border border-stone-300 px-2.5 py-1.5 text-xs text-stone-800"
                    />
                  </div>
                </div>

                {/* Patron Particulars */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                        Patron Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={eventParams.clientName}
                        onChange={(e) => updateEventParams({ clientName: e.target.value })}
                        className="w-full border border-stone-300 px-2.5 py-1.5 text-xs text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                        WhatsApp Contact *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 Mobile Number"
                        value={eventParams.clientPhone}
                        onChange={(e) => updateEventParams({ clientPhone: e.target.value })}
                        className="w-full border border-stone-300 px-2.5 py-1.5 text-xs text-stone-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">
                      Dietary Protocols / Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Jain counter requested, extra sigdi live grills, tableside seal cracking..."
                      value={eventParams.dietaryNotes}
                      onChange={(e) => updateEventParams({ dietaryNotes: e.target.value })}
                      className="w-full border border-stone-300 px-2.5 py-1.5 text-xs text-stone-800"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Financial Proposal Ledger */}
              <div className="bg-[#12110e] text-[#fef9ef] p-6 space-y-4 shadow-2xl border border-[#2d2921]">
                <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#c5a880] block font-semibold">
                    Proposal Financial Ledger
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Official Prospectus Rates
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-stone-300 border-b border-stone-700/80 pb-4">
                  {selectedPackage ? (
                    <div className="flex justify-between">
                      <span>
                        Package: <strong className="text-white">{selectedPackage.name}</strong>
                        <span className="block text-[10px] text-stone-400">
                          ₹{selectedPackage.pricePerHead.toLocaleString('en-IN')} × {financials.guestCount} guests
                        </span>
                      </span>
                      <span className="font-serif text-sm text-stone-200">
                        ₹{financials.packageBase.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-stone-400">
                      <span>Package Base</span>
                      <span>Not Selected</span>
                    </div>
                  )}

                  {/* Enhancements Breakdown */}
                  {financials.enhancementsTotal > 0 && (
                    <div className="flex justify-between text-amber-200/90 pt-1 border-t border-stone-800">
                      <span>
                        Menu Enhancements Total:
                        <span className="block text-[10px] text-stone-400">
                          {enhancements.extraVegCount > 0 && `+${enhancements.extraVegCount} Veg `}
                          {enhancements.extraNonVegCount > 0 && `+${enhancements.extraNonVegCount} Non-Veg `}
                          {enhancements.extraLiveCounterCount > 0 && `+${enhancements.extraLiveCounterCount} Live `}
                        </span>
                      </span>
                      <span className="font-serif text-sm">
                        +₹{financials.enhancementsTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between text-stone-300 pt-2 border-t border-stone-800">
                    <span>Subtotal (Before GST)</span>
                    <span className="font-serif">₹{financials.subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* 18% GST */}
                  <div className="flex justify-between text-stone-400">
                    <span>Applicable GST (18%)</span>
                    <span>₹{financials.gstAmount.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Bar Counter Service */}
                  {enhancements.includeBarCounter && (
                    <div className="flex justify-between text-[#c5a880] text-[11px]">
                      <span>Bar Counter Setup & Mixers</span>
                      <span>Included</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Uniformed Brigade & Standard Setup</span>
                    <span>Included</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-xs uppercase tracking-wider text-stone-300">
                    Grand Proposal Total:
                  </span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-medium text-[#c5a880]">
                      ₹{financials.grandTotal.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                      (Effective ₹{financials.effectivePerHead.toLocaleString('en-IN')} / Connoisseur all-inclusive)
                    </span>
                  </div>
                </div>

                {/* Dispatch Button: WhatsApp */}
                <div className="pt-4 space-y-2.5">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#c5a880] hover:bg-white text-[#12110e] text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Send className="w-4 h-4 text-[#12110e]" />
                    <span>Send Complete Order To Concierge</span>
                  </a>

                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="w-full py-2.5 border border-stone-600 hover:border-[#c5a880] text-stone-300 hover:text-white text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>View / Print Formal Proposal Dossier</span>
                  </button>
                </div>

                <p className="text-[10px] text-stone-500 font-light text-center leading-relaxed pt-1">
                  Dispatches directly to Executive Concierge: {BRAND_INFO.conciergePhone}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRINT / EXPORT FORMAL PROPOSAL DOSSIER MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white">
          <div className="bg-white text-[#1d1c16] max-w-3xl w-full border border-stone-300 p-8 sm:p-12 shadow-2xl max-h-[92vh] overflow-y-auto print:max-h-none print:overflow-visible print:border-none print:shadow-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6 print:hidden">
              <span className="text-xs uppercase tracking-[0.2em] text-[#6f5b41] font-semibold">
                Official Proposal Dossier
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 bg-[#1d1c16] text-[#fef9ef] text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#6f5b41]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1 text-stone-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Content */}
            <div className="space-y-6">
              {/* Dossier Header */}
              <div className="border-b-2 border-[#1d1c16] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-5 h-5 text-[#6f5b41]" />
                    <span className="font-serif text-3xl font-normal tracking-tight text-[#1d1c16]">
                      FoodOnFire
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#6f5b41] block">
                    Royal Banqueting Atelier • Pan-India
                  </span>
                  <p className="text-xs text-stone-500 mt-1">
                    Concierge Desk: {BRAND_INFO.conciergePhone} • {BRAND_INFO.email}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-stone-600">
                  <p><strong>Dossier Ref:</strong> FOF-{Date.now().toString().slice(-6)}</p>
                  <p><strong>Date Generated:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Patron & Event Particulars */}
              <div className="bg-[#fcf9f4] p-4 border border-[#e8dfcf] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase">Patron:</span>
                  <strong className="text-stone-900">{eventParams.clientName || 'Private Patron'}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase">Contact:</span>
                  <strong className="text-stone-900">{eventParams.clientPhone || 'On File'}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase">Guests:</span>
                  <strong className="text-stone-900">{financials.guestCount} Connoisseurs</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[9px] uppercase">Target Date:</span>
                  <strong className="text-stone-900">{eventParams.targetDate || 'TBD'}</strong>
                </div>
              </div>

              {/* Package Specifications */}
              {selectedPackage && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h4 className="font-serif text-lg text-[#1d1c16]">
                      01. Foundational Banquet Package: {selectedPackage.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#6f5b41]">
                      ₹{selectedPackage.pricePerHead.toLocaleString('en-IN')}/guest (+18% GST)
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-light">{selectedPackage.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700 bg-stone-50 p-3">
                    {selectedPackage.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-[#6f5b41]">✦</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Shortlisted Custom Dishes */}
              {items.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif text-lg text-[#1d1c16] border-b border-stone-200 pb-2">
                    02. Shortlisted Curated Creations ({items.length} Dishes)
                  </h4>
                  <div className="space-y-2 text-xs">
                    {items.map((item, idx) => (
                      <div key={item.dish.id} className="flex items-start justify-between border-b border-stone-100 pb-1.5">
                        <div>
                          <strong className="text-stone-900">{idx + 1}. {item.dish.name}</strong>{' '}
                          <span className="text-[10px] text-stone-500">[{item.dish.diet === 'nv' ? 'NV' : 'VEG'}]</span>
                          <span className="text-stone-500 block text-[11px]">{item.dish.description}</span>
                        </div>
                        <span className="text-stone-600 text-[11px] shrink-0">{item.portions}x Multiplier</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financial Breakdown Table */}
              <div className="border-t-2 border-[#1d1c16] pt-4">
                <table className="w-full text-xs">
                  <tbody>
                    {selectedPackage && (
                      <tr className="border-b border-stone-100">
                        <td className="py-1.5">Package Base ({selectedPackage.name} × {financials.guestCount})</td>
                        <td className="py-1.5 text-right font-mono">₹{financials.packageBase.toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                    {financials.enhancementsTotal > 0 && (
                      <tr className="border-b border-stone-100">
                        <td className="py-1.5">Selected Menu Enhancements</td>
                        <td className="py-1.5 text-right font-mono">₹{financials.enhancementsTotal.toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                    <tr className="border-b border-stone-100 font-semibold">
                      <td className="py-1.5">Subtotal</td>
                      <td className="py-1.5 text-right font-mono">₹{financials.subtotal.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-b border-stone-100 text-stone-600">
                      <td className="py-1.5">GST @ 18%</td>
                      <td className="py-1.5 text-right font-mono">₹{financials.gstAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="font-serif text-base font-bold text-[#1d1c16]">
                      <td className="py-2.5">Grand Total Proposal</td>
                      <td className="py-2.5 text-right font-mono text-[#6f5b41]">₹{financials.grandTotal.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-stone-200 text-[10px] text-stone-500 space-y-1">
                <p>• Final prices subject to venue kitchen infrastructure inspection and seasonal availability.</p>
                <p>• 200 ML sealed packaged water bottles included across all service architectures.</p>
                <p>• Tasting sessions arranged upon formal date reservation.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
