---
title: Tabs
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Tablist Structure**

- Use a container with role="tablist".

- Each tab has role="tab", is focusable, and controlled via aria-selected="true/false".

- Each tab must reference its associated panel with aria-controls.

### **Tab Panels**

- Use role="tabpanel".

- Each panel should be labelled by its tab using aria-labelledby.

- Only the active panel should be visible; inactive ones should be hidden with hidden or aria-hidden="true".

### **Keyboard Support**

- **Tab** moves focus into/out of the tab list.

- **Arrow Left/Right** (or Up/Down in vertical orientation) moves between tabs.

- **Enter** or **Space** activates the focused tab and shows its panel.

### **Focus Management**

- Keep focus on the activated tab, not automatically inside the panel.

### **Announcements**

- Screen readers must announce the tab’s label, its selected state, and its position (e.g., “Tab 2 of 4”).
