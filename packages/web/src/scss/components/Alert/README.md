# Alert

Variants:

Alert supports emotion color variants. Apply the matching `color-scheme-on-*` helper to each variant:

```html
<div class="Alert Alert--success color-scheme-on-emotion-success-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>We sent you an activation link to email <strong>spirit@lmc.eu</strong>.</div>
</div>

<div class="Alert Alert--informative color-scheme-on-emotion-informative-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>
    Data update failed due to missing internet connection Data update failed due to missing internet connection Data
    update failed due to missing internet connection Data update failed due to missing internet connection Data update
    failed due to missing internet connection Data update failed due to missing internet connection
  </div>
</div>

<div class="Alert Alert--warning color-scheme-on-emotion-warning-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#warning" />
  </svg>
  <div><strong>Warning!</strong> Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--danger color-scheme-on-emotion-danger-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
  <div>Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--success Alert--center color-scheme-on-emotion-success-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>We sent you an activation link to email <strong>spirit@lmc.eu</strong>.</div>
</div>

<div class="Alert Alert--informative Alert--center color-scheme-on-emotion-informative-subtle">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#info" />
  </svg>
  <div>
    Data update failed due to missing internet connection Data update failed due to missing internet connection Data
    update failed due to missing internet connection Data update failed due to missing internet connection Data update
    failed due to missing internet connection Data update failed due to missing internet connection
  </div>
</div>

<div class="Alert Alert--warning Alert--center color-scheme-on-emotion-warning-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#warning" />
  </svg>
  <div><strong>Warning!</strong> Data update failed due to missing internet connection</div>
</div>

<div class="Alert Alert--danger Alert--center color-scheme-on-emotion-danger-subtle mb-600">
  <svg class="Icon" width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
  <div>Data update failed due to missing internet connection</div>
</div>
```
