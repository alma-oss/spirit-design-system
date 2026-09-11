---
title: Matrix
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

The **Matrix** is a layout utility used to create **uniform grid patterns** where items in the same row are horizontally aligned. Unlike **Grid**, which is flexible and adaptive, Matrix ensures consistent alignment and equal sizing of items across rows, making layouts appear balanced and predictable.

---

### **When to Use**

- To display **items of equal size** in rows and columns.

- When visual consistency requires that **all items in a row share the same height** (e.g., product cards, feature comparisons).

- For **uniform content blocks** where alignment matters as much as spacing.

- When you need a clean, **symmetrical presentation** across a set of items.

---

### **When Not to Use**

- For **irregular or freeform layouts** – use [**Grid**](/design/global-tokens/grid) instead.

- For **single-axis alignment** (row or column) – use [**Flex**](/components/flex).

- For **simple vertical spacing** – use [**Stack**](/components/stack).

- For semantic grouping (like lists) – use semantic HTML (&lt;ul>, &lt;section>).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use Matrix when the consistency of **item height and alignment** is important.

- Ensure content inside each cell is **structured similarly** – avoid mixing unrelated elements in one row.

- Keep the number of items per row manageable for readability, especially on smaller screens.

- Combine with **Card** or **Box** components inside Matrix cells for consistent framing.

- Test responsiveness – ensure Matrix adapts gracefully without breaking alignment.
