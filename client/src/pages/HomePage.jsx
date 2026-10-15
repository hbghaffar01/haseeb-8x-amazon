import { useSearchParams } from "react-router-dom";
import { catalogApi } from "../api/catalogApi.js";
import { withAsyncData } from "../hoc/withAsyncData.jsx";
import { ProductCard } from "../components/product/ProductCard.jsx";
import { HeroBanners } from "../components/home/HeroBanners.jsx";
import { CategoryCards } from "../components/home/CategoryCards.jsx";
import { SORT_OPTIONS } from "../constants/config.js";
import "./HomePage.css";

/** Presentational grid — receives already-loaded data from the HOC. */
function ProductGrid({ data }) {
  const products = data?.data || [];
  return (
    <div className="home-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

/** Wrap the grid with async loading/error/empty handling (DRY via HOC). */
const ProductGridWithData = withAsyncData(ProductGrid, {
  fetcher: ({ category, search, sort }) =>
    catalogApi.getProducts({ category, search, sort }),
  getDeps: ({ category, search, sort }) => [category, search, sort],
  isEmpty: (data) => (data?.data || []).length === 0,
  emptyMessage: "No products found.",
});

export function HomePage() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "";

  const onSort = (e) => {
    const next = new URLSearchParams(params);
    if (e.target.value) next.set("sort", e.target.value);
    else next.delete("sort");
    setParams(next);
  };

  // Show the merchandised homepage (hero + category cards) only on the default
  // landing view, not while searching or filtering.
  const isLanding = !search && !category && !sort;

  return (
    <div className="home-wrap">
      {isLanding && (
        <>
          <HeroBanners />
          <CategoryCards />
        </>
      )}
      <div className="container home">
      <div className="home-head">
        <h1 className="home-title">
          {search
            ? `Results for "${search}"`
            : category
            ? "Browsing category"
            : "Today's picks"}
        </h1>
        <label className="home-sort">
          Sort by:
          <select value={sort} onChange={onSort}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ProductGridWithData category={category} search={search} sort={sort} />
      </div>
    </div>
  );
}
