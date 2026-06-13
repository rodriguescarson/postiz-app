#!/usr/bin/env node
// Bridge: grounded drafts → Postiz scheduling (the loop-closer for the wedge).
//
// Reads the JSON drafts produced by draft.mjs (--out / --json) and creates
// scheduled posts in a running Postiz instance via its public API. Default is
// DRY-RUN (prints the exact requests); pass --post to actually send.
//
// Env (all required for --post):
//   POSTIZ_URL              e.g. https://postiz.yourdomain.com  (your instance)
//   POSTIZ_API_KEY          public API key from Postiz settings
//   POSTIZ_CHANNEL_X        Postiz integration/channel id for X
//   POSTIZ_CHANNEL_LINKEDIN Postiz integration/channel id for LinkedIn
//
// Usage:
//   node wedge/draft/draft.mjs <repo> --since 7d --out drafts.json
//   node wedge/draft/schedule.mjs drafts.json [--when "2026-06-20T09:00:00Z"] [--post]
//
// NOTE: confirm the payload below against your Postiz version's public API
// (POST /public/v1/posts) — the field names have shifted across releases. It's
// isolated here so the rest of the wedge doesn't depend on Postiz internals.

import { readFileSync } from "node:fs";

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const CHANNEL_ENV = { x: "POSTIZ_CHANNEL_X", linkedin: "POSTIZ_CHANNEL_LINKEDIN" };

function buildRequest(draft, when) {
  const channelId = process.env[CHANNEL_ENV[draft.platform]];
  // Postiz public API shape (POST /public/v1/posts). Verify per your version.
  return {
    type: when ? "schedule" : "now",
    date: when || undefined,
    posts: [
      {
        integration: { id: channelId },
        value: [{ content: draft.text }],
      },
    ],
  };
}

async function main() {
  const file = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : null;
  if (!file) {
    console.error("usage: node schedule.mjs <drafts.json> [--when <ISO>] [--post]");
    process.exit(1);
  }
  const drafts = JSON.parse(readFileSync(file, "utf8"));
  const when = arg("--when", null);
  const post = process.argv.includes("--post");

  const url = process.env.POSTIZ_URL;
  const key = process.env.POSTIZ_API_KEY;

  for (const d of drafts) {
    const channelId = process.env[CHANNEL_ENV[d.platform]];
    const body = buildRequest(d, when);
    if (!post) {
      console.log(`\n[DRY-RUN] ${d.platform} → channel ${channelId || "(set " + CHANNEL_ENV[d.platform] + ")"}`);
      console.log("POST " + (url || "$POSTIZ_URL") + "/public/v1/posts");
      console.log(JSON.stringify(body, null, 2));
      continue;
    }
    if (!url || !key) throw new Error("POSTIZ_URL and POSTIZ_API_KEY are required for --post");
    if (!channelId) throw new Error(`${CHANNEL_ENV[d.platform]} is not set`);
    const res = await fetch(`${url}/public/v1/posts`, {
      method: "POST",
      headers: { Authorization: key, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Postiz ${res.status}: ${(await res.text()).slice(0, 300)}`);
    console.log(`scheduled ${d.platform} post`);
  }
  if (!post) console.log("\nDry run. Re-run with --post (and POSTIZ_* env) to schedule for real.");
}

main().catch((e) => {
  console.error(`schedule failed: ${e.message}`);
  process.exit(1);
});
