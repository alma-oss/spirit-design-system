import { urlToRelativeMarkdownPath } from '../buildOutputPath';
import { cleanPathSegment } from '../cleanSlug';
import { isExcludedCatalogPage, isExcludedComponentSubpage, isSkippedExtractUrl } from '../filterUrls';
import { titleForCanonicalPage } from '../pageTitle';
import { supernovaPathToDocsitePath } from '../rewriteLinks';
import { transformExtractedMarkdown } from '../transformMarkdown';

describe('cleanPathSegment', () => {
  it('strips mixed-case Supernova ids', () => {
    expect(cleanPathSegment('overview-oxxMcy7u')).toBe('overview');
    expect(cleanPathSegment('what-is-spirit-PDPDSQC7')).toBe('what-is-spirit');
  });

  it('strips all-lowercase id suffixes such as nrqxpchy', () => {
    expect(cleanPathSegment('accessibility-nrqxpchy')).toBe('accessibility');
    expect(cleanPathSegment('accessibility-nrqxpchy-nrqxpchy')).toBe('accessibility');
  });

  it('keeps short lowercase words', () => {
    expect(cleanPathSegment('what-is-spirit')).toBe('what-is-spirit');
    expect(cleanPathSegment('scroll-control')).toBe('scroll-control');
  });
});

describe('urlToRelativeMarkdownPath', () => {
  it('maps component tabs to Component Tab Pages', () => {
    expect(urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/components/button/overview-oxxMcy7u'))).toEqual({
      relativePath: 'components/button/overview.md',
      sourceSection: 'components',
    });
    expect(urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/components/button/design-iZBfrVzQ'))).toEqual({
      relativePath: 'components/button/design.md',
      sourceSection: 'components',
    });
  });

  it('writes Folder Landings as index.md', () => {
    expect(urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/design/intro-gefOL1Xb')).relativePath).toBe(
      'design/index.md',
    );
    expect(
      urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/design/global-tokens/spacing/overview-bGc59YZU'))
        .relativePath,
    ).toBe('design/global-tokens/spacing/index.md');
    expect(
      urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/introduction/spirit-design-system-tGrwryFa'))
        .relativePath,
    ).toBe('introduction/index.md');
    expect(
      urlToRelativeMarkdownPath(new URL('https://spirit.supernova-docs.io/latest/migrations/migrations-abcDEF12')).relativePath,
    ).toBe('migrations/index.md');
  });
});

describe('isSkippedExtractUrl', () => {
  it('skips component implementation tabs', () => {
    expect(isExcludedComponentSubpage(new URL('https://spirit.supernova-docs.io/latest/components/button/html-5rGayGNG'))).toBe(
      true,
    );
    expect(isExcludedComponentSubpage(new URL('https://spirit.supernova-docs.io/latest/components/button/react-nOaPrtDf'))).toBe(
      true,
    );
  });

  it('skips the all-components catalog', () => {
    expect(isExcludedCatalogPage(new URL('https://spirit.supernova-docs.io/latest/components/all-components-AbCdEf12'))).toBe(
      true,
    );
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/components/all-components-AbCdEf12'))).toBe(
      true,
    );
  });

  it('skips migrations and releases that already live in the repo', () => {
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/migrations/web-react/migration-to-v5-abcDEF12'))).toBe(
      true,
    );
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/releases/web-react-abcDEF12'))).toBe(true);
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/migrations/codemods-abcDEF12'))).toBe(true);
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/releases/releases-abcDEF12'))).toBe(true);
    expect(isSkippedExtractUrl(new URL('https://spirit.supernova-docs.io/latest/migrations/migrations-abcDEF12'))).toBe(
      false,
    );
  });
});

describe('supernovaPathToDocsitePath', () => {
  it('maps component overview to the Guidelines URL', () => {
    expect(supernovaPathToDocsitePath('/latest/components/button/overview-oxxMcy7u')).toBe('/components/button');
  });

  it('maps html and web tabs to /web', () => {
    expect(supernovaPathToDocsitePath('/latest/components/button/html-5rGayGNG')).toBe('/components/button/web');
    expect(supernovaPathToDocsitePath('/latest/components/button/web-abcDEF12')).toBe('/components/button/web');
  });

  it('drops overview from Folder Landings', () => {
    expect(supernovaPathToDocsitePath('/latest/design/global-tokens/spacing/overview-bGc59YZU')).toBe(
      '/design/global-tokens/spacing',
    );
  });

  it('maps the all-components catalog to the generated /components index', () => {
    expect(supernovaPathToDocsitePath('/latest/components/all-components-AbCdEf12')).toBe('/components');
  });
});

