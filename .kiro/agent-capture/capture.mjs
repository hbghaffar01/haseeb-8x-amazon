#!/usr/bin/env node
/**
 * 8x agent capture — Kiro edition.
 *
 * Lives at <repo>/.kiro/agent-capture/capture.mjs and fires automatically from a
 * Kiro `Stop` hook (end-of-turn). It reads the active session transcript
 * (~/.kiro/sessions/.../messages.jsonl), extracts ONLY the most recently completed
 * turn's verbatim user prompt and the final assistant response (operationType
 * "Say" chunks joined), and appends them to a per-session markdown log in
 * <repo>/.agent-logs/ using the 8x log format.
 *
 * It deliberately excludes: reasoning/thinking, tool calls, tool results, retries,
 * file reads/diffs, and intermediate summaries. Prompt + final response only.
 *
 * No network. No data leaves the machine. Writes local files only.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const HOME = os.homedir();
const SESSIONS_DIR = path.join(HOME, ".kiro", "sessions");

// Repo root. Script lives at <repo>/.kiro/agent-capture/capture.mjs, so the repo
// root is two directories up. Env override wins when Kiro provides it.
const REPO_ROOT =
  process.env.KIRO_PROJECT_DIR ||
  process.env.CLAUDE_PROJECT_DIR ||
  path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");

const LOGS_DIR = path.join(REPO_ROOT, ".agent-logs");

function log(...a) {
  // Diagnostics go to stderr so they never pollute hook stdout.
  process.stderr.write("[capture] " + a.join(" ") + "\n");
}

/** Read whatever the hook put on stdin (best-effort; not required). */
function readStdin() {
  try {
    const data = fs.readFileSync(0, "utf8");
    return data && data.trim() ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/** Recursively find every messages.jsonl under the sessions dir. */
function findTranscripts(dir) {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...findTranscripts(full));
    else if (e.name === "messages.jsonl") out.push(full);
  }
  return out;
}

/** session.json sits next to messages.jsonl. */
function readSessionMeta(transcriptPath) {
  const sj = path.join(path.dirname(transcriptPath), "session.json");
  try {
    return JSON.parse(fs.readFileSync(sj, "utf8"));
  } catch {
    return {};
  }
}

function samePath(a, b) {
  try {
    return fs.realpathSync(a) === fs.realpathSync(b);
  } catch {
    return path.resolve(a) === path.resolve(b);
  }
}

/**
 * Pick the transcript for THIS repo: among sessions whose workspacePaths include
 * REPO_ROOT, choose the most recently modified. If a session id is supplied on
 * stdin, prefer that.
 */
function pickTranscript(stdin) {
  const all = findTranscripts(SESSIONS_DIR);
  if (all.length === 0) return null;

  const wantId =
    stdin.session_id || stdin.sessionId || stdin.session || null;

  const candidates = all
    .map((p) => {
      const meta = readSessionMeta(p);
      let mtime = 0;
      try {
        mtime = fs.statSync(p).mtimeMs;
      } catch {}
      const inRepo = Array.isArray(meta.workspacePaths)
        ? meta.workspacePaths.some((w) => samePath(w, REPO_ROOT))
        : false;
      return { p, meta, mtime, inRepo };
    })
    .filter((c) => c.meta && c.meta.id);

  if (wantId) {
    const byId = candidates.find((c) => c.meta.id === wantId);
    if (byId) return byId;
  }

  const inRepo = candidates.filter((c) => c.inRepo);
  const pool = inRepo.length ? inRepo : candidates;
  pool.sort((a, b) => b.mtime - a.mtime);
  return pool[0] || null;
}

/** Parse a jsonl transcript into an array of {payload, timestamp}. */
function parseTranscript(file) {
  const rows = [];
  const text = fs.readFileSync(file, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      rows.push(JSON.parse(t));
    } catch {
      // skip malformed line
    }
  }
  return rows;
}

/**
 * Extract the LAST completed turn.
 * A turn = a `user` message followed by the assistant `Say` chunks that belong to
 * the same execution (grouped by executionId when present, otherwise by position).
 * Returns { prompt, promptTs, promptModel, response, responseTs, responseModel }.
 */
function extractLastTurn(rows, fallbackModel) {
  // Index the last user message.
  let lastUserIdx = -1;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i]?.payload?.type === "user") {
      lastUserIdx = i;
      break;
    }
  }
  if (lastUserIdx === -1) return null;

  const userRow = rows[lastUserIdx];
  const prompt = userRow.payload.content ?? "";
  const imgs = Array.isArray(userRow.payload.images)
    ? userRow.payload.images.length
    : 0;
  const docs = Array.isArray(userRow.payload.documents)
    ? userRow.payload.documents.length
    : 0;

  // Collect assistant "Say" chunks after the last user message.
  const sayChunks = [];
  let respTs = null;
  let respModel = null;
  for (let i = lastUserIdx + 1; i < rows.length; i++) {
    const p = rows[i]?.payload;
    if (!p) continue;
    if (p.type === "user") break; // next turn started
    if (p.type === "assistant" && p.operationType === "Say") {
      if (typeof p.content === "string" && p.content.length) {
        sayChunks.push(p.content);
        respTs = rows[i].timestamp || respTs;
        respModel = p.model || p.modelId || respModel;
      }
    }
  }

  const response = sayChunks.join("\n\n");
  return {
    prompt,
    promptTs: userRow.timestamp || null,
    promptModel:
      userRow.payload.model || userRow.payload.modelId || fallbackModel,
    promptImages: imgs,
    promptDocs: docs,
    response,
    responseTs: respTs,
    responseModel: respModel || fallbackModel,
    hasResponse: sayChunks.length > 0,
  };
}

