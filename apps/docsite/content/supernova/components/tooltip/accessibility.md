---
title: Tooltip
sourceUrl: https://spirit.supernova-docs.io/latest/components/tooltip/accessibility-TVRyDsew-TVRyDsew
sourcePath: /latest/components/tooltip/accessibility-TVRyDsew-TVRyDsew
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.269Z
---

- [Overview](/latest/components/tooltip/overview-zhGH30af)
- [Design](/latest/components/tooltip/design-08uxcGKD)
- [Figma](/latest/components/tooltip/figma-0ZlKs0M7-0ZlKs0M7)
- [HTML](/latest/components/tooltip/html-fxoORGmr)
- [React](/latest/components/tooltip/react-ZI9bYUzJ)
- [Accessibility](/latest/components/tooltip/accessibility-TVRyDsew-TVRyDsew)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger Semantics**

- The tooltip should be tied to a **focusable trigger**; don’t rely on mouse hover alone.

### **Association**

- Use aria-describedby on the trigger to reference the tooltip content.

### **Visibility on Focus**

- Show on **focus** and **hover**; hide on **Esc**, blur, or pointer leave.

### **Keyboard**

- Trigger must be reachable via **Tab**; tooltip must not trap focus.

### **Announcements**

- Keep content succinct; excessive text becomes hard to navigate with screen readers.

### **Contrast and Motion**

- Ensure tooltip surface and text meet **WCAG AA**; avoid motion that hinders readability.

### **Touch**

- Provide a reliable tap target and dismissal; consider alternate patterns (Popover/Modal) if persistence is needed. Consider replacing Tooltips with Modals on mobile devices

On this page

- [Accessibility](#section-accessibility-97)
- [Trigger Semantics](#section-trigger-semantics-b3)
- [Association](#section-association-96)
- [Visibility on Focus](#section-visibility-on-focus-27)
- [Keyboard](#section-keyboard-b5)
- [Announcements](#section-announcements-b2)
- [Contrast and Motion](#section-contrast-and-motion-cc)
- [Touch](#section-touch-f4)
