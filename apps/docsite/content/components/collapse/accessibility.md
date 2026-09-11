---
title: Collapse
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger Element**

- Use a &lt;button> as the toggle control.

- Apply aria-expanded="true/false" to indicate state.

- Use aria-controls to reference the collapsible content’s ID.

### **Content Panel**

- Should be a container element with an id referenced by the trigger’s aria-controls.

- Use aria-hidden="true/false" to reflect visibility.

### **Keyboard Support**

- Must be operable via **Tab** focus.

- **Enter** or **Space** toggles the panel.

### **Announcements**

- Screen readers should announce when content is expanded/collapsed.

### **Focus Management**

- Keep focus on the trigger when toggling; don’t auto-shift into the panel.

### **Contrast and Iconography**

- Ensure any chevrons/icons change state (rotation or symbol change), not just color.
