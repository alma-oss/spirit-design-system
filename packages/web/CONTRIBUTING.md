# Contributing

> Guide for Spirit contributors.

## Table of Contents

1. [File Structure](#file-structure)
2. [Structuring Styles](#structuring-styles)
3. [Linking Design Tokens](#linking-design-tokens)
4. [Migrating Your Components to Spirit](#migrating-your-components-to-spirit)
5. [FAQ](#faq)

## File Structure

This is an example of a typical file structure of a component:

```txt
├── src
    ├── scss
    │   └── components
    │       └── <ComponentName>
    │           ├── _<ComponentName>.scss — component's styling
    │           ├── _theme.scss — contains references to design tokens and variant maps
    │           ├── _tools.scss — Sass functions and mixins, mostly to generate variants
    │           ├── index.scss — component's Sass entry point
    │           ├── index.html — component's preview page
    │           └── README.md — documentation of the component
    └── js
        ├── <ComponentName>.ts — component's scripts
        ├── constants.ts — common constants
        ├── __tests__/<ComponentName>.test.ts — component's test
        ├── index.esm.ts — component's ESM entry point
        └── index.umd.ts — component's UMD entry point

```

## Structuring Styles

To keep actual stylesheet of the component as clean as possible, definitions of
Sass variables, functions and mixins related to the component always have their
place in standalone Sass partials, namely `_theme.scss` (theme) and
`_tools.scss` (tools).

### `_theme.scss`

Component's theme serves as:

1. a centralized storage of component's references to **design tokens** (see
   further),
2. a place where **component's visual variants** are defined as Sass maps, so we
   can iterate over them later on,
3. a source of definition of other Sass variables of the component.

### `_tools.scss`

Similarly, component's tools serve as a storage of component-scoped:

1. Sass **mixins,** mostly to generate visual variants from theme,
2. Sass **functions.**

## Linking Design Tokens

Component's theme properties are very often linked to [design tokens][design-tokens]. This way, the
appearance of individual components is always unified and coherent: **anytime
design tokens change, all components are updated consistently.**

Deciding which properties are linked to which design tokens is a subject of
discussion between Spirit developers and designers. Linking component
properties to design tokens needs to be done carefully **in order for the design
to work as a system.**

Default Spirit design tokens live in the [`spirit-design-tokens`][design-tokens] package.
Products may define their own design tokens as long as they preserve the same
structure and naming.

### Sass Implementation

When contributing to Spirit Sass styles, always [link Spirit design tokens][design-tokens-in-sass]
with a [configured load path][design-tokens-in-sass]. This is crucial for the
[rebranding][rebranding] functionality of Spirit.

From the implementation point of view, design tokens are Sass variables
organized in Sass modules. Within component styles, Sass modules with design
tokens are referred to just by filename. However, because the modules do not
exist in the place they are called in (the [`spirit-design-tokens`][design-tokens] package is
stored in `node_modules`), the correct load path for the desired set of design
tokens must be [provided on build time][design-tokens-in-sass]. This is the only
way how Sass modules can be affected from outside, without giving in their
advantages.

#### Example

At first, let's define a reference to design tokens in component's theme:

```scss
// src/components/Button/_theme.scss

@use '@tokens' as tokens;

$border-radius: tokens.$radius-100;
```

Now use the reference from the theme in component styles:

```scss
// src/components/Button/_Button.scss

@use 'theme';

.Button {
  border-radius: theme.$border-radius;
}
```

## Documenting

### JavaScript

Our JavaScript plugins are documented in components' `README.md` files in the `src/scss` directory.
The documentation should include these sections:

- Information that a JavaScript plugin is available, usually at the top of the README.
- JavaScript Plugin API — a list of available options and methods, including an example.
- JavaScript Events — a list of events that the plugin emits, including an example.
- As many examples as necessary throughout the whole README.

👉 We usually document only the “key” class methods which might be also described as
“methods that do not call any other methods”.

## Testing

- `% cd <your-local-path>/spirit-design-system/packages/web`
- `% yarn test` for test package (lint, format, unit testing, types)
- `% yarn test:unit` for unit tests

### Sass Unit Testing

We use [sass-true][sass-true] for unit testing of our Sass components. The
tests are located in `src/scss/components/<ComponentName>/__tests__` and are
named `<ComponentName>.test.scss`. The tests are run as a part of the Jest
testing suite. Our primary focus is on testing mixins and functions as they
are the most complex parts of our Sass components.

## Migrating Your Components to Spirit

### Code Conventions

Before pushing your components to Spirit, make sure it meets code conventions
specified in this document.

### Rebranding Readiness

To make your code ready for rebranding before moving to Spirit:

1. Remove full path to your `@tokens` whenever it's @used:

   ```diff
   - @use '../path/to/my/design/@tokens' as tokens;
   + @use '@tokens' as tokens;
   ```

2. Add the previously removed path to load paths of your Sass compiler.
   See the [`spirit-design-tokens` docs][design-tokens-in-sass] to learn how to
   do that.

3. Try using another `@tokens` file with a different brand and see how your
   code reacts on the change.

## FAQ

<details>
<summary>What are design tokens?</summary>

Design tokens are special variables that define the smallest pieces of a design
language, especially colors, typography, or spacing. Design tokens enable
adjusting the common parts of visual design.

</details>

<details>
<summary>What are Sass modules?</summary>

Sass modules are a [new way of organizing Sass source][sass-modules]. Aside
from new methods of structuring and loading Sass files, Sass modules offer a
great portion of encapsulation, traceability, and more.

</details>

<details>
<summary>Does <code>@use</code> behave the same way as <code>@import</code>?</summary>

In most situations, no. Most importantly, while `@import` loads everything into
global context, `@use` is scoped and works more like `import` in [ES modules][es-modules].

</details>

<details>
<summary>Why are <code>@tokens</code> prefixed with <code>@</code>?</summary>

By prefixing a Sass file name with `@`, we communicate that such file is loaded
in a special way. Read more about it in
[`spirit-design-tokens` docs][design-tokens-faq].

</details>

<details>
<summary>What are <code>.is-*</code> and <code>.has-*</code> CSS classes and is there a convention for CSS/JS selectors?</summary>

CSS and JS development is very often done by different people. However, they both meet in the same place: HTML.
To avoid conflicts, we need a convention to distinguish situations when something is accessed by both CSS and JS.

- `.Component` classes, helper classes and utilities can be used by **CSS only**,
- `.is-*` and `.has-*` classes, `data-*` and other attributes can be used by both **CSS and JS**,
- `id` attribute can be used by **JS only**.
</details>

[design-tokens]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/design-tokens
[design-tokens-in-sass]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/design-tokens#in-sass
[design-tokens-faq]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/design-tokens#faq
[rebranding]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web#rebranding
[sass-modules]: https://sass-lang.com/blog/the-module-system-is-launched
[es-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[sass-true]: https://github.com/oddbird/true
