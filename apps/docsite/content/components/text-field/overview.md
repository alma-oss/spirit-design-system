---
title: Text Field
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

TextField  
├── [Label](/components/label)  
├── [InputContainer](/components/input-container)  
│ ├── [InputAddon](/components/input-addon) — optional  
│ ├── Input  
│ ├── [InputAddon](/components/input-addon) — optional  
│ └── Password toggle — optional  
└── Supporting content  
├── [HelperText](/components/helper-text) — optional  
└── [ValidationText](/components/validation-text) — optional

### **Design Usage**

A **Text Field** allows users to **enter and edit text**. It is composed of several subcomponents that ensure clarity, usability, and accessibility:

- **Label** – identifies what the field is for.

- **Input** – the actual field where users type text.

- **Helper Text** – optional supporting text that explains how to fill the field.

- **Validation Text** – contextual feedback that appears when the input is invalid or needs confirmation.

Together, these parts ensure users always understand the purpose of the field, how to complete it, and when corrections are needed.

---

### **When to Use**

- For **short, single-line inputs** like names, email addresses, or search queries.

- When structured **user input is required** in forms.

- Whenever text entry is essential to completing a task.

---

### **When Not to Use**

- For **long, multi-line inputs** – use [**Text Area**](/components/text-area).

- For **numeric input with strict format** – use **Text Field type number** or a specialized input.

- For **choices from predefined sets** – use [**Select**](/components/select)**,** [**Radio**](/components/radio)**, or** [**Checkbox**](/components/checkbox).

- For a **search trigger-only action** – consider a dedicated **search field** if available.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

#### Label

- Always provide a **visible label**; don’t rely only on placeholder text.

- Labels should be **short and descriptive** (e.g., “Email address”).

- Each Text Field must have a **unique label** to ensure accessibility.

#### Input

- Ensure clear **focus and hover states**.

- Provide sensible **input types** (e.g., type="email", type="password") to help with mobile keyboards.

- Maintain consistent sizing and spacing across form layouts.

#### Helper Text

- Use for **additional instructions** (e.g., “Must be at least 8 characters”).

- Place it below the input, before validation messages.

- Keep text **concise and relevant**.

#### Validation Text

- Use for **error, warning, or success messages** after input.

- Place directly below the field.

- Use **clear language** – tell users what to fix, not just what’s wrong (e.g., “Enter a valid email address”).

- Pair color with **icons or text**; don’t rely on color alone.
