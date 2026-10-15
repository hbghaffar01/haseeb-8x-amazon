import { Link, useSearchParams } from "react-router-dom";
import { navLinks } from "../../constants/index.js";
import "./CategoryBar.css";

/**
 * Category navigation bar. Driven entirely by the `navLinks` constant so the
 * nav is declarative (data -> UI), matching the project's constants pattern.
 */
export function CategoryBar() {
  const [params] = useSearchParams();
  const active = params.get("category") || "";

  return (
    <nav className="catbar" aria-label="Product categories">
      <div className="catbar-inner">
        {navLinks.map((link) => {
          const to = link.id ? `/?category=${link.id}` : "/";
          const isActive = active === link.id;
          return (
            <Link
              key={link.id || "all"}
              to={to}
              className={`catbar-item ${isActive ? "is-active" : ""}`}
            >
              {link.icon ? `${link.icon} ` : ""}
              {link.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
