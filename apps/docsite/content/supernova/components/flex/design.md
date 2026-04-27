---
title: Flex
sourceUrl: https://spirit.supernova-docs.io/latest/components/flex/design-XAUgrPpA-XAUgrPpA
sourcePath: /latest/components/flex/design-XAUgrPpA-XAUgrPpA
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:18.516Z
---

- [Overview](/latest/components/flex/overview-696puvxK)
- [Design](/latest/components/flex/design-XAUgrPpA-XAUgrPpA)
- [HTML](/latest/components/flex/html-Ek3MiHnS)
- [React](/latest/components/flex/react-5VhjQMER)
- [Accessibility](/latest/components/flex/accessibility-iEV9LsCD-iEV9LsCD)

## **Flex vs Grid vs Stack vs Matrix**

| Component | Use when                                                                                                                | Strengths                                                               | Don’t use when                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Grid      | You need a multi-column, responsive layout (e.g., product listing, gallery).                                            | Flexible, supports different column counts at breakpoints.              | If you only need single-axis alignment – use Flex. If items must be uniform across rows – use Matrix.       |
| Flex      | You want to arrange items along a single axis (row or column).                                                          | Precise control over alignment, spacing, and distribution.              | If you need multiple columns or uniform rows – use Grid or Matrix. For simple vertical spacing – use Stack. |
| Stack     | You need to arrange items in a vertical sequence with consistent spacing (e.g., form fields), eventually with dividers. | Lightweight, enforces consistent rhythm without custom margins.         | If horizontal alignment is required – use Flex. For multi-column layouts – use Grid or Matrix.              |
| Matrix    | You want a uniform grid pattern where items in the same row align horizontally (e.g., product cards with equal height). | Ensures visual balance and consistency; equal item heights across rows. | If content varies in size and doesn’t need strict alignment – use Grid. For simpler stacking – use Stack.   |

On this page

- [Flex vs Grid vs Stack vs Matrix](#section-flex-vs-grid-vs-stack-vs-matrix-f2)
