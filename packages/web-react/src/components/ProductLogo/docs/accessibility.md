---
title: Product Logo
---

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
