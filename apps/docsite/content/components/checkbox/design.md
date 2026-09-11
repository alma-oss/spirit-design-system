---
title: Checkbox
---

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/820c9a98-826d-4edc-95fe-1c73c4785dc1.png)

Validation State Danger

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/50c30d54-835e-4b42-98d2-090ae77e2934.png)

Validation State None

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/e3d202a3-ce19-4ff8-a3c5-afd2c83e2bb0.png)

Validation State Success

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/ba9857ea-1780-4ebd-adb9-c598c9fa787b.png)

Validation State Warning

Checkbox

| Property                 | Values | Default     |
| ------------------------ | ------ | ----------- |
| Link Boolean             | true   | false       | true    |
| Label Text Text          | string | Label       |
| Helper text Boolean      | true   | false       | true    |
| Label Boolean            | true   | false       | true    |
| Description Boolean      | true   | false       | true    |
| Validation text Boolean  | true   | false       | true    |
| Description Text Text    | string | Description |
| Link Text Text           | string | Link        |
| Disabled Variant         | False  | True        | False   |
| Selected Variant         | False  | True        | False   |
| Indeterminate Variant    | False  | True        | False   |
| Validation State Variant | None   | Success     | Warning | Danger | None |

### **Toggle vs Checkbox vs Radio**

| Component | Use when                                                   | Selection type              | Typical context                                                           | Don’t use when                                                                                  |
| --------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Toggle    | User needs to immediately turn a setting on/off.           | Single, binary (On/Off)     | Preferences, feature switches (e.g., “Dark mode”).                        | If the change requires confirmation or form submission – use Checkbox.                          |
| Checkbox  | User can select multiple independent options (0, 1, many). | Multiple                    | Filters, form options (e.g., “Subscribe to newsletter”, “Add gift wrap”). | If only one option must be chosen – use Radio. If immediate toggle is needed – use Toggle.      |
| Radio     | User must choose exactly one option from a set.            | Single (mutually exclusive) | Forms with exclusive choices (e.g., “Delivery method”, “Payment type”).   | If multiple selections are valid – use Checkbox. If it’s just a binary preference – use Toggle. |
