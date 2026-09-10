---
title: Segmented Control
---

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/41a2ee44-d08b-4e50-b35f-7c2636694207.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/231b361b-2063-4e89-b971-5f2f42032bc3.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/3833ca20-c771-487f-9be8-1a98e3f56e5f.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/d8a01357-8e51-4e8f-b0df-264cc23e9119.png)

Segmented control

| Property           | Values | Default |
| ------------------ | ------ | ------- |
| Count Variant      | 2      | 3       | 4     | 5   | 5   |
| Variant Variant    | Subtle | Basic   | Basic |
| Full-width Variant | False  | True    | False |

## **Split Button vs. Button vs. Segmented Control vs. Dropdown**

| Component         | Use when                                                                          | Strengths                                                                 | Don’t use when                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | There’s a single clear action.                                                    | Simple, direct, easy to understand.                                       | If you need related secondary actions – use Split Button.                                                                                                           |
| Split Button      | There’s a primary action plus a few closely related secondary actions.            | Combines efficiency (quick main action) with flexibility (extra choices). | If only one action exists – use Button. If actions are equally important – use Segmented Control. If actions are too many/unrelated – use Dropdown or Action Group. |
| Segmented Control | The user must pick one of several equally important options (mutually exclusive). | Shows all options upfront, supports quick comparison.                     | If one action is dominant and others are secondary – use Split Button. If many options exist – use Dropdown.                                                        |
| Dropdown          | There are many options or the actions are not tied to a single primary action.    | Compact, scalable, good for long or dynamic lists.                        | If one option is clearly primary – use Split Button. If only 2–5 options and all are equally important – use Segmented Control.                                     |
