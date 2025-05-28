'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
// import { useCartStore } from "@/store/cartStore";
import clsx from 'clsx';
import Search from './ui/Search';
import Language from './ui/Language';
import Cart from './ui/Cart';

// interface CartItem {
//   slug: string;
//   title: string;
//   price: string;
//   img: string;
//   quantity: number;
// }

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  // const cartItems = useCartStore((state: { cartItems: CartItem[] }) => state.cartItems);

  return (
    <nav
      className={clsx(
        'w-full px-5 sm:px-10 py-4 md:py-4 flex items-center justify-between z-50 transition-all duration-300 fixed top-0 left-0 bg-white',
        hovering ? 'bg-white shadow-md' : 'bg-transparent'
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className='flex items-center justify-between w-full max-w-7xl mx-auto'>
        {/* Logo - Left */}
        <Link href='/'>
          <Image
            src='/KainKainn.png'
            alt='Logo'
            width={100}
            height={35}
            priority
            className='w-[80px] sm:w-[100px] transition-all duration-300'
          />
        </Link>

        {/* NavLinks & Menu - Right */}
        <div className='flex items-center gap-6'>
          {/* Desktop NavLinks */}
          <div className='hidden md:flex'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link href='/' className='text-sm font-semibold'>
                  Home
                </Link>
              </li>
              <li>
                <details>
                  <summary className='text-sm font-semibold'>Shop Prints</summary>
                  <ul className='p-2 bg-white shadow-md'>
                    <li>
                      <Link href='/collections/hand-made' className='text-sm'>
                        Hand Made
                      </Link>
                    </li>
                    <li>
                      <Link href='/collections/print-art' className='text-sm'>
                        Print Arts
                      </Link>
                    </li>
                    <li>
                      <Link href='/collections' className='text-sm'>
                        Collection
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href='/Exhibition' className='text-sm font-semibold'>
                  Exhibition
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-sm font-semibold'>
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex items-center justify-end gap-3'>
          <div className='flex items-center justify-center md:gap-6'>
            <Search />
            <Language className='hidden md:flex' />
            <Cart />
          </div>
          {/* Mobile Menu Button */}
          <button
            className='md:hidden justify-end flex items-center text-black transition-colors duration-300'
            onClick={() => setMenuOpen(true)}
          >
            <Menu className='' />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer (Now slides in from the right) */}
      <div
        className={clsx(
          'fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 flex flex-col pt-20 px-6',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          className='absolute top-4 left-4 text-black cursor-pointer'
          onClick={() => setMenuOpen(false)}
        >
          <X className='h-6 w-6' />
        </button>

        {/* Mobile menu using DaisyUI menu structure */}
        <ul className='menu menu-vertical w-full'>
          <li>
            <Link
              href='/'
              className='text-sm sm:text-lg font-semibold'
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <details>
              <summary className='text-sm sm:text-lg font-semibold'>Shop Prints</summary>
              <ul className='p-2'>
                <li>
                  <Link
                    href='/collections/hand-made'
                    className='text-sm sm:text-base'
                    onClick={() => setMenuOpen(false)}
                  >
                    Hand Made
                  </Link>
                </li>
                <li>
                  <Link
                    href='/collections/print-art'
                    className='text-sm sm:text-base'
                    onClick={() => setMenuOpen(false)}
                  >
                    Print Arts
                  </Link>
                </li>
                <li>
                  <Link
                    href='/collections'
                    className='text-sm sm:text-base'
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
              href='/collections/exhibition'
              className='text-sm sm:text-lg font-semibold'
              onClick={() => setMenuOpen(false)}
            >
              Exhibition
            </Link>
          </li>
          <li>
            <Link
              href='/about'
              className='text-sm sm:text-lg font-semibold'
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
        </ul>

        {/* <div className="flex flex-col gap-4 mt-8">
          <Search />
          <Language />
          <Cart />
        </div> */}
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className='fixed inset-0 bg-black opacity-40 z-40'
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavBar;
