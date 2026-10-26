'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Download, 
  Check, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  Smartphone, 
  Globe, 
  X, 
  Star, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Search, 
  Flame, 
  Info, 
  Utensils, 
  Share2, 
  Navigation,
  Home,
  Store,
  Tag,
  Copy,
  Play,
  QrCode,
  Mail,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';
import QRCode from 'qrcode';
import { DigitalProfile, ServiceItem, ProductItem, VideoItem } from '@/lib/types';
import { downloadVcfFile } from '@/lib/vcf';
import SocialIcon from '@/components/common/SocialIcon';

interface RestaurantTemplateViewProps {
  profile: DigitalProfile;
  cart: { product: ProductItem; quantity: number }[];
  addToCart: (product: ProductItem) => void;
  updateQuantity: (productId: string, delta: number) => void;
  setIsCartOpen: (open: boolean) => void;
  selectedCurrency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
  setSelectedCurrency: (c: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED') => void;
  formatPrice: (inrPrice: number, curr?: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED') => string;
  totalConvertedPrice: string | number;
  setIsUPIModalOpen: (open: boolean) => void;
  setBookingService: (srv: ServiceItem | null) => void;
  setBookingSuccess: (s: boolean) => void;
  quoteServices: ServiceItem[];
  toggleQuoteService: (srv: ServiceItem) => void;
  sendWhatsAppQuotation: () => void;
  leadName: string;
  setLeadName: (v: string) => void;
  leadEmail: string;
  setLeadEmail: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  leadMessage: string;
  setLeadMessage: (v: string) => void;
  handleLeadSubmit: (e: React.FormEvent) => void;
  leadSuccess: boolean;
  trackAction: (action: string) => void;
  getCleanWhatsAppNumber: (p: DigitalProfile) => string;
  getEmbedUrl?: (v: VideoItem) => string;
  viewMode: 'mobile' | 'website';
  setViewMode: (m: 'mobile' | 'website') => void;
  showViewToggle?: boolean;
}

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  isVeg: boolean;
  isSpecial?: boolean;
  spiceLevel: 1 | 2 | 3;
  prepTime: string;
  serves: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  chefNote?: string;
  pairWith?: string;
  calories?: string;
}

export interface ComboDeal {
  id: string;
  name: string;
  tag: string;
  badgeColor: string;
  serves: string;
  originalPrice: number;
  dealPrice: number;
  savings: number;
  imageUrl: string;
  description: string;
  itemsList: string[];
  isVeg: boolean;
}

// Curated Discount Combos & Offers
export const COMBO_DEALS: ComboDeal[] = [
  {
    id: 'deal_1',
    name: '👑 Royal Grand Dining Feast',
    tag: '🔥 31% OFF • BESTSELLER',
    badgeColor: 'bg-[#C1621F]',
    serves: 'Serves 3–4',
    originalPrice: 1450,
    dealPrice: 999,
    savings: 451,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Our most popular dining banquet combo! Perfect for family celebrations or gatherings with friends.',
    itemsList: [
      'Murgh Tandoori Tikka (or Paneer Tikka)',
      'Andhra Special Chicken 65',
      'Butter Chicken (or Paneer Butter Masala)',
      'Dal Makhani Overnight Dum',
      '4x Butter Garlic Naans',
      '4x Warm Gulab Jamun with Rabdi'
    ],
    isVeg: false
  },
  {
    id: 'deal_2',
    name: '🍗 Hyderabadi Dum Biryani Feast for 2',
    tag: '⚡ FLASH DEAL • SAVE ₹191',
    badgeColor: 'bg-[#7E1717]',
    serves: 'Serves 2',
    originalPrice: 690,
    dealPrice: 499,
    savings: 191,
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic royal handi dum biryani accompanied by fiery starters, mirchi salan, and cold beverages.',
    itemsList: [
      '1x Hyderabadi Chicken (or Veg) Dum Biryani Handi',
      '1x Andhra Chicken 65 / Paneer Tikka',
      'Mirchi Ka Salan & Cucumber Raita',
      '2x Chilled Beverages'
    ],
    isVeg: false
  },
  {
    id: 'deal_3',
    name: '🌿 Shahi Maharaja Veg Thali Feast',
    tag: '🌱 100% PURE VEG SPECIAL',
    badgeColor: 'bg-[#2E4D2A]',
    serves: 'Serves 2–3',
    originalPrice: 790,
    dealPrice: 590,
    savings: 200,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'An opulent royal vegetarian spread slow-simmered in pure desi cow ghee and rich cashew gravies.',
    itemsList: [
      'Paneer Butter Masala Royal',
      'Dal Makhani Overnight Dum',
      'Kadhai Vegetable Peshawari',
      '3x Butter Garlic Naans',
      'Steamed Basmati Jeera Rice',
      '2x Artisanal Mango Malai Kulfi'
    ],
    isVeg: true
  }
];

// Active Discount Coupons
export const PROMO_COUPONS = [
  { code: 'TASTE20', discount: 'Flat 20% OFF', description: 'Applicable on dining & takeaway above ₹500', minOrder: 500 },
  { code: 'FIRSTBITE', discount: 'Free Rabdi Jamun', description: 'Complimentary dessert on your 1st WhatsApp order', minOrder: 350 },
  { code: 'BIRYANI50', discount: '₹50 Flat OFF', description: 'Extra instant off on all Dum Biryani orders', minOrder: 300 }
];

// 20 Handcrafted Gourmet Dishes (Veg & Non-Veg with strictly matching images)
const DEFAULT_RESTAURANT_DISHES: MenuItemData[] = [
  {
    id: 'dish_1',
    name: 'Paneer Tikka Angaara',
    price: 280,
    originalPrice: 320,
    category: 'Starters',
    isVeg: true,
    isSpecial: true,
    spiceLevel: 2,
    prepTime: '15-18 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    description: 'Succulent malai cottage cheese cubes infused with Kashmiri deghi mirch, spiced hung curd, and stone-ground garam masala, slow charcoal-roasted on iron skewers.',
    ingredients: ['Fresh Cottage Cheese (Paneer)', 'Kashmiri Degi Mirch', 'Spiced Hung Curd', 'Bell Peppers', 'Mustard Oil & Chaat Masala'],
    chefNote: 'Marinated for 6 hours in artisanal smoked yogurt and roasted in a traditional clay tandoor.',
    pairWith: 'Garlic Butter Naan & Pudina Chutney',
    calories: '340 kcal'
  },
  {
    id: 'dish_2',
    name: 'Crispy Lotus Stem Honey Chilli',
    price: 260,
    originalPrice: 290,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 2,
    prepTime: '12-15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    description: 'Wafer-thin lotus root slices wok-tossed to a crisp finish with toasted sesame seeds, fresh scallions, crushed garlic, and a tangy sweet-chilli honey glaze.',
    ingredients: ['Fresh Lotus Stem (Kamal Kakdi)', 'Wild Honey', 'Roasted White Sesame', 'Spring Onions', 'Garlic & Birdseye Chili'],
    chefNote: 'Flash-fried in high-heat woks for optimum crunch and glazed right before serving.',
    pairWith: 'Chilled Mango Lassi',
    calories: '280 kcal'
  },
  {
    id: 'dish_3',
    name: 'Ghee Roast Mushroom Pepper Fry',
    price: 270,
    originalPrice: 310,
    category: 'Starters',
    isVeg: true,
    isSpecial: true,
    spiceLevel: 3,
    prepTime: '15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh plump button mushrooms tossed in slow-roasted Kundapur ghee masala with fresh curry leaves, Tellicherry crushed black peppercorns, and whole spices.',
    ingredients: ['Button Mushrooms', 'Desi Cow Ghee', 'Tellicherry Black Pepper', 'Curry Leaves', 'Kundapur Spice Blend'],
    chefNote: 'A coastal Karnataka specialty cooked gently in aromatic clarified butter until fragrant.',
    pairWith: 'Neer Dosa or Rumali Roti',
    calories: '260 kcal'
  },
  {
    id: 'dish_4',
    name: 'Golden Corn Cheese Croquettes',
    price: 240,
    originalPrice: 280,
    category: 'Starters',
    isVeg: true,
    spiceLevel: 1,
    prepTime: '10-12 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp panko-crusted molten croquettes stuffed with sweet American corn kernels, melted mozzarella, chopped jalapeños, and fresh herb seasoning.',
    ingredients: ['Sweet American Corn', 'Mozzarella & Cheddar', 'Panko Crumbs', 'Pickled Jalapeños', 'Cream & Herbs'],
    chefNote: 'Served piping hot with our signature smoked paprika dip.',
    pairWith: 'Cold Brew or Mint Lemonade',
    calories: '310 kcal'
  },
  {
    id: 'dish_5',
    name: 'Paneer Butter Masala Royal',
    price: 320,
    originalPrice: 360,
    category: 'Main Course',
    isVeg: true,
    isSpecial: true,
    spiceLevel: 1,
    prepTime: '18-20 mins',
    serves: 'Serves 2-3',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    description: 'A velvety smooth reduction of ripe plum tomatoes, cashew butter, and aromatic whole spices, finished with fresh cream, kasuri methi, and melt-in-mouth cottage cheese.',
    ingredients: ['Malai Paneer', 'Plum Tomatoes', 'Cashew Cream', 'Makkhan (White Butter)', 'Kasuri Methi', 'Cardamom'],
    chefNote: 'Double-strained satin gravy simmered gently for over 2 hours for that royal Mughlai texture.',
    pairWith: 'Butter Garlic Naan or Tandoori Kulcha',
    calories: '420 kcal'
  },
  {
    id: 'dish_6',
    name: 'Dal Makhani Overnight Dum',
    price: 290,
    originalPrice: 330,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 1,
    prepTime: '15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Whole black urad lentils and rajma beans slow-cooked on glowing charcoal embers for 18 hours with churned white butter, rich tomato puree, and mild royal spices.',
    ingredients: ['Black Urad Dal', 'Rajma Kidney Beans', 'Churned White Butter', 'Fresh Cream', 'Degi Mirch & Ginger'],
    chefNote: 'Patience is our key ingredient. The velvety consistency comes purely from slow overnight simmering.',
    pairWith: 'Laccha Paratha or Jeera Rice',
    calories: '380 kcal'
  },
  {
    id: 'dish_7',
    name: 'Kadhai Vegetable Peshawari',
    price: 290,
    originalPrice: 320,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 2,
    prepTime: '15-18 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp bell peppers, baby corn, broccoli florets, and paneer cubes wok-tossed in a robust onion-tomato gravy with freshly hand-pounded kadhai coriander and dry red chilies.',
    ingredients: ['Bell Peppers (Tricolor)', 'Paneer', 'Baby Corn & Broccoli', 'Pounded Coriander Seeds', 'Kadhai Masala'],
    chefNote: 'Cooked on intense open flame in cast-iron kadhais to preserve the natural crispness of fresh vegetables.',
    pairWith: 'Tandoori Roti with Ghee',
    calories: '310 kcal'
  },
  {
    id: 'dish_8',
    name: 'Dum Aloo Kashmiri Saffron',
    price: 310,
    originalPrice: 350,
    category: 'Main Course',
    isVeg: true,
    spiceLevel: 2,
    prepTime: '18 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    description: 'Tender baby potatoes stuffed with minced paneer, pistachios, and raisins, simmered slowly in an aromatic yogurt-fennel gravy infused with real Kashmiri saffron.',
    ingredients: ['Baby Potatoes', 'Kashmiri Saffron (Kesar)', 'Dry Fruits & Paneer Stuffing', 'Saunf (Fennel Powder)', 'Hung Curd'],
    chefNote: 'An authentic wazwan-inspired royal vegetarian delicacy with delicate floral saffron notes.',
    pairWith: 'Steamed Basmati Rice or Missi Roti',
    calories: '330 kcal'
  },
  {
    id: 'dish_9',
    name: 'Hyderabadi Shahi Veg Dum Biryani',
    price: 340,
    originalPrice: 390,
    category: 'Biryani & Rice',
    isVeg: true,
    isSpecial: true,
    spiceLevel: 2,
    prepTime: '20 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Aged long-grain Dehradun basmati rice sealed in earthen pots with marinated seasonal vegetables, fried brown onions (birista), fresh mint, desi ghee, and saffron milk.',
    ingredients: ['Aged Long-Grain Basmati Rice', 'Saffron Infused Milk', 'Crispy Golden Onions', 'Fresh Mint & Coriander', 'Shahi Whole Spices', 'Desi Cow Ghee'],
    chefNote: 'Slow-cooked under dough seal (dum pukht) so every grain absorbs the fragrant bouquet of spices.',
    pairWith: 'Mirchi Ka Salan & Cucumber Raita (Included)',
    calories: '490 kcal'
  },
  {
    id: 'dish_10',
    name: 'Avakai Ghee Rice with Crisp Appalam',
    price: 260,
    originalPrice: 290,
    category: 'Biryani & Rice',
    isVeg: true,
    spiceLevel: 3,
    prepTime: '10-12 mins',
    serves: 'Serves 1-2',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    description: 'Piping hot steamed sona masuri rice hand-tossed with spicy Andhra avakaya mango pickle masala and generous ladles of warm clarified butter. Comfort food at its peak.',
    ingredients: ['Steamed Rice', 'Traditional Avakaya Mango Pickle', 'Hot Desi Ghee', 'Roasted Peanuts', 'Fried Appalams'],
    chefNote: 'A nostalgic South Indian treat. Spice level can be balanced with extra dollops of ghee upon request.',
    pairWith: 'Cold Spiced Chaas (Buttermilk)',
    calories: '360 kcal'
  },
  {
    id: 'dish_11',
    name: 'Butter Garlic Naan (2 Pcs)',
    price: 90,
    originalPrice: 110,
    category: 'Breads',
    isVeg: true,
    spiceLevel: 1,
    prepTime: '8-10 mins',
    serves: '2 Pieces',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    description: 'Pillowy, charred leavened flatbread baked in the intense heat of a clay tandoor, liberally brushed with creamy garlic butter and dusted with chopped cilantro.',
    ingredients: ['Refined Flour (Maida)', 'Roasted Garlic Mince', 'Creamy Salted Butter', 'Fresh Coriander', 'Milk & Nigella Seeds'],
    chefNote: 'Baked to order. Soft in the center with irresistible crispy, blistered edges.',
    pairWith: 'Paneer Butter Masala or Dal Makhani',
    calories: '220 kcal'
  },
  {
    id: 'dish_12',
    name: 'Amritsari Stuffed Aloo Kulcha',
    price: 110,
    originalPrice: 130,
    category: 'Breads',
    isVeg: true,
    spiceLevel: 2,
    prepTime: '10-12 mins',
    serves: '1 Large Kulcha',
    imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    description: 'Crisp, layered Amritsari bread stuffed with spiced potato mash, green chilies, roasted cumin, and dried pomegranate (anardana) seeds. Crushed with fresh churned butter.',
    ingredients: ['Layered Kulcha Dough', 'Spiced Potato Mash', 'Anardana (Pomegranate Seeds)', 'Green Chilies', 'Fresh White Butter'],
    chefNote: 'Lightly crushed by hand right out of the tandoor to release the fragrant layers.',
    pairWith: 'Pindi Chole or Cold Sweet Lassi',
    calories: '270 kcal'
  },
  {
    id: 'dish_13',
    name: 'Warm Gulab Jamun with Rabdi',
    price: 160,
    originalPrice: 190,
    category: 'Desserts & Drinks',
    isVeg: true,
    isSpecial: true,
    spiceLevel: 1,
    prepTime: '5-8 mins',
    serves: 'Serves 1-2',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    description: 'Golden fried khoya milk dumplings soaked in warm rose and green cardamom sugar syrup, rested gracefully atop thick, slow-reduced chilled lachha rabdi.',
    ingredients: ['Fresh Khoya (Mawa)', 'Chilled Lachha Rabdi', 'Cardamom & Rose Water', 'Silver Leaf (Vark)', 'Pistachio Silvers'],
    chefNote: 'The sublime contrast of steaming hot gulab jamun and cold creamy rabdi is sheer heaven.',
    pairWith: 'Cardamom Masala Chai',
    calories: '390 kcal'
  },
  {
    id: 'dish_14',
    name: 'Artisanal Mango Malai Kulfi',
    price: 120,
    originalPrice: 150,
    category: 'Desserts & Drinks',
    isVeg: true,
    spiceLevel: 1,
    prepTime: '5 mins',
    serves: '1 Portion',
    imageUrl: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional slow-reduced dense milk kulfi infused with pure Ratnagiri Alphonso mango pulp, green cardamom, and roasted almond slivers.',
    ingredients: ['Full Cream Milk Reduced 4x', 'Alphonso Mango Puree', 'Crushed Pistachios', 'Green Cardamom', 'Organic Sugar'],
    chefNote: 'No artificial essences or gelatin. 100% natural reduced dairy excellence.',
    pairWith: 'Fresh Mint Leaves & Saffron strands',
    calories: '240 kcal'
  },
  // --- NON-VEGETARIAN SPECIALTIES (7 GOURMET DISHES) ---
  {
    id: 'dish_15',
    name: 'Murgh Tandoori Chicken Tikka',
    price: 340,
    originalPrice: 380,
    category: 'Starters',
    isVeg: false,
    isSpecial: true,
    spiceLevel: 2,
    prepTime: '15-18 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    description: 'Tender boneless chicken thigh pieces marinated overnight in spiced hung curd, Kashmiri red chili, mustard oil, and stone-ground spices, charcoal-grilled to smoky perfection.',
    ingredients: ['Boneless Chicken Thighs', 'Kashmiri Chili & Hung Curd', 'Mustard Oil', 'Garlic-Ginger Paste', 'Smoked Chaat Masala'],
    chefNote: 'Charcoal charred on high flame skewers. Tender and succulent inside with crispy edges.',
    pairWith: 'Rumali Roti & Laccha Onion Salad',
    calories: '390 kcal'
  },
  {
    id: 'dish_16',
    name: 'Andhra Special Chicken 65',
    price: 320,
    originalPrice: 360,
    category: 'Starters',
    isVeg: false,
    spiceLevel: 3,
    prepTime: '12-15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    description: 'Crispy fried boneless chicken bites tossed with fresh curry leaves, crushed garlic, and fiery green chilies in spicy house seasoning.',
    ingredients: ['Tender Chicken Morsels', 'Fresh Curry Leaves', 'Guntur Red Chili Powder', 'Crushed Garlic', 'Lime Juice'],
    chefNote: 'A crowd favorite appetizer! Perfectly crispy exterior with juicy flavor bursts.',
    pairWith: 'Cold Thums Up or Spiced Mint Buttermilk',
    calories: '380 kcal'
  },
  {
    id: 'dish_17',
    name: 'Hyderabadi Chicken Dum Biryani',
    price: 390,
    originalPrice: 440,
    category: 'Biryani & Rice',
    isVeg: false,
    isSpecial: true,
    spiceLevel: 2,
    prepTime: '20 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic royal kacchi dum biryani layered with marinated farm chicken, aged basmati rice, pure desi ghee, saffron milk, and caramelized golden onions. Cooked in dough-sealed handi.',
    ingredients: ['Aged Long-Grain Basmati Rice', 'Farm Fresh Tender Chicken', 'Saffron Milk', 'Desi Cow Ghee', 'Birista Onions', 'Boiled Farm Egg'],
    chefNote: 'Slow-cooked over hot coals (dum pukht) to seal in all juices and rich aromatic flavors. Served with spicy mirchi salan.',
    pairWith: 'Mirchi Ka Salan & Cucumber Raita (Included)',
    calories: '580 kcal'
  },
  {
    id: 'dish_18',
    name: 'Delhi Butter Chicken (Murgh Makhani)',
    price: 380,
    originalPrice: 420,
    category: 'Main Course',
    isVeg: false,
    isSpecial: true,
    spiceLevel: 1,
    prepTime: '18 mins',
    serves: 'Serves 2-3',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    description: 'Succulent tandoor-roasted chicken tikka simmered in an iconic velvet gravy of ripe tomatoes, churned white butter, cashew cream, and fragrant kasuri methi.',
    ingredients: ['Charcoal Roasted Chicken', 'Plum Tomatoes', 'Cashew Cream', 'Churned White Butter', 'Kasuri Methi', 'Cardamom'],
    chefNote: 'Prepared according to the legendary 1950s Old Delhi recipe. Creamy, mildly sweet and rich.',
    pairWith: 'Butter Garlic Naan or Laccha Paratha',
    calories: '490 kcal'
  },
  {
    id: 'dish_19',
    name: 'Kashmiri Mutton Rogan Josh',
    price: 460,
    originalPrice: 510,
    category: 'Main Course',
    isVeg: false,
    spiceLevel: 2,
    prepTime: '20 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    description: 'Tender baby mutton bone-in pieces slow-braised in an authentic Kashmiri aromatic red gravy flavored with ratanjot, Kashmiri chilies, dry ginger (sonth), and roasted fennel seeds.',
    ingredients: ['Prime Baby Mutton', 'Kashmiri Chili Infusion', 'Ratanjot Herb', 'Sonth (Dry Ginger)', 'Fennel Seed Broth'],
    chefNote: 'Slow-cooked for 4 hours until the mutton falls effortlessly off the bone.',
    pairWith: 'Steamed Saffron Basmati Rice or Tandoori Roti',
    calories: '530 kcal'
  },
  {
    id: 'dish_20',
    name: 'Butter Garlic Pepper Prawns',
    price: 420,
    originalPrice: 460,
    category: 'Starters',
    isVeg: false,
    spiceLevel: 2,
    prepTime: '12-15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh plump coastal tiger prawns sautéed on high heat with clarified garlic butter, freshly cracked Tellicherry black peppercorns, scallions, and fresh lemon juice.',
    ingredients: ['Coastal Tiger Prawns', 'Desi Garlic Butter', 'Tellicherry Black Pepper', 'Fresh Parsley & Coriander', 'Fresh Lime'],
    chefNote: 'Cooked swiftly to retain their natural juicy crunch and coastal sweetness.',
    pairWith: 'Toasted Garlic Bread or Neer Dosa',
    calories: '320 kcal'
  },
  {
    id: 'dish_21',
    name: 'Mangalorean Tawa Fish Fry',
    price: 380,
    originalPrice: 420,
    category: 'Starters',
    isVeg: false,
    spiceLevel: 3,
    prepTime: '15 mins',
    serves: 'Serves 2',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh King Fish (Surmai) steak coated generously in traditional spicy tangy Byadgi chili-tamarind masala paste and shallow-fried to a crisp golden crust on an iron tawa.',
    ingredients: ['Fresh King Fish Steak', 'Byadgi Chili Paste', 'Tamarind Pulp', 'Semolina (Rava) Dusting', 'Cold-Pressed Coconut Oil'],
    chefNote: 'Crispy rava-crusted exterior with flaky tender fish inside. Squeeze lime for supreme bliss.',
    pairWith: 'Steamed Basmati Rice & Rasam or Chilled Beverage',
    calories: '340 kcal'
  }
];

const CATEGORIES = [
  'All Items',
  'Starters',
  'Main Course',
  'Biryani & Rice',
  'Breads',
  'Desserts & Drinks'
];

const INSTAGRAM_REELS = [
  {
    title: 'Cracking Open 40kg Handi Dum',
    views: '72.4K views',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
    alt: 'Dum Biryani Seal Unveiling'
  },
  {
    title: 'Charcoal Tandoori Tikka Sizzle',
    views: '89.2K views',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    alt: 'Murgh Tandoori Charcoal Flame'
  },
  {
    title: 'Clay Skewer Paneer Angaara',
    views: '45.1K views',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80',
    alt: 'Paneer Tikka Clay Skewers'
  },
  {
    title: 'Fresh Garlic Naan Butter Splash',
    views: '110K views',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    alt: 'Garlic Naan Tandoor'
  }
];

const YOUTUBE_PLAYLIST_ITEMS = [
  {
    title: 'Roasting with 14 Whole Spices',
    subtitle: 'Live Clay Tandoor • 38K views',
    duration: '8:45',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=200&q=80',
    alt: 'Tandoori Secrets'
  },
  {
    title: 'Farm to Kitchen Daily Sourcing',
    subtitle: 'Fresh Produce • 29K views',
    duration: '11:10',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80',
    alt: 'Morning Market Sourcing'
  },
  {
    title: 'The 18-Hour Slow Dal Makhani',
    subtitle: 'Butter & Cream • 54K views',
    duration: '16:30',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=80',
    alt: 'Dal Makhani Simmer'
  }
];

export interface DinerReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  favoriteDish?: string;
  diningType: 'Dine-in' | 'Doorstep Delivery' | 'Family Party';
  date: string;
  verified: boolean;
  likes: number;
}

