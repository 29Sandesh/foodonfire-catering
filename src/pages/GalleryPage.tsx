import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/foodOnFireData';
import { Camera, Eye, X, ArrowRight, Flame, Sparkles, PhoneCall } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'weddings' | 'live_counters' | 'buffets' | 'parties' | 'dishes';
  categoryLabel: string;
  image: string;
  caption: string;
  location: string;
}

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Grand Royal Wedding Banquet',
      category: 'weddings',
      categoryLabel: 'Weddings',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop',
      caption: 'Full-service royal tablescape with candlelit centerpieces and fine bone china.',
      location: 'Destination Wedding',
    },
    {
      id: 'gal-2',
      title: 'Live Sigdi Charcoal Grill',
      category: 'live_counters',
      categoryLabel: 'Live Counters',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop',
      caption: 'Hot skewered kebabs grilled over natural hardwood coals in front of guests.',
      location: 'Live Counter Pass',
    },
    {
      id: 'gal-3',
      title: 'Royal Buffet & Chafing Spread',
      category: 'buffets',
      categoryLabel: 'Buffets',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1600&auto=format&fit=crop',
      caption: 'Lavish food display with hammered brass chafers and chef garnishes.',
      location: 'Grand Reception',
    },
    {
      id: 'gal-4',
      title: 'Palace Sit-Down Feast',
      category: 'weddings',
      categoryLabel: 'Weddings',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      caption: 'Regal long dining table setup for multi-course sit-down wedding service.',
      location: 'Heritage Palace',
    },
    {
      id: 'gal-5',
      title: 'Outdoor Garden Celebration',
      category: 'parties',
      categoryLabel: 'Parties',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1600&auto=format&fit=crop',
      caption: 'Magical open-air banquet illuminated by warm fairy lights and lanterns.',
      location: 'Private Farmhouse',
    },
    {
      id: 'gal-6',
      title: 'Awadhi Clay Handi Dum Biryani',
      category: 'dishes',
      categoryLabel: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1600&auto=format&fit=crop',
      caption: 'Dough-sealed earthen pots cracked tableside with fragrant saffron steam.',
      location: 'Live Tableside Service',
    },
    {
      id: 'gal-7',
      title: 'Murg Malai Tikka on Skewers',
      category: 'dishes',
      categoryLabel: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1600&auto=format&fit=crop',
      caption: 'Tender chicken marinated in Philadelphia cream and cardamom, char-roasted.',
      location: 'Appetizer Pass',
    },
    {
      id: 'gal-8',
      title: 'Cocktail Reception & Welcome Bar',
      category: 'parties',
      categoryLabel: 'Parties',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop',
      caption: 'Handcrafted welcome drinks, mocktails, and fresh botanicals.',
      location: 'Cocktail Party',
    },
    {
      id: 'gal-9',
      title: 'Artisan Dessert & Mithai Spread',
      category: 'buffets',
      categoryLabel: 'Buffets',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1600&auto=format&fit=crop',
      caption: 'Traditional Indian sweets, warm jalebis, and chilled rabdi counters.',
      location: 'Grand Dessert Counter',
    },
    {
      id: 'gal-10',
      title: '24K Saffron Smoked Ribs & Lamb',
      category: 'dishes',
      categoryLabel: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
      caption: 'Slow braised over hardwood charcoal with authentic Kashmiri Mongra saffron.',
      location: 'Chef Special Pass',
    },
    {
      id: 'gal-11',
      title: 'Corporate Gala Dinner Setup',
      category: 'parties',
      categoryLabel: 'Parties',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
      caption: 'Impeccable dining setup for corporate conclaves and business summits.',
      location: 'Corporate Gala',
    },
    {
      id: 'gal-12',
      title: 'Aloo Akhrot Ke Galawati Kebabs',
      category: 'dishes',
      categoryLabel: 'Signature Dishes',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1600&auto=format&fit=crop',
      caption: 'Melt-in-mouth potato and walnut signature patties cooked on Mahi Tawa.',
      location: 'Pure Veg Special',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'weddings', label: 'Weddings & Banquets' },
    { id: 'live_counters', label: 'Live Charcoal Counters' },
    { id: 'buffets', label: 'Royal Buffet Spreads' },
    { id: 'parties', label: 'Cocktails & Parties' },
    { id: 'dishes', label: 'Signature Dishes' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="font-sans bg-[#fef9ef] text-[#1d1c16] min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────────────────
          1. GALLERY HEADER (WARM IVORY)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="pt-14 pb-10 px-4 sm:px-6 lg:px-12 border-b border-[#d0c4b9]/60">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#a58d70]/40 bg-white/70 text-[#6f5b41] text-[10px] sm:text-xs uppercase tracking-[0.25em]">
            <Camera className="w-3.5 h-3.5 text-[#6f5b41]" />
            <span>Food On Fire In Action</span>
          </div>

          <div className="space-y-1">
            <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#a58d70] block leading-none">
              Real Events, Royal Taste
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1d1c16] tracking-tight">
              Event & Food Gallery
            </h1>
          </div>

          <p className="text-stone-600 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto font-light leading-relaxed pt-1">
            Take a look at the grand weddings, live food counters, and royal dining spreads catered by Food On Fire across India.
          </p>

          {/* Filter Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1d1c16] text-[#fef9ef] shadow-md'
                    : 'bg-white border border-[#d0c4b9] text-stone-700 hover:border-[#1d1c16]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          2. PHOTO GRID
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="bg-white border border-[#d0c4b9] overflow-hidden group cursor-pointer hover:border-[#1d1c16] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#12110e]/90 text-[#fef9ef] border border-[#c5a880]/40 px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold backdrop-blur-sm">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#12110e]/90 text-[#c5a880] text-xs uppercase tracking-wider border border-[#c5a880]/60 backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Size</span>
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#6f5b41] font-semibold block">
                      {item.location}
                    </span>
                    <h3 className="font-serif text-lg text-[#1d1c16] group-hover:text-[#6f5b41] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 font-light leading-relaxed mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Click to expand</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a58d70] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. FULL-SIZE IMAGE LIGHTBOX MODAL
          ───────────────────────────────────────────────────────────────────────────── */}
      {activeItem && (
        <div 
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#12110e] text-[#fef9ef] border border-[#c5a880]/50 max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/80 hover:bg-black text-stone-300 hover:text-white border border-stone-700 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo View */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption & Details */}
            <div className="p-6 bg-[#181713] border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] border border-[#c5a880]/40 px-2 py-0.5">
                    {activeItem.categoryLabel}
                  </span>
                  <span className="text-xs text-stone-400">• {activeItem.location}</span>
                </div>
                <h3 className="font-serif text-2xl text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl">
                  {activeItem.caption}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/contact-us"
                  className="px-5 py-2.5 bg-[#c5a880] text-[#12110e] text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
                >
                  Book This Setup
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. BOTTOM CALL TO ACTION (DEEP OBSIDIAN BLACK)
          ───────────────────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 bg-[#12110e] text-[#fef9ef] border-t border-[#29251e]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="font-script text-4xl sm:text-5xl text-[#c5a880] block font-normal -mb-2">
            Celebrate With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#fef9ef]">
            Want a Royal Setup Like This For Your Event?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Tell us about your wedding, corporate dinner, or private party. We bring our live counters, royal buffet, and professional team anywhere in India.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#c5a880] text-[#12110e] text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors shadow-lg"
            >
              Explore Menu & Packages
            </Link>

            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hello FoodOnFire, I loved your event gallery and would like to inquire about catering for an upcoming celebration.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#c5a880] text-[#c5a880] text-xs uppercase tracking-[0.2em] hover:bg-[#c5a880] hover:text-[#12110e] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
