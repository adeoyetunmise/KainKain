import { NextRequest, NextResponse } from 'next/server';

interface PaymentInitiateRequest {
  amount: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  cartItems: Array<{
    slug: string;
    title: string;
    price: string;
    quantity: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentInitiateRequest = await request.json();
    
    // Generate unique transaction reference
    const txnRef = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Convert amount to kobo (multiply by 100 for Nigerian currency)
    const amountInKobo = body.amount * 100;
    
    // Prepare payment request for Interswitch inline checkout
    const paymentData = {
      merchant_code: process.env.INTERSWITCH_MERCHANT_CODE,
      pay_item_id: process.env.INTERSWITCH_PAY_ITEM_ID,
      pay_item_name: "Online Purchase", // Required field
      txn_ref: txnRef,
      site_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      amount: amountInKobo.toString(), // Convert to string as required
      currency: "566", // Convert to string as required
      cust_name: body.customerInfo.name,
      cust_email: body.customerInfo.email,
      cust_id: body.customerInfo.email, // Use email as customer ID
      cust_mobile_no: body.customerInfo.phone,
      mode: process.env.INTERSWITCH_MODE || "TEST", // Ensure mode is set
      tokenise_card: "false", // Optional but good to specify
    };
    
    // TODO : Save transaction details to your database here if needed 
    // Here you could also save the transaction to your database
    // await saveTransactionToDatabase(txnRef, body);
    
    return NextResponse.json({
      success: true,
      paymentData,
      txnRef,
      message: 'Payment initialized successfully'
    });
    
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initialize payment' 
      },
      { status: 500 }
    );
  }
}