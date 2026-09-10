---
title: Button
---

![Button](https://studio-assets.supernova.io/design-systems/10180/01da359b-8b2c-4bb1-9b45-6266e315e163.png)

Color Primary

![Button](https://studio-assets.supernova.io/design-systems/10180/4ce5d31d-4c9f-4e47-9e65-7c69e309e60a.png)

Color Plain

![Button](https://studio-assets.supernova.io/design-systems/10180/2ea20651-d0e0-4168-a20a-71d263494f42.png)

Color Secondary

![Button](https://studio-assets.supernova.io/design-systems/10180/92a565df-6e11-4d39-ae06-6776a8d77660.png)

Color Danger

![Button](https://studio-assets.supernova.io/design-systems/10180/a9c698b0-77a1-4cf4-a1ce-3afc5589aa8d.png)

Color Informative

![Button](https://studio-assets.supernova.io/design-systems/10180/666f4e79-fdac-4d6e-81bc-c11e7ba6e01a.png)

Color Tertiary

![Button](https://studio-assets.supernova.io/design-systems/10180/a6302322-5272-4645-bf3e-56e3d4e0e8dd.png)

Color Success

![Button](https://studio-assets.supernova.io/design-systems/10180/9d79dbb9-8f62-4a69-9b2c-76e4d8711e6e.png)

Color Warning

Button

| Property          | Values  | Default           |
| ----------------- | ------- | ----------------- |
| Size Variant      | Large   | Medium            | Small    | Large   |
| Color Variant     | Primary | Secondary         | Tertiary | Success | Warning | Danger | Informative | Plain | Primary |
| Icon InstanceSwap | Icon    | Icons/Placeholder |
| Content Variant   | Text    | Text-and-icon     | Icon     | Text    |
| Focused Variant   | False   | True              | False    |
| Loading Variant   | False   | True              | False    |
| Disabled Variant  | False   | True              | False    |
| Label Text Text   | string  | Button            |

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
