# Collapse

Example usage with button:

```html
<button type="button" role="button" data-spirit-toggle="collapse" data-spirit-target="collapse-example">trigger</button>
<div id="collapse-example" class="Collapse">
  <div class="Collapse__content">content</div>
</div>
```

Usage with link:

```html
<a role="button" href="javascript:void(0)" data-spirit-toggle="collapse" data-spirit-target="collapse-example">
  trigger
</a>
...
```

Open on load example:

```html
<button ... aria-expanded="true">trigger</button>
<div id="collapse-example" class="Collapse is-open">
  <div class="Collapse__content">content</div>
</div>
```

Responsive usage for tablet

```html
...
<button ... class="d-tablet-none">trigger</button>
<div id="collapse-example" class="Collapse" data-spirit-breakpoint="tablet">
  <div class="Collapse__content">...</div>
</div>
```

Hide button when collapse

```html
<button ... data-spirit-is-disposable>trigger</button> ...
```

## Trigger Attributes

| Name                        | Type     | Default    | Required | Description                                                                                                         |
| --------------------------- | -------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `aria-controls`             | `string` | —          | ✕        | Aria controls state (auto)                                                                                          |
| `aria-expanded`             | `string` | —          | ✕        | Aria expanded state (auto)                                                                                          |
| `data-spirit-is-disposable` | `bool`   | —          | ✕        | For hide on collapse as more trigger                                                                                |
| `data-spirit-more`          | `bool`   | —          | ✕        | [**DEPRECATED**][readme-deprecations] in favor of `data-spirit-is-disposable`; For hide on collapse as more trigger |
| `data-spirit-target`        | `string` | —          | ✓        | Target selector                                                                                                     |
| `data-spirit-toggle`        | `string` | `collapse` | ✓        | Iterable selector                                                                                                   |

### ⚠️ DEPRECATION NOTICE

Data attribute `data-spirit-more` is deprecated and will be removed in the next major release. Use `data-spirit-is-disposable` attribute instead.

[What are deprecations?][readme-deprecations]

## Wrapper Attributes

| Name                     | Type                     | Default | Required | Description                                                                               |
| ------------------------ | ------------------------ | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `data-spirit-breakpoint` | \[`tablet` \| `desktop`] | —       | ✕        | [Breakpoint][dictionary-breakpoint] on which the collapsed content is forced to reveal \* |
| `data-spirit-parent`     | `string`                 | —       | ✕        | A parent element selector that ensures that only one item is opened \*\*                  |

There can be several triggers, the same rules apply to each.

(\*) The mobile breakpoint rule doesn't exist because it doesn't make sense given the implementation because it always stays hidden.

(\*\*) Attribute for Accordion implementation

## State Classes

The component provides auto toggle attributes and classes, like `.is-open` when triggered or initiated.
It also provides `.is-transitioning` class switching during animation. This means that `.Collapse.is-transitioning` during
opening and `.Collapse.is-open.is-transitioning` during closing.

## JavaScript Plugin

For full functionality, you need to provide JavaScript which will handle toggling of the Collapse component.

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

## JavaScript API

### Methods

| Method                | Description                                                                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getInstance`         | _Static_ method which allows you to get the collapse instance associated with a DOM element                                                                                                                                                              |
| `getOrCreateInstance` | _Static_ method which allows you to get the collapse instance associated with a DOM element, or create a new one in case it wasn’t initialized.                                                                                                          |
| `hide`                | Hides collapse. Returns to the caller before the collapse has actually been hidden (i.e. before the `hidden.collapse` event occurs). This is considered a “manual” triggering of the collapse.                                                           |
| `show`                | Reveals collapse. **Returns to the caller before the collapse has actually been shown** (i.e. before the `shown.collapse` event occurs). This is considered a “manual” triggering of the collapse. Tooltips with zero-length titles are never displayed. |
| `toggle`              | Toggles collapse. **Returns to the caller before the collapse has actually been shown or hidden** (i.e. before the `shown.collapse` or `hidden.collapse` event occurs). This is considered a “manual” triggering of the collapse.                        |

```js
const collapse = Collapse.getInstance('#example'); // Returns a collapse instance

collapse.show();
```

### Events

| Method            | Description                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `hide.collapse`   | This event is fired immediately when the `hide` instance method has been called.      |
| `hidden.collapse` | This event is fired when the `hide` instance has finished being hidden from the user. |
| `show.collapse`   | This event fires immediately when the `show` instance method is called.               |
| `shown.collapse`  | This event is fired when the `show` instance has finished being shown to the user.    |

```js
const myCollapseEl = document.getElementById('my-collapse');
const collapse = Collapse.getOrCreateInstance(myCollapseEl);

myCollapseEl.addEventListener('hidden.collapse', () => {
  // do something...
});

collapse.hide();
```

Please consult [main package README][web-readme] for how to include JavaScript plugins.

Or feel free to write controlling scripts yourself.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#deprecations
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
