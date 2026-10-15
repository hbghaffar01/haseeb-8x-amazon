import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { BRAND } from "../../constants/config.js";
import { SearchBox } from "./SearchBox.jsx";
import "./Header.css";

export function Header() {
  const { cart } = useCart();
  const [overlay, setOverlay] = useState(false);

  return (
    <>
      <header className="hdr">
        <div className="hdr-main">
          <Link to="/" className="hdr-logo">
            {BRAND.name}
            <span>.{BRAND.tagline}</span>
          </Link>

          <div className="hdr-deliver">
            <span>Deliver to</span>
            <b>📍 United States</b>
          </div>

          <SearchBox onOverlayChange={setOverlay} />

          <div className="hdr-right">
            <div className="hdr-chip hdr-chip-lang">
              <span>EN</span>
            </div>
            <Link to="/" className="hdr-chip">
              <span>Hello, sign in</span>
              <b>Account &amp; Lists</b>
            </Link>
            <Link to="/" className="hdr-chip">
              <span>Returns</span>
              <b>&amp; Orders</b>
            </Link>
            <Link to="/cart" className="hdr-cart" aria-label="Cart">
              <span className="hdr-cart-icon">🛒</span>
              <span className="hdr-cart-count">{cart.count}</span>
              <span className="hdr-cart-label">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Full-page dim overlay (like Amazon) shown when search is focused. */}
      <div
        className={`search-overlay ${overlay ? "is-visible" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
