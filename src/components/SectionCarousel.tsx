import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface SectionCarouselProps {
  title: string;
  subText: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSeeMore?: () => void;
  subcategories?: string[];
  activeSubcategory?: string;
  onSelectSubcategory?: (sub: string) => void;
}

export const SectionCarousel: React.FC<SectionCarouselProps> = ({
  title,
  subText,
  products,
  onSelectProduct,
  onAddToCart,
  onSeeMore,
  subcategories,
  activeSubcategory,
  onSelectSubcategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const filteredProducts =
    activeSubcategory && activeSubcategory !== 'All'
      ? products.filter((p) => p.subcategory === activeSubcategory)
      : products;

  return (
    <section className="py-5 sm:py-8 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-4">
        {/* ======================================================== */}
        {/* 1. MOBILE SECTION HEADER (EXACT BDSHOP MOBILE SPEC)     */}
        {/* ======================================================== */}
        <div className="md:hidden mb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-2">
              {/* Left-aligned bold title */}
              <h2 className="text-base font-black text-slate-900 tracking-tight truncate">
                {title.startsWith('—') ? title.replace(/—/g, '').trim() : title}
              </h2>
              {/* Thin decorative line under title */}
              <div className="h-0.5 w-12 bg-blue-600 rounded mt-0.5" />
            </div>

            {/* Right-aligned blue See More link + compact arrows */}
            <div className="flex items-center gap-2 shrink-0">
              {onSeeMore && (
                <button
                  onClick={onSeeMore}
                  className="text-xs font-bold text-blue-700 flex items-center gap-0.5"
                >
                  <span>See More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center gap-1">
                <button
                  onClick={scrollLeft}
                  className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center shadow-2xs active:bg-slate-100"
                  title="Previous"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-700 flex items-center justify-center shadow-2xs active:bg-slate-100"
                  title="Next"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {subText && (
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
              {subText}
            </p>
          )}
        </div>

        {/* ======================================================== */}
        {/* 2. DESKTOP SECTION HEADER (100% UNCHANGED)              */}
        {/* ======================================================== */}
        <div className="hidden md:flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="hidden sm:inline-block w-8 h-0.5 bg-blue-600 rounded" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                — {title} —
              </h2>
              <span className="hidden sm:inline-block w-8 h-0.5 bg-blue-600 rounded" />
            </div>
            {subText && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {subText}
              </p>
            )}
          </div>

          {/* Right Action: See More and Scroll Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            {onSeeMore && (
              <button
                onClick={onSeeMore}
                className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span>See More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={scrollLeft}
                className="w-8 h-8 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="w-8 h-8 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategories Filter Pills (if provided) */}
        {subcategories && subcategories.length > 0 && onSelectSubcategory && (
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-1.5">
            <button
              onClick={() => onSelectSubcategory('All')}
              className={`px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSubcategory === 'All'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Items
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSelectSubcategory(sub)}
                className={`px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeSubcategory === sub
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Smooth Carousel */}
        {/* On mobile: shows ~2 cards at a time (w-[170px] on 375-430px viewports) */}
        {/* On desktop: w-[260px] sm:w-[280px] 100% as before */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar py-1.5 -mx-1 px-1 scroll-smooth snap-x snap-mandatory"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[170px] sm:w-[220px] md:w-[280px] shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
