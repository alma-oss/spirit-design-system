# UNSTABLE Header

⚠️ This component is UNSTABLE. It may significantly change at any point in the future.
Please use it with caution.

The `UNSTABLE_Header` component is planned to replace the `Header` component in the future.

The `UNSTABLE_Header` is a composition of several subcomponents:

- [UNSTABLE_Header](#unstable-header)
- [UNSTABLE_HeaderLogo](#unstable-headerlogo)

## UNSTABLE Header

The `UNSTABLE_Header` component is a main wrapper which provides mainly the visual for the Header.

```html
<header class="UNSTABLE_Header">
  <!-- content -->
</header>
```

You can use the `UNSTABLE_Header--bottomDivider` modifier to add a bottom divider to the Header.

```html
<header class="UNSTABLE_Header UNSTABLE_Header--bottomDivider">
  <!-- content -->
</header>
```

It also sets CSS variable for the Header height which can be used by nested components.

## UNSTABLE HeaderLogo

The `UNSTABLE_HeaderLogo` component is a container for the logo.

```html
<a href="#" class="UNSTABLE_HeaderLogo">
  <!-- content -->
</a>
```

It inherits the `UNSTABLE_Header` height and sets the logo wrapper height to the same value.

You can use the `ProductLogo` component inside the `UNSTABLE_HeaderLogo` component.

```html
<a href="#" class="UNSTABLE_HeaderLogo">
  <div class="ProductLogo">
    <!-- content -->
  </div>
</a>
```

## Component Composition

Use [`Container`][web-container] and [`Flex`][web-flex] components to create a layout for the Header content.

```html
<header class="UNSTABLE_Header">
  <div class="Container">
    <div class="Flex Flex--row Flex--noWrap Flex--alignmentXLeft Flex--alignmentYCenter">
      <a href="#" class="UNSTABLE_HeaderLogo">
        <div class="ProductLogo">
          <!-- content -->
        </div>
      </a>
      <!-- Navigation -->
      <!-- Another Navigation -->
    </div>
  </div>
</header>
```

This way you can easily modify the layout of the Header content.

For example you can make the content centered by setting the `Flex` alignment classes to center.

```html
<header class="UNSTABLE_Header">
  <div class="Flex Flex--row Flex--noWrap Flex--alignmentXCenter Flex--alignmentYCenter">
    <a href="#" class="UNSTABLE_HeaderLogo">
      <div class="ProductLogo">
        <!-- content -->
      </div>
    </a>
  </div>
</header>
```

Or you can modify the gaps between the content by setting the `Flex` `spacing` property.

```html
<header class="UNSTABLE_Header">
  <div class="Container">
    <div
      class="Flex Flex--row Flex--noWrap Flex--alignmentXLeft Flex--alignmentYCenter"
      style="--flex-spacing: var(--spirit-space-500);"
    >
      <a href="#" class="UNSTABLE_HeaderLogo">
        <div class="ProductLogo">
          <!-- content -->
        </div>
      </a>
      <!-- Navigation -->
      <!-- Another Navigation -->
    </div>
  </div>
</header>
```

If you need the whole Header fluid you can do it by adding the `Container--fluid` class to the `Container`.

```html
<header class="UNSTABLE_Header">
  <div class="Container Container--fluid">
    <div class="Flex Flex--row Flex--noWrap Flex--alignmentXLeft Flex--alignmentYCenter">
      <a href="#" class="UNSTABLE_HeaderLogo">
        <div class="ProductLogo">
          <!-- content -->
        </div>
      </a>
    </div>
  </div>
</header>
```

## With Navigation

You can use the [`Navigation`][web-navigation] component inside the `UNSTABLE_Header` component.

The `UNSTABLE_Header` sets the height of the `Navigation` component to the same value as the `UNSTABLE_Header`.

Use the composition mentioned above to create the layout you need.

```html
<header class="UNSTABLE_Header">
  <div class="Container">
    <div
      class="Flex Flex--row Flex--noWrap Flex--alignmentXLeft Flex--alignmentYCenter"
      style="--flex-spacing-x: var(--spirit-space-1000);"
    >
      <a href="#" aria-label="JobBoard homepage" class="UNSTABLE_HeaderLogo">
        <div class="ProductLogo">{{> web/assets/jobBoardLogo }}</div>
      </a>

      <nav class="Navigation" aria-label="Main Navigation">
        <ul>
          <li>
            <a href="#" class="NavigationAction">Link</a>
          </li>
          <li>
            <a href="#" class="NavigationAction NavigationAction--selected" aria-current="page">Selected</a>
          </li>
          <li>
            <a href="#" class="NavigationAction NavigationAction--disabled">Disabled</a>
          </li>
        </ul>
      </nav>

      <nav class="Navigation ml-auto" aria-label="Secondary Navigation">
        <ul>
          <li>
            <button class="Button Button--tertiary Button--medium Button--symmetrical">
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="/assets/icons/svg/sprite.svg#search" />
              </svg>
            </button>
          </li>
          <li>
            <a href="#" class="Button Button--secondary Button--medium">Sign up</a>
          </li>
          <li>
            <a href="#" class="Button Button--primary Button--medium">Post a job</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
```

[web-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[web-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[web-navigation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Navigation/README.md
