import { create } from 'zustand';
// This file defines a Zustand store for managing a shopping cart in a React application.
// It allows adding items to the cart and keeps track of their quantities.
interface CartState {
  cartItems: { slug: string; title: string; price: string; img: string; quantity: number }[];
  addToCart: (product: { slug: string; title: string; price: string; img: string }) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cartItems.find((item) => item.slug === product.slug);

      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }
    }),

  removeFromCart: (slug) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.slug !== slug),
    })),

  updateQuantity: (slug, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      ),
    })),

  getTotalPrice: () => {
    const state = get();
    return state.cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  },

  clearCart: () => set({ cartItems: [] }),
}));
