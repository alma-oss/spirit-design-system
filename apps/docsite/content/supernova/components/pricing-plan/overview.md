---
title: Pricing Plan
sourceUrl: https://spirit.supernova-docs.io/latest/components/pricing-plan/overview-PKE6hibE
sourcePath: /latest/components/pricing-plan/overview-PKE6hibE
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.069Z
---

- [Overview](/latest/components/pricing-plan/overview-PKE6hibE)
- [Design](/latest/components/pricing-plan/design-W86rn9AG)
- [Figma](/latest/components/pricing-plan/figma-0qmazwRJ-0qmazwRJ)
- [HTML](/latest/components/pricing-plan/html-43yubE7P)
- [React](/latest/components/pricing-plan/react-t473exn5)
- [Accessibility](/latest/components/pricing-plan/accessibility-ltYyOKgN-ltYyOKgN)

#### Component Status

Figma

\-

Status

Stable

HTML

Up to date

React

Up to date

### Overview

A **Pricing Plan** presents one or more purchasable options in a consistent, comparable layout. It typically appears as a set of plan cards (e.g., Free/Pro/Enterprise) with a shared anatomy, allowing users to compare and select quickly.

---

### Anatomy (per Plan)

- **Badges (optional)** – e.g., “Most popular”, “Best value”.

- **Plan name** – short, recognizable label (e.g., _Free_, _Pro_, _Enterprise_).

- **Price & billing period** – numeric price + unit (e.g., “€29 / month”). If there’s a toggle (Monthly/Annual), keep the unit explicit on every change.

- **Value prop / short description** – 1 short line that differentiates the plan.

- **Feature list** – concise bullets with consistent phrasing and order across plans.

- **Call-to-action** – primary button (“Start trial”, “Buy Pro”).

- **Footnotes / legal (optional)** – taxes, terms, or renewal notes; keep brief and link out for details.

---

### When to Use

- You need to present **multiple plans** side by side so users can **compare and choose**.

- You’re communicating **price + value** (not just a feature list).

- You want a **clear conversion path** with a primary CTA per plan.

---

### When Not to Use

- You’re only listing **capabilities without pricing** – use a **feature comparison or table**.

- The choice is **binary or tiny** (e.g., one add-on)– a **single** [**Card**](/latest/components/card/overview-9kNBP7gC) or inline [**Action Group**](/latest/components/action-group/overview-Bi5NXFGt) may suffice.

- The purchase requires **multi-step configuration** – use [**Modal**](/latest/components/modal/overview-1gk69bB0)**,** [**Drawer**](/latest/components/drawer/overview-DsjvffCu) flow or a dedicated **checkout**.

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

#### Comparison and Layout

- Keep **card anatomy identical** across plans; differences belong in content, not structure.

- **Align features** in the same order; use a ✓/— pattern for availability rather than prose.

- Limit to **3–4 primary plans**; move edge cases to “See all plans” or **Drawer/Modal** details.

- If highlighting one plan, do it **subtly** (badge + mild emphasis), not with overwhelming styling.

#### Pricing Clarity

- Always show the **billing unit** (e.g., “/month”, “/year”).

- If you offer **monthly vs annual** pricing, provide a **clear toggle** and update all prices and labels instantly.

- Disclose **VAT/fees** and renewal terms nearby (footnote with a link to full terms).

#### Content and Copy

- Write benefits as **short, scannable lines** (noun-first or verb-first consistently).

- Avoid jargon; explain limits plainly (e.g., “Up to 5 users”).

- Use **one primary CTA** per plan; secondary links (e.g., “Learn more”) should be visually lighter.

#### Responsiveness

- On small screens, **stack** plans vertically; keep the highlighted plan visible without long scrolling.

- Keep CTAs **above the fold** where possible; repeat the plan name near the button for context.

#### Ethics and Trust

- Avoid dark patterns (strikethrough “fake discounts”, hidden fees).

- If you compare against another plan, ensure the **comparison is fair and up-to-date**.

On this page

- [Overview](#section-overview-ef)
- [Anatomy (per Plan)](#section-anatomy-per-plan-8b)
- [When to Use](#section-when-to-use-04)
- [When Not to Use](#section-when-not-to-use-68)
- [Best Practices](#section-best-practices-dc)
