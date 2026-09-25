---
title: Toggle
---

![Input-Toggle](https://studio-assets.supernova.io/design-systems/10180/2fa17f1c-63c6-4fbc-a7f4-a43543165971.png)

Selected False

![Input-Toggle](https://studio-assets.supernova.io/design-systems/10180/c587218a-6e09-493a-a6e0-9c59e9f38dae.png)

Selected True

Input-Toggle

| Property         | Values | Default |
| ---------------- | ------ | ------- |
| Focused Variant  | False  | True    | False |
| Disabled Variant | False  | True    | False |
| Selected Variant | False  | True    | False |

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
