# Pill

Pill is a compact label used to show a count or short piece of information.

## Basic Usage

```html
<span class="Pill Pill--selected color-scheme-on-selected-basic">3</span>
```

## Color Variants

`Pill` supports selected, neutral, and emotion color variants.
Apply the matching `color-scheme-on-*` helper to each variant:

```html
<span class="Pill Pill--selected color-scheme-on-selected-basic">333</span>
<span class="Pill Pill--neutral color-scheme-on-neutral-basic">333</span>
<span class="Pill Pill--success color-scheme-on-emotion-success-basic">3</span>
<span class="Pill Pill--informative color-scheme-on-emotion-informative-basic">3</span>
<span class="Pill Pill--warning color-scheme-on-emotion-warning-basic">3</span>
<span class="Pill Pill--danger color-scheme-on-emotion-danger-basic">3</span>
```

The system allows you to override the default color scheme by configuring optional design tokens. See [Component Color Overrides][component-color-overrides] for more information.

ℹ️ Even though the `Pill--<color>` modifier is not used by default, it can be used to override the color scheme when needed. See [Component Color Overrides][component-color-overrides] for more information.

### Subtle Variant

Use the `*-subtle` color scheme class when you need a softer color intensity:

```html
<span class="Pill Pill--selected color-scheme-on-selected-subtle">333</span>
<span class="Pill Pill--neutral color-scheme-on-neutral-subtle">333</span>
<span class="Pill Pill--success color-scheme-on-emotion-success-subtle">3</span>
<span class="Pill Pill--informative color-scheme-on-emotion-informative-subtle">3</span>
<span class="Pill Pill--warning color-scheme-on-emotion-warning-subtle">3</span>
<span class="Pill Pill--danger color-scheme-on-emotion-danger-subtle">3</span>
```

## Content Length

Pill works well for short labels and numeric counts, but it can also render longer content when needed:

```html
<span class="Pill Pill--selected color-scheme-on-selected-basic">333</span>
```

[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
