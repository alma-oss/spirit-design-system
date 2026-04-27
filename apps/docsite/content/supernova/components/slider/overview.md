---
title: Slider
sourceUrl: https://spirit.supernova-docs.io/latest/components/slider/overview-Y93PhlkV
sourcePath: /latest/components/slider/overview-Y93PhlkV
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.894Z
---

- [Overview](/latest/components/slider/overview-Y93PhlkV)
- [Design](/latest/components/slider/design-FZDIwAp3)
- [Figma](/latest/components/slider/figma-PgzdVLdK-PgzdVLdK)
- [HTML](/latest/components/slider/html-mVLp51Ty)
- [React](/latest/components/slider/react-wcQuunOx)
- [Accessibility](/latest/components/slider/accessibility-vBKv45bJ-vBKv45bJ)

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

A **Slider** allows users to **select a numeric value or range** by moving a handle along a track. It’s useful for inputs where approximate or visual selection is faster and more intuitive than typing a number.  
Like other form elements, Slider can include:

- **Label** – describes the purpose of the control.

- **Helper Text** – provides usage guidance (e.g., units, value range).

- **Validation Text** – communicates errors, warnings, or confirmations.

---

### **When to Use**

- For selecting a value from a **continuous or large range** (e.g., volume, price filter).

- When users benefit from **visual feedback** instead of typing numbers.

- For approximate selection where **exact precision is not critical**.

- As part of filters, settings, or adjustments that users may change frequently.

---

### **When Not to Use**

- If **precise numeric input** is required – use [**Text Field**](/latest/components/text-field/overview-uxoMLF2o) instead.

- For selecting from a **small set of discrete options** – use [**Radio**](/latest/components/radio/overview-EdxtJHuI) or [**Select**](/latest/components/select/overview-CJTJAcAW).

- For **binary toggles** (on/off, yes/no) – use [**Toggle**](/latest/components/toggle/overview-xkL1tbNO).

- If the range or value meaning is unclear without context – consider a different input type.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

#### Label

- Always provide a visible, descriptive label (e.g., “Price range”).

- If units are important (e.g., °C, %), include them in the label or Helper Text.

#### Input (Slider control)

- Display **current value(s)** clearly (either inline or via tooltip/label).

- Keep the range logical and relevant – don’t overwhelm with overly large spans.

- Ensure the handle and track are large enough for easy grabbing, especially on touch devices.

- If supporting **range selection** (min–max), provide two handles and a clear visual distinction.

#### Helper Text

- Use to explain context, units, or boundaries (e.g., “Select between 0 and 100”).

- Place below the slider, before validation messages.

#### Validation Text

- Use for errors (e.g., “Value must be between 10 and 50”) or warnings.

- Always phrase validation in a clear, actionable way.

On this page

- [Design Usage](#section-design-usage-a0)
- [When to Use](#section-when-to-use-d8)
- [When Not to Use](#section-when-not-to-use-e0)
- [Best Practices](#section-best-practices-6d)
