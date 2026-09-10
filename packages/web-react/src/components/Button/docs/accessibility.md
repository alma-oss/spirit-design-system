---
title: Button
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Keyboard Interaction**

- A button must be reachable via the **Tab** key.

- A button must be triggerable via **Enter** or **Space**.

- Focus states must be clearly visible, even without using a mouse (use :focus-visible for clarity).

### **Screen Readers and Labels**

- Buttons must have a **clear, descriptive label**.

- If a button uses only an icon, add an aria-label or accessible text (e.g., “Search”, “Close”).

- Avoid using vague labels like “Click here” or “OK”.

### **States and Feedback**

- Communicate state changes to assistive technologies:

- **Disabled**: add disabled attribute and ensure it’s visually distinct.

- **Loading**: provide a visual indicator (spinner) and announce the state (e.g., aria-busy="true").

- Ensure feedback is not color-only: always pair color with text, icons, or another indicator.

### **Color and Contrast**

- Button text and icons must meet **WCAG AA contrast** requirements against their background (at least 4.5:1).

- Ensure sufficient contrast for all states: default, hover, active, focus, disabled.

### **ARIA and Attributes**

- Support for aria-\*, id, and data-\* attributes is built-in and should be used where needed for accessibility.

- Avoid overusing ARIA if native HTML semantics (e.g., &lt;button>) provide the same functionality.

### Size and Touch Targets

- Buttons must be large enough to be easily clickable/tappable.

- The recommended minimum touch target is 44 × 44 px (per WCAG).

- Ensure text inside buttons remains legible and does not overflow.
