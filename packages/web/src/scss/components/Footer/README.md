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

This is how all supported building blocks of the Footer build up the complete composition:

```html
<footer class="bg-secondary pt-1400 pb-1200">
  <div class="Container">
    <!-- Grid with navigation links -->
    <!-- Grid with product logo, social media links and language switch -->
    <!-- Flex with secondary links -->
  </div>
</footer>
```

👉 Good to know:

- To achieve the desired design, you can use the provided building blocks in any order you need.
- All building blocks are optional, so you can use only the ones you need.
- You are not limited just to the provided building blocks. You can add your own content or building blocks (such as a
  newsletter subscription form) as needed.
- Use [Grid][grid] and [Flex][flex] components to create the desired layout.
- Use [Stack][stack] or [Divider][divider] components to organize individual sections.
- Use spacing utility classes like `mb-*` or `pt-*` to achieve desired spacings between components.

## Navigation Links

Navigation links are structured in sections with a headline and a [Stack][stack] of links.

👉 Please note how the `<nav>` element is paired with an `<h3>` element (using the `aria-labelledby` attribute) to
provide a semantic connection between the headline and the navigation component. Just make sure the `id` attribute of
the `<h3>` element matches the value of the `aria-labelledby` attribute of the `<nav>` element and all `id`s are unique.

```html
<nav aria-labelledby="footer-navigation-section">
  <h3 class="typography-heading-xsmall-semibold mb-700" id="footer-navigation-section">Section headline</h3>
  <ul class="Stack Stack--hasSpacing" style="--stack-spacing: var(--spirit-space-600)">
    <li>
      <a href="https://www.example.com">Link</a>
    </li>
    <li>
      <a href="https://www.example.com">Link</a>
    </li>
    <li>
      <a href="https://www.example.com">Link</a>
    </li>
  </ul>
</nav>
```

You can use as many navigation sections like this as you need and wrap them in a responsive [Grid][grid] layout.

## Product Logo, Social Media Links and Language Switch

This section is optional and consists of a [Grid][grid] layout with up to three (also optional) columns:

```html
<div
  class="Grid Grid--cols-1 Grid--desktop--cols-3 Grid--alignmentXCenter Grid--desktop--alignmentXStretch Grid--alignmentYCenter"
  style="--grid-spacing-x: var(--spirit-space-1100); --grid-spacing-y: var(--spirit-space-1100)"
>
  <div class="text-desktop-left">
    <!-- Product logo -->
  </div>
  <!-- Flex with social media links -->
  <div class="text-desktop-right">
    <!-- Language switch -->
  </div>
</div>
```

👉 Please mind the `text-desktop-left` and `text-desktop-right` utility classes. They are used to align content of
individual grid columns to the left and right side of the container on desktop screens.

### Product Logo

Use the [Product Logo][product-logo] component to display the logo of your product.

### Social Media Links

Use the secondary [Button][button] component to create social media links inside a [Flex][flex] container.

```html
<ul class="Flex Flex--horizontal Flex--wrap Flex--alignmentXCenter Flex--alignmentYCenter">
  <!-- Repeat the `<li>` block for each social media link. -->
  <li>
    <a href="https://www.example.com" class="Button Button--secondary Button--medium Button--symmetrical">
      <span class="accessibility-hidden">Facebook</span>
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#logo-facebook" />
      </svg>
    </a>
  </li>
</ul>
```

### Language Switch

Use the [Select][select] component to create a language switch, or list the languages as country flags in a [Flex][flex]
layout.

## Secondary Links

This section is optional and consists of a [Flex][flex] layout with secondary links.

```html
<nav aria-label="Secondary links">
  <ul
    class="Flex Flex--vertical Flex--tablet--horizontal Flex--wrap Flex--alignmentXStretch Flex--tablet--alignmentXCenter Flex--alignmentYStretch"
    style="--flex-spacing: var(--spirit-space-600); --flex-spacing-tablet: var(--spirit-space-900)"
  >
    <!-- Repeat the `<li>` block for each secondary link. -->
    <li>
      <a href="https://www.example.com" class="link-secondary">Legal notice</a>
    </li>
  </ul>
</nav>
```

👉 Please mind the `aria-label` attribute on the `<nav>` element to provide an accessible label for the navigation.

## Multiple Footers

When you have multiple distinct footers (e.g., product and corporate), you can structure them semantically using `<section>` elements. Each footer section should be a `<section>` element with Footer classes, and the entire footer should be wrapped in a `<footer>` HTML tag.

This pattern provides better HTML semantics and accessibility, as each section can have its own structure and styling:

```html
<footer>
  <section class="bg-secondary pt-1400 pb-1200">
    <!-- Product footer -->
  </section>
  <section class="bg-primary pt-1200 pb-1000">
    <!-- Corporate footer -->
  </section>
</footer>
```

