---
title: Select
sourceUrl: https://spirit.supernova-docs.io/latest/components/select/accessibility-kQFwPd8c-kQFwPd8c
sourcePath: /latest/components/select/accessibility-kQFwPd8c-kQFwPd8c
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.982Z
---

- [Overview](/latest/components/select/overview-CJTJAcAW)
- [Design](/latest/components/select/design-VklspBX1)
- [Figma](/latest/components/select/figma-ygWs9zJx-ygWs9zJx)
- [HTML](/latest/components/select/html-M7vV6yEg)
- [React](/latest/components/select/react-z8fkF9Sz)
- [Accessibility](/latest/components/select/accessibility-kQFwPd8c-kQFwPd8c)

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use a native <select> element whenever possible; it provides built-in keyboard and screen reader support.

### **Labeling**

- Every select must have an associated <label> or aria-label.

### **Keyboard Interaction**

- **Tab** focuses the select.

- **Arrow keys** navigate through options.

- **Enter / Space** opens the menu.

- **Esc** closes without selection.

### **Announcing State**

- Screen readers must announce the field label, current selection, and number of options.

### **Option Groups**

- Use <optgroup> with labels to provide context for long lists – announced by screen readers.

### **Contrast**

- Ensure selected and focused states meet WCAG contrast guidelines.

### **Custom Implementations**

- If replacing the native <select>, ensure the component replicates all of the above behavior (ARIA roles, keyboard navigation, focus management, and announcements).

### **Error State**

- Communicate errors both visually (text + color) and via aria-describedby.

On this page

- [Accessibility](#section-accessibility-b5)
- [Semantics](#section-semantics-db)
- [Labeling](#section-labeling-8e)
- [Keyboard Interaction](#section-keyboard-interaction-42)
- [Announcing State](#section-announcing-state-bf)
- [Option Groups](#section-option-groups-a0)
- [Contrast](#section-contrast-b8)
- [Custom Implementations](#section-custom-implementations-ce)
- [Error State](#section-error-state-f9)
