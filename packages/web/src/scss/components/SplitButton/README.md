# Split Button

The Split Button component groups multiple related actions a user can take, combining a button with additional options like a dropdown menu or tooltips for better usability.

⚠️ It is recommended to always use the same button colors for all buttons inside a Split Button.

Learn more about the [Button][readme-button] component in its documentation.

Simple variant:

```html
<div class="SplitButton">
  <button type="button" class="Button Button--medium Button--primary">Button</button>
  <button type="button" class="Button Button--medium Button--primary">Button</button>
</div>
```

## Variant with Dropdown

You can add a Dropdown component inside a Split Button to provide additional actions.

Learn more about the [Dropdown][readme-dropdown] component in its documentation.

```html
<div class="SplitButton">
  <button type="button" class="Button Button--medium Button--primary">Button</button>
  <div class="Dropdown">
    <button
      type="button"
      class="Button Button--medium Button--primary"
      data-spirit-toggle="dropdown"
      data-spirit-target="#dropdown-1"
      aria-expanded="false"
      aria-controls="dropdown-1"
      data-spirit-autoclose="true"
    >
      More
      <svg width="24" height="24" aria-hidden="true" class="ml-400">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </button>
    <div class="DropdownPopover" data-spirit-placement="bottom-start" id="dropdown-1">Dropdown content</div>
  </div>
</div>
```

## Variant with Tooltip

You can also add a tooltip to buttons, which is especially useful for buttons that contain only icons.

Learn more about the [Tooltip][readme-tooltip] component in its documentation.

```html
<div class="SplitButton">
  <button type="button" class="Button Button--medium Button--primary">Button</button>
  <div class="Tooltip" data-spirit-element="tooltip">
    <button
      type="button"
      class="Button Button--medium Button--primary Button--symmetrical"
      data-spirit-toggle="tooltip"
      data-spirit-target="#tooltip-1"
      aria-labelledby="tooltip-1"
    >
      <svg width="24" height="24" aria-hidden="true" class="mx-800">
        <use xlink:href="/assets/icons/svg/sprite.svg#download" />
      </svg>
    </button>
    <div
      id="tooltip-1"
      class="TooltipPopover is-hidden"
      data-spirit-placement="bottom-start"
      data-spirit-flip-fallback-placements="bottom"
      data-spirit-trigger="hover"
    >
      Download
      <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
    </div>
  </div>
</div>
```

[readme-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Button/README.md
[readme-dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Dropdown/README.md
[readme-tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tooltip/README.md
