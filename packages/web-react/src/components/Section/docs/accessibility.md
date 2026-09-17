---
title: Section
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use the semantic &lt;section> element.

- Each Section should have a **heading** (&lt;h2>, &lt;h3>, …) to describe its purpose. Without a heading, screen reader users may find Sections confusing.

### **Reading Order**

- Ensure Sections follow a logical order in the DOM so users can scan consistently.

### **Landmark Navigation**

- Screen readers expose &lt;section> as landmarks if they have headings. This helps users jump between sections.

### **Color and Contrast**

- Ensure background variations still meet **WCAG AA** contrast with text and components inside.

### **Responsiveness**

- Sections should scale to full viewport width, with **Container inside** to control alignment.
