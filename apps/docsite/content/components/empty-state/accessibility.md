---
title: Empty State
---

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
