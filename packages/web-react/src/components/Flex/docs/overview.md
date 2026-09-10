---
title: Flex
---

#### Component Status

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

The **Flex** component is a layout utility for arranging elements **along a single axis** (horizontal or vertical). It provides control over alignment, spacing, and distribution of items, making it ideal for **inline groupings and responsive alignment**.

---

### **When to Use**

- To align items in a **row or column**.

- For **horizontal or vertical stacking** with precise control (e.g., buttons, icons with labels).

- When you need to **distribute space** between items (e.g., pushing elements to opposite ends).

- For **responsive alignment** within sections, headers, or footers.

---

### **When Not to Use**

- For **multi-column grids or complex layouts** – use [**Grid**](/design/global-tokens/grid).

- For **semantic grouping of actions (Buttons, Links)** – use [**Action Group**](/components/action-group) instead.

- For **vertical content flow** across multiple sections – use a [**Stack**](/components/stack) or rely on spacing utilities.

- As a replacement for **semantic HTML** – Flex is purely visual.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use Flex for **small-scale alignments**, not full-page layouts.

- Align items consistently (e.g., center icons with text).

- Keep Flex usage **lightweight** – avoid deeply nested Flex wrappers unless necessary.

- Combine with spacing utilities to maintain clear rhythm.

- Use Flex to support **responsiveness** – e.g., collapsing horizontal groups into vertical stacks on smaller screens.
