import { normalizeUrl } from '../url';

describe('normalizeUrl', () => {
  it('removes duplicate slashes while preserving protocol and adding trailing slash', () => {
    expect(normalizeUrl('http://example.com/', '/path/', '/to/', '/page')).toBe('http://example.com/path/to/page/');
  });

  it('always adds trailing slash', () => {
    expect(normalizeUrl('https://example.com', 'path')).toBe('https://example.com/path/');
  });

  it('handles multiple consecutive slashes and adds trailing slash', () => {
    expect(normalizeUrl('http://localhost:3456//', '//packages//web//', 'component')).toBe(
      'http://localhost:3456/packages/web/component/',
    );
  });

  it('works with localhost URLs', () => {
    expect(normalizeUrl('http://localhost:3456', 'packages/web', 'src/components', 'Button')).toBe(
      'http://localhost:3456/packages/web/src/components/Button/',
    );
  });

  it('handles paths with inconsistent leading and trailing slashes', () => {
    expect(normalizeUrl('http://localhost:3456/', '/packages/web/', 'src/components', 'Button')).toBe(
      'http://localhost:3456/packages/web/src/components/Button/',
    );
  });

  it('handles empty base URL path', () => {
    expect(normalizeUrl('http://example.com', 'path')).toBe('http://example.com/path/');
  });

  it('works with HTTPS protocol', () => {
    expect(normalizeUrl('https://spirit-design-system.netlify.app', 'packages/web-react', 'src/components')).toBe(
      'https://spirit-design-system.netlify.app/packages/web-react/src/components/',
    );
  });

  it('handles base URL with trailing slash', () => {
    expect(normalizeUrl('https://example.com/', 'api', 'v1', 'users')).toBe('https://example.com/api/v1/users/');
  });

  it('does not add double trailing slash if URL already ends with slash', () => {
    expect(normalizeUrl('https://example.com/', 'api/', 'users/')).toBe('https://example.com/api/users/');
  });

  it('handles single segment URLs', () => {
    expect(normalizeUrl('https://example.com', 'api')).toBe('https://example.com/api/');
  });
});
