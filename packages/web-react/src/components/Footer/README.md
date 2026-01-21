# Footer

The Footer is a highly variable composition. It comes in several ready-to-use design variants, but can be customized to
achieve your specific design goals.

## Composition

The Footer supports several ready-to-use building blocks:

- [Navigation Links](#navigation-links)
- [Product Logo](#product-logo)
- [Social Media Links](#social-media-links)
- [Language Switch](#language-switch)
- [Secondary Links](#secondary-links)
- [Text Alignment](#text-alignment)

This is how all supported building blocks of the Footer build up the complete composition:

```jsx
<Footer>
  <Container>
    {/* Grid with navigation links */}
    {/* Grid with product logo, social media links and language switch */}
    {/* Flex with secondary links */}
  </Container>
</Footer>
```

👉 Good to know:

- To achieve the desired design, you can use the provided building blocks in any order you need.
- All building blocks are optional, so you can use only the ones you need.
- You are not limited just to the provided building blocks. You can add your own content or building blocks (such as a
  newsletter subscription form) as needed.
- Use [Grid][grid] and [Flex][flex] components to create the desired layout.
- Use [Stack][stack] or [Divider][divider] components to organize individual sections.
- Use [style props][readme-style-props] to achieve desired spacings between components.

## Navigation Links

Navigation links are structured in sections with a headline and a [Stack][stack] of links.

👉 Please note how the `<nav>` element is paired with the `<Heading>` component (using the `aria-labelledby` attribute) to
provide a semantic connection between the headline and the navigation component. Just make sure the `id` attribute of
the `<Heading>` component matches the value of the `aria-labelledby` attribute of the `<nav>` element and all `id`s are unique.

```jsx
<nav aria-labelledby="footer-navigation-section">
  <Heading id="footer-navigation-section" elementType="h3" size="xsmall" emphasis="semibold" marginBottom="space-700">
    Section headline
  </Heading>
  <Stack elementType="ul" spacing="space-600" hasSpacing>
    <li>
      <Link href="https://www.example.com">Link</Link>
    </li>
    <li>
      <Link href="https://www.example.com">Link</Link>
    </li>
    <li>
      <Link href="https://www.example.com">Link</Link>
    </li>
  </Stack>
</nav>
```

You can use as many navigation sections like this as you need and wrap them in a responsive [Grid][grid] layout.

## Product Logo, Social Media Links and Language Switch

This section is optional and consists of a [Grid][grid] layout with up to three (also optional) columns:

```jsx
<Grid
  cols={{ mobile: 1, desktop: 3 }}
  alignmentX={{ mobile: 'center', desktop: 'stretch' }}
  alignmentY="center"
  spacing="space-1100"
>
  <div className="text-desktop-left">{/* Product logo */}</div>
  {/* Flex with social media links */}
  <div className="text-desktop-right">{/* Language switch */}</div>
</Grid>
```

👉 Please mind the `text-desktop-left` and `text-desktop-right` utility classes. They are used to align content of
individual grid columns to the left and right side of the container on desktop screens.

### Product Logo

Use the [Product Logo][product-logo] component to display the logo of your product.

### Social Media Links

Use the secondary [ButtonLink][buttonlink] component to create social media links inside a [Flex][flex] container.

```jsx
<Flex elementType="ul" alignmentX="center" alignmentY="center">
  {/* Repeat the `<li>` block for each social media link. */}
  <li>
    <ButtonLink size="medium" color="tertiary" isSymmetrical>
      <VisuallyHidden>Facebook</VisuallyHidden>
      <Icon name="logo-facebook" />
    </ButtonLink>
  </li>
<Flex>
```

### Language Switch

Use the [Select][select] component to create a language switch, or list the languages as country flags in a [Flex][flex]
layout.

## Secondary Links

This section is optional and consists of a [Flex][flex] layout with secondary links.

```jsx
<nav aria-label="Secondary links">
  <Flex
    elementType="ul"
    direction={{ mobile: 'column', tablet: 'row' }}
    alignmentX={{ mobile: 'stretch', tablet: 'center' }}
    spacing={{ mobile: 'space-600', tablet: 'space-900' }}
    isWrapping
  >
    {/* Repeat the `<li>` block for each secondary link. */}
    <li>
      <Link href="https://www.example.com" color="secondary">
        Legal notice
      </Link>
    </li>
  </Flex>
</nav>
```

👉 Please mind the `aria-label` attribute on the `<nav>` element to provide an accessible label for the navigation.

## Multiple Footers

When you have multiple distinct footers (e.g., product and corporate), you can use the `elementType` prop to structure them semantically. Each footer section should use `elementType="section"` or be a plain `<section>` element, and the entire footer should be wrapped in a `<footer>` HTML tag.

This pattern provides better HTML semantics and accessibility, as each section can have its own structure and styling:

```jsx
<footer>
  <Footer elementType="section">{/* Product footer */}</Footer>
  <section>{/* Corporate footer */}</section>
</footer>
```

👉 Good to know:

- The `<footer>` HTML tag provides semantic meaning and indicates the footer region of the page.
- Each `<Footer elementType="section">` creates a semantic `<section>` element, which helps with document structure and accessibility.
- Each section can have its own styling props (`backgroundColor`, `padding`, etc.) for visual separation.
- This pattern is especially useful when you need different background colors or spacing for different sections of the footer.

## Text Alignment

You can set the text alignment of the Footer using the `textAlignment` prop.

```jsx
<Footer textAlignment="center">
  {/* Footer content */}
</Footer>
<Footer textAlignment="right">
  {/* Footer content */}
</Footer>
```

You can also define responsive values for the `textAlignment` prop using an object:

```jsx
<Footer textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>{/* Footer content */}</Footer>
```

## Full Example

```jsx
<Footer>
  <Container>
    {/* Grid with navigation links */}
    <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
      {/* Repeat the `<nav>` block as many times as needed. */}
      <nav aria-labelledby="footer-navigation-section-1">
        <Heading
          id="footer-navigation-section-1"
          elementType="h3"
          size="xsmall"
          emphasis="semibold"
          marginBottom="space-700"
        >
          Section headline
        </Heading>
        <Stack elementType="ul" spacing="space-600" hasSpacing>
          <li>
            <Link href="https://www.example.com">Link</Link>
          </li>
          <li>
            <Link href="https://www.example.com">Link</Link>
          </li>
          <li>
            <Link href="https://www.example.com">Link</Link>
          </li>
        </Stack>
      </nav>
    </Grid>

    {/* Divider */}
    <Divider marginY="space-1200" />

    {/* Grid with product logo, social media links and language switch */}
    <Grid
      cols={{ mobile: 1, desktop: 3 }}
      alignmentX={{ mobile: 'center', desktop: 'stretch' }}
      alignmentY="center"
      spacing="space-1100"
    >
      {/* Product logo */}
      <div className="text-desktop-left">
        <Link href="https://www.example.com">
          <ProductLogo>{/*defaultSvgLogo*/}</ProductLogo>
        </Link>
      </div>

      {/* Flex with social media links */}
      <Flex elementType="ul" alignmentX="center" alignmentY="center">
        <li>
          <ButtonLink size="medium" color="tertiary" isSymmetrical>
            <VisuallyHidden>Facebook</VisuallyHidden>
            <Icon name="logo-facebook" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink size="medium" color="tertiary" isSymmetrical>
            <VisuallyHidden>X</VisuallyHidden>
            <Icon name="logo-x" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink size="medium" color="tertiary" isSymmetrical>
            <VisuallyHidden>YouTube</VisuallyHidden>
            <Icon name="logo-youtube" />
          </ButtonLink>
        </li>
      </Flex>

      {/* Language switch */}
      <div className="text-desktop-right">
        <Select id="select-language" name="selectLanguage" label="Language" isLabelHidden>
          <option value="en">English</option>
          <option value="cs">Čeština</option>
        </Select>
      </div>
    </Grid>

    {/* Divider */}
    <Divider marginY="space-1200" />

    {/* Flex with secondary links */}
    <nav aria-label="Secondary links">
      <Flex
        elementType="ul"
        direction={{ mobile: 'column', tablet: 'row' }}
        alignmentX={{ mobile: 'stretch', tablet: 'center' }}
        spacing={{ mobile: 'space-600', tablet: 'space-900' }}
        isWrapping
      >
        <li>
          <Link href="https://www.example.com" color="secondary">
            Legal notice
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Terms of service
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link href="https://www.example.com" color="secondary">
            Manage cookies
          </Link>
        </li>
      </Flex>
    </nav>
  </Container>
</Footer>
```

### API

| Name              | Type                                                                                              | Default      | Required | Description                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------ | -------- | -------------------------------------------------------------------------------------------- |
| `backgroundColor` | [Background Color dictionary][dictionary-background-color]                                        | `secondary`  | ✕        | Sets the background color of the footer                                                      |
| `elementType`     | `ElementType`                                                                                     | `footer`     | ✕        | The HTML element or React element used to render the footer, e.g. 'footer', 'div', 'section' |
| `paddingBottom`   | `SpaceToken`                                                                                      | `space-1400` | ✕        | Defines the padding at the bottom of the footer                                              |
| `paddingTop`      | `SpaceToken`                                                                                      | `space-1200` | ✕        | Defines the padding at the top of the footer                                                 |
| `textAlignment`   | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`] | -            | ✕        | Alignment of the text                                                                        |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[buttonlink]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ButtonLink/README.md
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-background-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[divider]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Divider/README.md
[flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Flex/README.md
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[product-logo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ProductLogo/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Select/README.md
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
