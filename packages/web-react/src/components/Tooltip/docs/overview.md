---
title: Tooltip
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

A **Tooltip** provides short, auxiliary information on **hover, focus, or tap** without cluttering the UI. It clarifies an element’s purpose or explains a control briefly, then dismisses when the user moves away.

---

### When to Use

- To add **concise context** to an icon, label, or control (e.g., clarifying what a field does).

- To show **brief hints** that don’t warrant persistent text.

- To supplement **icon-only controls** with meaning on focus/hover.

---

### When Not to Use

- **Long or complex content** (paragraphs, multi-step guidance, decisions). Use a [**Modal**](/components/modal) or inline copy instead.

- **Interactive content** (forms, links, buttons). Prefer [**Modal**](/components/modal), [**Toast**](/components/toast) or [**Tabs**](/components/tabs) depending on intent.

- **Essential instructions** required to complete a task – place them inline so they’re always visible.

- As a replacement for **labels**; labels should remain visible.

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep copy **short** (a sentence or two). Avoid line breaks and rich formatting.

- Make the trigger **focusable**; show on **keyboard focus** as well as hover.

- Ensure placement doesn’t obscure the trigger; adjust on small screens or consider alternative patterns.

- Use a **consistent delay** (fast in, fast out) to avoid flicker.

- Prefer **inline help text** over tooltips when context is always needed.
