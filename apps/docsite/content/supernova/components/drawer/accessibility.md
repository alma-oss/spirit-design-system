---
title: Drawer
sourceUrl: https://spirit.supernova-docs.io/latest/components/drawer/accessibility-0eIQjr9i-0eIQjr9i
sourcePath: /latest/components/drawer/accessibility-0eIQjr9i-0eIQjr9i
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:16.231Z
---

- [Overview](/latest/components/drawer/overview-DsjvffCu)
- [Design](/latest/components/drawer/design-kW1mWVYo-kW1mWVYo)
- [Figma](/latest/components/drawer/figma-BDF1Zdxs-BDF1Zdxs)
- [HTML](/latest/components/drawer/html-Y3NL719K)
- [React](/latest/components/drawer/react-m5mxeG6X-m5mxeG6X)
- [Accessibility](/latest/components/drawer/accessibility-0eIQjr9i-0eIQjr9i)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger**

- The element opening the Drawer must be a semantic button or link with an accessible label.

- Manage aria-expanded="true/false" if applicable.

### **Container**

- The Drawer should be a **dialog container** with role="dialog" or role="complementary".

- Use aria-labelledby to tie the Drawer to its heading.

- If the Drawer overlays the page and traps focus, add aria-modal="true".

### **Keyboard Support**

- **Tab** cycles through interactive elements inside the Drawer.

- **Esc** closes the Drawer and returns focus to the trigger.

- Ensure focus is set to the Drawer when it opens (first focusable element or heading).

### **Dismissal**

- Provide a clear close button (aria-label="Close").

- Allow closing by clicking outside the Drawer if it’s non-critical.

- Focus must return to the trigger when closed.

### **Contrast and Touch**

- Ensure text and actions inside the Drawer meet **WCAG AA** contrast.

- Maintain adequate touch targets (~44×44 px).

### **Responsive Behavior**

- On small screens, Drawers may cover the entire viewport – ensure this is intentional and doesn’t break navigation.

On this page

- [Accessibility](#section-accessibility-3d)
- [Trigger](#section-trigger-ee)
- [Container](#section-container-27)
- [Keyboard Support](#section-keyboard-support-50)
- [Dismissal](#section-dismissal-21)
- [Contrast and Touch](#section-contrast-and-touch-b2)
- [Responsive Behavior](#section-responsive-behavior-57)
