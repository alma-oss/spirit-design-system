---
title: Split Button
sourceUrl: https://spirit.supernova-docs.io/latest/components/split-button/accessibility-jU8UMa3N-jU8UMa3N
sourcePath: /latest/components/split-button/accessibility-jU8UMa3N-jU8UMa3N
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:30.352Z
---

- [Overview](/latest/components/split-button/overview-Gs7ar1gD)
- [Design](/latest/components/split-button/design-rw8HzHv2)
- [Figma](/latest/components/split-button/figma-fNDwga2c-fNDwga2c)
- [HTML](/latest/components/split-button/html-KXVnOSfN)
- [React](/latest/components/split-button/react-MZrbkhRD)
- [Accessibility](/latest/components/split-button/accessibility-jU8UMa3N-jU8UMa3N)

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Structure**

- Use a semantic <button> for the primary action and another <button> with aria-haspopup="menu" + aria-expanded for the dropdown trigger.

### **Menu semantics**

- The dropdown must be a semantic **menu list** (role="menu") with items (role="menuitem").

### **Keyboard support**

- **Tab** moves focus to the Split Button as a whole.

- **Enter/Space** on the primary button executes the default action.

- **Enter/Space/Arrow Down** on the chevron opens the menu.

- **Esc** closes the menu.

- **Arrow keys** navigate between menu items.

### **Focus Management**

- When the menu opens, focus should move into the menu. When it closes, focus should return to the dropdown trigger.

### **Announcements**

- Screen readers should announce the main button label and indicate that the adjacent trigger opens a menu of additional actions.

### **Contrast**

- Ensure both primary and secondary parts meet WCAG contrast and have distinct hover/focus/active states.

On this page

- [Accessibility](#section-accessibility-ca)
- [Structure](#section-structure-09)
- [Menu semantics](#section-menu-semantics-25)
- [Keyboard support](#section-keyboard-support-0b)
- [Focus Management](#section-focus-management-45)
- [Announcements](#section-announcements-ce)
- [Contrast](#section-contrast-11)
