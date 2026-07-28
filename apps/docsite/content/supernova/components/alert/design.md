---
title: Alert
sourceUrl: https://spirit.supernova-docs.io/latest/components/alert/design-IFR7YHl5
sourcePath: /latest/components/alert/design-IFR7YHl5
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:11.584Z
---

- [Overview](/latest/components/alert/overview-ravlpYvH)
- [Design](/latest/components/alert/design-IFR7YHl5)
- [Figma](/latest/components/alert/figma-yOlRo9hm-yOlRo9hm)
- [HTML](/latest/components/alert/html-EyD9DYLm)
- [React](/latest/components/alert/react-qnO0Aapr)
- [Accessibility](/latest/components/alert/accessibility-lS7VQ4RQ-lS7VQ4RQ)

![Alert](https://studio-assets.supernova.io/design-systems/10180/d0eb5e01-3513-4b61-800d-73c6c731b7c9.png)

Color Danger

![Alert](https://studio-assets.supernova.io/design-systems/10180/e43c2a87-9e8c-47eb-a6ce-ccad22d39ded.png)

Color Informative

![Alert](https://studio-assets.supernova.io/design-systems/10180/958f13f8-275b-452c-bea3-a202927b308d.png)

Color Success

![Alert](https://studio-assets.supernova.io/design-systems/10180/718dd01b-83c6-413d-ad7f-68651097d282.png)

Color Warning

Alert

| Property              | Values      | Default                                                                    |
| --------------------- | ----------- | -------------------------------------------------------------------------- | ---------- | ------ | ----------- |
| Color Variant         | Informative | Success                                                                    | Warning    | Danger | Informative |
| Success Text Text     | string      | You have submitted a reply to a job offer.                                 |
| Danger Text Text      | string      | You can reply to a job offer by filling in the first and last name fields. |
| Informative Text Text | string      | We have sent you an activation code to the e-mail jiri@spiriuikit.         |
| Warning Text Text     | string      | Your CV data could not be updated. Check your internet connection.         |
| Headline Boolean      | true        | false                                                                      | true       |
| Link Boolean          | true        | false                                                                      | true       |
| Content align Variant | Full width  | Center                                                                     | Full width |

### **Alert vs Toast vs Modal**

| Component | Use when                                                                                                      | Strengths                                                                      | Don’t use when                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Alert     | To show inline, contextual feedback tied to a section or element (e.g., form errors, success confirmation).   | Always visible, persistent until resolved, directly related to nearby content. | If the message must grab global attention or float above content – use Toast. If the message requires blocking action – use Modal. |
| Toast     | To show global, temporary notifications that appear above page content (e.g., “Settings saved successfully”). | Highly noticeable, auto-dismisses, consistent placement across app.            | If the message is context-specific – use Alert. If it needs user decision or persistence – use Modal.                              |
| Modal     | To present blocking information or decisions that require user action before proceeding.                      | Focused, forces user attention, supports detailed info or forms.               | For lightweight status or feedback → use Alert/Toast. For subtle hints or inline guidance – use Tooltip.                           |

On this page

- [Alert vs Toast vs Modal](#section-alert-vs-toast-vs-modal-de)
