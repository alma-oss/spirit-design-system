import { resolveComponentSectionRequest, type ComponentSectionIndex } from '../componentSectionRequest';

const index: ComponentSectionIndex = {
  'action-group': ['overview', 'react'],
  button: ['overview', 'web'],
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

  it('should report a missing section when the path encoding is malformed', () => {
    expect(resolveComponentSectionRequest('/components/%/react', index)).toBe('missing');
    expect(resolveComponentSectionRequest('/components/action-group/%', index)).toBe('missing');
  });
});
