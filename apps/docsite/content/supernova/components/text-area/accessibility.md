---
title: Text Area
sourceUrl: https://spirit.supernova-docs.io/latest/components/text-area/accessibility-iqUjBFF3-iqUjBFF3
sourcePath: /latest/components/text-area/accessibility-iqUjBFF3-iqUjBFF3
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:32.740Z
---

- [Overview](/latest/components/text-area/overview-3ZyPNWnL)
- [Design](/latest/components/text-area/design-CdWuHodL)
- [Figma](/latest/components/text-area/figma-YkZvA0Ia-YkZvA0Ia)
- [HTML](/latest/components/text-area/html-zkYJEm89)
- [React](/latest/components/text-area/react-gmiQr51H)
- [Accessibility](/latest/components/text-area/accessibility-iqUjBFF3-iqUjBFF3)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every Text Area must have an associated <label> or accessible name.

- Never replace labels with placeholder text.

### **Input**

- Use the <textarea> element for semantics.

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

On this page

- [Accessibility](#section-accessibility-49)
- [Label](#section-label-3a)
- [Input](#section-input-e3)
- [Helper Text](#section-helper-text-4e)
- [Validation Text](#section-validation-text-63)
- [Keyboard Support](#section-keyboard-support-bd)
- [Contrast and States](#section-contrast-and-states-0f)
- [Resize and Responsiveness](#section-resize-and-responsiveness-04)
