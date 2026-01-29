/**
 * This test file is based on the original `html-react-parser` test file.
 *
 * @see { @link https://github.com/remarkablemark/html-react-parser/blob/master/__tests__/index.test.tsx }
 */
import { htmlReactParser } from '../htmlReactParser';

const html = {
  single: '<p>foo</p>',
  multiple: '<p>foo</p><p>bar</p>',
  nested: '<div><p>foo <em>bar</em></p></div>',
  attributes: '<hr id="foo" class="bar baz" style="background:#fff;text-align:center" data-foo="bar"/>',
  complex:
    '<html><head><meta charSet="utf-8"/><title>Title</title><link rel="stylesheet" href="style.css"/></head><body><header id="header">Header</header><h1 style="color:#000;font-size:42px">Heading</h1><hr/><p>Paragraph</p><img src="image.jpg"/><div class="class1 class2">Some<em>text</em>.</div><script>alert();</script></body></html>',
  textarea: '<textarea>foo</textarea>',
  script: '<script>alert(1 < 2);</script>',
  style: '<style>body > .foo { color: #f00; }</style>',
  img: '<img src="http://stat.ic/img.jpg" alt="Image"/>',
  void: '<link/><meta/><img/><br/><hr/><input/>',
  comment: '<!-- comment -->',
  doctype: '<!DOCTYPE html>',
  title: '<title><em>text</em></title>',
  customElement:
    '<custom-element class="myClass" custom-attribute="value" style="-o-transition: all .5s; line-height: 1;"></custom-element>',
  form: '<input type="text" value="foo" checked="checked">',
  list: '<ol><li>One</li><li value="2">Two</li></ol>',
  template: '<template><article><p>Test</p></article></template>',
} as const;

const svg = {
  simple: '<svg viewBox="0 0 512 512" id="foo">Inner</svg>',
  complex:
    '<svg height="400" width="450"><path id="lineAB" d="M 100 350 l 150 -300" stroke="red" stroke-width="3" fill="none"></path><g stroke="black" stroke-width="3" fill="black"><circle id="pointA" cx="100" cy="350" r="3"></circle></g><g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="100" y="350" dx="-30">A</text></g>Your browser does not support inline SVG.</svg>',
} as const;

describe('htmlReactParser', () => {
  it.each([undefined, null, {}, [], true, false, 0, 1, () => {}, new Date()])('throws error for value: %p', (value) => {
    expect(() => {
      htmlReactParser(value as string);
    }).toThrow(TypeError);
  });

  it('parses "" to []', () => {
    expect(htmlReactParser('')).toEqual([]);
  });

  it('returns string if it is not HTML', () => {
    const string = 'text';
    expect(htmlReactParser(string)).toBe(string);
  });

  it('parses single HTML element', () => {
    expect(htmlReactParser(html.single)).toMatchInlineSnapshot(`
      <p>
        foo
      </p>
    `);
  });

  it('parses single HTML element with comment', () => {
    // comment should be ignored
    expect(htmlReactParser(html.single + html.comment)).toMatchInlineSnapshot(`
      <p>
        foo
      </p>
    `);
  });

  it('parses multiple HTML elements', () => {
    expect(htmlReactParser(html.multiple)).toMatchInlineSnapshot(`
      [
        <p>
          foo
        </p>,
        <p>
          bar
        </p>,
      ]
    `);
  });

  it('parses complex HTML with doctype', () => {
    expect(htmlReactParser(html.doctype + html.complex)).toMatchInlineSnapshot(`
      <html>
        <head>
          <meta
            charSet="utf-8"
          />
          <title>
            Title
          </title>
          <link
            href="style.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <header
            id="header"
          >
            Header
          </header>
          <h1
            style={
              {
                "color": "#000",
                "fontSize": "42px",
              }
            }
          >
            Heading
          </h1>
          <hr />
          <p>
            Paragraph
          </p>
          <img
            src="image.jpg"
          />
          <div
            className="class1 class2"
          >
            Some
            <em>
              text
            </em>
            .
          </div>
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "alert();",
              }
            }
          />
        </body>
      </html>
    `);
  });

  it('parses empty <script>', () => {
    expect(htmlReactParser('<script></script>')).toMatchInlineSnapshot('<script />');
  });

  it('parses empty <style>', () => {
    expect(htmlReactParser('<style></style>')).toMatchInlineSnapshot('<style />');
  });

  it('parses form', () => {
    expect(htmlReactParser(html.form)).toMatchInlineSnapshot(`
      <input
        defaultChecked={true}
        defaultValue="foo"
        type="text"
      />
    `);
  });

  it('parses list', () => {
    expect(htmlReactParser(html.list)).toMatchInlineSnapshot(`
      <ol>
        <li>
          One
        </li>
        <li
          value="2"
        >
          Two
        </li>
      </ol>
    `);
  });

  it('parses template', () => {
    expect(htmlReactParser(html.template)).toMatchInlineSnapshot(`
      <template>
        <article>
          <p>
            Test
          </p>
        </article>
      </template>
    `);
  });

  it('parses SVG', () => {
    expect(htmlReactParser(svg.complex)).toMatchInlineSnapshot(`
      <svg
        height="400"
        width="450"
      >
        <path
          d="M 100 350 l 150 -300"
          fill="none"
          id="lineAB"
          stroke="red"
          strokeWidth="3"
        />
        <g
          fill="black"
          stroke="black"
          strokeWidth="3"
        >
          <circle
            cx="100"
            cy="350"
            id="pointA"
            r="3"
          />
        </g>
        <g
          fill="black"
          fontFamily="sans-serif"
          fontSize="30"
          stroke="none"
          textAnchor="middle"
        >
          <text
            dx="-30"
            x="100"
            y="350"
          >
            A
          </text>
        </g>
        Your browser does not support inline SVG.
      </svg>
    `);
  });

  it('decodes HTML entities', () => {
    const encodedEntities = 'asdf &amp; &yuml; &uuml; &apos;';

    const decodedEntities = "asdf & ÿ ü '";
    const reactElement = htmlReactParser(`<i>${encodedEntities}</i>`) as JSX.Element;
    expect(reactElement.props.children).toBe(decodedEntities);
  });

  it('escapes tags inside of <title>', () => {
    expect(htmlReactParser(html.title)).toMatchInlineSnapshot(`
      <title>
        &lt;em&gt;text&lt;/em&gt;
      </title>
    `);
  });
});
