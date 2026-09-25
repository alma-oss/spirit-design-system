---
title: Heading
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use semantic heading elements (&lt;h1>–&lt;h6>) to define the structure of the page.

- Screen readers use heading order to **build a document outline**, allowing users to jump between sections.

- If a heading must look different from its semantic level, use elementType="h2" and a visual variant (e.g., emphasis="bold"/size="large") to preserve semantics while adjusting style.

### **Hierarchy**

- Do not skip heading levels arbitrarily – this can disorient screen reader users.

- Keep the order meaningful, reflecting the visual and logical page hierarchy.

### **Landmarks**

- When headings label a section, ensure they are inside proper **landmark regions** (&lt;section>, &lt;article>, &lt;nav>, etc.) for better structure.

### **Contrast and Readability**

- Heading text must meet **WCAG AA contrast** against the background.

- Ensure sufficient line height and spacing for readability.
