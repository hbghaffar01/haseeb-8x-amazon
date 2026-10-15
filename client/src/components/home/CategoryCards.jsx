import { Link } from "react-router-dom";
import { categoryCards } from "../../constants/index.js";
import { handleImageError } from "../../utils/image.js";
import "./CategoryCards.css";

/**
 * Grid of category cards, each with four mini product tiles. Data-driven from
 * `categoryCards`. Overlaps the hero row like Amazon's homepage.
 */
export function CategoryCards() {
  return (
    <section className="ccards" aria-label="Shop by category">
      {categoryCards.map((card) => (
        <article key={card.id} className="ccard">
          <h3>{card.title}</h3>
          <div className="ccard-grid">
            {card.tiles.map((tile) => (
              <Link
                key={tile.label}
                to={`/?category=${card.category}`}
                className="ccard-tile"
              >
                <div className="ccard-tile-img">
                  <img
                    src={tile.image}
                    alt={tile.label}
                    loading="lazy"
                    width="150"
                    height="150"
                    onError={handleImageError}
                  />
                </div>
                {tile.label}
              </Link>
            ))}
          </div>
          <Link to={`/?category=${card.category}`} className="ccard-cta">
            {card.cta}
          </Link>
        </article>
      ))}
    </section>
  );
}
