---
title: Skeleton
---

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/85a03030-fb3a-40bf-9e51-e8c516680c6f.png)

Type Circle

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/3d8e3a96-5a06-48f0-b0dc-9b427cf3e9f4.png)

Type Rectangle

![Skeleton](https://studio-assets.supernova.io/design-systems/10180/804ecf66-d4b0-4c70-ba68-dc3f45a18407.png)

Type Square

Skeleton

| Property     | Values    | Default |
| ------------ | --------- | ------- |
| Type Variant | Rectangle | Square  | Circle | Rectangle |

### **Skeleton vs Spinner vs Progress Indicator**

| Component                                | Use when                                                                                            | Strengths                                                                        | Don’t use when                                                                                                                                                  |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skeleton                                 | The layout of the content is known, but data isn’t yet loaded (e.g., article list, product cards).  | Shows users what to expect, reduces layout shift, and keeps context clear.       | If the loading duration is very short, Skeleton may flash unnecessarily – use Spinner instead. If you need to show progress completion, use Progress Indicator. |
| Spinner                                  | The duration is unknown or variable, often for short waits (e.g., server response, inline refresh). | Lightweight, draws attention to activity, good for quick background tasks.       | If layout is known – use Skeleton. If loading will take long or has measurable progress – use Progress Indicator.                                               |
| Progress Indicator (not implemented yet) | The task has a determinable length or steps (e.g., file upload, checkout process).                  | Shows measurable progress, reduces uncertainty, best for long or critical tasks. | If duration can’t be measured – use Spinner. If the content structure is known but not loaded yet, use Skeleton.                                                |
