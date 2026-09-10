---
title: Caption Text
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

CaptionText is a typography utility intended for short, secondary information that supports surrounding content without becoming the primary focus.  
It provides predefined caption styling while allowing additional typography properties such as alignment and color to be configured consistently with Spirit typography.

Note: Unlike HelperText, CaptionText has no semantic relationship to form controls. It is a general-purpose utility for presenting supporting information throughout the interface.

---

### Developer Notes

CaptionText renders as a span by default, but the underlying HTML element can be changed when different semantics are required.  
It provides standardized caption typography while supporting:

- Small, Medium and Large sizes

- text color

- responsive text alignment

- text hyphenation

- word-breaking behavior

- improved text wrapping

Choose the HTML element according to the semantic meaning of the content. CaptionText defines presentation, not document structure.

---

### **When to Use**

Use CaptionText when:

- displaying secondary information related to surrounding content

- presenting captions below images, charts or other media

- displaying metadata such as timestamps or additional descriptive information

- building custom components that require a consistent caption style

---

### **When Not to Use**

Do not use CaptionText:

- for body content; use Text instead

- for headings; use Heading instead

- for form guidance; use HelperText instead

- for validation feedback; use ValidationText instead

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep captions concise and supportive.

- CaptionText should complement primary content rather than compete with it.

- Use it for information that is useful but not essential for understanding the primary content.

- Maintain consistent spacing between CaptionText and the content it describes.
