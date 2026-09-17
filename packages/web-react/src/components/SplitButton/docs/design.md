---
title: Split Button
---

![Split button](https://studio-assets.supernova.io/design-systems/10180/7ba318d8-216b-46ac-916a-a9a3e1e9c807.png)

Color Primary

![Split button](https://studio-assets.supernova.io/design-systems/10180/e4c76992-75cd-4303-b9c4-ff161b7d3c26.png)

Color Secondary

![Split button](https://studio-assets.supernova.io/design-systems/10180/462938f4-4d12-49f6-acdd-ea70f93ee4c7.png)

Color Tertiary

Split button

| Property         | Values    | Default   |
| ---------------- | --------- | --------- |
| Color Variant    | Primary   | Secondary | Tertiary  | Primary |
| Count Variant    | 2 buttons | 3 buttons | 2 buttons |
| Disabled Variant | False     | True      | False     |

## **Split Button vs. Button vs. Segmented Control vs. Dropdown**

| Component         | Use when                                                                          | Strengths                                                                 | Don’t use when                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | There’s a single clear action.                                                    | Simple, direct, easy to understand.                                       | If you need related secondary actions – use Split Button.                                                                                                           |
| Split Button      | There’s a primary action plus a few closely related secondary actions.            | Combines efficiency (quick main action) with flexibility (extra choices). | If only one action exists – use Button. If actions are equally important – use Segmented Control. If actions are too many/unrelated – use Dropdown or Action Group. |
| Segmented Control | The user must pick one of several equally important options (mutually exclusive). | Shows all options upfront, supports quick comparison.                     | If one action is dominant and others are secondary – use Split Button. If many options exist – use Dropdown.                                                        |
| Dropdown          | There are many options or the actions are not tied to a single primary action.    | Compact, scalable, good for long or dynamic lists.                        | If one option is clearly primary – use Split Button. If only 2–5 options and all are equally important – use Segmented Control.                                     |
