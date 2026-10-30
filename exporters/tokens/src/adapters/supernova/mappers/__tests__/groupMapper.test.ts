import { exampleGroups } from '../../../../../tests/fixtures/exampleGroups';
import { mapGroup } from '../groupMapper';

describe('groupMapper', () => {
  describe('mapGroup', () => {
    it('maps a token group to the internal model', () => {
      const group = exampleGroups.find((candidate) => candidate.id === '2')!;

      const result = mapGroup(group);

      expect(result).toEqual({
        id: '2',
        name: 'Grid',
        path: [],
        parentId: 'parent2',
      });
    });

    it('omits parentId when the group has no parent', () => {
      const group = { ...exampleGroups[0], parentGroupId: null };

      const result = mapGroup(group);

      expect(result.parentId).toBeUndefined();
    });
  });
});
