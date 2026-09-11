---
title: Slider
---

![Slider](https://studio-assets.supernova.io/design-systems/10180/fc118608-6cf9-4f31-b4d4-de4666ab4d5e.png)

Value 0%

![Slider](https://studio-assets.supernova.io/design-systems/10180/fac4c6fd-eda5-4d53-b688-f8ae2398267a.png)

Value 50%

![Slider](https://studio-assets.supernova.io/design-systems/10180/02301dbc-c16c-4199-adbb-480a5d755296.png)

Value 100%

Slider

| Property                  | Values  | Default |
| ------------------------- | ------- | ------- |
| Value Variant             | 0%      | 50%     | 100%    | 0%  |
| Disabled Variant          | False   | True    | False   |
| Interaction State Variant | Default | Pressed | Default |

---

### **Slider vs Number Field vs Select vs Toggle**

| Component    | Use when                                                                         | Strengths                                            | Don’t use when                                                                                                       |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Slider       | A value from a continuous or large range is needed (e.g., price filter, volume). | Quick, intuitive, visual selection; supports ranges. | If precise numeric input is required – use Text Field. If only a few discrete options exist – use Select or Radio.   |
| Number Field | Users must enter a specific, precise numeric value (e.g., age, quantity).        | Allows exact values, supports stepper controls.      | If approximate visual input is fine – use Slider. If the value is categorical rather than numeric – use Select.      |
| Select       | The choice must be from a set of discrete options (numeric or non-numeric).      | Handles both short and long option lists; compact.   | If the range is continuous and large – use Slider. If only two options exist – use Toggle.                           |
| Toggle       | For binary yes/no or on/off states.                                              | Simple, fast, clear binary interaction.              | If more than two options exist – use Select or Slider. If precision in numeric range is required – use Number Field. |
