# PostHive — Product Requirements Document (PRD)

**Version:** 2.0  
**Status:** Draft → Review  
**Product:** PostHive — AI-Powered Marketing Operating System  
**Platform:** Supabase (BaaS)  

---


## 1. Executive Summary

PostHive is an **AI-powered Marketing Operating System** that transforms fragmented content workflows into a unified, automated pipeline. Built on **Supabase**, it enables marketing teams to go from raw idea to published, multi-platform campaign — with AI generation, collaborative editing, approval gates, and analytics-driven optimization.

**Pipeline:** Idea (Sticky Note) → AI Generation (3 Trials) → Edit/Refine → Approval → Campaign Flow → Auto-Publish → Analytics → AI Feedback Loop.

---

## 2. Product Vision & Goals

### Vision
Turn content marketing into a fast, intelligent growth engine by managing the entire content lifecycle in one place — with AI that learns what works.

### Core Objectives
| # | Objective | Key Result |
|---|-----------|------------|
| 1 | **Structured Collaboration** | Hierarchy-based teams with RBAC (Lead Strategist → Writer → Designer) |
| 2 | **Contextual AI** | Brand Knowledge Bases (per-team and global) powering generation via RAG |
| 3 | **Frictionless Ideation** | Sticky-note capture with text, photos, videos, and reference links |
| 4 | **Campaign Orchestration** | Primary assets triggering coordinated supporting content |
| 5 | **Autonomous Optimization** | Analytics feeding back into AI generation for continuous improvement |
| 6 | **Credit-Based Usage** | Fair, transparent AI usage via a credit system |
| 7 | **High Security** | RLS, encrypted storage, SOC 2-aligned practices, audit logging |

---

## 3. User Personas

| Persona | Role | Needs |
|---------|------|-------|
| **Marketing Lead / Strategist** | Approves content, manages strategy, oversees campaigns | Full dashboard, approval controls, analytics, team management |
| **Content Writer** | Creates drafts, iterates with AI, submits for review | Editor, AI assistant, idea board, draft management |
| **Designer** | Uploads and links media assets (images, videos) | Media library, asset linking, visual previews |
| **Ad Specialist** | Manages paid content and ad copy | Ad-specific templates, A/B variant support, budget tracking |
| **Organization Admin** | Manages billing, credits, team structure | Admin panel, credit management, user provisioning |

---

## 4. Authentication & User Management

### 4.1 Authentication (Supabase Auth)
- **Email/Password** sign-up with email verification (magic link or OTP).
- **OAuth Providers:** Google, LinkedIn, GitHub (extensible).
- **Multi-Factor Authentication (MFA):** TOTP-based MFA for all users (mandatory for admins).
- **Session Management:** JWT-based sessions via Supabase, configurable token expiry, refresh token rotation.
- **Password Policy:** Min 12 chars, uppercase, lowercase, number, special char. Breach-check via HaveIBeenPwned API.

### 4.2 Authorization (RBAC + RLS)
| Role | Permissions |
|------|-------------|
| **Org Admin** | Full org control: billing, credits, team CRUD, user management, audit logs |
| **Lead Strategist** | Approve/reject content, manage campaigns, view analytics, unlock flows |
| **Content Writer** | Create ideas, edit own drafts, request approval, use AI credits |
| **Designer** | Upload media, link assets to posts, view relevant content |
| **Viewer** | Read-only access to published content and analytics |

- Row-Level Security (RLS) policies on **every table** enforcing role + team scoping.
- Service-role keys used **only** in Edge Functions, never exposed to client.

### 4.3 Team & Organization Structure
- **Multi-tenancy:** Organization → Teams → Users.
- **Team Types:** LinkedIn, Instagram, Facebook, YouTube, Ads, Blog, Newsletter, etc.
- **Invitations:** Email-based invite flow with role pre-assignment.
- **SSO:** SAML/OIDC support for enterprise customers (Phase 2).

---

## 5. Credit System

### 5.1 Overview
All AI-powered actions consume **credits**. Credits provide usage transparency, cost control, and monetization.

### 5.2 Credit Actions
| Action | Credit Cost | Description |
|--------|-------------|-------------|
| AI Idea Scan | 1 credit | AI processes a sticky-note idea into a content brief |
| AI Generation (3 Trials) | 3 credits | Generate 3 content variations from a brief |
| AI Refinement | 1 credit | Tone/length/hook refinement on a draft |
| AI Image Generation | 5 credits | Generate an image asset from a prompt |
| AI Video Thumbnail | 3 credits | Generate a video thumbnail |
| Analytics Insight | 2 credits | AI-generated performance insight report |
| Campaign Auto-Flow | 2 credits | Auto-generate supporting content for a campaign |

