# Onboarding — Clone, Install, Run

If you just cloned this repo (human or AI agent), follow these steps in order.
This is a two-package project: `client/` (React + Vite) and `server/` (Express +
Prisma).

## 1. Prerequisites

- Node.js 18+ (tested on Node 24)
- npm

## 2. Backend (server/)

```bash
cd server
cp .env.example .env        # sets PORT, CORS_ORIGIN
npm install
npm start                   # http://localhost:4000
```

Verify: `curl http://localhost:4000/api/health` → `{"status":"ok"}`

## 3. Frontend (client/)

```bash
cd client
cp .env.example .env        # sets VITE_API_BASE_URL=http://localhost:4000/api
npm install
npm run dev                 # http://localhost:5173
```

## 4. Other useful commands

| Where   | Command                 | What it does                        |
| ------- | ----------------------- | ----------------------------------- |
| client  | `npm test`              | Vitest unit/component tests         |
| client  | `npm run storybook`     | Component explorer at :6006         |
| client  | `npm run build`         | Production build to `dist/`         |
| server  | `npm test`              | Vitest API tests (supertest)        |
| server  | `npm run dev`           | API with file watch                 |

## 5. Agent capture (do not disable)

This repo auto-captures agent prompts/responses into `.agent-logs/` via a Kiro
`Stop` hook (`.kiro/hooks/agent-capture.json` → `.kiro/agent-capture/capture.mjs`).
It writes local files only; it must stay enabled and `.agent-logs/` must stay
committed. See the "AI prompt/response capture" section of `README.md`.

## 6. Deploying

Two Vercel projects from this one repo (root directories `client` and `server`).
No database to provision — the catalog is in-memory. Set `CORS_ORIGIN` (server)
and `VITE_API_BASE_URL` (client). See `README.md`.
