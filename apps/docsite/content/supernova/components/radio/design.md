---
title: Radio
sourceUrl: https://spirit.supernova-docs.io/latest/components/radio/design-jjAOakcx
sourcePath: /latest/components/radio/design-jjAOakcx
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.855Z
---

- [Overview](/latest/components/radio/overview-EdxtJHuI)
- [Design](/latest/components/radio/design-jjAOakcx)
- [Figma](/latest/components/radio/figma-cDxV6wiK-cDxV6wiK)
- [HTML](/latest/components/radio/html-gl2lwjtF)
- [React](/latest/components/radio/react-gCApXSpA)
- [Accessibility](/latest/components/radio/accessibility-nymIKJ0F-nymIKJ0F)

![Radio](https://studio-assets.supernova.io/design-systems/10180/3794a1c9-d14d-4a70-8911-68523e87915d.png)

Interaction State Selected

![Radio](https://studio-assets.supernova.io/design-systems/10180/fce47d9e-65cf-4f32-8ada-47db801bc5a9.png)

Interaction State Unselected

Radio

| Property                  | Values     | Default          |
| ------------------------- | ---------- | ---------------- | ---------- | -------- | ------- |
| State Variant             | Default    | Hover            | Active     | Disabled | Default |
| Label text Text           | string     | Radio Label Text |
| Helper Boolean            | true       | false            | true       |
| Disabled Variant          | False      | True             | False      |
| Validation State Variant  | None       | Success          | Warning    | Danger   | None    |
| Interaction State Variant | Unselected | Selected         | Unselected |

### **Toggle vs Checkbox vs Radio**

| Component | Use when                                                   | Selection type              | Typical context                                                           | Don’t use when                                                                                  |
| --------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Toggle    | User needs to immediately turn a setting on/off.           | Single, binary (On/Off)     | Preferences, feature switches (e.g., “Dark mode”).                        | If the change requires confirmation or form submission – use Checkbox.                          |
| Checkbox  | User can select multiple independent options (0, 1, many). | Multiple                    | Filters, form options (e.g., “Subscribe to newsletter”, “Add gift wrap”). | If only one option must be chosen – use Radio. If immediate toggle is needed – use Toggle.      |
| Radio     | User must choose exactly one option from a set.            | Single (mutually exclusive) | Forms with exclusive choices (e.g., “Delivery method”, “Payment type”).   | If multiple selections are valid – use Checkbox. If it’s just a binary preference – use Toggle. |

On this page

- [Toggle vs Checkbox vs Radio](#section-toggle-vs-checkbox-vs-radio-d9)
