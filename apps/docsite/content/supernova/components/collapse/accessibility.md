---
title: Collapse
sourceUrl: https://spirit.supernova-docs.io/latest/components/collapse/accessibility-NFyNedKk-NFyNedKk
sourcePath: /latest/components/collapse/accessibility-NFyNedKk-NFyNedKk
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.712Z
---

- [Overview](/latest/components/collapse/overview-V3uSQpZM)
- [Design](/latest/components/collapse/design-tYGuvpzX-tYGuvpzX)
- [HTML](/latest/components/collapse/html-XWxryM4M)
- [React](/latest/components/collapse/react-ltmy57Ln)
- [Accessibility](/latest/components/collapse/accessibility-NFyNedKk-NFyNedKk)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger Element**

- Use a <button> as the toggle control.

- Apply aria-expanded="true/false" to indicate state.

- Use aria-controls to reference the collapsible content’s ID.

### **Content Panel**

- Should be a container element with an id referenced by the trigger’s aria-controls.

- Use aria-hidden="true/false" to reflect visibility.

### **Keyboard Support**

- Must be operable via **Tab** focus.

- **Enter** or **Space** toggles the panel.

### **Announcements**

- Screen readers should announce when content is expanded/collapsed.

### **Focus Management**

- Keep focus on the trigger when toggling; don’t auto-shift into the panel.

### **Contrast and Iconography**

- Ensure any chevrons/icons change state (rotation or symbol change), not just color.

On this page

- [Accessibility](#section-accessibility-41)
- [Trigger Element](#section-trigger-element-d7)
- [Content Panel](#section-content-panel-23)
- [Keyboard Support](#section-keyboard-support-56)
- [Announcements](#section-announcements-3b)
- [Focus Management](#section-focus-management-e8)
- [Contrast and Iconography](#section-contrast-and-iconography-b0)
