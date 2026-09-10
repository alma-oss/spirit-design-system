---
title: UNSTABLE_Combobox
---

#### Component Status

Figma

\-

Status

Unstable

HTML

\-

React

\-

UNSTABLE\_Combobox  
├── [InputContainer](/components/input-container)  
├── [InputAddon](/components/input-addon) (optional)  
├── [Dropdown](/components/dropdown)  
├── Suggestion Item  
├── Search History Item  
└── [Tag](/components/tag)

### **Design Usage**

UNSTABLE\_Combobox provides a flexible input pattern that combines text input, suggestions and selection management into a single component.  
It is designed for scenarios where users search for, select and manage one or multiple values while receiving contextual suggestions.  
Unlike traditional form controls, Combobox can support multiple interaction patterns depending on the configuration, including:

- autocomplete

- single selection

- multiple selection

- tag-based selection management

The component was introduced primarily to support the needs of the Search team and serves as the foundation for complex search interactions.

---

## Developer Notes

UNSTABLE\_Combobox is an experimental composition.  
Its API and behavior are expected to evolve before stabilization.  
The component combines several existing Spirit building blocks rather than introducing completely new interaction patterns.  
Depending on configuration it can work with:

- Overlay

- Tag

- Suggestion Item

- Search History Item

Developers should avoid depending on implementation details while the component remains unstable.

---

### **When to Use**

Use UNSTABLE\_Combobox when:

- users need to search within available options

- suggestions should appear while typing

- one or multiple values can be selected

- selected values should remain visible and editable

- search history or recommendations improve the experience

Typical use cases include:

- search filters

- location search

- skills and tags

- complex search interfaces

---

### **When Not to Use**

Do not use UNSTABLE\_Combobox when:

- a standard TextField is sufficient

- users only select from a fixed list (use Select)

- interaction does not require suggestions or search

- the additional complexity would not improve the user experience

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Suggestions should update as the user types.

- Keyboard interaction should remain the primary interaction method.

- Selected values should remain visible.

- Users should be able to remove selected values directly.

- The component should provide a predictable experience regardless of whether it is configured for single or multiple selection.
