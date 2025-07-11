import { NextRequest, NextResponse } from 'next/server';

interface PaymentVerifyRequest {
  txnRef: string;
  paymentResponse: any;
  amount: number; // Add original amount for verification
}

interface InterswitchVerificationResponse {
  Amount: number;
  CardNumber: string;
  MerchantReference: string;
  PaymentReference: string;
  RetrievalReferenceNumber: string;
  SplitAccounts: any[];
  TransactionDate: string;
  ResponseCode: string;
  ResponseDescription: string;
  AccountNumber: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentVerifyRequest = await request.json();
    
    // Step 1: Verify payment with Interswitch server
    const verificationResult = await verifyPaymentWithInterswitch(
      body.txnRef, 
      body.amount
    );
    
    // Step 2: Check if verification was successful
    if (!verificationResult.success) {
      return NextResponse.json({
        success: false,
        message: verificationResult.message || 'Payment verification failed'
      }, { status: 400 });
    }
    
    // Step 3: Verify amounts match
    const interswitchAmount = verificationResult?.data?.Amount;
    const originalAmountInKobo = body.amount * 100;
    
    if (interswitchAmount !== originalAmountInKobo) {
      console.error('Amount mismatch:', {
        interswitchAmount,
        originalAmountInKobo,
        txnRef: body.txnRef
      });
      
      return NextResponse.json({
        success: false,
        message: 'Payment amount verification failed'
      }, { status: 400 });
    }
    
    // Step 4: Check response code for successful payment
    if (verificationResult?.data?.ResponseCode === '00') {
      // Payment is successful and verified
      
      // TODO: Update order status in database
      // await updateOrderStatus(body.txnRef, 'paid', verificationResult.data);
      
      // TODO: Send confirmation email
      // await sendOrderConfirmationEmail(body.txnRef);
      
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        txnRef: body.txnRef,
        paymentReference: verificationResult.data.PaymentReference,
        transactionDate: verificationResult.data.TransactionDate
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Payment failed: ${verificationResult?.data?.ResponseDescription}`
      }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to verify payment' 
      },
      { status: 500 }
    );
  }
}

async function verifyPaymentWithInterswitch(
  transactionReference: string, 
  amount: number
): Promise<{
  success: boolean;
  message?: string;
  data?: InterswitchVerificationResponse;
}> {
  try {
    const merchantCode = process.env.INTERSWITCH_MERCHANT_CODE || "MX250529";
    const amountInKobo = amount * 100;
    
    // Determine base URL based on environment
    const baseUrl = process.env.INTERSWITCH_MODE === 'LIVE' 
      ? 'https://webpay.interswitchng.com'
      : 'https://qa.interswitchng.com';
    
    const verificationUrl = `${baseUrl}/collections/api/v1/gettransaction.json?merchantcode=${merchantCode}&transactionreference=${transactionReference}&amount=${amountInKobo}`;
    
    const response = await fetch(verificationUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: InterswitchVerificationResponse = await response.json();
    
    return {
      success: true,
      data
    };
    
  } catch (error) {
    console.error('Interswitch verification error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Verification request failed'
    };
  }
}