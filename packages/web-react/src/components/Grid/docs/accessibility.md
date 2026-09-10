---
title: Grid
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Grid is a **pure layout utility** – it does not add semantic meaning unless you set it.

- Use semantic HTML elements inside the grid (e.g., &lt;article>, &lt;li>, &lt;section>) depending on context.

### **Reading Order**

- Grid lays items out visually, but reading order follows the source order. Always ensure logical DOM order matches expected reading flow.

### **Responsive Behavior**

- On smaller screens, Grid will collapse to fewer columns – ensure content remains legible and navigable.

### **Keyboard Support**

- Grid itself is not interactive. All interactive elements inside must remain keyboard-accessible and properly ordered.

### **Alignment and Spacing**

- Ensure that spacing and alignment do not cause overlap or crowding, especially in smaller viewports.
