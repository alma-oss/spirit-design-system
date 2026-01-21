# Timeline

Timeline displays a series of events in chronological order. It supports multiple marker types and flexible content layouts.

Timeline is a composition of several subcomponents:

- [Timeline](#timeline-1) – The main container
  - [TimelineStep](#timelinestep) – Individual timeline entry
    - [TimelineMarker](#timelinemarker) – Container for the visual marker
    - [TimelineHeading](#timelineheading) – Optional heading section
    - [TimelineContent](#timelinecontent) – Optional main content wrapper

## Timeline

Timeline is the main container of the composition.

```jsx
import { Timeline } from '@alma-oss/spirit-web-react';

<Timeline>{/* TimelineStep content */}</Timeline>;
```

ℹ️ By default, Timeline uses the `<ol>` element for semantic ordered lists.
You can change it to `<ul>` for unordered timelines using the `elementType` prop.

### Size

The `size` prop controls the size of all markers within the timeline. This applies to all marker types: number markers, dot markers, and icon markers.
The `size` affects both the marker container dimensions and the marker content.

The default size is `small`, so you can omit the prop if you want to use the default size.

```jsx
<Timeline size="medium">
  {/* TimelineStep content */}
</Timeline>

<Timeline size="large">
  {/* TimelineStep content */}
</Timeline>
```

You can set different marker sizes for different [breakpoints][dictionary-breakpoint] using a responsive object:

```jsx
<Timeline size={{ mobile: 'small', tablet: 'medium', desktop: 'large' }}>{/* TimelineStep content */}</Timeline>
```

The marker size is controlled via CSS custom properties that are inherited by all TimelineMarker components within the timeline.

The size configuration affects:

- **Number markers**: Marker container size and typography
- **Dot markers**: Marker container size and dot size
- **Icon markers**: Marker container and Icon size

### API

| Name          | Type                                                                                                                                    | Default | Required | Description                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                                                                                                                             | —       | ✓        | Timeline content                                                                    |
| `elementType` | `ElementType`                                                                                                                           | `ol`    | ✕        | HTML tag to render                                                                  |
| `size`        | \[[SizesDictionaryType][readme-generated-types] \| [Responsive][readme-generated-types]<[SizesDictionaryType][readme-generated-types]>] | `small` | ✕        | The size of all markers in the timeline. Can be a single size or responsive object. |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## TimelineStep

Individual timeline entry that contains a marker and optional content areas.

```jsx
<TimelineStep>
  {/* TimelineMarker */}
  {/* TimelineHeading */}
  {/* TimelineContent */}
</TimelineStep>
```

ℹ️ TimelineStep uses the `<li>` element and should be a direct child of the Timeline container.
The TimelineHeading and TimelineContent are optional, but at least one content element should be present.

### API

| Name          | Type          | Default | Required | Description                             |
| ------------- | ------------- | ------- | -------- | --------------------------------------- |
| `children`    | `ReactNode`   | —       | ✓        | Step content (marker, heading, content) |
| `elementType` | `ElementType` | `li`    | ✕        | HTML tag to render                      |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## TimelineMarker

Container for the visual marker (number, dot, or icon). Supports multiple marker types:

```jsx
<TimelineMarker>1</TimelineMarker>
```

The marker includes `aria-hidden="true"` as its content is decorative and already conveyed by the parent `<ol>` structure.

### Marker Variants

#### Number Markers

Currently, the TimelineMarker visually supports only numbers up to 99 (two digits).

```jsx
<TimelineMarker variant="number">1</TimelineMarker>
```

#### Dot Markers

Dot markers are purely visual and do not accept children.

```jsx
<TimelineMarker variant="dot" />
```

#### Icon Markers

```jsx
<TimelineMarker variant="icon">
  <Icon name="search" />
</TimelineMarker>
```

### Color Variants

TimelineMarker supports design token-based color props for consistent theming across background, border, and text. Background and border color props are only applied when using `variant="number"` or `variant="dot"`, while text color can be used with any marker type. Use the available color values to customize the marker's appearance.

```jsx
<TimelineMarker
  backgroundColor="accent-01-subtle"
  borderColor="accent-01-basic"
  textColor="accent-01-basic"
>
  2
</TimelineMarker>

<TimelineMarker
  variant="dot"
  backgroundColor="accent-01-subtle"
  borderColor="accent-01-basic"
  textColor="accent-01-basic"
/>;
```

ℹ️ When using icons as markers, `backgroundColor` and `borderColor` props are ignored, but `textColor` can still be used for any text content. Icon color can also be controlled by the Icon component's `color` prop.

```jsx
<TimelineMarker variant="icon">
  <Icon name="search" color="01" />
</TimelineMarker>

<TimelineMarker variant="icon" textColor="accent-01-basic">
  <Icon name="search" />
</TimelineMarker>
```

### API

| Name              | Type                                                                                                                                                                                                   | Default  | Required | Description                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | -------- | -------------------------------------------------------------------------- |
| `backgroundColor` | \[[Background Color dictionary][dictionary-color] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —        | ✕        | Background color of the marker (only applied with `number`/`dot` variants) |
| `borderColor`     | \[[Border Color dictionary][dictionary-border] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]]    | —        | ✕        | Border color of the marker (only applied with `number`/`dot` variants)     |
| `children`        | `ReactNode`                                                                                                                                                                                            | —        | ✕        | Marker content (ignored when `variant="dot"`)                              |
| `textColor`       | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]]    | —        | ✕        | Text color of the marker (applies to all marker types)                     |
| `variant`         | \[`number` \| `dot` \| `icon`]                                                                                                                                                                         | `number` | ✕        | Marker variant type                                                        |

ℹ️ The marker size is controlled by the `size` prop on the parent `Timeline` component. The icon or text inside the marker automatically adjusts proportionally with the marker size.

All color props accept values from the [Color dictionary][dictionary-color] and [generated types][readme-generated-types] for accent and emotion colors. Background and border color props are only applied when `variant` is set to `number` or `dot`, while `textColor` works with all marker types. For icon markers, use the Icon component's `color` prop for the icon itself.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## TimelineHeading

Optional heading section for the timeline item.

```jsx
<TimelineHeading>
  <Heading elementType="h3" size="small" emphasis="semibold">
    Step Title
  </Heading>
</TimelineHeading>
```

**Timeline Heading with Link**

```jsx
<TimelineHeading>
  <Heading elementType="h3" size="small" emphasis="semibold">
    <Link href="#">Step Title</Link>
  </Heading>
</TimelineHeading>
```

### API

| Name       | Type        | Default | Required | Description     |
| ---------- | ----------- | ------- | -------- | --------------- |
| `children` | `ReactNode` | —       | ✓        | Heading content |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## TimelineContent

Optional main content wrapper for text, buttons, and other elements.

```jsx
<TimelineContent>
  <Text textColor="secondary" marginBottom="space-800">
    Step description content goes here.
  </Text>
  <Button color="secondary" size="large">
    Learn More
  </Button>
</TimelineContent>
```

### API

| Name       | Type        | Default | Required | Description      |
| ---------- | ----------- | ------- | -------- | ---------------- |
| `children` | `ReactNode` | —       | ✓        | Content elements |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Basic Usage

```jsx
import {
  Heading,
  Text,
  Timeline,
  TimelineContent,
  TimelineHeading,
  TimelineMarker,
  TimelineStep,
} from '@alma-oss/spirit-web-react';

<Timeline>
  <TimelineStep>
    <TimelineMarker>1</TimelineMarker>
    <TimelineHeading>
      <Heading elementType="h3" size="small" emphasis="semibold">
        Step Title
      </Heading>
    </TimelineHeading>
    <TimelineContent>
      <Text textColor="secondary">Step description content goes here.</Text>
    </TimelineContent>
  </TimelineStep>
  <TimelineStep>
    <TimelineMarker>2</TimelineMarker>
    <TimelineContent>
      <Text textColor="secondary">Content without heading.</Text>
    </TimelineContent>
  </TimelineStep>
</Timeline>;
```

## Implementation Notes

The Timeline component uses CSS Grid layout to achieve proper alignment between markers and content. The grid-based approach ensures consistent spacing and alignment regardless of content length or marker type.

Connector lines between timeline items are created using CSS pseudo-elements (::after) for a clean, maintainable implementation without additional DOM elements.

When using the Timeline without headings, the TimelineContent automatically adjusts its grid placement to span both rows and adds appropriate padding to ensure proper alignment with the TimelineMarker.

[dictionary-border]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#border
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
