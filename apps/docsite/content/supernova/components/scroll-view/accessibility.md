---
title: Scroll View
sourceUrl: https://spirit.supernova-docs.io/latest/components/scroll-view/accessibility-YiMegdXk-YiMegdXk
sourcePath: /latest/components/scroll-view/accessibility-YiMegdXk-YiMegdXk
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:26.632Z
---

- [Overview](/latest/components/scroll-view/overview-bxCU4G4o)
- [Design](/latest/components/scroll-view/design-bGFF3hAc)
- [Figma](/latest/components/scroll-view/figma-e6NU8xFM-e6NU8xFM)
- [HTML](/latest/components/scroll-view/html-BBbgOe6Y)
- [React](/latest/components/scroll-view/react-y6e6h6AD)
- [Accessibility](/latest/components/scroll-view/accessibility-YiMegdXk-YiMegdXk)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- ScrollView is a **container**, not a semantic region. Use ARIA landmarks or headings inside if needed for context.

- If content can overflow, ensure screen readers can reach all elements by **not clipping content via absolute positioning**.

### **Keyboard Navigation**

- Users must be able to scroll the region with **keyboard keys** (Tab, Arrow keys, Page Up/Down, or Space).

- If the ScrollView is not naturally focusable, add tabindex="0" when keyboard scrolling is needed.

### **Focus Management**

- Maintain logical focus order within the scrollable area.

- If focus moves to an off-screen element, ScrollView should automatically **scroll it into view**.

### **Overflow Indicators**

- Visual decorators must have **sufficient contrast** and should not obscure text or content.

- If decorators include gradients, ensure they **fade gently** and don’t create false visual barriers.

### **Hidden Scrollbars**

- Only hide scrollbars if alternative cues (overflow decorators, arrows) clearly show that content is scrollable.

- Users should still be able to **scroll via touch, mouse wheel, or keyboard**.

### **Touch Targets and Responsiveness**

- Ensure all scrollable content maintains usable touch targets (~44 × 44 px).

- On mobile, avoid nested ScrollViews – they can cause scroll conflicts.

On this page

- [Accessibility](#section-accessibility-d4)
- [Semantics](#section-semantics-22)
- [Keyboard Navigation](#section-keyboard-navigation-a5)
- [Focus Management](#section-focus-management-29)
- [Overflow Indicators](#section-overflow-indicators-cb)
- [Hidden Scrollbars](#section-hidden-scrollbars-c8)
- [Touch Targets and Responsiveness](#section-touch-targets-and-responsiveness-45)
