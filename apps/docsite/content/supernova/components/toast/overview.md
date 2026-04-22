---
title: Toast
sourceUrl: https://spirit.supernova-docs.io/latest/components/toast/overview-fGKpsqnF
sourcePath: /latest/components/toast/overview-fGKpsqnF
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:33.819Z
---

- [Overview](/latest/components/toast/overview-fGKpsqnF)
- [Design](/latest/components/toast/design-EmnRnU5B-EmnRnU5B)
- [Figma](/latest/components/toast/figma-yh32lmgJ-yh32lmgJ)
- [HTML](/latest/components/toast/html-7lYtSNqg)
- [React](/latest/components/toast/react-FK6hrYef)
- [Accessibility](/latest/components/toast/accessibility-qks0FFOu-qks0FFOu)

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

A **Toast** is a **temporary notification** that appears **above page content** (often at the top or bottom of the viewport).

Toasts are designed to **grab attention** whenever they appear, even if repeated, and then usually **disappear automatically** after a short duration.

They are best for **system-level feedback** or ephemeral updates that are not tied to a specific section of the UI.

---

### **When to Use**

- To show **global success, error, or warning messages** after an action (e.g., “Settings saved successfully”).

- For **system notifications** that aren’t tied to one specific control.

- When feedback should be **highly noticeable but temporary**.

- When the user does not need to stay on the message to continue working.

---

### **When Not to Use**

- For **context-specific guidance or validation** – use [**Alert**](/latest/components/alert/overview-ravlpYvH) instead.

- For **persistent information** that must stay visible until resolved.

- For instructions or content that requires **user interaction** – use **Modal** or inline patterns instead.

- For subtle hints – use [**Tooltip**](/latest/components/tooltip/overview-zhGH30af) or **inline help**.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep messages **very short** (one or two sentences).

- Display Toasts in a **consistent position** across the product (e.g., top-right corner).

- Use **auto-dismiss** with a sensible duration (~3–5 seconds), but ensure critical errors can persist or require dismissal.

- Allow users to **dismiss manually** with a close button.

- Avoid showing multiple Toasts at once; queue them or stack with clear separation.

- Use the correct emotion variant according to a positive or negative message.

- Don’t rely solely on color – pair with iconography to indicate severity.

#### Correct usage of Alert and Toast Components

**Toast** is designed to be an easy-to-spot notification that appears above any content. It should be noticeable every time it pops up, even repeatedly. The ideal setup is to let it disappear automatically after a set amount of time, so no user interaction is required.

[**Alert**](/latest/components/alert/overview-ravlpYvH) is intended to be a static notification directly related to a specific section or context. It is not meant to be used as a standalone element but as a supplement to a larger content block. Depending on its purpose, it can either remain on the page or disappear after the page is reloaded.

On this page

- [Design Usage](#section-design-usage-1c)
- [When to Use](#section-when-to-use-27)
- [When Not to Use](#section-when-not-to-use-57)
- [Best Practices](#section-best-practices-75)
