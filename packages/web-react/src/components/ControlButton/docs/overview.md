---
title: Control Button
---

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

- For **primary or task-oriented actions** (e.g., Submit, Save) – use [**Button**](/components/button).

- For **toggle states** (on/off) – use [**Toggle**](/components/toggle).

- For **inline text links** – use [**Link**](/components/link).

- When **multiple related actions** are needed – use [**ActionGroup**](/components/action-group) to manage layout and spacing.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **icons** that clearly represent the intended action (e.g., “x” for close, arrows for navigation).

- Provide **accessible labels** for icon-only buttons (aria-label="Close modal").

- Keep ControlButtons **spatially separated** from primary actions to avoid confusion.

- Maintain consistent **placement** – e.g., top-right for close, left for back.

- Avoid overusing ControlButtons in dense layouts; they are meant to support, not dominate.

- Ensure all states (hover, focus, active) remain subtle but visible for accessibility.
