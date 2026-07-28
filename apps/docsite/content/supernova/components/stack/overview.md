---
title: Stack
sourceUrl: https://spirit.supernova-docs.io/latest/components/stack/overview-RCo1HEot
sourcePath: /latest/components/stack/overview-RCo1HEot
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:31.822Z
---

- [Overview](/latest/components/stack/overview-RCo1HEot)
- [Design](/latest/components/stack/design-16geyRgi)
- [HTML](/latest/components/stack/html-Q4OhL0rC)
- [React](/latest/components/stack/react-uuzEJkd0)
- [Accessibility](/latest/components/stack/accessibility-Uv3oQ7If-Uv3oQ7If)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

The **Stack** is a layout utility that arranges items in a **vertical sequence with consistent spacing**. It ensures a clean, structured flow of components without needing to apply custom margins to each item.

---

### **When to Use**

- To arrange elements in a **vertical column** with uniform spacing (e.g., form fields, grouped controls, content blocks).

- When you want to maintain a consistent **spacing rhythm** across components.

- For creating **simple vertical layouts** that don’t require multi-column structures.

---

### **When Not to Use**

- For **multi-column layouts** – use [**Grid**](/latest/design/global-tokens/grid/overview-G7tz28hA).

- For **horizontal alignment/distribution** of items and responsive transfer between horizontal and vertical layout – use [**Flex**](/latest/components/flex/overview-696puvxK).

- For **semantic grouping of related actions** (e.g., a **Button** set) – use [**Action Group**](/latest/components/action-group/overview-Bi5NXFGt).

- As a replacement for semantic HTML containers (<section>, <ul>, etc.) – Stack is purely visual.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Prefer Stack over manually applying margins – it ensures consistency and reduces code duplication.

- Keep Stack usage simple – avoid deeply nested Stacks where one will do.

- Use Stack to create **clean vertical rhythm** in forms, settings pages, or content flows.

- Combine with **Box** or **Card** when grouped content also needs framing or background.

- Ensure spacing tokens are used consistently to align with Spirit’s design system.

On this page

- [Design Usage](#section-design-usage-d9)
- [When to Use](#section-when-to-use-d8)
- [When Not to Use](#section-when-not-to-use-94)
- [Best Practices](#section-best-practices-66)
