---
title: Toast
sourceUrl: https://spirit.supernova-docs.io/latest/components/toast/accessibility-qks0FFOu-qks0FFOu
sourcePath: /latest/components/toast/accessibility-qks0FFOu-qks0FFOu
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:34.171Z
---

- [Overview](/latest/components/toast/overview-fGKpsqnF)
- [Design](/latest/components/toast/design-EmnRnU5B-EmnRnU5B)
- [Figma](/latest/components/toast/figma-yh32lmgJ-yh32lmgJ)
- [HTML](/latest/components/toast/html-7lYtSNqg)
- [React](/latest/components/toast/react-FK6hrYef)
- [Accessibility](/latest/components/toast/accessibility-qks0FFOu-qks0FFOu)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use role="alert" for urgent messages (announced immediately).

- Use role="status" for non-urgent updates (polite announcement).

### **Announcements**

- Ensure the entire Toast message is announced by screen readers when it appears.

### **Dismissibility**

- Provide a close button with a descriptive aria-label (e.g., aria-label="Dismiss notification").

### **Keyboard**

- Toasts must be focusable if they include actions; otherwise, don’t trap focus.

### **Auto-dismiss**

- Ensure auto-dismiss doesn’t prevent assistive tech users from perceiving the message – consider extending duration or pausing on hover/focus.

### **Color and Contrast**

- Must meet **WCAG AA** in all variants (success, info, warning, error).

### **Motion**

- Entry/exit animations should be subtle and not disorienting.

On this page

- [Accessibility](#section-accessibility-c1)
- [Semantics](#section-semantics-8c)
- [Announcements](#section-announcements-0e)
- [Dismissibility](#section-dismissibility-7d)
- [Keyboard](#section-keyboard-f8)
- [Auto-dismiss](#section-auto-dismiss-5e)
- [Color and Contrast](#section-color-and-contrast-f7)
- [Motion](#section-motion-7b)
