---
title: Control Button
sourceUrl: https://spirit.supernova-docs.io/latest/components/control-button/overview-AB1OSj30
sourcePath: /latest/components/control-button/overview-AB1OSj30
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.900Z
---

- [Overview](/latest/components/control-button/overview-AB1OSj30)
- [Design](/latest/components/control-button/design-AVqRXYXL)
- [Figma](/latest/components/control-button/figma-jm4ZC67a-jm4ZC67a)
- [HTML](/latest/components/control-button/html-E2VybPPm-E2VybPPm)
- [React](/latest/components/control-button/react-QrHDMVUM-QrHDMVUM)
- [Accessibility](/latest/components/control-button/accessibility-U4nKZKI7-U4nKZKI7)

#### Component checklist

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

**ControlButton** is a compact, less prominent version of the Button component, intended for **interface-level controls** rather than primary actions.

It’s optimized for actions like **closing modals**, **navigating between items**, or **scrolling content**, where the control should be **visible but not attention-grabbing**.

ControlButton maintains consistent sizing, spacing, and interaction states (hover, focus, active) across all Spirit components and adapts to both **light and dark themes**.

---

### **When to Use**

- For **UI controls** such as _close_, _back_, _next_, _scroll_, or _expand/collapse_.

- When the action should be **available but visually secondary**.

- In components where a full **Button** would feel too heavy or visually dominant (e.g., Modals, Drawers, Carousels).

- To provide clear, lightweight action affordances using **icons**.

---

### **When Not to Use**

- For **primary or task-oriented actions** (e.g., Submit, Save) – use [**Button**](/latest/components/button/overview-oxxMcy7u).

- For **toggle states** (on/off) – use [**Toggle**](/latest/components/toggle/overview-xkL1tbNO).

- For **inline text links** – use [**Link**](/latest/components/link/overview-w4DlWKKF).

- When **multiple related actions** are needed – use [**ActionGroup**](/latest/components/action-group/overview-Bi5NXFGt) to manage layout and spacing.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **icons** that clearly represent the intended action (e.g., “x” for close, arrows for navigation).

- Provide **accessible labels** for icon-only buttons (aria-label="Close modal").

- Keep ControlButtons **spatially separated** from primary actions to avoid confusion.

- Maintain consistent **placement** – e.g., top-right for close, left for back.

- Avoid overusing ControlButtons in dense layouts; they are meant to support, not dominate.

- Ensure all states (hover, focus, active) remain subtle but visible for accessibility.

On this page

- [Design Usage](#section-design-usage-1d)
- [When to Use](#section-when-to-use-1c)
- [When Not to Use](#section-when-not-to-use-6d)
- [Best Practices](#section-best-practices-2f)
