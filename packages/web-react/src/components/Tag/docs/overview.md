---
title: Tag
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

A **Tag** is a compact element used to highlight or classify content with a **keyword, status, or attribute**. Tags help users quickly scan, filter, or understand metadata. They are usually short (one or two words) and can be styled with different **semantic colors** and **intensity levels** (subtle vs. default) to reflect meaning or emphasis.

Tag supports two usage types:

- **Non-interactive (base state)**  
  Used for displaying non-interactive information.

- **Interactive**  
  Used in selection contexts where users can interact with the Tag, typically to remove or modify a selected value (for example, in Picker or multi-select inputs).

Interactive Tag may include:

- click interaction (for selection or navigation)

- a close button for removing the item

Interactive behavior must always be clearly communicated through visual affordances (for example, hover or focus state, close button).

---

## When to use

**Use non-interactive Tag when:**

- displaying **categories**, **labels** or **metadata** (e.g., “New”, “Beta”, “Sold out”)

- displaying **status or state** (e.g., “Active”, “Draft”, “Archived”)

- representing **selected values in inputs** (for example Picker, multi-select, filters)

- users need to **remove or modify selected values** (use interactive Tag with close button)

- **compact representation of multiple items** is needed

**Use interactive Tag when:**

- Tag represents a user-controlled selection

- users need to remove items directly (for example selected filters)

- Tag is part of an input or selection component

---

## When not to use

**Do not use non-interactive Tag when:**

- the **content requires complex interaction** beyond simple selection or removal

- the element should behave as a **primary action** (use [Button](/components/button) instead)

- the element is **part of navigation** (use [Link](/components/link) or [Navigation](/components/navigation) components)

- removal or interaction is not clearly indicated (avoid hidden or unclear affordances)

- for **long text** – Tags should remain short; use inline text or labels for more detail.

- if the label is **critical to task completion** – don’t hide it in a Tag, use a clear inline label.

**Do not use interactive Tag:**

- without a clear visual indication of interactivity

- when removal or interaction is not expected by the user

- as a **replacement for form controls** (for example [Checkbox](/components/checkbox) or [Select](/components/select))

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep Tag text **short and scannable** – ideally a single word.

- Use **semantic colors** consistently (neutral, informative, success, warning, danger) to indicate meaning.

- Choose **subtle variants** for less emphasis and **default variants** when stronger emphasis is needed.

- Select a Tag **size** appropriate to the context, but avoid mixing sizes within the same group.

- Avoid using too many Tags in one view – clutter reduces clarity.

- If Tags are interactive (e.g., removable or filterable), provide a clear visual affordance (like an “x” icon).

- Place Tags **close to the content they describe**.
