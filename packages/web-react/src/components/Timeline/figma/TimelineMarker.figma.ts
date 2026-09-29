// url=<FIGMA_FILE_ID>?node-id=37907%3A91
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Timeline/TimelineMarker.tsx
// component=TimelineMarker

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const type = instance.getEnum('Type', { Number: undefined, Dot: 'dot', Icon: 'icon' });
// Size has no equivalent prop on TimelineMarker itself — it belongs to the parent Timeline,
// so it's only exposed via metadata for Timeline.figma.ts to pick up.
const size = instance.getEnum('Size', { Small: undefined, Medium: 'medium', Large: 'large' });

let children;
if (type === 'icon') {
  const icon = instance.getInstanceSwap('Icon');
  if (icon && icon.type === 'INSTANCE') {
    const iconName = icon.executeTemplate().metadata?.props?.iconName;
    children = figma.code`<Icon name="${iconName}" />`;
  }
} else if (!type) {
  children = '1';
}

export default {
  id: 'TimelineMarker',
  imports: ["import { Icon, TimelineMarker } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<TimelineMarker${type ? figma.code` variant="${type}"` : ''}>${children}</TimelineMarker>`,
  metadata: {
    nestable: true,
    props: { size },
  },
};
