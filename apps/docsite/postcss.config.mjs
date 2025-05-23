export default {
  plugins: {
    'postcss-preset-env': {
      features: {
        // @TODO by @dlouhak: Revert once the `not` notation in media queries is safely supported in the PostCSS configuration in the Next.js.
        // The PostCSS compiles broken utility class with media query range because the `not` notation doesn't support parentheses.
        // @see { @link } https://github.com/vercel/next.js/issues/90133
        'media-query-ranges': true,
      },
    },
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};
