---
title: Accordion
sourceUrl: https://spirit.supernova-docs.io/latest/components/accordion/design-kddP4ZSI
sourcePath: /latest/components/accordion/design-kddP4ZSI
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:10.370Z
---

- [Overview](/latest/components/accordion/overview-TtEldb73)
- [Design](/latest/components/accordion/design-kddP4ZSI)
- [Figma](/latest/components/accordion/figma-Q3pOUXce-Q3pOUXce)
- [HTML](/latest/components/accordion/html-O7zVewq5)
- [React](/latest/components/accordion/react-K8ruxHsr)
- [Accessibility](/latest/components/accordion/accessibility-tywoRtE4-tywoRtE4)

![Accordion Item](https://studio-assets.supernova.io/design-systems/10180/841e47f4-d4b8-4047-802a-580013f9d86a.png)

Open False

![Accordion Item](https://studio-assets.supernova.io/design-systems/10180/93afccb1-6dda-4e90-b77f-6afeb5d0d5dd.png)

Open True

Accordion Item

| Property                  | Values  | Default |
| ------------------------- | ------- | ------- | ------ | ------- |
| Open Variant              | True    | False   | False  |
| Interaction State Variant | Default | Hover   | Active | Default |

### **Accordion vs. Collapse**

| Component | Use when                                                                                                  | Strengths                                                                            | Don’t use when                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Accordion | You need to organize multiple related sections of content that users may expand or collapse individually. | Keeps long content structured and scannable, allows one or more panels open at once. | If there’s only a single block of content → use Collapse. If the content is essential and should always be visible, don’t hide it. |
| Collapse  | You want to show/hide a single block of content (e.g., “Show more”, “Advanced options”).                  | Simple, lightweight, ideal for progressive disclosure of one section.                | If you have multiple related panels → use Accordion. If you’re showing navigation or categories → use Tabs / Segmented Control.    |

On this page

- [Accordion vs. Collapse](#section-accordion-vs-collapse-2d)
