---
title: Slider
sourceUrl: https://spirit.supernova-docs.io/latest/components/slider/accessibility-vBKv45bJ-vBKv45bJ
sourcePath: /latest/components/slider/accessibility-vBKv45bJ-vBKv45bJ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:29.296Z
---

- [Overview](/latest/components/slider/overview-Y93PhlkV)
- [Design](/latest/components/slider/design-FZDIwAp3)
- [Figma](/latest/components/slider/figma-PgzdVLdK-PgzdVLdK)
- [HTML](/latest/components/slider/html-mVLp51Ty)
- [React](/latest/components/slider/react-wcQuunOx)
- [Accessibility](/latest/components/slider/accessibility-vBKv45bJ-vBKv45bJ)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every Slider must have a programmatically associated label.

- Use visible <label> or aria-label/aria-labelledby.

### **Input**

- Use <input type="range"> as the base for semantic support.

- Add min, max, and step attributes to define valid ranges.

- Ensure current value is exposed via the native value attribute.

### **Helper Text**

- Connect helper text via aria-describedby for screen reader announcement.

### **Validation Text**

- Tie error messages to the slider with aria-describedby.

- For urgent errors, use role="alert".

### **Keyboard Support**

- **Tab** moves focus to the slider handle.

- **Arrow keys** adjust the value (Up/Right = increase, Down/Left = decrease).

- **Page Up/Down** jump by larger increments; **Home/End** go to min/max.

### **Focus and Feedback**

- Ensure strong focus indicators for the handle.

- Announce value changes to screen readers automatically (native input support handles this if <input type="range"> is used).

### **Contrast and Touch**

- Track, handle, and value indicators must meet WCAG AA.

- Touch targets (handles) should be ~44 × 44 px for comfortable use.

On this page

- [Accessibility](#section-accessibility-a5)
- [Label](#section-label-8e)
- [Input](#section-input-ab)
- [Helper Text](#section-helper-text-e3)
- [Validation Text](#section-validation-text-1d)
- [Keyboard Support](#section-keyboard-support-11)
- [Focus and Feedback](#section-focus-and-feedback-04)
- [Contrast and Touch](#section-contrast-and-touch-c0)
