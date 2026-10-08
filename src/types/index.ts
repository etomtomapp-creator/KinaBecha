export interface Product {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  subcategory: string;
  brand: string;
  currentPrice: number;
  oldPrice: number;
  discountPercentage: number;
  saveAmount: number;
  inStock: boolean;
  stockLeft?: number;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  imageType: string;
  warranty: string;
  deliveryTime: string;
  isDealOfDay?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  bengaliName: string;
  slug: string;
  iconName: string;
  subcategories: string[];
  description: string;
  productCount: number;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  notes?: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export type PageView =
  | 'home'
  | 'product-detail'
  | 'category'
  | 'all-products'
  | 'hot-deals'
  | 'about'
  | 'contact'
  | 'track-order';
