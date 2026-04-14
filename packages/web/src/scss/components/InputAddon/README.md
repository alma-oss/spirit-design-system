# InputAddon

InputAddon is a wrapper for trailing or leading controls, icons or other content next to a field control inside [InputContainer][readme-input-container].

## Sizes

InputAddon supports the following size modifiers:

- `InputAddon--small`
- `InputAddon--medium` (default)
- `InputAddon--large`

```html
<div class="InputContainer InputContainer--small">
  <input type="password" id="password-small" name="passwordSmall" value="password" />
  <div class="InputAddon InputAddon--small">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical"
      aria-label="Show password"
    >
      <!-- icon -->
    </button>
  </div>
</div>

<div class="InputContainer InputContainer--medium">
  <input type="password" id="password-medium" name="passwordMedium" value="password" />
  <div class="InputAddon InputAddon--medium">
    <button
      type="button"
      class="ControlButton ControlButton--medium ControlButton--symmetrical"
      aria-label="Show password"
    >
      <!-- icon -->
    </button>
  </div>
</div>

<div class="InputContainer InputContainer--large">
  <input type="password" id="password-large" name="passwordLarge" value="password" />
  <div class="InputAddon InputAddon--large">
    <button
      type="button"
      class="ControlButton ControlButton--large ControlButton--symmetrical"
      aria-label="Show password"
    >
      <!-- icon -->
    </button>
  </div>
</div>
```

## Variants

InputAddon can render a variety of content for different use cases. Common options include:

- **Icon**: For search, status, or other indicative icons.
- **Text**: For affixes like currency symbols, units, or static labels.
- **ControlButton**: For actions such as toggling password visibility, clearing input, etc.

For full field patterns (label, helper text, validation), see for example [TextField][readme-text-field].

### Interactive vs Non-Interactive Addons

When the addon has **no** interactive control (no `<button>` or `<a>`), use a `<label>` with `InputAddon` and `for` pointing at the control `id` so clicking the addon focuses the input:

```html
<div class="InputContainer InputContainer--medium">
  <label class="InputAddon InputAddon--medium" for="amount-eur">
    <span aria-hidden="true">€</span>
    <span class="accessibility-hidden">in EUR</span>
  </label>
  <input type="text" id="amount-eur" name="amountEur" placeholder="0,00" inputmode="decimal" />
</div>
```

Keep using a `<div class="InputAddon InputAddon--medium">` when the addon wraps a button (for example password visibility) so the control stays a separate activation target.

### Icon Addon

```html
<div class="InputContainer InputContainer--medium">
  <input type="search" id="search" name="search" placeholder="Search" />
  <label class="InputAddon InputAddon--medium" for="search">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#search" />
    </svg>
    <span class="accessibility-hidden">Search</span>
  </label>
</div>
```

### Currency/Text Addon

```html
<div class="InputContainer InputContainer--medium">
  <label class="InputAddon InputAddon--medium" for="amount">
    <span aria-hidden="true">$</span>
    <span class="accessibility-hidden">in USD</span>
  </label>
  <input type="text" id="amount" name="amount" placeholder="0.00" inputmode="decimal" />
</div>
```

### Interactive Button Addon

```html
<div class="InputContainer InputContainer--medium">
  <input type="password" id="password" name="password" value="password" />
  <div class="InputAddon InputAddon--medium">
    <button
      type="button"
      class="ControlButton ControlButton--medium ControlButton--symmetrical accessibility-tap-target dynamic-color-background-interactive"
      aria-label="Show password"
    >
      <!-- icon (e.g., eye for visibility toggle) -->
    </button>
  </div>
</div>
```

### Multiple Addons

Multiple addons can be used to provide additional context or actions for the input.

```html
<div class="InputContainer InputContainer--medium">
  <label class="InputAddon InputAddon--medium" for="username">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#link" />
    </svg>
    <span class="accessibility-hidden">Profile URL</span>
  </label>
  <label class="InputAddon InputAddon--medium" for="username">
    <span aria-hidden="true">@</span>
    <span class="accessibility-hidden">Username</span>
  </label>
  <input type="text" id="username" name="username" placeholder="spirit-design-system" />
  <div class="InputAddon InputAddon--medium">
    <button
      type="button"
      class="ControlButton ControlButton--medium ControlButton--symmetrical accessibility-tap-target dynamic-color-background-interactive"
      aria-label="Clear"
    >
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</div>
```

### Accessibility for Label Addons

When `InputAddon` is a `<label>`, keep visual symbols and icons decorative and provide an accessible text alternative:

- Wrap the visual symbol/icon in an element with `aria-hidden="true"`.
- Add a sibling `<span class="accessibility-hidden">…</span>` that names the addon meaning (for example `Search`, `in EUR`, `Username`).

[readme-input-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputContainer/README.md
[readme-text-field]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
