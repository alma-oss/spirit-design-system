---
title: Segmented Control
sourceUrl: https://spirit.supernova-docs.io/latest/components/segmented-control/design-tAUoHW3n
sourcePath: /latest/components/segmented-control/design-tAUoHW3n
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.338Z
---

- [Overview](/latest/components/segmented-control/overview-nz3Ky39G)
- [Design](/latest/components/segmented-control/design-tAUoHW3n)
- [Figma](/latest/components/segmented-control/figma-Xmhl7KtD-Xmhl7KtD)
- [HTML](/latest/components/segmented-control/html-bMgACLMi)
- [React](/latest/components/segmented-control/react-kKd84idp)
- [Accessibility](/latest/components/segmented-control/accessibility-Sgmdxybu-Sgmdxybu)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/d33c51cb-f5f3-44db-90f9-ccf54ae73ed6.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/3d444d13-21be-44f2-8eab-402ef45a3cb8.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/554b7bdd-33b1-4f8f-a40f-680f99cad033.png)

![Segmented control](https://studio-assets.supernova.io/design-systems/10180/6b950d81-ce0e-41fc-8fb9-6ef782913923.png)

Segmented control

| Property           | Values | Default |
| ------------------ | ------ | ------- | ----- | --- | --- |
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

On this page

- [Split Button vs. Button vs. Segmented Control vs. Dropdown](#section-split-button-vs-button-vs-segmented-control-vs-dropdown-9b)
