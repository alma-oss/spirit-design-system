---
title: Flex
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Flex is a **layout utility** only – it does not add semantic meaning unless you set it.

- Always use semantic HTML for the elements inside (e.g., &lt;button>, &lt;nav>, &lt;ul>).

### **Reading Order**

- Visual alignment doesn’t change DOM order – ensure items are ordered logically in the markup for screen readers and keyboard navigation.

### **Keyboard Support**

- Flex itself is not interactive. Ensure interactive child elements remain reachable and in logical order.

### **Responsive Behavior**

- Ensure Flex alignment doesn’t break accessibility on small screens – items should remain visible and navigable when stacked or wrapped.

### **Contrast and Spacing**

- Ensure spacing and alignment don’t cause overlap or crowding. Maintain legibility in all viewports.
