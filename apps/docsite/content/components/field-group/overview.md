---
title: Field Group
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

### **Design Usage**

**Field Group** groups **related form controls** into a single, meaningful unit using the native &lt;fieldset> element with a &lt;legend>. It’s most commonly used for **Checkbox** sets (multi-select) and **Radio** groups (single-select) so users and assistive technologies understand the question and its related options as one control group. A Field Group can also include **group-level Helper Text** and **group-level Validation Text** that apply to all options inside.

---

### **When to Use**

- You’re asking a **single question with multiple options**, such as a set of **Checkboxes** (“Select all that apply”) or a **Radio** group (“Choose one”).

- The group needs a **shared label** (the question/instruction) via &lt;legend>.

- You have **group-wide helper guidance** or **group-wide error/validation** (e.g., “Select at least one option”).

- You want to ensure **proper semantics and screen reader context** for related choices.

---

### **When Not to Use**

- There’s only **one input** – use the individual field (**[Checkbox](/components/checkbox)****,** **[Radio](/components/radio)****,** **[Text Field](/components/text-field)**) without Field Group.

- You just need **visual alignment/spacing** for unrelated fields – use [**Stack**](/components/stack) or [**Flex**](/components/flex) (not Field Group).

- You want a **visual frame/background** – use [**Box**](/components/box) or [**Card**](/components/card).

- You’re combining **unrelated topics** into one cluster – split them into separate Field Groups.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Make the &lt;legend> **the actual question or instruction** (“Which newsletters would you like to receive?”).

- Keep groups **focused and scannable**.

- Put **Helper Text** directly after the legend, then the options, then **Validation Text** beneath the options.

- If the group is **required**, indicate that in the legend (e.g., “(required)”).

- For Checkbox sets, consider “**Select all**” only when it truly helps and make it unambiguous.

- Keep option labels short and specific; each option gets its **own** &lt;label>.
