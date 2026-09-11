---
title: Alert
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Use role="alert" for error/urgent messages (announces immediately).

- Use role="status" for non-urgent feedback (polite announcement).

### **Headings and Text**

- Provide a **clear heading or icon** to indicate severity.

- Ensure message text is readable and concise.

### **Dismissibility**

- If dismissible, include a close button with aria-label="Dismiss alert".

### **Color and Contrast**

- Success, error, warning, and info colors must meet **WCAG AA** contrast.

- Don’t rely on color alone – pair with icon or text.

### **Focus Management**

- When an **Alert** appears in response to user action, consider moving focus to it or ensuring screen readers announce it.
