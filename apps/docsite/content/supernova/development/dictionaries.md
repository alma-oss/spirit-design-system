---
title: Dictionaries
sourceUrl: https://spirit.supernova-docs.io/latest/development/dictionaries-89GTM4J1
sourcePath: /latest/development/dictionaries-89GTM4J1
sourceSection: development
lastExtractedAt: 2026-04-22T22:32:09.849Z
---

# Dictionaries

This project uses **dictionaries** to unify props across components.

- A dictionary defines a **complete set of allowed values.** For example, the [Size](#size) dictionary contains small, medium, and large.
- When a component uses a dictionary, it should support **all values from that dictionary**. For example, if a Button supports medium and large sizes, it should also support small.
- **A property value belongs to a dictionary,** not the other way around. For example, the primary color value is part of the [Action Color](#color) dictionary.
- **Some dictionaries are generated from design tokens.** For example, the [Breakpoint](#breakpoint) dictionary is generated from the Breakpoint design token.
- **Products can extend dictionaries** with additional values.

## List of Dictionaries

🎨 = Generated from design tokens

- [Alignment](#alignment)
- [Border](#border)
- [Breakpoint](#breakpoint)
- [Color](#color)
- [Emphasis](#emphasis)
- [Gradient](#gradient)
- [Placement](#placement)
- [Size](#size)
- [Validation](#validation)
- [Variant](#variant)

### Alignment

| Dictionary         | Values                                         | Code name          |
| ------------------ | ---------------------------------------------- | ------------------ |
| AlignmentX         | left, center, right                            | AlignmentX         |
| AlignmentXExtended | AlignmentX Dictionary + stretch, space-between | AlignmentXExtended |
| AlignmentY         | top, center, bottom                            | AlignmentY         |
| AlignmentYExtended | AlignmentY Dictionary + stretch, baseline      | AlignmentYExtended |
| TextAlignment      | left, center, right                            | TextAlignment      |

### Border

| Dictionary       | Values                           | Code name    |
| ---------------- | -------------------------------- | ------------ |
| Border Color     | basic                            | BorderColor  |
| Border Radius 🎨 | 0, 100, 200, 300, 400, 500, full | BorderRadius |
| Border Style     | solid, dotted, dashed            | BorderStyle  |
| Border Width     | 0, 100, 200                      | BorderWidth  |

### Breakpoint

| Dictionary    | Values                  | Code name  |
| ------------- | ----------------------- | ---------- |
| Breakpoint 🎨 | mobile, tablet, desktop | Breakpoint |

### Color

| Dictionary                | Values                                | Code name            |
| ------------------------- | ------------------------------------- | -------------------- |
| Background Color          | primary, secondary, tertiary          | BackgroundColor      |
| Component Button Color 🎨 | primary, secondary, tertiary, plain   | ComponentButtonColor |
| Emotion Color 🎨          | success, informative, warning, danger | EmotionColor         |
| Link Color                | primary, secondary, tertiary          | LinkColor            |
| Text Color 🎨             | primary, secondary, tertiary          | TextColor            |

### Intensity

| Dictionary | Values        | Code name |
| ---------- | ------------- | --------- |
| Intensity  | basic, subtle | Intensity |

### Direction

| Dictionary        | Values                                     | Code name         |
| ----------------- | ------------------------------------------ | ----------------- |
| Direction         | horizontal, vertical                       | Direction         |
| DirectionAxis     | x, y                                       | DirectionAxis     |
| DirectionExtended | Direction Dictionary + horizontal-reversed | DirectionExtended |

### Emphasis

| Dictionary | Values                          | Code name |
| ---------- | ------------------------------- | --------- |
| Emphasis   | regular, bold, semibold, italic | Emphasis  |

### Gradient

| Dictionary          | Values             | Code name          |
| ------------------- | ------------------ | ------------------ |
| Background Gradient | primary, secondary | BackgroundGradient |

### Placement

| Dictionary | Values                                                                                                               | Code name |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | --------- |
| Placement  | top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end | Placement |

### Size

| Dictionary    | Values                           | Code name    |
| ------------- | -------------------------------- | ------------ |
| Size          | small, medium, large             | Size         |
| Size Extended | Size Dictionary + xsmall, xlarge | SizeExtended |

### Validation

| Dictionary | Values                   | Code name  |
| ---------- | ------------------------ | ---------- |
| Validation | success, warning, danger | Validation |

### Variant

| Dictionary    | Values        | Code name    |
| ------------- | ------------- | ------------ |
| Fill Variant  | fill, outline | FillVariant  |
| Shape Variant | box, pill     | ShapeVariant |
