---
title: Collapse
sourceUrl: https://spirit.supernova-docs.io/latest/components/collapse/design-tYGuvpzX-tYGuvpzX
sourcePath: /latest/components/collapse/design-tYGuvpzX-tYGuvpzX
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:14.476Z
---

- [Overview](/latest/components/collapse/overview-V3uSQpZM)
- [Design](/latest/components/collapse/design-tYGuvpzX-tYGuvpzX)
- [HTML](/latest/components/collapse/html-XWxryM4M)
- [React](/latest/components/collapse/react-ltmy57Ln)
- [Accessibility](/latest/components/collapse/accessibility-NFyNedKk-NFyNedKk)

### **Accordion vs. Collapse**

| Component | Use when                                                                                                  | Strengths                                                                            | Don’t use when                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Accordion | You need to organize multiple related sections of content that users may expand or collapse individually. | Keeps long content structured and scannable, allows one or more panels open at once. | If there’s only a single block of content – use Collapse. If the content is essential and should always be visible, don’t hide it. |
| Collapse  | You want to show/hide a single block of content (e.g., “Show more”, “Advanced options”).                  | Simple, lightweight, ideal for progressive disclosure of one section.                | If you have multiple related panels – use Accordion. If you’re showing navigation or categories – use Tabs / Segmented Control.    |

On this page

- [Accordion vs. Collapse](#section-accordion-vs-collapse-f4)
