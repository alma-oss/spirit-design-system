---
title: Input Details
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

### Design Usage

Input Details is used to display supplementary content related to a form field or form control.  
It is typically placed below a label and provides additional information or related actions without interrupting the main form flow.

Common use cases include:

- consent details,

- legal information,

- contextual help,

- related links or actions.

Input Details is most commonly used together with a [Checkbox](/components/checkbox) or a [Toggle](/components/toggle), but can also be used as a standalone component.

Check usage examples [here](https://spirit-design-system.netlify.app/packages/web-react/src/components/inputdetails/).

---

### When to Use

Use Input Details when:

- Additional context should be visually connected to a form field.

- Users need access to related information without leaving the form flow.

- Displaying consent details or legal information.

- Adding contextual actions or links below labels.

Typical use cases:

- consent management,

- terms and conditions links,

- privacy information,

- contextual help.

---

### When Not to Use

Do not use Input Details when:

- The content is essential for understanding the main label.

- Long-form explanatory content is required.

- The content should be displayed as a validation or error message.

- The content is unrelated to the associated form control.

---

### Structure

- Input Details is displayed below the associated label or control.

- It can contain:

- plain text,

- links,

- inline actions.

- The component itself does not provide interaction logic.

- Any interactive elements inside Input Details are handled independently.

- Disabled state is supported.

---

### UX recommendations

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Content should remain concise and supportive.

- Avoid large blocks of text.

- Links and actions should clearly communicate their purpose.

- Input Details should not visually compete with the main label or validation messages.

- Maintain clear spacing between label, control and supplementary content.
