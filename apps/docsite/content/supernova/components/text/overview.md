---
title: Text
sourceUrl: https://spirit.supernova-docs.io/latest/components/text/overview-cB4kAjJc
sourcePath: /latest/components/text/overview-cB4kAjJc
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:32.297Z
---

- [Overview](/latest/components/text/overview-cB4kAjJc)
- [HTML](/latest/components/text/html-wfF2XQq8)
- [React](/latest/components/text/react-7w4GH6cX)
- [Accessibility](/latest/components/text/accessibility-JOPJTrwG-JOPJTrwG)

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

For more information, see the [Typography section](/latest/design/global-tokens/typography/overview-B6purUNc).

---

### **When to Use**

- For **body copy**, **paragraphs**, and **inline text** in UI elements.

- To apply **consistent size, font weight, and alignment** to textual content.

- When semantic correctness matters (e.g., using <p> for paragraphs, <small> for notes).

---

### **When Not to Use**

- For **titles or section headers** – use [**Heading**](/latest/components/heading/overview-IGzEZcgZ).

- For **buttons, links, or labels** – use their respective components.

- For **decorative text** or artistic typography – use custom styling only if it serves a unique visual purpose.

- For **long-form content** (articles, rich text) – use semantic HTML (<p>, <ul>, <ol>, etc.) with [typography styles](/latest/development/helpers/typography-Y8J6vWR5) applied.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use **semantic HTML** (<p>, <span>, <strong>, <em>, etc.) together with [typography styling classes](/latest/development/helpers/typography-Y8J6vWR5) – Spirit provides the visual layer, semantics remain in markup.

- Follow the established **type scale** (e.g., small, base, large) for consistency across screens.

- Avoid mixing multiple text sizes or colors in close proximity unless for clear hierarchy.

- Ensure **line length** remains readable – aim for ~60–80 characters per line.

- Use **subtle color tokens** (e.g., text-secondary) for secondary or helper information.

- Prefer **medium or regular weight** for body copy; use bold sparingly for emphasis.

- Use [**typography helpers**](/latest/development/helpers/typography-Y8J6vWR5) (size, tone, emphasis) consistently across all components, including Cards, Alerts, and Forms.

On this page

- [Design Usage](#section-design-usage-f6)
- [When to Use](#section-when-to-use-88)
- [When Not to Use](#section-when-not-to-use-75)
- [Best Practices](#section-best-practices-e6)
