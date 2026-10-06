import { buildCode, getSnippetAttributes } from '../playgroundSnippet';

const jsxLine = (source: string) => source.split('\n').find((line) => line.includes('<Button'));

describe('buildCode', () => {
  it('renders a default Button', () => {
    expect(jsxLine(buildCode('Button', [], 'Button').join('\n'))).toBe('    <Button>Button</Button>');
  });

  it('keeps a changed color in a quoted attribute', () => {
    expect(jsxLine(buildCode('Button', [{ name: 'color', value: 'danger' }], 'Button').join('\n'))).toBe(
      '    <Button color="danger">Button</Button>',
    );
  });

  it('wraps children that contain markup', () => {
    expect(jsxLine(buildCode('Button', [], '<b>').join('\n'))).toBe('    <Button>{"<b>"}</Button>');
  });

  it('wraps an attribute value that contains a quote', () => {
    const value = 'say "hi"';

    expect(jsxLine(buildCode('Button', [{ name: 'label', value }], 'Button').join('\n'))).toBe(
      `    <Button label={${JSON.stringify(value)}}>Button</Button>`,
    );
  });

  it('keeps an ampersand literal in children', () => {
    const children = '&copy;';

    expect(jsxLine(buildCode('Button', [], children).join('\n'))).toBe(
      `    <Button>{${JSON.stringify(children)}}</Button>`,
    );
  });
});

describe('getSnippetAttributes', () => {
  const size = {
    name: 'size',
    type: 'select' as const,
    options: ['small', 'medium', 'large'],
    defaultValue: 'large',
  };
  const isDisabled = { name: 'isDisabled', type: 'boolean' as const, defaultValue: false };

  it('emits a string prop that equals the playground default', () => {
    const attributes = getSnippetAttributes([size], { size: 'large' });

    expect(jsxLine(buildCode('Button', attributes, 'Button').join('\n'))).toBe(
      '    <Button size="large">Button</Button>',
    );
  });

  it('omits a boolean prop that is false', () => {
    const attributes = getSnippetAttributes([isDisabled], { isDisabled: false });

    expect(jsxLine(buildCode('Button', attributes, 'Button').join('\n'))).toBe('    <Button>Button</Button>');
  });

  it('emits a boolean prop that is true', () => {
    const attributes = getSnippetAttributes([isDisabled], { isDisabled: true });

    expect(jsxLine(buildCode('Button', attributes, 'Button').join('\n'))).toBe(
      '    <Button isDisabled>Button</Button>',
    );
  });
});
