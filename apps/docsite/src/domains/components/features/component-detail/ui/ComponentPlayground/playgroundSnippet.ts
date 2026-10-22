export interface SnippetAttribute {
  name: string;
  value?: string;
}

const needsJsxString = (value: string) => /["\\\n\r]/.test(value);

const needsJsxChildren = (children: string) => /[{}<>]/.test(children);

export const formatAttribute = ({ name, value }: SnippetAttribute) => {
  if (value === undefined) {
    return name;
  }

  return needsJsxString(value) ? `${name}={${JSON.stringify(value)}}` : `${name}="${value}"`;
};

const formatChildren = (children: string) => (needsJsxChildren(children) ? `{${JSON.stringify(children)}}` : children);

const importLine = (what: string, from: string) => (what ? `import ${what} from '${from}';` : `import '${from}';`);

const IMPORT_LINES = ['themes', 'foundation', 'components', 'helpers', 'utilities'].map((name) =>
  importLine('', `@alma-oss/spirit-web/css/${name}.css`),
);

export const buildCode = (component: string, attributes: SnippetAttribute[], children: string) => {
  const renderedChildren = formatChildren(children);
  const isMultiline = attributes.length > 2;
  const jsx = isMultiline
    ? [
        `<${component}`,
        ...attributes.map((attribute) => `  ${formatAttribute(attribute)}`),
        '>',
        `  ${renderedChildren}`,
        `</${component}>`,
      ]
    : [`${[`<${component}`, ...attributes.map(formatAttribute)].join(' ')}>${renderedChildren}</${component}>`];

  return [
    importLine('React', 'react'),
    importLine(`{ ${component} }`, '@alma-oss/spirit-web-react'),
    ...IMPORT_LINES,
    '',
    'export default function Example() {',
    '  return (',
    ...jsx.map((line) => `    ${line}`),
    '  );',
    '}',
  ];
};
