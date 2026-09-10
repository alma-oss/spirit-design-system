---
title: Footer
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Role**

- Use a semantic &lt;footer> element or role="contentinfo" to mark the footer as a navigational region for assistive technologies.

### **Branding (ProductLogo)**

- Provide descriptive alt text if clickable.

- If decorative, use alt="".

### **Navigation**

- Structure navigation items in lists (&lt;ul>, &lt;li>) for clarity.

- Ensure keyboard navigation follows logical order (logo → nav groups → legal text).

### **Contrast and Readability**

- All text, icons, and links must meet **WCAG AA** contrast requirements.

- Ensure link hover/focus states remain visible and accessible.

### **Responsive Behavior**

- Avoid horizontal scroll; ensure footer content reflows cleanly at small breakpoints.

- Maintain adequate spacing between stacked groups.
