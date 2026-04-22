---
title: Checkbox
sourceUrl: https://spirit.supernova-docs.io/latest/components/checkbox/accessibility-eOGVSzHg-eOGVSzHg
sourcePath: /latest/components/checkbox/accessibility-eOGVSzHg-eOGVSzHg
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.268Z
---

- [Overview](/latest/components/checkbox/overview-rAiP3oPA)
- [Design](/latest/components/checkbox/design-GHatYJqE)
- [Figma](/latest/components/checkbox/figma-r6UttBpV-r6UttBpV)
- [HTML](/latest/components/checkbox/html-ECb975Nl)
- [React](/latest/components/checkbox/react-iuAqL6ly)
- [Accessibility](/latest/components/checkbox/accessibility-eOGVSzHg-eOGVSzHg)

## **Accessibility**

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use <input type="checkbox"> with a <label> correctly associated (for attribute) or wrap input inside the label.

### **Grouping**

- For multiple related options, use a **fieldset** and **legend** to group them semantically, helping screen readers understand the context.

### **Indeterminate State**

- For parent checkboxes, expose indeterminate=true and ensure assistive tech handles the tri-state accordingly.

### **Keyboard Support**

- Must support **Tab** to focus, and **Space** or **Enter** to toggle. Ensure the focus outline is clearly visible.

### **Label Clarity**

- Labels must be meaningful – avoid vague text like “Option 1.” For icon-only checkboxes (if any), use aria-label to describe purpose.

### **Contrast and Cues**

- Checkbox border and checkmark must have sufficient contrast (WCAG AA). Don’t rely solely on color; use shape or icon to indicate states.

### **Disabled State**

- Disabled checkboxes should be non-focusable, and clearly appear disabled visually (e.g., reduced opacity, shape difference).

On this page

- [Accessibility](#section-accessibility-a2)
- [Semantics](#section-semantics-d8)
- [Grouping](#section-grouping-54)
- [Indeterminate State](#section-indeterminate-state-dd)
- [Keyboard Support](#section-keyboard-support-1f)
- [Label Clarity](#section-label-clarity-cb)
- [Contrast and Cues](#section-contrast-and-cues-2b)
- [Disabled State](#section-disabled-state-96)
