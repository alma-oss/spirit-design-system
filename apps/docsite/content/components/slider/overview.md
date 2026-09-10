---
title: Slider
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

- If **precise numeric input** is required – use [**Text Field**](/components/text-field) instead.

- For selecting from a **small set of discrete options** – use [**Radio**](/components/radio) or [**Select**](/components/select).

- For **binary toggles** (on/off, yes/no) – use [**Toggle**](/components/toggle).

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
