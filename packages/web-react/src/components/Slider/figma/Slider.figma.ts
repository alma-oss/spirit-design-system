// url=<FIGMA_FILE_ID>?node-id=21795%3A15814
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Slider/Slider.tsx
// component=Slider

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const isDisabled = instance.getBoolean('Disabled');
const value = instance.getEnum('Value', { '0%': 0, '50%': 50, '100%': 100 });

export default {
  id: 'Slider',
  imports: ["import { Slider } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Slider
      id="slider-default"
      isLabelHidden
      label="Fill accessible label"
      onChange={() => {}}
      value={${value}}
      ${isDisabled ? 'isDisabled' : ''}
    />`,
};
