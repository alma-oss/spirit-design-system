---
title: Header
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Role**

- The Header should use role="banner" or &lt;header> element to define the top-level landmark region.

### **Logo Link**

- If clickable, must include descriptive alt text or aria-label="Home".

### **Navigation Integration**

- Ensure all nav items are reachable via keyboard.

- Maintain logical tab order (logo → nav → other actions).

### **Contrast**

- Background and text/icons must meet **WCAG AA** contrast.

### **Responsiveness**

- Header layout should reflow gracefully without overlapping content.
