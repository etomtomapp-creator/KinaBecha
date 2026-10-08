import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Headphones,
  Award,
  Truck,
  ArrowRight,
  Zap,
  RotateCcw,
  PhoneCall
} from 'lucide-react';
import { HERO_SLIDES, CATEGORY_SHOWCASE_CARDS } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface HeroCarouselProps {
  onSelectCategory: (categorySlug: string) => void;
}

// BDSHOP-style quick circular categories
const BDSHOP_CIRCLE_CATEGORIES = [
  { name: 'সোলার', english: 'Solar', icon: '☀️', slug: 'solar-green-energy' },
  { name: 'স্টুডিও', english: 'Studio', icon: '🎙️', slug: 'youtube-studio-gears' },
  { name: 'হেডফোন', english: 'Audio', icon: '🎧', slug: 'audio-headphones' },
  { name: 'স্মার্টওয়াচ', english: 'Watches', icon: '⌚', slug: 'smart-gadgets' },
  { name: 'কম্পিউটার', english: 'PC & Office', icon: '💻', slug: 'computer-office' },
  { name: 'এক্সেসরিজ', english: 'Gadgets', icon: '⚡', slug: 'mobile-accessories' },
];

// BDSHOP-style 2-column featured cards with authentic product renders
const BDSHOP_MOBILE_FEATURED_CARDS = [
  {
    bengali: 'সোলার ও গ্রিন এনার্জি',
    english: 'Solar Inverters & Battery',
    discount: 'Up to 15% OFF',
    slug: 'solar-green-energy',
    imageType: 'inverter',
    badgeColor: 'bg-amber-500',
    tag: 'SOLAR'
  },
  {
    bengali: 'ইউটিউব স্টুডিও গিয়ার্স',
    english: 'Studio Mics & Ring Light',
    discount: 'Save Up to 26%',
    slug: 'youtube-studio-gears',
    imageType: 'studiomic',
    badgeColor: 'bg-rose-600',
    tag: 'STUDIO'
  },
  {
    bengali: 'ফ্ল্যাগশিপ অডিও সাউন্ড',
    english: 'Sony ANC & Earbuds',
    discount: 'Save ৳4,500',
    slug: 'audio-headphones',
    imageType: 'headphones',
    badgeColor: 'bg-blue-600',
    tag: 'AUDIO'
  },
  {
    bengali: 'স্মার্ট লাইফস্টাইল ওয়াচ',
    english: 'AMOLED GPS Smartwatch',
    discount: 'Top Rated',
    slug: 'smart-gadgets',
    imageType: 'smartwatch',
    badgeColor: 'bg-emerald-600',
    tag: 'SMART'
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectCategory }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  // Auto-advance slides gently
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      setMobileSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const activeMobileSlide = HERO_SLIDES[mobileSlideIndex];

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-4 pt-2.5 sm:pt-4 pb-4 sm:pb-6">
      {/* ======================================================== */}
      {/* 1. AUTHENTIC BDSHOP.COM MOBILE HOME HERO DESIGN         */}
      {/* ======================================================== */}
      <div className="md:hidden space-y-3.5">
        {/* A. BDSHOP Mobile Promotional Hero Banner Slider */}
        <div
          onClick={() => onSelectCategory(activeMobileSlide.categorySlug)}
          className="cursor-pointer relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-md border border-slate-800 p-4 min-h-[175px] flex flex-col justify-between select-none"
        >
          {/* Dynamic Background Gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${activeMobileSlide.accentColor} opacity-95 transition-all duration-700`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Banner Content */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="space-y-1 max-w-[65%]">
              <span className="inline-block px-2 py-0.5 bg-yellow-400 text-slate-950 font-black text-[10px] rounded-md font-bengali shadow-2xs">
                {activeMobileSlide.badgeBangla}
              </span>
              <h2 className="text-sm font-black text-white leading-tight font-bengali pt-0.5 line-clamp-2">
                {activeMobileSlide.title}
              </h2>
              <p className="text-[11px] text-blue-200 line-clamp-1 font-medium">
                {activeMobileSlide.badgeEnglish}
              </p>
            </div>

            {/* Visual Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg shrink-0">
              {mobileSlideIndex === 0 && '☀️'}
              {mobileSlideIndex === 1 && '🎙️'}
              {mobileSlideIndex === 2 && '🎧'}
              {mobileSlideIndex === 3 && '⌚'}
            </div>
          </div>

          {/* Bottom Banner Row: CTA + Slider Dots */}
          <div className="relative z-10 pt-2 flex items-center justify-between border-t border-white/10">
            <span className="inline-flex items-center gap-1 text-[11px] font-black text-yellow-300">
              <span>অর্ডার করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>

            {/* Slider Dots */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileSlideIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    mobileSlideIndex === idx ? 'w-4 bg-yellow-400' : 'w-1.5 bg-white/40'
                  }`}
                  title={`Banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* B. BDSHOP Iconic Circular Category Bubbles (Horizontal Scroll) */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              জনপ্রিয় ক্যাটাগরি
            </span>
            <span className="text-[10px] text-blue-700 font-bold">
              সব দেখুন →
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 px-0.5">
            {BDSHOP_CIRCLE_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onSelectCategory(cat.slug)}
                className="flex flex-col items-center gap-1 shrink-0 active:scale-95 transition-transform"
              >
                <div className="w-13 h-13 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 shadow-2xs flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-800 font-bengali">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* C. BDSHOP 2-Column Featured Hub Cards */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">
              টপ ফিচার্ড কালেকশন
            </span>
            <span className="text-[10px] text-slate-500">১০০% আসল প্রোডাক্ট</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {BDSHOP_MOBILE_FEATURED_CARDS.map((card, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategory(card.slug)}
                className="cursor-pointer rounded-2xl p-3 bg-white border border-slate-200 shadow-2xs hover:shadow-md flex flex-col justify-between aspect-[4/5] relative overflow-hidden active:scale-[0.98] transition-all"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black text-white px-1.5 py-0.5 rounded shadow-2xs ${card.badgeColor}`}>
                    {card.tag}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {card.discount}
                  </span>
                </div>

                {/* Product Visual Graphics Center */}
                <div className="w-full h-24 my-1 flex items-center justify-center">
                  <ProductVisual
                    imageType={card.imageType}
                    name={card.english}
                    className="w-full h-full max-h-20"
                  />
                </div>

                {/* Card Bottom Details */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <h3 className="text-xs font-black font-bengali text-slate-900 leading-snug truncate">
                    {card.bengali}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate">
                    {card.english}
                  </p>

                  <div className="pt-1">
                    <span className="w-full py-1.5 bg-[#1e3a8a] text-white text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 shadow-2xs">
                      <span>Shop Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* D. BDSHOP 4 Trust Pillars in 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-900 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-900 font-bengali truncate">২৪-৪৮ ঘণ্টার ডেলিভারি</p>
              <p className="text-[9px] text-slate-500">সারা বাংলাদেশে</p>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-900 font-bengali truncate">১০০% আসল প্রোডাক্ট</p>
              <p className="text-[9px] text-slate-500">ব্র্যান্ড ওয়ারেন্টি</p>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-900 font-bengali truncate">কাস্টমার কেয়ার</p>
              <p className="text-[9px] text-slate-500">১০ AM – ১১ PM</p>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-rose-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-900 font-bengali truncate">৭ দিনের রিপ্লেসমেন্ট</p>
              <p className="text-[9px] text-slate-500">সহজ রিটার্ন পলিসি</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP HERO VIEW (100% UNCHANGED WIDE CAROUSEL)     */}
      {/* ======================================================== */}
      <div className="hidden md:block">
        {/* Main Hero Slider Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 text-white min-h-[380px] lg:min-h-[420px] flex items-center">
          {/* Background Gradient & Architectural Texture */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentSlide.accentColor} transition-all duration-700`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full p-6 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Text Column */}
            <div className="max-w-xl space-y-4">
              {/* Bengali + English Trust Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-bold text-xs rounded-md shadow-xs flex items-center gap-1.5 font-bengali">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                  {currentSlide.badgeBangla}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-md border border-white/20">
                  {currentSlide.badgeEnglish}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* Highlighting bullet items */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentSlide.highlightPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-black/30 px-2.5 py-1 rounded-md border border-white/10"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onSelectCategory(currentSlide.categorySlug)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 hover:gap-3 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onSelectCategory(currentSlide.categorySlug)}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
                >
                  Explore Category
                </button>
              </div>
            </div>

            {/* Right Visual Graphical Showcase */}
            <div className="w-full md:w-80 lg:w-96 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-col items-center justify-center shadow-2xl group">
                <div className="absolute -top-3 -right-3 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md animate-bounce">
                  HOT DEAL
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-inner">
                    {currentSlideIndex === 0 && <span className="text-4xl">☀️</span>}
                    {currentSlideIndex === 1 && <span className="text-4xl">🎙️</span>}
                    {currentSlideIndex === 2 && <span className="text-4xl">🎧</span>}
                    {currentSlideIndex === 3 && <span className="text-4xl">⚡</span>}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Authentic Stock</p>
                    <p className="text-base font-bold text-white mt-0.5">{currentSlide.badgeEnglish}</p>
                    <p className="text-xs text-slate-300 mt-1">Official BD Warranty Included</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 rounded-full text-xs font-semibold">
                    ✓ Verified by KinaBecha
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Arrow Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-xs transition-all z-20"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-xs transition-all z-20"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlideIndex === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4 Feature Trust Pillars Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Express Delivery</p>
              <p className="text-[11px] text-slate-500">Dhaka in 24h & Nationwide</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Authentic</p>
              <p className="text-[11px] text-slate-500">Brand genuine products only</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Dedicated Support</p>
              <p className="text-[11px] text-slate-500">10:00 AM – 11:00 PM Daily</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Easy Replacement</p>
              <p className="text-[11px] text-slate-500">7 Days warranty claim</p>
            </div>
          </div>
        </div>

        {/* Category Showcase Cards Grid */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Explore Category Hubs
            </h3>
            <span className="text-xs text-slate-500">Curated high-grade electronics</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORY_SHOWCASE_CARDS.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => onSelectCategory(cat.categorySlug)}
                className="group cursor-pointer bg-white rounded-xl p-3.5 border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tight">
                    {cat.count}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1 mt-1">
                    {cat.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-bengali mt-0.5">
                    {cat.bengali}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-blue-700 group-hover:underline">
                    Explore
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