describe('transformExtractedMarkdown', () => {
  it('strips Turndown tab lists and on-this-page TOC, restores iframes, and rewrites links', () => {
    const input = `*   [Overview](/latest/components/button/overview-oxxMcy7u)
*   [Design](/latest/components/button/design-iZBfrVzQ)
*   [HTML](/latest/components/button/html-5rGayGNG)

A Button sits in the [hierarchy](/latest/design/visual-hierarchy-qk8QUbhU).

Embedded content: [iframe](https://embed.figma.com/design/example?embed\\_host=supernova)

On this page

*   [Design Usage](#section-design-usage-07)
*   [Best Practices](#section-best-practices-13)
`;

    expect(transformExtractedMarkdown(input)).toBe(`A Button sits in the [hierarchy](/design/visual-hierarchy).

<iframe src="https://embed.figma.com/design/example?embed_host=supernova" title="Embedded content" />`);
  });

  it('strips token Folder Landing tabs', () => {
    const input = `*   [Overview](/latest/design/global-tokens/spacing/overview-bGc59YZU)
*   [Customisation](/latest/design/global-tokens/spacing/customisation-abcDEF12)
*   [Spirit Tokens](/latest/design/global-tokens/spacing/spirit-tokens-abcDEF12)

| Name | value (px) |
| --- | --- |
`;

    expect(transformExtractedMarkdown(input)).toBe(`| Name | value (px) |
| --- | --- |`);
  });

  it('strips empty copy-link headings and empty on-this-page items', () => {
    const input = `Content

### [](#section--97 "Copy link to heading")

On this page

*   [](#section--97)
`;

    expect(transformExtractedMarkdown(input)).toBe('Content');
  });

  it('escapes HTML and MDX punctuation outside code fences and iframes', () => {
    const input = `Use <button> not {foo}.

<iframe src="https://embed.figma.com/design/example" title="Embedded content" />

\`\`\`tsx
<button />
{foo}
\`\`\`
`;

    expect(transformExtractedMarkdown(input)).toBe(`Use &lt;button> not \\{foo\\}.

<iframe src="https://embed.figma.com/design/example" title="Embedded content" />

\`\`\`tsx
<button />
{foo}
\`\`\``);
  });

  it('flattens multiline card links so MDX can parse them', () => {
    const input = `[

Theme Tokens

Themes and tokens for our components

](/latest/design/theme-tokens/themes-abcDEF12)[

Spacing

](/latest/design/global-tokens/spacing/overview-bGc59YZU)
`;

    expect(transformExtractedMarkdown(input)).toBe(`[Theme Tokens](/design/theme-tokens/themes) — Themes and tokens for our components

[Spacing](/design/global-tokens/spacing)`);
  });

  it('strips helper sibling tab lists', () => {
    const input = `*   [Animations](/latest/development/helpers/animations-abcDEF12)
*   [Links](/latest/development/helpers/links-abcDEF12)

Embedded content: [iframe](https://spirit-design-system.netlify.app/packages/web/src/scss/helpers/links/)
`;

    expect(transformExtractedMarkdown(input)).toBe(
      '<iframe src="https://spirit-design-system.netlify.app/packages/web/src/scss/helpers/links/" title="Embedded content" />',
    );
  });
});

describe('titleForCanonicalPage', () => {
  it('uses the file slug when the extracted title is the parent folder', () => {
    expect(titleForCanonicalPage('development/helpers/links.md', 'Helpers')).toBe('Links');
    expect(titleForCanonicalPage('design/icons/library.md', 'Icons')).toBe('Library');
    expect(titleForCanonicalPage('design/global-tokens/spacing/customisation.md', 'Spacing')).toBe('Customisation');
  });

  it('keeps component tab titles and Folder Landings', () => {
    expect(titleForCanonicalPage('components/button/overview.md', 'Button')).toBe('Button');
    expect(titleForCanonicalPage('design/global-tokens/spacing/index.md', 'Spacing')).toBe('Spacing');
    expect(titleForCanonicalPage('development/utilities.md', 'Utilities')).toBe('Utilities');
  });
});
