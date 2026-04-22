---
title: Dropdown
sourceUrl: https://spirit.supernova-docs.io/latest/components/dropdown/design-4lGD4k4f
sourcePath: /latest/components/dropdown/design-4lGD4k4f
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:16.497Z
---

- [Overview](/latest/components/dropdown/overview-vNMWvfx5)
- [Design](/latest/components/dropdown/design-4lGD4k4f)
- [Figma](/latest/components/dropdown/figma-zlZBwWvn-zlZBwWvn)
- [HTML](/latest/components/dropdown/html-3V2h0KfE)
- [React](/latest/components/dropdown/react-fC6FLInw)
- [Accessibility](/latest/components/dropdown/accessibility-KTpfMs2v-KTpfMs2v)

## **Split Button vs. Button vs. Segmented Control vs. Dropdown**

| Component         | Use when                                                                          | Strengths                                                                 | Don’t use when                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | There’s a single clear action.                                                    | Simple, direct, easy to understand.                                       | If you need related secondary actions → use Split Button.                                                                                                           |
| Split Button      | There’s a primary action plus a few closely related secondary actions.            | Combines efficiency (quick main action) with flexibility (extra choices). | If only one action exists → use Button. If actions are equally important → use Segmented Control. If actions are too many/unrelated → use Dropdown or Action Group. |
| Segmented Control | The user must pick one of several equally important options (mutually exclusive). | Shows all options upfront, supports quick comparison.                     | If one action is dominant and others are secondary → use Split Button. If many options exist → use Dropdown.                                                        |
| Dropdown          | There are many options or the actions are not tied to a single primary action.    | Compact, scalable, good for long or dynamic lists.                        | If one option is clearly primary → use Split Button. If only 2–5 options and all are equally important → use Segmented Control.                                     |

On this page

- [Split Button vs. Button vs. Segmented Control vs. Dropdown](#section-split-button-vs-button-vs-segmented-control-vs-dropdown-a3)
