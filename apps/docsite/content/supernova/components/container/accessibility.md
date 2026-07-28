---
title: Container
sourceUrl: https://spirit.supernova-docs.io/latest/components/container/accessibility-15LQtB5u-15LQtB5u
sourcePath: /latest/components/container/accessibility-15LQtB5u-15LQtB5u
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.680Z
---

- [Overview](/latest/components/container/overview-J02hefXB)
- [HTML](/latest/components/container/html-NRwdMXgn)
- [React](/latest/components/container/react-f9wmqaQd)
- [Accessibility](/latest/components/container/accessibility-15LQtB5u-15LQtB5u)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Container is a **layout utility only** – it does not add semantic meaning.

- Use semantic HTML (e.g., <section>, <article>, <main>) for the content it wraps.

### **Reading Order**

- Content inside the Container should follow a logical DOM order for accessibility.

### **Responsiveness**

- Ensure Container widths adapt at breakpoints without cutting off or overlapping content.

- Maintain adequate padding on small screens to avoid edge-to-edge text.

### **Contrast**

- Container doesn’t add backgrounds by itself, but ensures content within has adequate contrast against the Section background.

On this page

- [Accessibility](#section-accessibility-46)
- [Semantics](#section-semantics-04)
- [Reading Order](#section-reading-order-f6)
- [Responsiveness](#section-responsiveness-ed)
- [Contrast](#section-contrast-63)
