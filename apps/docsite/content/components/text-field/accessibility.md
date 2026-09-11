---
title: Text Field
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every input must have an associated &lt;label> or accessible name (aria-label / aria-labelledby).

- Don’t use placeholder text as a replacement for labels.

### **Input**

- Use correct type attributes (email, password, search, etc.) for semantic meaning and better mobile keyboard support.

- Ensure strong focus indication.

- Apply aria-required="true" when the field is required.

### **Helper Text**

- Associate helper text with the field via aria-describedby.

### **Validation Text**

- Use aria-describedby to tie error messages to the field.

- Errors should be announced automatically by screen readers.

- Use role="alert" on error messages if immediate announcement is needed.

### **Keyboard support**

- Text Field must be focusable via **Tab**.

- Input text should be editable with standard keystrokes.

### **Contrast and States**

- Label, text, borders, and validation states must meet **WCAG AA** contrast.

- Error/warning states must not rely solely on color.
