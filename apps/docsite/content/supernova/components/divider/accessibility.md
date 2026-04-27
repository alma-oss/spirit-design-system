---
title: Divider
sourceUrl: https://spirit.supernova-docs.io/latest/components/divider/accessibility-GcTuPrlk-GcTuPrlk
sourcePath: /latest/components/divider/accessibility-GcTuPrlk-GcTuPrlk
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:15.745Z
---

- [Overview](/latest/components/divider/overview-x4POwGlS)
- [Design](/latest/components/divider/design-h6Yq3Ags)
- [Figma](/latest/components/divider/figma-IqQhf3SN-IqQhf3SN)
- [HTML](/latest/components/divider/html-a1UXPeeB)
- [React](/latest/components/divider/react-LM4Ac89n)
- [Accessibility](/latest/components/divider/accessibility-GcTuPrlk-GcTuPrlk)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Use semantic <hr> element for visual separation between sections.

- For list separators (e.g., in menus), a <li role="separator"> is appropriate.

### **Decorative Use**

- If the Divider is purely visual and does not indicate semantic structure, hide it from assistive tech with aria-hidden="true".

### **Contrast**

- Avoid very low-contrast lines that disappear in certain themes.

### **Responsive Behavior**

- Ensure Dividers scale consistently in width and placement across screen sizes.

### **Keyboard**

- Divider is non-interactive and should **never receive focus**.

On this page

- [Accessibility](#section-accessibility-04)
- [Semantics](#section-semantics-c5)
- [Decorative Use](#section-decorative-use-04)
- [Contrast](#section-contrast-3d)
- [Responsive Behavior](#section-responsive-behavior-ad)
- [Keyboard](#section-keyboard-46)
