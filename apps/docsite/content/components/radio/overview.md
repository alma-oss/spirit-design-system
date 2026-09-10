---
title: Radio
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

The **Radio** component lets users select **one option from a group** of mutually exclusive choices. Radios are always presented in groups (two or more options). Selecting one option automatically deselects the others.

---

### **When to Use**

- When users must pick **exactly one option** from a list of predefined choices.

- When all options are **mutually exclusive** (e.g., payment method, delivery option, gender selection).

- When it’s important to show **all available choices up front**, instead of hiding them in a dropdown.

---

### **When Not to Use**

- When users can select **multiple options** – use a [**Checkbox**](/components/checkbox) instead.

- When the choice is a **simple on/off** – use a [**Toggle**](/components/toggle) (immediate) or [**Checkbox**](/components/checkbox) (confirm with form submission).

- When there are **more than 5–7 options** – use a [**Select**](/components/select) or another compact control to save space.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Group radios using a **fieldset with a legend** to give context to the set.

- Provide **clear, descriptive labels** for each option. Labels should be clickable along with the radio itself.

- Arrange options **vertically** for better scanning and accessibility. Use horizontal alignment only for short, simple lists (e.g., Yes/No).

- Ensure a **default selection** is set only if a choice is required and a sensible default exists; otherwise allow no selection at first.

- Keep the number of radio options manageable (ideally under 5–7).

- Maintain consistent spacing between radio options and alignment of labels.

---

### **Difference between Radio and Checkbox**

- **Radio**: Users can select **only one option** from a group. Selecting a new option automatically deselects the previous one.

- **Checkbox**: Users can select **zero, one, or multiple options** independently.  
  Use Radios for **exclusive choice**, and Checkboxes for **multi-selection or independent toggles**.
