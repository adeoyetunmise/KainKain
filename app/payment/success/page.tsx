"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const txnRef = searchParams.get('txnRef');
  const paymentRef = searchParams.get('paymentRef');

  useEffect(() => {
    // Clear cart on successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ece8e5]">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-2">Thank you for your order.</p>
        
        {txnRef && (
          <p className="text-sm text-gray-500 mb-2">
            Transaction Reference: <span className="font-mono text-xs">{txnRef}</span>
          </p>
        )}
        
        {paymentRef && (
          <p className="text-sm text-gray-500 mb-6">
            Payment Reference: <span className="font-mono text-xs">{paymentRef}</span>
          </p>
        )}
        
        <p className="text-gray-600 mb-8">
          We'll process your order shortly and send you a confirmation email.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/products" 
            className="block w-full bg-[#dcb094] text-white py-3 px-6 rounded-md hover:bg-[#c9a082] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}