import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/foodOnFireData';
import { Menu, X, ShoppingBag, PhoneCall, Flame } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalDishItemsCount, isVegOnly, toggleVegOnly } = useCart();

  const navLinks = [
    { label: 'HOME', sub: '', path: '/' },
    { label: 'ABOUT US', sub: 'FoodOnFire', path: '/about-us' },
    { label: 'MENU', sub: '', path: '/menu' },
    { label: 'GALLERY', sub: '', path: '/gallery' },
    { label: 'CONTACT', sub: '', path: '/contact-us' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fef9ef]/95 backdrop-blur-md border-b border-[#d0c4b9]/60 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#12110e] text-[#fef9ef] text-[10px] tracking-[0.22em] uppercase py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3 sm:gap-4">
        <span className="hidden sm:inline">ROYAL CATERING & WEDDING BANQUETS</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
        <span>ALL OVER INDIA</span>
        <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
        <a 
          href={`tel:${BRAND_INFO.conciergePhone}`} 
          className="hidden md:inline hover:text-[#c5a880] transition-colors"
        >
          CALL US: {BRAND_INFO.conciergePhone}
        </a>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Fire Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {/* Flame Emblem Logo */}
          <div className="w-9 h-9 rounded-sm bg-[#12110e] border border-[#c5a880]/60 flex items-center justify-center text-[#c5a880] group-hover:bg-[#6f5b41] group-hover:text-white transition-all shadow-sm">
            <Flame className="w-5 h-5 fill-[#c5a880]/20" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1d1c16] font-normal group-hover:text-[#6f5b41] transition-colors">
            FoodOnFire
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-9">
          {navLinks.map(link => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 flex flex-col items-center group ${
                  active ? 'text-[#1d1c16]' : 'text-stone-600 hover:text-[#1d1c16]'
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em] font-medium transition-colors">
                  {link.label}
                </span>
                {link.sub && (
                  <span className="font-script text-xs text-[#a58d70] -mt-1 tracking-normal transition-colors group-hover:text-[#1d1c16]">
                    {link.sub}
                  </span>
                )}
                {active && (
                  <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#6f5b41]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Veg Only Toggle, Small Cart Icon Button & Contact Now */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Veg Only Toggle Button */}
          <button
            onClick={toggleVegOnly}
            type="button"
            aria-pressed={isVegOnly}
            title={isVegOnly ? "Veg-Only active (Click to show all)" : "Click to view Pure Vegetarian only"}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 border transition-all duration-300 text-xs uppercase tracking-wider select-none ${
              isVegOnly
                ? 'bg-[#0e2417] text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500'
                : 'bg-white/80 text-stone-700 border-[#d0c4b9] hover:border-emerald-600 hover:text-emerald-800'
            }`}
          >
            {/* Standard Indian Veg Symbol: Green Box with Green Dot */}
            <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${
              isVegOnly ? 'border-emerald-400 bg-emerald-950/60' : 'border-emerald-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isVegOnly ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-emerald-700'
              }`}></span>
            </div>

            <span className="font-semibold text-[10px] sm:text-[11px] tracking-wider whitespace-nowrap">
              Veg Only
            </span>

            {/* Micro Toggle Capsule */}
            <div className={`w-6 sm:w-7 h-3.5 sm:h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center shrink-0 ${
              isVegOnly ? 'bg-emerald-500 justify-end' : 'bg-stone-300 justify-start'
            }`}>
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-white shadow-sm"></div>
            </div>
          </button>

          {/* Small Sleek Cart Icon Button */}
          <Link
            to="/my-selection"
            aria-label="View Selection Cart"
            title="My Selection Cart"
            className={`relative p-2.5 border transition-all ${
              location.pathname === '/my-selection'
                ? 'bg-[#12110e] text-[#c5a880] border-[#12110e]'
                : totalDishItemsCount > 0
                ? 'bg-[#f5efe4] text-[#1d1c16] border-[#a58d70] hover:bg-[#12110e] hover:text-[#c5a880]'
                : 'bg-transparent text-stone-800 border-[#d0c4b9] hover:border-[#1d1c16]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalDishItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#6f5b41] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalDishItemsCount}
              </span>
            )}
          </Link>

          {/* Contact Now CTA Button */}
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#12110e] text-[#fef9ef] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#6f5b41] transition-all duration-300 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Contact Now</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 border border-[#d0c4b9] rounded-sm"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fef9ef] border-b border-[#d0c4b9] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm uppercase tracking-[0.2em] py-2 border-b border-stone-200/60 flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-[#1d1c16] font-semibold pl-2 border-l-2 border-[#6f5b41]'
                    : 'text-stone-600'
                }`}
              >
                <span>{link.label}</span>
                {link.sub && (
                  <span className="font-script text-base text-[#a58d70]">{link.sub}</span>
                )}
              </Link>
            ))}
            <Link
              to="/my-selection"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.2em] py-2 text-[#6f5b41] font-medium flex items-center justify-between"
            >
              <span>Selection Cart</span>
              <span className="bg-[#6f5b41] text-[#fef9ef] text-xs px-2 py-0.5 rounded-full">
                {totalDishItemsCount}
              </span>
            </Link>

            {/* Mobile Veg Only Toggle */}
            <div className="pt-2">
              <button
                onClick={toggleVegOnly}
                type="button"
                className={`w-full flex items-center justify-between p-3 border transition-colors ${
                  isVegOnly
                    ? 'bg-[#0e2417] text-emerald-300 border-emerald-500'
                    : 'bg-white text-stone-700 border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${
                    isVegOnly ? 'border-emerald-400 bg-emerald-950/60' : 'border-emerald-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isVegOnly ? 'bg-emerald-400' : 'bg-emerald-700'
                    }`}></span>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {isVegOnly ? 'Veg-Only Mode Active' : 'Enable Veg-Only Filter'}
                  </span>
                </div>
                <div className={`w-7 h-4 rounded-full p-0.5 flex items-center ${
                  isVegOnly ? 'bg-emerald-500 justify-end' : 'bg-stone-300 justify-start'
                }`}>
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm"></div>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <p className="text-[11px] uppercase tracking-wider text-stone-500 mb-1">
              Direct Booking Phone
            </p>
            <a
              href={`tel:${BRAND_INFO.conciergePhone}`}
              className="text-base font-serif text-[#1d1c16] block"
            >
              {BRAND_INFO.conciergePhone}
            </a>
            <p className="text-xs text-stone-500 mt-1">
              Royal Catering Across India
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
