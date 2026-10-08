import React, { useState } from 'react';
import {
  X,
  ChevronDown,
  ChevronRight,
  Flame,
  Home,
  Grid,
  Info,
  Phone,
  PackageCheck,
  User,
  Users,
  Box,
  Handshake,
  ShieldCheck
} from 'lucide-react';
import { PageView, Category } from '../types';
import { CATEGORIES } from '../data/products';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onSelectCategory: (categorySlug: string) => void;
  onOpenAccount: () => void;
  onOpenGroupBuy: () => void;
  onOpenDropshop: () => void;
  onOpenBePartner: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onSelectCategory,
  onOpenAccount,
  onOpenGroupBuy,
  onOpenDropshop,
  onOpenBePartner,
}) => {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (catId: string) => {
    setExpandedCategoryId((prev) => (prev === catId ? null : catId));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-2xs transition-opacity"
      />

      {/* Slide-in drawer from left */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-[320px] max-w-full bg-white shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-4 bg-[#1e3a8a] text-white flex items-center justify-between">
            <div className="flex items-center gap-2 select-none">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-white flex items-center justify-center font-extrabold text-base">
                KB
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Kina<span className="text-yellow-400">Becha</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Account / Login Bar */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenAccount();
              }}
              className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-blue-900"
            >
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span>Sign In / My Account</span>
            </button>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
              Verified
            </span>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {/* Primary Site Navigation Links */}
            <div className="p-3 space-y-1 text-xs font-semibold">
              <button
                onClick={() => {
                  onNavigate('home');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'home'
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 text-slate-500" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('hot-deals');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'hot-deals'
                    ? 'bg-amber-50 text-amber-900 font-bold'
                    : 'text-amber-800 hover:bg-amber-50/50'
                }`}
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Hot Deals & Flash Sale</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('all-products');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'all-products'
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Grid className="w-4 h-4 text-slate-500" />
                <span>All Products</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('track-order');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'track-order'
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <PackageCheck className="w-4 h-4 text-blue-600" />
                <span>Track Order</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('about');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'about'
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Info className="w-4 h-4 text-slate-500" />
                <span>About Us</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('contact');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  currentPage === 'contact'
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Contact Customer Care</span>
              </button>
            </div>

            {/* Shop by Category Accordion */}
            <div className="p-3">
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
                Shop By Category
              </p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedCategoryId === cat.id;
                  return (
                    <div key={cat.id} className="rounded-xl overflow-hidden border border-slate-100">
                      <div
                        onClick={() => toggleCategory(cat.id)}
                        className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800"
                      >
                        <div className="flex flex-col">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {cat.bengaliName}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-blue-900" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      {isExpanded && (
                        <div className="bg-slate-50 p-2 border-t border-slate-100 space-y-1 text-xs">
                          <button
                            onClick={() => {
                              onSelectCategory(cat.slug);
                              onClose();
                            }}
                            className="w-full text-left py-1.5 px-3 rounded text-blue-900 font-bold hover:bg-white transition-colors"
                          >
                            View All in {cat.name} →
                          </button>
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                onSelectCategory(cat.slug);
                                onClose();
                              }}
                              className="w-full text-left py-1.5 px-3 rounded text-slate-600 hover:text-blue-900 hover:bg-white transition-colors"
                            >
                              • {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business & Partner Programs */}
            <div className="p-3 space-y-1 text-xs">
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 mb-2">
                Services & Programs
              </p>

              <button
                onClick={() => {
                  onClose();
                  onOpenGroupBuy();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 text-blue-900 font-bold transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Group Buy (Wholesale)</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  Save 25%
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenDropshop();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-bold transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Box className="w-4 h-4 text-slate-700" />
                  <span>Dropshop Reseller</span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                  Earn
                </span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBePartner();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-emerald-800 font-bold transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Handshake className="w-4 h-4 text-emerald-600" />
                  <span>Be Partner / Merchant</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Join
                </span>
              </button>
            </div>
          </div>

          {/* Footer of Drawer: Express hotline */}
          <div className="p-4 bg-slate-900 text-white text-xs space-y-1">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Customer Hotline:</span>
            </div>
            <p className="font-bold text-white text-sm">01712-345678</p>
            <p className="text-[10px] text-slate-400">10:00 AM – 11:00 PM Daily</p>
          </div>
        </div>
      </div>
    </div>
  );
};
