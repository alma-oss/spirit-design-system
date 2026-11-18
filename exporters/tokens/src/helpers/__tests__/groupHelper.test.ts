import { getTokenGroupPath } from '../groupHelper';

describe('getTokenGroupPath', () => {
  const token = { parentGroupId: 'g' };

  it('should return an empty path when the group is not found', () => {
    expect(getTokenGroupPath(token, [])).toEqual([]);
  });

  it('should include the group name in the path', () => {
    expect(getTokenGroupPath(token, [{ id: 'g', name: 'spacing', path: ['Grid'] }])).toEqual(['Grid', 'spacing']);
  });

  it('should skip the name of a root group', () => {
    expect(getTokenGroupPath(token, [{ id: 'g', name: 'Color', path: [], isRoot: true }])).toEqual([]);
  });
});
