---
title: Navigation
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Roles**

- Wrap main navigation in a container with nav element or role="navigation".

### **Labelling**

- Provide a descriptive label if there are multiple nav sections (e.g., aria-label="Main navigation").

### **Links**

- Navigation items should be semantic &lt;a> elements (or buttons if they trigger in-page drawers).

### **Keyboard Support**

- **Tab** moves between items.

- **Enter/Space** activates the link.

- For dropdown navigation, support **Arrow keys** to move through sub-menus and **Esc** to close.

### **Toolbar**

- Use `role="toolbar"` for a persistent group of 3 or more actions that is not site navigation, e.g. actions for the edited document. Do not use it for one or two controls. The toolbar renders a `div`, because the role is not allowed on `nav`. An explicit `elementType="nav"` is rendered as a `div` as well.

- Provide an `aria-label` or `aria-labelledby`. `aria-orientation` follows the `direction` of the Navigation.

- The `ul` and `li` use `role="presentation"`, so the toolbar is not also announced as a list.

- The toolbar is a single **Tab** stop and remembers the last focused action.

- **Arrow keys** matching the orientation move between actions and wrap around; **Home/End** move to the first/last action. Text fields, text areas and selects keep their own arrow keys and stay separate Tab stops.

### **Focus Management**

- Maintain visible focus indicators for all items.

### **Announcements**

- Screen readers should announce the active item (e.g., “Current page”). Use aria-current="page" for the active destination.

### **Contrast and Targets**

- Ensure text and icons meet WCAG AA contrast.

- Navigation items must be large enough for easy tapping (~44×44 px).

### **Mobile Menus**

- When using collapsible menus or drawers, manage focus correctly – trap focus inside the menu when open and return focus to the trigger on close.
