---
title: Select
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

The **Select** component allows users to choose **one option** from a list of predefined values presented in a dropdown menu. It’s especially useful when space is limited or when there are many possible options to display.

#### Note

The Dropdown inside Select is styled only in Figma, in code it is natively rendered

---

### **When to Use**

- When the user must select **exactly one option** from a large or variable set of choices.

- When showing all options at once (like with Radio) would clutter the UI.

- For form fields such as **country, language, category, size** where there may be dozens of valid options.

- When the list of options may **grow dynamically** or is populated from data.

---

### **When Not to Use**

- When only **two to five mutually exclusive options** exist – use [**Radio**](/components/radio) instead, as it’s clearer to see all choices upfront.

- When the user can select **multiple options** – use [**Checkboxes**](/components/checkbox).

- For **binary on/off preferences** – use [**Toggle**](/components/toggle) or [**Checkbox**](/components/checkbox) depending on confirmation behavior.

- When the action is **navigational** (e.g., switching views) – use [**Tabs**](/components/tabs) or [**Segmented Control**](/components/segmented-control).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always provide a **clear label** for the select field.

- Use a **default state** like “Select an option” if no choice has been made, but don’t default to a valid option unless it makes sense (to avoid unintentional selections).

- Keep option labels **short and descriptive**.

- Group long lists using **optgroup labels** (e.g., separating countries by region).

- Avoid deeply nested options, keep it simple.

- For critical workflows, consider whether radios or checkboxes would be more transparent than hiding options in a dropdown.