function iso(ts) {
  if (!ts) return new Date().toISOString();
  if (typeof ts === "number") return new Date(ts).toISOString();
  // already an ISO string
  return ts;
}

function logFileName(sessionId, firstPromptTs) {
  const d = new Date(iso(firstPromptTs));
  const pad = (n) => String(n).padStart(2, "0");
  const stamp =
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `_${pad(d.getUTCHours())}-${pad(d.getUTCMinutes())}-${pad(d.getUTCSeconds())}`;
  const shortId = String(sessionId).replace(/^sess_/, "");
  return `${stamp}_${shortId}.md`;
}

function shortId(sessionId) {
  return String(sessionId).replace(/^sess_/, "").slice(0, 8);
}

function main() {
  const stdin = readStdin();
  const picked = pickTranscript(stdin);
  if (!picked) {
    log("no transcript found; nothing to capture");
    return;
  }

  const { p: transcriptPath, meta } = picked;
  const sessionId = meta.id || "unknown-session";
  const author = process.env.AGENT_LOG_AUTHOR || "hbghaffar01";
  const project =
    process.env.AGENT_LOG_PROJECT || path.basename(REPO_ROOT) || "project";
  const fallbackModel = meta.modelId || "auto";

  const rows = parseTranscript(transcriptPath);
  const turn = extractLastTurn(rows, fallbackModel);
  if (!turn) {
    log("no user turn found");
    return;
  }
  if (!turn.hasResponse) {
    log("turn has no final response yet; skipping");
    return;
  }

  fs.mkdirSync(LOGS_DIR, { recursive: true });

  // One file per session. Find existing file for this session id, else create.
  const existing = fs
    .readdirSync(LOGS_DIR)
    .find((f) => f.includes(shortId(sessionId)) && f.endsWith(".md"));

  const fileName = existing || logFileName(sessionId, turn.promptTs);
  const filePath = path.join(LOGS_DIR, fileName);

  // De-dupe: if the last PROMPT entry in the file already matches this prompt+ts,
  // the Stop hook likely fired twice — do not append again.
  let prevText = "";
  if (fs.existsSync(filePath)) {
    prevText = fs.readFileSync(filePath, "utf8");
  }

  const promptTsIso = iso(turn.promptTs);
  const responseTsIso = iso(turn.responseTs);

  const dupMarker = `timestamp: ${promptTsIso}`;
  const promptBlockHead = `[LOG_ENTRY type=PROMPT`;
  // crude but effective: if this exact prompt timestamp already recorded, skip.
  if (prevText.includes(dupMarker) && prevText.includes(turn.prompt.slice(0, 60))) {
    log("duplicate turn already logged; skipping");
    return;
  }

  // Determine running exchange number.
  const priorPrompts = (prevText.match(/\[LOG_ENTRY type=PROMPT/g) || []).length;
  const num = priorPrompts + 1;

  const sid = shortId(sessionId);

  // Write header once.
  if (!fs.existsSync(filePath)) {
    const dateOnly = promptTsIso.slice(0, 10);
    const header =
      `---\n` +
      `session_id: ${sessionId.replace(/^sess_/, "")}\n` +
      `date: ${dateOnly}\n` +
      `author: ${author}\n` +
      `model: ${fallbackModel}\n` +
      `tool: kiro\n` +
      `project: ${project}\n` +
      `total_exchanges: 1\n` +
      `first_prompt_time: ${promptTsIso}\n` +
      `last_prompt_time: ${promptTsIso}\n` +
      `---\n\n` +
      `# Session Log - ${dateOnly}\n\n` +
      `Session: \`${sid}\` | Project: \`${project}\` | Author: \`${author}\`\n\n` +
      `---\n\n`;
    fs.writeFileSync(filePath, header, "utf8");
  }

  const attach = [];
  if (turn.promptImages) attach.push(`${turn.promptImages} image(s)`);
  if (turn.promptDocs) attach.push(`${turn.promptDocs} document(s)`);
  const attachNote = attach.length ? `\n[attachments: ${attach.join(", ")}]` : "";

  const entry =
    `[LOG_ENTRY type=PROMPT num=${num} session=${sid}]\n` +
    `timestamp: ${promptTsIso}\n` +
    `model: ${turn.promptModel}\n\n` +
    `${turn.prompt}${attachNote}\n\n` +
    `[LOG_ENTRY type=RESPONSE num=${num} session=${sid}]\n` +
    `timestamp: ${responseTsIso}\n` +
    `model: ${turn.responseModel}\n\n` +
    `${turn.response}\n\n`;

  fs.appendFileSync(filePath, entry, "utf8");

  // Update total_exchanges and last_prompt_time in the header.
  let full = fs.readFileSync(filePath, "utf8");
  full = full
    .replace(/^total_exchanges: .*$/m, `total_exchanges: ${num}`)
    .replace(/^last_prompt_time: .*$/m, `last_prompt_time: ${promptTsIso}`);
  fs.writeFileSync(filePath, full, "utf8");

  log(`captured exchange #${num} -> ${path.relative(REPO_ROOT, filePath)}`);
}

try {
  main();
} catch (e) {
  log("error:", e && e.stack ? e.stack : String(e));
  // Never fail the turn because of capture.
  process.exit(0);
}
