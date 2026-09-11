---
title: Radio
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use &lt;input type="radio"> with associated &lt;label>.

- Radios in the same group must share the same name attribute, so only one can be selected.

### **Grouping**

- Always group related radio buttons inside a **fieldset** with a **legend** to provide context for screen readers.

### **Keyboard Support**

- **Tab** moves focus into the group.

- **Arrow keys** move between options within the group.

- **Space** or **Enter** selects the focused option.

### **State Announcement**

- Screen readers must announce both the label and whether the option is selected.

### **Label and ARIA labels**

- Each radio must have a clear, visible label.

- If labels are not visible, use aria-label or aria-labelledby.

### **Contrast**

- Radio circles and the selected dot must meet WCAG AA contrast ratios in all states (default, hover, focus, disabled).

### **Disabled State**

- Disabled radios must be visually distinct and not focusable.
