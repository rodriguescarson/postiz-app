# wedge/draft — grounded build-in-public generator

The wedge's working core (see [`../WEDGE.md`](../WEDGE.md)). Postiz gives the 90%
(scheduling, 20+ platforms, editor); this is the 10% it can't copy: drafting
build-in-public posts **grounded in what you actually shipped**, in **your voice**.

## Run

```bash
OPENROUTER_API_KEY=... node wedge/draft/draft.mjs [repoPath] [--since 7d] [--max 3] [--json]
```

- `repoPath` — repo to read shipped work from (default `.`)
- `--since`  — `7d` / `2w` / `24h` / or a date (default `7d`)
- `--max`    — max drafts (default `3`)
- `--json`   — emit JSON (for piping into Postiz scheduling)

Example:

```bash
node wedge/draft/draft.mjs ~/projects/rfs/skillfile --since 7d --json
```

## Schedule into Postiz (loop-closer)

```bash
# 1. generate + persist
node wedge/draft/draft.mjs <repo> --since 7d --out drafts.json
# 2. dry-run (prints the exact Postiz API requests — safe, no instance needed)
node wedge/draft/schedule.mjs drafts.json --when "2026-06-22T09:00:00Z"
# 3. for real (needs a running Postiz + connected channels)
POSTIZ_URL=… POSTIZ_API_KEY=… POSTIZ_CHANNEL_X=… POSTIZ_CHANNEL_LINKEDIN=… \
  node wedge/draft/schedule.mjs drafts.json --when "…" --post
```

`schedule.mjs` posts to Postiz's public API (`POST /public/v1/posts`) — the one
seam that depends on a running Postiz instance + connected X/LinkedIn channels
(see [`../notes/social-oauth-setup.md`](../notes/social-oauth-setup.md)). Confirm
the payload matches your Postiz version.

## How it works

1. **Ground:** reads real git commits + changed-file scope since `--since`
   (the highest-signal "what shipped"). Refuses to run if nothing shipped —
   *don't fake a build-in-public post.*
2. **Voice:** conditions the model on [`voice.md`](voice.md) (swap in the
   `voice-writer-carson-en` corpus for a sharper fingerprint).
3. **Draft:** returns up to N on-voice X + LinkedIn drafts, each citing the
   commit/feature it's grounded in. Never invents metrics/users.

## Design

Plain ESM, zero deps, native `fetch` + git — **no entanglement with Postiz's Nx
build**. The drafts are reviewed by a human, then scheduled through Postiz
(API/MCP) — a later integration step.

## Roadmap (other grounding sources, same shape)

- **Prism** memory export → ground posts in decisions/notes, not just commits.
- **Skillfile** repo ingest → richer "what changed and why".
