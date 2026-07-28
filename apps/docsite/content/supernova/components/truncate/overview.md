---
title: Truncate
sourceUrl: https://spirit.supernova-docs.io/latest/components/truncate/overview-YDVOXlsj
sourcePath: /latest/components/truncate/overview-YDVOXlsj
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.448Z
---

- [Overview](/latest/components/truncate/overview-YDVOXlsj)
- [React](/latest/components/truncate/react-N017E7W1)
- [Accessibility](/latest/components/truncate/accessibility-j8sUbXIK-j8sUbXIK)

#### Component Status

Figma

Not available

Status

Stable

HTML

Up to date

React

Up to date

### **Design Usage**

**Truncate** helps manage long text content in constrained layouts.

It trims text based on a specified **number of lines**, **words**, or **characters**, ensuring visual consistency and preventing overflow in components such as **Cards**, **Lists**, or **Tables**.

When truncating by **lines**, it uses CSS-based line clamping. When truncating by **words** or **characters**, it requires a **plain string** (not HTML), as it cannot process markup content.

Use it when space is limited or when only a preview of the content should be visible, such as in summaries or snippets.

---

### **When to Use**

- To show **shortened previews** of longer text (e.g., article summaries, comments, titles).

- When content length varies but the layout requires consistent size.

- In **Cards, Lists, Tables**, or other repeating patterns with limited width or height.

- To prevent layout shifts or overflow from unpredictable text length.

### **When Not to Use**

- When full content must always be visible – use **Header** or **Text** and allow natural wrapping.

- For content that includes **HTML markup** – Truncate (except truncating by number of lines) supports only plain strings.

- When truncation hides important information that can’t be accessed elsewhere – provide a “View more” or [**Tooltip**](/latest/components/tooltip/overview-zhGH30af) in such cases.

- For dynamic or continuously updated text, where truncation could be confusing.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always ensure users can access the **full content** elsewhere (via tooltip, modal, or “Read more” link).

- Choose truncation mode based on context:

- **Lines** – for paragraphs or multiline text blocks.

- **Words** – for natural language snippets where cutoffs should feel organic.

- **Characters** – for fixed-width layouts or precise control (e.g., filenames, IDs).

- Keep truncation thresholds (line/word/character count) consistent across similar components.

- Avoid truncating essential identifiers, labels, or commands.

- Verify that truncated text still makes sense and does not mislead.

On this page

- [Design Usage](#section-design-usage-4d)
- [When to Use](#section-when-to-use-e6)
- [When Not to Use](#section-when-not-to-use-23)
- [Best Practices](#section-best-practices-2b)
