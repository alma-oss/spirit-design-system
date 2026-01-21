# ScrollView

ScrollView makes long content scrollable. On its edges, it provides an indication of whether there is more content to scroll to.

## JavaScript Plugin

For full functionality, you need to provide Spirit JavaScript, which will handle toggling of the FileUploader component:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

You will find the [full documentation](#javascript-plugin-api) of the plugin below on this page.

Please consult the [main README][web-readme] for how to include JavaScript plugins.

Or, feel free to write the controlling script yourself.

## Vertical Scrolling

For vertical scrolling, you need to add the `ScrollView--vertical` class to the container element and set the
`data-spirit-direction` attribute to `vertical`.

```html
<div class="ScrollView ScrollView--vertical" data-spirit-toggle="scrollView" data-spirit-direction="vertical">
  <div class="ScrollView__viewport" data-spirit-element="viewport">
    <div class="ScrollView__content" data-spirit-element="content">
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit…</p>
    </div>
  </div>
  <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
</div>
```

## Horizontal Scrolling

Analogically, add the `ScrollView--horizontal` class to the container element and set the `data-spirit-direction` attribute to
`horizontal` to achieve horizontal scrolling.

⚠️ To use horizontal ScrollView, its width must be limited. Otherwise, the content will simply overflow the container.
You can do so in many ways in CSS. We recommend applying either `display: grid` on the container in your CSS, or adding
our `d-grid` utility class to it.

👉 For text content, you may need to explicitly set the `white-space` CSS property to `nowrap` on the content element to prevent the
content from wrapping.

```html
<div class="g-grid">
  <div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
    <div class="ScrollView__viewport" data-spirit-element="viewport">
      <div class="ScrollView__content" data-spirit-element="content">
        <p class="mb-700" style="white-space: nowrap">Lorem ipsum dolor sit amet, consectetuer adipiscing elit…</p>
      </div>
    </div>
    <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
  </div>
</div>
```

👉 For other content types, you may need to provide fixed width to the content element (or elements) to force scrolling.

```html
<div class="g-grid">
  <div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
    <div class="ScrollView__viewport" data-spirit-element="viewport">
      <div class="ScrollView__content" data-spirit-element="content">
        <div class="Grid Grid--cols-4 mb-700">
          <div style="width: 20rem">1/4</div>
          <div style="width: 20rem">1/4</div>
          <div style="width: 20rem">1/4</div>
          <div style="width: 20rem">1/4</div>
        </div>
      </div>
    </div>
    <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
  </div>
</div>
```

### Edge-to-Edge Scrolling

To expand ScrollView horizontally edge-to-edge and restore the original
horizontal padding of the parent Container inside, use our `breakout-container`
helper with the `--container-padding-inline` CSS variable provided by the
[Container][container] component. This technique is useful when you can't place
the ScrollView and its content outside a parent Container.

```html
<div class="Container">
  <!-- Content… -->
  <!-- Break out from the Container and prepare a grid layout for ScrollView: -->
  <div class="breakout-container d-grid">
    <!-- Establish horizontal ScrollView: -->
    <div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
      <div class="ScrollView__viewport" data-spirit-element="viewport" tabindex="0">
        <div class="ScrollView__content" data-spirit-element="content">
          <!-- Restore Container's horizontal padding on a Grid (for example): -->
          <div class="Grid Grid--cols-3" style="margin-inline: var(--container-padding-inline);">
            <!-- Scrollable content… -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

⚠️ Composition of [Container][container] and other Spirit layout components
inside a horizontal ScrollView is currently not supported. We recommend taking
the `--container-padding-inline` CSS variable provided by the parent Container
and applying it to the desired layout component via inline styles instead as
shown above.

## Scrolling Overflow Decorators

The ScrollView component provides overflow decorators on its edges, showing that there is more content to scroll to. The default overflow
decorators use shadows:

```html
<div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
```

You can use borders instead:

```html
<div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--borders" aria-hidden="true"></div>
```

Or both:

```html
<div
  class="ScrollView__overflowDecorators ScrollView__overflowDecorators--borders ScrollView__overflowDecorators--shadows"
  aria-hidden="true"
></div>
```

### Custom Shadows

You can customize the shadows by overriding the following CSS variables:

```css
--scroll-view-start-shadow-background: linear-gradient(to bottom, #9400d3 0%, #9400d300 100%);
--scroll-view-end-shadow-background: linear-gradient(to top, #9400d3 0%, #9400d300 100%);
```

## Arrow Controls

You can optionally add arrow controls that appear when the content can be scrolled. Add a `ScrollView__arrows` container as a direct child of `ScrollView` and place two buttons inside. The controls are automatically positioned and shown/hidden based on scroll position.

⚠️ Please note: The ScrollView component does not include JavaScript functionality for the arrow controls. You will need to implement the logic to handle scrolling when the arrows are clicked.

Notes:

- Arrows are overlayed and only become visible when the container is scrolled away from the corresponding edge.
- When arrows are present, overflow shadow sizes adjust automatically to accommodate the controls.
- Use descriptive `aria-label` values: "Scroll up/down" for vertical, "Scroll left/right" for horizontal.

### Vertical Arrows

```html
<div class="ScrollView ScrollView--vertical" data-spirit-toggle="scrollView" data-spirit-direction="vertical">
  <div class="ScrollView__viewport" data-spirit-element="viewport" tabindex="0">
    <div class="ScrollView__content" data-spirit-element="content">
      <!-- … -->
    </div>
  </div>
  <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
  <div class="ScrollView__arrows">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground accessibility-tap-target dynamic-color-border dynamic-color-background-interactive"
      aria-label="Scroll up"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-up" />
      </svg>
    </button>
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground accessibility-tap-target dynamic-color-border dynamic-color-background-interactive"
      aria-label="Scroll down"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </button>
  </div>
</div>
```

### Horizontal Arrows

```html
<div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
  <div class="ScrollView__viewport" data-spirit-element="viewport" tabindex="0">
    <div class="ScrollView__content" data-spirit-element="content">
      <!-- … -->
    </div>
  </div>
  <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
  <div class="ScrollView__arrows">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground accessibility-tap-target dynamic-color-border dynamic-color-background-interactive"
      aria-label="Scroll left"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-left" />
      </svg>
    </button>
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical ControlButton--hasBackground accessibility-tap-target dynamic-color-border dynamic-color-background-interactive"
      aria-label="Scroll right"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-right" />
      </svg>
    </button>
  </div>
</div>
```

## Scrollbar

Depending on user's operating system and browser, the scrollbar may be hidden by default or take up space in the container element.

👉 Unless you decide to [hide the scrollbar](#hiding-the-scrollbar), you may need to provide spacing for the scrollbar, so it does
not cover your content when visible. For example, having a horizontal ScrollView, you can do so by adding a margin or padding utility
class to your content, e.g. `mb-700` or `pb-700`.

```html
<div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
  <div class="ScrollView__viewport" data-spirit-element="viewport">
    <div class="ScrollView__content" data-spirit-element="content">
      <p class="mb-700">…</p>
    </div>
  </div>
  <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
</div>
```

### Hiding the Scrollbar

To hide the scrollbar, add the `ScrollView--hideScrollbar` class to the container element.

⚠️ Make sure that the content is still accessible to users who don’t use a pointing device with support of horizontal scrolling, e.g. by providing keyboard navigation.

```html
<div
  class="ScrollView ScrollView--horizontal ScrollView--scrollbarDisabled"
  data-spirit-toggle="scrollView"
  data-spirit-direction="horizontal"
>
  <div class="ScrollView__viewport" data-spirit-element="viewport">
    <div class="ScrollView__content" data-spirit-element="content">
      <!-- … -->
    </div>
  </div>
  <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
</div>
```

## Accessibility

To make the ScrollView component accessible by keyboard, you need to add the `tabindex` attribute to the viewport element.

```html
<div class="ScrollView__viewport" data-spirit-element="viewport" tabindex="0">
  <!-- … -->
</div>
```

See [WAI Scrollable content guidelines][wai-scrollable-content] for more information.

## JavaScript Plugin API

| Method                | Description                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getInstance`         | _Static_ method which allows you to get the ScrollView instance associated with a DOM element.                                                    |
| `getOrCreateInstance` | _Static_ method which allows you to get the ScrollView instance associated with a DOM element, or create a new one in case it wasn’t initialized. |

[container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[wai-scrollable-content]: https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
