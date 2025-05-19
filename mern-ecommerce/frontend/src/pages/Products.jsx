// src/pages/Products.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem",
              padding: "1rem",
              width: "200px",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>
              <strong>${product.price}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
