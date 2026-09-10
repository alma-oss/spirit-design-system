---
title: Accordion
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Accordion headers should be buttons (&lt;button>) or elements with role="button".

- Use aria-expanded="true/false" on each header to indicate state.

- Use aria-controls to reference the associated content panel.

### **Content Panels**

- Should have role="region" and a unique aria-labelledby referencing the header.

### **Keyboard Support**

- **Tab** moves between accordion headers.

- **Enter** or **Space** toggles the selected section.

- **Arrow Up/Down** (optional best practice) moves focus between headers in the accordion.

### **Focus Management**

- Keep focus on the header button when toggling; don’t auto-move into the content.

### **Announcements**

- Screen readers must announce when a panel is expanded or collapsed.

### **Contrast and Icons**

- Ensure chevrons/icons have sufficient contrast and rotate or change to indicate state – don’t rely on color alone.

### **Touch Targets**

- Headers must be large enough (~44×44 px) for easy tapping.
