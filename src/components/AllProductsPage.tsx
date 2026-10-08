import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/products';

interface AllProductsPageProps {
  products: Product[];
  selectedCategorySlug?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const AllProductsPage: React.FC<AllProductsPageProps> = ({
  products,
  selectedCategorySlug,
  onSelectProduct,
  onAddToCart,
  onSelectCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategorySlug || 'all'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(45000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if prop changed
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setSelectedCategory(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== 'all') {
          const matchCat = CATEGORIES.find((c) => c.slug === selectedCategory);
          if (matchCat && product.category !== matchCat.name) {
            return false;
          }
        }
        if (inStockOnly && !product.inStock) {
          return false;
        }
        if (product.currentPrice > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.currentPrice - b.currentPrice;
        if (sortBy === 'price-desc') return b.currentPrice - a.currentPrice;
        if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [products, selectedCategory, inStockOnly, maxPrice, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === selectedCategory);

  return (
    <div className="bg-[#f5f6f9] py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title & Breadcrumb */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : 'All Products & Gadgets'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredProducts.length} authentic tech items with official warranty
            </p>
          </div>

          {/* Sort bar & Mobile filter button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-lg shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-slate-900 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-900" />
                  Filter Products
                </span>
                {(selectedCategory !== 'all' || inStockOnly || maxPrice < 45000) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setInStockOnly(false);
                      setMaxPrice(45000);
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-blue-900 text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Categories</span>
                    <span>{products.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => {
                    const count = products.filter((p) => p.category === cat.name).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                          selectedCategory === cat.slug
                            ? 'bg-blue-900 text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[11px] opacity-70 shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Max Price:</span>
                  <span className="text-blue-900 tabular-nums font-black">
                    ৳ {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="45000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-900 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>৳ 1,000</span>
                  <span>৳ 45,000</span>
                </div>
              </div>

              {/* In Stock Only Checkbox */}
              <div className="border-t border-slate-100 pt-4">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-slate-300 text-blue-900 focus:ring-blue-900 w-4 h-4"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <p className="text-base font-bold text-slate-800">No products match your filter.</p>
                <p className="text-xs text-slate-500">Try adjusting your price range or category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setInStockOnly(false);
                    setMaxPrice(45000);
                  }}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full p-6 shadow-xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-bold text-slate-900">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Categories</h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMobileFilterOpen(false);
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold ${
                    selectedCategory === 'all' ? 'bg-blue-900 text-white' : 'text-slate-700'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.slug);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold ${
                      selectedCategory === c.slug ? 'bg-blue-900 text-white' : 'text-slate-700'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Max Price:</span>
                <span className="text-blue-900">৳ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="45000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-900"
              />
            </div>

            <div className="border-t pt-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
