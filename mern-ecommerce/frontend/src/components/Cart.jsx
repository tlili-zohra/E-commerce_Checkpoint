import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, placeOrder } from "../api/api";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    const res = await getCart();
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      // حدّث السلة من جديد بعد الحذف
      //fetchCart();
      loadCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    await placeOrder();
    alert("Order placed!");
    loadCart();
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      {cart.items.length === 0 && <p>Your cart is empty</p>}
      {cart.items.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
        >
          <h4>{item.product.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemove(item._id)}>Remove</button>
        </div>
      ))}
      {cart.items.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}
