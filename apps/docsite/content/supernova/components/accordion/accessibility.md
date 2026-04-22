---
title: Accordion
sourceUrl: https://spirit.supernova-docs.io/latest/components/accordion/accessibility-tywoRtE4-tywoRtE4
sourcePath: /latest/components/accordion/accessibility-tywoRtE4-tywoRtE4
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:10.936Z
---

- [Overview](/latest/components/accordion/overview-TtEldb73)
- [Design](/latest/components/accordion/design-kddP4ZSI)
- [Figma](/latest/components/accordion/figma-Q3pOUXce-Q3pOUXce)
- [HTML](/latest/components/accordion/html-O7zVewq5)
- [React](/latest/components/accordion/react-K8ruxHsr)
- [Accessibility](/latest/components/accordion/accessibility-tywoRtE4-tywoRtE4)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Accordion headers should be buttons (<button>) or elements with role="button".

- Use aria-expanded="true/false" on each header to indicate state.

- Use aria-controls to reference the associated content panel.

### **Content Panels**

- Should have role="region" and a unique aria-labelledby referencing the header.

### **Keyboard Support**

- **Tab** moves between accordion headers.

- **Enter** or **Space** toggles the selected section.

- **Arrow Up/Down** (optional best practice) moves focus between headers in the accordion.

### **Focus Management**

- Keep focus on the header button when toggling; don’t auto-move into the content.

### **Announcements**

- Screen readers must announce when a panel is expanded or collapsed.

### **Contrast and Icons**

- Ensure chevrons/icons have sufficient contrast and rotate or change to indicate state – don’t rely on color alone.

### **Touch Targets**

- Headers must be large enough (~44×44 px) for easy tapping.

On this page

- [Accessibility](#section-accessibility-0b)
- [Semantics](#section-semantics-1e)
- [Content Panels](#section-content-panels-de)
- [Keyboard Support](#section-keyboard-support-08)
- [Focus Management](#section-focus-management-1d)
- [Announcements](#section-announcements-17)
- [Contrast and Icons](#section-contrast-and-icons-70)
- [Touch Targets](#section-touch-targets-f5)
