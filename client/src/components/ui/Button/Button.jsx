import "./Button.css";

/**
 * Reusable button. Amazon-style variants.
 * @param {"primary"|"secondary"|"link"} variant
 * @param {"sm"|"md"|"lg"} size
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  disabled = false,
  onClick,
  ...rest
}) {
  const className = [
    "ui-btn",
    `ui-btn--${variant}`,
    `ui-btn--${size}`,
    fullWidth ? "ui-btn--block" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
