---
title: Responsive Base Values
---

## Overview

Spirit components use relative units (rem) instead of fixed pixel values (px).  
While designers continue to work with pixels in Figma, the exported design tokens are converted into relative units during implementation. This allows Spirit-based interfaces to adapt to user preferences and device-specific requirements without requiring changes to component designs.

## Why Spirit Uses Relative Units?

Traditional pixel-based interfaces have a fixed size regardless of user preferences.

By using relative units, Spirit allows:

- better accessibility by respecting user font size settings,

- consistent scaling of typography, spacing and components,

- different visual density across devices,

- easier maintenance and future customization.

As a result, users can increase their preferred font size and Spirit components will scale proportionally instead of only increasing text size.

## Designing in Two Steps

When designing with Spirit, think about sizing as two separate decisions.

### 1\. Define the visual hierarchy

First, decide how components relate to each other.  
Use component sizes (for example Small, Medium and Large) to establish the visual hierarchy and relationships between elements.

Examples:

- This button should be smaller than the primary action.

- Icons inside cards should be the same size as icons in the page footer.

- Form controls should share a consistent size across the interface.

At this stage, you're designing the interface itself—defining how elements relate to each other, regardless of the device they will appear on.

### 2\. Adjust the overall density

Once the interface is designed and the relative sizes are correct, you can adjust the overall density.  
Instead of resizing individual components, Spirit can scale the entire interface by changing the base value used for converting pixels to rem.

For example:

- base value 16px → base value 20px

Without changing the design itself, typography, spacing and component dimensions become proportionally larger, making the interface easier to read and interact with.  
Think of this as a final tuning step that adapts the interface to the device, rather than redesigning the interface for each breakpoint.

## Figma to implementation example

Designers continue to define values in pixels in Figma. During export, these values are converted to rem based on the configured base value.

For example, when the base value is 16px:

- 16px in Figma → 1rem in implementation

- 24px in Figma → 1.5rem in implementation

- 32px in Figma → 2rem in implementation

The base value defines what 1rem means in implementation. With a 16px base, 1rem equals 16px.

Currently, designers do not edit the base value directly. It is configured by developers, but in the future it may become part of the token system so designers can help define density strategies more directly.

**How it changes the perception of the Figma design:**

- values defined in Figma should be considered design references rather than fixed implementation sizes,

- the final rendered size may differ depending on user settings or platform configuration,

- proportional relationships between elements are more important than exact pixel values.

## Responsive Density

One of the advantages of relative units is the ability to adjust the overall density of a specific interface (desktop, tablet, mobile) by changing the base value.  
This helps create interfaces that are more flexible across devices and accessibility settings while keeping component proportions predictable.

For example:

- Desktop may use a denser layout.

- Mobile may use larger typography and spacing for improved readability and touch interaction.

Currently, Spirit has a specific token for each device (desktop, tablet, mobile), but **this feature wasn’t fully implemented.**  
It can be added on demand.

## Designing for Relative Units Systems

When designing for a system that uses relative units, remember that the same pixel values in Figma can be converted differently in implementation, depending on the configured base value.

When designing responsive experiences:

- focus on content hierarchy rather than exact pixel values,

- ensure layouts remain usable when typography and spacing scale,

- avoid relying on tightly constrained dimensions,

- allow sufficient space for text growth and content expansion.

Remember that users may increase or decrease their preferred font size, resulting in rendered content that is larger or smaller than what is shown in design tools.

## Accessibility Considerations

Because Spirit scales typography and spacing together:

- text remains readable at larger sizes,

- component proportions remain consistent,

- interfaces are more resilient to user accessibility settings.

When designing components and layouts:

- avoid fixed-height content areas where possible,

- account for text wrapping,

- test layouts with longer content and larger text sizes.

## Current Limitations

Not every value in implementation needs to scale with the base value.  
Some visual details still use fixed pixel values intentionally, especially where scaling would not provide meaningful benefit or could reduce visual precision.  
Examples include:

- borders

- hairline separators

- certain optical adjustments

This means designers should expect typography and token-based spacing or sizing to benefit from relative units, while some small visual details may remain fixed.
