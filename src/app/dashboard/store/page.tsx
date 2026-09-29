'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Edit, 
  ExternalLink, 
  MessageCircle, 
  Check, 
  Package, 
  DollarSign,
  Upload,
  Tag,
  Search,
  Sparkles,
  X,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_PROFILES } from '@/lib/data-store';
import { ProductItem } from '@/lib/types';
import { exportStoreCatalogPDF } from '@/lib/pdf-export';

// Default suggested categories
const SUGGESTED_CATEGORIES = [
  'Physical Products',
  'Digital Goods',
  'Consulting & Services',
  'Fashion & Apparel',
  'Food & Beverages',
  'Art & Handcrafted',
  'Electronics & Gadgets',
  'Beauty & Wellness',
  'Home & Decor'
];

import { getCurrentUserPlan, PlanTierType } from '@/lib/plan-guards';
import PlanLockGate from '@/components/common/PlanLockGate';

export default function StoreManagerPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PROFILES[0].sectionData.products?.items || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userSlug, setUserSlug] = useState('alex');
  const [userPlanTier, setUserPlanTier] = useState<PlanTierType>('PRO');
  
  // New product form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  const productImageFileRef = useRef<HTMLInputElement | null>(null);

  // Load from session and localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detectedPlan = getCurrentUserPlan();
        setUserPlanTier(detectedPlan);

        const session = localStorage.getItem('oneclickbiz_user_session');
        let currentSlug = 'alex';
        if (session) {
          const parsed = JSON.parse(session);
          currentSlug = parsed.slug || 'alex';
          setUserSlug(currentSlug);
        }

        const profileKey = `oneclickbiz_custom_profile_${currentSlug}`;
        const savedProfile = localStorage.getItem(profileKey);
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile);
          if (parsed.sectionData?.products?.items) {
            setProducts(parsed.sectionData.products.items);
            return;
          }
        }
        
        // Fallback to default
        setProducts(INITIAL_PROFILES[0].sectionData.products?.items || []);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Strict Plan Gating: Basic Plan cannot access Store Catalog
  if (userPlanTier === 'BASIC') {
    return (
      <PlanLockGate
        requiredPlan="PRO"
        currentPlan={userPlanTier}
        featureTitle="WhatsApp Mini-Store & E-Commerce Catalog"
        featureDescription="The WhatsApp Store manager allows you to list unlimited products, custom price categories, high-resolution product photos, and accept instant 1-click orders sent directly to your WhatsApp."
        benefits={[
          'Unlimited WhatsApp Store product listings & categories',
          'Instant 1-click customer order checkout via WhatsApp',
          'Print-ready vector PDF catalog and price list generation',
          '1 White-label custom domain CNAME support included',
          'Appointment & consultation slot booking engine included'
        ]}
      />
    );
  }

  // Save products to local storage and sync with server
  const saveProducts = (updatedProducts: ProductItem[]) => {
    setProducts(updatedProducts);
    if (typeof window !== 'undefined') {
      try {
        const profileKey = `oneclickbiz_custom_profile_${userSlug}`;
        const savedProfile = localStorage.getItem(profileKey);
        const parsed = savedProfile ? JSON.parse(savedProfile) : { ...INITIAL_PROFILES[0], slug: userSlug };
        if (!parsed.sectionData) parsed.sectionData = {};
        parsed.sectionData.products = { items: updatedProducts };
        localStorage.setItem(profileKey, JSON.stringify(parsed));

        // Sync to server profile
        fetch(`/api/profiles/${encodeURIComponent(userSlug)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        }).catch(err => console.error('Store sync error:', err));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a product name.');
      return;
    }

    const finalCategory = category.trim() || 'General';

    const newProduct: ProductItem = {
      id: `prod_${Date.now()}`,
      name,
      description,
      price: Number(price) || 0,
      currency: '₹',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      category: finalCategory,
      isAvailable: true
    };

    const updated = [newProduct, ...products];
    saveProducts(updated);

    setIsModalOpen(false);
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('');

    confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.6 }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImageUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Dynamically collect all distinct categories in the store
  const allCategories = ['All', ...Array.from(new Set([
    ...products.map(p => p.category).filter(Boolean)
  ]))];

  // Combined suggestions for the add product form (existing store categories + presets)
  const categorySuggestions = Array.from(new Set([
    ...products.map(p => p.category).filter(Boolean),
    ...SUGGESTED_CATEGORIES
  ]));

  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategoryFilter === 'All' || prod.category === selectedCategoryFilter;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Hidden file input for product image */}
      <input 
        ref={productImageFileRef}
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="hidden" 
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/40 border border-emerald-500/20 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" /> WhatsApp E-Commerce Catalog
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            WhatsApp Store Manager
          </h1>
          <p className="text-xs text-slate-400">
            Add custom products with your own custom categories, pricing, and automated 1-click WhatsApp order checkout.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportStoreCatalogPDF(products)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all shadow"
            title="Download Catalog & Price List as PDF"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Catalog PDF</span>
          </button>

          <button 
            onClick={() => {
              setCategory('');
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Store Product
          </button>

          <a
            href={`/v/${userSlug}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Store</span>
          </a>
        </div>
      </div>

      {/* Filter & Category Pills Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(prod => (
          <div key={prod.id} className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl hover:-translate-y-0.5 duration-200 group">
            <div className="h-48 w-full overflow-hidden bg-slate-800 relative">
              <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-extrabold text-emerald-400 border border-white/10 shadow">
                {prod.currency}{prod.price.toLocaleString()}
              </span>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 shadow">
                {prod.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{prod.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{prod.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> WhatsApp Checkout Active
                </span>
                <button 
                  onClick={() => handleDelete(prod.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete Product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================== */}
      {/* ADD / EDIT PRODUCT MODAL (CLEAN & MODERN UI)                   */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900/95 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-7 text-white shadow-2xl shadow-emerald-950/40 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">Add Store Product</h3>
                  <p className="text-[11px] text-slate-400">Custom category & instant WhatsApp ordering</p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              
              {/* Product Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-200">Product / Package Name <span className="text-emerald-400">*</span></label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="e.g. Premium Business Card Design, Ceramic Mug, Brand Audit"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Price & Category Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">Price (INR ₹) <span className="text-emerald-400">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                    <input 
                      type="number" 
                      required 
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      placeholder="1499"
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* Free Typing Custom Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-200">Category <span className="text-emerald-400">*</span></label>
                  <input 
                    type="text" 
                    required
                    list="store-category-datalist"
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    placeholder="Type or pick category..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                  {/* HTML5 datalist for clean auto-complete */}
                  <datalist id="store-category-datalist">
                    {categorySuggestions.map(c => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Subtle Quick Category Suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-medium text-slate-400">Suggestions:</span>
                {['Physical Products', 'Digital Goods', 'Consulting', 'Fashion', 'Art & Craft'].map((catName) => (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => setCategory(catName)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                      category.toLowerCase() === catName.toLowerCase()
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60'
                    }`}
                  >
                    {catName}
                  </button>
                ))}
              </div>

              {/* Product Image Gallery Upload Dropzone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">Product Image</label>
                
                {imageUrl ? (
                  /* Image Preview Card */
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30 p-2.5 flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0 relative">
                      <img src={imageUrl} alt="Product Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Image attached
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{imageUrl.slice(0, 40)}...</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <button
                          type="button"
                          onClick={() => productImageFileRef.current?.click()}
                          className="text-[11px] font-semibold text-emerald-300 hover:text-emerald-200 underline"
                        >
                          Change from Gallery
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageUrl('')}
                          className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Upload Dropzone */
                  <div className="space-y-2">
                    <div 
                      onClick={() => productImageFileRef.current?.click()}
                      className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-emerald-500/60 bg-slate-950/60 hover:bg-emerald-950/10 p-4 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                        Click to upload photo from your Gallery
                      </p>
                      <p className="text-[10px] text-slate-500">Supports PNG, JPG, WebP, GIF</p>
                    </div>

                    {/* Or URL input */}
                    <div className="relative">
                      <input 
                        type="text" 
                        value={imageUrl} 
                        onChange={e => setImageUrl(e.target.value)} 
                        placeholder="Or paste an image web link here..."
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-200">Description <span className="text-emerald-400">*</span></label>
                <textarea 
                  rows={2} 
                  required 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  placeholder="Key features, specs, deliverables, or package inclusions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Save to WhatsApp Catalog</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
