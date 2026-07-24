---
title: Section
sourceUrl: https://spirit.supernova-docs.io/latest/components/section/accessibility-CCdlzkQA-CCdlzkQA
sourcePath: /latest/components/section/accessibility-CCdlzkQA-CCdlzkQA
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:26.811Z
---

- [Overview](/latest/components/section/overview-nCm5yBME)
- [HTML](/latest/components/section/html-7ves6uxb)
- [React](/latest/components/section/react-o1uAsIiN)
- [Accessibility](/latest/components/section/accessibility-CCdlzkQA-CCdlzkQA)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use the semantic <section> element.

- Each Section should have a **heading** (<h2>, <h3>, …) to describe its purpose. Without a heading, screen reader users may find Sections confusing.

### **Reading Order**

- Ensure Sections follow a logical order in the DOM so users can scan consistently.

### **Landmark Navigation**

- Screen readers expose <section> as landmarks if they have headings. This helps users jump between sections.

### **Color and Contrast**

- Ensure background variations still meet **WCAG AA** contrast with text and components inside.

### **Responsiveness**

- Sections should scale to full viewport width, with **Container inside** to control alignment.

On this page

- [Accessibility](#section-accessibility-b6)
- [Semantics](#section-semantics-dd)
- [Reading Order](#section-reading-order-87)
- [Landmark Navigation](#section-landmark-navigation-ac)
- [Color and Contrast](#section-color-and-contrast-73)
- [Responsiveness](#section-responsiveness-61)
