# Dropdown

## Basic Usage

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-default"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-default"
  >
    Button as anchor
  </button>
  <div class="DropdownPopover placement-bottom-start" data-spirit-placement="bottom-start" id="dropdown-default">
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <span>Information</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#link" />
      </svg>
      <span>Bibendum aliquam, fusce integer sit amet congue non nulla aliquet enim</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#profile" />
      </svg>
      <span>Profile</span>
    </a>
    <a href="#" class="d-flex">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#help" />
      </svg>
      <span>Help</span>
    </a>
  </div>
</div>
```

## Usage with Top End Align

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-top-end"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-top-end"
  >
    Button as anchor
  </button>
  <div class="DropdownPopover placement-top-end" data-spirit-placement="top-end" id="dropdown-top-end">
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <span>Information</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#link" />
      </svg>
      <span>Bibendum aliquam, fusce integer sit amet congue non nulla aliquet enim</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#profile" />
      </svg>
      <span>Profile</span>
    </a>
    <a href="#" class="d-flex">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#help" />
      </svg>
      <span>Help</span>
    </a>
  </div>
</div>
```

## Usage with Disabled Autoclose

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-disabled-auto-close"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-disabled-auto-close"
    data-spirit-autoclose="true"
  >
    Button as anchor
  </button>
  <div
    class="DropdownPopover placement-bottom-start"
    data-spirit-placement="bottom-start"
    id="dropdown-disabled-auto-close"
  >
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <span>Information</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#link" />
      </svg>
      <span>Bibendum aliquam, fusce integer sit amet congue non nulla aliquet enim</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#profile" />
      </svg>
      <span>Profile</span>
    </a>
    <a href="#" class="d-flex">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#help" />
      </svg>
      <span>Help</span>
    </a>
  </div>
</div>
```

## Usage with Full Width Mode All

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-full-width-mode-all"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-full-width-mode-all"
  >
    Finibus quis imperdiet, semper imperdiet aliquam
  </button>
  <div
    class="DropdownPopover placement-top-start"
    data-spirit-placement="top-start"
    id="dropdown-full-width-mode-all"
    data-spirit-fullwidthmode="all"
  >
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <span>Information</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#link" />
      </svg>
      <span>Bibendum aliquam, fusce integer sit amet congue non nulla aliquet enim</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#profile" />
      </svg>
      <span>Profile</span>
    </a>
    <a href="#" class="d-flex">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#help" />
      </svg>
      <span>Help</span>
    </a>
  </div>
</div>
```

## Usage with Full Width Mode Mobile-Only

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-full-width-mode-mobile"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-full-width-mode-mobile"
  >
    Finibus quis imperdiet, semper imperdiet aliquam
  </button>
  <div
    class="DropdownPopover placement-top-start"
    data-spirit-placement="top-start"
    id="dropdown-full-width-mode-mobile"
    data-spirit-fullwidthmode="mobile-only"
  >
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <span>Information</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#link" />
      </svg>
      <span>Bibendum aliquam, fusce integer sit amet congue non nulla aliquet enim</span>
    </a>
    <a href="#" class="d-flex mb-400">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#profile" />
      </svg>
      <span>Profile</span>
    </a>
    <a href="#" class="d-flex">
      <svg width="24" height="24" aria-hidden="true" class="mr-400">
        <use xlink:href="/icons/svg/sprite.svg#help" />
      </svg>
      <span>Help</span>
    </a>
  </div>
</div>
```

## Usage with Item Component

See the [Item][item] component for more information.

```html
<div class="Dropdown">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-default"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-default"
  >
    Button as anchor
  </button>
  <div class="DropdownPopover placement-bottom-start" data-spirit-placement="bottom-start" id="dropdown-default">
    <a href="#" class="Item">
      <span class="Item__icon Item__icon--start">
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#info" />
        </svg>
      </span>
      <span class="Item__label">Information</span>
    </a>
  </div>
