"use client";
import Script from "next/script";
declare global {
  interface Window {
    PaystackPop: any;
  }
}
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { PaystackButton } from "react-paystack";
import Toast from "../ui/Toast";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  // Toast state
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });

  // Ensure this only runs on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to show toast
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Paystack configuration
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const amount = getTotalPrice() * 100; // Paystack expects amount in kobo (multiply by 100)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Define the type for Paystack reference
  interface PaystackReference {
    reference: string;
    status: string;
    trans: string;
    transaction: string;
    message: string;
    redirecturl: string;
  }

  // Paystack component props
  const initializePayment = () => {
    const handler = window.PaystackPop.setup({
      key: publicKey,
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
        ],
      },

      callback: (response: PaystackReference) => {
        paystackProps.onSuccess(response);
      },

      onClose: () => {
        paystackProps.onClose();
      },
    });

    handler.openIframe();
  };

  const paystackProps = {
    publicKey,
    text: "Place Order & Pay",
    onSuccess: async (reference: PaystackReference) => {
      console.log("Payment successful:", reference);

      try {
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference: reference.reference,
            amount: getTotalPrice(),
            email: customerInfo.email,
            status: "success",
            customerInfo: {
              name: customerInfo.name,
              phone: customerInfo.phone,
              address: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
            },
            cartItems: cartItems.map((item) => ({
              slug: item.slug,
              title: item.title,
              img: item.img,
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("Transaction saved successfully:", result.transaction);
          showToast(
            "Payment successful! Your order has been placed and recorded.",
            "success",
          );
          clearCart();

          // Add a small delay before redirect to show the toast
          setTimeout(() => {
            router.push("/order-success");
          }, 2000);
        } else {
          console.error("Failed to save transaction:", result.message);
          showToast(
            "Payment successful! Your order has been placed.",
            "success",
          );
          clearCart();
        }
      } catch (error) {
        console.error("Error saving transaction:", error);
        showToast("Payment successful! Your order has been placed.", "success");
        clearCart();
      }
    },
    onClose: async () => {
      console.log("Payment modal closed or payment failed");

      try {
        const failedReference = `FAILED_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reference: failedReference,
            amount: getTotalPrice(),
            email: customerInfo.email,
            status: "failed",
            customerInfo: {
              name: customerInfo.name,
              phone: customerInfo.phone,
              address: customerInfo.address,
              city: customerInfo.city,
              state: customerInfo.state,
            },
            cartItems: cartItems.map((item) => ({
              slug: item.slug,
              title: item.title,
              img: item.img,
              price: item.price,
              quantity: item.quantity,
            })),
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log(
            "Failed transaction saved successfully:",
            result.transaction,
          );
        } else {
          console.error("Failed to save failed transaction:", result.message);
        }
      } catch (error) {
        console.error("Error saving failed transaction:", error);
      }

      showToast(
        "Payment was not completed. Your items are still in your cart.",
        "error",
      );
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.address ||
      !customerInfo.city ||
      !customerInfo.state
    ) {
      showToast(
        "Please fill in all required fields before proceeding to payment.",
        "warning",
      );
      return;
    }
  };

  // Show loading state while client-side hydration is happening
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#ece8e5] pt-28 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="loading loading-spinner loading-lg mb-4"></div>
              <p>Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="btn bg-black text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={5000}
      />

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
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information Form */}
            <div className="bg-[#ece8e5] rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black mb-1"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-1"
                  >
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
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-black mb-1"
                  >
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-black mb-1"
                    >
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
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-black mb-1"
                    >
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
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-black mb-1"
                  >
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

                <div className="pt-4">
                  {customerInfo.name &&
                  customerInfo.email &&
                  customerInfo.phone &&
                  customerInfo.address &&
                  customerInfo.city &&
                  customerInfo.state ? (
                    <button
                      type="button"
                      onClick={initializePayment}
                      className="w-full btn bg-black text-white py-3 rounded-md transition-colors"
                    >
                      Place Order & Pay
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full btn bg-gray-400 text-black py-3 rounded-md cursor-not-allowed"
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
    </>
  );
};

export default CheckoutPage;
