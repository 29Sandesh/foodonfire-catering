import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dish, CateringPackage, CartItem, EventParameters, MenuEnhancements } from '../types';
import { BRAND_INFO, CATERING_PACKAGES } from '../data/foodOnFireData';

export interface FinancialBreakdown {
  guestCount: number;
  packageBase: number;
  enhancementsTotal: number;
  alaCarteTotal: number;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  effectivePerHead: number;
}

interface CartContextType {
  items: CartItem[];
  selectedPackage: CateringPackage | null;
  eventParams: EventParameters;
  enhancements: MenuEnhancements;
  isVegOnly: boolean;
  toggleVegOnly: () => void;
  setIsVegOnly: (val: boolean) => void;
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: string) => void;
  updatePortions: (dishId: string, delta: number) => void;
  clearCart: () => void;
  selectPackage: (pkg: CateringPackage | null) => void;
  updateEventParams: (params: Partial<EventParameters>) => void;
  updateEnhancements: (enhancements: Partial<MenuEnhancements>) => void;
  totalDishItemsCount: number;
  totalEstimatedAmount: number;
  financials: FinancialBreakdown;
  generateWhatsAppUrl: () => string;
}

const STORAGE_KEY_ITEMS = 'foodonfire_selection_items';
const STORAGE_KEY_PKG = 'foodonfire_selected_pkg';
const STORAGE_KEY_PARAMS = 'foodonfire_event_params';
const STORAGE_KEY_ENHANCEMENTS = 'foodonfire_menu_enhancements';
const STORAGE_KEY_VEG_ONLY = 'foodonfire_veg_only';

const initialEventParams: EventParameters = {
  guestCount: 150,
  serviceStyle: 'buffet',
  targetDate: '',
  venueDestination: 'Destination / Venue (Pan-India)',
  clientName: '',
  clientOrganization: '',
  clientPhone: '',
  clientEmail: '',
  dietaryNotes: '',
};

