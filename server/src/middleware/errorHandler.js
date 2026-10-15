/** 404 handler for unknown routes. */
export function notFound(req, res, next) {
  res.status(404).json({ error: "Route not found" });
}

/** Centralized error handler. Hides internals in production. */
export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.publicMessage || "Internal server error",
  });
}
