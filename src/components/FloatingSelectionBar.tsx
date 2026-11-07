import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const FloatingSelectionBar: React.FC = () => {
  const { totalDishItemsCount, selectedPackage, totalEstimatedAmount } = useCart();
  const location = useLocation();

  // Hide on the selection page itself
  if (location.pathname === '/my-selection' || totalDishItemsCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-md w-[calc(100%-3rem)] sm:w-auto animate-fade-in">
      <div className="bg-[#1d1c16] text-[#fef9ef] px-5 py-3.5 shadow-2xl border border-[#a58d70]/40 flex items-center justify-between sm:gap-6 rounded-none backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#a58d70]" />
            <span className="absolute -top-1.5 -right-2 bg-[#6f5b41] text-[10px] text-white px-1.5 py-0.2 rounded-full font-bold">
              {totalDishItemsCount}
            </span>
          </div>
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-wider text-stone-300 font-medium">
              {totalDishItemsCount} {totalDishItemsCount === 1 ? 'Dish' : 'Dishes'} Selected
            </p>
            <p className="text-xs font-serif text-[#a58d70] tracking-wide">
              {selectedPackage ? selectedPackage.name : 'Custom Selection'}
            </p>
          </div>
        </div>

        <Link
          to="/my-selection"
          className="flex items-center gap-2 px-3.5 py-2 bg-[#6f5b41] hover:bg-[#a58d70] text-white text-xs uppercase tracking-wider font-medium transition-colors ml-2"
        >
          <span>View Selection</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
