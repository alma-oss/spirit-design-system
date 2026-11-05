# Logical Properties First Rule

## Principle

**ALWAYS prefer logical properties over physical properties for internationalization support.**

## Why Logical Properties?

Logical properties adapt to:

- **RTL languages** (Arabic, Hebrew)
- **Vertical writing modes** (Japanese, Mongolian)
- **Future-proof internationalization**

Physical properties (`width`, `margin-left`) assume left-to-right, horizontal text. Logical properties (`inline-size`, `margin-inline-start`) adapt to any writing mode.

## Property Mappings

### Sizing

| ❌ Physical  | ✅ Logical        | Description                   |
| ------------ | ----------------- | ----------------------------- |
| `width`      | `inline-size`     | Size in reading direction     |
| `height`     | `block-size`      | Size perpendicular to reading |
| `min-width`  | `min-inline-size` | Minimum inline size           |
| `max-width`  | `max-inline-size` | Maximum inline size           |
| `min-height` | `min-block-size`  | Minimum block size            |
| `max-height` | `max-block-size`  | Maximum block size            |

### Spacing - Margin

| ❌ Physical      | ✅ Logical            | Description                |
| ---------------- | --------------------- | -------------------------- |
| `margin-left`    | `margin-inline-start` | Start of reading direction |
| `margin-right`   | `margin-inline-end`   | End of reading direction   |
| `margin-top`     | `margin-block-start`  | Start of block direction   |
| `margin-bottom`  | `margin-block-end`    | End of block direction     |
| `margin: 0 10px` | `margin-inline: 10px` | Both inline edges          |
| `margin: 10px 0` | `margin-block: 10px`  | Both block edges           |

### Spacing - Padding

| ❌ Physical       | ✅ Logical             | Description                |
| ----------------- | ---------------------- | -------------------------- |
| `padding-left`    | `padding-inline-start` | Start of reading direction |
| `padding-right`   | `padding-inline-end`   | End of reading direction   |
| `padding-top`     | `padding-block-start`  | Start of block direction   |
| `padding-bottom`  | `padding-block-end`    | End of block direction     |
| `padding: 0 10px` | `padding-inline: 10px` | Both inline edges          |
| `padding: 10px 0` | `padding-block: 10px`  | Both block edges           |

### Borders

| ❌ Physical                    | ✅ Logical                                                       |
| ------------------------------ | ---------------------------------------------------------------- |
| `border-left`                  | `border-inline-start`                                            |
| `border-right`                 | `border-inline-end`                                              |
| `border-top`                   | `border-block-start`                                             |
| `border-bottom`                | `border-block-end`                                               |
| `border-left-color`            | `border-inline-start-color`                                      |
| `border-radius: 10px 0 0 10px` | `border-start-start-radius: 10px; border-end-start-radius: 10px` |

### Positioning

| ❌ Physical         | ✅ Logical           |
| ------------------- | -------------------- |
| `left`              | `inset-inline-start` |
| `right`             | `inset-inline-end`   |
| `top`               | `inset-block-start`  |
| `bottom`            | `inset-block-end`    |
| `left: 0; right: 0` | `inset-inline: 0`    |
| `top: 0; bottom: 0` | `inset-block: 0`     |

### Viewport Units

| ❌ Physical | ✅ Logical | Description                    |
| ----------- | ---------- | ------------------------------ |
| `100vw`     | `100vi`    | Viewport inline (width in LTR) |
| `100vh`     | `100vb`    | Viewport block (height in LTR) |
| `100dvw`    | `100dvi`   | Dynamic viewport inline        |
| `100dvh`    | `100dvb`   | Dynamic viewport block         |
| `100svw`    | `100svi`   | Small viewport inline          |
| `100svh`    | `100svb`   | Small viewport block           |
| `100lvw`    | `100lvi`   | Large viewport inline          |
| `100lvh`    | `100lvb`   | Large viewport block           |

### Container Query Units

| ❌ Physical | ✅ Logical | Description                  |
| ----------- | ---------- | ---------------------------- |
| `10cqw`     | `10cqi`    | 10% of container inline size |
| `10cqh`     | `10cqb`    | 10% of container block size  |

## Examples

### ❌ WRONG (Physical Properties)

```css
.card {
  width: 300px;
  height: 200px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px 15px;
  border-left: 3px solid blue;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### ✅ CORRECT (Logical Properties)

```css
.card {
  inline-size: 300px;
  block-size: 200px;
  margin-inline: 20px;
  padding-inline: 15px;
  padding-block: 10px;
  border-inline-start: 3px solid blue;
}

.container {
  max-inline-size: 1200px;
  margin-inline: auto;
}
```

---

### Real-World Example: Responsive Card

❌ **Physical (RTL-unfriendly)**:

```css
.card {
  width: 100%;
  max-width: 400px;
  padding: 20px 30px;
  margin: 0 15px 20px 15px;
}

.card-icon {
  float: left;
  margin-right: 10px;
}

.card-title {
  text-align: left;
}
```

✅ **Logical (RTL-ready)**:

```css
.card {
  inline-size: 100%;
  max-inline-size: 400px;
  padding-inline: 30px;
  padding-block: 20px;
  margin-inline: 15px;
  margin-block-end: 20px;
}

.card-icon {
  float: inline-start;
  margin-inline-end: 10px;
}

.card-title {
  text-align: start;
}
```

**What happens in RTL?**

- Physical version: Icon stays on left (wrong), margins stay left/right
- Logical version: Icon automatically moves to right, all spacing flips correctly

---

### Container Query Example

❌ **Physical units**:

```css
.container {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    width: 50%;
    padding: 20px;
    gap: 2cqw;
  }
}
```

✅ **Logical units**:

```css
.container {
  container-type: inline-size;
}

@container (min-inline-size: 600px) {
  .card {
    inline-size: 50%;
    padding-inline: 20px;
    gap: 2cqi;
  }
}
```

---

## Text Alignment

| ❌ Physical         | ✅ Logical          |
| ------------------- | ------------------- |
| `text-align: left`  | `text-align: start` |
| `text-align: right` | `text-align: end`   |

---

## Exceptions

Physical properties are acceptable for:

1. **Truly physical concepts**: `border-radius: 50%` (circle is same in all directions)
2. **Explicit design requirements**: "I need 10px on the top specifically"
3. **Legacy browser support**: When logical properties aren't supported AND no fallback possible

**Even then, consider providing both**:

```css
.element {
  width: 100%; /* Fallback for old browsers */
  inline-size: 100%; /* Modern logical property */
}
```

---

## Validation Checklist

Before suggesting CSS, check:

- [ ] Did I use `inline-size` instead of `width`?
- [ ] Did I use `block-size` instead of `height`?
- [ ] Did I use `margin-inline/block` instead of directional margins?
- [ ] Did I use `padding-inline/block` instead of directional padding?
- [ ] Did I use `inset-inline/block` instead of `left/right/top/bottom`?
- [ ] Did I use `vi/vb` viewport units instead of `vw/vh`?
- [ ] Did I use `cqi/cqb` container units instead of `cqw/cqh`?
- [ ] Did I use `start/end` text alignment instead of `left/right`?

---

## Remember

**Logical properties are not just for RTL languages. They are the default for modern CSS.**

Modern CSS should be international-ready by default. Think in terms of **inline** (reading direction) and **block** (paragraph flow), not left/right/top/bottom.
