"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PaystackButton } from "react-paystack";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Paystack configuration
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_your_public_key_here";
  const amount = getTotalPrice() * 100; // Paystack expects amount in kobo (multiply by 100)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Paystack component props
  const paystackProps = {
    email: customerInfo.email,
    amount,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "name",
          value: customerInfo.name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: customerInfo.phone,
        },
        {
          display_name: "Address",
          variable_name: "address",
          value: customerInfo.address,
        },
        {
          display_name: "City",
          variable_name: "city",
          value: customerInfo.city,
        },
        {
          display_name: "State",
          variable_name: "state",
          value: customerInfo.state,
        },
        {
          display_name: "Cart Items",
          variable_name: "cartItems",
          value: JSON.stringify(cartItems),
        },
      ],
    },
    publicKey,
    text: "Place Order & Pay",
    onSuccess: (reference: any) => {
      // Handle successful payment
      console.log("Payment successful:", reference);
      alert("Payment successful! Your order has been placed.");
      
      // Clear cart after successful payment
      clearCart();
      
      // You can redirect to a success page or handle the order completion here
      // router.push("/order-success");
    },
    onClose: () => {
      alert("Payment cancelled. Your items are still in your cart.");
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation - check if all required fields are filled
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address || !customerInfo.city || !customerInfo.state) {
      alert("Please fill in all required fields before proceeding to payment.");
      return;
    }
    // The form is valid, the PaystackButton will handle the payment
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="btn bg-[#dcb094] text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece8e5] pt-28 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-[#ece8e5] rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            
            <div className="">
              {cartItems.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 pb-4">
                  <div className="relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    {/* Quantity badge on top-right corner */}
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600">
                      ₦{new Intl.NumberFormat("en-NG").format(parseFloat(item.price))}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">
                      ₦{new Intl.NumberFormat("en-NG").format(parseFloat(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>₦{new Intl.NumberFormat("en-NG").format(getTotalPrice())}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="bg-[#ece8e5] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#dcb094]"
                  />
                </div>
              </div>

              {/* Paystack Payment Button */}
              <div className="pt-4">
                {customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address && customerInfo.city && customerInfo.state ? (
                  <PaystackButton 
                    {...paystackProps} 
                    className="w-full btn bg-[#dcb094] text-white py-3 rounded-md hover:bg-[#c9a082] transition-colors"
                  />
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full btn bg-gray-400 text-white py-3 rounded-md cursor-not-allowed"
                  >
                    Fill all fields to proceed
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
