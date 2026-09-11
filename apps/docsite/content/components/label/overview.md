---
title: Label
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

Used in: [TextField](/components/text-field), [TextArea](/components/text-area), [Select](/components/select), [Checkbox](/components/checkbox), [Radio](/components/radio), [Toggle](/components/toggle), [FileUpload](/components/file-upload)

### Design Usage

Label identifies the purpose of a form control and helps users understand what information is expected.  
It is displayed above the associated form control and provides the primary description for user input.  
Besides its visual purpose, Label establishes the semantic relationship between the label and the associated form control, improving accessibility and usability.

---

### Developer Notes

Label is included in Spirit form components such as TextField, TextArea, Select, Checkbox, Radio, Toggle, and FileUpload. Developers using these components do not need to add Label separately.  
Use Label directly only when building a custom form control. Always associate it with the related native control using htmlFor and the control’s id.

---

### **When to Use**

Use Label when:

- identifying a form field

- providing context for user input

- building custom form controls

- ensuring accessible form interactions

---

### **When Not to Use**

Do not use Label when:

- the control does not require user input

- using text purely as a heading or description

- replacing helper or validation messages

If additional explanation is needed, use [HelperText](/components/helper-text) or [ValidationText](/components/validation-text) rather than extending the Label.

---

### **Best Practices**

- Label should always be associated with a single form control.

- Clicking the Label should focus or activate the associated control.

- Required fields should be clearly indicated.

- Labels should remain concise and descriptive.
