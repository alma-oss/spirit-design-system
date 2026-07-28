---
title: Toast
sourceUrl: https://spirit.supernova-docs.io/latest/components/toast/design-EmnRnU5B-EmnRnU5B
sourcePath: /latest/components/toast/design-EmnRnU5B-EmnRnU5B
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:34.138Z
---

- [Overview](/latest/components/toast/overview-fGKpsqnF)
- [Design](/latest/components/toast/design-EmnRnU5B-EmnRnU5B)
- [Figma](/latest/components/toast/figma-yh32lmgJ-yh32lmgJ)
- [HTML](/latest/components/toast/html-7lYtSNqg)
- [React](/latest/components/toast/react-FK6hrYef)
- [Accessibility](/latest/components/toast/accessibility-qks0FFOu-qks0FFOu)

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/acd727d4-e6b0-4c2b-b519-d87329ee8a68.png)

Color Danger

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/d8c76714-2c3f-4f62-a3c5-75040eeb1655.png)

Color Informative

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/fb846c77-73e8-4d07-ac69-bcf19bca71df.png)

Color Neutral

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/35a0aa98-6803-4e0f-be5b-57188345a882.png)

Color Success

![Toast Bar](https://studio-assets.supernova.io/design-systems/10180/4912ebad-3c72-42d6-aa2f-3954f405b38c.png)

Color Warning

Toast Bar

| Property            | Values           | Default                                                                  |
| ------------------- | ---------------- | ------------------------------------------------------------------------ | --------------- | ------ | ------- | ------- |
| Color Variant       | Informative      | Success                                                                  | Warning         | Danger | Neutral | Neutral |
| Text Short Text     | string           | Short Message                                                            |
| Action Boolean      | true             | false                                                                    | true            |
| Icon Boolean        | true             | false                                                                    | true            |
| Dismissible Boolean | true             | false                                                                    | true            |
| Text Longer Text    | string           | This is an example of a longer text that probably fills at least 2 lines |
| Layout Type Variant | Single Text Line | More Text Lines                                                          | More Text Lines |

### **Alert vs Toast vs Modal**

| Component | Use when                                                                                                      | Strengths                                                                      | Don’t use when                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Alert     | To show inline, contextual feedback tied to a section or element (e.g., form errors, success confirmation).   | Always visible, persistent until resolved, directly related to nearby content. | If the message must grab global attention or float above content – use Toast. If the message requires blocking action – use Modal. |
| Toast     | To show global, temporary notifications that appear above page content (e.g., “Settings saved successfully”). | Highly noticeable, auto-dismisses, consistent placement across app.            | If the message is context-specific – use Alert. If it needs user decision or persistence – use Modal.                              |
| Modal     | To present blocking information or decisions that require user action before proceeding.                      | Focused, forces user attention, supports detailed info or forms.               | For lightweight status or feedback – use Alert/Toast. For subtle hints or inline guidance – use Tooltip/inline help.               |

On this page

- [Alert vs Toast vs Modal](#section-alert-vs-toast-vs-modal-4d)
