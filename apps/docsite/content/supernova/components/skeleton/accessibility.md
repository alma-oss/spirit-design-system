---
title: Skeleton
sourceUrl: https://spirit.supernova-docs.io/latest/components/skeleton/accessibility-x0P9i2gc-x0P9i2gc
sourcePath: /latest/components/skeleton/accessibility-x0P9i2gc-x0P9i2gc
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.567Z
---

- [Overview](/latest/components/skeleton/overview-1OlTge6X)
- [Design](/latest/components/skeleton/design-DIGbfyF2)
- [Figma](/latest/components/skeleton/figma-KarPbvrY-KarPbvrY)
- [HTML](/latest/components/skeleton/html-sTQcaRDT)
- [React](/latest/components/skeleton/react-ksjkDfjI)
- [Accessibility](/latest/components/skeleton/accessibility-x0P9i2gc-x0P9i2gc)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Skeletons are purely **decorative placeholders** – they should not be exposed as meaningful content.

- Use aria-hidden="true" on Skeleton elements to hide them from assistive technologies.

### **Announcements**

- Ensure screen readers know content is loading via an external mechanism (e.g., aria-busy="true" on the container or a live region announcing “Loading…”).

- When content loads, update the region so users know it’s ready.

### **Keyboard**

- Skeletons must not be focusable. Ensure only actual interactive content becomes focusable once loaded.

### **Contrast**

- Keep Skeleton background subtle but still visible in both light and dark modes.

- Shimmer or animation should not reduce contrast below WCAG requirements for people with motion sensitivity.

### **Motion preferences**

- Respect prefers-reduced-motion – provide a static Skeleton without shimmer when users opt out of animations.

On this page

- [Accessibility](#section-accessibility-ea)
- [Semantics](#section-semantics-18)
- [Announcements](#section-announcements-70)
- [Keyboard](#section-keyboard-c2)
- [Contrast](#section-contrast-b6)
- [Motion preferences](#section-motion-preferences-cc)
