# Item

The Item component is used to display a single item in a list. It can be used in Dropdown or similar.
To use Item with checkbox or radio please use components [Checkbox][checkbox] or [Radio][radio]
with `item` modifier. We do this to avoid repeating the same code and to simplify the API.

Simple Item example:

```html
<button type="button" class="Item">
  <span class="Item__label">Item</span>
</button>
```

Item with icon example:

```html
<button type="button" class="Item">
  <span class="Item__icon Item__icon--start">
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__label">Item</span>
</button>
```

Item in selected state example:

```html
<button type="button" class="Item Item--selected">
  <span class="Item__label">Item</span>
  <span class="Item__icon Item__icon--end">
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

Item with Helper text example:

To add helper text, use the [HelperText][helper-text] component:

```html
<button type="button" class="Item">
  <span class="Item__label">Item</span>
  <span class="HelperText">Helper text</span>
</button>
```

Item in disabled state example:

```html
<button type="button" class="Item Item--disabled">
  <span class="Item__label">Item</span>
</button>
```

Item with icon and helper text in selected state example:

```html
<button type="button" class="Item Item--selected">
  <span class="Item__icon Item__icon--start">
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__label">Item</span>
  <span class="HelperText">Helper text</span>
  <span class="Item__icon Item__icon--end">
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

Item as a link example:

```html
<a href="#" class="Item">
  <span class="Item__label">Item</span>
</a>
```

ℹ️ Active style is visible only when the root element can obtain active state.

Radio as a Item:

```html
<div class="Radio Radio--inputPositionStart Radio--item">
  <input type="radio" id="radio-item" name="example" class="Radio__input" checked />
  <div class="Radio__text">
    <label class="Radio__label" for="radio-item">Item</label>
  </div>
</div>
```

Checkbox as a Item:

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--item">
  <input type="checkbox" id="checkbox-item" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label class="Checkbox__label" for="checkbox-item">Item</label>
  </div>
</div>
```

Usage in [Dropdown][dropdown] component:

```html
<div class="DropdownWrapper">
  <button
    data-spirit-toggle="dropdown"
    data-spirit-target="#dropdown-default"
    class="Button Button--primary Button--medium"
    aria-expanded="false"
    aria-controls="dropdown-default"
  >
    Button as anchor
  </button>
  <div class="Dropdown" id="dropdown-default" data-spirit-placement="bottom-start">
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

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md
[dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Dropdown/README.md
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Radio/README.md
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
