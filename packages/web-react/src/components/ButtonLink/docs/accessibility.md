---
title: Button Link
---

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Keyboard Interaction**

- A link must be reachable via the **Tab** key.

- A link must be triggerable via **Enter** or **Space**.

- Focus states must be clearly visible, even without using a mouse (use :focus-visible for clarity).

### **Screen Readers and Labels**

- Links must have a **clear, descriptive label**.

- If a link uses only an icon, add an aria-label or accessible text (e.g., “My profile”, “Back to Homepage”).

### **Color and Contrast**

- Link text and icons must meet **WCAG AA contrast** requirements against their background (at least 4.5:1).

- Ensure sufficient contrast for all states: default, hover, active, focus, disabled.

### **ARIA and Attributes**

- Support for aria-\*, id, and data-\* attributes is built-in and should be used where needed for accessibility.

- Avoid overusing ARIA if native HTML semantics (e.g., &lt;a>) provide the same functionality.

### Size and Touch Targets

- Links must be large enough to be easily clickable/tappable.

- The recommended minimum touch target is 44 × 44 px (per WCAG).

- Ensure text inside links remains legible and does not overflow.