export interface RestaurantFaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const RESTAURANT_FAQS: RestaurantFaqItem[] = [
  {
    id: 'faq-1',
    category: 'Reservations & Seating',
    question: 'How do I reserve a dining table or private dining room in advance?',
    answer: 'You can book a table in 30 seconds directly using our "Reserve a Table" button above or via WhatsApp. Specify your preferred date, time slot, and guest count. We send an instant WhatsApp confirmation with table allotment details.'
  },
  {
    id: 'faq-2',
    category: 'Dietary & Pure Veg',
    question: 'Do you offer 100% Pure Vegetarian, Jain, Halal, or Vegan food options?',
    answer: 'Yes! We maintain strictly separate cooking stations and utensils for Pure Vegetarian preparations. We also cater to Jain requirements (no onion, no garlic, no root vegetables upon request) and offer certified Halal meat preparations.'
  },
  {
    id: 'faq-3',
    category: 'WhatsApp Online Ordering',
    question: 'How does the direct WhatsApp ordering & doorstep delivery work?',
    answer: 'Simply browse our menu, customize portions, and click "Order via WhatsApp". Your complete order bill, table number (for dine-in) or door address & landmarks (for delivery) are auto-formatted into WhatsApp. We deliver within a 7 km radius in 35-45 minutes.'
  },
  {
    id: 'faq-4',
    category: 'Parties & Bulk Catering',
    question: 'Can you host family celebrations, birthday parties, or corporate buffets?',
    answer: 'Absolutely. We provide private banquet seating for 20 to 120 guests with customized set menus, live tandoor and chaat counters, and personalized dessert platters. Message our Chef Desk on WhatsApp for a custom bulk quotation.'
  },
  {
    id: 'faq-5',
    category: 'Valet & Accessibility',
    question: 'Is valet parking and wheelchair access available at the restaurant?',
    answer: 'Yes, complimentary valet parking is available at our main portico entrance for all diners. Our ground-floor dining hall and washroom facilities are 100% wheelchair-accessible with gentle ramps.'
  },
  {
    id: 'faq-6',
    category: 'Timings & Schedule',
    question: 'What are your lunch, dinner, and late-night delivery operational hours?',
    answer: 'We serve Lunch from 11:30 AM to 03:45 PM and Dinner from 06:30 PM to 11:30 PM daily. WhatsApp express parcel delivery operates continuously from 11:30 AM to 11:30 PM without evening break.'
  }
];

export const DEFAULT_DINER_REVIEWS: DinerReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Siddharth Sen',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    review: 'We placed our order via WhatsApp for Table 4 while sitting down, and within 15 minutes piping hot Biryani and Paneer Tikka arrived. Super convenient!',
    favoriteDish: 'Awadhi Dum Gosht Biryani',
    diningType: 'Dine-in',
    date: 'Yesterday',
    verified: true,
    likes: 14
  },
  {
    id: 'rev-2',
    name: 'Priya Chandran',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    review: 'Ordered delivery to my office. The lane and landmark fields were sent right to WhatsApp, and the delivery arrived spot on without asking for directions once.',
    favoriteDish: 'Paneer Butter Masala Combo',
    diningType: 'Doorstep Delivery',
    date: '3 days ago',
    verified: true,
    likes: 9
  },
  {
    id: 'rev-3',
    name: 'Rajesh Hegde',
    location: 'HSR Layout, Bengaluru',
    rating: 5,
    review: 'Exceptional food quality and dining presentation. Clean menu interface, transparent pricing, and instant table booking confirmation. OneClickBiz made our dinner effortless.',
    favoriteDish: 'Tandoori Murgh Platter',
    diningType: 'Family Party',
    date: '1 week ago',
    verified: true,
    likes: 21
  },
  {
    id: 'rev-4',
    name: 'Ananya Deshmukh',
    location: 'Whitefield, Bengaluru',
    rating: 5,
    review: 'The slow-cooked Dal Makhani and Garlic Butter Naan are out of this world! Staff was warm and the QR table ordering made billing seamless.',
    favoriteDish: 'Slow Cooked Dal Makhani',
    diningType: 'Dine-in',
    date: '2 weeks ago',
    verified: true,
    likes: 17
  }
];

