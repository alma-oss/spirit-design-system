# Elements

Element helpers are tiny CSS classes for common layout behaviors on interactive content.

## Stretched

Use `element-stretched` to stretch an element's hit area over the nearest ancestor with
`position: relative` via a `::before` pseudo-element. This is useful when a label or control
should make a larger parent region clickable.

```html
<div style="position: relative;" class="bg-secondary py-600 px-600">
  <span>Ancestor with position: relative</span>
  <a href="#" class="element-stretched link-primary">Stretched link</a>
</div>
```

ℹ️ The stretched pseudo-element uses `inset: 0` by default. Override it with the
`--spirit-element-stretched-inset` custom property on a positioned ancestor when the hit area
should extend beyond the content box — for example past a border:

```html
<div style="position: relative; --spirit-element-stretched-inset: -1px;" class="border-100 border-solid">
  <a href="#" class="element-stretched link-primary">Stretched over border</a>
</div>
```
