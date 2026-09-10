import { titleForSiblingPage } from '../pageTitle';

describe('titleForSiblingPage', () => {
  it('uses the file slug when frontmatter repeats the parent folder title', () => {
    expect(titleForSiblingPage('links', 'helpers', 'Helpers')).toBe('Links');
    expect(titleForSiblingPage('library', 'icons', 'Icons')).toBe('Library');
  });

  it('keeps a distinct frontmatter title', () => {
    expect(titleForSiblingPage('links', 'helpers', 'Link helpers')).toBe('Link helpers');
  });
});
