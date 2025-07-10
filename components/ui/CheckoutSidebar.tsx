"use client";

import { useCartStore } from "@/store/cartStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonLink from "./ButtonLink";

interface CheckoutSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutSidebar = ({ isOpen, onClose }: CheckoutSidebarProps) => {
  const { cartItems, getTotalPrice } = useCartStore();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  // Don't render anything if sidebar is closed
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar with slide-in animation */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-smoke-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.slug} className="flex items-start gap-4 p-4 rounded-lg">
                <div className="relative">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  {/* Quantity badge */}
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-600 text-sm">
                    ₦{new Intl.NumberFormat("en-NG").format(parseFloat(item.price))}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ₦{new Intl.NumberFormat("en-NG").format(parseFloat(item.price) * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₦{new Intl.NumberFormat("en-NG").format(getTotalPrice())}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Taxes and discounts calculated at checkout
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <ButtonLink
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </ButtonLink>
            <ButtonLink
              onClick={onClose}
              className="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSidebar;