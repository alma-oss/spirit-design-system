---
title: Button
---

Button

| Property          | Values                                                                                   | Default           |
| ----------------- | ---------------------------------------------------------------------------------------- | ----------------- |
| Size Variant      | Large \| Medium \| Small                                                                 | Large             |
| Color Variant     | Primary \| Secondary \| Tertiary \| Success \| Warning \| Danger \| Informative \| Plain | Primary           |
| Icon InstanceSwap | Icon                                                                                     | Icons/Placeholder |
| Content Variant   | Text \| Text-and-icon \| Icon                                                            | Text              |
| Focused Variant   | False \| True                                                                            | False             |
| Loading Variant   | False \| True                                                                            | False             |
| Disabled Variant  | False \| True                                                                            | False             |
| Label Text Text   | string                                                                                   | Button            |

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
