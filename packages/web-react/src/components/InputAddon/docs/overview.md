---
title: Input Addon
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

Documentation link

\-

Used in: [Text Field](/components/text-field), [Text Area](/components/text-area)

### Design Usage

InputAddon positions supplementary content inside an InputContainer.  
It can contain:

- icons

- text

- buttons

- other small controls

InputAddon is responsible only for layout and positioning. It does not define the behavior of its content.

---

### Developer Notes

InputAddon is a layout helper.  
It does not implement interaction itself but provides consistent positioning for the content it wraps.  
Use InputAddon only inside InputContainer.

---

### When to Use

Use InputAddon when:

- displaying leading or trailing icons

- displaying units or currencies

- adding actions related to the input

- providing compact contextual information

Typical use cases:

- search icon

- password visibility toggle

- clear button

- currency symbol

- measurement unit

---

### When Not to Use

Do not use InputAddon when:

- supplementary information belongs below the field (use InputDetails)

- content is unrelated to the input

- large or complex controls need to be embedded

---

### Behavior

InputAddon:

- is placed inside an InputContainer

- can appear before or after the Input

- automatically aligns its content with the input

If the content is:

- decorative (icon, text), it behaves as part of the input

- interactive (button, toggle), it behaves as an independent control

---

### Structure

InputAddon is always used inside InputContainer.  
Typical composition:

- InputContainer

- InputAddon

- Input

- InputAddon

---

### UX recommendations

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep addon content concise.

- Use icons only when their meaning is commonly understood.

- Interactive controls should have a clear purpose.

- Avoid placing multiple competing actions inside the same input.
