---
title: Heading
sourceUrl: https://spirit.supernova-docs.io/latest/components/heading/overview-IGzEZcgZ
sourcePath: /latest/components/heading/overview-IGzEZcgZ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:19.655Z
---

- [Overview](/latest/components/heading/overview-IGzEZcgZ)
- [HTML](/latest/components/heading/html-hFSI3vJj)
- [React](/latest/components/heading/react-ZPJc2oSv)
- [Accessibility](/latest/components/heading/accessibility-EC4AHlhv-EC4AHlhv)

#### Component Status

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

**Heading** standardizes typography and spacing for all heading levels across the product.  
It ensures that headings are visually consistent and semantically meaningful, regardless of context.

Headings help users understand the **structure and hierarchy** of the content while providing **accessible navigation** for assistive technologies.

The component supports multiple **levels (1–6)** and can render either a **semantic HTML heading (**<h1>**–**<h6>**)** or a **different visual style** using utility classes.

---

### **When to Use**

- To **introduce or label** a page section, card, or modal.

- To maintain a **consistent heading hierarchy** throughout a page or application.

- When you need to apply **heading styles** (size, weight, spacing) without breaking semantic order.

- To create an **accessible document structure** with proper heading levels.

---

### **When Not to Use**

- For **body text, captions, or labels** – use [**typography**](/latest/development/helpers/typography-Y8J6vWR5) [](/latest/development/helpers/typography-Y8J6vWR5)**[styles](/latest/development/helpers/typography-Y8J6vWR5)** instead.

- For **button or link labels** – use appropriate components (e.g., Button, Link).

- For **decorative text or stylistic titles** – use custom text styling, not semantic headings.

- To emphasize inline text within paragraphs – use <strong> or <em> instead.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **one** <h1> **per page**, representing the main title.

- Follow a **logical sequence** (h1 → h2 → h3 …) without skipping levels unless there’s a valid structural reason.

- Choose **visual variants** that fit the layout but keep **semantic meaning correct** (e.g., visually small h2 is fine if it’s structurally correct).

- Avoid using headings purely for visual styling – screen readers rely on them for **content navigation**.

- Use **consistent spacing** before and after headings to maintain rhythm.

- Don’t overload headings with long sentences; keep them **short and scannable**.

On this page

- [Design Usage](#section-design-usage-2e)
- [When to Use](#section-when-to-use-df)
- [When Not to Use](#section-when-not-to-use-d4)
- [Best Practices](#section-best-practices-6e)
