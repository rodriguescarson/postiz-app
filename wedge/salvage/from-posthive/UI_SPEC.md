# PostHive UI/UX Master Specification (v2.0)

This document serves as the definitive guide for generating and implementing the PostHive user interface. It combines Neo-Brutalist energy for marketing with high-efficiency SaaS layouts for the product dashboard.

---

## 1. Visual Identity & Design Tokens

### 1.1 Color Palette
| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary (Electric Purple)** | `#6C4DFF` | Buttons, Active States, Logo, Brand Accents |
| **Secondary (Neon Green)** | `#B6FF3B` | Success, CTAs, Growth Indicators, Highlights |
| **Deep Background** | `#0F0F12` | Dark Mode Base, Landing Page Sections |
| **Surface (Dark)** | `#1A1A22` | Cards, Panels, Modals (Dark Mode) |
| **Surface (Light)** | `#FFFFFF` | Primary Content Area (Light Mode) |
| **Border (Brutal)** | `#000000` | Thick 2-4px borders for Neo-Brutalist elements |
| **Cream Accent** | `#F9F7F2` | Background for Landing/Auth pages |

### 1.2 Typography
- **Headings (Display):** `Space Grotesk` (Semi-Bold/Bold). Tracking: `-0.02em`.
- **Body / UI:** `Inter`. Weight: `400` (Regular), `500` (Medium), `600` (Semi-Bold).
- **Data / Monospace:** `JetBrains Mono`. Usage: Credits, timestamps, IDs.

### 1.3 Shadow & Elevation
- **Brutal Shadow:** `4px 4px 0px #000000` (Used on buttons/cards in landing/auth).
- **Glassmorphism:** `rgba(255, 255, 255, 0.05)` background with `20px` blur and `1px` white border (alpha 0.1).
- **Soft UI Elevation:** `0 8px 32px 0 rgba(0, 0, 0, 0.37)` (Used for dashboard cards).

---

## 2. Core Component Blueprints

### 2.1 The "Brutal" Button (Marketing)
- **Base:** Thick `2px` black border.
- **Background:** Primary or Secondary color.
- **Hover State:** Translate `-2px, -2px` with a matching shadow increase.
- **Typography:** Uppercase, Bold Space Grotesk.

### 2.2 The "Sticky Note" Idea Card (Dashboard)
- **Background:** Variants of soft pastel (Yellow: `#FFF9C4`, Blue: `#E3F2FD`, Green: `#F1F8E9`).
- **Header:** Platform icon (top-left), Status Chip (top-right).
- **Body:** Multi-line truncation for preview text.
- **Footer:** Relative time (e.g., "2h ago") and Team Name.

### 2.3 The "Trial" Variation Card (Editor Sidebar)
- **Structure:** Vertical stack. 
- **Header:** "Trial 1/3", "Trial 2/3", etc.
- **Content:** Markdown-rendered preview of AI output.
- **Action:** "Use this Variation" (Primary Button) + "Refine" (Outline Button).

---

## 3. Layout Architectures

### 3.1 Marketing Site (Neo-Brutalist)
- **Grid:** Non-traditional, high-contrast.
- **Sections:** Separated by thick black horizontal rules or high-contrast color shifts.
- **Animations:** Framer Motion "Slide up + Fade" on scroll.

### 3.2 Product Dashboard (Dual-Pane)
- **Sidebar (Left):** 260px width. Nav items with Lucide icons. Credit balance progress bar at the bottom.
- **Main Area:** Centered container (`max-width: 1200px`) with 32px padding.
- **Contextual Sidebar (Right):** Only visible in the Editor. 360px width for AI Tools/Settings.

---

## 4. Page-Specific Guidelines

### 4.1 Idea Board (`/dashboard/ideas`)
- **Layout:** Masonry or dynamic grid.
- **Empty State:** Large graphic centered with a "Capture Idea" Floating Action Button (FAB).
- **Interaction:** Clicking a card opens a "Quick Scan" modal showing AI-extracted entities.

### 4.2 Content Studio (`/dashboard/editor/[id]`)
- **Canvas:** Tiptap-powered white paper surface centered.
- **Toolbar:** Floating or sticky top-bar with formatting tools.
- **AI Sidebar:** Persistent on the right. Shimmer effects during generation. "Typing" animation for incoming AI text.

### 4.3 Campaign Flow (`/dashboard/flows`)
- **Visual:** Vertical tree. 
- **Root Node:** The "Primary Content" (e.g., YouTube Video).
- **Child Nodes:** "Supporting Content" (e.g., LinkedIn teaser, X thread).
- **Connectors:** Dotted lines showing temporal offsets (e.g., `+2h`, `-1d`).

---

## 5. Interaction States (The "Agentic" Feel)

### 5.1 AI Processing (Scanning/Generating)
- **Visual:** Shimmer/Skeleton loader on the specific field being updated.
- **Text:** Subtle cycling status messages (e.g., "Extracting brand voice...", "Optimizing for LinkedIn algorithms...").
- **Haptic:** Subtle scaling pulses on "Magic" buttons.

### 5.2 Credit Feedback
- **Deduction:** When an AI action is clicked, a small `-3` credit badge floats up and fades (Electric Purple).
- **Insufficient Credits:** UI elements involving AI should be "Locked" (grayscale with a lock icon) and trigger a Top-Up Modal on click.

### 5.3 Error Handling
- **Toast Notifications:** Bottom-left. Red border for errors, Neon Green for success.
- **Validation:** Real-time inline validation (Inter 12px) below inputs.

---

## 6. Implementation Checklist for LLM Generation
1. Use **MUI (Material UI)** for base components.
2. Extend MUI theme using `src/styles/theme.ts`.
3. Use **Lucide-React** for iconography.
4. Apply **Framer Motion** for all transitions (Fade, Scale, Slide).
5. Ensure **Responsive** breakpoints: Mobile (<768px), Tablet (<1024px), Desktop (>1024px).
6. Use **Zod** for all form validation and Prop types.
