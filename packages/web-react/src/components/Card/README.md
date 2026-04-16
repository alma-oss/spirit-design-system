# Card

Card is a compact container for organizing and displaying content about a single topic.

Card is a versatile composition of a few subcomponents:

- [Card](#card-1)
  - [CardArtwork](#cardartwork)
  - [CardMedia](#cardmedia)
  - [CardLogo](#cardlogo)
  - [CardBody](#cardbody)
    - [CardTitle](#cardtitle)
    - [CardEyebrow](#cardeyebrow)
  - [CardFooter](#cardfooter)

Additionally, Card can be used with [CardLink](#making-the-whole-card-clickable) to create a clickable card.

## Card

Card is the main container of the composition.

```tsx
<Card>
  {/* CardArtwork or CardMedia */}
  {/* CardBody */}
  {/* CardFooter */}
</Card>
```

Regardless of the [layout](#card-layout), the Card subcomponents must be arranged in the following order:

1. [CardArtwork](#cardartwork) (optional) or CardMedia (optional) — first
2. [CardLogo](#cardlogo) (optional)
3. [CardBody](#cardbody)
4. [CardFooter](#cardfooter) (optional) – last

ℹ️ Every `<div>` counts, especially on large pages. During the development of the Card component, we did our best to
balance between flexibility and simplicity. To provide the best performance, we decided to use the CSS grid layout with
predefined grid areas. This way, we can avoid unnecessary elements and keep the Card structure as flat as possible.

ℹ️ Vertical spacing between subcomponents is implemented using the `margin-bottom` property and the Card relies on
the specified order of its subcomponents. Since the Card uses the CSS grid layout with predefined grid areas, using the
`gap` property would lead to redundant spacing when dropping in just some of the subcomponents.

⚠️ **Arranging the subcomponents in a different order will break the spacing of the subcomponents and may also have
negative impact on accessibility of the Card.**

### Card Layout

Card can be displayed in a vertical, horizontal, or reversed horizontal layout.

```tsx
// Vertical card
<Card direction="vertical">
  {/* … */}
</Card>

// Horizontal card -->
<Card direction="horizontal">
  {/* … */}
</Card>

// Reversed horizontal card -->
<Card direction="horizontal-reversed">
  {/* … */}
</Card>
```

👉 Keep in mind that, no matter the layout, the Card subcomponents must be arranged in the order
[specified above](#card-1).

### Responsive Card Layout

Pass an object to props to set different values for different [breakpoints][dictionary-breakpoint]. The values will
be applied from mobile to desktop and if not set for a breakpoint, the value from the
previous breakpoint will be used.

```tsx
<Card direction={{ mobile: 'vertical', tablet: 'horizontal', desktop: 'horizontal-reversed' }}>{/* … */}</Card>
```

### Boxed Cards

Card can be displayed with a border and a box shadow on hover.

```tsx
<Card isBoxed>{/* … */}</Card>
```

### Vertical Alignment of the Content

Card content can be vertically aligned. This is particularly useful in horizontal Card layouts where content height
may vary.

To align Card content vertically, use the `alignmentY` prop:

- `top` — aligns content to the top
- `center` — centers content vertically
- `bottom` — aligns content to the bottom

```tsx
<Card direction="horizontal" alignmentY="center">
  {/* … */}
</Card>
```

#### Responsive Alignment

Pass an object to `alignmentY` to set different values for different [breakpoints][dictionary-breakpoint].

```tsx
<Card
  direction={{ mobile: 'vertical', tablet: 'horizontal' }}
  alignmentY={{ mobile: 'top', tablet: 'center', desktop: 'bottom' }}
>
  {/* … */}
</Card>
```

### API

| Name          | Type                                                                                       | Default    | Required | Description                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------ | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `alignmentY`  | \[[AlignmentY dictionary][dictionary-alignment] \| `Responsive<AlignmentYDictionaryType>`] | —          | ✕        | Vertical alignment of the content, use object to set responsive values, e.g. `{ mobile: 'top', tablet: 'center' }`                                                       |
| `direction`   | \[[DirectionExtended dictionary][dictionary-direction] \| `object`]                        | `vertical` | ✕        | Direction of the content inside Card component, use object to set responsive values, e.g. `{ mobile: 'horizontal', tablet: 'vertical', desktop: 'horizontal-reversed' }` |
| `elementType` | `ElementType`                                                                              | `article`  | ✕        | Type of element                                                                                                                                                          |
| `isBoxed`     | `bool`                                                                                     | `false`    | ✕        | Whether the Card have border                                                                                                                                             |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## CardArtwork

CardArtwork is an optional subcomponent that displays a small image or icon.

```tsx
<CardArtwork>
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#file" />
  </svg>
</CardArtwork>
```

### Artwork Alignment (Horizontal Layouts Only)

In the vertical Card layout, the artwork can be horizontally aligned to the start, center, or end of the Card.
Available alignment options are derived from the [AlignmentX][dictionary-alignment] dictionary.
To align the artwork, use `alignmentX` prop:

- `left` (default)
- `center`
- `right`

```tsx
<CardArtwork alignmentX="center">
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#file" />
  </svg>
</CardArtwork>
```

### API

| Name         | Type                                          | Default | Required | Description                  |
| ------------ | --------------------------------------------- | ------- | -------- | ---------------------------- |
| `alignmentX` | [AlignmentX dictionary][dictionary-alignment] | `left`  | ✕        | Alignment of artwork content |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## CardMedia

To display larger images or videos, use the CardMedia subcomponent.

```tsx
<CardMedia>
  <img src="https://via.placeholder.com/300x200" alt="" />
</CardMedia>
```

👉 Please note the empty `alt` attribute which means the image is purely decorative and does not convey any information.

👉 Please note that there is no link around or inside the CardMedia subcomponent. See the
[Linking the Media](#linking-the-media) section for more.

Or, for a video:

```tsx
<CardMedia>
  <video
    src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
    controls
    muted
    playsInline
  />
</CardMedia>
```

### Media Sizes

CardMedia can be displayed in different sizes. The available sizes are based on the [Size][dictionary-size] dictionary.
By default, the media uses the `auto` size option which means the media will be displayed in its original aspect ratio.
Other options set the media to a specific height (in the vertical Card layout) or width (in the horizontal Card layout).

In the vertical Card layout, the media is always expanded to the full width of the CardBody content. For boxed Cards,
the media can be even expanded [to the edges](#expanding-the-media) of the Card.

- `auto` (default)
- `small`
- `medium`
- `large`

For example:

```tsx
<CardMedia size="small">{/* … */}</CardMedia>
```

ℹ️ The Card automatically prevents the media from overflowing the Card container or even pushing the subsequent
CardBody content out of the Card. In such cases, the media will be cropped to fit the Card container.

### Expanding the Media

To expand the media to the full width or height of a boxed Card, use the `isExpanded` prop. This option is
available for both vertical and horizontal (including reversed horizontal) Card layouts.

```tsx
<Card>
  <CardMedia isExpanded>{/* … */}</CardMedia>
  <CardBody>{/* … */}</CardBody>
</Card>
```

Additionally, there is a `filledHeight` prop that expands the media to match the height of the CardBody
content. This option works with both boxed and non-boxed Card, but is only available in the horizontal Card layout.

```tsx
<Card direction="horizontal">
  <CardMedia hasFilledHeight>{/* … */}</CardMedia>
  <CardBody>{/* … */}</CardBody>
</Card>
```

ℹ️ Both options work with all media sizes.

🎉 Fun fact: The `isExpanded` and `hasFilledHeight` props produce the same result for non-boxed
horizontal (and reversed horizontal) Cards. But in all other contexts, the two props behave differently.

### Object Fit

You can control how the media content is resized to fit its container using the `fit` prop.
Available values are based on the CSS [object-fit][mdn-object-fit] property:

- `contain` — the media is scaled to maintain its aspect ratio while fitting within the container
- `cover` (default) — the media is sized to maintain its aspect ratio while filling the container (may be clipped)

```tsx
<CardMedia fit="contain">
  <img src="https://via.placeholder.com/300x200" alt="" />
</CardMedia>
```

For infographics and images with fixed aspect ratios that should not be cropped, use `fit="contain"`.

### Background Color

You can set the background color of the CardMedia container using the `backgroundColor` prop.

```tsx
<CardMedia backgroundColor="primary">
  <img src="https://via.placeholder.com/300x200" alt="" />
</CardMedia>
```

### API

| Name                   | Type                                                                                                                                                                                                   | Default | Required | Description                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- | ------------------------------------------------------------ |
| `backgroundColor`      | \[[Background Color dictionary][dictionary-color] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —       | ✕        | Background color of the CardMedia                            |
| `fit`                  | `contain` \| `cover`                                                                                                                                                                                   | `cover` | ✕        | How the media content should be resized to fit its container |
| `hasFilledHeightClass` | `bool`                                                                                                                                                                                                 | `false` | ✕        | Whether the image fill the height of a Card                  |
| `isExpanded`           | `bool`                                                                                                                                                                                                 | `false` | ✕        | Whether the media has space around                           |
| `size`                 | \[[Size dictionary][dictionary-size], `auto`]                                                                                                                                                          | `auto`  | ✕        | Size of the image media                                      |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## CardLogo

CardLogo is an optional subcomponent that displays a logo. To achieve the best visual result, use the PartnerLogo
subcomponent.

```tsx
<CardLogo>
  <PartnerLogo>
    <img src="…" alt="Product Name" />
  </PartnerLogo>
</CardLogo>
```

## CardBody

CardBody is the main content area of the Card.

```tsx
<CardBody>{/* … */}</CardBody>
```

### API

| Name           | Type   | Default | Required | Description                    |
| -------------- | ------ | ------- | -------- | ------------------------------ |
| `isSelectable` | `bool` | `false` | ✕        | Whether the text is selectable |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### CardTitle

CardTitle displays the main title of the Card. It uses the `<h4>` heading element by default, but you can use any other
heading level that fits your document outline.

```tsx
<CardTitle>
  <a href="#">Card Title</a>
</CardTitle>
```

The CardTitle is emphasized by default. To deemphasize it, simply set the `isHeading` prop to false:

```tsx
<CardTitle isHeading={false}>
  <a href="#">Card Title</a>
</CardTitle>
```

👉 See below how to extend the link in CardTitle to [make the whole card clickable](#making-the-whole-card-clickable).

### API

| Name          | Type          | Default | Required | Description                                |
| ------------- | ------------- | ------- | -------- | ------------------------------------------ |
| `elementType` | `ElementType` | `h4`    | ✕        | Type of element                            |
| `isHeading`   | `bool`        | `true`  | ✕        | Whether the title is rendered as a heading |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

#### Using Heading or Text as the Card Title

You can use the [Heading][heading] or [Text][text] components instead of CardTitle when you want more control over
typography or semantics. CardTitle is a convenience wrapper that provides:

- Default primary text color
- Bottom margin to separate the title from following content (`space-500`)
- Optional heading-style emphasis (heading typography when `isHeading` is true, body typography when false)

When using Heading or Text, you keep typography and semantics from those primitives and handle the card-specific
styling yourself: set `textColor="primary"` and `marginBottom="space-500"` so the title matches Card’s visual rhythm.

**Heading as title (heading-style):**

```tsx
<CardBody>
  <Heading elementType="h4" size="xsmall" emphasis="semibold" textColor="primary" marginBottom="space-500">
    <CardLink href="#">Card title</CardLink>
  </Heading>
  <p>Card content</p>
</CardBody>
```

**Text as title (body-style):**

```tsx
<CardBody>
  <Text elementType="h4" size="large" emphasis="regular" textColor="primary" marginBottom="space-500">
    <CardLink href="#">Card title</CardLink>
  </Text>
  <p>Card content</p>
</CardBody>
```

ℹ️ The `marginBottom` is needed only when the Heading or Text is followed by other content.

👉 See below how to [make the whole card clickable](#making-the-whole-card-clickable) with CardLink; the same pattern
applies whether the title wrapper is CardTitle, Heading, or Text.

### CardEyebrow

CardEyebrow is an optional subcomponent that accompanies the CardTitle.

```tsx
<CardEyebrow>Content options</CardEyebrow>
<CardTitle>Card Title</CardTitle>
```

## CardFooter

Use CardFooter for actions or any other content at the bottom of the Card. When using Cards with CardFooter in a Grid,
the CardFooters will automatically line up.

```tsx
<CardFooter>{/* … */}</CardFooter>
```

### Footer Alignment

The footer can be horizontally aligned to the start, center, or end of the Card. To align the footer, use one of the
following `alignmentX` prop values:

- `left` (default)
- `center`
- `right`

### API

| Name         | Type                                          | Default | Required | Description                 |
| ------------ | --------------------------------------------- | ------- | -------- | --------------------------- |
| `alignmentX` | [AlignmentX dictionary][dictionary-alignment] | `left`  | ✕        | Alignment of footer content |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Card Grid

In a typical use case, you will display multiple Cards in a [Grid][grid].

```tsx
<Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
  <Card>{/* … */}</Card>
  <Card>{/* … */}</Card>
  <Card>{/* … */}</Card>
</Grid>
```

Depending on your situation, you may want to use the list semantics. And it will work!

```tsx
<Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} elementType="ul">
  <Card elementType="li">{/* … */}</Card>
  <Card elementType="li">{/* … */}</Card>
  <Card elementType="li">{/* … */}</Card>
</Grid>
```

## Card Article

Card Article is not a standalone component, but a suggested composition of Card subcomponents designed
for article preview use cases.

```tsx
<Grid cols={{ mobile: 1, tablet: 2 }}>
  <Card direction="horizontal" alignmentY="center">
    <CardMedia size="medium" isExpanded>
      <img src="article-image.jpg" alt="" />
    </CardMedia>
    <CardBody>
      <Stack spacing="space-400">
        <CardEyebrow>Eyebrow</CardEyebrow>
        <CardTitle>
          <CardLink href="/article-123">Article Title</CardLink>
        </CardTitle>
        <Truncate limit={3}>Article excerpt…</Truncate>
        <div class="link-primary">Read more</div>
      </Stack>
    </CardBody>
  </Card>
</Grid>
```

## Best Practices

### Making the Whole Card Clickable

To make the whole Card clickable, use the provided CardLink subcomponent. For best accessibility, you would typically
wrap your CardTitle text in the CardLink component:

```tsx
<CardTitle>
  <CardLink href="#">Card title</CardLink>
</CardTitle>
```

This establishes a [clickable overlay][hugo-giraudel-card] over the whole Card, making it easier for users to interact
with the Card.

ℹ️ Don't worry, any interactive elements inside the Card (like links or buttons) will still work as expected.

If you need the text content of your CardBody remains [selectable and copyable][heydon-pickering-card], you can use the `isSelectable` prop on CardBody component:

```tsx
<CardBody isSelectable>
  <CardTitle>
    <CardLink href="#">Card title</CardLink>
  </CardTitle>
<CardBody>
```

### API

| Name          | Type          | Default | Required | Description     |
| ------------- | ------------- | ------- | -------- | --------------- |
| `elementType` | `ElementType` | `a`     | ✕        | Type of element |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### Linking the Media

In most cases, using just a single link in the CardTitle and
[making the whole card clickable](#making-the-whole-card-clickable) is the best approach in terms of accessibility.
The Card will have a single accessible link which will be announced by screen readers.

However, if you cannot use the CardLink subcomponent, and you still need to make the media clickable, you can wrap the
CardMedia image in a link:

```tsx
<CardMedia>
  <Link href="#" aria-hidden="true">
    <img src="https://via.placeholder.com/300x200" alt="" />
  </Link>
</CardMedia>
```

👉 Please note that the `aria-hidden="true"` attribute is used to hide the link from screen readers so the user is not
confused by too many links in the Card.

### The “Read More” Use Case

For article previews or similar use cases, you may want to display a limited amount of text content with a “Read More”
link. For optimum accessibility, you should only provide this in the form of a text node, not a button or a link:

```tsx
<CardBody>
  <CardTitle>
    <CardLink href="#">Card title</CardLink>
  </CardTitle>
  <p>{/* … */}</p>
  {/* DON'T DO THIS */}
  <Link href="#" underlined="always">
    Read more
  </Link>
  {/* This is correct */}
  <div class="link-primary link-underlined">Read more</div>
</CardBody>
```

This way, the Card will only have a single accessible link which will be announced by screen readers.

## Full Example

When you put it all together:

```tsx
<Card isBoxed>
  <CardMedia>
    <img src="…" alt="" />
  </CardMedia>
  <CardLogo>
    <PartnerLogo>
      <img src="…" alt="Logo" />
    </PartnerLogo>
  </CardLogo>
  <CardBody>
    <CardEyebrow>Content options</CardEyebrow>
    <CardTitle>
      <CardLink href="#">Card Title</CardLink>
    </CardTitle>
    <p>Card content</p>
  </CardBody>
  <CardFooter>
    <ButtonLink>Primary</ButtonLink>
    <ButtonLink>Secondary</ButtonLink>
  </CardFooter>
</Card>
```

ℹ️ A big shout-out to [Ondřej Pohl][ondrej-pohl] for sharing many of these best practices!

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[dictionary-direction]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#direction
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#intensity
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[heading]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Heading/README.md
[heydon-pickering-card]: https://inclusive-components.design/cards/
[hugo-giraudel-card]: https://kittygiraudel.com/2022/04/02/accessible-cards/
[mdn-object-fit]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
[ondrej-pohl]: https://linkedin.com/in/ondrejpohl
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#api-generated-types
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Text/README.md