</div>
```

## Placement

DropdownPopover uses the shared [placement helpers][placement-helpers] for positioning. Add the matching placement class to the popover (e.g. `placement-bottom-start`, `placement-top-end`) so the helper applies transform-origin and offset. The component sets `--spirit-placement-offset` for the gap; placement values follow the [Placement Dictionary][dictionary-placement]. You can keep `data-spirit-placement` on the element for scripting or accessibility if needed.

## Alignment

Dropdown supports the extended [Alignment Dictionary][dictionary-alignment] for alignment on both axes. To use it, add the
specific class to the `.Dropdown` element, e.g. `.Dropdown--alignmentXRight` or `.Dropdown--alignmentYStretch`. Adding
any of these classes will make the element display as `flex`.

We also support responsive infixes for alignment classes. To use them, add the infix to the class name, e.g. `.Dropdown--tablet--alignmentXRight`.

ℹ️ This controls only the alignment inside the wrapping `.Dropdown` element. And even with alignment, the popover will still be positioned
at edge of the `.Dropdown` element and on the place defined by the placement class.

```html
<div class="Dropdown Dropdown--alignmentXRight Dropdown--desktop--alignmentXCenter">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-alignment"
    aria-expanded="false"
    aria-controls="dropdown-alignment"
    <!-- ... -->
  >
    Trigger button aligned to the right and centered on desktop
  </button>
  <div
    class="DropdownPopover placement-bottom-start"
    data-spirit-placement="bottom-start"
    id="dropdown-alignment"
  >
      <!-- ... -->
  </div>
</div>
```

## JavaScript

There are two options here. Use the trigger element as an anchor or wrap the menu together with the trigger into a `.Dropdown` class.

### Dropdown Trigger

| Attribute               | Type     | Default | Required | Description                                                                                                    |
| ----------------------- | -------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `aria-controls`         | `string` | —       | ✓        | Identifies the element whose contents or presence are controlled by the element on which this attribute is set |
| `aria-expanded`         | `bool`   | —       | ✓        | Is set on an element to indicate if a control is expanded or collapsed                                         |
| `data-spirit-autoclose` | `bool`   | `true`  | ✕        | When you need to disable autoclose feature                                                                     |
| `data-spirit-target`    | `string` | —       | ✓        | Target menu element selector                                                                                   |

## DropdownPopover

| Attribute                   | Type                               | Default | Required | Description     |
| --------------------------- | ---------------------------------- | ------- | -------- | --------------- |
| `data-spirit-fullwidthmode` | \[`off` \| `mobile-only` \| `all`] | —       | ✕        | Full-width mode |

## JavaScript API

### Methods

| Method                | Description                                                                                                                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getInstance`         | _Static_ method which allows you to get the dropdown instance associated with a DOM element                                                                                                                                                    |
| `getOrCreateInstance` | _Static_ method which allows you to get the dropdown instance associated with a DOM element, or create a new one in case it wasn’t initialized.                                                                                                |
| `hide`                | Hides an element’s dropdown. Returns to the caller before the dropdown has actually been hidden (i.e. before the `hidden.dropdown` event occurs). This is considered a “manual” triggering of the dropdown.                                    |
| `show`                | Reveals an element’s dropdown. **Returns to the caller before the dropdown has actually been shown** (i.e. before the `shown.dropdown` event occurs). This is considered a “manual” triggering of the dropdown.                                |
| `toggle`              | Toggles an element’s dropdown. **Returns to the caller before the dropdown has actually been shown or hidden** (i.e. before the `shown.dropdown` or `hidden.dropdown` event occurs). This is considered a “manual” triggering of the dropdown. |

```js
const dropdown = Dropdown.getInstance('#example'); // Returns a dropdown instance

dropdown.show();
```

### Events

| Method            | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `hidden.dropdown` | This event is fired when the `hide` instance has finished being hidden from the user. |
| `hide.dropdown`   | This event is fired immediately when the `hide` instance method has been called.      |
| `show.dropdown`   | This event fires immediately when the `show` instance method is called.               |
| `shown.dropdown`  | This event is fired when the `show` instance has finished being shown to the user.    |

```js
const myDropdownEl = document.getElementById('my-dropdown');
const dropdown = Dropdown.getOrCreateInstance(myDropdownEl);

myDropdownEl.addEventListener('hidden.dropdown', () => {
  // do something...
});

dropdown.hide();
```

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[item]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Item/README.md
[placement-helpers]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/helpers/placement/
