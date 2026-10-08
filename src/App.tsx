import React, { useState, useEffect } from 'react';
import { PageView, Product, CartItem, Order } from './types';
import { PRODUCTS } from './data/products';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { MainHeader } from './components/MainHeader';
import { MainNav } from './components/MainNav';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { FloatingSupport } from './components/FloatingSupport';
import { HeroCarousel } from './components/HeroCarousel';
import { SectionCarousel } from './components/SectionCarousel';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AllProductsPage } from './components/AllProductsPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartCheckout } from './components/CartCheckout';
import {
  GroupBuyModal,
  DropshopModal,
  BePartnerModal,
  AccountModal,
} from './components/SpecialModals';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [trackOrderId, setTrackOrderId] = useState<string>('');

  // Mobile menu drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinabecha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state with initial sample orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kinabecha_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'KB-89241',
        items: [
          { product: PRODUCTS[0], quantity: 1 },
          { product: PRODUCTS[6], quantity: 1 },
        ],
        subtotal: 23950,
        deliveryCharge: 60,
        total: 24010,
        customerName: 'Shakil Ahmed',
        customerPhone: '01712-345678',
        customerAddress: 'House 42, Road 11, Banani',
        city: 'Dhaka',
        paymentMethod: 'cod',
        status: 'shipped',
        createdAt: '07 Oct 2026',
        estimatedDelivery: 'Within 24 Hours',
      },
    ];
  });

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isGroupBuyOpen, setIsGroupBuyOpen] = useState(false);
  const [isDropshopOpen, setIsDropshopOpen] = useState(false);
  const [isBePartnerOpen, setIsBePartnerOpen] = useState(false);

  // Solar subcategory filter state for carousel
  const [solarSubcategory, setSolarSubcategory] = useState('All');
  // Studio subcategory filter state for carousel
  const [studioSubcategory, setStudioSubcategory] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem('kinabecha_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('kinabecha_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleOrderCompleted = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  // Navigation handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setCurrentPage('all-products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrackOrder = (orderId?: string) => {
    if (orderId) setTrackOrderId(orderId);
    setCurrentPage('track-order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.currentPrice * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Grouped products
  const solarProducts = PRODUCTS.filter((p) => p.category === 'Solar & Green Energy');
  const studioProducts = PRODUCTS.filter((p) => p.category === 'YouTube Studio Gears');
  const audioProducts = PRODUCTS.filter((p) => p.category === 'Audio & Headphones');
  const gadgetProducts = PRODUCTS.filter((p) => p.category === 'Smart Gadgets & Wearables');
  const computerProducts = PRODUCTS.filter((p) => p.category === 'Computer & Office');
  const dealProducts = PRODUCTS.filter((p) => p.isDealOfDay);
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f9] text-[#1e293b]">
      {/* 1. Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* 2. Main Header (Sticky on Mobile & Desktop) */}
      <MainHeader
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenGroupBuy={() => setIsGroupBuyOpen(true)}
        onOpenDropshop={() => setIsDropshopOpen(true)}
        onOpenBePartner={() => setIsBePartnerOpen(true)}
        onSelectProduct={handleSelectProduct}
        onNavigate={handleNavigate}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* 3. Solid Blue Main Navigation Bar (Desktop Only) */}
      <MainNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />

      {/* Mobile Slide-In Category & Navigation Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenGroupBuy={() => setIsGroupBuyOpen(true)}
        onOpenDropshop={() => setIsDropshopOpen(true)}
        onOpenBePartner={() => setIsBePartnerOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <div>
            {/* 4. Hero / Category Showcase (Mobile: 2-Column Grid | Desktop: Wide Carousel) */}
            <HeroCarousel onSelectCategory={handleSelectCategory} />

            {/* 5. Main Content Section: Solar & Green Energy */}
            <SectionCarousel
              title="Solar & green energy"
              subText="Products from solar & wind energy and its subcategories."
              products={solarProducts}
              subcategories={[
                'Solar Package',
                'Solar Inverters',
                'Lithium Batteries',
                'Solar Power Station',
                'Solar Panels',
              ]}
              activeSubcategory={solarSubcategory}
              onSelectSubcategory={setSolarSubcategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleSelectCategory('solar-green-energy')}
            />

            {/* Deals of the Day / Sale Hot */}
            <SectionCarousel
              title="Deals of the Day / Sale Hot"
              subText="Special flash discounts with up to 26% price slash and limited stock."
              products={dealProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleNavigate('hot-deals')}
            />

            {/* YouTube Studio & Streaming Gears */}
            <SectionCarousel
              title="YouTube Studio Gears"
              subText="Professional condenser microphones, ring lights, and streaming video capture cards."
              products={studioProducts}
              subcategories={['Microphones', 'Ring Lights', 'Gimbals & Stabilizers', 'Video Capture Cards']}
              activeSubcategory={studioSubcategory}
              onSelectSubcategory={setStudioSubcategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleSelectCategory('youtube-studio-gears')}
            />

            {/* Audio & Headphones */}
            <SectionCarousel
              title="Audio & Headphones"
              subText="Flagship noise cancellation headphones, TWS earbuds, and wooden bookshelf studio speakers."
              products={audioProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleSelectCategory('audio-headphones')}
            />

            {/* Smart Gadgets & Wearables */}
            <SectionCarousel
              title="Smart Gadgets & Wearables"
              subText="AMOLED smart fitness trackers, dual-band GPS watches, and 65W GaN fast chargers."
              products={gadgetProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleSelectCategory('smart-gadgets')}
            />

            {/* Best Sellers */}
            <SectionCarousel
              title="Best Sellers"
              subText="Top-rated customer favorites in Bangladesh with thousands of verified 5-star reviews."
              products={bestSellerProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleNavigate('all-products')}
            />

            {/* Computer & Office Setup */}
            <SectionCarousel
              title="Computer & Office Equipment"
              subText="Ergonomic performance mice, mechanical keyboards, multi-port USB-C hubs, and Wi-Fi 6 routers."
              products={computerProducts}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onSeeMore={() => handleSelectCategory('computer-office')}
            />
          </div>
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onBack={() => handleNavigate('home')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'all-products' && (
          <AllProductsPage
            products={PRODUCTS}
            selectedCategorySlug={selectedCategorySlug}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'hot-deals' && (
          <AllProductsPage
            products={PRODUCTS.filter((p) => p.discountPercentage >= 15 || p.isDealOfDay)}
            selectedCategorySlug="all"
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'track-order' && (
          <TrackOrderPage
            initialOrderId={trackOrderId}
            orders={orders}
          />
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Cart & Checkout Drawer */}
      <CartCheckout
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onOrderCompleted={handleOrderCompleted}
        onOpenTrackOrder={handleOpenTrackOrder}
      />

      {/* Promotional & Partner Modals */}
      <GroupBuyModal
        isOpen={isGroupBuyOpen}
        onClose={() => setIsGroupBuyOpen(false)}
      />
      <DropshopModal
        isOpen={isDropshopOpen}
        onClose={() => setIsDropshopOpen(false)}
      />
      <BePartnerModal
        isOpen={isBePartnerOpen}
        onClose={() => setIsBePartnerOpen(false)}
      />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* 5. Floating Blue Circular Chat/Support Button (Bottom-Right) */}
      <FloatingSupport onOpenTrackOrder={() => handleOpenTrackOrder()} />

      {/* 7. Dark Navy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
