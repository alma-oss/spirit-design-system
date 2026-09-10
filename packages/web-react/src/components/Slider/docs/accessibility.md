---
title: Slider
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Label**

- Every Slider must have a programmatically associated label.

- Use visible &lt;label> or aria-label/aria-labelledby.

### **Input**

- Use &lt;input type="range"> as the base for semantic support.

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

- Announce value changes to screen readers automatically (native input support handles this if &lt;input type="range"> is used).

### **Contrast and Touch**

- Track, handle, and value indicators must meet WCAG AA.

- Touch targets (handles) should be ~44 × 44 px for comfortable use.
