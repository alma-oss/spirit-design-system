import { resolveComponentSectionRequest, type ComponentSectionIndex } from '../componentSectionRequest';

const index: ComponentSectionIndex = {
  'action-group': ['overview', 'react'],
  button: ['overview', 'web'],
  hidden: ['react', 'reactPreview'],
  dialog: ['web', 'react'],
};

describe('resolveComponentSectionRequest', () => {
  it('should ignore the components listing', () => {
    expect(resolveComponentSectionRequest('/components', index)).toBe('ignore');
  });

  it('should report a missing section when the index does not contain it', () => {
    expect(resolveComponentSectionRequest('/components/action-group/web', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/action-group/react', index)).toBe('present');
    expect(resolveComponentSectionRequest('/components/action-group', index)).toBe('present');
    expect(resolveComponentSectionRequest('/components/button/web', index)).toBe('present');
    expect(resolveComponentSectionRequest('/components/does-not-exist', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/action-group/react/extra', index)).toBe('missing');
  });

  it('should redirect the bare URL of a component without Guidelines to its first section', () => {
    expect(resolveComponentSectionRequest('/components/hidden', index)).toEqual({
      redirectTo: '/components/hidden/react',
    });
    expect(resolveComponentSectionRequest('/components/dialog', index)).toEqual({
      redirectTo: '/components/dialog/web',
    });
    expect(resolveComponentSectionRequest('/components/hidden/web', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/hidden/react', index)).toBe('present');
  });

  it('should report a missing section for names that exist on Object.prototype', () => {
    expect(resolveComponentSectionRequest('/components/constructor', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/__proto__/react', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/toString/web', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/button/constructor', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/button/__proto__', index)).toBe('missing');
  });

  it('should report a missing section when the path encoding is malformed', () => {
    expect(resolveComponentSectionRequest('/components/%/react', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/action-group/%', index)).toBe('missing');
  });
});
