---
title: UNSTABLE_Header
sourceUrl: https://spirit.supernova-docs.io/latest/components/unstable-header/accessibility-GHZ35N0F-GHZ35N0F
sourcePath: /latest/components/unstable-header/accessibility-GHZ35N0F-GHZ35N0F
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.989Z
---

- [Overview](/latest/components/unstable-header/overview-nOU7iqvO)
- [Design](/latest/components/unstable-header/design-noJ6GZd2-noJ6GZd2)
- [Figma](/latest/components/unstable-header/figma-pXldwkGC-pXldwkGC)
- [HTML](/latest/components/unstable-header/html-Ge28rbfg)
- [React](/latest/components/unstable-header/react-BAPcSBj4-BAPcSBj4)
- [Accessibility](/latest/components/unstable-header/accessibility-GHZ35N0F-GHZ35N0F)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Landmark Role**

- The Header should use role="banner" or <header> element to define the top-level landmark region.

### **Logo Link**

- If clickable, must include descriptive alt text or aria-label="Home".

### **Navigation Integration**

- Ensure all nav items are reachable via keyboard.

- Maintain logical tab order (logo → nav → other actions).

### **Contrast**

- Background and text/icons must meet **WCAG AA** contrast.

### **Responsiveness**

- Header layout should reflow gracefully without overlapping content.

On this page

- [Accessibility](#section-accessibility-ad)
- [Landmark Role](#section-landmark-role-38)
- [Logo Link](#section-logo-link-09)
- [Navigation Integration](#section-navigation-integration-41)
- [Contrast](#section-contrast-24)
- [Responsiveness](#section-responsiveness-8b)
