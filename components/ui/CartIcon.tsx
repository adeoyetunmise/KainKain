"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const CartIcon = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  
  // Calculate total number of items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // If cart is empty, render without Link
  if (totalItems === 0) {
    return (
      <div className="relative cursor-pointer">
        <ShoppingCart />
      </div>
    );
  }

  // If cart has items, render with Link to checkout
  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCart />
      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {totalItems > 99 ? '99+' : totalItems}
      </span>
    </Link>
  );
};

export default CartIcon;