import React, { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden relative h-full select-none"
    >
      {/* Top Badges & Discount */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {product.discountPercentage > 0 ? (
          <span className="bg-gradient-to-r from-rose-600 to-red-500 text-white font-black text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
            {product.discountPercentage}% OFF
          </span>
        ) : product.isNew ? (
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-black text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
            NEW
          </span>
        ) : null}
      </div>

      {/* Stock status indicator badge */}
      <div className="absolute top-2 right-2 z-10">
        {product.inStock ? (
          product.stockLeft && product.stockLeft <= 5 ? (
            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
              {product.stockLeft} left
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
              In Stock
            </span>
          )
        ) : (
          <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Image Area on clean white background */}
      <div className="w-full h-32 sm:h-44 md:h-48 p-2.5 sm:p-4 bg-white flex items-center justify-center border-b border-slate-100 relative">
        <ProductVisual
          imageType={product.imageType}
          name={product.name}
          className="w-full h-full max-h-28 sm:max-h-36 md:max-h-40 transition-transform duration-200 group-hover:scale-102"
        />
      </div>

      {/* Product Information Body */}
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400 font-medium mb-1 truncate">
            <span className="text-slate-600 font-semibold">{product.brand}</span>
            <span>·</span>
            <span className="truncate">{product.subcategory}</span>
          </div>

          {/* Product Title (truncated to 2 lines) */}
          <h3
            className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-900 line-clamp-2 transition-colors min-h-[2rem] sm:min-h-[2.5rem] leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Pricing Block */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-black text-blue-900 tabular-nums">
              ৳ {product.currentPrice.toLocaleString()}
            </span>
            {product.oldPrice > product.currentPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through tabular-nums">
                ৳ {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          {product.saveAmount > 0 && (
            <div className="text-[10px] sm:text-[11px] font-bold text-emerald-700 mt-0.5">
              Save ৳{product.saveAmount.toLocaleString()}
            </div>
          )}

          {/* Solid Blue Add to Order Button */}
          <button
            onClick={handleAddClick}
            disabled={!product.inStock}
            className={`mt-2.5 sm:mt-3 w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : product.inStock
                ? 'bg-blue-900 hover:bg-blue-800 text-white active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : product.inStock ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Order</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
