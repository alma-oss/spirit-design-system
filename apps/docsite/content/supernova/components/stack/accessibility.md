---
title: Stack
sourceUrl: https://spirit.supernova-docs.io/latest/components/stack/accessibility-Uv3oQ7If-Uv3oQ7If
sourcePath: /latest/components/stack/accessibility-Uv3oQ7If-Uv3oQ7If
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:30.634Z
---

- [Overview](/latest/components/stack/overview-RCo1HEot)
- [Design](/latest/components/stack/design-16geyRgi)
- [HTML](/latest/components/stack/html-Q4OhL0rC)
- [React](/latest/components/stack/react-uuzEJkd0)
- [Accessibility](/latest/components/stack/accessibility-Uv3oQ7If-Uv3oQ7If)

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Stack is a **layout utility** – it doesn’t add meaning on its own unless you set it via elementType property.

- Use semantic elements inside (e.g., <form>, <ul>) based on the content.

### **Reading Order**

- Stack follows DOM order – ensure items are arranged logically for assistive tech.

### **Keyboard Support**

- Stack itself is not interactive. Interactive children must remain focusable in the correct order.

### **Responsive Behavior**

- Stack handles **vertical spacing only** – responsiveness depends on the content inside, not on Stack itself.

On this page

- [Accessibility](#section-accessibility-0c)
- [Semantics](#section-semantics-79)
- [Reading Order](#section-reading-order-ac)
- [Keyboard Support](#section-keyboard-support-43)
- [Responsive Behavior](#section-responsive-behavior-e9)
