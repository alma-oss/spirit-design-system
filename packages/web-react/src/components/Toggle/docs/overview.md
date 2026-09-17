---
title: Toggle
---

#### Component Status

Figma

Up to date

Status

Stable

React

Up to date

### Design Usage

**Toggle** lets users switch a **single setting** between two states (e.g., **On/Off**) and applies changes **immediately**. It’s best for preferences and settings where instant feedback is valuable.

Visual states (default, hover, active, disabled) and an optional icon are supported; the control reflects the current **selected** (on) or **unselected** (off) state.

---

### When to Use

- A **binary preference** that should take effect **right away** (no form submit).

- Safe, **reversible** settings (e.g., notifications, previews, appearance).

- Lists of independent settings where quick scanning and immediate feedback help.

---

### When Not to Use

- Changes that require **validation** or **form submission** – use a [**Checkbox**](/components/checkbox) inside a form.

- **Non-binary** choices or multiple options – use [**Radio**](/components/radio), [**Segmented Control**](/components/segmented-control), or [**Select**](/components/select).

- **Actions** that execute commands (e.g., “Delete account”) – use a [**Button**](/components/button) with a confirmation step.

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always **bind to real state**; the initial visual state must match the persisted value.

- Pair the toggle with a **clear, specific label**; add explicit “On/Off” text when the meaning could be ambiguous.

- Keep a **consistent alignment** in lists (commonly Label on the left, Toggle on the right) for scannability.

- Use **loading/disabled** states while persisting the change to prevent rapid toggling.

- Reserve toggles for **immediate, low-risk** changes; if a change is risky or destructive, require confirmation.

- Follow the **component-toggle tokens** for consistent colors, borders, and content contrast across states.
