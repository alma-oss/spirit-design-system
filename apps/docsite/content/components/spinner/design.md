---
title: Spinner
---

![Spinner](https://studio-assets.supernova.io/design-systems/10180/4bf91367-d6f0-4078-b3de-4a1b187fb10d.png)

Spinner

Text Color Primary

![Spinner](https://studio-assets.supernova.io/design-systems/10180/1ffa0c34-117b-456e-aaa3-1b2a457a3685.png)

Spinner

Text Color Secondary

Spinner

| Property           | Values  | Default   |
| ------------------ | ------- | --------- |
| Text Color Variant | Primary | Secondary | Primary |

### **Skeleton vs Spinner vs Progress Indicator**

| Component                                | Use when                                                                                            | Strengths                                                                        | Don’t use when                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skeleton                                 | The layout of the content is known, but data isn’t yet loaded (e.g., article list, product cards).  | Shows users what to expect, reduces layout shift, keeps context clear.           | If loading duration is very short, Skeleton may flash unnecessarily – use Spinner instead. If you need to show progress completion, use Progress Indicator. |
| Spinner                                  | The duration is unknown or variable, often for short waits (e.g., server response, inline refresh). | Lightweight, draws attention to activity, good for quick background tasks.       | If layout is known – use Skeleton. If loading will take long or has measurable progress – use Progress Indicator.                                           |
| Progress Indicator (not implemented yet) | The task has a determinable length or steps (e.g., file upload, checkout process).                  | Shows measurable progress, reduces uncertainty, best for long or critical tasks. | If duration can’t be measured – use Spinner. If content structure is known but not loaded yet – use Skeleton.                                               |
