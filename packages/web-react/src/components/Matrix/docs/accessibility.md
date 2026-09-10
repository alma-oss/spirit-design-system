---
title: Matrix
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Matrix is purely a **layout utility** – it doesn’t add semantic meaning.

- Wrap items in appropriate semantic containers (e.g., &lt;article>, &lt;li>, &lt;section>).

### **Reading Order**

- DOM order determines reading flow; ensure logical order matches expected scan order.

### **Keyboard Support**

- Matrix itself is not interactive. Interactive child elements must remain focusable and in logical sequence.

### **Responsiveness**

- Ensure Matrix layouts collapse gracefully on small screens, without cutting off or hiding content.

### **Consistency**

- Maintain equal heights across rows for visual clarity, but ensure text and content remain legible and not truncated.
