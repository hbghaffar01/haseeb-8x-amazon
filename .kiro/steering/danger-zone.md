# Danger Zone

Actions in this repo that are destructive, hard to reverse, or affect shared
state. An AI agent must STOP and get explicit human confirmation before doing any
of these.

## Never do without explicit approval

- **Force push / history rewrite**: `git push --force`, `git reset --hard`,
  `git rebase` on `main`, `git clean -fd`. The repo and its `.agent-logs/` are the
  graded submission — do not rewrite history.
- **Delete `.agent-logs/`** or any file in it, or add it to `.gitignore`. These
  logs are part of the submission and must ship.
- **Touch git config** (`git config user.*`, remotes) or SSH keys.
- **Rotate or print secrets**: never echo `.env` contents, Vercel tokens, or SSH
  private keys into chat, logs, or commits.
- **Deploy to production** or change Vercel project settings/env vars without the
  owner confirming.

## Handle with care

- Installing dependencies: pin versions; watch for peer-dep conflicts
  (Storybook/Vitest are sensitive to Vite major versions here).
- Editing CORS origins, Helmet CSP, or rate limits in `server/src/app.js` —
  loosening these weakens security.

## Safe by default

Editing components/styles, adding tests, running `npm run build`, `npm test`,
and local dev servers are all fine without extra confirmation.
