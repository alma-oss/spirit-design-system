---
title: Checkbox
sourceUrl: https://spirit.supernova-docs.io/latest/components/checkbox/design-GHatYJqE
sourcePath: /latest/components/checkbox/design-GHatYJqE
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.316Z
---

- [Overview](/latest/components/checkbox/overview-rAiP3oPA)
- [Design](/latest/components/checkbox/design-GHatYJqE)
- [Figma](/latest/components/checkbox/figma-r6UttBpV-r6UttBpV)
- [HTML](/latest/components/checkbox/html-ECb975Nl)
- [React](/latest/components/checkbox/react-iuAqL6ly)
- [Accessibility](/latest/components/checkbox/accessibility-eOGVSzHg-eOGVSzHg)

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/8a4a4969-7a8d-457a-8c84-ce25f389f578.png)

Validation State Danger

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/29a28252-5df8-4028-acbd-731ac3396cfe.png)

Validation State None

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/d6b8fe49-5d3c-47cd-ab9f-e51de13dd65c.png)

Validation State Success

![Checkbox](https://studio-assets.supernova.io/design-systems/10180/7872b597-f705-46c3-9e50-c151888ac463.png)

Validation State Warning

Checkbox

| Property                 | Values  | Default |
| ------------------------ | ------- | ------- | ------- | -------- | ------- |
| State Variant            | Default | Hover   | Active  | Disabled | Default |
| Link Boolean             | true    | false   | true    |
| Helper text Boolean      | true    | false   | true    |
| Label Boolean            | true    | false   | true    |
| Description Boolean      | true    | false   | true    |
| Validation text Boolean  | true    | false   | true    |
| Disabled Variant         | False   | True    | False   |
| Selected Variant         | False   | True    | False   |
| Indeterminate Variant    | False   | True    | False   |
| Validation State Variant | None    | Success | Warning | Danger   | None    |

### **Toggle vs Checkbox vs Radio**

| Component | Use when                                                   | Selection type              | Typical context                                                           | Don’t use when                                                                                  |
| --------- | ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Toggle    | User needs to immediately turn a setting on/off.           | Single, binary (On/Off)     | Preferences, feature switches (e.g., “Dark mode”).                        | If the change requires confirmation or form submission – use Checkbox.                          |
| Checkbox  | User can select multiple independent options (0, 1, many). | Multiple                    | Filters, form options (e.g., “Subscribe to newsletter”, “Add gift wrap”). | If only one option must be chosen – use Radio. If immediate toggle is needed – use Toggle.      |
| Radio     | User must choose exactly one option from a set.            | Single (mutually exclusive) | Forms with exclusive choices (e.g., “Delivery method”, “Payment type”).   | If multiple selections are valid – use Checkbox. If it’s just a binary preference – use Toggle. |

On this page

- [Toggle vs Checkbox vs Radio](#section-toggle-vs-checkbox-vs-radio-f7)
