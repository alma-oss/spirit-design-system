---
title: Select
sourceUrl: https://spirit.supernova-docs.io/latest/components/select/design-VklspBX1
sourcePath: /latest/components/select/design-VklspBX1
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.961Z
---

- [Overview](/latest/components/select/overview-CJTJAcAW)
- [Design](/latest/components/select/design-VklspBX1)
- [Figma](/latest/components/select/figma-ygWs9zJx-ygWs9zJx)
- [HTML](/latest/components/select/html-M7vV6yEg)
- [React](/latest/components/select/react-z8fkF9Sz)
- [Accessibility](/latest/components/select/accessibility-kQFwPd8c-kQFwPd8c)

![Select](https://studio-assets.supernova.io/design-systems/10180/45a06037-540e-48db-8e87-629d66bf1a04.png)

Validation State None

Select

| Property                  | Values  | Default |
| ------------------------- | ------- | ------- | ------- | ------ | ------- |
| Open Variant              | False   | True    | False   |
| Size Variant              | Medium  | Large   | Small   | Small  |
| Label Boolean             | true    | false   | true    |
| Helper Boolean            | true    | false   | true    |
| Disabled Variant          | False   | True    | False   |
| Validation State Variant  | None    | Success | Warning | Danger | None    |
| Interaction State Variant | Default | Hover   | Open    | Filled | Default |

---

### **Slider vs Number Field vs Select vs Toggle**

| Component    | Use when                                                                         | Strengths                                            | Don’t use when                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Slider       | A value from a continuous or large range is needed (e.g., price filter, volume). | Quick, intuitive, visual selection; supports ranges. | If precise numeric input is required – use TextField type=”number”. If only a few discrete options exist – use Select or Radio. |
| Number Field | Users must enter a specific, precise numeric value (e.g., age, quantity).        | Allows exact values, supports stepper controls.      | If approximate visual input is fine – use Slider. If the value is categorical rather than numeric – use Select.                 |
| Select       | The choice must be from a set of discrete options (numeric or non-numeric).      | Handles both short and long option lists; compact.   | If the range is continuous and large – use Slider. If only two options exist – use Toggle.                                      |
| Toggle       | For binary yes/no or on/off states.                                              | Simple, fast, clear binary interaction.              | If more than two options exist – use Select or Slider. If precision in numeric range is required – use Number Field.            |

On this page

- [Slider vs Number Field vs Select vs Toggle](#section-slider-vs-number-field-vs-select-vs-toggle-01)
