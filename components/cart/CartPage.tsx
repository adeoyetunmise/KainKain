"use client";

import { useCartStore } from "@/store/cartStore";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "../ui/ButtonLink";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } =
    useCartStore();

  const handleQuantityChange = (slug: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(slug, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-smoke-white">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <ButtonLink href="/products" className="bg-black text-white">
          Continue Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <section className="bg-smoke-white w-full pt-10 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20">
        {" "}
        {/* Match NavBar container structure */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl">Your cart</h2>
          <Link href="/products" className="underline text-2xl">
            Continue shopping
          </Link>
        </div>
        {/* Mobile headers - only PRODUCT and TOTAL */}
        <div className="flex md:hidden items-center justify-between my-4">
          <h3>PRODUCT</h3>
          <h3>TOTAL</h3>
        </div>
        {/* Desktop headers - hidden on mobile */}
        <div className="hidden md:flex items-center justify-between my-4">
          <h3>PRODUCT</h3>

          <div className="flex items-center gap-80">
            <h3>Quantity</h3>
            <h3>TOTAL</h3>
          </div>
        </div>
        <hr />
        <div>
          <div className="pt-10">
            {cartItems.map((item) => (
              <div key={item.slug} className="pb-4 mb-4">
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-start justify-between">
                    {/* Left side - Product info and quantity controls */}
                    <div className="flex items-start gap-4 flex-1">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={80}
                        height={80}
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>

                        {/* Quantity controls under title on mobile */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="inline-flex items-center border gap-2 p-1">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.slug,
                                  item.quantity - 1,
                                )
                              }
                              className="px-2 py-1 text-sm font-medium cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.slug,
                                  item.quantity + 1,
                                )
                              }
                              className="px-2 py-1 text-sm font-medium cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.slug)}
                            className="cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center gap-4">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={80}
                    height={80}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>

                  {/* quantity and price */}
                  <div className="flex gap-40">
                    <div>
                      <div className="inline-flex items-center border gap-4 p-1">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.slug, item.quantity - 1)
                          }
                          className="px-3 py-1 text-lg font-medium cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.slug, item.quantity + 1)
                          }
                          className="px-3 py-1 text-lg font-medium cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="cursor-pointer ml-4"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t">
              {/* Add Checkout Button in Cart */}

              <div className="mt-6 flex justify-end">
                <ButtonLink
                  href="/checkout"
                  className="py-4 w-full md:w-2xs bg-black text-white"
                >
                  Checkout
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
