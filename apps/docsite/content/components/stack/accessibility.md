---
title: Stack
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Stack is a **layout utility** – it doesn’t add meaning on its own unless you set it via elementType property.

- Use semantic elements inside (e.g., &lt;form>, &lt;ul>) based on the content.

### **Reading Order**

- Stack follows DOM order – ensure items are arranged logically for assistive tech.

### **Keyboard Support**

- Stack itself is not interactive. Interactive children must remain focusable in the correct order.

### **Responsive Behavior**

- Stack handles **vertical spacing only** – responsiveness depends on the content inside, not on Stack itself.
