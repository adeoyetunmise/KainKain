"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Search from "./ui/Search";
import Language from "./ui/Language";
import { usePathname } from "next/navigation";
import CartIcon from "./ui/CartIcon";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [scroll, setScroll] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Determine if the current page should have dark text by default
  const isDarkTextPage = ["/about", "/collections", "/products", "/cart", "/checkout"].some((path) =>
    pathname.startsWith(path)
  );

  // Check if we're on the checkout page
  const isCheckoutPage = pathname === "/checkout";

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        detailsRef.current.open = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "w-full px-3 sm:px-6 py-4 md:py-4 flex items-center justify-between z-50 transition-all duration-300 fixed top-0 left-0",
        hovering || scroll
          ? "bg-smoke-white shadow-md text-black"
          : "bg-transparent",
        // Apply dark text by default on certain pages when not scrolled
        hovering || scroll
          ? "text-black"
          : isDarkTextPage
          ? "text-black"
          : "text-white"
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Image
              src="/KainKainn.png"
              alt="Logo"
              width={100}
              height={35}
              priority
              className="w-[80px] sm:w-[100px] transition-all duration-300"
            />
          </Link>

          {/* Desktop NavLinks - Hide on checkout page */}
          {!isCheckoutPage && (
            <ul className="hidden md:flex mt-4  menu menu-horizontal">
              <li>
                <Link href="/" className="text-lg">
                  Home
                </Link>
              </li>
              <li>
                <details ref={detailsRef}>
                  <summary className="text-lg ">Shop Prints</summary>
                  <ul className="p-2 bg-[#ece8e5] shadow-md text-black">
                    <li>
                      <Link href="/products" className="text-sm">
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/collections/hand-made" className="text-sm">
                        Hand Made
                      </Link>
                    </li>
                    <li>
                      <Link href="/collections/print-art" className="text-sm">
                        Print Arts
                      </Link>
                    </li>
                    <li>
                      <Link href="/collections" className="text-sm">
                        Collection
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link href="/about" className="text-lg">
                  About
                </Link>
              </li>
              <li>
                <Link href="/Exhibition" className="text-lg">
                  Exhibition
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center mt-4 justify-center gap-3 md:gap-6">
            <Search />
            <Cart />
            <Language className="hidden md:flex" />
            <Link
              href="/contact"
              className={clsx(
                "hidden md:block px-6 py-1 -mt-3 rounded-full font-medium text-lg transition-all duration-300",
                scroll || hovering
                  ? "bg-custom-black text-smoke-white"
                  : "text-custom-black bg-smoke-white"
              )}
            >
              Contact Us
            </Link>
            {/* Mobile Menu Button */}
            <button
              className={clsx(
                "md:hidden justify-end flex items-center transition-colors duration-300",
                !hovering && !scroll && !isDarkTextPage
                  ? "text-smoke-white"
                  : "text-custom-black"
              )}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer - Hide on checkout page */}
      {!isCheckoutPage && (
        <>
          <div
            className={clsx(
              "fixed top-0 right-0 h-full w-64 bg-smoke-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 flex flex-col pt-20 px-6",
              menuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <button
              className="absolute top-4 left-4 text-[#1a1a1a] cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Mobile menu using DaisyUI menu structure */}
            <ul className="menu menu-vertical w-full">
              <li>
                <Link
                  href="/"
                  className="text-sm sm:text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <details>
                  <summary className="text-sm sm:text-lg">
                    Shop Prints
                  </summary>
                  <ul className="p-2">
                    <li>
                      <Link
                        href="/products"
                        className="text-sm sm:text-base"
                        onClick={() => setMenuOpen(false)}
                      >
                        All Products
                      </Link>
                      <Link
                        href="/collections/hand-made"
                        className="text-sm sm:text-base"
                        onClick={() => setMenuOpen(false)}
                      >
                        Hand Made
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections/print-art"
                        className="text-sm sm:text-base"
                        onClick={() => setMenuOpen(false)}
                      >
                        Print Arts
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections"
                        className="text-sm sm:text-base"
                        onClick={() => setMenuOpen(false)}
                      >
                        collection
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  href="/collections/exhibition"
                  className="text-sm sm:text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Exhibition
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm sm:text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm sm:text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Overlay for mobile menu */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-[#1a1a1a] opacity-40 z-40"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-sm sm:text-lg">Shop Prints</summary>
              <ul className="p-2">
                <li>
                  <Link
                    href="/collections/hand-made"
                    className="text-sm sm:text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    Hand Made
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/print-art"
                    className="text-sm sm:text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    Print Arts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    className="text-sm sm:text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    collection
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link
              href="/collections/exhibition"
              className="text-sm sm:text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Exhibition
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm sm:text-lg"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm sm:text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#1a1a1a] opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
