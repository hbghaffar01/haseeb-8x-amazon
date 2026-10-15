# Architecture & Conventions

How this codebase is organized and the patterns to follow when extending it.

## Layout

```
client/  React + Vite SPA
  src/api/          ALL HTTP calls (httpClient + per-domain modules). No fetch elsewhere.
  src/constants/    config.js (env-derived) + index.js (content: navLinks, heroBanners, ...)
  src/components/   ui/ (reusable kit + stories + tests), layout/, home/, product/, common/
  src/context/      React context (CartContext)
  src/hoc/          higher-order components (withAsyncData)
  src/hooks/        reusable hooks (useAsync)
  src/pages/        route screens (lazy-loaded)
  src/validation/   Zod schemas + input sanitizers
  src/utils/        pure helpers (format, image fallback)
server/  Express API (in-memory data, no DB)
  src/config/       env.js (only place process.env is read)
  src/routes/       thin route definitions, attach validation middleware
  src/controllers/  thin HTTP handlers, read req.validated
  src/services/     business logic, in-memory data (HTTP-agnostic)
  src/validation/   Zod schemas (mirror the client rules)
  src/middleware/   validate.js, errorHandler.js
  src/data/         products.js (the in-memory catalog)
```

## Conventions

- **Content is data-driven.** UI text/sections live in `client/src/constants/index.js`
  as arrays of objects (navLinks → cards → sections). Components map over them.
  Follow this pattern (and add a Storybook story) when introducing new content.
- **Env in one place.** Client reads env only in `constants/config.js`; server only
  in `config/env.js`.
- **API isolation.** The client never calls `fetch` directly outside `src/api/`.
- **Validation both sides.** Zod on the client (sanitize + validate inputs to
  text/number) and again on the server (reject bad input at the boundary).
- **Thin controllers.** Controllers delegate to services; services own logic + DB.
- **Reusable UI** goes in `components/ui/` with a `.jsx`, `.css`, `.stories.jsx`,
  and a `.test.jsx`.

## Security

Helmet (strict CSP), locked CORS origins, rate limiting, JSON body size limit,
`x-powered-by` disabled, Zod validation. Don't weaken these casually.

## Performance / SEO

System font stack (no web-font download), lazy-loaded routes, `loading="lazy"` +
explicit width/height on images (CLS), image onError fallback. Keep images sized
and routes code-split.
