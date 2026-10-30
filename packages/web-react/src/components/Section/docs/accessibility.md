---
title: Section
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use the &lt;section> element only when the band holds content worth jumping to. Prefer a visible **heading** (&lt;h2>, &lt;h3>, …) and link it with `aria-labelledby`.

- When there is no visible heading, name the landmark with `aria-label` instead. Browsers do not render `aria-label`.

- Do not repeat the role in the accessible name. Assistive technology announces the role separately.

- Do not combine `aria-label` with `aria-labelledby`. `aria-labelledby` wins.

- Do not add `role="region"` to &lt;section>. The element already has that role.

- Use &lt;div> for everything else, e.g. background stripes, breadcrumb strips, or the band with the page's &lt;h1>.

### **Reading Order**

- Ensure Sections follow a logical order in the DOM so users can scan consistently.

### **Landmark Navigation**

- Screen readers expose a named &lt;section> as a landmark. Each unnecessary landmark is one more stop for users to skip.

- A &lt;section> without an accessible name does not become a landmark. There is no semantic benefit, and no harm either.

### **Color and Contrast**

- Ensure background variations still meet **WCAG AA** contrast with text and components inside.

### **Responsiveness**

- Sections should scale to full viewport width, with **Container inside** to control alignment.
