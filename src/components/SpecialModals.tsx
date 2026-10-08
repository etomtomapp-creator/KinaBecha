import React, { useState } from 'react';
import { X, CheckCircle, Users, Box, Handshake, Lock, User, Mail, Phone } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroupBuyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3 text-blue-900">
          <Users className="w-6 h-6" />
          <h3 className="text-lg font-bold">KinaBecha Group Buy Program</h3>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Inquiry Submitted!</h4>
            <p className="text-xs text-slate-500">
              Our B2B bulk team will contact you within 4 hours with wholesale tier pricing.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            <p className="text-slate-600 leading-relaxed">
              Order tech hardware in groups or bulk (minimum 5 units) and save an extra <strong>15% to 30%</strong> on retail prices. Ideal for YouTube studios, offices, and solar contractors.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Group Name</label>
              <input required type="text" placeholder="e.g. Dhaka Studio Hub" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                <input required type="tel" placeholder="017XXXXXXXX" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Quantity</label>
                <input required type="number" min="5" placeholder="5 - 50 units" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Products Interested In</label>
              <input required type="text" placeholder="e.g. 1000W Inverters, BOYA Mics, Ring Lights" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
            </div>

            <button type="submit" className="w-full py-2.5 bg-blue-900 text-white font-bold rounded-xl shadow-xs hover:bg-blue-800 transition-colors">
              Request Group Buy Quote
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const DropshopModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3 text-slate-900">
          <Box className="w-6 h-6 text-blue-900" />
          <h3 className="text-lg font-bold">KinaBecha Dropshop Program</h3>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Application Received</h4>
            <p className="text-xs text-slate-500">
              Welcome aboard! Your Dropshop agent credentials will be sent via SMS/WhatsApp.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            <p className="text-slate-600 leading-relaxed">
              Start your own e-commerce business without holding any inventory. Sell KinaBecha’s authentic products to your customers with direct delivery and weekly profit payouts.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <input required type="text" placeholder="e.g. Asif Mahmud" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                <input required type="tel" placeholder="017XXXXXXXX" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facebook Page / Shop</label>
                <input type="text" placeholder="e.g. fb.com/myshop" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900" />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-xs hover:bg-slate-800 transition-colors">
              Apply for Dropshop Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const BePartnerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3 text-emerald-700">
          <Handshake className="w-6 h-6" />
          <h3 className="text-lg font-bold">Become a KinaBecha Supplier Partner</h3>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">Partner Application Received</h4>
            <p className="text-xs text-slate-500">
              Our merchant onboarding manager will verify your trade license and reach out.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4 text-xs"
          >
            <p className="text-slate-600 leading-relaxed">
              Are you an authorized importer, brand distributor, or solar manufacturer in Bangladesh? List your genuine products on KinaBecha and reach over 100,000 active tech buyers.
            </p>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Brand Name</label>
              <input required type="text" placeholder="e.g. Dhaka Electronics Ltd." className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-emerald-700" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                <input required type="text" placeholder="Your Name" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-emerald-700" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Hotline</label>
                <input required type="tel" placeholder="017XXXXXXXX" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-emerald-700" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category & Product Types</label>
              <input required type="text" placeholder="e.g. Solar inverters, cameras, audio" className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-emerald-700" />
            </div>

            <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors">
              Submit Partner Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const AccountModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {loggedIn ? 'Welcome Back!' : isLogin ? 'Sign In to KinaBecha' : 'Create an Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {loggedIn
              ? 'You are signed in as a verified member.'
              : 'Track orders, claim warranties, and manage wishlists.'}
          </p>
        </div>

        {loggedIn ? (
          <div className="text-center space-y-4">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
              Signed in as {emailOrPhone}
            </div>
            <button
              onClick={() => {
                setLoggedIn(false);
                onClose();
              }}
              className="w-full py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoggedIn(true);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mobile Number or Email
              </label>
              <input
                required
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="017XXXXXXXX or name@gmail.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-blue-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors"
            >
              {isLogin ? 'Sign In' : 'Register Account'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-blue-700 font-semibold hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Register now"
                  : 'Already registered? Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
