---
title: Collapse
sourceUrl: https://spirit.supernova-docs.io/latest/components/collapse/overview-V3uSQpZM
sourcePath: /latest/components/collapse/overview-V3uSQpZM
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.074Z
---

- [Overview](/latest/components/collapse/overview-V3uSQpZM)
- [Design](/latest/components/collapse/design-tYGuvpzX-tYGuvpzX)
- [HTML](/latest/components/collapse/html-XWxryM4M)
- [React](/latest/components/collapse/react-ltmy57Ln)
- [Accessibility](/latest/components/collapse/accessibility-NFyNedKk-NFyNedKk)

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

The **Collapse** component shows and hides a **single block of content** with a toggle control. Unlike Accordion, Collapse isn’t meant for structured lists of related sections – it’s best for **progressively revealing one piece of content** inline, such as a long description or advanced settings.

---

### **When to Use**

- To **progressively disclose** additional content within a page or section (e.g., “Show more details”, “Advanced options”).

- When space is limited and secondary information can be hidden by default.

- For **standalone toggle content** that doesn’t belong to a group of expandable panels.

- When you want to keep the interaction simple (one trigger, one panel).

---

### **When Not to Use**

- When you have **multiple related sections** – use [**Accordion**](/latest/components/accordion/overview-TtEldb73).

- For **critical instructions or mandatory information** – display inline instead of hiding.

- For **navigation between views or categories** – use [**Tabs**](/latest/components/tabs/overview-c7gB7K6t) or [**Segmented Control**](/latest/components/segmented-control/overview-nz3Ky39G).

- For **modal or blocking information** – use a [**Modal**](/latest/components/modal/overview-1gk69bB0).

- For **step-by-step tasks** – use a **Progress Indicator**.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use a **clear, action-oriented label** for the trigger (e.g., “Show more”, “Hide advanced settings”).

- Indicate state visually and textually (label changes between “Show” / “Hide” or with an icon).

- Place Collapse close to the content it controls to maintain clarity.

- Avoid deeply nested Collapse inside Accordions or other Collapses — it complicates scanning.

- Use for **secondary content**; don’t hide key tasks or primary information.

On this page

- [Design Usage](#section-design-usage-62)
- [When to Use](#section-when-to-use-ec)
- [When Not to Use](#section-when-not-to-use-ba)
- [Best Practices](#section-best-practices-17)
