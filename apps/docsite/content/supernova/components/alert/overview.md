---
title: Alert
sourceUrl: https://spirit.supernova-docs.io/latest/components/alert/overview-ravlpYvH
sourcePath: /latest/components/alert/overview-ravlpYvH
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:11.292Z
---

- [Overview](/latest/components/alert/overview-ravlpYvH)
- [Design](/latest/components/alert/design-IFR7YHl5)
- [Figma](/latest/components/alert/figma-yOlRo9hm-yOlRo9hm)
- [HTML](/latest/components/alert/html-EyD9DYLm)
- [React](/latest/components/alert/react-qnO0Aapr)
- [Accessibility](/latest/components/alert/accessibility-lS7VQ4RQ-lS7VQ4RQ)

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

An **Alert** is a **static notification** placed **inline within a page or section**. It communicates important information directly tied to the surrounding content – for example, warnings in a form, success confirmation near an action, or contextual guidance.

---

### **When to Use**

- To display **contextual feedback** related to a specific section (e.g., “Your resume is missing some important information.”).

- To confirm **success, error, warning, or info** states tied to inline content.

- When the message must **remain visible** until the user takes corrective action or navigates away.

- For **non-disruptive guidance** that still needs prominence.

---

### **When Not to Use**

- For notifications that must **always grab attention** or appear above all content – use [**Toast**](/latest/components/toast/overview-fGKpsqnF).

- For **page-level announcements** or system messages – use [**Toast**](/latest/components/toast/overview-fGKpsqnF).

- For **short hints** attached to UI controls – use [**Tooltip**](/latest/components/tooltip/overview-zhGH30af).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Place alerts **close to the element or section** they refer to.

- Use **clear, concise text** – state what happened and what the user should do next.

- Choose the right **semantic variant** (success, info, warning, error) consistently.

- **Avoid stacking multiple alerts** – prioritise and consolidate where possible.

---

### Correct Usage of Alert and Toast Components

The **Alert** is intended to be a static notification directly related to a specific section or context. It is not meant to be used as a standalone element but as a supplement to a larger content block. Depending on its purpose, it can either remain on the page or disappear after the page is reloaded.

The [**Toast**](/latest/components/toast/overview-fGKpsqnF) is designed to be an easy-to-spot notification that appears above any content. It should be noticeable every time it pops up, even repeatedly. The ideal setup is to let it disappear automatically after a set amount of time, so no user interaction is required.

On this page

- [Design Usage](#section-design-usage-00)
- [When to Use](#section-when-to-use-a3)
- [When Not to Use](#section-when-not-to-use-64)
- [Best Practices](#section-best-practices-3a)
- [Correct Usage of Alert and Toast Components](#section-correct-usage-of-alert-and-toast-components-15)
