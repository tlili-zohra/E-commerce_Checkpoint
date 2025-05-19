import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/api";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      <h2>{product.name}</h2>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
