---
title: Modal
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

### Design Usage

- The modal displays important information to a user without requiring them to navigate to a new page. It can be disruptive and should be used thoughtfully.

- The modal component has 3 parts that are designed for different types of content.  
  The **Header** (part 1) contains a header describing the name of the interaction for which the modal is intended.  
  The **Body** (part 2) can hold any content, it may be longer than the current height, in which case it is possible to scroll in this area.  
  The **Footer** (part 3) holds the confirmation of a user action or a safe step back.

- A maximum of two [**Buttons**](/components/button) in the modal footer (Large Content variant) with clear and predictable copy keeps the user's decision smooth and easy.

---

### When to Use

- To present **critical information** or a **decision** that blocks continuation (e.g., confirmation, destructive actions).

- To show **longer explanations** or **supporting details** that don’t fit a tooltip (short paragraphs, small forms).

- To collect a **focused input** without navigating away (e.g., rename, add note).

---

### When Not to Use

- For **brief hints** or micro-explanations – use [**Tooltip**](/components/tooltip) or **inline help** instead.

- For **navigation** between views – prefer [**Tabs**](/components/tabs), [**Segmented Control**](/components/segmented-control), or dedicated pages.

- For **persistent side content** – consider a [**Drawer**](/components/drawer) or an inline panel rather than blocking the page.

- There are components that can sometimes be a lesser disruption for a user e.g. [**Accordion**](/components/accordion) or [**Collapse**](/components/collapse)**.**

- If an interruption hurts the flow, embed the content inline on the page.

---

### Best Practices

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep content **focused**: a clear title, concise body, and a small set of actions.

- Make the **primary action** prominent; place secondary actions logically (Cancel, Close).

- Avoid nesting modals; if extra detail is needed, consider progressive disclosure within the same modal or a non-modal pattern.

- If possible, avoid auto-triggered modals.

- Respect responsive behavior and height limits; avoid scrollable areas within scrollable pages.