export default function RestaurantTemplateView({
  profile,
  cart,
  addToCart,
  updateQuantity,
  setIsCartOpen,
  selectedCurrency,
  setSelectedCurrency,
  formatPrice,
  totalConvertedPrice,
  setIsUPIModalOpen,
  setBookingService,
  setBookingSuccess,
  quoteServices,
  toggleQuoteService,
  sendWhatsAppQuotation,
  leadName,
  setLeadName,
  leadEmail,
  setLeadEmail,
  leadPhone,
  setLeadPhone,
  leadMessage,
  setLeadMessage,
  handleLeadSubmit,
  leadSuccess,
  trackAction,
  getCleanWhatsAppNumber,
  viewMode,
  setViewMode,
  showViewToggle = true,
}: RestaurantTemplateViewProps) {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItemData | null>(null);
  const [orderModalDeal, setOrderModalDeal] = useState<ComboDeal | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  
  // Website QR Code States (Whole Website QR Code in Card and Modal)
  const [websiteQrUrl, setWebsiteQrUrl] = useState<string>('');
  const [isWebsiteQrModalOpen, setIsWebsiteQrModalOpen] = useState<boolean>(false);
  const [heroCardTab, setHeroCardTab] = useState<'dish' | 'qr'>('dish');
  const [copiedWebsiteUrl, setCopiedWebsiteUrl] = useState<boolean>(false);

  // WhatsApp Order Modal States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [orderModalDish, setOrderModalDish] = useState<MenuItemData | null>(null);
  const [isCartOrder, setIsCartOrder] = useState<boolean>(false);
  const [orderMode, setOrderMode] = useState<'restaurant' | 'delivery'>('restaurant');
  const [isLocalCartOpen, setIsLocalCartOpen] = useState<boolean>(false);
  
  // Option 1: Person at Restaurant Fields
  const [tableNumber, setTableNumber] = useState<string>('Table #01');
  const [dinerName, setDinerName] = useState<string>('');
  const [cookingNote, setCookingNote] = useState<string>('');
  
  // Option 2: Person at Other Place Fields (Address, Lane, Landmark)
  const [deliveryCustomerName, setDeliveryCustomerName] = useState<string>('');
  const [deliveryPhone, setDeliveryPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryLane, setDeliveryLane] = useState<string>('');
  const [deliveryLandmark, setDeliveryLandmark] = useState<string>('');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');
  const [deliveryPaymentMode, setDeliveryPaymentMode] = useState<'whatsapp_upi' | 'whatsapp_cod'>('whatsapp_upi');

  // Table Reservation Modal
  const [isTableBookingOpen, setIsTableBookingOpen] = useState<boolean>(false);
  const [bookGuests, setBookGuests] = useState<number>(2);
  const [bookDate, setBookDate] = useState<string>('');
  const [bookTime, setBookTime] = useState<string>('19:30');

  // Diner Reviews State & Form
  const [dinerReviews, setDinerReviews] = useState<DinerReviewItem[]>(DEFAULT_DINER_REVIEWS);
  const [reviewFilter, setReviewFilter] = useState<'all' | '5star' | 'dinein' | 'delivery'>('all');
  const [isLeaveReviewModalOpen, setIsLeaveReviewModalOpen] = useState<boolean>(false);
  const [newReviewName, setNewReviewName] = useState<string>('');
  const [newReviewLocation, setNewReviewLocation] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newReviewDish, setNewReviewDish] = useState<string>('');
  const [newReviewType, setNewReviewType] = useState<'Dine-in' | 'Doorstep Delivery' | 'Family Party'>('Dine-in');
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string>('');

  // Dish Details Modal Tab & Dish Review State
  const [dishDetailModalTab, setDishDetailModalTab] = useState<'reviews' | 'recipe'>('reviews');
  const [isWritingDishReview, setIsWritingDishReview] = useState<boolean>(false);
  const [newDishReviewName, setNewDishReviewName] = useState<string>('');
  const [newDishReviewCity, setNewDishReviewCity] = useState<string>('');
  const [newDishReviewRating, setNewDishReviewRating] = useState<number>(5);
  const [newDishReviewComment, setNewDishReviewComment] = useState<string>('');
  const [dishReviewSuccess, setDishReviewSuccess] = useState<string>('');
  const [userDishReviews, setUserDishReviews] = useState<Record<string, { name: string; city: string; rating: number; review: string; date: string }[]>>({});

  const handleAddDishReview = (dishId: string, dishName: string) => (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishReviewName.trim() || !newDishReviewComment.trim()) return;

    const newRev = {
      name: newDishReviewName.trim(),
      city: newDishReviewCity.trim() || 'Indiranagar, BLR',
      rating: newDishReviewRating,
      review: newDishReviewComment.trim(),
      date: 'Just now'
    };

    setUserDishReviews(prev => ({
      ...prev,
      [dishId]: [newRev, ...(prev[dishId] || [])]
    }));

    // Also add to overall diner reviews so it reflects on the main page!
    const newGlobalRev: DinerReviewItem = {
      id: `rev-dish-${Date.now()}`,
      name: newDishReviewName.trim(),
      location: newDishReviewCity.trim() || 'Bengaluru',
      rating: newDishReviewRating,
      review: newDishReviewComment.trim(),
      favoriteDish: dishName,
      diningType: 'Dine-in',
      date: 'Just now',
      verified: true,
      likes: 1
    };
    setDinerReviews(prev => [newGlobalRev, ...prev]);

    setDishReviewSuccess(`Thank you ${newDishReviewName}! Your dish review is posted.`);
    trackAction(`submit_dish_review_${dishId}`);

    setTimeout(() => {
      setDishReviewSuccess('');
      setIsWritingDishReview(false);
      setNewDishReviewName('');
      setNewDishReviewCity('');
      setNewDishReviewComment('');
      setNewDishReviewRating(5);
    }, 2000);
  };

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const handleLikeReview = (id: string) => {
    setDinerReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddDinerReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    const newRev: DinerReviewItem = {
      id: `rev-${Date.now()}`,
      name: newReviewName.trim(),
      location: newReviewLocation.trim() || 'Diner, Bengaluru',
      rating: newReviewRating,
      review: newReviewText.trim(),
      favoriteDish: newReviewDish.trim() || 'Signature Feast',
      diningType: newReviewType,
      date: 'Just now',
      verified: true,
      likes: 1
    };

    setDinerReviews([newRev, ...dinerReviews]);
    setReviewSuccessMessage('Thank you! Your dining review has been posted.');
    setTimeout(() => {
      setIsLeaveReviewModalOpen(false);
      setReviewSuccessMessage('');
      setNewReviewName('');
      setNewReviewLocation('');
      setNewReviewText('');
      setNewReviewDish('');
    }, 1500);
  };

  // OneClickBiz Profile Details
  const waNumber = getCleanWhatsAppNumber(profile) || '916304989071';
  const restaurantConfig = profile.sectionData?.restaurant;
  const restaurantName = profile.company || profile.name || 'OneClickBiz Food & Fine Dining';
  const restaurantAddress = restaurantConfig?.landmark || profile.address || 'OneClickBiz Plaza, 100ft Road, Indiranagar, Bengaluru';
  const fssaiLicence = restaurantConfig?.fssaiNumber || '13623011000842';
  const operatingHours = restaurantConfig?.operatingHours || restaurantConfig?.diningTimings || '11:30 AM – 11:30 PM';
  const cuisineType = restaurantConfig?.cuisineType || 'Awadhi & Mughlai Dum Biryani';
  const avgPrepTime = restaurantConfig?.avgPrepTime || '15–20 Mins';
  const seatingCapacity = restaurantConfig?.seatingCapacity || '120 Pax (AC & Rooftop)';
  const deliveryRadius = restaurantConfig?.deliveryRadius || 'Up to 12 km Delivery';
  const dietaryHighlights = restaurantConfig?.dietaryHighlights || 'Pure Desi Ghee • Halal Certified • Fresh Ingredients';
  const reservationPolicy = restaurantConfig?.reservationPolicy || 'Table held for 15 mins. Prior booking advised.';

  // Resolve dynamic combos and promo coupons (Studio editable)
  const activeCombos: ComboDeal[] = useMemo(() => {
    if (restaurantConfig?.comboDeals && restaurantConfig.comboDeals.length > 0) {
      return restaurantConfig.comboDeals;
    }
    if (restaurantConfig?.combos && restaurantConfig.combos.length > 0) {
      return restaurantConfig.combos;
    }
    return COMBO_DEALS;
  }, [restaurantConfig?.comboDeals, restaurantConfig?.combos]);

  const activeCoupons = useMemo(() => {
    if (restaurantConfig?.coupons && restaurantConfig.coupons.length > 0) {
      return restaurantConfig.coupons;
    }
    return PROMO_COUPONS;
  }, [restaurantConfig?.coupons]);

  const activeFaqs: RestaurantFaqItem[] = useMemo(() => {
    if (restaurantConfig?.faqs && restaurantConfig.faqs.length > 0) {
      return restaurantConfig.faqs;
    }
    return RESTAURANT_FAQS;
  }, [restaurantConfig?.faqs]);

  const phoneDisplay = profile.phone || '+91 63049 89071';
  const cleanPhoneDigits = phoneDisplay.replace(/[^\d+]/g, '');

  // Website URL for QR and sharing (Safe against SSR hydration mismatches)
  const [currentWebsiteUrl, setCurrentWebsiteUrl] = useState<string>(
    profile.website || `https://oneclickbiz.in/v/${profile.slug || 'food-restaurant'}`
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentWebsiteUrl(window.location.href);
    }
  }, []);

  // Generate working QR code for the whole website
  useEffect(() => {
    QRCode.toDataURL(currentWebsiteUrl, {
      width: 360,
      margin: 2,
      color: {
        dark: '#241208',
        light: '#FFFFFF'
      }
    })
      .then(url => setWebsiteQrUrl(url))
      .catch(() => {});
  }, [currentWebsiteUrl]);

  // Download QR Code PNG
  const handleDownloadWebsiteQr = () => {
    trackAction('download_website_qr');
    const qrSrc = websiteQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(currentWebsiteUrl)}&color=241208`;
    const a = document.createElement('a');
    a.href = qrSrc;
    a.download = `${profile.slug || 'oneclickbiz-restaurant'}-menu-qr.png`;
    a.click();
  };

  // Copy Website URL
  const handleCopyWebsiteUrl = () => {
    trackAction('copy_website_url');
    navigator.clipboard.writeText(currentWebsiteUrl);
    setCopiedWebsiteUrl(true);
    setTimeout(() => setCopiedWebsiteUrl(false), 2500);
  };

  // Social Links
  const instagramUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'instagram')?.url || 'https://instagram.com/oneclickbiz';
  const youtubeUrl = profile.sectionData?.socials?.items?.find((s: any) => s.platform === 'youtube')?.url || 'https://youtube.com/@oneclickbiz';

  // Quantity helpers
  const getQty = (dishId: string) => itemQuantities[dishId] || 1;
  const setQty = (dishId: string, val: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [dishId]: Math.max(1, Math.min(20, val))
    }));
  };

  // Dynamically resolve dishes: read from profile.sectionData.products.items (Studio customizable) or fallback to defaults
  const allDishes = useMemo(() => {
    const customItems = profile.sectionData?.products?.items;
    if (customItems && customItems.length > 0) {
      return customItems.map((p, idx): MenuItemData => {
        const isVeg = (p as any).isVeg !== undefined 
          ? Boolean((p as any).isVeg) 
          : !p.name.toLowerCase().includes('chicken') && 
            !p.name.toLowerCase().includes('mutton') && 
            !p.name.toLowerCase().includes('fish') && 
            !p.name.toLowerCase().includes('prawn') && 
            !p.name.toLowerCase().includes('egg') &&
            !p.name.toLowerCase().includes('meat');

        const rawIngredients = (p as any).ingredients;
        const ingredientsList = Array.isArray(rawIngredients) 
          ? rawIngredients 
          : (typeof rawIngredients === 'string' && rawIngredients.trim())
            ? rawIngredients.split(',').map((s: string) => s.trim()).filter(Boolean)
            : (p.description ? p.description.split('.').map(s => s.trim()).filter(Boolean) : ['Farm Fresh Ingredients', 'Chef Artisanal Spices']);

        return {
          id: p.id || `dish_custom_${idx}`,
          name: p.name,
          price: p.price,
          originalPrice: (p as any).originalPrice || (p.price ? Math.round(p.price * 1.15) : undefined),
          category: p.category || 'Main Course',
          isVeg,
          isSpecial: (p as any).isSpecial ?? (idx === 0 || idx === 8),
          spiceLevel: ((p as any).spiceLevel === 'Spicy' || (p as any).spiceLevel === 3) ? 3 : ((p as any).spiceLevel === 'Mild' || (p as any).spiceLevel === 1) ? 1 : 2,
          prepTime: (p as any).prepTime || '15-20 mins',
          serves: (p as any).serves || 'Serves 2',
          imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
          description: p.description || 'Authentic handcrafted gourmet delicacy prepared with fresh ingredients.',
          ingredients: ingredientsList,
          chefNote: (p as any).chefNote || 'Prepared fresh upon order.',
          pairWith: (p as any).pairWith,
          calories: (p as any).calories
        };
      });
    }
    return DEFAULT_RESTAURANT_DISHES;
  }, [profile.sectionData?.products?.items]);

  // Filtered dishes (supports Search + Category + Veg/Non-Veg sections)
  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const matchesCategory = selectedCategory === 'All Items' || dish.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDiet = 
        dietFilter === 'all' ? true :
        dietFilter === 'veg' ? dish.isVeg :
        !dish.isVeg;

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [allDishes, selectedCategory, searchQuery, dietFilter]);

  const vegDishesCount = useMemo(() => allDishes.filter(d => d.isVeg).length, [allDishes]);
  const nonVegDishesCount = useMemo(() => allDishes.filter(d => !d.isVeg).length, [allDishes]);

  // Open the 2-Option WhatsApp Order Modal for a specific dish
  const handleOpenOrderModal = (dish: MenuItemData) => {
    setOrderModalDish(dish);
    setOrderModalDeal(null);
    setIsCartOrder(false);
    setIsOrderModalOpen(true);
  };

  // Open the 2-Option WhatsApp Order Modal for a Combo Deal
  const handleOpenDealOrderModal = (deal: ComboDeal) => {
    trackAction(`deal_order_${deal.id}`);
    setOrderModalDeal(deal);
    setOrderModalDish(null);
    setIsCartOrder(false);
    setIsOrderModalOpen(true);
  };

  // Add Combo Deal to Cart
  const handleAddDealToCart = (deal: ComboDeal) => {
    trackAction(`cart_add_deal_${deal.id}`);
    const productItem: ProductItem = {
      id: deal.id,
      name: deal.name,
      description: deal.description,
      price: deal.dealPrice,
      currency: '₹',
      imageUrl: deal.imageUrl,
      category: 'Combo Deals',
      isAvailable: true
    };
    addToCart(productItem);
  };

  // 1-Click Copy Promo Coupon
  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    trackAction(`copy_coupon_${code}`);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  // Open the 2-Option WhatsApp Order Modal for all items in Cart
  const handleOpenCartOrderModal = () => {
    if (cart.length === 0) return;
    setIsLocalCartOpen(false);
    setOrderModalDish(null);
    setOrderModalDeal(null);
    setIsCartOrder(true);
    setIsOrderModalOpen(true);
  };

  // Handle WhatsApp Order Placement
  const handleConfirmWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderModalDish && !orderModalDeal && !isCartOrder) return;
    if (isCartOrder && cart.length === 0) return;

    const isDealOrder = !isCartOrder && !orderModalDish && !!orderModalDeal;

    // Calculate total price and build item list
    const billTotal = isCartOrder
      ? cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)
      : isDealOrder
      ? orderModalDeal!.dealPrice
      : (orderModalDish ? orderModalDish.price * getQty(orderModalDish.id) : 0);

    const itemsSummary = isCartOrder
      ? cart.map((ci, idx) => `  ${idx + 1}. *${ci.product.name}* (x${ci.quantity}) - ₹${ci.product.price * ci.quantity}`).join('\n')
      : isDealOrder
      ? `• *Special Combo Offer:* ${orderModalDeal!.name}\n• *Includes:* ${orderModalDeal!.itemsList.join(', ')}\n• *Discounted Price:* ₹${orderModalDeal!.dealPrice} (Saved ₹${orderModalDeal!.savings})`
      : `• *Dish:* ${orderModalDish?.name}\n• *Quantity:* ${getQty(orderModalDish!.id)}\n• *Price:* ₹${billTotal}`;

    let message = '';

    if (orderMode === 'restaurant') {
      // DINE-IN TABLE ORDER
      message = 
        `🍽️ *DINE-IN ORDER - ${restaurantName}*\n\n` +
        `• *Order Mode:* Dine-in (At Restaurant)\n` +
        `• *Table Number:* ${tableNumber.trim() || 'Table #01'}\n` +
        `• *Guest Name:* ${dinerName.trim() || 'Guest'}\n\n` +
        `📋 *ORDER ITEMS:*\n${itemsSummary}\n\n` +
        `💰 *Total Amount:* ₹${billTotal}\n` +
        (cookingNote.trim() ? `• *Special Note:* ${cookingNote.trim()}\n` : '') +
        `\nPlease confirm the order. Thank you!`;
    } else {
      // HOME / OFFICE DELIVERY ORDER
      message = 
        `🛵 *DELIVERY ORDER - ${restaurantName}*\n\n` +
        `• *Customer Name:* ${deliveryCustomerName.trim() || 'Customer'}\n` +
        `• *Contact Phone:* ${deliveryPhone.trim() || 'Not specified'}\n\n` +
        `📋 *ORDER ITEMS:*\n${itemsSummary}\n\n` +
        `💰 *Total Amount:* ₹${billTotal}\n` +
        `• *Payment Preference:* ${deliveryPaymentMode === 'whatsapp_upi' ? 'UPI' : 'Cash on Delivery (COD)'}\n\n` +
        `📍 *DELIVERY ADDRESS:*\n` +
        `• *Address:* ${deliveryAddress.trim() || 'Not specified'}\n` +
        `• *Lane / Street:* ${deliveryLane.trim() || 'Not specified'}\n` +
        `• *Landmark:* ${deliveryLandmark.trim() || 'None'}\n` +
        (deliveryInstructions.trim() ? `• *Delivery Note:* ${deliveryInstructions.trim()}\n` : '') +
        `\nPlease confirm order and estimated delivery time. Thank you!`;
    }

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setIsOrderModalOpen(false);
  };

  // Add Dish to Cart
  const handleAddDishToCart = (dish: MenuItemData) => {
    const qty = getQty(dish.id);
    trackAction(`cart_add_${dish.id}`);
    const productItem: ProductItem = {
      id: dish.id,
      name: dish.name,
      description: dish.description,
      price: dish.price,
      currency: '₹',
      imageUrl: dish.imageUrl,
      category: dish.category,
      isAvailable: true
    };
    for (let i = 0; i < qty; i++) {
      addToCart(productItem);
    }
  };

  // Table Reservation Submission via WhatsApp
  const handleTableReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackAction('table_reservation_submit');
    const msg = `🍽️ *TABLE RESERVATION REQUEST - ${restaurantName}*\n\n` +
      `• *Guest Name:* ${leadName || 'Diner'}\n` +
      `• *Contact Phone:* ${leadPhone || 'Not provided'}\n` +
      `• *Party Size:* ${bookGuests} Guests\n` +
      `• *Date:* ${bookDate || 'Today'}\n` +
      `• *Time:* ${bookTime}\n` +
      `• *Special Requests:* ${leadMessage || 'None'}\n\n` +
      `Sent via OneClickBiz Smart Dining Portal. Please confirm reservation.`;

    const targetWa = (restaurantConfig?.tableBookingPhone || waNumber || '916304989071').replace(/[^\d]/g, '');
    const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    setIsTableBookingOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#FBF2DE] text-[#241208] font-sans relative selection:bg-[#C1621F] selection:text-white pb-20 antialiased overflow-x-hidden">
      
      {/* Dynamic Keyframes & Fonts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ocb-font-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .ocb-font-sans {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        @keyframes ocbMarqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .ocb-marquee-track {
          display: flex;
          gap: 40px;
          white-space: nowrap;
          animation: ocbMarqueeScroll 30s linear infinite;
          width: max-content;
        }

        .ocb-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes ocbFloatGlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.25; }
          50% { transform: translate(25px, -18px) scale(1.15); opacity: 0.45; }
        }

        .ocb-glow-ambient-1 {
          animation: ocbFloatGlow 14s ease-in-out infinite;
        }
        .ocb-glow-ambient-2 {
          animation: ocbFloatGlow 18s ease-in-out infinite reverse;
        }
      `
        }}
      />

      {/* Decorative Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="ocb-glow-ambient-1 absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#D8A63D]/25 to-[#C1621F]/20 blur-3xl" />
        <div className="ocb-glow-ambient-2 absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-gradient-to-bl from-[#C1621F]/20 to-[#7E1717]/15 blur-3xl" />
        <div className="ocb-glow-ambient-1 absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D8A63D]/20 to-[#2E4D2A]/15 blur-3xl" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP TICKER MARQUEE                                          */}
      {/* ============================================================== */}
      <div className="relative z-40 bg-gradient-to-r from-[#241208] via-[#3B2313] to-[#241208] text-white py-2.5 overflow-hidden border-b border-[#D8A63D]/30 shadow-md">
        <div className="ocb-marquee-track text-xs sm:text-sm font-semibold tracking-wider">
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D8A63D] animate-ping" />
            <span className="text-[#D8A63D] font-bold">ONECLICKBIZ FOOD & FINE DINING</span>
            <span>•</span>
            <span>⚡ 1-CLICK INSTANT WHATSAPP ORDERING</span>
            <span>•</span>
            <span>🍽️ DINE-IN AT RESTAURANT OR 🛵 HOME DELIVERY</span>
            <span>•</span>
            <span>🌿 100% FARM-FRESH INGREDIENTS & ARTISANAL RECIPES</span>
            <span>•</span>
            <span>⭐ 4.9 RATED GOURMET DINING</span>
            <span>•</span>
            <span>📞 KITCHEN / TABLE DESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D8A63D] animate-ping" />
            <span className="text-[#D8A63D] font-bold">ONECLICKBIZ FOOD & FINE DINING</span>
            <span>•</span>
            <span>⚡ 1-CLICK INSTANT WHATSAPP ORDERING</span>
            <span>•</span>
            <span>🍽️ DINE-IN AT RESTAURANT OR 🛵 HOME DELIVERY</span>
            <span>•</span>
            <span>🌿 100% FARM-FRESH INGREDIENTS & ARTISANAL RECIPES</span>
            <span>•</span>
            <span>⭐ 4.9 RATED GOURMET DINING</span>
            <span>•</span>
            <span>📞 KITCHEN / TABLE DESK: {phoneDisplay}</span>
            <span>•</span>
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. STICKY BRAND HEADER & QUICK ACTIONS                        */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D8A63D]/30 shadow-xs transition-all w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-br from-[#F5E9CC] to-[#FBF2DE] border-2 border-[#D8A63D]/40 flex items-center justify-center text-[#C1621F] shadow-xs shrink-0">
              <Utensils className="w-6 h-6 text-[#C1621F]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="ocb-font-serif font-black text-lg sm:text-2xl text-[#241208] leading-tight truncate">
                  {restaurantName}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#2E4D2A]/10 text-[#2E4D2A] border border-[#2E4D2A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E4D2A] animate-pulse" /> Kitchen Active
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-[#C1621F] uppercase tracking-wider truncate flex items-center gap-1.5">
                <span>By OneClickBiz</span>
                <span>•</span>
                <span>Fine Dining & Takeaway</span>
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 mr-1">
              <a
                href="#menu-section"
                className="px-3 py-1.5 rounded-xl hover:bg-[#F5E9CC]/60 text-xs font-bold text-[#241208] transition"
              >
                Menu
              </a>
              <a
                href="#reviews-section"
                className="px-3 py-1.5 rounded-xl hover:bg-[#F5E9CC]/60 text-xs font-bold text-[#C1621F] flex items-center gap-1 transition"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Reviews</span>
              </a>
              <a
                href="#faq-section"
                className="px-3 py-1.5 rounded-xl hover:bg-[#F5E9CC]/60 text-xs font-bold text-[#241208] flex items-center gap-1 transition"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#C1621F]" />
                <span>FAQ</span>
              </a>
            </nav>

            {/* Prominent Header "Leave Review" CTA Button */}
            <button
              onClick={() => setIsLeaveReviewModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5E9CC] hover:bg-[#eedaa8] text-[#C1621F] border border-[#D8A63D]/50 text-xs font-extrabold transition shadow-xs cursor-pointer"
              title="Leave a dining review"
            >
              <Star className="w-3.5 h-3.5 fill-[#C1621F]" />
              <span className="hidden sm:inline">Write Review</span>
              <span className="sm:hidden">Review</span>
            </button>
            
            {/* Website QR Button */}
            <button
              onClick={() => {
                trackAction('header_open_qr_modal');
                setIsWebsiteQrModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border border-[#D8A63D]/40 text-xs font-bold transition shadow-xs"
              title="Scan or download QR code for this digital menu"
            >
              <QrCode className="w-4 h-4 text-[#C1621F]" />
              <span className="hidden sm:inline">Website QR</span>
            </button>

            {/* Reserve Table Button */}
            <button
              onClick={() => setIsTableBookingOpen(true)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4 text-[#D8A63D]" />
              <span className="hidden sm:inline">Reserve Table</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* Social Media Header Quick Links (Instagram & YouTube) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAction('header_instagram_click')}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-pink-500/10 to-amber-500/10 hover:from-pink-500/20 hover:to-amber-500/20 text-[#241208] border border-pink-500/30 text-xs font-bold transition shadow-xs"
              title="Follow our kitchen reels on Instagram"
            >
              <SocialIcon platform="instagram" size={15} colored={true} />
              <span className="text-[11px]">Instagram</span>
            </a>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAction('header_youtube_click')}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-red-600/10 to-rose-600/10 hover:from-red-600/20 hover:to-rose-600/20 text-[#241208] border border-red-500/30 text-xs font-bold transition shadow-xs"
              title="Watch tandoor & kitchen videos on YouTube"
            >
              <SocialIcon platform="youtube" size={15} colored={true} />
              <span className="text-[11px]">YouTube</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsLocalCartOpen(true)}
              className="relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#C1621F]/20 transition-all hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-[#C1621F] font-black text-xs flex items-center justify-center shrink-0">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* View Mode Toggle Switcher */}
            {showViewToggle && setViewMode && (
              <div className="flex items-center bg-[#F5E9CC]/70 p-1 rounded-xl border border-[#D8A63D]/40 shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('website')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'website' ? 'bg-[#241208] text-white shadow-xs' : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 inline mr-1" /> Web
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'mobile' ? 'bg-[#241208] text-white shadow-xs' : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 inline mr-1" /> Card
                </button>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. HERO SECTION WITH CHEF SPOTLIGHT CARD                       */}
      {/* ============================================================== */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D8A63D]/50 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#C1621F]" />
              <span className="text-xs sm:text-sm font-extrabold text-[#C1621F] tracking-wide uppercase">
                ONECLICKBIZ GOURMET DINING & ORDERING
              </span>
            </div>

            <h1 className="ocb-font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#241208] leading-[1.15] tracking-tight">
              Savor Royal Delicacies with <span className="italic text-[#C1621F]">Instant WhatsApp</span> Ordering
            </h1>

            <p className="text-base sm:text-lg text-[#5C3A21] leading-relaxed max-w-2xl">
              Handcrafted gourmet delicacies cooked to perfection. Browse our complete menu with ingredients and spice levels, reserve dining tables, or order for home delivery.
            </p>

            {/* Quick Hero CTAs */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
              <a
                href="#menu-section"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white font-extrabold text-xs sm:text-base shadow-lg shadow-[#C1621F]/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>Explore Menu</span>
              </a>

              <button
                onClick={() => setIsTableBookingOpen(true)}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 font-bold text-xs sm:text-base shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C1621F] shrink-0" />
                <span>Reserve Table</span>
              </button>

              <button
                onClick={() => setIsLeaveReviewModalOpen(true)}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-[#D8A63D] font-extrabold text-xs sm:text-base shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer border border-[#D8A63D]/40"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 shrink-0" />
                <span>Leave a Review</span>
              </button>

              <a
                href="#faq-section"
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 font-bold text-xs sm:text-base shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C1621F] shrink-0" />
                <span>Dining FAQ</span>
              </a>

              <button
                onClick={() => {
                  trackAction('hero_open_qr_modal');
                  setIsWebsiteQrModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 font-bold text-xs sm:text-base shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center cursor-pointer"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#C1621F] shrink-0" />
                <span>Website QR</span>
              </button>

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${restaurantName}! I would like to inquire about today's menu specials.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-xs sm:text-base shadow-md transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Instant Contact Options with Original Logos (As requested by user) */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#C1621F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Contact & Location Desk
                </span>
                <span className="text-[11px] font-bold text-[#7A5B43] truncate max-w-[220px]">{restaurantAddress}</span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
                
                {/* 1. WhatsApp with Original Logo */}
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${restaurantName}! I want to connect with your dining team.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('hero_contact_whatsapp')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Direct WhatsApp Message"
                >
                  <SocialIcon platform="whatsapp" size={16} colored={true} />
                  <span className="truncate">WhatsApp Chat</span>
                </a>

                {/* 2. Phone Call with Original Logo */}
                <a
                  href={`tel:${cleanPhoneDigits}`}
                  onClick={() => trackAction('hero_contact_call')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Direct Phone Call"
                >
                  <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                  <span className="truncate">Call <span className="hidden sm:inline">{phoneDisplay}</span></span>
                </a>

                {/* 3. Google Maps Location with Original Pin Logo */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurantName} ${restaurantAddress}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('hero_contact_maps')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Open Google Maps Location"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                    <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
                  </svg>
                  <span className="truncate">Google Maps</span>
                </a>

                {/* 4. Email Desk with Original Mail Logo */}
                <a
                  href={`mailto:${profile.email || 'dining@oneclickbiz.in'}`}
                  onClick={() => trackAction('hero_contact_email')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 border border-red-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Send Email"
                >
                  <SocialIcon platform="mail" size={16} colored={true} />
                  <span className="truncate">Email Desk</span>
                </a>

                {/* 5. Official Website with Original Logo */}
                <a
                  href={currentWebsiteUrl}
                  suppressHydrationWarning
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('hero_contact_web')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 border border-purple-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Official Digital Menu Website"
                >
                  <SocialIcon platform="website" size={16} colored={true} />
                  <span className="truncate">Official Web</span>
                </a>

                {/* 6. Instagram with Original Brand Logo */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('hero_contact_instagram')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-pink-50 border border-pink-400/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="Instagram Profile"
                >
                  <SocialIcon platform="instagram" size={16} colored={true} />
                  <span className="truncate">@oneclickbiz</span>
                </a>

                {/* 7. YouTube with Original Brand Logo */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('hero_contact_youtube')}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-500/50 text-xs font-bold text-[#241208] flex items-center justify-center sm:justify-start gap-2 shadow-xs transition hover:scale-105"
                  title="YouTube Channel"
                >
                  <SocialIcon platform="youtube" size={16} colored={true} />
                  <span className="truncate">YouTube</span>
                </a>

              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/80 border border-[#D8A63D]/30 shadow-xs">
                <p className="text-xs font-bold text-[#7A5B43]">Dining Rating</p>
                <p className="text-lg font-black text-[#241208] flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 4.9 / 5.0
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#D8A63D]/30 shadow-xs">
                <p className="text-xs font-bold text-[#7A5B43]">Order Options</p>
                <p className="text-lg font-black text-[#241208]">Table & Delivery</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#D8A63D]/30 shadow-xs">
                <p className="text-xs font-bold text-[#7A5B43]">WhatsApp Order</p>
                <p className="text-lg font-black text-[#2E4D2A]">1-Click Direct</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#D8A63D]/30 shadow-xs">
                <p className="text-xs font-bold text-[#7A5B43]">Avg. Prep Time</p>
                <p className="text-lg font-black text-[#C1621F]">{avgPrepTime}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Spotlight Card with Working Website QR & Dish Options */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-4 sm:p-7 border-2 border-[#D8A63D]/40 shadow-2xl shadow-[#C1621F]/10 space-y-4">
              
              {/* Card Dual Tab Switcher: Signature Dish vs. Website QR */}
              <div className="flex items-center gap-1 p-1 bg-[#F5E9CC]/60 rounded-2xl border border-[#D8A63D]/40">
                <button
                  onClick={() => setHeroCardTab('dish')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    heroCardTab === 'dish'
                      ? 'bg-[#241208] text-white shadow-xs'
                      : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#D8A63D]" />
                  <span>Signature Dish</span>
                </button>

                <button
                  onClick={() => setHeroCardTab('qr')}
                  className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    heroCardTab === 'qr'
                      ? 'bg-[#241208] text-white shadow-xs'
                      : 'text-[#5C3A21] hover:text-[#241208]'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Website QR Code</span>
                </button>
              </div>

              {heroCardTab === 'dish' ? (
                /* TAB 1: CHEF'S SIGNATURE DISH */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D8A63D]/25">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C1621F] text-white flex items-center gap-1 shadow-sm">
                      <Flame className="w-3.5 h-3.5" /> Chef's Signature Dish
                    </span>
                    <span className="text-xs font-bold text-[#2E4D2A] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2E4D2A] animate-pulse" /> Freshly Prepping
                    </span>
                  </div>

                  {/* Dish Visual */}
                  <div className="relative h-52 rounded-2xl overflow-hidden shadow-md group">
                    <img
                      src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
                      alt="Hyderabadi Shahi Veg Dum Biryani"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-black uppercase bg-white/95 text-[#2E4D2A] shadow-xs">
                      🟢 Pure Veg
                    </div>
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#241208]/85 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D8A63D]" /> 20 Mins
                    </div>
                  </div>

                  {/* Title & Pricing */}
                  <div>
                    <h3 className="ocb-font-serif text-2xl font-black text-[#241208]">
                      Hyderabadi Shahi Veg Dum Biryani
                    </h3>
                    <p className="text-xs text-[#5C3A21] mt-1 leading-relaxed">
                      Aged Dehradun basmati rice slow-cooked on slow dum with aromatic spices, fresh mint, caramelized onions, and saffron.
                    </p>
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#241208]">₹340</span>
                      <span className="text-xs text-[#7A5B43] line-through font-semibold">₹390</span>
                      <span className="text-xs font-bold text-[#2E4D2A] bg-[#2E4D2A]/10 px-2 py-0.5 rounded-md">Save ₹50</span>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => setActiveDetailItem(allDishes[8] || allDishes[0])}
                      className="py-2.5 px-2.5 sm:px-3 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition"
                    >
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C1621F] shrink-0" />
                      <span className="truncate">Item Details</span>
                    </button>

                    <button
                      onClick={() => handleOpenOrderModal(allDishes[8] || allDishes[0])}
                      className="py-2.5 px-2.5 sm:px-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 shadow-md transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                      <span className="truncate">
                        <span className="hidden sm:inline">Order on WhatsApp</span>
                        <span className="sm:hidden">WhatsApp</span>
                      </span>
                    </button>
                  </div>

                  {/* Switch to QR Prompt Link */}
                  <button
                    onClick={() => setHeroCardTab('qr')}
                    className="w-full text-center text-[11px] font-bold text-[#C1621F] hover:underline flex items-center justify-center gap-1 pt-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View Table Stand Website QR Code →</span>
                  </button>
                </div>
              ) : (
                /* TAB 2: WORKING WEBSITE QR CODE IN CARD */
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D8A63D]/25">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#25D366] text-white flex items-center gap-1.5 shadow-sm">
                      <QrCode className="w-3.5 h-3.5" /> Scannable Menu QR
                    </span>
                    <span className="text-xs font-bold text-[#2E4D2A] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2E4D2A] animate-pulse" /> 100% Scan Ready
                    </span>
                  </div>

                  {/* QR Visual Card */}
                  <div className="relative bg-gradient-to-b from-[#FAF4E6] to-[#F5E9CC] p-5 rounded-2xl border-2 border-[#D8A63D]/50 flex flex-col items-center justify-center shadow-inner group">
                    <div className="relative p-2.5 bg-white rounded-2xl shadow-md border border-[#D8A63D]/40 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={websiteQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentWebsiteUrl)}&color=241208`}
                        alt={`${restaurantName} Website QR Code`}
                        className="w-40 h-40 object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-[#241208] text-[#D8A63D] flex items-center justify-center border-2 border-white shadow-md text-xs font-black">
                          🍽️
                        </div>
                      </div>
                    </div>

                    <p className="text-xs font-black text-[#241208] mt-2.5 text-center">
                      Scan with any phone camera
                    </p>
                    <p className="text-[11px] text-[#7A5B43] text-center mt-0.5">
                      Opens full digital menu & direct WhatsApp ordering desk
                    </p>
                  </div>

                  {/* URL Display with Copy Button */}
                  <div className="p-2.5 rounded-xl bg-[#F5E9CC]/60 border border-[#D8A63D]/40 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-[#7A5B43] uppercase">Website Address</p>
                      <p className="text-xs font-mono font-bold text-[#241208] truncate">
                        {currentWebsiteUrl}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyWebsiteUrl}
                      className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold text-[#241208] border border-[#D8A63D]/40 shrink-0 transition flex items-center gap-1 shadow-xs"
                    >
                      {copiedWebsiteUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C1621F]" />}
                      <span>{copiedWebsiteUrl ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleDownloadWebsiteQr}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save QR PNG</span>
                    </button>

                    <button
                      onClick={() => setIsWebsiteQrModalOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition"
                    >
                      <Share2 className="w-4 h-4 text-[#C1621F]" />
                      <span>Fullscreen QR</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3.5. SPECIAL OFFERS & DISCOUNT COMBOS SECTION                  */}
      {/* ============================================================== */}
      <section id="offers-section" className="relative z-10 py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#241208] via-[#331C0E] to-[#241208] rounded-3xl p-6 sm:p-10 border-2 border-[#D8A63D]/50 shadow-2xl text-white space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8A63D]/25 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8A63D]/20 border border-[#D8A63D]/40 text-[#D8A63D] text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-[#D8A63D]" /> Exclusive Dining Deals & Discounts
              </div>
              <h2 className="ocb-font-serif text-2xl sm:text-4xl font-black text-white">
                Chef's Handpicked Feast Combos
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl">
                Save up to 30% on our curated multi-course platters. Perfect for family dining, weekend parties, or office lunch groups.
              </p>
            </div>
            
            {/* Promo Voucher Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {activeCoupons.map(coupon => {
                const isCopied = copiedCoupon === coupon.code;
                return (
                  <button
                    key={coupon.code}
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-[#D8A63D]/40 text-xs font-bold transition group"
                    title={`Click to copy code ${coupon.code}`}
                  >
                    <Tag className="w-3.5 h-3.5 text-[#D8A63D]" />
                    <span className="font-mono text-[#D8A63D] font-extrabold">{coupon.code}</span>
                    <span className="text-white/80 text-[11px]">• {coupon.discount}</span>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Combos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCombos.map(deal => (
              <div
                key={deal.id}
                className="bg-white/5 rounded-2xl border border-[#D8A63D]/30 p-5 flex flex-col justify-between space-y-4 hover:border-[#D8A63D] hover:bg-white/10 transition-all group"
              >
                <div className="space-y-3">
                  {/* Deal Image Banner */}
                  <div className="relative h-44 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={deal.imageUrl}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${deal.badgeColor} shadow-md`}>
                        {deal.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 text-white text-[10px] font-bold backdrop-blur-xs">
                      👥 {deal.serves}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="ocb-font-serif text-lg font-bold text-white group-hover:text-[#D8A63D] transition-colors">
                      {deal.name}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2 mt-1">
                      {deal.description}
                    </p>
                  </div>

                  {/* Included Items Checklist */}
                  <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#D8A63D] block">What's Included:</span>
                    <ul className="text-xs text-white/85 space-y-1">
                      {deal.itemsList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price Bar & Actions */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-white/60 block">Combo Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-[#D8A63D]">
                          {formatPrice(deal.dealPrice, selectedCurrency)}
                        </span>
                        <span className="text-xs text-white/50 line-through">
                          {formatPrice(deal.originalPrice, selectedCurrency)}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      Save ₹{deal.savings}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddDealToCart(deal)}
                      className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-white/20 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D8A63D]" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => handleOpenDealOrderModal(deal)}
                      className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-extrabold flex items-center justify-center gap-1 shadow-md transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Order Deal</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE MENU SECTION (VEG & NON-VEG SECTIONS)           */}
      {/* ============================================================== */}
      <section id="menu-section" className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D8A63D]/40 text-[#C1621F] text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" /> Handcrafted Gourmet Dishes
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-5xl font-black text-[#241208]">
            Interactive Dining Menu
          </h2>
          <p className="text-sm sm:text-base text-[#5C3A21]">
            Explore our curated Vegetarian & Non-Vegetarian culinary treasures. Every item includes full ingredient details and direct WhatsApp ordering for tables and home delivery.
          </p>
        </div>

        {/* Dietary Switcher Bar (Pure Veg & Non-Veg Sections) */}
        <div className="bg-white/90 backdrop-blur-md p-1.5 sm:p-2.5 rounded-2xl border-2 border-[#D8A63D]/40 shadow-md mb-6 max-w-2xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              trackAction('filter_diet_all');
              setDietFilter('all');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
              dietFilter === 'all'
                ? 'bg-[#241208] text-white shadow-md'
                : 'text-[#5C3A21] hover:bg-[#F5E9CC]/60'
            }`}
          >
            <span>🌟 <span className="hidden sm:inline">All Dishes</span><span className="sm:hidden">All</span></span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
              {DEFAULT_RESTAURANT_DISHES.length}
            </span>
          </button>

          <button
            onClick={() => {
              trackAction('filter_diet_veg');
              setDietFilter('veg');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
              dietFilter === 'veg'
                ? 'bg-[#15803d] text-white shadow-md'
                : 'text-[#15803d] hover:bg-emerald-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-xs border-2 border-current flex items-center justify-center p-0.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </span>
            <span className="truncate"><span className="hidden sm:inline">Pure Veg Section</span><span className="sm:hidden">Pure Veg</span></span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-700/20 font-mono shrink-0">
              {vegDishesCount}
            </span>
          </button>

          <button
            onClick={() => {
              trackAction('filter_diet_nonveg');
              setDietFilter('non-veg');
            }}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
              dietFilter === 'non-veg'
                ? 'bg-[#b91c1c] text-white shadow-md'
                : 'text-[#b91c1c] hover:bg-rose-50'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-xs border-2 border-current flex items-center justify-center p-0.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </span>
            <span className="truncate"><span className="hidden sm:inline">Non-Veg Specials</span><span className="sm:hidden">Non-Veg</span></span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-700/20 font-mono shrink-0">
              {nonVegDishesCount}
            </span>
          </button>
        </div>

        {/* Search Bar & Result Counter */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#D8A63D]/30 shadow-md mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#7A5B43] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients (e.g., Paneer, Chicken, Biryani)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] placeholder-[#7A5B43] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7A5B43] hover:text-[#241208]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-extrabold text-[#7A5B43]">
              Showing <span className="text-[#C1621F] font-black">{filteredDishes.length}</span> {dietFilter === 'all' ? 'total' : dietFilter === 'veg' ? 'vegetarian' : 'non-vegetarian'} dishes
            </span>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  trackAction(`select_category_${cat}`);
                  setSelectedCategory(cat);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C1621F] to-[#7E1717] text-white shadow-md shadow-[#C1621F]/20 scale-[1.02]'
                    : 'bg-white hover:bg-[#F5E9CC]/80 text-[#241208] border border-[#D8A63D]/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map(dish => {
            const qty = getQty(dish.id);
            const totalDishPrice = dish.price * qty;

            return (
              <div
                key={dish.id}
                className="bg-white rounded-3xl border border-[#D8A63D]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-[#C1621F]/60"
              >
                
                {/* Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {dish.isVeg ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-[#15803d] border border-[#15803d]/40 flex items-center gap-1.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-xs border-2 border-[#15803d] flex items-center justify-center p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                        </span>
                        Pure Veg
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 text-[#b91c1c] border border-[#b91c1c]/40 flex items-center gap-1.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-xs border-2 border-[#b91c1c] flex items-center justify-center p-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]" />
                        </span>
                        Non-Veg
                      </span>
                    )}
                    {dish.isSpecial && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#C1621F] text-white shadow-sm flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Chef Pick
                      </span>
                    )}
                  </div>

                  {/* Prep Time */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#241208]/85 text-white backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D8A63D]" /> {dish.prepTime}
                    </span>
                  </div>
                </div>

                {/* Dish Info Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    {/* Category & Servings */}
                    <div className="flex items-center justify-between text-xs text-[#7A5B43] font-bold mb-1">
                      <span>{dish.category}</span>
                      <span>👥 {dish.serves}</span>
                    </div>

                    {/* Title */}
                    <h3 className="ocb-font-serif text-xl sm:text-2xl font-bold text-[#241208] group-hover:text-[#C1621F] transition-colors">
                      {dish.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#5C3A21] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price Bar & Quantity Stepper */}
                  <div className="pt-3 border-t border-[#D8A63D]/25 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-[#7A5B43] block">Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-black text-[#241208]">
                          {formatPrice(dish.price, selectedCurrency)}
                        </span>
                        {dish.originalPrice && (
                          <span className="text-xs text-[#7A5B43] line-through font-semibold">
                            {formatPrice(dish.originalPrice, selectedCurrency)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-[#F5E9CC]/60 border border-[#D8A63D]/40 rounded-xl p-1">
                      <button
                        onClick={() => setQty(dish.id, qty - 1)}
                        className="w-7 h-7 rounded-lg bg-white text-[#241208] hover:bg-[#C1621F] hover:text-white flex items-center justify-center transition font-bold"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-black text-[#241208]">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(dish.id, qty + 1)}
                        className="w-7 h-7 rounded-lg bg-white text-[#241208] hover:bg-[#C1621F] hover:text-white flex items-center justify-center transition font-bold"
                        title="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* TWO PROMINENT OPTIONS FOR EVERY DISH:                          */}
                  {/* 1. DETAIL OF THE ITEM                                          */}
                  {/* 2. BOOK THROUGH WHATSAPP ORDER (TABLE OR DELIVERY)             */}
                  {/* ============================================================== */}
                  {/* Option 1: Detail of the Item */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        trackAction(`view_detail_${dish.id}`);
                        setActiveDetailItem(dish);
                      }}
                      className="w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-white hover:bg-[#F5E9CC]/60 text-[#241208] border-2 border-[#D8A63D]/50 text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-all hover:scale-[1.02]"
                    >
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C1621F] shrink-0" />
                      <span className="truncate">Item Details</span>
                    </button>

                    {/* Option 2: Book Through WhatsApp Order */}
                    <button
                      onClick={() => handleOpenOrderModal(dish)}
                      className="w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
                      title="Book this item via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-[#25D366] shrink-0" />
                      <span className="truncate">
                        <span className="hidden sm:inline">Order on WhatsApp</span>
                        <span className="sm:hidden">WhatsApp</span>
                      </span>
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleAddDishToCart(dish)}
                    className="w-full py-2 rounded-xl bg-[#F5E9CC]/70 hover:bg-[#ecdab0] text-[#5C3A21] hover:text-[#241208] border border-[#D8A63D]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add {qty > 1 ? `${qty} portions` : 'to Cart'} ({formatPrice(totalDishPrice, selectedCurrency)})</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ============================================================== */}
      {/* 5. CULINARY PROMISE & INGREDIENT EXCELLENCE (4 CARDS)           */}
      {/* ============================================================== */}
      <section className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#241208] via-[#3B2313] to-[#241208] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#D8A63D]/40 shadow-2xl space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D8A63D]">
              ONECLICKBIZ CULINARY STANDARDS
            </span>
            <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black">
              Pure Ingredients, Uncompromising Flavor
            </h2>
            <p className="text-sm sm:text-base text-white/80">
              Every dish is freshly prepared to order. Zero artificial flavors, no reused oils, and slow-tempered with traditional earthen techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="text-2xl">🌿</span>
              <h4 className="font-extrabold text-base text-[#D8A63D]">Cold-Pressed Oils Only</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Slow-extracted wood-pressed groundnut and sesame oils that preserve natural nutrients and light digestibility.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="text-2xl">🥛</span>
              <h4 className="font-extrabold text-base text-[#D8A63D]">Desi Cow Ghee</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                Authentic aromatic clarified butter used generously for fragrant tandoori rotis, biryanis, and royal gravies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="text-2xl">🌾</span>
              <h4 className="font-extrabold text-base text-[#D8A63D]">Aged Dehradun Basmati</h4>
              <p className="text-xs text-white/75 leading-relaxed">
                2-year aged extra-long grain basmati that cooks fluffy, non-sticky, and aromatic for our clay-pot dum biryanis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <span className="text-2xl">🧼</span>
              <h4 className="font-extrabold text-base text-[#D8A63D]">
                {fssaiLicence ? `FSSAI Lic. #${fssaiLicence}` : 'Hygienic 5-Star Kitchen'}
              </h4>
              <p className="text-xs text-white/75 leading-relaxed">
                FSSAI certified commercial kitchen with high-temperature steam sanitation and strict food safety protocols.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. TABLE RESERVATION / CELEBRATION BANNER                      */}
      {/* ============================================================== */}
      <section className="relative z-10 py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D8A63D]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase">
              Table Reservation Desk
            </span>
            <h3 className="ocb-font-serif text-2xl sm:text-3xl font-black text-[#241208]">
              Planning a Family Dinner or Private Celebration?
            </h3>
            <p className="text-sm text-[#5C3A21]">
              Reserve your table in advance with custom candlelight settings, chef specials, or pre-ordered takeaway packages.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsTableBookingOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white font-extrabold text-sm shadow-md transition"
            >
              <Calendar className="w-4 h-4 inline mr-2" /> Reserve Table Now
            </button>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${restaurantName}! I want to inquire about dining table reservations and party catering.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-sm shadow-md transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Table Desk</span>
            </a>
          </div>
        </div>

        {/* Dynamic Dining Packages Configured in Builder Studio */}
        {profile.sectionData?.services?.items && profile.sectionData.services.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.sectionData.services.items.map((srv) => (
              <div 
                key={srv.id}
                className="p-6 rounded-3xl bg-white border border-[#D8A63D]/40 shadow-lg flex flex-col justify-between space-y-4 hover:border-[#C1621F] transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F]">
                      {srv.category || 'Dining Experience'}
                    </span>
                    <span className="text-sm font-black text-[#241208]">
                      {srv.price === 0 ? 'Complimentary' : `₹${srv.price.toLocaleString()}`}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg text-[#241208]">{srv.title}</h4>
                  <p className="text-xs text-[#5C3A21] leading-relaxed line-clamp-3">{srv.description}</p>
                </div>
                <button
                  onClick={() => {
                    setLeadMessage(`Booking package: ${srv.title} (${srv.price === 0 ? 'Free' : '₹' + srv.price})`);
                    setIsTableBookingOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[#FBF2DE] hover:bg-[#C1621F] text-[#C1621F] hover:text-white font-extrabold text-xs transition border border-[#D8A63D]/50 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book This Dining Experience
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 7. DINING REVIEWS & SOCIAL PROOF                              */}
      {/* ============================================================== */}
      <section id="reviews-section" className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Header with Title and "Leave a Review" CTA */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-2 border-b border-[#D8A63D]/30">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E9CC] border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-[#C1621F]" /> Guest Experiences & Ratings
            </div>
            <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
              Loved by Over 1,500+ Diners
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3A21]">
              Authentic reviews from verified dine-in guests and doorstep delivery foodies across Bengaluru.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Review Stats Tag */}
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-[#D8A63D]/40 shadow-xs flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-black text-sm text-[#241208]">4.9</span>
              </div>
              <span className="text-xs text-[#7A5B43]">• 1,500+ Reviews</span>
            </div>

            {/* Leave a Review Button */}
            <button
              onClick={() => setIsLeaveReviewModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-extrabold text-xs shadow-md shadow-[#C1621F]/20 flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setReviewFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              reviewFilter === 'all'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            All Reviews ({dinerReviews.length})
          </button>
          <button
            onClick={() => setReviewFilter('5star')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1 ${
              reviewFilter === '5star'
                ? 'bg-[#C1621F] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            <Star className="w-3 h-3 fill-amber-400" /> 5-Star Only
          </button>
          <button
            onClick={() => setReviewFilter('dinein')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              reviewFilter === 'dinein'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            🍽️ Table Dine-in
          </button>
          <button
            onClick={() => setReviewFilter('delivery')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
              reviewFilter === 'delivery'
                ? 'bg-[#241208] text-white shadow-xs'
                : 'bg-white text-[#5C3A21] border border-[#D8A63D]/30 hover:bg-[#FBF2DE]'
            }`}
          >
            🛵 Doorstep Delivery
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dinerReviews
            .filter((rev) => {
              if (reviewFilter === '5star') return rev.rating === 5;
              if (reviewFilter === 'dinein') return rev.diningType === 'Dine-in';
              if (reviewFilter === 'delivery') return rev.diningType === 'Doorstep Delivery';
              return true;
            })
            .map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-white border-2 border-[#D8A63D]/30 shadow-md hover:shadow-xl hover:border-[#C1621F] transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top: Star rating and dining mode */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FBF2DE] text-[#C1621F] border border-[#D8A63D]/30">
                      {rev.diningType}
                    </span>
                  </div>

                  {/* Favorite Dish tag */}
                  {rev.favoriteDish && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7E1717] bg-[#FBF2DE]/80 px-2.5 py-1 rounded-lg">
                      <Utensils className="w-3 h-3 text-[#C1621F]" />
                      <span>Loved: {rev.favoriteDish}</span>
                    </div>
                  )}

                  {/* Review text */}
                  <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                {/* Footer: Reviewer info and like button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#F5E9CC] text-[#C1621F] font-black text-xs flex items-center justify-center shrink-0 border border-[#D8A63D]/50 shadow-xs">
                      {rev.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-black text-[#241208] truncate">{rev.name}</p>
                        {rev.verified && (
                          <span title="Verified Diner">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#7A5B43] truncate">{rev.location} • {rev.date}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLikeReview(rev.id)}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#7A5B43] hover:text-[#C1621F] bg-[#FAF5EE] hover:bg-[#F5E9CC] px-2.5 py-1 rounded-full transition cursor-pointer shrink-0"
                    title="Mark helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likes}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>

      </section>

      {/* ============================================================== */}
      {/* 7.5. SOCIAL MEDIA HUB (INSTAGRAM & YOUTUBE SPACES)             */}
      {/* ============================================================== */}
      <section id="social-hub" className="relative z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D8A63D]/40 text-[#C1621F] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Share2 className="w-3.5 h-3.5 text-[#C1621F]" /> Behind The Scenes & Kitchen Stories
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
            Connect With Us On Social Media
          </h2>
          <p className="text-xs sm:text-sm text-[#5C3A21]">
            Watch our master chefs in the live tandoor kitchen, discover daily special cooking reels, and join our dining community on Instagram and YouTube.
          </p>
        </div>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          
          {/* 1. Instagram Platform Space (Vertical Card 1) */}
          <div className="bg-gradient-to-br from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10 rounded-3xl p-6 sm:p-8 border-2 border-pink-400/30 shadow-xl flex flex-col justify-between space-y-6 group hover:border-pink-500/60 transition-all duration-300">
            <div className="space-y-4">
              
              {/* Instagram Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="instagram" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-[#241208]">@oneclickbiz</h3>
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                    </div>
                    <p className="text-xs text-[#7A5B43] font-semibold">18.2K Foodies • 320 Kitchen Reels</p>
                  </div>
                </div>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('instagram_follow_click')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs font-black shadow-md transition flex items-center gap-2"
                >
                  <SocialIcon platform="instagram" size={14} colored={false} className="text-white" />
                  <span>Follow on Instagram</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Bio snippet */}
              <p className="text-xs sm:text-sm text-[#5C3A21] leading-relaxed">
                Authentic charcoal-tandoor roasting, royal handi dum biryani unveilings, and live dining experiences in Indiranagar, Bengaluru. Tag us in your stories to get featured!
              </p>

              {/* Instagram Reels Preview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {INSTAGRAM_REELS.map((reel, rIdx) => (
                  <a
                    key={rIdx}
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm group/item block bg-slate-900 border border-pink-500/20"
                  >
                    <img
                      src={reel.imageUrl}
                      alt={reel.alt}
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-2.5 text-white">
                      <span className="px-1.5 py-0.5 rounded-md bg-black/60 text-[9px] font-bold w-max flex items-center gap-1 backdrop-blur-xs">
                        <Play className="w-2.5 h-2.5 fill-white" /> Reel
                      </span>
                      <div>
                        <p className="text-[11px] font-bold line-clamp-2 leading-tight">{reel.title}</p>
                        <span className="text-[9px] text-[#D8A63D] font-mono mt-0.5 block">{reel.views}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </div>

            {/* Bottom Tag link */}
            <div className="pt-2 border-t border-pink-400/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A5B43]">
              <span className="font-semibold">Hashtag: #OneClickBizDining • Tag us to get featured</span>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#C1621F] hover:underline flex items-center gap-1">
                View All Reels on Instagram →
              </a>
            </div>

          </div>

          {/* 2. YouTube Platform Space (Vertical Card 2 - Stacked Directly Below Instagram) */}
          <div className="bg-gradient-to-br from-red-950/15 via-[#3B1515]/20 to-[#241208]/30 rounded-3xl p-6 sm:p-8 border-2 border-red-500/30 shadow-xl flex flex-col justify-between space-y-6 group hover:border-red-500/60 transition-all duration-300">
            <div className="space-y-5">
              
              {/* YouTube Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shrink-0">
                    <SocialIcon platform="youtube" size={24} colored={false} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#241208]">OneClickBiz Kitchen Stories</h3>
                    <p className="text-xs text-[#7A5B43] font-semibold">25.8K Subscribers • 4K Documentary Series</p>
                  </div>
                </div>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAction('youtube_subscribe_click')}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition flex items-center gap-2"
                >
                  <SocialIcon platform="youtube" size={14} colored={false} className="text-white" />
                  <span>Subscribe on YouTube</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* YouTube Video Showcase Grid (Main 4K Video + Episode Playlist) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Main 4K Video Player Showcase (Left / 7 cols) */}
                <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-lg border border-red-500/20 group/vid flex flex-col justify-end min-h-[260px] sm:min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                    alt="Live Kitchen Cooking Masterclass"
                    className="absolute inset-0 w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover/vid:bg-black/30 transition-colors flex items-center justify-center">
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAction('youtube_play_click')}
                      className="w-16 h-16 rounded-full bg-red-600/95 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95"
                      title="Play on YouTube"
                    >
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </a>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs flex items-center gap-1 z-10">
                    <span>14:20</span>
                    <span>•</span>
                    <span className="text-amber-400">4K UHD</span>
                  </div>

                  {/* Video Info Bottom Banner */}
                  <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white">
                    <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider mb-1 inline-block">
                      FEATURED EPISODE
                    </span>
                    <p className="text-sm sm:text-base font-extrabold leading-snug">
                      Behind The Dum: The 18-Hour Slow Charcoal Embers Technique
                    </p>
                    <p className="text-[11px] text-white/80 mt-1 line-clamp-2">
                      Watch our master chefs demonstrate the art of earthen pot dough sealing, whole garam masala tempering, and royal dum steaming.
                    </p>
                  </div>
                </div>

                {/* Playlist Highlights (Right / 5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    <p className="text-xs font-black uppercase tracking-wider text-[#C1621F] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Recent Kitchen Masterclasses
                    </p>

                    {YOUTUBE_PLAYLIST_ITEMS.map((item, yIdx) => (
                      <a
                        key={yIdx}
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white/70 hover:bg-white border border-[#D8A63D]/30 shadow-xs flex items-center gap-3 group/clip transition"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                          <img
                            src={item.imageUrl}
                            alt={item.alt}
                            className="w-full h-full object-cover group-hover/clip:scale-105 transition"
                          />
                          <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-[8px] font-mono text-white font-bold">{item.duration}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#241208] group-hover/clip:text-red-600 transition truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-[#7A5B43] mt-0.5">{item.subtitle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom YouTube Bar */}
            <div className="pt-2 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7A5B43]">
              <span className="font-semibold">New episode released every Friday!</span>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-red-600 hover:underline flex items-center gap-1">
                Explore Complete Channel on YouTube →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7.8. FREQUENTLY ASKED QUESTIONS (FAQ)                          */}
      {/* ============================================================== */}
      <section id="faq-section" className="relative z-10 py-12 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5E9CC] border border-[#D8A63D]/40 text-[#C1621F] text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#C1621F]" /> Dining & Hospitality Help Desk
          </div>
          <h2 className="ocb-font-serif text-3xl sm:text-4xl font-black text-[#241208]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C3A21]">
            Everything you need to know about reservations, pure veg preparation, doorstep delivery, and party hosting.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {activeFaqs.map((faq: RestaurantFaqItem) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#D8A63D] shadow-md ring-1 ring-[#D8A63D]/40'
                    : 'bg-white/80 border-[#D8A63D]/30 hover:border-[#D8A63D]/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#FBF2DE] text-[#C1621F] font-bold text-xs flex items-center justify-center shrink-0 border border-[#D8A63D]/40">
                      Q
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F] block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#241208]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#241208] text-white rotate-180' : 'bg-[#F5E9CC] text-[#241208]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C3A21] leading-relaxed border-t border-slate-100 pl-14 sm:pl-15 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Desk Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FBF2DE] via-white to-[#FBF2DE] border border-[#D8A63D]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 fill-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-[#241208]">Have another query or custom banquet inquiry?</p>
              <p className="text-[11px] text-[#7A5B43]">Chat with our Restaurant Front Desk on WhatsApp for immediate response.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${restaurantName}! I have a question regarding dining reservations and food service.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-black flex items-center gap-2 shadow-sm transition shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Ask Chef Desk</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER SECTION                                              */}
      {/* ============================================================== */}
      <footer className="relative z-10 bg-[#241208] text-white pt-14 pb-8 border-t-2 border-[#D8A63D]/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/15">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5E9CC] text-[#C1621F] flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="ocb-font-serif text-xl font-bold">{restaurantName}</h4>
                  <p className="text-xs text-[#D8A63D] font-bold">Powered by OneClickBiz Smart Dining Platform</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-white/75 max-w-md leading-relaxed">
                Contactless digital dining with instant 1-click WhatsApp order routing for restaurant tables and home deliveries. 
                Experience royal Indian culinary heritage with modern convenience.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => downloadVcfFile(profile)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#D8A63D]" />
                  <span>Save Contact</span>
                </button>
                <button
                  onClick={() => setIsTableBookingOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#D8A63D] hover:bg-[#c9942a] text-[#241208] text-xs font-extrabold transition flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Table</span>
                </button>
              </div>
            </div>

            {/* Col 2: Restaurant Timings & Address */}
            <div className="space-y-3">
              <h5 className="text-[#D8A63D] text-xs font-bold uppercase tracking-widest">DINING DESK</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C1621F] shrink-0 mt-0.5" />
                  <span>{restaurantAddress}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C1621F] shrink-0" />
                  <span>{phoneDisplay}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C1621F] shrink-0" />
                  <span>Open Daily: 11:30 AM – 11:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Navigation */}
            <div className="space-y-3">
              <h5 className="text-[#D8A63D] text-xs font-bold uppercase tracking-widest">QUICK NAV</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li><a href="#offers-section" className="hover:text-[#D8A63D] transition">→ Special Offers & Combos</a></li>
                <li><a href="#menu-section" className="hover:text-[#D8A63D] transition">→ Veg & Non-Veg Menu</a></li>
                <li><a href="#reviews-section" className="hover:text-[#D8A63D] transition">→ Guest Reviews & Ratings</a></li>
                <li><a href="#faq-section" className="hover:text-[#D8A63D] transition">→ Frequently Asked Questions (FAQ)</a></li>
                <li><a href="#social-hub" className="hover:text-[#D8A63D] transition">→ YouTube & Instagram Hub</a></li>
                <li><button onClick={() => setIsTableBookingOpen(true)} className="hover:text-[#D8A63D] transition text-left cursor-pointer">→ Reserve Dining Table</button></li>
              </ul>
            </div>

            {/* Col 4: Social Media Channels */}
            <div className="space-y-3">
              <h5 className="text-[#D8A63D] text-xs font-bold uppercase tracking-widest">SOCIAL CHANNELS</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-white/75">
                <li>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition flex items-center gap-2">
                    <SocialIcon platform="instagram" size={16} colored={true} />
                    <span>Instagram @oneclickbiz</span>
                  </a>
                </li>
                <li>
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition flex items-center gap-2">
                    <SocialIcon platform="youtube" size={16} colored={true} />
                    <span>YouTube Kitchen Stories</span>
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-2">
                    <SocialIcon platform="whatsapp" size={16} colored={true} />
                    <span>WhatsApp Dining Desk</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <span>© 2026 {restaurantName}. All rights reserved.</span>
            <span>Digital Dining Powered by OneClickBiz</span>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 9. DISH DETAIL MODAL (OPTION 1: ITEM DETAILS)                  */}
      {/* ============================================================== */}
      {activeDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-[#D8A63D]/40 shadow-2xl relative">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveDetailItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              aria-label="Close dish details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-60 w-full overflow-hidden bg-slate-100">
              <img
                src={activeDetailItem.imageUrl}
                alt={activeDetailItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    activeDetailItem.isVeg ? 'bg-[#15803d]' : 'bg-[#b91c1c]'
                  } text-white inline-flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {activeDetailItem.isVeg ? 'Pure Veg' : 'Non-Veg'} • {activeDetailItem.category}
                  </span>
                  <h3 className="ocb-font-serif text-2xl font-black mt-1">
                    {activeDetailItem.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#D8A63D]">
                    {formatPrice(activeDetailItem.price, selectedCurrency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Dish Modal Tabs: Reviews VS Recipe & Ingredients */}
            <div className="px-4 sm:px-6 pt-3 bg-white border-b border-[#D8A63D]/20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDishDetailModalTab('reviews')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  dishDetailModalTab === 'reviews'
                    ? 'border-[#C1621F] text-[#C1621F]'
                    : 'border-transparent text-[#7A5B43] hover:text-[#241208]'
                }`}
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>Diner Reviews & Ratings</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C1621F]/15 text-[#C1621F] font-mono">
                  {(userDishReviews[activeDetailItem.id]?.length || 0) + 3}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDishDetailModalTab('recipe')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 border-b-2 cursor-pointer ${
                  dishDetailModalTab === 'recipe'
                    ? 'border-[#C1621F] text-[#C1621F]'
                    : 'border-transparent text-[#7A5B43] hover:text-[#241208]'
                }`}
              >
                <Info className="w-4 h-4 text-[#C1621F]" />
                <span>Recipe & Ingredients</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              
              {dishDetailModalTab === 'reviews' ? (
                /* ============================================================== */
                /* TAB 1: DINER REVIEWS & LEAVE A DISH REVIEW                      */
                /* ============================================================== */
                <div className="space-y-5">
                  {/* Dish Score Summary Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FBF2DE] via-white to-[#F5E9CC] border border-[#D8A63D]/40 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C1621F] block">
                        Verified Diner Rating
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-base font-black text-[#241208]">4.9 / 5.0</span>
                        <span className="text-xs text-[#7A5B43]">• {(userDishReviews[activeDetailItem.id]?.length || 0) + 48} reviews</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsWritingDishReview(!isWritingDishReview)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#D8A63D] hover:opacity-95 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>{isWritingDishReview ? 'Close Form' : 'Write a Review for this Dish'}</span>
                    </button>
                  </div>

                  {/* Leave Dish Review Form */}
                  {isWritingDishReview && (
                    <form
                      onSubmit={handleAddDishReview(activeDetailItem.id, activeDetailItem.name)}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FBF2DE] border-2 border-[#D8A63D]/50 space-y-3 animate-in fade-in duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-xs uppercase tracking-wider text-[#241208] flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>Leave Your Review for {activeDetailItem.name}</span>
                        </h4>
                        <span className="text-[10px] font-bold text-[#C1621F]">Verified Post</span>
                      </div>

                      {dishReviewSuccess ? (
                        <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-xl text-xs font-bold text-center">
                          ✓ {dishReviewSuccess}
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                              type="text"
                              required
                              placeholder="Your Name *"
                              value={newDishReviewName}
                              onChange={(e) => setNewDishReviewName(e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-[#241208] focus:outline-hidden"
                            />
                            <input
                              type="text"
                              placeholder="City / Area"
                              value={newDishReviewCity}
                              onChange={(e) => setNewDishReviewCity(e.target.value)}
                              className="px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-[#241208] focus:outline-hidden"
                            />
                          </div>

                          <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#D8A63D]/40">
                            <span className="text-xs font-bold text-[#241208]">Rate Dish:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setNewDishReviewRating(star)}
                                  className="cursor-pointer"
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      star <= newDishReviewRating
                                        ? 'fill-amber-400 text-amber-500'
                                        : 'text-slate-300'
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="text-xs font-bold text-[#C1621F] ml-1">{newDishReviewRating} Stars</span>
                            </div>
                          </div>

                          <textarea
                            required
                            rows={2}
                            placeholder="Tell fellow foodies how it tasted, aroma, richness, spice level, or portion size..."
                            value={newDishReviewComment}
                            onChange={(e) => setNewDishReviewComment(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-hidden"
                          />

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                          >
                            Submit Review for {activeDetailItem.name}
                          </button>
                        </>
                      )}
                    </form>
                  )}

                  {/* List of Verified Reviews for this Dish */}
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-[#C1621F]">
                      Recent Diner Experiences for this Item
                    </p>

                    {/* User submitted reviews first */}
                    {(userDishReviews[activeDetailItem.id] || []).map((uRev, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-emerald-300 shadow-xs space-y-1.5 animate-in fade-in"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                              {uRev.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs font-black text-[#241208]">{uRev.name}</p>
                              <p className="text-[10px] text-[#7A5B43]">{uRev.city} • {uRev.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-500">
                            {[...Array(uRev.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#5C3A21] italic leading-relaxed">
                          "{uRev.review}"
                        </p>
                      </div>
                    ))}

                    {/* Default curated verified reviews for this dish */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#D8A63D]/30 shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#F5E9CC] text-[#C1621F] font-bold text-xs flex items-center justify-center">
                            S
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#241208]">Siddharth Sen</p>
                            <p className="text-[10px] text-[#7A5B43]">Indiranagar, BLR • Verified Diner</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#5C3A21] italic leading-relaxed">
                        "Ordered this with our dining table. The charcoal earthen aroma and richness of pure desi ghee is world-class. Highly recommended!"
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#D8A63D]/30 shadow-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#F5E9CC] text-[#C1621F] font-bold text-xs flex items-center justify-center">
                            P
                          </div>
                          <div>
                            <p className="text-xs font-black text-[#241208]">Priya Chandran</p>
                            <p className="text-[10px] text-[#7A5B43]">Koramangala, BLR • Doorstep Delivery</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-[#5C3A21] italic leading-relaxed">
                        "Arrived piping hot. Portions are generous and the spices are balanced without being overly oily."
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                /* ============================================================== */
                /* TAB 2: RECIPE SPECS, INGREDIENTS & CHEF PAIRING                */
                /* ============================================================== */
                <>
                  {/* Quick Spec Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FBF2DE] border border-[#D8A63D]/30">
                      <span className="text-[#7A5B43] block font-bold">Preparation</span>
                      <span className="font-black text-[#241208]">{activeDetailItem.prepTime}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FBF2DE] border border-[#D8A63D]/30">
                      <span className="text-[#7A5B43] block font-bold">Portion</span>
                      <span className="font-black text-[#241208]">{activeDetailItem.serves}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FBF2DE] border border-[#D8A63D]/30">
                      <span className="text-[#7A5B43] block font-bold">Spice Level</span>
                      <span className="font-black text-[#C1621F]">
                        {'🌶️'.repeat(activeDetailItem.spiceLevel)} ({activeDetailItem.spiceLevel === 1 ? 'Mild' : activeDetailItem.spiceLevel === 2 ? 'Medium' : 'Spicy'})
                      </span>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#C1621F]">
                      Culinary Description
                    </h4>
                    <p className="text-sm text-[#5C3A21] leading-relaxed">
                      {activeDetailItem.description}
                    </p>
                  </div>

                  {/* Ingredients List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#C1621F]">
                      Key Ingredients & Spices
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDetailItem.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#F5E9CC]/60 border border-[#D8A63D]/40 text-xs font-bold text-[#241208]"
                        >
                          ✓ {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Chef's Note & Pairings */}
                  {activeDetailItem.chefNote && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1">
                      <p className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Chef's Recommendation:
                      </p>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {activeDetailItem.chefNote}
                      </p>
                      {activeDetailItem.pairWith && (
                        <p className="text-[11px] font-bold text-amber-900 pt-1">
                          Pairs best with: <span className="underline">{activeDetailItem.pairWith}</span>
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Modal Bottom Actions */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 bg-[#F5E9CC]/60 border border-[#D8A63D]/40 rounded-xl p-1">
                    <button
                      onClick={() => setQty(activeDetailItem.id, getQty(activeDetailItem.id) - 1)}
                      className="w-8 h-8 rounded-lg bg-white text-[#241208] flex items-center justify-center font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black text-[#241208]">
                      {getQty(activeDetailItem.id)}
                    </span>
                    <button
                      onClick={() => setQty(activeDetailItem.id, getQty(activeDetailItem.id) + 1)}
                      className="w-8 h-8 rounded-lg bg-white text-[#241208] flex items-center justify-center font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Trigger Dual Option WhatsApp Modal */}
                  <button
                    onClick={() => {
                      const item = activeDetailItem;
                      setActiveDetailItem(null);
                      handleOpenOrderModal(item);
                    }}
                    className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-[#25D366] shrink-0" />
                    <span className="truncate">
                      <span className="hidden sm:inline">Order on WhatsApp</span>
                      <span className="sm:hidden">Order</span> (₹{activeDetailItem.price * getQty(activeDetailItem.id)})
                    </span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddDishToCart(activeDetailItem);
                    setActiveDetailItem(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#241208] hover:bg-[#3B2313] text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8A63D]" />
                  <span>Add to OneClickBiz Cart</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. 2-OPTION WHATSAPP ORDER (RESTAURANT vs DELIVERY)                       */}
      {/* 1. PERSON AT RESTAURANT (TABLE NO, DINER NAME, COOKING NOTE)               */}
      {/* 2. PERSON AT OTHER PLACE (NAME, PHONE, ADDRESS, LANE, LANDMARK)           */}
      {/* ========================================================================= */}
      {isOrderModalOpen && (orderModalDish || (isCartOrder && cart.length > 0)) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border-2 border-[#D8A63D]/50 shadow-2xl p-4 sm:p-8 relative space-y-5 sm:space-y-6">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition"
              aria-label="Close Order Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header & Order Summary */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase">
                <Utensils className="w-3.5 h-3.5" /> Order Details
              </div>
              <h3 className="ocb-font-serif text-2xl font-black text-[#241208]">
                Where Are You Ordering From?
              </h3>
              <p className="text-xs text-[#5C3A21]">
                Select dining at the restaurant or doorstep delivery:
              </p>

              {/* Order Summary: Single Dish or Multi-Item Cart */}
              {orderModalDish ? (
                /* Single Dish Summary Pill */
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FBF2DE] to-[#F5E9CC] border border-[#D8A63D]/40 flex items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={orderModalDish.imageUrl}
                      alt={orderModalDish.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#D8A63D]/30"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#241208] truncate">{orderModalDish.name}</p>
                      <p className="text-xs text-[#7A5B43]">₹{orderModalDish.price} each</p>
                    </div>
                  </div>

                  {/* Stepper & Total */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-white rounded-lg border border-[#D8A63D]/30 p-0.5">
                      <button
                        onClick={() => setQty(orderModalDish.id, getQty(orderModalDish.id) - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-black">
                        {getQty(orderModalDish.id)}
                      </span>
                      <button
                        onClick={() => setQty(orderModalDish.id, getQty(orderModalDish.id) + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-black text-[#241208]">
                      ₹{orderModalDish.price * getQty(orderModalDish.id)}
                    </span>
                  </div>
                </div>
              ) : (
                /* Cart Order Summary Pill */
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FBF2DE] to-[#F5E9CC] border border-[#D8A63D]/40 space-y-2 mt-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#D8A63D]/25">
                    <span className="text-xs font-black uppercase text-[#C1621F] flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{cart.reduce((s, i) => s + i.quantity, 0)} Items from Cart</span>
                    </span>
                    <span className="text-sm font-black text-[#241208]">
                      Total: ₹{cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)}
                    </span>
                  </div>
                  <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xs text-[#5C3A21]">
                    {cart.map(ci => (
                      <div key={ci.product.id} className="flex justify-between items-center">
                        <span className="truncate pr-2">{ci.product.name} (x{ci.quantity})</span>
                        <span className="font-bold text-[#241208] shrink-0">₹{ci.product.price * ci.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* DUAL OPTION SELECTOR TABS (USER EXPLICIT REQUIREMENT) */}
            <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#F5E9CC]/60 border border-[#D8A63D]/40">
              <button
                type="button"
                onClick={() => setOrderMode('restaurant')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                  orderMode === 'restaurant'
                    ? 'bg-[#241208] text-white shadow-md'
                    : 'text-[#5C3A21] hover:text-[#241208] hover:bg-white/50'
                }`}
              >
                <Store className="w-4 h-4 text-[#D8A63D]" />
                <span>Person at Restaurant</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderMode('delivery')}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all ${
                  orderMode === 'delivery'
                    ? 'bg-[#241208] text-white shadow-md'
                    : 'text-[#5C3A21] hover:text-[#241208] hover:bg-white/50'
                }`}
              >
                <Home className="w-4 h-4 text-[#D8A63D]" />
                <span>Person at Other Place</span>
              </button>
            </div>

            {/* FORM: INPUTS ACCORDING TO SELECTED OPTION */}
            <form onSubmit={handleConfirmWhatsAppOrder} className="space-y-4">
              
              {/* ============================================================== */}
              {/* OPTION A: PERSON AT RESTAURANT (DINE-IN TABLE ORDER)          */}
              {/* ============================================================== */}
              {orderMode === 'restaurant' ? (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium">
                    🍽️ Dining inside the restaurant? Enter your table number so the kitchen team brings your order straight to your table!
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Table Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table #04"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-bold text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={dinerName}
                        onChange={(e) => setDinerName(e.target.value)}
                        placeholder="e.g. Rahul"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#241208] block mb-1">
                      Kitchen / Cooking Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={cookingNote}
                      onChange={(e) => setCookingNote(e.target.value)}
                      placeholder="e.g. Less spicy, extra lemon, bring water glasses"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                    />
                  </div>
                </div>
              ) : (
                /* ============================================================== */
                /* OPTION B: PERSON AT OTHER PLACE (HOME/OFFICE DELIVERY)         */
                /* ADDRESS, LANE, LANDMARK (AS EXPLICITLY REQUESTED BY USER)     */
                /* ============================================================== */
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 font-medium">
                    🛵 Delivery Order. Please provide your delivery address details:
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Customer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryCustomerName}
                        onChange={(e) => setDeliveryCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#241208] block mb-1">
                      Complete Address / Flat / Building No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Flat 302, Green Valley Apartments"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Lane / Street Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryLane}
                        onChange={(e) => setDeliveryLane(e.target.value)}
                        placeholder="e.g. 4th Cross, 12th Main Road"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-black text-[#241208] block mb-1">
                        Landmark <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryLandmark}
                        onChange={(e) => setDeliveryLandmark(e.target.value)}
                        placeholder="e.g. Near Indiranagar Metro Station"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#241208] block mb-1">
                      Delivery Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g. Ring bell twice, leave at security desk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                    />
                  </div>

                  {/* Payment Preference */}
                  <div className="pt-2 border-t border-[#D8A63D]/30 space-y-2">
                    <label className="text-xs font-black text-[#241208] block">
                      Payment Preference
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryPaymentMode('whatsapp_upi')}
                        className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                          deliveryPaymentMode === 'whatsapp_upi'
                            ? 'bg-white border-[#25D366] ring-2 ring-[#25D366]/30 shadow-xs'
                            : 'bg-[#FBF2DE]/40 border-[#D8A63D]/30 hover:bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                          deliveryPaymentMode === 'whatsapp_upi' ? 'border-[#25D366] bg-[#25D366]' : 'border-slate-400'
                        }`}>
                          {deliveryPaymentMode === 'whatsapp_upi' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-[#241208]">📲 UPI Payment</p>
                          <p className="text-[10px] text-[#7A5B43] mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryPaymentMode('whatsapp_cod')}
                        className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                          deliveryPaymentMode === 'whatsapp_cod'
                            ? 'bg-white border-[#25D366] ring-2 ring-[#25D366]/30 shadow-xs'
                            : 'bg-[#FBF2DE]/40 border-[#D8A63D]/30 hover:bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                          deliveryPaymentMode === 'whatsapp_cod' ? 'border-[#25D366] bg-[#25D366]' : 'border-slate-400'
                        }`}>
                          {deliveryPaymentMode === 'whatsapp_cod' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-[#241208]">💵 Cash on Delivery (COD)</p>
                          <p className="text-[10px] text-[#7A5B43] mt-0.5">Pay in cash when order arrives</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {(() => {
                const totalAmt = isCartOrder 
                  ? cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)
                  : (orderModalDish ? orderModalDish.price * getQty(orderModalDish.id) : 0);

                return (
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>
                      {orderMode === 'delivery'
                        ? `Place Delivery Order (₹${totalAmt})`
                        : `Place Table Order (₹${totalAmt})`}
                    </span>
                  </button>
                );
              })()}

            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 10-B. DEDICATED ONECLICKBIZ LUXURY CART DRAWER                 */}
      {/* ============================================================== */}
      {isLocalCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full flex flex-col border-l-2 border-[#D8A63D]/40 shadow-2xl relative animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-5 border-b border-[#D8A63D]/30 flex items-center justify-between bg-gradient-to-r from-[#FBF2DE] to-[#F5E9CC]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#C1621F] text-white flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="ocb-font-serif text-lg font-black text-[#241208]">Your Dining Cart</h3>
                  <p className="text-[11px] font-bold text-[#C1621F]">{cart.reduce((s, i) => s + i.quantity, 0)} Items Selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsLocalCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition border border-[#D8A63D]/30"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#F5E9CC] text-[#C1621F] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <p className="text-sm font-bold text-[#241208]">Your cart is empty</p>
                  <p className="text-xs text-[#7A5B43]">Explore our handcrafted dishes and add portions to begin.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.product.id}
                    className="p-3 rounded-2xl bg-[#FBF2DE]/50 border border-[#D8A63D]/30 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#D8A63D]/30"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#241208] truncate">{item.product.name}</h4>
                      <p className="text-xs font-black text-[#C1621F]">₹{item.product.price} each</p>
                      <p className="text-[11px] text-[#7A5B43]">Subtotal: ₹{item.product.price * item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white rounded-xl border border-[#D8A63D]/30 p-1 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-[#F5E9CC] hover:bg-[#C1621F] hover:text-white flex items-center justify-center text-xs font-bold transition"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-black text-[#241208]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-[#F5E9CC] hover:bg-[#C1621F] hover:text-white flex items-center justify-center text-xs font-bold transition"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout Bar */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#D8A63D]/30 bg-[#FBF2DE]/80 space-y-3">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span className="text-[#5C3A21]">Estimated Total Bill:</span>
                  <span className="text-xl font-black text-[#241208]">
                    ₹{cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)}
                  </span>
                </div>

                <button
                  onClick={handleOpenCartOrderModal}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C1621F]/25 transition hover:scale-[1.01]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Proceed to WhatsApp Order</span>
                </button>

                <p className="text-[10px] text-center text-[#7A5B43]">
                  Choose Table or Delivery Address next
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Cart Button when items exist */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsLocalCartOpen(true)}
          className="fixed bottom-5 left-3 sm:left-6 z-40 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#C1621F] to-[#7E1717] text-white shadow-2xl flex items-center gap-2 sm:gap-2.5 animate-bounce hover:scale-105 active:scale-95 transition-all font-bold text-xs sm:text-sm border-2 border-[#D8A63D]/50 shadow-[#C1621F]/30"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>{cart.reduce((s, i) => s + i.quantity, 0)} Dishes</span>
          <span className="font-black bg-white/25 px-2 py-0.5 rounded-full text-xs">
            ₹{cart.reduce((s, ci) => s + (ci.product.price * ci.quantity), 0)}
          </span>
        </button>
      )}

      {/* ============================================================== */}
      {/* 11. TABLE RESERVATION MODAL                                    */}
      {/* ============================================================== */}
      {isTableBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto border-2 border-[#D8A63D]/40 shadow-2xl p-5 sm:p-8 relative space-y-4 sm:space-y-5">
            
            <button
              onClick={() => setIsTableBookingOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition"
              aria-label="Close Reservation Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase">
                Instant Confirmation
              </span>
              <h3 className="ocb-font-serif text-2xl font-black text-[#241208]">
                Reserve a Dining Table
              </h3>
              <p className="text-xs text-[#5C3A21]">
                Fill details below to reserve your dining table.
              </p>
            </div>

            <form onSubmit={handleTableReservationSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-extrabold text-[#241208] block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-[#241208] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#241208] block mb-1">Number of Guests</label>
                  <select
                    value={bookGuests}
                    onChange={(e) => setBookGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-extrabold text-[#241208] block mb-1">Date</label>
                  <input
                    type="date"
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold text-[#241208] block mb-1">Time</label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-sm font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="13:30">01:30 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-[#241208] block mb-1">Special Requests / Occasion</label>
                <textarea
                  rows={2}
                  value={leadMessage}
                  onChange={(e) => setLeadMessage(e.target.value)}
                  placeholder="e.g. Birthday celebration, high-chair needed, quiet corner..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF2DE]/50 border border-[#D8A63D]/40 text-xs font-medium text-[#241208] focus:outline-none focus:ring-2 focus:ring-[#C1621F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm Reservation via WhatsApp</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11.2. DINER LEAVE A REVIEW MODAL                               */}
      {/* ============================================================== */}
      {isLeaveReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border-2 border-[#D8A63D]/50 shadow-2xl p-5 sm:p-7 relative space-y-4 max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setIsLeaveReviewModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition cursor-pointer"
              aria-label="Close Review Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#F5E9CC] text-[#C1621F] text-xs font-black uppercase tracking-wider inline-block">
                Share Your Dining Experience
              </span>
              <h3 className="ocb-font-serif text-2xl font-black text-[#241208]">
                Write a Guest Review
              </h3>
              <p className="text-xs text-[#5C3A21]">
                Your feedback helps fellow diners discover culinary gems and helps our chefs perfect every recipe.
              </p>
            </div>

            {reviewSuccessMessage ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-extrabold text-sm text-emerald-900">{reviewSuccessMessage}</h4>
                <p className="text-xs text-emerald-700">Your review is now visible on our Guest Experiences board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddDinerReview} className="space-y-3.5 text-xs">
                
                {/* Star Rating Selector */}
                <div className="p-3.5 rounded-2xl bg-[#FBF2DE]/60 border border-[#D8A63D]/30 space-y-1.5 text-center">
                  <label className="font-bold text-[#241208] block text-xs">Rate Your Experience *</label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 transition hover:scale-125 cursor-pointer"
                        title={`${star} Star${star > 1 ? 's' : ''}`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-slate-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#C1621F] block">
                    {newReviewRating === 5 ? '⭐⭐⭐⭐⭐ Exceptional / Outstanding!' :
                     newReviewRating === 4 ? '⭐⭐⭐⭐ Very Good Food & Service' :
                     newReviewRating === 3 ? '⭐⭐⭐ Good Dining Experience' : 'Fair / Needs Improvement'}
                  </span>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera Nair"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-none focus:border-[#C1621F]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">City / Neighborhood</label>
                    <input
                      type="text"
                      placeholder="e.g. Indiranagar, BLR"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-none focus:border-[#C1621F]"
                    />
                  </div>
                </div>

                {/* Dining Type & Recommended Dish */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Dining Type</label>
                    <select
                      value={newReviewType}
                      onChange={(e) => setNewReviewType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-none focus:border-[#C1621F]"
                    >
                      <option value="Dine-in">Table Dine-in</option>
                      <option value="Doorstep Delivery">Doorstep Delivery</option>
                      <option value="Family Party">Family Party / Banquet</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#241208]">Favorite Dish (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Awadhi Dum Biryani"
                      value={newReviewDish}
                      onChange={(e) => setNewReviewDish(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-none focus:border-[#C1621F]"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="font-bold text-[#241208]">Your Review / Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell other diners about the food taste, aroma, table ambiance, spice levels, or delivery speed..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8A63D]/40 text-xs text-[#241208] focus:outline-none focus:border-[#C1621F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C1621F] via-[#D8A63D] to-[#C1621F] hover:opacity-95 text-white font-black text-xs shadow-md transition active:scale-95 cursor-pointer"
                >
                  Submit Dining Review
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11.5. WEBSITE QR CODE MODAL FOR WHOLE SITE SCANNING           */}
      {/* ============================================================== */}
      {isWebsiteQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-8 border-2 border-[#D8A63D]/60 shadow-2xl space-y-4 sm:space-y-5 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D8A63D]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#F5E9CC] text-[#C1621F] flex items-center justify-center shadow-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#241208]">Official Website QR Code</h3>
                  <p className="text-xs text-[#7A5B43]">Scan to open menu on smartphone</p>
                </div>
              </div>
              <button
                onClick={() => setIsWebsiteQrModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                aria-label="Close QR Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal QR Code Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FAF4E6] to-[#F5E9CC] border-2 border-[#D8A63D]/50 flex flex-col items-center justify-center shadow-inner">
              <div className="relative p-3 bg-white rounded-2xl shadow-xl border border-[#D8A63D]/40">
                <img
                  src={websiteQrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(currentWebsiteUrl)}&color=241208`}
                  alt={`${restaurantName} Website QR Code`}
                  className="w-52 h-52 object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-[#241208] text-[#D8A63D] flex items-center justify-center border-2 border-white shadow-md text-xs font-black">
                    🍽️
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center space-y-1">
                <p className="font-extrabold text-sm text-[#241208]">
                  Point Any Phone Camera to Scan
                </p>
                <p className="text-xs text-[#5C3A21] max-w-xs leading-relaxed">
                  Opens our complete digital menu with live dish photos, WhatsApp ordering desk, and table reservations.
                </p>
              </div>
            </div>

            {/* URL Display with Copy Button */}
            <div className="p-3 rounded-xl bg-[#F5E9CC]/60 border border-[#D8A63D]/40 flex items-center justify-between gap-2">
              <p className="text-xs font-mono font-bold text-[#241208] truncate">
                {currentWebsiteUrl}
              </p>
              <button
                onClick={handleCopyWebsiteUrl}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs font-bold text-[#241208] border border-[#D8A63D]/40 shrink-0 transition flex items-center gap-1 shadow-xs"
              >
                {copiedWebsiteUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#C1621F]" />}
                <span>{copiedWebsiteUrl ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleDownloadWebsiteQr}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#C1621F] to-[#7E1717] hover:from-[#a84f14] hover:to-[#681111] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out ${restaurantName} interactive digital dining menu & WhatsApp order desk: ${currentWebsiteUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Share WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. FLOATING WHATSAPP BUTTON                                   */}
      {/* ============================================================== */}
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi ${restaurantName}! I am viewing your OneClickBiz digital menu and would like to place an order.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-3 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
        aria-label="Order directly on WhatsApp"
        title="Order directly on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C1621F] border-2 border-white flex items-center justify-center text-[9px] font-black">
          1
        </span>
        <svg viewBox="0 0 32 32" fill="#fff" className="w-6 h-6 sm:w-7 sm:h-7">
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.66 4.523 1.803 6.383L4 29l7.812-1.76A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-2.02 0-3.9-.59-5.48-1.61l-.393-.25-4.633 1.043 1.02-4.52-.258-.406A9.7 9.7 0 0 1 6.25 15c0-5.385 4.372-9.75 9.754-9.75 5.383 0 9.746 4.365 9.746 9.75s-4.363 9.75-9.746 9.75Zm5.34-7.297c-.293-.148-1.734-.855-2.004-.953-.27-.098-.465-.148-.66.148-.196.297-.758.953-.93 1.148-.172.196-.343.22-.636.074-.293-.148-1.238-.457-2.36-1.457-.872-.777-1.461-1.738-1.633-2.035-.172-.297-.02-.457.129-.605.132-.132.293-.344.44-.516.147-.172.196-.297.294-.492.098-.196.05-.367-.024-.516-.074-.148-.66-1.594-.906-2.184-.238-.57-.48-.492-.66-.5-.172-.008-.367-.008-.563-.008-.196 0-.516.074-.785.371-.27.297-1.03 1.008-1.03 2.46 0 1.453 1.055 2.856 1.203 3.055.148.196 2.078 3.172 5.04 4.445.704.305 1.254.488 1.683.625.708.226 1.352.194 1.86.117.567-.086 1.734-.71 1.98-1.394.245-.684.245-1.27.172-1.394-.074-.125-.27-.196-.563-.344Z"/>
        </svg>
      </a>

    </div>
  );
}
