---
title: Tooltip
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger Semantics**

- The tooltip should be tied to a **focusable trigger**; don’t rely on mouse hover alone.

### **Association**

- Use aria-describedby on the trigger to reference the tooltip content.

### **Visibility on Focus**

- Show on **focus** and **hover**; hide on **Esc**, blur, or pointer leave.

### **Keyboard**

- Trigger must be reachable via **Tab**; tooltip must not trap focus.

### **Announcements**

- Keep content succinct; excessive text becomes hard to navigate with screen readers.

### **Contrast and Motion**

- Ensure tooltip surface and text meet **WCAG AA**; avoid motion that hinders readability.

### **Touch**

- Provide a reliable tap target and dismissal; consider alternate patterns (Popover/Modal) if persistence is needed. Consider replacing Tooltips with Modals on mobile devices
