import figma from '@figma/code-connect';
import React from 'react';
import ScrollView from '../ScrollView';

figma.connect(ScrollView, '<FIGMA_FILE_ID>?node-id=35163%3A22653', {
  props: {
    direction: figma.enum('Direction', {
      Horizontal: 'horizontal',
    }),
    hasControls: figma.boolean('Controls'),
  },
  example: (props) => (
    <ScrollView {...props}>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
        nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
        felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
        eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
        dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
        Aenean imperdiet.
      </p>
    </ScrollView>
  ),
});
