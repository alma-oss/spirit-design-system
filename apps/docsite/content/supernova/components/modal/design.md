---
title: Modal
sourceUrl: https://spirit.supernova-docs.io/latest/components/modal/design-WRoHz9QS
sourcePath: /latest/components/modal/design-WRoHz9QS
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:22.357Z
---

- [Overview](/latest/components/modal/overview-1gk69bB0)
- [Design](/latest/components/modal/design-WRoHz9QS)
- [Figma](/latest/components/modal/figma-73QUrKq1-73QUrKq1)
- [HTML](/latest/components/modal/html-ApI0gnTq)
- [React](/latest/components/modal/react-zfdnvi4h)
- [Accessibility](/latest/components/modal/accessibility-6KSvE5Lw-6KSvE5Lw)

![Modal](https://studio-assets.supernova.io/design-systems/10180/89e71f10-575a-4742-b8c9-d3421ea30ccb.png)

Layout Examples Fixed Height

![Modal](https://studio-assets.supernova.io/design-systems/10180/dba45cec-e125-4d0f-bce1-b563789ff385.png)

Layout Examples Illustration

![Modal](https://studio-assets.supernova.io/design-systems/10180/a00993e7-4cca-423f-b206-cb8e437c4d3a.png)

Layout Examples Responsive Height

![Modal](https://studio-assets.supernova.io/design-systems/10180/86b09146-8627-414f-8b5e-4cf17da30744.png)

Layout Examples Scroll View

Modal

| Property                 | Values            | Default      |
| ------------------------ | ----------------- | ------------ | ----------- | ------------ | ----------------- |
| Breakpoint Variant       | Desktop           | Tablet       | Mobile      | Desktop      |
| Alignment Y Variant      | Center            | Bottom       | Center      |
| Layout Examples Variant  | Responsive Height | Fixed Height | Scroll View | Illustration | Responsive Height |
| Docked On Mobile Variant | False             | True         | False       |

### Practical decision tips (addressing the common misuse)

- If your content is **more than a quick hint**, needs **links** or **interaction**, or must remain visible while the user considers it – **Modal** (blocking) or **Alert** (non-blocking) or **Toast** (dismissible).

- If it’s a **single sentence of optional context** for a control – **Tooltip**.

- If you’re switching between **equally important views** – **Segmented Control**, not Modal/Tooltip.

### **Alert vs Toast vs Modal**

| Component | Use when                                                                                                      | Strengths                                                                      | Don’t use when                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Alert     | To show inline, contextual feedback tied to a section or element (e.g., form errors, success confirmation).   | Always visible, persistent until resolved, directly related to nearby content. | If the message must grab global attention or float above content – use Toast. If the message requires blocking action – use Modal. |
| Toast     | To show global, temporary notifications that appear above page content (e.g., “Settings saved successfully”). | Highly noticeable, auto-dismisses, consistent placement across app.            | If the message is context-specific – use Alert. If it needs user decision or persistence – use Modal.                              |
| Modal     | To present blocking information or decisions that require user action before proceeding.                      | Focused, forces user attention, supports detailed info or forms.               | For lightweight status or feedback – use Alert/Toast. For subtle hints or inline guidance – use Tooltip/Inline help.               |

On this page

- [Practical decision tips (addressing the common misuse)](#section-practical-decision-tips-addressing-the-common-misuse-e4)
- [Alert vs Toast vs Modal](#section-alert-vs-toast-vs-modal-34)
