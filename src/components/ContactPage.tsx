import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-[#f5f6f9] py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Contact KinaBecha Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Need help with your order, technical advice on solar inverters, or warranty claims? We are here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Phone Support & WhatsApp</h4>
                  <p className="text-xs text-blue-900 font-extrabold mt-0.5">01712-345678</p>
                  <p className="text-xs text-slate-600 mt-0.5">Alternative: 01800-000000</p>
                  <p className="text-[11px] text-slate-400 mt-1">Available 7 days a week</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Addresses</h4>
                  <p className="text-xs text-slate-800 font-semibold mt-0.5">info@kinabecha.com</p>
                  <p className="text-xs text-slate-600 mt-0.5">support@kinabecha.com</p>
                  <p className="text-[11px] text-slate-400 mt-1">Typical response within 2 hours</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Official Business Hours</h4>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">10:00 AM – 11:00 PM</p>
                  <p className="text-[11px] text-slate-500">Every day (Saturday to Friday)</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Central Fulfillment & Office</h4>
                  <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                    Level 5, Navana Tower, Gulshan-1 Circle / Motijheel Commercial Area, Dhaka 1212, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Graphical Visual */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-900" />
                Dhaka Hub Location
              </h4>
              <div className="w-full h-44 rounded-xl bg-slate-100 border border-slate-200 relative flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg animate-bounce mb-2">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="relative z-10 text-xs font-bold text-slate-900">
                  KinaBecha Central Dispatch
                </p>
                <p className="relative z-10 text-[11px] text-slate-500">
                  Gulshan-1 / Motijheel, Dhaka
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below and our customer support team will call or email you shortly.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700">
                    Thank you. A representative will contact you at your phone number ({phone}) shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mahfuz Rahman"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-900 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-900 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-900 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-900 focus:outline-hidden bg-white"
                      >
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Solar Project Consultation">Solar Project Consultation</option>
                        <option value="Order Tracking & Status">Order Tracking & Status</option>
                        <option value="Warranty Claim & Return">Warranty Claim & Return</option>
                        <option value="Wholesale / Group Buy">Wholesale / Group Buy</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please detail your question, required quantity, or order ID..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-900 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to KinaBecha</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
