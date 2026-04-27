---
title: Card
sourceUrl: https://spirit.supernova-docs.io/latest/components/card/accessibility-ZazOcQKe-ZazOcQKe
sourcePath: /latest/components/card/accessibility-ZazOcQKe-ZazOcQKe
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:13.700Z
---

- [Overview](/latest/components/card/overview-9kNBP7gC)
- [Design](/latest/components/card/design-1EgJClYx)
- [Figma](/latest/components/card/figma-YxNCZ73u-YxNCZ73u)
- [HTML](/latest/components/card/html-k3lbNxci)
- [React](/latest/components/card/react-B747E3kW)
- [Accessibility](/latest/components/card/accessibility-ZazOcQKe-ZazOcQKe)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- A Card is primarily a **container** – use semantic HTML inside (headings, paragraphs, lists, buttons, links).

- If the entire card is interactive, render it as a **link (**<a>**)** or **button (**<button>**)** rather than a <div> with click handlers.

### **Headings**

- Use real heading elements (<h2>, <h3>) for card titles to support screen reader navigation.

### **Images**

- Provide **alt text** for meaningful images; decorative images should use empty alt (alt="").

### **Actions**

- Ensure any buttons/links inside the card have clear labels (avoid “Click here”).

- If both the card container and its actions are clickable, avoid overlap or ambiguity – ensure **only one primary interactive region**.

### **Keyboard**

- All interactive elements must be reachable by **Tab**.

- If the entire card is clickable, make sure it is a single focusable element, not multiple nested ones.

### **Contrast**

- Text and background must meet **WCAG AA** contrast requirements.

- Focus outlines must be visible on interactive cards or card actions.

### **Responsive**

- Ensure cards adapt gracefully in grids and lists; don’t truncate text in a way that hides meaning.

On this page

- [Accessibility](#section-accessibility-38)
- [Semantics](#section-semantics-8f)
- [Headings](#section-headings-71)
- [Images](#section-images-0e)
- [Actions](#section-actions-bc)
- [Keyboard](#section-keyboard-c6)
- [Contrast](#section-contrast-60)
- [Responsive](#section-responsive-a3)
