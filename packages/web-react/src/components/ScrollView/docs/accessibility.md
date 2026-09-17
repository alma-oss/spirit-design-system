---
title: Scroll View
---

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
