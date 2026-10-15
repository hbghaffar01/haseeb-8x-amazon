import { Link } from "react-router-dom";
import { heroBanners } from "../../constants/index.js";
import { handleImageError } from "../../utils/image.js";
import "./HeroBanners.css";

/**
 * Horizontal row of promo hero cards (data-driven from `heroBanners`).
 * Each card links to its category.
 */
export function HeroBanners() {
  return (
    <section className="hero" aria-label="Featured categories">
      {heroBanners.map((b) => (
        <Link
          key={b.id}
          to={b.category ? `/?category=${b.category}` : "/"}
          className="hero-card"
          style={{ background: b.bg }}
        >
          <h2>{b.title}</h2>
          <div className="hero-card-img">
            <img
              src={b.image}
              alt={b.title}
              loading="lazy"
              width="300"
              height="220"
              onError={handleImageError}
            />
          </div>
          <span className="hero-card-cta">Shop now</span>
        </Link>
      ))}
    </section>
  );
}
