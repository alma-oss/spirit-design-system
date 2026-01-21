# Tooltip

Bare Tooltip HTML:

```html
<div class="Tooltip" data-spirit-element="tooltip">
  <button type="button" data-spirit-toggle="tooltip" data-spirit-target="#my-tooltip-basic">I have a tooltip 😎</button>
  <div id="my-tooltip-basic" class="TooltipPopover is-hidden">
    Hello there!
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

## Linking with Content

To display a Tooltip along your content, simply place it in the DOM next to it.
Tooltip is positioned relative to the closest parent element with
`position: relative` or `position: absolute`. You may either provide the CSS
yourself or you can use the prepared TooltipWrapper component.

👉 Depending on your layout, you may need to provide additional styling to
shrink TooltipWrapper box model, e.g. using `d-inline-block` utility class.
(This probably won't be necessary inside flexbox and grid layouts.)

👉 Link Tooltip to your content using `id` and `aria-describedby` attributes for
improved accessibility.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button type="button" aria-describedby="my-tooltip" data-spirit-toggle="tooltip" data-spirit-target="#my-tooltip">
    I have a tooltip 😎
  </button>
  <div id="my-tooltip" class="TooltipPopover is-hidden">
    Hello there!
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

## Placement

Tooltip implements the [Placement Dictionary][dictionary-placement] for placement. The dictionary values are used as
a value of data attribute `data-spirit-placement`, e.g. `data-spirit-placement="top"`, `data-spirit-placement="right-end"`, etc.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button
    type="button"
    aria-describedby="my-tooltip-placement"
    data-spirit-toggle="tooltip"
    data-spirit-target="#my-tooltip-placement"
  >
    I have a tooltip 😎
  </button>
  <div id="my-tooltip-placement" class="TooltipPopover is-hidden" data-spirit-placement="right-start">
    Hello there!
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

## Dismissible Tooltip

Tooltip can be made dismissible by following these steps:

1. Add `TooltipPopover--dismissible` modifier class on TooltipPopover.
2. Add closing button with `TooltipPopover__close` class.
3. Bind JS plugin using `data-spirit-dismiss="tooltip"` and `data-spirit-target`
   attributes on the closing button.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button
    type="button"
    aria-describedby="my-dismissible-tooltip"
    data-spirit-toggle="tooltip"
    data-spirit-target="#my-dismissible-tooltip"
  >
    I have a tooltip 😎
  </button>
  <div id="my-dismissible-tooltip" class="TooltipPopover TooltipPopover--dismissible">
    Close me
    <button
      type="button"
      class="TooltipPopover__close"
      data-spirit-dismiss="tooltip"
      data-spirit-target="#my-dismissible-tooltip"
      aria-controls="my-dismissible-tooltip"
      aria-expanded="true"
    >
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
      <span class="accessibility-hidden">Close</span>
    </button>
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

## Advanced Positioning

While the basic setup can be sufficient in some scenarios, dropping a Tooltip
usually won't be so easy. To handle all tricky situations and edge cases
automatically, including smart position updates to ensure Tooltip visibility,
we recommend involving an external library designed specifically for this
purpose.

### Arrow

When controlling Tooltip arrow with JavaScript, set `data-spirit-element="arrow"`
on the `.TooltipPopover__arrow` to control it.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button type="button" id="tooltip-trigger" data-spirit-toggle="tooltip" data-spirit-target="#my-tooltip-arrow">
    Toggle tooltip
  </button>
  <div id="my-advanced-arrow" class="TooltipPopover">
    Hello there!
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

### Trigger

You can choose whether you want to open the tooltip on `click`, `hover`, and/or `focus`.
By default, both `click` and `hover` options are active, e.g., `data-spirit-trigger="click, hover"`.
If you only want the `click` trigger, you need to specify the trigger, as shown in the example below.
This setup might be preferable when you have a link in your tooltip, for example.
The `focus` trigger is useful for accessibility, showing the tooltip when users navigate to the trigger element using the keyboard (Tab key).

👉 For the `focus` trigger to work properly, the trigger element must be focusable. If you're using a non-focusable element (like a `div` or `span`), make sure to add `tabIndex={0}` to make it keyboard accessible.

👉 'hover' on its own will result in tooltips that cannot be triggered via the keyboard, and should only be used if alternative methods for conveying the same information for keyboard users is present.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button type="button" id="tooltip-trigger" data-spirit-toggle="tooltip" data-spirit-target="#my-tooltip-trigger">
    Toggle tooltip
  </button>
  <div id="my-tooltip-trigger" class="TooltipPopover is-hidden" data-spirit-trigger="click">
    <!-- Only `click` trigger is active now. -->
    You can click on the link:
    <a href="#">Link to unknown</a>
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

### Advanced Floating Functionality

Advanced floating functionality is provided by JavaScript plugin and by [Floating UI][floating-ui] library.

```html
<div class="Tooltip d-inline-block" data-spirit-element="tooltip">
  <button type="button" id="tooltip-trigger" data-spirit-toggle="tooltip" data-spirit-target="#my-tooltip-advanced">
    Toggle tooltip
  </button>
  <div
    id="my-tooltip-advanced"
    class="TooltipPopover"
    data-spirit-enable-flipping-cross-axis="true"
    data-spirit-enable-flipping="true"
    data-spirit-enable-shifting="true"
    data-spirit-enable-sizing="true"
    data-spirit-flip-fallback-axis-side-direction="start"
    data-spirit-flip-fallback-placements="top, right, bottom"
  >
    Hello there!
    <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
  </div>
