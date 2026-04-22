---
title: Select
sourceUrl: https://spirit.supernova-docs.io/latest/components/select/overview-CJTJAcAW
sourcePath: /latest/components/select/overview-CJTJAcAW
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:27.590Z
---

- [Overview](/latest/components/select/overview-CJTJAcAW)
- [Design](/latest/components/select/design-VklspBX1)
- [Figma](/latest/components/select/figma-ygWs9zJx-ygWs9zJx)
- [HTML](/latest/components/select/html-M7vV6yEg)
- [React](/latest/components/select/react-z8fkF9Sz)
- [Accessibility](/latest/components/select/accessibility-kQFwPd8c-kQFwPd8c)

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

- When only **two to five mutually exclusive options** exist – use [**Radio**](/latest/components/radio/overview-EdxtJHuI) instead, as it’s clearer to see all choices upfront.

- When the user can select **multiple options** – use [**Checkboxes**](/latest/components/checkbox/overview-rAiP3oPA).

- For **binary on/off preferences** – use [**Toggle**](/latest/components/toggle/overview-xkL1tbNO) or [**Checkbox**](/latest/components/checkbox/overview-rAiP3oPA) depending on confirmation behavior.

- When the action is **navigational** (e.g., switching views) – use [**Tabs**](/latest/components/tabs/overview-c7gB7K6t) or [**Segmented Control**](/latest/components/segmented-control/overview-nz3Ky39G).

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always provide a **clear label** for the select field.

- Use a **default state** like “Select an option” if no choice has been made, but don’t default to a valid option unless it makes sense (to avoid unintentional selections).

- Keep option labels **short and descriptive**.

- Group long lists using **optgroup labels** (e.g., separating countries by region).

- Avoid deeply nested options, keep it simple.

- For critical workflows, consider whether radios or checkboxes would be more transparent than hiding options in a dropdown.

On this page

- [Design Usage](#section-design-usage-93)
- [When to Use](#section-when-to-use-b6)
- [When Not to Use](#section-when-not-to-use-1c)
- [Best Practices](#section-best-practices-0e)
