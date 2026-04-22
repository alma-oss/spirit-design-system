---
title: Matrix
sourceUrl: https://spirit.supernova-docs.io/latest/components/matrix/overview-uXzlhaFX
sourcePath: /latest/components/matrix/overview-uXzlhaFX
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:21.829Z
---

- [Overview](/latest/components/matrix/overview-uXzlhaFX)
- [Design](/latest/components/matrix/design-Z9CFEvq7-Z9CFEvq7)
- [React](/latest/components/matrix/react-WCuM7L5Y)
- [HTML](/latest/components/matrix/html-TFHkqROT)
- [Accessibility](/latest/components/matrix/accessibility-n5CwNQwZ-n5CwNQwZ)

#### Component Status

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

Twig

Not scheduled

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

- For **irregular or freeform layouts** – use [**Grid**](/latest/design/global-tokens/grid/overview-G7tz28hA) instead.

- For **single-axis alignment** (row or column) – use [**Flex**](/latest/components/flex/overview-696puvxK).

- For **simple vertical spacing** – use [**Stack**](/latest/components/stack/overview-RCo1HEot).

- For semantic grouping (like lists) – use semantic HTML (<ul>, <section>).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use Matrix when the consistency of **item height and alignment** is important.

- Ensure content inside each cell is **structured similarly** – avoid mixing unrelated elements in one row.

- Keep the number of items per row manageable for readability, especially on smaller screens.

- Combine with **Card** or **Box** components inside Matrix cells for consistent framing.

- Test responsiveness – ensure Matrix adapts gracefully without breaking alignment.

On this page

- [Design Usage](#section-design-usage-da)
- [When to Use](#section-when-to-use-6d)
- [When Not to Use](#section-when-not-to-use-57)
- [Best Practices](#section-best-practices-b6)
