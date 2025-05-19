import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken);

// Get user's cart
router.get("/", async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.product"
  );
  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
    await cart.save();
  }
  res.json(cart);
});

// Add item to cart
router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Update cart item quantity
router.put("/:itemId", async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
});

// Remove item from cart
// DELETE /api/cart/:itemId
// Remove item from cart
router.delete("/:itemId", async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.pull(req.params.itemId);
    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error("❌ Error in DELETE /cart/:itemId:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
