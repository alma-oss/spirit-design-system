---
title: Card
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- A Card is primarily a **container** – use semantic HTML inside (headings, paragraphs, lists, buttons, links).

- If the entire card is interactive, render it as a **link (**&lt;a>**)** or **button (**&lt;button>**)** rather than a &lt;div> with click handlers.

### **Headings**

- Use real heading elements (&lt;h2>, &lt;h3>) for card titles to support screen reader navigation.

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
