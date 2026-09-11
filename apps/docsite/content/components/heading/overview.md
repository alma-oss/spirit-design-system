---
title: Heading
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

### Design Usage

**Heading** standardizes typography and spacing for all heading levels across the product.  
It ensures that headings are visually consistent and semantically meaningful, regardless of context.

Headings help users understand the **structure and hierarchy** of the content while providing **accessible navigation** for assistive technologies.

The component supports multiple **levels (1–6)** and can render either a **semantic HTML heading (**&lt;h1>**–**&lt;h6>**)** or a **different visual style** using utility classes.

---

### **When to Use**

- To **introduce or label** a page section, card, or modal.

- To maintain a **consistent heading hierarchy** throughout a page or application.

- When you need to apply **heading styles** (size, weight, spacing) without breaking semantic order.

- To create an **accessible document structure** with proper heading levels.

---

### **When Not to Use**

- For **body text, captions, or labels** – use [**typography**](/development/helpers/typography) [](/development/helpers/typography)**[styles](/development/helpers/typography)** instead.

- For **button or link labels** – use appropriate components (e.g., Button, Link).

- For **decorative text or stylistic titles** – use custom text styling, not semantic headings.

- To emphasize inline text within paragraphs – use &lt;strong> or &lt;em> instead.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **one** &lt;h1> **per page**, representing the main title.

- Follow a **logical sequence** (h1 → h2 → h3 …) without skipping levels unless there’s a valid structural reason.

- Choose **visual variants** that fit the layout but keep **semantic meaning correct** (e.g., visually small h2 is fine if it’s structurally correct).

- Avoid using headings purely for visual styling – screen readers rely on them for **content navigation**.

- Use **consistent spacing** before and after headings to maintain rhythm.

- Don’t overload headings with long sentences; keep them **short and scannable**.
