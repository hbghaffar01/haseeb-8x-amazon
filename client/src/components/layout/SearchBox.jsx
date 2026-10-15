import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchSuggestions } from "../../constants/index.js";
import { searchSchema, sanitizeByKind, INPUT_KINDS } from "../../validation/schemas.js";

/**
 * Amazon-style search box. On focus it opens a full-page dim overlay plus a
 * suggestions dropdown; clicking outside (anywhere on the dimmed DOM) or pressing
 * Escape closes it. `onOverlayChange` lets the Header toggle a body-level class.
 */
export function SearchBox({ onOverlayChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  useEffect(() => {
    onOverlayChange?.(open);
    if (!open) return;

    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onOverlayChange]);

  const go = (value) => {
    const term = value.trim();
    const result = searchSchema.safeParse(term);
    if (!result.success) return;
    setOpen(false);
    navigate(term ? `/?search=${encodeURIComponent(term)}` : "/");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    go(query);
  };

  const filtered = query
    ? searchSuggestions.filter((s) => s.includes(query.toLowerCase()))
    : searchSuggestions;

  return (
    <div className="hdr-search-wrap" ref={boxRef}>
      <form
        className={`hdr-search ${open ? "is-open" : ""}`}
        onSubmit={onSubmit}
        role="search"
      >
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) =>
            setQuery(sanitizeByKind(e.target.value, INPUT_KINDS.TEXT))
          }
          placeholder="Search amazon.rebuild"
          aria-label="Search products"
          aria-expanded={open}
        />
        <button type="submit" aria-label="Search">
          🔍
        </button>
      </form>

      {open && filtered.length > 0 && (
        <ul className="hdr-suggest" role="listbox">
          {filtered.map((s) => (
            <li key={s}>
              <button
                type="button"
                className="hdr-suggest-item"
                onMouseDown={() => go(s)}
              >
                🔍 {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
