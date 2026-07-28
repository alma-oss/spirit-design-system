---
title: Toggle
sourceUrl: https://spirit.supernova-docs.io/latest/components/toggle/accessibility-YbWyo7Jk-YbWyo7Jk
sourcePath: /latest/components/toggle/accessibility-YbWyo7Jk-YbWyo7Jk
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:34.657Z
---

- [Overview](/latest/components/toggle/overview-xkL1tbNO)
- [Design](/latest/components/toggle/design-9fBthhF1)
- [Figma](/latest/components/toggle/figma-52AApL1Z-52AApL1Z)
- [HTML](/latest/components/toggle/html-KVGQwkEX)
- [React](/latest/components/toggle/react-QukMZSrz)
- [Accessibility](/latest/components/toggle/accessibility-YbWyo7Jk-YbWyo7Jk)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics and Role**

- Expose the control as a **switch** to assistive tech (e.g., a native checkbox with role="switch") and keep state in checked **/** aria-checked in sync with visuals.

### **Name and Description**

- Provide a **visible label** or aria-label (for icon-only contexts). Use aria-describedby for helper text explaining impact.

### **Keyboard**

- Must be focusable via **Tab** and toggle via **Space** (and **Enter** where applicable). Show a clear **focus indicator**.

### **State Changes**

- Announce changes immediately. If saving asynchronously, communicate progress and result (e.g., “Saving…”, then success/failure).

### **Contrast and Cues**

- Meet **WCAG AA** contrast for handle/track/label in **default/hover/active/disabled**. Do **not** rely on color alone to differentiate On vs. Off—pair with position, label, or icon.

### **Disabled and Loading**

- Disabled toggles should be visually distinct and not focusable; loading should temporarily block further toggles while keeping the label perceivable.

On this page

- [Accessibility](#section-accessibility-36)
- [Semantics and Role](#section-semantics-and-role-d0)
- [Name and Description](#section-name-and-description-34)
- [Keyboard](#section-keyboard-25)
- [State Changes](#section-state-changes-0f)
- [Contrast and Cues](#section-contrast-and-cues-09)
- [Disabled and Loading](#section-disabled-and-loading-be)
