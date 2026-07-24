---
title: Radio
sourceUrl: https://spirit.supernova-docs.io/latest/components/radio/overview-EdxtJHuI
sourcePath: /latest/components/radio/overview-EdxtJHuI
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:25.876Z
---

- [Overview](/latest/components/radio/overview-EdxtJHuI)
- [Design](/latest/components/radio/design-jjAOakcx)
- [Figma](/latest/components/radio/figma-cDxV6wiK-cDxV6wiK)
- [HTML](/latest/components/radio/html-gl2lwjtF)
- [React](/latest/components/radio/react-gCApXSpA)
- [Accessibility](/latest/components/radio/accessibility-nymIKJ0F-nymIKJ0F)

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

- When users can select **multiple options** – use a [**Checkbox**](/latest/components/checkbox/overview-rAiP3oPA) instead.

- When the choice is a **simple on/off** – use a [**Toggle**](/latest/components/toggle/overview-xkL1tbNO) (immediate) or [**Checkbox**](/latest/components/checkbox/overview-rAiP3oPA) (confirm with form submission).

- When there are **more than 5–7 options** – use a [**Select**](/latest/components/select/overview-CJTJAcAW) or another compact control to save space.

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

On this page

- [Design Usage](#section-design-usage-77)
- [When to Use](#section-when-to-use-31)
- [When Not to Use](#section-when-not-to-use-84)
- [Best Practices](#section-best-practices-ec)
- [Difference between Radio and Checkbox](#section-difference-between-radio-and-checkbox-86)
