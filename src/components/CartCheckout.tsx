import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  User
} from 'lucide-react';
import { CartItem, Product, Order } from '../types';
import { ProductVisual } from './ProductVisual';

interface CartCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderCompleted: (order: Order) => void;
  onOpenTrackOrder: (orderId: string) => void;
}

const BD_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Gazipur',
  'Narayanganj',
  'Bogura',
  'Cox’s Bazar',
  'Jessore',
];

export const CartCheckout: React.FC<CartCheckoutProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOrderCompleted,
  onOpenTrackOrder,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('Dhaka');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.currentPrice * item.quantity,
    0
  );
  const deliveryCharge = deliveryZone === 'dhaka' ? 60 : 120;
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryCharge : 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 11) {
      setFormError('Please enter a valid 11-digit Bangladeshi mobile number (e.g., 017XXXXXXXX).');
      return;
    }
    if (!customerAddress.trim()) {
      setFormError('Please enter your full delivery address.');
      return;
    }

    setFormError('');

    const newOrder: Order = {
      id: `KB-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cartItems],
      subtotal,
      deliveryCharge,
      total: grandTotal,
      customerName,
      customerPhone,
      customerAddress,
      city: selectedCity,
      notes,
      paymentMethod,
      status: 'processing',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      estimatedDelivery:
        deliveryZone === 'dhaka' ? 'Within 24–48 Hours' : 'Within 2–4 Business Days',
    };

    setConfirmedOrder(newOrder);
    onOrderCompleted(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold">
                {confirmedOrder
                  ? 'Order Confirmed!'
                  : isCheckingOut
                  ? 'Complete Checkout'
                  : `Your Cart (${cartItems.length})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {confirmedOrder ? (
              /* ORDER SUCCESS VIEW */
              <div className="text-center py-6 space-y-5 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Order Placed Successfully
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    Thank You, {confirmedOrder.customerName}!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your order has been recorded in our dispatch center.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-extrabold text-blue-900">{confirmedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Payable:</span>
                    <span className="font-bold text-slate-900">৳ {confirmedOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment:</span>
                    <span className="font-semibold uppercase text-slate-700">
                      {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : confirmedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Delivery:</span>
                    <span className="font-semibold text-emerald-700">{confirmedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination:</span>
                    <span className="text-slate-700 text-right truncate max-w-[200px]">
                      {confirmedOrder.customerAddress}, {confirmedOrder.city}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onOpenTrackOrder(confirmedOrder.id);
                      onClose();
                    }}
                    className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  >
                    Track This Order Now
                  </button>

                  <button
                    onClick={() => {
                      setConfirmedOrder(null);
                      setIsCheckingOut(false);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              /* CHECKOUT FORM VIEW */
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1 mb-2"
                >
                  ← Back to cart items
                </button>

                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                    {formError}
                  </div>
                )}

                {/* Customer Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    1. Delivery Information
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Tanvir Hossain"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number (Bangladeshi 01XXXXXXXXX) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="01712-345678"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Delivery Zone *
                      </label>
                      <select
                        value={deliveryZone}
                        onChange={(e) => setDeliveryZone(e.target.value as any)}
                        className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden bg-white"
                      >
                        <option value="dhaka">Inside Dhaka (৳ 60)</option>
                        <option value="outside">Outside Dhaka (৳ 120)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        District / City *
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden bg-white"
                      >
                        {BD_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address & Apartment / Thana *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <textarea
                        required
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="House no, Road no, Area, Thana"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special instructions for courier..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-700 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    2. Payment Method
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      className={`p-3 border rounded-xl flex flex-col cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-blue-900 bg-blue-50/60 text-blue-950 font-bold shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>Cash on Delivery</span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-blue-900"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Pay cash when product arrives
                      </span>
                    </label>

                    <label
                      className={`p-3 border rounded-xl flex flex-col cursor-pointer transition-all ${
                        paymentMethod === 'bkash'
                          ? 'border-rose-600 bg-rose-50/60 text-rose-950 font-bold shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>bKash Online</span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'bkash'}
                          onChange={() => setPaymentMethod('bkash')}
                          className="accent-rose-600"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Instant bKash payment gateway
                      </span>
                    </label>

                    <label
                      className={`p-3 border rounded-xl flex flex-col cursor-pointer transition-all ${
                        paymentMethod === 'nagad'
                          ? 'border-orange-600 bg-orange-50/60 text-orange-950 font-bold shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>Nagad</span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'nagad'}
                          onChange={() => setPaymentMethod('nagad')}
                          className="accent-orange-600"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Instant Nagad payment
                      </span>
                    </label>

                    <label
                      className={`p-3 border rounded-xl flex flex-col cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-blue-900 bg-blue-50/60 text-blue-950 font-bold shadow-2xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>Card / Bank</span>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-blue-900"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Visa, Mastercard, Amex
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Confirm Order (৳ {grandTotal.toLocaleString()})</span>
                </button>
              </form>
            ) : (
              /* CART ITEMS LIST VIEW */
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
                    <p className="text-xs text-slate-500">Explore authentic electronics and add items to order.</p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-lg"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-slate-100">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="py-3 flex gap-3 items-center">
                          <div className="w-16 h-16 rounded-lg bg-white border border-slate-200 p-1 shrink-0 flex items-center justify-center">
                            <ProductVisual
                              imageType={item.product.imageType}
                              name={item.product.name}
                              className="w-full h-full max-h-14"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              ৳ {item.product.currentPrice.toLocaleString()} each
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                  }
                                  className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold text-xs"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 py-0.5 text-xs font-bold text-slate-800 tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold text-xs"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-xs font-bold text-blue-900 tabular-nums">
                              ৳ {(item.product.currentPrice * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Zone Selector */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-blue-900" />
                          Delivery Zone:
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryZone('dhaka')}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                              deliveryZone === 'dhaka'
                                ? 'bg-blue-900 text-white'
                                : 'bg-white border text-slate-600'
                            }`}
                          >
                            Dhaka (৳60)
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryZone('outside')}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                              deliveryZone === 'outside'
                                ? 'bg-blue-900 text-white'
                                : 'bg-white border text-slate-600'
                            }`}
                          >
                            Outside (৳120)
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!confirmedOrder && !isCheckingOut && cartItems.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold tabular-nums">৳ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery Charge:</span>
                  <span className="font-semibold tabular-nums">৳ {deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-blue-950 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="tabular-nums">৳ {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
