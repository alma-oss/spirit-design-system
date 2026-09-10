---
title: Drawer
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger**

- The element opening the Drawer must be a semantic button or link with an accessible label.

- Manage aria-expanded="true/false" if applicable.

### **Container**

- The Drawer should be a **dialog container** with role="dialog" or role="complementary".

- Use aria-labelledby to tie the Drawer to its heading.

- If the Drawer overlays the page and traps focus, add aria-modal="true".

### **Keyboard Support**

- **Tab** cycles through interactive elements inside the Drawer.

- **Esc** closes the Drawer and returns focus to the trigger.

- Ensure focus is set to the Drawer when it opens (first focusable element or heading).

### **Dismissal**

- Provide a clear close button (aria-label="Close").

- Allow closing by clicking outside the Drawer if it’s non-critical.

- Focus must return to the trigger when closed.

### **Contrast and Touch**

- Ensure text and actions inside the Drawer meet **WCAG AA** contrast.

- Maintain adequate touch targets (~44×44 px).

### **Responsive Behavior**

- On small screens, Drawers may cover the entire viewport – ensure this is intentional and doesn’t break navigation.
