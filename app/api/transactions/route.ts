// app/api/transactions/route.ts
import Transaction from "@/lib/database/models/Transaction";
import { connectDB } from "@/lib/database/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { reference, amount, email, status, customerInfo, cartItems } = body;

    // Prevent duplicate saves
    const exists = await Transaction.findOne({ reference });
    if (exists) {
      return NextResponse.json({ success: false, message: "Transaction already exists" }, { status: 400 });
    }

    const transaction = await Transaction.create({
      reference,
      amount,
      email,
      status,
      customerInfo,
      cartItems,
    });

    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error saving transaction" }, { status: 500 });
  }
}
