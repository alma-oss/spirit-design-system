---
title: Pill
sourceUrl: https://spirit.supernova-docs.io/latest/components/pill/accessibility-1GJetmhU-1GJetmhU
sourcePath: /latest/components/pill/accessibility-1GJetmhU-1GJetmhU
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:24.407Z
---

- [Overview](/latest/components/pill/overview-cE9q06pW)
- [Design](/latest/components/pill/design-iVBlmdDI)
- [Figma](/latest/components/pill/figma-TPpJNlsD-TPpJNlsD)
- [React](/latest/components/pill/react-3cr4DWLR)
- [HTML](/latest/components/pill/html-5BIfxc0B)
- [Accessibility](/latest/components/pill/accessibility-1GJetmhU-1GJetmhU)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Labels**

- The text inside the Pill serves as its accessible name.

- If the Pill shows only a number, make sure the surrounding context provides meaning (e.g., “Messages 12” rather than just “12”).

### **Announcements**

- If Pills are used for counts, ensure screen readers can associate the number with its label (use <span> with aria-labelledby if necessary).

### **Contrast**

- Ensure text and background meet **WCAG AA** contrast requirements.

### **Size**

- Text should remain legible at smaller sizes.

- Ensure the pill’s shape does not clip or truncate content.

On this page

- [Accessibility](#section-accessibility-c9)
- [Labels](#section-labels-49)
- [Announcements](#section-announcements-24)
- [Contrast](#section-contrast-0d)
- [Size](#section-size-28)
