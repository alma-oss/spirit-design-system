---
title: Radio
sourceUrl: https://spirit.supernova-docs.io/latest/components/radio/accessibility-nymIKJ0F-nymIKJ0F
sourcePath: /latest/components/radio/accessibility-nymIKJ0F-nymIKJ0F
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.040Z
---

- [Overview](/latest/components/radio/overview-EdxtJHuI)
- [Design](/latest/components/radio/design-jjAOakcx)
- [Figma](/latest/components/radio/figma-cDxV6wiK-cDxV6wiK)
- [HTML](/latest/components/radio/html-gl2lwjtF)
- [React](/latest/components/radio/react-gCApXSpA)
- [Accessibility](/latest/components/radio/accessibility-nymIKJ0F-nymIKJ0F)

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use <input type="radio"> with associated <label>.

- Radios in the same group must share the same name attribute, so only one can be selected.

### **Grouping**

- Always group related radio buttons inside a **fieldset** with a **legend** to provide context for screen readers.

### **Keyboard Support**

- **Tab** moves focus into the group.

- **Arrow keys** move between options within the group.

- **Space** or **Enter** selects the focused option.

### **State Announcement**

- Screen readers must announce both the label and whether the option is selected.

### **Label and ARIA labels**

- Each radio must have a clear, visible label.

- If labels are not visible, use aria-label or aria-labelledby.

### **Contrast**

- Radio circles and the selected dot must meet WCAG AA contrast ratios in all states (default, hover, focus, disabled).

### **Disabled State**

- Disabled radios must be visually distinct and not focusable.

On this page

- [Accessibility](#section-accessibility-9e)
- [Semantics](#section-semantics-5d)
- [Grouping](#section-grouping-58)
- [Keyboard Support](#section-keyboard-support-42)
- [State Announcement](#section-state-announcement-cd)
- [Label and ARIA labels](#section-label-and-aria-labels-f7)
- [Contrast](#section-contrast-4a)
- [Disabled State](#section-disabled-state-f7)
