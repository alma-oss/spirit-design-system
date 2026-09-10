---
title: Container
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Container is a **layout utility only** – it does not add semantic meaning.

- Use semantic HTML (e.g., &lt;section>, &lt;article>, &lt;main>) for the content it wraps.

### **Reading Order**

- Content inside the Container should follow a logical DOM order for accessibility.

### **Responsiveness**

- Ensure Container widths adapt at breakpoints without cutting off or overlapping content.

- Maintain adequate padding on small screens to avoid edge-to-edge text.

### **Contrast**

- Container doesn’t add backgrounds by itself, but ensures content within has adequate contrast against the Section background.
