---
title: Link
---

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

A **Link** navigates to a **URL or resource** (internal or external). It should look and behave like a link (typically underlined text), and it shouldn’t be used to trigger in-place actions. Use clear, descriptive link text so users know where they’ll land.

Links are derived from [typography guidelines](/design/global-tokens/typography).

---

### When to Use

- To navigate to **another page, route, or document** (internal or external).

- To reference **related content**, help docs, or terms & policies.

- To **download a file** via a direct URL (with explicit “Download …” text).

---

### When Not to Use

- For **actions that change data or state** in place – use [**Button**](/components/button)**.**

- For **opening temporary UI** (menus, dialogs, drawers) – use [**Button**](/components/button) as the trigger.

- For **non-navigational controls** (toggles, submits, filters) – use the appropriate form/action component.

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Write **descriptive link text**: say where it goes (“View pricing”), not “Click here”.

- Keep links **visually distinct** (underline by default; don’t rely on color alone).

- Indicate **external destinations** with an icon or helper text when useful.

- Place links inline with content; avoid turning long sentences into links – link only the necessary phrase.

- Avoid multiple, tightly spaced links that are hard to tap; ensure comfortable spacing.

- Don’t nest links; a link’s clickable area should be a single, clear target.

- For file links, include **type/size** when relevant (e.g., “Download PDF, 1.2 MB”).

- Prefer one **primary link style** across the product for consistency; reserve alternate styles (muted, subtle) for special contexts.
