---
title: Dropdown
---

## Accessibility

The majority of accessibility issues are already guaranteed by implementation. In the case of modifications or composition in HTML, please follow the recommendations below.

### **Trigger**

- Use a **button** as the trigger. `DropdownTrigger` sets `aria-expanded`, `aria-controls`, and `aria-haspopup` for you.

- The trigger should clearly describe the purpose (e.g., “More options”).

### **Container**

- By default, the popover is a non-modal dialog (`role="dialog"`). Give it an accessible name with `aria-label` or
  `aria-labelledby`.

- For a list of actions, put a `Menu` inside the popover. The trigger then gets
  `aria-haspopup="menu"`, the popover becomes presentational, and each `Item` becomes a `menuitem`. Name the `Menu`
  instead of the popover.

- Do not set `role="menu"` on the popover yourself: a menu needs the keyboard interaction that only `Menu` provides.

- For form fields or other mixed content, keep the dialog and use the native semantics of those elements.

### **Keyboard Support**

- **Tab** moves focus to the trigger.

- **Enter/Space** or **Arrow Down** opens the Dropdown.

- **Esc** closes the Dropdown and returns focus to the trigger.

- In a dialog, **Tab** moves through its content and closes the Dropdown when focus leaves it.

- In a menu, the **arrow keys**, **Home/End**, and typeahead move between items, and **Tab** closes the menu.

### **Focus Management**

- When opened, focus moves into the Dropdown: to the first interactive element of a dialog, or to the first item of a
  menu (the last item after **Arrow Up**).

- When closed with Esc or by choosing a menu item, focus returns to the trigger.

### **Dismissal**

- Dropdown closes when the user clicks outside or presses Esc. A menu also closes when the user chooses an item.

### **Contrast and Touch**

- Ensure items meet **WCAG AA** contrast.

- Maintain comfortable tap areas (~44 × 44 px).
