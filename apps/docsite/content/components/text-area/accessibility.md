---
title: Text Area
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every Text Area must have an associated &lt;label> or accessible name.

- Never replace labels with placeholder text.

### **Input**

- Use the &lt;textarea> element for semantics.

- Apply aria-required="true" if the field is mandatory.

- Provide aria-describedby to connect helper or validation text.

### **Helper Text**

- Should be announced by screen readers via aria-describedby.

### **Validation Text**

- Tie errors to the field via aria-describedby.

- If an immediate announcement is needed, apply role="alert".

#### Character counter

- The counter must be accessible to screen readers

- Validation messages must be properly associated with the TextArea

### **Keyboard Support**

- Must be focusable via **Tab**.

- Supports **Enter** for line breaks, **Shift+Tab** to move focus back.

### **Contrast and States**

- Borders, labels, text, and validation states must meet **WCAG AA** contrast.

- Don’t rely only on color for error/warning — pair with text and/or icon.

### **Resize and Responsiveness**

- If resizing is enabled, ensure it doesn’t break layout or cut off labels/helper text.

- Ensure Text Area adapts well to smaller screens without clipping.
