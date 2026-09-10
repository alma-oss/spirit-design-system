---
title: Text
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

**Text** is a utility component that provides a **consistent typographic system** for all body and inline text.  
It allows designers and developers to choose the **semantic HTML tag** (e.g., p, span, small) while applying standardized **visual properties** such as **size**, **weight**, and **alignment**.  
Use it to ensure text across Spirit-based applications looks visually consistent, readable, and aligned with the system’s typography tokens.

For more information, see the [Typography section](/design/global-tokens/typography).

---

### **When to Use**

- For **body copy**, **paragraphs**, and **inline text** in UI elements.

- To apply **consistent size, font weight, and alignment** to textual content.

- When semantic correctness matters (e.g., using &lt;p> for paragraphs, &lt;small> for notes).

---

### **When Not to Use**

- For **titles or section headers** – use [**Heading**](/components/heading).

- For **buttons, links, or labels** – use their respective components.

- For **decorative text** or artistic typography – use custom styling only if it serves a unique visual purpose.

- For **long-form content** (articles, rich text) – use semantic HTML (&lt;p>, &lt;ul>, &lt;ol>, etc.) with [typography styles](/development/helpers/typography) applied.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **semantic HTML** (&lt;p>, &lt;span>, &lt;strong>, &lt;em>, etc.) together with [typography styling classes](/development/helpers/typography) – Spirit provides the visual layer, semantics remain in markup.

- Follow the established **type scale** (e.g., small, base, large) for consistency across screens.

- Avoid mixing multiple text sizes or colors in close proximity unless for clear hierarchy.

- Ensure **line length** remains readable – aim for ~60–80 characters per line.

- Use **subtle color tokens** (e.g., text-secondary) for secondary or helper information.

- Prefer **medium or regular weight** for body copy; use bold sparingly for emphasis.

- Use [**typography helpers**](/development/helpers/typography) (size, tone, emphasis) consistently across all components, including Cards, Alerts, and Forms.
