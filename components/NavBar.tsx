"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Search from "./ui/Search";
import Language from "./ui/Language";
import Cart from "./ui/Cart";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [scroll, setScroll] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Determine if the current page should have dark text by default
  // Add your page paths that should have dark text by default
  const isDarkTextPage = ["/about", "/collections", "/products"].some((path) =>
    pathname.startsWith(path)
  );

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
          ? "bg-[#faf9f6] shadow-md text-[#1a1a1a]"
          : "bg-transparent",
        // Apply dark text by default on certain pages when not scrolled
        !hovering && !scroll
          ? isDarkTextPage
            ? "text-[#1a1a1a]"
            : "text-[#faf9f6]"
          : ""
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex items-center justify-between w-full max-w-[96%] mx-auto">
        {/* Logo & NavLinks on the same line */}
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

          {/* Desktop NavLinks */}
          <ul className="hidden md:flex mt-4  menu menu-horizontal">
            <li>
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
            </li>
            <li>
              <details ref={detailsRef}>
                <summary className="text-lg font-semibold">Shop Prints</summary>
                <ul className="p-2 bg-[#faf9f6] shadow-md text-[#1a1a1a]">
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
              <Link href="/about" className="text-lg font-semibold">
                About
              </Link>
            </li>
            <li>
              <Link href="/Exhibition" className="text-lg font-semibold">
                Exhibition
              </Link>
            </li>
          </ul>
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
                  ? "bg-[#1a1a1a] text-[#faf9f6]"
                  : "bg-[#faf9f6] text-[#1a1a1a]"
              )}
            >
              Contact Us
            </Link>
          {/* Mobile Menu Button */}
          <button
            className={clsx(
              "md:hidden justify-end flex items-center transition-colors duration-300",
              !hovering && !scroll && !isDarkTextPage
                ? "text-[#faf9f6]"
                : "text-[#1a1a1a]"
            )}
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="cursor-pointer" />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer (Now slides in from the right) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-64 bg-[#faf9f6] shadow-lg transform transition-transform ease-in-out duration-300 z-50 flex flex-col pt-20 px-6",
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
              className="text-sm sm:text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <details>
              <summary className="text-sm sm:text-lg font-semibold">
                Shop Prints
              </summary>
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
              className="text-sm sm:text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Exhibition
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm sm:text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm sm:text-lg  font-semibold"
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
