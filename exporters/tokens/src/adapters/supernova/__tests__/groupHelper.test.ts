import { getTokenGroupPath, getTokenNamePath } from '../groupHelper';

describe('groupHelper', () => {
  const token = { parentGroupId: 'g' };
  const group = { id: 'g', name: 'spacing', path: ['Grid'] };
  const rootGroup = { id: 'g', name: 'Color', path: [], isRoot: true };

  describe('getTokenGroupPath', () => {
    it('should return an empty path when the group is not found', () => {
      expect(getTokenGroupPath(token, [])).toEqual([]);
    });

    it('should include the group name in the path', () => {
      expect(getTokenGroupPath(token, [group])).toEqual(['Grid', 'spacing']);
    });

    it('should include the name of a root group', () => {
      expect(getTokenGroupPath(token, [rootGroup])).toEqual(['Color']);
    });
  });

  describe('getTokenNamePath', () => {
    it('should return an empty path when the group is not found', () => {
      expect(getTokenNamePath(token, [])).toEqual([]);
    });

    it('should include the group name in the path', () => {
      expect(getTokenNamePath(token, [group])).toEqual(['Grid', 'spacing']);
    });

    it('should skip the name of a root group', () => {
      expect(getTokenNamePath(token, [rootGroup])).toEqual([]);
    });
  });
});
