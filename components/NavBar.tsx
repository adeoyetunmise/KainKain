import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar bg-amber-50 p-7 shadow-sm flex justify-between items-center sticky top-0 z-50 w-full">
      {/* Logo Section */}
      <div className="flex-1">
        <Link href="/">
          <Image src="/KainKainn.png" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex-1 flex justify-center space-x-8">
        <Link href="/" className="text-lg font-semibold text-gray-700 hover:text-black">
          Home
        </Link>
        <Link href="/about" className="text-lg font-semibold text-gray-700 hover:text-black">
          About
        </Link>
        <Link href="/shop" className="text-lg font-semibold text-gray-700 hover:text-black">
          Shop Prints
        </Link>
      </div>

      {/* Cart Section */}
      <div className="flex-1 flex justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle bg-black">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm bg-red-700 indicator-item">8</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
