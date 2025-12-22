// models/Transaction.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  reference: string;
  amount: number;
  email: string;
  status: 'success' | 'declined' | 'pending' | 'failed';
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  cartItems: Array<{
    slug: string;
    title: string;
    img: string;
    price: string;
    quantity: number;
  }>;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  reference: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  email: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['success', 'declined', 'pending', 'failed'],
    default: 'pending'
  },
  customerInfo: {
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    required: true
  },
  cartItems: [{
    slug: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
