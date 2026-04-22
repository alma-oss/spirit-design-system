---
title: Pagination
sourceUrl: https://spirit.supernova-docs.io/latest/components/pagination/overview-QHJlrlJm
sourcePath: /latest/components/pagination/overview-QHJlrlJm
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:23.080Z
---

- [Overview](/latest/components/pagination/overview-QHJlrlJm)
- [Design](/latest/components/pagination/design-o0JsRcsv)
- [Figma](/latest/components/pagination/figma-Dif18GDR-Dif18GDR)
- [HTML](/latest/components/pagination/html-umyhOsL2)
- [React](/latest/components/pagination/react-YVQEmBpb)
- [Accessibility](/latest/components/pagination/accessibility-EnLY6JuG-EnLY6JuG)

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

**Pagination** divides large sets of content into **numbered pages** and provides controls to move between them (previous/next and direct page links). It helps users navigate long lists (e.g., search results, catalog items) without overwhelming the page.

Current pagination is based on the Jobs.cz SERP user’s behavior.

---

### When to Use

- Lists or results that are **too long** to show on a single page.

- When users may need to **jump to specific pages** (not just “load more”).

- When the total count of items/pages is meaningful and users benefit from **positional awareness** (“page 3 of 12”).

---

### When Not to Use

- If users should **scan continuously** or the total isn’t important – consider **infinite scroll** or “**Load more”**.

- For **switching between related content areas** on the same page – use [**Tabs**](/latest/components/tabs/overview-c7gB7K6t).

- For **site/app navigation** between sections – use [**Navigation**](/latest/components/navigation/overview-J6GGfZ2s) (menus, header, sidebar).

- For **stepped workflows** – use **progress indicator** (stepper).

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Show **previous/next** and a concise window of page numbers; truncate long ranges with an **ellipsis**.

- Clearly indicate the **current page**; keep disabled states obvious for unavailable links (e.g., “Previous” on page 1).

- Keep the control **compact and consistent**; place it predictably (commonly above and/or below lists).

- Reflect real data: if server-side, disable controls while loading; update counts and current page state accurately.

- On smaller screens, Pagination collapses to fewer visible numbers while still providing Previous/Next for reliable navigation.

- Use clear, predictable labels (“Previous”, “Next”) and avoid ambiguous icons alone.

On this page

- [Design Usage](#section-design-usage-e2)
- [When to Use](#section-when-to-use-22)
- [When Not to Use](#section-when-not-to-use-95)
- [Best Practices](#section-best-practices-2a)