### 5.3 Credit Tiers (Plans)
| Plan | Monthly Credits | Price | Extras |
|------|----------------|-------|--------|
| **Free** | 50 | $0 | 1 team, 2 users, 500 MB storage |
| **Starter** | 500 | $29/mo | 3 teams, 10 users, 5 GB storage |
| **Pro** | 2,000 | $79/mo | Unlimited teams, 25 users, 25 GB storage, priority AI |
| **Enterprise** | Custom | Custom | SSO, dedicated support, SLA, audit logs, custom KB |

### 5.4 Credit Mechanics
- Credits reset monthly on billing date.
- **Rollover:** Unused credits do NOT roll over (encourages consistent usage).
- **Top-ups:** Purchasable credit packs ($10 = 100 credits).
- **Usage Dashboard:** Real-time credit balance, usage history, per-user breakdown.
- **Alerts:** Notifications at 80%, 90%, and 100% usage thresholds.
- **Rate Limiting:** Max 20 AI requests/minute per org to prevent abuse.

---

## 6. Feature Layers

### Layer 1: Team Hierarchy & Roles
- Organization → Teams → Users with role-based hierarchy.
- Lead Strategist holds approval authority per team.
- Permissions enforced via Supabase RLS + application-level middleware.

### Layer 2: Brand Knowledge Base (RAG)
- **Global KB:** Company-wide brand guidelines, tone, terminology.
- **Team KBs:** Platform-specific context (e.g., professional tone for LinkedIn, visual-first for Instagram).
- **Storage:** Documents/PDFs in Supabase Storage; embeddings in pgvector.
- **Function:** AI references the active KB via vector similarity search before generation.

### Layer 3: Sticky-Note Idea Capture
- Quick-capture cards supporting:
  - **Text** — raw notes, copy-paste, voice-to-text.
  - **Photos** — upload images, screenshots, mood boards.
  - **Videos** — upload video files, YouTube/TikTok links with auto-metadata extraction.
  - **Reference Links** — URL with auto-preview (Open Graph scraping).
- Upon capture, AI scans idea + KB → produces a structured **Content Brief** (tone, platform, key message).

### Layer 4: Content Studio & Approval Flow
- **Collaborative Editor:** Rich text (Tiptap) with AI sidebar for "3 Trials" review, one-click refine.
- **Media Embedding:** Inline images and video previews within posts.
- **Workflow:** Idea → Draft → Edit → Discussion (threaded comments) → Lead Approval.
- **Multi-Platform Output:** Blog, Newsletter, LinkedIn, Instagram, Facebook, YouTube, X/Twitter.

### Layer 5: Campaign Flow & Auto-Publishing
- **Primary + Supporting:** Link a main asset (e.g., YouTube video) to multiple derived posts.
- **Auto-Generation:** When primary is scheduled, PostHive auto-generates supporting content (teaser −16h, recap +2h, etc.).
- **Smart Lock:** Flows lock after approval; changes to primary trigger re-evaluation prompts.
- **Publishing APIs:** Direct publish to LinkedIn, Meta (IG/FB), YouTube, X — via platform APIs.

### Layer 6: Analytics & Feedback Loop
- **Metrics Ingestion:** Pull engagement, reach, clicks, conversions from each platform.
- **AI Learning:** Pattern recognition → "Storytelling hooks are outperforming this week" → feed into next generation.
- **Reports:** Weekly/monthly AI-generated performance summaries.

### Layer 7: Media Management
- **Supabase Storage** for all media assets (images, videos, documents).
- **Image Processing:** Auto-resize, thumbnail generation, WebP conversion via Edge Functions.
- **Video Processing:** Upload → transcoding pipeline (via external service or ffmpeg on Edge), thumbnail extraction.
- **CDN Delivery:** Supabase Storage CDN for fast global delivery.
- **Quotas:** Storage limits per plan tier, file size limits (50 MB images, 500 MB videos).

---

## 7. Security Requirements

### 7.1 Data Protection
- **Encryption at Rest:** AES-256 (Supabase default for PostgreSQL + Storage).
- **Encryption in Transit:** TLS 1.3 for all connections.
- **Key Management:** Supabase-managed keys; app secrets in Supabase Vault.

