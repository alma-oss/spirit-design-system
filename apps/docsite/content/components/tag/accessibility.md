---
title: Tag
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Semantics**

- Static Tags can be simple &lt;span> elements with proper text.

- Interactive Tags (clickable/removable) should be &lt;button>s or &lt;a>s, depending on function.

### **Removable Tags**

- Provide a clear remove button inside the Tag with aria-label="Remove \[tag name\]".

- Announce removal to screen readers (e.g., via a polite live region).

### **Keyboard Support**

- Interactive Tags must be reachable via **Tab**.

- **Enter/Space** activates a clickable Tag.

- **Delete/Backspace** may remove a Tag if focus is on the remove button.

### **Color and Contrast**

- Ensure Tag text and background meet **WCAG AA** contrast.

- Do not rely on color alone – if Tags are status-indicating, pair with text.

### **Size and Spacing**

- Tags must remain comfortably tappable if interactive (~44 × 44 px touch target for remove buttons).

### **Focus**

- Provide clear focus styles for interactive Tags, including the remove icon.
