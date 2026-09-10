---
title: Item
---

## Accessibility

### **Semantics**

- Each Item should be rendered as an interactive element that fits its container’s semantics:

- In **Select** or **Dropdown**, use role="option" or role="menuitem" depending on context.

- If the list supports multiple selection, use aria-selected="true/false" on each Item.

- For non-selectable items (e.g., labels or separators), ensure they’re **not focusable** and have the appropriate role (like presentation or separator).

### **Keyboard Support**

- Items must support keyboard navigation:

- **Arrow Up/Down** to move through Items.

- **Enter** or **Space** to select/activate.

- **Esc** to close the parent container (e.g., Dropdown, Select).

- Focus should visibly move between Items as the user navigates.

### **Focus and States**

- **Focus indicator** must be visible on the currently highlighted Item.

- Expose **selected** state with aria-selected or visually (checked, highlighted, etc.).

- Disabled Items should not be focusable and should expose aria-disabled="true".

### **Icons**

- Decorative icons should use aria-hidden="true".

- If the icon adds meaning (e.g., a status indicator), provide a descriptive text alternative.

### **Announcements**

- Screen readers should announce the **Item label**, followed by its **state** (selected, disabled).

- In a grouped list, the screen reader should announce the **group label** (if provided via Field Group or Section role).
