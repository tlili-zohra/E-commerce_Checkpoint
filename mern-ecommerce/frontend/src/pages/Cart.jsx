import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  if (cartItems.length === 0) return <p>Your cart is empty</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Your Shopping Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}
        >
          <h4>{item.name}</h4>
          <p>${item.price}</p>
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateQty(item._id, Number(e.target.value))}
            style={{ width: "50px" }}
          />
          <button
            onClick={() => removeFromCart(item._id)}
            style={{ marginLeft: "1rem" }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Cart;
