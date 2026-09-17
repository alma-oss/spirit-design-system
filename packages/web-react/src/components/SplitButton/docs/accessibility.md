---
title: Split Button
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Structure**

- Use a semantic &lt;button> for the primary action and another &lt;button> with aria-haspopup="menu" + aria-expanded for the dropdown trigger.

### **Menu semantics**

- The dropdown must be a semantic **menu list** (role="menu") with items (role="menuitem").

### **Keyboard support**

- **Tab** moves focus to the Split Button as a whole.

- **Enter/Space** on the primary button executes the default action.

- **Enter/Space/Arrow Down** on the chevron opens the menu.

- **Esc** closes the menu.

- **Arrow keys** navigate between menu items.

### **Focus Management**

- When the menu opens, focus should move into the menu. When it closes, focus should return to the dropdown trigger.

### **Announcements**

- Screen readers should announce the main button label and indicate that the adjacent trigger opens a menu of additional actions.

### **Contrast**

- Ensure both primary and secondary parts meet WCAG contrast and have distinct hover/focus/active states.
