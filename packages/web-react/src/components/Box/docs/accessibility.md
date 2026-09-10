---
title: Box
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Box itself should be a neutral container (&lt;div> or &lt;span>).

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
