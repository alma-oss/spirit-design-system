---
title: Field Group
sourceUrl: https://spirit.supernova-docs.io/latest/components/field-group/overview-rFO8KPuP
sourcePath: /latest/components/field-group/overview-rFO8KPuP
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:17.527Z
---

- [Overview](/latest/components/field-group/overview-rFO8KPuP)
- [Design](/latest/components/field-group/design-FdvfV5rr)
- [Figma](/latest/components/field-group/figma-4wHaRtrm-4wHaRtrm)
- [HTML](/latest/components/field-group/html-X9I4G5Is)
- [React](/latest/components/field-group/react-NLYh1mc6)
- [Accessibility](/latest/components/field-group/accessibility-VQo20Z4H-VQo20Z4H)

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

**Field Group** groups **related form controls** into a single, meaningful unit using the native <fieldset> element with a <legend>. It’s most commonly used for **Checkbox** sets (multi-select) and **Radio** groups (single-select) so users and assistive technologies understand the question and its related options as one control group. A Field Group can also include **group-level Helper Text** and **group-level Validation Text** that apply to all options inside.

---

### **When to Use**

- You’re asking a **single question with multiple options**, such as a set of **Checkboxes** (“Select all that apply”) or a **Radio** group (“Choose one”).

- The group needs a **shared label** (the question/instruction) via <legend>.

- You have **group-wide helper guidance** or **group-wide error/validation** (e.g., “Select at least one option”).

- You want to ensure **proper semantics and screen reader context** for related choices.

---

### **When Not to Use**

- There’s only **one input** – use the individual field (**[Checkbox](/latest/components/checkbox/overview-rAiP3oPA)\*\***,\*\* **[Radio](/latest/components/radio/overview-EdxtJHuI)\*\***,\*\* **[Text Field](/latest/components/text-field/overview-uxoMLF2o)**) without Field Group.

- You just need **visual alignment/spacing** for unrelated fields – use [**Stack**](/latest/components/stack/overview-RCo1HEot) or [**Flex**](/latest/components/flex/overview-696puvxK) (not Field Group).

- You want a **visual frame/background** – use [**Box**](/latest/components/box/overview-qy7lFEkG) or [**Card**](/latest/components/card/overview-9kNBP7gC).

- You’re combining **unrelated topics** into one cluster – split them into separate Field Groups.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Make the <legend> **the actual question or instruction** (“Which newsletters would you like to receive?”).

- Keep groups **focused and scannable**.

- Put **Helper Text** directly after the legend, then the options, then **Validation Text** beneath the options.

- If the group is **required**, indicate that in the legend (e.g., “(required)”).

- For Checkbox sets, consider “**Select all**” only when it truly helps and make it unambiguous.

- Keep option labels short and specific; each option gets its **own** <label>.

On this page

- [Design Usage](#section-design-usage-8e)
- [When to Use](#section-when-to-use-f9)
- [When Not to Use](#section-when-not-to-use-78)
- [Best Practices](#section-best-practices-5f)
