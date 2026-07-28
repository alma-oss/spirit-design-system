---
title: Empty State
sourceUrl: https://spirit.supernova-docs.io/latest/components/empty-state/accessibility-LqX8NKgW-LqX8NKgW
sourcePath: /latest/components/empty-state/accessibility-LqX8NKgW-LqX8NKgW
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.180Z
---

- [Overview](/latest/components/empty-state/overview-SCh3epQh)
- [Design](/latest/components/empty-state/design-B0fsV8Cm)
- [Figma](/latest/components/empty-state/figma-1cpgDu2D-1cpgDu2D)
- [HTML](/latest/components/empty-state/html-X4G76JPS)
- [React](/latest/components/empty-state/react-OGWR9xa0)
- [Accessibility](/latest/components/empty-state/accessibility-LqX8NKgW-LqX8NKgW)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- The informative text should be real text (not only part of an image).

- Wrap the message in appropriate heading or paragraph tags for clarity.

### **Image or Iicons**

- Decorative illustrations should have empty alt (alt="").

- If the image conveys critical meaning, include descriptive alt text.

### **Actions**

- The primary action must be a semantic button or link with a clear label.

- Ensure focus order leads naturally from the message to the action.

### **Keyboard Support**

- All actions must be reachable via Tab.

- Focus indicators must be visible on interactive elements.

### **Contrast**

- Text and actions must meet **WCAG AA** contrast against the background.

- Ensure illustrations don’t reduce overall clarity.

### **Responsiveness**

- Empty States should scale gracefully, keeping illustration, message, and action balanced on different screen sizes.

On this page

- [Accessibility](#section-accessibility-00)
- [Semantics](#section-semantics-75)
- [Image or Iicons](#section-image-or-iicons-fa)
- [Actions](#section-actions-74)
- [Keyboard Support](#section-keyboard-support-d2)
- [Contrast](#section-contrast-f4)
- [Responsiveness](#section-responsiveness-59)
