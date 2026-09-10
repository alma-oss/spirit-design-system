---
title: Close Button
---

#### Component Status

Figma

\-

Status

Stable

HTML

\-

React

Up to date

Used in: [Modal](/components/modal), [Toast](/components/toast), [Tooltip](/components/tooltip)

Drawer does **not** include CloseButton automatically. DrawerPanelHeader accepts arbitrary children, and the developer is expected to place and configure CloseButton inside it manually.

### Design Usage

CloseButton provides a consistent way to dismiss a surface or remove an item from the interface.  
It is typically used as part of another component rather than as a standalone action. Common use cases include closing overlays, dismissing containers or removing items from interactive selections.  
CloseButton is built on top of ControlButton, ensuring consistent appearance, sizing and interaction across Spirit.

---

### Developer Notes

CloseButton is intended for dismiss actions only.  
When using standard Spirit components such as Dialog or Drawer, CloseButton is already included where appropriate. Developers should use CloseButton directly only when building custom dismissible components or compositions.  
CloseButton communicates the intent to close or remove an element. The actual close or remove behavior must be implemented by the consuming component or

---

### **When to Use**

Use CloseButton when:

- **closing** a dialog, drawer or other overlay

- **dismissing** a notification, banner or similar container

- **removing** an item from a collection (for example an interactive Tag)

- providing a consistent close action across the interface

---

### **When Not to Use**

Do not use CloseButton:

- for general actions unrelated to dismissing or removing content

- as a replacement for Button or IconButton

- when the action represents navigation rather than dismissal

- for destructive actions such as deleting data

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- CloseButton should always perform a **dismiss** or **remove** action.

- Position it consistently within the component it belongs to.

- Ensure the affected element is clearly identifiable.

- Closing an element should produce a predictable result without unexpected side effects.

- Use the standard close icon to maintain consistency across Spirit.
