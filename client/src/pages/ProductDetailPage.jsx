import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { catalogApi } from "../api/catalogApi.js";
import { withAsyncData } from "../hoc/withAsyncData.jsx";
import { useCart } from "../context/CartContext.jsx";
import { Button, Rating, Badge } from "../components/ui/index.js";
import { formatPrice } from "../utils/format.js";
import { handleImageError } from "../utils/image.js";
import "./ProductDetailPage.css";

/** Presentational product detail — data provided by the HOC. */
function ProductDetail({ data }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const product = data.data;

  const onAdd = async () => {
    await addItem(product.id, qty);
    navigate("/cart");
  };

  return (
    <div className="container">
      <Link to="/" className="pdp-back">
        ← Back to results
      </Link>
      <div className="pdp">
        <div className="pdp-img">
          <img
            src={product.image}
            alt={product.title}
            onError={handleImageError}
          />
        </div>

        <div className="pdp-info">
          <h1>{product.title}</h1>
          <Rating value={product.rating} reviews={product.reviews} showValue />
          <hr className="pdp-sep" />
          <p className="pdp-price">
            {formatPrice(product.price)}
            {product.oldPrice && <small>{formatPrice(product.oldPrice)}</small>}
          </p>
          {product.prime && <Badge tone="prime">Prime</Badge>}
          <hr className="pdp-sep" />
          <p className="pdp-desc">{product.description}</p>
        </div>

        <aside className="pdp-buy">
          <span className="pdp-buy-price">{formatPrice(product.price)}</span>
          {product.inStock ? (
            <span className="pdp-stock-in">In Stock</span>
          ) : (
            <span className="pdp-stock-out">Currently unavailable</span>
          )}

          <label className="pdp-qty">
            Qty:
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              disabled={!product.inStock}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <Button fullWidth disabled={!product.inStock} onClick={onAdd}>
            Add to Cart
          </Button>
          <Button
            variant="secondary"
            fullWidth
            disabled={!product.inStock}
            onClick={onAdd}
          >
            Buy Now
          </Button>
        </aside>
      </div>
    </div>
  );
}

const ProductDetailWithData = withAsyncData(ProductDetail, {
  fetcher: ({ id }) => catalogApi.getProduct(id),
  getDeps: ({ id }) => [id],
});

export function ProductDetailPage() {
  const { id } = useParams();
  return <ProductDetailWithData id={id} />;
}
