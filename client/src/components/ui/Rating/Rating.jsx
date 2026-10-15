import "./Rating.css";

/**
 * Reusable star rating display.
 * @param {number} value  0..5
 * @param {number} reviews optional review count
 */
export function Rating({ value = 0, reviews, showValue = false }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    let cls = "ui-star";
    if (i < full) cls += " ui-star--full";
    else if (i === full && half) cls += " ui-star--half";
    stars.push(
      <span key={i} className={cls} aria-hidden="true">
        ★
      </span>
    );
  }

  return (
    <span className="ui-rating" title={`${value} out of 5`}>
      <span className="ui-rating-stars">{stars}</span>
      {showValue && <span className="ui-rating-value">{value.toFixed(1)}</span>}
      {reviews !== undefined && (
        <span className="ui-rating-count">{reviews.toLocaleString()}</span>
      )}
    </span>
  );
}
