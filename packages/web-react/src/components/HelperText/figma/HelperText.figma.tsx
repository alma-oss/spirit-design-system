import figma from '@figma/code-connect';
import React from 'react';
import HelperText from '../HelperText';

figma.connect(HelperText, '<FIGMA_FILE_ID>?node-id=26437%3A2042', {
  props: {
    helperText: figma.textContent('Helper text'),
  },
  example: (props) => <HelperText {...props} />,
});
