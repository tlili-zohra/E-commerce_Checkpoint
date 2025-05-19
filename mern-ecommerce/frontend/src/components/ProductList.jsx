// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../api/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = async (id) => {
    try {
      await addToCart(id, 1);
      alert("Added to cart");
    } catch {
      alert("Please login first");
    }
  };

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>{p.price} $</p>
          <button onClick={() => handleAddToCart(p._id)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}
