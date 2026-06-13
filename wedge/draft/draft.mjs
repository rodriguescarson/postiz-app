#!/usr/bin/env node
// Grounded build-in-public draft generator — the wedge's core (see ../WEDGE.md).
//
// Input  : what you ACTUALLY shipped (git commits + diffstat from a repo).
// Voice  : ./voice.md (Carson's build-in-public voice).
// Output : on-voice X + LinkedIn draft posts, grounded in the real work.
//
// Self-contained on purpose: plain ESM, native fetch + git via child_process,
// no deps and NO entanglement with Postiz's Nx build. Postiz provides the
// scheduling/posting 90%; this is the 10% it can't copy. A later step pipes
// these drafts into Postiz via its API/MCP.
//
// Usage:
//   OPENROUTER_API_KEY=... node wedge/draft/draft.mjs [repoPath] [--since 7d] [--max 3] [--json]
//
// Future grounding sources (same shape): Prism memory export, Skillfile repo
// ingest. Today it reads git, which is the highest-signal "what shipped".

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const MODEL = "anthropic/claude-sonnet-4.6";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function sinceToGit(s) {
  const m = /^(\d+)([dwh])$/.exec(s);
  if (!m) return s; // pass through "2026-06-01" etc.
  const map = { d: "days", w: "weeks", h: "hours" };
  return `${m[1]} ${map[m[2]]} ago`;
}

function gitShipped(repo, since) {
  const opts = { cwd: repo, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 };
  const subjects = execFileSync(
    "git",
    ["log", `--since=${since}`, "--no-merges", "--pretty=format:- %s"],
    opts,
  ).trim();
  const stat = execFileSync(
    "git",
    ["log", `--since=${since}`, "--no-merges", "--stat", "--pretty=format:%n### %s"],
    opts,
  ).trim();
  return { subjects, stat: stat.slice(0, 6000) };
}

async function chat(messages) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY is not set");
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "X-Title": "Skillfile/Postiz wedge — build-in-public",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 2000, messages }),
  });
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = await res.json();
  const c = j.choices?.[0]?.message?.content;
  if (!c) throw new Error("no content from model");
  return c;
}

function extractJson(raw) {
  let t = raw.trim();
  const f = t.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (f?.[1]) t = f[1].trim();
  const a = t.indexOf("["), b = t.lastIndexOf("]");
  const o = t.indexOf("{"), p = t.lastIndexOf("}");
  if (a !== -1 && b > a) return t.slice(a, b + 1);
  if (o !== -1 && p > o) return t.slice(o, p + 1);
  return t;
}

async function main() {
  const repo = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : ".";
  const since = sinceToGit(arg("--since", "7d"));
  const max = Number(arg("--max", "3"));
  const asJson = process.argv.includes("--json");

  const voice = readFileSync(join(HERE, "voice.md"), "utf8");
  const { subjects, stat } = gitShipped(repo, since);
  if (!subjects) {
    console.error(`No commits in ${repo} since ${since}. Nothing to post about (good — don't fake it).`);
    process.exit(1);
  }

  const system = [
    "You write build-in-public social posts for a technical founder.",
    "GROUND every post in the supplied shipped-work. Never invent metrics, users, or outcomes not present.",
    "Match this voice exactly:",
    voice,
    `Return ONLY a JSON array of up to ${max} objects: ` +
      `[{ "platform": "x" | "linkedin", "text": string, "grounded_in": string }]. ` +
      "`grounded_in` cites the commit/feature the post is about. No markdown fences.",
  ].join("\n\n");

  const user = [
    `Here is what actually shipped (git, since ${since}):`,
    "",
    "Commit subjects:",
    subjects,
    "",
    "Changed files / scope:",
    stat,
    "",
    `Draft up to ${max} posts. Prefer the few most post-worthy changes; skip noise ` +
      "(deps, formatting). Mix X and LinkedIn. If little is post-worthy, return fewer.",
  ].join("\n");

  const out = await chat([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  let posts;
  try {
    posts = JSON.parse(extractJson(out));
  } catch {
    console.error("Model did not return JSON. Raw:\n" + out);
    process.exit(1);
  }

  if (asJson) {
    console.log(JSON.stringify(posts, null, 2));
    return;
  }
  for (const p of posts) {
    console.log(`\n━━ ${(p.platform || "?").toUpperCase()} ${"━".repeat(40)}`);
    console.log(p.text);
    if (p.grounded_in) console.log(`\n  ↳ grounded in: ${p.grounded_in}`);
  }
  console.log(`\n${posts.length} draft(s). Review, then schedule via Postiz.`);
}

main().catch((e) => {
  console.error(`draft failed: ${e.message}`);
  process.exit(1);
});
