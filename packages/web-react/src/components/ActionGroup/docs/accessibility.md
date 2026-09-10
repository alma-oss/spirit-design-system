---
title: Action Group
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

- Action Group only handles **layout** — each button must remain a semantic &lt;button> or &lt;a> with proper accessible labeling.

- Ensure **tab order** is logical and matches the intended flow of actions.

- Provide accessible names (aria-label) for any icon-only buttons.

- Maintain sufficient **color contrast** between buttons and background for all states (default, hover, active, disabled).

- Communicate button states (loading, disabled) to assistive technologies.
