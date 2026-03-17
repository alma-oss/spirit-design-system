import figma from '@figma/code-connect';
import React from 'react';
import ValidationText from '../ValidationText';

const commonProps = {
  validationText: figma.string('Message'),
};

figma.connect(ValidationText, '<FIGMA_FILE_ID>?node-id=26437%3A2033', {
  props: commonProps,
  variant: { Icon: false },
  example: (props) => <ValidationText {...props} />,
});

figma.connect(ValidationText, '<FIGMA_FILE_ID>?node-id=26437%3A2033', {
  props: {
    ...commonProps,
    hasValidationStateIcon: figma.enum('Type', {
      Danger: 'danger',
      Warning: 'warning',
      Success: 'success',
    }),
  },
  variant: { Icon: true },
  example: (props) => <ValidationText {...props} />,
});
