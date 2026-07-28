---
title: Modal
sourceUrl: https://spirit.supernova-docs.io/latest/components/modal/accessibility-6KSvE5Lw-6KSvE5Lw
sourcePath: /latest/components/modal/accessibility-6KSvE5Lw-6KSvE5Lw
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:22.601Z
---

- [Overview](/latest/components/modal/overview-1gk69bB0)
- [Design](/latest/components/modal/design-WRoHz9QS)
- [Figma](/latest/components/modal/figma-73QUrKq1-73QUrKq1)
- [HTML](/latest/components/modal/html-ApI0gnTq)
- [React](/latest/components/modal/react-zfdnvi4h)
- [Accessibility](/latest/components/modal/accessibility-6KSvE5Lw-6KSvE5Lw)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use role="dialog" or role="alertdialog" (for urgent confirmations), plus aria-modal="true".

- Provide a **unique** aria-labelledby (modal title) and optional aria-describedby (supporting text).

- Set the modal title as heading level 1 (<h1>).

### **Focus Management**

- Move focus to the modal on open (typically the first focusable control).

- **Trap focus** within the modal while it’s open.

- Restore focus to the **invoking element** on close.

### **Keyboard Support**

- **Esc** closes (unless a blocking/required action).

- **Tab/Shift+Tab** cycle through focusable elements.

- Provide keyboard-operable primary/secondary actions.

### **Announcements**

- Ensure the title/description is read by screen readers on open.

### **Scrolling Content**

- Keep content readable with accessible scrolling; maintain visible focus outlines as content scrolls.

### **Contrast and Targets**

- Text and buttons must meet **WCAG AA** – ensure visited, hover, and focus states stay legible.

- Ensure comfortable hit areas on touch.

On this page

- [Accessibility](#section-accessibility-95)
- [Semantics](#section-semantics-cc)
- [Focus Management](#section-focus-management-75)
- [Keyboard Support](#section-keyboard-support-c1)
- [Announcements](#section-announcements-0f)
- [Scrolling Content](#section-scrolling-content-e8)
- [Contrast and Targets](#section-contrast-and-targets-99)
