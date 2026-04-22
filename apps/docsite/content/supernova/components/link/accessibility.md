---
title: Link
sourceUrl: https://spirit.supernova-docs.io/latest/components/link/accessibility-Ba6NYZZc-Ba6NYZZc
sourcePath: /latest/components/link/accessibility-Ba6NYZZc-Ba6NYZZc
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:21.696Z
---

- [Overview](/latest/components/link/overview-w4DlWKKF)
- [Design](/latest/components/link/design-qRi0SHvf)
- [Figma](/latest/components/link/figma-9t1drUXH-9t1drUXH)
- [HTML](/latest/components/link/html-6nahNqBU)
- [React](/latest/components/link/react-PmEsFqYP)
- [Accessibility](/latest/components/link/accessibility-Ba6NYZZc-Ba6NYZZc)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use a semantic <a> element with a valid href for navigation.

- **Do not use** links to perform non-navigational actions; assistive tech expects links to **navigate** and buttons to **act.**

### **Labels**

- The **visible link text** should be meaningful out of context; avoid vague labels (“here”, “more”).

- If using an external-link/download icon, mark it **decorative** (aria-hidden="true") unless it conveys unique meaning not in text.

### **External Link**

- If opening in a new tab/window, **warn users** (e.g., “opens in a new tab”) and add rel="noopener noreferrer" with target="\_blank".

### **Keyboard Support**

- Links must be **focusable** and activate with **Enter**; show a visible focus indicator.

### **Contrast and Targets**

- Link text (and underline if used) must meet **WCAG AA** – ensure visited, hover, and focus states stay legible.

- Ensure enough spacing so inline links are easy to tap, especially in dense paragraphs.

On this page

- [Accessibility](#section-accessibility-6d)
- [Semantics](#section-semantics-a6)
- [Labels](#section-labels-a4)
- [External Link](#section-external-link-a1)
- [Keyboard Support](#section-keyboard-support-d8)
- [Contrast and Targets](#section-contrast-and-targets-af)
