---
title: Alert
---

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

- For notifications that must **always grab attention** or appear above all content – use [**Toast**](/components/toast).

- For **page-level announcements** or system messages – use [**Toast**](/components/toast).

- For **short hints** attached to UI controls – use [**Tooltip**](/components/tooltip).

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

The [**Toast**](/components/toast) is designed to be an easy-to-spot notification that appears above any content. It should be noticeable every time it pops up, even repeatedly. The ideal setup is to let it disappear automatically after a set amount of time, so no user interaction is required.
