---
title: Text Area
sourceUrl: https://spirit.supernova-docs.io/latest/components/text-area/overview-3ZyPNWnL
sourcePath: /latest/components/text-area/overview-3ZyPNWnL
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:32.363Z
---

- [Overview](/latest/components/text-area/overview-3ZyPNWnL)
- [Design](/latest/components/text-area/design-CdWuHodL)
- [Figma](/latest/components/text-area/figma-YkZvA0Ia-YkZvA0Ia)
- [HTML](/latest/components/text-area/html-zkYJEm89)
- [React](/latest/components/text-area/react-gmiQr51H)
- [Accessibility](/latest/components/text-area/accessibility-iqUjBFF3-iqUjBFF3)

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

A **Text Area** is a form input that allows users to enter and edit **multi-line text**. Like Text Field, it is composed of:

- **Label** – identifies what the field is for.

- **Input (textarea element)** – multi-line text entry area.

- **Helper Text** – optional supporting instructions.

- **Validation Text** – contextual feedback for errors, warnings, or confirmations.

---

### **When to Use**

- For **longer input,** such as comments, messages, feedback, or descriptions.

- When multiple sentences or paragraphs are expected.

- When structured text entry doesn’t fit in a single line.

---

### **When Not to Use**

- For **short, single-line inputs** (e.g., names, email addresses) – use [**Text Field**](/latest/components/text-field/overview-uxoMLF2o).

- For **structured inputs** (e.g., numbers, dates, emails) – use **Text Field type number** or specialized input.

- When the user should pick from a **predefined set of choices** – use [**Select**](/latest/components/select/overview-CJTJAcAW)**,** [**Radio**](/latest/components/radio/overview-EdxtJHuI)**, or** [**Checkbox**](/latest/components/checkbox/overview-rAiP3oPA).

- For **rich text editing** – use a dedicated **editor** component if supported.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

#### Label

- Always provide a **clear label** (never rely solely on placeholder text).

- Labels should be **short, descriptive**, and consistent with other form elements.

#### Input (textarea)

- Size the Text Area to show at least **2–3 lines by default**.

- Spirit Text Area supports native resizing by default. Allow resizing where appropriate, but consider constraining the maximum size to preserve layout consistency.

- Ensure focus and hover states are consistent with Text Field.

#### Helper Text

- Use for **guidelines** like character limits or input expectations.

- Keep it concise and place it below the input, before validation messages.

#### Validation Text

- Use for **errors, warnings, or confirmations** related to the input.

- Validation text in Spirit is styled to indicate error, warning, or success states. Ensure you pair color with text or icon for clarity.”

- Place directly below the Text Area.

- Be actionable: tell the user what to change (e.g., “Maximum 500 characters”).

### Character Counter

The Character Counter is an optional functionality that provides feedback about the length of the text entered into a TextArea. It helps users understand limits or requirements for text input.

#### Usage

Use the Character Counter when:

- a maximum number of characters is defined

- a minimum number of characters is required

- a range (minimum and maximum) is defined

#### Behavior

- The counter displays the current number of characters

- If a maximum is defined, it displays current and maximum values (for example “120 / 200”)

- The counter updates in real time as the user types

- The minimum value is not displayed in the counter

- Minimum is validated on submit and communicated via ValidationText

- When the maximum is exceeded, the component enters an error state

#### Range Handling

When both minimum and maximum are defined:

- Only the current value and maximum are shown in the counter

- Minimum is validated on submit

- ValidationText is used to inform the user when minimum is not met

#### UX Rules

- The counter should be visible from the beginning

- It should not shift layout during interaction

- It should not duplicate validation messages

- If the counter does not include the word “characters”, helper text must explain what the value represents

#### Developer Notes

- The Character Counter is visual only; validation logic is handled by the application

- Minimum validation is handled via ValidationText

- Maximum can be enforced or validated by the application

- Values are controlled via component props

On this page

- [Design Usage](#section-design-usage-91)
- [When to Use](#section-when-to-use-f1)
- [When Not to Use](#section-when-not-to-use-fa)
- [Best Practices](#section-best-practices-79)
- [Character Counter](#section-character-counter-d0)
