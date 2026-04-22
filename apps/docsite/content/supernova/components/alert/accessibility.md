---
title: Alert
sourceUrl: https://spirit.supernova-docs.io/latest/components/alert/accessibility-lS7VQ4RQ-lS7VQ4RQ
sourcePath: /latest/components/alert/accessibility-lS7VQ4RQ-lS7VQ4RQ
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:11.464Z
---

- [Overview](/latest/components/alert/overview-ravlpYvH)
- [Design](/latest/components/alert/design-IFR7YHl5)
- [Figma](/latest/components/alert/figma-yOlRo9hm-yOlRo9hm)
- [HTML](/latest/components/alert/html-EyD9DYLm)
- [React](/latest/components/alert/react-qnO0Aapr)
- [Accessibility](/latest/components/alert/accessibility-lS7VQ4RQ-lS7VQ4RQ)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow these recommendations.

### **Semantics**

- Use role="alert" for error/urgent messages (announces immediately).

- Use role="status" for non-urgent feedback (polite announcement).

### **Headings and Text**

- Provide a **clear heading or icon** to indicate severity.

- Ensure message text is readable and concise.

### **Dismissibility**

- If dismissible, include a close button with aria-label="Dismiss alert".

### **Color and Contrast**

- Success, error, warning, and info colors must meet **WCAG AA** contrast.

- Don’t rely on color alone – pair with icon or text.

### **Focus Management**

- When an **Alert** appears in response to user action, consider moving focus to it or ensuring screen readers announce it.

On this page

- [Accessibility](#section-accessibility-ea)
- [Semantics](#section-semantics-07)
- [Headings and Text](#section-headings-and-text-d1)
- [Dismissibility](#section-dismissibility-22)
- [Color and Contrast](#section-color-and-contrast-29)
- [Focus Management](#section-focus-management-e9)
