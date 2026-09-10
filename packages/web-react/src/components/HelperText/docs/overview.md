---
title: Helper Text
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

### Design Usage

HelperText displays static supporting information related to a form control.  
Use it to explain what information is expected, clarify input requirements, or provide instructions that help users complete the field correctly. It supplements the Label but does not replace it.  
HelperText is displayed close to its related control so the relationship remains visually clear.

---

## Developer Notes

HelperText is already included in Spirit form components that support the helperText property. Developers using these components do not need to compose HelperText separately.  
Use HelperText directly only when building a custom form control or composition. When used this way, associate it programmatically with the related control through aria-describedby.  
HelperText is rendered only when content is provided and can inherit relevant state, such as disabled styling, from the surrounding form-field context.

---

### **When to Use**

Use HelperText when users need:

- clarification about the expected value

- instructions for interacting with the control

- additional context that remains valid regardless of the current input value

- information about formatting or requirements before validation occurs

---

### **When Not to Use**

Do not use HelperText:

- as the primary name of the control; use [Label](/components/label) instead

- for errors, warnings, or success feedback; use [ValidationText](/components/validation-text) instead

- for long or unrelated explanations

- to repeat information already communicated by the Label or placeholder

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep HelperText concise and directly related to the control.

- Display it consistently near the associated control.

- Keep the message static during normal interaction.

- Do not use it to communicate changing validation states.

- HelperText can be displayed together with ValidationText when both guidance and validation feedback are needed.

- When CharacterCounter is used in TextArea, HelperText shares the supporting-content area with ValidationText and the counter.
