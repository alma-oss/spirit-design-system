import { Inter, Roboto_Mono as RobotoMono } from 'next/font/google';

// Bindings are required by next/font. Importing this module emits @font-face
// for Spirit's `'Inter'` and `'Roboto Mono'` families; the class names are unused.
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const robotoMono = RobotoMono({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontshareApiUrl = 'https://api.fontshare.com';
export const generalSansStylesheet = `${fontshareApiUrl}/v2/css?f%5B%5D=general-sans@700&display=swap`;
