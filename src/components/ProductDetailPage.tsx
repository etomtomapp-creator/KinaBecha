import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ShoppingBag,
  Zap,
  Share2,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'warranty' | 'reviews'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Find related products in same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="bg-[#f5f6f9] py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb & Back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              <span className="hidden sm:inline">Wishlist</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Primary Purchase Module Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Product Visuals / Gallery */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-square max-w-md bg-white rounded-xl border border-slate-100 p-6 flex items-center justify-center relative shadow-inner">
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-xs">
                  {product.discountPercentage}% OFF
                </div>
              )}
              <ProductVisual
                imageType={product.imageType}
                name={product.name}
                className="w-full h-full max-h-80"
              />
            </div>

            {/* Quality assurance tags */}
            <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Authenticity</p>
                <p className="text-xs font-bold text-slate-900">100% Genuine</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Warranty</p>
                <p className="text-xs font-bold text-slate-900">{product.warranty}</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Return Policy</p>
                <p className="text-xs font-bold text-slate-900">7 Days Return</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category & Brand Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-bold text-blue-900 uppercase tracking-wider">{product.brand}</span>
                <span>·</span>
                <span>{product.category}</span>
                <span>·</span>
                <span className="text-slate-600">{product.subcategory}</span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating & Stock Status */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
                </div>

                <div className="h-4 w-px bg-slate-200" />

                <div>
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock ({product.stockLeft ? `${product.stockLeft} units left` : 'Ready to Ship'})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing Box */}
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-blue-900 tabular-nums">
                    ৳ {product.currentPrice.toLocaleString()}
                  </span>
                  {product.oldPrice > product.currentPrice && (
                    <span className="text-base text-slate-400 line-through tabular-nums">
                      ৳ {product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                      Save ৳{product.saveAmount.toLocaleString()} ({product.discountPercentage}%)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes. Free delivery on orders over ৳ 50,000.
                </p>
              </div>

              {/* Short summary features */}
              <div className="mt-4 space-y-1.5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Highlights:</p>
                <ul className="text-xs text-slate-600 space-y-1">
                  {product.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Stepper & CTAs */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-slate-900 min-w-8 text-center tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-slate-500">
                    Total: <strong className="text-blue-900 font-bold">৳ {(product.currentPrice * quantity).toLocaleString()}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : product.inStock
                        ? 'bg-blue-900 hover:bg-blue-800 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onBuyNow(product, quantity)}
                    disabled={!product.inStock}
                    className="py-3 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now (Express)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Info Box */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Inside Dhaka (৳ 60)</p>
                  <p className="text-[11px] text-slate-500">Delivered within 24–48 Hours</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Outside Dhaka (৳ 120)</p>
                  <p className="text-[11px] text-slate-500">2–4 business days via Courier</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'specs'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'warranty'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Warranty & Delivery Terms
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 px-6 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'reviews'
                  ? 'border-blue-900 text-blue-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">Overview</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-3">Key Features & Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                      >
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4">Detailed Specifications</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs ${
                        idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                      }`}
                    >
                      <span className="font-bold text-slate-700 sm:col-span-1">{key}</span>
                      <span className="text-slate-600 sm:col-span-2 mt-1 sm:mt-0">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 text-xs text-slate-600">
                <h3 className="text-base font-bold text-slate-900">Official Warranty & Return Policy</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="font-bold text-blue-900 mb-1">KinaBecha Official Protection</p>
                  <p>
                    All items sold by KinaBecha come with an official manufacturer warranty. In case of manufacturing defects within 7 days, you are eligible for an immediate replacement.
                  </p>
                </div>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Warranty Coverage:</strong> {product.warranty}</li>
                  <li><strong>Verification:</strong> Original box and invoice required for warranty claims.</li>
                  <li><strong>Delivery Times:</strong> Dhaka within 24–48 hours, outside Dhaka within 2–4 business days via trusted couriers (Steadfast / RedX / Pathao).</li>
                  <li><strong>Cash on Delivery:</strong> Available throughout all 64 districts in Bangladesh.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Customer Feedback</h3>
                    <p className="text-xs text-slate-500">Based on verified purchases across Bangladesh</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-500 tabular-nums">{product.rating}</span>
                    <span className="text-xs text-slate-400"> / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">Tanvir Ahmed</span>
                      <span className="text-[11px] text-slate-400">Dhaka · Verified Purchase</span>
                    </div>
                    <div className="flex text-amber-400 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      100% genuine product as described. Delivery was completed in less than 24 hours in Dhanmondi. Extremely satisfied with KinaBecha service!
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">Sabbir Hossain</span>
                      <span className="text-[11px] text-slate-400">Chittagong · Verified Purchase</span>
                    </div>
                    <div className="flex text-amber-400 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Solid build quality and great performance. Packaging was bubble wrapped securely. Highly recommended seller.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Similar Products in {product.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelect={onSelectProduct}
                  onAddToCart={(p, q) => onAddToCart(p, q || 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
