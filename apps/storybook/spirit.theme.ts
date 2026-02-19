import { create } from 'storybook/theming/create';
import Logo from './assets/images/spirit-logo-inverse.svg';

export default create({
  base: 'light',

  colorPrimary: '#0b1c21',
  colorSecondary: '#77a6c0',

  // UI
  // appBg: '#132930',
  // appContentBg: '#fff',
  // appBorderColor: '#ebeaea',
  // appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Typography structure for addon-docs components
  typography: {
    fonts: {
      base: '"Inter", sans-serif',
      mono: 'monospace',
    },
  },

  // Text colors
  // textColor: '#132930',
  // textInverseColor: '#fff',

  // Toolbar default and active colors
  // barTextColor: 'rgba(255, 255, 255, .8)',
  // barSelectedColor: '#fff',
  // barBg: '#132930',

  // Form colors
  // inputBg: 'white',
  // inputBorder: 'silver',
  // inputTextColor: 'black',
  // inputBorderRadius: 4,

  brandTitle: 'Spirit Design System',
  brandImage: Logo,
});
