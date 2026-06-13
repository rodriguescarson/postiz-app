# PostHive — Design Document

**Version:** 2.0  
**Status:** Draft → Review  
**Design Philosophy:** Bold Expression (Landing) + Structured Productivity (Dashboard) + Trust Signals (Security UX).  

---

## 1. Design System Foundation

### 1.1 Typography
| Usage | Font | Weight | Fallback |
|-------|------|--------|----------|
| **Headings** | Space Grotesk | 600 (Semi-Bold), 700 (Bold) | `system-ui, sans-serif` |
| **Body / UI** | Inter | 400, 500, 600 | `system-ui, sans-serif` |
| **Code / Data** | JetBrains Mono | 400, 500 | `monospace` |

### 1.2 Color System

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| **Primary** | `#6C4DFF` (Electric Purple) | `#8B73FF` | Buttons, active states, links |
| **Primary Hover** | `#5A3DE8` | `#A08FFF` | Interactive hover states |
| **Secondary / Accent** | `#B6FF3B` (Neon Green) | `#C8FF66` | CTAs, success highlights, badges |
| **Background** | `#FFFFFF` / `#F9F7F2` (Cream) | `#0F0F12` | Page backgrounds |
| **Surface** | `#FFFFFF` | `#1A1A22` | Cards, panels, modals |
| **Surface Elevated** | `#F5F5F5` | `#252530` | Sidebar, top bar, dropdowns |
| **Text Primary** | `#1A1A2E` | `#F0F0F5` | Headings, body text |
| **Text Secondary** | `#6B7280` | `#9CA3AF` | Captions, labels, metadata |
| **Border** | `#E5E7EB` | `#2D2D3A` | Dividers, card outlines |
| **Success** | `#22C55E` | `#34D399` | Published, approved |
| **Warning** | `#F59E0B` | `#FBBF24` | Pending review, low credits |
| **Error** | `#EF4444` | `#F87171` | Failed, rejected, validation |
| **Info** | `#3B82F6` | `#60A5FA` | Informational badges |

### 1.3 Spacing & Layout
- **Grid:** 8px base unit. Spacing tokens: `4, 8, 12, 16, 24, 32, 48, 64, 96`.
- **Border Radius:** `4px` (inputs), `8px` (cards), `12px` (modals), `9999px` (pills/chips).
- **Max Content Width:** 1280px (dashboard), 1440px (landing page).
- **Sidebar Width:** 260px (expanded), 72px (collapsed).

### 1.4 Elevation & Shadows
| Level | Value | Usage |
|-------|-------|-------|
| **None** | `none` | Flat elements (Neo-Brutalism landing) |
| **Low** | `0 1px 3px rgba(0,0,0,0.1)` | Cards, inputs |
| **Medium** | `0 4px 12px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| **High** | `0 8px 24px rgba(0,0,0,0.15)` | Modals, dialogs |
| **Brutal** | `4px 4px 0px #000` | Landing page cards (Neo-Brutalism) |

---

## 2. Landing Page: Neo-Brutalist Identity

### 2.1 Visual Style
- **Background:** Soft Cream (`#F9F7F2`) with white card surfaces.
- **Borders:** Thick black (`2–4px`), sharp corners on hero elements.
- **Shadows:** Non-blurred drop shadows (`4px 4px 0px #000`).
- **Color Pops:** Electric Purple + Neon Green for high-energy CTAs.
- **Photography:** None — use bold illustrations, geometric shapes, and abstract patterns.

### 2.2 Page Sections
| Section | Content | Design Notes |
|---------|---------|-------------|
| **Hero** | Headline + subheading + CTA + product screenshot | "The AI Content Brain for Your Marketing Team." Large Space Grotesk heading, brutal shadow on CTA button |
| **Social Proof** | Logo bar of partner/client brands | Grayscale logos on cream background |
| **Features** | 3-column grid of feature cards | Thick borders, icon + heading + description per card |
| **How It Works** | 4-step horizontal flow | Numbered steps with connecting arrows, icons |
| **Pricing** | 3–4 tier cards (Free / Starter / Pro / Enterprise) | Highlighted "Pro" card with accent border, credit counts prominent |
| **Testimonials** | Quote cards with avatar + name + role | Rotational carousel, brutal shadow cards |
| **Footer** | Links + newsletter signup | Clean, minimal |

