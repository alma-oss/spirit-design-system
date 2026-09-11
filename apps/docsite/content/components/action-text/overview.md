---
title: Action Text
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

### Design Usage

ActionText is a typography utility intended for short text associated with actions and interactive UI.  
It provides predefined action-text sizing while allowing additional text properties such as alignment and color to be configured consistently with Spirit typography.

Note: Unlike [HelperText](/components/helper-text), ActionText has no specific relationship to form controls and does not communicate supplementary or validation information.

---

### Developer Notes

ActionText renders as a span by default, but the underlying HTML element can be changed when different semantics are required.  
It provides standardized action-text typography while supporting:

- Small, Medium and Large sizes

- text color

- responsive text alignment

- text hyphenation

- word-breaking behavior

- improved text wrapping

Choose the HTML element according to the semantic meaning of the content. ActionText defines presentation, not interaction or semantics.

---

### **When to Use**

Use ActionText when:

- displaying short text related to an action or interactive element

- consistent action typography is needed outside an existing Spirit component

- building custom components or compositions that should follow Spirit action-text styles

---

### **When Not to Use**

Do not use ActionText:

- for general body content; use [Text](/development/helpers/text) instead

- for headings; use [Heading](/components/heading) instead

- for supplementary form guidance; use [HelperText](/components/helper-text) instead

- to add interaction to text; use the appropriate interactive component such as [Button](/components/button) or [Link](/components/link)

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep action text short and easy to scan.

- Use a consistent size for actions of similar importance.

- Avoid using ActionText for long paragraphs or content-heavy text.

- Choose text alignment and wrapping based on the surrounding layout rather than using them decoratively.
