import { create } from "zustand";
import { persist } from "zustand/middleware";

// Zustand store for managing cart state
interface CartState {
    cartItems: { slug: string; title: string; price: string; img: string; quantity: number }[];
    updateQuantity: (slug: string, quantity: number) => void;
    removeFromCart: (slug: string) => void;
    getTotalPrice: () => number;
    addToCart: (product: { slug: string; title: string; price: string; img: string }) => void;
    clearCart: () => void;
  }

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
    cartItems: [],

    addToCart: (product) => set((state) => {
        const existingProduct = state.cartItems.find((item) => item.slug === product.slug);
   
        if (existingProduct) {
            return {
                cartItems: state.cartItems.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item)
            }
        } else {
            return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] }
        }
    }),

    updateQuantity: (slug, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) => 
            item.slug === slug ? { ...item, quantity } : item
        )
    })),

    removeFromCart: (slug) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.slug !== slug)
    })),

    getTotalPrice: () => {
        const state = get();
        return state.cartItems.reduce((total, item) => 
            total + (parseFloat(item.price) * item.quantity), 0
        );
    },

    clearCart: () => set(() => ({
        cartItems: []
    }))
    }),
    {
      name: 'cart-storage', // unique name for the storage key
      // You can optionally specify which storage to use (localStorage is default)
      // storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead
    }
  )
)