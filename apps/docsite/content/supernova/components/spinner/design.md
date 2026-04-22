---
title: Spinner
sourceUrl: https://spirit.supernova-docs.io/latest/components/spinner/design-ekXLahqn
sourcePath: /latest/components/spinner/design-ekXLahqn
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:29.412Z
---

- [Overview](/latest/components/spinner/overview-Q9kGTzdA)
- [Design](/latest/components/spinner/design-ekXLahqn)
- [Figma](/latest/components/spinner/figma-TLTeM9fC-TLTeM9fC)
- [HTML](/latest/components/spinner/html-dBmny8a9)
- [React](/latest/components/spinner/react-w7EmhF7Y)
- [Accessibility](/latest/components/spinner/accessibility-ipHRXm3F-ipHRXm3F)

![Spinner](https://studio-assets.supernova.io/design-systems/10180/1b99d798-edec-474b-b8b8-4b154fd3418c.png)

Spinner

Text Color Primary

![Spinner](https://studio-assets.supernova.io/design-systems/10180/d4f05444-7fe5-4af4-879a-6d9e5c80c5ad.png)

Spinner

Text Color Secondary

Spinner

| Property           | Values  | Default   |
| ------------------ | ------- | --------- | ------- |
| Text Color Variant | Primary | Secondary | Primary |

### **Skeleton vs Spinner vs Progress Indicator**

| Component                                | Use when                                                                                            | Strengths                                                                        | Don’t use when                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skeleton                                 | The layout of the content is known, but data isn’t yet loaded (e.g., article list, product cards).  | Shows users what to expect, reduces layout shift, keeps context clear.           | If loading duration is very short, Skeleton may flash unnecessarily – use Spinner instead. If you need to show progress completion, use Progress Indicator. |
| Spinner                                  | The duration is unknown or variable, often for short waits (e.g., server response, inline refresh). | Lightweight, draws attention to activity, good for quick background tasks.       | If layout is known – use Skeleton. If loading will take long or has measurable progress – use Progress Indicator.                                           |
| Progress Indicator (not implemented yet) | The task has a determinable length or steps (e.g., file upload, checkout process).                  | Shows measurable progress, reduces uncertainty, best for long or critical tasks. | If duration can’t be measured – use Spinner. If content structure is known but not loaded yet – use Skeleton.                                               |

On this page

- [Skeleton vs Spinner vs Progress Indicator](#section-skeleton-vs-spinner-vs-progress-indicator-30)
