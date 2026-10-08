import { filterComponents } from '../filterComponents';

const COMPONENTS = ['Button', 'ButtonLink', 'ControlButton', 'EmptyState', 'Link', 'UNSTABLE_Tile'];

describe('filterComponents', () => {
  it('should return all components for an empty query', () => {
    expect(filterComponents(COMPONENTS, '')).toEqual(COMPONENTS);
    expect(filterComponents(COMPONENTS, '   ')).toEqual(COMPONENTS);
  });

  it('should return components containing the query', () => {
    expect(filterComponents(COMPONENTS, 'button')).toEqual(['Button', 'ButtonLink', 'ControlButton']);
  });

  it('should ignore case', () => {
    expect(filterComponents(COMPONENTS, 'LINK')).toEqual(['ButtonLink', 'Link']);
  });

  it('should ignore spaces and underscores', () => {
    expect(filterComponents(COMPONENTS, 'empty state')).toEqual(['EmptyState']);
    expect(filterComponents(COMPONENTS, 'unstable tile')).toEqual(['UNSTABLE_Tile']);
  });

  it('should return no components when nothing matches', () => {
    expect(filterComponents(COMPONENTS, 'xyz')).toEqual([]);
  });
});
