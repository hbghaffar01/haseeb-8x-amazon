import dotenv from "dotenv";

dotenv.config();

/**
 * Centralized environment configuration. Every tunable value lives here so the
 * rest of the codebase never reads process.env directly (DRY + single source).
 */
export const env = {
  port: Number(process.env.PORT) || 4000,
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  nodeEnv: process.env.NODE_ENV || "development",
};
