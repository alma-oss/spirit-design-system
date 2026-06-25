import figma from '@figma/code-connect';
import React from 'react';
import CloseButton from '../CloseButton';

figma.connect(CloseButton, '<FIGMA_FILE_ID>?node-id=35415%3A1022', {
  props: {
    isSubtle: figma.enum('Color', {
      Basic: false,
      Subtle: true,
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Large: 'large',
    }),
  },
  example: (props) => <CloseButton {...props} />,
});
