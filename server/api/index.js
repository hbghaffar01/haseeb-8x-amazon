/**
 * Vercel serverless entry point for the Express API.
 *
 * Vercel routes all requests matching the server project to this function
 * (see server/vercel.json). We export the Express app directly; Vercel's Node
 * runtime treats an Express instance as a request handler.
 */
import { createApp } from "../src/app.js";

const app = createApp();

export default app;
