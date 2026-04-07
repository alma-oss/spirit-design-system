import type { Decorator } from '@storybook/react';
import { IconsProvider } from '@alma-oss/spirit-web-react';
import icons from '@alma-oss/spirit-icons/icons';

// Add debug logging to help identify deployment issues
if (!icons || Object.keys(icons).length === 0) {
  console.warn(
    '[Storybook] Warning: Icons not loaded or empty. Check that @alma-oss/spirit-icons/dist/icons.mjs exists and is properly bundled.',
    { iconsLength: icons ? Object.keys(icons).length : 'undefined', iconsType: typeof icons },
  );
}

export const IconGlobalDecorator: Decorator = (Story, context) => (
  <IconsProvider value={icons || {}}>
    <Story {...context} />
  </IconsProvider>
);
