---
title: Tooltip
sourceUrl: https://spirit.supernova-docs.io/latest/components/tooltip/overview-zhGH30af
sourcePath: /latest/components/tooltip/overview-zhGH30af
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:34.932Z
---

- [Overview](/latest/components/tooltip/overview-zhGH30af)
- [Design](/latest/components/tooltip/design-08uxcGKD)
- [Figma](/latest/components/tooltip/figma-0ZlKs0M7-0ZlKs0M7)
- [HTML](/latest/components/tooltip/html-fxoORGmr)
- [React](/latest/components/tooltip/react-ZI9bYUzJ)
- [Accessibility](/latest/components/tooltip/accessibility-TVRyDsew-TVRyDsew)

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

- **Long or complex content** (paragraphs, multi-step guidance, decisions). Use a [**Modal**](/latest/components/modal/overview-1gk69bB0) or inline copy instead.

- **Interactive content** (forms, links, buttons). Prefer [**Modal**](/latest/components/modal/overview-1gk69bB0), [**Toast**](/latest/components/toast/overview-fGKpsqnF) or [**Tabs**](/latest/components/tabs/overview-c7gB7K6t) depending on intent.

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

On this page

- [Design Usage](#section-design-usage-e2)
- [When to Use](#section-when-to-use-24)
- [When Not to Use](#section-when-not-to-use-89)
- [Best Practices](#section-best-practices-a0)
