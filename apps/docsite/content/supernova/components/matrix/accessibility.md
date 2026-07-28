---
title: Matrix
sourceUrl: https://spirit.supernova-docs.io/latest/components/matrix/accessibility-n5CwNQwZ-n5CwNQwZ
sourcePath: /latest/components/matrix/accessibility-n5CwNQwZ-n5CwNQwZ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:22.111Z
---

- [Overview](/latest/components/matrix/overview-uXzlhaFX)
- [Design](/latest/components/matrix/design-Z9CFEvq7-Z9CFEvq7)
- [React](/latest/components/matrix/react-WCuM7L5Y)
- [HTML](/latest/components/matrix/html-TFHkqROT)
- [Accessibility](/latest/components/matrix/accessibility-n5CwNQwZ-n5CwNQwZ)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Matrix is purely a **layout utility** – it doesn’t add semantic meaning.

- Wrap items in appropriate semantic containers (e.g., <article>, <li>, <section>).

### **Reading Order**

- DOM order determines reading flow; ensure logical order matches expected scan order.

### **Keyboard Support**

- Matrix itself is not interactive. Interactive child elements must remain focusable and in logical sequence.

### **Responsiveness**

- Ensure Matrix layouts collapse gracefully on small screens, without cutting off or hiding content.

### **Consistency**

- Maintain equal heights across rows for visual clarity, but ensure text and content remain legible and not truncated.

On this page

- [Accessibility](#section-accessibility-2b)
- [Semantics](#section-semantics-44)
- [Reading Order](#section-reading-order-1e)
- [Keyboard Support](#section-keyboard-support-b3)
- [Responsiveness](#section-responsiveness-7e)
- [Consistency](#section-consistency-19)
