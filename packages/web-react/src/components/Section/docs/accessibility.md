---
title: Section
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use the &lt;section> element only when the band has its own **heading** (&lt;h2>, &lt;h3>, …) and content worth jumping to. Link the heading using `aria-labelledby`.

- Use &lt;div> for everything else, e.g. background stripes, breadcrumb strips, or the band with the page's &lt;h1>.

### **Reading Order**

- Ensure Sections follow a logical order in the DOM so users can scan consistently.

### **Landmark Navigation**

- Screen readers expose a named &lt;section> as a landmark. Each unnecessary landmark is one more stop for users to skip.

### **Color and Contrast**

- Ensure background variations still meet **WCAG AA** contrast with text and components inside.

### **Responsiveness**

- Sections should scale to full viewport width, with **Container inside** to control alignment.
