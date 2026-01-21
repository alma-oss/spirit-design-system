export const escapeHatchArgTypes = {
  UNSAFE_className: {
    control: { type: 'text' },
    description: `Appends additional [class names](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) to the rendered element.

⚠️ Only use as a **last resort**. Use [style props](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props) instead.

🔍 [Escape hatches](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches)`,
    table: {
      type: { summary: 'string | undefined' },
      defaultValue: { summary: 'undefined' },
      category: 'Escape hatches',
    },
  },
  UNSAFE_style: {
    control: { type: 'object' },
    description: `Applies inline [styles](https://developer.mozilla.org/en-US/docs/Web/API/Element/style) to the rendered element.

⚠️ Only use as a **last resort**. Use [style props](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props) instead.

🔍 [Escape hatches](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches)`,
    table: {
      type: { summary: 'React.CSSProperties | undefined' },
      defaultValue: { summary: 'undefined' },
      category: 'Escape hatches',
    },
  },
} as const;

export const escapeHatchArgs = {
  UNSAFE_className: undefined,
  UNSAFE_style: undefined,
} as const;
