# Wedge: Grounded build-in-public

This is a **fork of [Postiz](https://github.com/gitroomhq/postiz-app)** (AGPL-3.0).
Postiz gives us the boring, expensive 90% — 20+ social platforms, scheduling,
a Canva-like editor, analytics, billing, a public API, and an MCP server. We
do not rebuild any of that. This fork adds the defensible 10% Postiz
structurally can't copy.

## The wedge

**Postiz for technical founders who build in public — it drafts from what you
*actually shipped*, in *your* voice.**

A generic AI assistant (what Postiz ships) writes generic posts. The moat is
**grounding + voice**, both of which require assets a horizontal tool doesn't have:

1. **Grounding — "never make up your own updates."** Pull the source of truth
   from work that already happened:
   - **Prism** (the founder's SuperMemory) — meetings, notes, decisions, repos.
   - **Skillfile-style repo/commit ingest** — what actually merged this week.
   A draft cites real shipped work instead of inventing plausible-sounding
   progress. This is the feature creators repeatedly fail at: remembering and
   accurately narrating what they did.

2. **Voice — sounds like you, not like an LLM.** A trained voice fingerprint
   (the `voice-writer` skill family) conditions generation on the founder's
   actual cadence, vocabulary, and CTA style, instead of Postiz's neutral
   assistant tone.

3. **Build-in-public workflow** — a loop tuned for the founder cadence
   (ship → draft from the diff/memory → review → schedule across X + LinkedIn),
   not the generic "compose a post" flow.

## Why this fork wins where posthive/v3nex couldn't

posthive ("AI Marketing OS") and v3nex ("AI Content Platform") were both
from-scratch generic builds — strictly dominated by Postiz (free, OSS, 30k★,
more complete, maintained). Neither had a moat. This fork inherits Postiz's
maturity and competes only on grounding + voice, where the founder's own stack
(Prism, Skillfile, voice-writer, content-engine) is the unfair advantage.

## ICP & distribution (grounded in founder-ops data)

- **ICP:** technical founders / AI builders who build in public.
- **Warmest list:** the **70 Anthropic Academy engineers** — already the #1
  channel for Skillfile, and the *exact* ICP here. Same list, zero new CAC.
- **Dogfood:** the founder already posts build-in-public 2×/wk on X + LinkedIn
  for Skillfile. User #1 from day one; the tool's own output is the marketing.
- **Portfolio fit:** Prism/Skillfile are the "know" layer; this is the "show"
  layer on top. Content-engine assets feed it.

## Scope discipline

Build as a **thin layer on Postiz**, dogfooded — **not** a second large build —
until Skillfile's launch lands. Do not let this steal Skillfile's runway. The
first milestone is the founder's own daily build-in-public running through it.

## License note

Postiz is **AGPL-3.0**. If we host a modified version as a network service, we
must offer the corresponding source. Keep `LICENSE` intact; track our additions
under `wedge/` and clearly-licensed app code.

## Salvaged inputs

- `salvage/from-posthive/` — PRD v2, design system, UI spec. Reusable **product
  & brand thinking** (the funnel logic, design tokens, security-UX framing).
- `salvage/from-v3nex/FEATURES.md` — feature inventory v3nex reached (most of it
  redundant with Postiz; kept for reference on billing tiers + provider scope).
- Full source of both is preserved in their **archived** GitHub repos
  (`rodriguescarson/posthive`, `rodriguescarson/v3nex`).