const initialEnhancements: MenuEnhancements = {
  extraVegCount: 0,
  extraNonVegCount: 0,
  extraLiveCounterCount: 0,
  includeBarCounter: false,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedPackage, setSelectedPackage] = useState<CateringPackage | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PKG);
      if (saved) {
        const parsed = JSON.parse(saved);
        return CATERING_PACKAGES.find(p => p.id === parsed.id) || parsed;
      }
      return CATERING_PACKAGES[1]; // Default to Silver Non-Veg
    } catch {
      return CATERING_PACKAGES[1];
    }
  });

  const [eventParams, setEventParams] = useState<EventParameters>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PARAMS);
      return saved ? JSON.parse(saved) : initialEventParams;
    } catch {
      return initialEventParams;
    }
  });

  const [enhancements, setEnhancements] = useState<MenuEnhancements>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ENHANCEMENTS);
      return saved ? JSON.parse(saved) : initialEnhancements;
    } catch {
      return initialEnhancements;
    }
  });

  const [isVegOnly, setIsVegOnly] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VEG_ONLY);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (selectedPackage) {
        localStorage.setItem(STORAGE_KEY_PKG, JSON.stringify(selectedPackage));
      } else {
        localStorage.removeItem(STORAGE_KEY_PKG);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedPackage]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PARAMS, JSON.stringify(eventParams));
    } catch (e) {
      console.error(e);
    }
  }, [eventParams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENHANCEMENTS, JSON.stringify(enhancements));
    } catch (e) {
      console.error(e);
    }
  }, [enhancements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VEG_ONLY, JSON.stringify(isVegOnly));
    } catch (e) {
      console.error(e);
    }
  }, [isVegOnly]);

  const toggleVegOnly = () => {
    setIsVegOnly((prev) => {
      const next = !prev;
      if (next && selectedPackage?.type === 'non-veg') {
        const vegPkg = CATERING_PACKAGES.find(p => p.id === 'veg-silver') || CATERING_PACKAGES.find(p => p.type === 'veg') || null;
        setSelectedPackage(vegPkg);
      }
      return next;
    });
  };

  const setVegOnlyExplicit = (val: boolean) => {
    setIsVegOnly(val);
    if (val && selectedPackage?.type === 'non-veg') {
      const vegPkg = CATERING_PACKAGES.find(p => p.id === 'veg-silver') || CATERING_PACKAGES.find(p => p.type === 'veg') || null;
      setSelectedPackage(vegPkg);
    }
  };

  const addToCart = (dish: Dish) => {
    setItems(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.dish.id === dish.id
            ? { ...item, portions: item.portions + 1 }
            : item
        );
      }
      return [...prev, { dish, portions: 1 }];
    });
  };

  const removeFromCart = (dishId: string) => {
    setItems(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const updatePortions = (dishId: string, delta: number) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.dish.id === dishId) {
            const nextCount = item.portions + delta;
            return nextCount > 0 ? { ...item, portions: nextCount } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const selectPackage = (pkg: CateringPackage | null) => {
    setSelectedPackage(pkg);
  };

  const updateEventParams = (params: Partial<EventParameters>) => {
    setEventParams(prev => ({ ...prev, ...params }));
  };

  const updateEnhancements = (delta: Partial<MenuEnhancements>) => {
    setEnhancements(prev => ({ ...prev, ...delta }));
  };

  const totalDishItemsCount = items.reduce((sum, item) => sum + item.portions, 0);

  // Financial Estimation calculations based on client prospectus:
  const guestCount = eventParams.guestCount || 100;
  const packageRate = selectedPackage ? selectedPackage.pricePerHead : 0;
  const packageBase = packageRate * guestCount;

  // Prospectus rates:
  // Extra veg item = 100 / head
  // Extra non-veg item = 150 / head
  // Extra live counter (3 items) = 200 / head
  const enhancementPerHeadRate = 
    (enhancements.extraVegCount * 100) +
    (enhancements.extraNonVegCount * 150) +
    (enhancements.extraLiveCounterCount * 200);

  const enhancementsTotal = enhancementPerHeadRate * guestCount;

  // Ala carte additions if custom off-menu dishes added without package
  const alaCarteTotal = selectedPackage 
    ? 0 
    : items.reduce((sum, item) => sum + (item.dish.pricePerHeadEstimate * guestCount * item.portions), 0);

  const subtotal = Math.round(packageBase + enhancementsTotal + alaCarteTotal);
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;
  const effectivePerHead = guestCount > 0 ? Math.round(grandTotal / guestCount) : 0;

  const financials: FinancialBreakdown = {
    guestCount,
    packageBase,
    enhancementsTotal,
    alaCarteTotal,
    subtotal,
    gstAmount,
    grandTotal,
    effectivePerHead,
  };

  const generateWhatsAppUrl = (): string => {
    const lines: string[] = [];
    lines.push(`*FOODONFIRE • EVENT CATERING ORDER & SELECTION*`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*CLIENT:* ${eventParams.clientName || 'Guest'}`);
    if (eventParams.clientPhone) lines.push(`*PHONE:* ${eventParams.clientPhone}`);
    if (eventParams.clientEmail) lines.push(`*EMAIL:* ${eventParams.clientEmail}`);
    if (eventParams.clientOrganization) lines.push(`*HOUSE / ORG:* ${eventParams.clientOrganization}`);
    lines.push(`*GUEST COUNT:* ${eventParams.guestCount} Guests`);
    lines.push(`*SERVICE STYLE:* ${eventParams.serviceStyle.toUpperCase()}`);
    if (eventParams.targetDate) lines.push(`*EVENT DATE:* ${eventParams.targetDate}`);
    if (eventParams.venueDestination) lines.push(`*DESTINATION / VENUE:* ${eventParams.venueDestination}`);
    lines.push(``);

    if (selectedPackage) {
      lines.push(`*SELECTED ALL-INCLUSIVE PACKAGE BUFFET:*`);
      lines.push(`⚜️ *${selectedPackage.name.toUpperCase()}*`);
      lines.push(`• Tier: ${selectedPackage.tierTag}`);
      lines.push(`• Rate: ₹${selectedPackage.pricePerHead.toLocaleString('en-IN')}/head (+18% GST)`);
      lines.push(`• Min Guests: ${selectedPackage.minGuests}`);
      lines.push(``);
      lines.push(`*PACKAGE INCLUSIONS:*`);
      selectedPackage.inclusions.forEach((inc, idx) => {
        lines.push(`  ${idx + 1}. ${inc}`);
      });
      lines.push(``);
    }

    // Enhancements
    const activeEnhancements: string[] = [];
    if (enhancements.extraVegCount > 0) {
      activeEnhancements.push(`+ ${enhancements.extraVegCount} Extra Vegetarian Item(s) (@ ₹100/head)`);
    }
    if (enhancements.extraNonVegCount > 0) {
      activeEnhancements.push(`+ ${enhancements.extraNonVegCount} Extra Non-Vegetarian Item(s) (@ ₹150/head)`);
    }
    if (enhancements.extraLiveCounterCount > 0) {
      activeEnhancements.push(`+ ${enhancements.extraLiveCounterCount} Extra Specialty Live Counter(s) - 3 Items (@ ₹200/head)`);
    }
    if (enhancements.includeBarCounter) {
      activeEnhancements.push(`+ Full Bar Counter Setup (Glassware, Soda, Soft Drinks, Ice, Peanut Masala/Fry, Wafers, Finger Salad)`);
    }

    if (activeEnhancements.length > 0) {
      lines.push(`*SELECTED MENU ENHANCEMENTS:*`);
      activeEnhancements.forEach(enh => lines.push(`• ${enh}`));
      lines.push(``);
    }

    if (items.length > 0) {
      lines.push(`*SELECTED DISHES (${items.length} Items):*`);
      items.forEach((item, index) => {
        const dietTag = item.dish.diet === 'nv' ? '[NON-VEG]' : item.dish.diet === 'v' ? '[VEG]' : '[VEGAN]';
        lines.push(`${index + 1}. *${item.dish.name}* ${dietTag}`);
        if (item.dish.description) {
          lines.push(`   Description: ${item.dish.description}`);
        }
        lines.push(`   Category: ${item.dish.courseTag}`);
        if (item.portions > 1) {
          lines.push(`   Multiplier: ${item.portions}x`);
        }
      });
      lines.push(``);
    }

    if (eventParams.dietaryNotes) {
      lines.push(`*SPECIAL INSTRUCTIONS & DIETARY REQUESTS:*`);
      lines.push(`"${eventParams.dietaryNotes}"`);
      lines.push(``);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`*ESTIMATE SUMMARY:*`);
    if (selectedPackage) {
      lines.push(`• Package Base: ₹${packageBase.toLocaleString('en-IN')}`);
    }
    if (enhancementsTotal > 0) {
      lines.push(`• Menu Enhancements: ₹${enhancementsTotal.toLocaleString('en-IN')}`);
    }
    lines.push(`• Subtotal: ₹${subtotal.toLocaleString('en-IN')}`);
    lines.push(`• GST @ 18%: ₹${gstAmount.toLocaleString('en-IN')}`);
    lines.push(`*TOTAL ESTIMATE:* ₹${grandTotal.toLocaleString('en-IN')}`);
    lines.push(`*(Effective ₹${effectivePerHead.toLocaleString('en-IN')} / Guest all-inclusive)*`);
    lines.push(``);
    lines.push(`Sent via FoodOnFire Royal Catering.`);
    lines.push(`Booking Desk: ${BRAND_INFO.conciergePhone} • All Over India`);

    const fullMessage = lines.join('\n');
    return `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(fullMessage)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        selectedPackage,
        eventParams,
        enhancements,
        isVegOnly,
        toggleVegOnly,
        setIsVegOnly: setVegOnlyExplicit,
        addToCart,
        removeFromCart,
        updatePortions,
        clearCart,
        selectPackage,
        updateEventParams,
        updateEnhancements,
        totalDishItemsCount,
        totalEstimatedAmount: grandTotal,
        financials,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
