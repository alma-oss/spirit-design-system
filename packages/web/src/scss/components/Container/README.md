# Container

## Basic Usage

```html
<div class="Container">Content</div>
```

## Fluid Container

```html
<div class="Container Container--fluid">Content</div>
```

## Sizes

- `Container--xsmall`
- `Container--small`
- `Container--medium`
- `Container--large`
- `Container--xlarge` (default)

```html
<div class="Container Container--xsmall">Content</div>
<div class="Container Container--small">Content</div>
<div class="Container Container--medium">Content</div>
<div class="Container Container--large">Content</div>
<div class="Container Container--xlarge">Content</div>
```

⚠️ Make sure that you have properly set up `container-{{size}}-max-width` tokens in your project. Without it, the old default size will be used, and sizes will not be available.

The following design tokens are required for Container to work:

- `container-xsmall-max-width`
- `container-small-max-width`
- `container-medium-max-width`
- `container-large-max-width`
- `container-xlarge-max-width`

## Text Alignment

Use utility classes to align the text inside the `Container` component.

```html
<div class="Container text-center">Content with centered text</div>
<div class="Container text-right">Content with right aligned text</div>
```

Responsive values can be defined using the `tablet` and `desktop` infixes.

```html
<div class="Container text-center text-tablet-right text-desktop-left">Content with responsive text alignment</div>
```

## Feature Flag: Block Formatting Context

This feature is behind the `enable-v5-container-block-formatting-context` feature flag.

When the feature flag is enabled, the Container root element will create a new block formatting context
by applying `flow-root` display property. This helps to manage the layout of floated children elements
inside the Container or prevent margin collapsing issues.

For more info, see main [README][readme-feature-flags].

### ⚠️ DEPRECATION NOTICE

The property which sets a new block formatting context to Container root element will be part of the next major release.

[What are deprecations?][readme-deprecations]

[readme-feature-flags]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/README.md#feature-flags
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/README.md#deprecations
