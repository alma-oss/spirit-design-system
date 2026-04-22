---
title: Partner Logo
sourceUrl: https://spirit.supernova-docs.io/latest/components/partner-logo/accessibility-3NTAxqWM-3NTAxqWM
sourcePath: /latest/components/partner-logo/accessibility-3NTAxqWM-3NTAxqWM
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:23.978Z
---

- [Overview](/latest/components/partner-logo/overview-8KYpEm6d)
- [Design](/latest/components/partner-logo/design-06mFs8tf)
- [HTML](/latest/components/partner-logo/html-JjA8hTmS)
- [React](/latest/components/partner-logo/react-83Rlh2JV)
- [Accessibility](/latest/components/partner-logo/accessibility-3NTAxqWM-3NTAxqWM)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Alt Text**

- Provide descriptive alt text naming the partner or brand (e.g., "Jobboard logo").

- If logos are decorative in a group purely for visual context (e.g., a sponsor banner already labelled “Our Partners”), set alt="".

### **Contrast and Visibility**

- Check that the logo maintains sufficient visibility on its background.

- If readability is poor, add a neutral backdrop or border without altering the logo itself.

### **Responsive Behavior**

- Logos should scale proportionally with preserved aspect ratio (object-fit: contain).

- Maintain consistent spacing between logos across breakpoints.

### **Performance**

- Use **SVG** when possible; otherwise, optimized raster assets (WebP, PNG) to minimize load.

On this page

- [Accessibility](#section-accessibility-ac)
- [Alt Text](#section-alt-text-2b)
- [Contrast and Visibility](#section-contrast-and-visibility-ad)
- [Responsive Behavior](#section-responsive-behavior-14)
- [Performance](#section-performance-5d)