### 7.2 Access Control
- **RLS on every table** — no exceptions.
- **Service-role keys** used only server-side (Edge Functions).
- **API rate limiting** — per-org and per-user.
- **CORS** — strict origin whitelist.
- **CSP headers** — enforce Content Security Policy.

### 7.3 Compliance & Audit
- **Audit Logging:** All write operations logged with actor, timestamp, resource, and action.
- **Data Residency:** Configurable Supabase project region (US, EU, APAC).
- **GDPR:** User data export (JSON), right-to-deletion, consent management.
- **SOC 2 Alignment:** Supabase is SOC 2 Type II certified; PostHive inherits + extends.

### 7.4 Application Security
- **Input Validation:** Zod schemas on all API inputs.
- **SQL Injection:** Prevented by Supabase client + parameterized queries.
- **XSS/CSRF:** Framework-level protections (Next.js) + CSP headers.
- **Dependency Scanning:** Automated via Dependabot / Snyk in CI.
- **Penetration Testing:** Quarterly (Phase 2+).

---

## 8. Scalability & Performance

- **Database:** Supabase Postgres with read replicas for analytics queries.
- **Connection Pooling:** Supabase built-in PgBouncer (transaction mode).
- **Edge Functions:** Stateless, auto-scaling serverless functions for AI orchestration.
- **Storage CDN:** Global edge caching for media delivery.
- **Caching:** Redis (Upstash) for hot data (credit balances, session metadata).
- **Queue Processing:** Background job processing via pg_cron + Edge Functions (or BullMQ via external worker if needed).
- **Target SLAs:** 99.9% uptime, <200ms API p95 latency, <2s AI generation initiation.

---

## 9. SDLC & Development Practices

### 9.1 Methodology
- **Agile/Scrum** — 2-week sprints, daily standups, sprint reviews.
- **Trunk-Based Development** — short-lived feature branches, frequent merges to `main`.

### 9.2 Environments
| Environment | Purpose | Supabase Project |
|-------------|---------|-----------------|
| `local` | Development | Local Supabase (Docker) |
| `staging` | QA / UAT | Separate Supabase project |
| `production` | Live | Production Supabase project |

### 9.3 Quality Gates
- **Linting:** ESLint + Prettier (enforced in CI).
- **Type Safety:** TypeScript strict mode, no `any`.
- **Testing:**
  - Unit tests (Vitest) — ≥80% coverage on business logic.
  - Integration tests — Supabase local + test fixtures.
  - E2E tests (Playwright) — critical user flows.
- **Code Review:** Mandatory PR reviews, min 1 approver.
- **Security Scan:** Automated dependency + SAST scanning in CI/CD.

### 9.4 CI/CD Pipeline
```
Push → Lint → Type Check → Unit Tests → Integration Tests → Build → Deploy (Staging) → E2E → Deploy (Production)
```

### 9.5 Monitoring & Incident Response
- **Error Tracking:** Sentry.
- **Metrics:** Supabase Dashboard + custom dashboards (Grafana).
- **Alerting:** PagerDuty/Opsgenie for P1 incidents.
- **Runbooks:** Documented incident response procedures.

---

## 10. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to Publish | 60% reduction from idea to published post | Average pipeline duration |
| Engagement Growth | 20% MoM improvement in AI-optimized content | Platform analytics |
| Operational Efficiency | 40% reduction in tool-switching | User surveys + session analytics |
| Credit Utilization | >70% monthly credit usage per active org | Internal dashboard |
| Uptime | 99.9% | Monitoring |
| Security Incidents | 0 critical vulnerabilities in production | Security scanning + audits |

---

## 11. Phased Roadmap

| Phase | Timeline | Scope |
|-------|----------|-------|
| **Phase 1 — MVP** | Weeks 1–8 | Auth, teams, idea capture (text + images), AI generation (3 trials), basic editor, credit system, Supabase Storage |
| **Phase 2 — Campaigns** | Weeks 9–14 | Campaign flows, auto-publishing (LinkedIn, Meta), video support, analytics ingestion |
| **Phase 3 — Intelligence** | Weeks 15–20 | RAG knowledge bases, feedback loop, advanced analytics, AI image generation |
| **Phase 4 — Enterprise** | Weeks 21+ | SSO/SAML, audit logs, data residency, custom plans, API access, white-labeling |