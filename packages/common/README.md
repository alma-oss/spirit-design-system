# @alma-oss/spirit-common

> Common code, scripts, constants and settings of the Spirit Design System.

## Install

⚠️ This package is not published to npm.

## Usage

⚠️ This package is only used as a development dependency of other packages in the Spirit Design System.

```js
import { environments } from '@alma-oss/spirit-common/constants/environments';
```

### `cssLengthToPixels()`

Converts a CSS length string (`'1rem'`, `'24px'`) to a pixel number at runtime. Falls back to
`16` in SSR / DOM-less environments.

```ts
import { cssLengthToPixels } from '@alma-oss/spirit-common/utilities';

cssLengthToPixels('1rem'); // → 16
cssLengthToPixels('24px'); // → 24
cssLengthToPixels('auto'); // → undefined
```

👉 See the [units guide][units-guide] for full context.

## License

See the [LICENSE](LICENSE.md) file for information.

[units-guide]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/contribution/units.md
