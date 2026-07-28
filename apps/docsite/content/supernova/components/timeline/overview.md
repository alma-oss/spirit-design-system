---
title: Timeline
sourceUrl: https://spirit.supernova-docs.io/latest/components/timeline/overview-QyZZXWW7
sourcePath: /latest/components/timeline/overview-QyZZXWW7
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:33.348Z
---

- [Overview](/latest/components/timeline/overview-QyZZXWW7)
- [Design](/latest/components/timeline/design-KOc1TkIo)
- [Figma](/latest/components/timeline/figma-Gaddsnt2)
- [HTML](/latest/components/timeline/html-hPdRgYGY)
- [React](/latest/components/timeline/react-eCUJifRJ)
- [Accessibility](/latest/components/timeline/accessibility-Ly7dDbjq)

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

## **Timeline** vertically organizes a series of events, steps, or milestones in **chronological order**. It supports multiple marker types and flexible content layouts.

It is composed of a **main container** (Timeline) with **steps** (TimelineStep) that include a **marker** (TimelineMarker), optional **heading** (TimelineHeading), and optional **content** (TimelineContent).

Timeline uses a **grid-based layout** to align markers and content consistently. Connector lines are rendered with pseudo-elements for clean, semantic markup.

Headings are optional but recommended for clarity, especially when describing distinct phases or milestones.

---

### **When to Use**

- To represent **chronological events** (e.g. history, roadmap, project milestones).

- When you need to **communicate the order** between items.

- To show **status updates** or workflows with clear visual separation of steps.

---

### **When Not to Use**

- To display horizontally organised **items**.

- To display progress (e.g., onboarding, registration flow, etc.) where items should be interactive.

- If events or items do not have a **logical sequence** or time order.

- When a **simpler list or table** communicates the information more clearly.

- If the number of steps is very large, which may lead to **visual clutter**. Consider grouping or summarizing instead.

- When the relationship between items is not sequential but **hierarchical or categorical**. Consider using Card or Grid.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Use the semantic defaults: ol for ordered timelines, ul for unordered.

- Keep marker content **short and meaningful** – e.g. single numbers, dots, or concise icons.

- Use headings for clarity when steps need distinct labels, and pair them with **concise descriptions** in TimelineContent.

- Ensure sufficient **contrast** for markers, headings, and connectors for accessibility.

- Keep the number of steps reasonable; break down very long timelines into sections or use progressive disclosure.

- Test across screen sizes: Timeline should remain **readable and scannable** on both desktop and mobile.

On this page

- [Design Usage](#section-design-usage-2a)
- [Timeline vertically organizes a series of events, steps, or milestones in chronological order. It supports multiple marker types and flexible content layouts.](#section-timeline-vertically-organizes-a-series-of-events-steps-or-milestones-in-chronological-order-it-supports-multiple-marker-types-and-flexible-content-layouts-81)
- [When to Use](#section-when-to-use-a5)
- [When Not to Use](#section-when-not-to-use-48)
- [Best Practices](#section-best-practices-a5)
