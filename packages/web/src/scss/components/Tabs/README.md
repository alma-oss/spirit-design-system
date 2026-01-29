# Tabs

Example usage:

```html
<ul class="Tabs" role="tablist">
  <li class="Tabs__item" role="presentation">
    <button
      class="Tabs__link is-selected"
      role="tab"
      aria-selected="true"
      id="pane-1-tab"
      data-spirit-toggle="tab"
      data-spirit-target="#pane-1"
      aria-controls="pane-1"
    >
      Item 1
    </button>
  </li>
  <li class="Tabs__item" role="presentation">
    <button
      class="Tabs__link"
      role="tab"
      aria-selected="false"
      id="pane-2-tab"
      data-spirit-toggle="tab"
      data-spirit-target="#pane-2"
      aria-controls="pane-2"
    >
      Item 2
    </button>
  </li>
  <li class="Tabs__item" role="presentation">
    <a href="https://www.example.com" class="Tabs__link">Item Link</a>
  </li>
  <li class="Tabs__item d-none d-desktop-block" role="presentation">
    <a href="https://www.example.com" class="Tabs__link">Item Link Only Desktop</a>
  </li>
</ul>

<div id="pane-1" class="TabsPane is-selected" role="tabpanel" aria-labelledby="pane-1-tab">Pane 1 content</div>
<div id="pane-2" class="TabsPane" role="tabpanel" aria-labelledby="pane-2-tab">Pane 2 content</div>
```

## Link Items

A tab item can be a link that follows a URL:

```html
<li class="Tabs__item" role="presentation">
  <a href="https://www.example.com" class="Tabs__link">Link item</a>
</li>
```

⚠️ Please note that mixing links with buttons in tab list is not recommended for accessibility reasons.

## Responsive Visibility

Individual tab items can take on properties that ensure their visibility from a
certain breakpoint up, preferably using Spirit utility classes.

```html
<li class="Tabs__item d-none d-desktop-block" role="presentation">
  <button
    class="Tabs__link is-selected"
    role="tab"
    aria-selected="true"
    id="pane-1-tab"
    data-spirit-toggle="tab"
    data-spirit-target="#pane-1"
    aria-controls="pane-1"
  >
    Item
  </button>
</li>
```

## Custom Spacing

Use CSS custom properties to define custom spacing between tab items. Set the `--tabs-spacing`
property to one of spacing token values defined on the `:root` element, e.g. `--tabs-spacing: var(--spirit-space-800)`.
This will set the spacing to `var(--spirit-space-800)` for all breakpoints.

```html
<ul class="Tabs" role="tablist" style="--tabs-spacing: var(--spirit-space-1200)">
  <!--Tabs content go here-->
</ul>
```

ℹ️ We highly discourage you from using absolute values like `--tabs-spacing: 1rem`. It will work, but you will lose
the consistency between the spacing and the design tokens.

If you need to set custom spacing from a specific [breakpoint][dictionary-breakpoint], use the `--tabs-spacing-{breakpoint}` property,
e.g. `--tabs-spacing-tablet: var(--spirit-space-800)`. The breakpoint value must be one of the breakpoint tokens
except for the `mobile` breakpoint you don't need the suffix at all. The spacing is set to all larger breakpoints
automatically if you don't set them explicitly. E.g. if you set only `--tabs-spacing-tablet: var(--spirit-space-800)`
the spacing will be set to `var(--spirit-space-800)` for `tablet` and `desktop` breakpoints while on the `mobile`
breakpoint the default spacing will be used.

Custom spacing from tablet up:

```html
<ul class="Tabs" role="tablist" style="--tabs-spacing-tablet: var(--spirit-space-1200)">
  <!--Tabs content go here-->
</ul>
```

Custom spacing for each breakpoint:

```html
<ul
  class="Tabs"
  role="tablist"
  style="--tabs-spacing: var(--spirit-space-800); --tabs-spacing-tablet: var(--spirit-space-1000); --tabs-spacing-desktop: var(--spirit-space-1200)"
>
  <!--Tabs content go here-->
</ul>
```

## JavaScript Plugin

For full functionality you need to provide Spirit JavaScript which will handle
Tabs changes:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript
plugins.

Or feel free to write the controlling script yourself.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
