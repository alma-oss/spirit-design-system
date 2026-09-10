---
title: Skip Link
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- For multiple skip links, use a &lt;nav> wrapper with aria-label="Skip links" to provide context.

- Keep the wording **short and descriptive** (“Skip to main content”, “Skip to footer”), and match the page language.

### **Keyboard**

- Ensure the target element is **focusable** or at least identifiable so that focus visibly moves when the link is activated.
