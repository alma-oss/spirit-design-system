---
title: Box
sourceUrl: https://spirit.supernova-docs.io/latest/components/box/accessibility-NnNZUtQA-NnNZUtQA
sourcePath: /latest/components/box/accessibility-NnNZUtQA-NnNZUtQA
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:12.447Z
---

- [Overview](/latest/components/box/overview-qy7lFEkG)
- [HTML](/latest/components/box/html-igbAmogw)
- [React](/latest/components/box/react-NQRnduHa)
- [Accessibility](/latest/components/box/accessibility-NnNZUtQA-NnNZUtQA)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Box itself should be a neutral container (<div> or <span>).

- The **semantic meaning comes from the content inside**.

### **Labels**

- Ensure the content inside the Box has proper labelling – Box should not strip or replace semantics.

### **Contrast**

- Make sure background, borders, and contained text meet **WCAG AA** contrast requirements.

### **Focus and Interactivity**

- Box should not be focusable unless the content inside is interactive.

- If interactive content (like a button or link) is inside, ensure focus states are clear and not obscured by Box styling.

### **Responsiveness**

- Ensure Boxes scale with their content – avoid clipping or fixed dimensions that cut off text or icons.

On this page

- [Accessibility](#section-accessibility-3c)
- [Semantics](#section-semantics-bb)
- [Labels](#section-labels-81)
- [Contrast](#section-contrast-80)
- [Focus and Interactivity](#section-focus-and-interactivity-cb)
- [Responsiveness](#section-responsiveness-65)
