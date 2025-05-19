import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{ padding: "1rem", backgroundColor: "#333", color: "white" }}
    >
      <nav>
        <Link to="/" style={{ color: "white", marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/cart" style={{ color: "white", marginRight: "1rem" }}>
          Cart
        </Link>
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
