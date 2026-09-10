---
title: Toast
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use role="alert" for urgent messages (announced immediately).

- Use role="status" for non-urgent updates (polite announcement).

### **Announcements**

- Ensure the entire Toast message is announced by screen readers when it appears.

### **Dismissibility**

- Provide a close button with a descriptive aria-label (e.g., aria-label="Dismiss notification").

### **Keyboard**

- Toasts must be focusable if they include actions; otherwise, don’t trap focus.

### **Auto-dismiss**

- Ensure auto-dismiss doesn’t prevent assistive tech users from perceiving the message – consider extending duration or pausing on hover/focus.

### **Color and Contrast**

- Must meet **WCAG AA** in all variants (success, info, warning, error).

### **Motion**

- Entry/exit animations should be subtle and not disorienting.
