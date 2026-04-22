---
title: Tooltip
sourceUrl: https://spirit.supernova-docs.io/latest/components/tooltip/design-08uxcGKD
sourcePath: /latest/components/tooltip/design-08uxcGKD
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:35.148Z
---

- [Overview](/latest/components/tooltip/overview-zhGH30af)
- [Design](/latest/components/tooltip/design-08uxcGKD)
- [Figma](/latest/components/tooltip/figma-0ZlKs0M7-0ZlKs0M7)
- [HTML](/latest/components/tooltip/html-fxoORGmr)
- [React](/latest/components/tooltip/react-ZI9bYUzJ)
- [Accessibility](/latest/components/tooltip/accessibility-TVRyDsew-TVRyDsew)

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/027b7577-ea93-4e76-a5d8-6434a4c221a6.png)

Tooltip

Placement Bottom

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/a2ce0ba2-a68f-4ce3-bd8d-aaf1dfb115a1.png)

Tooltip

Placement Bottom End

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/f556cd10-04e4-4ce4-9215-5d3076430c3b.png)

Tooltip

Placement Bottom Start

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/49a42436-2099-45af-b861-83fbea0f70b6.png)

Tooltip

Placement Left

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/5d2bf2be-da9b-45ee-a53e-31711dde38dd.png)

Tooltip

Placement Left End

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/f50eb750-00e4-4ef9-892a-04ed88c637b6.png)

Tooltip

Placement Left Start

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/14308ffa-bbb9-4216-9de0-becb7115df85.png)

Tooltip

Placement Right

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/10650bff-ad03-4e57-bdfa-778f95b59e2f.png)

Tooltip

Placement Right End

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/7100f756-9547-45f0-920f-5883612a3668.png)

Tooltip

Placement Right Start

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/b14fd495-e4ca-40e4-adb9-feeb118fabe3.png)

Tooltip

Placement Top

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/44404249-37aa-42a3-b092-871c6b73acaf.png)

Tooltip

Placement Top End

![Tooltip](https://studio-assets.supernova.io/design-systems/10180/80a5dcd6-4b5c-499c-b418-95ab758be699.png)

Tooltip

Placement Top Start

Tooltip

| Property            | Values | Default                                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------------------- | ---------- | --- | --------- | ------- | ----- | --------- | ----------- | ---- | -------- | ---------- | ------ |
| Text Text           | string | Would you like to see an overview of the offers you have responded to? Here is it. |
| Dismissible Boolean | true   | false                                                                              | true       |
| Placement Variant   | Bottom | Bottom Start                                                                       | Bottom End | Top | Top Start | Top End | Right | Right End | Right Start | Left | Left End | Left Start | Bottom |

### Practical Decision Tips

- If your content is **more than a quick hint**, needs **links** or **interaction**, or must remain visible while the user considers it – **Modal** (blocking) or **Popover/inline** (non-blocking), **not Tooltip**.

- If it’s a **single sentence of optional context** for a control – **Tooltip**.

- If you’re switching between **equally important views** – **Segmented Control**, not Modal/Tooltip.

On this page

- [Practical Decision Tips](#section-practical-decision-tips-53)
