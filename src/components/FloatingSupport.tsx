import React, { useState } from 'react';
import { MessageCircle, Phone, Clock, X, ExternalLink, ShieldCheck } from 'lucide-react';

interface FloatingSupportProps {
  onOpenTrackOrder: () => void;
}

export const FloatingSupport: React.FC<FloatingSupportProps> = ({ onOpenTrackOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">KinaBecha Support</h4>
                <p className="text-[10px] text-blue-200 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online (10 AM – 11 PM)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <p className="text-slate-600 leading-snug">
              Assalamu Walaikum! Need help choosing products, tracking dispatch, or claiming warranty?
            </p>

            <a
              href="tel:01712345678"
              className="flex items-center justify-between p-2.5 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-950 font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-700" />
                <span>Call Hotline</span>
              </div>
              <span className="text-[11px] text-blue-700 font-bold">01712-345678</span>
            </a>

            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-emerald-950 font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Live Chat</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenTrackOrder();
              }}
              className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-800 font-semibold transition-colors flex items-center justify-between"
            >
              <span>Track Existing Order</span>
              <span className="text-blue-700 text-[11px] font-bold">Look Up →</span>
            </button>
          </div>

          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>100% Genuine Tech Support · Bangladesh</span>
          </div>
        </div>
      )}

      {/* Blue Circular Support Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 relative"
        title="Chat / Customer Support"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
