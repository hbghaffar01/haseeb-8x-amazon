/**
 * Image helpers. Provides an inline SVG placeholder (no network dependency) and
 * an onError handler that swaps a broken image to the placeholder exactly once.
 */
export const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect width="300" height="300" fill="#f0f2f2"/>
      <g fill="#b5bdbd" font-family="Arial, sans-serif" text-anchor="middle">
        <text x="150" y="140" font-size="48">🖼️</text>
        <text x="150" y="185" font-size="15">Image unavailable</text>
      </g>
    </svg>`
  );

/** Attach to an <img onError>. Swaps to the fallback and prevents loops. */
export function handleImageError(e) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "true";
  img.src = FALLBACK_IMAGE;
}
