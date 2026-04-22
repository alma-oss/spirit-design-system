---
title: Slider
sourceUrl: https://spirit.supernova-docs.io/latest/components/slider/design-FZDIwAp3
sourcePath: /latest/components/slider/design-FZDIwAp3
sourceSection: components
lastExtractedAt: 2026-04-22T22:32:28.922Z
---

- [Overview](/latest/components/slider/overview-Y93PhlkV)
- [Design](/latest/components/slider/design-FZDIwAp3)
- [Figma](/latest/components/slider/figma-PgzdVLdK-PgzdVLdK)
- [HTML](/latest/components/slider/html-mVLp51Ty)
- [React](/latest/components/slider/react-wcQuunOx)
- [Accessibility](/latest/components/slider/accessibility-vBKv45bJ-vBKv45bJ)

![Slider](https://studio-assets.supernova.io/design-systems/10180/82d90e66-0e1d-4659-b52f-61cc38d723f1.png)

Value 0%

![Slider](https://studio-assets.supernova.io/design-systems/10180/611d877b-4286-4deb-936d-5da84a53ece5.png)

Value 50%

![Slider](https://studio-assets.supernova.io/design-systems/10180/9913e957-9e77-422d-988d-fb07b30e2c54.png)

Value 100%

Slider

| Property                  | Values  | Default |
| ------------------------- | ------- | ------- | ------- | ------ | ------- |
| Value Variant             | 0%      | 50%     | 100%    | 0%     |
| Disabled Variant          | False   | True    | False   |
| Interaction State Variant | Default | Hover   | Pressed | Active | Default |

---

### **Slider vs Number Field vs Select vs Toggle**

| Component    | Use when                                                                         | Strengths                                            | Don’t use when                                                                                                       |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Slider       | A value from a continuous or large range is needed (e.g., price filter, volume). | Quick, intuitive, visual selection; supports ranges. | If precise numeric input is required – use Text Field. If only a few discrete options exist – use Select or Radio.   |
| Number Field | Users must enter a specific, precise numeric value (e.g., age, quantity).        | Allows exact values, supports stepper controls.      | If approximate visual input is fine – use Slider. If the value is categorical rather than numeric – use Select.      |
| Select       | The choice must be from a set of discrete options (numeric or non-numeric).      | Handles both short and long option lists; compact.   | If the range is continuous and large – use Slider. If only two options exist – use Toggle.                           |
| Toggle       | For binary yes/no or on/off states.                                              | Simple, fast, clear binary interaction.              | If more than two options exist – use Select or Slider. If precision in numeric range is required – use Number Field. |

On this page

- [Slider vs Number Field vs Select vs Toggle](#section-slider-vs-number-field-vs-select-vs-toggle-c4)
