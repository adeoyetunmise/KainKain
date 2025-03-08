"use client"
// import { useCartStore } from "@/store/cartStore";
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for the mobile menu

const NavBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-amber-50 shadow-sm sticky top-0 z-50 w-full px-5 sm:px-10 py-8 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center flex-shrink-0">
        <Link href="/">
          <Image src="/KainKainn.png" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-lg font-semibold text-gray-700">
        <Link href="/" className="hover:text-black">Home</Link>
        <Link href="/about" className="hover:text-black">About</Link>
        <Link href="/shop" className="hover:text-black">Shop Prints</Link>
      </div>

      {/* Cart Section */}
      // <div className="flex-1 flex justify-end">
      //   <div className="dropdown dropdown-end">
      //     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-black">
      //       <div className="indicator">
      //         <svg
      //           xmlns="http://www.w3.org/2000/svg"
      //           className="h-5 w-7 text-white"
      //           fill="none"
      //           viewBox="0 0 24 24"
      //           stroke="currentColor">
      //           <path
      //             strokeLinecap="round"
      //             strokeLinejoin="round"
      //             strokeWidth="2"
      //             d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      //           />
      //         </svg>
      //         {cartItems.length > 0 && (
      //           <span className="badge badge-sm bg-red-700 indicator-item">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
      //         )}
      //       </div>
      //     </div>
      //     <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow">
      //       <div className="card-body">
      //           <span className="text-lg font-bold">{cartItems.reduce((total, item) => total + item.quantity, 0)} Items</span>
      //           <span className="text-info">
      //           Subtotal: $
      //           {cartItems.reduce((total, item) => total + item.quantity * Number(item.price), 0).toFixed(2)}
      //           </span>
      //         <div className="card-actions">
      //           <button className="btn btn-primary btn-block">View cart</button>
      //         </div>
      //       </div>
      //     </div>
      {/* Cart & Mobile Menu Button */}
      <div className="flex items-center space-x-4">
        {/* Cart Section */}
        <div className="relative">
          <button className="bg-black p-2 rounded-full relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold lg:w-5 lg:h-5 w-3 h-3 flex items-center justify-center rounded-full">8</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-amber-50 shadow-md md:hidden flex flex-col items-center space-y-6 py-6 text-sm lg:text-lg font-semibold text-gray-700">
          <Link href="/" className="hover:text-black " onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-black" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/shop" className="hover:text-black" onClick={() => setMenuOpen(false)}>Shop Prints</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
