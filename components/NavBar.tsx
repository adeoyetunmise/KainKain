"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import clsx from "clsx";

interface CartItem {
  slug: string;
  title: string;
  price: string;
  img: string;
  quantity: number;
}

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cartItems = useCartStore((state: { cartItems: CartItem[] }) => state.cartItems);

  return (
    <nav
      className={clsx(
        "w-full px-5 sm:px-10 py-6 md:py-8 lg:py-10 flex items-center justify-between z-50 transition-all duration-300",
        hovering ? "bg-white shadow-md" : "bg-transparent"
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Logo - Left */}
      <Link href="/">
        <Image
          src="/KainKainn.png"
          alt="Logo"
          width={100}
          height={35}
          priority
          className="w-[80px] sm:w-[100px] transition-all duration-300"
        />
      </Link>

      {/* NavLinks & Menu - Right */}
      <div className="flex items-center gap-6">
        {/* Desktop NavLinks */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-lg font-semibold text-black hover:text-black">
            Home
          </Link>
          <Link href="/about" className="text-lg font-semibold text-black hover:text-black">
            About
          </Link>
          <Link href="/products" className="text-lg font-semibold text-black hover:text-black">
            Shop Prints
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-black transition-colors duration-300"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      </div>

      {/* Mobile Navigation Drawer (Now slides in from the right) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 flex flex-col space-y-6 pt-20 px-6",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button className="absolute top-4 left-4 text-black" onClick={() => setMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>

        <Link href="/" className="text-sm  sm:text-lg font-semibold text-black hover:text-black" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link href="/about" className="text-sm sm:text-lg font-semibold text-black hover:text-black" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link href="/products" className="text-sm  sm:text-lg font-semibold text-black hover:text-black" onClick={() => setMenuOpen(false)}>
          Shop Prints
        </Link>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && <div className="fixed inset-0 bg-black opacity-40 z-40" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default NavBar;
