import React, { useState } from 'react';
import { Phone, Mail, Clock, Send, ShieldCheck, Check } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0b1329] text-slate-300 pt-12 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Column 1 & 2: About KinaBecha & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                KB
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Kina<span className="text-blue-400">Becha</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              KinaBecha is Bangladesh's premier destination for genuine electronics, YouTube studio gear, smart living devices, and clean renewable solar power equipment. We ensure authentic quality and nationwide express delivery.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Hotline: <strong className="text-white font-bold">01712-345678</strong> / 01800-000000
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Email: <strong className="text-white">info@kinabecha.com</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Business Hours: 10:00 AM – 11:00 PM (Daily)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('all-products')} className="hover:text-white transition-colors">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hot-deals')} className="hover:text-yellow-400 transition-colors">
                  Special Offers & Hot Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Customer Care
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-blue-400 font-semibold transition-colors">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Top Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('solar-green-energy')} className="hover:text-white transition-colors">
                  Solar & Green Energy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('youtube-studio-gears')} className="hover:text-white transition-colors">
                  YouTube Studio Gears
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('audio-headphones')} className="hover:text-white transition-colors">
                  Audio & Headphones
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('smart-gadgets')} className="hover:text-white transition-colors">
                  Smart Living & Watches
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('computer-office')} className="hover:text-white transition-colors">
                  Computer & Office Setup
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('mobile-accessories')} className="hover:text-white transition-colors">
                  Mobile Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Customer Service & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Newsletter & Deals
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to receive weekly flash sales, coupon codes, and new product announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe Now</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>• 7 Days Replacement Policy</p>
              <p>• 100% Cash on Delivery Supported</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Trade License, Payment Gateways */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 KinaBecha. All rights reserved. Trade License: TRAD/DNCC/019482/2026</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              The leading authentic electronics & renewable energy marketplace in Bangladesh.
            </p>
          </div>

          {/* Secure Payment icons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">We Accept:</span>
            <span className="px-2 py-1 bg-slate-800 text-pink-400 font-extrabold rounded text-[10px] border border-slate-700">
              bKash
            </span>
            <span className="px-2 py-1 bg-slate-800 text-orange-400 font-extrabold rounded text-[10px] border border-slate-700">
              Nagad
            </span>
            <span className="px-2 py-1 bg-slate-800 text-purple-400 font-extrabold rounded text-[10px] border border-slate-700">
              Rocket
            </span>
            <span className="px-2 py-1 bg-slate-800 text-blue-400 font-extrabold rounded text-[10px] border border-slate-700">
              VISA
            </span>
            <span className="px-2 py-1 bg-slate-800 text-amber-400 font-extrabold rounded text-[10px] border border-slate-700">
              Mastercard
            </span>
            <span className="px-2 py-1 bg-slate-800 text-emerald-400 font-extrabold rounded text-[10px] border border-slate-700">
              Cash on Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
