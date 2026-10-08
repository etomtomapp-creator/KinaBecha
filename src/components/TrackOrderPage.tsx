import React, { useState } from 'react';
import { Search, CheckCircle, Package, Truck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface TrackOrderPageProps {
  initialOrderId?: string;
  orders: Order[];
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  initialOrderId = '',
  orders,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    if (initialOrderId) {
      return orders.find((o) => o.id.toLowerCase() === initialOrderId.toLowerCase()) || null;
    }
    return orders.length > 0 ? orders[0] : null;
  });
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === q ||
        o.customerPhone.replace(/[^0-9]/g, '') === q.replace(/[^0-9]/g, '')
    );

    if (found) {
      setActiveOrder(found);
    } else {
      // Create a mock lookup for sample user inquiry if not in state
      if (q.startsWith('kb-') || q.length >= 4) {
        setActiveOrder({
          id: searchQuery.toUpperCase(),
          items: [],
          subtotal: 1450,
          deliveryCharge: 60,
          total: 1510,
          customerName: 'Valued Customer',
          customerPhone: '01712-345678',
          customerAddress: 'Mirpur, Dhaka',
          city: 'Dhaka',
          paymentMethod: 'cod',
          status: 'shipped',
          createdAt: '07 Oct 2026',
          estimatedDelivery: 'Within 24 Hours',
        });
      } else {
        setActiveOrder(null);
      }
    }
  };

  const stages = [
    { label: 'Order Placed', desc: 'Received in system', done: true },
    { label: 'Verified & Confirmed', desc: 'Call center verification', done: true },
    { label: 'Packed & Dispatched', desc: 'Quality check passed', done: true },
    { label: 'In Transit with Courier', desc: 'Assigned to delivery agent', done: activeOrder?.status === 'shipped' || activeOrder?.status === 'delivered' },
    { label: 'Delivered', desc: 'Package handed over', done: activeOrder?.status === 'delivered' },
  ];

  return (
    <div className="bg-[#f5f6f9] py-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            KinaBecha Dispatch Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Track Your Order Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Enter your Order ID (e.g. KB-10492) or Bangladeshi mobile number to check real-time courier dispatch progress.
          </p>
        </div>

        {/* Search input card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g., KB-48201) or Phone (017XXXXXXXX)..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:border-blue-700 focus:bg-white focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-sm"
            >
              Track Package
            </button>
          </form>
        </div>

        {/* Result Tracking Details */}
        {activeOrder ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in">
            {/* Order Header Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-blue-900">
                    Order {activeOrder.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 uppercase">
                    {activeOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Placed on {activeOrder.createdAt} · Courier Partner: Steadfast Express
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500">Estimated Delivery:</span>
                <p className="text-sm font-bold text-emerald-700">
                  {activeOrder.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-6">
                Shipment Milestones
              </h3>

              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 -z-0 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {stages.map((st, idx) => (
                    <div key={idx} className="flex md:flex-col items-center md:items-center gap-3 md:gap-2 text-left md:text-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                          st.done
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {st.done ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-xs font-bold ${
                            st.done ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {st.label}
                        </p>
                        <p className="text-[11px] text-slate-500">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Destination & Payment details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-1.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-900" />
                  Delivery Destination
                </p>
                <p className="text-slate-700 font-semibold">{activeOrder.customerName}</p>
                <p className="text-slate-600">{activeOrder.customerAddress}, {activeOrder.city}</p>
                <p className="text-slate-500">Contact: {activeOrder.customerPhone}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-1.5">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                  Payment Summary
                </p>
                <div className="flex justify-between text-slate-600">
                  <span>Method:</span>
                  <span className="font-bold uppercase text-slate-800">
                    {activeOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : activeOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount:</span>
                  <span className="font-extrabold text-blue-900">৳ {activeOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <span>৳ {activeOrder.deliveryCharge}</span>
                </div>
              </div>
            </div>
          </div>
        ) : searched ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Order Not Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't locate an active order matching "{searchQuery}". Please check the ID or contact our hotline at 01712-345678.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
