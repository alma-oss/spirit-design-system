# SkipLink

The `SkipLink` component is used to provide a way for users to skip directly to, e.g. the main content of a page,
improving accessibility for keyboard and screen reader users.

## Usage

```html
<body>
  <a href="#main-content" class="SkipLink"> Skip to main content </a>
  <!-- Other navigation elements -->
  <main id="main-content">
    <!-- Main content -->
  </main>
</body>
```

⚠️ In the case you want to skip repetitive main navigation, ensure that the `SkipLink` is placed at the top of the page
before this navigation.

If you need to provide multiple skip links, wrap them in a `<nav>` element:

```html
<body>
  <nav aria-label="Skip links">
    <a href="#main-content" class="SkipLink"> Skip to main content </a>
    <a href="#footer-content" class="SkipLink"> Skip to footer content </a>
  </nav>
  <!-- Other navigation elements -->
  <main id="main-content">
    <!-- Main content -->
  </main>
  <footer id="footer-content">
    <!-- Footer content -->
  </footer>
</body>
```

### 👍 When to Use

- Provide a way for sighted keyboard or screen reader users to bypass repetitive (e.g. main navigation
  links) or any other structurally complex content (e.g. tables) and access the main content directly.
- To satisfy the accessibility standard [WCAG 2.2 Guideline 2.4.1 Bypass Blocks][wcag-bypass-blocks].

### 👎 When Not to Use

- If the page has a few navigable items or minimal repetitive content.

[wcag-bypass-blocks]: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html
