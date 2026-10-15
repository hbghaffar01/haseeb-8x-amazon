# Amazon Rebuild — 8x Assignment

A rebuild of the amazon.com storefront, built with **React (Vite)** on the front
end and **Express** on the back end. It uses mock data only — no real Amazon data
is scraped or stored.

This is the single, complete README for the project. It covers the live links,
the tech and approach, how to set everything up and run it, how it is deployed on
Vercel, and how the AI prompt/response capture works.

---

## Live links

| What            | URL                                                       |
| --------------- | --------------------------------------------------------- |
| **App (frontend)** | https://haseeb-8x-client.vercel.app          |
| **API (backend)**  | https://haseeb-8x-server.vercel.app/api/health       |

Both are deployed on Vercel and open publicly (no login needed).

---

## What's inside

- An Amazon-style storefront: header with a search overlay, category nav, hero
  banner row, category cards, a product grid, product detail pages, and a cart.
- A small REST API serving the catalog and a per-browser cart.
- A reusable UI component kit documented in Storybook.
- Unit/integration tests on both sides with Vitest.
- A Postman collection for the API.
- Automatic capture of every AI prompt and final response into `.agent-logs/`.

---

## Tech stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | React 18, React Router, Vite, Zod, Storybook, Vitest              |
| Backend  | Node, Express, Zod, Helmet, CORS, rate-limit, compression, Vitest |
| Hosting  | Vercel (two projects: `client` static SPA, `server` serverless)   |
| Tooling  | Kiro (AI IDE) with an agent-capture hook                          |

---

## How data is stored (and why no database)

**There is no database. The catalog is a plain in-memory JavaScript data module
(`server/src/data/products.js`), and the cart lives in an in-memory map on the
server.** Think of it as a lightweight JSON data store baked into the app.

Why this choice:

- **The site is small.** It is a read-mostly demo catalog of a dozen products. A
  full database (Postgres, Prisma, etc.) would be heavy, slow to set up, and add
  moving parts for no real benefit at this size.
- **It deploys cleanly on Vercel.** Vercel runs the backend as a serverless
  function with a read-only, temporary filesystem. A file-based store (SQLite or a
  JSON file written at runtime) would not persist there. In-memory data works
  everywhere with zero setup and no connection strings or secrets.
- **Easy to swap later.** All data access is behind a service layer
  (`catalogService`, `cartService`), so moving to a real database later means
  changing only those files — nothing in the routes, controllers, or UI.

