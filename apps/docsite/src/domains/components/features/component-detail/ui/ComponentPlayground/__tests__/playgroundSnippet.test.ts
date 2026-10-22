import { buildCode } from '../playgroundSnippet';

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
});
