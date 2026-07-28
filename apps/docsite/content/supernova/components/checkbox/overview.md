---
title: Checkbox
sourceUrl: https://spirit.supernova-docs.io/latest/components/checkbox/overview-rAiP3oPA
sourcePath: /latest/components/checkbox/overview-rAiP3oPA
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:13.725Z
---

- [Overview](/latest/components/checkbox/overview-rAiP3oPA)
- [Design](/latest/components/checkbox/design-GHatYJqE)
- [Figma](/latest/components/checkbox/figma-r6UttBpV-r6UttBpV)
- [HTML](/latest/components/checkbox/html-ECb975Nl)
- [React](/latest/components/checkbox/react-iuAqL6ly)
- [Accessibility](/latest/components/checkbox/accessibility-eOGVSzHg-eOGVSzHg)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

The **Checkbox** component enables users to select **one or more options** from a set by toggling small square checkboxes, each paired with a label. A checkmark appears inside the box when selected. It's typically used in forms, settings, and multi-selection scenarios.

---

### **When to Use**

- When users need to select **multiple items independently** (e.g., filter options in a form or settings).

- When each option represents a **binary choice** (selected or not), and selections require **confirmation** (like clicking “Save Changes”).

- When you need to include extended helper text or a group label under the component.

- Should be used for changes that require confirmation after selection.

---

### **When Not to Use**

- When only **one option must be selected** – in that case, use the [**Radio**](/latest/components/radio/overview-EdxtJHuI) component, which enforces single-choice selection.

- When you're capturing an **immediate toggle setting** (like enabling/disabling a feature without further action) – use the [**Toggle**](/latest/components/toggle/overview-xkL1tbNO) component instead.

- For **action execution** (e.g., a “Select All” that triggers something immediately) – use a [**Button**](/latest/components/button/overview-oxxMcy7u).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use clear, concise labels placed to the **right of the checkbox**, and include a **group label** when multiple checkboxes represent related choices.

- Stack checkboxes **vertically** for easier scanning; use horizontal layout sparingly.

- Support the **indeterminate state** for parent checkboxes in nested selections where only some children are checked.

- Ensure labels are short and wrap correctly – don’t truncate with ellipses; wrap underneath aligned to the control.

- If the option needs a longer explanation, use a helper text message below the field.

- Handle focus, hover, disabled, and error states consistently and visibly.

---

### **Difference between Checkbox and Radio**

- **Checkbox**: Allows selecting **multiple options** independently. Choose when users may select zero, one, or many items.

- **Radio**: Permits only **one option selection** within a group – ideal for mutually exclusive choices or preference selection. If only a single choice is needed, use Radio instead.

On this page

- [Design Usage](#section-design-usage-54)
- [When to Use](#section-when-to-use-e4)
- [When Not to Use](#section-when-not-to-use-93)
- [Best Practices](#section-best-practices-84)
- [Difference between Checkbox and Radio](#section-difference-between-checkbox-and-radio-a3)
