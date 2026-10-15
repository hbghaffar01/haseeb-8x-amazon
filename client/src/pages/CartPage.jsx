import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Button } from "../components/ui/index.js";
import { formatPrice } from "../utils/format.js";
import { handleImageError } from "../utils/image.js";
import "./CartPage.css";

export function CartPage() {
  const { cart, updateItem, removeItem } = useCart();

  if (!cart.items.length) {
    return (
      <div className="container">
        <div className="cart-empty">
          <h1>Your Amazon Cart is empty</h1>
          <p>Browse the catalog and add items to get started.</p>
          <Link to="/">
            <Button>Continue shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart">
      <section className="cart-main">
        <h1>Shopping Cart</h1>
        <p className="cart-subhead">Price</p>

        {cart.items.map(({ product, quantity, lineTotal }) => (
          <div className="cart-line" key={product.id}>
            <Link to={`/product/${product.id}`} className="cart-line-img">
              <img
                src={product.image}
                alt={product.title}
                onError={handleImageError}
              />
            </Link>
            <div>
              <Link to={`/product/${product.id}`} className="cart-line-title">
                {product.title}
              </Link>
              <div className="cart-line-ctrl">
                <label>
                  Qty:{" "}
                  <select
                    value={quantity}
                    onChange={(e) =>
                      updateItem(product.id, Number(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <span>|</span>
                <Button variant="link" onClick={() => removeItem(product.id)}>
                  Delete
                </Button>
              </div>
            </div>
            <span className="cart-line-price">{formatPrice(lineTotal)}</span>
          </div>
        ))}
      </section>

      <aside className="cart-summary">
        <p className="cart-summary-count">
          Subtotal ({cart.count} item{cart.count !== 1 ? "s" : ""}):{" "}
          <b>{formatPrice(cart.subtotal)}</b>
        </p>
        <Button fullWidth>Proceed to checkout</Button>
      </aside>
    </div>
  );
}
