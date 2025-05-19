import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        margin: "1rem",
        width: "200px",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
