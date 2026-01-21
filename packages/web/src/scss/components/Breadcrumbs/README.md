# Breadcrumbs

Shows where the user is within the app hierarchy.

## Usage

```html
<nav aria-label="Breadcrumb" class="Breadcrumbs">
  <ol>
    <li class="d-none d-tablet-flex">
      <a href="#rootUrl" class="link-primary link-underlined">Root</a>
      <svg width="24" height="24">
        <use xlink:href="/icons/svg/sprite.svg#chevron-right" />
      </svg>
    </li>
    <li class="d-none d-tablet-flex">
      <a href="#categoryUrl" class="link-primary link-underlined">Category</a>
      <svg width="24" height="24">
        <use xlink:href="/icons/svg/sprite.svg#chevron-right" />
      </svg>
    </li>
    <li class="d-tablet-none">
      <svg width="24" height="24">
        <use xlink:href="/icons/svg/sprite.svg#chevron-left" />
      </svg>
      <a href="#subcategoryUrl" class="link-primary link-underlined">Back</a>
    </li>
    <li class="d-none d-tablet-flex">
      <a href="#subcategoryUrl" class="link-primary link-underlined">Subcategory</a>
      <svg width="24" height="24">
        <use xlink:href="/icons/svg/sprite.svg#chevron-right" />
      </svg>
    </li>
    <li class="d-none d-tablet-flex">
      <a href="#currentUrl" aria-current="page" class="link-secondary">Current page</a>
    </li>
  </ol>
</nav>
```

### Dealing with Long Titles

When you need to shorten the title of the Breadcrumbs item you can use a helper class `text-truncate` with defined width.

For comprehensive guidance on handling text truncation, translations, and multiple string length scenarios, see the [Content Truncating Guidelines][truncation].

```html
<!-- … --->
<li class="d-none d-tablet-flex">
  <a href="#currentUrl" aria-current="page" class="link-secondary text-truncate" style="max-width: 100px;">
    This is a very long title of the current page
  </a>
  <svg width="24" height="24">
    <use xlink:href="/icons/svg/sprite.svg#chevron-right" />
  </svg>
</li>
<!-- … --->
```

[truncation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/TRUNCATING.md#breadcrumbs