> We did try Prisma + a database first. It added deploy friction (Prisma 7's new
> driver-adapter setup broke, and SQLite can't run on Vercel), so we removed it in
> favour of the simpler in-memory approach that fits an app this small. That dead
> end is visible in the git history and the `.agent-logs/`.

---

## Approaches & practices we followed

- **Modular and DRY.** Backend is layered `routes → controllers → services`;
  controllers stay thin and delegate to services. The frontend sends every network
  request through one shared `httpClient`.
- **Dedicated API folder.** All client HTTP calls live in `client/src/api/`
  (`httpClient`, `catalogApi`, `cartApi`) — components never call `fetch` directly.
- **Environment constants in one place.** The server reads `process.env` only in
  `server/src/config/env.js`; the client reads env only in
  `client/src/constants/config.js`.
- **Data-driven content.** UI text and sections (nav links, hero banners, category
  cards, footer) live as arrays of objects in `client/src/constants/index.js` and
  are rendered by mapping over them.
- **Reusable components + Storybook.** Button, Input, Card, Rating, and Badge each
  have a component, styles, a Storybook story, and a test.
- **Patterns:** a higher-order component (`withAsyncData`) centralizes
  loading/error/empty states, an **ErrorBoundary** catches render errors, and React
  **Context** holds global cart state.
- **Secure inputs with Zod.** Inputs accept text or numbers only; values are
  sanitized as you type and validated with Zod schemas that are shared in spirit
  with the server, which validates every request again.
- **Security hardening.** Helmet (strict CSP, HSTS, no-sniff), CORS locked to the
  configured origin, request rate limiting, a JSON body-size limit, and
  `x-powered-by` disabled.
- **Performance & SEO.** System font stack (no web-font download), lazy-loaded
  routes (code-splitting), images with explicit width/height and `loading="lazy"`
  to reduce layout shift, an inline SVG fallback for broken images, and
  meta/Open-Graph tags. These help FCP, LCP, and CLS.
- **Responsive.** Layouts adapt to phones (iPhone/Samsung), tablets, and desktop;
  verified across viewports with the Chrome DevTools MCP.
- **Tested.** Vitest on both sides, including validation-failure cases on the API.

---

## Project structure

```
8x/
├── client/                      # React + Vite storefront
│   ├── .storybook/              # Storybook config
│   └── src/
│       ├── api/                 # ALL HTTP calls (httpClient, catalogApi, cartApi)
│       ├── components/
│       │   ├── ui/              # reusable kit (+ stories + tests)
│       │   ├── layout/          # Header, SearchBox, CategoryBar, Footer
│       │   ├── home/            # HeroBanners, CategoryCards
│       │   ├── product/         # ProductCard
│       │   └── common/          # ErrorBoundary
│       ├── constants/           # config.js (env) + index.js (content)
│       ├── context/             # CartContext
│       ├── hoc/                 # withAsyncData
│       ├── hooks/               # useAsync
│       ├── pages/               # HomePage, ProductDetailPage, CartPage
│       ├── validation/          # Zod schemas + input sanitizers
│       └── utils/               # format, image fallback
├── server/                      # Express API (in-memory data)
│   ├── api/index.js             # Vercel serverless entry (exports the app)
│   ├── postman.json             # Postman collection
│   └── src/
│       ├── config/              # env.js (only place process.env is read)
│       ├── routes/              # route definitions
│       ├── controllers/         # thin HTTP controllers
│       ├── services/            # catalog + cart logic (in-memory)
│       ├── data/                # the product catalog (data source)
│       ├── validation/          # Zod schemas
│       ├── middleware/          # validate.js, errorHandler.js
│       └── app.js               # app factory + security middleware
├── .kiro/                       # Kiro: capture script, hooks, steering
└── .agent-logs/                 # committed AI prompt/response logs
```

---

## Run it locally

You need Node 18+ and npm. Run the backend and frontend in two terminals.

### 1. Backend

```bash
cd server
cp .env.example .env     # sets PORT and CORS_ORIGIN
npm install
npm start                # http://localhost:4000
```

Check it: open http://localhost:4000/api/health → `{"status":"ok"}`

### 2. Frontend

```bash
cd client
cp .env.example .env     # sets VITE_API_BASE_URL=http://localhost:4000/api
npm install
npm run dev              # http://localhost:5173
```

> If the app shows "Failed to fetch" locally, the backend isn't running. Start the
> server (step 1) — the frontend talks to it at `http://localhost:4000/api`.

### Other commands

| Where  | Command              | What it does                  |
| ------ | -------------------- | ----------------------------- |
| client | `npm test`           | Run Vitest tests              |
| client | `npm run storybook`  | Component explorer at :6006   |
| client | `npm run build`      | Production build to `dist/`   |
| server | `npm test`           | Run Vitest API tests          |
| server | `npm run dev`        | API with file watch           |

---

## API reference

Base URL: `/api`. Send the cart's `x-cart-id` header on cart calls.

| Method | Path                  | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| GET    | `/health`             | Health check                                  |
| GET    | `/categories`         | List categories                               |
| GET    | `/products`           | List products (`category`, `search`, `sort`)  |
| GET    | `/products/:id`       | Product detail                                |
| GET    | `/cart`               | Current cart                                  |
| POST   | `/cart/items`         | Add item `{ productId, quantity }`            |
| PATCH  | `/cart/items/:id`     | Update quantity `{ quantity }`                |
| DELETE | `/cart/items/:id`     | Remove item                                   |

Import `server/postman.json` into Postman and set the `baseUrl` and `cartId`
collection variables to try these quickly.

---

## Deployment (Vercel)

Both apps deploy from this one GitHub repo as **two separate Vercel projects**.
No database is needed, so there are no connection strings to manage.

### Backend project (`server`)

- Root directory: `server`
- `server/vercel.json` routes every request to `api/index.js`, which exports the
  Express app so Vercel runs it as a serverless function.
- Environment variables:
  - `CORS_ORIGIN` = the deployed frontend URL
  - `NODE_ENV` = `production`

### Frontend project (`client`)

- Root directory: `client`, framework Vite, output `dist`.
- `client/vercel.json` rewrites all routes to `index.html` (SPA routing).
- Environment variable:
  - `VITE_API_BASE_URL` = deployed backend URL + `/api`

### Deploy order

1. Deploy the backend, note its URL.
2. Set the frontend's `VITE_API_BASE_URL` to that URL + `/api`, then deploy the
   frontend.
3. Set the backend's `CORS_ORIGIN` to the frontend URL and redeploy the backend.
4. Make sure Deployment Protection is off on both projects so the links open for
   anyone.

With the Vercel CLI, each project is deployed with `vercel deploy --prod` from its
folder; environment variables are set with `vercel env add`.

---

## AI prompt/response capture

Every AI turn in this repo is captured automatically into `.agent-logs/`.

- **Tool:** Kiro (an AI IDE). **Model:** `Auto` (Kiro picks a model per request;
  logs record `auto`, or the concrete model id when Kiro stamps one).
- **Mechanism:** a Kiro **Agent Hook** on the `Stop` event
  (`.kiro/hooks/agent-capture.json`) runs a Node script
  (`.kiro/agent-capture/capture.mjs`) at the end of every turn. It fires on its
  own — no manual logging.
- **What it records:** the verbatim prompt and the final response only, with a UTC
  timestamp and the model name. It deliberately excludes the model's thinking, tool
  calls, file reads/diffs, and retries by reading Kiro's session transcript and
  keeping only the user message and the final assistant text.
- **Privacy:** the script writes local files only and makes no network calls.
  Nothing is sent anywhere. The logs reach 8x only because `.agent-logs/` is
  committed to the public repo (as the assignment requires); it is never
  gitignored.
- **Format:** one markdown file per session,
  `YYYY-MM-DD_HH-MM-SS_<session-id>.md`, with `[LOG_ENTRY type=PROMPT ...]` /
  `[LOG_ENTRY type=RESPONSE ...]` blocks.

**Honest note / known limitation:** Kiro loads hooks at **session start**, so a
hook added mid-session only begins auto-firing from the next session. During the
build (when the hook was added mid-session) the script was also run directly to
snapshot the transcript; from a fresh session it fires automatically. Dead ends
like this one — and the earlier Prisma attempt — are intentionally left in the
logs and git history.

---

## Kiro steering files

`.kiro/steering/` contains guidance that helps any AI agent working in this repo:

- `onboarding.md` — clone → install → run steps.
- `architecture.md` — layout and conventions.
- `testing.md` — how and where to write tests.
- `danger-zone.md` — destructive actions that need human confirmation.

---

## Copyable summary

```
amazon.rebuild — an Amazon storefront clone for the 8x assignment.

Live app:   https://haseeb-8x-client.vercel.app
Live API:   https://haseeb-8x-server.vercel.app/api/health
Repo:       https://github.com/hbghaffar01/haseeb-8x-amazon

Stack: React 18 + Vite (frontend), Express (backend), Zod validation, Storybook,
Vitest, deployed on Vercel as two projects (static SPA + serverless API).

Data: no database — a small in-memory/JSON data store, chosen because the app is
small and read-mostly and because it deploys cleanly on Vercel's serverless
filesystem. All data access sits behind a service layer so a real DB can be added
later without touching the UI or routes.

Practices: dedicated API layer, env constants in one place, data-driven content,
reusable UI kit + Storybook, HOC + ErrorBoundary + Context, secure Zod-validated
inputs, Helmet/CORS/rate-limit security, lazy-loaded routes and sized images for
good FCP/LCP/CLS, fully responsive, tested with Vitest.

AI capture: a Kiro Stop-hook writes every prompt + final response to .agent-logs/
automatically (local files only, committed to the public repo).
```
