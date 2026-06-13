# v3nex — feature inventory (for reference)

v3nex was a from-scratch "AI Content Creation Platform" (Next.js 14 + Supabase
+ OpenAI). Most of this is **redundant with Postiz** and not ported as code —
kept here only as a checklist of scope it reached, so nothing is forgotten.

## What it had

| Area | v3nex | Postiz equivalent |
|---|---|---|
| AI generation | OpenAI GPT-4 + DALL·E 3 | ✅ Postiz AI assistant + image gen (swap/extend) |
| Scheduling/calendar | custom calendar | ✅ Postiz core |
| Analytics dashboard | custom | ✅ Postiz core |
| Social integrations | Twitter, Instagram, Facebook, LinkedIn, TikTok (OAuth) | ✅ Postiz: 20+ platforms |
| Team collaboration | teams/workflows | ✅ Postiz orgs/teams |
| Billing | Stripe (Free/Premium/Enterprise tiers) | ✅ Postiz billing |
| Email | Mailchimp (audience) | — (add if needed) |
| Media management | upload images/videos | ✅ Postiz core |

## The only non-redundant learnings

- **Subscription tiering** (Free / Premium / Enterprise) — a pricing-shape
  reference for the wedge product.
- **Provider OAuth scope** — confirms the platforms an indie creator audience
  expects; all covered by Postiz.

## Not ported (deliberately)

The v3nex OAuth setup guides (Facebook/Instagram/ngrok/TikTok), Stripe wiring,
and app code — Postiz supersedes all of it with maintained implementations.
Full source preserved in the archived `rodriguescarson/v3nex` repo.
