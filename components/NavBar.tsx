"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu
import { useCartStore } from "@/store/cartStore";

interface CartItem {
  slug: string;
  title: string;
  price: string;
  img: string;
  quantity: number;
}

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useCartStore((state: { cartItems: CartItem[] }) => state.cartItems);

  return (
    <nav className="bg-amber-100 shadow-sm sticky top-0 z-50 w-full px-5 sm:px-10 py-6 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <Image src="/KainKainn.png" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-lg font-semibold text-gray-700">
        <Link href="/" className="hover:text-black border-b-2 border-transparent hover:border-amber-600 transition duration-300">
          Home
        </Link>
        <Link href="/about" className="hover:text-black border-b-2 border-transparent hover:border-amber-600 transition duration-300">
          About
        </Link>
        <Link href="/products" className="hover:text-black border-b-2 border-transparent hover:border-amber-600 transition duration-300">
          Shop Prints
        </Link>
      </div>

      {/* Cart & Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Cart Section */}
        <div className="relative">
          <button className="bg-black p-2 rounded-full relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-amber-100 shadow-md md:hidden flex flex-col items-center space-y-6 py-6 text-sm font-semibold text-gray-700 z-50">
          <Link href="/" className="hover:text-black border-b border-transparent hover:border-amber-600 transition duration-300" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="hover:text-black border-b border-transparent hover:border-amber-600 transition duration-300" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/products" className="hover:text-black border-b border-transparent hover:border-amber-600 transition duration-300" onClick={() => setMenuOpen(false)}>
            Shop Prints
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
