---
title: Divider
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use semantic &lt;hr> element for visual separation between sections.

- For list separators (e.g., in menus), a &lt;li role="separator"> is appropriate.

### **Decorative Use**

- If the Divider is purely visual and does not indicate semantic structure, hide it from assistive tech with aria-hidden="true".

### **Contrast**

- Avoid very low-contrast lines that disappear in certain themes.

### **Responsive Behavior**

- Ensure Dividers scale consistently in width and placement across screen sizes.

### **Keyboard**

- Divider is non-interactive and should **never receive focus**.
