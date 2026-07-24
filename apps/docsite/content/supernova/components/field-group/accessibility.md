---
title: Field Group
sourceUrl: https://spirit.supernova-docs.io/latest/components/field-group/accessibility-VQo20Z4H-VQo20Z4H
sourcePath: /latest/components/field-group/accessibility-VQo20Z4H-VQo20Z4H
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.019Z
---

- [Overview](/latest/components/field-group/overview-rFO8KPuP)
- [Design](/latest/components/field-group/design-FdvfV5rr)
- [Figma](/latest/components/field-group/figma-4wHaRtrm-4wHaRtrm)
- [HTML](/latest/components/field-group/html-X9I4G5Is)
- [React](/latest/components/field-group/react-NLYh1mc6)
- [Accessibility](/latest/components/field-group/accessibility-VQo20Z4H-VQo20Z4H)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Native Semantics**

- Wrap related controls in <fieldset>; provide a <legend> that names the group.

- Each Checkbox/Radio must still have an **individual** <label>.

### **Helper and Validation Association**

- Prefer to associate **group-level helper and error text** to **each input** with aria-describedby (e.g., all options reference the same helper/error IDs) so screen readers announce it during focus.

- Alternatively, some ATs will read a description placed on the <fieldset>; if your implementation supports it, you can also add aria-describedby to the <fieldset> itself.

### **Keyboard Interaction**

- **Tab** moves into the group; focus lands on the first focusable option.

- **Radios**: Arrow keys move between options; **Space/Enter** selects.

- **Checkboxes**: **Space** toggles the focused option; each option is independently focusable.

### **Validation and Required**

- Indicate required status in the **legend**; for errors, supply **clear text** (not color-only).

- Expose errors via aria-describedby on the affected controls; optionally use a polite **live region** or role="alert" to announce new errors.

### **Contrast and Hit Targets**

- Ensure labels, focus outlines, and any error icons meet **WCAG AA**; keep comfortable targets, especially on touch devices.

### **Reading Order**

- Keep a logical DOM order: legend → helper → options → validation.

On this page

- [Accessibility](#section-accessibility-a5)
- [Native Semantics](#section-native-semantics-f0)
- [Helper and Validation Association](#section-helper-and-validation-association-03)
- [Keyboard Interaction](#section-keyboard-interaction-18)
- [Validation and Required](#section-validation-and-required-d6)
- [Contrast and Hit Targets](#section-contrast-and-hit-targets-bb)
- [Reading Order](#section-reading-order-a0)
