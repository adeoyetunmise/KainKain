"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";

const OrderSuccessPage = () => {
  const [, setOrderDetails] = useState({
    orderNumber: "",
    estimatedDelivery: "",
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    // Generate a random order number for display
    const generateOrderNumber = () => {
      return `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 5)
        .toUpperCase()}`;
    };

    // Calculate estimated delivery (5-7 business days)
    const getEstimatedDelivery = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 7); // Add 7 days
      return deliveryDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    setOrderDetails({
      orderNumber: generateOrderNumber(),
      estimatedDelivery: getEstimatedDelivery(),
      customerInfo: {
        name: "Customer", // You can get this from local storage or context
        email: "",
        phone: "",
        address: "",
      },
    });

    // Optional: Clear cart from localStorage if you're using it
    // localStorage.removeItem('cart');
  }, []);

  return (
    <div className="min-h-screen bg-smoke-white pt-28 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Order Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Order Number</h3>
                            <p className="text-lg font-mono bg-gray-50 p-2 rounded">
                                {orderDetails.orderNumber}
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-medium text-gray-700 mb-2">Estimated Delivery</h3>
                            <p className="text-lg text-green-600 font-medium">
                                {orderDetails.estimatedDelivery}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Status Timeline */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status</h2>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm font-medium text-green-600">Order Confirmed</p>
                            <p className="text-xs text-gray-500">Just now</p>
                        </div>

                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm font-medium text-yellow-600">Processing</p>
                            <p className="text-xs text-gray-500">1-2 days</p>
                        </div>

                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                <Truck className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">Shipped</p>
                            <p className="text-xs text-gray-500">3-5 days</p>
                        </div>

                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                                <CheckCircle className="w-6 h-6 text-gray-500" />
                            </div>
                            <p className="text-sm font-medium text-gray-500">Delivered</p>
                            <p className="text-xs text-gray-500">5-7 days</p>
                        </div>
                    </div>
                </div> */}

        {/* What's Next Section */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
                    
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-700">Order Confirmation Email</p>
                                <p className="text-sm text-gray-600">
                                    You'll receive an email confirmation with your order details shortly.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-700">Preparation & Processing</p>
                                <p className="text-sm text-gray-600">
                                    We'll carefully prepare your artwork for shipping within 1-2 business days.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <Truck className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-700">Shipping Updates</p>
                                <p className="text-sm text-gray-600">
                                    You'll receive tracking information once your order ships.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}

        {/* Customer Support */}
        {/* <div className="bg-[#dcb094]/10 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">Contact Us</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Have questions about your order?
                            </p>
                            <p className="text-sm">
                                📞 WhatsApp: <a href="tel:+2348036614674" className="text-blue-600 hover:underline">+234 803 661 4674</a>
                            </p>
                            <p className="text-sm">
                                ✉️ Email: <a href="mailto:themodalandexperience@gmail.com" className="text-blue-600 hover:underline">themodalandexperience@gmail.com</a>
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">Order Reference</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                Keep this reference number for your records:
                            </p>
                            <p className="text-sm font-mono bg-white p-2 rounded border">
                                {orderDetails.orderNumber}
                            </p>
                        </div>
                    </div>
                </div> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/products" className="bg-black">
            Continue Shopping
          </ButtonLink>

          <ButtonLink
            href="/"
            variant="ghost"
            className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Back to Home
          </ButtonLink>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            Thank you for supporting local art and choosing KainKain Collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
