# @alma-oss/vite-plugin-spirit-icons

Vite plugin for generating Spirit Design System icons from SVG files.

## Installation

```bash
npm install --save-dev @alma-oss/vite-plugin-spirit-icons vite
```

## Usage

### Setup

Add the plugin to your `vite.config.ts`:

```typescript
import { spiritIconsPlugin } from '@alma-oss/vite-plugin-spirit-icons';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [spiritIconsPlugin()],
});
```

Place your SVG files in `src/svg/` (or configure via `svgDir` option).

### Importing Generated Assets

After building, you can import the generated React components, SVG assets, and icon constants:

```typescript
// React components
import { AddIcon, DownloadIcon, SearchIcon } from './dist/react';

// Raw SVG files
import addSvg from './dist/svg/add.svg?raw';

// Icon constants (SVG innerHTML)
import icons from './dist/icons';

// Use in React
export function MyComponent() {
  return (
    <>
      <AddIcon width={24} height={24} />
      <SearchIcon />
    </>
  );
}
```

## How It Works

The plugin generates icon assets through a multi-step build process:

1. **SVG Processing** — Normalizes SVG colors based on icon type (default, dualtone, colored) and creates a sprite sheet
2. **React Component Generation** — Converts SVGs to React components using `svg2react-icon`
3. **Constants Generation** — Creates a TypeScript constants file with SVG innerHTML for each icon
4. **Output Structure** — Generates entry points for React components, raw SVGs, and icon constants

### Build Output

When you run `vite build`, the plugin generates:

- **React components:** `dist/react/*.tsx` (one per SVG)
- **Icon constants:** `dist/icons.ts` (SVG innerHTML as constants)
- **SVG assets:** `dist/svg/*.svg` (normalized SVG files + sprite sheet)
- **Entry points:** `dist/index.ts`, `dist/react/index.ts`

## Configuration

```typescript
interface SpiritIconsPluginOptions {
  /** Source SVG directory, relative to Vite root. Default: 'src/svg' */
  svgDir?: string;
  /** Staging directory for generated TS files. Default: '.icons-tmp' */
  stagingDir?: string;
  /** SVG output subdirectory within dist. Default: 'svg' */
  distSvgDir?: string;
}
```

### Multiple Icon Sets

The plugin can be used multiple times in one `vite.config.ts` — once per icon set:

```typescript
import { spiritIconsPlugin } from '@alma-oss/vite-plugin-spirit-icons';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    spiritIconsPlugin({
      svgDir: 'src/prace',
      stagingDir: '.icons-tmp-prace',
      distSvgDir: 'svg/prace',
    }),
    spiritIconsPlugin({
      svgDir: 'src/jobs',
      stagingDir: '.icons-tmp-jobs',
      distSvgDir: 'svg/jobs',
    }),
  ],
});
```

When using multiple instances, each `stagingDir` must be unique to avoid collisions.

## License

MIT
