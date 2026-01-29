# Avatar

The `Avatar` component is used to represent a user or entity.

It can be a circle or a square (with rounded corners, using `radius-100` token) and
can have different sizes.

## Example

```html
<div class="Avatar Avatar--medium" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>

<a href="#" class="Avatar Avatar--xsmall" aria-label="Profile of Jiří Bárta">
  <img src="https://picsum.photos/id/823/162/162" alt="Jiří Bárta" aria-hidden="true" />
</a>
```

## Square

Add `Avatar--square` modifier to make the avatar a square.

```html
<div class="Avatar Avatar--medium Avatar--square" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
```

## Sizes

The Avatar component is available in all [extended sizes][dictionary-size].
Use the `Avatar--<size>` modifier class to change the size of the Avatar component.

```html
<div class="Avatar Avatar--xsmall" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
<div class="Avatar Avatar--small" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
<div class="Avatar Avatar--medium" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
<div class="Avatar Avatar--large" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
<div class="Avatar Avatar--xlarge" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
```

## Content

The content of the `Avatar` component can be an image, an icon, or a text string.

### Icon

```html
<div class="Avatar Avatar--medium" aria-label="Profile of Jiří Bárta">
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
  </svg>
</div>
```

#### Avatar and Icon Sizes

The size of the icons is automatically adjusted according to the size of the avatar.

| Size   | CSS Class        | Icon Size |
| ------ | ---------------- | --------- |
| xsmall | `Avatar--xsmall` | 16px      |
| small  | `Avatar--small`  | 20px      |
| medium | `Avatar--medium` | 24px      |
| large  | `Avatar--large`  | 28px      |
| xlarge | `Avatar--xlarge` | 32px      |

You can override the icon size by setting the `width` and `height` attributes on the SVG element,
or by using CSS custom properties as described in the [Icon component documentation][icon-documentation].

ℹ️ Don't forget to add the `aria-label` attribute for accessible title.

### Image

Add an image, it will be resized to fit the avatar.

```html
<div class="Avatar Avatar--medium" aria-label="Profile of Jiří Bárta">
  <img src="https://picsum.photos/id/823/162/162" alt="Jiří Bárta" aria-hidden="true" />
</div>
```

ℹ️ Don't forget to add the `aria-label` attribute for accessible title.
The image should have an `alt` attribute set and can be aria-hidden, because the `aria-label`
attribute is set on the container.

### Text

It is possible to use text as the content of the `Avatar` component.
This is useful when you want to display the initials of a user. You need to
take care of the text length and case. The rest is handled by the component.

```html
<div class="Avatar Avatar--medium" aria-label="Profile of Jiří Bárta">
  <span aria-hidden="true">JB</span>
</div>
```

ℹ️ Don't forget to add the `aria-label` attribute for accessible title, especially when
using an abbreviation. The `aria-hidden` attribute is set on the text span, because the `aria-label`
attribute is set on the container and the abbreviation is not useful for screen readers.

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[icon-documentation]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Icon
