---
title: Text Field
sourceUrl: https://spirit.supernova-docs.io/latest/components/text-field/accessibility-jyL8s4pv-jyL8s4pv
sourcePath: /latest/components/text-field/accessibility-jyL8s4pv-jyL8s4pv
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:33.217Z
---

- [Overview](/latest/components/text-field/overview-uxoMLF2o)
- [Design](/latest/components/text-field/design-BCljpCkw)
- [Figma](/latest/components/text-field/figma-VSQFZFjC-VSQFZFjC)
- [HTML](/latest/components/text-field/html-tLcn41CO)
- [React](/latest/components/text-field/react-udHnPWdL)
- [Accessibility](/latest/components/text-field/accessibility-jyL8s4pv-jyL8s4pv)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every input must have an associated <label> or accessible name (aria-label / aria-labelledby).

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

On this page

- [Accessibility](#section-accessibility-b0)
- [Label](#section-label-29)
- [Input](#section-input-c4)
- [Helper Text](#section-helper-text-8f)
- [Validation Text](#section-validation-text-52)
- [Keyboard support](#section-keyboard-support-30)
- [Contrast and States](#section-contrast-and-states-28)
