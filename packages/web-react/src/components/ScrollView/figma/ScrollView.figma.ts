// url=<FIGMA_FILE_ID>?node-id=35163%3A22653
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ScrollView/ScrollView.tsx
// component=ScrollView

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const direction = instance.getEnum('Direction', { Horizontal: 'horizontal', Vertical: undefined });
const hasControls = instance.getBoolean('Arrows');

export default {
  id: 'ScrollView',
  imports: ["import { ScrollView } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ScrollView${direction ? figma.code` direction="${direction}"` : ''}${hasControls ? ' hasControls' : ''}>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
        dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
        vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
        ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque
        rutrum. Aenean imperdiet.
      </p>
    </ScrollView>`,
};
