---
title: Grid
sourceUrl: https://spirit.supernova-docs.io/latest/components/grid/accessibility-me66cEBm-me66cEBm
sourcePath: /latest/components/grid/accessibility-me66cEBm-me66cEBm
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:19.323Z
---

- [Overview](/latest/components/grid/overview-5aQo9Uwf)
- [Design](/latest/components/grid/design-lUGZeVqi-lUGZeVqi)
- [HTML](/latest/components/grid/html-wIwrd6th)
- [React](/latest/components/grid/react-jmVyRPyk)
- [Accessibility](/latest/components/grid/accessibility-me66cEBm-me66cEBm)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Grid is a **pure layout utility** – it does not add semantic meaning unless you set it.

- Use semantic HTML elements inside the grid (e.g., <article>, <li>, <section>) depending on context.

### **Reading Order**

- Grid lays items out visually, but reading order follows the source order. Always ensure logical DOM order matches expected reading flow.

### **Responsive Behavior**

- On smaller screens, Grid will collapse to fewer columns – ensure content remains legible and navigable.

### **Keyboard Support**

- Grid itself is not interactive. All interactive elements inside must remain keyboard-accessible and properly ordered.

### **Alignment and Spacing**

- Ensure that spacing and alignment do not cause overlap or crowding, especially in smaller viewports.

On this page

- [Accessibility](#section-accessibility-4d)
- [Semantics](#section-semantics-71)
- [Reading Order](#section-reading-order-1b)
- [Responsive Behavior](#section-responsive-behavior-46)
- [Keyboard Support](#section-keyboard-support-57)
- [Alignment and Spacing](#section-alignment-and-spacing-ce)
