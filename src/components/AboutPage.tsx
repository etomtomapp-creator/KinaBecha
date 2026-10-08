import React from 'react';
import { ShieldCheck, Truck, Users, Award, Zap, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f5f6f9] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            About KinaBecha
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Democratizing Authentic Electronics & Clean Solar Energy in Bangladesh
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founded with a vision to deliver 100% authentic gadgets, studio gear, and green renewable solar solutions at fair, transparent prices across all 64 districts of Bangladesh.
          </p>
        </div>

        {/* 3 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Replica Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every single product in our catalog is sourced directly from verified authorized manufacturers. We enforce strict anti-counterfeit audits so you receive only genuine hardware.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Green Solar Innovation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We empower Bangladeshi households and businesses with durable Grade-A monocrystalline panels, MPPT hybrid inverters, and long-lasting 4000+ cycle LiFePO4 lithium batteries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dedicated Customer Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Dhaka-based support specialists are available daily from 10:00 AM to 11:00 PM to help you troubleshoot, recommend gear, and handle fast warranty claims.
            </p>
          </div>
        </div>

        {/* Milestones / Journey */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Our Growth Journey</h2>
            <p className="text-xs text-slate-500 mt-0.5">From a small tech hub in Dhaka to nationwide delivery</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-black text-blue-900">50,000+</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Orders Delivered</p>
              <p className="text-[11px] text-slate-500">Across 64 Districts</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-black text-emerald-600">100%</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Authentic Products</p>
              <p className="text-[11px] text-slate-500">Official Brand Warranties</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-black text-amber-500">2,500+</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Solar Setups Installed</p>
              <p className="text-[11px] text-slate-500">Clean Renewable Power</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-black text-indigo-600">4.8 / 5.0</p>
              <p className="text-xs font-semibold text-slate-700 mt-1">Customer Rating</p>
              <p className="text-[11px] text-slate-500">Over 12,000+ Reviews</p>
            </div>
          </div>
        </div>

        {/* Leadership & Standards */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl font-bold">Have Questions About Bulk Orders or Solar Engineering?</h3>
            <p className="text-xs text-slate-300">
              Speak with our senior product specialists. We provide free consultations for YouTube studio setups, commercial solar projects, and group buying discounts.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="tel:01712345678"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Call 01712-345678
            </a>
            <a
              href="mailto:info@kinabecha.com"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
