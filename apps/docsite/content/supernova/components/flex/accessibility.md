---
title: Flex
sourceUrl: https://spirit.supernova-docs.io/latest/components/flex/accessibility-iEV9LsCD-iEV9LsCD
sourcePath: /latest/components/flex/accessibility-iEV9LsCD-iEV9LsCD
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.572Z
---

- [Overview](/latest/components/flex/overview-696puvxK)
- [Design](/latest/components/flex/design-XAUgrPpA-XAUgrPpA)
- [HTML](/latest/components/flex/html-Ek3MiHnS)
- [React](/latest/components/flex/react-5VhjQMER)
- [Accessibility](/latest/components/flex/accessibility-iEV9LsCD-iEV9LsCD)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Flex is a **layout utility** only – it does not add semantic meaning unless you set it.

- Always use semantic HTML for the elements inside (e.g., <button>, <nav>, <ul>).

### **Reading Order**

- Visual alignment doesn’t change DOM order – ensure items are ordered logically in the markup for screen readers and keyboard navigation.

### **Keyboard Support**

- Flex itself is not interactive. Ensure interactive child elements remain reachable and in logical order.

### **Responsive Behavior**

- Ensure Flex alignment doesn’t break accessibility on small screens – items should remain visible and navigable when stacked or wrapped.

### **Contrast and Spacing**

- Ensure spacing and alignment don’t cause overlap or crowding. Maintain legibility in all viewports.

On this page

- [Accessibility](#section-accessibility-60)
- [Semantics](#section-semantics-72)
- [Reading Order](#section-reading-order-32)
- [Keyboard Support](#section-keyboard-support-c4)
- [Responsive Behavior](#section-responsive-behavior-1a)
- [Contrast and Spacing](#section-contrast-and-spacing-00)
