import "./Badge.css";

/**
 * Reusable badge/pill. Used for Prime, deals, stock status, etc.
 * @param {"prime"|"deal"|"neutral"|"danger"} tone
 */
export function Badge({ children, tone = "neutral" }) {
  return <span className={`ui-badge ui-badge--${tone}`}>{children}</span>;
}
