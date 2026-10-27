import { filterComponents } from '../filterComponents';

const COMPONENTS = ['Button', 'ButtonLink', 'ControlButton', 'EmptyState', 'Link', 'UNSTABLE_Tile'].map((name) => ({
  name,
}));

const names = (components: { name: string }[]) => components.map(({ name }) => name);

describe('filterComponents', () => {
  it('should return all components for an empty query', () => {
    expect(filterComponents(COMPONENTS, '')).toEqual(COMPONENTS);
    expect(filterComponents(COMPONENTS, '   ')).toEqual(COMPONENTS);
  });

  it('should return components containing the query', () => {
    expect(names(filterComponents(COMPONENTS, 'button'))).toEqual(['Button', 'ButtonLink', 'ControlButton']);
  });

  it('should ignore case', () => {
    expect(names(filterComponents(COMPONENTS, 'LINK'))).toEqual(['ButtonLink', 'Link']);
  });

  it('should ignore spaces and underscores', () => {
    expect(names(filterComponents(COMPONENTS, 'empty state'))).toEqual(['EmptyState']);
    expect(names(filterComponents(COMPONENTS, 'unstable tile'))).toEqual(['UNSTABLE_Tile']);
  });

  it('should return no components when nothing matches', () => {
    expect(filterComponents(COMPONENTS, 'xyz')).toEqual([]);
  });
});
