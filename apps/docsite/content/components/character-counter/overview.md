---
title: Character Counter
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

Used in: [Text Area](/components/text-area)

### Design Usage

Character Counter provides users with feedback about the length of text entered into an input field.  
It is primarily used within [Text Area](/components/text-area) to communicate the current number of entered characters and, when applicable, the maximum allowed length.  
Character Counter is a supporting component and is typically used as part of TextArea rather than as a standalone component.

---

### **When to Use**

Use Character Counter when:

- users should be informed about the length of their input

- a maximum character limit is defined

- a minimum character requirement or character range should be validated

- input length is important for completing a task

Typical use cases:

- descriptions

- comments

- messages

- profile summaries

---

### **When Not to Use**

Do not use Character Counter when:

- text length has no relevance to the user

- the available space is effectively unlimited

- the counter would add unnecessary visual complexity

For standard text input scenarios without character limits or recommendations, omit the counter.

---

### Behavior

Character Counter:

- displays the current number of entered characters

- optionally displays the maximum allowed number of characters

- updates automatically as the user types

- supports validation states

When both minimum and maximum values are defined:

- only the current value and maximum are displayed

- the minimum value is validated separately and communicated through [ValidationText](/components/validation-text)

---

### UX Recommendations

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Display the counter from the beginning of the interaction.

- Position the counter consistently below the input field.

- Keep the counter synchronized with the current input value.

- If the counter does not explicitly include the word "characters", provide helper text explaining what the values represent.

- Use ValidationText for communicating minimum character requirements and validation messages.
