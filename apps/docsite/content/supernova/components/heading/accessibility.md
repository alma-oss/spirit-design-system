---
title: Heading
sourceUrl: https://spirit.supernova-docs.io/latest/components/heading/accessibility-EC4AHlhv-EC4AHlhv
sourcePath: /latest/components/heading/accessibility-EC4AHlhv-EC4AHlhv
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:19.678Z
---

- [Overview](/latest/components/heading/overview-IGzEZcgZ)
- [HTML](/latest/components/heading/html-hFSI3vJj)
- [React](/latest/components/heading/react-ZPJc2oSv)
- [Accessibility](/latest/components/heading/accessibility-EC4AHlhv-EC4AHlhv)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use semantic heading elements (<h1>–<h6>) to define the structure of the page.

- Screen readers use heading order to **build a document outline**, allowing users to jump between sections.

- If a heading must look different from its semantic level, use elementType="h2" and a visual variant (e.g., emphasis="bold"/size="large") to preserve semantics while adjusting style.

### **Hierarchy**

- Do not skip heading levels arbitrarily – this can disorient screen reader users.

- Keep the order meaningful, reflecting the visual and logical page hierarchy.

### **Landmarks**

- When headings label a section, ensure they are inside proper **landmark regions** (<section>, <article>, <nav>, etc.) for better structure.

### **Contrast and Readability**

- Heading text must meet **WCAG AA contrast** against the background.

- Ensure sufficient line height and spacing for readability.

On this page

- [Accessibility](#section-accessibility-79)
- [Semantics](#section-semantics-ce)
- [Hierarchy](#section-hierarchy-47)
- [Landmarks](#section-landmarks-f4)
- [Contrast and Readability](#section-contrast-and-readability-af)
