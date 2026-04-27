---
title: Truncate
sourceUrl: https://spirit.supernova-docs.io/latest/components/truncate/accessibility-j8sUbXIK-j8sUbXIK
sourcePath: /latest/components/truncate/accessibility-j8sUbXIK-j8sUbXIK
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.365Z
---

- [Overview](/latest/components/truncate/overview-YDVOXlsj)
- [React](/latest/components/truncate/react-N017E7W1)
- [Accessibility](/latest/components/truncate/accessibility-j8sUbXIK-j8sUbXIK)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Announcing Truncated Content**

- Screen readers will only read what is visually present. Ensure the **full content** is accessible via tooltip, hidden text, or link if it’s necessary for understanding.

### **Focus and Keyboard Interaction**

- Truncated text should remain fully readable on focus (e.g., via title attribute or tooltip).

### **ARIA Labeling**

- If the truncated element links to full content, use descriptive link text such as “Read full description”.

### **Contrast and Readability**

- Maintain sufficient text contrast after truncation – even partial words should remain legible.

### **Responsive Design**

- Verify truncation behaves predictably across different screen widths.

- Avoid multi-level truncation (e.g., nesting Truncate inside Truncate).

On this page

- [Accessibility](#section-accessibility-68)
- [Announcing Truncated Content](#section-announcing-truncated-content-86)
- [Focus and Keyboard Interaction](#section-focus-and-keyboard-interaction-79)
- [ARIA Labeling](#section-aria-labeling-55)
- [Contrast and Readability](#section-contrast-and-readability-56)
- [Responsive Design](#section-responsive-design-e8)
