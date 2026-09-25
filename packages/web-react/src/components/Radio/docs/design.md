---
title: Radio
---

![Radio](https://studio-assets.supernova.io/design-systems/10180/6167754b-1391-4b52-8699-c9b9f9598a78.png)

Radio

| Property                 | Values | Default          |
| ------------------------ | ------ | ---------------- |
| Label text Text          | string | Radio Label Text |
| Helper Boolean           | true   | false            | true    |
| Disabled Variant         | False  | True             | False   |
| Selected Variant         | False  | True             | False   |
| Validation State Variant | None   | Success          | Warning | Danger | None |

### **Toggle vs Checkbox vs Radio**

| Component | Use when                                                   | Selection type              | Typical context                                                           | Don’t use when                                                                                  |
| --------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Toggle    | User needs to immediately turn a setting on/off.           | Single, binary (On/Off)     | Preferences, feature switches (e.g., “Dark mode”).                        | If the change requires confirmation or form submission – use Checkbox.                          |
| Checkbox  | User can select multiple independent options (0, 1, many). | Multiple                    | Filters, form options (e.g., “Subscribe to newsletter”, “Add gift wrap”). | If only one option must be chosen – use Radio. If immediate toggle is needed – use Toggle.      |
| Radio     | User must choose exactly one option from a set.            | Single (mutually exclusive) | Forms with exclusive choices (e.g., “Delivery method”, “Payment type”).   | If multiple selections are valid – use Checkbox. If it’s just a binary preference – use Toggle. |
