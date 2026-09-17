---
title: Dropdown
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger**

- Use a **button** as the trigger with aria-haspopup="true" and aria-expanded="true/false".

- The trigger should clearly describe the purpose (e.g., “More options”).

### **Container**

- Use a &lt;div role="menu"> or &lt;ul role="menu"> depending on content.

- Each item inside should have role="menuitem", menuitemradio, or menuitemcheckbox if interactive.

- If the Dropdown contains non-menu content (like filters or inputs), use semantic roles for those elements instead.

### **Keyboard Support**

- **Tab** moves focus to the trigger.

- **Enter/Space** opens the Dropdown.

- Once open, the **arrow keys** navigate between items.

- **Esc** closes the Dropdown and returns focus to the trigger.

### **Focus Management**

- When opened, focus should move into the Dropdown (to the first item).

- When closed, focus should return to the trigger.

### **Dismissal**

- Dropdown must close when the user clicks outside, presses Esc, or selects an item.

### **Contrast and Touch**

- Ensure items meet **WCAG AA** contrast.

- Maintain comfortable tap areas (~44 × 44 px).
