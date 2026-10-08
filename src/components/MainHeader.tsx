import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ShoppingBag, X, Menu } from 'lucide-react';
import { Product, PageView } from '../types';
import { PRODUCTS } from '../data/products';

interface MainHeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onOpenGroupBuy: () => void;
  onOpenDropshop: () => void;
  onOpenBePartner: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageView) => void;
  onOpenMobileMenu?: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAccount,
  onOpenGroupBuy,
  onOpenDropshop,
  onOpenBePartner,
  onSelectProduct,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        searchRef.current && !searchRef.current.contains(target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(target)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* ======================================================== */}
      {/* 1. MOBILE HEADER (EXACT BDSHOP MOBILE SPECIFICATION)     */}
      {/* ======================================================== */}
      <div className="md:hidden px-3.5 pt-2.5 pb-2.5 space-y-2">
        {/* Row 1: Hamburger Menu (Left) - Logo (Center) - Account & Cart (Right) */}
        <div className="flex items-center justify-between">
          {/* Left: Hamburger menu icon */}
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 -ml-1 text-slate-800 hover:text-blue-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Open Category Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: KinaBecha logo (same style, but smaller) */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer flex items-center gap-1.5 select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black text-base shadow-xs">
              KB
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-blue-950 font-sans">
                Kina<span className="text-blue-600">Becha</span>
              </span>
            </div>
          </div>

          {/* Right: Account icon + Cart icon only (NO Group Buy/Dropshop/Partner on mobile header) */}
          <div className="flex items-center gap-1">
            <button
              onClick={onOpenAccount}
              className="p-2 text-slate-700 hover:text-blue-900 rounded-lg hover:bg-slate-100 transition-colors"
              title="Account"
            >
              <User className="w-5 h-5 text-slate-700" />
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 text-blue-900 relative rounded-lg hover:bg-blue-50 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Directly below logo row - Full-width rounded search bar */}
        <div ref={mobileSearchRef} className="relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search products..."
              className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white shadow-2xs transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-9 text-slate-400 hover:text-slate-600 p-1"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  onNavigate('all-products');
                  setIsSearchFocused(false);
                }
              }}
              className="absolute right-2 p-1.5 text-slate-500 hover:text-blue-900"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Dropdown for Mobile */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
              <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Matching Products ({searchResults.length})</span>
                <span className="text-blue-600 font-bold">Tap to view</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="p-2.5 hover:bg-blue-50/60 cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        ৳ {product.currentPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP HEADER (100% UNCHANGED DESIGN & SPACING)       */}
      {/* ======================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 py-3 items-center justify-between gap-4">
        {/* Left: Brand Wordmark "KinaBecha" */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer flex items-center gap-2 select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-extrabold text-xl shadow-sm transition-transform group-hover:scale-105">
            KB
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-blue-950 font-sans">
              Kina<span className="text-blue-600">Becha</span>
            </span>
            <span className="block text-[10px] text-slate-500 font-semibold tracking-wider uppercase -mt-1">
              Smart Tech & Solar
            </span>
          </div>
        </div>

        {/* Centre: Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for products, brands, or categories..."
              className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-12 text-slate-400 hover:text-slate-600 p-1"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  onNavigate('all-products');
                  setIsSearchFocused(false);
                }
              }}
              className="absolute right-1.5 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Autocomplete Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Matching Products ({searchResults.length})</span>
                <span className="text-blue-600">Press enter to view all</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-blue-50/60 cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0">
                      <span className="text-xs font-bold text-slate-600 uppercase">
                        {product.brand.slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {product.category} · {product.subcategory}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-blue-900 tabular-nums">
                        ৳ {product.currentPrice.toLocaleString()}
                      </p>
                      {product.oldPrice > product.currentPrice && (
                        <p className="text-xs text-slate-400 line-through tabular-nums">
                          ৳ {product.oldPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side buttons & actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Blue Group Buy */}
          <button
            onClick={onOpenGroupBuy}
            className="hidden xl:inline-flex items-center px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            Group Buy
          </button>

          {/* Dark blue Dropshop */}
          <button
            onClick={onOpenDropshop}
            className="hidden lg:inline-flex items-center px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            Dropshop
          </button>

          {/* Green Be Partner */}
          <button
            onClick={onOpenBePartner}
            className="hidden sm:inline-flex items-center px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            Be Partner
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Account Icon + Account text */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-blue-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="My Account"
          >
            <User className="w-5 h-5 text-slate-700" />
            <span className="hidden md:inline text-xs font-semibold">Account</span>
          </button>

          {/* Cart Icon + My Cart count & total */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-900 transition-colors relative"
            title="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-blue-900" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="block text-[10px] text-slate-500 font-medium">My Cart</span>
              <span className="text-xs font-bold text-blue-950 tabular-nums">
                ৳ {cartTotal.toLocaleString()}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
