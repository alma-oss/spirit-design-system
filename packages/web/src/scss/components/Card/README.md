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

See [Accessibility](#accessibility) for the article, footer, and heading rules.

## Card or Box

Use Card for a block about one topic that is composed of Card subcomponents — a body, plus any of artwork, media,
logo, or footer — or for a block the user activates as a whole through a
[CardLink](#making-the-whole-card-clickable).

Use [Box][box] for a surface that only needs padding, border, background, shadow, or a color scheme. A settings panel
with none of that composition and no card-wide link is a Box, including when a design file labels the panel a card.

A [boxed Card](#boxed-cards) looks like a panel, but it is still a Card, with the card grid and an `<article>`.

## Card

Card is the main container of the composition.

```html
<article class="Card Card--vertical">
  <!-- CardArtwork or CardMedia (optional) -->
  <!-- CardBody (required) -->
  <!-- CardFooter (optional) -->
</article>
```

Regardless of the [layout](#card-layout), the Card subcomponents must be arranged in the following order:

1. [CardArtwork](#cardartwork) (optional) or CardMedia (optional) — first
2. [CardLogo](#cardlogo) (optional)
3. [CardBody](#cardbody) (required)
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

```html
<!-- Vertical card -->
<article class="Card Card--vertical">
  <!-- … -->
</article>

<!-- Horizontal card -->
<article class="Card Card--horizontal">
  <!-- … -->
</article>

<!-- Reversed horizontal card -->
<article class="Card Card--horizontalReversed">
  <!-- … -->
</article>
```

👉 Keep in mind that, no matter the layout, the Card subcomponents must be arranged in the order
[specified above](#card-1).

### Responsive Card Layout

Card layout can be adjusted based on the [breakpoint][dictionary-breakpoint]. To create a responsive layout, use the `tablet` and `desktop`
infixes, e.g. `Card--tablet--horizontal` or `Card--desktop--vertical`.

```html
<article class="Card Card--vertical Card--tablet--horizontal Card--desktop--horizontalReversed">
  <!-- … -->
</article>
```

### Boxed Cards

Card can be displayed with a border and a background. When the card contains a
[CardLink](#making-the-whole-card-clickable), it also gets a box shadow on hover.

```html
<article class="Card Card--vertical Card--boxed">
  <!-- … -->
</article>
```

### Vertical Alignment of the Content

Card content can be vertically aligned. This is particularly useful in horizontal Card layouts where content height
may vary.

To align Card content vertically, use one of the following CSS modifiers:

- `Card--alignmentYTop` — aligns content to the top
- `Card--alignmentYCenter` — centers content vertically
- `Card--alignmentYBottom` — aligns content to the bottom

```html
<article class="Card Card--horizontal Card--alignmentYCenter">
  <!-- … -->
</article>
```

#### Responsive Alignment

Card alignment can be adjusted based on the [breakpoint][dictionary-breakpoint]. To create a responsive alignment,
use the `tablet` and `desktop` infixes, e.g. `Card--tablet--alignmentYCenter` or `Card--desktop--alignmentYBottom`.

```html
<article
  class="Card Card--vertical Card--tablet--horizontal Card--tablet--alignmentYCenter Card--desktop--alignmentYBottom"
>
  <!-- … -->
</article>
```

## CardArtwork

CardArtwork is an optional subcomponent that displays a small image or icon.

```html
<div class="CardArtwork CardArtwork--alignmentXLeft">
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use href="/assets/icons/svg/sprite.svg#file" />
  </svg>
</div>
```

### Artwork Alignment (Vertical Layout Only)

In the vertical Card layout, the artwork can be horizontally aligned to the start, center, or end of the Card.
Available alignment options are derived from the [AlignmentX][dictionary-alignment] dictionary.
To align the artwork, use one of the following CSS modifiers:

- `CardArtwork--alignmentXLeft`
- `CardArtwork--alignmentXCenter`
- `CardArtwork--alignmentXRight`

ℹ️ In a horizontal layout the media column is only as wide as the artwork, so the alignment has no visible effect.

## CardMedia

To display larger images or videos, use the CardMedia subcomponent.

```html
<div class="CardMedia CardMedia--auto">
  <div class="CardMedia__canvas">
    <img src="https://via.placeholder.com/300x200" alt="" />
  </div>
</div>
```

👉 Please note the empty `alt` attribute which means the image is purely decorative and does not convey any information.

👉 Please note that there is no link around or inside the CardMedia subcomponent. See the
[Linking the Media](#linking-the-media) section for more.

Or, for a video:

```html
<div class="CardMedia CardMedia--auto">
  <div class="CardMedia__canvas">
    <video
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
      controls
      muted
      playsinline
    ></video>
  </div>
</div>
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

```html
<div class="CardMedia CardMedia--small">
  <!-- … -->
</div>
```

ℹ️ The Card automatically prevents the media from overflowing the Card container or even pushing the subsequent
CardBody content out of the Card. In such cases, the media will be cropped to fit the Card container.

### Expanding the Media

To expand the media to the full width or height of a boxed Card, use the `CardMedia--expanded` modifier. This option is
available for both vertical and horizontal (including reversed horizontal) Card layouts.

```html
<article class="Card Card--vertical">
  <div class="CardMedia CardMedia--auto CardMedia--expanded">
    <!-- … -->
  </div>
  <div class="CardBody">
    <!-- … -->
  </div>
</article>
```

Additionally, there is a `CardMedia--filledHeight` modifier that expands the media to match the height of the CardBody
content. This option works with both boxed and non-boxed Card, but is only available in the horizontal Card layout.

```html
<article class="Card Card--horizontal">
  <div class="CardMedia CardMedia--auto CardMedia--filledHeight">
    <!-- … -->
  </div>
  <div class="CardBody">
    <!-- … -->
  </div>
</article>
```

ℹ️ Both options work with all media sizes.

🎉 Fun fact: The `.CardMedia--expanded` and `.CardMedia--filledHeight` modifiers produce the same result for non-boxed
horizontal (and reversed horizontal) Cards. But in all other contexts, the two modifiers behave differently.

### Object Fit

You can control how the media content is resized to fit its container using the `--spirit-card-media-object-fit` CSS custom property.
Available values are based on the CSS [object-fit][mdn-object-fit] property:

- `cover` (default) — the media is sized to maintain its aspect ratio while filling the container (may be clipped)
- `contain` — the media is scaled to maintain its aspect ratio while fitting within the container

```html
<div class="CardMedia CardMedia--auto" style="--spirit-card-media-object-fit: contain;">
  <div class="CardMedia__canvas">
    <img src="https://via.placeholder.com/300x200" alt="" />
  </div>
</div>
```

For infographics and images with fixed aspect ratios that should not be cropped, use `--spirit-card-media-object-fit: contain;`.

### Background Color

You can set the background color of the CardMedia container using [background color utility classes][dictionary-color].

```html
<div class="CardMedia CardMedia--auto bg-primary">
  <div class="CardMedia__canvas">
    <img src="https://via.placeholder.com/300x200" alt="" />
  </div>
</div>
```

## CardLogo

CardLogo is an optional subcomponent that displays a logo. To achieve the best visual result, use the PartnerLogo
subcomponent.

```html
<div class="CardLogo">
  <div class="PartnerLogo PartnerLogo--medium PartnerLogo--safeArea">
    <img src="…" alt="Product Name" />
  </div>
</div>
```

## CardBody

CardBody is required for any card that has text or other main content. It is the main content area of the Card, and
the only subcomponent placed in the `body` area of the card grid.

The grid areas are fixed: `media`, `body`, `footer`, and `logo` in horizontal layouts. Spacing between them comes
from `margin-bottom` on these subcomponents. CardBody fills the flexible `body` track and inserts the gap before
whatever follows it.

Content placed directly in Card has no grid area, so the grid puts it in the first free cell. With no artwork or
media, that cell is `media`: a full-width row in a vertical card, and a column sized to the content in a horizontal
card, which leaves the rest of the card empty. When artwork or media already fills `media`, a horizontal card places
that content in the `logo` row. In a vertical card it lands in the `body` row, but without the CardBody margin, so
the gap before the footer is missing.

The one composition that skips CardBody is a card made of only [CardArtwork](#cardartwork) or only
[CardMedia](#cardmedia).

```html
<div class="CardBody">
  <!-- … -->
</div>
```

To make the CardBody selectable and copyable, use the `CardBody--selectable` modifier:

```html
<div class="CardBody CardBody--selectable">
  <p><!-- … --></p>
  <ul>
    <!-- … -->
  </ul>
  <ol>
    <!-- … -->
  </ol>
  <dl><!-- … --></dl>
</div>
```

ℹ️ We are white-listing the selectable and copyable elements, so this option only affects lists and paragraphs.

### CardTitle

CardTitle displays the main title of the Card. It uses the `<h4>` heading element by default, but you can use any other
heading level that fits your document outline.

```html
<h4 class="CardTitle">
  <a href="#">Card Title</a>
</h4>
```

To emphasize the CardTitle, you can use the `CardTitle--heading` modifier:

```html
<h4 class="CardTitle CardTitle--heading">
  <a href="#">Card Title</a>
</h4>
```

👉 See below how to extend the link in CardTitle to [make the whole card clickable](#making-the-whole-card-clickable).

#### Using Heading or Text Helpers Instead of CardTitle

You can use typography and color utility classes instead of the `CardTitle` class when you want more control over
the title’s typography. CardTitle provides:

- Default primary text color
- Bottom margin to separate the title from following content (Card uses the `space-500` token)
- Optional heading-style emphasis (heading typography with `CardTitle--heading`, or body typography without it)

When using heading/text helpers, you need to apply the text color and bottom margin explicitly
to match Card’s visual rhythm.

**Heading-style title (matches `CardTitle--heading`):**

```html
<h4 class="typography-heading-xsmall-semibold text-primary mb-500">
  <a href="#" class="CardLink">Card title</a>
</h4>
```

**Body-style title (matches `CardTitle` without the heading modifier):**

```html
<h4 class="typography-body-large-regular text-primary mb-500">
  <a href="#" class="CardLink">Card title</a>
</h4>
```

ℹ️ The margin bottom is needed only when the heading/text is followed by other content.

👉 See below how to [make the whole card clickable](#making-the-whole-card-clickable); the same CardLink pattern
applies whether the title uses `CardTitle` or the helper classes above.

### CardEyebrow

CardEyebrow is an optional subcomponent that accompanies the CardTitle.

```html
<div class="CardEyebrow">Content options</div>
<h4 class="CardTitle">Card Title</h4>
```

## CardFooter

Use CardFooter for actions or any other content at the bottom of the Card. When using Cards with CardFooter in a Grid,
the CardFooters will automatically line up.

```html
<footer class="CardFooter">
  <!-- … -->
</footer>
```

### Footer Alignment

The footer can be horizontally aligned to the start, center, or end of the Card. To align the footer, use one of the
following CSS modifiers:

- `CardFooter--alignmentXLeft`
- `CardFooter--alignmentXCenter`
- `CardFooter--alignmentXRight`

### Footer Divider

Use the `CardFooterDivider` element together with the `CardFooter--hasDivider` modifier to render a full-width
divider line above the footer. The divider spans the entire width of the card (including padding areas in boxed
cards) and the modifier adds spacing between the divider and the footer content.

Place `CardFooterDivider` immediately before the `<footer>` element as a direct child of `Card`:

```html
<article class="Card Card--vertical Card--boxed">
  <!-- CardBody, CardMedia, etc. -->
  <div class="CardFooterDivider" aria-hidden="true"></div>
  <footer class="CardFooter CardFooter--hasDivider CardFooter--alignmentXLeft">
    <!-- … -->
  </footer>
</article>
```

## Card Grid

In a typical use case, you will display multiple Cards in a [Grid][grid].

```html
<div class="Grid Grid--cols-1 Grid--tablet--cols-2 Grid--desktop--cols-3">
  <article class="Card Card--vertical">
    <!-- … -->
  </article>
  <article class="Card Card--vertical">
    <!-- … -->
  </article>
  <article class="Card Card--vertical">
    <!-- … -->
  </article>
</div>
```

Depending on your situation, you may want to use the list semantics. And it will work!

```html
<ul class="Grid Grid--cols-1 Grid--tablet--cols-2 Grid--desktop--cols-3">
  <li class="Card Card--vertical">
    <!-- … -->
  </li>
  <li class="Card Card--vertical">
    <!-- … -->
  </li>
  <li class="Card Card--vertical">
    <!-- … -->
  </li>
</ul>
```

ℹ️ A card rendered as `li` is a list item. A [CardFooter](#cardfooter) inside it belongs to the nearest sectioning
ancestor outside that item. When the card has a footer, put the `<article>` card inside the `<li>`. See
[Accessibility](#accessibility).

## Card Article

Card Article is not a standalone component, but a suggested composition of Card subcomponents designed
for article preview use cases.

```html
<div class="Grid Grid--cols-1 Grid--tablet--cols-2">
  <article class="Card Card--horizontal Card--alignmentYCenter">
    <div class="CardMedia CardMedia--medium CardMedia--expanded">
      <div class="CardMedia__canvas">
        <img src="article-image.jpg" alt="" />
      </div>
    </div>
    <div class="CardBody">
      <div class="CardEyebrow">Eyebrow</div>
      <h4 class="CardTitle CardTitle--heading">
        <a href="/article-123" class="CardLink">Article Title</a>
      </h4>
      <p class="text-truncate-multiline">Article excerpt…</p>
      <div class="link-primary">Read more</div>
    </div>
  </article>
</div>
```

## Best Practices

### Making the Whole Card Clickable

To make the whole Card clickable, use the provided CardLink subcomponent. For best accessibility, you would typically
wrap your CardTitle text in the CardLink component:

```html
<h4 class="CardTitle">
  <a href="#" class="CardLink">Card title</a>
</h4>
```

This establishes a [clickable overlay][hugo-giraudel-card] over the whole Card, making it easier for users to interact
with the Card.

ℹ️ Don't worry, any interactive elements inside the Card (like links or buttons) will still work as expected.

If you need the text content of your CardBody remains [selectable and copyable][heydon-pickering-card], you can use the
`CardBody--selectable` modifier:

```html
<div class="CardBody CardBody--selectable">
  <h4 class="CardTitle">
    <a href="#" class="CardLink">Card title</a>
  </h4>
  <p>Selectable card content</p>
</div>
```

### Linking the Media

In most cases, using just a single link in the CardTitle and
[making the whole card clickable](#making-the-whole-card-clickable) is the best approach in terms of accessibility.
The Card will have a single accessible link which will be announced by screen readers.

However, if you cannot use the CardLink subcomponent, and you still need to make the media clickable, you can wrap the
CardMedia image in a link:

```html
<div class="CardMedia CardMedia--auto">
  <div class="CardMedia__canvas">
    <a href="#" aria-hidden="true">
      <img src="https://via.placeholder.com/300x200" alt="" />
    </a>
  </div>
</div>
```

👉 Please note that the `aria-hidden="true"` attribute is used to hide the link from screen readers so the user is not
confused by too many links in the Card.

### The “Read More” Use Case

For article previews or similar use cases, you may want to display a limited amount of text content with a “Read More”
link. For optimum accessibility, you should only provide this in the form of a text node, not a button or a link:

```html
<div class="CardBody">
  <h4 class="CardTitle">
    <a href="#" class="CardLink">Card title</a>
  </h4>
  <p><!-- … --></p>
  <!-- DON'T DO THIS -->
  <a href="#" class="link-primary link-underlined">Read more</a>
  <!-- This is correct -->
  <div class="link-primary link-underlined">Read more</div>
</div>
```

This way, the Card will only have a single accessible link which will be announced by screen readers.

ℹ️ A big shout-out to [Ondřej Pohl][ondrej-pohl] for sharing many of these best practices!

## Accessibility

### Element Type

Write the card as an [`<article>`][mdn-article], as the examples do. An article is a self-contained composition
about one topic, which matches a Card. Prefer it to `div` or `li` for two reasons:

- It has the `article` role, so assistive technologies expose the card as one self-contained unit. A `div` has no
  role, and an `li` only says the card is an item in a list.
- It is a sectioning element, so a `<footer class="CardFooter">` inside it is the footer of the card. Neither `div`
  nor `li` is a sectioning element. See [Footer](#footer).

Use a different element when the card plays a different role in the page:

- `<section class="Card">` — the card is a thematic part of a larger page and has its own heading.
- `<li class="Card">` — the card is one item in a list and it has no footer. See [Card Grid](#card-grid). `li` is
  not a sectioning element, so a footer inside it belongs to an ancestor outside the card.
- `<div class="Card">` — the card must stay out of the document outline. For a plain surface, use [Box][box].

To combine a list with a footer, leave the card as an `<article>` and wrap it in the list item:

```html
<ul class="Grid Grid--cols-1 Grid--tablet--cols-2 Grid--desktop--cols-3">
  <li class="d-grid">
    <article class="Card Card--vertical">
      <!-- CardBody, CardFooter, … -->
    </article>
  </li>
</ul>
```

The `d-grid` class makes the list item a grid container, so the card fills the height of the list item and the
footers of cards in the same row line up.

### Footer

`CardFooter` is a `<footer>`. In HTML, a footer belongs to its nearest ancestor sectioning element (`article`,
`section`, `aside`, or `nav`). With no such ancestor, it belongs to the page `body`.

The `<article>` is that ancestor, so the footer is the footer of the card. A card rendered as `div` or `li` is not
a sectioning element, and the footer scopes to the next sectioning ancestor outside the card. When that ancestor is
`body` and the footer sits outside `main`, assistive technologies expose it as the `contentinfo` landmark, the page
footer.

Keep `article`, or another sectioning element, on any card that has a footer.

### Headings

CardTitle is an `<h4>` in the examples. Choose the heading level that continues the outline of the page. Under a
section heading `h2`, the card title is an `h3`. An `h4` skips a level when no `h3` sits between the section
heading and the card.

`article` and `section` are sectioning content and should contain a heading. Give every such card a heading at that
level.

The `CardTitle--heading` modifier changes the title typography only. The outline follows the element you write.
A title that should stay out of the outline needs a non-heading element, and the card itself should be a `div`.

For one link stretched over the card, a text-only “Read more”, and a media link hidden from assistive technologies,
see [Best Practices](#best-practices).

## Full Example

Artwork, body, and footer together. The horizontal layout gives [CardLogo](#cardlogo) its own grid area, next to
the artwork:

```html
<article class="Card Card--horizontal Card--boxed">
  <div class="CardArtwork CardArtwork--alignmentXLeft">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/assets/icons/svg/sprite.svg#file" />
    </svg>
  </div>
  <div class="CardLogo">
    <div class="PartnerLogo PartnerLogo--medium PartnerLogo--safeArea">
      <img src="…" alt="Logo" />
    </div>
  </div>
  <div class="CardBody">
    <div class="CardEyebrow">Content options</div>
    <h4 class="CardTitle CardTitle--heading">
      <a href="#" class="CardLink">Card Title</a>
    </h4>
    <p>Card content</p>
  </div>
  <div class="CardFooterDivider" aria-hidden="true"></div>
  <footer class="CardFooter CardFooter--hasDivider CardFooter--alignmentXLeft">
    <a href="#" class="Button Button--small Button--primary">Primary</a>
    <a href="#" class="Button Button--small Button--secondary">Secondary</a>
  </footer>
</article>
```

ℹ️ [CardMedia](#cardmedia) uses the same grid area as CardArtwork. Swap it in when the card leads with a larger image
or a video.

[box]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Box/README.md
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[heydon-pickering-card]: https://inclusive-components.design/cards/
[hugo-giraudel-card]: https://kittygiraudel.com/2022/04/02/accessible-cards/
[mdn-article]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article
[mdn-object-fit]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
[ondrej-pohl]: https://youtu.be/SdlgZFKxs40?feature=shared&t=1010
