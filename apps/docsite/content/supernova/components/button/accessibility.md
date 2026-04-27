---
title: Button
sourceUrl: https://spirit.supernova-docs.io/latest/components/button/accessibility-ZNuRYP72-ZNuRYP72
sourcePath: /latest/components/button/accessibility-ZNuRYP72-ZNuRYP72
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:13.253Z
---

- [Overview](/latest/components/button/overview-oxxMcy7u)
- [Design](/latest/components/button/design-iZBfrVzQ)
- [Figma](/latest/components/button/figma-6AunFFwR-6AunFFwR)
- [React](/latest/components/button/react-nOaPrtDf)
- [HTML](/latest/components/button/html-5rGayGNG)
- [Accessibility](/latest/components/button/accessibility-ZNuRYP72-ZNuRYP72)

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

- Avoid overusing ARIA if native HTML semantics (e.g., <button>) provide the same functionality.

### Size and Touch Targets

- Buttons must be large enough to be easily clickable/tappable.

- The recommended minimum touch target is 44 × 44 px (per WCAG).

- Ensure text inside buttons remains legible and does not overflow.

On this page

- [Accessibility](#section-accessibility-41)
- [Keyboard Interaction](#section-keyboard-interaction-94)
- [Screen Readers and Labels](#section-screen-readers-and-labels-bf)
- [States and Feedback](#section-states-and-feedback-9f)
- [Color and Contrast](#section-color-and-contrast-2e)
- [ARIA and Attributes](#section-aria-and-attributes-9c)
- [Size and Touch Targets](#section-size-and-touch-targets-37)
