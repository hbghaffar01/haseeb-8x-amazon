import "./Card.css";

/**
 * Reusable surface container.
 */
export function Card({ children, hoverable = false, padded = true, ...rest }) {
  const className = [
    "ui-card",
    hoverable ? "ui-card--hoverable" : "",
    padded ? "ui-card--pad" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