### 2.3 Auth Pages (Landing Context)
| Page | Design |
|------|--------|
| **Sign Up** | Split layout: Left = brand illustration + value prop, Right = sign-up form. Email/password + Google/LinkedIn OAuth buttons. Clean, minimal — no Neo-Brutalism clutter. |
| **Login** | Same split layout. Email/password + OAuth + "Forgot Password" link. |
| **Magic Link Sent** | Centered card with email icon + "Check your inbox" message. |
| **MFA Setup** | Step-by-step: QR code display → verify code → backup codes. Progress indicator (1/3, 2/3, 3/3). |
| **Forgot Password** | Simple centered form: email input → submit → confirmation. |
| **Accept Invite** | Pre-filled email, org name displayed, set password form. |

---

## 3. Dashboard: Professional SaaS (MUI)

### 3.1 Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│  Top Bar                                                         │
│  [☰ Toggle] [PostHive Logo]    [Search]   [+ New] [🔔] [Avatar] │
├──────────┬───────────────────────────────────────────────────────┤
│ Sidebar  │  Main Content Area                                    │
│          │                                                       │
│ 📋 Ideas │  ┌─────────────────────────────────────────────┐     │
│ 📝 Editor│  │  Page Header + Breadcrumb                    │     │
│ 📅 Sched.│  │                                              │     │
│ 🔄 Flows │  │  Content Area (varies by module)             │     │
│ 📊 Analyt│  │                                              │     │
│ 📚 KB    │  │                                              │     │
│ 👥 Team  │  └─────────────────────────────────────────────┘     │
│ ⚙️ Setti.│                                                       │
│          │  ┌─────────────────────────────────────────────┐     │
│ ─────── │  │  Status Bar / Quick Actions                   │     │
│ 💳 Cred. │  └─────────────────────────────────────────────┘     │
│ 🔒 Secur.│                                                       │
└──────────┴───────────────────────────────────────────────────────┘
```

### 3.2 Top Bar
- **Left:** Sidebar toggle (hamburger), PostHive logo (link to dashboard home).
- **Center:** Global search (Cmd+K shortcut, searches ideas, posts, team members).
- **Right:** Quick-add button ("+" → New Idea / New Post / Upload Media), notification bell (badge count from Supabase Realtime), user avatar → profile dropdown (Profile, Settings, Logout).

### 3.3 Sidebar Navigation
- **Collapsible:** 260px → 72px (icons only). Persists user preference.
- **Sections:**
  - **Main:** Ideas, Editor, Scheduled, Flows, Analytics, Knowledge Base.
  - **Team:** Team Members, Roles & Permissions.
  - **System:** Settings, Credit Usage, Security & Audit.
- **Bottom:** Credit balance indicator (color-coded: green / amber / red).
- **Team Switcher:** Dropdown at top of sidebar to switch between teams.

---

## 4. Module-Specific UI

### 4.1 Idea Board

| Element | Design |
|---------|--------|
| **Layout** | Masonry grid of "sticky note" cards (card-based, not Kanban). |
| **Card** | Soft background tint (yellow, blue, green, pink), rounded corners. Title, snippet, status chip, media thumbnail (if attached). |
| **Status Chips** | `Draft` (gray), `Scanning` (blue, animated pulse), `Briefed` (green), `Archived` (muted). |
| **Quick Actions** | Hover → "Generate Content", "Edit", "Archive" icon buttons. |
| **New Idea FAB** | Floating action button (bottom-right) → opens quick-capture modal. |
| **Quick-Capture Modal** | Large text area + drag-and-drop zone for images/videos + URL paste field. "Scan with AI" button (shows credit cost). |

### 4.2 Content Editor

| Element | Design |
|---------|--------|
| **Layout** | 2-column: Left = Tiptap editor (MUI Paper surface), Right = AI sidebar panel. |
| **Editor** | Rich text with inline image/video embedding. Toolbar: bold, italic, heading, list, link, media upload, emoji. |
| **AI Sidebar** | Chat-like interface. Shows "3 Trials" as selectable cards (Trial 1 / 2 / 3). Click to preview → "Use This" button. "Refine" button with options (tone, length, hook). Shows credit cost per action. |
| **Status Bar** | Bottom: Word count, platform target (LinkedIn / Instagram / etc.), last saved, collaborator avatars (via Realtime Presence). |
| **Media Insert** | Drag-and-drop or click to upload. Progress bar during upload. Inline preview after upload. |

### 4.3 Campaign Flow Builder

| Element | Design |
|---------|--------|
| **Layout** | Vertical timeline view (primary post at top, supporting posts below with time offsets). |
| **Primary Card** | Large card, purple left border, platform icon, status, scheduled time. |
| **Supporting Cards** | Smaller cards connected to primary via vertical line + offset label (e.g., "−16h", "+2h"). |
| **Interaction** | Drag-and-drop to reorder. Click card → slide-out detail panel. |
| **Lock Indicator** | 🔒 icon on locked flows. "Unlock" button visible only to Lead Strategists. |
| **Empty State** | "Create your first campaign" illustration + CTA. |

### 4.4 Analytics Dashboard

| Element | Design |
|---------|--------|
| **Layout** | Top = summary KPI cards (Impressions, Engagements, Clicks, Published), Bottom = chart area. |
| **KPI Cards** | Metric value (large), delta badge (+12% ↑ green or −5% ↓ red), sparkline mini-chart. |
| **Charts** | Line chart (engagement over time), bar chart (per-platform performance), pie/donut (content type distribution). |
| **AI Insights** | Card with lightbulb icon: "Storytelling hooks outperformed this week by 23%." Clickable → detail view. |
| **Date Range** | Selector in top-right: 7d / 30d / 90d / custom. |

### 4.5 Knowledge Base Manager

| Element | Design |
|---------|--------|
| **Layout** | Table/list view of documents per team (or global). |
| **Columns** | Title, type (brand guide / tone doc / template), status (pending / indexed / error), chunks, uploaded date. |
| **Upload** | Drag-and-drop zone at top. Accepted: PDF, DOCX, TXT, MD. |
| **Processing** | Animated progress bar during embedding. Status chip updates in Realtime. |

### 4.6 Media Library

| Element | Design |
|---------|--------|
| **Layout** | Grid view with thumbnail previews. Toggle: grid / list. |
| **Filters** | Type (image / video / document), date, uploader. |
| **Upload** | Drag-and-drop zone. Multi-file support. Progress indicators per file. |
| **Preview** | Click thumbnail → lightbox with full preview, metadata (dimensions, size, type), "Copy URL" button. |
| **Storage Indicator** | Progress bar showing used / total storage per plan. |

---

## 5. Credit System UI

### 5.1 Credit Balance (Sidebar)
- Always visible at bottom of sidebar.
- Format: `⚡ 1,420 / 2,000 credits` with progress bar.
- Color coding: Green (>50%), Amber (20–50%), Red (<20%).

### 5.2 Credit Usage Page (Settings)
| Element | Design |
|---------|--------|
| **Summary Cards** | Current balance, monthly quota, days until reset, top-up CTA. |
| **Usage Chart** | Bar chart showing daily credit consumption (last 30 days). |
| **Transaction History** | Table: date, user, action, credits used, balance after. Filterable by user/action. |
| **Per-User Breakdown** | Pie chart showing credit usage distribution by team member. |
| **Top-Up Button** | Opens Stripe Checkout for credit packs. |

### 5.3 Inline Credit Indicators
- Every AI action button shows credit cost: `✨ Generate (3 credits)`.
- Disabled state with tooltip when balance insufficient: "Insufficient credits. Top up or wait for monthly reset."
- Confirmation dialog for high-cost actions (≥5 credits).

---

## 6. Security UX

### 6.1 MFA Setup Flow
- **Settings → Security → Enable MFA.**
- Step 1: Display QR code + manual entry key. Authenticator app instruction.
- Step 2: Enter 6-digit TOTP code to verify.
- Step 3: Display backup codes (one-time download, warn user to save).
- Visual: Progress stepper (1 / 2 / 3), green checkmarks on completion.

### 6.2 Session Management
- **Settings → Security → Active Sessions.**
- Table: Device, browser, IP location (approximate), last active, "Revoke" button.
- "Revoke All Other Sessions" danger button with confirmation.

### 6.3 Audit Log Viewer (Org Admin)
- **Settings → Security → Audit Log.**
- Table: Timestamp, actor (avatar + name), action, resource, IP.
- Filters: Date range, actor, action type.
- Export: CSV download for compliance.

### 6.4 Trust Signals
- 🔒 Lock icon in browser + "Secured by Supabase" footer badge.
- HTTPS-only indicator in settings.
- Data residency region displayed in settings (e.g., "Your data is stored in US-East-1").

---

## 7. Notification System

### 7.1 In-App Notifications
- Bell icon in top bar with unread badge count.
- Dropdown panel: list of notifications, grouped by today / earlier.
- Types with icons:
  - 📝 Approval request (amber)
  - ✅ Approved (green)
  - ❌ Rejected (red)
  - ⚡ Credits low (amber)
  - 🚀 Published (green)
  - ❗ Publish failed (red)
  - 💬 Comment / mention (blue)

### 7.2 Email Notifications
- Digest emails (configurable: instant / daily / off per type).
- Critical alerts always sent: publish failures, security events.

---

## 8. Interaction Design

### 8.1 Micro-Interactions
| Trigger | Animation | Duration |
|---------|-----------|----------|
| Card hover | Scale 1.02 + shadow lift | 200ms ease |
| Button click | Scale 0.97 → 1.0 (press) | 150ms |
| Status change | Chip color fade + subtle shake | 300ms |
| AI generating | Typing dots animation + shimmer | Continuous |
| Page transition | Fade + slide (Framer Motion) | 250ms |
| Notification | Slide in from top-right | 300ms spring |
| Modal open | Fade overlay + scale-up content | 200ms ease |

### 8.2 Loading States
| Context | Pattern |
|---------|---------|
| **Data loading** | Skeleton screens matching content shape |
| **AI generation** | Shimmer + "Generating..." with typing dots |
| **File upload** | Progress bar with percentage + cancel button |
| **Navigation** | Top-bar progress line (NProgress-style) |

### 8.3 Empty States
- Custom illustrations per module (idea board, analytics, flows).
- Clear heading + description + primary CTA.
- Example: "No ideas yet. Capture your first spark →"

---

## 9. Responsive Design

### 9.1 Breakpoints
| Name | Width | Layout |
|------|-------|--------|
| **Mobile** | < 768px | Single column, bottom nav, no sidebar |
| **Tablet** | 768px – 1024px | Collapsed sidebar (icons), simplified content |
| **Desktop** | 1024px – 1440px | Full sidebar + content area |
| **Wide** | > 1440px | Full sidebar + content + optional right panel |

### 9.2 Mobile Optimizations
- **Bottom Navigation:** Quick access to Ideas, Editor, Scheduled, Notifications.
- **Simplified Views:** Read/approve focus — full editing on desktop.
- **Touch Targets:** Minimum 44px × 44px for all interactive elements.
- **Swipe Gestures:** Swipe right on notification to mark read, swipe on cards for quick actions.

---

## 10. Dark Mode

- Toggle in settings + respect system preference.
- **Not** a simple inversion — custom dark palette (see §1.2 Color System).
- Reduced contrast for comfortable extended use.
- Syntax highlighting in editor adapts to dark theme.
- Charts use adjusted color palettes for visibility.

---

## 11. Accessibility (WCAG 2.1 AA)

- **Color Contrast:** All text meets 4.5:1 minimum contrast ratio.
- **Focus Indicators:** Visible focus rings on all interactive elements.
- **Keyboard Navigation:** Full keyboard support for all workflows.
- **Screen Reader:** Semantic HTML, ARIA labels, live regions for notifications.
- **Reduced Motion:** `prefers-reduced-motion` disables animations.
- **Alt Text:** Required for all uploaded media (prompted during upload).
