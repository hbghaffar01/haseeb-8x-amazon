import { Link } from "react-router-dom";
import { Card, Rating, Badge, Button } from "../ui/index.js";
import { useCart } from "../../context/CartContext.jsx";
import { formatPrice } from "../../utils/format.js";
import { handleImageError } from "../../utils/image.js";
import "./ProductCard.css";

export function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <Card hoverable padded={false}>
      <div className="pcard">
        <Link to={`/product/${product.id}`} className="pcard-img">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={handleImageError}
          />
        </Link>

        <div className="pcard-body">
          <Link to={`/product/${product.id}`} className="pcard-title">
            {product.title}
          </Link>

          <Rating value={product.rating} reviews={product.reviews} />

          <div className="pcard-price">
            <span className="pcard-price-now">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="pcard-price-old">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="pcard-badges">
            {product.prime && <Badge tone="prime">Prime</Badge>}
            {!product.inStock && <Badge tone="danger">Out of stock</Badge>}
          </div>

          <Button
            fullWidth
            disabled={!product.inStock}
            onClick={() => addItem(product.id, 1)}
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