</div>
```

👉 Please consult [Floating UI][floating-ui] documentation to understand how it
works and to get an idea of all possible cases you may need to cover.

## Floating UI Attributes

| Attribute                                       | Type                                         | Default        | Required | Description                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | -------------------------------------------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-spirit-enable-flipping-cross-axis`        | \[true \| false]                             | true           | ✕        | Enables flipping on the [cross axis][floating-ui-flip-cross-axis], the axis perpendicular to main axis. For example `top-end` can be flipped to the `top-start`.                                                                                                                                                                  |
| `data-spirit-enable-flipping`                   | \[true \| false]                             | true           | ✕        | Enables [flipping][floating-ui-flip] of the element’s placement when it starts to overflow its boundary area. For example `top` can be flipped to `bottom`.                                                                                                                                                                       |
| `data-spirit-enable-shifting`                   | \[true \| false]                             | true           | ✕        | Enables [shifting][floating-ui-shift] of the element to keep it inside the boundary area by adjusting its position.                                                                                                                                                                                                               |
| `data-spirit-enable-sizing`                     | \[true \| false]                             | true           | ✕        | Enables [sizing][floating-ui-size] of the element to keep it inside the boundary area by setting the max width.                                                                                                                                                                                                                   |
| `data-spirit-flip-fallback-axis-side-direction` | \["none" \| "start" \| "end" ]               | "none"         | ✕        | Whether to allow [fallback to the opposite axis][floating-ui-flip-fallback-axis-side-direction] if no placements along the preferred placement axis fit, and if so, which side direction along that axis to choose. If necessary, it will fallback to the other direction.                                                        |
| `data-spirit-flip-fallback-placements`          | string                                       | -              | ✕        | This describes a list of [explicit placements][floating-ui-flip-fallback-placements] to try if the initial placement doesn’t fit on the axes in which overflow is checked. For example you can set `"top, right, bottom"`                                                                                                         |
| `data-spirit-placement`                         | [Placement Dictionary][dictionary-placement] | "bottom"       | ✕        | Placement of tooltip                                                                                                                                                                                                                                                                                                              |
| `data-spirit-trigger`                           | \["click" \| "hover" \| "focus" \| "manual"] | "click, hover" | ✕        | How tooltip is triggered: `click`, `hover`, `focus`, `manual`. You may pass multiple triggers; separate them with a comma. If you pass `manual`, no event listener will be added, and you should provide your own toggle solution. The `focus` trigger shows the tooltip when the trigger element is focused (e.g., via Tab key). |

👆 All the attributes mentioned above can be also set as an object in the `config` attribute, like this: `data-spirit-config='{"flip": "true", "flipFallbackPlacements": "top, right, bottom"}'`. Please note that this configuration has lower priority than individual attributes and will be overwritten by them.

## JavaScript API

### Methods

| Method                | Description                                                                                                                                                                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getInstance`         | _Static_ method which allows you to get the tooltip instance associated with a DOM. element                                                                                                                                                                       |
| `getOrCreateInstance` | _Static_ method which allows you to get the tooltip instance associated with a DOM element, or create a new one in case it wasn’t initialized.                                                                                                                    |
| `hide`                | Hides an element’s tooltip. Returns to the caller before the tooltip has actually been hidden (i.e. before the `hidden.tooltip` event occurs). This is considered a “manual” triggering of the tooltip.                                                           |
| `show`                | Reveals an element’s tooltip. **Returns to the caller before the tooltip has actually been shown** (i.e. before the `shown.tooltip` event occurs). This is considered a “manual” triggering of the tooltip. Tooltips with zero-length titles are never displayed. |
| `toggle`              | Toggles an element’s tooltip. **Returns to the caller before the tooltip has actually been shown or hidden** (i.e. before the `shown.tooltip` or `hidden.tooltip` event occurs). This is considered a “manual” triggering of the tooltip.                         |

```js
const tooltip = Tooltip.getInstance('#example'); // Returns a tooltip instance

tooltip.show();
```

### Events

| Method           | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| `hidden.tooltip` | This event is fired when the `hide` instance has finished being hidden from the user. |
| `hide.tooltip`   | This event is fired immediately when the `hide` instance method has been called.      |
| `show.tooltip`   | This event fires immediately when the `show` instance method is called.               |
| `shown.tooltip`  | This event is fired when the `show` instance has finished being shown to the user.    |

```js
const myTooltipEl = document.getElementById('my-tooltip');
const tooltip = Tooltip.getOrCreateInstance(myTooltipEl);

myTooltipEl.addEventListener('hidden.tooltip', () => {
  // do something...
});

tooltip.hide();
```

[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[floating-ui-flip-cross-axis]: https://floating-ui.com/docs/flip#crossaxis
[floating-ui-flip-fallback-axis-side-direction]: https://floating-ui.com/docs/flip#fallbackaxissidedirection
[floating-ui-flip-fallback-placements]: https://floating-ui.com/docs/flip#fallbackplacements
[floating-ui-flip]: https://floating-ui.com/docs/flip
[floating-ui-shift]: https://floating-ui.com/docs/shift
[floating-ui-size]: https://floating-ui.com/docs/size
[floating-ui]: https://floating-ui.com
