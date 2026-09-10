---
title: Input Container
---

#### Component checklist

Is documented

Status

The component has a health status indicated

Stable

HTML

Up to date

React

Up to date

Used in: [Text Field](/components/text-field), [Text Area](/components/text-area)  
**InputContainer is an implementation component.** It is already included in all Spirit box-field inputs, so designers and developers using standard Spirit components do not need to work with it directly.  
Its primary purpose is to provide a common foundation for existing Spirit inputs and for building new custom box-field components when needed.

InputContainer  
├── [InputAddon](/components/input-addon) — optional  
├── Input  
└── [InputAddon](/components/input-addon) — optional

### Design Usage

InputContainer provides the shared visual wrapper for all Spirit box-field input components.  
It defines the outer boundaries of the field and allows additional elements, such as InputAddons, to be positioned alongside the input while maintaining consistent spacing, alignment, and interaction.

---

### When to use

In most cases, you do not need to use InputContainer directly.  
Use InputContainer only when:

- building a new custom box-field component

- creating a custom input that should behave consistently with existing Spirit inputs

- composing an input together with InputAddons

Standard Spirit components such as [TextField](/components/text-field) already include InputContainer internally.

---

### When not to use

Do not use InputContainer:

- when using existing Spirit input components

- as a replacement for Input

- as a standalone layout container

If you only need a standard input, use the appropriate Spirit input component instead.

---

### Behavior

InputContainer:

- provides the visual field wrapper

- aligns the input and InputAddons

- defines the interactive input area

- allows the contained input to receive focus and interaction

InputContainer does not:

- provide input functionality

- manage values

- implement validation

---

### Structure

Typical composition:

- InputContainer

- InputAddon (optional)

- Input

- InputAddon (optional)

---

### UX recommendations

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Input should remain the primary interactive element.

- InputAddons should never reduce the readability of the entered value.

- Spacing between Input and InputAddons should remain consistent.

- Multiple InputAddons should only be used when necessary.
