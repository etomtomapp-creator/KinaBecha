import React, { useState, useRef, useEffect } from 'react';
import { Menu, Flame, PhoneCall, ChevronDown, ChevronRight, X } from 'lucide-react';
import { PageView, Category } from '../types';
import { CATEGORIES } from '../data/products';

interface MainNavProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const MainNav: React.FC<MainNavProps> = ({
  currentPage,
  onNavigate,
  onSelectCategory,
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState<Category | null>(CATEGORIES[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="hidden md:block bg-[#1e3a8a] text-white border-b border-blue-900 select-none relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left: Shop by Category Dropdown Button */}
        <div ref={categoryMenuRef} className="relative">
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="flex items-center gap-2.5 px-5 py-3.5 bg-blue-950 hover:bg-slate-950 font-bold text-sm tracking-wide uppercase transition-colors rounded-t-sm"
          >
            <Menu className="w-4 h-4 text-white" />
            <span>Shop by Category</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mega-menu dropdown */}
          {isCategoryMenuOpen && (
            <div className="absolute left-0 top-full w-[650px] bg-white text-slate-800 rounded-b-xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Category primary list */}
              <div className="w-1/2 bg-slate-50 border-r border-slate-200 py-2">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryHover(cat)}
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer text-xs font-semibold transition-colors ${
                      activeCategoryHover?.id === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{cat.name}</span>
                      <span className={`text-[10px] font-normal ${activeCategoryHover?.id === cat.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {cat.bengaliName}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                ))}
              </div>

              {/* Subcategories detail pane */}
              <div className="w-1/2 p-5 bg-white flex flex-col justify-between">
                {activeCategoryHover && (
                  <div>
                    <div className="border-b border-slate-100 pb-2 mb-3">
                      <h4 className="text-sm font-bold text-blue-950">
                        {activeCategoryHover.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activeCategoryHover.description}
                      </p>
                    </div>

                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Popular Subcategories:
                    </p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {activeCategoryHover.subcategories.map((sub) => (
                        <div
                          key={sub}
                          onClick={() => {
                            onSelectCategory(activeCategoryHover.slug);
                            setIsCategoryMenuOpen(false);
                          }}
                          className="text-xs text-slate-600 hover:text-blue-700 hover:font-semibold py-1 px-2 rounded hover:bg-blue-50 cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <span>{sub}</span>
                          <span className="text-[10px] text-slate-400">→</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (activeCategoryHover) {
                      onSelectCategory(activeCategoryHover.slug);
                      setIsCategoryMenuOpen(false);
                    }
                  }}
                  className="mt-4 w-full py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 text-xs font-bold rounded-lg transition-colors text-center"
                >
                  View All {activeCategoryHover?.name} Products
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Centre Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-4 text-xs lg:text-sm font-semibold">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-3 transition-colors ${
              currentPage === 'home'
                ? 'text-white bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/40'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('hot-deals')}
            className={`px-3 py-3 flex items-center gap-1.5 transition-colors ${
              currentPage === 'hot-deals'
                ? 'text-yellow-300 bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-yellow-300 hover:text-yellow-200 hover:bg-blue-800/40'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400 animate-pulse fill-orange-400" />
            <span>Hot Deals</span>
          </button>

          <button
            onClick={() => onNavigate('all-products')}
            className={`px-3 py-3 transition-colors ${
              currentPage === 'all-products'
                ? 'text-white bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/40'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-3 transition-colors ${
              currentPage === 'about'
                ? 'text-white bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/40'
            }`}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`px-3 py-3 transition-colors ${
              currentPage === 'contact'
                ? 'text-white bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/40'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => onNavigate('track-order')}
            className={`px-3 py-3 transition-colors ${
              currentPage === 'track-order'
                ? 'text-white bg-blue-950/60 font-bold border-b-2 border-yellow-400'
                : 'text-blue-100 hover:text-white hover:bg-blue-800/40'
            }`}
          >
            Track Order
          </button>
        </div>

        {/* Right side: Direct Phone Assistance */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-blue-100">
          <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center text-yellow-300">
            <PhoneCall className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="block text-[10px] text-blue-200">Express Support</span>
            <span className="text-white font-bold tracking-tight">01712-345678</span>
          </div>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-blue-100 hover:text-white"
          title="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-950 border-t border-blue-900 p-4 space-y-2 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1 text-sm font-semibold">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('hot-deals');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-yellow-300 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              Hot Deals
            </button>
            <button
              onClick={() => {
                onNavigate('all-products');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-white"
            >
              All Products
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-white"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-white"
            >
              Contact
            </button>
            <button
              onClick={() => {
                onNavigate('track-order');
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded hover:bg-blue-900 text-white"
            >
              Track Order
            </button>
          </div>

          <div className="border-t border-blue-900 pt-3">
            <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">
              Browse Categories:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-1.5 px-2 bg-blue-900/60 rounded text-blue-100 hover:text-white"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
