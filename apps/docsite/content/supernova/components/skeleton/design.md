---
title: Skeleton
sourceUrl: https://spirit.supernova-docs.io/latest/components/skeleton/design-DIGbfyF2
sourcePath: /latest/components/skeleton/design-DIGbfyF2
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.209Z
---

- [Overview](/latest/components/skeleton/overview-1OlTge6X)
- [Design](/latest/components/skeleton/design-DIGbfyF2)
- [Figma](/latest/components/skeleton/figma-KarPbvrY-KarPbvrY)
- [HTML](/latest/components/skeleton/html-sTQcaRDT)
- [React](/latest/components/skeleton/react-ksjkDfjI)
- [Accessibility](/latest/components/skeleton/accessibility-x0P9i2gc-x0P9i2gc)

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/fcebd7f5-ccbb-4b66-a5b6-7c145d1e0175.png)

Type Circle

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/b19cab41-b120-4cc7-a0a9-111ded8b533a.png)

Type Rectangle

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/f78db732-d82e-4129-8634-0fca8cfe94a5.png)

Type Square

Skeleton

| Property     | Values    | Default |
| ------------ | --------- | ------- | ------ | --------- |
| Type Variant | Rectangle | Square  | Circle | Rectangle |

### **Skeleton vs Spinner vs Progress Indicator**

| Component                                | Use when                                                                                            | Strengths                                                                        | Don’t use when                                                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skeleton                                 | The layout of the content is known, but data isn’t yet loaded (e.g., article list, product cards).  | Shows users what to expect, reduces layout shift, and keeps context clear.       | If the loading duration is very short, Skeleton may flash unnecessarily – use Spinner instead. If you need to show progress completion, use Progress Indicator. |
| Spinner                                  | The duration is unknown or variable, often for short waits (e.g., server response, inline refresh). | Lightweight, draws attention to activity, good for quick background tasks.       | If layout is known – use Skeleton. If loading will take long or has measurable progress – use Progress Indicator.                                               |
| Progress Indicator (not implemented yet) | The task has a determinable length or steps (e.g., file upload, checkout process).                  | Shows measurable progress, reduces uncertainty, best for long or critical tasks. | If duration can’t be measured – use Spinner. If the content structure is known but not loaded yet, use Skeleton.                                                |

On this page

- [Skeleton vs Spinner vs Progress Indicator](#section-skeleton-vs-spinner-vs-progress-indicator-35)
