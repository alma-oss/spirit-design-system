# Alert

Variants:

ℹ️ Even though the `Alert--<color>` modifier is not used by default, it can be used to override the color scheme when needed. See [Component Color Overrides][component-color-overrides] for more information.

```html
<div class="Alert Alert--success color-scheme-on-emotion-success-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#success" />
  </svg>
  <div>We sent you an activation link to email <strong>spirit@lmc.eu</strong>.</div>
</div>

<div class="Alert Alert--informative color-scheme-on-emotion-informative-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>
    Data update failed due to missing internet connection Data update failed due to missing internet connection Data
    update failed due to missing internet connection Data update failed due to missing internet connection Data update
    failed due to missing internet connection Data update failed due to missing internet connection
  </div>
</div>

<div class="Alert Alert--warning color-scheme-on-emotion-warning-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#warning" />
  </svg>
  <div><strong>Warning!</strong> Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--danger color-scheme-on-emotion-danger-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  <div>Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--success Alert--center color-scheme-on-emotion-success-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#success" />
  </svg>
  <div>We sent you an activation link to email <strong>spirit@lmc.eu</strong>.</div>
</div>

<div class="Alert Alert--informative Alert--center color-scheme-on-emotion-informative-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>
    Data update failed due to missing internet connection Data update failed due to missing internet connection Data
    update failed due to missing internet connection Data update failed due to missing internet connection Data update
    failed due to missing internet connection Data update failed due to missing internet connection
  </div>
</div>

<div class="Alert Alert--warning Alert--center color-scheme-on-emotion-warning-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#warning" />
  </svg>
  <div><strong>Warning!</strong> Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--danger Alert--center color-scheme-on-emotion-danger-subtle">
  <svg class="Icon" width="24" height="24">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  <div>Data update failed due to missing internet connection</div>
</div>
```

[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
