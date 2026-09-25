import type { TokenGroup as SupernovaTokenGroup } from '@supernovaio/sdk-exporters';
import type { TokenGroup } from '../../../core/types';

export const mapGroup = (group: SupernovaTokenGroup): TokenGroup => ({
  id: group.id,
  name: group.name,
  path: group.path,
  parentId: group.parentGroupId ?? undefined,
});
