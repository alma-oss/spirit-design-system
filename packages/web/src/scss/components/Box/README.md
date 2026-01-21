# Box

The Box component is a simple container around content or other components.

```html
<div>Content</div>
```

## Border

You can define border width, color, style using the utility classes `border-<width>`, `border-<color>`, `border-<style>`
and radius using utility class `rounded-<radius>`. Use `rounded-<breakpoint>-<radius>` classes if you need the radius responsive for different [breakpoints][dictionary-breakpoint].

```html
<div class="border-basic border-100 rounded-200 border-solid border-dashed">Without radius</div>
```

⚠️ When you apply `border-<style>` without defining `border-<width>` or `border-<color>`, browsers automatically
set `border-color: currentColor` and `border-width: medium`.

## Padding

You can define padding using utility class `p-<padding>`.

```html
<div class="p-200">With padding</div>
```

It is also possible to define padding for horizontal and vertical sides using utility classes `px-<padding>` and `py-<padding>`.

```html
<div class="px-200 py-300">With vertical and horizontal padding</div>
```

You can also define padding for each side using utility classes `pt-<padding>`, `pr-<padding>`, `pb-<padding>`, and `pl-<padding>`.

```html
<div class="pt-200 pr-300 pb-400 pl-500">With padding for each direction</div>
```

Responsive values can be set for each prop using utility classes `px-<padding>`, `px-tablet-<padding>`, `px-desktop-<padding>`, `py-<padding>`, `py-tablet-<padding>`, and `py-desktop-<padding>`.

```html
<div class="px-400 px-tablet-800 px-desktop-1200 py-200 py-tablet-400 py-desktop-600">With responsive padding</div>
```

Responsive values can be set for each prop using utility classes. For example, `p-<padding>` for mobile, `p-tablet-<padding>` for tablet, and `p-desktop-<padding>` for desktop.

```html
<div class="p-200 p-tablet-400 p-desktop-600">With responsive padding</div>
```

## Background Color

You can define background color using utility classes `bg-<color>`.

```html
<div class="bg-primary">Primary Background</div>
<div class="bg-secondary">Secondary Background</div>
<div class="bg-tertiary">Tertiary Background</div>
<div class="bg-neutral-basic">Neutral-basic Background</div>
<div class="bg-neutral-subtle">Neutral-subtle Background</div>
```

## Background Gradient

You can define background gradient using utility classes `bg-gradient-<color>`.

```html
<div class="bg-gradient-primary">Primary Background Gradient</div>
<div class="bg-gradient-secondary">Secondary Background Gradient</div>
```

Responsive values can be set for each prop using utility classes. For example, `bg-gradient-<color>` for mobile, `bg-gradient-tablet-<color>` for tablet, and `bg-gradient-desktop-<color>` for desktop.

```html
<div class="bg-gradient-primary bg-gradient-tablet-secondary bg-gradient-desktop-primary">
  Responsive background gradient
</div>
```

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
