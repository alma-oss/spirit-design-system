---
title: Action Group
sourceUrl: https://spirit.supernova-docs.io/latest/components/action-group/accessibility-9DtaHdEI-9DtaHdEI
sourcePath: /latest/components/action-group/accessibility-9DtaHdEI-9DtaHdEI
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:11.107Z
---

- [Overview](/latest/components/action-group/overview-Bi5NXFGt)
- [Figma](/latest/components/action-group/figma-2Vx7d8Tf-2Vx7d8Tf)
- [React](/latest/components/action-group/react-geUF2Sil)
- [Accessibility](/latest/components/action-group/accessibility-9DtaHdEI-9DtaHdEI)

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

- Action Group only handles **layout** — each button must remain a semantic <button> or <a> with proper accessible labeling.

- Ensure **tab order** is logical and matches the intended flow of actions.

- Provide accessible names (aria-label) for any icon-only buttons.

- Maintain sufficient **color contrast** between buttons and background for all states (default, hover, active, disabled).

- Communicate button states (loading, disabled) to assistive technologies.

On this page

- [Accessibility](#section-accessibility-ab)
