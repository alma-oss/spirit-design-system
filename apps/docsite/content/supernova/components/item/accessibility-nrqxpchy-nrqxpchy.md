---
title: Item
sourceUrl: https://spirit.supernova-docs.io/latest/components/item/accessibility-nrqxpchy-nrqxpchy
sourcePath: /latest/components/item/accessibility-nrqxpchy-nrqxpchy
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:21.224Z
---

- [Overview](/latest/components/item/overview-RaZFZqBa)
- [Design](/latest/components/item/design-4HkurRob)
- [Figma](/latest/components/item/figma-RmyR9shL-RmyR9shL)
- [HTML](/latest/components/item/html-HZuuGdPS)
- [React](/latest/components/item/react-FofOVAtJ)
- [Accessibility](/latest/components/item/accessibility-nrqxpchy-nrqxpchy)

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

On this page

- [Accessibility](#section-accessibility-9a)
- [Semantics](#section-semantics-45)
- [Keyboard Support](#section-keyboard-support-34)
- [Focus and States](#section-focus-and-states-89)
- [Icons](#section-icons-87)
- [Announcements](#section-announcements-62)