👉 Good to know:

- The `<footer>` HTML tag provides semantic meaning and indicates the footer region of the page.
- Each `<section>` element helps with document structure and accessibility.
- Each section can have its own styling classes (`bg-*`, `pt-*`, `pb-*`, etc.) for visual separation.
- This pattern is especially useful when you need different background colors or spacing for different sections of the footer.

## Text Alignment

You can use utility classes to align text inside the `Footer`.

```html
<footer class="text-center"><!-- Footer content --></footer>
<footer class="text-right"><!-- Footer content --></footer>
```

Responsive values can be defined using the `tablet` and `desktop` infixes.

```html
<footer class="text-center text-tablet-right text-desktop-left"><!-- Footer content --></footer>
```

## Full Example

```html
<footer class="bg-secondary pt-1400 pb-1200">
  <div class="Container">
    <!-- Grid with navigation links -->
    <div
      class="Grid Grid--cols-1 Grid--tablet--cols-2 Grid--desktop--cols-4"
      style="--grid-spacing-x: var(--spirit-space-1000); --grid-spacing-y: var(--spirit-space-1000)"
    >
      <!-- Repeat the `<nav>` block as many times as needed. -->
      <nav aria-labelledby="footer-navigation-section">
        <h3 class="typography-heading-xsmall-semibold mb-700" id="footer-navigation-section">Section headline</h3>
        <ul class="Stack Stack--hasSpacing" style="--stack-spacing: var(--spirit-space-600)">
          <li>
            <a href="https://www.example.com">Link</a>
          </li>
          <li>
            <a href="https://www.example.com">Link</a>
          </li>
          <li>
            <a href="https://www.example.com">Link</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Divider -->
    <hr class="Divider my-1200" />

    <!-- Grid with product logo, social media links and language switch -->
    <div
      class="Grid Grid--cols-1 Grid--desktop--cols-3 Grid--alignmentXCenter Grid--desktop--alignmentXStretch Grid--alignmentYCenter"
      style="--grid-spacing-x: var(--spirit-space-1100); --grid-spacing-y: var(--spirit-space-1100)"
    >
      <!-- Product logo -->
      <div class="text-desktop-left">
        <a href="https://www.example.com">
          <div class="ProductLogo">
            <!-- Product logo image -->
          </div>
        </a>
      </div>
      <!-- Flex with social media links -->
      <ul
        class="Flex Flex--horizontal Flex--wrap Flex--alignmentXCenter Flex--alignmentYCenter"
        aria-label="Social media"
      >
        <li>
          <a href="https://www.example.com" class="Button Button--secondary Button--medium Button--symmetrical">
            <span class="accessibility-hidden">Facebook</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="/assets/icons/svg/sprite.svg#logo-facebook" />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://www.example.com" class="Button Button--secondary Button--medium Button--symmetrical">
            <span class="accessibility-hidden">X</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="/assets/icons/svg/sprite.svg#logo-x" />
            </svg>
          </a>
        </li>
        <li>
          <a href="https://www.example.com" class="Button Button--secondary Button--medium Button--symmetrical">
            <span class="accessibility-hidden">YouTube</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="/assets/icons/svg/sprite.svg#logo-youtube" />
            </svg>
          </a>
        </li>
      </ul>
      <!-- Language switch -->
      <div class="text-desktop-right">
        <div class="Select Select--medium">
          <label for="select-language" class="Select__label Select__label--hidden">Language</label>
          <div class="Select__inputContainer">
            <select id="select-language" name="language" class="Select__input">
              <option value="en">English</option>
              <option value="cs">Čeština</option>
            </select>
            <div class="Select__icon">
              <svg width="20" height="20" aria-hidden="true">
                <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <hr class="Divider my-1200" />

    <!-- Flex with secondary links -->
    <nav aria-label="Secondary links">
      <ul
        class="Flex Flex--vertical Flex--tablet--horizontal Flex--wrap Flex--alignmentXStretch Flex--tablet--alignmentXCenter Flex--alignmentYStretch"
        style="--flex-spacing: var(--spirit-space-600); --flex-spacing-tablet: var(--spirit-space-900)"
      >
        <li>
          <a href="https://www.example.com" class="link-secondary">Legal notice</a>
        </li>
        <li>
          <a href="https://www.example.com" class="link-secondary">Terms of service</a>
        </li>
        <li>
          <a href="https://www.example.com" class="link-secondary">Privacy policy</a>
        </li>
        <li>
          <a href="https://www.example.com" class="link-secondary">Manage cookies</a>
        </li>
      </ul>
    </nav>
  </div>
</footer>
```

[button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Button/README.md
[divider]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Divider/README.md
[flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[product-logo]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ProductLogo/README.md
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
