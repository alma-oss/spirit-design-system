---
title: Checkbox
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use &lt;input type="checkbox"> with a &lt;label> correctly associated (for attribute) or wrap input inside the label.

### **Grouping**

- For multiple related options, use a **fieldset** and **legend** to group them semantically, helping screen readers understand the context.

### **Indeterminate State**

- For parent checkboxes, expose indeterminate=true and ensure assistive tech handles the tri-state accordingly.

### **Keyboard Support**

- Must support **Tab** to focus, and **Space** or **Enter** to toggle. Ensure the focus outline is clearly visible.

### **Label Clarity**

- Labels must be meaningful – avoid vague text like “Option 1.” For icon-only checkboxes (if any), use aria-label to describe purpose.

### **Contrast and Cues**

- Checkbox border and checkmark must have sufficient contrast (WCAG AA). Don’t rely solely on color; use shape or icon to indicate states.

### **Disabled State**

- Disabled checkboxes should be non-focusable, and clearly appear disabled visually (e.g., reduced opacity, shape difference).
