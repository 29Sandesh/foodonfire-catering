export type DietType = 'nv' | 'v' | 'vg';

export type CourseCategory = 
  | 'all'
  | 'starters'
  | 'mains'
  | 'biryanis'
  | 'live_counters'
  | 'desserts'
  | 'mocktails'
  | 'soups_salads';

export interface Dish {
  id: string;
  name: string;
  category: CourseCategory;
  courseTag: string;
  diet: DietType;
  pricePerHeadEstimate: number;
  description: string;
  provenance: string;
  flavorNotes: string;
  image: string;
  isSignature?: boolean;
  tier?: 'Salon Tier' | 'Imperial Tier' | 'Atelier Choice';
}

export interface CateringPackage {
  id: string;
  name: string;
  type: 'non-veg' | 'veg';
  tierTag: string;
  pricePerHead: number;
  gstRate: number; // 18%
  minGuests: number;
  description: string;
  inclusions: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  dish: Dish;
  portions: number;
}

export interface MenuEnhancements {
  extraVegCount: number; // +100/head each
  extraNonVegCount: number; // +150/head each
  extraLiveCounterCount: number; // +200/head each
  includeBarCounter: boolean; // Bar counter setup
}

export interface EventParameters {
  guestCount: number;
  serviceStyle: 'buffet' | 'plated' | 'live_hearth';
  targetDate: string;
  venueDestination: string;
  clientName: string;
  clientOrganization?: string;
  clientPhone: string;
  clientEmail: string;
  dietaryNotes?: string;
}
