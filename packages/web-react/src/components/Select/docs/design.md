---
title: Select
---

![Select](https://studio-assets.supernova.io/design-systems/10180/3179a241-7f0f-4055-9ed1-1dc65aaf610f.png)

Validation State None

Select

| Property                  | Values  | Default |
| ------------------------- | ------- | ------- |
| Size Variant              | Small   | Medium  | Large   | Small   |
| Label Boolean             | true    | false   | true    |
| Variant Variant           | Outline | Fill    | Outline |
| Helper Boolean            | true    | false   | true    |
| Disabled Variant          | False   | True    | False   |
| Validation State Variant  | None    | Success | Warning | Danger  | None |
| Interaction State Variant | Default | Open    | Filled  | Default |

---

### **Slider vs Number Field vs Select vs Toggle**

| Component    | Use when                                                                         | Strengths                                            | Don’t use when                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Slider       | A value from a continuous or large range is needed (e.g., price filter, volume). | Quick, intuitive, visual selection; supports ranges. | If precise numeric input is required – use TextField type=”number”. If only a few discrete options exist – use Select or Radio. |
| Number Field | Users must enter a specific, precise numeric value (e.g., age, quantity).        | Allows exact values, supports stepper controls.      | If approximate visual input is fine – use Slider. If the value is categorical rather than numeric – use Select.                 |
| Select       | The choice must be from a set of discrete options (numeric or non-numeric).      | Handles both short and long option lists; compact.   | If the range is continuous and large – use Slider. If only two options exist – use Toggle.                                      |
| Toggle       | For binary yes/no or on/off states.                                              | Simple, fast, clear binary interaction.              | If more than two options exist – use Select or Slider. If precision in numeric range is required – use Number Field.            |
