---
title: Accordion
---

![Accordion Item](https://studio-assets.supernova.io/design-systems/10180/3f4c3cdb-b441-448b-a952-b1750c00be81.png)

Open False

![Accordion Item](https://studio-assets.supernova.io/design-systems/10180/a68f51bb-2d6a-4ef0-91be-a00ba95baaf6.png)

Open True

Accordion Item

| Property          | Values | Default |
| ----------------- | ------ | ------- |
| Open Variant      | True   | False   | False     |
| Show Pill Boolean | true   | false   | undefined |
| Disabled Variant  | False  | True    | False     |

### **Accordion vs. Collapse**

| Component | Use when                                                                                                  | Strengths                                                                            | Don’t use when                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Accordion | You need to organize multiple related sections of content that users may expand or collapse individually. | Keeps long content structured and scannable, allows one or more panels open at once. | If there’s only a single block of content → use Collapse. If the content is essential and should always be visible, don’t hide it. |
| Collapse  | You want to show/hide a single block of content (e.g., “Show more”, “Advanced options”).                  | Simple, lightweight, ideal for progressive disclosure of one section.                | If you have multiple related panels → use Accordion. If you’re showing navigation or categories → use Tabs / Segmented Control.    |
