# SkipLink

The `SkipLink` component is used to provide a way for users to skip directly to, e.g. the main content of a page, improving accessibility for keyboard and screen reader users.

```tsx
<SkipLink href="#main-content">Skip to main content</SkipLink>
```

## Usage

```tsx
<body>
  <SkipLink href="#main-content">Skip to main content</SkipLink>
  {/* Other navigation elements */}
  <main id="main-content">{/* Main content */}</main>
</body>
```

⚠️ In the case you want to skip repetitive main navigation, ensure that the `SkipLink` is placed at the top of the page before this navigation.

If you need to provide multiple skip links, wrap them in a `<nav>` element:

```tsx
<body>
  <nav aria-label="Skip links">
    <SkipLink href="#main-content">Skip to main content</SkipLink>
    <SkipLink href="#footer-content">Skip to footer content</SkipLink>
  </nav>
  {/* Other navigation elements */}
  <main id="main-content">{/* Main content */}</main>
  <footer id="footer-content">{/* Footer content */}</footer>
</body>
```

### 👍 When to Use

- Provide a way for sighted keyboard or screen reader users to bypass repetitive (e.g. main navigation links) or any other structurally complex content (e.g. tables) and access the main content directly.
- To satisfy the accessibility standard [WCAG2.0 Guideline 2.4.1 Bypass Blocks][wcag-bypass-blocks].

### 👎 When Not to Use

- If the page has a few navigable items or minimal repetitive content.

## API

| Name          | Type                                          | Default | Required | Description                 |
| ------------- | --------------------------------------------- | ------- | -------- | --------------------------- |
| `elementType` | `ElementType`                                 | `a`     | ✕        | Type of element used        |
| `href`        | `string`                                      | —       | ✕        | SkipLink's href attribute   |
| `target`      | \[`_blank` \| `_self` \| `_parent` \| `_top`] | —       | ✕        | SkipLink's target attribute |

[wcag-bypass-blocks]: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html
