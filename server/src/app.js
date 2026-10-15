import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

/**
 * Builds the Express application. Security hardening is applied here:
 *  - helmet: sensible secure HTTP headers (CSP, HSTS, no-sniff, etc.)
 *  - cors: locked to configured origins only
 *  - express-rate-limit: basic abuse protection
 *  - compression: gzip responses
 *  - express.json with a size limit: guards against oversized payloads
 */
export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      // API serves JSON only; a strict CSP prevents any inline/script execution.
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
      crossOriginResourcePolicy: { policy: "same-site" },
      referrerPolicy: { policy: "no-referrer" },
    })
  );
  app.use(compression());

  app.use(
    cors({
      origin: env.corsOrigins,
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "x-cart-id"],
    })
  );

  app.use(express.json({ limit: "10kb" }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
  });
  app.use("/api", limiter);

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
