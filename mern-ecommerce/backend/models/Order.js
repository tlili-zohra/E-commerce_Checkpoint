// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered, Cancelled
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
