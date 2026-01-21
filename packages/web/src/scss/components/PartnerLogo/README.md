# PartnerLogo

PartnerLogo is a component designed to display the partner's logo (e.g. advertiser, business partner, etc.).

```html
<div class="PartnerLogo">
  <!-- Logo goes here -->
</div>
```

## Sizes

The PartnerLogo component is available in [sizes][dictionary-size].
Use the `PartnerLogo--<size>` modifier class to change the size of the PartnerLogo component.

```html
<div class="PartnerLogo PartnerLogo--small">
  <!-- Logo goes here -->
</div>
<div class="PartnerLogo PartnerLogo--medium">
  <!-- Logo goes here -->
</div>
<div class="PartnerLogo PartnerLogo--large">
  <!-- Logo goes here -->
</div>
```

## Responsive Size

To create a PartnerLogo with responsive size, use the `tablet` and `desktop` infixes, e.g. `PartnerLogo--tablet--medium`.

```html
<div class="PartnerLogo--small PartnerLogo--tablet--medium PartnerLogo--desktop--large">
  <!-- Logo goes here -->
</div>
```

ℹ️ You can also make the logo adjust to the size of the container in which it is placed. See [Fluid Size](#fluid-size) section for more details.

## Enable Safe Area

The PartnerLogo component can be displayed with the safe area (padding). Use `PartnerLogo--safeArea` modifier to enable safe area around logo.

```html
<div class="PartnerLogo PartnerLogo--medium PartnerLogo--safeArea">
  <!-- Logo goes here -->
</div>
```

### Fluid Size

To adjust the `PartnerLogo` to the size of its container, use the `PartnerLogo--fluid` modifier. This allows the logo to scale while preserving its aspect ratio
and ensures it remains vertically and horizontally aligned within the container.

```html
<div class="PartnerLogo PartnerLogo--fluid">
  <!-- Logo goes here -->
</div>
```

## Content

The content of the PartnerLogo component can be an image or svg.

### Image

```html
<div class="PartnerLogo">
  <img src="path-to-logo" alt="Partner Logo" />
</div>
```

👉 To make the logo accessible, the image should have an `alt` attribute, or, if using inline SVG, the `<title>` element
should be present.

### SVG

```html
<div class="PartnerLogo">
  <svg width="300" height="130">
    <title>Partner Logo</title>
    <rect width="200" height="100" x="10" y="10" rx="20" ry="20" fill="#fff" />
  </svg>
</div>
```

## Full Example

```html
<div class="PartnerLogo PartnerLogo--medium">
  <img src="path-to-logo" alt="Partner Logo" />
</div>

<div class="PartnerLogo PartnerLogo--large">
  <svg width="300" height="130">
    <title>Partner Logo</title>
    <rect width="200" height="100" x="10" y="10" rx="20" ry="20" fill="#fff" />
  </svg>
</div>
```

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
