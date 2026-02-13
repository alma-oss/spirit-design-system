import figma from '@figma/code-connect';
import React from 'react';
import Spinner from '../Spinner';

figma.connect(Spinner, '<FIGMA_FILE_ID>?node-id=11445%3A8917', {
  props: {
    color: figma.enum('Text Color', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
  },
  example: (props) => <Spinner {...props} />,
});
