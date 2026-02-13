# Tag

Subtle variants:

```html
<span class="Tag Tag--neutral Tag--subtle Tag--small">Neutral subtle tag</span>
<span class="Tag Tag--informative Tag--subtle Tag--small">Informative subtle tag</span>
<span class="Tag Tag--success Tag--subtle Tag--small">Success subtle tag</span>
<span class="Tag Tag--warning Tag--subtle Tag--small">Warning subtle tag</span>
<span class="Tag Tag--danger Tag--subtle Tag--small">Danger subtle tag</span>
```

Default (non-subtle) variants:

```html
<span class="Tag Tag--neutral Tag--small">Neutral dark tag</span>
<span class="Tag Tag--informative Tag--small">Informative dark tag</span>
<span class="Tag Tag--success Tag--small">Success dark tag</span>
<span class="Tag Tag--warning Tag--small">Warning dark tag</span>
<span class="Tag Tag--danger Tag--small">Danger dark tag</span>
<span class="Tag Tag--selected Tag--small">Selected tag</span>
```

Sizes:

```html
<span class="Tag Tag--neutral Tag--xsmall">XSmall tag</span>
<span class="Tag Tag--neutral Tag--small">Small tag</span>
<span class="Tag Tag--neutral Tag--medium">Medium tag</span>
<span class="Tag Tag--neutral Tag--large">Large tag</span>
<span class="Tag Tag--neutral Tag--xlarge">XLarge tag</span>
```

With ControlButton:

```html
<div class="Tag Tag--selected Tag--medium">
  <span>Tag label</span>
  <button
    type="button"
    class="ControlButton ControlButton--medium ControlButton--symmetrical"
    aria-label="Remove Tag label"
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

Disabled:

```html
<span class="Tag Tag--neutral Tag--small Tag--disabled">Disabled tag</span>
<div class="Tag Tag--neutral Tag--medium Tag--disabled">
  <span>Disabled tag</span>
  <button
    type="button"
    class="ControlButton ControlButton--medium ControlButton--symmetrical"
    aria-label="Remove Disabled tag"
    disabled
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```
