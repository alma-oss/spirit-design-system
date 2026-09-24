import figma from 'figma';

export default {
  id: figma.batch.id,
  imports: ["import { Icon } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<Icon name="${figma.batch.name}" />`,
  metadata: {
    nestable: true,
    props: { iconName: figma.batch.name },
  },
};
