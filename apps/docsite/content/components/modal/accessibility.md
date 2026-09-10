---
title: Modal
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use role="dialog" or role="alertdialog" (for urgent confirmations), plus aria-modal="true".

- Provide a **unique** aria-labelledby (modal title) and optional aria-describedby (supporting text).

- Set the modal title as heading level 1 (&lt;h1>).

### **Focus Management**

- Move focus to the modal on open (typically the first focusable control).

- **Trap focus** within the modal while it’s open.

- Restore focus to the **invoking element** on close.

### **Keyboard Support**

- **Esc** closes (unless a blocking/required action).

- **Tab/Shift+Tab** cycle through focusable elements.

- Provide keyboard-operable primary/secondary actions.

### **Announcements**

- Ensure the title/description is read by screen readers on open.

### **Scrolling Content**

- Keep content readable with accessible scrolling; maintain visible focus outlines as content scrolls.

### **Contrast and Targets**

- Text and buttons must meet **WCAG AA** – ensure visited, hover, and focus states stay legible.

- Ensure comfortable hit areas on touch.
