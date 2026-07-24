---
title: Grid
sourceUrl: https://spirit.supernova-docs.io/latest/components/grid/overview-5aQo9Uwf
sourcePath: /latest/components/grid/overview-5aQo9Uwf
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:19.117Z
---

- [Overview](/latest/components/grid/overview-5aQo9Uwf)
- [Design](/latest/components/grid/design-lUGZeVqi-lUGZeVqi)
- [HTML](/latest/components/grid/html-wIwrd6th)
- [React](/latest/components/grid/react-jmVyRPyk)
- [Accessibility](/latest/components/grid/accessibility-me66cEBm-me66cEBm)

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

The **Grid** is the essential layout utility used to arrange content into a **multi-column structure**. It provides consistent alignment, spacing, and responsiveness across breakpoints. Grid is ideal for creating **structured, repeatable layouts** such as product listings, card galleries, or content overviews. It should be placed on every page. On the grid are placed all components and compositions.  
There are these variants:

| Name   | Number of columns on default (Mobile) version | Number of columns on tablet version | Number of columns on desktop version |
| ------ | --------------------------------------------- | ----------------------------------- | ------------------------------------ |
| 1col   | 1                                             | 1                                   | 1                                    |
| 2col   | 2                                             | 2                                   | 2                                    |
| 3col   | 3                                             | 3                                   | 3                                    |
| 4col   | 4                                             | 4                                   | 4                                    |
| 5col   | 5                                             | 5                                   | 5                                    |
| 6col   | 6                                             | 6                                   | 6                                    |
| 12col  | 12                                            | 12                                  | 12                                   |
| Narrow | 6                                             | 10                                  | 12                                   |

---

### **When to Use**

- To organize content into **multiple columns** with consistent spacing.

- For **repeatable units** (e.g., product cards, image galleries, dashboards).

- When you need a layout that **automatically adapts to different screen sizes**.

- To ensure **visual balance and rhythm** in complex page structures.

- For the **fluid button on at or from a specific breakpoint** – for more information, please follow the Button documentation.

---

### **When Not to Use**

- For **single-row or inline alignment** of elements – use [**Flex**](/latest/components/flex/overview-696puvxK).

- For **simple spacing adjustments** – use spacing utilities instead.

- For **uniform content blocks** where alignment matters as much as spacing – use **[Matrix](/latest/components/matrix/overview-uXzlhaFX)**.

- For **component grouping** (buttons, tags, inputs) where alignment is simple – use [**Action Group**](/latest/components/action-group/overview-Bi5NXFGt) or [**Stack**](/latest/components/stack/overview-RCo1HEot).

- To express **semantic structure** (like sections or lists) – use semantic HTML (<section>, <ul>) instead; Grid is purely visual.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use Grid for **repeated patterns** – keep individual cells consistent in size and hierarchy.

- Design with **responsive breakpoints** in mind – define how many columns collapse on smaller screens.

- Avoid nesting too many grids – it can create unnecessary complexity.

- Pair with **Cards, Boxes or images** to display structured sets of items.

- Ensure enough **spacing and padding** so the content doesn’t feel cramped.

- Use **consistent column counts** across similar views for predictability.

On this page

- [Design Usage](#section-design-usage-aa)
- [When to Use](#section-when-to-use-53)
- [When Not to Use](#section-when-not-to-use-d7)
- [Best Practices](#section-best-practices-64)
