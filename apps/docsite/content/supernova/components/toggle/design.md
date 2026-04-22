---
title: Toggle
sourceUrl: https://spirit.supernova-docs.io/latest/components/toggle/design-9fBthhF1
sourcePath: /latest/components/toggle/design-9fBthhF1
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:34.869Z
---

- [Overview](/latest/components/toggle/overview-xkL1tbNO)
- [Design](/latest/components/toggle/design-9fBthhF1)
- [Figma](/latest/components/toggle/figma-52AApL1Z-52AApL1Z)
- [HTML](/latest/components/toggle/html-KVGQwkEX)
- [React](/latest/components/toggle/react-QukMZSrz)
- [Accessibility](/latest/components/toggle/accessibility-YbWyo7Jk-YbWyo7Jk)

![Input-Toggle](https://studio-assets.supernova.io/design-systems/10180/81d7050a-e615-4f70-9522-68fd2998674b.png)

Selected False

![Input-Toggle](https://studio-assets.supernova.io/design-systems/10180/afba6c8c-3710-4040-9d2d-2cd10f2a85d2.png)

Selected True

Input-Toggle

| Property         | Values  | Default |
| ---------------- | ------- | ------- | ------ | -------- | ------- |
| State Variant    | Default | Hover   | Active | Disabled | Default |
| Selected Variant | False   | True    | False  |

---

### **Toggle vs Checkbox vs Radio**

| Component | Use when                                                   | Selection type              | Typical context                                                           | Don’t use when                                                                                  |
| --------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Toggle    | User needs to immediately turn a setting on/off.           | Single, binary (On/Off)     | Preferences, feature switches (e.g., “Dark mode”).                        | If the change requires confirmation or form submission – use Checkbox.                          |
| Checkbox  | User can select multiple independent options (0, 1, many). | Multiple                    | Filters, form options (e.g., “Subscribe to newsletter”, “Add gift wrap”). | If only one option must be chosen – use Radio. If immediate toggle is needed – use Toggle.      |
| Radio     | User must choose exactly one option from a set.            | Single (mutually exclusive) | Forms with exclusive choices (e.g., “Delivery method”, “Payment type”).   | If multiple selections are valid – use Checkbox. If it’s just a binary preference – use Toggle. |

---

### **Slider vs Text Field type number vs Select vs Toggle**

| Component              | Use when                                                                         | Strengths                                            | Don’t use when                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Slider                 | A value from a continuous or large range is needed (e.g., price filter, volume). | Quick, intuitive, visual selection; supports ranges. | If precise numeric input is required – use Number Field. If only a few discrete options exist – use Select or Radio.           |
| Text Field type number | Users must enter a specific, precise numeric value (e.g., age, quantity).        | Allows exact values, supports stepper controls.      | If approximate visual input is fine – use Slider. If the value is categorical rather than numeric – use Select.                |
| Select                 | The choice must be from a set of discrete options (numeric or non-numeric).      | Handles both short and long option lists; compact.   | If the range is continuous and large – use Slider. If only two options exist – use Toggle.                                     |
| Toggle                 | For binary yes/no or on/off states.                                              | Simple, fast, clear binary interaction.              | If more than two options exist – use Select or Slider. If precision in numeric range is required – use Text Field type number. |

On this page

- [Toggle vs Checkbox vs Radio](#section-toggle-vs-checkbox-vs-radio-cd)
- [Slider vs Text Field type number vs Select vs Toggle](#section-slider-vs-text-field-type-number-vs-select-vs-toggle-54)
