# `web-react` v3 Codemods

This is a collection of codemods for updating Web-React v3 components.

You can find instructions on how to run these codemods in the main package [README](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md).

## Included Scripts

### `v3/web-react/link-underlined-prop` — Link `isUnderlined` to `underlined` Prop Change

This codemod updates the `Link` component by replacing the `isUnderlined` prop with a new `underlined` prop, setting it to "always".

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/link-underlined-prop
```

#### Example

```diff
- <Link isUnderlined … />
+ <Link underlined="always" … />
```

### `v3/web-react/button-isSquare-prop-name` — Button `isSquare` to `isSymmetrical` Prop Change

This codemod updates the `Button` component by replacing the `isSquare` prop with a `isSymmetrical` prop.

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/button-isSquare-prop-name
```

#### Example

```diff
- <Button isSquare … />
+ <Button isSymmetrical … />
```

### `v3/web-react/buttonLink-isSquare-prop-name` — ButtonLink `isSquare` to `isSymmetrical` Prop Change

This codemod updates the `ButtonLink` component by replacing the `isSquare` prop with a `isSymmetrical` prop.

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/buttonLink-isSquare-prop-name
```

#### Example

```diff
- <ButtonLink isSquare … />
+ <ButtonLink isSymmetrical … />
```

### `v3/web-react/heading-elementType-prop` — Add `elementType="div"` to Heading Component

The `elementType` prop is now mandatory in the `Heading` component.
This codemod updates the `Heading` component by adding `elementType="div"` if the `elementType` prop is missing.

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/heading-elementType-prop
```

#### Example

```diff
- <Heading … />
+ <Heading elementType="div" … />
```

### `v3/web-react/link-hasVisitedStyleAllowed-prop` — Add `hasVisitedStyleAllowed` to Link Component Inside Heading Component

The Link component now allows to have visited state style. The `Heading` component had previously set visited state styling by default.
This codemod updates the `Link` component inside the `Heading` component by adding `hasVisitedStyleAllowed`.
Do not use this codemode if you don't want to allow visited state style for the `Link` component inside the `Heading` component.

This codemod updates the `Link` component inside `Heading` component by adding `hasVisitedStyleAllowed` prop.

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/link-hasVisitedStyleAllowed-prop
```

#### Example

```diff
- <Heading><Link … /></Heading>
+ <Heading><Link hasVisitedStyleAllowed … /></Heading>
```

### `v3/web-react/toastbar-inverted-neutral` — Replace `inverted` with `neutral` in ToastBar Component `color` Prop

The `inverted` variant was removed from the `ToastBar` component.
This codemod updates the `ToastBar` component by replacing the `inverted` value with `neutral` in the `color` prop.

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/toastbar-inverted-neutral
```

#### Example

```diff
- <ToastBar color="inverted" … />
+ <ToastBar color="neutral" … />
```
