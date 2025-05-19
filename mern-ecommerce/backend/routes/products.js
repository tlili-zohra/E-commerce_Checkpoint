import express from "express";
import Product from "../models/Product.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get product by id
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Add product (admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Update product (admin only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete product (admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
