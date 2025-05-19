import React, { useEffect, useState } from "react";
import { getOrders } from "../api/api";
//import { getOrders } from "../api"; // تأكد من مسار api.js الصحيح

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p>
            <b>Order ID:</b> {order._id}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
          <p>
            <b>Total Price:</b> ${order.totalPrice}
          </p>
          <p>
            <b>Items:</b>
          </p>
          <ul>
            {order.items.map((item) => (
              <li key={item.product._id}>
                {item.product.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p>
            <small>
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </small>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
