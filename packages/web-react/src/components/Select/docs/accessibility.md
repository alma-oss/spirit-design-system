---
title: Select
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use a native &lt;select> element whenever possible; it provides built-in keyboard and screen reader support.

### **Labeling**

- Every select must have an associated &lt;label> or aria-label.

### **Keyboard Interaction**

- **Tab** focuses the select.

- **Arrow keys** navigate through options.

- **Enter / Space** opens the menu.

- **Esc** closes without selection.

### **Announcing State**

- Screen readers must announce the field label, current selection, and number of options.

### **Option Groups**

- Use &lt;optgroup> with labels to provide context for long lists – announced by screen readers.

### **Contrast**

- Ensure selected and focused states meet WCAG contrast guidelines.

### **Custom Implementations**

- If replacing the native &lt;select>, ensure the component replicates all of the above behavior (ARIA roles, keyboard navigation, focus management, and announcements).

### **Error State**

- Communicate errors both visually (text + color) and via aria-describedby.
