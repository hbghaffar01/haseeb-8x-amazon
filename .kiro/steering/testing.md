# Testing Guide

Both packages use **Vitest**. Write tests next to the code or under `test/`.

## Client (`client/`)

- Runner: Vitest + jsdom + @testing-library/react.
- Setup: `src/test/setup.js` (jest-dom matchers, auto cleanup).
- Location: `*.test.jsx` beside the component (e.g. `Button.test.jsx`).
- Run: `npm test` (CI) or `npm run test:watch`.
- Cover: component rendering, user interactions (userEvent), and the Zod input
  sanitization (text/number only).

## Server (`server/`)

- Runner: Vitest + supertest against the Express app from `createApp()`
  (no port binding needed).
- Location: `test/*.test.js`.
- Run: `npm test`.
- Cover: each endpoint's happy path AND validation failures (bad sort, injection
  in search, path-traversal id, out-of-range quantity should all return 400).

## Rules

- A new feature or bug fix should come with a test.
- Keep Vitest pinned to the 2.x line while the project is on Vite 5 (Vitest 3+
  requires Vite 6+). Changing this is a dependency decision, not a casual bump.
- Don't hit external networks in tests; the catalog is seeded locally.
