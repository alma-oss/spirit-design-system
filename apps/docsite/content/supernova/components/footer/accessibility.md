---
title: Footer
sourceUrl: https://spirit.supernova-docs.io/latest/components/footer/accessibility-oQxYQkiO-oQxYQkiO
sourcePath: /latest/components/footer/accessibility-oQxYQkiO-oQxYQkiO
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.916Z
---

- [Overview](/latest/components/footer/overview-T6I75fDO)
- [Design](/latest/components/footer/design-M4NDAOSP)
- [HTML](/latest/components/footer/html-24T7XDKf)
- [React](/latest/components/footer/react-oFjDz9MJ)
- [Accessibility](/latest/components/footer/accessibility-oQxYQkiO-oQxYQkiO)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Role**

- Use a semantic <footer> element or role="contentinfo" to mark the footer as a navigational region for assistive technologies.

### **Branding (ProductLogo)**

- Provide descriptive alt text if clickable.

- If decorative, use alt="".

### **Navigation**

- Structure navigation items in lists (<ul>, <li>) for clarity.

- Ensure keyboard navigation follows logical order (logo → nav groups → legal text).

### **Contrast and Readability**

- All text, icons, and links must meet **WCAG AA** contrast requirements.

- Ensure link hover/focus states remain visible and accessible.

### **Responsive Behavior**

- Avoid horizontal scroll; ensure footer content reflows cleanly at small breakpoints.

- Maintain adequate spacing between stacked groups.

On this page

- [Accessibility](#section-accessibility-18)
- [Landmark Role](#section-landmark-role-c7)
- [Branding (ProductLogo)](#section-branding-productlogo-5f)
- [Navigation](#section-navigation-b6)
- [Contrast and Readability](#section-contrast-and-readability-07)
- [Responsive Behavior](#section-responsive-behavior-28)
