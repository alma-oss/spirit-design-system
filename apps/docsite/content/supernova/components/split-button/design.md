---
title: Split Button
sourceUrl: https://spirit.supernova-docs.io/latest/components/split-button/design-rw8HzHv2
sourcePath: /latest/components/split-button/design-rw8HzHv2
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:30.028Z
---

- [Overview](/latest/components/split-button/overview-Gs7ar1gD)
- [Design](/latest/components/split-button/design-rw8HzHv2)
- [Figma](/latest/components/split-button/figma-fNDwga2c-fNDwga2c)
- [HTML](/latest/components/split-button/html-KXVnOSfN)
- [React](/latest/components/split-button/react-MZrbkhRD)
- [Accessibility](/latest/components/split-button/accessibility-jU8UMa3N-jU8UMa3N)

![Split button](https://studio-assets.supernova.io/design-systems/10180/fab54238-7110-47df-9d08-049f1a473d9c.png)

Color Disabled

![Split button](https://studio-assets.supernova.io/design-systems/10180/0a3e690e-1068-4185-bb85-128ad89fa7a2.png)

Color Primary

![Split button](https://studio-assets.supernova.io/design-systems/10180/0671f970-01d0-478b-a18c-fcb16bd99fec.png)

Color Secondary

![Split button](https://studio-assets.supernova.io/design-systems/10180/11eaea41-be4b-4c4b-9d4b-59d2b9433fcf.png)

Color Tertiary

Split button

| Property      | Values    | Default   |
| ------------- | --------- | --------- | --------- | -------- | ------- |
| Color Variant | Disabled  | Primary   | Secondary | Tertiary | Primary |
| Count Variant | 2 buttons | 3 buttons | 2 buttons |

## **Split Button vs. Button vs. Segmented Control vs. Dropdown**

| Component         | Use when                                                                          | Strengths                                                                 | Don’t use when                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | There’s a single clear action.                                                    | Simple, direct, easy to understand.                                       | If you need related secondary actions – use Split Button.                                                                                                           |
| Split Button      | There’s a primary action plus a few closely related secondary actions.            | Combines efficiency (quick main action) with flexibility (extra choices). | If only one action exists – use Button. If actions are equally important – use Segmented Control. If actions are too many/unrelated – use Dropdown or Action Group. |
| Segmented Control | The user must pick one of several equally important options (mutually exclusive). | Shows all options upfront, supports quick comparison.                     | If one action is dominant and others are secondary – use Split Button. If many options exist – use Dropdown.                                                        |
| Dropdown          | There are many options or the actions are not tied to a single primary action.    | Compact, scalable, good for long or dynamic lists.                        | If one option is clearly primary – use Split Button. If only 2–5 options and all are equally important – use Segmented Control.                                     |

On this page

- [Split Button vs. Button vs. Segmented Control vs. Dropdown](#section-split-button-vs-button-vs-segmented-control-vs-dropdown-39)
