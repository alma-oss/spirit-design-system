export default {
  rules: {
    // Allow UNSTABLE_Component classnames
    // @see: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
    'selector-class-pattern': [
      '(^(UNSTABLE_)?([A-Z][a-zA-Z0-9]*)((--|__)[a-z][a-zA-Z0-9]*)*$)|(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)',
      {
        message: `Expected class selector to be in format \`MyComponent__myElement\`, \`MyComponent--modifier\`
or \`kebab-case\` for utility classes. \`UNSTABLE_MyComponent\` is allowed for unsafe components.
(selector-class-pattern)`,
      },
    ],
  },
};
