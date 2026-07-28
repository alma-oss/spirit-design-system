---
title: Product Logo
sourceUrl: https://spirit.supernova-docs.io/latest/components/product-logo/accessibility-sD0lNrPO-sD0lNrPO
sourcePath: /latest/components/product-logo/accessibility-sD0lNrPO-sD0lNrPO
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.478Z
---

- [Overview](/latest/components/product-logo/overview-bkZdqTca)
- [Design](/latest/components/product-logo/design-5MCz8mOC)
- [HTML](/latest/components/product-logo/html-o92DZKsc)
- [React](/latest/components/product-logo/react-5syB8D4s)
- [Accessibility](/latest/components/product-logo/accessibility-sD0lNrPO-sD0lNrPO)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Alt Text**

- Include descriptive but concise alt text (e.g., "CompanyName logo") unless the logo is accompanied by adjacent text that already provides the brand name.

- If the logo is **purely decorative** (e.g., in Footer with repeated brand name nearby), use alt="" to hide it from assistive technologies.

### **Contrast and Visibility**

- Ensure logo contrast meets **WCAG AA** standards in both light and dark modes.

- Avoid faint tints or transparent overlays that may reduce readability on dark backgrounds.

### **Responsive Behavior**

- Logo should resize gracefully without distortion; use aspect ratio preservation (e.g., object-fit: contain).

- Maintain adequate padding or margins around the logo to prevent overlap with adjacent elements.

### **Performance**

- Prefer **SVG** or **optimized raster formats (WebP, PNG)** for quick loading and sharp rendering across devices.

On this page

- [Accessibility](#section-accessibility-1b)
- [Alt Text](#section-alt-text-3c)
- [Contrast and Visibility](#section-contrast-and-visibility-6b)
- [Responsive Behavior](#section-responsive-behavior-b7)
- [Performance](#section-performance-b8)
