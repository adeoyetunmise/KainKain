"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentData {
  merchant_code: string;
  pay_item_id: string;
  txn_ref: string;
  site_redirect_url: string;
  amount: number;
  currency: number;
  mode: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
}

declare global {
  interface Window {
    webpayCheckout?: (request: PaymentData & { onComplete: (response: any) => void }) => void;
  }
}

export const usePaymentService = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const initiatePayment = async (customerInfo: CustomerInfo, cartItems: any[]) => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // Step 1: Initialize payment via API
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getTotalPrice(),
          customerInfo,
          cartItems
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      // Step 2: Load Interswitch if not already loaded
      if (!window.webpayCheckout) {
        await loadInterswitchScript();
      }

      // Step 3: Trigger Interswitch payment
      const paymentRequest = {
        ...data.paymentData,
        onComplete: (paymentResponse: any) => handlePaymentComplete(paymentResponse, data.txnRef, getTotalPrice())
      };

      if (window.webpayCheckout) {
        window.webpayCheckout(paymentRequest);
      } else {
        throw new Error('Payment service not available. Please try again later.');
      }

    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentError(error instanceof Error ? error.message : 'Payment failed');
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentComplete = async (paymentResponse: any, txnRef: string, amount: number) => {
    try {
      // Step 4: Verify payment via API
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txnRef,
          paymentResponse,
          amount // Pass the original amount for verification
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        // Clear cart and redirect to success page
        clearCart();
        router.push(`/payment/success?txnRef=${txnRef}&paymentRef=${verifyData.paymentReference}`);
      } else {
        setPaymentError(verifyData.message || 'Payment verification failed. Please contact support.');
      }

    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentError('Payment verification failed. Please contact support.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const loadInterswitchScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.webpayCheckout) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      const checkoutUrl = process.env.NEXT_PUBLIC_INTERSWITCH_CHECKOUT_URL;
      
      if (!checkoutUrl) {
        return reject(new Error('Interswitch checkout URL is not defined'));
      }
      
      script.src = checkoutUrl;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load payment script'));
      
      document.head.appendChild(script);
    });
  };

  return {
    initiatePayment,
    isProcessingPayment,
    paymentError
  };
};