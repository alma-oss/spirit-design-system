---
title: Toast
---

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/e084b25d-1ce5-4941-9ff2-ff8fa7faabb1.png)

Color Danger

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/d859d5c4-ccb8-4b91-a00e-faf7a0f4abcb.png)

Color Informative

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/8556ede7-9d46-4d4b-9319-5d3fdb968a51.png)

Color Neutral

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/910d16dd-74b9-4758-bc3b-d869bea80b16.png)

Color Success

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/bafd3389-288e-45d4-9008-44a48e4ee41e.png)

Color Warning

Toast Bar

| Property              | Values           | Default                                                                  |
| --------------------- | ---------------- | ------------------------------------------------------------------------ |
| Color Variant         | Informative      | Success                                                                  | Warning         | Danger | Neutral | Neutral |
| Text Short Text       | string           | Short Message                                                            |
| Action Boolean        | true             | false                                                                    | true            |
| Icon Boolean          | true             | false                                                                    | true            |
| Dismissible Boolean   | true             | false                                                                    | true            |
| Description Text Text | string           | This is an example of a longer text that probably fills at least 2 lines |
| Action Text Text      | string           | Action                                                                   |
| Layout Type Variant   | Single Text Line | More Text Lines                                                          | More Text Lines |

### **Alert vs Toast vs Modal**

| Component | Use when                                                                                                      | Strengths                                                                      | Don’t use when                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Alert     | To show inline, contextual feedback tied to a section or element (e.g., form errors, success confirmation).   | Always visible, persistent until resolved, directly related to nearby content. | If the message must grab global attention or float above content – use Toast. If the message requires blocking action – use Modal. |
| Toast     | To show global, temporary notifications that appear above page content (e.g., “Settings saved successfully”). | Highly noticeable, auto-dismisses, consistent placement across app.            | If the message is context-specific – use Alert. If it needs user decision or persistence – use Modal.                              |
| Modal     | To present blocking information or decisions that require user action before proceeding.                      | Focused, forces user attention, supports detailed info or forms.               | For lightweight status or feedback – use Alert/Toast. For subtle hints or inline guidance – use Tooltip/inline help.               |
