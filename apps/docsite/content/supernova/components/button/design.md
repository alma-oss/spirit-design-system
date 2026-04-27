---
title: Button
sourceUrl: https://spirit.supernova-docs.io/latest/components/button/design-iZBfrVzQ
sourcePath: /latest/components/button/design-iZBfrVzQ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:12.951Z
---

- [Overview](/latest/components/button/overview-oxxMcy7u)
- [Design](/latest/components/button/design-iZBfrVzQ)
- [Figma](/latest/components/button/figma-6AunFFwR-6AunFFwR)
- [React](/latest/components/button/react-nOaPrtDf)
- [HTML](/latest/components/button/html-5rGayGNG)
- [Accessibility](/latest/components/button/accessibility-ZNuRYP72-ZNuRYP72)

![Button](https://studio-assets.supernova.io/design-systems/10180/f7a036da-9111-4383-bb17-1daf307371e5.png)

Color Danger

![Button](https://studio-assets.supernova.io/design-systems/10180/f95ce786-ffd2-4825-a0f7-602e32266b6a.png)

Color Informative

![Button](https://studio-assets.supernova.io/design-systems/10180/bbcf0fc9-ec40-4b5b-a7f9-72dd831df971.png)

Color Secondary

![Button](https://studio-assets.supernova.io/design-systems/10180/55bc6ebd-1cad-4735-bf0a-d9ebe6c76fb1.png)

Color Success

![Button](https://studio-assets.supernova.io/design-systems/10180/fb843286-0479-4cf4-ab48-6e438d409204.png)

Color Plain

![Button](https://studio-assets.supernova.io/design-systems/10180/d0e7b0b2-dc35-460d-8e05-7c02b2112655.png)

Color Primary

![Button](https://studio-assets.supernova.io/design-systems/10180/37d7e3c2-c3d6-4832-9b7f-135579166beb.png)

Color Tertiary

![Button](https://studio-assets.supernova.io/design-systems/10180/716fe176-b2c3-4480-88cf-4b69a321964a.png)

Color Warning

Button

| Property                  | Values  | Default           |
| ------------------------- | ------- | ----------------- | -------- | -------- | ------- | ------ | ----------- | ----- | ------- |
| Size Variant              | Large   | Medium            | Small    | Large    |
| Color Variant             | Primary | Secondary         | Tertiary | Success  | Warning | Danger | Informative | Plain | Primary |
| Icon InstanceSwap         | Icon    | Icons/Placeholder |
| Content Variant           | Text    | Text-and-icon     | Icon     | Text     |
| Loading Variant           | False   | True              | False    |
| Disabled Variant          | False   | True              | False    |
| Interaction State Variant | Default | Hover             | Active   | Disabled | Default |

## **Button Variant Decision Guide**

| Action type                                                                  | Recommended variant | Notes                                                    |
| ---------------------------------------------------------------------------- | ------------------- | -------------------------------------------------------- |
| Primary call-to-action (e.g., “Submit”, “Get started”, “Next step”)          | Primary             | Use once per page or section to highlight the main flow. |
| Secondary action (e.g., “Cancel”, “Back”, “Skip”)                            | Secondary           | Appears alongside a primary button; less emphasis.       |
| Low-priority / optional action (e.g., “View all”, “Show details”)            | Tertiary            | Visible but quiet; doesn’t compete with higher actions.  |
| Icon-only trigger / subtle utility (e.g., three-dot menu, close, expand)     | Plain               | Minimal styling; use for non-disruptive actions.         |
| Confirming / positive action (e.g., “Save”, “Apply filters”, “Done”)         | Success             | Signals success, completion, or constructive outcome.    |
| Neutral / informational action (e.g., “Learn more”, “Info”, “Documentation”) | Informative         | Directs users to additional information without urgency. |
| Cautious action (e.g., “Proceed anyway”, “Override”, “Post anyway”)          | Warning             | Signals possible consequences; use sparingly.            |
| Destructive action (e.g., “Delete account”, “Remove”, “Reset”)               | Danger              | Signals irreversible, permanent, destructive action      |

## **Split Button vs. Button vs. Segmented Control vs. Dropdown**

| Component         | Use when                                                                          | Strengths                                                                 | Don’t use when                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button            | There’s a single clear action.                                                    | Simple, direct, easy to understand.                                       | If you need related secondary actions – use Split Button.                                                                                                           |
| Split Button      | There’s a primary action plus a few closely related secondary actions.            | Combines efficiency (quick main action) with flexibility (extra choices). | If only one action exists – use Button. If actions are equally important – use Segmented Control. If actions are too many/unrelated – use Dropdown or Action Group. |
| Segmented Control | The user must pick one of several equally important options (mutually exclusive). | Shows all options upfront, supports quick comparison.                     | If one action is dominant and others are secondary – use Split Button. If many options exist – use Dropdown.                                                        |
| Dropdown          | There are many options or the actions are not tied to a single primary action.    | Compact, scalable, good for long or dynamic lists.                        | If one option is clearly primary – use Split Button. If only 2–5 options and all are equally important – use Segmented Control.                                     |

On this page

- [Button Variant Decision Guide](#section-button-variant-decision-guide-6b)
- [Split Button vs. Button vs. Segmented Control vs. Dropdown](#section-split-button-vs-button-vs-segmented-control-vs-dropdown-fa)
