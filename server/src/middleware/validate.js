/**
 * Validation middleware factory. Validates a request segment (body/query/params)
 * against a Zod schema. On success, replaces the segment with the parsed/coerced
 * value so controllers receive clean, typed data. On failure, returns 400.
 *
 * @param {import('zod').ZodSchema} schema
 * @param {"body"|"query"|"params"} source
 */
export function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    // Query/params are read-only getters in Express 5+, so attach parsed values
    // under a dedicated key the controllers read from.
    req.validated = { ...(req.validated || {}), [source]: result.data };
    next();
  };
}
