---
title: Validation Text
---

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

Used in: [TextField](/components/text-field), [TextArea](/components/text-area), [Select](/components/select), [Checkbox](/components/checkbox), [Radio](/components/radio), [Toggle](/components/toggle), [Slider](/components/slider), [FileUpload](/components/file-upload)

### **Design Usage**

ValidationText displays validation feedback related to a form control.  
It communicates whether the entered value requires attention and helps users understand how to resolve validation issues. A validation icon can accompany it to improve recognition and scannability.  
ValidationText is displayed close to the associated form control and complements, rather than replaces, HelperText.

---

### Developer Notes

ValidationText is already included in Spirit form components that support the validationState and validationText properties. Developers using these components do not need to compose ValidationText separately.  
Use ValidationText directly only when building a custom form control or composition.  
ValidationText automatically supports semantic validation states and can render the corresponding validation icon when enabled.

---

### **When to Use**

Use ValidationText when:

- informing users that the current value is invalid

- explaining how to correct an invalid value

- communicating validation results after user interaction or form submission

- displaying success, warning or informational validation messages, where applicable

---

### **When Not to Use**

Do not use ValidationText:

- for static guidance or instructions; use HelperText instead

- as the primary description of the form control; use Label instead

- to provide unrelated or non-validation information

- before validation has occurred, unless this matches the intended validation strategy

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep validation messages concise and actionable.

- Clearly explain how users can resolve validation issues whenever possible.

- Display ValidationText consistently below the associated form control.

- ValidationText can be displayed together with HelperText when both guidance and validation feedback are needed.

- Validation icons should reinforce the validation state, not replace the message itself.
