# Timeline

Timeline displays a series of events in chronological order. It supports multiple marker types and flexible content layouts.

Timeline is a composition of several subcomponents:

- [Timeline](#timeline) – The main container
  - [TimelineStep](#TimelineStep) – Individual timeline entry
    - [TimelineMarker](#timelinemarker) – Container for the visual marker
    - [TimelineHeading](#timelineheading) – Optional heading section
    - [TimelineContent](#timelinecontent) – Optional main content wrapper

## Timeline

This is the main container of the composition.

```html
<ol class="Timeline Timeline--small">
  <!-- TimelineStep -->
  <!-- TimelineStep -->
  <!-- TimelineStep -->
</ol>
```

ℹ️ By default, Timeline uses the `<ol>` element for semantic ordered lists.
You can change it to `<ul>` for unordered timelines, just make sure the whole Timeline
composition produces valid and semantic HTML output.

### Size

The `Timeline--<size>` class controls the size of all markers within the timeline. This applies to all marker types: number markers, dot markers, and icon markers.
The size affects both the marker container dimensions and the marker content.

```html
<ol class="Timeline Timeline--small">
  <!-- TimelineStep -->
</ol>

<ol class="Timeline Timeline--medium">
  <!-- TimelineStep -->
</ol>

<ol class="Timeline Timeline--large">
  <!-- TimelineStep -->
</ol>
```

You can set different marker sizes for different [breakpoints][dictionary-breakpoint] using `tablet` and `desktop` infixes, e.g. `Timeline--tablet--<size>` or `Timeline--desktop--<size>`.

```html
<ol class="Timeline Timeline--small Timeline--tablet--medium Timeline--desktop--large">
  <!-- TimelineStep -->
</ol>
```

The size configuration affects:

- **Number markers**: Marker container size and typography
- **Dot markers**: Marker container size and dot size
- **Icon markers**: Marker container and Icon size

## TimelineStep

Individual timeline entry that contains a marker and optional content areas.

```html
<li class="TimelineStep">
  <!-- TimelineMarker -->
  <!-- TimelineHeading -->
  <!-- TimelineContent -->
</li>
```

ℹ️ TimelineStep uses the `<li>` element and should be a direct child of the Timeline container.
The TimelineHeading and TimelineContent are optional, but at least one content element should be present.

## TimelineMarker

Container for the visual marker (number, dot, or icon). Supports multiple marker types:

### Number Markers

Add `TimelineMarker--number` modifier and number.

ℹ️ The `aria-hidden="true"` attribute is used on the marker because its number is already conveyed by the parent `<ol>`, making it redundant for assistive technologies. This ensures screen readers do not announce the marker number twice.

```html
<div aria-hidden="true" class="TimelineMarker TimelineMarker--number">1</div>
```

### Colored Number Markers

You can customize the appearance with color utility classes `border-<color>`, `bg-<color>`, `text-<color>`.

```html
<div
  aria-hidden="true"
  class="TimelineMarker TimelineMarker--number text-accent-01-basic bg-accent-01-subtle border-accent-01-basic"
>
  2
</div>
```

### Dot Markers

Add `TimelineMarker--dot` modifier to make marker dot.

```html
<div aria-hidden="true" class="TimelineMarker TimelineMarker--dot"></div>
```

### Colored Dot Markers

You can customize the appearance with color utility classes `border-<color>`, `bg-<color>`, `text-<color>`.

```html
<div
  aria-hidden="true"
  class="TimelineMarker TimelineMarker--dot text-accent-01-basic border-accent-01-basic bg-accent-01-subtle"
></div>
```

### Icon Markers

Add `TimelineMarker--icon` modifier to control the size of marker icon.

```html
<div aria-hidden="true" class="TimelineMarker TimelineMarker--icon">
  <svg class="Icon Icon--secondary" width="24" height="24">
    <use xlink:href="/assets/icons/svg/sprite.svg#search"></use>
  </svg>
</div>
```

## TimelineHeading

Optional heading section for the timeline item.
The heading title can be plain text or a link.

```html
<div class="TimelineHeading">
  <h3 class="typography-heading-small-bold">Step Title</h3>
</div>
```

```html
<div class="TimelineHeading">
  <h3 class="typography-heading-small-bold">
    <a href="#" class="link-primary">Step Title</a>
  </h3>
</div>
```

## TimelineContent

Optional main content wrapper for text, buttons, and other elements.

```html
<div class="TimelineContent">
  <p class="text-secondary">Step description content goes here.</p>
</div>
```

## Full Composition

```html
<ol class="Timeline Timeline--small">
  <li class="TimelineStep">
    <div aria-hidden="true" class="TimelineMarker TimelineMarker--number">1</div>
    <div class="TimelineHeading">
      <h3 class="typography-heading-small-bold">Title</h3>
    </div>
    <div class="TimelineContent">
      <p class="text-secondary">Step description content goes here.</p>
    </div>
  </li>
  <li class="TimelineStep">
    <div aria-hidden="true" class="TimelineMarker TimelineMarker--number">2</div>
    <div class="TimelineContent">
      <p class="text-secondary">Content without heading. The marker automatically aligns with content start.</p>
    </div>
  </li>
  <li class="TimelineStep">
    <div aria-hidden="true" class="TimelineMarker TimelineMarker--number">3</div>
    <div class="TimelineHeading">
      <h3 class="typography-heading-small-bold">Title</h3>
    </div>
    <div class="TimelineContent">
      <p class="text-secondary mb-800">Step with additional content.</p>
      <a href="#" class="Button Button--secondary Button--large">Button secondary</a>
    </div>
  </li>
  <li class="TimelineStep">
    <div aria-hidden="true" class="TimelineMarker TimelineMarker--number">99</div>
    <div class="TimelineHeading">
      <h3 class="typography-heading-small-bold">Heading only item</h3>
    </div>
  </li>
</ol>
```

## Implementation Notes

The Timeline component uses [CSS Grid layout][mdn-grid] to achieve proper alignment between markers and content. The grid-based approach ensures consistent spacing and alignment regardless of content length or marker type.

Connector lines between timeline items are created using CSS pseudo-elements (::after) for a clean, maintainable implementation without additional DOM elements. The connector appears in the second row of the marker column and is hidden for the last timeline item.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
